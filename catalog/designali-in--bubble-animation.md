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
bubble-animation.tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface BubbleAnimationProps {
  width?: number
  height?: number
  totalBubbles?: number
  colors?: string[]
  className?: string
}

interface BubbleData {
  x: number
  y: number
  move: number
  color: string
  radius: number
}

const BubbleAnimation = ({
  width = 800,
  height = 600,
  totalBubbles = 25,
  colors = ["#018ddc", "#f12a00", "#ec6546", "#b0c90d"],
  className = "",
}: BubbleAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const bubblesRef = useRef<BubbleData[]>([])
  const [isClient, setIsClient] = useState(false)

  const PI2 = Math.PI * 2

  // Initialize bubbles
  const initializeBubbles = (canvasWidth: number, canvasHeight: number) => {
    bubblesRef.current = []
    for (let i = 0; i < totalBubbles; i++) {
      const bubble: BubbleData = {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        move: Math.random() * 5 - 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.floor(Math.random() * 250),
      }
      bubblesRef.current.push(bubble)
    }
  }

  // Update bubble position
  const updateBubble = (bubble: BubbleData, time: number) => {
    bubble.x -= Math.sin(time + bubble.move) * bubble.move
    bubble.y += Math.cos(time - bubble.move) * bubble.move
  }

  // Draw bubble
  const drawBubble = (ctx: CanvasRenderingContext2D, bubble: BubbleData, time: number) => {
    updateBubble(bubble, time)
    ctx.beginPath()
    ctx.fillStyle = bubble.color
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, PI2, false)
    ctx.fill()
    ctx.closePath()
  }

  // Create gradient background
  const drawGradient = (ctx: CanvasRenderingContext2D, time: number, canvasWidth: number, canvasHeight: number) => {
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    const x = centerX + Math.cos(time + 100) * 300
    const y = centerY + Math.sin(time + 100) * 300

    const grd = ctx.createRadialGradient(x, y, 0, canvasWidth, canvasHeight, canvasWidth)
    grd.addColorStop(0, "rgb(255, 252, 0)")
    grd.addColorStop(0.1, "rgb(1, 141, 220)")
    grd.addColorStop(0.8, "rgb(241, 42, 0)")
    grd.addColorStop(1, "rgb(176, 201, 13)")

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const time = new Date().getTime() * 0.0005

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply blur filter
    ctx.filter = "blur(30px)"

    // Draw gradient background
    drawGradient(ctx, time, canvas.width, canvas.height)

    // Draw bubbles with lighter composite operation
    ctx.save()
    ctx.globalCompositeOperation = "lighter"

    bubblesRef.current.forEach((bubble) => {
      drawBubble(ctx, bubble, time)
    })

    ctx.restore()

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Initialize bubbles
    initializeBubbles(width, height)

    // Start animation
    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient, width, height, totalBubbles, colors])

  if (!isClient) {
    return <div style={{ width, height }} className={className} />
  }

  return <canvas ref={canvasRef} width={width} height={height} className={className} style={{ display: "block" }} />
}

export { BubbleAnimation }


code.demo.1756050725512.tsx
import { BubbleAnimation } from "@/components/ui/bubble-animation";

export default function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden">
      <BubbleAnimation
        width={800}
        height={600}
        totalBubbles={20}
        colors={["#018ddc", "#f12a00", "#ec6546", "#b0c90d"]}
        className="absolute rounded-md w-full h-full"
      />
       <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Bubble Animation
      </span>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bubble-animation.tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface BubbleAnimationProps {
  width?: number
  height?: number
  totalBubbles?: number
  colors?: string[]
  className?: string
}

interface BubbleData {
  x: number
  y: number
  move: number
  color: string
  radius: number
}

const BubbleAnimation = ({
  width = 800,
  height = 600,
  totalBubbles = 25,
  colors = ["#018ddc", "#f12a00", "#ec6546", "#b0c90d"],
  className = "",
}: BubbleAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const bubblesRef = useRef<BubbleData[]>([])
  const [isClient, setIsClient] = useState(false)

  const PI2 = Math.PI * 2

  // Initialize bubbles
  const initializeBubbles = (canvasWidth: number, canvasHeight: number) => {
    bubblesRef.current = []
    for (let i = 0; i < totalBubbles; i++) {
      const bubble: BubbleData = {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        move: Math.random() * 5 - 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        radius: Math.floor(Math.random() * 250),
      }
      bubblesRef.current.push(bubble)
    }
  }

  // Update bubble position
  const updateBubble = (bubble: BubbleData, time: number) => {
    bubble.x -= Math.sin(time + bubble.move) * bubble.move
    bubble.y += Math.cos(time - bubble.move) * bubble.move
  }

  // Draw bubble
  const drawBubble = (ctx: CanvasRenderingContext2D, bubble: BubbleData, time: number) => {
    updateBubble(bubble, time)
    ctx.beginPath()
    ctx.fillStyle = bubble.color
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, PI2, false)
    ctx.fill()
    ctx.closePath()
  }

  // Create gradient background
  const drawGradient = (ctx: CanvasRenderingContext2D, time: number, canvasWidth: number, canvasHeight: number) => {
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    const x = centerX + Math.cos(time + 100) * 300
    const y = centerY + Math.sin(time + 100) * 300

    const grd = ctx.createRadialGradient(x, y, 0, canvasWidth, canvasHeight, canvasWidth)
    grd.addColorStop(0, "rgb(255, 252, 0)")
    grd.addColorStop(0.1, "rgb(1, 141, 220)")
    grd.addColorStop(0.8, "rgb(241, 42, 0)")
    grd.addColorStop(1, "rgb(176, 201, 13)")

    ctx.fillStyle = grd
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const time = new Date().getTime() * 0.0005

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply blur filter
    ctx.filter = "blur(30px)"

    // Draw gradient background
    drawGradient(ctx, time, canvas.width, canvas.height)

    // Draw bubbles with lighter composite operation
    ctx.save()
    ctx.globalCompositeOperation = "lighter"

    bubblesRef.current.forEach((bubble) => {
      drawBubble(ctx, bubble, time)
    })

    ctx.restore()

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Initialize bubbles
    initializeBubbles(width, height)

    // Start animation
    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClient, width, height, totalBubbles, colors])

  if (!isClient) {
    return <div style={{ width, height }} className={className} />
  }

  return <canvas ref={canvasRef} width={width} height={height} className={className} style={{ display: "block" }} />
}

export { BubbleAnimation }

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
