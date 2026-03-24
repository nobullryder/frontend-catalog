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
animated-input.tsx
import { useRef, useState } from "react"
import { motion } from "motion/react"

const SPRING = {
  type: "spring",
  // Damping controls how quickly the spring comes to rest (higher = less oscillation)
  damping: 10,
  // Mass affects the weight of the spring (higher = slower, heavier motion)
  mass: 0.75,
  // Stiffness controls the tension of the spring (higher = snappier, lower = softer)
  stiffness: 100,
}

const LABEL_TRANSITION = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1], // standard material easing
}

export interface AnimatedInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label: string
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  labelClassName?: string
  icon?: React.ReactNode
}

export default function AnimatedInput({
  value,
  defaultValue = "",
  onChange,
  label,
  placeholder = "",
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  icon,
}: AnimatedInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const val = isControlled ? value : internalValue
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const isFloating = !!val || isFocused

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && (
        <span className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value)
          onChange?.(e.target.value)
        }}
        placeholder={isFloating ? placeholder : ""}
        disabled={disabled}
        className={`peer focus:ring-primary bg-background w-full rounded-sm border px-3 py-2 text-sm transition outline-none focus:ring-1 ${icon ? "pl-10" : ""} ${inputClassName}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <motion.label
        className={`bg-background text-foreground pointer-events-none absolute top-1/2 left-3 origin-left -translate-y-1/2 rounded-sm border border-transparent px-1 transition-all ${labelClassName}`}
        animate={
          isFloating
            ? {
                y: -24,
                scale: 0.85,
                color: "var(--color-brand)",
                borderColor: "var(--color-brand)",
              }
            : { y: 0, scale: 1, color: "#6b7280" }
        }
        transition={LABEL_TRANSITION}
        style={{
          zIndex: 2,
        }}
      >
        {label}
      </motion.label>
    </div>
  )
}


code.demo.1760167534157.tsx
"use client"

import { useState } from "react"
import { User } from "lucide-react"

import AnimatedInput from "@/components/ui/animated-input"

export default function AnimatedInputDemo() {
  const [value, setValue] = useState("")
  return (
    <div className="max-w-xs space-y-6">
      <AnimatedInput
        label="Controlled"
        value={value}
        onChange={setValue}
        placeholder="Type here..."
      />
      <AnimatedInput label="Uncontrolled" defaultValue="Hello" />
      <AnimatedInput
        label="With Icon"
        icon={<User size={20} strokeWidth={1.5} />}
        placeholder="Username"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-input.tsx
import { useRef, useState } from "react"
import { motion } from "motion/react"

const SPRING = {
  type: "spring",
  // Damping controls how quickly the spring comes to rest (higher = less oscillation)
  damping: 10,
  // Mass affects the weight of the spring (higher = slower, heavier motion)
  mass: 0.75,
  // Stiffness controls the tension of the spring (higher = snappier, lower = softer)
  stiffness: 100,
}

const LABEL_TRANSITION = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1], // standard material easing
}

export interface AnimatedInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label: string
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  labelClassName?: string
  icon?: React.ReactNode
}

export default function AnimatedInput({
  value,
  defaultValue = "",
  onChange,
  label,
  placeholder = "",
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  icon,
}: AnimatedInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const val = isControlled ? value : internalValue
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const isFloating = !!val || isFocused

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && (
        <span className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</span>
      )}
      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value)
          onChange?.(e.target.value)
        }}
        placeholder={isFloating ? placeholder : ""}
        disabled={disabled}
        className={`peer focus:ring-primary bg-background w-full rounded-sm border px-3 py-2 text-sm transition outline-none focus:ring-1 ${icon ? "pl-10" : ""} ${inputClassName}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <motion.label
        className={`bg-background text-foreground pointer-events-none absolute top-1/2 left-3 origin-left -translate-y-1/2 rounded-sm border border-transparent px-1 transition-all ${labelClassName}`}
        animate={
          isFloating
            ? {
                y: -24,
                scale: 0.85,
                color: "var(--color-brand)",
                borderColor: "var(--color-brand)",
              }
            : { y: 0, scale: 1, color: "#6b7280" }
        }
        transition={LABEL_TRANSITION}
        style={{
          zIndex: 2,
        }}
      >
        {label}
      </motion.label>
    </div>
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
