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
button-1.tsx
"use client"

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const buttonStyles = tv({
  base: [
    "relative isolate inline-flex items-center justify-center gap-x-2 font-medium",
    "outline-0 outline-offset-2 hover:no-underline focus-visible:outline-2",
    "inset-ring inset-ring-fg/20 bg-(--btn-bg) pressed:bg-(--btn-overlay) text-(--btn-fg) shadow-[shadow:inset_0_2px_--theme(--color-white/15%)] hover:bg-(--btn-overlay) dark:inset-ring-fg/15 dark:shadow-none",
    "forced-colors:outline-[Highlight] forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60 pressed:*:data-[slot=icon]:text-current *:data-[slot=icon]:transition hover:*:data-[slot=icon]:text-current/90",
    "*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0",
  ],
  variants: {
    intent: {
      primary: [
        "outline-primary [--btn-bg:var(--color-primary)]/95 [--btn-fg:var(--color-primary-fg)] [--btn-overlay:var(--color-primary)]",
      ],
      secondary: [
        "outline-primary [--btn-bg:var(--color-secondary)]/90 [--btn-fg:var(--color-secondary-fg)] [--btn-overlay:var(--color-secondary)]",
      ],
      warning: [
        "outline-warning [--btn-bg:var(--color-warning)]/95 [--btn-fg:var(--color-warning-fg)] [--btn-overlay:var(--color-warning)]",
      ],
      danger: [
        "outline-danger [--btn-bg:var(--color-danger)]/95 [--btn-fg:var(--color-danger-fg)] [--btn-overlay:var(--color-danger)]",
      ],
      outline: [
        "shadow-none outline-primary [--btn-fg:var(--color-fg)] [--btn-overlay:var(--color-secondary)]/90",
      ],
      plain: [
        "inset-ring-transparent shadow-none outline-primary [--btn-fg:var(--color-fg)] [--btn-overlay:var(--color-secondary)]/90 dark:inset-ring-transparent",
      ],
    },
    size: {
      "extra-small":
        "h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 **:data-[slot=avatar]:*:size-3.5 **:data-[slot=avatar]:size-3.5 **:data-[slot=icon]:size-3 lg:text-[0.800rem]/4",
      small: "h-9 px-3.5 text-sm/5 sm:text-sm/5",
      medium: "h-10 px-4 text-base sm:text-sm/6",
      large:
        "h-11 px-4.5 text-base *:data-[slot=icon]:mx-[-1.5px] sm:*:data-[slot=icon]:size-5 lg:text-base/7",
      "square-petite": "size-9 shrink-0",
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full",
    },
    isDisabled: {
      true: "inset-ring-0 opacity-50 forced-colors:text-[GrayText]",
    },
    isPending: {
      true: "opacity-50",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    shape: "square",
  },
})

interface ButtonProps extends ButtonPrimitiveProps {
  intent?: "primary" | "secondary" | "danger" | "warning" | "outline" | "plain"
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small"
  shape?: "square" | "circle"
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, size, shape, ref, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          size,
          shape,
          className,
        }),
      )}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </ButtonPrimitive>
  )
}

export type { ButtonProps }
export { Button, buttonStyles }


code.demo.1750535812129.tsx
"use client"

import { Button } from "@/components/ui/button-1"

export function Component() {
  return (
    <div className="grid grid-cols-2 gap-2 *:flex *:flex-col *:gap-y-2">
      <div>
        <Button intent="primary">Label</Button>
        <Button intent="secondary">Label</Button>
        <Button intent="warning">Label</Button>
      </div>
      <div>
        <Button intent="danger">Label</Button>
        <Button intent="outline">Label</Button>
        <Button intent="plain">Label</Button>
      </div>
    </div>
  )
}


export default Component;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-1.tsx
"use client"

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const buttonStyles = tv({
  base: [
    "relative isolate inline-flex items-center justify-center gap-x-2 font-medium",
    "outline-0 outline-offset-2 hover:no-underline focus-visible:outline-2",
    "inset-ring inset-ring-fg/20 bg-(--btn-bg) pressed:bg-(--btn-overlay) text-(--btn-fg) shadow-[shadow:inset_0_2px_--theme(--color-white/15%)] hover:bg-(--btn-overlay) dark:inset-ring-fg/15 dark:shadow-none",
    "forced-colors:outline-[Highlight] forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60 pressed:*:data-[slot=icon]:text-current *:data-[slot=icon]:transition hover:*:data-[slot=icon]:text-current/90",
    "*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0",
  ],
  variants: {
    intent: {
      primary: [
        "outline-primary [--btn-bg:var(--color-primary)]/95 [--btn-fg:var(--color-primary-fg)] [--btn-overlay:var(--color-primary)]",
      ],
      secondary: [
        "outline-primary [--btn-bg:var(--color-secondary)]/90 [--btn-fg:var(--color-secondary-fg)] [--btn-overlay:var(--color-secondary)]",
      ],
      warning: [
        "outline-warning [--btn-bg:var(--color-warning)]/95 [--btn-fg:var(--color-warning-fg)] [--btn-overlay:var(--color-warning)]",
      ],
      danger: [
        "outline-danger [--btn-bg:var(--color-danger)]/95 [--btn-fg:var(--color-danger-fg)] [--btn-overlay:var(--color-danger)]",
      ],
      outline: [
        "shadow-none outline-primary [--btn-fg:var(--color-fg)] [--btn-overlay:var(--color-secondary)]/90",
      ],
      plain: [
        "inset-ring-transparent shadow-none outline-primary [--btn-fg:var(--color-fg)] [--btn-overlay:var(--color-secondary)]/90 dark:inset-ring-transparent",
      ],
    },
    size: {
      "extra-small":
        "h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 **:data-[slot=avatar]:*:size-3.5 **:data-[slot=avatar]:size-3.5 **:data-[slot=icon]:size-3 lg:text-[0.800rem]/4",
      small: "h-9 px-3.5 text-sm/5 sm:text-sm/5",
      medium: "h-10 px-4 text-base sm:text-sm/6",
      large:
        "h-11 px-4.5 text-base *:data-[slot=icon]:mx-[-1.5px] sm:*:data-[slot=icon]:size-5 lg:text-base/7",
      "square-petite": "size-9 shrink-0",
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full",
    },
    isDisabled: {
      true: "inset-ring-0 opacity-50 forced-colors:text-[GrayText]",
    },
    isPending: {
      true: "opacity-50",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    shape: "square",
  },
})

interface ButtonProps extends ButtonPrimitiveProps {
  intent?: "primary" | "secondary" | "danger" | "warning" | "outline" | "plain"
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small"
  shape?: "square" | "circle"
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, size, shape, ref, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          size,
          shape,
          className,
        }),
      )}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </ButtonPrimitive>
  )
}

export type { ButtonProps }
export { Button, buttonStyles }

```

Install NPM dependencies:
```bash
tailwind-variants, react-aria-components
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
