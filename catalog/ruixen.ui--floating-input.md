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
floating-input.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils" // optional, for conditional classes

interface FloatingInputProps {
  label?: string
  type?: string
  icon?: React.ReactNode
}

export default function FloatingInput({
  label = "Email",
  type = "email",
  icon = <Mail size={18} />,
}: FloatingInputProps) {
  const id = useId()
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)

  const isFloating = focused || value.length > 0

  return (
    <div className="relative w-full max-w-sm">
      {/* Icon */}
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors">
          {icon}
        </span>
      )}

      {/* Input */}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" " // keep placeholder blank for accessibility
        className={`h-12 rounded-2xl ps-12 pt-4 border-2 border-input 
                    bg-background shadow-sm transition-all 
                    focus:border-primary focus:ring-2 focus:ring-primary/30`}
      />

      {/* Floating Label */}
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-9 text-muted-foreground text-base transition-all pointer-events-none",
          isFloating
            ? "top-1 text-xs text-primary"
            : "top-1/2 -translate-y-1/2 text-base text-muted-foreground"
        )}
      >
        {label}
      </Label>

      {/* Decorative glow */}
      <div
        className={cn(
          "absolute inset-x-2 -bottom-2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity",
          focused ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}


code.demo.1757011996409.tsx
import FloatingInput from "@/components/ui/floating-input";

export default function DemoOne() {
  return (
    <>
      <FloatingInput />
      {/*<FloatingInput label="Password" type="password" icon={null} />  // password without icon*/}
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/floating-input.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils" // optional, for conditional classes

interface FloatingInputProps {
  label?: string
  type?: string
  icon?: React.ReactNode
}

export default function FloatingInput({
  label = "Email",
  type = "email",
  icon = <Mail size={18} />,
}: FloatingInputProps) {
  const id = useId()
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)

  const isFloating = focused || value.length > 0

  return (
    <div className="relative w-full max-w-sm">
      {/* Icon */}
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors">
          {icon}
        </span>
      )}

      {/* Input */}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" " // keep placeholder blank for accessibility
        className={`h-12 rounded-2xl ps-12 pt-4 border-2 border-input 
                    bg-background shadow-sm transition-all 
                    focus:border-primary focus:ring-2 focus:ring-primary/30`}
      />

      {/* Floating Label */}
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-9 text-muted-foreground text-base transition-all pointer-events-none",
          isFloating
            ? "top-1 text-xs text-primary"
            : "top-1/2 -translate-y-1/2 text-base text-muted-foreground"
        )}
      >
        {label}
      </Label>

      {/* Decorative glow */}
      <div
        className={cn(
          "absolute inset-x-2 -bottom-2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity",
          focused ? "opacity-100" : "opacity-0"
        )}
      />
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
