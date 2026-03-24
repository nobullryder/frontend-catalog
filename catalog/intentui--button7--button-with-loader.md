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
button7.tsx
"use client"

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

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

interface ButtonProps extends ButtonPrimitiveProps, VariantProps<typeof buttonStyles> {
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, size, isCircle, ref, ...props }: ButtonProps) => {
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

export type { ButtonProps }
export { Button, buttonStyles }


code.demo.1756779195600.tsx
"use client"

import { IconCircleCheckFill, IconKey, IconLoader } from "@intentui/icons"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "react-aria-components"
import { twMerge } from "tailwind-merge"
import type { VariantProps } from "tailwind-variants"
import { tv } from "tailwind-variants"

const loaderStyles = tv({
  base: "relative",
  variants: {
    intent: {
      current: "text-current",
      primary: "text-primary",
      secondary: "text-muted-fg",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
    },
  },
  defaultVariants: {
    intent: "current",
    size: "sm",
  },
})

type LoaderVariantProps = VariantProps<typeof loaderStyles>

const Bars = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={twMerge("size-4", className)}
    data-slot="icon"
    viewBox="0 0 135 140"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <rect y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.5s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.5s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="30" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.25s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.25s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="60" width="15" height="140" rx="6">
      <animate
        attributeName="height"
        begin="0s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="90" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.25s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.25s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="120" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.5s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.5s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
)

const Ring = (props: React.SVGProps<SVGSVGElement>) => <IconLoader {...props} />
const Spin = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={twMerge("size-4", className)}
    data-slot="icon"
    viewBox="0 0 2400 2400"
    {...props}
  >
    <g strokeWidth="200" strokeLinecap="round" fill="none">
      <line x1="1200" y1="600" x2="1200" y2="100" />
      <line opacity="0.5" x1="1200" y1="2300" x2="1200" y2="1800" />
      <line opacity="0.917" x1="900" y1="680.4" x2="650" y2="247.4" />
      <line opacity="0.417" x1="1750" y1="2152.6" x2="1500" y2="1719.6" />
      <line opacity="0.833" x1="680.4" y1="900" x2="247.4" y2="650" />
      <line opacity="0.333" x1="2152.6" y1="1750" x2="1719.6" y2="1500" />
      <line opacity="0.75" x1="600" y1="1200" x2="100" y2="1200" />
      <line opacity="0.25" x1="2300" y1="1200" x2="1800" y2="1200" />
      <line opacity="0.667" x1="680.4" y1="1500" x2="247.4" y2="1750" />
      <line opacity="0.167" x1="2152.6" y1="650" x2="1719.6" y2="900" />
      <line opacity="0.583" x1="900" y1="1719.6" x2="650" y2="2152.6" />
      <line opacity="0.083" x1="1750" y1="247.4" x2="1500" y2="680.4" />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
        values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
        dur="0.83333s"
        begin="0.08333s"
        repeatCount="indefinite"
        calcMode="discrete"
      />
    </g>
  </svg>
)

const LOADERS = {
  bars: Bars,
  ring: Ring,
  spin: Spin,
}

const DEFAULT_SPINNER = "spin"

interface LoaderProps
  extends Omit<React.ComponentPropsWithoutRef<"svg">, "display" | "opacity" | "intent">,
    LoaderVariantProps {
  variant?: keyof typeof LOADERS
  percentage?: number
  isIndeterminate?: boolean
  formatOptions?: Intl.NumberFormatOptions
  ref?: React.RefObject<SVGSVGElement>
}

const Loader = ({ isIndeterminate = true, ref, ...props }: LoaderProps) => {
  const { className, variant = DEFAULT_SPINNER, intent, size, ...spinnerProps } = props
  const LoaderPrimitive = LOADERS[variant in LOADERS ? variant : DEFAULT_SPINNER]

  return (
    <ProgressBar
      data-slot="loader"
      aria-label={props["aria-label"] ?? "Loading..."}
      formatOptions={props.formatOptions}
      isIndeterminate={isIndeterminate}
    >
      <LoaderPrimitive
        role="presentation"
        className={loaderStyles({
          intent,
          size,
          className: twMerge([
            ["ring"].includes(variant) && "animate-spin",
            variant === "spin" && "stroke-current",
            className,
          ]),
        })}
        ref={ref}
        {...spinnerProps}
      />
    </ProgressBar>
  )
}

// --- Main component using the inlined Loader ---
// Key changes:
// 1) `clickCount` increments on press — used as `key` to force remount of Loader
// 2) Handler attached to both onPress and onClick to ensure it fires
export default function Component() {
  const [loading, setLoading] = useState<"idle" | "loading" | "success">("idle")
  const [clickCount, setClickCount] = useState(0) // forces remount

  const pressHandler = () => {
    // force remount every click so SMIL animations restart
    setClickCount((c) => c + 1)
    setLoading("loading")

    setTimeout(() => setLoading("success"), 3000)
    setTimeout(() => setLoading("idle"), 6000)
  }

  return (
    <Button
      // attach both handlers (some button libs expect onPress, others onClick)
      onPress={pressHandler}
      onClick={pressHandler}
      isPending={loading === "loading"}
      className="w-52 justify-between px-4 py-2"
      intent="primary"
    >
      {loading === "success" ? (
        <IconCircleCheckFill />
      ) : loading === "loading" ? (
        // key={clickCount} forces the Loader SVG to remount each click (restarts SMIL)
        <Loader key={clickCount} variant="spin" />
      ) : (
        <IconKey />
      )}

      {loading === "loading"
        ? "Generating Key..."
        : loading === "success"
        ? "Key Generated!"
        : "Generate API Key"}
    </Button>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button7.tsx
"use client"

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

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

interface ButtonProps extends ButtonPrimitiveProps, VariantProps<typeof buttonStyles> {
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, size, isCircle, ref, ...props }: ButtonProps) => {
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
