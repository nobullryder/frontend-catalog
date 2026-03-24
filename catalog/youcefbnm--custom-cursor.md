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
custom-cursor.tsx
"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

const customCursorSpringConfig = {
  damping: 25,
  stiffness: 250,
  mass: 1,
  restSpeed: 0.01,
  restDelta: 0.01,
  duration: 0.4,
}
function useFollowMouse() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const cursorXSpring = useSpring(cursorX, customCursorSpringConfig)
  const cursroYSpring = useSpring(cursorY, customCursorSpringConfig)

  React.useEffect(() => {
    const followMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }
    window.addEventListener("mousemove", followMouse)

    return () => {
      window.removeEventListener("mousemove", followMouse)
    }
  }, [])

  return {
    cursorXSpring,
    cursroYSpring,
  }
}

const customCursorVariants = {
  default: {
    scale: 1,
  },
  sm: {
    scale: 0.4,
  },
}

export function useSetCursorVariant() {
  const [cursorVariant, setCursorVariant] =
    React.useState<keyof typeof customCursorVariants>("default")
  const [cursorText, setCursorText] = React.useState<string>("")

  return {
    cursorVariant,
    setCursorVariant,
    cursorText,
    setCursorText,
  }
}

interface CustomCursorProps {
  variant?: keyof typeof customCursorVariants
  text?: string
  className?: string
}
export function CustomCursor({
  variant = "default",
  text = "",
  className,
}: CustomCursorProps) {
  const { cursorXSpring, cursroYSpring } = useFollowMouse()

  const isTextNotEmpty = text !== ""
  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 flex aspect-square min-h-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-center text-xs mix-blend-difference",
        className
      )}
      variants={customCursorVariants}
      animate={variant}
      style={{
        y: cursroYSpring,
        x: cursorXSpring,
      }}
    >
      <AnimatePresence>
        {isTextNotEmpty && (
          <motion.span
            className="inline-block"
            transition={{ duration: 0.3, ease: "easeIn" }}
            animate={isTextNotEmpty ? { y: "0%" } : { y: "100%" }}
            exit={{ y: "100%" }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}


code.demo.1739068882837.tsx
"use client"

import { Button } from "@/components/ui/button"
import { CustomCursor, useSetCursorVariant } from "@/components/ui/custom-cursor"

export function CustomCursorDemo () {
    const { cursorVariant, setCursorVariant, cursorText, setCursorText } = useSetCursorVariant()

    return (
    <>
      <CustomCursor variant={cursorVariant} text={cursorText} />

      <div className="bg-zinc-900 px-6 py-12 md:px-8 xl:px-12">
        <div className="md:grid-cols-2 grid grid-cols-1 grid-flow-row items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-medium text-white">
                Crafting{" "}
                <span className="text-teal-500">Digital Experiences</span>{" "}
                Through Design
              </h1>
              <p className="tracking-tight text-muted/80">
                Leading web design agency, dedicated to crafting exceptional
                online experiences for businisses worldwide with passion for
                crativity and a commitment to excellence, We specialize in
                transforming visions into reality.
              </p>
            </div>
            <div className="my-8">
              <Button
                onMouseEnter={() => setCursorVariant("sm")}
                onMouseLeave={() => setCursorVariant("default")}
                className="rounded-full"
                size="lg"
                variant={"secondary"}
              >
                Start your project
              </Button>
            </div>
          </div>
          <div
            className="aspect-square rounded-md bg-muted size-40 md:size-auto"
            onMouseEnter={() => setCursorText("View Project")}
            onMouseLeave={() => setCursorText("")}
          />
        </div>
      </div>
    </>
  )
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/custom-cursor.tsx
"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

const customCursorSpringConfig = {
  damping: 25,
  stiffness: 250,
  mass: 1,
  restSpeed: 0.01,
  restDelta: 0.01,
  duration: 0.4,
}
function useFollowMouse() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const cursorXSpring = useSpring(cursorX, customCursorSpringConfig)
  const cursroYSpring = useSpring(cursorY, customCursorSpringConfig)

  React.useEffect(() => {
    const followMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }
    window.addEventListener("mousemove", followMouse)

    return () => {
      window.removeEventListener("mousemove", followMouse)
    }
  }, [])

  return {
    cursorXSpring,
    cursroYSpring,
  }
}

const customCursorVariants = {
  default: {
    scale: 1,
  },
  sm: {
    scale: 0.4,
  },
}

export function useSetCursorVariant() {
  const [cursorVariant, setCursorVariant] =
    React.useState<keyof typeof customCursorVariants>("default")
  const [cursorText, setCursorText] = React.useState<string>("")

  return {
    cursorVariant,
    setCursorVariant,
    cursorText,
    setCursorText,
  }
}

interface CustomCursorProps {
  variant?: keyof typeof customCursorVariants
  text?: string
  className?: string
}
export function CustomCursor({
  variant = "default",
  text = "",
  className,
}: CustomCursorProps) {
  const { cursorXSpring, cursroYSpring } = useFollowMouse()

  const isTextNotEmpty = text !== ""
  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 flex aspect-square min-h-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-center text-xs mix-blend-difference",
        className
      )}
      variants={customCursorVariants}
      animate={variant}
      style={{
        y: cursroYSpring,
        x: cursorXSpring,
      }}
    >
      <AnimatePresence>
        {isTextNotEmpty && (
          <motion.span
            className="inline-block"
            transition={{ duration: 0.3, ease: "easeIn" }}
            animate={isTextNotEmpty ? { y: "0%" } : { y: "100%" }}
            exit={{ y: "100%" }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

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
