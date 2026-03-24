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
download-card.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Defines variants for the status banner
const bannerVariants = cva(
  "flex items-center space-x-2 rounded-md p-3 text-sm",
  {
    variants: {
      status: {
        loading: "bg-muted text-muted-foreground",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      },
    },
  }
);

interface DownloadFormat {
  name: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export interface DownloadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The main title of the card. */
  title?: string;
  /** A short description displayed below the title. */
  description?: string;
  /** An array of download format objects. */
  formats: DownloadFormat[];
  /** The current status of the download process. */
  status?: "idle" | "loading" | "success";
  /** The message to display during the loading state. */
  loadingMessage?: string;
  /** The message to display during the success state. */
  successMessage?: string;
}

const DownloadCard = React.forwardRef<HTMLDivElement, DownloadCardProps>(
  (
    {
      className,
      title = "Download",
      description = "Choose a download format",
      formats,
      status = "idle",
      loadingMessage = "Rendering Video, please wait...",
      successMessage = "Successfully Rendered",
      ...props
    },
    ref
  ) => {
    const isInteractive = status === "idle";

    // Animation variants for the status banner
    const animationVariants = {
      initial: { opacity: 0, y: -20, height: 0 },
      animate: { opacity: 1, y: 0, height: "auto" },
      exit: { opacity: 0, y: 20, height: 0 },
    };

    return (
      <Card
        ref={ref}
        className={cn("w-screen max-w-sm overflow-hidden", className)}
        {...props}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-12">
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div
                  key="loading"
                  className={cn(bannerVariants({ status: "loading" }))}
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{loadingMessage}</span>
                </motion.div>
              )}
              {status === "success" && (
                <motion.div
                  key="success"
                  className={cn(bannerVariants({ status: "success" }))}
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {formats.map((format, index) => (
              <button
                key={index}
                onClick={format.onSelect}
                disabled={!isInteractive}
                aria-disabled={!isInteractive}
                className={cn(
                  "flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 text-center transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  !isInteractive && "cursor-not-allowed opacity-50",
                  status === 'idle' && 'border-primary/20'
                )}
              >
                <div className="text-muted-foreground">{format.icon}</div>
                <span className="text-xs font-medium text-foreground">
                  {format.name}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

DownloadCard.displayName = "DownloadCard";

export { DownloadCard };

code.demo.1758956804549.tsx
import React, { useState } from "react";
import { Video, Music, FileImage } from "lucide-react";
import { DownloadCard } from "@/components/ui/download-card"; // Adjust the import path
import { Button } from "@/components/ui/button"; // Optional: For control buttons

type Status = "idle" | "loading" | "success";

export default function DownloadCardDemo() {
  const [status, setStatus] = useState<Status>("idle");

  // Simulate a download process
  const handleDownload = () => {
    if (status !== 'idle') return; // Prevent multiple clicks

    setStatus("loading");

    // Simulate rendering time
    setTimeout(() => {
      setStatus("success");

      // Reset back to idle after showing success message
      setTimeout(() => {
        setStatus("idle");
      }, 2500);
    }, 3000);
  };

  const downloadFormats = [
    {
      name: "MP4",
      icon: <Video className="h-6 w-6" />,
      onSelect: handleDownload,
    },
    {
      name: "MP3",
      icon: <Music className="h-6 w-6" />,
      onSelect: handleDownload,
    },
    {
      name: "GIF",
      icon: <FileImage className="h-6 w-6" />,
      onSelect: handleDownload,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-muted p-8">
       <DownloadCard
        status={status}
        formats={downloadFormats}
      />

      {/* Optional: Buttons to manually control the state for testing */}
      <div className="flex space-x-2 pt-4">
         <Button variant="outline" size="sm" onClick={() => setStatus("idle")} disabled={status !== 'idle'}>
            Reset to Idle
         </Button>
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/download-card.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Defines variants for the status banner
const bannerVariants = cva(
  "flex items-center space-x-2 rounded-md p-3 text-sm",
  {
    variants: {
      status: {
        loading: "bg-muted text-muted-foreground",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      },
    },
  }
);

interface DownloadFormat {
  name: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export interface DownloadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The main title of the card. */
  title?: string;
  /** A short description displayed below the title. */
  description?: string;
  /** An array of download format objects. */
  formats: DownloadFormat[];
  /** The current status of the download process. */
  status?: "idle" | "loading" | "success";
  /** The message to display during the loading state. */
  loadingMessage?: string;
  /** The message to display during the success state. */
  successMessage?: string;
}

const DownloadCard = React.forwardRef<HTMLDivElement, DownloadCardProps>(
  (
    {
      className,
      title = "Download",
      description = "Choose a download format",
      formats,
      status = "idle",
      loadingMessage = "Rendering Video, please wait...",
      successMessage = "Successfully Rendered",
      ...props
    },
    ref
  ) => {
    const isInteractive = status === "idle";

    // Animation variants for the status banner
    const animationVariants = {
      initial: { opacity: 0, y: -20, height: 0 },
      animate: { opacity: 1, y: 0, height: "auto" },
      exit: { opacity: 0, y: 20, height: 0 },
    };

    return (
      <Card
        ref={ref}
        className={cn("w-screen max-w-sm overflow-hidden", className)}
        {...props}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-12">
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div
                  key="loading"
                  className={cn(bannerVariants({ status: "loading" }))}
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{loadingMessage}</span>
                </motion.div>
              )}
              {status === "success" && (
                <motion.div
                  key="success"
                  className={cn(bannerVariants({ status: "success" }))}
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {formats.map((format, index) => (
              <button
                key={index}
                onClick={format.onSelect}
                disabled={!isInteractive}
                aria-disabled={!isInteractive}
                className={cn(
                  "flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 text-center transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  !isInteractive && "cursor-not-allowed opacity-50",
                  status === 'idle' && 'border-primary/20'
                )}
              >
                <div className="text-muted-foreground">{format.icon}</div>
                <span className="text-xs font-medium text-foreground">
                  {format.name}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

DownloadCard.displayName = "DownloadCard";

export { DownloadCard };
```

Install NPM dependencies:
```bash
lucide-react, framer-motion, class-variance-authority
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
