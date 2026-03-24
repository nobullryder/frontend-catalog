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
rhythmic-ripples-background.tsx
"use client";

import React, { useRef, useEffect } from "react";

// RhythmicRipplesBackground Props:
//
// backgroundColor: string      // default "#030303"
// rippleColor:     string      // default "rgba(130, 130, 180, 0.3)"
// rippleCount:     number      // default 20
// rippleSpeed:     number      // default 0.5
interface RhythmicRipplesBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;
  rippleColor?: string;
  rippleCount?: number;
  rippleSpeed?: number;
}

const RhythmicRipplesBackground: React.FC<RhythmicRipplesBackgroundProps> = ({
  children,
  backgroundColor = "#030303",
  rippleColor = "rgba(130, 130, 180, 0.3)",
  rippleCount = 20,
  rippleSpeed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ripples: Ripple[] = [];
    let animationFrameId: number;
    let width: number, height: number;

    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;

      constructor() {
        this.reset();
      }

      reset() {
        width = window.innerWidth;
        height = window.innerHeight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0;
        this.maxRadius = Math.random() * 150 + 50;
        this.speed = Math.random() * rippleSpeed + 0.2;
      }

      update() {
        this.radius += this.speed;
        if (this.radius > this.maxRadius) {
          this.reset();
        }
      }

      draw() {
        const alpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rippleColor.replace(
          /[\d\.]+\)$/,
          `${alpha * 0.3})`
        );
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ripples = Array.from({ length: rippleCount }, () => new Ripple());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ripples.forEach((r) => {
        r.update();
        r.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rippleColor, rippleCount, rippleSpeed]);

  return (
    <div
      className="relative h-screen w-full"
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default RhythmicRipplesBackground;


code.demo.1759057035436.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import RhythmicRipplesBackground from "@/components/ui/rhythmic-ripples-background";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.25,
      duration: 0.9,
      ease: [0.4, 0.0, 0.2, 1],
    },
  }),
};

const DemoOne = () => {
  return (
    <RhythmicRipplesBackground>
      <div className="text-center max-w-4xl mx-auto px-4">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/10 px-5 py-2 text-sm text-white/70 backdrop-blur-sm"
        >
          ✨ A New Hero Component has Arrived
        </motion.div>

        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Rhythmic Ripples
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/50"
        >
          Experience a serene and captivating hero section with animated,
          hypnotic ripples that create a sense of calm and focus.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-12 flex items-center justify-center gap-x-6"
        >
          <button className="rounded-full bg-indigo-500 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105">
            Explore Now
          </button>
        </motion.div>
      </div>
    </RhythmicRipplesBackground>
  );
};

export default DemoOne;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/rhythmic-ripples-background.tsx
"use client";

import React, { useRef, useEffect } from "react";

// RhythmicRipplesBackground Props:
//
// backgroundColor: string      // default "#030303"
// rippleColor:     string      // default "rgba(130, 130, 180, 0.3)"
// rippleCount:     number      // default 20
// rippleSpeed:     number      // default 0.5
interface RhythmicRipplesBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;
  rippleColor?: string;
  rippleCount?: number;
  rippleSpeed?: number;
}

const RhythmicRipplesBackground: React.FC<RhythmicRipplesBackgroundProps> = ({
  children,
  backgroundColor = "#030303",
  rippleColor = "rgba(130, 130, 180, 0.3)",
  rippleCount = 20,
  rippleSpeed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ripples: Ripple[] = [];
    let animationFrameId: number;
    let width: number, height: number;

    class Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;

      constructor() {
        this.reset();
      }

      reset() {
        width = window.innerWidth;
        height = window.innerHeight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0;
        this.maxRadius = Math.random() * 150 + 50;
        this.speed = Math.random() * rippleSpeed + 0.2;
      }

      update() {
        this.radius += this.speed;
        if (this.radius > this.maxRadius) {
          this.reset();
        }
      }

      draw() {
        const alpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rippleColor.replace(
          /[\d\.]+\)$/,
          `${alpha * 0.3})`
        );
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ripples = Array.from({ length: rippleCount }, () => new Ripple());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ripples.forEach((r) => {
        r.update();
        r.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rippleColor, rippleCount, rippleSpeed]);

  return (
    <div
      className="relative h-screen w-full"
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default RhythmicRipplesBackground;

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
