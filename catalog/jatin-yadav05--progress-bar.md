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
progress-bar.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SegmentedProgressProps {
  value?: number
  segments?: number
  label?: string
  showPercentage?: boolean
  showDemo?: boolean
  className?: string
}

export function SegmentedProgress({
  value: initialValue = 80,
  segments = 20,
  label,
  showPercentage = true,
  showDemo = true,
  className,
}: SegmentedProgressProps) {
  const [progress, setProgress] = useState(initialValue)
  const value = showDemo ? progress : initialValue

  const [displayValue, setDisplayValue] = useState(0)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const animationRef = useRef<number | null>(null)
  const startValueRef = useRef(0)
  const startTimeRef = useRef(0)

  const filledSegments = Math.round((displayValue / 100) * segments)

  useEffect(() => {
    if (!isInitialized) {
      const initTimeout = setTimeout(() => setIsInitialized(true), 50)
      return () => clearTimeout(initTimeout)
    }

    const duration = 800
    startValueRef.current = displayValue
    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)

      const newValue = startValueRef.current + (value - startValueRef.current) * eased
      setDisplayValue(newValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [value, isInitialized])

  const getSegmentStyle = (index: number, isFilled: boolean) => {
    let scale = 1
    const opacity = 1
    let translateY = 0

    if (hoveredSegment !== null) {
      const distance = Math.abs(hoveredSegment - index)
      if (distance === 0) {
        scale = 1.3
        translateY = -1
      } else if (distance <= 3) {
        const falloff = Math.cos((distance / 3) * (Math.PI / 2))
        scale = 1 + 0.2 * falloff
        translateY = -0.5 * falloff
      }
    }

    const delay = isInitialized ? index * 20 : 0

    return {
      transform: `scaleY(${scale}) translateY(${translateY}px)`,
      transitionDelay: `${delay}ms`,
      opacity,
    }
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-3">
        {/* Header with label and percentage */}
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-muted-foreground tracking-wide">{label}</span>}
          {showPercentage && (
            <span
              className="text-sm font-semibold text-foreground tabular-nums tracking-tight transition-all duration-300"
              style={{
                filter: hoveredSegment !== null ? "brightness(1.2)" : "brightness(1)",
              }}
            >
              {Math.round(displayValue)}%
            </span>
          )}
        </div>

        {/* Segmented bar */}
        <div
          className="flex gap-[3px] py-1"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: segments }).map((_, index) => {
            const isFilled = index < filledSegments
            const isHovered = hoveredSegment === index

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={cn(
                  "h-3 flex-1 rounded-[4px] cursor-pointer origin-center",
                  "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  isFilled ? "bg-primary" : "bg-muted/60",
                  isHovered && isFilled && "brightness-110 shadow-[0_0_16px_hsl(var(--primary)/0.5)]",
                  isHovered && !isFilled && "bg-muted",
                  hoveredSegment !== null && !isFilled && !isHovered && "bg-muted/40",
                )}
                style={getSegmentStyle(index, isFilled)}
              />
            )
          })}
        </div>
      </div>

      {showDemo && (
        <div className="flex flex-col gap-4">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer
              transition-all duration-300
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary
              [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(var(--primary)/0.4)]
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-300
              [&::-webkit-slider-thumb]:ease-out
              [&::-webkit-slider-thumb]:hover:scale-125
              [&::-webkit-slider-thumb]:hover:shadow-[0_0_16px_hsl(var(--primary)/0.6)]
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <p className="text-center text-xs text-muted-foreground tracking-wide">Drag to adjust value</p>
        </div>
      )}
    </div>
  )
}


code.demo.1765554123731.tsx
"use client"

import { SegmentedProgress } from "@/components/ui/progress-bar"

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 w-full">
      <div className="w-full max-w-md">
        <SegmentedProgress />
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress-bar.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SegmentedProgressProps {
  value?: number
  segments?: number
  label?: string
  showPercentage?: boolean
  showDemo?: boolean
  className?: string
}

export function SegmentedProgress({
  value: initialValue = 80,
  segments = 20,
  label,
  showPercentage = true,
  showDemo = true,
  className,
}: SegmentedProgressProps) {
  const [progress, setProgress] = useState(initialValue)
  const value = showDemo ? progress : initialValue

  const [displayValue, setDisplayValue] = useState(0)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const animationRef = useRef<number | null>(null)
  const startValueRef = useRef(0)
  const startTimeRef = useRef(0)

  const filledSegments = Math.round((displayValue / 100) * segments)

  useEffect(() => {
    if (!isInitialized) {
      const initTimeout = setTimeout(() => setIsInitialized(true), 50)
      return () => clearTimeout(initTimeout)
    }

    const duration = 800
    startValueRef.current = displayValue
    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)

      const newValue = startValueRef.current + (value - startValueRef.current) * eased
      setDisplayValue(newValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [value, isInitialized])

  const getSegmentStyle = (index: number, isFilled: boolean) => {
    let scale = 1
    const opacity = 1
    let translateY = 0

    if (hoveredSegment !== null) {
      const distance = Math.abs(hoveredSegment - index)
      if (distance === 0) {
        scale = 1.3
        translateY = -1
      } else if (distance <= 3) {
        const falloff = Math.cos((distance / 3) * (Math.PI / 2))
        scale = 1 + 0.2 * falloff
        translateY = -0.5 * falloff
      }
    }

    const delay = isInitialized ? index * 20 : 0

    return {
      transform: `scaleY(${scale}) translateY(${translateY}px)`,
      transitionDelay: `${delay}ms`,
      opacity,
    }
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-3">
        {/* Header with label and percentage */}
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-muted-foreground tracking-wide">{label}</span>}
          {showPercentage && (
            <span
              className="text-sm font-semibold text-foreground tabular-nums tracking-tight transition-all duration-300"
              style={{
                filter: hoveredSegment !== null ? "brightness(1.2)" : "brightness(1)",
              }}
            >
              {Math.round(displayValue)}%
            </span>
          )}
        </div>

        {/* Segmented bar */}
        <div
          className="flex gap-[3px] py-1"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: segments }).map((_, index) => {
            const isFilled = index < filledSegments
            const isHovered = hoveredSegment === index

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={cn(
                  "h-3 flex-1 rounded-[4px] cursor-pointer origin-center",
                  "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  isFilled ? "bg-primary" : "bg-muted/60",
                  isHovered && isFilled && "brightness-110 shadow-[0_0_16px_hsl(var(--primary)/0.5)]",
                  isHovered && !isFilled && "bg-muted",
                  hoveredSegment !== null && !isFilled && !isHovered && "bg-muted/40",
                )}
                style={getSegmentStyle(index, isFilled)}
              />
            )
          })}
        </div>
      </div>

      {showDemo && (
        <div className="flex flex-col gap-4">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer
              transition-all duration-300
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary
              [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(var(--primary)/0.4)]
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-300
              [&::-webkit-slider-thumb]:ease-out
              [&::-webkit-slider-thumb]:hover:scale-125
              [&::-webkit-slider-thumb]:hover:shadow-[0_0_16px_hsl(var(--primary)/0.6)]
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-primary
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <p className="text-center text-xs text-muted-foreground tracking-wide">Drag to adjust value</p>
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
