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
scroll-x-carousel.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from 'motion/react';

interface ScrollXCarouselContextValue {
  scrollYProgress: MotionValue<number>;
}

const ScrollXCarouselContext =
  React.createContext<ScrollXCarouselContextValue | null>(null);
function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext);
  if (!context) {
    throw new Error('useScrollXCarousel must be used within a ScrollXCarousel');
  }
  return context;
}
export function ScrollXCarousel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
  });
  return (
    <ScrollXCarouselContext.Provider value={{ scrollYProgress }}>
      <div
        ref={carouselRef}
        className={cn('relative w-screen max-w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  );
}

export function ScrollXCarouselContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sticky overflow-hidden w-full top-0 left-0', className)}
      {...props}
    />
  );
}
export function ScrollXCarouselWrap({
  className,
  style,
  xRagnge = ['-0%', '-80%'],
  ...props
}: HTMLMotionProps<'div'> & { xRagnge?: unknown[] }) {
  const { scrollYProgress } = useScrollXCarousel();
  const x = useTransform(scrollYProgress, [0, 1], xRagnge);

  return (
    <motion.div
      className={cn('w-fit', className)}
      style={{ x, ...style }}
      {...props}
    />
  );
}
export function ScrollXCarouselProgress({
  className,
  style,
  progressStyle,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { progressStyle?: string }) {
  const { scrollYProgress } = useScrollXCarousel();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className={cn('max-w-screen overflow-hidden', className)} {...props}>
      <motion.div
        className={cn('origin-left', progressStyle)}
        style={{ scaleX, ...style }}
      />
    </div>
  );
}


code.demo.1751566874898.tsx
import { ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap } from "@/components/ui/scroll-x-carousel";

const IMAGES = [
  'https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export default function ReversedDemo() {
    return (
         <ScrollXCarousel className="h-[110vh]">
        <ScrollXCarouselContainer className="h-screen relative place-content-center flex flex-col space-y-4 py-12">
          <div className=" pointer-events-none w-[12vw] h-[103%] absolute inset-[0_auto_0_0] z-10 bg-[linear-gradient(90deg,_var(--background)_35%,_transparent)]" />
          <div className="pointer-events-none bg-[linear-gradient(270deg,_var(--background)_35%,_transparent)] w-[15vw] h-[103%] absolute inset-[0_0_0_auto] z-10" />
          <ScrollXCarouselWrap
            xRagnge={['5%', '-60%']}
            className="relative flex space-x-4 [&>*:first-child]:ml-8"
          >
            {IMAGES.map((imageUrl, index) => (
              <div
                className="min-w-[42vw] aspect-video  overflow-hidden"
                key={index}
              >
                <img
                  alt="agency showcase"
                  src={imageUrl}
                  className="size-full object-cover"
                />
              </div>
            ))}
          </ScrollXCarouselWrap>
          <ScrollXCarouselWrap
            xRagnge={['-70%', '0%']}
            className="relative flex space-x-4 [&>*:first-child]:ml-8"
          >
            {IMAGES.reverse().map((imageUrl, index) => (
              <div
                className="min-w-[42vw] aspect-video overflow-hidden"
                key={index}
              >
                <img
                  alt="agency showcase"
                  src={imageUrl}
                  className="size-full object-cover"
                />
              </div>
            ))}
          </ScrollXCarouselWrap>
        </ScrollXCarouselContainer>
      </ScrollXCarousel>
    )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-x-carousel.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from 'motion/react';

interface ScrollXCarouselContextValue {
  scrollYProgress: MotionValue<number>;
}

const ScrollXCarouselContext =
  React.createContext<ScrollXCarouselContextValue | null>(null);
function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext);
  if (!context) {
    throw new Error('useScrollXCarousel must be used within a ScrollXCarousel');
  }
  return context;
}
export function ScrollXCarousel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
  });
  return (
    <ScrollXCarouselContext.Provider value={{ scrollYProgress }}>
      <div
        ref={carouselRef}
        className={cn('relative w-screen max-w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  );
}

export function ScrollXCarouselContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sticky overflow-hidden w-full top-0 left-0', className)}
      {...props}
    />
  );
}
export function ScrollXCarouselWrap({
  className,
  style,
  xRagnge = ['-0%', '-80%'],
  ...props
}: HTMLMotionProps<'div'> & { xRagnge?: unknown[] }) {
  const { scrollYProgress } = useScrollXCarousel();
  const x = useTransform(scrollYProgress, [0, 1], xRagnge);

  return (
    <motion.div
      className={cn('w-fit', className)}
      style={{ x, ...style }}
      {...props}
    />
  );
}
export function ScrollXCarouselProgress({
  className,
  style,
  progressStyle,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { progressStyle?: string }) {
  const { scrollYProgress } = useScrollXCarousel();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className={cn('max-w-screen overflow-hidden', className)} {...props}>
      <motion.div
        className={cn('origin-left', progressStyle)}
        style={{ scaleX, ...style }}
      />
    </div>
  );
}

```

Install NPM dependencies:
```bash
motion
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
