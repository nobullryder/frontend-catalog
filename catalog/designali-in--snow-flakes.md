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
snow-flakes.tsx
"use client"

import { useEffect, useState } from "react"
 

interface SnowflakeProps {
  id: number
  size: number
  left: number
  animationDuration: number
  opacity: number
  color: string
}

interface SnowfallBackgroundProps {
  /** Number of snowflakes */
  count?: number
  /** Snow color */
  color?: string
  /** Animation speed multiplier (lower = slower) */
  speed?: number
  /** Minimum snowflake size in pixels */
  minSize?: number
  /** Maximum snowflake size in pixels */
  maxSize?: number
  /** Minimum opacity */
  minOpacity?: number
  /** Maximum opacity */
  maxOpacity?: number
  /** Z-index for the snow layer */
  zIndex?: number
  /** Whether to enable wind effect */
  wind?: boolean
}

const Snowflake = ({
  id,
  size,
  left,
  animationDuration,
  opacity,
  color,
}: SnowflakeProps) => {
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        opacity,
        color,
        animation: `snowfall-${id} ${animationDuration}s linear infinite`,
        textShadow: "0 0 1px rgba(255,255,255,0.8)",
      }}
    >
      ❄
    </div>
  )
}

export function SnowfallBackground({
  count = 50,
  color = "#ffffff",
  speed = 1,
  minSize = 10,
  maxSize = 20,
  minOpacity = 0.3,
  maxOpacity = 0.8,
  zIndex = -1,
  wind = true,
}: SnowfallBackgroundProps) {
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const generateSnowflakes = () => {
      const flakes: SnowflakeProps[] = []

      for (let i = 0; i < count; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize
        const left = Math.random() * 100
        const animationDuration = (Math.random() * 3 + 2) / speed
        const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity

        flakes.push({
          id: i,
          size,
          left,
          animationDuration,
          opacity,
          color,
        })
      }

      setSnowflakes(flakes)
    }

    generateSnowflakes()
  }, [count, color, speed, minSize, maxSize, minOpacity, maxOpacity])

  useEffect(() => {
    if (!mounted) return

    // Generate CSS animations for each snowflake
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"

    let cssRules = ""

    snowflakes.forEach((flake) => {
      const windOffset = wind ? Math.random() * 100 - 50 : 0

      cssRules += `
        @keyframes snowfall-${flake.id} {
          0% {
            transform: translateY(-100vh) translateX(0px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(${windOffset}px) rotate(360deg);
          }
        }
      `
    })

    styleSheet.innerHTML = cssRules
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [snowflakes, wind, mounted])

  if (!mounted) return null

  return (
    <div className="pointer-events-none overflow-hidden" style={{ zIndex }}>
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
    </div>
  )
}


code.demo.1755088625740.tsx
import { SnowfallBackground } from "@/components/ui/snow-flakes";

export default function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-blue-700">
      <SnowfallBackground
        count={150}
        speed={0.1}
        minSize={1}
        maxSize={40}
        minOpacity={0}
        maxOpacity={1}
        color={"#ffffff"}
        wind={true}
        zIndex={1}
      />
      <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Snow Flakes
      </span>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/snow-flakes.tsx
"use client"

import { useEffect, useState } from "react"
 

interface SnowflakeProps {
  id: number
  size: number
  left: number
  animationDuration: number
  opacity: number
  color: string
}

interface SnowfallBackgroundProps {
  /** Number of snowflakes */
  count?: number
  /** Snow color */
  color?: string
  /** Animation speed multiplier (lower = slower) */
  speed?: number
  /** Minimum snowflake size in pixels */
  minSize?: number
  /** Maximum snowflake size in pixels */
  maxSize?: number
  /** Minimum opacity */
  minOpacity?: number
  /** Maximum opacity */
  maxOpacity?: number
  /** Z-index for the snow layer */
  zIndex?: number
  /** Whether to enable wind effect */
  wind?: boolean
}

const Snowflake = ({
  id,
  size,
  left,
  animationDuration,
  opacity,
  color,
}: SnowflakeProps) => {
  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        opacity,
        color,
        animation: `snowfall-${id} ${animationDuration}s linear infinite`,
        textShadow: "0 0 1px rgba(255,255,255,0.8)",
      }}
    >
      ❄
    </div>
  )
}

export function SnowfallBackground({
  count = 50,
  color = "#ffffff",
  speed = 1,
  minSize = 10,
  maxSize = 20,
  minOpacity = 0.3,
  maxOpacity = 0.8,
  zIndex = -1,
  wind = true,
}: SnowfallBackgroundProps) {
  const [snowflakes, setSnowflakes] = useState<SnowflakeProps[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const generateSnowflakes = () => {
      const flakes: SnowflakeProps[] = []

      for (let i = 0; i < count; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize
        const left = Math.random() * 100
        const animationDuration = (Math.random() * 3 + 2) / speed
        const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity

        flakes.push({
          id: i,
          size,
          left,
          animationDuration,
          opacity,
          color,
        })
      }

      setSnowflakes(flakes)
    }

    generateSnowflakes()
  }, [count, color, speed, minSize, maxSize, minOpacity, maxOpacity])

  useEffect(() => {
    if (!mounted) return

    // Generate CSS animations for each snowflake
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"

    let cssRules = ""

    snowflakes.forEach((flake) => {
      const windOffset = wind ? Math.random() * 100 - 50 : 0

      cssRules += `
        @keyframes snowfall-${flake.id} {
          0% {
            transform: translateY(-100vh) translateX(0px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(${windOffset}px) rotate(360deg);
          }
        }
      `
    })

    styleSheet.innerHTML = cssRules
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [snowflakes, wind, mounted])

  if (!mounted) return null

  return (
    <div className="pointer-events-none overflow-hidden" style={{ zIndex }}>
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
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
