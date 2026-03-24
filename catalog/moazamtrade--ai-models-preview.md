You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
ai-models-preview.tsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AiModel = {
  id: string;
  name: string;
  provider?: string;
  family?: string;
  version?: string;
  description?: string;
  contextWindowTokens?: number;
  inputPricePer1KTokensUSD?: number;
  outputPricePer1KTokensUSD?: number;
  supports?: {
    vision?: boolean;
    functionCalling?: boolean;
    toolUse?: boolean;
    streaming?: boolean;
    jsonMode?: boolean;
    audioIn?: boolean;
    audioOut?: boolean;
  };
  tags?: string[];
  meta?: Record<string, unknown>;
};

type Props = {
  models: AiModel[];
  className?: string;
};

export const AiModelsList: React.FC<Props> = ({ models, className = "" }) => {
  const [selected, setSelected] = useState<AiModel | null>(null);

  const sorted = useMemo(() => {
    return [...models].sort((a, b) => {
      return (a.provider || "").localeCompare(b.provider || "");
    });
  }, [models]);

  const formatPrice = (n?: number) =>
    typeof n === "number" ? `$${n.toFixed(4)} / 1K tok` : "—";

  const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
      {children}
    </span>
  );

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <h2 className="text-2xl font-semibold text-foreground mb-4">AI Models</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((m) => (
          <motion.li
            key={m.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition"
            onClick={() => setSelected(m)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{m.name}</span>
              {m.version && <Badge>v{m.version}</Badge>}
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {m.description || "No description available"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {m.supports?.streaming && <Badge>Streaming</Badge>}
              {m.supports?.vision && <Badge>Vision</Badge>}
              {m.supports?.functionCalling && <Badge>Functions</Badge>}
              {(m.tags || []).map((t) => (
                <Badge key={t}>#{t}</Badge>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-xl border bg-card p-6 shadow-lg text-card-foreground"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <button
                className="absolute right-4 top-4 rounded-md bg-muted px-2 py-1 text-sm hover:bg-muted-foreground/20"
                onClick={() => setSelected(null)}
              >
                Close ✕
              </button>

              <h3 className="text-xl font-semibold mb-2">{selected.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selected.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Provider</div>
                  <div>{selected.provider || "—"}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Family</div>
                  <div>{selected.family || "—"}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Input</div>
                  <div>{formatPrice(selected.inputPricePer1KTokensUSD)}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Output</div>
                  <div>{formatPrice(selected.outputPricePer1KTokensUSD)}</div>
                </div>
              </div>

              {selected.meta && (
                <div className="mt-4 text-sm">
                  <h4 className="font-medium mb-1">Additional Metadata</h4>
                  <div className="space-y-1">
                    {Object.entries(selected.meta).map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="w-32 text-muted-foreground">{k}:</span>
                        <span>{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


code.demo.1758547125079.tsx

import { AiModelsList } from "@/components/ui/ai-models-preview";

export default function DemoOne() {
  return (
    <div class="h-">
    
  <AiModelsList
      models={[
        {
          id: "gpt-4o",
          name: "GPT-4o",
          provider: "OpenAI",
          family: "GPT-4",
          version: "2024-08-06",
          description: "Multimodal flagship model with strong reasoning.",
          contextWindowTokens: 128000,
          inputPricePer1KTokensUSD: 0.005,
          outputPricePer1KTokensUSD: 0.015,
          supports: { vision: true, streaming: true, functionCalling: true },
          tags: ["general", "multimodal"],
          meta: { latencyMsP50: 320 },
        },
        {
          id: "claude-3-opus",
          name: "Claude 3 Opus",
          provider: "Anthropic",
          family: "Claude 3",
          description: "High reasoning performance for complex tasks.",
          contextWindowTokens: 200000,
          inputPricePer1KTokensUSD: 0.015,
          outputPricePer1KTokensUSD: 0.075,
          supports: { streaming: true },
        },
        {
          id: "gemini-1.5-pro",
          name: "Gemini 1.5 Pro",
          provider: "Google",
          family: "Gemini",
          description: "State-of-the-art multimodal reasoning and search.",
          contextWindowTokens: 1000000,
          inputPricePer1KTokensUSD: 0.01,
          outputPricePer1KTokensUSD: 0.03,
          supports: { vision: true, toolUse: true },
        },
        {
          id: "mistral-large",
          name: "Mistral Large",
          provider: "Mistral",
          description: "Efficient and cost-effective model with open weights.",
          inputPricePer1KTokensUSD: 0.002,
          outputPricePer1KTokensUSD: 0.006,
          tags: ["open-weight", "fast"],
        },
        {
          id: "llama-3.1-70b",
          name: "LLaMA 3.1 70B",
          provider: "Meta",
          family: "LLaMA",
          description: "Open-weight with high accuracy across benchmarks.",
          contextWindowTokens: 128000,
          inputPricePer1KTokensUSD: 0.002,
          outputPricePer1KTokensUSD: 0.004,
        },
        {
          id: "mixtral-8x7b",
          name: "Mixtral 8x7B",
          provider: "Mistral",
          description: "Sparse mixture of experts, balanced speed and quality.",
          tags: ["smol", "sparse"],
        },
      ]}
    />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ai-models-preview.tsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AiModel = {
  id: string;
  name: string;
  provider?: string;
  family?: string;
  version?: string;
  description?: string;
  contextWindowTokens?: number;
  inputPricePer1KTokensUSD?: number;
  outputPricePer1KTokensUSD?: number;
  supports?: {
    vision?: boolean;
    functionCalling?: boolean;
    toolUse?: boolean;
    streaming?: boolean;
    jsonMode?: boolean;
    audioIn?: boolean;
    audioOut?: boolean;
  };
  tags?: string[];
  meta?: Record<string, unknown>;
};

type Props = {
  models: AiModel[];
  className?: string;
};

export const AiModelsList: React.FC<Props> = ({ models, className = "" }) => {
  const [selected, setSelected] = useState<AiModel | null>(null);

  const sorted = useMemo(() => {
    return [...models].sort((a, b) => {
      return (a.provider || "").localeCompare(b.provider || "");
    });
  }, [models]);

  const formatPrice = (n?: number) =>
    typeof n === "number" ? `$${n.toFixed(4)} / 1K tok` : "—";

  const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
      {children}
    </span>
  );

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <h2 className="text-2xl font-semibold text-foreground mb-4">AI Models</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((m) => (
          <motion.li
            key={m.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition"
            onClick={() => setSelected(m)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{m.name}</span>
              {m.version && <Badge>v{m.version}</Badge>}
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {m.description || "No description available"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {m.supports?.streaming && <Badge>Streaming</Badge>}
              {m.supports?.vision && <Badge>Vision</Badge>}
              {m.supports?.functionCalling && <Badge>Functions</Badge>}
              {(m.tags || []).map((t) => (
                <Badge key={t}>#{t}</Badge>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-xl border bg-card p-6 shadow-lg text-card-foreground"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <button
                className="absolute right-4 top-4 rounded-md bg-muted px-2 py-1 text-sm hover:bg-muted-foreground/20"
                onClick={() => setSelected(null)}
              >
                Close ✕
              </button>

              <h3 className="text-xl font-semibold mb-2">{selected.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selected.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Provider</div>
                  <div>{selected.provider || "—"}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Family</div>
                  <div>{selected.family || "—"}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Input</div>
                  <div>{formatPrice(selected.inputPricePer1KTokensUSD)}</div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="text-xs text-muted-foreground">Output</div>
                  <div>{formatPrice(selected.outputPricePer1KTokensUSD)}</div>
                </div>
              </div>

              {selected.meta && (
                <div className="mt-4 text-sm">
                  <h4 className="font-medium mb-1">Additional Metadata</h4>
                  <div className="space-y-1">
                    {Object.entries(selected.meta).map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="w-32 text-muted-foreground">{k}:</span>
                        <span>{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

```

Install NPM dependencies:
```bash
framer-motion
```

Implementation Guidelines
1. Analyze the component structure and identify all required dependencies
2. Review the component's argumens and state
3. Identify any required context providers or hooks and install them
4. Questions to Ask
- What data/props will be passed to this component?
- Are there any specific state management requirements?
- Are there any required assets (images, icons, etc.)?
- What is the expected responsive behavior?
- What is the best place to use this component in the app?

Steps to integrate
0. Copy paste all the code above in the correct directories
1. Install external dependencies
2. Fill image assets with Unsplash stock images you know exist
3. Use lucide-react icons for svgs or logos if component requires them

Remember: Do not change the component's code unless it's required to integrate or the user asks you to.
IMPORTANT: Create all mentioned files in full, without abbreviations. Do not use placeholders like "insert the rest of the code here" – output every line of code exactly as it is, so it can be copied and pasted directly into the project.
