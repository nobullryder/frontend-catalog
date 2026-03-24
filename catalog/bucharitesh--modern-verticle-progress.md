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
modern-verticle-progress.tsx
// components/ui/progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "w-full flex items-center justify-center relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-neutral-950 border-4 border-primary",
        secondary: "bg-neutral-900 border-4 border-secondary",
        destructive: "bg-neutral-950 border-4 border-destructive",
      },
      radius: {
        default: "rounded-3xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
    },
  },
);

const indicatorVariants = cva(
  "w-full absolute left-0 bottom-0 z-20 transition-[height,background-color] duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
      },
      striped: {
        true: "[&>div]:bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] [&>div]:bg-size-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: true,
    },
  },
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  striped?: boolean;
  indicatorClassName?: string;
  showText?: boolean;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant,
      radius,
      striped = true,
      indicatorClassName,
      showText,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(progressVariants({ variant, radius }), className)}
        {...props}
      >
        <div className="w-full aspect-video relative">
          <div
            className={cn(
              indicatorVariants({ variant, striped }),
              indicatorClassName,
            )}
            style={{
              height: `${percentage}%`,
            }}
          >
            <div
              data-pattern="stripes"
              className="w-full h-full relative z-10 transition-colors duration-300"
            />
          </div>
          {showText && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-20">
              <span className="text-white text-5xl font-bold">
                {percentage.toFixed(0)}
                <span className="text-white text-base font-medium">%</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

Component.displayName = "Component";

export { Component };


code.demo.1753477937931.tsx
"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Component } from "@/components/ui/modern-verticle-progress";

export default function DemoOne() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full h-full flex items-center justify-center max-w-xl">
      <Component
        value={progress}
        className="border-purple-500"
        indicatorClassName="bg-purple-500"
        showText
      />
    </div>
  );
};

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/modern-verticle-progress.tsx
// components/ui/progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "w-full flex items-center justify-center relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-neutral-950 border-4 border-primary",
        secondary: "bg-neutral-900 border-4 border-secondary",
        destructive: "bg-neutral-950 border-4 border-destructive",
      },
      radius: {
        default: "rounded-3xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
    },
  },
);

const indicatorVariants = cva(
  "w-full absolute left-0 bottom-0 z-20 transition-[height,background-color] duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
      },
      striped: {
        true: "[&>div]:bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] [&>div]:bg-size-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: true,
    },
  },
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  striped?: boolean;
  indicatorClassName?: string;
  showText?: boolean;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant,
      radius,
      striped = true,
      indicatorClassName,
      showText,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(progressVariants({ variant, radius }), className)}
        {...props}
      >
        <div className="w-full aspect-video relative">
          <div
            className={cn(
              indicatorVariants({ variant, striped }),
              indicatorClassName,
            )}
            style={{
              height: `${percentage}%`,
            }}
          >
            <div
              data-pattern="stripes"
              className="w-full h-full relative z-10 transition-colors duration-300"
            />
          </div>
          {showText && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-20">
              <span className="text-white text-5xl font-bold">
                {percentage.toFixed(0)}
                <span className="text-white text-base font-medium">%</span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

Component.displayName = "Component";

export { Component };

```

Install NPM dependencies:
```bash
class-variance-authority
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
