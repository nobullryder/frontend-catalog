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
animated-progress-bar.tsx
import { motion } from "motion/react"

export interface AnimatedProgressBarProps {
  value: number // 0-100
  label?: string
  color?: string
  className?: string
  barClassName?: string
  labelClassName?: string
  /**
   * To replay the animation, change the React 'key' prop on this component from the parent.
   */
}

const SPRING = {
  type: "spring",
  damping: 10,
  mass: 0.75,
  stiffness: 100,
}

export default function AnimatedProgressBar({
  value,
  label,
  color = "#6366f1",
  className = "",
  barClassName = "",
  labelClassName = "",
}: AnimatedProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className={`mb-1 text-sm font-medium ${labelClassName}`}>
          {label}
        </div>
      )}
      <div className="bg-background relative h-3 w-full overflow-hidden rounded border">
        <motion.div
          className={`bg-background h-full rounded ${barClassName}`}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={SPRING}
        />
      </div>
    </div>
  )
}


code.demo.1756780277455.tsx
"use client"

import { useState } from "react"

import AnimatedProgressBar from "@/components/ui/animated-progress-bar"

export default function AnimatedProgressBarDemo() {
  const [value, setValue] = useState(40)
  const [refreshKey, setRefreshKey] = useState(0)
  return (
    <div className="relative max-w-xs space-y-6">
      <AnimatedProgressBar
        key={refreshKey}
        value={value}
        label={`Progress: ${value}%`}
      />
      <AnimatedProgressBar
        key={refreshKey + 1000}
        value={value}
        color="#22d3ee"
        label="Custom Color"
      />
      <div className="mt-4 flex gap-2">
        <button
          className="bg-background text-foreground rounded border px-4 py-2"
          onClick={() => setValue((v) => (v >= 100 ? 0 : v + 10))}
        >
          Increase
        </button>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-progress-bar.tsx
import { motion } from "motion/react"

export interface AnimatedProgressBarProps {
  value: number // 0-100
  label?: string
  color?: string
  className?: string
  barClassName?: string
  labelClassName?: string
  /**
   * To replay the animation, change the React 'key' prop on this component from the parent.
   */
}

const SPRING = {
  type: "spring",
  damping: 10,
  mass: 0.75,
  stiffness: 100,
}

export default function AnimatedProgressBar({
  value,
  label,
  color = "#6366f1",
  className = "",
  barClassName = "",
  labelClassName = "",
}: AnimatedProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className={`mb-1 text-sm font-medium ${labelClassName}`}>
          {label}
        </div>
      )}
      <div className="bg-background relative h-3 w-full overflow-hidden rounded border">
        <motion.div
          className={`bg-background h-full rounded ${barClassName}`}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={SPRING}
        />
      </div>
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
