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
hover-button.tsx
"use client";

import { cn } from "@/lib/utils";

export const Component = () => {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center",
        "h-[56px] pl-6 pr-14 py-1 font-medium",
        "bg-neutral-900 text-neutral-50 overflow-hidden"
      )}
    >
      {/* Text label */}
      <span className="z-10 pr-2">Hover me</span>

      {/* Expanding background with arrow */}
      <div
        className={cn(
          "absolute right-1 flex h-12 w-12 items-center justify-end",
          "bg-neutral-700 transition-[width]",
          "group-hover:w-[calc(100%-8px)]"
        )}
      >
        <div className="mr-3.5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-50"
            viewBox="0 0 15 15"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.15 3.15a.5.5 0 0 1 .7 0l4 4a.5.5 0 0 1 0 .7l-4 4a.5.5 0 0 1-.7-.7L11.3 8H2.5a.5.5 0 0 1 0-1h8.8L8.15 3.85a.5.5 0 0 1 0-.7Z"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};


code.demo.1757835216283.tsx
import { Component } from "@/components/ui/hover-button";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-button.tsx
"use client";

import { cn } from "@/lib/utils";

export const Component = () => {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center",
        "h-[56px] pl-6 pr-14 py-1 font-medium",
        "bg-neutral-900 text-neutral-50 overflow-hidden"
      )}
    >
      {/* Text label */}
      <span className="z-10 pr-2">Hover me</span>

      {/* Expanding background with arrow */}
      <div
        className={cn(
          "absolute right-1 flex h-12 w-12 items-center justify-end",
          "bg-neutral-700 transition-[width]",
          "group-hover:w-[calc(100%-8px)]"
        )}
      >
        <div className="mr-3.5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-neutral-50"
            viewBox="0 0 15 15"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.15 3.15a.5.5 0 0 1 .7 0l4 4a.5.5 0 0 1 0 .7l-4 4a.5.5 0 0 1-.7-.7L11.3 8H2.5a.5.5 0 0 1 0-1h8.8L8.15 3.85a.5.5 0 0 1 0-.7Z"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

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
