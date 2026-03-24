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
pixel-grid.tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface PixelGridProps {
  bgColor?: string
  pixelColor?: string
  numPixelsX?: number
  numPixelsY?: number
  pixelSize?: number
  pixelSpacing?: number
  pixelDeathFade?: number
  pixelBornFade?: number
  pixelMaxLife?: number
  pixelMinLife?: number
  pixelMaxOffLife?: number
  pixelMinOffLife?: number
  className?: string
  glow?: boolean
}

interface Pixel {
  xPos: number
  yPos: number
  alpha: number
  maxAlpha: number
  life: number
  offLife: number
  isLit: boolean
  dying: boolean
  deathFade: number
  bornFade: number
  randomizeSelf: () => void
}

export function PixelGrid({
  bgColor = "transparent",
  pixelColor = "#0000ff",
  numPixelsX = 10,
  numPixelsY = 10,
  pixelSize = 3,
  pixelSpacing = 3,
  pixelDeathFade = 10,
  pixelBornFade = 50,
  pixelMaxLife = 500,
  pixelMinLife = 250,
  pixelMaxOffLife = 500,
  pixelMinOffLife = 200,
  glow = false,
  className = "",
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const [isAppeared, setIsAppeared] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const c2d = canvas.getContext("2d", { alpha: true })
    if (!c2d) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const randomAlpha = () => {
      const rand = Math.random() * 100
      if (rand > 90) return 1
      if (rand > 80) return 0.5
      return 0.1
    }

    const randomizePixelAttrs = (x: number, y: number): Pixel => {
      const alpha = randomAlpha()
      const lit = alpha !== 0.1
      return {
        xPos: x * (pixelSize + pixelSpacing),
        yPos: y * (pixelSize + pixelSpacing),
        alpha: 0,
        maxAlpha: alpha,
        life: Math.floor(Math.random() * (pixelMaxLife - pixelMinLife + 1)) + pixelMinLife,
        offLife: Math.floor(Math.random() * (pixelMaxOffLife - pixelMinOffLife + 1)) + pixelMinOffLife,
        isLit: lit,
        dying: false,
        deathFade: pixelDeathFade,
        bornFade: pixelBornFade,
        randomizeSelf() {
          const newAlpha = randomAlpha()
          this.alpha = 0
          this.maxAlpha = newAlpha
          this.life = Math.floor(Math.random() * (pixelMaxLife - pixelMinLife + 1)) + pixelMinLife
          this.offLife = Math.floor(Math.random() * (pixelMaxOffLife - pixelMinOffLife + 1)) + pixelMinOffLife
          this.isLit = newAlpha !== 0.1
          this.dying = false
          this.deathFade = pixelDeathFade
          this.bornFade = pixelBornFade
        },
      }
    }

    // Initialize pixels dynamically based on viewport
    const initPixels = () => {
      const cols = Math.ceil(window.innerWidth / (pixelSize + pixelSpacing))
      const rows = Math.ceil(window.innerHeight / (pixelSize + pixelSpacing))
      pixelsRef.current = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          pixelsRef.current.push(randomizePixelAttrs(x, y))
        }
      }
    }

    initPixels()
    setIsAppeared(true)

    const drawPixel = (pixel: Pixel) => {
      pixel.alpha = Math.min(Math.max(pixel.alpha, 0.1), pixel.maxAlpha)
      c2d.fillStyle = `${pixelColor}${Math.floor(pixel.alpha * 255)
        .toString(16)
        .padStart(2, "0")}`

      c2d.fillRect(pixel.xPos, pixel.yPos, pixelSize, pixelSize)

      if (pixel.isLit) {
        if (pixel.bornFade <= 0) {
          if (pixel.life <= 0) {
            pixel.dying = true
            if (pixel.deathFade <= 0) pixel.randomizeSelf()
            else {
              pixel.alpha = (pixel.deathFade / pixelDeathFade) * pixel.maxAlpha
              pixel.deathFade--
            }
          } else pixel.life--
        } else {
          pixel.alpha = pixel.maxAlpha - pixel.bornFade / pixelBornFade
          pixel.bornFade--
        }
      } else {
        if (pixel.offLife <= 0) pixel.isLit = true
        pixel.offLife--
      }
    }

    const renderLoop = () => {
      if (bgColor === "transparent") c2d.clearRect(0, 0, canvas.width, canvas.height)
      else {
        c2d.fillStyle = bgColor
        c2d.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (glow) {
        c2d.shadowBlur = 8
        c2d.shadowColor = pixelColor
      } else {
        c2d.shadowBlur = 0
      }

      for (const pixel of pixelsRef.current) drawPixel(pixel)
      requestAnimationFrame(renderLoop)
    }

    renderLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [
    bgColor,
    pixelColor,
    pixelSize,
    pixelSpacing,
    pixelDeathFade,
    pixelBornFade,
    pixelMaxLife,
    pixelMinLife,
    pixelMaxOffLife,
    pixelMinOffLife,
    glow,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        display: "block",
        backgroundColor: "transparent",
        width: "100vw",
        height: "100vh",
      }}
    />
  )
}


code.demo.1761668019425.tsx
import { PixelGrid } from "@/components/ui/pixel-grid";

export default function DemoOne() {
   return (
    <main className="flex items-center justify-center min-h-screen">
      <PixelGrid />
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pixel-grid.tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface PixelGridProps {
  bgColor?: string
  pixelColor?: string
  numPixelsX?: number
  numPixelsY?: number
  pixelSize?: number
  pixelSpacing?: number
  pixelDeathFade?: number
  pixelBornFade?: number
  pixelMaxLife?: number
  pixelMinLife?: number
  pixelMaxOffLife?: number
  pixelMinOffLife?: number
  className?: string
  glow?: boolean
}

interface Pixel {
  xPos: number
  yPos: number
  alpha: number
  maxAlpha: number
  life: number
  offLife: number
  isLit: boolean
  dying: boolean
  deathFade: number
  bornFade: number
  randomizeSelf: () => void
}

export function PixelGrid({
  bgColor = "transparent",
  pixelColor = "#0000ff",
  numPixelsX = 10,
  numPixelsY = 10,
  pixelSize = 3,
  pixelSpacing = 3,
  pixelDeathFade = 10,
  pixelBornFade = 50,
  pixelMaxLife = 500,
  pixelMinLife = 250,
  pixelMaxOffLife = 500,
  pixelMinOffLife = 200,
  glow = false,
  className = "",
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const [isAppeared, setIsAppeared] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const c2d = canvas.getContext("2d", { alpha: true })
    if (!c2d) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const randomAlpha = () => {
      const rand = Math.random() * 100
      if (rand > 90) return 1
      if (rand > 80) return 0.5
      return 0.1
    }

    const randomizePixelAttrs = (x: number, y: number): Pixel => {
      const alpha = randomAlpha()
      const lit = alpha !== 0.1
      return {
        xPos: x * (pixelSize + pixelSpacing),
        yPos: y * (pixelSize + pixelSpacing),
        alpha: 0,
        maxAlpha: alpha,
        life: Math.floor(Math.random() * (pixelMaxLife - pixelMinLife + 1)) + pixelMinLife,
        offLife: Math.floor(Math.random() * (pixelMaxOffLife - pixelMinOffLife + 1)) + pixelMinOffLife,
        isLit: lit,
        dying: false,
        deathFade: pixelDeathFade,
        bornFade: pixelBornFade,
        randomizeSelf() {
          const newAlpha = randomAlpha()
          this.alpha = 0
          this.maxAlpha = newAlpha
          this.life = Math.floor(Math.random() * (pixelMaxLife - pixelMinLife + 1)) + pixelMinLife
          this.offLife = Math.floor(Math.random() * (pixelMaxOffLife - pixelMinOffLife + 1)) + pixelMinOffLife
          this.isLit = newAlpha !== 0.1
          this.dying = false
          this.deathFade = pixelDeathFade
          this.bornFade = pixelBornFade
        },
      }
    }

    // Initialize pixels dynamically based on viewport
    const initPixels = () => {
      const cols = Math.ceil(window.innerWidth / (pixelSize + pixelSpacing))
      const rows = Math.ceil(window.innerHeight / (pixelSize + pixelSpacing))
      pixelsRef.current = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          pixelsRef.current.push(randomizePixelAttrs(x, y))
        }
      }
    }

    initPixels()
    setIsAppeared(true)

    const drawPixel = (pixel: Pixel) => {
      pixel.alpha = Math.min(Math.max(pixel.alpha, 0.1), pixel.maxAlpha)
      c2d.fillStyle = `${pixelColor}${Math.floor(pixel.alpha * 255)
        .toString(16)
        .padStart(2, "0")}`

      c2d.fillRect(pixel.xPos, pixel.yPos, pixelSize, pixelSize)

      if (pixel.isLit) {
        if (pixel.bornFade <= 0) {
          if (pixel.life <= 0) {
            pixel.dying = true
            if (pixel.deathFade <= 0) pixel.randomizeSelf()
            else {
              pixel.alpha = (pixel.deathFade / pixelDeathFade) * pixel.maxAlpha
              pixel.deathFade--
            }
          } else pixel.life--
        } else {
          pixel.alpha = pixel.maxAlpha - pixel.bornFade / pixelBornFade
          pixel.bornFade--
        }
      } else {
        if (pixel.offLife <= 0) pixel.isLit = true
        pixel.offLife--
      }
    }

    const renderLoop = () => {
      if (bgColor === "transparent") c2d.clearRect(0, 0, canvas.width, canvas.height)
      else {
        c2d.fillStyle = bgColor
        c2d.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (glow) {
        c2d.shadowBlur = 8
        c2d.shadowColor = pixelColor
      } else {
        c2d.shadowBlur = 0
      }

      for (const pixel of pixelsRef.current) drawPixel(pixel)
      requestAnimationFrame(renderLoop)
    }

    renderLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [
    bgColor,
    pixelColor,
    pixelSize,
    pixelSpacing,
    pixelDeathFade,
    pixelBornFade,
    pixelMaxLife,
    pixelMinLife,
    pixelMaxOffLife,
    pixelMinOffLife,
    glow,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        display: "block",
        backgroundColor: "transparent",
        width: "100vw",
        height: "100vh",
      }}
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
