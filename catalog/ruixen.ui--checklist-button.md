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
checklist-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface ChecklistButtonProps {
  label?: string
  doneLabel?: string
  onDone?: () => void
  resettable?: boolean
  icon?: React.ReactNode
  doneIcon?: React.ReactNode
  className?: string
}

export default function ChecklistButton({
  label = "Mark as Done",
  doneLabel = "Done",
  onDone,
  resettable = false,
  icon,
  doneIcon = <Check className="w-4 h-4 text-green-600" />,
  className,
}: ChecklistButtonProps) {
  const [done, setDone] = React.useState(false)

  const handleClick = () => {
    if (done && resettable) {
      setDone(false)
      return
    }
    if (!done) {
      setDone(true)
      onDone?.()
    }
  }

  return (
    <Button
      variant={done ? "secondary" : "default"}
      className={`relative w-40 flex bg-white text-black dark:bg-black dark:text-white border hover:bg-white justify-center items-center ${className}`}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!done ? (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {icon}
            {label}
          </motion.span>
        ) : (
          <motion.span
            key="check"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            {doneIcon}
            {doneLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}


code.demo.1758648263375.tsx
"use client"

import { CheckCircle, ClipboardList, Star, Heart } from "lucide-react"
import ChecklistButton from "@/components/ui/checklist-button"

export default function ChecklistDemo() {
  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <ChecklistButton
        label="Mark as Done"
        doneLabel="Completed"
        onDone={() => console.log("Task completed!")}
      />

      <ChecklistButton
        label="Add to Favorites"
        doneLabel="Favorited"
        icon={<Star className="w-4 h-4 text-yellow-500" />}
        doneIcon={<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
      />

      <ChecklistButton
        label="Subscribe"
        doneLabel="Subscribed"
        icon={<Heart className="w-4 h-4 text-pink-500" />}
        doneIcon={<Heart className="w-4 h-4 text-pink-500 fill-pink-500" />}
        resettable
      />

      <ChecklistButton
        label="Start Task"
        doneLabel="Done!"
        icon={<ClipboardList className="w-4 h-4" />}
        doneIcon={<CheckCircle className="w-4 h-4 text-green-600" />}
        onDone={() => alert("Task marked as done")}
      />

      <ChecklistButton
        label="Approve"
        doneLabel="Approved"
      />

      <ChecklistButton
        label="Custom Width"
        doneLabel="Checked"
        className="w-48"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/checklist-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface ChecklistButtonProps {
  label?: string
  doneLabel?: string
  onDone?: () => void
  resettable?: boolean
  icon?: React.ReactNode
  doneIcon?: React.ReactNode
  className?: string
}

export default function ChecklistButton({
  label = "Mark as Done",
  doneLabel = "Done",
  onDone,
  resettable = false,
  icon,
  doneIcon = <Check className="w-4 h-4 text-green-600" />,
  className,
}: ChecklistButtonProps) {
  const [done, setDone] = React.useState(false)

  const handleClick = () => {
    if (done && resettable) {
      setDone(false)
      return
    }
    if (!done) {
      setDone(true)
      onDone?.()
    }
  }

  return (
    <Button
      variant={done ? "secondary" : "default"}
      className={`relative w-40 flex bg-white text-black dark:bg-black dark:text-white border hover:bg-white justify-center items-center ${className}`}
      onClick={handleClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!done ? (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {icon}
            {label}
          </motion.span>
        ) : (
          <motion.span
            key="check"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            {doneIcon}
            {doneLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
