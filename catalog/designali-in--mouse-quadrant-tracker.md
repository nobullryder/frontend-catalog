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
mouse-quadrant-tracker.tsx
"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface MouseQuadrantTrackerProps {
  text: string
  hue?: number
  fontSize?: string
  shadowIntensity?: number 
  textColor?: string
  className?: string
}

export function MouseQuadrantTracker({
  text,
  hue = 200,
  fontSize = "25vmax",
  shadowIntensity = 10, 
  textColor,
  className,
}: MouseQuadrantTrackerProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  const getQuadrants = (element: HTMLElement, clientX: number, clientY: number) => {
    const { x, y, width, height } = element.getBoundingClientRect()
    const quadX = clientX - (x + 0.5 * width)
    const quadY = clientY - (y + 0.5 * height)

    return {
      x: quadX >= 0 ? 1 : -1,
      y: quadY >= 0 ? 1 : -1,
    }
  }

  useEffect(() => {
    const h1Element = h1Ref.current
    if (!h1Element) return

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { x, y } = getQuadrants(h1Element, clientX, clientY)

      // Update CSS custom properties
      h1Element.style.setProperty("--x-quadrant", `${x}`)
      h1Element.style.setProperty("--y-quadrant", `${y}`)
    }

    h1Element.addEventListener("mousemove", handleMouseMove)

    return () => {
      h1Element.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className={className}
      style={
        {
          minHeight: "100vh",
          minWidth: "100%",
          margin: 0,
          padding: "5vmin",
          boxSizing: "border-box",
          display: "grid",
          placeItems: "center",  
          "--hue": hue.toString(),
          "--x-quadrant": "1",
          "--y-quadrant": "1",
        } as React.CSSProperties
      }
    >
      <h1 className={className}
        ref={h1Ref}
        style={
          {
            color: textColor || `hsl(${hue} 90% 90%)`,
            textShadow: `
            calc(var(--x-quadrant) * ${shadowIntensity}px) calc(var(--y-quadrant) * ${shadowIntensity}px) 0 hsl(var(--hue) 70% 75%),
            calc(var(--x-quadrant) * ${shadowIntensity * 2}px) calc(var(--y-quadrant) * ${shadowIntensity * 2}px) 0 hsl(var(--hue) 70% 65%),
            calc(var(--x-quadrant) * ${shadowIntensity * 3}px) calc(var(--y-quadrant) * ${shadowIntensity * 3}px) 0 hsl(var(--hue) 70% 55%),
            calc(var(--x-quadrant) * ${shadowIntensity * 4}px) calc(var(--y-quadrant) * ${shadowIntensity * 4}px) 0 hsl(var(--hue) 70% 45%),
            calc(var(--x-quadrant) * ${shadowIntensity * 5}px) calc(var(--y-quadrant) * ${shadowIntensity * 5}px) 0 hsl(var(--hue) 70% 35%)
          `,
            transition: "text-shadow 0.2s ease",
            textTransform: "uppercase",
            fontSize: fontSize,
            margin: 0,
            lineHeight: "0.8em",
            inlineSize: "min-content",
          } as React.CSSProperties
        }
      >
        {text}
      </h1>
    </div>
  )
}


code.demo.1755668441306.tsx
import { MouseQuadrantTracker } from "@/components/ui/mouse-quadrant-tracker";

export default function DemoOne() {
  return <MouseQuadrantTracker className="text-center font-bold" text="No Code" hue={100}  fontSize="25vmax" />
}


```

Copy-paste these files for dependencies:
```tsx
src/components/ui/mouse-quadrant-tracker.tsx
"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface MouseQuadrantTrackerProps {
  text: string
  hue?: number
  fontSize?: string
  shadowIntensity?: number 
  textColor?: string
  className?: string
}

export function MouseQuadrantTracker({
  text,
  hue = 200,
  fontSize = "25vmax",
  shadowIntensity = 10, 
  textColor,
  className,
}: MouseQuadrantTrackerProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  const getQuadrants = (element: HTMLElement, clientX: number, clientY: number) => {
    const { x, y, width, height } = element.getBoundingClientRect()
    const quadX = clientX - (x + 0.5 * width)
    const quadY = clientY - (y + 0.5 * height)

    return {
      x: quadX >= 0 ? 1 : -1,
      y: quadY >= 0 ? 1 : -1,
    }
  }

  useEffect(() => {
    const h1Element = h1Ref.current
    if (!h1Element) return

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { x, y } = getQuadrants(h1Element, clientX, clientY)

      // Update CSS custom properties
      h1Element.style.setProperty("--x-quadrant", `${x}`)
      h1Element.style.setProperty("--y-quadrant", `${y}`)
    }

    h1Element.addEventListener("mousemove", handleMouseMove)

    return () => {
      h1Element.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className={className}
      style={
        {
          minHeight: "100vh",
          minWidth: "100%",
          margin: 0,
          padding: "5vmin",
          boxSizing: "border-box",
          display: "grid",
          placeItems: "center",  
          "--hue": hue.toString(),
          "--x-quadrant": "1",
          "--y-quadrant": "1",
        } as React.CSSProperties
      }
    >
      <h1 className={className}
        ref={h1Ref}
        style={
          {
            color: textColor || `hsl(${hue} 90% 90%)`,
            textShadow: `
            calc(var(--x-quadrant) * ${shadowIntensity}px) calc(var(--y-quadrant) * ${shadowIntensity}px) 0 hsl(var(--hue) 70% 75%),
            calc(var(--x-quadrant) * ${shadowIntensity * 2}px) calc(var(--y-quadrant) * ${shadowIntensity * 2}px) 0 hsl(var(--hue) 70% 65%),
            calc(var(--x-quadrant) * ${shadowIntensity * 3}px) calc(var(--y-quadrant) * ${shadowIntensity * 3}px) 0 hsl(var(--hue) 70% 55%),
            calc(var(--x-quadrant) * ${shadowIntensity * 4}px) calc(var(--y-quadrant) * ${shadowIntensity * 4}px) 0 hsl(var(--hue) 70% 45%),
            calc(var(--x-quadrant) * ${shadowIntensity * 5}px) calc(var(--y-quadrant) * ${shadowIntensity * 5}px) 0 hsl(var(--hue) 70% 35%)
          `,
            transition: "text-shadow 0.2s ease",
            textTransform: "uppercase",
            fontSize: fontSize,
            margin: 0,
            lineHeight: "0.8em",
            inlineSize: "min-content",
          } as React.CSSProperties
        }
      >
        {text}
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
