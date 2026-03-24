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
vector-field.tsx
"use client"

import { useEffect, useRef } from "react"

interface VectorFieldProps {
  backgroundColor?: string  
  lineColor?: string
  lineWeight?: number
  proximity?: number
  vectorSize?: number
  fullHeight?: boolean
  transparent?: boolean  
}

export function VectorField({
  backgroundColor,
  lineColor = "blue",
  lineWeight = 4,
  proximity = 8,
  vectorSize = 10,
  fullHeight = true,
  transparent = true,
}: VectorFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const vectorsRef = useRef<Array<{ x: number; y: number }>>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeVectors()
    }

    const initializeVectors = () => {
      vectorsRef.current = []
      const row = Math.ceil(canvas.width / proximity) + 1
      const column = Math.ceil(canvas.height / proximity) + 1

      for (let j = 0; j < column; j++) {
        for (let i = 0; i < row; i++) {
          vectorsRef.current.push({
            x: proximity * i,
            y: proximity * j,
          })
        }
      }
    }

    const calcVec = (x: number, y: number) => {
      const newX = y - x
      const newY = -x - y
      return Math.atan2(newY, newX)
    }

    const animate = () => {
     
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const effectiveBg = backgroundColor ?? (prefersDark ? "black" : "white")

      if (transparent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.fillStyle = effectiveBg
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWeight
      ctx.lineCap = "round"

      vectorsRef.current.forEach((vector) => {
        const dx = vector.x - mouseRef.current.x
        const dy = vector.y - mouseRef.current.y
        const heading = calcVec(dx, dy)

        ctx.beginPath()
        ctx.moveTo(vector.x, vector.y)
        ctx.lineTo(
          vector.x + vectorSize * Math.cos(heading),
          vector.y + vectorSize * Math.sin(heading)
        )
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      resizeCanvas()
    }

    resizeCanvas()
    animate()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [backgroundColor, lineColor, lineWeight, proximity, vectorSize, transparent])

  return (
    <canvas
      ref={canvasRef}
      className={fullHeight ? "fixed inset-0" : "block w-full"}
      style={{ display: "block" }}
    />
  )
}


code.demo.1760760492713.tsx
import { VectorField } from "@/components/ui/vector-field";

export default function DemoOne() {
   return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full">
      <VectorField />
      <h2 className="w-full absolute z-10 py-10 text-center text-5xl font-semibold lg:text-7xl text-white">
          Vector Field
        </h2>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/vector-field.tsx
"use client"

import { useEffect, useRef } from "react"

interface VectorFieldProps {
  backgroundColor?: string  
  lineColor?: string
  lineWeight?: number
  proximity?: number
  vectorSize?: number
  fullHeight?: boolean
  transparent?: boolean  
}

export function VectorField({
  backgroundColor,
  lineColor = "blue",
  lineWeight = 4,
  proximity = 8,
  vectorSize = 10,
  fullHeight = true,
  transparent = true,
}: VectorFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const vectorsRef = useRef<Array<{ x: number; y: number }>>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeVectors()
    }

    const initializeVectors = () => {
      vectorsRef.current = []
      const row = Math.ceil(canvas.width / proximity) + 1
      const column = Math.ceil(canvas.height / proximity) + 1

      for (let j = 0; j < column; j++) {
        for (let i = 0; i < row; i++) {
          vectorsRef.current.push({
            x: proximity * i,
            y: proximity * j,
          })
        }
      }
    }

    const calcVec = (x: number, y: number) => {
      const newX = y - x
      const newY = -x - y
      return Math.atan2(newY, newX)
    }

    const animate = () => {
     
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const effectiveBg = backgroundColor ?? (prefersDark ? "black" : "white")

      if (transparent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.fillStyle = effectiveBg
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWeight
      ctx.lineCap = "round"

      vectorsRef.current.forEach((vector) => {
        const dx = vector.x - mouseRef.current.x
        const dy = vector.y - mouseRef.current.y
        const heading = calcVec(dx, dy)

        ctx.beginPath()
        ctx.moveTo(vector.x, vector.y)
        ctx.lineTo(
          vector.x + vectorSize * Math.cos(heading),
          vector.y + vectorSize * Math.sin(heading)
        )
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      resizeCanvas()
    }

    resizeCanvas()
    animate()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [backgroundColor, lineColor, lineWeight, proximity, vectorSize, transparent])

  return (
    <canvas
      ref={canvasRef}
      className={fullHeight ? "fixed inset-0" : "block w-full"}
      style={{ display: "block" }}
    />
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
