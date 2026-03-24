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
count-down-numbers.tsx
"use client"

import React, { useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AnimatedNumberCounter() {
  const [count, setCount] = useState(0)
  const [activeButton, setActiveButton] = useState<"up" | "down" | null>(null)
  const [flashColor, setFlashColor] = useState<"up" | "down" | null>(null)

  const handleIncrement = () => {
    setCount((prev) => prev + 1)
    setActiveButton("up")
    setFlashColor("up")
  }

  const handleDecrement = () => {
    setCount((prev) => prev - 1)
    setActiveButton("down")
    setFlashColor("down")
  }

  useEffect(() => {
    if (flashColor) {
      const timer = setTimeout(() => {
        setFlashColor(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [flashColor])

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl  transition-colors duration-300 ${
        flashColor === "up"
          ? " text-green-500 "
          : flashColor === "down"
          ? "text-red-500"
          : ""
      }`}
    >
      <button
        onClick={handleIncrement}
        className="flex size-12 items-center justify-center rounded-md "
      >
        <ChevronUp
          className={`size-8 transition-colors duration-300 ${
            activeButton === "up" ? "text-green-500" : "text-gray-600"
          }`}
        />
      </button>

      <NumberFlow
        value={count}
        className="text-5xl w-14 text-center font-semibold"
      />

      <button
        onClick={handleDecrement}
        className="flex size-12 items-center justify-center rounded-md"
      >
        <ChevronDown
          className={`size-8 transition-colors duration-300 ${
            activeButton === "down" ? "text-red-500" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  )
}


code.demo.1753313477287.tsx
"use client"

import React, { useState } from "react"
import { IceCream } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import AnimatedNumberCounter from "@/components/ui/count-down-numbers"

export default function AnimatedNumberCounterDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Badge
        variant="outline"
        className=" rounded-[14px] border border-black/10 dark:border-white/20 text-base text-neutral-800 dark:text-white/80 md:left-6"
      >
        <IceCream className="  fill-[#A3C0E0] stroke-1 text-neutral-800" />{" "}
        &nbsp; CountDown Componenet
      </Badge>

      <AnimatedNumberCounter />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/count-down-numbers.tsx
"use client"

import React, { useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AnimatedNumberCounter() {
  const [count, setCount] = useState(0)
  const [activeButton, setActiveButton] = useState<"up" | "down" | null>(null)
  const [flashColor, setFlashColor] = useState<"up" | "down" | null>(null)

  const handleIncrement = () => {
    setCount((prev) => prev + 1)
    setActiveButton("up")
    setFlashColor("up")
  }

  const handleDecrement = () => {
    setCount((prev) => prev - 1)
    setActiveButton("down")
    setFlashColor("down")
  }

  useEffect(() => {
    if (flashColor) {
      const timer = setTimeout(() => {
        setFlashColor(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [flashColor])

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl  transition-colors duration-300 ${
        flashColor === "up"
          ? " text-green-500 "
          : flashColor === "down"
          ? "text-red-500"
          : ""
      }`}
    >
      <button
        onClick={handleIncrement}
        className="flex size-12 items-center justify-center rounded-md "
      >
        <ChevronUp
          className={`size-8 transition-colors duration-300 ${
            activeButton === "up" ? "text-green-500" : "text-gray-600"
          }`}
        />
      </button>

      <NumberFlow
        value={count}
        className="text-5xl w-14 text-center font-semibold"
      />

      <button
        onClick={handleDecrement}
        className="flex size-12 items-center justify-center rounded-md"
      >
        <ChevronDown
          className={`size-8 transition-colors duration-300 ${
            activeButton === "down" ? "text-red-500" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, @number-flow/react
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
