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
grid-glow-background.tsx
"use client";

import React, { useRef, useEffect } from "react";

// GridGlowBackground Props
interface GridGlowBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;    // default "#0a0a0a"
  gridColor?: string;          // default "rgba(255,255,255,0.05)"
  gridSize?: number;           // default 50
  glowColors?: string[];       // default ["#4A00E0","#8E2DE2","#4A00E0"]
  glowCount?: number;          // default 10
}

export const GridGlowBackground: React.FC<GridGlowBackgroundProps> = ({
  children,
  backgroundColor = "#0a0a0a",
  gridColor = "rgba(255, 255, 255, 0.05)",
  gridSize = 50,
  glowColors = ["#4A00E0", "#8E2DE2", "#4A00E0"],
  glowCount = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let glows: Glow[] = [];
    let frameId: number;

    class Glow {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      radius: number;
      speed: number;
      color: string;
      alpha: number;

      constructor() {
        this.x =
          Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        this.y =
          Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 80 + 40;
        this.speed = Math.random() * 0.015 + 0.01;
        this.color = glowColors[
          Math.floor(Math.random() * glowColors.length)
        ];
        this.alpha = 0;
        this.setNewTarget();
      }

      setNewTarget() {
        this.targetX =
          Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        this.targetY =
          Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
      }

      update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;

        if (
          Math.abs(this.targetX - this.x) < 1 &&
          Math.abs(this.targetY - this.y) < 1
        ) {
          this.setNewTarget();
        }
        if (this.alpha < 1) this.alpha += 0.01;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        const grad = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      glows = Array.from({ length: glowCount }, () => new Glow());
    };

    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      glows.forEach((g) => {
        g.update();
        g.draw();
      });
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [gridColor, gridSize, glowColors, glowCount]);

  return (
    <div
      className="relative h-screen w-full"
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full opacity-50"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default GridGlowBackground;


code.demo.1759056688203.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import GridGlowBackground from "@/components/ui/grid-glow-background";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeInOut",
    },
  }),
};

const DemoOne = () => {
  return (
    <GridGlowBackground>
      <div className="text-center">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80"
        >
          Introducing a New Era of Design
        </motion.div>

        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          The Grid Glow Hero
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60"
        >
          A fully animated, unique hero section component built with React,
          Framer Motion, and HTML Canvas for a futuristic feel.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <button className="rounded-full bg-white px-6 py-3 text-lg font-semibold text-black shadow-lg shadow-white/20 transition-transform hover:scale-105">
            Get Started
          </button>
          <button className="flex items-center gap-x-2 rounded-full px-6 py-3 text-lg font-semibold leading-6 text-white transition-colors hover:bg-white/10">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </GridGlowBackground>
  );
};

export default DemoOne;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/grid-glow-background.tsx
"use client";

import React, { useRef, useEffect } from "react";

// GridGlowBackground Props
interface GridGlowBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;    // default "#0a0a0a"
  gridColor?: string;          // default "rgba(255,255,255,0.05)"
  gridSize?: number;           // default 50
  glowColors?: string[];       // default ["#4A00E0","#8E2DE2","#4A00E0"]
  glowCount?: number;          // default 10
}

export const GridGlowBackground: React.FC<GridGlowBackgroundProps> = ({
  children,
  backgroundColor = "#0a0a0a",
  gridColor = "rgba(255, 255, 255, 0.05)",
  gridSize = 50,
  glowColors = ["#4A00E0", "#8E2DE2", "#4A00E0"],
  glowCount = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let glows: Glow[] = [];
    let frameId: number;

    class Glow {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      radius: number;
      speed: number;
      color: string;
      alpha: number;

      constructor() {
        this.x =
          Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        this.y =
          Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 80 + 40;
        this.speed = Math.random() * 0.015 + 0.01;
        this.color = glowColors[
          Math.floor(Math.random() * glowColors.length)
        ];
        this.alpha = 0;
        this.setNewTarget();
      }

      setNewTarget() {
        this.targetX =
          Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        this.targetY =
          Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
      }

      update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;

        if (
          Math.abs(this.targetX - this.x) < 1 &&
          Math.abs(this.targetY - this.y) < 1
        ) {
          this.setNewTarget();
        }
        if (this.alpha < 1) this.alpha += 0.01;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        const grad = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      glows = Array.from({ length: glowCount }, () => new Glow());
    };

    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      glows.forEach((g) => {
        g.update();
        g.draw();
      });
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [gridColor, gridSize, glowColors, glowCount]);

  return (
    <div
      className="relative h-screen w-full"
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full opacity-50"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default GridGlowBackground;

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
