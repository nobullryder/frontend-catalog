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
"use client";

import { Listbox, createListCollection } from "@ark-ui/react/listbox";
import { Check, AlertCircle, Circle, ArrowUp, ArrowDown } from "lucide-react";

export default function PriorityLevels() {
  const collection = createListCollection({
    items: [
      {
        name: "Critical",
        value: "critical",
        color: "red",
        icon: AlertCircle,
        description: "Needs immediate attention",
      },
      {
        name: "High",
        value: "high",
        color: "orange",
        icon: ArrowUp,
        description: "Important and urgent",
      },
      {
        name: "Medium",
        value: "medium",
        color: "yellow",
        icon: Circle,
        description: "Standard priority",
      },
      {
        name: "Low",
        value: "low",
        color: "green",
        icon: ArrowDown,
        description: "Can be done later",
      },
    ],
  });

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      case "orange":
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20";
      case "yellow":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "green":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-32">
      <Listbox.Root
        collection={collection}
        defaultValue={["medium"]}
        className="[--listbox-bg:#ffffff] dark:[--listbox-bg:#111827] [--listbox-border:#e5e7eb] dark:[--listbox-border:#374151]"
      >
        <Listbox.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Task Priority
        </Listbox.Label>
        <Listbox.Content className="bg-(--listbox-bg) border border-(--listbox-border) rounded-lg px-1 py-2 w-80 shadow-lg">
          {collection.items.map((priority) => {
            const Icon = priority.icon;
            return (
              <Listbox.Item
                key={priority.value}
                item={priority}
                className="flex items-center justify-between px-3 py-3 mx-1 rounded-md cursor-pointer text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(
                      priority.color
                    )}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <Listbox.ItemText className="flex-1">
                    <div className="flex flex-col">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {priority.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                        {priority.description}
                      </span>
                    </div>
                  </Listbox.ItemText>
                </div>
                <Listbox.ItemIndicator>
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </Listbox.ItemIndicator>
              </Listbox.Item>
            );
          })}
        </Listbox.Content>
      </Listbox.Root>
    </div>
  );
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
