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
potfolio-text.tsx
"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface AnimatedLetterTextProps {
  text: string
  letterToReplace?: string
  className?: string
}

export function AnimatedLetterText({ text = "Portfolio", letterToReplace = "o", className }: AnimatedLetterTextProps) {
  const parts: React.ReactNode[] = []
  let keyIndex = 0

  // Find the first occurrence of the letter to replace (case insensitive)
  const lowerText = text.toLowerCase()
  const lowerLetter = letterToReplace.toLowerCase()
  const replaceIndex = lowerText.indexOf(lowerLetter)

  if (replaceIndex === -1) {
    // No letter to replace found, just render the text
    return <span className={cn("font-black tracking-tight text-foreground", className)}>{text}</span>
  }

  // Split text into: before, animated visual, after
  const before = text.slice(0, replaceIndex)
  const after = text.slice(replaceIndex + 1)

  return (
    <span className={cn("inline-flex items-center font-black tracking-tight text-foreground", className)}>
      {before && <span key={keyIndex++}>{before}</span>}

      {/* Animated visual replacing the letter */}
      <span
        className="relative inline-flex items-center justify-center mx-[-0.02em]"
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
      >
        {/* SVG filters for realistic effects */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            {/* Inner shadow filter for the outer shape */}
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feComponentTransfer in="SourceAlpha">
                <feFuncA type="table" tableValues="1 0" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="3" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feFlood floodColor="rgba(255,255,255,0.15)" result="color" />
              <feComposite in2="offsetblur" operator="in" />
              <feComposite in2="SourceAlpha" operator="in" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode />
              </feMerge>
            </filter>

            <filter id="diamondGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feFlood floodColor="#d4ff4a" floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2ff6a" />
              <stop offset="40%" stopColor="#d4ff4a" />
              <stop offset="60%" stopColor="#c4f934" />
              <stop offset="100%" stopColor="#b8ed28" />
            </linearGradient>

            <linearGradient id="diamondShine" x1="0%" y1="0%" x2="50%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            <radialGradient id="outerShapeGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </radialGradient>
          </defs>
        </svg>

        {/* Scalloped/flower outer shape with depth */}
        <svg viewBox="0 0 100 100" className="w-[0.75em] h-[0.75em]">
          <path
            d="M50 0
               C55 15, 65 15, 75 10
               C70 25, 75 35, 90 35
               C80 45, 80 55, 90 65
               C75 65, 70 75, 75 90
               C65 85, 55 85, 50 100
               C45 85, 35 85, 25 90
               C30 75, 25 65, 10 65
               C20 55, 20 45, 10 35
               C25 35, 30 25, 25 10
               C35 15, 45 15, 50 0Z"
            fill="url(#outerShapeGradient)"
            filter="url(#innerShadow)"
          />
          <path
            d="M50 0
               C55 15, 65 15, 75 10
               C70 25, 75 35, 90 35
               C80 45, 80 55, 90 65
               C75 65, 70 75, 75 90
               C65 85, 55 85, 50 100
               C45 85, 35 85, 25 90
               C30 75, 25 65, 10 65
               C20 55, 20 45, 10 35
               C25 35, 30 25, 25 10
               C35 15, 45 15, 50 0Z"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </svg>

        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-[0.32em] h-[0.32em] animate-diamond-rotate"
            filter="url(#diamondGlow)"
          >
            {/* Main diamond shape with clean gradient */}
            <path d="M50 8 L92 50 L50 92 L8 50 Z" fill="url(#diamondGradient)" />
            {/* Top-left shine facet for 3D polish */}
            <path d="M50 8 L8 50 L50 50 Z" fill="url(#diamondShine)" />
            {/* Subtle inner edge highlight */}
            <path d="M50 18 L82 50 L50 82 L18 50 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          </svg>
        </span>
      </span>

      {after && <span key={keyIndex++}>{after}</span>}
    </span>
  )
}


code.demo.1765558650870.tsx
import { AnimatedLetterText } from "@/components/ui/potfolio-text"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-16 p-8 w-full">
      <div className="flex flex-col items-center gap-8">
        <AnimatedLetterText text="Portfolio" letterToReplace="o" className="text-7xl md:text-9xl" />

        <p className="text-muted-foreground text-lg max-w-md text-center">
          An elegant text component where letters transform into animated visuals
        </p>
      </div>
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/potfolio-text.tsx
"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface AnimatedLetterTextProps {
  text: string
  letterToReplace?: string
  className?: string
}

export function AnimatedLetterText({ text = "Portfolio", letterToReplace = "o", className }: AnimatedLetterTextProps) {
  const parts: React.ReactNode[] = []
  let keyIndex = 0

  // Find the first occurrence of the letter to replace (case insensitive)
  const lowerText = text.toLowerCase()
  const lowerLetter = letterToReplace.toLowerCase()
  const replaceIndex = lowerText.indexOf(lowerLetter)

  if (replaceIndex === -1) {
    // No letter to replace found, just render the text
    return <span className={cn("font-black tracking-tight text-foreground", className)}>{text}</span>
  }

  // Split text into: before, animated visual, after
  const before = text.slice(0, replaceIndex)
  const after = text.slice(replaceIndex + 1)

  return (
    <span className={cn("inline-flex items-center font-black tracking-tight text-foreground", className)}>
      {before && <span key={keyIndex++}>{before}</span>}

      {/* Animated visual replacing the letter */}
      <span
        className="relative inline-flex items-center justify-center mx-[-0.02em]"
        style={{
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        }}
      >
        {/* SVG filters for realistic effects */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            {/* Inner shadow filter for the outer shape */}
            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feComponentTransfer in="SourceAlpha">
                <feFuncA type="table" tableValues="1 0" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="3" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feFlood floodColor="rgba(255,255,255,0.15)" result="color" />
              <feComposite in2="offsetblur" operator="in" />
              <feComposite in2="SourceAlpha" operator="in" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode />
              </feMerge>
            </filter>

            <filter id="diamondGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feFlood floodColor="#d4ff4a" floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2ff6a" />
              <stop offset="40%" stopColor="#d4ff4a" />
              <stop offset="60%" stopColor="#c4f934" />
              <stop offset="100%" stopColor="#b8ed28" />
            </linearGradient>

            <linearGradient id="diamondShine" x1="0%" y1="0%" x2="50%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            <radialGradient id="outerShapeGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </radialGradient>
          </defs>
        </svg>

        {/* Scalloped/flower outer shape with depth */}
        <svg viewBox="0 0 100 100" className="w-[0.75em] h-[0.75em]">
          <path
            d="M50 0
               C55 15, 65 15, 75 10
               C70 25, 75 35, 90 35
               C80 45, 80 55, 90 65
               C75 65, 70 75, 75 90
               C65 85, 55 85, 50 100
               C45 85, 35 85, 25 90
               C30 75, 25 65, 10 65
               C20 55, 20 45, 10 35
               C25 35, 30 25, 25 10
               C35 15, 45 15, 50 0Z"
            fill="url(#outerShapeGradient)"
            filter="url(#innerShadow)"
          />
          <path
            d="M50 0
               C55 15, 65 15, 75 10
               C70 25, 75 35, 90 35
               C80 45, 80 55, 90 65
               C75 65, 70 75, 75 90
               C65 85, 55 85, 50 100
               C45 85, 35 85, 25 90
               C30 75, 25 65, 10 65
               C20 55, 20 45, 10 35
               C25 35, 30 25, 25 10
               C35 15, 45 15, 50 0Z"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </svg>

        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-[0.32em] h-[0.32em] animate-diamond-rotate"
            filter="url(#diamondGlow)"
          >
            {/* Main diamond shape with clean gradient */}
            <path d="M50 8 L92 50 L50 92 L8 50 Z" fill="url(#diamondGradient)" />
            {/* Top-left shine facet for 3D polish */}
            <path d="M50 8 L8 50 L50 50 Z" fill="url(#diamondShine)" />
            {/* Subtle inner edge highlight */}
            <path d="M50 18 L82 50 L50 82 L18 50 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          </svg>
        </span>
      </span>

      {after && <span key={keyIndex++}>{after}</span>}
    </span>
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
