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
background-snippets-noise-effect11.tsx
import React, { useRef, useEffect } from "react";

/** Inline Noise overlay (no external imports). */
interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number; // 0–255
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250, // (reserved for future scaling)
  patternScaleX = 1,  // (reserved)
  patternScaleY = 1,  // (reserved)
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const canvasSize = 1024;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      // Cover viewport
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none absolute inset-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

/** Gradient + Noise (applied to one of our previous dark radial variants). */
export default function Component() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      {/* Radial spotlight (orange) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#f97316,transparent)]" />
      {/* Grain overlay */}
      <Noise patternRefreshInterval={2} patternAlpha={18} />
    </div>
  );
}


code.demo.1756797499984.tsx
import React, { useRef, useEffect } from "react";

const Noise: React.FC<{ patternRefreshInterval?: number; patternAlpha?: number }> = ({ patternRefreshInterval = 2, patternAlpha = 14 }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d", { alpha: true }); if (!ctx) return;
    let f=0,id=0,S=1024;
    const resize=()=>{c.width=S;c.height=S;c.style.width="100vw";c.style.height="100vh";};
    const draw=()=>{const img=ctx.createImageData(S,S);const d=img.data;for(let i=0;i<d.length;i+=4){const v=Math.random()*255;d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=patternAlpha;}ctx.putImageData(img,0,0);};
    const loop=()=>{if(f%patternRefreshInterval===0)draw();f++;id=requestAnimationFrame(loop);};
    addEventListener("resize",resize);resize();loop();return()=>{removeEventListener("resize",resize);cancelAnimationFrame(id);};
  },[patternRefreshInterval,patternAlpha]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0" style={{ imageRendering: "pixelated" }}/>;
};

export default function Component() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_520px_at_35%_240px,#3b82f640,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_520px_at_70%_540px,#a855f740,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:22px_22px]" />
      <Noise patternAlpha={18}/>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/background-snippets-noise-effect11.tsx
import React, { useRef, useEffect } from "react";

/** Inline Noise overlay (no external imports). */
interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number; // 0–255
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250, // (reserved for future scaling)
  patternScaleX = 1,  // (reserved)
  patternScaleY = 1,  // (reserved)
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const canvasSize = 1024;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      // Cover viewport
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none absolute inset-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

/** Gradient + Noise (applied to one of our previous dark radial variants). */
export default function Component() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      {/* Radial spotlight (orange) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#f97316,transparent)]" />
      {/* Grain overlay */}
      <Noise patternRefreshInterval={2} patternAlpha={18} />
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
