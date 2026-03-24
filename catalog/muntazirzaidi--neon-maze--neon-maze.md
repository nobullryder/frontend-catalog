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
neon-maze.tsx
"use client"
import { useEffect, useRef } from "react"

const NeonMaze = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const x = canvas.getContext("2d")
    if (!x) return

    let t = 0
    let animationFrameId: number

    const r = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      d()
    }

    const d = () => {
      if (!canvas || !x) return
      const s = Math.min(canvas.width, canvas.height) / 15
      const g = Math.ceil(canvas.width / s) * 2
      const h = Math.ceil(canvas.height / (s * 0.5)) * 2
      const w = canvas.width / 2
      const v = canvas.height / 2

      for (let y = -h; y < h; y++) {
        for (let i = -g; i < g; i++) {
          const p = w + ((i - y) * s) / 2
          const q = v + ((i + y) * s) / 4
          const m = Math.sqrt(i * i + y * y)
          const n = Math.sqrt(g * g + h * h)
          const e = 1 - m / n
          const f = s * e * Math.abs(Math.sin(m * 0.5 + t))

          x.beginPath()
          x.moveTo(p, q - f)
          x.lineTo(p + s / 2, q - s / 2 - f)
          x.lineTo(p + s, q - f)
          x.lineTo(p + s, q)
          x.lineTo(p + s / 2, q + s / 2)
          x.lineTo(p, q)
          x.closePath()

          const l = x.createLinearGradient(p, q - f, p + s, q)
          l.addColorStop(0, "rgba(0,255,255,.8)")
          l.addColorStop(1, "rgba(255,0,255,.8)")
          x.fillStyle = l
          x.fill()
          x.strokeStyle = "rgba(255,255,0,.5)"
          x.stroke()

          x.beginPath()
          x.moveTo(p, q)
          x.lineTo(p, q - f)
          x.moveTo(p + s, q)
          x.lineTo(p + s, q - f)
          x.moveTo(p + s / 2, q + s / 2)
          x.lineTo(p + s / 2, q - s / 2 - f)
          x.strokeStyle = "rgba(255,255,255,.3)"
          x.stroke()
        }
      }
    }

    const a = () => {
      if (!canvas || !x) return
      x.fillStyle = "rgba(0,0,0,.1)"
      x.fillRect(0, 0, canvas.width, canvas.height)
      d()
      t += 0.05
      animationFrameId = requestAnimationFrame(a)
    }

    window.addEventListener("resize", r)
    r()
    a()

    return () => {
      window.removeEventListener("resize", r)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="block" />
    </main>
  )
}

export { NeonMaze }
 


code.demo.1740497304847.tsx
import { NeonMaze } from "@/components/ui/neon-maze"

export function NeonMazeDemo() {
  return (
    <div className="w-full min-h-[600px] bg-black rounded-lg overflow-hidden">
      <NeonMaze />
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/neon-maze.tsx
"use client"
import { useEffect, useRef } from "react"

const NeonMaze = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const x = canvas.getContext("2d")
    if (!x) return

    let t = 0
    let animationFrameId: number

    const r = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      d()
    }

    const d = () => {
      if (!canvas || !x) return
      const s = Math.min(canvas.width, canvas.height) / 15
      const g = Math.ceil(canvas.width / s) * 2
      const h = Math.ceil(canvas.height / (s * 0.5)) * 2
      const w = canvas.width / 2
      const v = canvas.height / 2

      for (let y = -h; y < h; y++) {
        for (let i = -g; i < g; i++) {
          const p = w + ((i - y) * s) / 2
          const q = v + ((i + y) * s) / 4
          const m = Math.sqrt(i * i + y * y)
          const n = Math.sqrt(g * g + h * h)
          const e = 1 - m / n
          const f = s * e * Math.abs(Math.sin(m * 0.5 + t))

          x.beginPath()
          x.moveTo(p, q - f)
          x.lineTo(p + s / 2, q - s / 2 - f)
          x.lineTo(p + s, q - f)
          x.lineTo(p + s, q)
          x.lineTo(p + s / 2, q + s / 2)
          x.lineTo(p, q)
          x.closePath()

          const l = x.createLinearGradient(p, q - f, p + s, q)
          l.addColorStop(0, "rgba(0,255,255,.8)")
          l.addColorStop(1, "rgba(255,0,255,.8)")
          x.fillStyle = l
          x.fill()
          x.strokeStyle = "rgba(255,255,0,.5)"
          x.stroke()

          x.beginPath()
          x.moveTo(p, q)
          x.lineTo(p, q - f)
          x.moveTo(p + s, q)
          x.lineTo(p + s, q - f)
          x.moveTo(p + s / 2, q + s / 2)
          x.lineTo(p + s / 2, q - s / 2 - f)
          x.strokeStyle = "rgba(255,255,255,.3)"
          x.stroke()
        }
      }
    }

    const a = () => {
      if (!canvas || !x) return
      x.fillStyle = "rgba(0,0,0,.1)"
      x.fillRect(0, 0, canvas.width, canvas.height)
      d()
      t += 0.05
      animationFrameId = requestAnimationFrame(a)
    }

    window.addEventListener("resize", r)
    r()
    a()

    return () => {
      window.removeEventListener("resize", r)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="block" />
    </main>
  )
}

export { NeonMaze }
 

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
