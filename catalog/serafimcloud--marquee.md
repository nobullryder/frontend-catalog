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
marquee.tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  repeat?: number
  duration?: number
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  strokeWidth?: string
}

const fontSizeClasses = {
  sm: "text-5xl sm:text-6xl md:text-7xl",
  md: "text-6xl sm:text-7xl md:text-8xl",
  lg: "text-7xl sm:text-8xl md:text-9xl",
  xl: "text-8xl sm:text-9xl md:text-[10rem]",
  "2xl": "text-9xl sm:text-[10rem] md:text-[11rem]",
  "3xl": "text-[10rem] sm:text-[11rem] md:text-[12rem]",
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({
    className,
    text,
    repeat = 4,
    duration = 20,
    fontSize = "lg",
    strokeWidth = "1px",
    ...props
  }, ref) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-screen overflow-hidden py-16",
          className
        )}
        {...props}
      >
        <>
          <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-gradient-to-l from-background to-transparent z-10" />
        </>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ 
            x: ["0%", "-50%"]
          }}
          transition={{ 
            repeat: Number.POSITIVE_INFINITY, 
            ease: "linear", 
            duration,
          }}
        >
          {[...Array(repeat)].map((_, index) => (
            <div key={index} className="flex items-center mx-4">
              <span
                className={cn(
                  fontSizeClasses[fontSize],
                  "font-bold text-transparent px-4"
                )}
                style={{
                  WebkitTextStroke: `${strokeWidth} ${isDark ? 'rgb(64 64 64)' : 'rgb(156 163 175)'}`,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Marquee.displayName = "Marquee"

code.demo.tsx
"use client"

import { Marquee } from "@/components/ui/marquee"

export function MarqueeDemo() {
  return (
    <div className="space-y-8">
      <Marquee text="Flowers & Saints" />
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/marquee.tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  repeat?: number
  duration?: number
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  strokeWidth?: string
}

const fontSizeClasses = {
  sm: "text-5xl sm:text-6xl md:text-7xl",
  md: "text-6xl sm:text-7xl md:text-8xl",
  lg: "text-7xl sm:text-8xl md:text-9xl",
  xl: "text-8xl sm:text-9xl md:text-[10rem]",
  "2xl": "text-9xl sm:text-[10rem] md:text-[11rem]",
  "3xl": "text-[10rem] sm:text-[11rem] md:text-[12rem]",
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({
    className,
    text,
    repeat = 4,
    duration = 20,
    fontSize = "lg",
    strokeWidth = "1px",
    ...props
  }, ref) => {
    const { theme } = useTheme()
    const isDark = theme === "dark"

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-screen overflow-hidden py-16",
          className
        )}
        {...props}
      >
        <>
          <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-gradient-to-l from-background to-transparent z-10" />
        </>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ 
            x: ["0%", "-50%"]
          }}
          transition={{ 
            repeat: Number.POSITIVE_INFINITY, 
            ease: "linear", 
            duration,
          }}
        >
          {[...Array(repeat)].map((_, index) => (
            <div key={index} className="flex items-center mx-4">
              <span
                className={cn(
                  fontSizeClasses[fontSize],
                  "font-bold text-transparent px-4"
                )}
                style={{
                  WebkitTextStroke: `${strokeWidth} ${isDark ? 'rgb(64 64 64)' : 'rgb(156 163 175)'}`,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Marquee.displayName = "Marquee"
```

Install NPM dependencies:
```bash
framer-motion
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
