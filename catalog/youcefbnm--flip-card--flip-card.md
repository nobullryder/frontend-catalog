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
flip-card.tsx
"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

const TRANSITION_CONFIG = {
  duration: 0.7,
  ease: [0.4, 0.2, 0.2, 1],
  transition: "0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
} as const
const TRANSFORM_STYLES: React.CSSProperties = {
  transformStyle: "preserve-3d",
  perspective: "1000px",
  backfaceVisibility: "hidden",
}

type FlipDirection = "horizontal" | "vertical"
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  flipDirection?: FlipDirection
  initialFlipped?: boolean
  onFlip?: (isFlipped: boolean) => void
  disabled?: boolean
}
interface FlipCardContextValue {
  isFlipped: boolean
  flipDirection: FlipDirection
  disabled?: boolean
}

const FlipCardContext = React.createContext<FlipCardContextValue | undefined>(
  undefined
)
function useFlipCardContext() {
  const context = React.useContext(FlipCardContext)
  if (!context) {
    throw new Error("useFlipCardContext must be used within a FlipCard")
  }
  return context
}

const FlipCard = React.memo(
  React.forwardRef<HTMLDivElement, FlipCardProps>(
    (
      {
        className,
        flipDirection = "horizontal",
        initialFlipped = false,
        onFlip,
        disabled,
        ...props
      },
      ref
    ) => {
      const [isFlipped, setIsFlipped] = React.useState(initialFlipped)

      const handleMouseEnter = React.useCallback(() => {
        if (!disabled) {
          setIsFlipped(true)
          onFlip?.(true)
        }
      }, [disabled, onFlip])

      const handleMouseLeave = React.useCallback(() => {
        if (!disabled) {
          setIsFlipped(false)
          onFlip?.(false)
        }
      }, [disabled, onFlip])

      const contextValue = React.useMemo(
        () => ({ isFlipped, flipDirection, disabled }),
        [isFlipped, flipDirection, disabled]
      )

      return (
        <FlipCardContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(
              "relative border-none bg-none shadow-none",
              disabled && "pointer-events-none",
              className
            )}
            style={{
              ...TRANSFORM_STYLES,
              ...props.style,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isFlipped}
            {...props}
          />
        </FlipCardContext.Provider>
      )
    }
  )
)
FlipCard.displayName = "FlipCard"

const FlipCardFront = React.memo(
  React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => {
      const { isFlipped, flipDirection } = useFlipCardContext()

      const rotation = React.useMemo(() => {
        if (!isFlipped) return { rotateX: 0, rotateY: 0 }
        return flipDirection === "horizontal"
          ? { rotateY: -180, rotateX: 0 }
          : { rotateX: -180, rotateY: 0 }
      }, [isFlipped, flipDirection])

      return (
        <motion.div
          ref={ref}
          className={cn(
            "absolute inset-0 z-20 size-full overflow-hidden",
            className
          )}
          initial={false}
          animate={rotation}
          transition={TRANSITION_CONFIG}
          style={{
            ...TRANSFORM_STYLES,
            ...props.style,
          }}
          {...props}
        />
      )
    }
  )
)
FlipCardFront.displayName = "FlipCardFront"

const FlipCardBack = React.memo(
  React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => {
      const { isFlipped, flipDirection } = useFlipCardContext()

      const rotation = React.useMemo(() => {
        if (isFlipped) return { rotateX: 0, rotateY: 0 }
        return flipDirection === "horizontal"
          ? { rotateY: 180, rotateX: 0 }
          : { rotateX: 180, rotateY: 0 }
      }, [isFlipped, flipDirection])

      return (
        <motion.div
          ref={ref}
          className={cn("absolute inset-0 z-10 size-full", className)}
          initial={false}
          animate={rotation}
          transition={TRANSITION_CONFIG}
          style={{
            ...TRANSFORM_STYLES,
            ...props.style,
          }}
          {...props}
        />
      )
    }
  )
)
FlipCardBack.displayName = "FlipCardBack"

export { FlipCard, FlipCardFront, FlipCardBack }

code.demo.tsx
"use client";
import * as React from "react"
import {FlipCard,FlipCardFront, FlipCardBack} from "@/components/ui/flip-card"
import { Button } from "@/components/ui/button"
export function FlipCardDemo() {
    return (
        <div className="container py-12">
            <div className="flex flex-wrap justify-center gap-4">
        <FlipCard className="h-96 w-2/6">
          <FlipCardFront className="rounded-xl">
            <img
              width={1015}
              height={678}
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="nike air jordan"
              className="size-full object-cover"
            />
          </FlipCardFront>
          <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-rose-600 px-4 py-6 text-center text-white">
            <h2 className="text-xl font-bold">Nike Air Jordan</h2>
            <h4 className="mb-4">€ 1,299.00</h4>
            <Button className="rounded-full">Add to cart</Button>
          </FlipCardBack>
        </FlipCard>

        <FlipCard flipDirection="vertical" className="h-96 w-2/6">
          <FlipCardFront className="rounded-xl">
            <img
              width={542}
              height={678}
              src="https://images.unsplash.com/photo-1617814121568-9b184eaabf08?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="nike air jordan"
              className="size-full object-cover"
            />
          </FlipCardFront>
          <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-emerald-500 px-4 py-6 text-center text-white">
            <h2 className="text-xl font-bold">Nike Air Jordan</h2>
            <h4 className="mb-4">€ 1,299.00</h4>
            <Button className="rounded-full">Add to cart</Button>
          </FlipCardBack>
        </FlipCard>
      </div>
        </div>
    )
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/flip-card.tsx
"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

const TRANSITION_CONFIG = {
  duration: 0.7,
  ease: [0.4, 0.2, 0.2, 1],
  transition: "0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
} as const
const TRANSFORM_STYLES: React.CSSProperties = {
  transformStyle: "preserve-3d",
  perspective: "1000px",
  backfaceVisibility: "hidden",
}

type FlipDirection = "horizontal" | "vertical"
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  flipDirection?: FlipDirection
  initialFlipped?: boolean
  onFlip?: (isFlipped: boolean) => void
  disabled?: boolean
}
interface FlipCardContextValue {
  isFlipped: boolean
  flipDirection: FlipDirection
  disabled?: boolean
}

const FlipCardContext = React.createContext<FlipCardContextValue | undefined>(
  undefined
)
function useFlipCardContext() {
  const context = React.useContext(FlipCardContext)
  if (!context) {
    throw new Error("useFlipCardContext must be used within a FlipCard")
  }
  return context
}

const FlipCard = React.memo(
  React.forwardRef<HTMLDivElement, FlipCardProps>(
    (
      {
        className,
        flipDirection = "horizontal",
        initialFlipped = false,
        onFlip,
        disabled,
        ...props
      },
      ref
    ) => {
      const [isFlipped, setIsFlipped] = React.useState(initialFlipped)

      const handleMouseEnter = React.useCallback(() => {
        if (!disabled) {
          setIsFlipped(true)
          onFlip?.(true)
        }
      }, [disabled, onFlip])

      const handleMouseLeave = React.useCallback(() => {
        if (!disabled) {
          setIsFlipped(false)
          onFlip?.(false)
        }
      }, [disabled, onFlip])

      const contextValue = React.useMemo(
        () => ({ isFlipped, flipDirection, disabled }),
        [isFlipped, flipDirection, disabled]
      )

      return (
        <FlipCardContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(
              "relative border-none bg-none shadow-none",
              disabled && "pointer-events-none",
              className
            )}
            style={{
              ...TRANSFORM_STYLES,
              ...props.style,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isFlipped}
            {...props}
          />
        </FlipCardContext.Provider>
      )
    }
  )
)
FlipCard.displayName = "FlipCard"

const FlipCardFront = React.memo(
  React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => {
      const { isFlipped, flipDirection } = useFlipCardContext()

      const rotation = React.useMemo(() => {
        if (!isFlipped) return { rotateX: 0, rotateY: 0 }
        return flipDirection === "horizontal"
          ? { rotateY: -180, rotateX: 0 }
          : { rotateX: -180, rotateY: 0 }
      }, [isFlipped, flipDirection])

      return (
        <motion.div
          ref={ref}
          className={cn(
            "absolute inset-0 z-20 size-full overflow-hidden",
            className
          )}
          initial={false}
          animate={rotation}
          transition={TRANSITION_CONFIG}
          style={{
            ...TRANSFORM_STYLES,
            ...props.style,
          }}
          {...props}
        />
      )
    }
  )
)
FlipCardFront.displayName = "FlipCardFront"

const FlipCardBack = React.memo(
  React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => {
      const { isFlipped, flipDirection } = useFlipCardContext()

      const rotation = React.useMemo(() => {
        if (isFlipped) return { rotateX: 0, rotateY: 0 }
        return flipDirection === "horizontal"
          ? { rotateY: 180, rotateX: 0 }
          : { rotateX: 180, rotateY: 0 }
      }, [isFlipped, flipDirection])

      return (
        <motion.div
          ref={ref}
          className={cn("absolute inset-0 z-10 size-full", className)}
          initial={false}
          animate={rotation}
          transition={TRANSITION_CONFIG}
          style={{
            ...TRANSFORM_STYLES,
            ...props.style,
          }}
          {...props}
        />
      )
    }
  )
)
FlipCardBack.displayName = "FlipCardBack"

export { FlipCard, FlipCardFront, FlipCardBack }
```

Install NPM dependencies:
```bash
motion
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
