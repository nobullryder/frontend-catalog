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
pagination.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Example() {
    return (
        <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous" className="mr-4">
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1L2 9.24242L11 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        
            <div className="flex gap-2 text-gray-500 text-sm md:text-base">
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">1</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-indigo-500 text-white rounded-md transition-all">2</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">3</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">4</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">5</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">6</button>
            </div>
        
            <button type="button" aria-label="Next" className="ml-4">
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L10 9.24242L1 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    );
};

code.demo.1757778432008.tsx
export default function Example() {
    return (
        <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
            <button type="button" aria-label="prev" className="rounded-full bg-slate-200/50">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078"/>
                </svg>
            </button>
        
            <div className="flex items-center gap-2 text-sm font-medium">
                <button className="h-10 w-10 flex items-center justify-center aspect-square">1</button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square">2</button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square text-indigo-500 border border-indigo-200 rounded-full">3</button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square">4</button>
                <button className="h-10 w-10 flex items-center justify-center aspect-square">5</button>
            </div>
        
            <button type="button" aria-label="next" className="rounded-full bg-slate-200/50">
                <svg className="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" strokeWidth=".078"/>
                </svg>
            </button>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pagination.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Example() {
    return (
        <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous" className="mr-4">
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1L2 9.24242L11 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        
            <div className="flex gap-2 text-gray-500 text-sm md:text-base">
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">1</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-indigo-500 text-white rounded-md transition-all">2</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">3</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">4</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">5</button>
                <button type="button" className="flex items-center justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all">6</button>
            </div>
        
            <button type="button" aria-label="Next" className="ml-4">
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L10 9.24242L1 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round"/>
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
