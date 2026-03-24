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
import TagsInputBasic from "@/components/ui/basic-tags-input";

export default function DemoOne() {
  return <TagsInputBasic />;
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
