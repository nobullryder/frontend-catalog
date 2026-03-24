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
confetti-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiButtonProps {
  label?: string
  onClick?: () => void
  className?: string
}

interface ConfettiParticle {
  id: number
  rotate: number
  color: string
}

const colors = ["#facc15", "#22c55e", "#3b82f6", "#f472b6", "#f97316"]

export default function ConfettiButton({
  label = "Submit",
  onClick,
  className,
}: ConfettiButtonProps) {
  const [particles, setParticles] = React.useState<ConfettiParticle[]>([])
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  const [buttonWidth, setButtonWidth] = React.useState(0)

  React.useEffect(() => {
    if (buttonRef.current) setButtonWidth(buttonRef.current.offsetWidth)
  }, [buttonRef.current])

  const fireConfetti = () => {
    const newParticles: ConfettiParticle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      rotate: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
    onClick?.()
    setTimeout(() => setParticles([]), 800)
  }

  return (
    <div className="relative inline-block">
      <Button
        ref={buttonRef}
        className={`relative overflow-hidden ${className}`}
        onClick={fireConfetti}
      >
        {label}
      </Button>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full bottom-0"
            style={{
              backgroundColor: p.color,
              left: buttonWidth / 2,
              transform: "translateX(-50%)",
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: p.rotate }}
            animate={{
              x: (Math.random() - 0.5) * 100, // horizontal spread
              y: -Math.random() * 100,        // vertical spread
              scale: 0,
              opacity: 0,
              rotate: p.rotate + Math.random() * 360,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}


code.demo.1758650413010.tsx
"use client"

import ConfettiButton from "@/components/ui/confetti-button"

export default function ConfettiButtonDemo() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <ConfettiButton
        label="Level Up!"
        onClick={() => console.log("Level Up clicked!")}
      />
      <ConfettiButton
        label="Achievement Unlocked"
        onClick={() => console.log("Achievement clicked!")}
      />
      <ConfettiButton
        label="Submit"
        onClick={() => console.log("Form Submitted!")}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/confetti-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiButtonProps {
  label?: string
  onClick?: () => void
  className?: string
}

interface ConfettiParticle {
  id: number
  rotate: number
  color: string
}

const colors = ["#facc15", "#22c55e", "#3b82f6", "#f472b6", "#f97316"]

export default function ConfettiButton({
  label = "Submit",
  onClick,
  className,
}: ConfettiButtonProps) {
  const [particles, setParticles] = React.useState<ConfettiParticle[]>([])
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  const [buttonWidth, setButtonWidth] = React.useState(0)

  React.useEffect(() => {
    if (buttonRef.current) setButtonWidth(buttonRef.current.offsetWidth)
  }, [buttonRef.current])

  const fireConfetti = () => {
    const newParticles: ConfettiParticle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      rotate: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
    onClick?.()
    setTimeout(() => setParticles([]), 800)
  }

  return (
    <div className="relative inline-block">
      <Button
        ref={buttonRef}
        className={`relative overflow-hidden ${className}`}
        onClick={fireConfetti}
      >
        {label}
      </Button>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full bottom-0"
            style={{
              backgroundColor: p.color,
              left: buttonWidth / 2,
              transform: "translateX(-50%)",
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: p.rotate }}
            animate={{
              x: (Math.random() - 0.5) * 100, // horizontal spread
              y: -Math.random() * 100,        // vertical spread
              scale: 0,
              opacity: 0,
              rotate: p.rotate + Math.random() * 360,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

```

Install NPM dependencies:
```bash
framer-motion
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
