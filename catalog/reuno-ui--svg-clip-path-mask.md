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
svg-clip-path-mask.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function Skiper66() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#f5f4f3]">
      <ClipDiv imgSrc="https://images.unsplash.com/photo-1757345609584-c6995bfda088?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <h1 className="font-cal-sans text-4xl text-red-500">Hover Me</h1>
      </ClipDiv>
    </div>
  );
}

const ClipDiv = ({
  children,
  imgSrc,
  className,
}: {
  children: React.ReactNode;
  imgSrc: string;
  className?: string;
}) => {
  return (
    <>
      <SvgMask />
      <div
        style={{ clipPath: "url(#customMask001)" }}
        className={cn(
          "group relative flex aspect-video w-full items-center justify-center overflow-hidden lg:w-[80%]",
          className
        )}
      >
        <img
          src={imgSrc}
          alt=""
          className="duration-400 absolute inset-0 h-full w-full object-cover transition-all ease-in-out group-hover:scale-110"
        />
        {/* overlay */}
        <div className="absolute size-full bg-black/15" />
        {/* children */}
        {children && <div className="absolute">{children}</div>}
      </div>
    </>
  );
};

const SvgMask = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1836 1053"
      className="absolute inset-0 size-full"
    >
      <clipPath id="customMask001" clipPathUnits="objectBoundingBox">
        <path
          fill="currentColor"
          d="M457.525 1.148c-20.789-3.198-193.979 1.16-283.854 2.496 11.104-.178 1.297-2.868-81.146-2.496-103.5.468-86 102.499-86 109.999s-7 524.5-6.5 547.5 10 59 6.5 99c-2.8 32-1.167 234.667 0 332.003.5 75 62.5 66.5 67 68.5s38.5 0 81.5 0 436 6 526 10.5 438.995-.5 505.495 0 330.01-12.5 417.51-12.5 230.99 2 270.99 0 40.5-16 51-31.5 12.5-61 12.5-105.5c0-44.503 7.01-274.504 7.01-348.004s-3.51-159.998-7.01-230.998 0-256.002 0-318.002 7.01-92.998-22.5-110.999c-18.79-11.471-81.99-9.999-133.49-9.999H853.525c-29 0-370 4-396 0Z"
          transform="scale(0.0005139987561, 0.0008543065594)"
        />
      </clipPath>
    </svg>
  );
};


code.demo.1757694715280.tsx
import  Skiper66 from "@/components/ui/svg-clip-path-mask";

export default function DemoOne() {
  return <Skiper66 />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/svg-clip-path-mask.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function Skiper66() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#f5f4f3]">
      <ClipDiv imgSrc="https://images.unsplash.com/photo-1757345609584-c6995bfda088?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <h1 className="font-cal-sans text-4xl text-red-500">Hover Me</h1>
      </ClipDiv>
    </div>
  );
}

const ClipDiv = ({
  children,
  imgSrc,
  className,
}: {
  children: React.ReactNode;
  imgSrc: string;
  className?: string;
}) => {
  return (
    <>
      <SvgMask />
      <div
        style={{ clipPath: "url(#customMask001)" }}
        className={cn(
          "group relative flex aspect-video w-full items-center justify-center overflow-hidden lg:w-[80%]",
          className
        )}
      >
        <img
          src={imgSrc}
          alt=""
          className="duration-400 absolute inset-0 h-full w-full object-cover transition-all ease-in-out group-hover:scale-110"
        />
        {/* overlay */}
        <div className="absolute size-full bg-black/15" />
        {/* children */}
        {children && <div className="absolute">{children}</div>}
      </div>
    </>
  );
};

const SvgMask = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1836 1053"
      className="absolute inset-0 size-full"
    >
      <clipPath id="customMask001" clipPathUnits="objectBoundingBox">
        <path
          fill="currentColor"
          d="M457.525 1.148c-20.789-3.198-193.979 1.16-283.854 2.496 11.104-.178 1.297-2.868-81.146-2.496-103.5.468-86 102.499-86 109.999s-7 524.5-6.5 547.5 10 59 6.5 99c-2.8 32-1.167 234.667 0 332.003.5 75 62.5 66.5 67 68.5s38.5 0 81.5 0 436 6 526 10.5 438.995-.5 505.495 0 330.01-12.5 417.51-12.5 230.99 2 270.99 0 40.5-16 51-31.5 12.5-61 12.5-105.5c0-44.503 7.01-274.504 7.01-348.004s-3.51-159.998-7.01-230.998 0-256.002 0-318.002 7.01-92.998-22.5-110.999c-18.79-11.471-81.99-9.999-133.49-9.999H853.525c-29 0-370 4-396 0Z"
          transform="scale(0.0005139987561, 0.0008543065594)"
        />
      </clipPath>
    </svg>
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
