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
radio.tsx
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const radioGroupVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const radioVariants = cva(
  "aspect-square rounded-full border border-border text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary shadow-sm/2",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface RadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      "orientation"
    >,
    VariantProps<typeof radioGroupVariants> {
  label?: string;
  description?: string;
  error?: string;
}

interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { className, orientation, label, description, error, id, ...props },
    ref
  ) => {
    const groupId = id || React.useId();

    return (
      <div className="flex flex-col gap-4">
        {(label || description) && (
          <div className="grid gap-1.5">
            {label && (
              <label
                htmlFor={groupId}
                className="text-sm  leading-none"
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
        )}

        <RadioGroupPrimitive.Root
          ref={ref}
          id={groupId}
          className={cn(radioGroupVariants({ orientation }), className)}
          {...props}
        />

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, size, label, description, id, ...props }, ref) => {
  const itemId = id || React.useId();
  const dotSize = size === "sm" ? 5 : size === "lg" ? 8 : 6;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={itemId}
          className={cn(radioVariants({ size }), className)}
          {...props}
        >
          <RadioGroupPrimitive.Indicator asChild>
            <div className="flex items-center justify-center w-full h-full">
              <AnimatePresence>
                <motion.div
                  key="dot"
                  className="rounded-full bg-primary"
                  style={{
                    width: dotSize,
                    height: dotSize,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                />
              </AnimatePresence>
            </div>
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={itemId}
                className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted-foreground peer-disabled:opacity-70">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

RadioItem.displayName = "RadioItem";

export {
  RadioGroup,
  RadioItem,
  radioGroupVariants,
  radioVariants,
  type RadioGroupProps,
  type RadioItemProps,
};

code.demo.1753351695020.tsx
import { RadioGroup, RadioItem } from "@/components/ui/radio";

export default function DemoOne() {
  return(
    <>
      <div className="max-w-sm w-full mx-auto flex items-center justify-center">
        <RadioGroup
          defaultValue="comfortable"
          label="Select your comfort level"
          description="Choose the option that best fits your needs"
        >
          <RadioItem
            value="comfortable"
            label="Comfortable"
            description="A relaxed and easy-going approach"
          />
          <RadioItem
            value="compact"
            label="Compact"
            description="Minimal space with essential features"
          />
          <RadioItem
            value="spacious"
            label="Spacious"
            description="Plenty of room with all amenities"
          />
        </RadioGroup>
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio.tsx
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const radioGroupVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const radioVariants = cva(
  "aspect-square rounded-full border border-border text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary shadow-sm/2",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface RadioGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
      "orientation"
    >,
    VariantProps<typeof radioGroupVariants> {
  label?: string;
  description?: string;
  error?: string;
}

interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { className, orientation, label, description, error, id, ...props },
    ref
  ) => {
    const groupId = id || React.useId();

    return (
      <div className="flex flex-col gap-4">
        {(label || description) && (
          <div className="grid gap-1.5">
            {label && (
              <label
                htmlFor={groupId}
                className="text-sm  leading-none"
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
        )}

        <RadioGroupPrimitive.Root
          ref={ref}
          id={groupId}
          className={cn(radioGroupVariants({ orientation }), className)}
          {...props}
        />

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, size, label, description, id, ...props }, ref) => {
  const itemId = id || React.useId();
  const dotSize = size === "sm" ? 5 : size === "lg" ? 8 : 6;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <RadioGroupPrimitive.Item
          ref={ref}
          id={itemId}
          className={cn(radioVariants({ size }), className)}
          {...props}
        >
          <RadioGroupPrimitive.Indicator asChild>
            <div className="flex items-center justify-center w-full h-full">
              <AnimatePresence>
                <motion.div
                  key="dot"
                  className="rounded-full bg-primary"
                  style={{
                    width: dotSize,
                    height: dotSize,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                />
              </AnimatePresence>
            </div>
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={itemId}
                className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted-foreground peer-disabled:opacity-70">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

RadioItem.displayName = "RadioItem";

export {
  RadioGroup,
  RadioItem,
  radioGroupVariants,
  radioVariants,
  type RadioGroupProps,
  type RadioItemProps,
};
```

Install NPM dependencies:
```bash
motion, class-variance-authority, @radix-ui/react-radio-group
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
