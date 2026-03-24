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
tabs-2.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Example() {
    return (
        <div className="flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-md text-sm">
            <div className="flex items-center">
                <input type="radio" name="options" id="html" className="hidden peer" checked />
                <label htmlFor="html" className="cursor-pointer rounded py-2 px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white">HTML</label>
            </div>
            <div className="flex items-center">
                <input type="radio" name="options" id="css" className="hidden peer" />
                <label htmlFor="css" className="cursor-pointer rounded py-2 px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white">CSS</label>
            </div>
            <div className="flex items-center">
                <input type="radio" name="options" id="react" className="hidden peer" />
                <label htmlFor="react" className="cursor-pointer rounded py-2 px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white">React</label>
            </div>
        </div>
    );
};

code.demo.1757778051068.tsx
export default function Example() {
    return (
        <div className="flex bg-gray-500/5 text-sm">
            <div className="flex items-center">
                <input type="radio" name="options" id="html" className="hidden peer" checked />
                <label htmlFor="html" className="cursor-pointer py-2 border border-r-0 border-gray-500/30 px-12 text-gray-500 transition-colors duration-200 peer-checked:border-b-indigo-500 peer-checked:bg-white peer-checked:text-indigo-500">HTML</label>
            </div>
            <div className="flex items-center">
                <input type="radio" name="options" id="css" className="hidden peer" />
                <label htmlFor="css" className="cursor-pointer py-2 border-y border-gray-500/30 px-12 text-gray-500 transition-colors duration-200 peer-checked:border-b-indigo-500 peer-checked:bg-white peer-checked:text-indigo-500">CSS</label>
            </div>
            <div className="flex items-center">
                <input type="radio" name="options" id="react" className="hidden peer" />
                <label htmlFor="react" className="cursor-pointer py-2 border border-l-0 border-gray-500/30 px-12 text-gray-500 transition-colors duration-200 peer-checked:border-b-indigo-500 peer-checked:bg-white peer-checked:text-indigo-500">React</label>
            </div>
        </div>
    );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tabs-2.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Example() {
    return (
        <div className="flex space-x-2 bg-white p-1 border border-gray-500/50 rounded-md text-sm">
            <div className="flex items-center">
                <input type="radio" name="options" id="html" className="hidden peer" checked />
                <label htmlFor="html" className="cursor-pointer rounded py-2 px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white">HTML</label>
            </div>
            <div className="flex items-center">
                <input type="radio" name="options" id="css" className="hidden peer" />
                <label htmlFor="css" className="cursor-pointer rounded py-2 px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white">CSS</label>
            </div>
            <div className="flex items-center">
                <input type="radio" name="options" id="react" className="hidden peer" />
                <label htmlFor="react" className="cursor-pointer rounded py-2 px-8 text-gray-500 transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white">React</label>
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
