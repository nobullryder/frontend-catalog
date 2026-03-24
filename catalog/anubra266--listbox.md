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
listbox.tsx
"use client";

import { Listbox, createListCollection } from "@ark-ui/react/listbox";
import { Check } from "lucide-react";

export default function Basic() {
  const collection = createListCollection({
    items: ["React", "Vue", "Angular", "Svelte", "Solid"],
  });

  return (
    <div className="flex items-center justify-center min-h-32">
      <Listbox.Root
        collection={collection}
        className="[--listbox-bg:#ffffff] dark:[--listbox-bg:#111827] [--listbox-border:#e5e7eb] dark:[--listbox-border:#374151]"
      >
        <Listbox.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Select your framework
        </Listbox.Label>
        <Listbox.Content className="bg-(--listbox-bg) border border-(--listbox-border) rounded-lg px-1 py-2 w-64 shadow-lg">
          {collection.items.map((item) => (
            <Listbox.Item
              key={item}
              item={item}
              className="flex items-center justify-between px-3 py-2 mx-1 rounded-md cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800 data-disabled:opacity-50 data-disabled:cursor-not-allowed transition-colors"
            >
              <Listbox.ItemText>{item}</Listbox.ItemText>
              <Listbox.ItemIndicator>
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Listbox.ItemIndicator>
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>
    </div>
  );
}


code.demo.1756337166684.tsx
import Basic from "@/components/ui/listbox";

export default function DemoOne() {
  return <Basic />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/listbox.tsx
"use client";

import { Listbox, createListCollection } from "@ark-ui/react/listbox";
import { Check } from "lucide-react";

export default function Basic() {
  const collection = createListCollection({
    items: ["React", "Vue", "Angular", "Svelte", "Solid"],
  });

  return (
    <div className="flex items-center justify-center min-h-32">
      <Listbox.Root
        collection={collection}
        className="[--listbox-bg:#ffffff] dark:[--listbox-bg:#111827] [--listbox-border:#e5e7eb] dark:[--listbox-border:#374151]"
      >
        <Listbox.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Select your framework
        </Listbox.Label>
        <Listbox.Content className="bg-(--listbox-bg) border border-(--listbox-border) rounded-lg px-1 py-2 w-64 shadow-lg">
          {collection.items.map((item) => (
            <Listbox.Item
              key={item}
              item={item}
              className="flex items-center justify-between px-3 py-2 mx-1 rounded-md cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800 data-disabled:opacity-50 data-disabled:cursor-not-allowed transition-colors"
            >
              <Listbox.ItemText>{item}</Listbox.ItemText>
              <Listbox.ItemIndicator>
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Listbox.ItemIndicator>
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>
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
