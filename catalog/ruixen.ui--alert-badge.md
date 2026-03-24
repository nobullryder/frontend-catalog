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
alert-badge.tsx
"use client"

import { useState, useEffect } from "react"
import { BellIcon, CheckIcon, XIcon, InfoIcon, AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AlertBadgeProps {
  initialCount?: number
  type?: "success" | "error" | "info" | "warning"
  label?: string
  duration?: number
}

const defaultProps: Required<AlertBadgeProps> = {
  initialCount: 0,
  type: "info",
  label: "Notifications",
  duration: 5000,
}

export default function AlertBadge(props: AlertBadgeProps) {
  // Merge props with defaults
  const { initialCount, type, label, duration } = { ...defaultProps, ...props }

  // Explicitly tell TypeScript count is always a number
  const [count, setCount] = useState<number>(initialCount)
  const [visible, setVisible] = useState(false)

  const typeColors: Record<string, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }

  const typeIcons: Record<string, JSX.Element> = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    info: <InfoIcon size={16} />,
    warning: <AlertTriangleIcon size={16} />,
  }

  useEffect(() => {
    if (count > 0) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [count, duration])

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0))

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={increment}
      >
        <BellIcon size={18} />
        {label} {count > 0 && <span className="font-bold">({count})</span>}
      </Button>

      {visible && count > 0 && (
        <div
          className={`absolute -top-4 -right-2 flex items-center gap-1 px-2 py-1 text-xs rounded-full text-white ${typeColors[type]}`}
        >
          {typeIcons[type]} {count} new
        </div>
      )}

      <div className="mt-2 flex gap-2">
        <Button size="sm" variant="ghost" onClick={decrement}>
          Decrement
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setCount(0)}>
          Clear
        </Button>
      </div>
    </div>
  )
}


code.demo.1757067361464.tsx
import AlertBadge from "@/components/ui/alert-badge";

export default function DemoOne() {
  return <AlertBadge />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/alert-badge.tsx
"use client"

import { useState, useEffect } from "react"
import { BellIcon, CheckIcon, XIcon, InfoIcon, AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AlertBadgeProps {
  initialCount?: number
  type?: "success" | "error" | "info" | "warning"
  label?: string
  duration?: number
}

const defaultProps: Required<AlertBadgeProps> = {
  initialCount: 0,
  type: "info",
  label: "Notifications",
  duration: 5000,
}

export default function AlertBadge(props: AlertBadgeProps) {
  // Merge props with defaults
  const { initialCount, type, label, duration } = { ...defaultProps, ...props }

  // Explicitly tell TypeScript count is always a number
  const [count, setCount] = useState<number>(initialCount)
  const [visible, setVisible] = useState(false)

  const typeColors: Record<string, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }

  const typeIcons: Record<string, JSX.Element> = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    info: <InfoIcon size={16} />,
    warning: <AlertTriangleIcon size={16} />,
  }

  useEffect(() => {
    if (count > 0) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), duration)
      return () => clearTimeout(timer)
    }
  }, [count, duration])

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => Math.max(prev - 1, 0))

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={increment}
      >
        <BellIcon size={18} />
        {label} {count > 0 && <span className="font-bold">({count})</span>}
      </Button>

      {visible && count > 0 && (
        <div
          className={`absolute -top-4 -right-2 flex items-center gap-1 px-2 py-1 text-xs rounded-full text-white ${typeColors[type]}`}
        >
          {typeIcons[type]} {count} new
        </div>
      )}

      <div className="mt-2 flex gap-2">
        <Button size="sm" variant="ghost" onClick={decrement}>
          Decrement
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setCount(0)}>
          Clear
        </Button>
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
