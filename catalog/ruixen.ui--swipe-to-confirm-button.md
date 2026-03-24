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
swipe-to-confirm-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface SwipeToConfirmButtonProps {
  label?: string
  onConfirm?: () => void
  width?: number
  height?: number
  className?: string
}

export default function SwipeToConfirmButton({
  label = "Swipe to Confirm",
  onConfirm,
  width = 300,
  height = 50,
  className,
}: SwipeToConfirmButtonProps) {
  const x = useMotionValue(0)
  const background = useTransform(x, [0, width - height], ["#e5e7eb", "#4ade80"])

  const handleDragEnd = (event: any, info: any) => {
    if (info.point.x >= width - height - 5) {
      onConfirm?.()
      x.set(width - height) // snap to end
    } else {
      x.set(0) // reset
    }
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Swipe background */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full z-0 bg-green-400 dark:bg-green-600"
        style={{ width: x }}
      />

      {/* Swipe button */}
      <Button
        asChild
        variant="default"
        className="absolute top-0 left-0 z-10 p-0 rounded-full w-full h-full
                   bg-white text-gray-900 dark:bg-gray-900 dark:text-white
                   border border-gray-300 dark:border-gray-700
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <motion.div
          className="flex items-center justify-center h-full w-full cursor-pointer select-none"
          drag="x"
          dragConstraints={{ left: 0, right: width - height }}
          dragElastic={0.2}
          style={{ x }}
          onDragEnd={handleDragEnd}
        >
          <motion.span className="px-4 text-sm font-medium">{label}</motion.span>
        </motion.div>
      </Button>
    </div>
  )
}


code.demo.1758649512730.tsx
"use client"

import SwipeToConfirmButton from "@/components/ui/swipe-to-confirm-button"

export default function SwipeToConfirmDemo() {
  const handleConfirm = () => alert("Payment Confirmed!")

  return (
    <div className="p-6 flex flex-col gap-6 items-center">
      <SwipeToConfirmButton onConfirm={handleConfirm} />
      <SwipeToConfirmButton
        label="Swipe to Submit"
        width={350}
        height={60}
        onConfirm={() => console.log("Form Submitted!")}
      />
      <SwipeToConfirmButton
        label="Slide to Unlock"
        width={300}
        height={50}
        onConfirm={() => console.log("Unlocked!")}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/swipe-to-confirm-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface SwipeToConfirmButtonProps {
  label?: string
  onConfirm?: () => void
  width?: number
  height?: number
  className?: string
}

export default function SwipeToConfirmButton({
  label = "Swipe to Confirm",
  onConfirm,
  width = 300,
  height = 50,
  className,
}: SwipeToConfirmButtonProps) {
  const x = useMotionValue(0)
  const background = useTransform(x, [0, width - height], ["#e5e7eb", "#4ade80"])

  const handleDragEnd = (event: any, info: any) => {
    if (info.point.x >= width - height - 5) {
      onConfirm?.()
      x.set(width - height) // snap to end
    } else {
      x.set(0) // reset
    }
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Swipe background */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full z-0 bg-green-400 dark:bg-green-600"
        style={{ width: x }}
      />

      {/* Swipe button */}
      <Button
        asChild
        variant="default"
        className="absolute top-0 left-0 z-10 p-0 rounded-full w-full h-full
                   bg-white text-gray-900 dark:bg-gray-900 dark:text-white
                   border border-gray-300 dark:border-gray-700
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        <motion.div
          className="flex items-center justify-center h-full w-full cursor-pointer select-none"
          drag="x"
          dragConstraints={{ left: 0, right: width - height }}
          dragElastic={0.2}
          style={{ x }}
          onDragEnd={handleDragEnd}
        >
          <motion.span className="px-4 text-sm font-medium">{label}</motion.span>
        </motion.div>
      </Button>
    </div>
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
