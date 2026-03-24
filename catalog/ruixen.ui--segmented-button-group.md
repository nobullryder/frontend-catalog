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
segmented-button-group.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SegmentedButtonGroupProps {
  options: string[]
  selected?: string
  onChange?: (value: string) => void
  className?: string
}

export default function SegmentedButtonGroup({
  options,
  selected,
  onChange,
  className,
}: SegmentedButtonGroupProps) {
  const [active, setActive] = React.useState<string>(selected || options[0])

  const handleClick = (value: string) => {
    setActive(value)
    onChange?.(value)
  }

  return (
    <div className={cn("inline-flex rounded-full bg-background", className)}>
      {options.map((option, idx) => {
        const isFirst = idx === 0
        const isLast = idx === options.length - 1
        const isActive = option === active

        return (
          <Button
            key={option}
            onClick={() => handleClick(option)}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "rounded-none px-4 py-2",
              isFirst && "rounded-l-full",
              isLast && "rounded-r-full",
              isActive && "bg-primary text-primary-foreground",
              !isActive && "bg-background text-foreground"
            )}
          >
            {option}
          </Button>
        )
      })}
    </div>
  )
}


code.demo.1758650973681.tsx
"use client"

import SegmentedButtonGroup from "@/components/ui/segmented-button-group"
import { useState } from "react"

export default function SegmentedButtonGroupDemo() {
  const [period, setPeriod] = useState("Day")

  return (
    <div className="p-6 flex flex-col gap-4">
      <SegmentedButtonGroup
        options={["Day", "Week", "Month"]}
        selected={period}
        onChange={(value) => setPeriod(value)}
      />
      <p>Selected Period: {period}</p>

      <SegmentedButtonGroup
        options={["Low", "Medium", "High", "Critical"]}
        onChange={(value) => console.log("Priority selected:", value)}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/segmented-button-group.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SegmentedButtonGroupProps {
  options: string[]
  selected?: string
  onChange?: (value: string) => void
  className?: string
}

export default function SegmentedButtonGroup({
  options,
  selected,
  onChange,
  className,
}: SegmentedButtonGroupProps) {
  const [active, setActive] = React.useState<string>(selected || options[0])

  const handleClick = (value: string) => {
    setActive(value)
    onChange?.(value)
  }

  return (
    <div className={cn("inline-flex rounded-full bg-background", className)}>
      {options.map((option, idx) => {
        const isFirst = idx === 0
        const isLast = idx === options.length - 1
        const isActive = option === active

        return (
          <Button
            key={option}
            onClick={() => handleClick(option)}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "rounded-none px-4 py-2",
              isFirst && "rounded-l-full",
              isLast && "rounded-r-full",
              isActive && "bg-primary text-primary-foreground",
              !isActive && "bg-background text-foreground"
            )}
          >
            {option}
          </Button>
        )
      })}
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
