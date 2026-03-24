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
input-with-select.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronUp, ChevronDown } from "lucide-react"

interface InputWithSelectProps {
  label?: string
  placeholder?: string
  options?: { value: string; label: string }[]
  defaultValue?: string
  step?: number
}

export default function InputWithSelect({
  label = "Amount",
  placeholder = "0.00",
  options = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "inr", label: "INR" },
  ],
  defaultValue = "usd",
  step = 1,
}: InputWithSelectProps) {
  const id = useId()
  const [value, setValue] = useState<number | string>("")

  const handleIncrement = () => {
    const num = parseFloat(value as string) || 0
    setValue((num + step).toString())
  }

  const handleDecrement = () => {
    const num = parseFloat(value as string) || 0
    setValue((num - step).toString())
  }

  return (
    <div className="space-y-2 w-full max-w-sm">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center rounded-xl border bg-background shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition">
        <div className="relative flex-1">
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 border-0 bg-transparent pr-8 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-2 space-y-0.5">
            <button
              type="button"
              onClick={handleIncrement}
              className="p-0.5 text-muted-foreground hover:text-primary"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="p-0.5 text-muted-foreground hover:text-primary"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Select defaultValue={defaultValue}>
          <SelectTrigger className="w-24 border-0 border-l">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}


code.demo.1756917192390.tsx
import InputWithSelect from "@/components/ui/input-with-select";

export default function DemoOne() {
  return <InputWithSelect />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/input-with-select.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronUp, ChevronDown } from "lucide-react"

interface InputWithSelectProps {
  label?: string
  placeholder?: string
  options?: { value: string; label: string }[]
  defaultValue?: string
  step?: number
}

export default function InputWithSelect({
  label = "Amount",
  placeholder = "0.00",
  options = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "inr", label: "INR" },
  ],
  defaultValue = "usd",
  step = 1,
}: InputWithSelectProps) {
  const id = useId()
  const [value, setValue] = useState<number | string>("")

  const handleIncrement = () => {
    const num = parseFloat(value as string) || 0
    setValue((num + step).toString())
  }

  const handleDecrement = () => {
    const num = parseFloat(value as string) || 0
    setValue((num - step).toString())
  }

  return (
    <div className="space-y-2 w-full max-w-sm">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center rounded-xl border bg-background shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition">
        <div className="relative flex-1">
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 border-0 bg-transparent pr-8 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center pr-2 space-y-0.5">
            <button
              type="button"
              onClick={handleIncrement}
              className="p-0.5 text-muted-foreground hover:text-primary"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="p-0.5 text-muted-foreground hover:text-primary"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Select defaultValue={defaultValue}>
          <SelectTrigger className="w-24 border-0 border-l">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
