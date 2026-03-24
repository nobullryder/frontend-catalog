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
animated-dots.tsx
"use client";
import React, { useEffect, useRef } from "react";

interface AnimatedDotsProps {
  dotsNum?: number;
  dotRadius?: number;
  dotSpacing?: number;
  speedRange?: [number, number];
  backgroundColor?: string;
  opacity?: number;
  blendMode?: GlobalCompositeOperation;
  fullScreen?: boolean;
  className?: string;
  colors?: [("red" | "green" | "blue"), number, number, number][];
}

export const AnimatedDots: React.FC<AnimatedDotsProps> = ({
  dotsNum = 60,
  dotRadius = 10,
  dotSpacing = 0,
  speedRange = [1, 4],
  backgroundColor = "transparent",
  opacity = 1,
  blendMode = "normal",
  fullScreen = true,
  className = "",
  colors = [
  ["red", 255, 69, 58],
  ["orange", 255, 149, 0],
  ["yellow", 255, 214, 10],
  ["green", 52, 199, 89],
  ["mint", 0, 199, 190],
  ["teal", 48, 176, 199],
  ["blue", 0, 122, 255],
  ["indigo", 88, 86, 214],
  ["purple", 175, 82, 222],
  ["pink", 255, 45, 85],
  ["rose", 255, 100, 130],
  ["lime", 164, 255, 46],
  ["aqua", 46, 255, 220],
  ["sky", 100, 200, 255],
  ["violet", 205, 150, 255],
  ["gold", 255, 215, 0],
]


}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<any[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const TWO_PI = 2 * Math.PI;
    let width = fullScreen ? window.innerWidth : canvas.offsetWidth;
    let height = fullScreen ? window.innerHeight : canvas.offsetHeight;

    const requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((callback: FrameRequestCallback) => window.setTimeout(callback, 1000 / 60));

    class Dot {
      i: number;
      velocity: number;
      ranVelocity: number;
      ranColor: number;
      radius: number;
      x: number;
      y: number;

      constructor(i: number) {
        this.i = i;
        this.velocity = 0;
        this.radius = dotRadius;
        this.ranVelocity =
          Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
        this.ranColor = Math.round(Math.random() * (colors.length - 1));
        this.x = this.radius + i * (this.radius * 2 + dotSpacing);
        this.y = -this.radius;
      }

      draw() {
        this.velocity += this.ranVelocity;
        const colorIncrement =
          255 - Math.round(this.velocity * (255 / (height + this.radius)));
        ctx.fillStyle = this.updateColors(colors[this.ranColor], colorIncrement);
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = blendMode;

        if (this.velocity >= height + this.radius) {
          this.velocity = 0;
          this.ranColor = Math.round(Math.random() * (colors.length - 1));
          this.ranVelocity =
            Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
        }

        this.y = -this.radius + this.velocity;

        ctx.beginPath();
        ctx.arc(this.x % width, this.y, this.radius, 0, TWO_PI, false);
        ctx.fill();
      }

      updateColors(selectedColor: any, increment: number) {
        let [type, r, g, b] = selectedColor;

        if (type === "red") r = increment;
        else if (type === "green") g = increment;
        else if (type === "blue") b = increment;

        return `rgba(${r}, ${g}, ${b}, 1)`;
      }
    }

    const resizeCanvas = () => {
      width = fullScreen ? window.innerWidth : canvas.offsetWidth;
      height = fullScreen ? window.innerHeight : canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      createDots();
    };

    const createDots = () => {
      dotsRef.current = [];
      for (let i = 0; i < dotsNum; i++) {
        dotsRef.current.push(new Dot(i));
      }
    };

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (const dot of dotsRef.current) {
        dot.draw();
      }

      animationRef.current = requestAnimFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [
    dotsNum,
    dotRadius,
    colors,
    dotSpacing,
    speedRange,
    backgroundColor,
    opacity,
    blendMode,
    fullScreen,
  ]);

  return (
    <div
      className={`relative ${fullScreen ? "w-screen h-screen" : ""} ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};


code.demo.1761931658323.tsx
import { AnimatedDots } from "@/components/ui/animated-dots";

export default function DemoOne() {
  return <AnimatedDots />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-dots.tsx
"use client";
import React, { useEffect, useRef } from "react";

interface AnimatedDotsProps {
  dotsNum?: number;
  dotRadius?: number;
  dotSpacing?: number;
  speedRange?: [number, number];
  backgroundColor?: string;
  opacity?: number;
  blendMode?: GlobalCompositeOperation;
  fullScreen?: boolean;
  className?: string;
  colors?: [("red" | "green" | "blue"), number, number, number][];
}

export const AnimatedDots: React.FC<AnimatedDotsProps> = ({
  dotsNum = 60,
  dotRadius = 10,
  dotSpacing = 0,
  speedRange = [1, 4],
  backgroundColor = "transparent",
  opacity = 1,
  blendMode = "normal",
  fullScreen = true,
  className = "",
  colors = [
  ["red", 255, 69, 58],
  ["orange", 255, 149, 0],
  ["yellow", 255, 214, 10],
  ["green", 52, 199, 89],
  ["mint", 0, 199, 190],
  ["teal", 48, 176, 199],
  ["blue", 0, 122, 255],
  ["indigo", 88, 86, 214],
  ["purple", 175, 82, 222],
  ["pink", 255, 45, 85],
  ["rose", 255, 100, 130],
  ["lime", 164, 255, 46],
  ["aqua", 46, 255, 220],
  ["sky", 100, 200, 255],
  ["violet", 205, 150, 255],
  ["gold", 255, 215, 0],
]


}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<any[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const TWO_PI = 2 * Math.PI;
    let width = fullScreen ? window.innerWidth : canvas.offsetWidth;
    let height = fullScreen ? window.innerHeight : canvas.offsetHeight;

    const requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((callback: FrameRequestCallback) => window.setTimeout(callback, 1000 / 60));

    class Dot {
      i: number;
      velocity: number;
      ranVelocity: number;
      ranColor: number;
      radius: number;
      x: number;
      y: number;

      constructor(i: number) {
        this.i = i;
        this.velocity = 0;
        this.radius = dotRadius;
        this.ranVelocity =
          Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
        this.ranColor = Math.round(Math.random() * (colors.length - 1));
        this.x = this.radius + i * (this.radius * 2 + dotSpacing);
        this.y = -this.radius;
      }

      draw() {
        this.velocity += this.ranVelocity;
        const colorIncrement =
          255 - Math.round(this.velocity * (255 / (height + this.radius)));
        ctx.fillStyle = this.updateColors(colors[this.ranColor], colorIncrement);
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = blendMode;

        if (this.velocity >= height + this.radius) {
          this.velocity = 0;
          this.ranColor = Math.round(Math.random() * (colors.length - 1));
          this.ranVelocity =
            Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
        }

        this.y = -this.radius + this.velocity;

        ctx.beginPath();
        ctx.arc(this.x % width, this.y, this.radius, 0, TWO_PI, false);
        ctx.fill();
      }

      updateColors(selectedColor: any, increment: number) {
        let [type, r, g, b] = selectedColor;

        if (type === "red") r = increment;
        else if (type === "green") g = increment;
        else if (type === "blue") b = increment;

        return `rgba(${r}, ${g}, ${b}, 1)`;
      }
    }

    const resizeCanvas = () => {
      width = fullScreen ? window.innerWidth : canvas.offsetWidth;
      height = fullScreen ? window.innerHeight : canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      createDots();
    };

    const createDots = () => {
      dotsRef.current = [];
      for (let i = 0; i < dotsNum; i++) {
        dotsRef.current.push(new Dot(i));
      }
    };

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (const dot of dotsRef.current) {
        dot.draw();
      }

      animationRef.current = requestAnimFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [
    dotsNum,
    dotRadius,
    colors,
    dotSpacing,
    speedRange,
    backgroundColor,
    opacity,
    blendMode,
    fullScreen,
  ]);

  return (
    <div
      className={`relative ${fullScreen ? "w-screen h-screen" : ""} ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

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
