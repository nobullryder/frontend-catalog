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
avatar-square.tsx
"use client";

import React from "react";


export default function Example() {
    return (
        <div className="flex flex-wrap justify-center gap-12">
            <div className="relative">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                    alt="userImage1" />
                <div className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <p className="text-xs text-white">09</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                    alt="userImage2" />
                <div className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                    <p className="text-xs text-white">09</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                    alt="userImage3" />
                <div className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                    <p className="text-xs text-white">09</p>
                </div>
            </div>
        </div>
    );
};

code.demo.1757057238721.tsx
"use client";

import React from "react";


export default function Example() {
    return (
        <div className="flex flex-wrap justify-center gap-12">
            <div className="relative border-[3px] border-blue-500 rounded-lg">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                    alt="userImage1" />
                <div className="absolute -top-3 -right-2 flex items-center justify-center h-5 w-10 bg-blue-500 rounded-full">
                    <p className="text-white text-xs uppercase">New</p>
                </div>
            </div>
            <div className="relative border-[3px] border-red-500 rounded-lg">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                    alt="userImage2" />
                <div className="absolute -top-3 -right-2 flex items-center justify-center h-5 w-10 bg-red-500 rounded-full">
                    <p className="text-white text-xs uppercase">New</p>
                </div>
            </div>
            <div className="relative border-[3px] border-yellow-500 rounded-lg">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                    alt="userImage3" />
                <div className="absolute -top-3 -right-2 flex items-center justify-center h-5 w-10 bg-yellow-500 rounded-full">
                    <p className="text-white text-xs uppercase">New</p>
                </div>
            </div>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar-square.tsx
"use client";

import React from "react";


export default function Example() {
    return (
        <div className="flex flex-wrap justify-center gap-12">
            <div className="relative">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                    alt="userImage1" />
                <div className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <p className="text-xs text-white">09</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                    alt="userImage2" />
                <div className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                    <p className="text-xs text-white">09</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-20 w-20 rounded"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                    alt="userImage3" />
                <div className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                    <p className="text-xs text-white">09</p>
                </div>
            </div>
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
