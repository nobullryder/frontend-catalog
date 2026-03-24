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
file-trigger-13.tsx
"use client"

import { IconCamera, IconFolder, IconPaperclip45 } from "@intentui/icons"
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components"
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"
import { Loader } from "@/components/ui/loader"

//
// buttonStyles (inlined)
//
const buttonStyles = tv({
  base: [
    "[--btn-icon-active:var(--btn-fg)] [--btn-outline:var(--btn-bg)] [--btn-ring:var(--btn-bg)]/20",
    "bg-(--btn-bg) pressed:bg-(--btn-overlay) text-(--btn-fg) outline-(--btn-outline) ring-(--btn-ring) hover:bg-(--btn-overlay)",
    "relative inset-ring inset-ring-fg/15 isolate inline-flex items-center justify-center font-medium",
    "focus:outline-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-offset-bg",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) pressed:*:data-[slot=icon]:text-(--btn-icon-active) focus-visible:*:data-[slot=icon]:text-(--btn-icon-active)/80 hover:*:data-[slot=icon]:text-(--btn-icon-active)/90 sm:*:data-[slot=icon]:my-0 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    "*:data-[slot=loader]:-mx-0.5 *:data-[slot=loader]:my-0 *:data-[slot=loader]:shrink-0 *:data-[slot=loader]:self-center *:data-[slot=loader]:text-(--btn-icon) sm:*:data-[slot=loader]:my-0",
  ],
  variants: {
    intent: {
      primary:
        "[--btn-bg:var(--color-primary)] [--btn-fg:var(--color-primary-fg)] [--btn-icon:color-mix(in_oklab,var(--primary-fg)_60%,var(--primary))] [--btn-overlay:var(--color-primary)]/85",
      secondary:
        "[--btn-bg:var(--color-secondary)] [--btn-fg:var(--color-secondary-fg)] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-secondary-fg)] [--btn-overlay:var(--color-secondary)]/85 [--btn-ring:var(--color-muted-fg)]/20",
      warning:
        "[--btn-bg:var(--color-warning)] [--btn-fg:var(--color-warning-fg)] [--btn-icon:color-mix(in_oklab,var(--warning-fg)_60%,var(--warning))] [--btn-overlay:var(--color-warning)]/85",
      danger:
        "[--btn-bg:var(--color-danger)] [--btn-fg:var(--color-danger-fg)] [--btn-icon:color-mix(in_oklab,var(--danger-fg)_60%,var(--danger))] [--btn-overlay:var(--color-danger)]/85",
      outline:
        "inset-ring-border [--btn-bg:transparent] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-ring)] [--btn-overlay:var(--color-muted)] [--btn-ring:var(--color-ring)]/20",
      plain:
        "inset-ring-transparent [--btn-bg:transparent] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-ring)] [--btn-overlay:var(--color-muted)] [--btn-ring:var(--color-ring)]/20",
    },
    size: {
      xs: [
        "min-h-7.5 gap-x-1 px-2.5 py-1.5 text-sm sm:min-h-7 sm:px-2 sm:py-[--spacing(1.4)] sm:text-xs/4",
        "*:data-[slot=icon]:size-3.5 sm:*:data-[slot=icon]:size-3",
        "*:data-[slot=loader]:size-3.5 sm:*:data-[slot=loader]:size-3",
      ],
      sm: [
        "min-h-8.5 gap-x-1.5 px-3 py-1.5 text-sm/5 sm:min-h-8 sm:px-2.5 sm:py-1.5",
        "*:data-[slot=icon]:size-4.5 sm:*:data-[slot=icon]:size-4",
        "*:data-[slot=loader]:size-4.5 sm:*:data-[slot=loader]:size-4",
      ],
      md: [
        "min-h-9.5 gap-x-2 px-3.5 py-2 sm:min-h-9 sm:px-3 sm:py-1.5 sm:text-sm/6",
        "*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4",
        "*:data-[slot=loader]:size-5 sm:*:data-[slot=loader]:size-4",
      ],
      lg: [
        "min-h-10.5 gap-x-2 px-4 py-2.5 sm:min-h-10 sm:px-3.5 sm:py-2 sm:text-sm/6",
        "*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4.5",
        "*:data-[slot=loader]:size-5 sm:*:data-[slot=loader]:size-4.5",
      ],
      "sq-xs":
        "touch-hitbox size-7.5 *:data-[slot=icon]:size-3.5 *:data-[slot=loader]:size-3.5 sm:size-7 sm:*:data-[slot=icon]:size-3 sm:*:data-[slot=loader]:size-3",
      "sq-sm":
        "touch-hitbox size-8.5 *:data-[slot=icon]:size-4.5 *:data-[slot=loader]:size-4.5 sm:size-8 sm:*:data-[slot=icon]:size-4 sm:*:data-[slot=loader]:size-4",
      "sq-md":
        "touch-hitbox size-9.5 *:data-[slot=icon]:size-4.5 *:data-[slot=loader]:size-4.5 sm:size-9 sm:*:data-[slot=icon]:size-4 sm:*:data-[slot=loader]:size-4",
      "sq-lg":
        "touch-hitbox size-10.5 *:data-[slot=icon]:size-5 *:data-[slot=loader]:size-5 sm:size-10 sm:*:data-[slot=icon]:size-4.5 sm:*:data-[slot=loader]:size-4.5",
    },

    isCircle: {
      true: "rounded-full",
      false: "rounded-lg",
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
    size: "md",
    isCircle: false,
  },
})

//
// Inlined Button component (internal use only)
//
interface InternalButtonProps
  extends ButtonPrimitiveProps,
    VariantProps<typeof buttonStyles> {
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, size, isCircle, ref, ...props }: InternalButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          size,
          isCircle,
          className,
        }),
      )}
    >
      {(values) => (
        <>
          {typeof props.children === "function" ? props.children(values) : props.children}
        </>
      )}
    </ButtonPrimitive>
  )
}

//
// FileTrigger (uses inlined Button)
//
interface FileTriggerProps
  extends FileTriggerPrimitiveProps,
    VariantProps<typeof buttonStyles> {
  isDisabled?: boolean
  ref?: React.RefObject<HTMLInputElement>
  className?: string
}

const FileTrigger = ({
  intent = "outline",
  size = "md",
  isCircle = false,
  ref,
  className,
  ...props
}: FileTriggerProps) => {
  return (
    <FileTriggerPrimitive ref={ref} {...props}>
      <Button
        className={className}
        isDisabled={props.isDisabled}
        intent={intent}
        size={size}
        isCircle={isCircle}
      >
        {!props.isPending ? (
          props.defaultCamera ? (
            <IconCamera data-slot="icon" />
          ) : props.acceptDirectory ? (
            <IconFolder data-slot="icon" />
          ) : (
            <IconPaperclip45 data-slot="icon" />
          )
        ) : (
          <Loader data-slot="loader" />
        )}
        {props.children ? (
          props.children
        ) : (
          <>
            {props.allowsMultiple
              ? "Browse a files"
              : props.acceptDirectory
                ? "Browse"
                : "Browse a file"}
            ...
          </>
        )}
      </Button>
    </FileTriggerPrimitive>
  )
}

export type { FileTriggerProps }
export { FileTrigger }


code.demo.1756779282115.tsx
"use client"

import { FileTrigger } from "@/components/ui/file-trigger-13"

export default  function Component() {
  return <FileTrigger isCircle />
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/file-trigger-13.tsx
"use client"

import { IconCamera, IconFolder, IconPaperclip45 } from "@intentui/icons"
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components"
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"
import { Loader } from "@/components/ui/loader"

//
// buttonStyles (inlined)
//
const buttonStyles = tv({
  base: [
    "[--btn-icon-active:var(--btn-fg)] [--btn-outline:var(--btn-bg)] [--btn-ring:var(--btn-bg)]/20",
    "bg-(--btn-bg) pressed:bg-(--btn-overlay) text-(--btn-fg) outline-(--btn-outline) ring-(--btn-ring) hover:bg-(--btn-overlay)",
    "relative inset-ring inset-ring-fg/15 isolate inline-flex items-center justify-center font-medium",
    "focus:outline-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-offset-bg",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) pressed:*:data-[slot=icon]:text-(--btn-icon-active) focus-visible:*:data-[slot=icon]:text-(--btn-icon-active)/80 hover:*:data-[slot=icon]:text-(--btn-icon-active)/90 sm:*:data-[slot=icon]:my-0 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    "*:data-[slot=loader]:-mx-0.5 *:data-[slot=loader]:my-0 *:data-[slot=loader]:shrink-0 *:data-[slot=loader]:self-center *:data-[slot=loader]:text-(--btn-icon) sm:*:data-[slot=loader]:my-0",
  ],
  variants: {
    intent: {
      primary:
        "[--btn-bg:var(--color-primary)] [--btn-fg:var(--color-primary-fg)] [--btn-icon:color-mix(in_oklab,var(--primary-fg)_60%,var(--primary))] [--btn-overlay:var(--color-primary)]/85",
      secondary:
        "[--btn-bg:var(--color-secondary)] [--btn-fg:var(--color-secondary-fg)] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-secondary-fg)] [--btn-overlay:var(--color-secondary)]/85 [--btn-ring:var(--color-muted-fg)]/20",
      warning:
        "[--btn-bg:var(--color-warning)] [--btn-fg:var(--color-warning-fg)] [--btn-icon:color-mix(in_oklab,var(--warning-fg)_60%,var(--warning))] [--btn-overlay:var(--color-warning)]/85",
      danger:
        "[--btn-bg:var(--color-danger)] [--btn-fg:var(--color-danger-fg)] [--btn-icon:color-mix(in_oklab,var(--danger-fg)_60%,var(--danger))] [--btn-overlay:var(--color-danger)]/85",
      outline:
        "inset-ring-border [--btn-bg:transparent] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-ring)] [--btn-overlay:var(--color-muted)] [--btn-ring:var(--color-ring)]/20",
      plain:
        "inset-ring-transparent [--btn-bg:transparent] [--btn-icon:var(--color-muted-fg)] [--btn-outline:var(--color-ring)] [--btn-overlay:var(--color-muted)] [--btn-ring:var(--color-ring)]/20",
    },
    size: {
      xs: [
        "min-h-7.5 gap-x-1 px-2.5 py-1.5 text-sm sm:min-h-7 sm:px-2 sm:py-[--spacing(1.4)] sm:text-xs/4",
        "*:data-[slot=icon]:size-3.5 sm:*:data-[slot=icon]:size-3",
        "*:data-[slot=loader]:size-3.5 sm:*:data-[slot=loader]:size-3",
      ],
      sm: [
        "min-h-8.5 gap-x-1.5 px-3 py-1.5 text-sm/5 sm:min-h-8 sm:px-2.5 sm:py-1.5",
        "*:data-[slot=icon]:size-4.5 sm:*:data-[slot=icon]:size-4",
        "*:data-[slot=loader]:size-4.5 sm:*:data-[slot=loader]:size-4",
      ],
      md: [
        "min-h-9.5 gap-x-2 px-3.5 py-2 sm:min-h-9 sm:px-3 sm:py-1.5 sm:text-sm/6",
        "*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4",
        "*:data-[slot=loader]:size-5 sm:*:data-[slot=loader]:size-4",
      ],
      lg: [
        "min-h-10.5 gap-x-2 px-4 py-2.5 sm:min-h-10 sm:px-3.5 sm:py-2 sm:text-sm/6",
        "*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4.5",
        "*:data-[slot=loader]:size-5 sm:*:data-[slot=loader]:size-4.5",
      ],
      "sq-xs":
        "touch-hitbox size-7.5 *:data-[slot=icon]:size-3.5 *:data-[slot=loader]:size-3.5 sm:size-7 sm:*:data-[slot=icon]:size-3 sm:*:data-[slot=loader]:size-3",
      "sq-sm":
        "touch-hitbox size-8.5 *:data-[slot=icon]:size-4.5 *:data-[slot=loader]:size-4.5 sm:size-8 sm:*:data-[slot=icon]:size-4 sm:*:data-[slot=loader]:size-4",
      "sq-md":
        "touch-hitbox size-9.5 *:data-[slot=icon]:size-4.5 *:data-[slot=loader]:size-4.5 sm:size-9 sm:*:data-[slot=icon]:size-4 sm:*:data-[slot=loader]:size-4",
      "sq-lg":
        "touch-hitbox size-10.5 *:data-[slot=icon]:size-5 *:data-[slot=loader]:size-5 sm:size-10 sm:*:data-[slot=icon]:size-4.5 sm:*:data-[slot=loader]:size-4.5",
    },

    isCircle: {
      true: "rounded-full",
      false: "rounded-lg",
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
    size: "md",
    isCircle: false,
  },
})

//
// Inlined Button component (internal use only)
//
interface InternalButtonProps
  extends ButtonPrimitiveProps,
    VariantProps<typeof buttonStyles> {
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, size, isCircle, ref, ...props }: InternalButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          size,
          isCircle,
          className,
        }),
      )}
    >
      {(values) => (
        <>
          {typeof props.children === "function" ? props.children(values) : props.children}
        </>
      )}
    </ButtonPrimitive>
  )
}

//
// FileTrigger (uses inlined Button)
//
interface FileTriggerProps
  extends FileTriggerPrimitiveProps,
    VariantProps<typeof buttonStyles> {
  isDisabled?: boolean
  ref?: React.RefObject<HTMLInputElement>
  className?: string
}

const FileTrigger = ({
  intent = "outline",
  size = "md",
  isCircle = false,
  ref,
  className,
  ...props
}: FileTriggerProps) => {
  return (
    <FileTriggerPrimitive ref={ref} {...props}>
      <Button
        className={className}
        isDisabled={props.isDisabled}
        intent={intent}
        size={size}
        isCircle={isCircle}
      >
        {!props.isPending ? (
          props.defaultCamera ? (
            <IconCamera data-slot="icon" />
          ) : props.acceptDirectory ? (
            <IconFolder data-slot="icon" />
          ) : (
            <IconPaperclip45 data-slot="icon" />
          )
        ) : (
          <Loader data-slot="loader" />
        )}
        {props.children ? (
          props.children
        ) : (
          <>
            {props.allowsMultiple
              ? "Browse a files"
              : props.acceptDirectory
                ? "Browse"
                : "Browse a file"}
            ...
          </>
        )}
      </Button>
    </FileTriggerPrimitive>
  )
}

export type { FileTriggerProps }
export { FileTrigger }

```

Install NPM dependencies:
```bash
@intentui/icons, react-aria-components, tailwind-variants
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
