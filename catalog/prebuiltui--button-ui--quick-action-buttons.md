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

code.demo.1757093042394.tsx
"use client";

import React from "react";

export default function Example() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16">
            <button type="button" className="bg-white text-gray-500 active:scale-95 transition text-sm flex items-center px-4 py-2 gap-2 rounded w-max border border-gray-500/30">
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.892 2.31a3.7 3.7 0 0 0-1.19-.857 3.4 3.4 0 0 0-1.403-.3 3.4 3.4 0 0 0-1.404.3c-.445.199-.85.49-1.19.857L8 3.07l-.707-.76c-.688-.74-1.62-1.157-2.593-1.157s-1.906.416-2.594 1.157a4.1 4.1 0 0 0-1.074 2.793 4.1 4.1 0 0 0 1.074 2.792L8 14.242l5.893-6.347c.34-.366.611-.802.795-1.28a4.2 4.2 0 0 0 0-3.024 4 4 0 0 0-.795-1.281" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Like
            </button>
            <button type="button" className="bg-white text-gray-500 active:scale-95 transition text-sm flex items-center px-4 py-2 gap-2 rounded w-max border border-gray-500/30">
                <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.707 5.083H16.29M2.124.833h12.75c.782 0 1.416.635 1.416 1.417v8.5c0 .783-.634 1.417-1.416 1.417H2.124A1.417 1.417 0 0 1 .707 10.75v-8.5c0-.782.634-1.417 1.417-1.417" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Pay
            </button>
            <button type="button" className="bg-white text-gray-500 active:scale-95 transition text-sm flex items-center px-4 py-2 gap-2 rounded w-max border border-gray-500/30">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.75 10.25v3a1.5 1.5 0 0 1-1.5 1.5H2.75a1.5 1.5 0 0 1-1.5-1.5v-3m3-3.75L8 10.25m0 0 3.75-3.75M8 10.25v-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download
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
