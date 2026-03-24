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
gradient-blur.tsx
"use client"

import { useEffect, useRef } from "react"

interface GradientBlurProps {
  radius?: number
  opacityDecay?: number 
  backgroundColor?: string
  color?: [number, number, number]  
  colorGenerator?: () => [number, number, number]
}

export function GradientBlur({
  radius = 60,
  opacityDecay = 0.025, 
  backgroundColor = "transparent",
  color,
  colorGenerator,
}: GradientBlurProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const circsRef = useRef<
    Array<{
      col: [number, number, number]
      x: number
      y: number
      grdblur: CanvasGradient
      alpha: number
    }>
  >([])

  const defaultColorGenerator = () => {
    const rgb: [number, number, number] = [
      Math.floor(Math.random() * 130 + 10),
      Math.floor(0.5 * Math.random() * 50),
      Math.floor(0.5 * Math.random() * 255),
    ]
    return rgb
  }

  // ✅ Updated: if color prop exists, use it; otherwise use generator
  const getColor = () => color || colorGenerator?.() || defaultColorGenerator()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    const draw = () => {
      ctx.globalCompositeOperation = "source-over"
      if (backgroundColor === "transparent") {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.globalCompositeOperation = "lighter"

      const obj = {
        col: getColor(),
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        grdblur: ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          radius
        ),
        alpha: 1,
      }
      circsRef.current.push(obj)

      const toRemove: number[] = []
      for (let i = 0; i < circsRef.current.length; i++) {
        const circ = circsRef.current[i]

        circ.grdblur.addColorStop(0, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.95)`)
        circ.grdblur.addColorStop(0.2, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.7)`)
        circ.grdblur.addColorStop(0.5, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.3)`)
        circ.grdblur.addColorStop(1, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0)`)

        ctx.beginPath()
        ctx.fillStyle = circ.grdblur
        ctx.globalAlpha = circ.alpha
        ctx.arc(circ.x, circ.y, radius, 0, Math.PI * 2)
        ctx.fill()

        circ.alpha -= opacityDecay
        if (circ.alpha <= 0) toRemove.push(i)
      }

      for (let i = toRemove.length - 1; i >= 0; i--) {
        circsRef.current.splice(toRemove[i], 1)
      }

      ctx.globalAlpha = 1
      requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.pageX
      mouseRef.current.y = e.pageY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      mouseRef.current.x = e.touches[0].pageX
      mouseRef.current.y = e.touches[0].pageY
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("resize", resizeCanvas)

    draw()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [radius, opacityDecay, backgroundColor, color, colorGenerator])

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-move">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: "transparent" }}
      />
    </div>
  )
}


code.demo.1761127875091.tsx
import { GradientBlur } from "@/components/ui/gradient-blur";

export default function DemoOne() {
  return (
    <div className="relative w-full h-screen overflow-hidden cursor-move">
      <GradientBlur/>  
        <h4
          className="absolute left-0 top-2/5 w-full text-center text-6xl  pointer-events-none" 
        >
          Gradient Blur
        </h4> 
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/gradient-blur.tsx
"use client"

import { useEffect, useRef } from "react"

interface GradientBlurProps {
  radius?: number
  opacityDecay?: number 
  backgroundColor?: string
  color?: [number, number, number]  
  colorGenerator?: () => [number, number, number]
}

export function GradientBlur({
  radius = 60,
  opacityDecay = 0.025, 
  backgroundColor = "transparent",
  color,
  colorGenerator,
}: GradientBlurProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const circsRef = useRef<
    Array<{
      col: [number, number, number]
      x: number
      y: number
      grdblur: CanvasGradient
      alpha: number
    }>
  >([])

  const defaultColorGenerator = () => {
    const rgb: [number, number, number] = [
      Math.floor(Math.random() * 130 + 10),
      Math.floor(0.5 * Math.random() * 50),
      Math.floor(0.5 * Math.random() * 255),
    ]
    return rgb
  }

  // ✅ Updated: if color prop exists, use it; otherwise use generator
  const getColor = () => color || colorGenerator?.() || defaultColorGenerator()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    const draw = () => {
      ctx.globalCompositeOperation = "source-over"
      if (backgroundColor === "transparent") {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.globalCompositeOperation = "lighter"

      const obj = {
        col: getColor(),
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        grdblur: ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          radius
        ),
        alpha: 1,
      }
      circsRef.current.push(obj)

      const toRemove: number[] = []
      for (let i = 0; i < circsRef.current.length; i++) {
        const circ = circsRef.current[i]

        circ.grdblur.addColorStop(0, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.95)`)
        circ.grdblur.addColorStop(0.2, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.7)`)
        circ.grdblur.addColorStop(0.5, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0.3)`)
        circ.grdblur.addColorStop(1, `rgba(${circ.col[0]},${circ.col[1]},${circ.col[2]},0)`)

        ctx.beginPath()
        ctx.fillStyle = circ.grdblur
        ctx.globalAlpha = circ.alpha
        ctx.arc(circ.x, circ.y, radius, 0, Math.PI * 2)
        ctx.fill()

        circ.alpha -= opacityDecay
        if (circ.alpha <= 0) toRemove.push(i)
      }

      for (let i = toRemove.length - 1; i >= 0; i--) {
        circsRef.current.splice(toRemove[i], 1)
      }

      ctx.globalAlpha = 1
      requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.pageX
      mouseRef.current.y = e.pageY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      mouseRef.current.x = e.touches[0].pageX
      mouseRef.current.y = e.touches[0].pageY
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("resize", resizeCanvas)

    draw()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [radius, opacityDecay, backgroundColor, color, colorGenerator])

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-move">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: "transparent" }}
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
