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
button-retro.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const retroButtonVariants = cva(
  "relative inline-flex items-center justify-center w-24 border-2 border-transparent rounded-[2px] bg-[#010101] shadow-[1px_1px_1px_rgba(255,255,255,0.6)]",
  {
    variants: {
      variant: {
        default: [
          "text-white",
          "[--bg-color:theme(colors.orange.500)]",
          "[--bg-color-active:theme(colors.orange.600)]",
          "[--shadow-light:theme(colors.orange.300)]",
          "[--shadow-dark:theme(colors.orange.700)]",
        ],
        darkGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.700)]",
          "[--bg-color-active:theme(colors.neutral.800)]",
          "[--shadow-light:theme(colors.neutral.400)]",
          "[--shadow-dark:theme(colors.neutral.900)]",
        ],
        white: [
          "text-black",
          "[--bg-color:theme(colors.neutral.200)]",
          "[--bg-color-active:theme(colors.neutral.300)]",
          "[--shadow-light:theme(colors.white)]",
          "[--shadow-dark:theme(colors.neutral.500)]",
        ],
        lightGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.400)]",
          "[--bg-color-active:theme(colors.neutral.500)]",
          "[--shadow-light:theme(colors.neutral.200)]",
          "[--shadow-dark:theme(colors.neutral.600)]",
        ],
        gray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.600)]",
          "[--bg-color-active:theme(colors.neutral.700)]",
          "[--shadow-light:theme(colors.neutral.400)]",
          "[--shadow-dark:theme(colors.neutral.800)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const retroButtonInnerVariants = cva(
  [
    "inline-block w-full rounded-[9px] px-3 py-2",
    "uppercase tracking-wider text-center",
    "bg-[var(--bg-color)] transition-all duration-200",
    "shadow-[inset_1px_1px_1px_var(--shadow-light),inset_-1px_-1px_1px_var(--shadow-dark),2px_2px_4px_#000]",
    "active:scale-[0.98] active:bg-[var(--bg-color-active)]",
    "active:shadow-[inset_0_0_4px_#000,inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_4px_transparent]",
  ]
)

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  children: React.ReactNode
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(retroButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <span className={retroButtonInnerVariants()}>{children}</span>
      </button>
    )
  }
)
RetroButton.displayName = "RetroButton"

export { RetroButton }

code.demo.1760290102488.tsx
import { RetroButton } from "@/components/ui/button-retro"

function RetroButtonDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-wrap justify-center items-center max-w-[26em] gap-4">
        <RetroButton>Record</RetroButton>
        <RetroButton variant="darkGray">Sound</RetroButton>
        <RetroButton variant="white">Erase</RetroButton>
        <RetroButton variant="lightGray">Shift</RetroButton>
        <RetroButton variant="gray">Play</RetroButton>
      </div>
    </div>
  )
}

export default RetroButtonDemo
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-retro.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const retroButtonVariants = cva(
  "relative inline-flex items-center justify-center w-24 border-2 border-transparent rounded-[2px] bg-[#010101] shadow-[1px_1px_1px_rgba(255,255,255,0.6)]",
  {
    variants: {
      variant: {
        default: [
          "text-white",
          "[--bg-color:theme(colors.orange.500)]",
          "[--bg-color-active:theme(colors.orange.600)]",
          "[--shadow-light:theme(colors.orange.300)]",
          "[--shadow-dark:theme(colors.orange.700)]",
        ],
        darkGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.700)]",
          "[--bg-color-active:theme(colors.neutral.800)]",
          "[--shadow-light:theme(colors.neutral.400)]",
          "[--shadow-dark:theme(colors.neutral.900)]",
        ],
        white: [
          "text-black",
          "[--bg-color:theme(colors.neutral.200)]",
          "[--bg-color-active:theme(colors.neutral.300)]",
          "[--shadow-light:theme(colors.white)]",
          "[--shadow-dark:theme(colors.neutral.500)]",
        ],
        lightGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.400)]",
          "[--bg-color-active:theme(colors.neutral.500)]",
          "[--shadow-light:theme(colors.neutral.200)]",
          "[--shadow-dark:theme(colors.neutral.600)]",
        ],
        gray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.600)]",
          "[--bg-color-active:theme(colors.neutral.700)]",
          "[--shadow-light:theme(colors.neutral.400)]",
          "[--shadow-dark:theme(colors.neutral.800)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const retroButtonInnerVariants = cva(
  [
    "inline-block w-full rounded-[9px] px-3 py-2",
    "uppercase tracking-wider text-center",
    "bg-[var(--bg-color)] transition-all duration-200",
    "shadow-[inset_1px_1px_1px_var(--shadow-light),inset_-1px_-1px_1px_var(--shadow-dark),2px_2px_4px_#000]",
    "active:scale-[0.98] active:bg-[var(--bg-color-active)]",
    "active:shadow-[inset_0_0_4px_#000,inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_4px_transparent]",
  ]
)

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  children: React.ReactNode
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(retroButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <span className={retroButtonInnerVariants()}>{children}</span>
      </button>
    )
  }
)
RetroButton.displayName = "RetroButton"

export { RetroButton }
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
