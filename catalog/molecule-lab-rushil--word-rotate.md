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
word-rotate.tsx
"use client"

import React from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Props for the WordRotate component
 */
export interface WordRotateProps {
  /**
   * Array of words to rotate through
   */
  words: string[]
  /**
   * Duration in milliseconds for each word display before rotating to the next
   * @default 2000
   */
  duration?: number
}

export function WordRotate({
  words,
  className,
  duration = 2000,
}: HTMLMotionProps<"div"> & WordRotateProps) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index === words.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    }, duration)
    return () => clearTimeout(timeoutId)
  }, [index, words])

  return (
    <div className="overflow-hidden p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(className)}
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


code.demo.1754327321134.tsx
import { WordRotate } from "@/components/ui/word-rotate";

export default function DemoOne() {
  return <WordRotate   duration={1500}    className="text-5xl font-semibold"
      words={["Fast", "Smooth", "Beautiful"]} />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/word-rotate.tsx
"use client"

import React from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Props for the WordRotate component
 */
export interface WordRotateProps {
  /**
   * Array of words to rotate through
   */
  words: string[]
  /**
   * Duration in milliseconds for each word display before rotating to the next
   * @default 2000
   */
  duration?: number
}

export function WordRotate({
  words,
  className,
  duration = 2000,
}: HTMLMotionProps<"div"> & WordRotateProps) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index === words.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    }, duration)
    return () => clearTimeout(timeoutId)
  }, [index, words])

  return (
    <div className="overflow-hidden p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(className)}
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
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
