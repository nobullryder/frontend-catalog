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
sine-wave-dots.tsx
'use client'
import React, { useRef, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface SineWaveDotsProps {
  className?: string;
  dotColor?: string;
  dotRadius?: number;
  gap?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

export function SineWaveDots({
  className,
  dotColor = "fill-neutral-400/80",
  dotRadius = 1,
  gap = 20,
  amplitude = 25,
  frequency = 0.01,
  speed = 0.002,
}: SineWaveDotsProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const timeRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!svgRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  const dots = useMemo(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return [];

    const dotList: { x: number; y: number }[] = [];
    const numCols = Math.floor(width / gap);
    const numRows = Math.floor(height / gap);
    
    const padding = gap * 4;

    for (let i = -padding / gap; i < numCols + padding / gap; i++) {
      for (let j = -padding / gap; j < numRows + padding / gap; j++) {
        dotList.push({ x: i * gap, y: j * gap });
      }
    }
    return dotList;
  }, [dimensions, gap]);

  useEffect(() => {
    let animationFrameId: number;
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const circles = Array.from(svgElement.getElementsByTagName("circle"));
    if (circles.length === 0) return;

    const animate = () => {
      timeRef.current += speed;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        if(!circles[i]) continue;

        const sinValue = Math.sin(dot.x * frequency + timeRef.current);
        const newY = dot.y + sinValue * amplitude;

        circles[i].setAttribute("cy", newY.toString());
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dots, amplitude, frequency, speed]); 

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    >
      <g className={cn("transform-gpu", dotColor)}>
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={dotRadius}
          />
        ))}
      </g>
    </svg>
  );
}


code.demo.1750970849604.tsx

import { SineWaveDots } from "@/components/ui/sine-wave-dots";

export default function DemoOne() {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-white dark:bg-black p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          Sine Wave Dots Animation
        </h1>

      <div className="w-full max-w-3xl">
        <SineWaveDots
          className="opacity-50" 
          dotColor="fill-gray-500 dark:fill-gray-400" 
          gap={20}
          dotRadius={1.5}
          amplitude={30}
          frequency={0.015}
          speed={0.003}
        />
      </div>

    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sine-wave-dots.tsx
'use client'
import React, { useRef, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface SineWaveDotsProps {
  className?: string;
  dotColor?: string;
  dotRadius?: number;
  gap?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

export function SineWaveDots({
  className,
  dotColor = "fill-neutral-400/80",
  dotRadius = 1,
  gap = 20,
  amplitude = 25,
  frequency = 0.01,
  speed = 0.002,
}: SineWaveDotsProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const timeRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!svgRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  const dots = useMemo(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return [];

    const dotList: { x: number; y: number }[] = [];
    const numCols = Math.floor(width / gap);
    const numRows = Math.floor(height / gap);
    
    const padding = gap * 4;

    for (let i = -padding / gap; i < numCols + padding / gap; i++) {
      for (let j = -padding / gap; j < numRows + padding / gap; j++) {
        dotList.push({ x: i * gap, y: j * gap });
      }
    }
    return dotList;
  }, [dimensions, gap]);

  useEffect(() => {
    let animationFrameId: number;
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const circles = Array.from(svgElement.getElementsByTagName("circle"));
    if (circles.length === 0) return;

    const animate = () => {
      timeRef.current += speed;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        if(!circles[i]) continue;

        const sinValue = Math.sin(dot.x * frequency + timeRef.current);
        const newY = dot.y + sinValue * amplitude;

        circles[i].setAttribute("cy", newY.toString());
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dots, amplitude, frequency, speed]); 

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    >
      <g className={cn("transform-gpu", dotColor)}>
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={dotRadius}
          />
        ))}
      </g>
    </svg>
  );
}

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
