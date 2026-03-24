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
radio-button.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface RadioOption {
  id: string
  label: string
  value: string
  color: {
    border: string
    dot: string
    glow: string
    shadow: string
  }
}

interface RadioProps {
  options?: RadioOption[]
  name?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

const defaultOptions: RadioOption[] = [
  {
    id: "helios-blue",
    label: "Helios Blue",
    value: "helios-blue",
    color: {
      border: "border-blue-400",
      dot: "bg-blue-400",
      glow: "shadow-blue-400/50",
      shadow: "shadow-blue-400/20",
    },
  },
  {
    id: "cygnus-magenta",
    label: "Cygnus Magenta",
    value: "cygnus-magenta",
    color: {
      border: "border-fuchsia-400",
      dot: "bg-fuchsia-400",
      glow: "shadow-fuchsia-400/50",
      shadow: "shadow-fuchsia-400/20",
    },
  },
  {
    id: "orion-lime",
    label: "Orion Lime",
    value: "orion-lime",
    color: {
      border: "border-emerald-400",
      dot: "bg-emerald-400",
      glow: "shadow-emerald-400/50",
      shadow: "shadow-emerald-400/20",
    },
  },
]

export default function Radio({
  options = defaultOptions,
  name = "radio-group",
  defaultValue,
  onChange,
  className,
}: RadioProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value)

  const handleChange = (value: string) => {
    setSelectedValue(value)
    onChange?.(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent, value: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleChange(value)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen w-full p-5 font-sans bg-gray-100 dark:bg-black",
        className,
      )}
    >
      <div className="backdrop-blur-xl border border-gray-200/20 dark:border-white/5 rounded-3xl p-6 sm:p-8 w-full max-w-sm transition-all duration-300 bg-white/10 dark:bg-zinc-900">
        <div className="space-y-6" role="radiogroup" aria-label="Color theme selection">
          {options.map((option) => {
            const isSelected = selectedValue === option.value

            return (
              <label key={option.id} className="flex items-center cursor-pointer group select-none" htmlFor={option.id}>
                <div className="relative flex items-center justify-center">
                  <input
                    id={option.id}
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleChange(option.value)}
                    onKeyDown={(e) => handleKeyDown(e, option.value)}
                    className="sr-only"
                    aria-describedby={`${option.id}-description`}
                  />

                  {/* Custom radio button */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all duration-500 ease-out flex items-center justify-center mr-4 flex-shrink-0",
                      isSelected
                        ? cn(option.color.border, "scale-90")
                        : "border-gray-400 dark:border-slate-500 group-hover:border-gray-600 dark:group-hover:border-slate-400 group-hover:scale-110",
                    )}
                  >
                    {/* Inner dot */}
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        isSelected ? cn(option.color.dot, "scale-100") : "scale-0 bg-gray-600 dark:bg-slate-400",
                      )}
                    />

                    {/* Animated ring */}
                    {isSelected && (
                      <div
                        className={cn(
                          "absolute w-9 h-9 rounded-full border-2 border-transparent animate-spin",
                          option.color.border,
                          "shadow-lg",
                          option.color.glow,
                        )}
                        style={{
                          borderTopColor: "currentColor",
                          animationDuration: "2s",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Label text */}
                <span
                  id={`${option.id}-description`}
                  className={cn(
                    "text-lg font-medium transition-colors duration-300",
                    isSelected
                      ? "text-gray-900 dark:text-white font-bold"
                      : "text-gray-600 dark:text-slate-300 group-hover:text-gray-800 dark:group-hover:text-slate-100",
                  )}
                >
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}


code.demo.1756720432867.tsx
import Radio from "@/components/ui/radio-button";

export default function DemoOne() {
   return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 w-full">
      <Radio onChange={(value) => console.log("Selected:", value)} />
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio-button.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface RadioOption {
  id: string
  label: string
  value: string
  color: {
    border: string
    dot: string
    glow: string
    shadow: string
  }
}

interface RadioProps {
  options?: RadioOption[]
  name?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

const defaultOptions: RadioOption[] = [
  {
    id: "helios-blue",
    label: "Helios Blue",
    value: "helios-blue",
    color: {
      border: "border-blue-400",
      dot: "bg-blue-400",
      glow: "shadow-blue-400/50",
      shadow: "shadow-blue-400/20",
    },
  },
  {
    id: "cygnus-magenta",
    label: "Cygnus Magenta",
    value: "cygnus-magenta",
    color: {
      border: "border-fuchsia-400",
      dot: "bg-fuchsia-400",
      glow: "shadow-fuchsia-400/50",
      shadow: "shadow-fuchsia-400/20",
    },
  },
  {
    id: "orion-lime",
    label: "Orion Lime",
    value: "orion-lime",
    color: {
      border: "border-emerald-400",
      dot: "bg-emerald-400",
      glow: "shadow-emerald-400/50",
      shadow: "shadow-emerald-400/20",
    },
  },
]

export default function Radio({
  options = defaultOptions,
  name = "radio-group",
  defaultValue,
  onChange,
  className,
}: RadioProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value)

  const handleChange = (value: string) => {
    setSelectedValue(value)
    onChange?.(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent, value: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleChange(value)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen w-full p-5 font-sans bg-gray-100 dark:bg-black",
        className,
      )}
    >
      <div className="backdrop-blur-xl border border-gray-200/20 dark:border-white/5 rounded-3xl p-6 sm:p-8 w-full max-w-sm transition-all duration-300 bg-white/10 dark:bg-zinc-900">
        <div className="space-y-6" role="radiogroup" aria-label="Color theme selection">
          {options.map((option) => {
            const isSelected = selectedValue === option.value

            return (
              <label key={option.id} className="flex items-center cursor-pointer group select-none" htmlFor={option.id}>
                <div className="relative flex items-center justify-center">
                  <input
                    id={option.id}
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleChange(option.value)}
                    onKeyDown={(e) => handleKeyDown(e, option.value)}
                    className="sr-only"
                    aria-describedby={`${option.id}-description`}
                  />

                  {/* Custom radio button */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all duration-500 ease-out flex items-center justify-center mr-4 flex-shrink-0",
                      isSelected
                        ? cn(option.color.border, "scale-90")
                        : "border-gray-400 dark:border-slate-500 group-hover:border-gray-600 dark:group-hover:border-slate-400 group-hover:scale-110",
                    )}
                  >
                    {/* Inner dot */}
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        isSelected ? cn(option.color.dot, "scale-100") : "scale-0 bg-gray-600 dark:bg-slate-400",
                      )}
                    />

                    {/* Animated ring */}
                    {isSelected && (
                      <div
                        className={cn(
                          "absolute w-9 h-9 rounded-full border-2 border-transparent animate-spin",
                          option.color.border,
                          "shadow-lg",
                          option.color.glow,
                        )}
                        style={{
                          borderTopColor: "currentColor",
                          animationDuration: "2s",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Label text */}
                <span
                  id={`${option.id}-description`}
                  className={cn(
                    "text-lg font-medium transition-colors duration-300",
                    isSelected
                      ? "text-gray-900 dark:text-white font-bold"
                      : "text-gray-600 dark:text-slate-300 group-hover:text-gray-800 dark:group-hover:text-slate-100",
                  )}
                >
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>
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
