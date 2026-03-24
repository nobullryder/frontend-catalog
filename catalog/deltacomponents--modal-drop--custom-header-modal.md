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
modal-drop.tsx
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "@phosphor-icons/react"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  allowEasyClose?: boolean
  title?: string
  subtitle?: string
  type?: "blur" | "overlay" | "none"
  showCloseButton?: boolean
  showEscText?: boolean
  borderBottom?: boolean
  className?: string
  /**
   * Choose between the default drop-in animation or a scale-from-center animation.
   * @default 'drop'
   */
  animationType?: "drop" | "scale"
  /**
   * Adjust the vertical position of the modal.
   * Positive values move it up, negative values move it down.
   * @default 0
   */
  position?: number
  /**
   * Disable default padding of the modal content.
   * @default false
   */
  disablePadding?: boolean
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Default drop-in from bottom
const dropVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 32,
      mass: 0.7,
      opacity: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// Scale from center animation
const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  allowEasyClose = true,
  title,
  subtitle,
  type = "overlay",
  showCloseButton = true,
  showEscText = true,
  borderBottom = true,
  className,
  animationType = "scale",
  position = 0,
  disablePadding = false,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && allowEasyClose) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, allowEasyClose, onClose])

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    if (isOpen) {
      const currentPaddingRight =
        Number.parseInt(getComputedStyle(document.body).paddingRight) || 0
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.style.paddingRight = ""
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.style.paddingRight = ""
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  const handleOverlayClick = () => {
    if (allowEasyClose) onClose()
  }

  const getOverlayClasses = () => {
    switch (type) {
      case "blur":
        return "bg-background/60 backdrop-blur-[2px]"
      case "overlay":
        return "bg-black/50"
      case "none":
        return "shadow-xl shadow-primary-foreground"
      default:
        return "bg-black/50"
    }
  }

  const getModalClasses = () => {
    const base =
      "w-auto bg-background border border-border text-card-foreground max-w-[90%] sm:max-w-xl rounded-2xl shadow-lg m-4 relative"
    return type === "overlay" ? base : `${base} border border-border`
  }

  if (!mounted) return null

  // Choose the appropriate animation variants
  const variants = animationType === "scale" ? scaleVariants : dropVariants

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto ${getOverlayClasses()}`}
          onClick={handleOverlayClick}
          style={{
            alignItems: position === 0 ? "center" : "flex-start",
            paddingTop: position === 0 ? 0 : `calc(50vh - ${position}px)`,
            willChange:
              type === "blur" ? "backdrop-filter, opacity" : undefined,
          }}
          layout={type === "blur"}
        >
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(getModalClasses(), className)}
            onClick={(e) => e.stopPropagation()}
            layout={type === "blur"}
          >
            {title ? (
              <div
                className={cn(
                  "flex justify-between p-6 pb-4",
                  borderBottom && "border-b border-border",
                  subtitle ? "flex-col items-start gap-1" : "items-center"
                )}
              >
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      subtitle && "absolute top-6 right-6"
                    )}
                  >
                    {showEscText && (
                      <span className="hidden lg:inline px-2 py-1 text-[11px] font-medium bg-muted text-muted-foreground rounded">
                        ESC
                      </span>
                    )}
                    <button
                      className="p-1 rounded-md hover:bg-muted transition-colors"
                      onClick={onClose}
                      aria-label="Close modal"
                    >
                      <X size={20} weight="bold" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              showCloseButton && (
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  {showEscText && (
                    <span className="hidden lg:inline px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded">
                      ESC
                    </span>
                  )}
                  <button
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>
              )
            )}

            <div
              className={cn(!disablePadding && (!title ? "p-6 pt-12" : "p-6"))}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default Modal;


code.demo.1756840409390.tsx
"use client"

import React, { useState } from "react"
import Modal from "@/components/ui/modal-drop"
import { CheckCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ModalCustomHeaderDemo() {
  const [isBasicOpen, setIsBasicOpen] = useState(false)
  const [isCustomOpen, setIsCustomOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {/* Basic Header Modal */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-sm font-medium text-center">Basic Header</h3>
          <Button onClick={() => setIsBasicOpen(true)} className="w-40">
            Open Modal
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Simple title and subtitle
          </p>
        </div>

        {/* Custom Header Modal */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-sm font-medium text-center">Custom Header</h3>
          <Button onClick={() => setIsCustomOpen(true)} className="w-40">
            Open Modal
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Rich content with icons
          </p>
        </div>
      </div>

      {/* Basic Header Modal */}
      <Modal
        isOpen={isBasicOpen}
        onClose={() => setIsBasicOpen(false)}
        title="User Profile"
        subtitle="Manage your account settings"
      >
        <p className="mb-4 text-muted-foreground">
          This modal uses the built-in title and subtitle props for a clean,
          simple header.
        </p>
        <p className="mb-6 text-muted-foreground">
          Perfect for straightforward dialogs and confirmations.
        </p>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setIsBasicOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => setIsBasicOpen(false)}>Save Changes</Button>
        </div>
      </Modal>

      {/* Custom Header Modal */}
      <Modal
        isOpen={isCustomOpen}
        onClose={() => setIsCustomOpen(false)}
        disablePadding
        borderBottom={false}
      >
        {/* Custom Header with rich content */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Profile Updated Successfully
              </h2>
              <p className="text-sm text-muted-foreground">
                Your changes have been saved
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Last updated: Just now</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="mb-4 text-muted-foreground">
            This modal demonstrates a custom header with icons, status
            indicators, and rich content layout.
          </p>
          <p className="mb-6 text-muted-foreground">
            The header is completely custom and built within the modal content
            area.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => setIsCustomOpen(false)}>Continue</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/modal-drop.tsx
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "@phosphor-icons/react"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  allowEasyClose?: boolean
  title?: string
  subtitle?: string
  type?: "blur" | "overlay" | "none"
  showCloseButton?: boolean
  showEscText?: boolean
  borderBottom?: boolean
  className?: string
  /**
   * Choose between the default drop-in animation or a scale-from-center animation.
   * @default 'drop'
   */
  animationType?: "drop" | "scale"
  /**
   * Adjust the vertical position of the modal.
   * Positive values move it up, negative values move it down.
   * @default 0
   */
  position?: number
  /**
   * Disable default padding of the modal content.
   * @default false
   */
  disablePadding?: boolean
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Default drop-in from bottom
const dropVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 32,
      mass: 0.7,
      opacity: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// Scale from center animation
const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  allowEasyClose = true,
  title,
  subtitle,
  type = "overlay",
  showCloseButton = true,
  showEscText = true,
  borderBottom = true,
  className,
  animationType = "scale",
  position = 0,
  disablePadding = false,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && allowEasyClose) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, allowEasyClose, onClose])

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    if (isOpen) {
      const currentPaddingRight =
        Number.parseInt(getComputedStyle(document.body).paddingRight) || 0
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.style.paddingRight = ""
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.style.paddingRight = ""
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  const handleOverlayClick = () => {
    if (allowEasyClose) onClose()
  }

  const getOverlayClasses = () => {
    switch (type) {
      case "blur":
        return "bg-background/60 backdrop-blur-[2px]"
      case "overlay":
        return "bg-black/50"
      case "none":
        return "shadow-xl shadow-primary-foreground"
      default:
        return "bg-black/50"
    }
  }

  const getModalClasses = () => {
    const base =
      "w-auto bg-background border border-border text-card-foreground max-w-[90%] sm:max-w-xl rounded-2xl shadow-lg m-4 relative"
    return type === "overlay" ? base : `${base} border border-border`
  }

  if (!mounted) return null

  // Choose the appropriate animation variants
  const variants = animationType === "scale" ? scaleVariants : dropVariants

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto ${getOverlayClasses()}`}
          onClick={handleOverlayClick}
          style={{
            alignItems: position === 0 ? "center" : "flex-start",
            paddingTop: position === 0 ? 0 : `calc(50vh - ${position}px)`,
            willChange:
              type === "blur" ? "backdrop-filter, opacity" : undefined,
          }}
          layout={type === "blur"}
        >
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(getModalClasses(), className)}
            onClick={(e) => e.stopPropagation()}
            layout={type === "blur"}
          >
            {title ? (
              <div
                className={cn(
                  "flex justify-between p-6 pb-4",
                  borderBottom && "border-b border-border",
                  subtitle ? "flex-col items-start gap-1" : "items-center"
                )}
              >
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      subtitle && "absolute top-6 right-6"
                    )}
                  >
                    {showEscText && (
                      <span className="hidden lg:inline px-2 py-1 text-[11px] font-medium bg-muted text-muted-foreground rounded">
                        ESC
                      </span>
                    )}
                    <button
                      className="p-1 rounded-md hover:bg-muted transition-colors"
                      onClick={onClose}
                      aria-label="Close modal"
                    >
                      <X size={20} weight="bold" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              showCloseButton && (
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  {showEscText && (
                    <span className="hidden lg:inline px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded">
                      ESC
                    </span>
                  )}
                  <button
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </div>
              )
            )}

            <div
              className={cn(!disablePadding && (!title ? "p-6 pt-12" : "p-6"))}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default Modal;

```

Install NPM dependencies:
```bash
@phosphor-icons/react, motion
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
