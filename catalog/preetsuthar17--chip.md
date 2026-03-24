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
chip.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type LucideIcon, X } from "lucide-react";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-ring shadow-sm/2",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive shadow-sm/2",
        outline:
          "border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring shadow-sm/2",
        ghost:
          "border-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
      },
      size: {
        sm: "h-6 px-2 gap-1 text-sm",
        default: "h-7 px-3 gap-1.5 text-sm",
        lg: "h-8 px-4 text-sm gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      icon: Icon,
      iconPosition = "left",
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === "sm" ? 12 : size === "lg" ? 14 : 12;
    const closeIconSize = size === "sm" ? 10 : size === "lg" ? 12 : 10;

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon size={iconSize} className="shrink-0" />
        )}
        {children}
        {Icon && iconPosition === "right" && !dismissible && (
          <Icon size={iconSize} className="shrink-0" />
        )}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove"
          >
            <X size={closeIconSize} />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };

code.demo.1751036791280.tsx
import { Chip } from "@/components/ui/chip";

export default function DemoOne() {
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        <Chip>Default</Chip>
        <Chip variant="secondary">Secondary</Chip>
        <Chip variant="outline">Outline</Chip>
        <Chip variant="ghost">Ghost</Chip>
        <Chip variant="destructive">Destructive</Chip>
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/chip.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type LucideIcon, X } from "lucide-react";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-ring shadow-sm/2",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive shadow-sm/2",
        outline:
          "border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring shadow-sm/2",
        ghost:
          "border-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
      },
      size: {
        sm: "h-6 px-2 gap-1 text-sm",
        default: "h-7 px-3 gap-1.5 text-sm",
        lg: "h-8 px-4 text-sm gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      icon: Icon,
      iconPosition = "left",
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === "sm" ? 12 : size === "lg" ? 14 : 12;
    const closeIconSize = size === "sm" ? 10 : size === "lg" ? 12 : 10;

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon size={iconSize} className="shrink-0" />
        )}
        {children}
        {Icon && iconPosition === "right" && !dismissible && (
          <Icon size={iconSize} className="shrink-0" />
        )}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove"
          >
            <X size={closeIconSize} />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
```

Install NPM dependencies:
```bash
lucide-react, class-variance-authority
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
