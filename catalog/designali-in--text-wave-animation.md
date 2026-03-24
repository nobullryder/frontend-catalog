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
text-wave-animation.tsx
"use client"

import { useEffect } from "react"

interface AnimatedHeartsProps {
  text?: string
  count?: number
  backgroundColor?: string
  colors?: string[]
  animationDuration?: number
  fontSize?: string
  staggerDelay?: number
  heightFactor?: number
}

export function AnimatedHearts({
  text = "✦",
  count = 5,
  backgroundColor = "#57008a",
  colors = [
    "#7400b8",
    "#6930c3",
    "#5e60ce",
    "#5390d9",
    "#4ea8de",
    "#48bfe3",
    "#56cfe1",
    "#64dfdf",
    "#72efdd",
    "#80ffdb",
  ],
  animationDuration = 2,
  fontSize = "12vw",
  staggerDelay = 200,
  heightFactor = 2,
}: AnimatedHeartsProps) {
  useEffect(() => {
    // Create rainbow shadow strings
    let rainbowEnd = ""
    let rainbowEnd2 = ""

    colors.slice().reverse().forEach((c, i) => {
      rainbowEnd += `,0 ${(i - 5) * heightFactor}vh ${i * 2}px ${c}`
    })

    colors.forEach((c, i) => {
      rainbowEnd2 += `,0 ${(i - 5) * -heightFactor}vh ${i * 2}px ${c}`
    })

    rainbowEnd = rainbowEnd.substring(1)
    rainbowEnd2 = rainbowEnd2.substring(1)

    // Create CSS keyframes dynamically
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
      @keyframes rainbowShadow {
        0% { text-shadow: ${rainbowEnd}; }
        100% { text-shadow: ${rainbowEnd2}; }
      }
    `
    document.head.appendChild(styleSheet)

    // Apply animation to each heart with stagger
    const hearts = document.querySelectorAll(".heart-span")
    hearts.forEach((heart, i) => {
      const element = heart as HTMLElement
      element.style.animation = `rainbowShadow ${animationDuration}s cubic-bezier(0.3, 0, 0.7, 1) infinite alternate both`
      element.style.animationDelay = `${-1000 + i * staggerDelay}ms`
    })

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [colors, animationDuration, staggerDelay, heightFactor]) // Added dependencies

  return (
    <div className="w-full flex gap-1 items-center justify-center"
      style={{ 
        height: "100vh",
      }}
    >
      <h1 className="font-black"
        style={{
          fontSize: fontSize,  
          color: "transparent", 
        }}
      >
        {Array.from(
          { length: count },
          (
            _,
            i, // Use count prop
          ) => (
            <span
              key={i}
              className="heart-span"
              style={{
                flexBasis: "100%",
                display: "inline-block",
              }}
            >
              {text} {/* Use text prop instead of hardcoded heart */}
            </span>
          ),
        )}
      </h1>
    </div>
  )
}


code.demo.1755661598661.tsx
import { AnimatedHearts } from "@/components/ui/text-wave-animation";

export default function DemoOne() {
  return <AnimatedHearts />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-wave-animation.tsx
"use client"

import { useEffect } from "react"

interface AnimatedHeartsProps {
  text?: string
  count?: number
  backgroundColor?: string
  colors?: string[]
  animationDuration?: number
  fontSize?: string
  staggerDelay?: number
  heightFactor?: number
}

export function AnimatedHearts({
  text = "✦",
  count = 5,
  backgroundColor = "#57008a",
  colors = [
    "#7400b8",
    "#6930c3",
    "#5e60ce",
    "#5390d9",
    "#4ea8de",
    "#48bfe3",
    "#56cfe1",
    "#64dfdf",
    "#72efdd",
    "#80ffdb",
  ],
  animationDuration = 2,
  fontSize = "12vw",
  staggerDelay = 200,
  heightFactor = 2,
}: AnimatedHeartsProps) {
  useEffect(() => {
    // Create rainbow shadow strings
    let rainbowEnd = ""
    let rainbowEnd2 = ""

    colors.slice().reverse().forEach((c, i) => {
      rainbowEnd += `,0 ${(i - 5) * heightFactor}vh ${i * 2}px ${c}`
    })

    colors.forEach((c, i) => {
      rainbowEnd2 += `,0 ${(i - 5) * -heightFactor}vh ${i * 2}px ${c}`
    })

    rainbowEnd = rainbowEnd.substring(1)
    rainbowEnd2 = rainbowEnd2.substring(1)

    // Create CSS keyframes dynamically
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
      @keyframes rainbowShadow {
        0% { text-shadow: ${rainbowEnd}; }
        100% { text-shadow: ${rainbowEnd2}; }
      }
    `
    document.head.appendChild(styleSheet)

    // Apply animation to each heart with stagger
    const hearts = document.querySelectorAll(".heart-span")
    hearts.forEach((heart, i) => {
      const element = heart as HTMLElement
      element.style.animation = `rainbowShadow ${animationDuration}s cubic-bezier(0.3, 0, 0.7, 1) infinite alternate both`
      element.style.animationDelay = `${-1000 + i * staggerDelay}ms`
    })

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [colors, animationDuration, staggerDelay, heightFactor]) // Added dependencies

  return (
    <div className="w-full flex gap-1 items-center justify-center"
      style={{ 
        height: "100vh",
      }}
    >
      <h1 className="font-black"
        style={{
          fontSize: fontSize,  
          color: "transparent", 
        }}
      >
        {Array.from(
          { length: count },
          (
            _,
            i, // Use count prop
          ) => (
            <span
              key={i}
              className="heart-span"
              style={{
                flexBasis: "100%",
                display: "inline-block",
              }}
            >
              {text} {/* Use text prop instead of hardcoded heart */}
            </span>
          ),
        )}
      </h1>
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
