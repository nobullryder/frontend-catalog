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
scroll-trigger-animations.tsx
'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  HTMLMotionProps,
  MapInputRange,
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react';
import Lenis from 'lenis';

interface UseSmoothScrollOptions {
  duration?: number;
  lerp?: number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  easing?: (t: number) => number;
}
const defaultOptions: UseSmoothScrollOptions = {
  duration: 0.08,
  lerp: 0.1,
  smoothWheel: true,
  touchMultiplier: 2,
  infinite: false,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const lenisRef = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    const mergedOptions = { ...defaultOptions, ...options };

    lenisRef.current = new Lenis({
      duration: mergedOptions.duration,
      lerp: mergedOptions.lerp,
      smoothWheel: mergedOptions.smoothWheel,
      touchMultiplier: mergedOptions.touchMultiplier,
      infinite: mergedOptions.infinite,
      orientation: mergedOptions.orientation,
      gestureOrientation: mergedOptions.gestureOrientation,
      easing: mergedOptions.easing,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return {
    lenis: lenisRef.current,
  };
}


interface ContainerScrollAnimationContextValue {
  scrollYProgress: MotionValue<number>;
}
const ContainerScrollAnimationContext = React.createContext<
  ContainerScrollAnimationContextValue | undefined
>(undefined);

export function useContainerScrollAnimationContext() {
  const context = React.useContext(ContainerScrollAnimationContext);
  if (!context) {
    throw new Error(
      'useContainerScrollAnimationContext must be used within a ContainerScrollAnimationContextProvider',
    );
  }
  return context;
}

export function ContainerScrollAnimation({
  spacerClass,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { spacerClass?: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  useSmoothScroll();
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  return (
    <ContainerScrollAnimationContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn('relative', className)} {...props}>
        {children}
        <div className={cn('w-full h-96', spacerClass)} />
      </div>
    </ContainerScrollAnimationContext.Provider>
  );
}

export function ContainerScrollInsetX({
  insetRange = [48, 0],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { insetRange?: number[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const xInset = useTransform(scrollYProgress, inputRange, insetRange);
  const clipPath = useMotionTemplate`inset(0px ${xInset}px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}
export function ContainerScrollInsetY({
  insetRange = [48, 0],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { insetRange?: number[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const yInset = useTransform(scrollYProgress, inputRange, insetRange);
  const clipPath = useMotionTemplate`inset(${yInset}px 0px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}

export function ContainerScrollInset({
  inputRange = [0, 1],
  insetRangeY = [45, 0],
  insetXRange = [45, 0],
  roundednessRange = [16, 16],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & {
  inputRange?: MapInputRange;
  insetRangeY?: unknown[];
  insetXRange?: unknown[];
  roundednessRange?: unknown[];
}) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const insetY = useTransform(scrollYProgress, inputRange, insetRangeY);
  const insetX = useTransform(scrollYProgress, inputRange, insetXRange);
  const roundedness = useTransform(
    scrollYProgress,
    inputRange,
    roundednessRange,
  );

  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}

export function ContainerScrollTranslate({
  yRange = [0, 384],
  inputRange = [0, 1],
  style,
  className,
  ...props
}: HTMLMotionProps<'div'> & { yRange?: unknown[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const y = useTransform(scrollYProgress, inputRange, yRange);
  return (
    <motion.div
      style={{ y, ...style }}
      className={cn('relative', className)}
      {...props}
    />
  );
}

export function ContainerScrollScale({
  scaleRange = [1.2, 1],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { scaleRange?: unknown[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);
  return (
    <motion.div className={className} style={{ scale, ...style }} {...props} />
  );
}
export function ContainerScrollRadius({
  radiusRange = [9999, 16],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & {
  radiusRange?: unknown[];
  inputRange?: number[];
}) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const borderRadius = useTransform(scrollYProgress, inputRange, radiusRange);
  return (
    <motion.div
      layout
      className={className}
      style={{ borderRadius, ...style }}
      {...props}
    />
  );
}

code.demo.1751385214667.tsx
import { ContainerScrollAnimation,
  ContainerScrollInsetX,
  ContainerScrollScale,
  ContainerScrollTranslate,
 } from "@/components/ui/scroll-trigger-animations";

const IMAGES_1 = [
  'https://images.unsplash.com/photo-1529218402470-5dec8fea0761?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1717008303072-88c8ad26c3ff?q=80&w=2663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1716855048433-50d4db79ba14?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
const IMAGES_2 = [
  'https://images.unsplash.com/photo-1712183465613-555424cf0e69?q=80&w=2661&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1560360482-d5588f13d530?q=80&w=2687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1712183465613-555424cf0e69?q=80&w=2661&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1493515322954-4fa727e97985?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D',
];
const IMAGES_3 = [
  'https://images.unsplash.com/photo-1687647849698-e54685db9ae3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1658195686058-3b790484ae7e?q=80&w=2452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1629692905066-d202dad72ebf?q=80&w=2678&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1608875004752-2fdb6a39ba4c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export default function DemoOne() {
  return (
    <ContainerScrollAnimation className="overflow-hidden">
      <ContainerScrollTranslate className="h-dvh relative">
        <ContainerScrollInsetX className="h-full relative">
          <ContainerScrollScale className="flex bg-secondary gap-2 overflow-hidden px-6">
            <ContainerScrollTranslate
              yRange={['0%', '-10%']}
              className="flex flex-col gap-2"
            >
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-[4/2.5] inline-block align-middle h-auto max-h-full w-full  object-cover"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </ContainerScrollTranslate>

            <ContainerScrollTranslate
              yRange={['0%', '20%']}
              className="flex mt-[-20%] relative flex-col gap-2"
            >
              {IMAGES_2.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-[4/2.5] inline-block align-middle h-auto max-h-full w-full  object-cover"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </ContainerScrollTranslate>

            <ContainerScrollTranslate
              yRange={['0%', '-10%']}
              className="hidden md:flex flex-col gap-2"
            >
              {IMAGES_3.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-[4/2.5] inline-block align-middle h-auto max-h-full w-full  object-cover"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </ContainerScrollTranslate>
          </ContainerScrollScale>
        </ContainerScrollInsetX>
      </ContainerScrollTranslate>
    </ContainerScrollAnimation>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-trigger-animations.tsx
'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  HTMLMotionProps,
  MapInputRange,
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react';
import Lenis from 'lenis';

interface UseSmoothScrollOptions {
  duration?: number;
  lerp?: number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  easing?: (t: number) => number;
}
const defaultOptions: UseSmoothScrollOptions = {
  duration: 0.08,
  lerp: 0.1,
  smoothWheel: true,
  touchMultiplier: 2,
  infinite: false,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const lenisRef = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    const mergedOptions = { ...defaultOptions, ...options };

    lenisRef.current = new Lenis({
      duration: mergedOptions.duration,
      lerp: mergedOptions.lerp,
      smoothWheel: mergedOptions.smoothWheel,
      touchMultiplier: mergedOptions.touchMultiplier,
      infinite: mergedOptions.infinite,
      orientation: mergedOptions.orientation,
      gestureOrientation: mergedOptions.gestureOrientation,
      easing: mergedOptions.easing,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return {
    lenis: lenisRef.current,
  };
}


interface ContainerScrollAnimationContextValue {
  scrollYProgress: MotionValue<number>;
}
const ContainerScrollAnimationContext = React.createContext<
  ContainerScrollAnimationContextValue | undefined
>(undefined);

export function useContainerScrollAnimationContext() {
  const context = React.useContext(ContainerScrollAnimationContext);
  if (!context) {
    throw new Error(
      'useContainerScrollAnimationContext must be used within a ContainerScrollAnimationContextProvider',
    );
  }
  return context;
}

export function ContainerScrollAnimation({
  spacerClass,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { spacerClass?: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  useSmoothScroll();
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  return (
    <ContainerScrollAnimationContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn('relative', className)} {...props}>
        {children}
        <div className={cn('w-full h-96', spacerClass)} />
      </div>
    </ContainerScrollAnimationContext.Provider>
  );
}

export function ContainerScrollInsetX({
  insetRange = [48, 0],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { insetRange?: number[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const xInset = useTransform(scrollYProgress, inputRange, insetRange);
  const clipPath = useMotionTemplate`inset(0px ${xInset}px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}
export function ContainerScrollInsetY({
  insetRange = [48, 0],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { insetRange?: number[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const yInset = useTransform(scrollYProgress, inputRange, insetRange);
  const clipPath = useMotionTemplate`inset(${yInset}px 0px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}

export function ContainerScrollInset({
  inputRange = [0, 1],
  insetRangeY = [45, 0],
  insetXRange = [45, 0],
  roundednessRange = [16, 16],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & {
  inputRange?: MapInputRange;
  insetRangeY?: unknown[];
  insetXRange?: unknown[];
  roundednessRange?: unknown[];
}) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const insetY = useTransform(scrollYProgress, inputRange, insetRangeY);
  const insetX = useTransform(scrollYProgress, inputRange, insetXRange);
  const roundedness = useTransform(
    scrollYProgress,
    inputRange,
    roundednessRange,
  );

  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;
  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      {...props}
    />
  );
}

export function ContainerScrollTranslate({
  yRange = [0, 384],
  inputRange = [0, 1],
  style,
  className,
  ...props
}: HTMLMotionProps<'div'> & { yRange?: unknown[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const y = useTransform(scrollYProgress, inputRange, yRange);
  return (
    <motion.div
      style={{ y, ...style }}
      className={cn('relative', className)}
      {...props}
    />
  );
}

export function ContainerScrollScale({
  scaleRange = [1.2, 1],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { scaleRange?: unknown[]; inputRange?: number[] }) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const scale = useTransform(scrollYProgress, inputRange, scaleRange);
  return (
    <motion.div className={className} style={{ scale, ...style }} {...props} />
  );
}
export function ContainerScrollRadius({
  radiusRange = [9999, 16],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & {
  radiusRange?: unknown[];
  inputRange?: number[];
}) {
  const { scrollYProgress } = useContainerScrollAnimationContext();
  const borderRadius = useTransform(scrollYProgress, inputRange, radiusRange);
  return (
    <motion.div
      layout
      className={className}
      style={{ borderRadius, ...style }}
      {...props}
    />
  );
}
```

Install NPM dependencies:
```bash
motion, lenis
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
