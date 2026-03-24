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
cursor-gradient.tsx

'use client'; 
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
export const useMouse = () => {
  const [mouseState, setMouseState] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const ref = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      
      setMouseState({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseLeave = () => {
      
      setMouseState({ x: null, y: null });
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return [mouseState, ref];
};

export const Component = () => {
  
  const [mouseState, ref] = useMouse();
  const [hue, setHue] = useState(0);

  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; intensity: number }[]
  >([]);

  useEffect(() => {
    
    if (mouseState.x !== null && mouseState.y !== null) {
      
      const newHue = mouseState.x % 360;
      setHue(newHue);

      const newParticles = Array.from({ length: 3 }, () => ({
        id: Date.now() + Math.random(), 
        x: mouseState.x! + (Math.random() - 0.5) * 20,
        y: mouseState.y! + (Math.random() - 0.5) * 20,
        size: Math.random() * 3 + 2, 
        intensity: Math.random() * 0.5 + 0.5, 
      }));

      
      setParticles((prev) => [...prev, ...newParticles].slice(-30));
    }
  }, [mouseState.x, mouseState.y]); 
  return (
    <div className='relative w-full h-full cursor-none' ref={ref}>
      
      {mouseState.x !== null && mouseState.y !== null && (
        <>

          <motion.div
            className='fixed pointer-events-none z-[9999]'
            style={{
              left: mouseState.x,
              top: mouseState.y,
              x: '-50%', 
              y: '-50%',
              width: '40px',
              height: '40px',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }} 
          >
            <div
              className='w-full h-full rounded-full mix-blend-screen' 
              style={{
              
                background: `radial-gradient(
                  circle at center,
                  hsl(${hue}, 100%, 70%),
                  hsl(${(hue + 60) % 360}, 100%, 60%)
                )`,
                boxShadow: `0 0 20px hsl(${hue}, 100%, 50%, 0.5)`,
              }}
            />
          </motion.div>

          <AnimatePresence>
            {particles.map((particle, index) => (
              <motion.div
                key={particle.id} 
                className='fixed pointer-events-none mix-blend-screen'
                style={{
                  left: particle.x,
                  top: particle.y,
                  x: '-50%', 
                  y: '-50%',
                }}
                initial={{ opacity: particle.intensity, scale: 0 }}
                animate={{ opacity: 0, scale: particle.size }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div
                  className='rounded-full'
                  style={{
                    width: `${particle.size * 4}px`,
                    height: `${particle.size * 4}px`,
                    background: `radial-gradient(
                      circle at center,
                      hsl(${(hue + index * 10) % 360}, 100%, ${70 + particle.intensity * 30}%),
                      transparent
                    )`,
                    filter: 'blur(2px)', 
                    boxShadow: `0 0 ${particle.size * 2}px hsl(${(hue + index * 10) % 360}, 100%, 50%, ${particle.intensity})`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

code.demo.1750164535566.tsx

import { Component } from "@/components/ui/cursor-gradient"
const DemoOne = () => {
  return (

    <div className="flex w-full h-screen justify-center items-center overflow-hidden bg-black text-white">
      <Component /> 
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cursor-gradient.tsx

'use client'; 
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
export const useMouse = () => {
  const [mouseState, setMouseState] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const ref = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      
      setMouseState({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseLeave = () => {
      
      setMouseState({ x: null, y: null });
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return [mouseState, ref];
};

export const Component = () => {
  
  const [mouseState, ref] = useMouse();
  const [hue, setHue] = useState(0);

  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; intensity: number }[]
  >([]);

  useEffect(() => {
    
    if (mouseState.x !== null && mouseState.y !== null) {
      
      const newHue = mouseState.x % 360;
      setHue(newHue);

      const newParticles = Array.from({ length: 3 }, () => ({
        id: Date.now() + Math.random(), 
        x: mouseState.x! + (Math.random() - 0.5) * 20,
        y: mouseState.y! + (Math.random() - 0.5) * 20,
        size: Math.random() * 3 + 2, 
        intensity: Math.random() * 0.5 + 0.5, 
      }));

      
      setParticles((prev) => [...prev, ...newParticles].slice(-30));
    }
  }, [mouseState.x, mouseState.y]); 
  return (
    <div className='relative w-full h-full cursor-none' ref={ref}>
      
      {mouseState.x !== null && mouseState.y !== null && (
        <>

          <motion.div
            className='fixed pointer-events-none z-[9999]'
            style={{
              left: mouseState.x,
              top: mouseState.y,
              x: '-50%', 
              y: '-50%',
              width: '40px',
              height: '40px',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }} 
          >
            <div
              className='w-full h-full rounded-full mix-blend-screen' 
              style={{
              
                background: `radial-gradient(
                  circle at center,
                  hsl(${hue}, 100%, 70%),
                  hsl(${(hue + 60) % 360}, 100%, 60%)
                )`,
                boxShadow: `0 0 20px hsl(${hue}, 100%, 50%, 0.5)`,
              }}
            />
          </motion.div>

          <AnimatePresence>
            {particles.map((particle, index) => (
              <motion.div
                key={particle.id} 
                className='fixed pointer-events-none mix-blend-screen'
                style={{
                  left: particle.x,
                  top: particle.y,
                  x: '-50%', 
                  y: '-50%',
                }}
                initial={{ opacity: particle.intensity, scale: 0 }}
                animate={{ opacity: 0, scale: particle.size }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div
                  className='rounded-full'
                  style={{
                    width: `${particle.size * 4}px`,
                    height: `${particle.size * 4}px`,
                    background: `radial-gradient(
                      circle at center,
                      hsl(${(hue + index * 10) % 360}, 100%, ${70 + particle.intensity * 30}%),
                      transparent
                    )`,
                    filter: 'blur(2px)', 
                    boxShadow: `0 0 ${particle.size * 2}px hsl(${(hue + index * 10) % 360}, 100%, 50%, ${particle.intensity})`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
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
