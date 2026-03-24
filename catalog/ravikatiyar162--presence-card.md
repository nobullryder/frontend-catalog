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
presence-card.tsx
// components/ui/animated-presence-card.tsx

"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming shadcn/ui's utility function

// Define the props for the component
interface AnimatedPresenceCardProps {
  topText: string;
  imageUrl: string;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonHref?: string;
  footerLeft: React.ReactNode;
  footerRight: React.ReactNode;
  className?: string;
}

export function AnimatedPresenceCard({
  topText,
  imageUrl,
  title,
  description,
  buttonText,
  buttonHref = '#',
  footerLeft,
  footerRight,
  className,
}: AnimatedPresenceCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values to track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  // Apply spring physics for smoother animations
  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Update motion values relative to the center of the card
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    // Reset motion values on mouse leave
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={cn(
        'group relative w-full max-w-sm overflow-hidden rounded-xl bg-card shadow-lg',
        'text-card-foreground transition-all duration-300 ease-out hover:shadow-2xl',
        className
      )}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="relative">
        {/* Image Section */}
        <div className="absolute top-4 left-4 z-10 text-xs font-semibold uppercase tracking-widest text-white/90 mix-blend-difference">
          {topText}
        </div>
        <img
          src={imageUrl}
          alt="Digital Presence"
          className="h-90 w-full object-cover"
        />

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-3xl font-bold leading-tight">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
          <a
            href={buttonHref}
            className="mt-6 inline-block text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary pb-1 border-b border-transparent hover:border-primary/50"
          >
            {buttonText}
          </a>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between border-t border-border p-6 text-xs text-muted-foreground">
          <span>{footerLeft}</span>
          <span>{footerRight}</span>
        </div>
      </div>
    </motion.div>
  );
}

code.demo.1758609041396.tsx
// demo.tsx

import { AnimatedPresenceCard } from '@/components/ui/presence-card';

export default function AnimatedPresenceCardDemo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <AnimatedPresenceCard
        topText="Work fast. Live slow."
        imageUrl="https://images.unsplash.com/photo-1738490686724-8531f6912fc9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxXb3JrJTIwZmFzdC4lMjBMaXZlJTIwc2xvd3xlbnwwfHwwfHx8MA%3D%3D?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Transform your digital presence."
        description="From zero to extraordinary. Let's create your digital reality."
        buttonText="Send a message"
        buttonHref="#"
        footerLeft="sukoya.design"
        footerRight="web + product + brand"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/presence-card.tsx
// components/ui/animated-presence-card.tsx

"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming shadcn/ui's utility function

// Define the props for the component
interface AnimatedPresenceCardProps {
  topText: string;
  imageUrl: string;
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonHref?: string;
  footerLeft: React.ReactNode;
  footerRight: React.ReactNode;
  className?: string;
}

export function AnimatedPresenceCard({
  topText,
  imageUrl,
  title,
  description,
  buttonText,
  buttonHref = '#',
  footerLeft,
  footerRight,
  className,
}: AnimatedPresenceCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values to track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  // Apply spring physics for smoother animations
  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Update motion values relative to the center of the card
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    // Reset motion values on mouse leave
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={cn(
        'group relative w-full max-w-sm overflow-hidden rounded-xl bg-card shadow-lg',
        'text-card-foreground transition-all duration-300 ease-out hover:shadow-2xl',
        className
      )}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="relative">
        {/* Image Section */}
        <div className="absolute top-4 left-4 z-10 text-xs font-semibold uppercase tracking-widest text-white/90 mix-blend-difference">
          {topText}
        </div>
        <img
          src={imageUrl}
          alt="Digital Presence"
          className="h-90 w-full object-cover"
        />

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-3xl font-bold leading-tight">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
          <a
            href={buttonHref}
            className="mt-6 inline-block text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary pb-1 border-b border-transparent hover:border-primary/50"
          >
            {buttonText}
          </a>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between border-t border-border p-6 text-xs text-muted-foreground">
          <span>{footerLeft}</span>
          <span>{footerRight}</span>
        </div>
      </div>
    </motion.div>
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
