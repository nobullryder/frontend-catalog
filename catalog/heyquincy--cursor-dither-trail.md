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
cursor-dither-trail.tsx
// CursorDitherTrail.tsx – fluid monochrome dither tail that follows the cursor
// -----------------------------------------------------------------------------
// Concept: as the user moves the mouse, we paint tiny 2×2 pixel blocks onto a
// full‑size canvas.  Each new block is chosen either as `trailColor` or fully
// transparent based on a pseudo‑random threshold (simple Bayer matrix), giving
// the appearance of a dynamic dithering effect that fades out with time.
//
// Props
//  • trailColor     ‑ HEX string used for the dots (default lime‑green)
//  • dotSize        ‑ pixel size of each painted square (1–4 recommended)
//  • fadeDuration   ‑ ms until a dot fully fades (via alpha decay)
//  • className      ‑ tailwind classes for outer wrapper (size control)
//
// The component uses `requestAnimationFrame` to gradually clear older drawings
// creating a smooth, fluid tail rather than an instantly filling canvas.
// -----------------------------------------------------------------------------
import React, { useRef, useEffect } from "react";

interface CursorDitherTrailProps {
  trailColor?: string; // monochrome colour of dots
  dotSize?: number; // side length of a pixel square (1‑4px)
  fadeDuration?: number; // milliseconds for a dot to vanish
  className?: string;
}

export function Component({
  trailColor = "#D0FBB6", // lime by default
  dotSize = 4,
  fadeDuration = 600,
  className = "w-full h-full",
}: CursorDitherTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Adjust on resize
    const onResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    // Convert hex → rgba once
    const int = parseInt(trailColor.replace("#", ""), 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;

    // Simple 2×2 Bayer matrix for random‑looking dither threshold
    const bayer = [0, 2, 3, 1];

    const paintDot = (x: number, y: number) => {
      // For debug: always paint a fully opaque square so we can verify
      ctx.fillStyle = `rgba(${r},${g},${b},1)`;
      ctx.fillRect(x, y, dotSize, dotSize);
    };;

    let lastTime = performance.now();
    const fadeStep = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      // Clear with low alpha to fade previous dots
      const fadeAlpha = delta / fadeDuration;
      ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(fadeStep);
    };
    requestAnimationFrame(fadeStep);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / dotSize) * dotSize;
      const y = Math.floor((e.clientY - rect.top) / dotSize) * dotSize;
      paintDot(x, y);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [trailColor, dotSize, fadeDuration]);

  return <canvas ref={canvasRef} className={className} />;
}

export default Component;

// --------------------------------
// 21st.dev controls for quick edits
// --------------------------------
export const controls = {
  trailColor: { type: "color", label: "Dot colour", default: "#B6FF8E" },
  dotSize: { type: "number", label: "Dot size", min: 1, max: 4, step: 1, default: 2 },
  fadeDuration: {
    type: "number",
    label: "Fade (ms)",
    min: 200,
    max: 2000,
    step: 100,
    default: 600,
  },
};


code.demo.1748886114971.tsx
// This is file with demos of your component
// Each export is one usecase for your component

import DitherTrail from "./components/ui/cursor-dither-trail";

export default function DemoTail() {
  return (
    <DitherTrail
      className="w-screen h-screen bg-black"
      trailColor="#D0FBB6"
      dotSize={6}
      fadeDuration={1000}
    />
  );
}



```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cursor-dither-trail.tsx
// CursorDitherTrail.tsx – fluid monochrome dither tail that follows the cursor
// -----------------------------------------------------------------------------
// Concept: as the user moves the mouse, we paint tiny 2×2 pixel blocks onto a
// full‑size canvas.  Each new block is chosen either as `trailColor` or fully
// transparent based on a pseudo‑random threshold (simple Bayer matrix), giving
// the appearance of a dynamic dithering effect that fades out with time.
//
// Props
//  • trailColor     ‑ HEX string used for the dots (default lime‑green)
//  • dotSize        ‑ pixel size of each painted square (1–4 recommended)
//  • fadeDuration   ‑ ms until a dot fully fades (via alpha decay)
//  • className      ‑ tailwind classes for outer wrapper (size control)
//
// The component uses `requestAnimationFrame` to gradually clear older drawings
// creating a smooth, fluid tail rather than an instantly filling canvas.
// -----------------------------------------------------------------------------
import React, { useRef, useEffect } from "react";

interface CursorDitherTrailProps {
  trailColor?: string; // monochrome colour of dots
  dotSize?: number; // side length of a pixel square (1‑4px)
  fadeDuration?: number; // milliseconds for a dot to vanish
  className?: string;
}

export function Component({
  trailColor = "#D0FBB6", // lime by default
  dotSize = 4,
  fadeDuration = 600,
  className = "w-full h-full",
}: CursorDitherTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Adjust on resize
    const onResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    // Convert hex → rgba once
    const int = parseInt(trailColor.replace("#", ""), 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;

    // Simple 2×2 Bayer matrix for random‑looking dither threshold
    const bayer = [0, 2, 3, 1];

    const paintDot = (x: number, y: number) => {
      // For debug: always paint a fully opaque square so we can verify
      ctx.fillStyle = `rgba(${r},${g},${b},1)`;
      ctx.fillRect(x, y, dotSize, dotSize);
    };;

    let lastTime = performance.now();
    const fadeStep = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      // Clear with low alpha to fade previous dots
      const fadeAlpha = delta / fadeDuration;
      ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(fadeStep);
    };
    requestAnimationFrame(fadeStep);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / dotSize) * dotSize;
      const y = Math.floor((e.clientY - rect.top) / dotSize) * dotSize;
      paintDot(x, y);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [trailColor, dotSize, fadeDuration]);

  return <canvas ref={canvasRef} className={className} />;
}

export default Component;

// --------------------------------
// 21st.dev controls for quick edits
// --------------------------------
export const controls = {
  trailColor: { type: "color", label: "Dot colour", default: "#B6FF8E" },
  dotSize: { type: "number", label: "Dot size", min: 1, max: 4, step: 1, default: 2 },
  fadeDuration: {
    type: "number",
    label: "Fade (ms)",
    min: 200,
    max: 2000,
    step: 100,
    default: 600,
  },
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
