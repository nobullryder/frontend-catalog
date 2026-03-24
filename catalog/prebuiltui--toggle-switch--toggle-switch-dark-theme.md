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
toggle-switch.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-12">
            <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
                <input type="checkbox" className="peer sr-only" />
                <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
                <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                Enable Feature
            </label>
            <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
                <input type="checkbox" className="peer sr-only" checked />
                <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
                <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                Feature Enabled
            </label>
        </div>
    );
};

code.demo.1757776562831.tsx
export default function Example() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-12">
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-16 h-8 bg-black rounded-full peer peer-checked:bg-slate-300 transition-colors duration-200"></div>
                <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                Enable Feature
            </label>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="w-16 h-8 bg-black rounded-full peer peer-checked:bg-slate-300 transition-colors duration-200"></div>
                <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                Feature Enabled
            </label>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/toggle-switch.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Example() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-12">
            <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
                <input type="checkbox" className="peer sr-only" />
                <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
                <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                Enable Feature
            </label>
            <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
                <input type="checkbox" className="peer sr-only" checked />
                <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
                <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                Feature Enabled
            </label>
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
