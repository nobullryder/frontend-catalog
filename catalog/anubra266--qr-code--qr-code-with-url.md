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
qr-code.tsx
"use client";

import { QrCode } from "@ark-ui/react/qr-code";

export default function Basic() {
  return (
    <QrCode.Root
      value="https://tarkui.com"
      className="flex items-center justify-center"
    >
      <QrCode.Frame className="w-32 h-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
        <QrCode.Pattern className="fill-gray-900 dark:fill-white" />
      </QrCode.Frame>
    </QrCode.Root>
  );
}


code.demo.1756195849810.tsx
"use client";

import { QrCode } from "@ark-ui/react/qr-code";
import { Globe, ExternalLink } from "lucide-react";

export default function ForUrl() {
  const url = "https://tarkui.com/";

  return (
    <div className="flex flex-col items-center space-y-6 max-w-sm mx-auto">
      <div className="text-center space-y-2">
        <Globe className="w-8 h-8 text-blue-600 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Share Website
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Scan to visit our documentation
        </p>
      </div>

      <QrCode.Root value={url} encoding={{ ecc: "M" }}>
        <QrCode.Frame className="w-48 h-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg">
          <QrCode.Pattern className="fill-gray-900 dark:fill-white" />
        </QrCode.Frame>
      </QrCode.Root>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ExternalLink className="w-4 h-4" />
          <span className="font-mono break-all">{url}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Point your camera at the QR code to open the link
        </p>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/qr-code.tsx
"use client";

import { QrCode } from "@ark-ui/react/qr-code";

export default function Basic() {
  return (
    <QrCode.Root
      value="https://tarkui.com"
      className="flex items-center justify-center"
    >
      <QrCode.Frame className="w-32 h-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
        <QrCode.Pattern className="fill-gray-900 dark:fill-white" />
      </QrCode.Frame>
    </QrCode.Root>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react
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
