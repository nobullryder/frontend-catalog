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
card-4.tsx
"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility

// Props interface for type safety and reusability
interface AnimatedStatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  primaryValue: number;
  secondaryValue: number;
  secondaryLabel: string;
  icon: React.ReactNode;
}

const AnimatedStatsCard = React.forwardRef<HTMLDivElement, AnimatedStatsCardProps>(
  (
    {
      title,
      primaryValue,
      secondaryValue,
      secondaryLabel,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    // Spring animation for a more natural number count-up
    const spring = useSpring(0, {
      damping: 50,
      stiffness: 200,
      mass: 1,
    });
    
    // Transform the motion value to format it with one decimal place
    const displayValue = useTransform(spring, (current) => current.toFixed(1));

    // Update spring value when component is in view
    React.useEffect(() => {
      if (isInView) {
        spring.set(primaryValue);
      }
    }, [isInView, primaryValue, spring]);


    return (
      <div
        ref={cardRef}
        className={cn(
          // CHANGE: Simplified background and text color for better contrast
          "relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl p-6",
          "bg-primary text-primary-foreground", // Ensures high contrast
          "shadow-lg transition-all hover:shadow-2xl",
          // Subtle dot pattern using the foreground color for visibility
          "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary-foreground)/0.05)_2%,transparent_2%)] before:bg-[length:20px_20px]",
          className
        )}
        {...props}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          {/* Ensure child text elements use the correct foreground color */}
          <h2 className="text-lg font-medium text-primary-foreground/90">{title}</h2>
          <div className="rounded-full bg-primary-foreground/10 p-2">{icon}</div>
        </div>

        {/* Main Content */}
        <div className="z-10 flex flex-1 items-end justify-between gap-4 pt-8">
          {/* Animated Primary Value */}
          <div className="flex items-baseline" aria-live="polite">
            <motion.h1 className="text-6xl font-bold tracking-tighter">
              {displayValue}
            </motion.h1>
          </div>
          {/* Horizontal Line */}
          <div className="mb-4 h-1 w-full flex-1 rounded-full bg-primary-foreground/20" />
          {/* Secondary Value */}
          <div className="flex flex-col items-center text-right">
            <span className="text-4xl font-semibold tracking-tight">
              {secondaryValue}
            </span>
            <span className="text-sm font-light text-primary-foreground/80">
              {secondaryLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

AnimatedStatsCard.displayName = "AnimatedStatsCard";

export { AnimatedStatsCard };

code.demo.1758070260155.tsx
import { AnimatedStatsCard } from "@/components/ui/card-4"; // Adjust the import path
import { Timer } from "lucide-react";

/**
 * A demo component to showcase the AnimatedStatsCard.
 */
export default function AnimatedStatsCardDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-background p-4">
      <AnimatedStatsCard
        title="Fitness Age"
        primaryValue={30.5}
        secondaryValue={37}
        secondaryLabel="Your Age"
        icon={<Timer className="h-5 w-5 text-primary-foreground/90" />}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-4.tsx
"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility

// Props interface for type safety and reusability
interface AnimatedStatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  primaryValue: number;
  secondaryValue: number;
  secondaryLabel: string;
  icon: React.ReactNode;
}

const AnimatedStatsCard = React.forwardRef<HTMLDivElement, AnimatedStatsCardProps>(
  (
    {
      title,
      primaryValue,
      secondaryValue,
      secondaryLabel,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    // Spring animation for a more natural number count-up
    const spring = useSpring(0, {
      damping: 50,
      stiffness: 200,
      mass: 1,
    });
    
    // Transform the motion value to format it with one decimal place
    const displayValue = useTransform(spring, (current) => current.toFixed(1));

    // Update spring value when component is in view
    React.useEffect(() => {
      if (isInView) {
        spring.set(primaryValue);
      }
    }, [isInView, primaryValue, spring]);


    return (
      <div
        ref={cardRef}
        className={cn(
          // CHANGE: Simplified background and text color for better contrast
          "relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl p-6",
          "bg-primary text-primary-foreground", // Ensures high contrast
          "shadow-lg transition-all hover:shadow-2xl",
          // Subtle dot pattern using the foreground color for visibility
          "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary-foreground)/0.05)_2%,transparent_2%)] before:bg-[length:20px_20px]",
          className
        )}
        {...props}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between">
          {/* Ensure child text elements use the correct foreground color */}
          <h2 className="text-lg font-medium text-primary-foreground/90">{title}</h2>
          <div className="rounded-full bg-primary-foreground/10 p-2">{icon}</div>
        </div>

        {/* Main Content */}
        <div className="z-10 flex flex-1 items-end justify-between gap-4 pt-8">
          {/* Animated Primary Value */}
          <div className="flex items-baseline" aria-live="polite">
            <motion.h1 className="text-6xl font-bold tracking-tighter">
              {displayValue}
            </motion.h1>
          </div>
          {/* Horizontal Line */}
          <div className="mb-4 h-1 w-full flex-1 rounded-full bg-primary-foreground/20" />
          {/* Secondary Value */}
          <div className="flex flex-col items-center text-right">
            <span className="text-4xl font-semibold tracking-tight">
              {secondaryValue}
            </span>
            <span className="text-sm font-light text-primary-foreground/80">
              {secondaryLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

AnimatedStatsCard.displayName = "AnimatedStatsCard";

export { AnimatedStatsCard };
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
