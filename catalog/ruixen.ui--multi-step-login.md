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
multi-step-login.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function MultiStepLogin() {
  const [step, setStep] = React.useState<number>(1)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [twoFA, setTwoFA] = React.useState("")

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border rounded-lg shadow-md overflow-hidden p-6 flex flex-col gap-6">
      
      {/* Step Indicator */}
      <div className="flex justify-between mb-4">
        <div className={cn("flex-1 h-1 rounded bg-gray-300 dark:bg-gray-600", step >= 1 && "bg-blue-500")}></div>
        <div className={cn("flex-1 h-1 rounded bg-gray-300 dark:bg-gray-600 mx-2", step >= 2 && "bg-blue-500")}></div>
        <div className={cn("flex-1 h-1 rounded bg-gray-300 dark:bg-gray-600", step >= 3 && "bg-blue-500")}></div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="mt-2 w-full" onClick={nextStep}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label htmlFor="otp">OTP (Optional)</Label>
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="2fa">2FA Verification Code</Label>
          <Input
            id="2fa"
            type="text"
            placeholder="Enter code"
            value={twoFA}
            onChange={(e) => setTwoFA(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button>Verify & Login</Button>
          </div>
        </div>
      )}
    </div>
  )
}


code.demo.1758654232298.tsx
import MultiStepLogin from "@/components/ui/multi-step-login";

export default function DemoOne() {
  return <MultiStepLogin />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/multi-step-login.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function MultiStepLogin() {
  const [step, setStep] = React.useState<number>(1)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [twoFA, setTwoFA] = React.useState("")

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border rounded-lg shadow-md overflow-hidden p-6 flex flex-col gap-6">
      
      {/* Step Indicator */}
      <div className="flex justify-between mb-4">
        <div className={cn("flex-1 h-1 rounded bg-gray-300 dark:bg-gray-600", step >= 1 && "bg-blue-500")}></div>
        <div className={cn("flex-1 h-1 rounded bg-gray-300 dark:bg-gray-600 mx-2", step >= 2 && "bg-blue-500")}></div>
        <div className={cn("flex-1 h-1 rounded bg-gray-300 dark:bg-gray-600", step >= 3 && "bg-blue-500")}></div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="mt-2 w-full" onClick={nextStep}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label htmlFor="otp">OTP (Optional)</Label>
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <Label htmlFor="2fa">2FA Verification Code</Label>
          <Input
            id="2fa"
            type="text"
            placeholder="Enter code"
            value={twoFA}
            onChange={(e) => setTwoFA(e.target.value)}
          />
          <div className="flex justify-between mt-2">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button>Verify & Login</Button>
          </div>
        </div>
      )}
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
