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
spider-cursor.tsx
"use client"

import { useEffect, useRef } from "react"

export function SpiderCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let w: number, h: number
    const ctx = canvas.getContext("2d")!
    const { sin, cos, PI, hypot, min, max } = Math

    function spawn() {
      const pts = many(333, () => {
        return {
          x: rnd(window.innerWidth),
          y: rnd(window.innerHeight),
          len: 0,
          r: 0,
        }
      })

      const pts2 = many(9, (i) => {
        return {
          x: cos((i / 9) * PI * 2),
          y: sin((i / 9) * PI * 2),
        }
      })

      const seed = rnd(100)
      let tx = rnd(window.innerWidth)
      let ty = rnd(window.innerHeight)
      let x = rnd(window.innerWidth)
      let y = rnd(window.innerHeight)
      const kx = rnd(0.5, 0.5)
      const ky = rnd(0.5, 0.5)
      const walkRadius = pt(rnd(50, 50), rnd(50, 50))
      const r = window.innerWidth / rnd(100, 150)

      function paintPt(pt: any) {
        pts2.forEach((pt2) => {
          if (!pt.len) return
          drawLine(
            lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
            lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
            x + pt2.x * r,
            y + pt2.y * r,
          )
        })
        drawCircle(pt.x, pt.y, pt.r)
      }

      return {
        follow(x: number, y: number) {
          tx = x
          ty = y
        },

        tick(t: number) {
          const selfMoveX = cos(t * kx + seed) * walkRadius.x
          const selfMoveY = sin(t * ky + seed) * walkRadius.y
          const fx = tx + selfMoveX
          const fy = ty + selfMoveY

          x += min(window.innerWidth / 100, (fx - x) / 10)
          y += min(window.innerWidth / 100, (fy - y) / 10)

          let i = 0
          pts.forEach((pt) => {
            const dx = pt.x - x,
              dy = pt.y - y
            const len = hypot(dx, dy)
            let r = min(2, window.innerWidth / len / 5)
            pt.t = 0
            const increasing = len < window.innerWidth / 10 && i++ < 8
            const dir = increasing ? 0.1 : -0.1
            if (increasing) {
              r *= 1.5
            }
            pt.r = r
            pt.len = max(0, min(pt.len + dir, 1))
            paintPt(pt)
          })
        },
      }
    }

    const spiders = many(2, spawn)

    const handlePointerMove = (e: PointerEvent) => {
      spiders.forEach((spider) => {
        spider.follow(e.clientX, e.clientY)
      })
    }

    function anim(t: number) {
      if (w !== window.innerWidth) w = canvas.width = window.innerWidth
      if (h !== window.innerHeight) h = canvas.height = window.innerHeight
      ctx.fillStyle = "#000"
      drawCircle(0, 0, w * 10)
      ctx.fillStyle = ctx.strokeStyle = "#fff"
      t /= 1000
      spiders.forEach((spider) => spider.tick(t))
      requestAnimationFrame(anim)
    }

    function rnd(x = 1, dx = 0) {
      return Math.random() * x + dx
    }

    function drawCircle(x: number, y: number, r: number) {
      ctx.beginPath()
      ctx.ellipse(x, y, r, r, 0, 0, PI * 2)
      ctx.fill()
    }

    function drawLine(x0: number, y0: number, x1: number, y1: number) {
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      many(100, (i) => {
        i = (i + 1) / 100
        const x = lerp(x0, x1, i)
        const y = lerp(y0, y1, i)
        const k = noise(x / 5 + x0, y / 5 + y0) * 2
        ctx.lineTo(x + k, y + k)
      })
      ctx.stroke()
    }

    function many<T>(n: number, f: (i: number) => T): T[] {
      return [...Array(n)].map((_, i) => f(i))
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function noise(x: number, y: number, t = 101) {
      const w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0))
      const w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5))
      return w0 + w1
    }

    function pt(x: number, y: number) {
      return { x, y }
    }

    window.addEventListener("pointermove", handlePointerMove)
    requestAnimationFrame(anim)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return (
    <div className="overflow-hidden m-0 w-full h-screen">
      <canvas ref={canvasRef} className="block" style={{ display: "block" }} />
    </div>
  )
}


code.demo.1757432195679.tsx
import { SpiderCursor } from "@/components/ui/spider-cursor";

export default function DemoOne() {
  return (
    <div className="w-full">
      <SpiderCursor />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/spider-cursor.tsx
"use client"

import { useEffect, useRef } from "react"

export function SpiderCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let w: number, h: number
    const ctx = canvas.getContext("2d")!
    const { sin, cos, PI, hypot, min, max } = Math

    function spawn() {
      const pts = many(333, () => {
        return {
          x: rnd(window.innerWidth),
          y: rnd(window.innerHeight),
          len: 0,
          r: 0,
        }
      })

      const pts2 = many(9, (i) => {
        return {
          x: cos((i / 9) * PI * 2),
          y: sin((i / 9) * PI * 2),
        }
      })

      const seed = rnd(100)
      let tx = rnd(window.innerWidth)
      let ty = rnd(window.innerHeight)
      let x = rnd(window.innerWidth)
      let y = rnd(window.innerHeight)
      const kx = rnd(0.5, 0.5)
      const ky = rnd(0.5, 0.5)
      const walkRadius = pt(rnd(50, 50), rnd(50, 50))
      const r = window.innerWidth / rnd(100, 150)

      function paintPt(pt: any) {
        pts2.forEach((pt2) => {
          if (!pt.len) return
          drawLine(
            lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
            lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
            x + pt2.x * r,
            y + pt2.y * r,
          )
        })
        drawCircle(pt.x, pt.y, pt.r)
      }

      return {
        follow(x: number, y: number) {
          tx = x
          ty = y
        },

        tick(t: number) {
          const selfMoveX = cos(t * kx + seed) * walkRadius.x
          const selfMoveY = sin(t * ky + seed) * walkRadius.y
          const fx = tx + selfMoveX
          const fy = ty + selfMoveY

          x += min(window.innerWidth / 100, (fx - x) / 10)
          y += min(window.innerWidth / 100, (fy - y) / 10)

          let i = 0
          pts.forEach((pt) => {
            const dx = pt.x - x,
              dy = pt.y - y
            const len = hypot(dx, dy)
            let r = min(2, window.innerWidth / len / 5)
            pt.t = 0
            const increasing = len < window.innerWidth / 10 && i++ < 8
            const dir = increasing ? 0.1 : -0.1
            if (increasing) {
              r *= 1.5
            }
            pt.r = r
            pt.len = max(0, min(pt.len + dir, 1))
            paintPt(pt)
          })
        },
      }
    }

    const spiders = many(2, spawn)

    const handlePointerMove = (e: PointerEvent) => {
      spiders.forEach((spider) => {
        spider.follow(e.clientX, e.clientY)
      })
    }

    function anim(t: number) {
      if (w !== window.innerWidth) w = canvas.width = window.innerWidth
      if (h !== window.innerHeight) h = canvas.height = window.innerHeight
      ctx.fillStyle = "#000"
      drawCircle(0, 0, w * 10)
      ctx.fillStyle = ctx.strokeStyle = "#fff"
      t /= 1000
      spiders.forEach((spider) => spider.tick(t))
      requestAnimationFrame(anim)
    }

    function rnd(x = 1, dx = 0) {
      return Math.random() * x + dx
    }

    function drawCircle(x: number, y: number, r: number) {
      ctx.beginPath()
      ctx.ellipse(x, y, r, r, 0, 0, PI * 2)
      ctx.fill()
    }

    function drawLine(x0: number, y0: number, x1: number, y1: number) {
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      many(100, (i) => {
        i = (i + 1) / 100
        const x = lerp(x0, x1, i)
        const y = lerp(y0, y1, i)
        const k = noise(x / 5 + x0, y / 5 + y0) * 2
        ctx.lineTo(x + k, y + k)
      })
      ctx.stroke()
    }

    function many<T>(n: number, f: (i: number) => T): T[] {
      return [...Array(n)].map((_, i) => f(i))
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function noise(x: number, y: number, t = 101) {
      const w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0))
      const w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5))
      return w0 + w1
    }

    function pt(x: number, y: number) {
      return { x, y }
    }

    window.addEventListener("pointermove", handlePointerMove)
    requestAnimationFrame(anim)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return (
    <div className="overflow-hidden m-0 w-full h-screen">
      <canvas ref={canvasRef} className="block" style={{ display: "block" }} />
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
