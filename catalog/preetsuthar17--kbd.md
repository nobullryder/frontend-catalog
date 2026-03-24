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
kbd.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono font-medium text-xs bg-muted text-muted-foreground border border-border rounded-md border-b-3 transition-all duration-75 cursor-pointer select-none active:translate-y-[1px] active:border-b-[1px]  hover:bg-muted/80 shadow-sm/2",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-muted-foreground border-border",
        outline:
          "bg-transparent border-border text-foreground hover:bg-accent",
        solid:
          "bg-foreground text-background border-foreground hover:bg-foreground/90",
        secondary:
          "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
      },
      size: {
        xs: "h-5 px-1.5 text-[10px] min-w-[1.25rem]",
        sm: "h-6 px-2 text-xs min-w-[1.5rem]",
        md: "h-7 px-2.5 text-sm min-w-[1.75rem]",
        lg: "h-8 px-3 text-sm min-w-[2rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  keys?: string[];
  onClick?: () => void;
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, keys, children, onClick, ...props }, ref) => {
    // If keys array is provided, render multiple kbd elements
    if (keys && keys.length > 0) {
      return (
        <span
          className="inline-flex items-center gap-1"
          ref={ref as React.Ref<HTMLSpanElement>}
          onClick={onClick}
        >
          {keys.map((key, index) => (
            <React.Fragment key={index}>
              <kbd
                className={cn(kbdVariants({ variant, size }), className)}
                {...props}
              >
                {key}
              </kbd>
              {index < keys.length - 1 && (
                <span className="text-muted-foreground text-xs px-1">
                  +
                </span>
              )}
            </React.Fragment>
          ))}
        </span>
      );
    }

    // Single kbd element
    return (
      <kbd
        className={cn(kbdVariants({ variant, size }), className)}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };

code.demo.1751157591244.tsx
import { Kbd } from "@/components/ui/kbd";

export default function DemoOne() {
  return (
    <>
      <div className="flex flex-wrap gap-4 items-center">
        <Kbd>Ctrl</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Alt</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Space</Kbd>
        <Kbd>Tab</Kbd>
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/kbd.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono font-medium text-xs bg-muted text-muted-foreground border border-border rounded-md border-b-3 transition-all duration-75 cursor-pointer select-none active:translate-y-[1px] active:border-b-[1px]  hover:bg-muted/80 shadow-sm/2",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-muted-foreground border-border",
        outline:
          "bg-transparent border-border text-foreground hover:bg-accent",
        solid:
          "bg-foreground text-background border-foreground hover:bg-foreground/90",
        secondary:
          "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
      },
      size: {
        xs: "h-5 px-1.5 text-[10px] min-w-[1.25rem]",
        sm: "h-6 px-2 text-xs min-w-[1.5rem]",
        md: "h-7 px-2.5 text-sm min-w-[1.75rem]",
        lg: "h-8 px-3 text-sm min-w-[2rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  keys?: string[];
  onClick?: () => void;
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, keys, children, onClick, ...props }, ref) => {
    // If keys array is provided, render multiple kbd elements
    if (keys && keys.length > 0) {
      return (
        <span
          className="inline-flex items-center gap-1"
          ref={ref as React.Ref<HTMLSpanElement>}
          onClick={onClick}
        >
          {keys.map((key, index) => (
            <React.Fragment key={index}>
              <kbd
                className={cn(kbdVariants({ variant, size }), className)}
                {...props}
              >
                {key}
              </kbd>
              {index < keys.length - 1 && (
                <span className="text-muted-foreground text-xs px-1">
                  +
                </span>
              )}
            </React.Fragment>
          ))}
        </span>
      );
    }

    // Single kbd element
    return (
      <kbd
        className={cn(kbdVariants({ variant, size }), className)}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
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
