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
wavy-text-block.tsx
'use client';

import {
  HTMLMotionProps,
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import React from 'react';

interface WavyTextsConfig {
  baseOffsetFactor: number;
  baseExtra: number;
  baseAmplitude: number;
  lengthEffect: number;
  frequency: number;
  progressScale: number;
  phaseShiftDeg: number;
  spring: SpringOptions;
}
interface WavyBlockItemProps extends HTMLMotionProps<'div'> {
  index: number;
  config?: WavyTextsConfig;
}
interface WavyBlockContextValue {
  scrollYProgress: MotionValue<number>;
  maxLen: number;
}

const WavyBlockContext = React.createContext<WavyBlockContextValue | undefined>(
  undefined,
);

function useWavyBlockContext() {
  const context = React.useContext(WavyBlockContext);
  if (context === undefined) {
    throw new Error('useWavyBlockContext must be used within a WavyBlock');
  }
  return context;
}
const toRadian = (deg: number) => (deg * Math.PI) / 180;

export function WavyBlockItem({
  index,
  config = {
    baseOffsetFactor: 0.1,
    baseExtra: 0,
    baseAmplitude: 160,
    lengthEffect: 0.6,
    frequency: 35,
    progressScale: 6,
    phaseShiftDeg: -180,
    spring: { damping: 22, stiffness: 300 },
  },
  style,
  ...props
}: WavyBlockItemProps) {
  const { scrollYProgress, maxLen } = useWavyBlockContext();
  const reducedMotion = useReducedMotion();
  const lengthFactor = Math.min(1, Math.max(0, maxLen / (maxLen || 1)));

  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const calculateX = React.useCallback(
    (p: number, windowWidth?: number) => {
      const phase = config.progressScale * p;

      const width =
        windowWidth ??
        (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const baseOffset = config.baseOffsetFactor * width + config.baseExtra;

      const amplitudeScale = 1 - config.lengthEffect * lengthFactor;
      const amplitude = config.baseAmplitude * amplitudeScale;

      const angle =
        toRadian(config.frequency * index) +
        phase +
        toRadian(config.phaseShiftDeg);

      return baseOffset + amplitude * Math.cos(angle);
    },
    [config, lengthFactor, index],
  );

  const initialX = calculateX(0, 1200);
  const rawX = useMotionValue(initialX);
  const springX = useSpring(rawX, config.spring);
  const x = reducedMotion ? rawX : springX;

  React.useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!scrollYProgress || !isMounted) return;

    const unsub = scrollYProgress.onChange((p) => {
      const windowWidth =
        typeof window !== 'undefined' ? window.innerWidth : 1200;
      const newX = calculateX(p, windowWidth);
      rawX.set(newX);
    });

    return () => {
      if (unsub) unsub();
    };
  }, [scrollYProgress, rawX, calculateX, isMounted]);

  return (
    <motion.div style={{ x, ...style }} suppressHydrationWarning {...props} />
  );
}

export function WavyBlock({
  offset = ['start end', 'end start'],
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: React.ComponentPropsWithRef<'div'> & { offset?: any }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { current } = containerRef;

  const maxLen = React.useMemo(() => {
    if (!current?.children || current.children.length === 0) return 1;
    const childrenArray = Array.from(current.children);
    return Math.max(
      ...childrenArray.map((child) => (child ? String(child).length : 0)),
    );
  }, [current?.children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });
  return (
    <WavyBlockContext.Provider value={{ scrollYProgress, maxLen }}>
      <div ref={containerRef} {...props} />
    </WavyBlockContext.Provider>
  );
}


code.demo.1762272281418.tsx
import { WavyBlock, WavyBlockItem } from "@/components/ui/wavy-text-block";
const titles = [
  'Flexible',
  'Animated',
  'Customizable',
  'Optimized',
  'Lightweight',
  'Responsive',
  'UI Blocks',
];

export default function DemoOne() {
  return (
     <main className="h-[300vh] pt-60 overflow-hidden">
       <div className="max-w-6xl">
      <WavyBlock className="flex flex-col justify-start items-start gap-6">
        {titles.map((title, index) => (
          <WavyBlockItem key={title} index={index}>
            <h2 className=" text-[9.3vw] font-bold leading-none tracking-tighter uppercase whitespace-nowrap">
              {title}
            </h2>
          </WavyBlockItem>
        ))}
      </WavyBlock>
    </div>
     </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/wavy-text-block.tsx
'use client';

import {
  HTMLMotionProps,
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import React from 'react';

interface WavyTextsConfig {
  baseOffsetFactor: number;
  baseExtra: number;
  baseAmplitude: number;
  lengthEffect: number;
  frequency: number;
  progressScale: number;
  phaseShiftDeg: number;
  spring: SpringOptions;
}
interface WavyBlockItemProps extends HTMLMotionProps<'div'> {
  index: number;
  config?: WavyTextsConfig;
}
interface WavyBlockContextValue {
  scrollYProgress: MotionValue<number>;
  maxLen: number;
}

const WavyBlockContext = React.createContext<WavyBlockContextValue | undefined>(
  undefined,
);

function useWavyBlockContext() {
  const context = React.useContext(WavyBlockContext);
  if (context === undefined) {
    throw new Error('useWavyBlockContext must be used within a WavyBlock');
  }
  return context;
}
const toRadian = (deg: number) => (deg * Math.PI) / 180;

export function WavyBlockItem({
  index,
  config = {
    baseOffsetFactor: 0.1,
    baseExtra: 0,
    baseAmplitude: 160,
    lengthEffect: 0.6,
    frequency: 35,
    progressScale: 6,
    phaseShiftDeg: -180,
    spring: { damping: 22, stiffness: 300 },
  },
  style,
  ...props
}: WavyBlockItemProps) {
  const { scrollYProgress, maxLen } = useWavyBlockContext();
  const reducedMotion = useReducedMotion();
  const lengthFactor = Math.min(1, Math.max(0, maxLen / (maxLen || 1)));

  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const calculateX = React.useCallback(
    (p: number, windowWidth?: number) => {
      const phase = config.progressScale * p;

      const width =
        windowWidth ??
        (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const baseOffset = config.baseOffsetFactor * width + config.baseExtra;

      const amplitudeScale = 1 - config.lengthEffect * lengthFactor;
      const amplitude = config.baseAmplitude * amplitudeScale;

      const angle =
        toRadian(config.frequency * index) +
        phase +
        toRadian(config.phaseShiftDeg);

      return baseOffset + amplitude * Math.cos(angle);
    },
    [config, lengthFactor, index],
  );

  const initialX = calculateX(0, 1200);
  const rawX = useMotionValue(initialX);
  const springX = useSpring(rawX, config.spring);
  const x = reducedMotion ? rawX : springX;

  React.useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!scrollYProgress || !isMounted) return;

    const unsub = scrollYProgress.onChange((p) => {
      const windowWidth =
        typeof window !== 'undefined' ? window.innerWidth : 1200;
      const newX = calculateX(p, windowWidth);
      rawX.set(newX);
    });

    return () => {
      if (unsub) unsub();
    };
  }, [scrollYProgress, rawX, calculateX, isMounted]);

  return (
    <motion.div style={{ x, ...style }} suppressHydrationWarning {...props} />
  );
}

export function WavyBlock({
  offset = ['start end', 'end start'],
  ...props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: React.ComponentPropsWithRef<'div'> & { offset?: any }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { current } = containerRef;

  const maxLen = React.useMemo(() => {
    if (!current?.children || current.children.length === 0) return 1;
    const childrenArray = Array.from(current.children);
    return Math.max(
      ...childrenArray.map((child) => (child ? String(child).length : 0)),
    );
  }, [current?.children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });
  return (
    <WavyBlockContext.Provider value={{ scrollYProgress, maxLen }}>
      <div ref={containerRef} {...props} />
    </WavyBlockContext.Provider>
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
