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
expandable-button.tsx
"use client"

import React from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface ExpandableButtonProps {
  /**
   * Controls whether the button is in its expanded state.
   * When true, shows both icon and text. When false, shows only the icon.
   */
  expanded?: boolean
  /**
   * Callback function called when the expanded state changes.
   * @param open - The new expanded state
   */
  onExpandedChange?: (open: boolean) => void
  /**
   * The icon to display in the button.
   * Shows in both collapsed and expanded states.
   */
  icon?: React.ReactNode
}

export function ExpandableButton({
  expanded: expandedProp,
  onExpandedChange: setExpandedProp,
  icon,
  className,
  onClick,
  children,
  ...props
}: HTMLMotionProps<"button"> & ExpandableButtonProps) {
  const [_expanded, _setExpanded] = React.useState(false)

  const expanded = expandedProp ?? _expanded

  const setExpanded = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const expandedState =
        typeof value === "function" ? value(expanded) : value

      if (setExpandedProp) {
        setExpandedProp(expandedState)
      } else {
        _setExpanded(expandedState)
      }
    },
    [setExpandedProp, expanded],
  )

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpanded(!expanded)
    onClick?.(e)
  }

  return (
    <motion.button
      layout
      onClick={onClickHandler}
      className={cn(
        "relative flex items-center text-lg font-medium justify-center rounded-xl text-primary-foreground overflow-hidden h-10 bg-primary min-w-12 max-w-full flex-shrink-0",
        className,
      )}
      initial={false}
      animate={{
        flexGrow: expanded ? 1 : 0,
        maxWidth: expanded ? "100%" : "3rem",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="active"
            className={cn("flex items-center justify-center w-full h-full")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 justify-center w-full">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
              <motion.span
                className="whitespace-nowrap"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {children}
              </motion.span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inactive"
            className={cn("flex items-center justify-center")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}


code.demo.1754244560998.tsx
"use client"

import { useState } from "react"
import { Inbox, Mail, Settings, Star, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { ExpandableButton } from "@/components/ui/expandable-button";

export default function ExpandableGroupButtonDemo() {
  const [activeId, setActiveId] = useState(0)

  return (
    <div className="w-full flex gap-2 items-center px-4 justify-center">
      <ExpandableButton
        className={cn(activeId === 1 && "bg-red-400 text-white")}
        onClick={() => setActiveId(1)}
        expanded={activeId === 1}
        icon={<Inbox className="w-5 h-5" />}
      >
        Inbox
      </ExpandableButton>
      <ExpandableButton
        className={cn(activeId === 2 && "bg-yellow-400 text-white")}
        onClick={() => setActiveId(2)}
        expanded={activeId === 2}
        icon={<Mail className="w-5 h-5" />}
      >
        Mail
      </ExpandableButton>
      <ExpandableButton
        className={cn(activeId === 3 && "bg-blue-400 text-white")}
        onClick={() => setActiveId(3)}
        expanded={activeId === 3}
        icon={<Star className="w-5 h-5" />}
      >
        Favorites
      </ExpandableButton>
      <ExpandableButton
        className={cn(activeId === 4 && "bg-orange-400 text-white")}
        onClick={() => setActiveId(4)}
        expanded={activeId === 4}
        icon={<Settings className="w-5 h-5" />}
      >
        Settings
      </ExpandableButton>
      <ExpandableButton
        className={cn(activeId === 5 && "bg-violet-400 text-white")}
        onClick={() => setActiveId(5)}
        expanded={activeId === 5}
        icon={<User className="w-5 h-5" />}
      >
        Profile
      </ExpandableButton>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/expandable-button.tsx
"use client"

import React from "react"
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface ExpandableButtonProps {
  /**
   * Controls whether the button is in its expanded state.
   * When true, shows both icon and text. When false, shows only the icon.
   */
  expanded?: boolean
  /**
   * Callback function called when the expanded state changes.
   * @param open - The new expanded state
   */
  onExpandedChange?: (open: boolean) => void
  /**
   * The icon to display in the button.
   * Shows in both collapsed and expanded states.
   */
  icon?: React.ReactNode
}

export function ExpandableButton({
  expanded: expandedProp,
  onExpandedChange: setExpandedProp,
  icon,
  className,
  onClick,
  children,
  ...props
}: HTMLMotionProps<"button"> & ExpandableButtonProps) {
  const [_expanded, _setExpanded] = React.useState(false)

  const expanded = expandedProp ?? _expanded

  const setExpanded = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const expandedState =
        typeof value === "function" ? value(expanded) : value

      if (setExpandedProp) {
        setExpandedProp(expandedState)
      } else {
        _setExpanded(expandedState)
      }
    },
    [setExpandedProp, expanded],
  )

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExpanded(!expanded)
    onClick?.(e)
  }

  return (
    <motion.button
      layout
      onClick={onClickHandler}
      className={cn(
        "relative flex items-center text-lg font-medium justify-center rounded-xl text-primary-foreground overflow-hidden h-10 bg-primary min-w-12 max-w-full flex-shrink-0",
        className,
      )}
      initial={false}
      animate={{
        flexGrow: expanded ? 1 : 0,
        maxWidth: expanded ? "100%" : "3rem",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="active"
            className={cn("flex items-center justify-center w-full h-full")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 justify-center w-full">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
              <motion.span
                className="whitespace-nowrap"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {children}
              </motion.span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inactive"
            className={cn("flex items-center justify-center")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
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
