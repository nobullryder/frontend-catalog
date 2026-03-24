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
waveform-player.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WaveformPlayerProps {
  audioSrc: string
  width?: number
  height?: number
  className?: string
}

export default function WaveformPlayer({
  audioSrc,
  width = 400,
  height = 60,
  className,
}: WaveformPlayerProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.pause()
    }
  }, [audio])

  const togglePlay = () => {
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const seekTime = (clickX / rect.width) * audio.duration
    audio.currentTime = seekTime
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="relative w-full rounded-md cursor-pointer overflow-hidden"
        style={{ width, height }}
        onClick={handleSeek}
      >
        {/* Background wave */}
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {Array.from({ length: 40 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-sm bg-black dark:bg-white"
              style={{
                width: 2,
                height: `${10 + Math.random() * (height - 20)}px`,
              }}
            />
          ))}
        </div>

        {/* Progress overlay */}
        <div
          className="absolute top-0 left-0 h-full rounded-md bg-black dark:bg-white"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <Button
        onClick={togglePlay}
        className="w-20 text-sm px-2 py-1"
        variant="outline"
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </div>
  )
}


code.demo.1758695004441.tsx
"use client"

import WaveformPlayer from "@/components/ui/waveform-player"

export default function DemoWaveformPlayer() {
  return (
    <div className="flex items-center justify-center">
      <WaveformPlayer audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        // width={360}
        // height={50}
        // className="rounded-xl shadow-md"
       />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/waveform-player.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WaveformPlayerProps {
  audioSrc: string
  width?: number
  height?: number
  className?: string
}

export default function WaveformPlayer({
  audioSrc,
  width = 400,
  height = 60,
  className,
}: WaveformPlayerProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.pause()
    }
  }, [audio])

  const togglePlay = () => {
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const seekTime = (clickX / rect.width) * audio.duration
    audio.currentTime = seekTime
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="relative w-full rounded-md cursor-pointer overflow-hidden"
        style={{ width, height }}
        onClick={handleSeek}
      >
        {/* Background wave */}
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {Array.from({ length: 40 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-sm bg-black dark:bg-white"
              style={{
                width: 2,
                height: `${10 + Math.random() * (height - 20)}px`,
              }}
            />
          ))}
        </div>

        {/* Progress overlay */}
        <div
          className="absolute top-0 left-0 h-full rounded-md bg-black dark:bg-white"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <Button
        onClick={togglePlay}
        className="w-20 text-sm px-2 py-1"
        variant="outline"
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>
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
