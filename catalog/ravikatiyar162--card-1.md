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
card-1.tsx
'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the props for the ZoomImage component
interface ZoomImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image, for accessibility. */
  alt: string;
  /** The scale factor to apply on zoom. Defaults to 1.2. */
  zoomScale?: number;
  /** The duration of the spring animation. Defaults to 0.3. */
  transitionDuration?: number;
  /** The border radius of the component. Defaults to 12. */
  borderRadius?: number;
}

const ZoomImage = React.forwardRef<HTMLDivElement, ZoomImageProps>(
  (
    {
      className,
      src,
      alt,
      zoomScale = 1.2,
      transitionDuration = 0.3,
      borderRadius = 12,
      ...props
    },
    ref
  ) => {
    // Motion values for mouse position, initialized to the center
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    // Spring animation for smooth, natural transitions
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Creates a reactive CSS transform-origin string based on mouse position
    const transformOrigin = useTransform(
      [smoothMouseX, smoothMouseY],
      ([latestX, latestY]) => `${latestX}% ${latestY}%`
    );

    // Updates mouse position percentages on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      mouseX.set(((e.clientX - left) / width) * 100);
      mouseY.set(((e.clientY - top) / height) * 100);
    };

    // Resets mouse position to the center on mouse leave
    const handleMouseLeave = () => {
      mouseX.set(50);
      mouseY.set(50);
    };

    return (
      <motion.div
        ref={ref}
        className={cn('relative w-full h-auto overflow-hidden', className)}
        style={{ borderRadius: `${borderRadius}px` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          style={{
            borderRadius: `${borderRadius}px`,
            transformOrigin: transformOrigin, // Apply the dynamic transform-origin
          }}
          whileHover={{ scale: zoomScale }}
          transition={{
            type: 'spring',
            duration: transitionDuration,
            bounce: 0,
          }}
        />
      </motion.div>
    );
  }
);

ZoomImage.displayName = 'ZoomImage';

export { ZoomImage };

code.demo.1756026833976.tsx
import { ZoomImage } from '@/components/ui/card-1'; // Adjust the import path as needed

export default function ZoomImageDemo() {
  return (
    <div className="flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-md">
        <ZoomImage
          src="https://images.unsplash.com/photo-1542193810-9007c21cd37e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcxfHxwcm9kdWN0fGVufDB8fDB8fHww"
          alt="A stylish white and wooden desk chair"
          zoomScale={3.5}
          transitionDuration={0.5}
          borderRadius={24}
          className="shadow-lg"
        />
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-1.tsx
'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the props for the ZoomImage component
interface ZoomImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image, for accessibility. */
  alt: string;
  /** The scale factor to apply on zoom. Defaults to 1.2. */
  zoomScale?: number;
  /** The duration of the spring animation. Defaults to 0.3. */
  transitionDuration?: number;
  /** The border radius of the component. Defaults to 12. */
  borderRadius?: number;
}

const ZoomImage = React.forwardRef<HTMLDivElement, ZoomImageProps>(
  (
    {
      className,
      src,
      alt,
      zoomScale = 1.2,
      transitionDuration = 0.3,
      borderRadius = 12,
      ...props
    },
    ref
  ) => {
    // Motion values for mouse position, initialized to the center
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    // Spring animation for smooth, natural transitions
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Creates a reactive CSS transform-origin string based on mouse position
    const transformOrigin = useTransform(
      [smoothMouseX, smoothMouseY],
      ([latestX, latestY]) => `${latestX}% ${latestY}%`
    );

    // Updates mouse position percentages on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      mouseX.set(((e.clientX - left) / width) * 100);
      mouseY.set(((e.clientY - top) / height) * 100);
    };

    // Resets mouse position to the center on mouse leave
    const handleMouseLeave = () => {
      mouseX.set(50);
      mouseY.set(50);
    };

    return (
      <motion.div
        ref={ref}
        className={cn('relative w-full h-auto overflow-hidden', className)}
        style={{ borderRadius: `${borderRadius}px` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          style={{
            borderRadius: `${borderRadius}px`,
            transformOrigin: transformOrigin, // Apply the dynamic transform-origin
          }}
          whileHover={{ scale: zoomScale }}
          transition={{
            type: 'spring',
            duration: transitionDuration,
            bounce: 0,
          }}
        />
      </motion.div>
    );
  }
);

ZoomImage.displayName = 'ZoomImage';

export { ZoomImage };
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
