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
animated-vercel-like-button.tsx
"use client"

import * as React from "react"
import type { IconWeight } from "@phosphor-icons/react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

// Spinner from shadcn-spinner.vercel.app, created by
// Alípio Pereira, Twitter: @allpiopereira
const spinnerVariants = cva("relative block opacity-[0.65]", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  loading?: boolean
  asChild?: boolean
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, loading = true, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"

    const [bgColorClass, filteredClassName] = React.useMemo(() => {
      const bgClass = className?.match(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g) || []
      const filteredClasses = className
        ?.replace(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g, "")
        .trim()
      return [bgClass, filteredClasses]
    }, [className])

    if (!loading) return null

    return (
      <Comp
        className={cn(spinnerVariants({ size, className: filteredClassName }))}
        ref={ref}
        {...props}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 w-[12.5%] h-full animate-spinner-leaf-fade"
            style={{
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${-(7 - i) * 100}ms`,
            }}
          >
            <span
              className={cn("block w-full h-[30%] rounded-full", bgColorClass)}
            ></span>
          </span>
        ))}
      </Comp>
    )
  }
)

Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }

// Animated Vercel Button
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-white shadow-xs focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground/85 hover:text-foreground shadow-xs dark:bg-input/30 dark:border-input",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "text-foreground/85 hover:text-foreground hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  disableWhileTap?: boolean
  icon?: React.ComponentType<{
    size?: number
    className?: string
    weight?: IconWeight
  }>
  iconWeight?: IconWeight
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText,
  disableWhileTap = false,
  icon: Icon,
  iconWeight,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const [hasBeenLoading, setHasBeenLoading] = React.useState(false)

  // Track if button has been in loading state
  React.useEffect(() => {
    if (loading) {
      setHasBeenLoading(true)
    }
  }, [loading])

  // If asChild and loading, we can't control the content
  if (asChild && loading) {
    console.warn("Button: 'loading' prop is ignored when 'asChild' is true")
  }

  // Calculated dimensions for icon and spinner to avoid layout shifts
  const iconPixelSize = React.useMemo(() => {
    if (size === "sm") return 16
    if (size === "lg") return 20
    return 18
  }, [size])

  const spinnerPixelSize = React.useMemo(() => {
    if (size === "lg") return 24
    return 18
  }, [size])

  const hasAdornment = loading || !!Icon
  const adornmentWidth = hasAdornment
    ? loading
      ? spinnerPixelSize
      : Icon
        ? iconPixelSize
        : 0
    : 0

  return (
    <motion.div
      whileTap={
        disableWhileTap || loading || disabled ? undefined : { scale: 0.97 }
      }
      transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        style={style}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <div className="flex items-center justify-center">
              {/* Fixed wrapper for icon/spinner to prevent layout shifts */}
              <AnimatePresence initial={false}>
                {(Icon || loading) && (
                  <motion.div
                    key="adornment-wrapper"
                    initial={{ opacity: 0, marginRight: 0, width: 0 }}
                    animate={{
                      opacity: 1,
                      marginRight: 8,
                      width: adornmentWidth,
                    }}
                    exit={{
                      opacity: 0,
                      marginRight: 0,
                      width: 0,
                      transition: {
                        width: { duration: 0.1, ease: "easeOut" },
                        marginRight: { duration: 0.1, ease: "easeOut" },
                        opacity: { duration: 0.15, ease: "easeOut" },
                      },
                    }}
                    transition={{
                      duration: 0.18,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden flex items-center justify-center"
                    style={{ height: iconPixelSize }}
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {loading ? (
                        <motion.div
                          key="spinner"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{
                            duration: 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="flex items-center justify-center"
                          style={{
                            width: spinnerPixelSize,
                            height: spinnerPixelSize,
                          }}
                        >
                          <Spinner
                            size={size === "lg" ? "md" : "sm"}
                            className="bg-current"
                          />
                        </motion.div>
                      ) : Icon ? (
                        <motion.div
                          key="icon"
                          initial={
                            hasBeenLoading ? { opacity: 0, scale: 0.7 } : false
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{
                            duration: 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="flex items-center justify-center"
                          style={{
                            width: iconPixelSize,
                            height: iconPixelSize,
                          }}
                        >
                          <Icon
                            size={iconPixelSize}
                            className="shrink-0"
                            weight={iconWeight ?? "regular"}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="flex items-center">
                {loading ? loadingText || children : children}
              </span>
            </div>
          </>
        )}
      </Comp>
    </motion.div>
  )
}

export { Button, buttonVariants, type ButtonProps }

code.demo.1756688865373.tsx
import * as React from "react"

import {
  ArrowsClockwiseIcon,
  FloppyDiskIcon,
  PencilSimpleIcon,
  ShareNetworkIcon,
  TrashIcon,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/animated-vercel-like-button";

// Without icon demo
export function WithoutIconDemo() {
  const [loading, setLoading] = React.useState(false)
  const [loadingVariant, setLoadingVariant] = React.useState<
    "default" | "destructive" | "outline" | "secondary" | "ghost"
  >("default")

  const handleLoadingTest = (variant: typeof loadingVariant) => {
    setLoadingVariant(variant)
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md mx-auto space-y-8 text-center">
        <div className="space-y-4">
          <Button
            className="w-full"
            loading={loading && loadingVariant === "default"}
            onClick={() => handleLoadingTest("default")}
            variant="default"
          >
            Save
          </Button>

          <Button
            className="w-full"
            loading={loading && loadingVariant === "destructive"}
            onClick={() => handleLoadingTest("destructive")}
            variant="destructive"
          >
            Delete
          </Button>

          <Button
            className="w-full"
            loading={loading && loadingVariant === "outline"}
            onClick={() => handleLoadingTest("outline")}
            variant="outline"
          >
            Refresh
          </Button>

          <Button
            className="w-full"
            loading={loading && loadingVariant === "secondary"}
            onClick={() => handleLoadingTest("secondary")}
            variant="secondary"
          >
            Edit
          </Button>
          <Button
            className="w-full"
            loading={loading && loadingVariant === "ghost"}
            onClick={() => handleLoadingTest("ghost")}
            variant="ghost"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}

// With icon demo
export function WithIconDemo() {
  const [loadingStates, setLoadingStates] = React.useState<
    Record<string, boolean>
  >({})

  const handleAction = (actionId: string, duration = 2000) => {
    setLoadingStates((prev) => ({ ...prev, [actionId]: true }))
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [actionId]: false }))
    }, duration)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="grid gap-4 items-center justify-center">
          <Button
            icon={FloppyDiskIcon}
            loading={loadingStates.save}
            onClick={() => handleAction("save")}
            variant="default"
            className="w-full"
          >
            Save
          </Button>

          <Button
            icon={TrashIcon}
            loading={loadingStates.delete}
            onClick={() => handleAction("delete", 1500)}
            variant="destructive"
            className="w-full"
          >
            Delete
          </Button>

          <Button
            icon={ArrowsClockwiseIcon}
            loading={loadingStates.refresh}
            onClick={() => handleAction("refresh", 1000)}
            variant="outline"
            className="w-full"
          >
            Refresh
          </Button>

          <Button
            icon={PencilSimpleIcon}
            loading={loadingStates.edit}
            onClick={() => handleAction("edit")}
            variant="secondary"
            className="w-full"
          >
            Edit
          </Button>

          <Button
            icon={ShareNetworkIcon}
            loading={loadingStates.share}
            onClick={() => handleAction("share")}
            variant="ghost"
            className="w-full"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Demo() {
  return <div className="flex">
  <WithIconDemo />
  <WithoutIconDemo />
  </div>
}

export default function DemoOne() {
  return <Demo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-vercel-like-button.tsx
"use client"

import * as React from "react"
import type { IconWeight } from "@phosphor-icons/react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

// Spinner from shadcn-spinner.vercel.app, created by
// Alípio Pereira, Twitter: @allpiopereira
const spinnerVariants = cva("relative block opacity-[0.65]", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  loading?: boolean
  asChild?: boolean
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, loading = true, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"

    const [bgColorClass, filteredClassName] = React.useMemo(() => {
      const bgClass = className?.match(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g) || []
      const filteredClasses = className
        ?.replace(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g, "")
        .trim()
      return [bgClass, filteredClasses]
    }, [className])

    if (!loading) return null

    return (
      <Comp
        className={cn(spinnerVariants({ size, className: filteredClassName }))}
        ref={ref}
        {...props}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 left-1/2 w-[12.5%] h-full animate-spinner-leaf-fade"
            style={{
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${-(7 - i) * 100}ms`,
            }}
          >
            <span
              className={cn("block w-full h-[30%] rounded-full", bgColorClass)}
            ></span>
          </span>
        ))}
      </Comp>
    )
  }
)

Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }

// Animated Vercel Button
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-white shadow-xs focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground/85 hover:text-foreground shadow-xs dark:bg-input/30 dark:border-input",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "text-foreground/85 hover:text-foreground hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  disableWhileTap?: boolean
  icon?: React.ComponentType<{
    size?: number
    className?: string
    weight?: IconWeight
  }>
  iconWeight?: IconWeight
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText,
  disableWhileTap = false,
  icon: Icon,
  iconWeight,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const [hasBeenLoading, setHasBeenLoading] = React.useState(false)

  // Track if button has been in loading state
  React.useEffect(() => {
    if (loading) {
      setHasBeenLoading(true)
    }
  }, [loading])

  // If asChild and loading, we can't control the content
  if (asChild && loading) {
    console.warn("Button: 'loading' prop is ignored when 'asChild' is true")
  }

  // Calculated dimensions for icon and spinner to avoid layout shifts
  const iconPixelSize = React.useMemo(() => {
    if (size === "sm") return 16
    if (size === "lg") return 20
    return 18
  }, [size])

  const spinnerPixelSize = React.useMemo(() => {
    if (size === "lg") return 24
    return 18
  }, [size])

  const hasAdornment = loading || !!Icon
  const adornmentWidth = hasAdornment
    ? loading
      ? spinnerPixelSize
      : Icon
        ? iconPixelSize
        : 0
    : 0

  return (
    <motion.div
      whileTap={
        disableWhileTap || loading || disabled ? undefined : { scale: 0.97 }
      }
      transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        style={style}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <div className="flex items-center justify-center">
              {/* Fixed wrapper for icon/spinner to prevent layout shifts */}
              <AnimatePresence initial={false}>
                {(Icon || loading) && (
                  <motion.div
                    key="adornment-wrapper"
                    initial={{ opacity: 0, marginRight: 0, width: 0 }}
                    animate={{
                      opacity: 1,
                      marginRight: 8,
                      width: adornmentWidth,
                    }}
                    exit={{
                      opacity: 0,
                      marginRight: 0,
                      width: 0,
                      transition: {
                        width: { duration: 0.1, ease: "easeOut" },
                        marginRight: { duration: 0.1, ease: "easeOut" },
                        opacity: { duration: 0.15, ease: "easeOut" },
                      },
                    }}
                    transition={{
                      duration: 0.18,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden flex items-center justify-center"
                    style={{ height: iconPixelSize }}
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {loading ? (
                        <motion.div
                          key="spinner"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{
                            duration: 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="flex items-center justify-center"
                          style={{
                            width: spinnerPixelSize,
                            height: spinnerPixelSize,
                          }}
                        >
                          <Spinner
                            size={size === "lg" ? "md" : "sm"}
                            className="bg-current"
                          />
                        </motion.div>
                      ) : Icon ? (
                        <motion.div
                          key="icon"
                          initial={
                            hasBeenLoading ? { opacity: 0, scale: 0.7 } : false
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{
                            duration: 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="flex items-center justify-center"
                          style={{
                            width: iconPixelSize,
                            height: iconPixelSize,
                          }}
                        >
                          <Icon
                            size={iconPixelSize}
                            className="shrink-0"
                            weight={iconWeight ?? "regular"}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="flex items-center">
                {loading ? loadingText || children : children}
              </span>
            </div>
          </>
        )}
      </Comp>
    </motion.div>
  )
}

export { Button, buttonVariants, type ButtonProps }
```

Install NPM dependencies:
```bash
motion, @radix-ui/react-slot, @phosphor-icons/react, class-variance-authority
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
