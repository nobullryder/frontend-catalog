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
rainbow-text-effect.tsx
"use client"

import { useEffect, useState } from "react"

interface RainbowTextEffectProps {
  text?: string
  className?: string
  fontSize?: string
}

export function RainbowTextEffect({ fontSize = 20, text = "design", className = "" }: RainbowTextEffectProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 400)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const desktopTextShadow = `
    2px 10px #FFD20E, 2px 12px #000, 
    4px 20px #E5BC08, 4px 22px #000, 
    6px 30px #EC8401, 6px 32px #000, 
    8px 40px #E65C04, 8px 42px #000, 
    10px 50px #E52E06, 10px 52px #000, 
    12px 60px #DE006B, 12px 62px #000, 
    14px 70px #CA039E, 14px 72px #000, 
    16px 80px #A203CB, 16px 82px #000, 
    18px 90px #6D01C9, 18px 92px #000, 
    20px 100px #22008F, 20px 102px #000,
    22px 110px #062F9A, 22px 112px #000,
    24px 120px #0045AC, 24px 122px #000,
    26px 130px #007DB2, 26px 132px #000, 
    28px 140px #00B8D9, 28px 142px #000
  `

  const mobileStyles = {
    textShadow: "none",
    background: "linear-gradient(to bottom, #FFD20E, #EC8401, #E65C04)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    lineHeight: "130%",
  }

  const desktopStyles = {
    color: "white",
    WebkitTextStroke: "1px #000",
    textStroke: "1px #000",
    textShadow: desktopTextShadow,
    lineHeight: "100%",
  }

  const baseStyles = {
    fontFamily: "'Open Sans', sans-serif",
    fontStyle: "italic" as const,
    fontSize: `${fontSize}vw`,
    fontWeight: 600,
    textTransform: "lowercase" as const,
    wordBreak: "break-all" as const,
    margin: 0,
    padding: 0,
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap" rel="stylesheet" />
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Open Sans', sans-serif",
        }}
        className={className}
      >
        <p
          style={{
            ...baseStyles,
            ...(isMobile ? mobileStyles : desktopStyles),
          }}
        >
          {text}
        </p>
      </div>
    </>
  )
}


code.demo.1755580966880.tsx
import { RainbowTextEffect } from "@/components/ui/rainbow-text-effect";

export default function DemoOne() {
  return (
    <div className="-space-y-12">
      <RainbowTextEffect text="cool" />
       <RainbowTextEffect fontSize={22} text="designs" />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/rainbow-text-effect.tsx
"use client"

import { useEffect, useState } from "react"

interface RainbowTextEffectProps {
  text?: string
  className?: string
  fontSize?: string
}

export function RainbowTextEffect({ fontSize = 20, text = "design", className = "" }: RainbowTextEffectProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 400)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const desktopTextShadow = `
    2px 10px #FFD20E, 2px 12px #000, 
    4px 20px #E5BC08, 4px 22px #000, 
    6px 30px #EC8401, 6px 32px #000, 
    8px 40px #E65C04, 8px 42px #000, 
    10px 50px #E52E06, 10px 52px #000, 
    12px 60px #DE006B, 12px 62px #000, 
    14px 70px #CA039E, 14px 72px #000, 
    16px 80px #A203CB, 16px 82px #000, 
    18px 90px #6D01C9, 18px 92px #000, 
    20px 100px #22008F, 20px 102px #000,
    22px 110px #062F9A, 22px 112px #000,
    24px 120px #0045AC, 24px 122px #000,
    26px 130px #007DB2, 26px 132px #000, 
    28px 140px #00B8D9, 28px 142px #000
  `

  const mobileStyles = {
    textShadow: "none",
    background: "linear-gradient(to bottom, #FFD20E, #EC8401, #E65C04)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    lineHeight: "130%",
  }

  const desktopStyles = {
    color: "white",
    WebkitTextStroke: "1px #000",
    textStroke: "1px #000",
    textShadow: desktopTextShadow,
    lineHeight: "100%",
  }

  const baseStyles = {
    fontFamily: "'Open Sans', sans-serif",
    fontStyle: "italic" as const,
    fontSize: `${fontSize}vw`,
    fontWeight: 600,
    textTransform: "lowercase" as const,
    wordBreak: "break-all" as const,
    margin: 0,
    padding: 0,
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap" rel="stylesheet" />
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Open Sans', sans-serif",
        }}
        className={className}
      >
        <p
          style={{
            ...baseStyles,
            ...(isMobile ? mobileStyles : desktopStyles),
          }}
        >
          {text}
        </p>
      </div>
    </>
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
