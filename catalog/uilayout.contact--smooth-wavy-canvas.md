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
smooth-wavy-canvas.tsx
"use client"

import { useEffect, useRef, useCallback } from "react"

interface SmoothWavyCanvasProps {
  backgroundColor?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  lineOpacity?: number
  animationSpeed?: number
}

const SmoothWavyCanvas = ({
  backgroundColor = "#F8F6F0",
  primaryColor = "45, 45, 45",
  secondaryColor = "80, 80, 80",
  accentColor = "120, 120, 120",
  lineOpacity = 1,
  animationSpeed = 0.004,
}: SmoothWavyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const energyFields = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([])

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 200
    return Math.max(0, 1 - distance / maxDistance)
  }

  const getEnergyFieldInfluence = (
    x: number,
    y: number,
    currentTime: number,
  ): { intensity: number; direction: number } => {
    let totalIntensity = 0
    let totalDirectionX = 0
    let totalDirectionY = 0

    energyFields.current.forEach((field) => {
      const age = currentTime - field.time
      const maxAge = 4000

      if (age < maxAge) {
        const dx = x - field.x
        const dy = y - field.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const fieldRadius = (age / maxAge) * 300
        const fieldWidth = 100

        if (Math.abs(distance - fieldRadius) < fieldWidth) {
          const fieldStrength = (1 - age / maxAge) * field.intensity
          const proximityToField = 1 - Math.abs(distance - fieldRadius) / fieldWidth
          const influence = fieldStrength * proximityToField * 0.6 // Reduced intensity

          totalIntensity += influence
          if (distance > 0) {
            totalDirectionX += (dx / distance) * influence
            totalDirectionY += (dy / distance) * influence
          }
        }
      }
    })

    const direction = Math.atan2(totalDirectionY, totalDirectionX)
    return { intensity: Math.min(totalIntensity, 1), direction } // Capped at 1 instead of 2
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true
    // Removed click effects - no more energy fields created
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentTime = Date.now()
    timeRef.current += animationSpeed

    const width = canvas.width
    const height = canvas.height

    // Clear with clean background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Primary horizontal flowing lines
    const numPrimaryLines = 35

    for (let i = 0; i < numPrimaryLines; i++) {
      const yPos = (i / numPrimaryLines) * height
      const mouseInfl = getMouseInfluence(width / 2, yPos)
      const { intensity: fieldIntensity, direction: fieldDirection } = getEnergyFieldInfluence(
        width / 2,
        yPos,
        currentTime,
      )

      const amplitude = 45 + 25 * Math.sin(timeRef.current * 0.25 + i * 0.15) + mouseInfl * 25
      const frequency = 0.006 + 0.002 * Math.sin(timeRef.current * 0.12 + i * 0.08) + mouseInfl * 0.001
      const speed = timeRef.current * (0.6 + 0.3 * Math.sin(i * 0.12)) + mouseInfl * timeRef.current * 0.3
      const thickness = 0.6 + 0.4 * Math.sin(timeRef.current + i * 0.25) + mouseInfl * 0.8
      const opacity =
        (0.12 + 0.08 * Math.abs(Math.sin(timeRef.current * 0.3 + i * 0.18)) + mouseInfl * 0.15) *
        lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`

      for (let x = 0; x < width; x += 2) {
        const localMouseInfl = getMouseInfluence(x, yPos)

        const y =
          yPos +
          amplitude * Math.sin(x * frequency + speed) +
          localMouseInfl * Math.sin(timeRef.current * 2 + x * 0.008) * 15

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Secondary vertical flowing lines
    const numSecondaryLines = 25

    for (let i = 0; i < numSecondaryLines; i++) {
      const xPos = (i / numSecondaryLines) * width
      const mouseInfl = getMouseInfluence(xPos, height / 2)
      const { intensity: fieldIntensity, direction: fieldDirection } = getEnergyFieldInfluence(
        xPos,
        height / 2,
        currentTime,
      )

      const amplitude = 40 + 20 * Math.sin(timeRef.current * 0.18 + i * 0.14) + mouseInfl * 20
      const frequency = 0.007 + 0.003 * Math.cos(timeRef.current * 0.14 + i * 0.09) + mouseInfl * 0.002
      const speed = timeRef.current * (0.5 + 0.25 * Math.cos(i * 0.16)) + mouseInfl * timeRef.current * 0.25
      const thickness = 0.5 + 0.3 * Math.sin(timeRef.current + i * 0.35) + mouseInfl * 0.7
      const opacity =
        (0.1 + 0.06 * Math.abs(Math.sin(timeRef.current * 0.28 + i * 0.2)) + mouseInfl * 0.12) *
        lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity})`

      for (let y = 0; y < height; y += 2) {
        const localMouseInfl = getMouseInfluence(xPos, y)

        const x =
          xPos +
          amplitude * Math.sin(y * frequency + speed) +
          localMouseInfl * Math.sin(timeRef.current * 2 + y * 0.008) * 12

        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Accent diagonal flowing lines
    const numAccentLines = 15

    for (let i = 0; i < numAccentLines; i++) {
      const offset = (i / numAccentLines) * width * 1.5 - width * 0.25
      const amplitude = 30 + 15 * Math.cos(timeRef.current * 0.22 + i * 0.12)
      const frequency = 0.01 + 0.004 * Math.sin(timeRef.current * 0.16 + i * 0.1)
      const phase = timeRef.current * (0.4 + 0.2 * Math.sin(i * 0.13))
      const thickness = 0.4 + 0.25 * Math.sin(timeRef.current + i * 0.28)
      const opacity = (0.06 + 0.04 * Math.abs(Math.sin(timeRef.current * 0.24 + i * 0.15))) * lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`

      const steps = 100
      for (let j = 0; j <= steps; j++) {
        const progress = j / steps
        const baseX = offset + progress * width
        const baseY = progress * height + amplitude * Math.sin(progress * 6 + phase)

        const mouseInfl = getMouseInfluence(baseX, baseY)

        const x =
          baseX +
          mouseInfl * Math.sin(timeRef.current * 1.5 + progress * 6) * 8
        const y =
          baseY +
          mouseInfl * Math.cos(timeRef.current * 1.5 + progress * 6) * 8

        if (j === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // No energy field effects - removed completely

    requestIdRef.current = requestAnimationFrame(animate)
  }, [backgroundColor, primaryColor, secondaryColor, accentColor, lineOpacity, animationSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }

      timeRef.current = 0
      energyFields.current = []
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default SmoothWavyCanvas

code.demo.1753375792948.tsx

import  SmoothWavyCanvas  from "@/components/ui/smooth-wavy-canvas";

export default function DemoOne() {
  return <SmoothWavyCanvas />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/smooth-wavy-canvas.tsx
"use client"

import { useEffect, useRef, useCallback } from "react"

interface SmoothWavyCanvasProps {
  backgroundColor?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  lineOpacity?: number
  animationSpeed?: number
}

const SmoothWavyCanvas = ({
  backgroundColor = "#F8F6F0",
  primaryColor = "45, 45, 45",
  secondaryColor = "80, 80, 80",
  accentColor = "120, 120, 120",
  lineOpacity = 1,
  animationSpeed = 0.004,
}: SmoothWavyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const energyFields = useRef<Array<{ x: number; y: number; time: number; intensity: number }>>([])

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x
    const dy = y - mouseRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 200
    return Math.max(0, 1 - distance / maxDistance)
  }

  const getEnergyFieldInfluence = (
    x: number,
    y: number,
    currentTime: number,
  ): { intensity: number; direction: number } => {
    let totalIntensity = 0
    let totalDirectionX = 0
    let totalDirectionY = 0

    energyFields.current.forEach((field) => {
      const age = currentTime - field.time
      const maxAge = 4000

      if (age < maxAge) {
        const dx = x - field.x
        const dy = y - field.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const fieldRadius = (age / maxAge) * 300
        const fieldWidth = 100

        if (Math.abs(distance - fieldRadius) < fieldWidth) {
          const fieldStrength = (1 - age / maxAge) * field.intensity
          const proximityToField = 1 - Math.abs(distance - fieldRadius) / fieldWidth
          const influence = fieldStrength * proximityToField * 0.6 // Reduced intensity

          totalIntensity += influence
          if (distance > 0) {
            totalDirectionX += (dx / distance) * influence
            totalDirectionY += (dy / distance) * influence
          }
        }
      }
    })

    const direction = Math.atan2(totalDirectionY, totalDirectionX)
    return { intensity: Math.min(totalIntensity, 1), direction } // Capped at 1 instead of 2
  }

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true
    // Removed click effects - no more energy fields created
  }, [])

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentTime = Date.now()
    timeRef.current += animationSpeed

    const width = canvas.width
    const height = canvas.height

    // Clear with clean background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Primary horizontal flowing lines
    const numPrimaryLines = 35

    for (let i = 0; i < numPrimaryLines; i++) {
      const yPos = (i / numPrimaryLines) * height
      const mouseInfl = getMouseInfluence(width / 2, yPos)
      const { intensity: fieldIntensity, direction: fieldDirection } = getEnergyFieldInfluence(
        width / 2,
        yPos,
        currentTime,
      )

      const amplitude = 45 + 25 * Math.sin(timeRef.current * 0.25 + i * 0.15) + mouseInfl * 25
      const frequency = 0.006 + 0.002 * Math.sin(timeRef.current * 0.12 + i * 0.08) + mouseInfl * 0.001
      const speed = timeRef.current * (0.6 + 0.3 * Math.sin(i * 0.12)) + mouseInfl * timeRef.current * 0.3
      const thickness = 0.6 + 0.4 * Math.sin(timeRef.current + i * 0.25) + mouseInfl * 0.8
      const opacity =
        (0.12 + 0.08 * Math.abs(Math.sin(timeRef.current * 0.3 + i * 0.18)) + mouseInfl * 0.15) *
        lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`

      for (let x = 0; x < width; x += 2) {
        const localMouseInfl = getMouseInfluence(x, yPos)

        const y =
          yPos +
          amplitude * Math.sin(x * frequency + speed) +
          localMouseInfl * Math.sin(timeRef.current * 2 + x * 0.008) * 15

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Secondary vertical flowing lines
    const numSecondaryLines = 25

    for (let i = 0; i < numSecondaryLines; i++) {
      const xPos = (i / numSecondaryLines) * width
      const mouseInfl = getMouseInfluence(xPos, height / 2)
      const { intensity: fieldIntensity, direction: fieldDirection } = getEnergyFieldInfluence(
        xPos,
        height / 2,
        currentTime,
      )

      const amplitude = 40 + 20 * Math.sin(timeRef.current * 0.18 + i * 0.14) + mouseInfl * 20
      const frequency = 0.007 + 0.003 * Math.cos(timeRef.current * 0.14 + i * 0.09) + mouseInfl * 0.002
      const speed = timeRef.current * (0.5 + 0.25 * Math.cos(i * 0.16)) + mouseInfl * timeRef.current * 0.25
      const thickness = 0.5 + 0.3 * Math.sin(timeRef.current + i * 0.35) + mouseInfl * 0.7
      const opacity =
        (0.1 + 0.06 * Math.abs(Math.sin(timeRef.current * 0.28 + i * 0.2)) + mouseInfl * 0.12) *
        lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity})`

      for (let y = 0; y < height; y += 2) {
        const localMouseInfl = getMouseInfluence(xPos, y)

        const x =
          xPos +
          amplitude * Math.sin(y * frequency + speed) +
          localMouseInfl * Math.sin(timeRef.current * 2 + y * 0.008) * 12

        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Accent diagonal flowing lines
    const numAccentLines = 15

    for (let i = 0; i < numAccentLines; i++) {
      const offset = (i / numAccentLines) * width * 1.5 - width * 0.25
      const amplitude = 30 + 15 * Math.cos(timeRef.current * 0.22 + i * 0.12)
      const frequency = 0.01 + 0.004 * Math.sin(timeRef.current * 0.16 + i * 0.1)
      const phase = timeRef.current * (0.4 + 0.2 * Math.sin(i * 0.13))
      const thickness = 0.4 + 0.25 * Math.sin(timeRef.current + i * 0.28)
      const opacity = (0.06 + 0.04 * Math.abs(Math.sin(timeRef.current * 0.24 + i * 0.15))) * lineOpacity

      ctx.beginPath()
      ctx.lineWidth = thickness
      ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`

      const steps = 100
      for (let j = 0; j <= steps; j++) {
        const progress = j / steps
        const baseX = offset + progress * width
        const baseY = progress * height + amplitude * Math.sin(progress * 6 + phase)

        const mouseInfl = getMouseInfluence(baseX, baseY)

        const x =
          baseX +
          mouseInfl * Math.sin(timeRef.current * 1.5 + progress * 6) * 8
        const y =
          baseY +
          mouseInfl * Math.cos(timeRef.current * 1.5 + progress * 6) * 8

        if (j === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // No energy field effects - removed completely

    requestIdRef.current = requestAnimationFrame(animate)
  }, [backgroundColor, primaryColor, secondaryColor, accentColor, lineOpacity, animationSpeed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)

      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
        requestIdRef.current = null
      }

      timeRef.current = 0
      energyFields.current = []
    }
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default SmoothWavyCanvas
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
