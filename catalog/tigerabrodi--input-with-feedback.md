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
input-with-feedback.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface InputWithFeedbackProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  isError?: boolean
  helperText?: string
}

const InputWithFeedback = React.forwardRef<HTMLInputElement, InputWithFeedbackProps>(
  ({ className, errorMessage, helperText, isError, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          className={cn(
            "w-full",
            className,
            isError && "border-destructive focus-visible:ring-destructive"
          )}
          ref={ref}
          {...props}
        />
        
        {isError && errorMessage && (
          <p className="absolute -bottom-6 text-xs text-destructive">
            {errorMessage}
          </p>
        )}

        {!isError && helperText && (
          <p className="absolute -bottom-6 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
InputWithFeedback.displayName = "InputWithFeedback"

export { InputWithFeedback }

code.demo.tsx
import { InputWithFeedback } from "@/components/ui/input-with-feedback"

function InputWithFeedbackDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <InputWithFeedback 
        placeholder="Regular input" 
        helperText="This is a helper text"
      />
      
      <InputWithFeedback
        placeholder="Input with error"
        isError={true}
        errorMessage="This field is required"
      />
      
      <InputWithFeedback
        placeholder="Disabled input"
        disabled
        helperText="This input is disabled"
      />
    </div>
  )
}

export { InputWithFeedbackDemo }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/input-with-feedback.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface InputWithFeedbackProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  isError?: boolean
  helperText?: string
}

const InputWithFeedback = React.forwardRef<HTMLInputElement, InputWithFeedbackProps>(
  ({ className, errorMessage, helperText, isError, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          className={cn(
            "w-full",
            className,
            isError && "border-destructive focus-visible:ring-destructive"
          )}
          ref={ref}
          {...props}
        />
        
        {isError && errorMessage && (
          <p className="absolute -bottom-6 text-xs text-destructive">
            {errorMessage}
          </p>
        )}

        {!isError && helperText && (
          <p className="absolute -bottom-6 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
InputWithFeedback.displayName = "InputWithFeedback"

export { InputWithFeedback }
```
```tsx
/components/ui/input.tsx
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```
```tsx
/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```
```tsx
/components/ui/label.tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```
```tsx
/components/ui/checkbox.tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

Install NPM dependencies:
```bash
@radix-ui/react-slot, class-variance-authority, @radix-ui/react-label, lucide-react, @radix-ui/react-checkbox
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
