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
fluid-text-morph.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assumes a standard `cn` utility for merging classes

// 1. --- PROPS INTERFACE ---
// The component is now driven by props, making it reusable.
interface FluidTextMorphProps {
  wordPairs: [string, string][];
  className?: string;
  // Allows for custom animation props to be passed
  animationProps?: {
    initialColor?: string;
    animateColor?: string;
    exitColor?: string;
  };
}

// 2. --- REUSABLE COMPONENT LOGIC ---
// The component name is capitalized as per React standards.
export function FluidTextMorph({
  wordPairs,
  className,
  animationProps = {},
}: FluidTextMorphProps) {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(wordPairs[index][0]);

  // Default colors are now CSS variables for theming
  const {
    initialColor = "hsl(var(--primary))",
    animateColor = "hsl(var(--foreground))",
    exitColor = "hsl(var(--destructive))",
  } = animationProps;

  useEffect(() => {
    if (wordPairs && wordPairs.length > 0) {
      setWord(wordPairs[index][0]);
    }
  }, [index, wordPairs]);

  const handleHover = () => {
    setWord(wordPairs[index][1]);
  };

  const handleHoverEnd = () => {
    setWord(wordPairs[index][0]);
  };

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % wordPairs.length);
  };

  const letters = word.split("");

  // 3. --- CLEAN, REUSABLE MARKUP ---
  // The component no longer includes demo-specific wrappers or text.
  // It uses `cn` to merge default classes with any custom classes passed via props.
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-center text-6xl font-bold sm:text-8xl",
        className
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
    >
      <AnimatePresence>
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            layoutId={`letter-${i}`}
            // 4. --- THEMING WITH CSS VARIABLES ---
            // Hardcoded colors are replaced with style objects using CSS variables.
            // This ensures light/dark mode support out of the box.
            initial={{ opacity: 0, y: 30, scale: 0.8, color: initialColor }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              color: animateColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: i * 0.05,
              },
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.8,
              color: exitColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: (letters.length - 1 - i) * 0.05,
              },
            }}
            className="relative" // Removed text color/size here, handled by parent
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}


code.demo.1757691554557.tsx
"use client"; // Required for Next.js App Router

import { FluidTextMorph } from "@/components/ui/fluid-text-morph";

// 1. --- DEMO-SPECIFIC DATA ---
// The content is defined here, not inside the component.
const WORD_PAIRS: [string, string][] = [
  ["Design", "Develop"],
  ["Create", "Innovate"],
  ["Build", "Ship"],
  ["Animate", "Engage"],
];

export default function FluidTextMorphDemo() {
  // 2. --- DEMO-SPECIFIC LAYOUT & STYLING ---
  // The background and centering are part of the demo, not the component.
  // It uses theme variables (`bg-background`) to be theme-aware.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      {/* 3. --- RENDERING THE REUSABLE COMPONENT ---
          The component is now used by passing props to it. */}
      <FluidTextMorph wordPairs={WORD_PAIRS} />

      {/* The instruction text is also part of the demo page. */}
      <p className="mt-6 text-muted-foreground">
        Hover to morph, Click to change.
      </p>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/fluid-text-morph.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assumes a standard `cn` utility for merging classes

// 1. --- PROPS INTERFACE ---
// The component is now driven by props, making it reusable.
interface FluidTextMorphProps {
  wordPairs: [string, string][];
  className?: string;
  // Allows for custom animation props to be passed
  animationProps?: {
    initialColor?: string;
    animateColor?: string;
    exitColor?: string;
  };
}

// 2. --- REUSABLE COMPONENT LOGIC ---
// The component name is capitalized as per React standards.
export function FluidTextMorph({
  wordPairs,
  className,
  animationProps = {},
}: FluidTextMorphProps) {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(wordPairs[index][0]);

  // Default colors are now CSS variables for theming
  const {
    initialColor = "hsl(var(--primary))",
    animateColor = "hsl(var(--foreground))",
    exitColor = "hsl(var(--destructive))",
  } = animationProps;

  useEffect(() => {
    if (wordPairs && wordPairs.length > 0) {
      setWord(wordPairs[index][0]);
    }
  }, [index, wordPairs]);

  const handleHover = () => {
    setWord(wordPairs[index][1]);
  };

  const handleHoverEnd = () => {
    setWord(wordPairs[index][0]);
  };

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % wordPairs.length);
  };

  const letters = word.split("");

  // 3. --- CLEAN, REUSABLE MARKUP ---
  // The component no longer includes demo-specific wrappers or text.
  // It uses `cn` to merge default classes with any custom classes passed via props.
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-center text-6xl font-bold sm:text-8xl",
        className
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
    >
      <AnimatePresence>
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            layoutId={`letter-${i}`}
            // 4. --- THEMING WITH CSS VARIABLES ---
            // Hardcoded colors are replaced with style objects using CSS variables.
            // This ensures light/dark mode support out of the box.
            initial={{ opacity: 0, y: 30, scale: 0.8, color: initialColor }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              color: animateColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: i * 0.05,
              },
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.8,
              color: exitColor,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: (letters.length - 1 - i) * 0.05,
              },
            }}
            className="relative" // Removed text color/size here, handled by parent
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

```

Install NPM dependencies:
```bash
framer-motion
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
