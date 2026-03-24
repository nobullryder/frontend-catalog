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
visualizer-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VisualizerButtonProps {
  audioSrc: string
  width?: number
  height?: number
  className?: string
}

export default function VisualizerButton({
  audioSrc,
  width = 60,
  height = 30,
  className,
}: VisualizerButtonProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [levels, setLevels] = React.useState<number[]>(Array(5).fill(0))

  React.useEffect(() => {
    let interval: NodeJS.Timer
    if (isPlaying) {
      interval = setInterval(() => {
        setLevels(levels.map(() => Math.random() * height))
      }, 150)
    } else {
      setLevels(Array(5).fill(0))
    }
    return () => clearInterval(interval)
  }, [isPlaying, height])

  const togglePlay = () => {
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  return (
    <Button
      className={cn(
        "relative flex items-end justify-between px-2 py-1",
        className
      )}
      onClick={togglePlay}
      variant="outline"
      style={{ width, height }}
    >
      {levels.map((lvl, idx) => (
        <div
          key={idx}
          className="bg-blue-500 dark:bg-white rounded-sm transition-all duration-150"
          style={{ width: 4, height: `${lvl}px` }}
        />
      ))}
    </Button>
  )
}


code.demo.1758700165853.tsx
"use client"

import VisualizerButton from "@/components/ui/visualizer-button"

export default function DemoVisualizer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h2 className="text-xl font-semibold">Visualizer Button Demo</h2>

      <VisualizerButton
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // put a valid mp3 file in public folder
        label="Play Track"
        barCount={20}
        maxHeight={30}
        width={140}
      />

      <VisualizerButton
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        label="Track 2"
        barCount={15}
        maxHeight={25}
        width={120}
      />

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Click the buttons to play/pause and see live waveform animation.
      </p>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/visualizer-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VisualizerButtonProps {
  audioSrc: string
  width?: number
  height?: number
  className?: string
}

export default function VisualizerButton({
  audioSrc,
  width = 60,
  height = 30,
  className,
}: VisualizerButtonProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [levels, setLevels] = React.useState<number[]>(Array(5).fill(0))

  React.useEffect(() => {
    let interval: NodeJS.Timer
    if (isPlaying) {
      interval = setInterval(() => {
        setLevels(levels.map(() => Math.random() * height))
      }, 150)
    } else {
      setLevels(Array(5).fill(0))
    }
    return () => clearInterval(interval)
  }, [isPlaying, height])

  const togglePlay = () => {
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  return (
    <Button
      className={cn(
        "relative flex items-end justify-between px-2 py-1",
        className
      )}
      onClick={togglePlay}
      variant="outline"
      style={{ width, height }}
    >
      {levels.map((lvl, idx) => (
        <div
          key={idx}
          className="bg-blue-500 dark:bg-white rounded-sm transition-all duration-150"
          style={{ width: 4, height: `${lvl}px` }}
        />
      ))}
    </Button>
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
