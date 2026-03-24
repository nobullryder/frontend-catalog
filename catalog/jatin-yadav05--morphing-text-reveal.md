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
morphing-text-reveal.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface MorphingTextRevealProps {
  texts: string[]
  className?: string
  interval?: number
  glitchOnHover?: boolean
}

export function MorphingTextReveal({
  texts,
  className,
  interval = 3000,
  glitchOnHover = true,
}: MorphingTextRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const morphToNext = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    const currentText = texts[currentIndex]
    const nextIndex = (currentIndex + 1) % texts.length
    const nextText = texts[nextIndex]

    // Determine the longer text for animation
    const maxLength = Math.max(currentText.length, nextText.length)

    // Animate character by character
    let step = 0
    const animateStep = () => {
      if (step <= maxLength) {
        let newText = ""

        for (let i = 0; i < maxLength; i++) {
          if (i < step) {
            // Show next character
            newText += nextText[i] || ""
          } else if (i < currentText.length) {
            // Show current character with random glitch
            const shouldGlitch = Math.random() > 0.7
            newText += shouldGlitch ? getRandomChar() : currentText[i]
          }
        }

        setDisplayText(newText)
        step++
        setTimeout(animateStep, 80) // increased from 50ms to 80ms to slow down character morphing
      } else {
        setDisplayText(nextText)
        setCurrentIndex(nextIndex)
        setIsAnimating(false)
      }
    }

    animateStep()
  }, [currentIndex, texts, isAnimating])

  const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  useEffect(() => {
    if (texts.length === 0) return
    setDisplayText(texts[0])
  }, [texts])

  useEffect(() => {
    if (texts.length <= 1) return

    const timer = setInterval(morphToNext, interval)
    return () => clearInterval(timer)
  }, [morphToNext, interval, texts.length])

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsHovered(true)
      setTimeout(() => setIsHovered(false), 300)
    }
  }

  if (texts.length === 0) return null

  return (
    <div className={cn("relative inline-block cursor-pointer select-none", className)} onMouseEnter={handleMouseEnter}>
      <span
        className={cn(
          "font-mono text-foreground transition-all duration-300",
          isHovered && glitchOnHover && "glitch-effect",
          "hover:text-primary",
        )}
        style={{
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.05em",
        }}
      >
        {displayText.split("").map((char, index) => (
          <span
            key={`${currentIndex}-${index}`}
            className={cn("inline-block", isAnimating && "morph-char")}
            style={{
              animationDelay: `${index * 35}ms`, // increased from 20ms to 35ms to slow down staggered character animations
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>

      {/* Subtle cursor indicator */}
      <span
        className={cn(
          "inline-block w-0.5 h-[1em] bg-primary ml-1 transition-opacity duration-500",
          isAnimating ? "opacity-100" : "opacity-30",
        )}
        style={{
          animation: "pulse 2s ease-in-out infinite", // increased from 1.5s to 2s to slow down cursor pulse
        }}
      />
    </div>
  )
}


code.demo.1759156638487.tsx
import { MorphingTextReveal } from "@/components/ui/morphing-text-reveal"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Main showcase */}
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-mono text-muted-foreground tracking-wider uppercase">{"MORPHING TEXT REVEAL"}</p>
            <div className="text-3xl md:text-4xl font-light">
              <MorphingTextReveal
                texts={["Creation Without Limitation", "Innovation Beyond Boundaries", "Design Through Intention", "Building With Purpose"]}
                className="text-foreground"
                interval={4000}
              />
            </div>
          </div>
        </div>

        {/* Secondary examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-muted-foreground tracking-wider uppercase">{"STATUS INDICATOR"}</h3>
            <div className="text-2xl font-mono">
              <MorphingTextReveal
                texts={["ONLINE", "ACTIVE", "READY", "LIVE"]}
                className="text-primary"
                interval={2000}
                glitchOnHover={true}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-muted-foreground tracking-wider uppercase">{"DYNAMIC COUNTER"}</h3>
            <div className="text-2xl font-mono">
              <MorphingTextReveal
                texts={["001", "042", "127", "256", "512", "999"]}
                className="text-foreground"
                interval={1500}
                glitchOnHover={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/morphing-text-reveal.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface MorphingTextRevealProps {
  texts: string[]
  className?: string
  interval?: number
  glitchOnHover?: boolean
}

export function MorphingTextReveal({
  texts,
  className,
  interval = 3000,
  glitchOnHover = true,
}: MorphingTextRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const morphToNext = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    const currentText = texts[currentIndex]
    const nextIndex = (currentIndex + 1) % texts.length
    const nextText = texts[nextIndex]

    // Determine the longer text for animation
    const maxLength = Math.max(currentText.length, nextText.length)

    // Animate character by character
    let step = 0
    const animateStep = () => {
      if (step <= maxLength) {
        let newText = ""

        for (let i = 0; i < maxLength; i++) {
          if (i < step) {
            // Show next character
            newText += nextText[i] || ""
          } else if (i < currentText.length) {
            // Show current character with random glitch
            const shouldGlitch = Math.random() > 0.7
            newText += shouldGlitch ? getRandomChar() : currentText[i]
          }
        }

        setDisplayText(newText)
        step++
        setTimeout(animateStep, 80) // increased from 50ms to 80ms to slow down character morphing
      } else {
        setDisplayText(nextText)
        setCurrentIndex(nextIndex)
        setIsAnimating(false)
      }
    }

    animateStep()
  }, [currentIndex, texts, isAnimating])

  const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  useEffect(() => {
    if (texts.length === 0) return
    setDisplayText(texts[0])
  }, [texts])

  useEffect(() => {
    if (texts.length <= 1) return

    const timer = setInterval(morphToNext, interval)
    return () => clearInterval(timer)
  }, [morphToNext, interval, texts.length])

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsHovered(true)
      setTimeout(() => setIsHovered(false), 300)
    }
  }

  if (texts.length === 0) return null

  return (
    <div className={cn("relative inline-block cursor-pointer select-none", className)} onMouseEnter={handleMouseEnter}>
      <span
        className={cn(
          "font-mono text-foreground transition-all duration-300",
          isHovered && glitchOnHover && "glitch-effect",
          "hover:text-primary",
        )}
        style={{
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.05em",
        }}
      >
        {displayText.split("").map((char, index) => (
          <span
            key={`${currentIndex}-${index}`}
            className={cn("inline-block", isAnimating && "morph-char")}
            style={{
              animationDelay: `${index * 35}ms`, // increased from 20ms to 35ms to slow down staggered character animations
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>

      {/* Subtle cursor indicator */}
      <span
        className={cn(
          "inline-block w-0.5 h-[1em] bg-primary ml-1 transition-opacity duration-500",
          isAnimating ? "opacity-100" : "opacity-30",
        )}
        style={{
          animation: "pulse 2s ease-in-out infinite", // increased from 1.5s to 2s to slow down cursor pulse
        }}
      />
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
