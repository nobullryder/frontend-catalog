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
segment-group.tsx
"use client";

import { SegmentGroup } from "@ark-ui/react/segment-group";

export default function BasicSegmentGroup() {
  const frameworks = ["React", "Solid", "Svelte", "Vue"];

  return (
    <div className="max-w-sm w-full">
      <SegmentGroup.Root
        orientation="horizontal"
        className="flex gap-0.5 bg-gray-100 dark:bg-gray-900 relative p-1 rounded-lg"
      >
        <SegmentGroup.Indicator className="bg-white dark:bg-gray-800 z-10 rounded-md shadow-sm h-(--height) w-(--width) transition-all duration-200" />
        {frameworks.map((framework) => (
          <SegmentGroup.Item
            key={framework}
            value={framework}
            className="flex flex-1 items-center justify-center select-none cursor-pointer text-sm font-medium px-4 py-2 z-20 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white data-[state=checked]:text-gray-900 dark:data-[state=checked]:text-white data-disabled:cursor-not-allowed data-disabled:opacity-40 transition-colors duration-200"
          >
            <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.Root>
    </div>
  );
}


code.demo.1756194930850.tsx
"use client";

import { SegmentGroup } from "@ark-ui/react/segment-group";
import { GridIcon, ListIcon, ColumnsIcon } from "lucide-react";
import { useState } from "react";

export default function ViewModeSelector() {
  const [viewMode, setViewMode] = useState<string>("grid");

  const viewModes = [
    { value: "grid", label: "Grid", icon: GridIcon },
    { value: "list", label: "List", icon: ListIcon },
    { value: "columns", label: "Columns", icon: ColumnsIcon },
  ];

  return (
    <div className="max-w-sm w-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          View Options
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Select your preferred layout
        </p>
      </div>

      <div className="p-4">
        <SegmentGroup.Root
          value={viewMode}
          onValueChange={(e) => setViewMode(e.value || "grid")}
          orientation="vertical"
          className="flex items-start flex-col gap-1 border-l border-gray-200 dark:border-gray-700"
        >
          <SegmentGroup.Indicator className="border-blue-500 border-l-2 transform -translate-x-px h-(--height) transition-all duration-200" />
          {viewModes.map((mode) => (
            <SegmentGroup.Item
              key={mode.value}
              value={mode.value}
              className="text-gray-600 dark:text-gray-400 cursor-pointer font-medium transition-colors duration-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 data-[state=checked]:font-semibold data-[state=checked]:text-gray-900 dark:data-[state=checked]:text-white data-disabled:text-gray-300 dark:data-disabled:text-gray-600 data-disabled:cursor-not-allowed"
            >
              <SegmentGroup.ItemText className="flex items-center space-x-2">
                <mode.icon className="w-4 h-4" />
                <span>{mode.label}</span>
              </SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          ))}
        </SegmentGroup.Root>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Current view:{" "}
            <span className="font-medium capitalize">{viewMode}</span>
          </span>
          <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/segment-group.tsx
"use client";

import { SegmentGroup } from "@ark-ui/react/segment-group";

export default function BasicSegmentGroup() {
  const frameworks = ["React", "Solid", "Svelte", "Vue"];

  return (
    <div className="max-w-sm w-full">
      <SegmentGroup.Root
        orientation="horizontal"
        className="flex gap-0.5 bg-gray-100 dark:bg-gray-900 relative p-1 rounded-lg"
      >
        <SegmentGroup.Indicator className="bg-white dark:bg-gray-800 z-10 rounded-md shadow-sm h-(--height) w-(--width) transition-all duration-200" />
        {frameworks.map((framework) => (
          <SegmentGroup.Item
            key={framework}
            value={framework}
            className="flex flex-1 items-center justify-center select-none cursor-pointer text-sm font-medium px-4 py-2 z-20 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white data-[state=checked]:text-gray-900 dark:data-[state=checked]:text-white data-disabled:cursor-not-allowed data-disabled:opacity-40 transition-colors duration-200"
          >
            <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.Root>
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
