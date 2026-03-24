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
button-ui.tsx
"use client";

import React from "react";


export default function Example() {
    return (
        <>
            <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
            <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                    Click Me
                </button>
            </div>
        </>
    );
};

code.demo.1757093042395.tsx
"use client";

import React from "react";
export default function Example() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
            <button type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white rounded-full bg-slate-700"><p className="mb-0.5">publish now</p></button>
            <button type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white rounded-full bg-indigo-500"><p className="mb-0.5">publish now</p></button>
            <button type="button" className="w-40 py-3 active:scale-95 transition text-sm text-white rounded-full bg-indigo-500 flex items-center justify-center gap-1">
                <svg className="mt-0.5" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.548 13.551H5.799c-3.393 0-4.842-1.449-4.842-4.842V4.961c0-3.393 1.45-4.842 4.842-4.842h3.749c3.392 0 4.842 1.45 4.842 4.842v3.748c0 3.393-1.45 4.842-4.842 4.842M5.799 1.056c-2.88 0-3.905 1.025-3.905 3.905v3.748c0 2.88 1.025 3.905 3.905 3.905h3.749c2.88 0 3.904-1.024 3.904-3.905V4.961c0-2.88-1.024-3.905-3.904-3.905z" fill="#fff"/>
                    <path d="M6.786 9.072a.47.47 0 0 1-.331-.138L4.687 7.166a.47.47 0 0 1 0-.662.47.47 0 0 1 .662 0l1.437 1.437L9.997 4.73a.47.47 0 0 1 .662 0 .47.47 0 0 1 0 .662L7.118 8.934a.47.47 0 0 1-.331.138" fill="#fff"/>
                </svg>
                <p className="mb-0.5">publish now</p>
            </button>
            <button type="button" className="w-40 py-3 active:scale-95 transition text-sm text-gray-500 rounded-full bg-white flex items-center justify-center gap-1">
                <svg className="mt-0.5" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.339 13.447H5.59c-3.392 0-4.842-1.45-4.842-4.842V4.856C.748 1.464 2.198.014 5.59.014h3.749c3.392 0 4.842 1.45 4.842 4.842v3.749c0 3.392-1.45 4.842-4.842 4.842M5.59.952c-2.88 0-3.905 1.024-3.905 3.904v3.749c0 2.88 1.025 3.905 3.905 3.905h3.749c2.88 0 3.904-1.025 3.904-3.905V4.856c0-2.88-1.024-3.904-3.904-3.904z" fill="#6B7280"/>
                    <path d="M6.577 8.967a.47.47 0 0 1-.331-.137L4.478 7.062a.47.47 0 0 1 0-.662.47.47 0 0 1 .662 0l1.437 1.437 3.211-3.212a.47.47 0 0 1 .662 0 .47.47 0 0 1 0 .663L6.909 8.83a.47.47 0 0 1-.331.137" fill="#6B7280"/>
                </svg>
                <p className="mb-0.5">publish now</p>
            </button>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-ui.tsx
"use client";

import React from "react";


export default function Example() {
    return (
        <>
            <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
            <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                <button className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                    Click Me
                </button>
            </div>
        </>
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
