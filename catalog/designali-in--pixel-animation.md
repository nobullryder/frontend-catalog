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
pixel-animation.tsx
"use client"

import { useEffect, useRef } from "react"

const rand = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

class Pixel {
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeAvailable: number
  maxSize: number
  sizeDirection: number
  delay: number
  delayHide: number
  counter: number
  counterHide: number
  counterStep: number
  isHidden: boolean
  isFlicking: boolean

  constructor(
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
    delayHide: number,
    step: number,
    boundSize: number,
  ) {
    this.x = x
    this.y = y
    this.color = color
    this.speed = rand(0.1, 0.9) * speed
    this.size = 0
    this.sizeStep = rand(0, 0.5)
    this.minSize = 0.5
    this.maxSizeAvailable = boundSize || 2
    this.maxSize = rand(this.minSize, this.maxSizeAvailable)
    this.sizeDirection = 1
    this.delay = delay
    this.delayHide = delayHide
    this.counter = 0
    this.counterHide = 0
    this.counterStep = step
    this.isHidden = false
    this.isFlicking = false
  }

  draw(ctx: CanvasRenderingContext2D) {
    const centerOffset = this.maxSizeAvailable * 0.5 - this.size * 0.5
    ctx.fillStyle = this.color
    ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size)
  }

  show() {
    this.isHidden = false
    this.counterHide = 0

    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }

    if (this.size >= this.maxSize) {
      this.isFlicking = true
    }

    if (this.isFlicking) {
      this.flicking()
    } else {
      this.size += this.sizeStep
    }
  }

  hide() {
    this.counter = 0

    if (this.counterHide <= this.delayHide) {
      this.counterHide += this.counterStep
      if (this.isFlicking) {
        this.flicking()
      }
      return
    }

    this.isFlicking = false

    if (this.size <= 0) {
      this.size = 0
      this.isHidden = true
      return
    } else {
      this.size -= 0.05
    }
  }

  flicking() {
    if (this.size >= this.maxSize) {
      this.sizeDirection = -1
    } else if (this.size <= this.minSize) {
      this.sizeDirection = 1
    }

    this.size += this.sizeDirection * this.speed
  }
}

interface PixelAnimationProps {
  containerWidth?: string
  containerHeight?: string
  backgroundColor?: string
  pixelGap?: number
  animationSpeed?: number
  colorHueStart?: number
  colorHueRange?: number
  maxPixelSize?: number
  animationDuration?: number
  showHint?: boolean
  hintText?: string
}

export function PixelAnimation({
  containerWidth = "40vw",
  containerHeight = "40vh",
  backgroundColor = "#1D1E22",
  pixelGap = 6,
  animationSpeed = 0.25,
  colorHueStart,
  colorHueRange = 50,
  maxPixelSize,
  animationDuration = 360,
  showHint = true,
  hintText = "Click to regenerate",
}: PixelAnimationProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<{
    pixels: Pixel[]
    request: number | null
    lastTime: number
    ticker: number
    maxTicker: number
    animationDirection: number
    width: number
    height: number
  }>({
    pixels: [],
    request: null,
    lastTime: 0,
    ticker: 0,
    maxTicker: animationDuration,
    animationDirection: 1,
    width: 0,
    height: 0,
  })

  const getDelay = (x: number, y: number, direction?: boolean) => {
    const { width, height } = animationRef.current
    const dx = x - width * 0.5
    let dy = y - height

    if (direction) {
      dy = y
    }

    return Math.sqrt(dx ** 2 + dy ** 2)
  }

  const initPixels = () => {
    const { width, height } = animationRef.current
    const h = colorHueStart ?? Math.floor(rand(0, 360))
    const colorsLen = 5
    const colors = Array.from(
      { length: colorsLen },
      (_, index) => `hsl(${Math.floor(rand(h, h + (index + 1) * (colorHueRange / colorsLen)))} 100% ${rand(50, 100)}%)`,
    )

    const gap = pixelGap
    const step = (width + height) * 0.005
    const speed = rand(0.008, animationSpeed)
    const maxSize = maxPixelSize ?? Math.floor(gap * 0.5)

    animationRef.current.pixels = []

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        if (x + maxSize > width || y + maxSize > height) {
          continue
        }

        const color = colors[Math.floor(Math.random() * colorsLen)]
        const delay = getDelay(x, y)
        const delayHide = getDelay(x, y)

        animationRef.current.pixels.push(new Pixel(x, y, color, speed, delay, delayHide, step, maxSize))
      }
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const interval = 1000 / 60
    const animation = animationRef.current

    animation.request = requestAnimationFrame(animate)

    const now = performance.now()
    const diff = now - (animation.lastTime || 0)

    if (diff < interval) {
      return
    }

    animation.lastTime = now - (diff % interval)

    ctx.clearRect(0, 0, animation.width, animation.height)

    if (animation.ticker >= animation.maxTicker) {
      animation.animationDirection = -1
    } else if (animation.ticker <= 0) {
      animation.animationDirection = 1
    }

    let allHidden = true

    animation.pixels.forEach((pixel) => {
      if (animation.animationDirection > 0) {
        pixel.show()
      } else {
        pixel.hide()
        allHidden = allHidden && pixel.isHidden
      }

      pixel.draw(ctx)
    })

    animation.ticker += animation.animationDirection

    if (animation.animationDirection < 0 && allHidden) {
      animation.ticker = 0
    }
  }

  const resize = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    if (animationRef.current.request) {
      cancelAnimationFrame(animationRef.current.request)
    }

    const rect = container.getBoundingClientRect()

    animationRef.current.width = Math.floor(rect.width)
    animationRef.current.height = Math.floor(rect.height)

    canvas.width = animationRef.current.width
    canvas.height = animationRef.current.height

    initPixels()

    animationRef.current.ticker = 0

    animate()
  }

  const handleClick = () => {
    resize()
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(resize)
    const container = containerRef.current

    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      if (animationRef.current.request) {
        cancelAnimationFrame(animationRef.current.request)
      }
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div 
      style={{
        padding: 0,
        margin: 0,
        overflow: "hidden",
        height: "100vh",
        width: "100vw", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        gap: "50px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        className="border" 
        ref={containerRef}
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <canvas ref={canvasRef} />
      </div>
      {showHint && (
        <div
        className="text-xl font-semibold" >
          {hintText}
        </div>
      )}
    </div>
  )
}


code.demo.1755259463916.tsx
import { PixelAnimation } from "@/components/ui/pixel-animation";

export default function DemoOne() {
  return <PixelAnimation pixelGap={10} />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pixel-animation.tsx
"use client"

import { useEffect, useRef } from "react"

const rand = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

class Pixel {
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeAvailable: number
  maxSize: number
  sizeDirection: number
  delay: number
  delayHide: number
  counter: number
  counterHide: number
  counterStep: number
  isHidden: boolean
  isFlicking: boolean

  constructor(
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
    delayHide: number,
    step: number,
    boundSize: number,
  ) {
    this.x = x
    this.y = y
    this.color = color
    this.speed = rand(0.1, 0.9) * speed
    this.size = 0
    this.sizeStep = rand(0, 0.5)
    this.minSize = 0.5
    this.maxSizeAvailable = boundSize || 2
    this.maxSize = rand(this.minSize, this.maxSizeAvailable)
    this.sizeDirection = 1
    this.delay = delay
    this.delayHide = delayHide
    this.counter = 0
    this.counterHide = 0
    this.counterStep = step
    this.isHidden = false
    this.isFlicking = false
  }

  draw(ctx: CanvasRenderingContext2D) {
    const centerOffset = this.maxSizeAvailable * 0.5 - this.size * 0.5
    ctx.fillStyle = this.color
    ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size)
  }

  show() {
    this.isHidden = false
    this.counterHide = 0

    if (this.counter <= this.delay) {
      this.counter += this.counterStep
      return
    }

    if (this.size >= this.maxSize) {
      this.isFlicking = true
    }

    if (this.isFlicking) {
      this.flicking()
    } else {
      this.size += this.sizeStep
    }
  }

  hide() {
    this.counter = 0

    if (this.counterHide <= this.delayHide) {
      this.counterHide += this.counterStep
      if (this.isFlicking) {
        this.flicking()
      }
      return
    }

    this.isFlicking = false

    if (this.size <= 0) {
      this.size = 0
      this.isHidden = true
      return
    } else {
      this.size -= 0.05
    }
  }

  flicking() {
    if (this.size >= this.maxSize) {
      this.sizeDirection = -1
    } else if (this.size <= this.minSize) {
      this.sizeDirection = 1
    }

    this.size += this.sizeDirection * this.speed
  }
}

interface PixelAnimationProps {
  containerWidth?: string
  containerHeight?: string
  backgroundColor?: string
  pixelGap?: number
  animationSpeed?: number
  colorHueStart?: number
  colorHueRange?: number
  maxPixelSize?: number
  animationDuration?: number
  showHint?: boolean
  hintText?: string
}

export function PixelAnimation({
  containerWidth = "40vw",
  containerHeight = "40vh",
  backgroundColor = "#1D1E22",
  pixelGap = 6,
  animationSpeed = 0.25,
  colorHueStart,
  colorHueRange = 50,
  maxPixelSize,
  animationDuration = 360,
  showHint = true,
  hintText = "Click to regenerate",
}: PixelAnimationProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<{
    pixels: Pixel[]
    request: number | null
    lastTime: number
    ticker: number
    maxTicker: number
    animationDirection: number
    width: number
    height: number
  }>({
    pixels: [],
    request: null,
    lastTime: 0,
    ticker: 0,
    maxTicker: animationDuration,
    animationDirection: 1,
    width: 0,
    height: 0,
  })

  const getDelay = (x: number, y: number, direction?: boolean) => {
    const { width, height } = animationRef.current
    const dx = x - width * 0.5
    let dy = y - height

    if (direction) {
      dy = y
    }

    return Math.sqrt(dx ** 2 + dy ** 2)
  }

  const initPixels = () => {
    const { width, height } = animationRef.current
    const h = colorHueStart ?? Math.floor(rand(0, 360))
    const colorsLen = 5
    const colors = Array.from(
      { length: colorsLen },
      (_, index) => `hsl(${Math.floor(rand(h, h + (index + 1) * (colorHueRange / colorsLen)))} 100% ${rand(50, 100)}%)`,
    )

    const gap = pixelGap
    const step = (width + height) * 0.005
    const speed = rand(0.008, animationSpeed)
    const maxSize = maxPixelSize ?? Math.floor(gap * 0.5)

    animationRef.current.pixels = []

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        if (x + maxSize > width || y + maxSize > height) {
          continue
        }

        const color = colors[Math.floor(Math.random() * colorsLen)]
        const delay = getDelay(x, y)
        const delayHide = getDelay(x, y)

        animationRef.current.pixels.push(new Pixel(x, y, color, speed, delay, delayHide, step, maxSize))
      }
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const interval = 1000 / 60
    const animation = animationRef.current

    animation.request = requestAnimationFrame(animate)

    const now = performance.now()
    const diff = now - (animation.lastTime || 0)

    if (diff < interval) {
      return
    }

    animation.lastTime = now - (diff % interval)

    ctx.clearRect(0, 0, animation.width, animation.height)

    if (animation.ticker >= animation.maxTicker) {
      animation.animationDirection = -1
    } else if (animation.ticker <= 0) {
      animation.animationDirection = 1
    }

    let allHidden = true

    animation.pixels.forEach((pixel) => {
      if (animation.animationDirection > 0) {
        pixel.show()
      } else {
        pixel.hide()
        allHidden = allHidden && pixel.isHidden
      }

      pixel.draw(ctx)
    })

    animation.ticker += animation.animationDirection

    if (animation.animationDirection < 0 && allHidden) {
      animation.ticker = 0
    }
  }

  const resize = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    if (animationRef.current.request) {
      cancelAnimationFrame(animationRef.current.request)
    }

    const rect = container.getBoundingClientRect()

    animationRef.current.width = Math.floor(rect.width)
    animationRef.current.height = Math.floor(rect.height)

    canvas.width = animationRef.current.width
    canvas.height = animationRef.current.height

    initPixels()

    animationRef.current.ticker = 0

    animate()
  }

  const handleClick = () => {
    resize()
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(resize)
    const container = containerRef.current

    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      if (animationRef.current.request) {
        cancelAnimationFrame(animationRef.current.request)
      }
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div 
      style={{
        padding: 0,
        margin: 0,
        overflow: "hidden",
        height: "100vh",
        width: "100vw", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        gap: "50px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        className="border" 
        ref={containerRef}
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <canvas ref={canvasRef} />
      </div>
      {showHint && (
        <div
        className="text-xl font-semibold" >
          {hintText}
        </div>
      )}
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
