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
playlist-carousel.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucidePlay, LucidePause } from "lucide-react"

export interface PlaylistItem {
  id: string
  title: string
  duration: string
  image: string
  audioSrc: string
}

interface PlaylistCarouselProps {
  items: PlaylistItem[]
  width?: number
  height?: number
  className?: string
}

export default function PlaylistCarousel({
  items,
  width = 200,
  height = 250,
  className,
}: PlaylistCarouselProps) {
  const [playingId, setPlayingId] = React.useState<string | null>(null)
  const [progressMap, setProgressMap] = React.useState<Record<string, number>>({})
  const [audioMap] = React.useState<Record<string, HTMLAudioElement>>(
    items.reduce((acc, item) => {
      acc[item.id] = new Audio(item.audioSrc)
      return acc
    }, {} as Record<string, HTMLAudioElement>)
  )

  // Setup timeupdate listeners
  React.useEffect(() => {
    items.forEach((item) => {
      const audio = audioMap[item.id]
      const updateProgress = () => {
        setProgressMap((prev) => ({
          ...prev,
          [item.id]: (audio.currentTime / (audio.duration || 1)) * 100,
        }))
      }
      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("ended", () => setPlayingId(null))
      return () => audio.removeEventListener("timeupdate", updateProgress)
    })
  }, [audioMap, items])

  const togglePlay = (id: string) => {
    const currentAudio = audioMap[id]
    if (playingId && playingId !== id) {
      audioMap[playingId].pause()
      audioMap[playingId].currentTime = 0
    }

    if (playingId === id && !currentAudio.paused) {
      currentAudio.pause()
      setPlayingId(null)
    } else {
      currentAudio.play()
      setPlayingId(id)
    }
  }

  const formatTime = (audio: HTMLAudioElement) => {
    const minutes = Math.floor(audio.currentTime / 60)
    const seconds = Math.floor(audio.currentTime % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className={cn("flex overflow-x-auto gap-4 p-4", className)}>
      {items.map((item) => {
        const progress = progressMap[item.id] || 0
        const audio = audioMap[item.id]
        return (
          <div
            key={item.id}
            className="flex-shrink-0 rounded-xl shadow-md bg-white dark:bg-gray-800 flex flex-col items-center p-3"
            style={{ width, height }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center mb-1">
              {item.title}
            </h4>

            {/* Linear progress */}
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
              <div
                className="h-full bg-black dark:bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {audio ? `${formatTime(audio)} / ${item.duration}` : `0:00 / ${item.duration}`}
            </p>

            {/* Circular button with progress */}
            <div className="relative">
              <svg className="w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="gray"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={138.2} // 2πr
                  strokeDashoffset={138.2 - (138.2 * progress) / 100}
                  transform="rotate(-90 24 24)"
                />
              </svg>
              <Button
                className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center rounded-full p-0"
                onClick={() => togglePlay(item.id)}
                variant="outline"
              >
                {playingId === item.id ? <LucidePause className="w-5 h-5" /> : <LucidePlay className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}


code.demo.1758701017193.tsx
"use client"

import PlaylistCarousel, { PlaylistItem } from "@/components/ui/playlist-carousel"

export default function DemoPlaylistCarousel() {
  const items: PlaylistItem[] = [
    {
      id: "1",
      title: "Morning Chill",
      duration: "3:45",
      image: "https://picsum.photos/200/120?random=1",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: "2",
      title: "Evening Focus",
      duration: "4:20",
      image: "https://picsum.photos/200/120?random=2",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: "3",
      title: "Workout Beats",
      duration: "5:10",
      image: "https://picsum.photos/200/120?random=3",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ]

  return <PlaylistCarousel items={items} width={180} height={260} />
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/playlist-carousel.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucidePlay, LucidePause } from "lucide-react"

export interface PlaylistItem {
  id: string
  title: string
  duration: string
  image: string
  audioSrc: string
}

interface PlaylistCarouselProps {
  items: PlaylistItem[]
  width?: number
  height?: number
  className?: string
}

export default function PlaylistCarousel({
  items,
  width = 200,
  height = 250,
  className,
}: PlaylistCarouselProps) {
  const [playingId, setPlayingId] = React.useState<string | null>(null)
  const [progressMap, setProgressMap] = React.useState<Record<string, number>>({})
  const [audioMap] = React.useState<Record<string, HTMLAudioElement>>(
    items.reduce((acc, item) => {
      acc[item.id] = new Audio(item.audioSrc)
      return acc
    }, {} as Record<string, HTMLAudioElement>)
  )

  // Setup timeupdate listeners
  React.useEffect(() => {
    items.forEach((item) => {
      const audio = audioMap[item.id]
      const updateProgress = () => {
        setProgressMap((prev) => ({
          ...prev,
          [item.id]: (audio.currentTime / (audio.duration || 1)) * 100,
        }))
      }
      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("ended", () => setPlayingId(null))
      return () => audio.removeEventListener("timeupdate", updateProgress)
    })
  }, [audioMap, items])

  const togglePlay = (id: string) => {
    const currentAudio = audioMap[id]
    if (playingId && playingId !== id) {
      audioMap[playingId].pause()
      audioMap[playingId].currentTime = 0
    }

    if (playingId === id && !currentAudio.paused) {
      currentAudio.pause()
      setPlayingId(null)
    } else {
      currentAudio.play()
      setPlayingId(id)
    }
  }

  const formatTime = (audio: HTMLAudioElement) => {
    const minutes = Math.floor(audio.currentTime / 60)
    const seconds = Math.floor(audio.currentTime % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className={cn("flex overflow-x-auto gap-4 p-4", className)}>
      {items.map((item) => {
        const progress = progressMap[item.id] || 0
        const audio = audioMap[item.id]
        return (
          <div
            key={item.id}
            className="flex-shrink-0 rounded-xl shadow-md bg-white dark:bg-gray-800 flex flex-col items-center p-3"
            style={{ width, height }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center mb-1">
              {item.title}
            </h4>

            {/* Linear progress */}
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
              <div
                className="h-full bg-black dark:bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {audio ? `${formatTime(audio)} / ${item.duration}` : `0:00 / ${item.duration}`}
            </p>

            {/* Circular button with progress */}
            <div className="relative">
              <svg className="w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="gray"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="black"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={138.2} // 2πr
                  strokeDashoffset={138.2 - (138.2 * progress) / 100}
                  transform="rotate(-90 24 24)"
                />
              </svg>
              <Button
                className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center rounded-full p-0"
                onClick={() => togglePlay(item.id)}
                variant="outline"
              >
                {playingId === item.id ? <LucidePause className="w-5 h-5" /> : <LucidePlay className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        )
      })}
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
