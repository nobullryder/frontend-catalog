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
scroll-animation.tsx
import { cn } from '@/lib/utils';
import {
  motion,
  HTMLMotionProps,
  SVGMotionProps,
  Variant,
} from 'motion/react';
import React, { forwardRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const generateVariants = (
  direction: Direction
): { hidden: Variant; visible: Variant } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'down' ? 100 : -100;

  return {
    hidden: { filter: 'blur(10px)', opacity: 0, [axis]: value },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: '0px 0px -200px 0px' };

type MotionComponentProps = HTMLMotionProps<any> & SVGMotionProps<any>;

interface componentProps extends Omit<MotionComponentProps, 'children'> {
  children: React.ReactNode;
  className?: string;
  variants?: {
    hidden?: Variant;
    visible?: Variant;
  };
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  delay?: number;
  direction?: Direction;
}

const component = forwardRef<HTMLDivElement, componentProps>(
  (
    {
      children,
      className,
      variants,
      viewport = defaultViewport,
      delay = 0,
      direction = 'down',
      ...rest
    },
    ref
  ) => {
    const baseVariants = variants || generateVariants(direction);
    const modifiedVariants = {
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          ...(baseVariants.visible as { transition?: any }).transition,
          delay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        whileInView='visible'
        initial='hidden'
        variants={modifiedVariants}
        viewport={viewport}
        className={cn(className)}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

component.displayName = 'component';

export default component;

code.demo.1750118212760.tsx
'use client';
import React from 'react';
import Component from '@/components/ui/scroll-animation';

function componentDemo() {
  return (
    <>
      <div className='h-[500px] grid place-content-center'>
  
      </div>
      <div className='py-2'>
        <div>
          <Component
            direction='left'
            viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
            className='text-5xl text-left py-44'
          >
            <p>Scroll Left</p>
          </Component>
          <Component
            direction='right'
            viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
            className='text-5xl text-right py-44'
          >
            <p>Scroll Right</p>
          </Component>
          <Component
            viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }}
            className='text-5xl text-center py-44'
          >
            <p>Scroll bottom</p>
          </Component>
        </div>
      </div>
    </>
  );
}

export { componentDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scroll-animation.tsx
import { cn } from '@/lib/utils';
import {
  motion,
  HTMLMotionProps,
  SVGMotionProps,
  Variant,
} from 'motion/react';
import React, { forwardRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

const generateVariants = (
  direction: Direction
): { hidden: Variant; visible: Variant } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'down' ? 100 : -100;

  return {
    hidden: { filter: 'blur(10px)', opacity: 0, [axis]: value },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: '0px 0px -200px 0px' };

type MotionComponentProps = HTMLMotionProps<any> & SVGMotionProps<any>;

interface componentProps extends Omit<MotionComponentProps, 'children'> {
  children: React.ReactNode;
  className?: string;
  variants?: {
    hidden?: Variant;
    visible?: Variant;
  };
  viewport?: {
    amount?: number;
    margin?: string;
    once?: boolean;
  };
  delay?: number;
  direction?: Direction;
}

const component = forwardRef<HTMLDivElement, componentProps>(
  (
    {
      children,
      className,
      variants,
      viewport = defaultViewport,
      delay = 0,
      direction = 'down',
      ...rest
    },
    ref
  ) => {
    const baseVariants = variants || generateVariants(direction);
    const modifiedVariants = {
      hidden: baseVariants.hidden,
      visible: {
        ...baseVariants.visible,
        transition: {
          ...(baseVariants.visible as { transition?: any }).transition,
          delay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        whileInView='visible'
        initial='hidden'
        variants={modifiedVariants}
        viewport={viewport}
        className={cn(className)}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

component.displayName = 'component';

export default component;
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
