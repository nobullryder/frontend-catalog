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
animated-card.tsx
"use client";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const useMouse = () => {
  const [mouse, setMouse] = useState<{
    elementX: number | null;
    elementY: number | null;
  }>({
    elementX: null,
    elementY: null,
  });
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (parentRef.current) {
        const { left, top } = parentRef.current.getBoundingClientRect();
        setMouse({
          elementX: event.clientX - left,
          elementY: event.clientY - top,
        });
      }
    };

    const handleMouseLeave = () => {
      setMouse({
        elementX: null,
        elementY: null,
      });
    };

    const currentRef = parentRef.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
      currentRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return [mouse, parentRef] as const;
};

export const Component = ({
  title,
  description,
  withArrow = false,
  circleSize = 400,
  className,
  children,
}: {
  title: string;
  description: string;
  withArrow?: boolean;
  circleSize?: number;
  children?: ReactNode;
  className?: string;
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <div
      className="group relative transform-gpu overflow-hidden rounded-[20px] bg-white/10 p-2 transition-transform hover:scale-[1.01] active:scale-90"
      ref={parentRef}
    >
      {withArrow && (
        <ArrowUpRightIcon className="absolute right-2 top-2 z-10 size-5 translate-y-4 text-neutral-700 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 dark:text-neutral-300 " />
      )}
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[3]",
          mouse.elementX === null || mouse.elementY === null
            ? "opacity-0"
            : "opacity-100",
        )}
        style={{
          maskImage: `radial-gradient(${
            circleSize / 2
          }px circle at center, white, transparent)`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${mouse.elementX}px`,
          top: `${mouse.elementY}px`,
          background:
            "linear-gradient(135deg, #3BC4F2, #7A69F9,#F26378,#F5833F)",
        }}
      />
      <div className="absolute inset-px rounded-[19px] bg-neutral-100/80 dark:bg-neutral-900/80" />
      {children && (
        <div
          className={cn(
            "gird relative h-40 place-content-center overflow-hidden rounded-[15px] border-white bg-white/70 dark:border-neutral-950 dark:bg-black/50",
            className,
          )}
        >
          {children}
        </div>
      )}
      <div className="relative px-4 pb-2 pt-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
          {title}
        </h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};

code.demo.1750540472139.tsx
"use client";

import { Component } from "@/components/ui/animated-card";

const Demo = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white dark:bg-black">
      <div className="relative grid w-5/6 grid-cols-1 gap-4 p-2 md:grid-cols-2">
        <Component
          className="p-4"
          description="This is the best library for creating dynamic cards"
          title="EldoraUI"
        >
          You can also add content inside the card
        </Component>
        <Component
          className="p-4"
          description="How fast is it now to create cards"
          title="Is Just crazy"
        >
          If leave the card empty, it will still look good
        </Component>
        <Component
          description="I just have to copy paste the code and it instantly works"
          title="Amazing"
        />
        <Component
          description="I can't believe how easy it is to use"
          title="Unbelievable"
        />
      </div>
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-card.tsx
"use client";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const useMouse = () => {
  const [mouse, setMouse] = useState<{
    elementX: number | null;
    elementY: number | null;
  }>({
    elementX: null,
    elementY: null,
  });
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (parentRef.current) {
        const { left, top } = parentRef.current.getBoundingClientRect();
        setMouse({
          elementX: event.clientX - left,
          elementY: event.clientY - top,
        });
      }
    };

    const handleMouseLeave = () => {
      setMouse({
        elementX: null,
        elementY: null,
      });
    };

    const currentRef = parentRef.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
      currentRef.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
        currentRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return [mouse, parentRef] as const;
};

export const Component = ({
  title,
  description,
  withArrow = false,
  circleSize = 400,
  className,
  children,
}: {
  title: string;
  description: string;
  withArrow?: boolean;
  circleSize?: number;
  children?: ReactNode;
  className?: string;
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <div
      className="group relative transform-gpu overflow-hidden rounded-[20px] bg-white/10 p-2 transition-transform hover:scale-[1.01] active:scale-90"
      ref={parentRef}
    >
      {withArrow && (
        <ArrowUpRightIcon className="absolute right-2 top-2 z-10 size-5 translate-y-4 text-neutral-700 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 dark:text-neutral-300 " />
      )}
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[3]",
          mouse.elementX === null || mouse.elementY === null
            ? "opacity-0"
            : "opacity-100",
        )}
        style={{
          maskImage: `radial-gradient(${
            circleSize / 2
          }px circle at center, white, transparent)`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${mouse.elementX}px`,
          top: `${mouse.elementY}px`,
          background:
            "linear-gradient(135deg, #3BC4F2, #7A69F9,#F26378,#F5833F)",
        }}
      />
      <div className="absolute inset-px rounded-[19px] bg-neutral-100/80 dark:bg-neutral-900/80" />
      {children && (
        <div
          className={cn(
            "gird relative h-40 place-content-center overflow-hidden rounded-[15px] border-white bg-white/70 dark:border-neutral-950 dark:bg-black/50",
            className,
          )}
        >
          {children}
        </div>
      )}
      <div className="relative px-4 pb-2 pt-4">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
          {title}
        </h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
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
