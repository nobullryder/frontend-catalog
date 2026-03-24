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
stories-carousel.tsx
'use client';

import type {
  ComponentProps,
  HTMLAttributes,
  VideoHTMLAttributes,
} from 'react';
import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem, 
} from '@/components/ui/carousel';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type StoriesProps = ComponentProps<typeof Carousel>;

export const Stories = ({ className, opts, ...props }: StoriesProps) => (
  <Carousel
    className={cn('w-full', className)}
    opts={{
      align: 'start',
      loop: false,
      dragFree: true,
      ...opts,
    }}
    {...props}
  />
);

export type StoriesContentProps = ComponentProps<typeof CarouselContent>;

export const StoriesContent = ({
  className,
  ...props
}: StoriesContentProps) => (
  <CarouselContent className={cn('gap-2', className)} {...props} />
);

export type StoryProps = HTMLAttributes<HTMLDivElement>;

export const Story = ({ className, ...props }: StoryProps) => (
  <CarouselItem className={cn('basis-auto !w-[200px] pl-2 md:pl-4', className)}>
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl bg-muted/40',
        'cursor-pointer transition-all duration-200',
        'hover:scale-[1.02] hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      role="button"
      tabIndex={0}
      {...props}
    />
  </CarouselItem>
);

export type StoryVideoProps = VideoHTMLAttributes<HTMLVideoElement>;

const tRegex = /t=(\d+(?:\.\d+)?)/;

export const StoryVideo = ({ className, ...props }: StoryVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialTimeRef = useRef<number>(0);

  useEffect(() => {
    const src = (props.src ?? '') as string;
    let initialTime = 0;
    if (typeof src === 'string') {
      const hashIndex = src.indexOf('#');
      if (hashIndex !== -1) {
        const hash = src.slice(hashIndex + 1);

        const tMatch = hash.match(tRegex);
        if (tMatch) {
          initialTime = Number.parseFloat(tMatch[1]);
        }
      }
    }
    initialTimeRef.current = initialTime;
  }, [props.src]);

  const handleMouseOver = () => {
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  const handleFocus = () => {
    videoRef.current?.play();
  };

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  return (
    <video
      className={cn(
        'absolute inset-0 size-full object-cover',
        'transition-opacity duration-200',
        'group-hover:opacity-90',
        className
      )}
      loop
      muted
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      preload="metadata"
      ref={videoRef}
      tabIndex={0}
      {...props}
    />
  );
};

export type StoryImageProps = ComponentProps<'img'> & {
  alt: string;
};

export const StoryImage = ({ className, alt, ...props }: StoryImageProps) => (
  <img
    alt={alt}
    className={cn(
      'absolute inset-0 h-full w-full object-cover',
      'transition-opacity duration-200',
      'group-hover:opacity-90',
      className
    )}
    {...props}
  />
);

export type StoryAuthorProps = HTMLAttributes<HTMLDivElement>;

export const StoryAuthor = ({
  className,
  children,
  ...props
}: StoryAuthorProps) => (
  <div
    className={cn(
      'absolute right-0 bottom-0 left-0 z-10',
      'p-3 text-white',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

export type StoryAuthorImageProps = ComponentProps<typeof Avatar> & {
  src?: string;
  name?: string;
  fallback?: string;
};

export const StoryAuthorImage = ({
  src,
  fallback,
  name,
  className,
  ...props
}: StoryAuthorImageProps) => (
  <Avatar className={cn('size-6 border border-white/20', className)} {...props}>
    {src && <AvatarImage alt={name} src={src} />}
    <AvatarFallback className='bg-white/10 text-white text-xs'>
      {fallback || name?.charAt(0)?.toUpperCase()}
    </AvatarFallback>
  </Avatar>
);

export type StoryAuthorNameProps = HTMLAttributes<HTMLSpanElement>;

export const StoryAuthorName = ({
  className,
  ...props
}: StoryAuthorNameProps) => (
  <span className={cn('truncate font-medium text-sm', className)} {...props} />
);

export type StoryTitleProps = HTMLAttributes<HTMLDivElement>;

export const StoryTitle = ({ className, ...props }: StoryTitleProps) => (
  <div
    className={cn(
      'absolute top-0 right-0 left-0 z-10',
      'p-3 text-white',
      className
    )}
    {...props}
  />
);

export type StoryOverlayProps = HTMLAttributes<HTMLDivElement> & {
  side?: 'top' | 'bottom';
};

export const StoryOverlay = ({
  className,
  side = 'bottom',
  ...props
}: StoryOverlayProps) => {
  const positionClasses =
    side === 'top' ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t';

  return (
    <div
      className={cn(
        'absolute right-0 left-0 h-10 from-black/20 to-transparent',
        positionClasses,
        className
      )}
      {...props}
    />
  );
};

code.demo.1753955275244.tsx
'use client';

import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
} from '@/components/ui/stories-carousel';

const stories = [
  {
    id: 1,
    author: 'Hayden Bleasel',
    avatar: 'https://github.com/haydenbleasel.png',
    fallback: 'HB',
  },
  {
    id: 2,
    author: 'shadcn',
    avatar: 'https://github.com/shadcn.png',
    fallback: 'CN',
  },
  {
    id: 3,
    author: 'Lee Robinson',
    avatar: 'https://github.com/leerob.png',
    fallback: 'LR',
  },
  {
    id: 4,
    author: 'Serafim',
    avatar: 'https://github.com/serafimcloud.png',
    fallback: 'SC',
  },
];

const Example = () => (
  <div className="w-full max-w-4xl">
    <Stories>
      <StoriesContent className="justify-center">
        {stories.map((story) => (
          <Story className="aspect-square w-20 rounded-full p-0" key={story.id}>
            <StoryAuthor className="p-0">
              <span
                aria-hidden="true"
                className='inline-flex size-full rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-0.5'
              >
                <span className="inline-flex size-full rounded-full bg-white p-0.5">
                  <StoryAuthorImage
                    className="size-full"
                    fallback={story.fallback}
                    src={story.avatar}
                  />
                </span>
              </span>
            </StoryAuthor>
          </Story>
        ))}
      </StoriesContent>
    </Stories>
  </div>
);

export default Example;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stories-carousel.tsx
'use client';

import type {
  ComponentProps,
  HTMLAttributes,
  VideoHTMLAttributes,
} from 'react';
import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem, 
} from '@/components/ui/carousel';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type StoriesProps = ComponentProps<typeof Carousel>;

export const Stories = ({ className, opts, ...props }: StoriesProps) => (
  <Carousel
    className={cn('w-full', className)}
    opts={{
      align: 'start',
      loop: false,
      dragFree: true,
      ...opts,
    }}
    {...props}
  />
);

export type StoriesContentProps = ComponentProps<typeof CarouselContent>;

export const StoriesContent = ({
  className,
  ...props
}: StoriesContentProps) => (
  <CarouselContent className={cn('gap-2', className)} {...props} />
);

export type StoryProps = HTMLAttributes<HTMLDivElement>;

export const Story = ({ className, ...props }: StoryProps) => (
  <CarouselItem className={cn('basis-auto !w-[200px] pl-2 md:pl-4', className)}>
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl bg-muted/40',
        'cursor-pointer transition-all duration-200',
        'hover:scale-[1.02] hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      role="button"
      tabIndex={0}
      {...props}
    />
  </CarouselItem>
);

export type StoryVideoProps = VideoHTMLAttributes<HTMLVideoElement>;

const tRegex = /t=(\d+(?:\.\d+)?)/;

export const StoryVideo = ({ className, ...props }: StoryVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialTimeRef = useRef<number>(0);

  useEffect(() => {
    const src = (props.src ?? '') as string;
    let initialTime = 0;
    if (typeof src === 'string') {
      const hashIndex = src.indexOf('#');
      if (hashIndex !== -1) {
        const hash = src.slice(hashIndex + 1);

        const tMatch = hash.match(tRegex);
        if (tMatch) {
          initialTime = Number.parseFloat(tMatch[1]);
        }
      }
    }
    initialTimeRef.current = initialTime;
  }, [props.src]);

  const handleMouseOver = () => {
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  const handleFocus = () => {
    videoRef.current?.play();
  };

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  return (
    <video
      className={cn(
        'absolute inset-0 size-full object-cover',
        'transition-opacity duration-200',
        'group-hover:opacity-90',
        className
      )}
      loop
      muted
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      preload="metadata"
      ref={videoRef}
      tabIndex={0}
      {...props}
    />
  );
};

export type StoryImageProps = ComponentProps<'img'> & {
  alt: string;
};

export const StoryImage = ({ className, alt, ...props }: StoryImageProps) => (
  <img
    alt={alt}
    className={cn(
      'absolute inset-0 h-full w-full object-cover',
      'transition-opacity duration-200',
      'group-hover:opacity-90',
      className
    )}
    {...props}
  />
);

export type StoryAuthorProps = HTMLAttributes<HTMLDivElement>;

export const StoryAuthor = ({
  className,
  children,
  ...props
}: StoryAuthorProps) => (
  <div
    className={cn(
      'absolute right-0 bottom-0 left-0 z-10',
      'p-3 text-white',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

export type StoryAuthorImageProps = ComponentProps<typeof Avatar> & {
  src?: string;
  name?: string;
  fallback?: string;
};

export const StoryAuthorImage = ({
  src,
  fallback,
  name,
  className,
  ...props
}: StoryAuthorImageProps) => (
  <Avatar className={cn('size-6 border border-white/20', className)} {...props}>
    {src && <AvatarImage alt={name} src={src} />}
    <AvatarFallback className='bg-white/10 text-white text-xs'>
      {fallback || name?.charAt(0)?.toUpperCase()}
    </AvatarFallback>
  </Avatar>
);

export type StoryAuthorNameProps = HTMLAttributes<HTMLSpanElement>;

export const StoryAuthorName = ({
  className,
  ...props
}: StoryAuthorNameProps) => (
  <span className={cn('truncate font-medium text-sm', className)} {...props} />
);

export type StoryTitleProps = HTMLAttributes<HTMLDivElement>;

export const StoryTitle = ({ className, ...props }: StoryTitleProps) => (
  <div
    className={cn(
      'absolute top-0 right-0 left-0 z-10',
      'p-3 text-white',
      className
    )}
    {...props}
  />
);

export type StoryOverlayProps = HTMLAttributes<HTMLDivElement> & {
  side?: 'top' | 'bottom';
};

export const StoryOverlay = ({
  className,
  side = 'bottom',
  ...props
}: StoryOverlayProps) => {
  const positionClasses =
    side === 'top' ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t';

  return (
    <div
      className={cn(
        'absolute right-0 left-0 h-10 from-black/20 to-transparent',
        positionClasses,
        className
      )}
      {...props}
    />
  );
};
```

Install NPM dependencies:
```bash
clsx, tailwind-merge
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
