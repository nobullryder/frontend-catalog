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
scroll-progress.tsx
'use client';
import * as React from 'react';
import { ArrowDown } from 'lucide-react';
import {
  motion,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'motion/react';
import { cn } from '@/lib/utils';

type ScrollProgressProps = React.ComponentProps<'div'> & {
  progressProps?: HTMLMotionProps<'div'>;
};

function ScrollProgress({
  ref,
  className,
  children,
  progressProps,
  ...props
}: ScrollProgressProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const { scrollYProgress } = useScroll(
    children ? { container: containerRef } : undefined,
  );

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    bounce: 0,
  });

  return (
    <>
      <motion.div
        data-slot="scroll-progress"
        {...progressProps}
        style={{ scaleX }}
        className={cn(
          'fixed z-50 top-0 inset-x-0 h-1 bg-blue-500 origin-left',
          progressProps?.className,
        )}
      />
      {containerRef && (
        <div
          ref={containerRef}
          data-slot="scroll-progress-container"
          className={cn('overflow-y-auto h-full', className)}
          {...props}
        >
          {children}
        </div>
      )}
    </>
  );
}

export const Component = () => {
  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <ScrollProgress progressProps={{ className: 'absolute' }}>
          <div className="size-full flex items-center justify-center dark:bg-neutral-950 bg-white">
            <p className="flex items-center gap-2 font-medium">
              Scroll down to see the progress bar{' '}
              <motion.span
                animate={{ y: [3, -3, 3] }}
                transition={{
                  duration: 1.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  type: 'keyframes',
                }}
              >
                <ArrowDown className="size-5" />
              </motion.span>
            </p>
          </div>
          <div className="size-full dark:bg-neutral-900 bg-neutral-100" />
          <div className="size-full dark:bg-neutral-950 bg-white" />
          <div className="size-full dark:bg-neutral-900 bg-neutral-100" />
          <div className="size-full dark:bg-neutral-950 bg-white" />
        </ScrollProgress>
      </div>
    </div>
  );
};

code.demo.1750170248248.tsx
'use client';
import { Component } from "@/components/ui/scroll-progress";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="max-w-[400px] h-[400px] w-full rounded-xl bg-muted relative">
        <Component />
      </div>
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-progress.tsx
'use client';
import * as React from 'react';
import { ArrowDown } from 'lucide-react';
import {
  motion,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'motion/react';
import { cn } from '@/lib/utils';

type ScrollProgressProps = React.ComponentProps<'div'> & {
  progressProps?: HTMLMotionProps<'div'>;
};

function ScrollProgress({
  ref,
  className,
  children,
  progressProps,
  ...props
}: ScrollProgressProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const { scrollYProgress } = useScroll(
    children ? { container: containerRef } : undefined,
  );

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    bounce: 0,
  });

  return (
    <>
      <motion.div
        data-slot="scroll-progress"
        {...progressProps}
        style={{ scaleX }}
        className={cn(
          'fixed z-50 top-0 inset-x-0 h-1 bg-blue-500 origin-left',
          progressProps?.className,
        )}
      />
      {containerRef && (
        <div
          ref={containerRef}
          data-slot="scroll-progress-container"
          className={cn('overflow-y-auto h-full', className)}
          {...props}
        >
          {children}
        </div>
      )}
    </>
  );
}

export const Component = () => {
  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <ScrollProgress progressProps={{ className: 'absolute' }}>
          <div className="size-full flex items-center justify-center dark:bg-neutral-950 bg-white">
            <p className="flex items-center gap-2 font-medium">
              Scroll down to see the progress bar{' '}
              <motion.span
                animate={{ y: [3, -3, 3] }}
                transition={{
                  duration: 1.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  type: 'keyframes',
                }}
              >
                <ArrowDown className="size-5" />
              </motion.span>
            </p>
          </div>
          <div className="size-full dark:bg-neutral-900 bg-neutral-100" />
          <div className="size-full dark:bg-neutral-950 bg-white" />
          <div className="size-full dark:bg-neutral-900 bg-neutral-100" />
          <div className="size-full dark:bg-neutral-950 bg-white" />
        </ScrollProgress>
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, motion
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
