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
color-picker.tsx
"use client"

import { useEffect, useRef, useState } from "react"

export function ColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hex, setHex] = useState("#000000")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showCopied, setShowCopied] = useState(false)
  const [copiedHex, setCopiedHex] = useState("#000000")

  const rgbToHex = (r: number, g: number, b: number): string => {
    if (r > 255 || g > 255 || b > 255) {
      throw new Error("Invalid color component")
    }
    return ((r << 16) | (g << 8) | b).toString(16)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // First gradient with colors (horizontal rainbow)
    let gradient = ctx.createLinearGradient(0, 0, window.innerWidth, 0)
    gradient.addColorStop(0, "rgb(255, 0, 0)")
    gradient.addColorStop(0.15, "rgb(255, 0, 255)")
    gradient.addColorStop(0.33, "rgb(0, 0, 255)")
    gradient.addColorStop(0.49, "rgb(0, 255, 255)")
    gradient.addColorStop(0.67, "rgb(0, 255, 0)")
    gradient.addColorStop(0.84, "rgb(255, 255, 0)")
    gradient.addColorStop(1, "rgb(255, 0, 0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    // Then white/black overlay (vertical)
    gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight)
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)")
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.pageX
      const y = event.pageY
      const imageData = ctx.getImageData(x, y, 1, 1).data
      const hexColor = "#" + ("000000" + rgbToHex(imageData[0], imageData[1], imageData[2])).slice(-6)

      setHex(hexColor)
      setMousePos({ x, y })
    }

    const handleClick = async () => {
      try {
        await navigator.clipboard.writeText(hex)
        setCopiedHex(hex)
        setShowCopied(true)

        setTimeout(() => {
          setShowCopied(false)
        }, 3000)
      } catch (err) {
        console.error("Failed to copy to clipboard:", err)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
    }
  }, [hex])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Copied notification */}
      <div
        className={`fixed bottom-0 left-0 w-full h-1 z-50 flex flex-col items-center justify-center text-white text-xs font-mono transition-all duration-300 ${
          showCopied ? "h-24" : "h-1"
        }`}
        style={{ backgroundColor: showCopied ? copiedHex : "white" }}
      >
        {showCopied && (
          <>
            <h1 className="text-lg font-thin">{copiedHex}</h1>
            <h2 className="text-sm font-thin">Copied to clipboard</h2>
          </>
        )}
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="cursor-crosshair h-[500px] w-full" />

      {/* Hex display that follows mouse */}
      <h1
        className="fixed text-white font-mono font-thin pointer-events-none z-10"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y - 100}px`,
        }}
      >
        {hex}
      </h1>
    </div>
  )
}


code.demo.1755489592162.tsx
import { ColorPicker } from "@/components/ui/color-picker";

export default function DemoOne() {
  return <ColorPicker />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/color-picker.tsx
"use client"

import { useEffect, useRef, useState } from "react"

export function ColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hex, setHex] = useState("#000000")
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showCopied, setShowCopied] = useState(false)
  const [copiedHex, setCopiedHex] = useState("#000000")

  const rgbToHex = (r: number, g: number, b: number): string => {
    if (r > 255 || g > 255 || b > 255) {
      throw new Error("Invalid color component")
    }
    return ((r << 16) | (g << 8) | b).toString(16)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // First gradient with colors (horizontal rainbow)
    let gradient = ctx.createLinearGradient(0, 0, window.innerWidth, 0)
    gradient.addColorStop(0, "rgb(255, 0, 0)")
    gradient.addColorStop(0.15, "rgb(255, 0, 255)")
    gradient.addColorStop(0.33, "rgb(0, 0, 255)")
    gradient.addColorStop(0.49, "rgb(0, 255, 255)")
    gradient.addColorStop(0.67, "rgb(0, 255, 0)")
    gradient.addColorStop(0.84, "rgb(255, 255, 0)")
    gradient.addColorStop(1, "rgb(255, 0, 0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    // Then white/black overlay (vertical)
    gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight)
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)")
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.pageX
      const y = event.pageY
      const imageData = ctx.getImageData(x, y, 1, 1).data
      const hexColor = "#" + ("000000" + rgbToHex(imageData[0], imageData[1], imageData[2])).slice(-6)

      setHex(hexColor)
      setMousePos({ x, y })
    }

    const handleClick = async () => {
      try {
        await navigator.clipboard.writeText(hex)
        setCopiedHex(hex)
        setShowCopied(true)

        setTimeout(() => {
          setShowCopied(false)
        }, 3000)
      } catch (err) {
        console.error("Failed to copy to clipboard:", err)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
    }
  }, [hex])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Copied notification */}
      <div
        className={`fixed bottom-0 left-0 w-full h-1 z-50 flex flex-col items-center justify-center text-white text-xs font-mono transition-all duration-300 ${
          showCopied ? "h-24" : "h-1"
        }`}
        style={{ backgroundColor: showCopied ? copiedHex : "white" }}
      >
        {showCopied && (
          <>
            <h1 className="text-lg font-thin">{copiedHex}</h1>
            <h2 className="text-sm font-thin">Copied to clipboard</h2>
          </>
        )}
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="cursor-crosshair h-[500px] w-full" />

      {/* Hex display that follows mouse */}
      <h1
        className="fixed text-white font-mono font-thin pointer-events-none z-10"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y - 100}px`,
        }}
      >
        {hex}
      </h1>
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
