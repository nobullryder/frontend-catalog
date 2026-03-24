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
marketing-badges.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Badge {
  id: string
  label: string
  color: string
  size: "sm" | "md" | "lg"
  rotation: number
  zIndex: number
  offsetX: number
  offsetY: number
}

const badges: Badge[] = [
  {
    id: "marketing",
    label: "marketing",
    color: "from-amber-300 to-yellow-400",
    size: "lg",
    rotation: -3,
    zIndex: 1,
    offsetX: -20,
    offsetY: -60,
  },
  {
    id: "seo",
    label: "SEO",
    color: "from-orange-400 to-orange-500",
    size: "sm",
    rotation: 2,
    zIndex: 2,
    offsetX: 60,
    offsetY: -35,
  },
  {
    id: "social-media",
    label: "social media",
    color: "from-amber-400 to-yellow-500",
    size: "lg",
    rotation: -2,
    zIndex: 3,
    offsetX: -30,
    offsetY: -15,
  },
  {
    id: "email-marketing",
    label: "email marketing",
    color: "from-pink-300 to-pink-400",
    size: "lg",
    rotation: 0,
    zIndex: 4,
    offsetX: 0,
    offsetY: 25,
  },
  {
    id: "conversions",
    label: "conversions",
    color: "from-blue-400 to-blue-500",
    size: "md",
    rotation: 3,
    zIndex: 5,
    offsetX: -15,
    offsetY: 65,
  },
  {
    id: "ads",
    label: "ads",
    color: "from-sky-300 to-sky-400",
    size: "sm",
    rotation: -1,
    zIndex: 6,
    offsetX: 50,
    offsetY: 90,
  },
]

const sizeClasses = {
  sm: "px-6 py-2.5 text-base",
  md: "px-8 py-3 text-lg",
  lg: "px-10 py-3.5 text-xl",
}

export function MarketingBadges() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [clickedId, setClickedId] = useState<string | null>(null)

  const handleClick = (id: string) => {
    setClickedId(clickedId === id ? null : id)
  }

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      {badges.map((badge) => {
        const isHovered = hoveredId === badge.id
        const isClicked = clickedId === badge.id
        const isOtherHovered = hoveredId !== null && hoveredId !== badge.id

        return (
          <div
            key={badge.id}
            className={cn(
              "absolute cursor-pointer select-none rounded-full font-semibold transition-all duration-500 ease-out",
              "bg-gradient-to-b shadow-lg",
              badge.color,
              sizeClasses[badge.size],
              "hover:shadow-2xl",
            )}
            style={{
              transform: `
                translate(${badge.offsetX}px, ${badge.offsetY}px) 
                rotate(${isHovered ? 0 : badge.rotation}deg)
                scale(${isClicked ? 1.15 : isHovered ? 1.08 : isOtherHovered ? 0.95 : 1})
                translateY(${isHovered ? -8 : 0}px)
              `,
              zIndex: isHovered || isClicked ? 100 : badge.zIndex,
              boxShadow: isHovered
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                : isClicked
                  ? "0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)"
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
            }}
            onMouseEnter={() => setHoveredId(badge.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(badge.id)}
          >
            <span
              className={cn(
                "relative block transition-transform duration-300",
                "text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]",
              )}
              style={{
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {badge.label}
            </span>
            {/* Inner highlight effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}


code.demo.1765705891884.tsx
import { MarketingBadges } from "@/components/ui/marketing-badges"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      <MarketingBadges />
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/marketing-badges.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Badge {
  id: string
  label: string
  color: string
  size: "sm" | "md" | "lg"
  rotation: number
  zIndex: number
  offsetX: number
  offsetY: number
}

const badges: Badge[] = [
  {
    id: "marketing",
    label: "marketing",
    color: "from-amber-300 to-yellow-400",
    size: "lg",
    rotation: -3,
    zIndex: 1,
    offsetX: -20,
    offsetY: -60,
  },
  {
    id: "seo",
    label: "SEO",
    color: "from-orange-400 to-orange-500",
    size: "sm",
    rotation: 2,
    zIndex: 2,
    offsetX: 60,
    offsetY: -35,
  },
  {
    id: "social-media",
    label: "social media",
    color: "from-amber-400 to-yellow-500",
    size: "lg",
    rotation: -2,
    zIndex: 3,
    offsetX: -30,
    offsetY: -15,
  },
  {
    id: "email-marketing",
    label: "email marketing",
    color: "from-pink-300 to-pink-400",
    size: "lg",
    rotation: 0,
    zIndex: 4,
    offsetX: 0,
    offsetY: 25,
  },
  {
    id: "conversions",
    label: "conversions",
    color: "from-blue-400 to-blue-500",
    size: "md",
    rotation: 3,
    zIndex: 5,
    offsetX: -15,
    offsetY: 65,
  },
  {
    id: "ads",
    label: "ads",
    color: "from-sky-300 to-sky-400",
    size: "sm",
    rotation: -1,
    zIndex: 6,
    offsetX: 50,
    offsetY: 90,
  },
]

const sizeClasses = {
  sm: "px-6 py-2.5 text-base",
  md: "px-8 py-3 text-lg",
  lg: "px-10 py-3.5 text-xl",
}

export function MarketingBadges() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [clickedId, setClickedId] = useState<string | null>(null)

  const handleClick = (id: string) => {
    setClickedId(clickedId === id ? null : id)
  }

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      {badges.map((badge) => {
        const isHovered = hoveredId === badge.id
        const isClicked = clickedId === badge.id
        const isOtherHovered = hoveredId !== null && hoveredId !== badge.id

        return (
          <div
            key={badge.id}
            className={cn(
              "absolute cursor-pointer select-none rounded-full font-semibold transition-all duration-500 ease-out",
              "bg-gradient-to-b shadow-lg",
              badge.color,
              sizeClasses[badge.size],
              "hover:shadow-2xl",
            )}
            style={{
              transform: `
                translate(${badge.offsetX}px, ${badge.offsetY}px) 
                rotate(${isHovered ? 0 : badge.rotation}deg)
                scale(${isClicked ? 1.15 : isHovered ? 1.08 : isOtherHovered ? 0.95 : 1})
                translateY(${isHovered ? -8 : 0}px)
              `,
              zIndex: isHovered || isClicked ? 100 : badge.zIndex,
              boxShadow: isHovered
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                : isClicked
                  ? "0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)"
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
            }}
            onMouseEnter={() => setHoveredId(badge.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleClick(badge.id)}
          >
            <span
              className={cn(
                "relative block transition-transform duration-300",
                "text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]",
              )}
              style={{
                transform: isHovered ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              {badge.label}
            </span>
            {/* Inner highlight effect */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
              }}
            />
          </div>
        )
      })}
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
