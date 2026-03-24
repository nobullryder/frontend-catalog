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
dynamic-status-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type ButtonStatus = {
  label: string
  icon: React.ReactNode
  color?: string      // button background
  textColor?: string  // text/icon color
}

interface DynamicStatusButtonProps {
  statuses: ButtonStatus[]
  currentIndex?: number
  onClick?: (status: ButtonStatus, index: number) => void
  className?: string
  width?: number
}

export default function DynamicStatusButton({
  statuses,
  currentIndex = 0,
  onClick,
  className,
  width = 150,
}: DynamicStatusButtonProps) {
  const [activeIndex, setActiveIndex] = React.useState(currentIndex)
  const activeStatus = statuses[activeIndex]

  const handleClick = () => {
    const nextIndex = (activeIndex + 1) % statuses.length
    setActiveIndex(nextIndex)
    onClick?.(statuses[nextIndex], nextIndex)
  }

  return (
    <Button
      className={cn(
        "relative flex items-center justify-center overflow-hidden transition-colors duration-300",
        className
      )}
      style={{
        width,
        backgroundColor: activeStatus.color || "#2563eb", // default modern blue
      }}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStatus.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex items-center gap-2 font-medium",
            activeStatus.textColor || "#ffffff"
          )}
        >
          {activeStatus.icon}
          {activeStatus.label}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}


code.demo.1758651690134.tsx
"use client"

import DynamicStatusButton, { ButtonStatus } from "@/components/ui/dynamic-status-button"
import { FaSun, FaMoon, FaCloud, FaBolt } from "react-icons/fa"

export default function DynamicStatusButtonDemo() {
  const statuses: ButtonStatus[] = [
    { label: "Sunny", icon: <FaSun />, color: "#e5e7eb", textColor: "#111827" },   // light gray background, dark text
    { label: "Night", icon: <FaMoon />, color: "#374151", textColor: "#f9fafb" },   // dark gray background, light text
    { label: "Cloudy", icon: <FaCloud />, color: "#9ca3af", textColor: "#111827" }, // medium gray background, dark text
    { label: "Storm", icon: <FaBolt />, color: "#6b7280", textColor: "#f9fafb" },   // slate gray background, light text
  ]

  return (
    <div className="p-6 flex flex-col gap-6">
      <DynamicStatusButton
        statuses={statuses}
        onClick={(status) => console.log("Current Status:", status.label)}
      />
      <DynamicStatusButton
        statuses={statuses}
        width={200}
        className="rounded-xl text-lg"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dynamic-status-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type ButtonStatus = {
  label: string
  icon: React.ReactNode
  color?: string      // button background
  textColor?: string  // text/icon color
}

interface DynamicStatusButtonProps {
  statuses: ButtonStatus[]
  currentIndex?: number
  onClick?: (status: ButtonStatus, index: number) => void
  className?: string
  width?: number
}

export default function DynamicStatusButton({
  statuses,
  currentIndex = 0,
  onClick,
  className,
  width = 150,
}: DynamicStatusButtonProps) {
  const [activeIndex, setActiveIndex] = React.useState(currentIndex)
  const activeStatus = statuses[activeIndex]

  const handleClick = () => {
    const nextIndex = (activeIndex + 1) % statuses.length
    setActiveIndex(nextIndex)
    onClick?.(statuses[nextIndex], nextIndex)
  }

  return (
    <Button
      className={cn(
        "relative flex items-center justify-center overflow-hidden transition-colors duration-300",
        className
      )}
      style={{
        width,
        backgroundColor: activeStatus.color || "#2563eb", // default modern blue
      }}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStatus.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex items-center gap-2 font-medium",
            activeStatus.textColor || "#ffffff"
          )}
        >
          {activeStatus.icon}
          {activeStatus.label}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}

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
