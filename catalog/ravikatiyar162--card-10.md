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
card-10.tsx
// components/ui/stat-card.tsx
"use client";

import * as React from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Define the props for the component
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  change: number;
  changeDescription: string;
  icon: React.ReactNode;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, change, changeDescription, icon, className, ...props }, ref) => {
    
    // Determine trend for styling
    const isPositive = change >= 0;

    // Framer Motion hook for animating the number
    const motionValue = useSpring(0, {
      damping: 100,
      stiffness: 100,
    });

    // Transform the motion value to a rounded integer for display
    const displayValue = useTransform(motionValue, (latest) =>
      Math.round(latest).toLocaleString()
    );

    React.useEffect(() => {
      // Animate the value when the component mounts or the `value` prop changes
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }, [value, motionValue]);
    
    // Construct a meaningful ARIA label for accessibility
    const ariaLabel = `${title}: ${value}. Change is ${change > 0 ? '+' : ''}${change}% ${changeDescription}.`;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow",
          className
        )}
        aria-label={ariaLabel}
        role="region"
        {...props}
      >
        {/* Main animated value */}
        <div className="flex items-baseline gap-1">
          <motion.h3 className="text-5xl font-bold tracking-tighter">
            {displayValue}
          </motion.h3>
          <span className="text-2xl font-semibold text-muted-foreground">%</span>
        </div>

        {/* Title */}
        <p className="text-base text-muted-foreground">{title}</p>

        {/* Change indicator */}
        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "flex items-center justify-center rounded-full p-1.5",
              isPositive ? "bg-green-500/20" : "bg-red-500/20"
            )}
          >
            {icon}
          </span>
          <p className="text-sm text-muted-foreground">
            <span
              className={cn(
                "font-semibold",
                isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span> from {changeDescription}</span>
          </p>
        </div>
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };

code.demo.1757830893276.tsx
// demo.tsx
import { StatCard } from "@/components/ui/card-10";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCardDemo() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Example 1: Positive Trend (based on your image) */}
      <StatCard
        title="Team member showed up"
        value={95}
        change={32}
        changeDescription="last week"
        icon={<ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />}
      />

      {/* Example 2: Negative Trend */}
      <StatCard
        title="Bugs reported"
        value={12}
        change={-15}
        changeDescription="last month"
        icon={<ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />}
      />
      
      {/* Example 3: Neutral/Slight Positive Trend */}
      <StatCard
        title="Server Uptime"
        value={99}
        change={0.5}
        changeDescription="last 24h"
        icon={<ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-10.tsx
// components/ui/stat-card.tsx
"use client";

import * as React from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Define the props for the component
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: number;
  change: number;
  changeDescription: string;
  icon: React.ReactNode;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, change, changeDescription, icon, className, ...props }, ref) => {
    
    // Determine trend for styling
    const isPositive = change >= 0;

    // Framer Motion hook for animating the number
    const motionValue = useSpring(0, {
      damping: 100,
      stiffness: 100,
    });

    // Transform the motion value to a rounded integer for display
    const displayValue = useTransform(motionValue, (latest) =>
      Math.round(latest).toLocaleString()
    );

    React.useEffect(() => {
      // Animate the value when the component mounts or the `value` prop changes
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }, [value, motionValue]);
    
    // Construct a meaningful ARIA label for accessibility
    const ariaLabel = `${title}: ${value}. Change is ${change > 0 ? '+' : ''}${change}% ${changeDescription}.`;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 rounded-xl border bg-card p-6 text-card-foreground shadow",
          className
        )}
        aria-label={ariaLabel}
        role="region"
        {...props}
      >
        {/* Main animated value */}
        <div className="flex items-baseline gap-1">
          <motion.h3 className="text-5xl font-bold tracking-tighter">
            {displayValue}
          </motion.h3>
          <span className="text-2xl font-semibold text-muted-foreground">%</span>
        </div>

        {/* Title */}
        <p className="text-base text-muted-foreground">{title}</p>

        {/* Change indicator */}
        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              "flex items-center justify-center rounded-full p-1.5",
              isPositive ? "bg-green-500/20" : "bg-red-500/20"
            )}
          >
            {icon}
          </span>
          <p className="text-sm text-muted-foreground">
            <span
              className={cn(
                "font-semibold",
                isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span> from {changeDescription}</span>
          </p>
        </div>
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };
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
