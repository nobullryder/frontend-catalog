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
switch.tsx
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent",
        secondary:
          "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-accent",
      },
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-13",
        xl: "h-8 w-15",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      variant: {
        default: "bg-background",
        secondary: "bg-background",
      },
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        default:
          "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
        xl: "h-7 w-7 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  error?: string;
  animated?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      animated = true,
      id,
      ...props
    },
    ref,
  ) => {
    const switchId = id || React.useId();

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(switchThumbVariants({ variant, size }))}
          asChild={animated}
        >
          {animated ? (
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              className={cn(switchThumbVariants({ variant, size }))}
            />
          ) : (
            <div className={cn(switchThumbVariants({ variant, size }))} />
          )}
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    );

    if (label || description || error) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {switchElement}
            <div className="grid gap-1.5 leading-none">
              {label && (
                <label
                  htmlFor={switchId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
        </div>
      );
    }

    return switchElement;
  },
);

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch, switchVariants };

code.demo.1753349928276.tsx
import { Switch } from "@/components/ui/switch";

export default function DemoOne() {
  return <Switch defaultChecked />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/switch.tsx
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent",
        secondary:
          "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-accent",
      },
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-13",
        xl: "h-8 w-15",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      variant: {
        default: "bg-background",
        secondary: "bg-background",
      },
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        default:
          "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
        xl: "h-7 w-7 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  error?: string;
  animated?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      animated = true,
      id,
      ...props
    },
    ref,
  ) => {
    const switchId = id || React.useId();

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(switchThumbVariants({ variant, size }))}
          asChild={animated}
        >
          {animated ? (
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              className={cn(switchThumbVariants({ variant, size }))}
            />
          ) : (
            <div className={cn(switchThumbVariants({ variant, size }))} />
          )}
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    );

    if (label || description || error) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {switchElement}
            <div className="grid gap-1.5 leading-none">
              {label && (
                <label
                  htmlFor={switchId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
        </div>
      );
    }

    return switchElement;
  },
);

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch, switchVariants };
```

Install NPM dependencies:
```bash
@radix-ui/react-switch, class-variance-authority, motion
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
