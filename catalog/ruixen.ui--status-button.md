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
status-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export type StatusType = "live" | "idle" | "offline" | string

interface StatusButtonProps {
  label?: string
  status?: StatusType
  onClick?: () => void
  colors?: Record<StatusType, string>
  size?: number
  pulseDuration?: number
  className?: string
}

export default function StatusButton({
  label = "Go Live",
  status = "offline",
  onClick,
  colors = { live: "bg-green-500", idle: "bg-yellow-400", offline: "bg-red-500" },
  size = 12,
  pulseDuration = 1,
  className,
}: StatusButtonProps) {
  const dotColor = colors[status] || "bg-gray-400"

  return (
    <Button
      variant="default"
      className={`flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          className={`rounded-full ${dotColor}`}
          style={{ width: size, height: size }}
          layout
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: pulseDuration }}
        />
      </AnimatePresence>
      {label}
    </Button>
  )
}


code.demo.1758648664128.tsx
"use client"

import StatusButton from "@/components/ui/status-button"

export default function StatusButtonDemo() {
  const customColors = {
    live: "bg-green-600",
    idle: "bg-yellow-500",
    offline: "bg-red-600",
    custom: "bg-purple-500",
  }

  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <StatusButton
        label="Live Now"
        status="live"
        onClick={() => console.log("Live clicked!")}
      />

      <StatusButton
        label="Idle"
        status="idle"
        onClick={() => console.log("Idle clicked!")}
        size={14}
      />

      <StatusButton
        label="Offline"
        status="offline"
        onClick={() => console.log("Offline clicked!")}
        pulseDuration={0.8}
      />

      <StatusButton
        label="Custom Status"
        status="custom"
        colors={customColors}
        size={16}
        pulseDuration={1.5}
        onClick={() => console.log("Custom clicked!")}
      />

      <StatusButton
        label="Small Dot"
        status="live"
        size={8}
        pulseDuration={0.5}
      />

      <StatusButton
        label="Big Dot"
        status="idle"
        size={20}
        pulseDuration={1.2}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/status-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export type StatusType = "live" | "idle" | "offline" | string

interface StatusButtonProps {
  label?: string
  status?: StatusType
  onClick?: () => void
  colors?: Record<StatusType, string>
  size?: number
  pulseDuration?: number
  className?: string
}

export default function StatusButton({
  label = "Go Live",
  status = "offline",
  onClick,
  colors = { live: "bg-green-500", idle: "bg-yellow-400", offline: "bg-red-500" },
  size = 12,
  pulseDuration = 1,
  className,
}: StatusButtonProps) {
  const dotColor = colors[status] || "bg-gray-400"

  return (
    <Button
      variant="default"
      className={`flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          className={`rounded-full ${dotColor}`}
          style={{ width: size, height: size }}
          layout
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: pulseDuration }}
        />
      </AnimatePresence>
      {label}
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
