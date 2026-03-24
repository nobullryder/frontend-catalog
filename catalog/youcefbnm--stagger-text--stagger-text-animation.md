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
stagger-text.tsx
"use client"

import * as React from "react"
import { HTMLMotionProps, Transition, motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

const easeTransitions = {
  default: [0.25, 0.1, 0.25, 1],
  transform: [0.42, 0, 0.58, 1], 
  opacity: [0.25, 0.1, 0.25, 1], 
  clipPath: [0.6, 0.04, 0.98, 0.335], 
}
export type TransformDirectionType = "top" | "bottom" | "left" | "right" | "z"
export const transformVariants = (direction?: TransformDirectionType) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
    scale: direction === "z" ? 0 : 1,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
})

interface WordProps {
  word: string
  transition?: Transition
  direction?: TransformDirectionType
}
const transitionConfig = { ease: easeTransitions["default"], duration: 0.5 }
function Word({
  word,
  transition = transitionConfig,
  direction = "bottom",
}: WordProps) {
  const characters = word.split("")
  return (
    <span className="inline-block text-nowrap align-top">
      {characters.map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span
            className="inline-block"
            variants={transformVariants(direction)}
            transition={transition}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

interface staggerTextProps extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  transition?: Transition
  direction?: TransformDirectionType
  className?: string
}
function StaggerText({
  text,
  stagger = 0.05,
  transition,
  direction,
  className,
  ...props
}: staggerTextProps) {
  const words = text.split(" ")
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  })

  return (
    <motion.div
      ref={ref}
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative", className)}
      {...props}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word transition={transition} direction={direction} word={word} />
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

export { StaggerText }


code.demo.tsx
import { StaggerText } from "@/components/ui/stagger-text"

export function StaggerTextDemo() {
  return (
    <div className="container mx-auto h-svh place-content-center text-center">
      <StaggerText
        className="text-3xl font-medium"
        text="Create beautiful stagger animation"
        direction="bottom"
      />
      <StaggerText
        className="text-3xl font-medium"
        text="Create beautiful stagger animation"
        direction="top"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/stagger-text.tsx
"use client"

import * as React from "react"
import { HTMLMotionProps, Transition, motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

const easeTransitions = {
  default: [0.25, 0.1, 0.25, 1],
  transform: [0.42, 0, 0.58, 1], 
  opacity: [0.25, 0.1, 0.25, 1], 
  clipPath: [0.6, 0.04, 0.98, 0.335], 
}
export type TransformDirectionType = "top" | "bottom" | "left" | "right" | "z"
export const transformVariants = (direction?: TransformDirectionType) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
    scale: direction === "z" ? 0 : 1,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
})

interface WordProps {
  word: string
  transition?: Transition
  direction?: TransformDirectionType
}
const transitionConfig = { ease: easeTransitions["default"], duration: 0.5 }
function Word({
  word,
  transition = transitionConfig,
  direction = "bottom",
}: WordProps) {
  const characters = word.split("")
  return (
    <span className="inline-block text-nowrap align-top">
      {characters.map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span
            className="inline-block"
            variants={transformVariants(direction)}
            transition={transition}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

interface staggerTextProps extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  transition?: Transition
  direction?: TransformDirectionType
  className?: string
}
function StaggerText({
  text,
  stagger = 0.05,
  transition,
  direction,
  className,
  ...props
}: staggerTextProps) {
  const words = text.split(" ")
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  })

  return (
    <motion.div
      ref={ref}
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative", className)}
      {...props}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word transition={transition} direction={direction} word={word} />
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

export { StaggerText }

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
