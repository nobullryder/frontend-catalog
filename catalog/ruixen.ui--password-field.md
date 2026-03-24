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
password-field.tsx
"use client"

import { useId, useState } from "react"
import {
  EyeIcon,
  EyeOffIcon,
  CheckCircle2,
  XCircle,
  Copy,
  RefreshCw,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PasswordField({
  label = "Password",
  placeholder = "Enter your password",
  className,
  showChecklist = true,
  allowGenerate = true,
}: {
  label?: string
  placeholder?: string
  className?: string
  showChecklist?: boolean
  allowGenerate?: boolean
}) {
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState("")
  const [copied, setCopied] = useState(false)

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  // password checks
  const checks = [
    { label: "At least 8 characters", valid: value.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(value) },
    { label: "One number", valid: /\d/.test(value) },
    { label: "One special character", valid: /[!@#$%^&*]/.test(value) },
  ]

  // strength calculation
  const passed = checks.filter((c) => c.valid).length
  const strength =
    passed === 0
      ? "Very Weak"
      : passed === 1
      ? "Weak"
      : passed === 2
      ? "Medium"
      : passed === 3
      ? "Strong"
      : "Very Strong"

  const strengthColor =
    passed <= 1
      ? "bg-red-500"
      : passed === 2
      ? "bg-yellow-500"
      : passed === 3
      ? "bg-blue-500"
      : "bg-green-600"

  // generate random password
  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let password = ""
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    setValue(password)
  }

  // copy to clipboard
  const copyToClipboard = async () => {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={cn("space-y-2 w-full max-w-md", className)}>
      <Label htmlFor={id}>{label}</Label>

      <div className="relative flex items-center">
        <Input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
          className="pr-20"
        />

        {/* Toggle visibility */}
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-10 flex items-center pr-2 text-muted-foreground/70 hover:text-foreground focus:outline-none"
        >
          {isVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>

        {/* Copy button */}
        <button
          type="button"
          onClick={copyToClipboard}
          disabled={!value}
          className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground/70 hover:text-foreground focus:outline-none disabled:opacity-40"
        >
          <Copy size={16} />
        </button>
      </div>

      {/* Generate Button */}
      {allowGenerate && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={generatePassword}
        >
          <RefreshCw size={14} /> Generate Strong Password
        </Button>
      )}

      {/* Strength meter */}
      {value && (
        <div className="space-y-1">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strengthColor}`}
              style={{ width: `${(passed / checks.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Strength: {strength}
            {copied && <span className="text-green-600">✓ Copied!</span>}
          </p>
        </div>
      )}

      {/* Checklist */}
      {showChecklist && (
        <ul className="text-sm space-y-1">
          {checks.map((check, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center gap-2",
                check.valid ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {check.valid ? (
                <CheckCircle2 size={16} />
              ) : (
                <XCircle size={16} />
              )}
              {check.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


code.demo.1757063755625.tsx
import PasswordField from "@/components/ui/password-field";

export default function DemoOne() {
  return <PasswordField />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/password-field.tsx
"use client"

import { useId, useState } from "react"
import {
  EyeIcon,
  EyeOffIcon,
  CheckCircle2,
  XCircle,
  Copy,
  RefreshCw,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function PasswordField({
  label = "Password",
  placeholder = "Enter your password",
  className,
  showChecklist = true,
  allowGenerate = true,
}: {
  label?: string
  placeholder?: string
  className?: string
  showChecklist?: boolean
  allowGenerate?: boolean
}) {
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState("")
  const [copied, setCopied] = useState(false)

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  // password checks
  const checks = [
    { label: "At least 8 characters", valid: value.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(value) },
    { label: "One number", valid: /\d/.test(value) },
    { label: "One special character", valid: /[!@#$%^&*]/.test(value) },
  ]

  // strength calculation
  const passed = checks.filter((c) => c.valid).length
  const strength =
    passed === 0
      ? "Very Weak"
      : passed === 1
      ? "Weak"
      : passed === 2
      ? "Medium"
      : passed === 3
      ? "Strong"
      : "Very Strong"

  const strengthColor =
    passed <= 1
      ? "bg-red-500"
      : passed === 2
      ? "bg-yellow-500"
      : passed === 3
      ? "bg-blue-500"
      : "bg-green-600"

  // generate random password
  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let password = ""
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    setValue(password)
  }

  // copy to clipboard
  const copyToClipboard = async () => {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={cn("space-y-2 w-full max-w-md", className)}>
      <Label htmlFor={id}>{label}</Label>

      <div className="relative flex items-center">
        <Input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
          className="pr-20"
        />

        {/* Toggle visibility */}
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-10 flex items-center pr-2 text-muted-foreground/70 hover:text-foreground focus:outline-none"
        >
          {isVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>

        {/* Copy button */}
        <button
          type="button"
          onClick={copyToClipboard}
          disabled={!value}
          className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground/70 hover:text-foreground focus:outline-none disabled:opacity-40"
        >
          <Copy size={16} />
        </button>
      </div>

      {/* Generate Button */}
      {allowGenerate && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={generatePassword}
        >
          <RefreshCw size={14} /> Generate Strong Password
        </Button>
      )}

      {/* Strength meter */}
      {value && (
        <div className="space-y-1">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strengthColor}`}
              style={{ width: `${(passed / checks.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Strength: {strength}
            {copied && <span className="text-green-600">✓ Copied!</span>}
          </p>
        </div>
      )}

      {/* Checklist */}
      {showChecklist && (
        <ul className="text-sm space-y-1">
          {checks.map((check, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center gap-2",
                check.valid ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {check.valid ? (
                <CheckCircle2 size={16} />
              ) : (
                <XCircle size={16} />
              )}
              {check.label}
            </li>
          ))}
        </ul>
      )}
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
