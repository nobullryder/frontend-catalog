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
animated-text.tsx
"use client"

import { useEffect, useRef } from "react"

interface AnimatedTextProps {
  text: string
  fontSize?: number
  minWeight?: number
  maxWeight?: number
  animationDuration?: number
  delayMultiplier?: number
}

export function AnimatedText({
  text,
  fontSize = 150,
  minWeight = 0,
  maxWeight = 840,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const spans = containerRef.current.querySelectorAll("span")
    const numLetters = spans.length

    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2
      span.style.animationDelay = mappedIndex * delayMultiplier + "s"
    })
  }, [text, delayMultiplier])

  const characters = text.split("").map((char, index) => (
    <span
      key={index}
      aria-hidden="true"
      style={{
        animation: `breath ${animationDuration}s alternate cubic-bezier(0.37, 0, 0.63, 1) infinite`,
        animationFillMode: "both",
        fontVariationSettings: `"wght" ${minWeight}`,
      }}
    >
      {char}
    </span>
  ))

  return (
    <div className="flex justify-center items-center">
      <p
        ref={containerRef}
        aria-label={text}
        className="font-sans m-0"
        style={{
          fontSize: `${fontSize}px`,    
          fontFeatureSettings: '"wght"',
        }}
      >
        {characters}
        <style jsx>{`
          @keyframes breath {
            0% {
              font-variation-settings: "wght" ${minWeight};
            }
            100% {
              font-variation-settings: "wght" ${maxWeight};
            }
          }
        `}</style>
      </p>
    </div>
  )
}


code.demo.1755485412954.tsx
import { AnimatedText } from "@/components/ui/animated-text";

export default function DemoOne() {
   return (
    <main>
      <AnimatedText text="Font Design" fontSize={100} />
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-text.tsx
"use client"

import { useEffect, useRef } from "react"

interface AnimatedTextProps {
  text: string
  fontSize?: number
  minWeight?: number
  maxWeight?: number
  animationDuration?: number
  delayMultiplier?: number
}

export function AnimatedText({
  text,
  fontSize = 150,
  minWeight = 0,
  maxWeight = 840,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const spans = containerRef.current.querySelectorAll("span")
    const numLetters = spans.length

    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2
      span.style.animationDelay = mappedIndex * delayMultiplier + "s"
    })
  }, [text, delayMultiplier])

  const characters = text.split("").map((char, index) => (
    <span
      key={index}
      aria-hidden="true"
      style={{
        animation: `breath ${animationDuration}s alternate cubic-bezier(0.37, 0, 0.63, 1) infinite`,
        animationFillMode: "both",
        fontVariationSettings: `"wght" ${minWeight}`,
      }}
    >
      {char}
    </span>
  ))

  return (
    <div className="flex justify-center items-center">
      <p
        ref={containerRef}
        aria-label={text}
        className="font-sans m-0"
        style={{
          fontSize: `${fontSize}px`,    
          fontFeatureSettings: '"wght"',
        }}
      >
        {characters}
        <style jsx>{`
          @keyframes breath {
            0% {
              font-variation-settings: "wght" ${minWeight};
            }
            100% {
              font-variation-settings: "wght" ${maxWeight};
            }
          }
        `}</style>
      </p>
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
