# 21st.dev Prompt Catalog Builder

This repository is a catalog of 21st.dev components for people building skills for their agents to use frontend components.

The included builder script exports the public 21st.dev community component prompts into a local catalog plus a machine-readable manifest.

It:

- paginates `https://21st.dev/community/components`
- fetches each component's public registry payload from `https://21st.dev/r/<username>/<slug>`
- fetches the demo usage file
- recreates the `Copy Prompt` text locally
- writes one `.md` file per component and a machine-readable `manifest.json` beside the catalog directory

## Usage

```bash
npm run build-catalog
```

Useful options:

```bash
npm run build-catalog -- --limit 10
npm run build-catalog -- --out-dir ./catalog
npm run build-catalog -- --prompt-type extended
npm run build-catalog -- --prompt-type claude-code
npm run build-catalog -- --concurrency 4
```

Supported prompt types:

- `extended` (default, matches Cursor / any AI IDE)
- `bolt`
- `claude-code`
- `lovable`
- `replit`
- `v0`

## Output

The script writes:

- one markdown prompt file per component
- `manifest.json` beside the output directory as the only catalog index
- `failures.json` if any components could not be exported

Default output directory: `./catalog`
