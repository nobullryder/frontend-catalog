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
flash-sale-banner.tsx
"use client"

import { useEffect, useState } from "react"
import { TicketPercent, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const saleEndDate = new Date(Date.now() + 9 * 60 * 60 * 1000 + 45 * 60 * 1000 + 24 * 1000)

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export default function FlashSaleBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = saleEndDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isExpired: false,
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!isVisible || timeLeft.isExpired) return null

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-2 border rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Left: Sale Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <TicketPercent className="text-black/70 dark:text-white/70" size={24} />
        <div className="flex flex-col gap-1">
          <p className="text-md font-medium text-black dark:text-white">🔥 Flash Sale: Black Friday Special!</p>
          <p className="text-xs text-black/60 dark:text-white/60">Get up to 70% off on all products. Limited stock available. Don’t miss this exclusive deal!</p>
        </div>
      </div>

      {/* Right: Button + Close */}
      <div className="flex items-center gap-2">
        
      {/* Center: Timer */}
      <div className="flex items-center gap-2 font-mono text-center">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
            <span className="text-md font-bold">{formatNumber(timeLeft.days)}</span>
            <span className="text-xs text-black/50 dark:text-white/50">Days</span>
          </div>
        )}
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
          <span className="text-md font-bold">{formatNumber(timeLeft.hours)}</span>
          <span className="text-xs text-black/50 dark:text-white/50">Hours</span>
        </div>
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
          <span className="text-md font-bold">{formatNumber(timeLeft.minutes)}</span>
          <span className="text-xs text-black/50 dark:text-white/50">Minutes</span>
        </div>
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
          <span className="text-md font-bold">{formatNumber(timeLeft.seconds)}</span>
          <span className="text-xs text-black/50 dark:text-white/50">Seconds</span>
        </div>
      </div>
        <Button size="sm" className="whitespace-nowrap bg-black text-white dark:bg-white dark:text-black hover:opacity-90">
          Shop Now
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
          className="p-1 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
        >
          <XIcon size={16} />
        </Button>
      </div>
    </div>
  )
}


code.demo.1755969031983.tsx
import FlashSaleBanner from "@/components/ui/flash-sale-banner";

export default function DemoOne() {
  return <FlashSaleBanner />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flash-sale-banner.tsx
"use client"

import { useEffect, useState } from "react"
import { TicketPercent, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const saleEndDate = new Date(Date.now() + 9 * 60 * 60 * 1000 + 45 * 60 * 1000 + 24 * 1000)

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export default function FlashSaleBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const diff = saleEndDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isExpired: false,
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!isVisible || timeLeft.isExpired) return null

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-2 border rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Left: Sale Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <TicketPercent className="text-black/70 dark:text-white/70" size={24} />
        <div className="flex flex-col gap-1">
          <p className="text-md font-medium text-black dark:text-white">🔥 Flash Sale: Black Friday Special!</p>
          <p className="text-xs text-black/60 dark:text-white/60">Get up to 70% off on all products. Limited stock available. Don’t miss this exclusive deal!</p>
        </div>
      </div>

      {/* Right: Button + Close */}
      <div className="flex items-center gap-2">
        
      {/* Center: Timer */}
      <div className="flex items-center gap-2 font-mono text-center">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
            <span className="text-md font-bold">{formatNumber(timeLeft.days)}</span>
            <span className="text-xs text-black/50 dark:text-white/50">Days</span>
          </div>
        )}
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
          <span className="text-md font-bold">{formatNumber(timeLeft.hours)}</span>
          <span className="text-xs text-black/50 dark:text-white/50">Hours</span>
        </div>
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
          <span className="text-md font-bold">{formatNumber(timeLeft.minutes)}</span>
          <span className="text-xs text-black/50 dark:text-white/50">Minutes</span>
        </div>
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded">
          <span className="text-md font-bold">{formatNumber(timeLeft.seconds)}</span>
          <span className="text-xs text-black/50 dark:text-white/50">Seconds</span>
        </div>
      </div>
        <Button size="sm" className="whitespace-nowrap bg-black text-white dark:bg-white dark:text-black hover:opacity-90">
          Shop Now
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
          className="p-1 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
        >
          <XIcon size={16} />
        </Button>
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
