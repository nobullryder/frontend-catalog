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
video-generator-card.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Zap, Image as ImageIcon, Mic, ArrowUp, Loader2 } from "lucide-react"

// Prop types for the component
interface StoryboardImage {
  src: string;
  alt: string;
}

interface VideoGeneratorCardProps {
  storyboardImages: StoryboardImage[];
  initialPrompt?: string;
  onClose?: () => void;
  onGenerate?: (prompt: string) => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * A component that provides a user interface for generating video content
 * from a storyboard and a text prompt, inspired by modern AI tools.
 */
const VideoGeneratorCard = React.forwardRef<HTMLDivElement, VideoGeneratorCardProps>(
  ({ storyboardImages, initialPrompt = "", onClose, onGenerate, isLoading = false, className }, ref) => {
    // State to manage the prompt text
    const [prompt, setPrompt] = React.useState(initialPrompt);

    const handleGenerateClick = () => {
      if (onGenerate) {
        onGenerate(prompt);
      }
    };

    return (
      <Card ref={ref} className={cn("w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/40 overflow-hidden shadow-2xl animate-fade-in", className)}>
        {/* Header with Close button and Drafts label */}
        <CardHeader className="flex flex-row items-center justify-between p-3 border-b border-border/40">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground">Drafts</span>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Storyboard Image Thumbnails */}
          <div className="flex items-center gap-2">
            {storyboardImages.map((image, index) => (
              <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Prompt Input Area */}
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Use the storyboard to create a video..."
            className="bg-background/50 border-border/40 min-h-[80px] resize-none focus-visible:ring-primary/50"
          />

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Add content">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Quick edit">
                <Zap className="h-4 w-4" />
              </Button>
              {/* Media Type Toggle */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
                <Button size="sm" variant="ghost" className="h-7 px-2 text-muted-foreground">
                  <ImageIcon className="h-4 w-4 mr-1.5" />
                  Image
                </Button>
                <Button size="sm" variant="secondary" className="h-7 px-2 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 mr-1.5"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></svg>
                  Video
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Use microphone">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-9 w-9 bg-primary hover:bg-primary/90" onClick={handleGenerateClick} disabled={isLoading} aria-label="Generate video">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
VideoGeneratorCard.displayName = "VideoGeneratorCard";

export { VideoGeneratorCard };

code.demo.1760169524290.tsx
import * as React from "react"

import { VideoGeneratorCard } from "@/components/ui/video-generator-card"

export default function VideoGeneratorCardDemo() {
  const [isLoading, setIsLoading] = React.useState(false);

  // Sample data for the storyboard images
  const storyboardImages = [
    {
      src: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-7265ae2FvvY1NECu1e4sxmOs1Q6s7h.png&w=1000&q=75',
      alt: 'A person in green pants sitting with knees to chest.',
    },
    {
      src: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-hhPaKmoyd4nBebxrwYPSULnJ8GUjow.png&w=320&q=75',
      alt: 'A person in a white dress standing against an orange background.',
    },
    {
      src: 'https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-faPseNwO03Gngr7lQUwgpQcs4z52Yw.png&w=1000&q=75',
      alt: 'A person in a red and white skirt stretching on an orange couch.',
    },
  ];

  const initialPrompt = "Use the storyboard uploaded to create an advertising retro short video in 30 seconds.";

  // Handler for the generate action
  const handleGenerate = (prompt: string) => {
    console.log("Generating video with prompt:", prompt);
    setIsLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Video generation started!");
    }, 2000);
  };
  
  // Handler for the close action
  const handleClose = () => {
    alert("Close button clicked!");
  };

  return (
    <div className="flex items-center justify-center w-full h-[600px] bg-background"
      style={{
        backgroundImage: 'radial-gradient(circle at top left, hsl(var(--primary)/0.1), transparent 40%), radial-gradient(circle at bottom right, hsl(var(--primary)/0.1), transparent 40%)',
      }}>
      <VideoGeneratorCard
        storyboardImages={storyboardImages}
        initialPrompt={initialPrompt}
        isLoading={isLoading}
        onGenerate={handleGenerate}
        onClose={handleClose}
      />
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/video-generator-card.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Zap, Image as ImageIcon, Mic, ArrowUp, Loader2 } from "lucide-react"

// Prop types for the component
interface StoryboardImage {
  src: string;
  alt: string;
}

interface VideoGeneratorCardProps {
  storyboardImages: StoryboardImage[];
  initialPrompt?: string;
  onClose?: () => void;
  onGenerate?: (prompt: string) => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * A component that provides a user interface for generating video content
 * from a storyboard and a text prompt, inspired by modern AI tools.
 */
const VideoGeneratorCard = React.forwardRef<HTMLDivElement, VideoGeneratorCardProps>(
  ({ storyboardImages, initialPrompt = "", onClose, onGenerate, isLoading = false, className }, ref) => {
    // State to manage the prompt text
    const [prompt, setPrompt] = React.useState(initialPrompt);

    const handleGenerateClick = () => {
      if (onGenerate) {
        onGenerate(prompt);
      }
    };

    return (
      <Card ref={ref} className={cn("w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-border/40 overflow-hidden shadow-2xl animate-fade-in", className)}>
        {/* Header with Close button and Drafts label */}
        <CardHeader className="flex flex-row items-center justify-between p-3 border-b border-border/40">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground">Drafts</span>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Storyboard Image Thumbnails */}
          <div className="flex items-center gap-2">
            {storyboardImages.map((image, index) => (
              <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Prompt Input Area */}
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Use the storyboard to create a video..."
            className="bg-background/50 border-border/40 min-h-[80px] resize-none focus-visible:ring-primary/50"
          />

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Add content">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Quick edit">
                <Zap className="h-4 w-4" />
              </Button>
              {/* Media Type Toggle */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
                <Button size="sm" variant="ghost" className="h-7 px-2 text-muted-foreground">
                  <ImageIcon className="h-4 w-4 mr-1.5" />
                  Image
                </Button>
                <Button size="sm" variant="secondary" className="h-7 px-2 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 mr-1.5"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></svg>
                  Video
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Use microphone">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-9 w-9 bg-primary hover:bg-primary/90" onClick={handleGenerateClick} disabled={isLoading} aria-label="Generate video">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
VideoGeneratorCard.displayName = "VideoGeneratorCard";

export { VideoGeneratorCard };
```

Install NPM dependencies:
```bash
lucide-react, class-variance-authority
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
