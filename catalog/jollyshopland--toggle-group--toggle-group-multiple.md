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
toggle-group.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ToggleButton as AriaToggleButton,
  ToggleButtonGroup as AriaToggleButtonGroup,
  composeRenderProps,
  type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
  type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
    /* Disabled */
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    /* Hover */
    "data-[hovered]:bg-muted data-[hovered]:text-muted-foreground",
    /* Selected */
    "data-[selected]:bg-accent data-[selected]:text-accent-foreground",
    /* Focus Visible */
    "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
    /* Resets */
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ToggleProps
  extends AriaToggleButtonProps,
    VariantProps<typeof toggleVariants> {}

const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
  <AriaToggleButton
    className={composeRenderProps(className, (className) =>
      cn(
        "group-data-[orientation=vertical]/togglegroup:w-full",
        toggleVariants({
          variant,
          size,
          className,
        })
      )
    )}
    {...props}
  />
)

const ToggleButtonGroup = ({
  children,
  className,
  ...props
}: AriaToggleButtonGroupProps) => (
  <AriaToggleButtonGroup
    className={composeRenderProps(className, (className) =>
      cn(
        "group/togglegroup flex items-center justify-center gap-1 data-[orientation=vertical]:flex-col",
        className
      )
    )}
    {...props}
  >
    {children}
  </AriaToggleButtonGroup>
)

export { Toggle, toggleVariants, ToggleButtonGroup }
export type { ToggleProps }


code.demo.1754514116087.tsx
import { Toggle, ToggleButtonGroup } from "@/components/ui/toggle-group"

export default  function ToggleGroupMultiple() {
  return (
    <ToggleButtonGroup selectionMode="multiple">
      <Toggle id="bold">Bold</Toggle>
      <Toggle id="italic">Italic</Toggle>
      <Toggle id="underline">Underline</Toggle>
    </ToggleButtonGroup>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/toggle-group.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ToggleButton as AriaToggleButton,
  ToggleButtonGroup as AriaToggleButtonGroup,
  composeRenderProps,
  type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
  type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
    /* Disabled */
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    /* Hover */
    "data-[hovered]:bg-muted data-[hovered]:text-muted-foreground",
    /* Selected */
    "data-[selected]:bg-accent data-[selected]:text-accent-foreground",
    /* Focus Visible */
    "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
    /* Resets */
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ToggleProps
  extends AriaToggleButtonProps,
    VariantProps<typeof toggleVariants> {}

const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
  <AriaToggleButton
    className={composeRenderProps(className, (className) =>
      cn(
        "group-data-[orientation=vertical]/togglegroup:w-full",
        toggleVariants({
          variant,
          size,
          className,
        })
      )
    )}
    {...props}
  />
)

const ToggleButtonGroup = ({
  children,
  className,
  ...props
}: AriaToggleButtonGroupProps) => (
  <AriaToggleButtonGroup
    className={composeRenderProps(className, (className) =>
      cn(
        "group/togglegroup flex items-center justify-center gap-1 data-[orientation=vertical]:flex-col",
        className
      )
    )}
    {...props}
  >
    {children}
  </AriaToggleButtonGroup>
)

export { Toggle, toggleVariants, ToggleButtonGroup }
export type { ToggleProps }

```

Install NPM dependencies:
```bash
class-variance-authority, react-aria-components
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
