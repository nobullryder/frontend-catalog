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
orbital-clock.tsx
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

export function OrbitalClock() {
  const [time, setTime] = useState(new Date())
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setMousePos({ x: x * 8, y: y * 8 })
  }

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000
  const minutes = time.getMinutes() + seconds / 60
  const hours = (time.getHours() % 12) + minutes / 60

  const secondDeg = seconds * 6
  const minuteDeg = minutes * 6
  const hourDeg = hours * 30

  const formatDate = () => {
    return time.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      ref={containerRef}
      className={`
        relative flex items-center justify-center cursor-pointer select-none
        text-slate-900 dark:text-slate-100
        /* Theme variables */
        [--orb-primary:rgb(59,130,246)] dark:[--orb-primary:rgb(125,211,252)]
        [--orb-marker-strong:rgba(15,23,42,0.7)] dark:[--orb-marker-strong:rgba(255,255,255,0.7)]
        [--orb-marker-weak:rgba(15,23,42,0.35)] dark:[--orb-marker-weak:rgba(255,255,255,0.25)]
        [--orb-center:rgba(15,23,42,0.9)] dark:[--orb-center:rgba(255,255,255,0.85)]
        [--orb-date:rgba(100,116,139,0.9)] dark:[--orb-date:rgba(148,163,184,0.9)]
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      style={{
        perspective: "600px",
      }}
    >
      {/* Main clock container */}
      <div
        className="relative w-52 h-52 transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            background: isHovered
              ? "radial-gradient(circle, color-mix(in srgb, var(--orb-primary) 40%, transparent) 0%, transparent 70%)"
              : "transparent",
            transform: isHovered ? "scale(1.3)" : "scale(1)",
          }}
        />

        {/* Clock face */}
        <div className="absolute inset-2 rounded-full bg-white/95 dark:bg-card border border-slate-200/70 dark:border-border/50 shadow-xl">
          {/* Inner subtle ring */}
          <div
            className={`absolute inset-3 rounded-full border transition-all duration-500 ${
              isHovered
                ? "border-[color:var(--orb-primary)]/40"
                : "border-black/5 dark:border-white/5"
            }`}
          />

          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30
            const isActive = Math.floor(hours) === i || Math.floor(hours) === i + 12
            const rad = (angle - 90) * (Math.PI / 180)
            const x = 50 + 38 * Math.cos(rad)
            const y = 50 + 38 * Math.sin(rad)

            return (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  background: isActive
                    ? "var(--orb-primary)"
                    : i % 3 === 0
                      ? "var(--orb-marker-strong)"
                      : "var(--orb-marker-weak)",
                  boxShadow: isActive
                    ? "0 0 10px color-mix(in srgb, var(--orb-primary) 70%, transparent)"
                    : "none",
                }}
              />
            )
          })}

{/* Hour hand */}
<div
  className="absolute left-1/2 bottom-1/2 w-1 origin-bottom rounded-full transition-all duration-200
             bg-slate-800 dark:bg-slate-200"   // << updated color
  style={{
    height: "28%",
    transform: `translateX(-50%) rotate(${hourDeg}deg)`,
  }}
/>

          {/* Minute hand */}
          <div
  className="absolute left-1/2 bottom-1/2 w-0.5 origin-bottom rounded-full transition-all duration-200
             bg-slate-500 dark:bg-slate-300"   // << updated color
  style={{
    height: "36%",
    transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
  }}
/>

          {/* Second hand */}
          <div
            className="absolute left-1/2 bottom-1/2 origin-bottom rounded-full"
            style={{
              width: "1px",
              height: "40%",
              transform: `translateX(-50%) rotate(${secondDeg}deg)`,
              background: "var(--orb-primary)",
              boxShadow: "0 0 8px color-mix(in srgb, var(--orb-primary) 70%, transparent)",
            }}
          />

          {/* Center dot */}
          <div
            className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              transform: "translate(-50%, -50%)",
              background: isHovered ? "var(--orb-primary)" : "var(--orb-center)",
              boxShadow: isHovered
                ? "0 0 12px color-mix(in srgb, var(--orb-primary) 80%, transparent)"
                : "none",
            }}
          />
        </div>
      </div>

      {/* Date reveal on hover */}
      <div
        className="absolute w-full flex items-center justify-center -bottom-8 left-1/2 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-500"
        style={{
          transform: `translateX(-50%) translateY(${isHovered ? 0 : -10}px)`,
          opacity: isHovered ? 1 : 0,
          color: isHovered ? "var(--orb-primary)" : "var(--orb-date)",
        }}
      >
        {formatDate()}
      </div>

      {/* Orbit animation keyframes */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  )
}


code.demo.1765209547841.tsx
import { OrbitalClock } from "@/components/ui/orbital-clock";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-16 bg-background px-6 w-full">
      <div className="text-center space-y-2">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-mono">Local Time</p>
      </div>

      <OrbitalClock />

      <p className="text-xs text-muted-foreground font-mono tracking-wide">[ orbital clock ]</p>
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/orbital-clock.tsx
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

export function OrbitalClock() {
  const [time, setTime] = useState(new Date())
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setMousePos({ x: x * 8, y: y * 8 })
  }

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000
  const minutes = time.getMinutes() + seconds / 60
  const hours = (time.getHours() % 12) + minutes / 60

  const secondDeg = seconds * 6
  const minuteDeg = minutes * 6
  const hourDeg = hours * 30

  const formatDate = () => {
    return time.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      ref={containerRef}
      className={`
        relative flex items-center justify-center cursor-pointer select-none
        text-slate-900 dark:text-slate-100
        /* Theme variables */
        [--orb-primary:rgb(59,130,246)] dark:[--orb-primary:rgb(125,211,252)]
        [--orb-marker-strong:rgba(15,23,42,0.7)] dark:[--orb-marker-strong:rgba(255,255,255,0.7)]
        [--orb-marker-weak:rgba(15,23,42,0.35)] dark:[--orb-marker-weak:rgba(255,255,255,0.25)]
        [--orb-center:rgba(15,23,42,0.9)] dark:[--orb-center:rgba(255,255,255,0.85)]
        [--orb-date:rgba(100,116,139,0.9)] dark:[--orb-date:rgba(148,163,184,0.9)]
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      style={{
        perspective: "600px",
      }}
    >
      {/* Main clock container */}
      <div
        className="relative w-52 h-52 transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            background: isHovered
              ? "radial-gradient(circle, color-mix(in srgb, var(--orb-primary) 40%, transparent) 0%, transparent 70%)"
              : "transparent",
            transform: isHovered ? "scale(1.3)" : "scale(1)",
          }}
        />

        {/* Clock face */}
        <div className="absolute inset-2 rounded-full bg-white/95 dark:bg-card border border-slate-200/70 dark:border-border/50 shadow-xl">
          {/* Inner subtle ring */}
          <div
            className={`absolute inset-3 rounded-full border transition-all duration-500 ${
              isHovered
                ? "border-[color:var(--orb-primary)]/40"
                : "border-black/5 dark:border-white/5"
            }`}
          />

          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30
            const isActive = Math.floor(hours) === i || Math.floor(hours) === i + 12
            const rad = (angle - 90) * (Math.PI / 180)
            const x = 50 + 38 * Math.cos(rad)
            const y = 50 + 38 * Math.sin(rad)

            return (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  background: isActive
                    ? "var(--orb-primary)"
                    : i % 3 === 0
                      ? "var(--orb-marker-strong)"
                      : "var(--orb-marker-weak)",
                  boxShadow: isActive
                    ? "0 0 10px color-mix(in srgb, var(--orb-primary) 70%, transparent)"
                    : "none",
                }}
              />
            )
          })}

{/* Hour hand */}
<div
  className="absolute left-1/2 bottom-1/2 w-1 origin-bottom rounded-full transition-all duration-200
             bg-slate-800 dark:bg-slate-200"   // << updated color
  style={{
    height: "28%",
    transform: `translateX(-50%) rotate(${hourDeg}deg)`,
  }}
/>

          {/* Minute hand */}
          <div
  className="absolute left-1/2 bottom-1/2 w-0.5 origin-bottom rounded-full transition-all duration-200
             bg-slate-500 dark:bg-slate-300"   // << updated color
  style={{
    height: "36%",
    transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
  }}
/>

          {/* Second hand */}
          <div
            className="absolute left-1/2 bottom-1/2 origin-bottom rounded-full"
            style={{
              width: "1px",
              height: "40%",
              transform: `translateX(-50%) rotate(${secondDeg}deg)`,
              background: "var(--orb-primary)",
              boxShadow: "0 0 8px color-mix(in srgb, var(--orb-primary) 70%, transparent)",
            }}
          />

          {/* Center dot */}
          <div
            className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              transform: "translate(-50%, -50%)",
              background: isHovered ? "var(--orb-primary)" : "var(--orb-center)",
              boxShadow: isHovered
                ? "0 0 12px color-mix(in srgb, var(--orb-primary) 80%, transparent)"
                : "none",
            }}
          />
        </div>
      </div>

      {/* Date reveal on hover */}
      <div
        className="absolute w-full flex items-center justify-center -bottom-8 left-1/2 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-500"
        style={{
          transform: `translateX(-50%) translateY(${isHovered ? 0 : -10}px)`,
          opacity: isHovered ? 1 : 0,
          color: isHovered ? "var(--orb-primary)" : "var(--orb-date)",
        }}
      >
        {formatDate()}
      </div>

      {/* Orbit animation keyframes */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
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
