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
otpdialog.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function OTPDialog() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [message, setMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp]
      updated[index] = value
      setOtp(updated)
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerify = () => {
    if (otp.every((d) => d !== "")) {
      setMessage("✅ OTP verified successfully! You can now continue.")
    } else {
      setMessage("⚠️ Please enter the complete 4-digit OTP.")
    }
  }

  const handleResend = () => {
    setMessage("OTP has been resent to your email or phone.")
    setOtp(["", "", "", ""])
    setTimeLeft(60)
    setCanResend(false)
    document.getElementById("otp-0")?.focus()
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Verify OTP</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm !rounded-xl p-6">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-lg font-semibold">OTP Verification</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Enter the 4-digit code sent to <strong>example@email.com</strong>.
          </DialogDescription>
        </DialogHeader>

        <p className="text-center text-xs text-muted-foreground mb-4">
          Step 1 of 1: Verify your account
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, idx) => (
            <Input
              key={idx}
              id={`otp-${idx}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-14 h-14 text-center text-lg font-medium rounded-md border border-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              maxLength={1}
            />
          ))}
        </div>

        {/* Timer */}
        {!canResend && (
          <p className="text-center text-xs text-muted-foreground mb-2">
            You can resend OTP in <strong>{formatTime(timeLeft)}</strong>
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleVerify}>
            Verify OTP
          </Button>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={handleResend}
            disabled={!canResend}
          >
            {canResend ? "Send Again" : "Resend OTP"}
            {!canResend && (
              <span className="text-xs text-muted-foreground">{formatTime(timeLeft)}</span>
            )}
          </Button>
        </div>

        {/* Feedback message */}
        {message && (
          <p className="mt-3 text-center text-sm text-muted-foreground">{message}</p>
        )}
      </DialogContent>
    </Dialog>
  )
}


code.demo.1755747874222.tsx
import OTPDialog from "@/components/ui/otpdialog";

export default function DemoOne() {
  return <OTPDialog />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/otpdialog.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function OTPDialog() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [message, setMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp]
      updated[index] = value
      setOtp(updated)
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerify = () => {
    if (otp.every((d) => d !== "")) {
      setMessage("✅ OTP verified successfully! You can now continue.")
    } else {
      setMessage("⚠️ Please enter the complete 4-digit OTP.")
    }
  }

  const handleResend = () => {
    setMessage("OTP has been resent to your email or phone.")
    setOtp(["", "", "", ""])
    setTimeLeft(60)
    setCanResend(false)
    document.getElementById("otp-0")?.focus()
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Verify OTP</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm !rounded-xl p-6">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-lg font-semibold">OTP Verification</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Enter the 4-digit code sent to <strong>example@email.com</strong>.
          </DialogDescription>
        </DialogHeader>

        <p className="text-center text-xs text-muted-foreground mb-4">
          Step 1 of 1: Verify your account
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, idx) => (
            <Input
              key={idx}
              id={`otp-${idx}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-14 h-14 text-center text-lg font-medium rounded-md border border-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              maxLength={1}
            />
          ))}
        </div>

        {/* Timer */}
        {!canResend && (
          <p className="text-center text-xs text-muted-foreground mb-2">
            You can resend OTP in <strong>{formatTime(timeLeft)}</strong>
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleVerify}>
            Verify OTP
          </Button>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={handleResend}
            disabled={!canResend}
          >
            {canResend ? "Send Again" : "Resend OTP"}
            {!canResend && (
              <span className="text-xs text-muted-foreground">{formatTime(timeLeft)}</span>
            )}
          </Button>
        </div>

        {/* Feedback message */}
        {message && (
          <p className="mt-3 text-center text-sm text-muted-foreground">{message}</p>
        )}
      </DialogContent>
    </Dialog>
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
