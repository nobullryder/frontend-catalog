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
swipe-button.tsx
"use client"

import { CSSProperties, useEffect, useRef, useState } from "react"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SwipeButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onSwipeComplete?: () => void
  text?: string
  className?: string
  gap?: number
  validationDuration?: number
}

export function SwipeButton({
  onSwipeComplete,
  text = "Swipe to validate",
  className,
  gap = 3,
  validationDuration = 2000,
  ...props
}: SwipeButtonProps) {
  const [isSwiped, setIsSwiped] = useState(false)
  const [isValidated, setIsValidated] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isValidated) {
      const timer = setTimeout(() => {
        setIsValidated(false)
        setIsSwiped(false)
        setCurrentX(0)
        setIsDragging(false)
      }, validationDuration)
      return () => clearTimeout(timer)
    }
  }, [isValidated, validationDuration])

  const handleStart = (clientX: number) => {
    if (isValidated) return
    setStartX(clientX)
    setIsDragging(true)
  }

  const handleMove = (clientX: number) => {
    if (!buttonRef.current || !isDragging || isValidated) return

    const containerWidth = containerRef.current?.offsetWidth || 0
    const buttonWidth = buttonRef.current.offsetWidth
    const maxSwipe = containerWidth - buttonWidth - gap * 2

    let newX = clientX - startX
    newX = Math.max(0, Math.min(newX, maxSwipe))

    setCurrentX(newX)
    setIsSwiped(newX >= maxSwipe - 10)
  }

  const handleEnd = () => {
    if (isValidated) return

    if (isSwiped) {
      setIsValidated(true)
      setCurrentX(0)
      onSwipeComplete?.()
    } else {
      setCurrentX(0)
      setIsSwiped(false)
    }
    setIsDragging(false)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-10 w-[250px] overflow-hidden rounded-lg",
        "border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
        "transition-colors duration-200",
        className
      )}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      role="button"
      aria-label="Swipe to validate"
      {...props}
    >
      <button
        ref={buttonRef}
        className={cn(
          "absolute rounded-md",
          "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
          "flex items-center justify-center",
          "cursor-grab active:cursor-grabbing",
          "shadow-sm transition-all duration-300",
          "hover:bg-neutral-800 dark:hover:bg-neutral-100",
          "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-900",
          "disabled:pointer-events-none",
          isValidated &&
            "w-[calc(100%-6px)] cursor-default bg-emerald-500 opacity-100 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-500"
        )}
        style={{
          width: isValidated ? `calc(100% - ${gap * 2}px)` : "36px",
          height: `calc(100% - ${gap * 2}px)`,
          left: isValidated ? `${gap}px` : `${gap}px`,
          top: `${gap}px`,
          transform: isValidated ? "none" : `translateX(${currentX}px)`,
          transition: isDragging ? "none" : "all 0.3s ease",
        }}
        aria-label={isValidated ? "Validated" : "Swipe to validate"}
        disabled={isValidated}
      >
        {isValidated ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <div className="flex h-full w-full items-center justify-center">
        <span
          style={{ "--swipe-button-text-width": "130px" } as CSSProperties}
          className={cn(
            "pointer-events-none mx-auto max-w-md text-sm text-neutral-600/70 dark:text-neutral-400/70",
            "animate-swipe-button-text [background-size:var(--swipe-button-text-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat select-none [transition:background-position_1s_cubic-bezier(.4,0,.2,1)_infinite]",
            "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80"
          )}
        >
          {text}
        </span>
      </div>
    </div>
  )
}


code.demo.1754503937947.tsx
"use client"

import confetti from "canvas-confetti"

import { SwipeButton } from "@/components/ui/swipe-button"

export default function SwipeButtonDemo() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div>
      <SwipeButton onSwipeComplete={triggerConfetti} />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/swipe-button.tsx
"use client"

import { CSSProperties, useEffect, useRef, useState } from "react"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SwipeButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onSwipeComplete?: () => void
  text?: string
  className?: string
  gap?: number
  validationDuration?: number
}

export function SwipeButton({
  onSwipeComplete,
  text = "Swipe to validate",
  className,
  gap = 3,
  validationDuration = 2000,
  ...props
}: SwipeButtonProps) {
  const [isSwiped, setIsSwiped] = useState(false)
  const [isValidated, setIsValidated] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isValidated) {
      const timer = setTimeout(() => {
        setIsValidated(false)
        setIsSwiped(false)
        setCurrentX(0)
        setIsDragging(false)
      }, validationDuration)
      return () => clearTimeout(timer)
    }
  }, [isValidated, validationDuration])

  const handleStart = (clientX: number) => {
    if (isValidated) return
    setStartX(clientX)
    setIsDragging(true)
  }

  const handleMove = (clientX: number) => {
    if (!buttonRef.current || !isDragging || isValidated) return

    const containerWidth = containerRef.current?.offsetWidth || 0
    const buttonWidth = buttonRef.current.offsetWidth
    const maxSwipe = containerWidth - buttonWidth - gap * 2

    let newX = clientX - startX
    newX = Math.max(0, Math.min(newX, maxSwipe))

    setCurrentX(newX)
    setIsSwiped(newX >= maxSwipe - 10)
  }

  const handleEnd = () => {
    if (isValidated) return

    if (isSwiped) {
      setIsValidated(true)
      setCurrentX(0)
      onSwipeComplete?.()
    } else {
      setCurrentX(0)
      setIsSwiped(false)
    }
    setIsDragging(false)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-10 w-[250px] overflow-hidden rounded-lg",
        "border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
        "transition-colors duration-200",
        className
      )}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      role="button"
      aria-label="Swipe to validate"
      {...props}
    >
      <button
        ref={buttonRef}
        className={cn(
          "absolute rounded-md",
          "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
          "flex items-center justify-center",
          "cursor-grab active:cursor-grabbing",
          "shadow-sm transition-all duration-300",
          "hover:bg-neutral-800 dark:hover:bg-neutral-100",
          "focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-900",
          "disabled:pointer-events-none",
          isValidated &&
            "w-[calc(100%-6px)] cursor-default bg-emerald-500 opacity-100 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-500"
        )}
        style={{
          width: isValidated ? `calc(100% - ${gap * 2}px)` : "36px",
          height: `calc(100% - ${gap * 2}px)`,
          left: isValidated ? `${gap}px` : `${gap}px`,
          top: `${gap}px`,
          transform: isValidated ? "none" : `translateX(${currentX}px)`,
          transition: isDragging ? "none" : "all 0.3s ease",
        }}
        aria-label={isValidated ? "Validated" : "Swipe to validate"}
        disabled={isValidated}
      >
        {isValidated ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <div className="flex h-full w-full items-center justify-center">
        <span
          style={{ "--swipe-button-text-width": "130px" } as CSSProperties}
          className={cn(
            "pointer-events-none mx-auto max-w-md text-sm text-neutral-600/70 dark:text-neutral-400/70",
            "animate-swipe-button-text [background-size:var(--swipe-button-text-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat select-none [transition:background-position_1s_cubic-bezier(.4,0,.2,1)_infinite]",
            "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80"
          )}
        >
          {text}
        </span>
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react
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
