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
animated-grid.tsx
"use client"

import type React from "react"

import { useMemo } from "react"

interface AnimatedGridProps {
  rows?: number
  cols?: number
  cellSize?: string
  animationDuration?: string
  startColor?: [number, number, number]
  endColor?: [number, number, number]
  animationStartColor?: [number, number, number]
  animationEndColor?: [number, number, number] 
}

export function AnimatedGrid({
  rows = 6,
  cols = 8,
  cellSize = "4rem",
  animationDuration = "2s",
  startColor = [94, 47, 70],
  endColor = [199, 82, 51],
  animationStartColor = [105, 210, 231],
  animationEndColor = [250, 105, 0], 
}: AnimatedGridProps) {
  const totalItems = rows * cols

  // Generate grid items with calculated positions
  const gridItems = useMemo(() => {
    return Array.from({ length: totalItems }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      // Calculate animation delay based on position
      const delay = ((col - row) / cols - 1) * Number.parseFloat(animationDuration)

      // Calculate color interpolation factor
      const k = row / rows

      return {
        index,
        row,
        col,
        delay,
        k,
      }
    })
  }, [rows, cols, totalItems, animationDuration])

  // Color interpolation function
  const interpolateColor = (color1: [number, number, number], color2: [number, number, number], k: number) => {
    const r = Math.round(k * color2[0] + (1 - k) * color1[0])
    const g = Math.round(k * color2[1] + (1 - k) * color1[1])
    const b = Math.round(k * color2[2] + (1 - k) * color1[2])
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" >
      <div
        className="grid gap-0"
        style={{
          gridTemplate: `repeat(${rows}, ${cellSize}) / repeat(${cols}, ${cellSize})`,
        }}
      >
        {gridItems.map(({ index, row, col, delay, k }) => {
          const cellBackgroundColor = interpolateColor(startColor, endColor, k)
          const animationColor1 = interpolateColor(animationStartColor, animationEndColor, k)

          return (
            <div
              key={index}
              className="relative"
              style={
                {
                  backgroundColor: cellBackgroundColor,
                  animation: `gridAnimation ${animationDuration} ease-in ${delay}s infinite alternate`,
                  "--animation-color": animationColor1,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      <style jsx>{`
        @keyframes gridAnimation {
          0% {
            border-radius: 50%;
            background-color: var(--animation-color);
          }
          100% {
            border-radius: 0%;
            background-color: inherit;
          }
        }
      `}</style>
    </div>
  )
}


code.demo.1756052348014.tsx
import { AnimatedGrid } from "@/components/ui/animated-grid";

export default function DemoOne() {
  return (
    <div className= "relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-xl" >

<AnimatedGrid 
  startColor={[255, 0, 0]} 
  endColor={[255, 0, 255]} 
  animationStartColor={[255, 0, 0]} 
  animationEndColor={[255, 0, 255]} 
  rows={10} 
  cols={15} 
  cellSize="6rem" 
  animationDuration="2s"  
/>


      <span className="pointer-events-none absolute z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap" >
        Animated Grid
          < /span>
          < /div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-grid.tsx
"use client"

import type React from "react"

import { useMemo } from "react"

interface AnimatedGridProps {
  rows?: number
  cols?: number
  cellSize?: string
  animationDuration?: string
  startColor?: [number, number, number]
  endColor?: [number, number, number]
  animationStartColor?: [number, number, number]
  animationEndColor?: [number, number, number] 
}

export function AnimatedGrid({
  rows = 6,
  cols = 8,
  cellSize = "4rem",
  animationDuration = "2s",
  startColor = [94, 47, 70],
  endColor = [199, 82, 51],
  animationStartColor = [105, 210, 231],
  animationEndColor = [250, 105, 0], 
}: AnimatedGridProps) {
  const totalItems = rows * cols

  // Generate grid items with calculated positions
  const gridItems = useMemo(() => {
    return Array.from({ length: totalItems }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      // Calculate animation delay based on position
      const delay = ((col - row) / cols - 1) * Number.parseFloat(animationDuration)

      // Calculate color interpolation factor
      const k = row / rows

      return {
        index,
        row,
        col,
        delay,
        k,
      }
    })
  }, [rows, cols, totalItems, animationDuration])

  // Color interpolation function
  const interpolateColor = (color1: [number, number, number], color2: [number, number, number], k: number) => {
    const r = Math.round(k * color2[0] + (1 - k) * color1[0])
    const g = Math.round(k * color2[1] + (1 - k) * color1[1])
    const b = Math.round(k * color2[2] + (1 - k) * color1[2])
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" >
      <div
        className="grid gap-0"
        style={{
          gridTemplate: `repeat(${rows}, ${cellSize}) / repeat(${cols}, ${cellSize})`,
        }}
      >
        {gridItems.map(({ index, row, col, delay, k }) => {
          const cellBackgroundColor = interpolateColor(startColor, endColor, k)
          const animationColor1 = interpolateColor(animationStartColor, animationEndColor, k)

          return (
            <div
              key={index}
              className="relative"
              style={
                {
                  backgroundColor: cellBackgroundColor,
                  animation: `gridAnimation ${animationDuration} ease-in ${delay}s infinite alternate`,
                  "--animation-color": animationColor1,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      <style jsx>{`
        @keyframes gridAnimation {
          0% {
            border-radius: 50%;
            background-color: var(--animation-color);
          }
          100% {
            border-radius: 0%;
            background-color: inherit;
          }
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
