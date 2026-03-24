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
podcast-card-player.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PodcastCardPlayerProps {
  imageSrc: string
  title: string
  episode: string
  audioSrc: string
  width?: number
  className?: string
}

export default function PodcastCardPlayer({
  imageSrc,
  title,
  episode,
  audioSrc,
  width = 350,
  className,
}: PodcastCardPlayerProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)

  React.useEffect(() => {
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
      setCurrentTime(audio.currentTime)
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 gap-3",
        className
      )}
      style={{ width }}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">{episode}</p>
      </div>

      {/* Waveform/Progress */}
      <div
        className="relative w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-black dark:bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center w-full">
        <Button
          onClick={togglePlay}
          className="text-sm px-3 py-1"
          variant="outline"
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <span className="text-xs text-gray-500 dark:text-gray-300">
          {formatTime(currentTime)} / {formatTime(audio.duration || 0)}
        </span>
      </div>
    </div>
  )
}


code.demo.1758696318435.tsx
"use client"

import PodcastCardPlayer from "@/components/ui/podcast-card-player"

export default function PodcastCardPlayerDemo() {
  const podcasts = [
    {
      imageSrc: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&h=200",
      title: "Health & Wellness",
      episodeInfo: "Episode 45: Mindfulness Tips",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?fit=crop&w=400&h=200",
      title: "Startup Stories",
      episodeInfo: "Episode 78: Scaling Fast",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ]

  return (
    <div className="p-6 flex flex-wrap gap-6 justify-center">
      {podcasts.map((p, idx) => (
        <PodcastCardPlayer
          key={idx}
          imageSrc={p.imageSrc}
          title={p.title}
          episodeInfo={p.episodeInfo}
          audioSrc={p.audioSrc}
          width={320}
        />
      ))}
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/podcast-card-player.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PodcastCardPlayerProps {
  imageSrc: string
  title: string
  episode: string
  audioSrc: string
  width?: number
  className?: string
}

export default function PodcastCardPlayer({
  imageSrc,
  title,
  episode,
  audioSrc,
  width = 350,
  className,
}: PodcastCardPlayerProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)

  React.useEffect(() => {
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
      setCurrentTime(audio.currentTime)
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 gap-3",
        className
      )}
      style={{ width }}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">{episode}</p>
      </div>

      {/* Waveform/Progress */}
      <div
        className="relative w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-black dark:bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center w-full">
        <Button
          onClick={togglePlay}
          className="text-sm px-3 py-1"
          variant="outline"
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <span className="text-xs text-gray-500 dark:text-gray-300">
          {formatTime(currentTime)} / {formatTime(audio.duration || 0)}
        </span>
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
