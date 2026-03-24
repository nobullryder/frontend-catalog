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
hover-button-1.tsx
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoverActionButtonProps {
  label?: string;
  className?: string;
}

export const HoverActionButton = ({
  label = "Button",
  className,
}: HoverActionButtonProps = {}) => {
  return (
    <div
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden border border-neutral-700 bg-neutral-900 p-2 text-center font-semibold text-white",
        className
      )}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {label}
      </span>

      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{label}</span>
        <ArrowRight />
      </div>

      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] bg-neutral-700 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-fuchsia-500 dark:group-hover:bg-fuchsia-700"></div>
    </div>
  );
};


code.demo.1757836563054.tsx
import { HoverActionButton } from "@/components/ui/hover-button-1";

export default function DemoOne() {
  return <HoverActionButton />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-button-1.tsx
import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoverActionButtonProps {
  label?: string;
  className?: string;
}

export const HoverActionButton = ({
  label = "Button",
  className,
}: HoverActionButtonProps = {}) => {
  return (
    <div
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden border border-neutral-700 bg-neutral-900 p-2 text-center font-semibold text-white",
        className
      )}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {label}
      </span>

      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{label}</span>
        <ArrowRight />
      </div>

      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] bg-neutral-700 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-fuchsia-500 dark:group-hover:bg-fuchsia-700"></div>
    </div>
  );
};

```

Install NPM dependencies:
```bash
lucide-react
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
