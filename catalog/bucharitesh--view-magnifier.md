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
view-magnifier.tsx
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface ViewMagnifierProps {
  children: React.ReactNode;
  className?: string;
  maxScale?: number;
  onScaleChange?: (isActive: boolean) => void;
  onMaxScaleReached?: (isAtMax: boolean) => void;
}

const Component: React.FC<ViewMagnifierProps> = ({
  className,
  children,
  maxScale = 1.8,
  onScaleChange,
  onMaxScaleReached,
  ...props
}) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isAtMaxScale, setIsAtMaxScale] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const initialScale = useRef<number>(1);
  const scale = useMotionValue(1);
  const opacity = useTransform(scale, [1, maxScale], [0, 1]);
  const containerScale = useTransform(scale, [1, maxScale], [1, 1.6]);

  // Monitor scale changes for max scale callback
  useEffect(() => {
    const unsubscribe = scale.on("change", (latestScale) => {
      const newIsAtMaxScale = Math.abs(latestScale - maxScale) < 0.01;
      if (newIsAtMaxScale !== isAtMaxScale) {
        setIsAtMaxScale(newIsAtMaxScale);
        onMaxScaleReached?.(newIsAtMaxScale);
      }
    });

    return () => unsubscribe();
  }, [scale, maxScale, isAtMaxScale, onMaxScaleReached]);

  const handleZoomAnimation = useCallback(
    (targetScale: number) => {
      animate(scale, targetScale, {
        type: "spring",
        stiffness: 400,
        damping: 30,
        onUpdate: (latest) => setZoomLevel(Math.round(latest * 100)),
      });
    },
    [scale],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      setIsMouseDown(true);
      startX.current = e.clientX;
      initialScale.current = scale.get();
      e.currentTarget.setPointerCapture(e.pointerId);
      onScaleChange?.(true);
    },
    [scale, onScaleChange],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      if (isMouseDown) {
        setIsMouseDown(false);
        handleZoomAnimation(1);
        e.currentTarget.releasePointerCapture(e.pointerId);
        onScaleChange?.(false);
      }
    },
    [isMouseDown, handleZoomAnimation, onScaleChange],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      if (!isMouseDown) return;

      const deltaX = e.clientX - startX.current;
      const scaleChange = deltaX * 0.005;
      const newScale = Math.max(
        0.8,
        Math.min(maxScale, initialScale.current + scaleChange),
      );

      scale.set(newScale);
      setZoomLevel(Math.round(newScale * 100));
    },
    [isMouseDown, maxScale, scale],
  );

  return (
    <div ref={containerRef} className="outline-none z-40" {...props}>
      <motion.div
        className={cn(
          "fixed h-screen w-screen outline-none inset-0 pointer-events-none backdrop-blur-xl",
          "after:content-[''] after:rounded-[inherit] after:w-full after:h-full after:inset-0",
          "after:absolute after:pointer-events-none dark:after:block",
          "dark:after:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.2)]",
        )}
        style={{ opacity }}
        aria-hidden="true"
      />

      <motion.div
        className={cn(
          "relative left-1/2 right-1/2 w-full h-auto overflow-visible my-3",
          "z-[60] rounded-2xl",
          "transform lg:transform-none",
          className,
        )}
        style={{
          scale: containerScale,
          translateX: "-50%",
          translateZ: "0px",
        }}
        role="img"
        aria-label={`Content at zoom level ${zoomLevel}%`}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {children}
        </div>

        <motion.div
          style={{ opacity }}
          className="w-full h-full absolute rounded-[inherit] inset-0 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),0px_16px_24px_-4px_rgba(0,0,0,0.04),0px_32px_48px_-8px_rgba(0,0,0,0.06)]"
          aria-hidden="true"
        />

        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
          style={{
            scale: containerScale,
            translateY: "-50%",
            translateZ: "0px",
          }}
          aria-label={`Drag to zoom. Current zoom level: ${zoomLevel}%`}
          aria-valuemin={80}
          aria-valuemax={180}
          aria-valuenow={zoomLevel}
          role="slider"
          className={cn(
            "absolute top-1/2 -right-6",
            "w-1 h-14 rounded-full",
            "bg-gray-400 dark:bg-gray-600",
            "hover:bg-gray-500 dark:hover:bg-gray-500",
            "transition-colors duration-300",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
            "md:block hidden",
            isMouseDown ? "cursor-grabbing" : "cursor-grab",
            "after:content-[''] after:absolute after:w-4 after:h-full after:-left-2 after:top-0",
          )}
          touch-action="none"
        />
      </motion.div>
    </div>
  );
};

export { Component };

code.demo.1753480627061.tsx
import { Component } from "@/components/ui/view-magnifier";
import Image from "next/image";

export default function DemoOne() {
  return (
    <div className="relative w-full max-w-lg">
      <Component>
        <div className="h-48 w-full bg-red-500">
          <Image src="https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=500&auto=format&fit=crop" alt="random" fill className="w-full h-full object-cover" />
        </div>
      </Component>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/view-magnifier.tsx
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface ViewMagnifierProps {
  children: React.ReactNode;
  className?: string;
  maxScale?: number;
  onScaleChange?: (isActive: boolean) => void;
  onMaxScaleReached?: (isAtMax: boolean) => void;
}

const Component: React.FC<ViewMagnifierProps> = ({
  className,
  children,
  maxScale = 1.8,
  onScaleChange,
  onMaxScaleReached,
  ...props
}) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isAtMaxScale, setIsAtMaxScale] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const initialScale = useRef<number>(1);
  const scale = useMotionValue(1);
  const opacity = useTransform(scale, [1, maxScale], [0, 1]);
  const containerScale = useTransform(scale, [1, maxScale], [1, 1.6]);

  // Monitor scale changes for max scale callback
  useEffect(() => {
    const unsubscribe = scale.on("change", (latestScale) => {
      const newIsAtMaxScale = Math.abs(latestScale - maxScale) < 0.01;
      if (newIsAtMaxScale !== isAtMaxScale) {
        setIsAtMaxScale(newIsAtMaxScale);
        onMaxScaleReached?.(newIsAtMaxScale);
      }
    });

    return () => unsubscribe();
  }, [scale, maxScale, isAtMaxScale, onMaxScaleReached]);

  const handleZoomAnimation = useCallback(
    (targetScale: number) => {
      animate(scale, targetScale, {
        type: "spring",
        stiffness: 400,
        damping: 30,
        onUpdate: (latest) => setZoomLevel(Math.round(latest * 100)),
      });
    },
    [scale],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      setIsMouseDown(true);
      startX.current = e.clientX;
      initialScale.current = scale.get();
      e.currentTarget.setPointerCapture(e.pointerId);
      onScaleChange?.(true);
    },
    [scale, onScaleChange],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      if (isMouseDown) {
        setIsMouseDown(false);
        handleZoomAnimation(1);
        e.currentTarget.releasePointerCapture(e.pointerId);
        onScaleChange?.(false);
      }
    },
    [isMouseDown, handleZoomAnimation, onScaleChange],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>): void => {
      if (!isMouseDown) return;

      const deltaX = e.clientX - startX.current;
      const scaleChange = deltaX * 0.005;
      const newScale = Math.max(
        0.8,
        Math.min(maxScale, initialScale.current + scaleChange),
      );

      scale.set(newScale);
      setZoomLevel(Math.round(newScale * 100));
    },
    [isMouseDown, maxScale, scale],
  );

  return (
    <div ref={containerRef} className="outline-none z-40" {...props}>
      <motion.div
        className={cn(
          "fixed h-screen w-screen outline-none inset-0 pointer-events-none backdrop-blur-xl",
          "after:content-[''] after:rounded-[inherit] after:w-full after:h-full after:inset-0",
          "after:absolute after:pointer-events-none dark:after:block",
          "dark:after:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.2)]",
        )}
        style={{ opacity }}
        aria-hidden="true"
      />

      <motion.div
        className={cn(
          "relative left-1/2 right-1/2 w-full h-auto overflow-visible my-3",
          "z-[60] rounded-2xl",
          "transform lg:transform-none",
          className,
        )}
        style={{
          scale: containerScale,
          translateX: "-50%",
          translateZ: "0px",
        }}
        role="img"
        aria-label={`Content at zoom level ${zoomLevel}%`}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {children}
        </div>

        <motion.div
          style={{ opacity }}
          className="w-full h-full absolute rounded-[inherit] inset-0 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),0px_16px_24px_-4px_rgba(0,0,0,0.04),0px_32px_48px_-8px_rgba(0,0,0,0.06)]"
          aria-hidden="true"
        />

        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
          style={{
            scale: containerScale,
            translateY: "-50%",
            translateZ: "0px",
          }}
          aria-label={`Drag to zoom. Current zoom level: ${zoomLevel}%`}
          aria-valuemin={80}
          aria-valuemax={180}
          aria-valuenow={zoomLevel}
          role="slider"
          className={cn(
            "absolute top-1/2 -right-6",
            "w-1 h-14 rounded-full",
            "bg-gray-400 dark:bg-gray-600",
            "hover:bg-gray-500 dark:hover:bg-gray-500",
            "transition-colors duration-300",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
            "md:block hidden",
            isMouseDown ? "cursor-grabbing" : "cursor-grab",
            "after:content-[''] after:absolute after:w-4 after:h-full after:-left-2 after:top-0",
          )}
          touch-action="none"
        />
      </motion.div>
    </div>
  );
};

export { Component };
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
