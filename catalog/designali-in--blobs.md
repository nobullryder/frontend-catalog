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
blobs.tsx
"use client"

import type React from "react"

export function AnimatedBlobs() {
  const blobStyle = {
    "--border-radius": "115% 140% 145% 110% / 125% 140% 110% 125%",
    "--border-width": "5vmin",
    aspectRatio: "1",
    display: "block",
    gridArea: "stack",
    backgroundSize: "calc(100% + var(--border-width) * 2)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "var(--border-width) solid transparent",
    borderRadius: "var(--border-radius)",
    maskImage: "linear-gradient(transparent, transparent), linear-gradient(black, white)",
    maskClip: "padding-box, border-box",
    maskComposite: "intersect",
    mixBlendMode: "screen" as const,
    height: "80vmin",
    filter: "blur(1vmin)",
  } as React.CSSProperties

  const blobs = [
    {
      backgroundColor: "#0074D9",
      backgroundImage: "linear-gradient(#0074D9, #39CCCC, #0074D9)",
      transform: "rotate(30deg) scale(1.03)",
    },
    {
      backgroundColor: "#FF4136",
      backgroundImage: "linear-gradient(#FF4136, #FF851B, #FF4136)",
      transform: "rotate(60deg) scale(0.95)",
    },
    {
      backgroundColor: "#3D9970",
      backgroundImage: "linear-gradient(#3D9970, #01FF70, #3D9970)",
      transform: "rotate(90deg) scale(0.97)",
    },
    {
      backgroundColor: "#B10DC9",
      backgroundImage: "linear-gradient(#B10DC9, #85144B, #B10DC9)",
      transform: "rotate(120deg) scale(1.02)",
    },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
     <span className="absolute pointer-events-none z-10 text-center text-9xl leading-none font-semibold tracking-tighter whitespace-pre-wrap">
        Blobs
      </span>
      <div className="grid" style={{ gridTemplateAreas: "'stack'" }}>
        <div
          className="grid relative"
          style={{
            gridTemplateAreas: "'stack'",
            gridArea: "stack",
            animation: "spin 5s linear infinite",
          }}
        >
          {blobs.map((blob, index) => (
            <span
              key={index}
              style={{
                ...blobStyle,
                ...blob,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}


code.demo.1755355849814.tsx
import { AnimatedBlobs } from "@/components/ui/blobs";

export default function DemoOne() {
  return <AnimatedBlobs />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/blobs.tsx
"use client"

import type React from "react"

export function AnimatedBlobs() {
  const blobStyle = {
    "--border-radius": "115% 140% 145% 110% / 125% 140% 110% 125%",
    "--border-width": "5vmin",
    aspectRatio: "1",
    display: "block",
    gridArea: "stack",
    backgroundSize: "calc(100% + var(--border-width) * 2)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "var(--border-width) solid transparent",
    borderRadius: "var(--border-radius)",
    maskImage: "linear-gradient(transparent, transparent), linear-gradient(black, white)",
    maskClip: "padding-box, border-box",
    maskComposite: "intersect",
    mixBlendMode: "screen" as const,
    height: "80vmin",
    filter: "blur(1vmin)",
  } as React.CSSProperties

  const blobs = [
    {
      backgroundColor: "#0074D9",
      backgroundImage: "linear-gradient(#0074D9, #39CCCC, #0074D9)",
      transform: "rotate(30deg) scale(1.03)",
    },
    {
      backgroundColor: "#FF4136",
      backgroundImage: "linear-gradient(#FF4136, #FF851B, #FF4136)",
      transform: "rotate(60deg) scale(0.95)",
    },
    {
      backgroundColor: "#3D9970",
      backgroundImage: "linear-gradient(#3D9970, #01FF70, #3D9970)",
      transform: "rotate(90deg) scale(0.97)",
    },
    {
      backgroundColor: "#B10DC9",
      backgroundImage: "linear-gradient(#B10DC9, #85144B, #B10DC9)",
      transform: "rotate(120deg) scale(1.02)",
    },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
     <span className="absolute pointer-events-none z-10 text-center text-9xl leading-none font-semibold tracking-tighter whitespace-pre-wrap">
        Blobs
      </span>
      <div className="grid" style={{ gridTemplateAreas: "'stack'" }}>
        <div
          className="grid relative"
          style={{
            gridTemplateAreas: "'stack'",
            gridArea: "stack",
            animation: "spin 5s linear infinite",
          }}
        >
          {blobs.map((blob, index) => (
            <span
              key={index}
              style={{
                ...blobStyle,
                ...blob,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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
