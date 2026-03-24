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
text-glow-hover.tsx
// src/components/ui/component.tsx

"use client";

import * as React from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const parseColor = (input: string) => {
  if (!input) return { r: 255, g: 255, b: 255 }; // fallback
  if (input.startsWith("rgb")) {
    const match = input.match(/rgba?\(([^)]+)\)/);
    if (match) {
      const parts = match[1].split(",").map(Number);
      return { r: parts[0] || 255, g: parts[1] || 255, b: parts[2] || 255 };
    }
  } else if (input.startsWith("#")) {
    let hex = input.replace("#", "");
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
  }
  return { r: 255, g: 255, b: 255 };
};

const lerpColor = (a: {r:number;g:number;b:number}, b: {r:number;g:number;b:number}, t: number) => ({
  r: Math.round(a.r + (b.r - a.r) * t),
  g: Math.round(a.g + (b.g - a.g) * t),
  b: Math.round(a.b + (b.b - a.b) * t),
});


interface FontProps {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number;
  fontStyle?: "normal" | "italic";
  letterSpacing?: number | string;
  lineHeight?: number | string;
}

interface ComponentProps {
  text?: string;
  copies?: number;
  textColor?: string;
  backgroundColor?: string;
  font?: FontProps;
  shadowColor?: string;
  useGradientGlow?: boolean;
  glowStartColor?: string;
  glowEndColor?: string;
  shadowScaleFactor?: number;
  animateGlow?: boolean;
  glowBlur?: number;
  glowOpacity?: number;
}

// --- Component ---

export const Component = ({
  text = "Light",
  copies = 100,
  textColor = "#FFFFFF",
  backgroundColor = "#111111",
  font = {
    fontFamily: "UnifrakturMaguntia, system-ui",
    fontSize: 160,
    fontWeight: 400,
    fontStyle: "normal",
    letterSpacing: 0,
    lineHeight: 1.1,
  },
  shadowColor = "#FFFFFF",
  useGradientGlow = false,
  glowStartColor = "#FFFFFF",
  glowEndColor = "#BB1111",
  shadowScaleFactor = 0.01,
  animateGlow = false,
  glowBlur = 32,
  glowOpacity = 1,
}: ComponentProps) => {
  const [direction, setDirection] = useState({ horizontal: 0, vertical: 0 });
  const [pulse, setPulse] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const centerAnimRef = useRef<number>();

  useEffect(() => {
    if (!animateGlow) return;
    let frame: number, start: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const time = (timestamp - start) / 1000;
      setPulse(0.95 + 0.1 * (0.5 + 0.5 * Math.sin(time * 2)));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animateGlow]);

  const handlePointerMove = useCallback((e: PointerEvent | TouchEvent) => {
    if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const horizontal = (x - rect.width / 2) / (rect.width / 2);
    const vertical = (y - rect.height / 2) / (rect.height / 2);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
        setDirection({ 
            horizontal: Math.max(-1, Math.min(1, horizontal)), 
            vertical: Math.max(-1, Math.min(1, vertical))
        });
    });
  }, []);


  const handlePointerLeave = useCallback(() => {
    if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
    
    const animateBack = () => {
      setDirection(prev => {
        const speed = 0.1;
        const h = prev.horizontal * (1 - speed);
        const v = prev.vertical * (1 - speed);

        if (Math.abs(h) < 0.01 && Math.abs(v) < 0.01) {
          if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
          return { horizontal: 0, vertical: 0 };
        } else {
          centerAnimRef.current = requestAnimationFrame(animateBack);
          return { horizontal: h, vertical: v };
        }
      });
    };
    centerAnimRef.current = requestAnimationFrame(animateBack);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handlePointerMove as EventListener);
    el.addEventListener("touchmove", handlePointerMove as EventListener);
    el.addEventListener("mouseleave", handlePointerLeave);
    el.addEventListener("touchend", handlePointerLeave);
    return () => {
      el.removeEventListener("mousemove", handlePointerMove as EventListener);
      el.removeEventListener("touchmove", handlePointerMove as EventListener);
      el.removeEventListener("mouseleave", handlePointerLeave);
      el.removeEventListener("touchend", handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
    };
  }, [handlePointerMove, handlePointerLeave]);
  

  useEffect(() => {
    if (document.getElementById("mouse-text-shadow-style")) return;
    const style = document.createElement("style");
    style.id = "mouse-text-shadow-style";
    style.innerHTML = `
      .mouse-text-shadow-copy {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) 
                   translate(calc(var(--index) * var(--horizontal) * -0.1rem), 
                             calc(var(--index) * var(--vertical) * -0.1rem)) 
                   scale(calc(1 + var(--index) * var(--shadow-scale)));
        color: var(--shadow-color);
        filter: blur(0.1rem);
        user-select: none;
        pointer-events: none;
        white-space: pre;
        text-align: center;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        font-style: inherit;
        letter-spacing: inherit;
        line-height: inherit;
        will-change: transform;
        z-index: 0;
      }
    `;
    document.head.appendChild(style);
  }, []);

  
  const shadowColorStrings = useMemo(() => {
    const shadowRGB = parseColor(shadowColor);
    const startRGB = parseColor(glowStartColor);
    const endRGB = parseColor(glowEndColor);
    return Array.from({ length: copies }, (_, i) => {
      const rgb = useGradientGlow ? lerpColor(startRGB, endRGB, i / (copies - 1)) : shadowRGB;
      return `rgba(${rgb.r},${rgb.g},${rgb.b},${1 / (i + 1)})`;
    });
  }, [copies, useGradientGlow, shadowColor, glowStartColor, glowEndColor]);

  const shadowCopies = useMemo(() => 
    Array.from({ length: copies }, (_, i) => (
      <div
        key={i}
        aria-hidden="true"
        className="mouse-text-shadow-copy"
        style={{
          '--index': i + 1,
          '--shadow-color': shadowColorStrings[i],
        } as React.CSSProperties}
      >
        {text}
      </div>
    )),
    [copies, text, shadowColorStrings]
  );
  
  const glowColor = useGradientGlow ? glowStartColor : shadowColor;
  const glowRGB = parseColor(glowColor);
  const glowColorWithAlpha = `rgba(${glowRGB.r},${glowRGB.g},${glowRGB.b},${glowOpacity})`;
  
  const mainTextStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    userSelect: 'none',
    whiteSpace: 'pre',
    textAlign: 'center',
    color: textColor,
    ...font,
    textShadow: `
      ${direction.horizontal * -2}px ${direction.vertical * -2}px ${glowBlur}px ${glowColorWithAlpha},
      ${direction.horizontal * -4}px ${direction.vertical * -4}px ${glowBlur * 2}px ${glowColorWithAlpha},
      ${direction.horizontal * -1}px ${direction.vertical * -1}px ${Math.round(glowBlur / 4)}px ${glowColorWithAlpha}
    `,
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: backgroundColor,
    overflow: 'hidden',
    touchAction: 'none',
    cursor: 'pointer',
    ...font,
    '--horizontal': direction.horizontal,
    '--vertical': direction.vertical,
    '--shadow-scale': shadowScaleFactor * pulse,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {shadowCopies}
      <h1 role="heading" aria-level={1} style={mainTextStyle}>
        {text}
      </h1>
    </div>
  );
};

code.demo.1754047216452.tsx
// src/demos/DemoOne.tsx

import { Component } from "@/components/ui/text-glow-hover";

// Для корректного отображения необходимо импортировать шрифт в вашем основном CSS-файле
// или в head вашего HTML:
// @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap');

const DemoOne = () => {
  return (
    // Демо-контейнер, заполняющий весь экран
    <div className="flex w-full h-screen justify-center items-center bg-[#111111]">
      {/* Контейнер для самого компонента, чтобы он не растягивался на весь экран */}
      <div className="w-full h-full">
        <Component
          // Используем те же пропсы, что и в оригинальном примере, для идентичного вида
          text="Light"
          copies={100}
          textColor="#FFFFFF"
          backgroundColor="#111111"
          font={{
            fontFamily: "UnifrakturMaguntia, system-ui",
            fontSize: 100,
            fontWeight: 600,
          }}
          shadowColor="#FFFFFF"
          useGradientGlow={false} // Можно включить (true) для градиентного эффекта
          animateGlow={false} // Включим пульсацию для динамики
          shadowScaleFactor={0.01}
          glowBlur={64}
          glowOpacity={2}
        />
      </div>
    </div>
  );
};

export default DemoOne ;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-glow-hover.tsx
// src/components/ui/component.tsx

"use client";

import * as React from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const parseColor = (input: string) => {
  if (!input) return { r: 255, g: 255, b: 255 }; // fallback
  if (input.startsWith("rgb")) {
    const match = input.match(/rgba?\(([^)]+)\)/);
    if (match) {
      const parts = match[1].split(",").map(Number);
      return { r: parts[0] || 255, g: parts[1] || 255, b: parts[2] || 255 };
    }
  } else if (input.startsWith("#")) {
    let hex = input.replace("#", "");
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
  }
  return { r: 255, g: 255, b: 255 };
};

const lerpColor = (a: {r:number;g:number;b:number}, b: {r:number;g:number;b:number}, t: number) => ({
  r: Math.round(a.r + (b.r - a.r) * t),
  g: Math.round(a.g + (b.g - a.g) * t),
  b: Math.round(a.b + (b.b - a.b) * t),
});


interface FontProps {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number;
  fontStyle?: "normal" | "italic";
  letterSpacing?: number | string;
  lineHeight?: number | string;
}

interface ComponentProps {
  text?: string;
  copies?: number;
  textColor?: string;
  backgroundColor?: string;
  font?: FontProps;
  shadowColor?: string;
  useGradientGlow?: boolean;
  glowStartColor?: string;
  glowEndColor?: string;
  shadowScaleFactor?: number;
  animateGlow?: boolean;
  glowBlur?: number;
  glowOpacity?: number;
}

// --- Component ---

export const Component = ({
  text = "Light",
  copies = 100,
  textColor = "#FFFFFF",
  backgroundColor = "#111111",
  font = {
    fontFamily: "UnifrakturMaguntia, system-ui",
    fontSize: 160,
    fontWeight: 400,
    fontStyle: "normal",
    letterSpacing: 0,
    lineHeight: 1.1,
  },
  shadowColor = "#FFFFFF",
  useGradientGlow = false,
  glowStartColor = "#FFFFFF",
  glowEndColor = "#BB1111",
  shadowScaleFactor = 0.01,
  animateGlow = false,
  glowBlur = 32,
  glowOpacity = 1,
}: ComponentProps) => {
  const [direction, setDirection] = useState({ horizontal: 0, vertical: 0 });
  const [pulse, setPulse] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const centerAnimRef = useRef<number>();

  useEffect(() => {
    if (!animateGlow) return;
    let frame: number, start: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const time = (timestamp - start) / 1000;
      setPulse(0.95 + 0.1 * (0.5 + 0.5 * Math.sin(time * 2)));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animateGlow]);

  const handlePointerMove = useCallback((e: PointerEvent | TouchEvent) => {
    if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const horizontal = (x - rect.width / 2) / (rect.width / 2);
    const vertical = (y - rect.height / 2) / (rect.height / 2);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
        setDirection({ 
            horizontal: Math.max(-1, Math.min(1, horizontal)), 
            vertical: Math.max(-1, Math.min(1, vertical))
        });
    });
  }, []);


  const handlePointerLeave = useCallback(() => {
    if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
    
    const animateBack = () => {
      setDirection(prev => {
        const speed = 0.1;
        const h = prev.horizontal * (1 - speed);
        const v = prev.vertical * (1 - speed);

        if (Math.abs(h) < 0.01 && Math.abs(v) < 0.01) {
          if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
          return { horizontal: 0, vertical: 0 };
        } else {
          centerAnimRef.current = requestAnimationFrame(animateBack);
          return { horizontal: h, vertical: v };
        }
      });
    };
    centerAnimRef.current = requestAnimationFrame(animateBack);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handlePointerMove as EventListener);
    el.addEventListener("touchmove", handlePointerMove as EventListener);
    el.addEventListener("mouseleave", handlePointerLeave);
    el.addEventListener("touchend", handlePointerLeave);
    return () => {
      el.removeEventListener("mousemove", handlePointerMove as EventListener);
      el.removeEventListener("touchmove", handlePointerMove as EventListener);
      el.removeEventListener("mouseleave", handlePointerLeave);
      el.removeEventListener("touchend", handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (centerAnimRef.current) cancelAnimationFrame(centerAnimRef.current);
    };
  }, [handlePointerMove, handlePointerLeave]);
  

  useEffect(() => {
    if (document.getElementById("mouse-text-shadow-style")) return;
    const style = document.createElement("style");
    style.id = "mouse-text-shadow-style";
    style.innerHTML = `
      .mouse-text-shadow-copy {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) 
                   translate(calc(var(--index) * var(--horizontal) * -0.1rem), 
                             calc(var(--index) * var(--vertical) * -0.1rem)) 
                   scale(calc(1 + var(--index) * var(--shadow-scale)));
        color: var(--shadow-color);
        filter: blur(0.1rem);
        user-select: none;
        pointer-events: none;
        white-space: pre;
        text-align: center;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        font-style: inherit;
        letter-spacing: inherit;
        line-height: inherit;
        will-change: transform;
        z-index: 0;
      }
    `;
    document.head.appendChild(style);
  }, []);

  
  const shadowColorStrings = useMemo(() => {
    const shadowRGB = parseColor(shadowColor);
    const startRGB = parseColor(glowStartColor);
    const endRGB = parseColor(glowEndColor);
    return Array.from({ length: copies }, (_, i) => {
      const rgb = useGradientGlow ? lerpColor(startRGB, endRGB, i / (copies - 1)) : shadowRGB;
      return `rgba(${rgb.r},${rgb.g},${rgb.b},${1 / (i + 1)})`;
    });
  }, [copies, useGradientGlow, shadowColor, glowStartColor, glowEndColor]);

  const shadowCopies = useMemo(() => 
    Array.from({ length: copies }, (_, i) => (
      <div
        key={i}
        aria-hidden="true"
        className="mouse-text-shadow-copy"
        style={{
          '--index': i + 1,
          '--shadow-color': shadowColorStrings[i],
        } as React.CSSProperties}
      >
        {text}
      </div>
    )),
    [copies, text, shadowColorStrings]
  );
  
  const glowColor = useGradientGlow ? glowStartColor : shadowColor;
  const glowRGB = parseColor(glowColor);
  const glowColorWithAlpha = `rgba(${glowRGB.r},${glowRGB.g},${glowRGB.b},${glowOpacity})`;
  
  const mainTextStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    userSelect: 'none',
    whiteSpace: 'pre',
    textAlign: 'center',
    color: textColor,
    ...font,
    textShadow: `
      ${direction.horizontal * -2}px ${direction.vertical * -2}px ${glowBlur}px ${glowColorWithAlpha},
      ${direction.horizontal * -4}px ${direction.vertical * -4}px ${glowBlur * 2}px ${glowColorWithAlpha},
      ${direction.horizontal * -1}px ${direction.vertical * -1}px ${Math.round(glowBlur / 4)}px ${glowColorWithAlpha}
    `,
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: backgroundColor,
    overflow: 'hidden',
    touchAction: 'none',
    cursor: 'pointer',
    ...font,
    '--horizontal': direction.horizontal,
    '--vertical': direction.vertical,
    '--shadow-scale': shadowScaleFactor * pulse,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {shadowCopies}
      <h1 role="heading" aria-level={1} style={mainTextStyle}>
        {text}
      </h1>
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
