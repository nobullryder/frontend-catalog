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
hover-link-animation.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, type ValueAnimationTransition } from "motion/react";
import { cn } from "@/lib/utils";

interface HighlightHoverProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  effect?: ValueAnimationTransition;
  highlightColor: string;
  barThickness?: number; // ratio relative to font size
  gapRatio?: number; // vertical gap relative to font size
}

export const Component = ({
  children,
  as: Tag = "span",
  className,
  effect = { type: "spring", stiffness: 260, damping: 24 },
  highlightColor,
  barThickness = 0.12,
  gapRatio = 0.03,
  ...rest
}: HighlightHoverProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  // Set dynamic CSS vars
  useEffect(() => {
    const applyVars = () => {
      if (ref.current) {
        const size = parseFloat(
          getComputedStyle(ref.current).fontSize
        );
        ref.current.style.setProperty("--hh-bar", `${size * barThickness}px`);
        ref.current.style.setProperty("--hh-gap", `${size * gapRatio}px`);
      }
    };
    applyVars();
    window.addEventListener("resize", applyVars);
    return () => window.removeEventListener("resize", applyVars);
  }, [barThickness, gapRatio]);

  const barAnim = {
    rest: { height: "var(--hh-bar)" },
    hover: { height: "100%", transition: effect },
  };

  const textAnim = {
    rest: { color: "currentColor" },
    hover: { color: highlightColor, transition: effect },
  };

  return (
    <MotionTag
      ref={ref}
      whileHover="hover"
      className={cn("relative inline-block cursor-pointer", className)}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        variants={barAnim}
        className="absolute w-full bg-current"
        style={{
          height: "var(--hh-bar)",
          bottom: "calc(-1 * var(--hh-gap))",
        }}
      />
      <motion.span variants={textAnim} className="relative text-current">
        {children}
      </motion.span>
    </MotionTag>
  );
};


code.demo.1759152631831.tsx
"use client";

import { motion } from "motion/react";
import { Component } from "@/components/ui/hover-link-animation";

export default function HighlightDemo() {
  const fadeGroup = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.12 },
    },
  };

  const itemFade = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  const message =
    "Welcome to the future of components with 21st Dev —".split(" ");

  return (
    <div className="w-dvw h-dvh flex items-center justify-center bg-background]">
      <motion.h2
        className="text-2xl md:text-2xl font-extrabold tracking-wide text-[#ffffff] font-mono p-6"
        variants={fadeGroup}
        initial="hidden"
        animate="show"
      >
        {message.map((word, idx) => (
          <motion.span
            key={idx}
            variants={itemFade}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
        <motion.span variants={itemFade} className="inline-block">
          <Component
            highlightColor="#0d0d0d"
            className="cursor-pointer text-[#00ff88]"
          >
            explore
          </Component>
        </motion.span>
      </motion.h2>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-link-animation.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, type ValueAnimationTransition } from "motion/react";
import { cn } from "@/lib/utils";

interface HighlightHoverProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  effect?: ValueAnimationTransition;
  highlightColor: string;
  barThickness?: number; // ratio relative to font size
  gapRatio?: number; // vertical gap relative to font size
}

export const Component = ({
  children,
  as: Tag = "span",
  className,
  effect = { type: "spring", stiffness: 260, damping: 24 },
  highlightColor,
  barThickness = 0.12,
  gapRatio = 0.03,
  ...rest
}: HighlightHoverProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  // Set dynamic CSS vars
  useEffect(() => {
    const applyVars = () => {
      if (ref.current) {
        const size = parseFloat(
          getComputedStyle(ref.current).fontSize
        );
        ref.current.style.setProperty("--hh-bar", `${size * barThickness}px`);
        ref.current.style.setProperty("--hh-gap", `${size * gapRatio}px`);
      }
    };
    applyVars();
    window.addEventListener("resize", applyVars);
    return () => window.removeEventListener("resize", applyVars);
  }, [barThickness, gapRatio]);

  const barAnim = {
    rest: { height: "var(--hh-bar)" },
    hover: { height: "100%", transition: effect },
  };

  const textAnim = {
    rest: { color: "currentColor" },
    hover: { color: highlightColor, transition: effect },
  };

  return (
    <MotionTag
      ref={ref}
      whileHover="hover"
      className={cn("relative inline-block cursor-pointer", className)}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        variants={barAnim}
        className="absolute w-full bg-current"
        style={{
          height: "var(--hh-bar)",
          bottom: "calc(-1 * var(--hh-gap))",
        }}
      />
      <motion.span variants={textAnim} className="relative text-current">
        {children}
      </motion.span>
    </MotionTag>
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
