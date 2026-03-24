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
svg-follower.tsx
"use client"

import type React from "react"
import { useRef, useEffect, useCallback, useState } from "react"

interface Position {
  x: number
  y: number
}

interface Point {
  position: Position
  time: number
  drift: Position
  age: number
  direction: Position
}

interface SVGFollowerProps {
  width?: number
  height?: number
  colors?: string[]
  removeDelay?: number
  autoPlay?: boolean
  className?: string
}

export function SVGFollower({
  width = 1400,
  height = 1200,
  colors = ["red", "blue", "green", "yellow", "white"],
  removeDelay = 400,
  autoPlay = false,
  className = "",
}: SVGFollowerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const followersRef = useRef<Follower[]>([])
  const animationRef = useRef<number>()
  const [isRecording, setIsRecording] = useState(false)
  const recordingRef = useRef<Position[]>([])

  class Follower {
    private points: Point[] = []
    private line: SVGPathElement
    private color: string
    private stage: SVGSVGElement

    constructor(stage: SVGSVGElement, color: string) {
      this.stage = stage
      this.color = color
      this.line = document.createElementNS("http://www.w3.org/2000/svg", "path")
      this.line.style.fill = color
      this.line.style.stroke = color
      this.line.style.strokeWidth = "1"
      this.stage.appendChild(this.line)
    }

    private getDrift(): number {
      return (Math.random() - 0.5) * 3
    }

    public add(position: Position) {
      const direction = { x: 0, y: 0 }
      if (this.points[0]) {
        direction.x = (position.x - this.points[0].position.x) * 0.25
        direction.y = (position.y - this.points[0].position.y) * 0.25
      }

      const point: Point = {
        position: position,
        time: Date.now(),
        drift: {
          x: this.getDrift() + direction.x / 2,
          y: this.getDrift() + direction.y / 2,
        },
        age: 0,
        direction: direction,
      }

      const shapeChance = Math.random()
      const chance = 0.1
      if (shapeChance < chance) this.makeCircle(point)
      else if (shapeChance < chance * 2) this.makeSquare(point)
      else if (shapeChance < chance * 3) this.makeTriangle(point)

      this.points.unshift(point)
    }

    private createLine(points: Point[]): string {
      const path: string[] = [points.length ? "M" : ""]

      if (points.length > 0) {
        let forward = true
        let i = 0

        while (i >= 0) {
          const point = points[i]
          const offsetX = point.direction.x * ((i - points.length) / points.length) * 0.6
          const offsetY = point.direction.y * ((i - points.length) / points.length) * 0.6
          const x = point.position.x + (forward ? offsetY : -offsetY)
          const y = point.position.y + (forward ? offsetX : -offsetX)
          point.age += 0.2

          path.push(String(x + point.drift.x * point.age))
          path.push(String(y + point.drift.y * point.age))

          i += forward ? 1 : -1
          if (i === points.length) {
            i--
            forward = false
          }
        }
      }

      return path.join(" ")
    }

    public trim() {
      if (this.points.length > 0) {
        const last = this.points[this.points.length - 1]
        const now = Date.now()
        if (last.time < now - removeDelay) {
          this.points.pop()
        }
      }
      this.line.setAttribute("d", this.createLine(this.points))
    }

    private makeCircle(point: Point) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      const radius = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1
      circle.setAttribute("r", String(radius))
      circle.style.fill = this.color
      circle.setAttribute("cx", "0")
      circle.setAttribute("cy", "0")
      this.moveShape(circle, point)
    }

    private makeSquare(point: Point) {
      const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5
      const square = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      square.setAttribute("width", String(size))
      square.setAttribute("height", String(size))
      square.style.fill = this.color
      this.moveShape(square, point)
    }

    private makeTriangle(point: Point) {
      const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5
      const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
      triangle.setAttribute("points", `0,0 ${size},${size / 2} 0,${size}`)
      triangle.style.fill = this.color
      this.moveShape(triangle, point)
    }

    private moveShape(shape: SVGElement, point: Point) {
      this.stage.appendChild(shape)
      const driftX = point.position.x + point.direction.x * (Math.random() * 20) + point.drift.x * (Math.random() * 10)
      const driftY = point.position.y + point.direction.y * (Math.random() * 20) + point.drift.y * (Math.random() * 10)

      // Simple animation without GSAP
      shape.style.transform = `translate(${point.position.x}px, ${point.position.y}px)`
      shape.style.transition = "all 0.5s ease-out"

      setTimeout(() => {
        shape.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${Math.random() * 360}deg)`
        setTimeout(() => {
          if (this.stage.contains(shape)) {
            this.stage.removeChild(shape)
          }
        }, 500)
      }, 10)
    }
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const position: Position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      followersRef.current.forEach((follower) => follower.add(position))

      if (isRecording) {
        recordingRef.current.push({
          x: (position.x / width) * 100,
          y: (position.y / height) * 100,
        })
      }
    },
    [width, height, isRecording],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const touch = e.touches[0]
      const position: Position = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }

      followersRef.current.forEach((follower) => follower.add(position))

      if (isRecording) {
        recordingRef.current.push({
          x: (position.x / width) * 100,
          y: (position.y / height) * 100,
        })
      }
    },
    [width, height, isRecording],
  )

  const startRecording = () => {
    recordingRef.current = []
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
    console.log("Recording:", JSON.stringify(recordingRef.current))
  }

  const animate = useCallback(() => {
    followersRef.current.forEach((follower) => follower.trim())
    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    // Initialize followers
    followersRef.current = colors.map((color) => new Follower(svgRef.current!, color))

    // Start animation loop
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, animate])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      onTouchStart={startRecording}
      onTouchEnd={stopRecording}
    >
      <svg ref={svgRef} width={width} height={height} xmlns="http://www.w3.org/2000/svg" className="absolute inset-0" />
    </div>
  )
}


code.demo.1757225741920.tsx
import { SVGFollower } from "@/components/ui/svg-follower";

export default function DemoOne() {
   return (
    <div className="min-h-screen flex items-center justify-center">
      <SVGFollower  
        colors={["#ff6b6b", "#fff200", "#45b7d1", "#96ceb4", "#ffeaa7"]} 
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/svg-follower.tsx
"use client"

import type React from "react"
import { useRef, useEffect, useCallback, useState } from "react"

interface Position {
  x: number
  y: number
}

interface Point {
  position: Position
  time: number
  drift: Position
  age: number
  direction: Position
}

interface SVGFollowerProps {
  width?: number
  height?: number
  colors?: string[]
  removeDelay?: number
  autoPlay?: boolean
  className?: string
}

export function SVGFollower({
  width = 1400,
  height = 1200,
  colors = ["red", "blue", "green", "yellow", "white"],
  removeDelay = 400,
  autoPlay = false,
  className = "",
}: SVGFollowerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const followersRef = useRef<Follower[]>([])
  const animationRef = useRef<number>()
  const [isRecording, setIsRecording] = useState(false)
  const recordingRef = useRef<Position[]>([])

  class Follower {
    private points: Point[] = []
    private line: SVGPathElement
    private color: string
    private stage: SVGSVGElement

    constructor(stage: SVGSVGElement, color: string) {
      this.stage = stage
      this.color = color
      this.line = document.createElementNS("http://www.w3.org/2000/svg", "path")
      this.line.style.fill = color
      this.line.style.stroke = color
      this.line.style.strokeWidth = "1"
      this.stage.appendChild(this.line)
    }

    private getDrift(): number {
      return (Math.random() - 0.5) * 3
    }

    public add(position: Position) {
      const direction = { x: 0, y: 0 }
      if (this.points[0]) {
        direction.x = (position.x - this.points[0].position.x) * 0.25
        direction.y = (position.y - this.points[0].position.y) * 0.25
      }

      const point: Point = {
        position: position,
        time: Date.now(),
        drift: {
          x: this.getDrift() + direction.x / 2,
          y: this.getDrift() + direction.y / 2,
        },
        age: 0,
        direction: direction,
      }

      const shapeChance = Math.random()
      const chance = 0.1
      if (shapeChance < chance) this.makeCircle(point)
      else if (shapeChance < chance * 2) this.makeSquare(point)
      else if (shapeChance < chance * 3) this.makeTriangle(point)

      this.points.unshift(point)
    }

    private createLine(points: Point[]): string {
      const path: string[] = [points.length ? "M" : ""]

      if (points.length > 0) {
        let forward = true
        let i = 0

        while (i >= 0) {
          const point = points[i]
          const offsetX = point.direction.x * ((i - points.length) / points.length) * 0.6
          const offsetY = point.direction.y * ((i - points.length) / points.length) * 0.6
          const x = point.position.x + (forward ? offsetY : -offsetY)
          const y = point.position.y + (forward ? offsetX : -offsetX)
          point.age += 0.2

          path.push(String(x + point.drift.x * point.age))
          path.push(String(y + point.drift.y * point.age))

          i += forward ? 1 : -1
          if (i === points.length) {
            i--
            forward = false
          }
        }
      }

      return path.join(" ")
    }

    public trim() {
      if (this.points.length > 0) {
        const last = this.points[this.points.length - 1]
        const now = Date.now()
        if (last.time < now - removeDelay) {
          this.points.pop()
        }
      }
      this.line.setAttribute("d", this.createLine(this.points))
    }

    private makeCircle(point: Point) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      const radius = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1
      circle.setAttribute("r", String(radius))
      circle.style.fill = this.color
      circle.setAttribute("cx", "0")
      circle.setAttribute("cy", "0")
      this.moveShape(circle, point)
    }

    private makeSquare(point: Point) {
      const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5
      const square = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      square.setAttribute("width", String(size))
      square.setAttribute("height", String(size))
      square.style.fill = this.color
      this.moveShape(square, point)
    }

    private makeTriangle(point: Point) {
      const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5
      const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
      triangle.setAttribute("points", `0,0 ${size},${size / 2} 0,${size}`)
      triangle.style.fill = this.color
      this.moveShape(triangle, point)
    }

    private moveShape(shape: SVGElement, point: Point) {
      this.stage.appendChild(shape)
      const driftX = point.position.x + point.direction.x * (Math.random() * 20) + point.drift.x * (Math.random() * 10)
      const driftY = point.position.y + point.direction.y * (Math.random() * 20) + point.drift.y * (Math.random() * 10)

      // Simple animation without GSAP
      shape.style.transform = `translate(${point.position.x}px, ${point.position.y}px)`
      shape.style.transition = "all 0.5s ease-out"

      setTimeout(() => {
        shape.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${Math.random() * 360}deg)`
        setTimeout(() => {
          if (this.stage.contains(shape)) {
            this.stage.removeChild(shape)
          }
        }, 500)
      }, 10)
    }
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const position: Position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      followersRef.current.forEach((follower) => follower.add(position))

      if (isRecording) {
        recordingRef.current.push({
          x: (position.x / width) * 100,
          y: (position.y / height) * 100,
        })
      }
    },
    [width, height, isRecording],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const touch = e.touches[0]
      const position: Position = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }

      followersRef.current.forEach((follower) => follower.add(position))

      if (isRecording) {
        recordingRef.current.push({
          x: (position.x / width) * 100,
          y: (position.y / height) * 100,
        })
      }
    },
    [width, height, isRecording],
  )

  const startRecording = () => {
    recordingRef.current = []
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
    console.log("Recording:", JSON.stringify(recordingRef.current))
  }

  const animate = useCallback(() => {
    followersRef.current.forEach((follower) => follower.trim())
    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    // Initialize followers
    followersRef.current = colors.map((color) => new Follower(svgRef.current!, color))

    // Start animation loop
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, animate])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      onTouchStart={startRecording}
      onTouchEnd={stopRecording}
    >
      <svg ref={svgRef} width={width} height={height} xmlns="http://www.w3.org/2000/svg" className="absolute inset-0" />
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
