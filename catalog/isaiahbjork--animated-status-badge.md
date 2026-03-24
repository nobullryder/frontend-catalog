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
animated-status-badge.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check } from "lucide-react"

interface AnimatedStatusBadgeProps {
  trigger: boolean
  onAnimationComplete?: () => void
  className?: string
}

export function AnimatedStatusBadge({ 
  trigger, 
  onAnimationComplete,
  className = ""
}: AnimatedStatusBadgeProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const startAnimation = () => {
    setIsAnimating(true)
    setIsCompleted(false)
    setTimeout(() => {
      setIsAnimating(false)
      setTimeout(() => {
        setIsCompleted(true)
        // Make completed badge disappear after 3 seconds
        setTimeout(() => {
          setIsCompleted(false)
          if (onAnimationComplete) {
            onAnimationComplete()
          }
        }, 3000)
      }, 300) // Delay the appearance of "Completed" badge
    }, 3000) // Animation duration
  }

  useEffect(() => {
    if (!isAnimating && !isCompleted) {
      setIsCompleted(false)
    }
  }, [isAnimating, isCompleted])

  useEffect(() => {
    if (trigger) {
      startAnimation()
    }
  }, [trigger])

  return (
    <>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className={`absolute top-0 right-0 bg-yellow-100 text-yellow-600 text-xs font-medium px-2.5 py-0.5 rounded flex items-center space-x-1 shadow-md border border-yellow-300/50 z-0 ${className}`}
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: -32, opacity: 1 }}
            exit={{
              y: [-37, 40], // First go up 5px, then slide down
              opacity: [1, 1, 0], // Maintain opacity until the end of the animation
              scale: [1, 0.8, 0.8], // Scale down as it starts to disappear
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.2, 1], // Timing for the exit animation stages
              ease: "easeInOut",
            }}
          >
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            <span>Running</span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            className={`absolute top-0 right-0 bg-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded flex items-center space-x-1 shadow-md border border-green-300/50 z-0 ${className}`}
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: -32, opacity: 1 }}
            exit={{
              y: [-37, 40], // First go up 5px, then slide down
              opacity: [1, 1, 0], // Maintain opacity until the end of the animation
              scale: [1, 0.8, 0.8], // Scale down as it starts to disappear
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.2, 1], // Timing for the exit animation stages
              ease: "easeInOut",
            }}
          >
            <Check className="h-3 w-3 mr-1" />
            <span>Completed</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


code.demo.1748618396627.tsx
"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedStatusBadge } from "@/components/ui/animated-status-badge"

export default function Page() {
  const [triggerAnimation1, setTriggerAnimation1] = useState(false)
  const [triggerAnimation2, setTriggerAnimation2] = useState(false)

  const handleStartAnimation1 = () => {
    setTriggerAnimation1(true)
  }

  const handleStartAnimation2 = () => {
    setTriggerAnimation2(true)
  }

  const handleAnimationComplete1 = () => {
    // Reset the trigger after completed badge shows for a bit
    setTimeout(() => setTriggerAnimation1(false), 2000)
  }

  const handleAnimationComplete2 = () => {
    // Reset the trigger after completed badge shows for a bit
    setTimeout(() => setTriggerAnimation2(false), 2000)
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl mt-10 pb-5 font-bold text-center text-primary mb-8">Reusable Animated Status Badge Demo</h1>
        
        {/* 
          DEMO INSTRUCTIONS:
          - Each card is wrapped in a relative container
          - The AnimatedStatusBadge is positioned absolutely and appears BEHIND the card (z-0)
          - Cards have relative z-10 positioning to appear above the badge
          - Animation runs once per trigger and auto-resets after completion
        */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* First Card */}
          <div className="relative">
            <AnimatedStatusBadge 
              trigger={triggerAnimation1} 
              onAnimationComplete={handleAnimationComplete1}
            />
            <Card className="w-full h-64 overflow-hidden rounded-lg relative z-10">
              <CardHeader>
                <CardTitle>Project Alpha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">This is a sample card to demonstrate the animated status badge appearing BEHIND the card.</p>
                <Button onClick={handleStartAnimation1} disabled={triggerAnimation1}>
                  Start Process 1
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Second Card */}
          <div className="relative">
            <AnimatedStatusBadge 
              trigger={triggerAnimation2} 
              onAnimationComplete={handleAnimationComplete2}
            />
            <Card className="w-full h-64 overflow-hidden rounded-lg relative z-10">
              <CardHeader>
                <CardTitle>Project Beta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">Another card showing how the badge can be reused across different components while staying behind the card.</p>
                <Button onClick={handleStartAnimation2} disabled={triggerAnimation2} variant="secondary">
                  Start Process 2
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>Click the buttons to see the animated status badges appear BEHIND the cards!</p>
          <p className="text-sm mt-2">Each badge runs once per trigger: &ldquo;Running&rdquo; → disappears → &ldquo;Completed&rdquo; → auto-reset</p>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-status-badge.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check } from "lucide-react"

interface AnimatedStatusBadgeProps {
  trigger: boolean
  onAnimationComplete?: () => void
  className?: string
}

export function AnimatedStatusBadge({ 
  trigger, 
  onAnimationComplete,
  className = ""
}: AnimatedStatusBadgeProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const startAnimation = () => {
    setIsAnimating(true)
    setIsCompleted(false)
    setTimeout(() => {
      setIsAnimating(false)
      setTimeout(() => {
        setIsCompleted(true)
        // Make completed badge disappear after 3 seconds
        setTimeout(() => {
          setIsCompleted(false)
          if (onAnimationComplete) {
            onAnimationComplete()
          }
        }, 3000)
      }, 300) // Delay the appearance of "Completed" badge
    }, 3000) // Animation duration
  }

  useEffect(() => {
    if (!isAnimating && !isCompleted) {
      setIsCompleted(false)
    }
  }, [isAnimating, isCompleted])

  useEffect(() => {
    if (trigger) {
      startAnimation()
    }
  }, [trigger])

  return (
    <>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className={`absolute top-0 right-0 bg-yellow-100 text-yellow-600 text-xs font-medium px-2.5 py-0.5 rounded flex items-center space-x-1 shadow-md border border-yellow-300/50 z-0 ${className}`}
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: -32, opacity: 1 }}
            exit={{
              y: [-37, 40], // First go up 5px, then slide down
              opacity: [1, 1, 0], // Maintain opacity until the end of the animation
              scale: [1, 0.8, 0.8], // Scale down as it starts to disappear
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.2, 1], // Timing for the exit animation stages
              ease: "easeInOut",
            }}
          >
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            <span>Running</span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            className={`absolute top-0 right-0 bg-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded flex items-center space-x-1 shadow-md border border-green-300/50 z-0 ${className}`}
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: -32, opacity: 1 }}
            exit={{
              y: [-37, 40], // First go up 5px, then slide down
              opacity: [1, 1, 0], // Maintain opacity until the end of the animation
              scale: [1, 0.8, 0.8], // Scale down as it starts to disappear
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.2, 1], // Timing for the exit animation stages
              ease: "easeInOut",
            }}
          >
            <Check className="h-3 w-3 mr-1" />
            <span>Completed</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
