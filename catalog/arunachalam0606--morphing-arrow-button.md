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
morphing-arrow-button.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type MorphingArrowButtonProps = {
  direction: 'left' | 'right';
};

const MorphingArrowButton = ({ direction }: MorphingArrowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = direction === 'left';

  const containerVariants = {
    initial: { width: '64px', x: 0 },
    hover: {
      width: '120px',
      x: isLeft ? '-56px' : 0,
    },
  };

  const buttonVariants = {
    initial: {
      borderRadius: '50%',
      height: '64px',
      padding: '0',
    },

    hover: {
      borderRadius: isLeft ? '50px 14px 14px 50px' : '14px 50px 50px 14px',
      height: '64px',
      padding: '0 10px',
    },
  };

  const lineVariants = {
    initial: { width: 0 },
    hover: { width: 'calc(100% - 50px)' },
  };

  const arrowVariants = {
    initial: { x: '-50%' },
    hover: { x: isLeft ? '-120%' : '20%' },
  };

  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <div className='inline-block w-[120px] overflow-visible'>
      <motion.div
        className={cn(
          'flex items-center',
          isLeft ? 'justify-end' : 'justify-start'
        )}
        variants={containerVariants}
        initial='initial'
        animate={isHovered ? 'hover' : 'initial'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.button
          className={cn(
            'w-full flex items-center justify-center border border-black dark:border-white',
            'relative overflow-hidden cursor-pointer bg-transparent'
          )}
          variants={buttonVariants}
          initial='initial'
          animate={isHovered ? 'hover' : 'initial'}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='relative w-full h-full flex items-center'>
            <motion.div
              className={cn(
                'h-0.5 bg-black dark:bg-white absolute top-1/2 -translate-y-1/2',
                isLeft ? 'right-5' : 'left-5'
              )}
              variants={lineVariants}
              initial='initial'
              animate={isHovered ? 'hover' : 'initial'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            <motion.div
              className='absolute top-1/2 left-1/2 -translate-y-1/2'
              variants={arrowVariants}
              initial='initial'
              animate={isHovered ? 'hover' : 'initial'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Icon className='w-6 h-6 text-black dark:text-white' />
            </motion.div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MorphingArrowButton;


code.demo.1750674951620.tsx
import MorphingArrowButton from "@/components/ui/morphing-arrow-button";

export default function Demo() {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-10 p-4">
      <MorphingArrowButton direction="left" />
      <MorphingArrowButton direction="right" />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/morphing-arrow-button.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type MorphingArrowButtonProps = {
  direction: 'left' | 'right';
};

const MorphingArrowButton = ({ direction }: MorphingArrowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = direction === 'left';

  const containerVariants = {
    initial: { width: '64px', x: 0 },
    hover: {
      width: '120px',
      x: isLeft ? '-56px' : 0,
    },
  };

  const buttonVariants = {
    initial: {
      borderRadius: '50%',
      height: '64px',
      padding: '0',
    },

    hover: {
      borderRadius: isLeft ? '50px 14px 14px 50px' : '14px 50px 50px 14px',
      height: '64px',
      padding: '0 10px',
    },
  };

  const lineVariants = {
    initial: { width: 0 },
    hover: { width: 'calc(100% - 50px)' },
  };

  const arrowVariants = {
    initial: { x: '-50%' },
    hover: { x: isLeft ? '-120%' : '20%' },
  };

  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <div className='inline-block w-[120px] overflow-visible'>
      <motion.div
        className={cn(
          'flex items-center',
          isLeft ? 'justify-end' : 'justify-start'
        )}
        variants={containerVariants}
        initial='initial'
        animate={isHovered ? 'hover' : 'initial'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.button
          className={cn(
            'w-full flex items-center justify-center border border-black dark:border-white',
            'relative overflow-hidden cursor-pointer bg-transparent'
          )}
          variants={buttonVariants}
          initial='initial'
          animate={isHovered ? 'hover' : 'initial'}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='relative w-full h-full flex items-center'>
            <motion.div
              className={cn(
                'h-0.5 bg-black dark:bg-white absolute top-1/2 -translate-y-1/2',
                isLeft ? 'right-5' : 'left-5'
              )}
              variants={lineVariants}
              initial='initial'
              animate={isHovered ? 'hover' : 'initial'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            <motion.div
              className='absolute top-1/2 left-1/2 -translate-y-1/2'
              variants={arrowVariants}
              initial='initial'
              animate={isHovered ? 'hover' : 'initial'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Icon className='w-6 h-6 text-black dark:text-white' />
            </motion.div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MorphingArrowButton;

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
