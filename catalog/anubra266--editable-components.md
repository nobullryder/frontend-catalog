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
editable-components.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";

export default function Basic() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Editable.Root
        placeholder="Enter some text..."
        defaultValue="Click to edit"
      >
        <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Basic Editable
        </Editable.Label>
        <Editable.Area className="relative">
          <Editable.Input className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10" />
          <Editable.Preview className="w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10" />
        </Editable.Area>
      </Editable.Root>
    </div>
  );
}


code.demo.1756369082386.tsx
import Basic from "@/components/ui/editable-components";

export default function DemoOne() {
  return <Basic />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/editable-components.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";

export default function Basic() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Editable.Root
        placeholder="Enter some text..."
        defaultValue="Click to edit"
      >
        <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Basic Editable
        </Editable.Label>
        <Editable.Area className="relative">
          <Editable.Input className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10" />
          <Editable.Preview className="w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10" />
        </Editable.Area>
      </Editable.Root>
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
