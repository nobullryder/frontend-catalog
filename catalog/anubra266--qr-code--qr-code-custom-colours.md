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

export default function CustomColors() {
  const colorSchemes = [
    {
      bg: "bg-white dark:bg-blue-900",
      pattern: "fill-blue-600 dark:fill-blue-300",
      label: "Blue",
      border: "border-blue-200 dark:border-blue-700",
    },
    {
      bg: "bg-green-50 dark:bg-green-900",
      pattern: "fill-green-700 dark:fill-green-300",
      label: "Green",
      border: "border-green-200 dark:border-green-700",
    },
    {
      bg: "bg-purple-50 dark:bg-purple-900",
      pattern: "fill-purple-700 dark:fill-purple-300",
      label: "Purple",
      border: "border-purple-200 dark:border-purple-700",
    },
    {
      bg: "bg-gray-900 dark:bg-gray-100",
      pattern: "fill-white dark:fill-gray-900",
      label: "Inverted",
      border: "border-gray-700 dark:border-gray-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {colorSchemes.map(({ bg, pattern, label, border }) => (
        <div key={label} className="flex flex-col items-center space-y-3">
          <QrCode.Root value="https://tarkui.com">
            <QrCode.Frame
              className={`w-32 h-32 ${bg} border ${border} rounded-lg p-3`}
            >
              <QrCode.Pattern className={pattern} />
            </QrCode.Frame>
          </QrCode.Root>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        </div>
      ))}
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
