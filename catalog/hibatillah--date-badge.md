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
date-badge.tsx
import { format, getDate } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function DateBadge({
  date: rawDate,
  time = false,
  tooltip = true,
}: {
  date: string | Date;
  time?: boolean;
  tooltip?: boolean;
}) {
  const date = getDate(rawDate);
  const month = format(rawDate, "LLL");
  const fullDate = format(rawDate, time ? "PPPP - kk:mm" : "PPPP");

  return (
    <TooltipProvider>
      <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-background/40 flex size-10 shrink-0 cursor-default flex-col items-center justify-center rounded-md border text-center">
          <span className="text-sm font-semibold leading-snug">{date}</span>
          <span className="text-muted-foreground text-xs leading-none">
            {month}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="shadow-md">
        {fullDate}
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );
}


code.demo.1746161294458.tsx
import { DateBadge } from "@/components/ui/date-badge"

const date = new Date(2025, 4, 22)

function DateBadgeWithTime() {
    return <DateBadge date={date} time />
}

function DateBadgeWithoutTime() {
    return <DateBadge date={date} />
}

function DateBadgeWithoutTooltip() {
    return <DateBadge date={date} tooltip={false} />
}

export {
    DateBadgeWithTime,
    DateBadgeWithoutTime,
    DateBadgeWithoutTooltip
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/date-badge.tsx
import { format, getDate } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function DateBadge({
  date: rawDate,
  time = false,
  tooltip = true,
}: {
  date: string | Date;
  time?: boolean;
  tooltip?: boolean;
}) {
  const date = getDate(rawDate);
  const month = format(rawDate, "LLL");
  const fullDate = format(rawDate, time ? "PPPP - kk:mm" : "PPPP");

  return (
    <TooltipProvider>
      <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-background/40 flex size-10 shrink-0 cursor-default flex-col items-center justify-center rounded-md border text-center">
          <span className="text-sm font-semibold leading-snug">{date}</span>
          <span className="text-muted-foreground text-xs leading-none">
            {month}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="shadow-md">
        {fullDate}
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  );
}

```
```tsx
/components/ui/tooltip.tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```
```tsx
/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

Install NPM dependencies:
```bash
date-fns, @radix-ui/react-tooltip, @radix-ui/react-slot, class-variance-authority
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
