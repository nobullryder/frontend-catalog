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
text-stagger-hover.tsx

'use client';
import * as React from 'react';

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

export type StaggerDirection = 'start' | 'middle' | 'end';

export interface StaggerOptions {
  direction?: StaggerDirection;
  staggerValue?: number;
  totalItems: number;
  index: number;
}

export function setStaggerDirection({
  direction = 'start',
  staggerValue = 0.02,
  totalItems,
  index,
}: StaggerOptions): number {
  switch (direction) {
    case 'start':
      return index * staggerValue;

    case 'middle':
      const middleIndex = Math.floor(totalItems / 2);
      return Math.abs(index - middleIndex) * staggerValue;

    case 'end':
      return (totalItems - 1 - index) * staggerValue;

    default:
      return 0;
  }
}
export function splitText(text: string): SplitTextResult {

  if (!text?.trim()) {
    return {
      words: [],
      characters: [],
      wordCount: 0,
      characterCount: 0,
    };
  }

  const words = text.split(' ').map((word) => word.concat(' '));

  const characters = words.map((word) => word.split('')).flat(1);

  return {
    words,
    characters,
    wordCount: words.length,
    characterCount: characters.length,
  };
}
export type AnimationT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'z'
  | 'blur'
  | undefined;

export function useAnimationVariants(animation?: AnimationT) {
  return React.useMemo(
    () => ({
      hidden: {
        x: animation === 'left' ? '-100%' : animation === 'right' ? '100%' : 0,
        y: animation === 'top' ? '-100%' : animation === 'bottom' ? '100%' : 0,
        scale: animation === 'z' ? 0 : 1,
        filter: animation === 'blur' ? 'blur(10px)' : 'blur(0px)',
        opacity: 0,
      },
      visible: {
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        opacity: 1,
      },
    }),
    [animation],
  );
}

interface TextStaggerHoverProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

interface TextStaggerHoverContextValue {
  isMouseIn: boolean;
}
const TextStaggerHoverContext = React.createContext<
  TextStaggerHoverContextValue | undefined
>(undefined);
function useTextStaggerHoverContext() {
  const context = React.useContext(TextStaggerHoverContext);
  if (!context) {
    throw new Error(
      'useTextStaggerHoverContext must be used within an TextStaggerHoverContextProvider',
    );
  }
  return context;
}

export const TextStaggerHover = ({
  as: Component = 'span',
  children,
  className,
  ...props
}: TextStaggerHoverProps) => {
  const [isMouseIn, setIsMouseIn] = React.useState<boolean>(false);
  const handleMouse = () => setIsMouseIn((prevState) => !prevState);

  return (
    <TextStaggerHoverContext.Provider value={{ isMouseIn }}>
      <Component
        className={cn('relative inline-block overflow-hidden', className)}
        {...props}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        {children}
      </Component>
    </TextStaggerHoverContext.Provider>
  );
};
interface TextStaggerHoverContentProps extends HTMLMotionProps<'span'> {
  animation?: AnimationT;
  staggerDirection?: StaggerDirection;
}
export const TextStaggerHoverActive = ({
  animation,
  staggerDirection = 'start',
  children,
  className,
  transition,
  ...props
}: TextStaggerHoverContentProps) => {
  const { characters, characterCount } = splitText(String(children));
  const animationVariants = useAnimationVariants(animation);
  const { isMouseIn } = useTextStaggerHoverContext();
  return (
    <span className={cn('inline-block text-nowrap', className)}>
      {characters.map((char, index) => {
        const staggerDelay = setStaggerDirection({
          direction: staggerDirection,
          totalItems: characterCount,
          index,
        });
        return (
          <motion.span
            className="inline-block"
            key={`${char}-${index}`}
            variants={animationVariants}
            animate={isMouseIn ? 'hidden' : 'visible'}
            transition={{
              delay: staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 0.3,
              ...transition,
            }}
            {...props}
          >
            {char}
            {char === ' ' && index < characters.length - 1 && <>&nbsp;</>}
          </motion.span>
        );
      })}
    </span>
  );
};

export const TextStaggerHoverHidden = ({
  animation,
  staggerDirection = 'start',
  children,
  className,
  transition,
  ...props
}: TextStaggerHoverContentProps) => {
  const { characters, characterCount } = splitText(String(children));
  const animationVariants = useAnimationVariants(animation);
  const { isMouseIn } = useTextStaggerHoverContext();
  return (
    <span className={cn('inline-block absolute left-0 top-0 text-nowrap', className)}>
      {characters.map((char, index) => {
        const staggerDelay = setStaggerDirection({
          direction: staggerDirection,
          totalItems: characterCount,
          index,
        });
        return (
          <motion.span
            className="inline-block"
            key={`${char}-${index}`}
            variants={animationVariants}
            animate={isMouseIn ? 'visible' : 'hidden'}
            transition={{
              delay: staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 0.3,
              ...transition,
            }}
            {...props}
          >
            {char}
            {char === ' ' && index < characters.length - 1 && <>&nbsp;</>}
          </motion.span>
        );
      })}
    </span>
  );
};


code.demo.1749489333465.tsx
import { TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden  } from "@/components/ui/text-stagger-hover";

const DemoOne = () => {
  return <div className="min-h-dvh w-full p-6 justify-center flex flex-col items-center space-y-4 text-center">
    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"top"}
        className="opacity-20 origin-top"
      >
        Stagger animation y
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        className="origin-bottom"
        animation="bottom"
      >
        Stagger Animation y
      </TextStaggerHoverHidden>
    </TextStaggerHover>

    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"right"}
        className="opacity-20 origin-right"
      >
        Stagger animation x
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        className="origin-left"
        animation="left"
      >
        Stagger Animation x
      </TextStaggerHoverHidden>
    </TextStaggerHover>

    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"z"}
        className="opacity-20"
      >
        Stagger animation z
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        animation="z"
      >
        Stagger Animation z
      </TextStaggerHoverHidden>
    </TextStaggerHover>

    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"blur"}
        className="opacity-20"
      >
        Stagger animation blur
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        animation="blur"
      >
        Stagger Animation blur
      </TextStaggerHoverHidden>
    </TextStaggerHover>

    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"top"}
        className="opacity-20"
        staggerDirection="middle"
      >
        Stagger middle direction
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        className="origin-bottom"
        animation="bottom"
        staggerDirection="middle"
      >
        Stagger middle direction
      </TextStaggerHoverHidden>
    </TextStaggerHover>

    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"right"}
        className="opacity-20"
        staggerDirection="start"
      >
        Stagger start direction
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        animation="left"
        staggerDirection="end"
      >
        Stagger final direction
      </TextStaggerHoverHidden>
    </TextStaggerHover>

    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"top"}
        className="opacity-20"
        staggerDirection="middle"
      >
        Stagger middle direction
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        className="origin-bottom"
        animation="bottom"
        staggerDirection="middle"
      >
        Stagger middle direction
      </TextStaggerHoverHidden>
    </TextStaggerHover>

    <TextStaggerHover as="h2" className="text-3xl font-bold uppercase">
      <TextStaggerHoverActive 
        animation={"top"}
        className="text-slate-700"
      >
        Text Different Style
      </TextStaggerHoverActive>
      <TextStaggerHoverHidden 
        animation="bottom"
        className="text-indigo-500"
      >
        Text Different Style
      </TextStaggerHoverHidden>
    </TextStaggerHover>
  </div>
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-stagger-hover.tsx

'use client';
import * as React from 'react';

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

export type StaggerDirection = 'start' | 'middle' | 'end';

export interface StaggerOptions {
  direction?: StaggerDirection;
  staggerValue?: number;
  totalItems: number;
  index: number;
}

export function setStaggerDirection({
  direction = 'start',
  staggerValue = 0.02,
  totalItems,
  index,
}: StaggerOptions): number {
  switch (direction) {
    case 'start':
      return index * staggerValue;

    case 'middle':
      const middleIndex = Math.floor(totalItems / 2);
      return Math.abs(index - middleIndex) * staggerValue;

    case 'end':
      return (totalItems - 1 - index) * staggerValue;

    default:
      return 0;
  }
}
export function splitText(text: string): SplitTextResult {

  if (!text?.trim()) {
    return {
      words: [],
      characters: [],
      wordCount: 0,
      characterCount: 0,
    };
  }

  const words = text.split(' ').map((word) => word.concat(' '));

  const characters = words.map((word) => word.split('')).flat(1);

  return {
    words,
    characters,
    wordCount: words.length,
    characterCount: characters.length,
  };
}
export type AnimationT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'z'
  | 'blur'
  | undefined;

export function useAnimationVariants(animation?: AnimationT) {
  return React.useMemo(
    () => ({
      hidden: {
        x: animation === 'left' ? '-100%' : animation === 'right' ? '100%' : 0,
        y: animation === 'top' ? '-100%' : animation === 'bottom' ? '100%' : 0,
        scale: animation === 'z' ? 0 : 1,
        filter: animation === 'blur' ? 'blur(10px)' : 'blur(0px)',
        opacity: 0,
      },
      visible: {
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        opacity: 1,
      },
    }),
    [animation],
  );
}

interface TextStaggerHoverProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

interface TextStaggerHoverContextValue {
  isMouseIn: boolean;
}
const TextStaggerHoverContext = React.createContext<
  TextStaggerHoverContextValue | undefined
>(undefined);
function useTextStaggerHoverContext() {
  const context = React.useContext(TextStaggerHoverContext);
  if (!context) {
    throw new Error(
      'useTextStaggerHoverContext must be used within an TextStaggerHoverContextProvider',
    );
  }
  return context;
}

export const TextStaggerHover = ({
  as: Component = 'span',
  children,
  className,
  ...props
}: TextStaggerHoverProps) => {
  const [isMouseIn, setIsMouseIn] = React.useState<boolean>(false);
  const handleMouse = () => setIsMouseIn((prevState) => !prevState);

  return (
    <TextStaggerHoverContext.Provider value={{ isMouseIn }}>
      <Component
        className={cn('relative inline-block overflow-hidden', className)}
        {...props}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        {children}
      </Component>
    </TextStaggerHoverContext.Provider>
  );
};
interface TextStaggerHoverContentProps extends HTMLMotionProps<'span'> {
  animation?: AnimationT;
  staggerDirection?: StaggerDirection;
}
export const TextStaggerHoverActive = ({
  animation,
  staggerDirection = 'start',
  children,
  className,
  transition,
  ...props
}: TextStaggerHoverContentProps) => {
  const { characters, characterCount } = splitText(String(children));
  const animationVariants = useAnimationVariants(animation);
  const { isMouseIn } = useTextStaggerHoverContext();
  return (
    <span className={cn('inline-block text-nowrap', className)}>
      {characters.map((char, index) => {
        const staggerDelay = setStaggerDirection({
          direction: staggerDirection,
          totalItems: characterCount,
          index,
        });
        return (
          <motion.span
            className="inline-block"
            key={`${char}-${index}`}
            variants={animationVariants}
            animate={isMouseIn ? 'hidden' : 'visible'}
            transition={{
              delay: staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 0.3,
              ...transition,
            }}
            {...props}
          >
            {char}
            {char === ' ' && index < characters.length - 1 && <>&nbsp;</>}
          </motion.span>
        );
      })}
    </span>
  );
};

export const TextStaggerHoverHidden = ({
  animation,
  staggerDirection = 'start',
  children,
  className,
  transition,
  ...props
}: TextStaggerHoverContentProps) => {
  const { characters, characterCount } = splitText(String(children));
  const animationVariants = useAnimationVariants(animation);
  const { isMouseIn } = useTextStaggerHoverContext();
  return (
    <span className={cn('inline-block absolute left-0 top-0 text-nowrap', className)}>
      {characters.map((char, index) => {
        const staggerDelay = setStaggerDirection({
          direction: staggerDirection,
          totalItems: characterCount,
          index,
        });
        return (
          <motion.span
            className="inline-block"
            key={`${char}-${index}`}
            variants={animationVariants}
            animate={isMouseIn ? 'visible' : 'hidden'}
            transition={{
              delay: staggerDelay,
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 0.3,
              ...transition,
            }}
            {...props}
          >
            {char}
            {char === ' ' && index < characters.length - 1 && <>&nbsp;</>}
          </motion.span>
        );
      })}
    </span>
  );
};

```

Install NPM dependencies:
```bash
framer-motion
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
