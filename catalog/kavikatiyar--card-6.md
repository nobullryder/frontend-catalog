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
card-6.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * @typedef {object} MusicCardProps
 * @property {string} imageUrl - The URL for the background image of the card.
 * @property {string} title - The main title displayed on the card (e.g., "Now Playing").
 * @property {string} artist - The name of the artist.
 * @property {string} songTitle - The title of the song.
 * @property {() => void} [onPlay] - Optional callback for the play button's click event.
 */
interface MusicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  artist: string;
  songTitle: string;
  onPlay?: () => void;
}

const MusicCard = React.forwardRef<HTMLDivElement, MusicCardProps>(
  ({ className, imageUrl, title, artist, songTitle, onPlay, ...props }, ref) => {
    // Animation variants for the main card container
    const cardVariants = {
      initial: { scale: 1 },
      hover: { scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } },
    };

    // Parallax effect for the background image
    const imageVariants = {
      initial: { scale: 1.1 },
      hover: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    };

    // Fade-in and scale animation for the play button
    const playButtonVariants = {
      initial: { scale: 0.8, opacity: 0 },
      hover: { scale: 1.1, opacity: 1 },
      tap: { scale: 0.95 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative h-64 w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-lg",
          className
        )}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        {/* Background Image */}
        <motion.img
          src={imageUrl}
          alt={`${artist} - ${songTitle}`}
          className="absolute inset-0 h-full w-full object-cover"
          variants={imageVariants}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-5">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-primary-foreground">{title}</h3>
              <p className="text-sm text-primary-foreground/80">{`${artist} - ${songTitle}`}</p>
            </div>
            <motion.button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card's onClick if button is clicked
                onPlay?.();
              }}
              aria-label="Play song"
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
              variants={playButtonVariants}
              whileTap="tap"
            >
              <Play className="h-6 w-6 translate-x-px fill-current" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
);

MusicCard.displayName = "MusicCard";

export { MusicCard };

code.demo.1758072983048.tsx
import { MusicCard } from "@/components/ui/card-6"; // Adjust this import path as needed

const MusicCardDemo = () => {
  const handlePlay = () => {
    // In a real app, you would trigger your music player logic here
    alert("Playing: Far Caspian - Let's Go Outside");
  };

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-background p-4">
      <MusicCard
        title="Now Playing"
        artist="Far Caspian"
        songTitle="Let's Go Outside"
        imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        onPlay={handlePlay}
      />
    </div>
  );
};

export default MusicCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-6.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * @typedef {object} MusicCardProps
 * @property {string} imageUrl - The URL for the background image of the card.
 * @property {string} title - The main title displayed on the card (e.g., "Now Playing").
 * @property {string} artist - The name of the artist.
 * @property {string} songTitle - The title of the song.
 * @property {() => void} [onPlay] - Optional callback for the play button's click event.
 */
interface MusicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  artist: string;
  songTitle: string;
  onPlay?: () => void;
}

const MusicCard = React.forwardRef<HTMLDivElement, MusicCardProps>(
  ({ className, imageUrl, title, artist, songTitle, onPlay, ...props }, ref) => {
    // Animation variants for the main card container
    const cardVariants = {
      initial: { scale: 1 },
      hover: { scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } },
    };

    // Parallax effect for the background image
    const imageVariants = {
      initial: { scale: 1.1 },
      hover: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    };

    // Fade-in and scale animation for the play button
    const playButtonVariants = {
      initial: { scale: 0.8, opacity: 0 },
      hover: { scale: 1.1, opacity: 1 },
      tap: { scale: 0.95 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative h-64 w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-lg",
          className
        )}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        {/* Background Image */}
        <motion.img
          src={imageUrl}
          alt={`${artist} - ${songTitle}`}
          className="absolute inset-0 h-full w-full object-cover"
          variants={imageVariants}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-5">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-primary-foreground">{title}</h3>
              <p className="text-sm text-primary-foreground/80">{`${artist} - ${songTitle}`}</p>
            </div>
            <motion.button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card's onClick if button is clicked
                onPlay?.();
              }}
              aria-label="Play song"
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
              variants={playButtonVariants}
              whileTap="tap"
            >
              <Play className="h-6 w-6 translate-x-px fill-current" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
);

MusicCard.displayName = "MusicCard";

export { MusicCard };
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
