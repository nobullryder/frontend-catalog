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
worm-loader.tsx
"use client";

import * as React from "react";

export const WormLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="128px"
        width="256px"
        viewBox="0 0 256 128"
        className="w-40 h-20"
      >
        <defs>
          <linearGradient y2={0} x2={1} y1={0} x1={0} id="grad1">
            <stop stopColor="#5ebd3e" offset="0%" />
            <stop stopColor="#ffb900" offset="33%" />
            <stop stopColor="#f78200" offset="67%" />
            <stop stopColor="#e23838" offset="100%" />
          </linearGradient>
          <linearGradient y2={0} x2={0} y1={0} x1={1} id="grad2">
            <stop stopColor="#e23838" offset="0%" />
            <stop stopColor="#973999" offset="33%" />
            <stop stopColor="#009cdf" offset="67%" />
            <stop stopColor="#5ebd3e" offset="100%" />
          </linearGradient>
        </defs>
        <g strokeWidth={16} strokeLinecap="round" fill="none">
          {/* Track (light & dark) */}
          <g className="stroke-gray-300 dark:stroke-gray-800 transition-colors">
            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
          </g>

          {/* Worms */}
          <g strokeDasharray="180 656">
            <path
              d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
              stroke="url(#grad1)"
              className="animate-worm1"
            />
            <path
              d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
              stroke="url(#grad2)"
              className="animate-worm2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};


code.demo.1759087667899.tsx
"use client";

import * as React from "react";
import { WormLoader } from "@/components/ui/worm-loader";

export default function WormLoaderDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center transition-colors">
      <div className="rounded-xl bg-white dark:bg-gray-800 border p-8">
        <WormLoader />
      </div>
    </div>
  ); 
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/worm-loader.tsx
"use client";

import * as React from "react";

export const WormLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="128px"
        width="256px"
        viewBox="0 0 256 128"
        className="w-40 h-20"
      >
        <defs>
          <linearGradient y2={0} x2={1} y1={0} x1={0} id="grad1">
            <stop stopColor="#5ebd3e" offset="0%" />
            <stop stopColor="#ffb900" offset="33%" />
            <stop stopColor="#f78200" offset="67%" />
            <stop stopColor="#e23838" offset="100%" />
          </linearGradient>
          <linearGradient y2={0} x2={0} y1={0} x1={1} id="grad2">
            <stop stopColor="#e23838" offset="0%" />
            <stop stopColor="#973999" offset="33%" />
            <stop stopColor="#009cdf" offset="67%" />
            <stop stopColor="#5ebd3e" offset="100%" />
          </linearGradient>
        </defs>
        <g strokeWidth={16} strokeLinecap="round" fill="none">
          {/* Track (light & dark) */}
          <g className="stroke-gray-300 dark:stroke-gray-800 transition-colors">
            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
          </g>

          {/* Worms */}
          <g strokeDasharray="180 656">
            <path
              d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
              stroke="url(#grad1)"
              className="animate-worm1"
            />
            <path
              d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
              stroke="url(#grad2)"
              className="animate-worm2"
            />
          </g>
        </g>
      </svg>
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
