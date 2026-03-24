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
fallback-card.tsx
import React, { useRef, useEffect } from 'react';

interface FallbackCardProps {
  className?: string;
  message?: string;
  showIcon?: boolean;
  showGlitch?: boolean;
  theme?: 'dark' | 'light';
}

export default function FallbackCard({
  className,
  message = 'Preview not available',
  showIcon = true,
  showGlitch = true,
  theme = 'dark'
}: FallbackCardProps) {
  // ──────────────── LetterGlitch (inline) ────────────────
  const LetterGlitch = ({
    glitchColors,
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
    characters = '.,:;-*#',
    className = ''
  }: {
    glitchColors: string[];
    glitchSpeed?: number;
    centerVignette?: boolean;
    outerVignette?: boolean;
    smooth?: boolean;
    characters?: string;
    className?: string;
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const letters = useRef<Array<{ char: string; color: string; targetColor: string; colorProgress: number }>>([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef(Date.now());

    const lettersAndSymbols = Array.from(characters);
    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

    const hexToRgb = (hex: string) => {
      const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthand, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    };

    const interpolateColor = (s: any, e: any, f: number) =>
      `rgb(${Math.round(s.r + (e.r - s.r) * f)}, ${Math.round(s.g + (e.g - s.g) * f)}, ${Math.round(
        s.b + (e.b - s.b) * f
      )})`;

    const calculateGrid = (w: number, h: number) => ({
      columns: Math.ceil(w / charWidth),
      rows: Math.ceil(h / charHeight)
    });

    const initializeLetters = (columns: number, rows: number) => {
      grid.current = { columns, rows };
      letters.current = Array.from({ length: columns * rows }, () => ({
        char: getRandomChar(),
        color: getRandomColor(),
        targetColor: getRandomColor(),
        colorProgress: 1
      }));
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);
      drawLetters();
    };

    const drawLetters = () => {
      if (!context.current) return;
      const ctx = context.current;
      const { width, height } = canvasRef.current!.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';
      letters.current.forEach((letter, i) => {
        const x = (i % grid.current.columns) * charWidth;
        const y = Math.floor(i / grid.current.columns) * charHeight;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    };

    const updateLetters = () => {
      const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));
      for (let i = 0; i < updateCount; i++) {
        const idx = Math.floor(Math.random() * letters.current.length);
        if (!letters.current[idx]) continue;
        letters.current[idx].char = getRandomChar();
        letters.current[idx].targetColor = getRandomColor();
        if (!smooth) {
          letters.current[idx].color = letters.current[idx].targetColor;
          letters.current[idx].colorProgress = 1;
        } else {
          letters.current[idx].colorProgress = 0;
        }
      }
    };

    const handleSmooth = () => {
      let redraw = false;
      letters.current.forEach(l => {
        if (l.colorProgress < 1) {
          l.colorProgress += 0.05;
          if (l.colorProgress > 1) l.colorProgress = 1;
          const s = hexToRgb(l.color);
          const e = hexToRgb(l.targetColor);
          if (s && e) {
            l.color = interpolateColor(s, e, l.colorProgress);
            redraw = true;
          }
        }
      });
      if (redraw) drawLetters();
    };

    const animate = () => {
      const now = Date.now();
      if (now - lastGlitchTime.current >= glitchSpeed) {
        updateLetters();
        drawLetters();
        lastGlitchTime.current = now;
      }
      if (smooth) handleSmooth();
      animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      context.current = canvas.getContext('2d');
      resizeCanvas();
      animate();
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          resizeCanvas();
          animate();
        }, 100);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        window.removeEventListener('resize', handleResize);
      };
    }, [glitchSpeed, smooth]);

    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <canvas ref={canvasRef} className="block w-full h-full" />
        {outerVignette && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_100%)]" />
        )}
        {centerVignette && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_60%)]" />
        )}
      </div>
    );
  };

  // ──────────────── Theme-based colors ────────────────
  const glitchColors =
    theme === 'dark'
      ? ['#78b4ff', '#a0c4ff', '#c7d2fe', '#e0e7ff', '#f0f4ff']
      : ['#374151', '#6b7280', '#9ca3af', '#d1d5db'];

  const baseBg = theme === 'dark' ? 'bg-black text-white/90' : 'bg-white text-black/80';

  // ──────────────── Render ────────────────
  return (
    <div
      className={`relative flex flex-col items-center justify-center h-[400px] w-full overflow-hidden rounded-2xl border shadow-md ${baseBg} ${className}`}
    >
      {showGlitch && (
        <div className="absolute inset-0 opacity-25 z-10">
          <LetterGlitch glitchColors={glitchColors} characters="₀₁. " />
        </div>
      )}

      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(120, 180, 255, 0.25), transparent 70%), #000000'
              : 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(55,65,81,0.2), transparent 70%), #ffffff'
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center p-6">
        {showIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mb-3 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="20" x2="16" y2="20" />
          </svg>
        )}
        <p className="text-sm font-bold text-center">{message}</p>
      </div>
    </div>
  );
}


code.demo.1758602065436.tsx
"use client"

import React from "react"
import FallbackCard from "@/components/ui/fallback-card"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Code2, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function FallbackCardDemo() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Dark Horizon Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* First card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="w-[420px] overflow-hidden flex flex-col bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-xl transition-shadow">
            <div className="w-full">
              <FallbackCard
                theme="dark"
                message="Preview not available"
                showIcon
                showGlitch
              />
            </div>

            <CardFooter className="flex gap-2 justify-end p-3">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <Code2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Second card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <Card className="w-[420px] overflow-hidden flex flex-col bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-xl transition-shadow">
            <div className="w-full">
              <FallbackCard
                theme="dark"
                message="Preview not available"
                showIcon
                showGlitch
              />
            </div>

            <CardFooter className="flex gap-2 justify-end p-3">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <Code2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/fallback-card.tsx
import React, { useRef, useEffect } from 'react';

interface FallbackCardProps {
  className?: string;
  message?: string;
  showIcon?: boolean;
  showGlitch?: boolean;
  theme?: 'dark' | 'light';
}

export default function FallbackCard({
  className,
  message = 'Preview not available',
  showIcon = true,
  showGlitch = true,
  theme = 'dark'
}: FallbackCardProps) {
  // ──────────────── LetterGlitch (inline) ────────────────
  const LetterGlitch = ({
    glitchColors,
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
    characters = '.,:;-*#',
    className = ''
  }: {
    glitchColors: string[];
    glitchSpeed?: number;
    centerVignette?: boolean;
    outerVignette?: boolean;
    smooth?: boolean;
    characters?: string;
    className?: string;
  }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const letters = useRef<Array<{ char: string; color: string; targetColor: string; colorProgress: number }>>([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef(Date.now());

    const lettersAndSymbols = Array.from(characters);
    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

    const hexToRgb = (hex: string) => {
      const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthand, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    };

    const interpolateColor = (s: any, e: any, f: number) =>
      `rgb(${Math.round(s.r + (e.r - s.r) * f)}, ${Math.round(s.g + (e.g - s.g) * f)}, ${Math.round(
        s.b + (e.b - s.b) * f
      )})`;

    const calculateGrid = (w: number, h: number) => ({
      columns: Math.ceil(w / charWidth),
      rows: Math.ceil(h / charHeight)
    });

    const initializeLetters = (columns: number, rows: number) => {
      grid.current = { columns, rows };
      letters.current = Array.from({ length: columns * rows }, () => ({
        char: getRandomChar(),
        color: getRandomColor(),
        targetColor: getRandomColor(),
        colorProgress: 1
      }));
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (context.current) context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);
      drawLetters();
    };

    const drawLetters = () => {
      if (!context.current) return;
      const ctx = context.current;
      const { width, height } = canvasRef.current!.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';
      letters.current.forEach((letter, i) => {
        const x = (i % grid.current.columns) * charWidth;
        const y = Math.floor(i / grid.current.columns) * charHeight;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    };

    const updateLetters = () => {
      const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));
      for (let i = 0; i < updateCount; i++) {
        const idx = Math.floor(Math.random() * letters.current.length);
        if (!letters.current[idx]) continue;
        letters.current[idx].char = getRandomChar();
        letters.current[idx].targetColor = getRandomColor();
        if (!smooth) {
          letters.current[idx].color = letters.current[idx].targetColor;
          letters.current[idx].colorProgress = 1;
        } else {
          letters.current[idx].colorProgress = 0;
        }
      }
    };

    const handleSmooth = () => {
      let redraw = false;
      letters.current.forEach(l => {
        if (l.colorProgress < 1) {
          l.colorProgress += 0.05;
          if (l.colorProgress > 1) l.colorProgress = 1;
          const s = hexToRgb(l.color);
          const e = hexToRgb(l.targetColor);
          if (s && e) {
            l.color = interpolateColor(s, e, l.colorProgress);
            redraw = true;
          }
        }
      });
      if (redraw) drawLetters();
    };

    const animate = () => {
      const now = Date.now();
      if (now - lastGlitchTime.current >= glitchSpeed) {
        updateLetters();
        drawLetters();
        lastGlitchTime.current = now;
      }
      if (smooth) handleSmooth();
      animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      context.current = canvas.getContext('2d');
      resizeCanvas();
      animate();
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          resizeCanvas();
          animate();
        }, 100);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        window.removeEventListener('resize', handleResize);
      };
    }, [glitchSpeed, smooth]);

    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <canvas ref={canvasRef} className="block w-full h-full" />
        {outerVignette && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,1)_100%)]" />
        )}
        {centerVignette && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_60%)]" />
        )}
      </div>
    );
  };

  // ──────────────── Theme-based colors ────────────────
  const glitchColors =
    theme === 'dark'
      ? ['#78b4ff', '#a0c4ff', '#c7d2fe', '#e0e7ff', '#f0f4ff']
      : ['#374151', '#6b7280', '#9ca3af', '#d1d5db'];

  const baseBg = theme === 'dark' ? 'bg-black text-white/90' : 'bg-white text-black/80';

  // ──────────────── Render ────────────────
  return (
    <div
      className={`relative flex flex-col items-center justify-center h-[400px] w-full overflow-hidden rounded-2xl border shadow-md ${baseBg} ${className}`}
    >
      {showGlitch && (
        <div className="absolute inset-0 opacity-25 z-10">
          <LetterGlitch glitchColors={glitchColors} characters="₀₁. " />
        </div>
      )}

      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(120, 180, 255, 0.25), transparent 70%), #000000'
              : 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(55,65,81,0.2), transparent 70%), #ffffff'
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center p-6">
        {showIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mb-3 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="20" x2="16" y2="20" />
          </svg>
        )}
        <p className="text-sm font-bold text-center">{message}</p>
      </div>
    </div>
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
