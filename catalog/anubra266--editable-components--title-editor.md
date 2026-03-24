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
import { Type, Edit3, Check, X } from "lucide-react";
import { useState } from "react";

export default function TitleEditor() {
  const [value, setValue] = useState(
    "The Future of Web Development: Trends and Technologies"
  );
  const maxLength = 100;
  const remainingChars = maxLength - value.length;

  const handleValueChange = (details: { value: string }) => {
    if (details.value.length <= maxLength) {
      setValue(details.value);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <Type className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Article Title
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create an engaging title for your content
            </p>
          </div>
        </div>

        <Editable.Root
          value={value}
          onValueChange={handleValueChange}
          maxLength={maxLength}
          placeholder="Enter your article title..."
          autoResize
        >
          <div className="flex items-center justify-between mb-3">
            <Editable.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </Editable.Label>
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
              <span
                className={
                  remainingChars < 10
                    ? "text-orange-500 dark:text-orange-400"
                    : ""
                }
              >
                {remainingChars} characters remaining
              </span>
              <Editable.Context>
                {(editable) => (
                  <Editable.Control className="flex items-center space-x-1">
                    {editable.editing ? (
                      <>
                        <Editable.SubmitTrigger className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors">
                          <Check className="h-3 w-3" />
                        </Editable.SubmitTrigger>
                        <Editable.CancelTrigger className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                          <X className="h-3 w-3" />
                        </Editable.CancelTrigger>
                      </>
                    ) : (
                      <Editable.EditTrigger className="p-1 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                        <Edit3 className="h-3 w-3" />
                      </Editable.EditTrigger>
                    )}
                  </Editable.Control>
                )}
              </Editable.Context>
            </div>
          </div>

          <Editable.Area>
            <Editable.Input className="w-full px-4 py-3 text-xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors resize-none min-h-14" />
            <Editable.Preview className="w-full px-4 py-3 text-xl font-bold border border-transparent rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-14 flex items-center" />
          </Editable.Area>

          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Title Preview
            </h4>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
              {value || "Your title will appear here..."}
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            💡 Click the title above to edit • Use a compelling title to engage
            your readers
          </div>
        </Editable.Root>
      </div>
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
