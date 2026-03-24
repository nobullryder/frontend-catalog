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
interactive-dots-1.tsx
"use client"

import { useEffect, useRef } from "react"

interface InteractiveDotsProps {
  dotColor?: string
  dotSize?: number
  className?: string
}

export function InteractiveDots({
  dotColor = "#F44336",
  dotSize = 20,
  className = "",
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const frameCountRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Constants
    const CIRCLE_W = dotSize
    const ACTUAL_W = CIRCLE_W * 0.72
    const MIN_W = 0
    const CIRCLE_DIST = CIRCLE_W / 2
    const COLS = Math.ceil(canvas.width / CIRCLE_DIST) + 1
    const ROWS = Math.ceil(canvas.height / CIRCLE_DIST) + 1
    const GREATER = Math.max(canvas.width, canvas.height)

    // Simple noise function for organic motion
    const noise = (x: number, y: number, z: number) => {
      const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453
      return n - Math.floor(n)
    }

    // Dot class
    class Dot {
      position: { x: number; y: number }

      constructor(posX: number, posY: number) {
        this.position = { x: posX, y: posY }
      }

      calcWidth(): number {
        const dx = mousePos.current.x - this.position.x
        const dy = mousePos.current.y - this.position.y
        let delta = Math.sqrt(dx * dx + dy * dy)

        // Add noise variation
        const noiseVal = noise(this.position.x, this.position.y, frameCountRef.current)
        const noiseMap = 0.7 + noiseVal * 0.5
        delta *= noiseMap

        if (delta > GREATER / 2) {
          delta = GREATER / 2
        }

        return ACTUAL_W - (delta / (GREATER / 2)) * (ACTUAL_W - MIN_W)
      }

      render() {
        const w = this.calcWidth()
        ctx!.fillStyle = dotColor
        ctx!.beginPath()
        ctx!.arc(this.position.x, this.position.y, w / 2, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Create dots grid
    const dots: Dot[] = []
    for (let ci = 0; ci < COLS; ci++) {
      for (let ri = 0; ri < ROWS; ri++) {
        dots.push(new Dot(ci * CIRCLE_DIST, ri * CIRCLE_DIST))
      }
    }

    // Mouse and touch tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    // Animation loop
    const animate = () => {
      // Transparent background
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      dots.forEach((dot) => dot.render())

      frameCountRef.current++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [dotColor, dotSize])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-screen ${className}`}
      style={{ display: "block", background: "transparent" }}
    />
  )
}


code.demo.1760847049158.tsx
import { InteractiveDots } from "@/components/ui/interactive-dots-1";

export default function DemoOne() {
   return (
    <main className="w-full flex flex-col items-center justify-center h-screen overflow-hidden">
      <InteractiveDots dotColor="#0000ff" dotSize={10} />
      <h1 className="absolute text-background text-5xl font-bold">
      InteractiveDots
      </h1>
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/interactive-dots-1.tsx
"use client"

import { useEffect, useRef } from "react"

interface InteractiveDotsProps {
  dotColor?: string
  dotSize?: number
  className?: string
}

export function InteractiveDots({
  dotColor = "#F44336",
  dotSize = 20,
  className = "",
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const frameCountRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Constants
    const CIRCLE_W = dotSize
    const ACTUAL_W = CIRCLE_W * 0.72
    const MIN_W = 0
    const CIRCLE_DIST = CIRCLE_W / 2
    const COLS = Math.ceil(canvas.width / CIRCLE_DIST) + 1
    const ROWS = Math.ceil(canvas.height / CIRCLE_DIST) + 1
    const GREATER = Math.max(canvas.width, canvas.height)

    // Simple noise function for organic motion
    const noise = (x: number, y: number, z: number) => {
      const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453
      return n - Math.floor(n)
    }

    // Dot class
    class Dot {
      position: { x: number; y: number }

      constructor(posX: number, posY: number) {
        this.position = { x: posX, y: posY }
      }

      calcWidth(): number {
        const dx = mousePos.current.x - this.position.x
        const dy = mousePos.current.y - this.position.y
        let delta = Math.sqrt(dx * dx + dy * dy)

        // Add noise variation
        const noiseVal = noise(this.position.x, this.position.y, frameCountRef.current)
        const noiseMap = 0.7 + noiseVal * 0.5
        delta *= noiseMap

        if (delta > GREATER / 2) {
          delta = GREATER / 2
        }

        return ACTUAL_W - (delta / (GREATER / 2)) * (ACTUAL_W - MIN_W)
      }

      render() {
        const w = this.calcWidth()
        ctx!.fillStyle = dotColor
        ctx!.beginPath()
        ctx!.arc(this.position.x, this.position.y, w / 2, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    // Create dots grid
    const dots: Dot[] = []
    for (let ci = 0; ci < COLS; ci++) {
      for (let ri = 0; ri < ROWS; ri++) {
        dots.push(new Dot(ci * CIRCLE_DIST, ri * CIRCLE_DIST))
      }
    }

    // Mouse and touch tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    // Animation loop
    const animate = () => {
      // Transparent background
      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      dots.forEach((dot) => dot.render())

      frameCountRef.current++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [dotColor, dotSize])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-screen ${className}`}
      style={{ display: "block", background: "transparent" }}
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
