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
svg-mask-effect.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

const MASK_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  const maskSize = isHovered ? revealSize : size;
  const mx = (mousePosition.x ?? 0) - maskSize / 2;
  const my = (mousePosition.y ?? 0) - maskSize / 2;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full bg-white dark:bg-black transition-colors duration-300",
        className
      )}
    >
      {/* Revealed overlay — black in light mode, white in dark mode */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center bg-black dark:bg-white"
        style={{
          WebkitMaskImage: `url("${MASK_DATA_URL}")`,
          WebkitMaskRepeat: "no-repeat",
          maskImage: `url("${MASK_DATA_URL}")`,
          maskRepeat: "no-repeat",
        }}
        animate={{
          WebkitMaskPosition: `${mx}px ${my}px`,
          WebkitMaskSize: `${maskSize}px`,
          maskPosition: `${mx}px ${my}px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          WebkitMaskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { duration: 0.05, ease: "linear" },
          WebkitMaskPosition: { duration: 0.05, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white dark:opacity-50" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold text-white dark:text-black"
        >
          {children}
        </div>
      </motion.div>

      {/* Base layer */}
      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </div>
  );
};


code.demo.1773406000831.tsx
"use client";
import React from "react";
import { MaskContainer } from "../components/ui/svg-mask-effect";

export default function SVGMaskEffectDemo() {
  return (
    <MaskContainer
      revealText={
        <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white">
          Move your cursor here to reveal the secret
        </p>
      }
    >
      <p className="text-4xl font-bold text-white dark:text-black">
        The secret is revealed ✨
      </p>
    </MaskContainer>
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/svg-mask-effect.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

const MASK_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  const maskSize = isHovered ? revealSize : size;
  const mx = (mousePosition.x ?? 0) - maskSize / 2;
  const my = (mousePosition.y ?? 0) - maskSize / 2;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full bg-white dark:bg-black transition-colors duration-300",
        className
      )}
    >
      {/* Revealed overlay — black in light mode, white in dark mode */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center bg-black dark:bg-white"
        style={{
          WebkitMaskImage: `url("${MASK_DATA_URL}")`,
          WebkitMaskRepeat: "no-repeat",
          maskImage: `url("${MASK_DATA_URL}")`,
          maskRepeat: "no-repeat",
        }}
        animate={{
          WebkitMaskPosition: `${mx}px ${my}px`,
          WebkitMaskSize: `${maskSize}px`,
          maskPosition: `${mx}px ${my}px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          WebkitMaskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { duration: 0.05, ease: "linear" },
          WebkitMaskPosition: { duration: 0.05, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white dark:opacity-50" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold text-white dark:text-black"
        >
          {children}
        </div>
      </motion.div>

      {/* Base layer */}
      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </div>
  );
};

```

Install NPM dependencies:
```bash
motion
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
