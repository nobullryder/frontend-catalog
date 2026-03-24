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


code.demo.1756369082387.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";
import { Edit3, Check, X } from "lucide-react";

export default function WithControls() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Editable.Root placeholder="Enter your name..." defaultValue="John Doe">
        <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Display Name
        </Editable.Label>
        <div className="flex items-center space-x-2">
          <Editable.Area className="flex-1">
            <Editable.Input className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10" />
            <Editable.Preview className="w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10" />
          </Editable.Area>
          <Editable.Context>
            {(editable) => (
              <Editable.Control className="flex items-center space-x-1">
                {editable.editing ? (
                  <>
                    <Editable.SubmitTrigger className="p-1.5 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors">
                      <Check className="h-4 w-4" />
                    </Editable.SubmitTrigger>
                    <Editable.CancelTrigger className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                      <X className="h-4 w-4" />
                    </Editable.CancelTrigger>
                  </>
                ) : (
                  <Editable.EditTrigger className="p-1.5 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                    <Edit3 className="h-4 w-4" />
                  </Editable.EditTrigger>
                )}
              </Editable.Control>
            )}
          </Editable.Context>
        </div>
      </Editable.Root>
    </div>
  );
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
