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
tidal-cursor.tsx
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripples = useRef<
    { x: number; y: number; radius: number; alpha: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addRipple = (x: number, y: number) => {
      ripples.current.push({ x, y, radius: 0, alpha: 0.8 });
    };

    const handleMove = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      ripples.current.forEach((r) => {
        r.radius += 1.5;
        r.alpha -= 0.01;

        if (r.alpha > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(0, 255, 255, ${r.alpha})` // night mode aqua
            : `rgba(0, 128, 255, ${r.alpha})`; // day mode blue
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      ripples.current = ripples.current.filter((r) => r.alpha > 0);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-screen overflow-hidden")}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4 dark:text-cyan-300 text-blue-600">
          Tidal Wave Cursor
        </h1>
        <p className="dark:text-gray-300 text-gray-700">
          Move your mouse to make ripples 🌊
        </p>
      </div>
    </div>
  );
};


code.demo.1756416011619.tsx
import { Component } from "@/components/ui/tidal-cursor";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tidal-cursor.tsx
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripples = useRef<
    { x: number; y: number; radius: number; alpha: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addRipple = (x: number, y: number) => {
      ripples.current.push({ x, y, radius: 0, alpha: 0.8 });
    };

    const handleMove = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      ripples.current.forEach((r) => {
        r.radius += 1.5;
        r.alpha -= 0.01;

        if (r.alpha > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(0, 255, 255, ${r.alpha})` // night mode aqua
            : `rgba(0, 128, 255, ${r.alpha})`; // day mode blue
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      ripples.current = ripples.current.filter((r) => r.alpha > 0);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-screen overflow-hidden")}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4 dark:text-cyan-300 text-blue-600">
          Tidal Wave Cursor
        </h1>
        <p className="dark:text-gray-300 text-gray-700">
          Move your mouse to make ripples 🌊
        </p>
      </div>
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
