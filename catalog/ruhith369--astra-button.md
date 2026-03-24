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
astra-button.tsx
"use client";

import React from "react";

interface AstraButtonProps {
  label?: string;
}

const AstraButton: React.FC<AstraButtonProps> = ({ label = "Button" }) => {
  return (
    <button
      className="
        relative px-6 py-2 rounded-md border border-[#00C6FF] dark:border-[#FF6AF1]
        text-sm font-semibold tracking-[2px] uppercase
        text-gray-800 dark:text-white
        bg-transparent overflow-hidden transition-all duration-300 ease-in
        hover:bg-[#00C6FF] dark:hover:bg-[#FF6AF1]
        hover:text-white
        hover:shadow-[0_0_30px_5px_rgba(0,198,255,0.6)]
        dark:hover:shadow-[0_0_30px_5px_rgba(255,106,241,0.7)]
        active:shadow-none
      "
    >
      {/* Shine effect */}
      <span
        className="
          absolute top-[7%] left-0 h-[86%] w-0 opacity-0 bg-white
          skew-x-[-20deg] shadow-[0_0_50px_30px_#fff]
          animate-none group-hover:animate-shine
        "
      />
      {label}
    </button>
  );
};

export default AstraButton;


code.demo.1760405957495.tsx
"use client";

import React from "react";
import AstraButton from "@/components/ui/astra-button";

const DemoPage = () => {
  return (
    <AstraButton label="Hover Me" />
  );
};

export default DemoPage;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/astra-button.tsx
"use client";

import React from "react";

interface AstraButtonProps {
  label?: string;
}

const AstraButton: React.FC<AstraButtonProps> = ({ label = "Button" }) => {
  return (
    <button
      className="
        relative px-6 py-2 rounded-md border border-[#00C6FF] dark:border-[#FF6AF1]
        text-sm font-semibold tracking-[2px] uppercase
        text-gray-800 dark:text-white
        bg-transparent overflow-hidden transition-all duration-300 ease-in
        hover:bg-[#00C6FF] dark:hover:bg-[#FF6AF1]
        hover:text-white
        hover:shadow-[0_0_30px_5px_rgba(0,198,255,0.6)]
        dark:hover:shadow-[0_0_30px_5px_rgba(255,106,241,0.7)]
        active:shadow-none
      "
    >
      {/* Shine effect */}
      <span
        className="
          absolute top-[7%] left-0 h-[86%] w-0 opacity-0 bg-white
          skew-x-[-20deg] shadow-[0_0_50px_30px_#fff]
          animate-none group-hover:animate-shine
        "
      />
      {label}
    </button>
  );
};

export default AstraButton;

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
