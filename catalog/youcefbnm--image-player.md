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
image-player.tsx
/* eslint-disable @next/next/no-img-element */
'use client'
import  * as React from 'react';

interface ImagePlayerProps extends React.HTMLAttributes<HTMLImageElement> {
  images: string[];
  interval?: number;
  loop?: boolean;
  onComplete?: () => void;
  renderImage?: (src: string, index: number) => React.ReactNode;
}

export const ImagePlayer: React.FC<ImagePlayerProps> = ({
  images,
  interval = 500,
  loop = true,
  onComplete,
  renderImage,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const currentImage = React.useMemo(() => images[currentIndex], [images, currentIndex]);

  React.useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex >= images.length) {
          if (loop) {
            return 0;
          } else {
            onComplete?.();
            return prevIndex;
          }
        }
        
        return nextIndex;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, interval, loop, onComplete]);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className='text-destructive'>No images !!</div>;
  }

  return (
    <>
      {renderImage ? 
        renderImage(currentImage, currentIndex) : 
        <img 
          src={currentImage} 
          {...props}
        />
      }
    </>
  );
};


code.demo.1758049209011.tsx
'use client'
import { ImagePlayer } from "@/components/ui/image-player";
import Image from 'next/image';

const IMAGES = [
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1617869763329-8e8160d32adb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1705675742522-b0bdc228f2ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1705615791178-d32cc2cdcd9c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export default function DemoOne() {
  return (<div className="h-screen p-12 flex items-center justify-center">
      <ImagePlayer
        images={IMAGES}
        interval={200}
        renderImage={(src) => (
          <Image
            src={src}
            width={400}
            height={300}
            className="size-full h-auto max-h-full max-w-xl object-cover inline-block align-middle"
            alt="showcalse"
          />
        )}
      />
    </div>)
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/image-player.tsx
/* eslint-disable @next/next/no-img-element */
'use client'
import  * as React from 'react';

interface ImagePlayerProps extends React.HTMLAttributes<HTMLImageElement> {
  images: string[];
  interval?: number;
  loop?: boolean;
  onComplete?: () => void;
  renderImage?: (src: string, index: number) => React.ReactNode;
}

export const ImagePlayer: React.FC<ImagePlayerProps> = ({
  images,
  interval = 500,
  loop = true,
  onComplete,
  renderImage,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const currentImage = React.useMemo(() => images[currentIndex], [images, currentIndex]);

  React.useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex >= images.length) {
          if (loop) {
            return 0;
          } else {
            onComplete?.();
            return prevIndex;
          }
        }
        
        return nextIndex;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, interval, loop, onComplete]);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className='text-destructive'>No images !!</div>;
  }

  return (
    <>
      {renderImage ? 
        renderImage(currentImage, currentIndex) : 
        <img 
          src={currentImage} 
          {...props}
        />
      }
    </>
  );
};

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
