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
otp-input.tsx
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface AnimatedInputOTPProps {
  containerClassName?: string
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  maxLength?: number
  className?: string
}

function AnimatedInputOTP({
  className,
  containerClassName,
  value,
  onChange,
  onComplete,
  maxLength = 6,
  children,
  ...props
}: AnimatedInputOTPProps & { children: React.ReactNode }) {
  const handleChange = (newValue: string) => {
    // Only allow numeric characters
    const numericValue = newValue.replace(/[^0-9]/g, "")
    onChange?.(numericValue)
  }

  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      value={value}
      onChange={handleChange}
      onComplete={onComplete}
      maxLength={maxLength}
      {...props}
    >
      {children}
    </OTPInput>
  )
}

function AnimatedInputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <motion.div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1], // ease-out-quint
      }}
      {...(props as any)}
    />
  )
}

interface AnimatedInputOTPSlotProps extends React.ComponentProps<"div"> {
  index: number
}

function AnimatedInputOTPSlot({
  index,
  className,
  ...props
}: AnimatedInputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}
  const [isFilled, setIsFilled] = React.useState(false)

  React.useEffect(() => {
    if (char && !isFilled) {
      setIsFilled(true)
    } else if (!char && isFilled) {
      setIsFilled(false)
    }
  }, [char, isFilled])

  return (
    <motion.div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isFilled ? 1.05 : 1,
      }}
      transition={{
        duration: 0.2,
        delay: index * 0.05, // Staggered animation
        ease: [0.22, 1, 0.36, 1], // ease-out-quint
        scale: {
          duration: 0.15,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] },
      }}
      {...(props as any)}
    >
      <AnimatePresence mode="wait">
        {char && (
          <motion.span
            key={char}
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-medium"
          >
            {char}
          </motion.span>
        )}
      </AnimatePresence>

      {hasFakeCaret && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="bg-foreground h-4 w-px"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}

function AnimatedInputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <motion.div
      data-slot="input-otp-separator"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...(props as any)}
    >
      <MinusIcon className="text-muted-foreground h-4 w-4" />
    </motion.div>
  )
}

// Main component that combines everything
export function AnimatedOTPInput({
  maxLength = 6,
  className,
  value,
  onChange,
  onComplete,
  ...props
}: AnimatedInputOTPProps) {
  return (
    <AnimatedInputOTP
      maxLength={maxLength}
      className={className}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      {...props}
    >
      <AnimatedInputOTPGroup>
        <AnimatedInputOTPSlot index={0} />
        <AnimatedInputOTPSlot index={1} />
        <AnimatedInputOTPSlot index={2} />
      </AnimatedInputOTPGroup>
      <AnimatedInputOTPSeparator />
      <AnimatedInputOTPGroup>
        <AnimatedInputOTPSlot index={3} />
        <AnimatedInputOTPSlot index={4} />
        <AnimatedInputOTPSlot index={5} />
      </AnimatedInputOTPGroup>
    </AnimatedInputOTP>
  )
}

export {
  AnimatedInputOTP,
  AnimatedInputOTPGroup,
  AnimatedInputOTPSlot,
  AnimatedInputOTPSeparator,
}

export default AnimatedOTPInput


code.demo.1760170385642.tsx
"use client"

import * as React from "react"
import { CheckCircle, RefreshCw } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AnimatedOTPInput } from "@/components/ui/otp-input"

export function AnimatedOTPInputDemo() {
  const [value, setValue] = React.useState("")
  const [isComplete, setIsComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleComplete = (otp: string) => {
    setValue(otp)
    setIsComplete(true)
    setIsLoading(true)

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleReset = () => {
    setValue("")
    setIsComplete(false)
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify Your Code</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <AnimatedOTPInput
              value={value}
              onChange={setValue}
              onComplete={handleComplete}
              maxLength={6}
            />
          </div>

          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 text-center"
            >
              {isLoading ? (
                <div className="text-muted-foreground flex items-center justify-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Verifying code...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">
                    Code verified successfully!
                  </span>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleReset} className="w-full">
              Reset Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnimatedOTPInputDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/otp-input.tsx
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface AnimatedInputOTPProps {
  containerClassName?: string
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  maxLength?: number
  className?: string
}

function AnimatedInputOTP({
  className,
  containerClassName,
  value,
  onChange,
  onComplete,
  maxLength = 6,
  children,
  ...props
}: AnimatedInputOTPProps & { children: React.ReactNode }) {
  const handleChange = (newValue: string) => {
    // Only allow numeric characters
    const numericValue = newValue.replace(/[^0-9]/g, "")
    onChange?.(numericValue)
  }

  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      value={value}
      onChange={handleChange}
      onComplete={onComplete}
      maxLength={maxLength}
      {...props}
    >
      {children}
    </OTPInput>
  )
}

function AnimatedInputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <motion.div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1], // ease-out-quint
      }}
      {...(props as any)}
    />
  )
}

interface AnimatedInputOTPSlotProps extends React.ComponentProps<"div"> {
  index: number
}

function AnimatedInputOTPSlot({
  index,
  className,
  ...props
}: AnimatedInputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}
  const [isFilled, setIsFilled] = React.useState(false)

  React.useEffect(() => {
    if (char && !isFilled) {
      setIsFilled(true)
    } else if (!char && isFilled) {
      setIsFilled(false)
    }
  }, [char, isFilled])

  return (
    <motion.div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isFilled ? 1.05 : 1,
      }}
      transition={{
        duration: 0.2,
        delay: index * 0.05, // Staggered animation
        ease: [0.22, 1, 0.36, 1], // ease-out-quint
        scale: {
          duration: 0.15,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] },
      }}
      {...(props as any)}
    >
      <AnimatePresence mode="wait">
        {char && (
          <motion.span
            key={char}
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-medium"
          >
            {char}
          </motion.span>
        )}
      </AnimatePresence>

      {hasFakeCaret && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="bg-foreground h-4 w-px"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}

function AnimatedInputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <motion.div
      data-slot="input-otp-separator"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...(props as any)}
    >
      <MinusIcon className="text-muted-foreground h-4 w-4" />
    </motion.div>
  )
}

// Main component that combines everything
export function AnimatedOTPInput({
  maxLength = 6,
  className,
  value,
  onChange,
  onComplete,
  ...props
}: AnimatedInputOTPProps) {
  return (
    <AnimatedInputOTP
      maxLength={maxLength}
      className={className}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      {...props}
    >
      <AnimatedInputOTPGroup>
        <AnimatedInputOTPSlot index={0} />
        <AnimatedInputOTPSlot index={1} />
        <AnimatedInputOTPSlot index={2} />
      </AnimatedInputOTPGroup>
      <AnimatedInputOTPSeparator />
      <AnimatedInputOTPGroup>
        <AnimatedInputOTPSlot index={3} />
        <AnimatedInputOTPSlot index={4} />
        <AnimatedInputOTPSlot index={5} />
      </AnimatedInputOTPGroup>
    </AnimatedInputOTP>
  )
}

export {
  AnimatedInputOTP,
  AnimatedInputOTPGroup,
  AnimatedInputOTPSlot,
  AnimatedInputOTPSeparator,
}

export default AnimatedOTPInput

```

Install NPM dependencies:
```bash
input-otp, lucide-react, motion
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
