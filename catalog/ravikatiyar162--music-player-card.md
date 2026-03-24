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
music-player-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share, Heart, SkipBack, SkipForward, Play, Pause } from "lucide-react";

// Props interface for type-safety and reusability
export interface MusicPlayerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  artistName: string;
  artistHandle: string;
  avatarSrc: string;
  albumArtSrc: string;
  songDuration: number; // in seconds
  currentProgress: number; // in seconds
  isPlaying: boolean;
  isLiked: boolean;
  onPlayPauseClick: () => void;
  onLikeClick: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onShareClick?: () => void;
}

// Utility to format time from seconds to mm:ss
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const MusicPlayerCard = React.forwardRef<HTMLDivElement, MusicPlayerCardProps>(
  (
    {
      className,
      artistName,
      artistHandle,
      avatarSrc,
      albumArtSrc,
      songDuration,
      currentProgress,
      isPlaying,
      isLiked,
      onPlayPauseClick,
      onLikeClick,
      onNextClick,
      onPrevClick,
      onShareClick,
      ...props
    },
    ref
  ) => {
    const progressPercentage = (currentProgress / songDuration) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-2xl border border-border/20 bg-card/60 p-4 shadow-lg backdrop-blur-lg transition-all duration-300",
          className
        )}
        {...props}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarSrc} alt={artistName} />
              <AvatarFallback>{artistName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-card-foreground">{artistName}</p>
              <p className="text-xs text-muted-foreground">{artistHandle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={onShareClick} aria-label="Share song">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onLikeClick} aria-label="Like song">
              <Heart
                className={cn("h-4 w-4 transition-all", isLiked && "fill-red-500 text-red-500")}
              />
            </Button>
          </div>
        </div>

        {/* Album Art & Controls Section */}
        <div className="relative mt-4 w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={albumArtSrc}
            alt={`Album art for song by ${artistName}`}
            className="h-full w-full object-cover"
          />
          {/* Controls Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar & Timestamps */}
            <div className="mb-3">
                {/* FIX: Changed text color to white for visibility on dark overlay */}
                <div className="flex justify-between text-xs text-white/90">
                    <span>{formatTime(currentProgress)}</span>
                    <span>-{formatTime(songDuration - currentProgress)}</span>
                </div>
                <div 
                    className="group relative mt-1 h-1.5 w-full cursor-pointer rounded-full bg-white/20" // FIX: Changed track background
                    role="progressbar"
                    aria-valuenow={progressPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                    className="h-full rounded-full bg-white transition-all duration-200 ease-linear" // FIX: Changed fill color to white
                    style={{ width: `${progressPercentage}%` }}
                    />
                    <div
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" // FIX: Changed thumb color to white
                    style={{ left: `calc(${progressPercentage}% - 6px)` }}
                    />
                </div>
            </div>

            {/* Playback Buttons */}
            {/* FIX: Changed icon color to white for visibility on dark overlay */}
            <div className="flex items-center justify-around text-white">
                <Button variant="ghost" size="icon" className="text-current hover:bg-white/10" onClick={onPrevClick} aria-label="Previous song">
                    <SkipBack className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 text-current hover:bg-white/10" onClick={onPlayPauseClick} aria-label={isPlaying ? "Pause song" : "Play song"}>
                    {isPlaying ? (
                        <Pause className="h-7 w-7 fill-current" />
                    ) : (
                        <Play className="h-7 w-7 fill-current" />
                    )}
                </Button>
                <Button variant="ghost" size="icon" className="text-current hover:bg-white/10" onClick={onNextClick} aria-label="Next song">
                    <SkipForward className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MusicPlayerCard.displayName = "MusicPlayerCard";

export { MusicPlayerCard };

code.demo.1758894107820.tsx
import * as React from "react";
import { MusicPlayerCard } from "@/components/ui/music-player-card";

const DURATION_IN_SECONDS = 185; // e.g., 3 minutes and 5 seconds

export default function MusicPlayerDemo() {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = React.useState<number>(52); // Start at 52 seconds

  // Effect to simulate song progress with advanced animation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= DURATION_IN_SECONDS) {
            setIsPlaying(false); // Stop playing when song ends
            return 0; // Reset progress
          }
          return prev + 1;
        });
      }, 1000);
    }
    // Cleanup on component unmount or when isPlaying changes
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };
  
  const handleNext = () => {
    console.log("Next button clicked");
    // Logic to skip to the next track
    setCurrentProgress(0); // Reset progress for demo
  };

  const handlePrev = () => {
    console.log("Previous button clicked");
    // Logic to go to the previous track
    setCurrentProgress(0); // Reset progress for demo
  };
  
  const handleShare = () => {
    console.log("Share button clicked");
    // Logic to open share dialog
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <MusicPlayerCard
        artistName="Terence Howard"
        artistHandle="@terenceh"
        avatarSrc="https://i.pravatar.cc/150?u=terence"
        albumArtSrc="https://plus.unsplash.com/premium_photo-1705351823638-54bcc44babe3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGFsYnVtfGVufDB8fDB8fHww?q=80&w=1964&auto=format&fit=crop"
        songDuration={DURATION_IN_SECONDS}
        currentProgress={currentProgress}
        isPlaying={isPlaying}
        isLiked={isLiked}
        onPlayPauseClick={handlePlayPause}
        onLikeClick={handleLike}
        onNextClick={handleNext}
        onPrevClick={handlePrev}
        onShareClick={handleShare}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/music-player-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share, Heart, SkipBack, SkipForward, Play, Pause } from "lucide-react";

// Props interface for type-safety and reusability
export interface MusicPlayerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  artistName: string;
  artistHandle: string;
  avatarSrc: string;
  albumArtSrc: string;
  songDuration: number; // in seconds
  currentProgress: number; // in seconds
  isPlaying: boolean;
  isLiked: boolean;
  onPlayPauseClick: () => void;
  onLikeClick: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onShareClick?: () => void;
}

// Utility to format time from seconds to mm:ss
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const MusicPlayerCard = React.forwardRef<HTMLDivElement, MusicPlayerCardProps>(
  (
    {
      className,
      artistName,
      artistHandle,
      avatarSrc,
      albumArtSrc,
      songDuration,
      currentProgress,
      isPlaying,
      isLiked,
      onPlayPauseClick,
      onLikeClick,
      onNextClick,
      onPrevClick,
      onShareClick,
      ...props
    },
    ref
  ) => {
    const progressPercentage = (currentProgress / songDuration) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-2xl border border-border/20 bg-card/60 p-4 shadow-lg backdrop-blur-lg transition-all duration-300",
          className
        )}
        {...props}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarSrc} alt={artistName} />
              <AvatarFallback>{artistName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-card-foreground">{artistName}</p>
              <p className="text-xs text-muted-foreground">{artistHandle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={onShareClick} aria-label="Share song">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onLikeClick} aria-label="Like song">
              <Heart
                className={cn("h-4 w-4 transition-all", isLiked && "fill-red-500 text-red-500")}
              />
            </Button>
          </div>
        </div>

        {/* Album Art & Controls Section */}
        <div className="relative mt-4 w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={albumArtSrc}
            alt={`Album art for song by ${artistName}`}
            className="h-full w-full object-cover"
          />
          {/* Controls Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar & Timestamps */}
            <div className="mb-3">
                {/* FIX: Changed text color to white for visibility on dark overlay */}
                <div className="flex justify-between text-xs text-white/90">
                    <span>{formatTime(currentProgress)}</span>
                    <span>-{formatTime(songDuration - currentProgress)}</span>
                </div>
                <div 
                    className="group relative mt-1 h-1.5 w-full cursor-pointer rounded-full bg-white/20" // FIX: Changed track background
                    role="progressbar"
                    aria-valuenow={progressPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                    className="h-full rounded-full bg-white transition-all duration-200 ease-linear" // FIX: Changed fill color to white
                    style={{ width: `${progressPercentage}%` }}
                    />
                    <div
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" // FIX: Changed thumb color to white
                    style={{ left: `calc(${progressPercentage}% - 6px)` }}
                    />
                </div>
            </div>

            {/* Playback Buttons */}
            {/* FIX: Changed icon color to white for visibility on dark overlay */}
            <div className="flex items-center justify-around text-white">
                <Button variant="ghost" size="icon" className="text-current hover:bg-white/10" onClick={onPrevClick} aria-label="Previous song">
                    <SkipBack className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 text-current hover:bg-white/10" onClick={onPlayPauseClick} aria-label={isPlaying ? "Pause song" : "Play song"}>
                    {isPlaying ? (
                        <Pause className="h-7 w-7 fill-current" />
                    ) : (
                        <Play className="h-7 w-7 fill-current" />
                    )}
                </Button>
                <Button variant="ghost" size="icon" className="text-current hover:bg-white/10" onClick={onNextClick} aria-label="Next song">
                    <SkipForward className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MusicPlayerCard.displayName = "MusicPlayerCard";

export { MusicPlayerCard };
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
