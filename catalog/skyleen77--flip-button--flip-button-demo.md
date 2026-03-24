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
flip-button.tsx
'use client';

import * as React from 'react';
import {
  type HTMLMotionProps,
  type Transition,
  type Variant,
  motion,
} from 'motion/react';

import { cn } from '@/lib/utils';

type FlipDirection = 'top' | 'bottom' | 'left' | 'right';

interface FlipButtonProps extends HTMLMotionProps<'button'> {
  frontText: string;
  backText: string;
  transition?: Transition;
  frontClassName?: string;
  backClassName?: string;
  from?: FlipDirection;
}

const defaultSpanClassName =
  'absolute inset-0 flex items-center justify-center rounded-lg';

const FlipButton = React.forwardRef<HTMLButtonElement, FlipButtonProps>(
  (
    {
      frontText,
      backText,
      transition = { type: 'spring', stiffness: 280, damping: 20 },
      className,
      frontClassName,
      backClassName,
      from = 'top',
      ...props
    },
    ref,
  ) => {
    const isVertical = from === 'top' || from === 'bottom';
    const rotateAxis = isVertical ? 'rotateX' : 'rotateY';

    const frontOffset = from === 'top' || from === 'left' ? '50%' : '-50%';
    const backOffset = from === 'top' || from === 'left' ? '-50%' : '50%';

    const buildVariant = (
      opacity: number,
      rotation: number,
      offset: string | null = null,
    ): Variant => ({
      opacity,
      [rotateAxis]: rotation,
      ...(isVertical && offset !== null ? { y: offset } : {}),
      ...(!isVertical && offset !== null ? { x: offset } : {}),
    });

    const frontVariants = {
      initial: buildVariant(1, 0, '0%'),
      hover: buildVariant(0, 90, frontOffset),
    };

    const backVariants = {
      initial: buildVariant(0, 90, backOffset),
      hover: buildVariant(1, 0, '0%'),
    };

    return (
      <motion.button
        ref={ref}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        className={cn(
          'relative inline-block h-10 px-4 py-2 text-sm font-medium cursor-pointer perspective-[1000px] focus:outline-none',
          className,
        )}
        {...props}
      >
        <motion.span
          variants={frontVariants}
          transition={transition}
          className={cn(
            defaultSpanClassName,
            'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-white',
            frontClassName,
          )}
        >
          {frontText}
        </motion.span>
        <motion.span
          variants={backVariants}
          transition={transition}
          className={cn(
            defaultSpanClassName,
            'bg-neutral-800 text-white dark:bg-white dark:text-neutral-800',
            backClassName,
          )}
        >
          {backText}
        </motion.span>
        <span className="invisible">{frontText}</span>
      </motion.button>
    );
  },
);

FlipButton.displayName = 'FlipButton';

export { FlipButton, type FlipButtonProps, type FlipDirection };


code.demo.tsx
import { FlipButton } from "@/components/ui/flip-button"

export const FlipButtonDemo = () => {
  return <FlipButton frontText="Front Text" backText="Back Text" />;
};

```

Copy-paste these files for dependencies:
```tsx
/components/ui/flip-button.tsx
'use client';

import * as React from 'react';
import {
  type HTMLMotionProps,
  type Transition,
  type Variant,
  motion,
} from 'motion/react';

import { cn } from '@/lib/utils';

type FlipDirection = 'top' | 'bottom' | 'left' | 'right';

interface FlipButtonProps extends HTMLMotionProps<'button'> {
  frontText: string;
  backText: string;
  transition?: Transition;
  frontClassName?: string;
  backClassName?: string;
  from?: FlipDirection;
}

const defaultSpanClassName =
  'absolute inset-0 flex items-center justify-center rounded-lg';

const FlipButton = React.forwardRef<HTMLButtonElement, FlipButtonProps>(
  (
    {
      frontText,
      backText,
      transition = { type: 'spring', stiffness: 280, damping: 20 },
      className,
      frontClassName,
      backClassName,
      from = 'top',
      ...props
    },
    ref,
  ) => {
    const isVertical = from === 'top' || from === 'bottom';
    const rotateAxis = isVertical ? 'rotateX' : 'rotateY';

    const frontOffset = from === 'top' || from === 'left' ? '50%' : '-50%';
    const backOffset = from === 'top' || from === 'left' ? '-50%' : '50%';

    const buildVariant = (
      opacity: number,
      rotation: number,
      offset: string | null = null,
    ): Variant => ({
      opacity,
      [rotateAxis]: rotation,
      ...(isVertical && offset !== null ? { y: offset } : {}),
      ...(!isVertical && offset !== null ? { x: offset } : {}),
    });

    const frontVariants = {
      initial: buildVariant(1, 0, '0%'),
      hover: buildVariant(0, 90, frontOffset),
    };

    const backVariants = {
      initial: buildVariant(0, 90, backOffset),
      hover: buildVariant(1, 0, '0%'),
    };

    return (
      <motion.button
        ref={ref}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        className={cn(
          'relative inline-block h-10 px-4 py-2 text-sm font-medium cursor-pointer perspective-[1000px] focus:outline-none',
          className,
        )}
        {...props}
      >
        <motion.span
          variants={frontVariants}
          transition={transition}
          className={cn(
            defaultSpanClassName,
            'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-white',
            frontClassName,
          )}
        >
          {frontText}
        </motion.span>
        <motion.span
          variants={backVariants}
          transition={transition}
          className={cn(
            defaultSpanClassName,
            'bg-neutral-800 text-white dark:bg-white dark:text-neutral-800',
            backClassName,
          )}
        >
          {backText}
        </motion.span>
        <span className="invisible">{frontText}</span>
      </motion.button>
    );
  },
);

FlipButton.displayName = 'FlipButton';

export { FlipButton, type FlipButtonProps, type FlipDirection };

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
