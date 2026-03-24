#!/usr/bin/env node

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const TRPC_ENDPOINT = "https://21st.dev/api/trpc/demos.list";
const REGISTRY_BASE_URL = "https://21st.dev/r";
const SITEMAP_URL = "https://21st.dev/sitemap.xml";
const PAGE_SIZE = 60;
const DEFAULT_OUT_DIR = "catalog";
const DEFAULT_PROMPT_TYPE = "extended";
const DEFAULT_CONCURRENCY = 10;
const DEFAULT_RETRIES = 3;

const PROMPT_TYPES = new Set([
  "extended",
  "bolt",
  "claude-code",
  "lovable",
  "replit",
  "v0",
]);

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const outDir = path.resolve(process.cwd(), options.outDir);
  const manifestPath = getSidecarPath(outDir, "manifest.json");

  await mkdir(outDir, { recursive: true });
  await rm(path.join(outDir, "LEGEND.md"), { force: true });
  await rm(path.join(outDir, "manifest.json"), { force: true });
  await rm(path.join(path.dirname(outDir), "CATALOG_LEGEND.md"), { force: true });

  console.log(`Fetching component list from 21st.dev...`);
  const { entries: demos, failures: discoveryFailures } = await fetchAllDemos(options.limit);
  const planned = assignOutputFiles(demos);

  console.log(
    `Building ${planned.length} prompt file${planned.length === 1 ? "" : "s"} into ${outDir}`,
  );

  const manifest = [];
  const failures = [...discoveryFailures];
  let completed = 0;

  await runPool(planned, options.concurrency, async (entry) => {
    const label = `${entry.componentName} (${entry.username}/${entry.componentSlug})`;

    try {
      const { prompt, entry: resolvedEntry } = await buildPromptDocument(
        entry,
        options.promptType,
      );
      const outputPath = path.join(outDir, entry.fileName);

      await writeFile(outputPath, prompt, "utf8");

      manifest.push(createManifestItem(resolvedEntry, entry.fileName, outDir, options.promptType));
    } catch (error) {
      failures.push({
        componentName: entry.componentName,
        componentSlug: entry.componentSlug,
        username: entry.username,
        demoId: entry.demoId,
        sourceUrl: entry.sourceUrl,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      completed += 1;
      console.log(`[${completed}/${planned.length}] ${label}`);
    }
  });

  manifest.sort((a, b) => a.outputFile.localeCompare(b.outputFile));
  failures.sort((a, b) => a.sourceUrl.localeCompare(b.sourceUrl));

  await writeFile(
    manifestPath,
    buildManifestDocument({
      outDir,
      promptType: options.promptType,
      total: planned.length,
      succeeded: manifest.length,
      failed: failures.length,
      items: manifest,
    }),
    "utf8",
  );

  if (failures.length > 0) {
    await writeFile(
      path.join(outDir, "failures.json"),
      JSON.stringify(failures, null, 2),
      "utf8",
    );
  }

  console.log(
    `Finished. Wrote ${manifest.length} prompt file${manifest.length === 1 ? "" : "s"} to ${outDir}.`,
  );
  console.log(`Wrote manifest to ${manifestPath}.`);

  if (failures.length > 0) {
    console.log(
      `${failures.length} component${failures.length === 1 ? "" : "s"} failed. See ${path.join(
        outDir,
        "failures.json",
      )}`,
    );
    process.exitCode = 1;
  }
}

function getSidecarPath(outDir, fileName) {
  return path.join(path.dirname(outDir), fileName);
}

function parseArgs(args) {
  const options = {
    outDir: DEFAULT_OUT_DIR,
    promptType: DEFAULT_PROMPT_TYPE,
    limit: null,
    concurrency: DEFAULT_CONCURRENCY,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--out-dir") {
      options.outDir = readValue(args, ++index, "--out-dir");
      continue;
    }

    if (arg === "--prompt-type") {
      options.promptType = normalizePromptType(
        readValue(args, ++index, "--prompt-type"),
      );
      continue;
    }

    if (arg === "--limit") {
      options.limit = parsePositiveInt(readValue(args, ++index, "--limit"), "--limit");
      continue;
    }

    if (arg === "--concurrency") {
      options.concurrency = parsePositiveInt(
        readValue(args, ++index, "--concurrency"),
        "--concurrency",
      );
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function readValue(args, index, flagName) {
  const value = args[index];

  if (!value) {
    throw new Error(`Missing value for ${flagName}`);
  }

  return value;
}

function parsePositiveInt(value, flagName) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${flagName} must be a positive integer.`);
  }

  return parsed;
}

function normalizePromptType(value) {
  const normalized = value.toLowerCase();
  const aliases = {
    cursor: "extended",
    claude: "claude-code",
    claude_code: "claude-code",
  };
  const promptType = aliases[normalized] ?? normalized;

  if (!PROMPT_TYPES.has(promptType)) {
    throw new Error(
      `Unsupported prompt type "${value}". Use one of: ${Array.from(PROMPT_TYPES).join(", ")}`,
    );
  }

  return promptType;
}

function printHelp() {
  console.log(`
Usage:
  npm run build-catalog -- [options]

Options:
  --out-dir <path>        Output directory. Default: ${DEFAULT_OUT_DIR}
  --prompt-type <type>    extended | bolt | claude-code | lovable | replit | v0
                          Default: ${DEFAULT_PROMPT_TYPE}
  --limit <n>             Only process the first n components.
  --concurrency <n>       Parallel fetches. Default: ${DEFAULT_CONCURRENCY}
  --help                  Show this help.
`);
}

async function fetchAllDemos(limit) {
  const demos = [];
  let cursor = 0;

  while (true) {
    const page = await fetchDemosPage(cursor);

    for (const item of page.items) {
      const username = item.user_data?.username;
      const componentSlug = item.component_data?.component_slug;
      const componentName = item.component_data?.name;

      if (!username || !componentSlug || !componentName) {
        continue;
      }

      demos.push({
        demoId: item.id,
        demoSlug: item.demo_slug,
        demoCodeUrl: item.demo_code,
        componentName,
        componentSlug,
        username,
        displayUsername: item.user_data?.display_username ?? null,
        dependencies: item.component_data?.dependencies ?? {},
        sourceUrl: `https://21st.dev/community/components/${username}/${componentSlug}/${item.demo_slug}`,
        registryUrl: `${REGISTRY_BASE_URL}/${username}/${componentSlug}`,
      });
    }

    if (page.nextCursor == null) {
      break;
    }

    cursor = page.nextCursor;
  }

  const deduped = dedupeEntriesBySourceUrl(demos);
  const discoveryFailures = [];
  const sitemapEntries = await fetchSitemapEntries(deduped);
  const bySourceUrl = new Map(deduped.map((entry) => [entry.sourceUrl, entry]));

  for (const placeholder of sitemapEntries) {
    if (bySourceUrl.has(placeholder.sourceUrl)) {
      continue;
    }

    deduped.push(placeholder);
    bySourceUrl.set(placeholder.sourceUrl, placeholder);
  }

  deduped.sort((a, b) => a.sourceUrl.localeCompare(b.sourceUrl));

  return {
    entries: limit ? deduped.slice(0, limit) : deduped,
    failures: discoveryFailures,
  };
}

async function fetchDemosPage(cursor) {
  const input = {
    0: {
      json: {
        sortBy: "recommended",
        limit: PAGE_SIZE,
        includePrivate: false,
        cursor,
      },
    },
  };

  const url = `${TRPC_ENDPOINT}?batch=1&input=${encodeURIComponent(JSON.stringify(input))}`;
  const payload = await fetchJson(url);
  const data = payload?.[0]?.result?.data?.json;

  if (!data || !Array.isArray(data.items)) {
    throw new Error(`Unexpected response from demos.list for cursor ${cursor}`);
  }

  return data;
}

function assignOutputFiles(demos) {
  const used = new Set();

  return demos.map((demo) => {
    const preferredBase = buildOutputBaseName(demo);
    let fileName = `${preferredBase}.md`;

    if (used.has(fileName)) {
      fileName = `${preferredBase}--${normalizeFileToken(demo.username)}.md`;
    }

    if (used.has(fileName)) {
      fileName = `${preferredBase}--${demo.demoId}.md`;
    }

    used.add(fileName);

    return {
      ...demo,
      fileName,
    };
  });
}

function buildOutputBaseName(entry) {
  const baseNameParts = [
    normalizeFileToken(entry.username),
    normalizeFileToken(entry.componentSlug) ||
      slugify(entry.componentName) ||
      `demo-${entry.demoId}`,
  ];

  if (entry.demoSlug && entry.demoSlug !== "default") {
    baseNameParts.push(normalizeFileToken(entry.demoSlug));
  }

  return baseNameParts.filter(Boolean).join("--");
}

function createManifestItem(entry, outputFile, outDir, promptType) {
  return {
    id: buildManifestItemId(entry.sourceUrl),
    componentName: entry.componentName,
    componentSlug: entry.componentSlug,
    username: entry.username,
    demoId: entry.demoId,
    demoSlug: entry.demoSlug,
    sourceUrl: entry.sourceUrl,
    sourcePath: buildSourcePath(entry.sourceUrl),
    registryUrl: entry.registryUrl,
    outputFile,
    filePath: `${path.basename(outDir)}/${outputFile}`,
    promptType,
  };
}

function buildManifestDocument({ outDir, promptType, total, succeeded, failed, items }) {
  return `${JSON.stringify(
    {
      format: "frontend-catalog-manifest-v1",
      generatedAt: new Date().toISOString(),
      promptType,
      catalogDir: path.basename(outDir),
      total,
      succeeded,
      failed,
      items,
    },
    null,
    2,
  )}\n`;
}

function buildManifestItemId(sourceUrl) {
  return buildSourcePath(sourceUrl).replace(/\//g, "::");
}

function buildSourcePath(sourceUrl) {
  try {
    return new URL(sourceUrl).pathname.replace(/^\/community\/components\//, "");
  } catch {
    return sourceUrl;
  }
}

async function buildPromptDocument(entry, promptType) {
  const hydratedEntry = await hydrateEntry(entry);
  const registryPromise = fetchRegistryEntry(hydratedEntry.registryUrl);
  const demoCodePromise = hydratedEntry.demoCode
    ? Promise.resolve(hydratedEntry.demoCode)
    : fetchText(hydratedEntry.demoCodeUrl, { required: true });
  const [registry, demoCode] = await Promise.all([registryPromise, demoCodePromise]);

  const mainFile = selectMainFile(registry.files, hydratedEntry.componentSlug);

  if (!mainFile) {
    throw new Error(`No registry files found for ${hydratedEntry.registryUrl}`);
  }

  const registryDependencies = Object.fromEntries(
    registry.files.map((file) => [file.path, file.content]),
  );

  const prompt = buildPrompt({
    promptType,
    codeFileName: mainFile.path,
    demoCodeFileName: fileNameFromUrl(hydratedEntry.demoCodeUrl) ?? "code.demo.tsx",
    code: mainFile.content,
    demoCode,
    registryDependencies,
    npmDependencies: normalizeDependencyMap(hydratedEntry.dependencies),
    npmDependenciesOfRegistryDependencies: normalizeArrayDependencyMap(
      registry.dependencies,
    ),
    tailwindConfig: normalizeTailwindConfig(registry.tailwind?.config),
    globalCss: null,
    indexCss: null,
    promptRule: null,
    userAdditionalContext: null,
  });

  if (!prompt) {
    throw new Error(
      `Prompt builder returned an empty prompt for ${hydratedEntry.sourceUrl}`,
    );
  }

  return {
    prompt: prompt.trimEnd() + "\n",
    entry: hydratedEntry,
  };
}

async function hydrateEntry(entry) {
  if (entry.demoCodeUrl && entry.componentName) {
    return entry;
  }

  const metadata = await fetchPageMetadata(entry.sourceUrl);

  return {
    ...entry,
    componentName: metadata.componentName ?? entry.componentName,
    demoId: metadata.demoId ?? entry.demoId,
    demoSlug: metadata.demoSlug ?? entry.demoSlug,
    demoCode: metadata.demoCode ?? entry.demoCode,
    demoCodeUrl: metadata.demoCodeUrl ?? entry.demoCodeUrl,
    dependencies:
      Object.keys(entry.dependencies || {}).length > 0
        ? entry.dependencies
        : metadata.dependencies,
    sourceUrl: metadata.sourceUrl ?? entry.sourceUrl,
  };
}

async function fetchRegistryEntry(url) {
  const registry = await fetchJson(url);

  if (!registry || !Array.isArray(registry.files)) {
    throw new Error(`Unexpected registry payload from ${url}`);
  }

  return registry;
}

function selectMainFile(files, componentSlug) {
  const candidates = [
    files.find((file) =>
      new RegExp(`/${escapeRegExp(componentSlug)}\\.(t|j)sx?$`, "i").test(file.path),
    ),
    files.find((file) =>
      path.basename(file.path).toLowerCase().includes(componentSlug.toLowerCase()),
    ),
    files[0],
  ];

  return candidates.find(Boolean) ?? null;
}

function normalizeDependencyMap(value) {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).map(([dependency, version]) => [
      dependency,
      typeof version === "string" && version.trim() ? version : "latest",
    ]),
  );
}

function normalizeArrayDependencyMap(value) {
  if (!Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    value.map((dependency) => [dependency, "latest"]),
  );
}

function normalizeTailwindConfig(config) {
  if (!config) {
    return null;
  }

  if (typeof config === "string") {
    const trimmed = config.trim();
    return trimmed ? trimmed : null;
  }

  if (typeof config === "object" && Object.keys(config).length > 0) {
    return `module.exports = ${JSON.stringify(config, null, 2)}`;
  }

  return null;
}

async function fetchJson(url) {
  const text = await fetchText(url, { required: true });

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      `Failed to parse JSON from ${url}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

async function fetchText(url, { required }) {
  if (!url) {
    if (required) {
      throw new Error(`Missing required URL.`);
    }

    return "";
  }

  let lastError = null;

  for (let attempt = 1; attempt <= DEFAULT_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "frontend-catalog-script",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error;

      if (attempt < DEFAULT_RETRIES) {
        await delay(250 * attempt);
      }
    }
  }

  if (!required) {
    return "";
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function fetchSitemapEntries(feedEntries) {
  const xml = await fetchText(SITEMAP_URL, { required: true });
  const urls = [...xml.matchAll(/<loc>(https:\/\/21st\.dev\/[^<]+)<\/loc>/g)].map(
    (match) => match[1].replace(/\s+/g, ""),
  );
  const excludedCollections = new Set(["popular", "newest", "featured", "week", "s"]);
  const feedDefaultKeys = new Set(
    feedEntries.map((entry) => `${entry.username}/${entry.componentSlug}/default`),
  );
  const placeholders = [];
  const seen = new Set();

  for (const url of urls) {
    let parsed;

    try {
      parsed = new URL(url);
    } catch {
      continue;
    }

    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts[0] !== "community" || parts[1] !== "components") {
      continue;
    }

    if (parts.length !== 4 && parts.length !== 5) {
      continue;
    }

    const username = parts[2];
    const componentSlug = parts[3];
    const demoSlug = parts[4] ?? null;

    if (excludedCollections.has(username)) {
      continue;
    }

    if (demoSlug == null && feedDefaultKeys.has(`${username}/${componentSlug}/default`)) {
      continue;
    }

    if (seen.has(url)) {
      continue;
    }

    placeholders.push(createPlaceholderEntry(url));
    seen.add(url);
  }

  return placeholders;
}

function createPlaceholderEntry(sourceUrl) {
  const { username, componentSlug, demoSlug } = parseSourceUrl(sourceUrl);

  return {
    demoId: null,
    demoSlug,
    demoCodeUrl: null,
    demoCode: null,
    componentName: titleCaseFromSlug(componentSlug),
    componentSlug,
    username,
    displayUsername: null,
    dependencies: {},
    sourceUrl,
    registryUrl: `${REGISTRY_BASE_URL}/${username}/${componentSlug}`,
  };
}

function parseSourceUrl(sourceUrl) {
  const parsed = new URL(sourceUrl);
  const parts = parsed.pathname.split("/").filter(Boolean);

  if (
    (parts.length !== 4 && parts.length !== 5) ||
    parts[0] !== "community" ||
    parts[1] !== "components"
  ) {
    throw new Error(`Unsupported component URL: ${sourceUrl}`);
  }

  return {
    username: parts[2],
    componentSlug: parts[3],
    demoSlug: parts[4] ?? null,
  };
}

function titleCaseFromSlug(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function fetchPageMetadata(sourceUrl) {
  const candidates = buildMetadataCandidates(sourceUrl);
  let lastError = null;

  for (const candidate of candidates) {
    try {
      const html = await fetchText(candidate, { required: true });

      if (isCollectionPageHtml(html)) {
        throw new Error(`Collection page at ${candidate}`);
      }

      if (isNotFoundComponentHtml(html)) {
        throw new Error(`Component not found at ${candidate}`);
      }

      const metadata = extractPageMetadata(html);

      if (!metadata.demoCodeUrl && !metadata.demoCode) {
        throw new Error(`Could not locate demo code URL in ${candidate}`);
      }

      return {
        ...metadata,
        sourceUrl: candidate,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function buildMetadataCandidates(sourceUrl) {
  const candidates = [sourceUrl];
  const parsed = parseSourceUrl(sourceUrl);

  if (parsed.demoSlug === "default") {
    candidates.push(
      `https://21st.dev/community/components/${parsed.username}/${parsed.componentSlug}`,
    );
  }

  return [...new Set(candidates)];
}

function extractPageMetadata(html) {
  const componentName =
    decodeJsonString(
      extractFirstMatch(html, /"component":\{[\s\S]*?"name":"((?:\\.|[^"\\])+)"/),
    ) ?? null;
  const demoCodeUrl =
    decodeJsonString(
      extractFirstMatch(html, /"demo_code":"((?:\\.|[^"\\])+)"/),
    ) ??
    decodeJsonString(
      extractFirstMatch(
        html,
        /(https:\/\/cdn\.21st\.dev\/[^"\\]+\/code\.demo[^"\\]*\.(?:tsx|jsx|ts|js)(?:\?[^"\\]*)?)/,
      ),
    );
  const demoCode = decodeJsonString(
    extractFirstMatch(html, /"demoCode":"((?:\\.|[^"\\])*)"/),
  );
  const demoId = extractIntegerMatch(html, /"demo":\{[\s\S]*?"id":(\d+)/);
  const demoSlug = decodeJsonString(
    extractFirstMatch(html, /"demo":\{[\s\S]*?"demo_slug":"((?:\\.|[^"\\])+)"/),
  );

  return {
    componentName,
    demoId,
    demoSlug,
    demoCodeUrl,
    demoCode,
    dependencies: {},
  };
}

function isCollectionPageHtml(html) {
  return html.includes('\\"@type\\":\\"CollectionPage\\"') || html.includes("/community/components/s/%5Bslug%5D/");
}

function isNotFoundComponentHtml(html) {
  return (
    html.includes("Component Not Found | 21st") ||
    html.includes("NEXT_REDIRECT;replace;/;307;")
  );
}

function extractFirstMatch(text, pattern) {
  const match = text.match(pattern);
  return match?.[1] ?? null;
}

function extractIntegerMatch(text, pattern) {
  const value = extractFirstMatch(text, pattern);

  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : null;
}

function decodeJsonString(value) {
  if (value == null) {
    return null;
  }

  try {
    return JSON.parse(`"${value}"`);
  } catch {
    return value;
  }
}

function dedupeEntriesBySourceUrl(entries) {
  const bySourceUrl = new Map();

  for (const entry of entries) {
    const current = bySourceUrl.get(entry.sourceUrl);

    if (!current || shouldReplaceEntry(current, entry)) {
      bySourceUrl.set(entry.sourceUrl, entry);
    }
  }

  return [...bySourceUrl.values()];
}

function normalizeFileToken(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-._]+|[-._]+$/g, "");
}

function shouldReplaceEntry(current, candidate) {
  if (!current.demoCodeUrl && candidate.demoCodeUrl) {
    return true;
  }

  if (!current.demoId && candidate.demoId) {
    return true;
  }

  return (candidate.demoId ?? -1) > (current.demoId ?? -1);
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function runPool(items, concurrency, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (queue.length > 0) {
      const next = queue.shift();

      if (!next) {
        return;
      }

      await worker(next);
    }
  });

  await Promise.all(runners);
}

function fileNameFromUrl(url) {
  if (!url) {
    return null;
  }

  const parsed = new URL(url);
  const parts = parsed.pathname.split("/").filter(Boolean);
  return parts.at(-1) ?? null;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function dedupeDependencies(keys) {
  return [...new Set(keys.filter(Boolean))];
}

function codeFence(language, body) {
  return `\`\`\`${language}\n${body}\n\`\`\``;
}

function buildPrompt({
  promptType,
  codeFileName,
  demoCodeFileName,
  code,
  demoCode,
  registryDependencies,
  npmDependencies,
  npmDependenciesOfRegistryDependencies,
  tailwindConfig,
  globalCss,
  indexCss,
  promptRule,
  userAdditionalContext,
}) {
  const codeFile = codeFileName.split("/").slice(-1)[0];
  const demoFile = demoCodeFileName.split("/").slice(-1)[0];
  let prompt = "";

  if (promptType === "replit") {
    prompt += "Build this as my initial prototype\n\n";
  }

  if (
    promptType === "extended" ||
    promptType === "bolt" ||
    promptType === "claude-code"
  ) {
    prompt += [
      "You are given a task to integrate an existing React component in the codebase",
      "",
      "The codebase should support:",
      "- shadcn project structure  ",
      "- Tailwind CSS",
      "- Typescript",
      "",
      "If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.",
      "",
      "Determine the default path for components and styles. ",
      "If default path for components is not /components/ui, provide instructions on why it's important to create this folder",
      "",
    ].join("\n");
  }

  prompt += "Copy-paste this component to /components/ui folder:\n";
  prompt +=
    codeFence(
      "tsx",
      `${codeFile}\n${code}\n\n${demoFile}\n${demoCode}`,
    ) + "\n";

  if (Object.keys(registryDependencies || {}).length > 0) {
    prompt += "\nCopy-paste these files for dependencies:\n";
    prompt +=
      Object.entries(registryDependencies)
        .map(([filePath, content]) => codeFence("tsx", `${filePath}\n${content}`))
        .join("\n") + "\n";
  }

  const allDependencies = dedupeDependencies([
    ...Object.keys(npmDependencies || {}),
    ...Object.keys(npmDependenciesOfRegistryDependencies || {}),
  ]);

  if (allDependencies.length > 0) {
    const heading =
      promptType === "replit"
        ? "Install these NPM dependencies:"
        : "Install NPM dependencies:";
    prompt += `\n${heading}\n`;
    prompt += codeFence("bash", allDependencies.join(", ")) + "\n";
  }

  if (tailwindConfig) {
    prompt += "\nExtend existing tailwind.config.js with this code:\n";
    prompt += codeFence("js", tailwindConfig) + "\n";
  }

  if (indexCss) {
    prompt +=
      "\nExtend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):\n";
    prompt += codeFence("css", indexCss) + "\n";
  }

  if (globalCss) {
    prompt += "\nExtend existing globals.css with this code:\n";
    prompt += codeFence("css", globalCss) + "\n";
  }

  if (promptType === "extended" || promptType === "bolt") {
    prompt += [
      "",
      "Implementation Guidelines",
      "1. Analyze the component structure and identify all required dependencies",
      "2. Review the component's argumens and state",
      "3. Identify any required context providers or hooks and install them",
      "4. Questions to Ask",
      "- What data/props will be passed to this component?",
      "- Are there any specific state management requirements?",
      "- Are there any required assets (images, icons, etc.)?",
      "- What is the expected responsive behavior?",
      "- What is the best place to use this component in the app?",
      "",
      "Steps to integrate",
      "0. Copy paste all the code above in the correct directories",
      "1. Install external dependencies",
      "2. Fill image assets with Unsplash stock images you know exist",
      "3. Use lucide-react icons for svgs or logos if component requires them",
      "",
    ].join("\n");
  }

  if (promptRule) {
    if (Array.isArray(promptRule.tech_stack) && promptRule.tech_stack.length > 0) {
      prompt += `\n\nPlease use the following technologies in your implementation: ${promptRule.tech_stack
        .map((item) => `${item.name}${item.version ? ` ${item.version}` : ""}`)
        .join(", ")}`;
    }

    if (promptRule.theme) {
      if (promptRule.theme.tailwindConfig) {
        prompt += `\n\nFor context, here is the current Tailwind configuration being used: ${promptRule.theme.tailwindConfig}`;
      }

      if (promptRule.theme.globalCss) {
        prompt += `\n\nFor context, here are the global CSS styles being used: ${promptRule.theme.globalCss}`;
      }

      if (promptRule.theme.colors && Object.keys(promptRule.theme.colors).length > 0) {
        prompt += `\n\nPlease use these custom color values: \n${Object.entries(
          promptRule.theme.colors,
        )
          .map(([name, value]) => `${name}: ${value}`)
          .join("\n")}`;
      }

      if (
        promptRule.theme.spacing &&
        Object.keys(promptRule.theme.spacing).length > 0
      ) {
        prompt += `\n\nPlease use these custom spacing values: \n${Object.entries(
          promptRule.theme.spacing,
        )
          .map(([name, value]) => `${name}: ${value}`)
          .join("\n")}`;
      }
    }

    if (promptRule.additional_context) {
      prompt += `\n\nAdditional important context to consider: ${promptRule.additional_context}`;
    }
  }

  if (userAdditionalContext) {
    prompt += `\n\nUser Additional Context:\n${userAdditionalContext}`;
  }

  if (promptType === "replit") {
    prompt += [
      "",
      "Remember: For the code above, not change the component's code unless it's required to integrate or the user asks you to.",
      'IMPORTANT: The code above contains the initial prototype desired by the user. Create all mentioned files in full, without abbreviations. Do not use placeholders like "insert the rest of the code here" – output every line of code exactly as it is, so it can be copied and pasted directly into the project.',
    ].join("\n");
  } else {
    prompt += [
      "",
      "Remember: Do not change the component's code unless it's required to integrate or the user asks you to.",
      'IMPORTANT: Create all mentioned files in full, without abbreviations. Do not use placeholders like "insert the rest of the code here" – output every line of code exactly as it is, so it can be copied and pasted directly into the project.',
    ].join("\n");
  }

  return prompt;
}

await main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
