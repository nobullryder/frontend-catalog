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
countdown-number.tsx
"use client"

import React, { useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"
import { motion } from "framer-motion"

const MotionNumberFlow = motion.create(NumberFlow)

interface CountdownProps {
  endDate: Date
  startDate?: Date
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function AnimatedNumberCountdown({
  endDate,
  startDate,
  className,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = startDate ? new Date(startDate) : new Date()
      const end = new Date(endDate)
      const difference = end.getTime() - start.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate, startDate])

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.days}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Days</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.hours}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Hours</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.minutes}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Minutes</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.seconds}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Seconds</span>
      </div>
    </div>
  )
}


code.demo.1753313286817.tsx
"Use client"

import React from "react"
import { Puzzle } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import AnimatedNumberCountdown from "@/components/ui/countdown-number"

const AnimatedNumberCountDownDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Badge
        variant="outline"
        className=" rounded-[14px] border border-black/10 text-base text-neutral-800 md:left-6"
      >
        <Puzzle className=" fill-[#D2F583]  stroke-1 text-neutral-800" /> &nbsp;
        CountDown component
      </Badge>
      <AnimatedNumberCountdown
        endDate={new Date("2025-12-31")}
        className="my-4"
      />
    </div>
  )
}

export default AnimatedNumberCountDownDemo;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/countdown-number.tsx
"use client"

import React, { useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"
import { motion } from "framer-motion"

const MotionNumberFlow = motion.create(NumberFlow)

interface CountdownProps {
  endDate: Date
  startDate?: Date
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function AnimatedNumberCountdown({
  endDate,
  startDate,
  className,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = startDate ? new Date(startDate) : new Date()
      const end = new Date(endDate)
      const difference = end.getTime() - start.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate, startDate])

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.days}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Days</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.hours}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Hours</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.minutes}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Minutes</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.seconds}
          className="text-5xl font-semibold tracking-tighter"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-sm text-gray-500">Seconds</span>
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
framer-motion, @number-flow/react
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
