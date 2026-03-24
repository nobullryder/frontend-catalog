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
keyboard-keys.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface KeyProps {
  label: string
  sublabel?: string
  width?: string
  keyCode?: string
}

function Key({ label, sublabel, width = "w-12", keyCode }: KeyProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (keyCode && e.key.toLowerCase() === keyCode.toLowerCase()) {
        setIsPressed(true)
      }
    },
    [keyCode],
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (keyCode && e.key.toLowerCase() === keyCode.toLowerCase()) {
        setIsPressed(false)
      }
    },
    [keyCode],
  )

  useEffect(() => {
    if (keyCode) {
      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("keyup", handleKeyUp)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("keyup", handleKeyUp)
      }
    }
  }, [keyCode, handleKeyDown, handleKeyUp])

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className={cn(
        width,
        "group relative h-12 select-none rounded-lg transition-all duration-75 ease-out focus:outline-none",
        isPressed ? "translate-y-1" : "translate-y-0",
      )}
    >
      {/* Shadow/depth layer */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-75",
          "bg-neutral-400 dark:bg-neutral-800",
          isPressed ? "translate-y-0" : "translate-y-1",
        )}
      />

      {/* Main key surface */}
      <span
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center rounded-lg border transition-all duration-75",
          isPressed
            ? "border-neutral-300 bg-gradient-to-b from-neutral-200 to-neutral-100 dark:border-neutral-600 dark:from-neutral-900 dark:to-neutral-800"
            : "border-neutral-300 bg-gradient-to-b from-white to-neutral-100 dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900",
        )}
      >
        {/* Shine effect */}
        <span
          className={cn(
            "absolute inset-x-2 top-1 h-px rounded-full bg-gradient-to-r from-transparent to-transparent transition-opacity duration-75",
            "via-black/10 dark:via-white/20",
            isPressed ? "opacity-0" : "opacity-100",
          )}
        />

        {/* Key label */}
        <span className="relative z-10 flex flex-col items-center justify-center gap-0.5">
          {sublabel && (
            <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500">{sublabel}</span>
          )}
          <span
            className={cn(
              "text-xs font-semibold tracking-wide transition-colors duration-75",
              isPressed ? "text-neutral-500 dark:text-neutral-400" : "text-neutral-700 dark:text-neutral-300",
            )}
          >
            {label}
          </span>
        </span>
      </span>
    </button>
  )
}

export function KeyboardKeys() {
  return (
    <div className="inline-flex flex-col items-center gap-3">
      <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Press or Click</p>
      <div className="flex items-center gap-1.5 rounded-xl border p-3 shadow-2xl border-neutral-200 bg-neutral-100 shadow-neutral-300/50 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/50">
        <Key label="⌘" keyCode="Meta" />
        <Key label="⇧" keyCode="Shift" />
        <Key label="P" keyCode="p" />
      </div>
    </div>
  )
}


code.demo.1765209998116.tsx
import { KeyboardKeys } from "@/components/ui/keyboard-keys";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 py-16">
        <KeyboardKeys />
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/keyboard-keys.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface KeyProps {
  label: string
  sublabel?: string
  width?: string
  keyCode?: string
}

function Key({ label, sublabel, width = "w-12", keyCode }: KeyProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (keyCode && e.key.toLowerCase() === keyCode.toLowerCase()) {
        setIsPressed(true)
      }
    },
    [keyCode],
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (keyCode && e.key.toLowerCase() === keyCode.toLowerCase()) {
        setIsPressed(false)
      }
    },
    [keyCode],
  )

  useEffect(() => {
    if (keyCode) {
      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("keyup", handleKeyUp)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("keyup", handleKeyUp)
      }
    }
  }, [keyCode, handleKeyDown, handleKeyUp])

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className={cn(
        width,
        "group relative h-12 select-none rounded-lg transition-all duration-75 ease-out focus:outline-none",
        isPressed ? "translate-y-1" : "translate-y-0",
      )}
    >
      {/* Shadow/depth layer */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-75",
          "bg-neutral-400 dark:bg-neutral-800",
          isPressed ? "translate-y-0" : "translate-y-1",
        )}
      />

      {/* Main key surface */}
      <span
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center rounded-lg border transition-all duration-75",
          isPressed
            ? "border-neutral-300 bg-gradient-to-b from-neutral-200 to-neutral-100 dark:border-neutral-600 dark:from-neutral-900 dark:to-neutral-800"
            : "border-neutral-300 bg-gradient-to-b from-white to-neutral-100 dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900",
        )}
      >
        {/* Shine effect */}
        <span
          className={cn(
            "absolute inset-x-2 top-1 h-px rounded-full bg-gradient-to-r from-transparent to-transparent transition-opacity duration-75",
            "via-black/10 dark:via-white/20",
            isPressed ? "opacity-0" : "opacity-100",
          )}
        />

        {/* Key label */}
        <span className="relative z-10 flex flex-col items-center justify-center gap-0.5">
          {sublabel && (
            <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500">{sublabel}</span>
          )}
          <span
            className={cn(
              "text-xs font-semibold tracking-wide transition-colors duration-75",
              isPressed ? "text-neutral-500 dark:text-neutral-400" : "text-neutral-700 dark:text-neutral-300",
            )}
          >
            {label}
          </span>
        </span>
      </span>
    </button>
  )
}

export function KeyboardKeys() {
  return (
    <div className="inline-flex flex-col items-center gap-3">
      <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Press or Click</p>
      <div className="flex items-center gap-1.5 rounded-xl border p-3 shadow-2xl border-neutral-200 bg-neutral-100 shadow-neutral-300/50 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/50">
        <Key label="⌘" keyCode="Meta" />
        <Key label="⇧" keyCode="Shift" />
        <Key label="P" keyCode="p" />
      </div>
    </div>
  )
}

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
