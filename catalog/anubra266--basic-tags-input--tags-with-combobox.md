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
basic-tags-input.tsx
"use client";

import { TagsInput } from "@ark-ui/react/tags-input";
import { X } from "lucide-react";

export default function TagsInputBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <TagsInput.Root
        defaultValue={["React", "Vue", "Svelte"]}
        className="w-full max-w-md"
      >
        <TagsInput.Context>
          {(tagsInput) => (
            <>
              <TagsInput.Label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Frameworks
              </TagsInput.Label>
              <TagsInput.Control className="flex flex-wrap gap-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 min-h-8 focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/50 focus-within:border-blue-500 dark:focus-within:border-blue-400">
                {tagsInput.value.map((value, index) => (
                  <TagsInput.Item
                    key={index}
                    index={index}
                    value={value}
                    className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs dark:bg-gray-700 dark:text-gray-200"
                  >
                    <TagsInput.ItemPreview className="flex items-center gap-1">
                      <TagsInput.ItemText>{value}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger className="flex items-center justify-center w-3 h-3 hover:bg-gray-200 rounded transition-colors dark:hover:bg-gray-600">
                        <X className="w-2 h-2" />
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput className="bg-transparent border-none outline-none text-xs" />
                  </TagsInput.Item>
                ))}
                <TagsInput.Input
                  placeholder="Add Framework"
                  className="flex-1 min-w-[80px] bg-transparent border-none outline-none text-xs text-gray-900 placeholder-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </TagsInput.Control>
              {tagsInput.value.length > 0 && (
                <TagsInput.ClearTrigger className="mt-1 text-xs text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200">
                  Clear all
                </TagsInput.ClearTrigger>
              )}
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </div>
  );
}


code.demo.1756149501174.tsx
"use client";

import {
  Combobox,
  useCombobox,
  useListCollection,
} from "@ark-ui/react/combobox";
import { useFilter } from "@ark-ui/react/locale";
import { Portal } from "@ark-ui/react/portal";
import { TagsInput, useTagsInput } from "@ark-ui/react/tags-input";
import { ChevronDown, X } from "lucide-react";

const availableFrameworks = [
  "React",
  "Vue",
  "Svelte",
  "Angular",
  "Next.js",
  "Nuxt.js",
  "SvelteKit",
  "Solid.js",
  "Qwik",
  "Astro",
];

export default function TagsInputWithCombobox() {
  const tagsInput = useTagsInput({
    defaultValue: ["React"],
  });

  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: availableFrameworks,
    filter: contains,
  });

  const combobox = useCombobox({
    collection,
    closeOnSelect: false,
    onInputValueChange(details) {
      filter(details.inputValue);
    },
    onValueChange(details) {
      if (details.value.length > 0) {
        tagsInput.addValue(details.value[0]);
        combobox.clearValue();
      }
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <TagsInput.RootProvider value={tagsInput} className="w-full max-w-md">
        <Combobox.RootProvider value={combobox}>
          <>
            <TagsInput.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Frameworks
            </TagsInput.Label>
            <Combobox.Control className="relative">
              <TagsInput.Control className="flex flex-wrap gap-1 p-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-xs bg-white dark:bg-gray-800 min-h-10 focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/50 focus-within:border-blue-500 dark:focus-within:border-blue-400">
                {tagsInput.value.map((value, index) => (
                  <TagsInput.Item
                    key={index}
                    index={index}
                    value={value}
                    className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs dark:bg-gray-700 dark:text-gray-200"
                  >
                    <TagsInput.ItemPreview className="flex items-center gap-1">
                      <TagsInput.ItemText>{value}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger className="flex items-center justify-center w-3 h-3 hover:bg-gray-200 rounded transition-colors dark:hover:bg-gray-600">
                        <X className="w-2 h-2" />
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput className="bg-transparent border-none outline-none text-xs" />
                  </TagsInput.Item>
                ))}
                <Combobox.Input
                  placeholder="Add framework..."
                  className="flex-1 min-w-[80px] bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </TagsInput.Control>
              <Combobox.Trigger className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors absolute inset-y-0 right-0">
                <ChevronDown className="h-4 w-4" />
              </Combobox.Trigger>
            </Combobox.Control>
            {tagsInput.value.length > 0 && (
              <TagsInput.ClearTrigger className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200">
                Clear all
              </TagsInput.ClearTrigger>
            )}

            <Portal>
              <Combobox.Positioner>
                <Combobox.Content className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600 focus:outline-hidden z-50">
                  {collection.items
                    .filter((item) => !tagsInput.value.includes(item))
                    .map((item) => (
                      <Combobox.Item
                        key={item}
                        item={item}
                        className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 data-highlighted:bg-gray-50 dark:data-highlighted:bg-gray-700 transition-colors"
                      >
                        <Combobox.ItemText className="block truncate">
                          {item}
                        </Combobox.ItemText>
                        <Combobox.ItemIndicator className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 dark:text-blue-400">
                          ✓
                        </Combobox.ItemIndicator>
                      </Combobox.Item>
                    ))}
                  {collection.items.filter(
                    (item) => !tagsInput.value.includes(item)
                  ).length === 0 && (
                    <div className="py-2 pl-3 pr-9 text-sm text-gray-500 dark:text-gray-400">
                      No available options
                    </div>
                  )}
                </Combobox.Content>
              </Combobox.Positioner>
            </Portal>
          </>
        </Combobox.RootProvider>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/basic-tags-input.tsx
"use client";

import { TagsInput } from "@ark-ui/react/tags-input";
import { X } from "lucide-react";

export default function TagsInputBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <TagsInput.Root
        defaultValue={["React", "Vue", "Svelte"]}
        className="w-full max-w-md"
      >
        <TagsInput.Context>
          {(tagsInput) => (
            <>
              <TagsInput.Label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Frameworks
              </TagsInput.Label>
              <TagsInput.Control className="flex flex-wrap gap-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 min-h-8 focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-500/50 dark:focus-within:ring-blue-400/50 focus-within:border-blue-500 dark:focus-within:border-blue-400">
                {tagsInput.value.map((value, index) => (
                  <TagsInput.Item
                    key={index}
                    index={index}
                    value={value}
                    className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs dark:bg-gray-700 dark:text-gray-200"
                  >
                    <TagsInput.ItemPreview className="flex items-center gap-1">
                      <TagsInput.ItemText>{value}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger className="flex items-center justify-center w-3 h-3 hover:bg-gray-200 rounded transition-colors dark:hover:bg-gray-600">
                        <X className="w-2 h-2" />
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput className="bg-transparent border-none outline-none text-xs" />
                  </TagsInput.Item>
                ))}
                <TagsInput.Input
                  placeholder="Add Framework"
                  className="flex-1 min-w-[80px] bg-transparent border-none outline-none text-xs text-gray-900 placeholder-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </TagsInput.Control>
              {tagsInput.value.length > 0 && (
                <TagsInput.ClearTrigger className="mt-1 text-xs text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200">
                  Clear all
                </TagsInput.ClearTrigger>
              )}
            </>
          )}
        </TagsInput.Context>
        <TagsInput.HiddenInput />
      </TagsInput.Root>
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
