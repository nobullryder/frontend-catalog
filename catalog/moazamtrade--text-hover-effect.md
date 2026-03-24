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
text-hover-effect.tsx
import React, { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export const TextHoverEffect = ({
  text,
  duration,
  fontSize = 56, 
}: {
  text: string
  duration?: number
  fontSize?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const maskGradientRef = useRef(null)
  const animatedTextRef = useRef(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useGSAP(
    () => {
      gsap.fromTo(
        animatedTextRef.current,
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        {
          strokeDashoffset: 0,
          strokeDasharray: 1000,
          duration: 4,
          ease: "power2.inOut",
        }
      )
    },
    { scope: svgRef }
  )

  const updateCursorPosition = (x: number, y: number) => {
    if (svgRef.current && x !== null && y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((y - svgRect.top) / svgRect.height) * 100

      const newPosition = {
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      }

      setMaskPosition(newPosition)

      gsap.to(maskGradientRef.current, {
        attr: newPosition,
        duration: duration ?? 0,
        ease: "power2.out",
      })
    }
  }

  useEffect(() => {
    updateCursorPosition(cursor.x, cursor.y)
  }, [cursor, duration])

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault() 
    setHovered(true)
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      setCursor({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      setCursor({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    setHovered(false)
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="20%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>
        <radialGradient
          id="revealMask"
          ref={maskGradientRef}
          gradientUnits="userSpaceOnUse"
          r="25%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {[0, 1, 2].map((_, idx) => (
        <text
          key={idx}
          ref={idx === 1 ? animatedTextRef : undefined}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className={`fill-transparent font-[helvetica] font-bold ${
            idx === 0
              ? "stroke-neutral-200 dark:stroke-neutral-800"
              : idx === 1
                ? "stroke-neutral-200 dark:stroke-neutral-800"
                : ""
          }`}
          stroke={idx === 2 ? "url(#textGradient)" : undefined}
          mask={idx === 2 ? "url(#textMask)" : undefined}
          style={{
            fontSize,
            opacity: idx === 0 && !hovered ? 0 : idx === 0 ? 0.7 : 1,
          }}
        >
          {text}
        </text>
      ))}
    </svg>
  )
}

code.demo.1760788726069.tsx
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function DemoOne() {
  return (
     <section className="w-full h-full">
        <TextHoverEffect text="Shadway" />
      </section>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-hover-effect.tsx
import React, { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export const TextHoverEffect = ({
  text,
  duration,
  fontSize = 56, 
}: {
  text: string
  duration?: number
  fontSize?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const maskGradientRef = useRef(null)
  const animatedTextRef = useRef(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useGSAP(
    () => {
      gsap.fromTo(
        animatedTextRef.current,
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        {
          strokeDashoffset: 0,
          strokeDasharray: 1000,
          duration: 4,
          ease: "power2.inOut",
        }
      )
    },
    { scope: svgRef }
  )

  const updateCursorPosition = (x: number, y: number) => {
    if (svgRef.current && x !== null && y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((y - svgRect.top) / svgRect.height) * 100

      const newPosition = {
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      }

      setMaskPosition(newPosition)

      gsap.to(maskGradientRef.current, {
        attr: newPosition,
        duration: duration ?? 0,
        ease: "power2.out",
      })
    }
  }

  useEffect(() => {
    updateCursorPosition(cursor.x, cursor.y)
  }, [cursor, duration])

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault() 
    setHovered(true)
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      setCursor({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      setCursor({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    setHovered(false)
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="select-none"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="20%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>
        <radialGradient
          id="revealMask"
          ref={maskGradientRef}
          gradientUnits="userSpaceOnUse"
          r="25%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {[0, 1, 2].map((_, idx) => (
        <text
          key={idx}
          ref={idx === 1 ? animatedTextRef : undefined}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className={`fill-transparent font-[helvetica] font-bold ${
            idx === 0
              ? "stroke-neutral-200 dark:stroke-neutral-800"
              : idx === 1
                ? "stroke-neutral-200 dark:stroke-neutral-800"
                : ""
          }`}
          stroke={idx === 2 ? "url(#textGradient)" : undefined}
          mask={idx === 2 ? "url(#textMask)" : undefined}
          style={{
            fontSize,
            opacity: idx === 0 && !hovered ? 0 : idx === 0 ? 0.7 : 1,
          }}
        >
          {text}
        </text>
      ))}
    </svg>
  )
}
```

Install NPM dependencies:
```bash
@gsap/react, gsap
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
