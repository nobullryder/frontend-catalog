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
bloom.tsx
'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NestedSquaresProps {
  className?: string;
}

export function NestedSquares({ className }: NestedSquaresProps = {}) {
  const squares = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className={cn("relative w-96 h-96 flex items-center justify-center bg-background", className)}>
      {squares.map((index) => {
        const padding = (index + 1) * 10;
        const delay = index * 0.1;
        
        return (
          <motion.div
            key={index}
            className="absolute border-2 border-transparent"
            style={{
              padding: `${padding}px`,
              borderImage: `linear-gradient(45deg, 
                rgb(147, 51, 234), 
                rgb(168, 85, 247), 
                rgb(196, 181, 253), 
                rgb(139, 92, 246), 
                rgb(124, 58, 237)
              ) 1`,
            }}
            initial={{
              scale: 0,
              rotate: 0,
            }}
            animate={{
              scale: 2,
              rotate: 180,
            }}
            transition={{
              duration: 2,
              delay: delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </div>
  );
}

export function Component() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <NestedSquares />
    </div>
  );
}


code.demo.1750323442696.tsx
import { Component } from "@/components/ui/bloom";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bloom.tsx
'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NestedSquaresProps {
  className?: string;
}

export function NestedSquares({ className }: NestedSquaresProps = {}) {
  const squares = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className={cn("relative w-96 h-96 flex items-center justify-center bg-background", className)}>
      {squares.map((index) => {
        const padding = (index + 1) * 10;
        const delay = index * 0.1;
        
        return (
          <motion.div
            key={index}
            className="absolute border-2 border-transparent"
            style={{
              padding: `${padding}px`,
              borderImage: `linear-gradient(45deg, 
                rgb(147, 51, 234), 
                rgb(168, 85, 247), 
                rgb(196, 181, 253), 
                rgb(139, 92, 246), 
                rgb(124, 58, 237)
              ) 1`,
            }}
            initial={{
              scale: 0,
              rotate: 0,
            }}
            animate={{
              scale: 2,
              rotate: 180,
            }}
            transition={{
              duration: 2,
              delay: delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </div>
  );
}

export function Component() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <NestedSquares />
    </div>
  );
}

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
