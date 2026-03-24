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
animated-leaves.tsx
"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function AnimatedLeaves() {
  const [leaves, setLeaves] = useState<
    Array<{
      index: number
      ringIndex: number
      count: number
      delay: number
    }>
  >([])

  useEffect(() => {
    const startCount = 10
    const ringCount = 13
    const leafElements = []
    let globalIndex = 0

    for (let ri = 0; ri < ringCount; ri++) {
      const count = startCount - 1 + ri * 11
      for (let i = 0; i <= count; i++) {
        leafElements.push({
          index: globalIndex,
          ringIndex: ri,
          count: count + 1,
          delay: 0.6 * ri + 0.9 * Math.random(),
        })
        globalIndex++
      }
    }

    setLeaves(leafElements)
  }, [])

  return (
    <div className="w-screen h-screen grid place-items-center m-0 relative overflow-hidden">
      {/* SVG Filter */}
      <svg className="absolute invisible pointer-events-none" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="blurFilter">
          <feGaussianBlur stdDeviation="4.5"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 19 -9"
          ></feColorMatrix>
        </filter>
      </svg>

      {/* Background blur circle */}
      <div
        className="absolute w-[30vmin] aspect-square rounded-full translate-y-1/2"
        style={{ filter: "blur(1rem)" }}
      />

      {/* Container with leaves */}
      <div
        className="relative"
        style={
          {
            filter: "url(#blurFilter) saturate(1.5) brightness(1.1)",
            "--color-primary": "#ee75d2",
          } as React.CSSProperties
        }
      >
        {leaves.map((leaf) => {
          const anglePerItem = 360 / leaf.count
          const angle = anglePerItem * (leaf.index % leaf.count)

          return (
            <div
              key={leaf.index}
              className="absolute opacity-0 rounded-full"
              style={
                {
                  "--size": "20vmin",
                  "--ri": leaf.ringIndex,
                  "--i": leaf.index % leaf.count,
                  "--delay": `${leaf.delay}s`,
                  "--count": leaf.count,
                  height:  "20vmin",
                  aspectRatio: "1 / 20",
                  background: `radial-gradient(
                  color-mix(in srgb, white, transparent 90%),
                  color-mix(
                    in srgb,
                    var(--color-primary),
                    hsla(${10 * (leaf.index % leaf.count)}, 100%, 50%, 1) 50%
                  )
                )`,
                  animation: `leafMove 0.8s var(--delay) ease infinite`,
                  transform: `
                  translate(
                    calc(cos(${angle}deg) * (var(--move, 0vmin) + 4.2vmin + ${leaf.ringIndex} * 20vmin * 0.44)),
                    calc(sin(${angle}deg) * (var(--move, 0vmin) + 4.2vmin + ${leaf.ringIndex} * 20vmin * 0.44) * -1)
                  )
                  rotate(${90 - angle}deg)
                `,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @property --move {
          syntax: "<length>";
          inherits: true;
          initial-value: 0;
        }

        @keyframes leafMove {
          from {
            --move: 0vmin;
            opacity: 0;
          }
          20%, 50%, 70% {
            opacity: 1;
          }
          to {
            --move: 22vmin;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


code.demo.1755236205908.tsx
import { AnimatedLeaves } from "@/components/ui/animated-leaves";

export default function DemoOne() {
  return (
    <AnimatedLeaves />
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-leaves.tsx
"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function AnimatedLeaves() {
  const [leaves, setLeaves] = useState<
    Array<{
      index: number
      ringIndex: number
      count: number
      delay: number
    }>
  >([])

  useEffect(() => {
    const startCount = 10
    const ringCount = 13
    const leafElements = []
    let globalIndex = 0

    for (let ri = 0; ri < ringCount; ri++) {
      const count = startCount - 1 + ri * 11
      for (let i = 0; i <= count; i++) {
        leafElements.push({
          index: globalIndex,
          ringIndex: ri,
          count: count + 1,
          delay: 0.6 * ri + 0.9 * Math.random(),
        })
        globalIndex++
      }
    }

    setLeaves(leafElements)
  }, [])

  return (
    <div className="w-screen h-screen grid place-items-center m-0 relative overflow-hidden">
      {/* SVG Filter */}
      <svg className="absolute invisible pointer-events-none" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter id="blurFilter">
          <feGaussianBlur stdDeviation="4.5"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 19 -9"
          ></feColorMatrix>
        </filter>
      </svg>

      {/* Background blur circle */}
      <div
        className="absolute w-[30vmin] aspect-square rounded-full translate-y-1/2"
        style={{ filter: "blur(1rem)" }}
      />

      {/* Container with leaves */}
      <div
        className="relative"
        style={
          {
            filter: "url(#blurFilter) saturate(1.5) brightness(1.1)",
            "--color-primary": "#ee75d2",
          } as React.CSSProperties
        }
      >
        {leaves.map((leaf) => {
          const anglePerItem = 360 / leaf.count
          const angle = anglePerItem * (leaf.index % leaf.count)

          return (
            <div
              key={leaf.index}
              className="absolute opacity-0 rounded-full"
              style={
                {
                  "--size": "20vmin",
                  "--ri": leaf.ringIndex,
                  "--i": leaf.index % leaf.count,
                  "--delay": `${leaf.delay}s`,
                  "--count": leaf.count,
                  height:  "20vmin",
                  aspectRatio: "1 / 20",
                  background: `radial-gradient(
                  color-mix(in srgb, white, transparent 90%),
                  color-mix(
                    in srgb,
                    var(--color-primary),
                    hsla(${10 * (leaf.index % leaf.count)}, 100%, 50%, 1) 50%
                  )
                )`,
                  animation: `leafMove 0.8s var(--delay) ease infinite`,
                  transform: `
                  translate(
                    calc(cos(${angle}deg) * (var(--move, 0vmin) + 4.2vmin + ${leaf.ringIndex} * 20vmin * 0.44)),
                    calc(sin(${angle}deg) * (var(--move, 0vmin) + 4.2vmin + ${leaf.ringIndex} * 20vmin * 0.44) * -1)
                  )
                  rotate(${90 - angle}deg)
                `,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @property --move {
          syntax: "<length>";
          inherits: true;
          initial-value: 0;
        }

        @keyframes leafMove {
          from {
            --move: 0vmin;
            opacity: 0;
          }
          20%, 50%, 70% {
            opacity: 1;
          }
          to {
            --move: 22vmin;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
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
