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
separator.tsx
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      className: "h-[1px]",
    },
    {
      orientation: "horizontal",
      size: "md",
      className: "h-[2px]",
    },
    {
      orientation: "horizontal",
      size: "lg",
      className: "h-[4px]",
    },
    {
      orientation: "vertical",
      size: "sm",
      className: "w-[1px]",
    },
    {
      orientation: "vertical",
      size: "md",
      className: "w-[2px]",
    },
    {
      orientation: "vertical",
      size: "lg",
      className: "w-[4px]",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "sm",
  },
});

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", size, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative
    orientation={orientation}
    className={cn(separatorVariants({ orientation, size }), className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator, separatorVariants };

code.demo.1751035770558.tsx
import { Separator } from "@/components/ui/separator";

export default function DemoOne() {
  return (
    <>
      <div className="space-y-6">
        <div className="text-sm">Content above separator</div>
        <Separator/>
        <div className="flex items-center space-x-4 text-sm">
          <span>Home</span>
          <Separator orientation="vertical" className="h-4" />
          <span>About</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Contact</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Blog</span>
        </div>
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/separator.tsx
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      className: "h-[1px]",
    },
    {
      orientation: "horizontal",
      size: "md",
      className: "h-[2px]",
    },
    {
      orientation: "horizontal",
      size: "lg",
      className: "h-[4px]",
    },
    {
      orientation: "vertical",
      size: "sm",
      className: "w-[1px]",
    },
    {
      orientation: "vertical",
      size: "md",
      className: "w-[2px]",
    },
    {
      orientation: "vertical",
      size: "lg",
      className: "w-[4px]",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "sm",
  },
});

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", size, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative
    orientation={orientation}
    className={cn(separatorVariants({ orientation, size }), className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator, separatorVariants };
```

Install NPM dependencies:
```bash
@radix-ui/react-separator, class-variance-authority
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
