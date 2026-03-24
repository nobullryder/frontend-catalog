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
audio-book-player.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface AudioBookPlayerProps {
  audioSrc?: string
  chapterTitle?: string
  author?: string
  className?: string
}

export default function AudioBookPlayer({
  audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  chapterTitle = "Chapter 1: The Beginning",
  author = "John Doe",
  className,
}: AudioBookPlayerProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [speed, setSpeed] = React.useState(1)

  React.useEffect(() => {
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", updateProgress)
    }
  }, [audio])

  const togglePlay = () => {
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number) => {
    audio.currentTime = (value / 100) * audio.duration
    setProgress(value)
  }

  const changeSpeed = () => {
    const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1
    audio.playbackRate = nextSpeed
    setSpeed(nextSpeed)
  }

  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 -translate-x-1/2 border dark:border-gray-700 shadow-lg rounded-xl p-4 flex flex-col gap-3 w-[350px]",
      className
    )}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{chapterTitle}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{author}</p>
        </div>
        <Button size="sm" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>

      <Slider
        value={[progress]}
        onValueChange={(val) => handleSeek(val[0])}
      />

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">{progress.toFixed(0)}%</span>
        <Button size="sm" onClick={changeSpeed}>{speed}x</Button>
      </div>
    </div>
  )
}


code.demo.1758699867233.tsx
"use client"

import AudioBookPlayer from "@/components/ui/audio-book-player"

export default function DemoAudioBook() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AudioBookPlayer
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        chapterTitle="Chapter 2: The Journey Continues"
        author="Jane Smith"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/audio-book-player.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface AudioBookPlayerProps {
  audioSrc?: string
  chapterTitle?: string
  author?: string
  className?: string
}

export default function AudioBookPlayer({
  audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  chapterTitle = "Chapter 1: The Beginning",
  author = "John Doe",
  className,
}: AudioBookPlayerProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [speed, setSpeed] = React.useState(1)

  React.useEffect(() => {
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", updateProgress)
    }
  }, [audio])

  const togglePlay = () => {
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number) => {
    audio.currentTime = (value / 100) * audio.duration
    setProgress(value)
  }

  const changeSpeed = () => {
    const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1
    audio.playbackRate = nextSpeed
    setSpeed(nextSpeed)
  }

  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 -translate-x-1/2 border dark:border-gray-700 shadow-lg rounded-xl p-4 flex flex-col gap-3 w-[350px]",
      className
    )}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{chapterTitle}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{author}</p>
        </div>
        <Button size="sm" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>

      <Slider
        value={[progress]}
        onValueChange={(val) => handleSeek(val[0])}
      />

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">{progress.toFixed(0)}%</span>
        <Button size="sm" onClick={changeSpeed}>{speed}x</Button>
      </div>
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
