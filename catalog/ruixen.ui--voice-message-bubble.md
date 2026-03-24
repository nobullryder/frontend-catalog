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
voice-message-bubble.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceMessageBubbleProps {
  audioSrc: string
  duration: number // in seconds
  bubbleColor?: string
  waveColor?: string
  className?: string
}

export default function VoiceMessageBubble({
  audioSrc,
  duration,
  bubbleColor = "#fff",
  waveColor = "#000",
  className,
}: VoiceMessageBubbleProps) {
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

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl shadow-sm",
        className
      )}
      style={{ backgroundColor: bubbleColor }}
    >
      {/* Play/Pause Button */}
      <Button
        variant="outline"
        className="p-2 rounded-full"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>

      {/* Waveform */}
      <div className="flex-1 h-6 relative cursor-pointer" onClick={(e) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect()
        const clickX = e.clientX - rect.left
        audio.currentTime = (clickX / rect.width) * audio.duration
      }}>
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {Array.from({ length: 30 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-sm"
              style={{
                width: 2,
                height: `${4 + Math.random() * 12}px`,
                backgroundColor: waveColor,
              }}
            />
          ))}
        </div>

        {/* Progress Overlay */}
        <div
          className="absolute top-0 left-0 h-full rounded-sm"
          style={{
            width: `${progress}%`,
            backgroundColor: waveColor,
            opacity: 0.3,
          }}
        />
      </div>

      {/* Duration */}
      <span className={cn("text-sm font-mono", waveColor === "#fff" ? "text-white" : "text-black")}>
        {duration}s
      </span>
    </div>
  )
}


code.demo.1758700533572.tsx
"use client"

import * as React from "react"
import VoiceMessageBubble from "@/components/ui/voice-message-bubble"

export default function DemoVoiceMessageBubble() {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
        Voice Message Bubble Demo
      </h2>

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        duration={15}
        bubbleColor="#fff"
        waveColor="#000"
      />

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        duration={10}
        bubbleColor="#000"
        waveColor="#fff"
      />

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        duration={20}
        bubbleColor="#fff"
        waveColor="#000"
      />

      <VoiceMessageBubble
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        duration={12}
        bubbleColor="#000"
        waveColor="#fff"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/voice-message-bubble.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceMessageBubbleProps {
  audioSrc: string
  duration: number // in seconds
  bubbleColor?: string
  waveColor?: string
  className?: string
}

export default function VoiceMessageBubble({
  audioSrc,
  duration,
  bubbleColor = "#fff",
  waveColor = "#000",
  className,
}: VoiceMessageBubbleProps) {
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

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl shadow-sm",
        className
      )}
      style={{ backgroundColor: bubbleColor }}
    >
      {/* Play/Pause Button */}
      <Button
        variant="outline"
        className="p-2 rounded-full"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>

      {/* Waveform */}
      <div className="flex-1 h-6 relative cursor-pointer" onClick={(e) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect()
        const clickX = e.clientX - rect.left
        audio.currentTime = (clickX / rect.width) * audio.duration
      }}>
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {Array.from({ length: 30 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-sm"
              style={{
                width: 2,
                height: `${4 + Math.random() * 12}px`,
                backgroundColor: waveColor,
              }}
            />
          ))}
        </div>

        {/* Progress Overlay */}
        <div
          className="absolute top-0 left-0 h-full rounded-sm"
          style={{
            width: `${progress}%`,
            backgroundColor: waveColor,
            opacity: 0.3,
          }}
        />
      </div>

      {/* Duration */}
      <span className={cn("text-sm font-mono", waveColor === "#fff" ? "text-white" : "text-black")}>
        {duration}s
      </span>
    </div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react
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
