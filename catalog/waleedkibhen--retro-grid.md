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
retro-grid.tsx
import { useEffect, useRef } from "react";

interface RetroGridProps {
  gridColor?: string;
  showScanlines?: boolean;
  glowEffect?: boolean;
  className?: string;
}

function RetroGrid({
  gridColor = "#ff00ff",
  showScanlines = true,
  glowEffect = true,
  className = "",
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 0, b: 255 };
    };

    const cellWidth = 120;
    const cellDepth = 80;
    const numCellsWide = 16;
    const numCellsDeep = 20;

    const cameraX = 0;
    const cameraY = 60;
    const cameraZ = 400;
    const focalLength = 500;

    let offset = 0;
    const speed = 1.5;

    const project3DTo2D = (x: number, y: number, z: number) => {
      const relX = x - cameraX;
      const relY = y - cameraY;
      const relZ = z - cameraZ;

      if (relZ <= 10) return null;

      const scale = focalLength / relZ;
      const screenX = canvas.width / 2 + relX * scale;
      const screenY = canvas.height * 0.5 - relY * scale;

      return { x: screenX, y: screenY, scale, z: relZ };
    };

    const drawCell = (x: number, z: number, zOffset: number) => {
      const actualZ = z - zOffset;
      if (actualZ < -cellDepth || actualZ > numCellsDeep * cellDepth) return;

      const topLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ);
      const topRight = project3DTo2D(x + cellWidth / 2, 0, actualZ);
      const bottomLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ + cellDepth);
      const bottomRight = project3DTo2D(x + cellWidth / 2, 0, actualZ + cellDepth);

      if (!topLeft || !topRight || !bottomLeft || !bottomRight) return;
      if (actualZ < 0) return;

      const distanceFactor = Math.min(1, actualZ / (numCellsDeep * cellDepth));
      const alpha = Math.max(0.3, 1 - distanceFactor * 0.7);
      const lineWidth = Math.max(1, 2.5 * (1 - distanceFactor * 0.5));

      if (glowEffect) {
        ctx.shadowBlur = 10 * (1 - distanceFactor);
        ctx.shadowColor = gridColor;
      }

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gridColor;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(bottomLeft.x, bottomLeft.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(topLeft.x, topLeft.y);
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawScanlines = () => {
      if (!showScanlines) return;

      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#000000";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rgb = hexToRgb(gridColor);

      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.55);
      skyGradient.addColorStop(0, `rgba(${rgb.r * 0.05}, ${rgb.g * 0.05}, ${rgb.b * 0.15}, 1)`);
      skyGradient.addColorStop(0.3, `rgba(${rgb.r * 0.1}, ${rgb.g * 0.08}, ${rgb.b * 0.2}, 1)`);
      skyGradient.addColorStop(0.5, `rgba(${rgb.r * 0.2}, ${rgb.g * 0.15}, ${rgb.b * 0.3}, 1)`);
      skyGradient.addColorStop(0.7, `rgba(${rgb.r * 0.35}, ${rgb.g * 0.25}, ${rgb.b * 0.4}, 1)`);
      skyGradient.addColorStop(0.85, `rgba(${rgb.r * 0.55}, ${rgb.g * 0.4}, ${rgb.b * 0.6}, 1)`);
      skyGradient.addColorStop(1, `rgba(${rgb.r * 0.7}, ${rgb.g * 0.5}, ${rgb.b * 0.75}, 1)`);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.55);

      const groundGradient = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height);
      groundGradient.addColorStop(0, `rgba(${rgb.r * 0.1}, ${rgb.g * 0.08}, ${rgb.b * 0.15}, 1)`);
      groundGradient.addColorStop(0.3, `rgba(${rgb.r * 0.05}, ${rgb.g * 0.03}, ${rgb.b * 0.08}, 1)`);
      groundGradient.addColorStop(1, "#000000");
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, canvas.height * 0.55, canvas.width, canvas.height * 0.45);

      offset += speed;
      if (offset >= cellDepth) offset = 0;

      for (let row = -5; row < numCellsDeep + 5; row++) {
        const z = row * cellDepth;

        for (let col = -Math.floor(numCellsWide / 2); col <= Math.floor(numCellsWide / 2); col++) {
          const x = col * cellWidth;
          drawCell(x, z, offset);
        }
      }

      drawScanlines();

      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [gridColor, showScanlines, glowEffect]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ background: "#000000", width: "100%", height: "100%" }}
    />
  );
}

export default RetroGrid;


code.demo.1761127939074.tsx
import { useState } from "react";
import Component from "@/components/ui/retro-grid";

export default function Demo() {
  const [gridColor, setGridColor] = useState("#ff00ff");
  const [showScanlines, setShowScanlines] = useState(true);
  const [glowEffect, setGlowEffect] = useState(true);
  const [panelPosition, setPanelPosition] = useState({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  return (
    <div className="relative w-full h-screen">
      <Component
        gridColor={gridColor}
        showScanlines={showScanlines}
        glowEffect={glowEffect}
        className="fixed inset-0 w-full h-full"
      />

      <div
        className="absolute bg-black/80 backdrop-blur-sm p-6 rounded-lg border-2 border-purple-500/50 shadow-xl cursor-move select-none"
        style={{
          left: `${panelPosition.x}px`,
          top: `${panelPosition.y}px`,
        }}
        onMouseDown={(e) => {
          setIsDragging(true);
          setDragOffset({
            x: e.clientX - panelPosition.x,
            y: e.clientY - panelPosition.y,
          });
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            setPanelPosition({
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y,
            });
          }
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <h2 className="text-purple-300 font-bold text-lg mb-4 tracking-wide">
          RETRO CONTROLS
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-purple-200 text-sm block mb-2">Grid Color</label>
            <div className="flex gap-2 flex-wrap">
              {["#ff00ff", "#00ffff", "#ff0066", "#00ff00", "#ffff00", "#ff6600"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => setGridColor(color)}
                    className={`w-10 h-10 rounded border-2 transition-all ${
                      gridColor === color ? "border-white scale-110" : "border-gray-600"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
              <input
                type="color"
                value={gridColor}
                onChange={(e) => setGridColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-purple-200 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showScanlines}
                onChange={(e) => setShowScanlines(e.target.checked)}
                className="w-4 h-4"
              />
              <span>CRT Scanlines</span>
            </label>

            <label className="flex items-center gap-3 text-purple-200 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={glowEffect}
                onChange={(e) => setGlowEffect(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Neon Glow</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/retro-grid.tsx
import { useEffect, useRef } from "react";

interface RetroGridProps {
  gridColor?: string;
  showScanlines?: boolean;
  glowEffect?: boolean;
  className?: string;
}

function RetroGrid({
  gridColor = "#ff00ff",
  showScanlines = true,
  glowEffect = true,
  className = "",
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 0, b: 255 };
    };

    const cellWidth = 120;
    const cellDepth = 80;
    const numCellsWide = 16;
    const numCellsDeep = 20;

    const cameraX = 0;
    const cameraY = 60;
    const cameraZ = 400;
    const focalLength = 500;

    let offset = 0;
    const speed = 1.5;

    const project3DTo2D = (x: number, y: number, z: number) => {
      const relX = x - cameraX;
      const relY = y - cameraY;
      const relZ = z - cameraZ;

      if (relZ <= 10) return null;

      const scale = focalLength / relZ;
      const screenX = canvas.width / 2 + relX * scale;
      const screenY = canvas.height * 0.5 - relY * scale;

      return { x: screenX, y: screenY, scale, z: relZ };
    };

    const drawCell = (x: number, z: number, zOffset: number) => {
      const actualZ = z - zOffset;
      if (actualZ < -cellDepth || actualZ > numCellsDeep * cellDepth) return;

      const topLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ);
      const topRight = project3DTo2D(x + cellWidth / 2, 0, actualZ);
      const bottomLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ + cellDepth);
      const bottomRight = project3DTo2D(x + cellWidth / 2, 0, actualZ + cellDepth);

      if (!topLeft || !topRight || !bottomLeft || !bottomRight) return;
      if (actualZ < 0) return;

      const distanceFactor = Math.min(1, actualZ / (numCellsDeep * cellDepth));
      const alpha = Math.max(0.3, 1 - distanceFactor * 0.7);
      const lineWidth = Math.max(1, 2.5 * (1 - distanceFactor * 0.5));

      if (glowEffect) {
        ctx.shadowBlur = 10 * (1 - distanceFactor);
        ctx.shadowColor = gridColor;
      }

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gridColor;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(bottomLeft.x, bottomLeft.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(topLeft.x, topLeft.y);
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawScanlines = () => {
      if (!showScanlines) return;

      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#000000";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rgb = hexToRgb(gridColor);

      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.55);
      skyGradient.addColorStop(0, `rgba(${rgb.r * 0.05}, ${rgb.g * 0.05}, ${rgb.b * 0.15}, 1)`);
      skyGradient.addColorStop(0.3, `rgba(${rgb.r * 0.1}, ${rgb.g * 0.08}, ${rgb.b * 0.2}, 1)`);
      skyGradient.addColorStop(0.5, `rgba(${rgb.r * 0.2}, ${rgb.g * 0.15}, ${rgb.b * 0.3}, 1)`);
      skyGradient.addColorStop(0.7, `rgba(${rgb.r * 0.35}, ${rgb.g * 0.25}, ${rgb.b * 0.4}, 1)`);
      skyGradient.addColorStop(0.85, `rgba(${rgb.r * 0.55}, ${rgb.g * 0.4}, ${rgb.b * 0.6}, 1)`);
      skyGradient.addColorStop(1, `rgba(${rgb.r * 0.7}, ${rgb.g * 0.5}, ${rgb.b * 0.75}, 1)`);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.55);

      const groundGradient = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height);
      groundGradient.addColorStop(0, `rgba(${rgb.r * 0.1}, ${rgb.g * 0.08}, ${rgb.b * 0.15}, 1)`);
      groundGradient.addColorStop(0.3, `rgba(${rgb.r * 0.05}, ${rgb.g * 0.03}, ${rgb.b * 0.08}, 1)`);
      groundGradient.addColorStop(1, "#000000");
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, canvas.height * 0.55, canvas.width, canvas.height * 0.45);

      offset += speed;
      if (offset >= cellDepth) offset = 0;

      for (let row = -5; row < numCellsDeep + 5; row++) {
        const z = row * cellDepth;

        for (let col = -Math.floor(numCellsWide / 2); col <= Math.floor(numCellsWide / 2); col++) {
          const x = col * cellWidth;
          drawCell(x, z, offset);
        }
      }

      drawScanlines();

      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [gridColor, showScanlines, glowEffect]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ background: "#000000", width: "100%", height: "100%" }}
    />
  );
}

export default RetroGrid;

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
