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
outline-text.tsx
import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OutlineTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

export function OutlineText({ children, className = "", ...props }: OutlineTextProps) {
  return (
    <span
      className={cn(
        "inline-block font-extrabold",
        "text-[4rem] md:text-[6rem] leading-none",
        "text-transparent bg-clip-text select-none",
        className
      )}
      style={{
        WebkitTextStroke: "2px",
        WebkitTextFillColor: "transparent",
        WebkitBackgroundClip: "text",
      }}
      {...props}
    >
      <span className="[-webkit-text-stroke-color:#000] dark:[-webkit-text-stroke-color:#fff]">
        {children}
      </span>
    </span>
  );
}


code.demo.1750675082689.tsx
import React from "react";
import { OutlineText } from "@/components/ui/outline-text";

export default function GlassTextDemo() {
  return (
      <OutlineText>21st.dev</OutlineText>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/outline-text.tsx
import React, { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OutlineTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

export function OutlineText({ children, className = "", ...props }: OutlineTextProps) {
  return (
    <span
      className={cn(
        "inline-block font-extrabold",
        "text-[4rem] md:text-[6rem] leading-none",
        "text-transparent bg-clip-text select-none",
        className
      )}
      style={{
        WebkitTextStroke: "2px",
        WebkitTextFillColor: "transparent",
        WebkitBackgroundClip: "text",
      }}
      {...props}
    >
      <span className="[-webkit-text-stroke-color:#000] dark:[-webkit-text-stroke-color:#fff]">
        {children}
      </span>
    </span>
  );
}

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
