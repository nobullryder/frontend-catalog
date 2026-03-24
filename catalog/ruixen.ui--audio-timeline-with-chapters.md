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
audio-timeline-with-chapters.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Chapter {
  time: number // in seconds
  label: string
}

interface AudioTimelineWithChaptersProps {
  audioSrc: string
  chapters: Chapter[]
  width?: number
  className?: string
}

export default function AudioTimelineWithChapters({
  audioSrc,
  chapters,
  width = 400,
  className,
}: AudioTimelineWithChaptersProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [progress, setProgress] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [duration, setDuration] = React.useState<number>(0)

  React.useEffect(() => {
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.pause()
    }
  }, [audio])

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const jumpToChapter = (time: number) => {
    audio.currentTime = time
    if (!isPlaying) audio.play()
    setIsPlaying(true)
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Timeline */}
      <div
        className="relative w-full h-3 bg-gray-200 dark:bg-gray-700  cursor-pointer"
        style={{ width }}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-white"
          style={{ width: `${progress}%` }}
        />
        {/* Chapters (visible immediately after metadata loads) */}
        {duration > 0 &&
          chapters.map((ch, idx) => (
            <div
              key={idx}
              className="absolute top-0 w-1 h-3 bg-blue-300 cursor-pointer"
              style={{ left: `${(ch.time / duration) * 100}%` }}
              onClick={() => jumpToChapter(ch.time)}
              title={ch.label}
            />
          ))}
      </div>

      {/* Play/Pause */}
      <Button
        className="w-20 text-sm px-2 py-1"
        variant="outline"
        onClick={togglePlay}
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>

      {/* Chapters List */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {chapters.map((ch, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="outline"
            onClick={() => jumpToChapter(ch.time)}
          >
            {ch.label}
          </Button>
        ))}
      </div>
    </div>
  )
}


code.demo.1758703589868.tsx
"use client"

import AudioTimelineWithChapters, { Chapter } from "@/components/ui/audio-timeline-with-chapters"

export default function DemoAudioTimelineWithChapters() {
  const chapters: Chapter[] = [
    { time: 0, label: "Intro" },
    { time: 15, label: "Chapter 1" },
    { time: 30, label: "Chapter 2" },
    { time: 45, label: "Chapter 3" },
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-black dark:text-white">Podcast Player with Chapters</h2>
      <AudioTimelineWithChapters
        audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        chapters={chapters}
        width={500}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/audio-timeline-with-chapters.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Chapter {
  time: number // in seconds
  label: string
}

interface AudioTimelineWithChaptersProps {
  audioSrc: string
  chapters: Chapter[]
  width?: number
  className?: string
}

export default function AudioTimelineWithChapters({
  audioSrc,
  chapters,
  width = 400,
  className,
}: AudioTimelineWithChaptersProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [progress, setProgress] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [duration, setDuration] = React.useState<number>(0)

  React.useEffect(() => {
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.pause()
    }
  }, [audio])

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const jumpToChapter = (time: number) => {
    audio.currentTime = time
    if (!isPlaying) audio.play()
    setIsPlaying(true)
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Timeline */}
      <div
        className="relative w-full h-3 bg-gray-200 dark:bg-gray-700  cursor-pointer"
        style={{ width }}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-white"
          style={{ width: `${progress}%` }}
        />
        {/* Chapters (visible immediately after metadata loads) */}
        {duration > 0 &&
          chapters.map((ch, idx) => (
            <div
              key={idx}
              className="absolute top-0 w-1 h-3 bg-blue-300 cursor-pointer"
              style={{ left: `${(ch.time / duration) * 100}%` }}
              onClick={() => jumpToChapter(ch.time)}
              title={ch.label}
            />
          ))}
      </div>

      {/* Play/Pause */}
      <Button
        className="w-20 text-sm px-2 py-1"
        variant="outline"
        onClick={togglePlay}
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>

      {/* Chapters List */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {chapters.map((ch, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="outline"
            onClick={() => jumpToChapter(ch.time)}
          >
            {ch.label}
          </Button>
        ))}
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
