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
shining-button.tsx
"use client" 

import * as React from "react"

export const ShiningButton = () => {
  return (
    <>
      <button className="cursor-pointer font-medium px-4 py-[0.4rem] bg-gradient-to-b from-blue-500 via-blue-600 to-blue-800 overflow-hidden relative rounded-full before:absolute before:w-[0.4rem] before:h-[20rem] before:top-0  before:translate-x-[-8rem] hover:before:translate-x-[7rem] before:duration-[0.8s] before:-skew-x-[10deg]  before:transition-all before:bg-white before:blur-[8px] hover:brightness-100 flex items-center justify-center gap-2 transition-all group text-white">
        Ask HextaAI
      </button>
    </>
  );
};

code.demo.tsx
import { ShiningButton } from "@/components/ui/shining-button"

const Demo = () => {
    return (
        <>
            <ShiningButton/>
        </>
    )
}

export {Demo}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/shining-button.tsx
"use client" 

import * as React from "react"

export const ShiningButton = () => {
  return (
    <>
      <button className="cursor-pointer font-medium px-4 py-[0.4rem] bg-gradient-to-b from-blue-500 via-blue-600 to-blue-800 overflow-hidden relative rounded-full before:absolute before:w-[0.4rem] before:h-[20rem] before:top-0  before:translate-x-[-8rem] hover:before:translate-x-[7rem] before:duration-[0.8s] before:-skew-x-[10deg]  before:transition-all before:bg-white before:blur-[8px] hover:brightness-100 flex items-center justify-center gap-2 transition-all group text-white">
        Ask HextaAI
      </button>
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
