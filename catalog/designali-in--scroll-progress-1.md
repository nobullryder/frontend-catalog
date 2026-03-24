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
scroll-progress-1.tsx
"use client"

import { useState } from "react"  

import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"

import { cn } from "@/lib/utils"

const scrollProgressVariants = cva("fixed z-30 origin-left", {
  variants: {
    variant: {
      default: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
      rainbow:
        "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
      ocean: "bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600",
      sunset: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500",
      forest: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500",
      monochrome: "bg-gradient-to-r from-gray-600 via-gray-800 to-black",
      neon: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
      fire: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600",
      ice: "bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-400",
      gold: "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600",
      solid: "bg-blue-500",
      custom: "", // For custom gradients
    },
    size: {
      xs: "h-0.5",
      sm: "h-1",
      default: "h-1.5",
      lg: "h-2",
      xl: "h-3",
      "2xl": "h-4",
    },
    position: {
      top: "inset-x-0 top-0",
      bottom: "inset-x-0 bottom-0",
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      default: "rounded",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    glow: {
      none: "",
      sm: "shadow-sm",
      default: "shadow-md",
      lg: "shadow-lg drop-shadow-lg",
      xl: "shadow-xl drop-shadow-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    position: "top",
    rounded: "none",
    glow: "none",
  },
})

interface ScrollProgressProps
  extends VariantProps<typeof scrollProgressVariants> {
  className?: string
  customGradient?: string
  springConfig?: {
    stiffness?: number
    damping?: number
    restDelta?: number
  }
  showPercentage?: boolean
  percentagePosition?: "left" | "right" | "center"
  container?: React.RefObject<HTMLElement>
}

export function ScrollProgress({
  className,
  variant,
  size,
  position,
  rounded,
  glow,
  customGradient,
  springConfig = {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  },
  showPercentage = false,
  percentagePosition = "right",
  container,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(container ? { container } : undefined)
  const scaleX = useSpring(scrollYProgress, springConfig)

  const [percentage, setPercentage] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercentage(Math.round(latest * 100))
  })

  const progressBarClasses = cn(
    scrollProgressVariants({ variant, size, position, rounded, glow }),
    variant === "custom" && customGradient,
    className
  )

  const percentageClasses = cn(
    "fixed z-40 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded",
    position === "top" ? "top-2" : "bottom-2",
    percentagePosition === "left" && "left-4",
    percentagePosition === "right" && "right-4",
    percentagePosition === "center" && "left-1/2 -translate-x-1/2"
  )

  return (
    <>
      <motion.div
        className={progressBarClasses}
        style={{
          scaleX,
        }}
      />
      {showPercentage && (
        <motion.div
          className={percentageClasses}
          style={{
            opacity: scrollYProgress,
          }}
        >
          <motion.span>{percentage}%</motion.span>
        </motion.div>
      )}
    </>
  )
}


code.demo.1753763654665.tsx
import { ScrollProgress } from "@/components/ui/scroll-progress-1"

export default function DemoOne() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-3 p-6">
        <div className="py-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Scroll Progress Showcase</h1>
          <p className="text-muted-foreground text-lg">
            Customize the scroll progress component with different variants and
            options
          </p>
        </div>
        <ScrollProgress variant={"ice"} showPercentage />
        <ScrollProgress
          variant="rainbow"
          size="lg"
          position={"bottom"}
          showPercentage
           percentagePosition="left" 
        /> 
        <ScrollProgress
          variant="custom"
          customGradient="bg-gradient-to-r mt-18 from-rose-400 to-orange-300"
        />

        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="bg-card rounded-lg border p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Content Block {i + 1}
            </h3>
            <p className="text-muted-foreground mb-3">
              This is sample content to demonstrate the scroll progress
              functionality. As you scroll through this page, you'll see the
              progress indicator update in real-time based on your scroll
              position.
            </p>
            <p className="text-muted-foreground">
              Try changing the variant, size, position, and border radius
              options above to see how they affect the appearance of the scroll
              progress component.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-progress-1.tsx
"use client"

import { useState } from "react"  

import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"

import { cn } from "@/lib/utils"

const scrollProgressVariants = cva("fixed z-30 origin-left", {
  variants: {
    variant: {
      default: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
      rainbow:
        "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
      ocean: "bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600",
      sunset: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500",
      forest: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500",
      monochrome: "bg-gradient-to-r from-gray-600 via-gray-800 to-black",
      neon: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
      fire: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600",
      ice: "bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-400",
      gold: "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600",
      solid: "bg-blue-500",
      custom: "", // For custom gradients
    },
    size: {
      xs: "h-0.5",
      sm: "h-1",
      default: "h-1.5",
      lg: "h-2",
      xl: "h-3",
      "2xl": "h-4",
    },
    position: {
      top: "inset-x-0 top-0",
      bottom: "inset-x-0 bottom-0",
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      default: "rounded",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    glow: {
      none: "",
      sm: "shadow-sm",
      default: "shadow-md",
      lg: "shadow-lg drop-shadow-lg",
      xl: "shadow-xl drop-shadow-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    position: "top",
    rounded: "none",
    glow: "none",
  },
})

interface ScrollProgressProps
  extends VariantProps<typeof scrollProgressVariants> {
  className?: string
  customGradient?: string
  springConfig?: {
    stiffness?: number
    damping?: number
    restDelta?: number
  }
  showPercentage?: boolean
  percentagePosition?: "left" | "right" | "center"
  container?: React.RefObject<HTMLElement>
}

export function ScrollProgress({
  className,
  variant,
  size,
  position,
  rounded,
  glow,
  customGradient,
  springConfig = {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  },
  showPercentage = false,
  percentagePosition = "right",
  container,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(container ? { container } : undefined)
  const scaleX = useSpring(scrollYProgress, springConfig)

  const [percentage, setPercentage] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercentage(Math.round(latest * 100))
  })

  const progressBarClasses = cn(
    scrollProgressVariants({ variant, size, position, rounded, glow }),
    variant === "custom" && customGradient,
    className
  )

  const percentageClasses = cn(
    "fixed z-40 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded",
    position === "top" ? "top-2" : "bottom-2",
    percentagePosition === "left" && "left-4",
    percentagePosition === "right" && "right-4",
    percentagePosition === "center" && "left-1/2 -translate-x-1/2"
  )

  return (
    <>
      <motion.div
        className={progressBarClasses}
        style={{
          scaleX,
        }}
      />
      {showPercentage && (
        <motion.div
          className={percentageClasses}
          style={{
            opacity: scrollYProgress,
          }}
        >
          <motion.span>{percentage}%</motion.span>
        </motion.div>
      )}
    </>
  )
}

```

Install NPM dependencies:
```bash
class-variance-authority, framer-motion
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
