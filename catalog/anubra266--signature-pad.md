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
signature-pad.tsx
"use client";

import { SignaturePad } from "@ark-ui/react/signature-pad";

export default function BasicSignaturePad() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-md w-full">
        <SignaturePad.Root>
          <SignaturePad.Label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Sign below
          </SignaturePad.Label>
          <SignaturePad.Control className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <SignaturePad.Segment className="w-full h-full stroke-gray-900 dark:stroke-gray-100 fill-gray-900 dark:fill-gray-100" />
            <SignaturePad.ClearTrigger className="absolute top-2 right-2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              Clear
            </SignaturePad.ClearTrigger>
            <SignaturePad.Guide className="absolute bottom-4 left-2 right-2 border-b border-dashed border-gray-400 dark:border-gray-500" />
          </SignaturePad.Control>
        </SignaturePad.Root>
      </div>
    </div>
  );
}


code.demo.1756191359488.tsx
import BasicSignaturePad from "@/components/ui/signature-pad";

export default function DemoOne() {
  return <BasicSignaturePad />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/signature-pad.tsx
"use client";

import { SignaturePad } from "@ark-ui/react/signature-pad";

export default function BasicSignaturePad() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-md w-full">
        <SignaturePad.Root>
          <SignaturePad.Label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Sign below
          </SignaturePad.Label>
          <SignaturePad.Control className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <SignaturePad.Segment className="w-full h-full stroke-gray-900 dark:stroke-gray-100 fill-gray-900 dark:fill-gray-100" />
            <SignaturePad.ClearTrigger className="absolute top-2 right-2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              Clear
            </SignaturePad.ClearTrigger>
            <SignaturePad.Guide className="absolute bottom-4 left-2 right-2 border-b border-dashed border-gray-400 dark:border-gray-500" />
          </SignaturePad.Control>
        </SignaturePad.Root>
      </div>
    </div>
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
