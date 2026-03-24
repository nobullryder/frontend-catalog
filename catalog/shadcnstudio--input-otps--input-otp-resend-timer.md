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
input-otps.tsx
'use client'

import { useId } from 'react'

import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

const InputOTPNumberDemo = () => {
  const id = useId()

  return (
    <div className='space-y-3'>
      <Label htmlFor={id}>Input OTP number</Label>
      <InputOTP id={id} maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export default InputOTPNumberDemo


code.demo.1760517334927.tsx
'use client'

import { useEffect, useId, useState } from 'react'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

const InputOTPWithResendTimerDemo = () => {
  const [timeLeft, setTimeLeft] = useState(30)
  const id = useId()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleResend = () => {
    setTimeLeft(60)
  }

  return (
    <div className='space-y-3'>
      <Label htmlFor={id}>Input OTP with resend timer</Label>
      <InputOTP id={id} maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className='text-muted-foreground text-xs'>
        {timeLeft > 0 ? (
          `Resend available in ${formatTime(timeLeft)}`
        ) : (
          <a
            href='#'
            onClick={e => {
              e.preventDefault()
              handleResend()
            }}
            className='hover:text-primary underline'
          >
            Resend code
          </a>
        )}
      </p>
    </div>
  )
}

export default InputOTPWithResendTimerDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/input-otps.tsx
'use client'

import { useId } from 'react'

import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'

const InputOTPNumberDemo = () => {
  const id = useId()

  return (
    <div className='space-y-3'>
      <Label htmlFor={id}>Input OTP number</Label>
      <InputOTP id={id} maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export default InputOTPNumberDemo

```

Install NPM dependencies:
```bash
input-otp
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
