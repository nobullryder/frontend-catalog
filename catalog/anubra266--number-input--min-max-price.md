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
number-input.tsx
"use client";

import { NumberInput } from "@ark-ui/react/number-input";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Basic() {
  return (
    <div className="flex items-center justify-center min-h-32">
      <NumberInput.Root className="w-64">
        <NumberInput.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Number
        </NumberInput.Label>
        <NumberInput.Control className="border border-gray-200 dark:border-gray-700 rounded-lg h-9 overflow-hidden grid grid-cols-[1fr_24px] grid-rows-2 focus-within:ring-2 focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/50 focus-within:border-blue-500/50 dark:focus-within:border-blue-400/50 transition-all">
          <NumberInput.Input className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium px-3 py-1 row-span-2 border-none outline-hidden focus:outline-hidden focus-visible:outline-hidden" />
          <NumberInput.IncrementTrigger className="flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer border-l border-gray-200 dark:border-gray-700">
            <ChevronUp className="w-3 h-3" />
          </NumberInput.IncrementTrigger>
          <NumberInput.DecrementTrigger className="flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer border-l border-t border-gray-200 dark:border-gray-700">
            <ChevronDown className="w-3 h-3" />
          </NumberInput.DecrementTrigger>
        </NumberInput.Control>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Enter number
        </div>
      </NumberInput.Root>
    </div>
  );
}


code.demo.1756330499545.tsx
"use client";

import { NumberInput } from "@ark-ui/react/number-input";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function MinMax() {
  return (
    <div className="flex items-center justify-center min-h-32">
      <NumberInput.Root
        defaultValue="5"
        min={0}
        max={10}
        step={1}
        clampValueOnBlur={true}
        className="w-64"
      >
        <NumberInput.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Rating (0-10)
        </NumberInput.Label>
        <NumberInput.Control className="border border-gray-200 dark:border-gray-700 rounded-lg h-9 overflow-hidden grid grid-cols-[1fr_24px] grid-rows-2 focus-within:ring-2 focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/50 focus-within:border-blue-500/50 dark:focus-within:border-blue-400/50 transition-all">
          <NumberInput.Input className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium px-3 py-1 row-span-2 border-none outline-hidden focus:outline-hidden focus-visible:outline-hidden" />
          <NumberInput.IncrementTrigger className="flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer border-l border-gray-200 dark:border-gray-700 data-disabled:opacity-50 data-disabled:cursor-not-allowed">
            <ChevronUp className="w-3 h-3" />
          </NumberInput.IncrementTrigger>
          <NumberInput.DecrementTrigger className="flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer border-l border-t border-gray-200 dark:border-gray-700 data-disabled:opacity-50 data-disabled:cursor-not-allowed">
            <ChevronDown className="w-3 h-3" />
          </NumberInput.DecrementTrigger>
        </NumberInput.Control>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
          <span>Min: 0</span>
          <span>Max: 10</span>
        </div>
      </NumberInput.Root>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/number-input.tsx
"use client";

import { NumberInput } from "@ark-ui/react/number-input";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function Basic() {
  return (
    <div className="flex items-center justify-center min-h-32">
      <NumberInput.Root className="w-64">
        <NumberInput.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Number
        </NumberInput.Label>
        <NumberInput.Control className="border border-gray-200 dark:border-gray-700 rounded-lg h-9 overflow-hidden grid grid-cols-[1fr_24px] grid-rows-2 focus-within:ring-2 focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/50 focus-within:border-blue-500/50 dark:focus-within:border-blue-400/50 transition-all">
          <NumberInput.Input className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-medium px-3 py-1 row-span-2 border-none outline-hidden focus:outline-hidden focus-visible:outline-hidden" />
          <NumberInput.IncrementTrigger className="flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer border-l border-gray-200 dark:border-gray-700">
            <ChevronUp className="w-3 h-3" />
          </NumberInput.IncrementTrigger>
          <NumberInput.DecrementTrigger className="flex items-center justify-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer border-l border-t border-gray-200 dark:border-gray-700">
            <ChevronDown className="w-3 h-3" />
          </NumberInput.DecrementTrigger>
        </NumberInput.Control>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Enter number
        </div>
      </NumberInput.Root>
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
