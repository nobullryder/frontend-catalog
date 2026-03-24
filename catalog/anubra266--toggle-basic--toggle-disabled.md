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
toggle-basic.tsx
"use client";

import { Toggle } from "@ark-ui/react/toggle";
import { Bold } from "lucide-react";

export default function ToggleBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Toggle.Root className="inline-flex items-center justify-center p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900/30 data-[state=on]:text-blue-700 dark:data-[state=on]:text-blue-300 data-[state=on]:border-blue-300 dark:data-[state=on]:border-blue-600 transition-all">
        <Bold className="w-4 h-4" />
      </Toggle.Root>
    </div>
  );
}


code.demo.1756144227740.tsx
"use client";

import { Toggle } from "@ark-ui/react/toggle";
import { Bold, Italic } from "lucide-react";

export default function ToggleDisabled() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center space-y-8">
      {/* Disabled in off state */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Disabled (Off)
        </label>
        <Toggle.Root
          disabled
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50 text-sm font-medium"
        >
          <Bold className="w-4 h-4" />
          Bold
        </Toggle.Root>
      </div>

      {/* Disabled in on state */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Disabled (On)
        </label>
        <Toggle.Root
          disabled
          defaultPressed
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-blue-300 dark:border-blue-600 bg-blue-100 dark:bg-blue-900/30 text-blue-400 dark:text-blue-400 cursor-not-allowed opacity-50 text-sm font-medium"
        >
          <Italic className="w-4 h-4" />
          Italic
        </Toggle.Root>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/toggle-basic.tsx
"use client";

import { Toggle } from "@ark-ui/react/toggle";
import { Bold } from "lucide-react";

export default function ToggleBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <Toggle.Root className="inline-flex items-center justify-center p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900/30 data-[state=on]:text-blue-700 dark:data-[state=on]:text-blue-300 data-[state=on]:border-blue-300 dark:data-[state=on]:border-blue-600 transition-all">
        <Bold className="w-4 h-4" />
      </Toggle.Root>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react, lucide-react
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
