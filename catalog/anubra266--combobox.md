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
combobox.tsx
"use client";

import { Combobox, useListCollection } from "@ark-ui/react/combobox";
import { useFilter } from "@ark-ui/react/locale";
import { Portal } from "@ark-ui/react/portal";
import { ChevronDownIcon, XIcon } from "lucide-react";

export default function BasicCombobox() {
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: ["React", "Solid", "Vue", "Svelte"],
    filter: contains,
  });

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue);
  };

  return (
    <div className="w-full max-w-sm">
      <Combobox.Root
        collection={collection}
        onInputValueChange={handleInputChange}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Framework
        </Combobox.Label>
        <Combobox.Control className="relative">
          <Combobox.Input
            className="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-md shadow-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            placeholder="Select a framework..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Combobox.ClearTrigger className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <XIcon className="h-4 w-4" />
            </Combobox.ClearTrigger>
            <Combobox.Trigger className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <ChevronDownIcon className="h-4 w-4" />
            </Combobox.Trigger>
          </div>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600 focus:outline-hidden z-50">
              <Combobox.ItemGroup>
                <Combobox.ItemGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Frameworks
                </Combobox.ItemGroupLabel>
                {collection.items.map((item) => (
                  <Combobox.Item
                    key={item}
                    item={item}
                    className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 data-highlighted:bg-gray-50 dark:data-highlighted:bg-gray-700 transition-colors"
                  >
                    <Combobox.ItemText className="block truncate">
                      {item}
                    </Combobox.ItemText>
                    <Combobox.ItemIndicator className="absolute inset-y-0 pr-3 text-blue-600 dark:text-blue-400">
                      ✓
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </div>
  );
}


code.demo.1756376835475.tsx
import BasicCombobox from "@/components/ui/combobox";

export default function DemoOne() {
  return <BasicCombobox />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/combobox.tsx
"use client";

import { Combobox, useListCollection } from "@ark-ui/react/combobox";
import { useFilter } from "@ark-ui/react/locale";
import { Portal } from "@ark-ui/react/portal";
import { ChevronDownIcon, XIcon } from "lucide-react";

export default function BasicCombobox() {
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: ["React", "Solid", "Vue", "Svelte"],
    filter: contains,
  });

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue);
  };

  return (
    <div className="w-full max-w-sm">
      <Combobox.Root
        collection={collection}
        onInputValueChange={handleInputChange}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Framework
        </Combobox.Label>
        <Combobox.Control className="relative">
          <Combobox.Input
            className="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-md shadow-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
            placeholder="Select a framework..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Combobox.ClearTrigger className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <XIcon className="h-4 w-4" />
            </Combobox.ClearTrigger>
            <Combobox.Trigger className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <ChevronDownIcon className="h-4 w-4" />
            </Combobox.Trigger>
          </div>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600 focus:outline-hidden z-50">
              <Combobox.ItemGroup>
                <Combobox.ItemGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Frameworks
                </Combobox.ItemGroupLabel>
                {collection.items.map((item) => (
                  <Combobox.Item
                    key={item}
                    item={item}
                    className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 data-highlighted:bg-gray-50 dark:data-highlighted:bg-gray-700 transition-colors"
                  >
                    <Combobox.ItemText className="block truncate">
                      {item}
                    </Combobox.ItemText>
                    <Combobox.ItemIndicator className="absolute inset-y-0 pr-3 text-blue-600 dark:text-blue-400">
                      ✓
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
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
