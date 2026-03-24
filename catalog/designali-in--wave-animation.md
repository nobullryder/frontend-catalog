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
wave-animation.tsx
"use client"

import { useEffect, useRef } from "react"

export function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const palette = ["#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"]

    const animate = (timeStart: number) => (time: number) => {
      requestAnimationFrame(() => animate(timeStart)(Date.now() + timeStart))

      let x = 0
      const arr = Array(20)

      // Semi-transparent overlay for trailing effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.03)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create wave bars
      for (let i = 0; i < arr.length; i++) {
        arr[i] = 2 - (Math.sin(i + time / 200) / 2) * canvas.height

        const r = arr[i]
        ctx.fillStyle = palette[Math.floor(i + time / 200) % palette.length]
        const w = 100
        ctx.fillRect(x, canvas.height / 2, w, arr[i])
        x += w
      }
    }

    // Start animations with different time offsets
    animate(0)(0)
    animate(100)(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        id="c"
        className="block"
        style={{
          margin: 0,
          padding: 0,
          display: "block",
        }}
      />
    </div>
  )
}


code.demo.1755237600903.tsx
import { WaveAnimation } from "@/components/ui/wave-animation";

export default function DemoOne() {
  return (
    <main className="relative">
      <WaveAnimation />
      {/* You can add other content here that will appear over the animation */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-7xl font-bold text-white text-center ">Wave Animation</h1>
      </div>
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/wave-animation.tsx
"use client"

import { useEffect, useRef } from "react"

export function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const palette = ["#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"]

    const animate = (timeStart: number) => (time: number) => {
      requestAnimationFrame(() => animate(timeStart)(Date.now() + timeStart))

      let x = 0
      const arr = Array(20)

      // Semi-transparent overlay for trailing effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.03)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create wave bars
      for (let i = 0; i < arr.length; i++) {
        arr[i] = 2 - (Math.sin(i + time / 200) / 2) * canvas.height

        const r = arr[i]
        ctx.fillStyle = palette[Math.floor(i + time / 200) % palette.length]
        const w = 100
        ctx.fillRect(x, canvas.height / 2, w, arr[i])
        x += w
      }
    }

    // Start animations with different time offsets
    animate(0)(0)
    animate(100)(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        id="c"
        className="block"
        style={{
          margin: 0,
          padding: 0,
          display: "block",
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
