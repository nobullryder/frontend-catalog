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
smart-notify-button.tsx
"use client"

import { useState } from "react"
import { toast, Toaster, ToastPosition } from "sonner"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon, InfoIcon } from "lucide-react"

interface SmartNotifyButtonProps {
  label?: string
  message?: string
  description?: string
  type?: "success" | "error" | "info"
  actionLabel?: string
  actionCallback?: () => void
  variant?: "default" | "outline" | "ghost"
  duration?: number
  /** Position of toast on screen */
  position?: ToastPosition
}

const defaultProps: SmartNotifyButtonProps = {
  label: "Notify",
  message: "This is a notification!",
  description: "",
  type: "info",
  variant: "default",
  duration: 4000,
  position: "top-right",
}

export default function SmartNotifyButton(props: SmartNotifyButtonProps) {
  const {
    label,
    message,
    description,
    type,
    actionLabel,
    actionCallback,
    variant,
    duration,
    position,
  } = { ...defaultProps, ...props }

  const icons = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    info: <InfoIcon size={16} />,
  }

  const handleClick = () => {
    toast(message!, {
      description,
      icon: icons[type!],
      duration,
      action: actionLabel
        ? { label: actionLabel, onClick: actionCallback ?? (() => {}) }
        : undefined,
      position,
    })
  }

  return (
    <>
      <Button variant={variant} onClick={handleClick}>
        {label}
      </Button>

      {/* Add the Toaster only once in your app */}
      <Toaster />
    </>
  )
}


code.demo.1757066538249.tsx
import SmartNotifyButton from "@/components/ui/smart-notify-button";

export default function DemoOne() {
  return (
    <div className="flex flex-col gap-6">
      <SmartNotifyButton />
      <SmartNotifyButton
        label="Save Changes"
        message="Data saved successfully!"
        description="Your changes have been stored."
        type="success"
        actionLabel="Undo"
        actionCallback={() => console.log("Undo clicked")}
        position="bottom-left"
      />
    </div>
    );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/smart-notify-button.tsx
"use client"

import { useState } from "react"
import { toast, Toaster, ToastPosition } from "sonner"
import { Button } from "@/components/ui/button"
import { CheckIcon, XIcon, InfoIcon } from "lucide-react"

interface SmartNotifyButtonProps {
  label?: string
  message?: string
  description?: string
  type?: "success" | "error" | "info"
  actionLabel?: string
  actionCallback?: () => void
  variant?: "default" | "outline" | "ghost"
  duration?: number
  /** Position of toast on screen */
  position?: ToastPosition
}

const defaultProps: SmartNotifyButtonProps = {
  label: "Notify",
  message: "This is a notification!",
  description: "",
  type: "info",
  variant: "default",
  duration: 4000,
  position: "top-right",
}

export default function SmartNotifyButton(props: SmartNotifyButtonProps) {
  const {
    label,
    message,
    description,
    type,
    actionLabel,
    actionCallback,
    variant,
    duration,
    position,
  } = { ...defaultProps, ...props }

  const icons = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    info: <InfoIcon size={16} />,
  }

  const handleClick = () => {
    toast(message!, {
      description,
      icon: icons[type!],
      duration,
      action: actionLabel
        ? { label: actionLabel, onClick: actionCallback ?? (() => {}) }
        : undefined,
      position,
    })
  }

  return (
    <>
      <Button variant={variant} onClick={handleClick}>
        {label}
      </Button>

      {/* Add the Toaster only once in your app */}
      <Toaster />
    </>
  )
}

```

Install NPM dependencies:
```bash
sonner, lucide-react
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
