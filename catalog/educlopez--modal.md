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
modal.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useOnClickOutside } from "usehooks-ts"

interface BasicModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const modalSizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
}

export default function BasicModal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: BasicModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  useOnClickOutside(modalRef, () => onClose())

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (theme-aware) */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              if (e.target === overlayRef.current) onClose()
            }}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "basic-modal-title" : undefined}
              className={`${modalSizes[size]} relative mx-auto w-full rounded-xl border border-border bg-background p-4 text-foreground shadow-xl ring-1 ring-border sm:p-6`}
              initial={{ scale: 0.96, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between gap-2">
                {title && (
                  <h3 id="basic-modal-title" className="text-xl font-medium leading-6">
                    {title}
                  </h3>
                )}
                <motion.button
                  className="ml-auto rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={onClose}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="relative">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


code.demo.1756780656422.tsx
"use client"

import React, { useState } from "react"
import BasicModal from "@/components/ui/modal"

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 p-8">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-background text-foreground cursor-pointer rounded-md border px-3 py-2 shadow-xs transition-colors hover:bg-muted"
      >
        Open Modal
      </button>

      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Beautiful Modal"
        size="md"
        className="bg-background text-foreground shadow-lg ring-1 ring-border"
      >
        <div className="flex flex-col gap-4">
          <p>
            This is a beautiful animated modal with smooth entrance and exit
            animations. Click outside or press Escape to close.
          </p>

          {/* Features list */}
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">Features:</h4>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Smooth animations</li>
              <li>Backdrop blur effect</li>
              <li>Responsive design</li>
              <li>Keyboard navigation (ESC to close)</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg border px-4 py-2 text-foreground transition-colors hover:bg-secondary/80"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-lg px-4 py-2 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}

export default ModalDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/modal.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useOnClickOutside } from "usehooks-ts"

interface BasicModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const modalSizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
}

export default function BasicModal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: BasicModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  useOnClickOutside(modalRef, () => onClose())

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (theme-aware) */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              if (e.target === overlayRef.current) onClose()
            }}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "basic-modal-title" : undefined}
              className={`${modalSizes[size]} relative mx-auto w-full rounded-xl border border-border bg-background p-4 text-foreground shadow-xl ring-1 ring-border sm:p-6`}
              initial={{ scale: 0.96, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between gap-2">
                {title && (
                  <h3 id="basic-modal-title" className="text-xl font-medium leading-6">
                    {title}
                  </h3>
                )}
                <motion.button
                  className="ml-auto rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={onClose}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="relative">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, motion, usehooks-ts
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
