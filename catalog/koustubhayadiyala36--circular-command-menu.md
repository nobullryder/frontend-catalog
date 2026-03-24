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
circular-command-menu.tsx
"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CommandItem {
  id: string
  icon: ReactNode
  label: string
  shortcut?: string
  onClick?: () => void
}

export interface CircularCommandMenuProps {
  items?: CommandItem[]
  trigger?: ReactNode
  className?: string
  radius?: number
  onSelect?: (item: CommandItem) => void
}

function Component({
  items = [],
  trigger,
  className,
  radius = 120,
  onSelect,
}: CircularCommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Defensive check for items
  const safeItems = items || []
  const itemCount = safeItems.length

  const angleStep = itemCount > 0 ? 360 / itemCount : 0
  const startAngle = -90 // Start from top

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || itemCount === 0) return

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((prev) => (prev + 1) % itemCount)
          break
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount)
          break
        case "Enter":
          e.preventDefault()
          const selectedItem = safeItems[activeIndex]
          if (selectedItem) {
            selectedItem.onClick?.()
            onSelect?.(selectedItem)
          }
          setIsOpen(false)
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          break
      }
    },
    [isOpen, activeIndex, safeItems, itemCount, onSelect],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const getItemPosition = (index: number) => {
    const angle = ((startAngle + index * angleStep) * Math.PI) / 180
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative z-20 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "hover:bg-primary/90 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        )}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {trigger || (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && itemCount > 0 && (
          <div className="absolute left-1/2 top-1/2 z-20" role="menu">
            {safeItems.map((item, index) => {
              const position = getItemPosition(index)
              const isActive = activeIndex === index

              return (
                <motion.button
                  key={item.id}
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    x: position.x - 24,
                    y: position.y - 24,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  onClick={() => {
                    item.onClick?.()
                    onSelect?.(item)
                    setIsOpen(false)
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "absolute flex h-12 w-12 items-center justify-center rounded-full",
                    "border border-border bg-card shadow-lg",
                    "transition-colors hover:bg-secondary",
                    isActive && "ring-2 ring-primary bg-secondary",
                  )}
                  role="menuitem"
                  aria-label={item.label}
                >
                  <div className="text-foreground">{item.icon}</div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.9,
                    }}
                    className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border border-border"
                  >
                    <span>{item.label}</span>
                    {item.shortcut && <span className="ml-2 text-muted-foreground">{item.shortcut}</span>}
                  </motion.div>
                </motion.button>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Component }
export type { CircularCommandMenuProps, CommandItem } 

code.demo.1764409802401.tsx
import { Component } from "@/components/ui/circular-command-menu";
import {Copy,Download,Share2,Bookmark,Edit,Trash2} from "lucide-react"

const commandItems = [
  { id: "copy", icon: <Copy className="h-5 w-5" />, label: "Copy", shortcut: "Cmd+C" },
  { id: "download", icon: <Download className="h-5 w-5" />, label: "Download", shortcut: "Cmd+D" },
  { id: "share", icon: <Share2 className="h-5 w-5" />, label: "Share", shortcut: "Cmd+S" },
  { id: "bookmark", icon: <Bookmark className="h-5 w-5" />, label: "Bookmark", shortcut: "Cmd+B" },
  { id: "edit", icon: <Edit className="h-5 w-5" />, label: "Edit", shortcut: "Cmd+E" },
  { id: "delete", icon: <Trash2 className="h-5 w-5" />, label: "Delete", shortcut: "Del" },
]
export default function DemoOne() {
  return <Component items={commandItems}  />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/circular-command-menu.tsx
"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CommandItem {
  id: string
  icon: ReactNode
  label: string
  shortcut?: string
  onClick?: () => void
}

export interface CircularCommandMenuProps {
  items?: CommandItem[]
  trigger?: ReactNode
  className?: string
  radius?: number
  onSelect?: (item: CommandItem) => void
}

function Component({
  items = [],
  trigger,
  className,
  radius = 120,
  onSelect,
}: CircularCommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Defensive check for items
  const safeItems = items || []
  const itemCount = safeItems.length

  const angleStep = itemCount > 0 ? 360 / itemCount : 0
  const startAngle = -90 // Start from top

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || itemCount === 0) return

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((prev) => (prev + 1) % itemCount)
          break
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount)
          break
        case "Enter":
          e.preventDefault()
          const selectedItem = safeItems[activeIndex]
          if (selectedItem) {
            selectedItem.onClick?.()
            onSelect?.(selectedItem)
          }
          setIsOpen(false)
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          break
      }
    },
    [isOpen, activeIndex, safeItems, itemCount, onSelect],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const getItemPosition = (index: number) => {
    const angle = ((startAngle + index * angleStep) * Math.PI) / 180
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative z-20 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "hover:bg-primary/90 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        )}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {trigger || (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && itemCount > 0 && (
          <div className="absolute left-1/2 top-1/2 z-20" role="menu">
            {safeItems.map((item, index) => {
              const position = getItemPosition(index)
              const isActive = activeIndex === index

              return (
                <motion.button
                  key={item.id}
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    x: position.x - 24,
                    y: position.y - 24,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                  onClick={() => {
                    item.onClick?.()
                    onSelect?.(item)
                    setIsOpen(false)
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "absolute flex h-12 w-12 items-center justify-center rounded-full",
                    "border border-border bg-card shadow-lg",
                    "transition-colors hover:bg-secondary",
                    isActive && "ring-2 ring-primary bg-secondary",
                  )}
                  role="menuitem"
                  aria-label={item.label}
                >
                  <div className="text-foreground">{item.icon}</div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.9,
                    }}
                    className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border border-border"
                  >
                    <span>{item.label}</span>
                    {item.shortcut && <span className="ml-2 text-muted-foreground">{item.shortcut}</span>}
                  </motion.div>
                </motion.button>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Component }
export type { CircularCommandMenuProps, CommandItem } 
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
