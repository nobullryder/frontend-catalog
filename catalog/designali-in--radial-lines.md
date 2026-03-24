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
radial-lines.tsx
import type React from "react"
interface RadialLinesProps {
  /** Number of lines to render (default: 180) */
  lineCount?: number
  /** Color of the lines (default: '#000000') */
  lineColor?: string
  /** Thickness of each line in pixels (default: 1) */
  lineThickness?: number
  /** Width of each line as percentage (default: 200) */
  lineWidth?: number
  /** Left offset as percentage (default: -50) */
  leftOffset?: number
  /** Opacity of the lines (default: 1) */
  opacity?: number
  /** Container width (default: '100vw') */
  containerWidth?: string
  /** Container height (default: '100vh') */
  containerHeight?: string
  /** Background color of container (default: 'transparent') */
  backgroundColor?: string
  /** Starting rotation angle in degrees (default: 1) */
  startAngle?: number
  /** Ending rotation angle in degrees (default: 181) */
  endAngle?: number
}

export function RadialLines({
  lineCount = 180,
  lineColor = "#000000",
  lineThickness = 1,
  lineWidth = 200,
  leftOffset = -50,
  opacity = 1,
  containerWidth = "100vw",
  containerHeight = "100vh",
  backgroundColor = "transparent",
  startAngle = 1,
  endAngle = 181,
}: RadialLinesProps) {
  // Calculate the step between angles
  const angleStep = (endAngle - startAngle) / (lineCount - 1)

  // Generate array of angles
  const angles = Array.from({ length: lineCount }, (_, i) => startAngle + i * angleStep)

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: containerWidth,
    height: containerHeight,
    overflow: "hidden",
    backgroundColor: backgroundColor,
  }

  const lineStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: `${leftOffset}%`,
    width: `${lineWidth}%`,
    height: `${lineThickness}px`,
    backgroundColor: lineColor,
    opacity: opacity,
    transformOrigin: "center center",
    border: "none",
    margin: 0,
    padding: 0,
  }

  return (
    <div style={containerStyle}>
      {angles.map((angle, index) => (
        <hr
          key={index}
          style={{
            ...lineStyle,
            transform: `rotate(${angle}deg)`,
          }}
        />
      ))}
    </div>
  )
}


code.demo.1755706636100.tsx
import { RadialLines } from "@/components/ui/radial-lines";

export default function DemoOne() {
  return ( 
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-lime-700">
      <RadialLines 
        lineCount={100}
        lineColor="#fff200"
        lineThickness={1}
        opacity={1} 
      />
      <span className="absolute pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Radial Lines
      </span>
    </div>  
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radial-lines.tsx
import type React from "react"
interface RadialLinesProps {
  /** Number of lines to render (default: 180) */
  lineCount?: number
  /** Color of the lines (default: '#000000') */
  lineColor?: string
  /** Thickness of each line in pixels (default: 1) */
  lineThickness?: number
  /** Width of each line as percentage (default: 200) */
  lineWidth?: number
  /** Left offset as percentage (default: -50) */
  leftOffset?: number
  /** Opacity of the lines (default: 1) */
  opacity?: number
  /** Container width (default: '100vw') */
  containerWidth?: string
  /** Container height (default: '100vh') */
  containerHeight?: string
  /** Background color of container (default: 'transparent') */
  backgroundColor?: string
  /** Starting rotation angle in degrees (default: 1) */
  startAngle?: number
  /** Ending rotation angle in degrees (default: 181) */
  endAngle?: number
}

export function RadialLines({
  lineCount = 180,
  lineColor = "#000000",
  lineThickness = 1,
  lineWidth = 200,
  leftOffset = -50,
  opacity = 1,
  containerWidth = "100vw",
  containerHeight = "100vh",
  backgroundColor = "transparent",
  startAngle = 1,
  endAngle = 181,
}: RadialLinesProps) {
  // Calculate the step between angles
  const angleStep = (endAngle - startAngle) / (lineCount - 1)

  // Generate array of angles
  const angles = Array.from({ length: lineCount }, (_, i) => startAngle + i * angleStep)

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: containerWidth,
    height: containerHeight,
    overflow: "hidden",
    backgroundColor: backgroundColor,
  }

  const lineStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: `${leftOffset}%`,
    width: `${lineWidth}%`,
    height: `${lineThickness}px`,
    backgroundColor: lineColor,
    opacity: opacity,
    transformOrigin: "center center",
    border: "none",
    margin: 0,
    padding: 0,
  }

  return (
    <div style={containerStyle}>
      {angles.map((angle, index) => (
        <hr
          key={index}
          style={{
            ...lineStyle,
            transform: `rotate(${angle}deg)`,
          }}
        />
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
