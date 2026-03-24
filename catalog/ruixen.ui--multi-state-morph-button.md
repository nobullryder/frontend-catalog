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
multi-state-morph-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { FaCheck, FaTimes } from "react-icons/fa"

export type ButtonState = "idle" | "loading" | "success" | "error"

interface MultiStateMorphButtonProps {
  label?: string
  onClick?: () => Promise<void> | void
  className?: string
  width?: number
  height?: number
  colors?: {
    idle?: string
    loading?: string
    success?: string
    error?: string
  }
}

export default function MultiStateMorphButton({
  label = "Submit",
  onClick,
  className,
  width = 200,
  height = 50,
  colors = {},
}: MultiStateMorphButtonProps) {
  const [state, setState] = React.useState<ButtonState>("idle")

  const handleClick = async () => {
    if (state === "loading") return
    setState("loading")
    try {
      await onClick?.()
      setState("success")
      setTimeout(() => setState("idle"), 2000)
    } catch {
      setState("error")
      setTimeout(() => setState("idle"), 2000)
    }
  }

  const stateColors = {
    idle: colors.idle || "#3b82f6",
    loading: colors.loading || "#2563eb",
    success: colors.success || "#16a34a",
    error: colors.error || "#dc2626",
  }

  return (
    <motion.div
      className="inline-block"
      style={{ width, height }}
      animate={{ borderRadius: state === "success" || state === "error" ? height / 2 : 8 }}
      transition={{ duration: 0.4 }}
    >
      <Button
        className={cn(
          "w-full h-full flex items-center justify-center text-white transition-colors duration-300",
          className
        )}
        onClick={handleClick}
        style={{ backgroundColor: stateColors[state] }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="animate-spin"
            >
              ⏳
            </motion.span>
          )}
          {state === "success" && (
            <motion.span
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaCheck />
            </motion.span>
          )}
          {state === "error" && (
            <motion.span
              key="error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaTimes />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}


code.demo.1758652410922.tsx
"use client"

import MultiStateMorphButton from "@/components/ui/multi-state-morph-button"

export default function MultiStateMorphButtonDemo() {
  const simulateAction = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve() : reject()
      }, 1500)
    })
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <MultiStateMorphButton label="Submit" onClick={simulateAction} />
      <MultiStateMorphButton
        label="Save"
        width={200}
        height={50}
        onClick={simulateAction}
        colors={{
          idle: "#64748b",
          loading: "#475569",
          success: "#10b981",
          error: "#ef4444",
        }}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/multi-state-morph-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { FaCheck, FaTimes } from "react-icons/fa"

export type ButtonState = "idle" | "loading" | "success" | "error"

interface MultiStateMorphButtonProps {
  label?: string
  onClick?: () => Promise<void> | void
  className?: string
  width?: number
  height?: number
  colors?: {
    idle?: string
    loading?: string
    success?: string
    error?: string
  }
}

export default function MultiStateMorphButton({
  label = "Submit",
  onClick,
  className,
  width = 200,
  height = 50,
  colors = {},
}: MultiStateMorphButtonProps) {
  const [state, setState] = React.useState<ButtonState>("idle")

  const handleClick = async () => {
    if (state === "loading") return
    setState("loading")
    try {
      await onClick?.()
      setState("success")
      setTimeout(() => setState("idle"), 2000)
    } catch {
      setState("error")
      setTimeout(() => setState("idle"), 2000)
    }
  }

  const stateColors = {
    idle: colors.idle || "#3b82f6",
    loading: colors.loading || "#2563eb",
    success: colors.success || "#16a34a",
    error: colors.error || "#dc2626",
  }

  return (
    <motion.div
      className="inline-block"
      style={{ width, height }}
      animate={{ borderRadius: state === "success" || state === "error" ? height / 2 : 8 }}
      transition={{ duration: 0.4 }}
    >
      <Button
        className={cn(
          "w-full h-full flex items-center justify-center text-white transition-colors duration-300",
          className
        )}
        onClick={handleClick}
        style={{ backgroundColor: stateColors[state] }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="animate-spin"
            >
              ⏳
            </motion.span>
          )}
          {state === "success" && (
            <motion.span
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaCheck />
            </motion.span>
          )}
          {state === "error" && (
            <motion.span
              key="error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaTimes />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}

```

Install NPM dependencies:
```bash
react-icons, framer-motion
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
