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
arrow-cursor.tsx

'use client'; 
import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'motion/react';

export const Component = () => {
  const [lastY, setLastY] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {

    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {

      setMousePosition({ x: e.clientX, y: e.clientY });

      if (lastY !== null) {
        if (e.clientY < lastY) {
          setDirection('up');
        } else if (e.clientY > lastY) {
          setDirection('down');
        }

      }
      setLastY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastY]); 
  const arrowVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    
      rotate: direction === 'up' ? 0 : 180,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: direction === 'up' ? 0 : 180,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.15, ease: "easeIn" }
    },
  };

  
  if (typeof window === "undefined") return null;

  return (
    
    <div className='fixed top-0 left-0 w-full h-full pointer-events-none z-50'>
      <AnimatePresence>

        {direction && (
          <motion.div
           
            key={`${direction}-arrow`}
            style={{
              position: 'fixed', 
              top: mousePosition.y - 25, 
              left: mousePosition.x + 15,
            }}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={arrowVariants}
          >
            <div className='w-[50px] h-[50px] bg-black dark:bg-white rounded-full flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-white dark:text-black' 
              >
                <line x1='12' y1='19' x2='12' y2='5'></line>
                <polyline points='5 12 12 5 19 12'></polyline>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

code.demo.1750164028038.tsx

import { Component } from "@/components/ui/arrow-cursor"; 
const DemoOne = () => {
  return (
    
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Arrow Cursor Demo</h1>


      <Component />
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/arrow-cursor.tsx

'use client'; 
import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'motion/react';

export const Component = () => {
  const [lastY, setLastY] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {

    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {

      setMousePosition({ x: e.clientX, y: e.clientY });

      if (lastY !== null) {
        if (e.clientY < lastY) {
          setDirection('up');
        } else if (e.clientY > lastY) {
          setDirection('down');
        }

      }
      setLastY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastY]); 
  const arrowVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    
      rotate: direction === 'up' ? 0 : 180,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: direction === 'up' ? 0 : 180,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.15, ease: "easeIn" }
    },
  };

  
  if (typeof window === "undefined") return null;

  return (
    
    <div className='fixed top-0 left-0 w-full h-full pointer-events-none z-50'>
      <AnimatePresence>

        {direction && (
          <motion.div
           
            key={`${direction}-arrow`}
            style={{
              position: 'fixed', 
              top: mousePosition.y - 25, 
              left: mousePosition.x + 15,
            }}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={arrowVariants}
          >
            <div className='w-[50px] h-[50px] bg-black dark:bg-white rounded-full flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-white dark:text-black' 
              >
                <line x1='12' y1='19' x2='12' y2='5'></line>
                <polyline points='5 12 12 5 19 12'></polyline>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
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
