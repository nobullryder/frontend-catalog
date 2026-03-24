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
basic.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

type SpinningTextProps = {
  text: string;
  radius?: number;
  textClassName?: string;
  speed?: number;
  direction?: "normal" | "reverse";
  className?: string;
};

const SpinningText: React.FC<SpinningTextProps> = ({
  text,
  radius = 37,
  textClassName = "text-[8px]",
  speed = 10,
  direction = "normal",
  className,
}) => {
  // Generate a unique ID for the path to allow multiple instances
  const pathId = `circlePath-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g
          className="origin-center animate-spin"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction,
          }}
        >
          <path
            id={pathId}
            d={`
              M 50,50
              m -${radius},0
              a ${radius},${radius} 0 1,1 ${radius * 2},0
              a ${radius},${radius} 0 1,1 -${radius * 2},0
            `}
            fill="none"
          />
          <text
            className={cn(
              `uppercase font-normal fill-muted-foreground tracking-widest`,
              textClassName,
            )}
          >
            <textPath xlinkHref={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

const SpinningTextDemo = () => {
  return (
    <>
      <SpinningText
        text="JOIN CRYPTO TRENDS • EXPLORE • JOIN CRYPTO TRENDS • EXPLORE •"
        radius={25}
        textClassName="text-[4px]"
        speed={12}
        direction="normal"
      />
    </>
  );
};

export default SpinningTextDemo;


code.demo.1772718378885.tsx
import SpinningTextDemo from "@/components/ui/basic";

export default function DemoOne() {
  return <SpinningTextDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/basic.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

type SpinningTextProps = {
  text: string;
  radius?: number;
  textClassName?: string;
  speed?: number;
  direction?: "normal" | "reverse";
  className?: string;
};

const SpinningText: React.FC<SpinningTextProps> = ({
  text,
  radius = 37,
  textClassName = "text-[8px]",
  speed = 10,
  direction = "normal",
  className,
}) => {
  // Generate a unique ID for the path to allow multiple instances
  const pathId = `circlePath-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g
          className="origin-center animate-spin"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction,
          }}
        >
          <path
            id={pathId}
            d={`
              M 50,50
              m -${radius},0
              a ${radius},${radius} 0 1,1 ${radius * 2},0
              a ${radius},${radius} 0 1,1 -${radius * 2},0
            `}
            fill="none"
          />
          <text
            className={cn(
              `uppercase font-normal fill-muted-foreground tracking-widest`,
              textClassName,
            )}
          >
            <textPath xlinkHref={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

const SpinningTextDemo = () => {
  return (
    <>
      <SpinningText
        text="JOIN CRYPTO TRENDS • EXPLORE • JOIN CRYPTO TRENDS • EXPLORE •"
        radius={25}
        textClassName="text-[4px]"
        speed={12}
        direction="normal"
      />
    </>
  );
};

export default SpinningTextDemo;

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
