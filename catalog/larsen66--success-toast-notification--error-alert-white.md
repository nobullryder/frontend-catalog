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
success-toast-notification.tsx
"use client";

import React from "react";


export default function Example() {
    return (
        <div className="bg-white inline-flex space-x-3 p-3 text-sm rounded border border-gray-300/60">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 8.31V9a7.5 7.5 0 1 1-4.447-6.855M16.5 3 9 10.508l-2.25-2.25" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
                <h3 className="text-gray-700 font-medium">Successfully saved!</h3>
                <p className="text-gray-500">Anyone with a link can now view this file.</p>
            </div>
            <button type="button" aria-label="close" className="inline-flex active:scale-95 transition">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="#7d838b" fillOpacity=".7"/>
                    <rect x="12.531" y="13.914" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.531 13.914)" fill="#7d838b" fillOpacity=".7"/>
                </svg>
            </button>
        </div>
    );
};

code.demo.1757088244807.tsx
"use client";

import React from "react";

export default function Example() {
  return (
    <div className="flex items-center justify-between text-blue-600 max-w-80 w-full bg-blue-600/10 h-10 shadow">
      <div className="h-full w-1.5 bg-blue-600"></div>
      <div className="flex items-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon line"
        >
          <path
            style={{
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 1.95,
            }}
            d="M11.95 16.5h.1"
          />
          <path
            d="M3 12a9 9 0 0 1 9-9h0a9 9 0 0 1 9 9h0a9 9 0 0 1-9 9h0a9 9 0 0 1-9-9m9 0V7"
            style={{
              fill: "none",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 1.5,
            }}
          />
        </svg>
        <p className="text-sm ml-2">Success! Your task is fully completed.</p>
      </div>
      <button
        type="button"
        aria-label="close"
        className="active:scale-90 transition-all mr-3"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/success-toast-notification.tsx
"use client";

import React from "react";


export default function Example() {
    return (
        <div className="bg-white inline-flex space-x-3 p-3 text-sm rounded border border-gray-300/60">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 8.31V9a7.5 7.5 0 1 1-4.447-6.855M16.5 3 9 10.508l-2.25-2.25" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
                <h3 className="text-gray-700 font-medium">Successfully saved!</h3>
                <p className="text-gray-500">Anyone with a link can now view this file.</p>
            </div>
            <button type="button" aria-label="close" className="inline-flex active:scale-95 transition">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="#7d838b" fillOpacity=".7"/>
                    <rect x="12.531" y="13.914" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.531 13.914)" fill="#7d838b" fillOpacity=".7"/>
                </svg>
            </button>
        </div>
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
