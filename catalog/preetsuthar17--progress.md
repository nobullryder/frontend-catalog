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
progress.tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        primary: "bg-primary/10",
        secondary: "bg-secondary",
        destructive: "bg-destructive/10",
        outline:
          "bg-accent border border-border",
      },
      size: {
        sm: "h-1.5",
        default: "h-2.5",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-primary",
        secondary: "bg-foreground",
        destructive: "bg-destructive",
        outline: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const circularProgressVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-12 h-12",
        default: "w-16 h-16",
        lg: "w-20 h-20",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  showValue?: boolean;
  animated?: boolean;
  type?: "linear" | "circular";
  strokeWidth?: number;
  label?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      variant,
      size,
      showValue = false,
      animated = true,
      type = "linear",
      strokeWidth,
      label,
      ...props
    },
    ref,
  ) => {
    const progress = Math.min(Math.max(value, 0), 100);

    if (type === "circular") {
      const circleSize = size === "sm" ? 48 : size === "lg" ? 80 : 64;
      const radius = (circleSize - (strokeWidth || 8)) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (progress / 100) * circumference;
      return (
        <div className="space-y-2">
          {label && (
            <div className="text-sm  text-foreground">
              {label}
            </div>
          )}
          <div className={cn(circularProgressVariants({ size }), className)}>
            <svg
              width={circleSize}
              height={circleSize}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke="hsl(var(--hu-secondary))"
                strokeWidth={strokeWidth || 8}
                fill="transparent"
                className="opacity-20"
              />
              {/* Progress circle */}
              <motion.circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke={
                  variant === "destructive"
                    ? "hsl(var(--hu-destructive))"
                    : variant === "secondary"
                      ? "hsl(var(--hu-secondary-foreground))"
                      : variant === "outline"
                        ? "hsl(var(--hu-foreground))"
                        : "hsl(var(--hu-primary))"
                }
                strokeWidth={strokeWidth || 8}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: animated
                    ? strokeDashoffset
                    : strokeDashoffset,
                }}
                transition={{
                  duration: animated ? 1.5 : 0,
                  ease: "easeInOut",
                }}
              />
            </svg>
            {showValue && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animated ? 0.5 : 0, duration: 0.3 }}
              >
                {Math.round(progress)}%
              </motion.div>
            )}
          </div>
          {showValue && (
            <motion.div
              className="text-center text-xs  text-muted-foreground tabular-nums"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animated ? 0.3 : 0, duration: 0.2 }}
            >
              {Math.round(progress)}%
            </motion.div>
          )}
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {label && (
          <div className="text-sm  text-foreground">
            {label}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(progressIndicatorVariants({ variant }))}
            asChild
          >
            <motion.div
              initial={{ transform: "translateX(-100%)" }}
              animate={{ transform: `translateX(-${100 - progress}%)` }}
              transition={{
                duration: animated ? 1.2 : 0,
                ease: "easeInOut",
              }}
            />
          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>
        {showValue && (
          <motion.div
            className="text-right text-xs font-semibold text-muted-foreground tabular-nums"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animated ? 0.3 : 0, duration: 0.2 }}
          >
            {Math.round(progress)}%
          </motion.div>
        )}
      </div>
    );
  },
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants };

code.demo.1753351930347.tsx
import { Progress } from "@/components/ui/progress";

export default function DemoOne() {
  return(
    <>
        <div className="space-y-3 max-w-sm w-full mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Download Progress</span>
            <span className="text-xs text-muted-foreground ">Downloading...</span>
          </div>
          <Progress value={45} showValue className="w-full" size="sm" />
        </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress.tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        primary: "bg-primary/10",
        secondary: "bg-secondary",
        destructive: "bg-destructive/10",
        outline:
          "bg-accent border border-border",
      },
      size: {
        sm: "h-1.5",
        default: "h-2.5",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-primary",
        secondary: "bg-foreground",
        destructive: "bg-destructive",
        outline: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const circularProgressVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-12 h-12",
        default: "w-16 h-16",
        lg: "w-20 h-20",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  showValue?: boolean;
  animated?: boolean;
  type?: "linear" | "circular";
  strokeWidth?: number;
  label?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      variant,
      size,
      showValue = false,
      animated = true,
      type = "linear",
      strokeWidth,
      label,
      ...props
    },
    ref,
  ) => {
    const progress = Math.min(Math.max(value, 0), 100);

    if (type === "circular") {
      const circleSize = size === "sm" ? 48 : size === "lg" ? 80 : 64;
      const radius = (circleSize - (strokeWidth || 8)) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (progress / 100) * circumference;
      return (
        <div className="space-y-2">
          {label && (
            <div className="text-sm  text-foreground">
              {label}
            </div>
          )}
          <div className={cn(circularProgressVariants({ size }), className)}>
            <svg
              width={circleSize}
              height={circleSize}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke="hsl(var(--hu-secondary))"
                strokeWidth={strokeWidth || 8}
                fill="transparent"
                className="opacity-20"
              />
              {/* Progress circle */}
              <motion.circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke={
                  variant === "destructive"
                    ? "hsl(var(--hu-destructive))"
                    : variant === "secondary"
                      ? "hsl(var(--hu-secondary-foreground))"
                      : variant === "outline"
                        ? "hsl(var(--hu-foreground))"
                        : "hsl(var(--hu-primary))"
                }
                strokeWidth={strokeWidth || 8}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: animated
                    ? strokeDashoffset
                    : strokeDashoffset,
                }}
                transition={{
                  duration: animated ? 1.5 : 0,
                  ease: "easeInOut",
                }}
              />
            </svg>
            {showValue && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animated ? 0.5 : 0, duration: 0.3 }}
              >
                {Math.round(progress)}%
              </motion.div>
            )}
          </div>
          {showValue && (
            <motion.div
              className="text-center text-xs  text-muted-foreground tabular-nums"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animated ? 0.3 : 0, duration: 0.2 }}
            >
              {Math.round(progress)}%
            </motion.div>
          )}
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {label && (
          <div className="text-sm  text-foreground">
            {label}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(progressIndicatorVariants({ variant }))}
            asChild
          >
            <motion.div
              initial={{ transform: "translateX(-100%)" }}
              animate={{ transform: `translateX(-${100 - progress}%)` }}
              transition={{
                duration: animated ? 1.2 : 0,
                ease: "easeInOut",
              }}
            />
          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>
        {showValue && (
          <motion.div
            className="text-right text-xs font-semibold text-muted-foreground tabular-nums"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animated ? 0.3 : 0, duration: 0.2 }}
          >
            {Math.round(progress)}%
          </motion.div>
        )}
      </div>
    );
  },
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants };
```

Install NPM dependencies:
```bash
@radix-ui/react-progress, class-variance-authority, motion
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
