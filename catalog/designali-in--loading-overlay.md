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
loading-overlay.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface LoadingOverlayProps {
  onComplete?: () => void
  children?: React.ReactNode
}

export function LoadingOverlay({ onComplete, children }: LoadingOverlayProps) {
  const [percentage, setPercentage] = useState(0)
  const [isClipping, setIsClipping] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Animate percentage from 0 to 100 over 2 seconds
    const duration = 2000
    const startTime = Date.now()

    const animatePercentage = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentPercentage = Math.round(progress * 100)

      setPercentage(currentPercentage)

      if (progress < 1) {
        requestAnimationFrame(animatePercentage)
      } else {
        // Start clipping animation after percentage reaches 100%
        setTimeout(() => {
          setIsClipping(true)

          // Show content and call onComplete after clip animation
          setTimeout(() => {
            setShowContent(true)
            onComplete?.()
          }, 400)
        }, 100)
      }
    }

    requestAnimationFrame(animatePercentage)
  }, [onComplete])

  return (
    <>
      {/* Loading Overlay */}
      <div
        style={{ 
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 11,
          clipPath: isClipping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
          pointerEvents: isClipping ? "none" : "auto",
          transition: "clip-path 0.4s ease-in-out",
        }}
      >
        {/* Percentage Counter */}
        <div
          style={{
            position: "absolute",
            right: "clamp(1rem, 2vw, 3rem)",
            bottom: "clamp(1rem, 2vw, 3rem)", 
            fontSize: "clamp(3rem, 8vw, 12rem)", 
          }}
        >
          {percentage}%
        </div>
      </div>

      {/* Page Content */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(100px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {children}
      </div>
    </>
  )
}


code.demo.1755533080748.tsx
"use client"

import { useState } from "react"

import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function DemoOne() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  return (
    <div className="">
      <LoadingOverlay onComplete={() => setLoadingComplete(true)}>
        <section className="page-header p-4">
          <h1 className="text-9xl font-bold text-center">Hey</h1>
        </section>

        <main className="p-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-primary/60 text-center">
              Welcome to your app! The loading animation is complete.
            </p>
          </div>
        </main>
      </LoadingOverlay>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loading-overlay.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface LoadingOverlayProps {
  onComplete?: () => void
  children?: React.ReactNode
}

export function LoadingOverlay({ onComplete, children }: LoadingOverlayProps) {
  const [percentage, setPercentage] = useState(0)
  const [isClipping, setIsClipping] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Animate percentage from 0 to 100 over 2 seconds
    const duration = 2000
    const startTime = Date.now()

    const animatePercentage = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentPercentage = Math.round(progress * 100)

      setPercentage(currentPercentage)

      if (progress < 1) {
        requestAnimationFrame(animatePercentage)
      } else {
        // Start clipping animation after percentage reaches 100%
        setTimeout(() => {
          setIsClipping(true)

          // Show content and call onComplete after clip animation
          setTimeout(() => {
            setShowContent(true)
            onComplete?.()
          }, 400)
        }, 100)
      }
    }

    requestAnimationFrame(animatePercentage)
  }, [onComplete])

  return (
    <>
      {/* Loading Overlay */}
      <div
        style={{ 
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 11,
          clipPath: isClipping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
          pointerEvents: isClipping ? "none" : "auto",
          transition: "clip-path 0.4s ease-in-out",
        }}
      >
        {/* Percentage Counter */}
        <div
          style={{
            position: "absolute",
            right: "clamp(1rem, 2vw, 3rem)",
            bottom: "clamp(1rem, 2vw, 3rem)", 
            fontSize: "clamp(3rem, 8vw, 12rem)", 
          }}
        >
          {percentage}%
        </div>
      </div>

      {/* Page Content */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(100px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {children}
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
