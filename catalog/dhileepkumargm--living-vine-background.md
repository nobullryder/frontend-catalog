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
living-vine-background.tsx
import React, { useRef, useEffect } from "react";

const LivingVineBackground = ({
  children,
  vineColor = "rgba(45, 255, 190, 0.8)",
  branchColor = "rgba(45, 255, 190, 0.6)",
  maxBranchLength = 50,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pathHistoryRef = useRef([]);
  const branchesRef = useRef([]);

  useEffect(() => {
    let destroyed = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class Branch {
      constructor(x, y) {
        this.points = [{ x, y }];
        this.life = 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1.5 + 0.5;
        this.length = 0;
      }
      update() {
        if (this.length >= maxBranchLength) {
          this.life -= 0.02;
          return;
        }
        this.angle += (Math.random() - 0.5) * 0.2;
        const last = this.points[this.points.length - 1];
        const newX = last.x + Math.cos(this.angle) * this.speed;
        const newY = last.y + Math.sin(this.angle) * this.speed;
        this.points.push({ x: newX, y: newY });
        this.length++;
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.strokeStyle = `rgba(45, 255, 190, ${this.life * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      pathHistoryRef.current.push({ ...mousePosRef.current });
      if (pathHistoryRef.current.length > 100) pathHistoryRef.current.shift();
      if (Math.random() > 0.95) {
        branchesRef.current.push(new Branch(e.clientX, e.clientY));
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      if (destroyed) return;
      ctx.fillStyle = "rgba(0, 5, 10, 0.1)";
      ctx.fillRect(0, 0, width, height);

      if (pathHistoryRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pathHistoryRef.current[0].x, pathHistoryRef.current[0].y);
        for (let i = 1; i < pathHistoryRef.current.length; i++) {
          ctx.lineTo(pathHistoryRef.current[i].x, pathHistoryRef.current[i].y);
        }
        ctx.strokeStyle = vineColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      branchesRef.current = branchesRef.current.filter((b) => b.life > 0);
      for (const branch of branchesRef.current) {
        branch.update();
        branch.draw();
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      destroyed = true;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [vineColor, branchColor, maxBranchLength]);

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden bg-black ${className}`}
      style={{ backgroundColor: "#00050a" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full z-0" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default LivingVineBackground;


code.demo.1758791000924.tsx
import React from "react";
import LivingVineBackground from "@/components/ui/living-vine-background";

export default function DemoOne() {
  const glow = "0 0 5px #2dffbe, 0 0 10px #2dffbe";
  return (
    <main>
      <LivingVineBackground>
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center select-none text-center">
          <div className="p-8 sm:p-12">
            <h1
              className="m-0 font-sans font-bold uppercase tracking-widest text-5xl sm:text-7xl text-emerald-200"
              style={{ textShadow: glow }}
            >
              Genesis
            </h1>
            <h2 className="m-0 mt-2 font-sans uppercase tracking-[.2em] text-lg sm:text-2xl text-emerald-200/70">
              Digital Growth
            </h2>
          </div>
          <p className="absolute bottom-10 text-emerald-200/40 text-sm px-4 font-mono">
            The cursor's path gives rise to new forms.
          </p>
        </div>
      </LivingVineBackground>
    </main>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/living-vine-background.tsx
import React, { useRef, useEffect } from "react";

const LivingVineBackground = ({
  children,
  vineColor = "rgba(45, 255, 190, 0.8)",
  branchColor = "rgba(45, 255, 190, 0.6)",
  maxBranchLength = 50,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pathHistoryRef = useRef([]);
  const branchesRef = useRef([]);

  useEffect(() => {
    let destroyed = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class Branch {
      constructor(x, y) {
        this.points = [{ x, y }];
        this.life = 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1.5 + 0.5;
        this.length = 0;
      }
      update() {
        if (this.length >= maxBranchLength) {
          this.life -= 0.02;
          return;
        }
        this.angle += (Math.random() - 0.5) * 0.2;
        const last = this.points[this.points.length - 1];
        const newX = last.x + Math.cos(this.angle) * this.speed;
        const newY = last.y + Math.sin(this.angle) * this.speed;
        this.points.push({ x: newX, y: newY });
        this.length++;
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.strokeStyle = `rgba(45, 255, 190, ${this.life * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      pathHistoryRef.current.push({ ...mousePosRef.current });
      if (pathHistoryRef.current.length > 100) pathHistoryRef.current.shift();
      if (Math.random() > 0.95) {
        branchesRef.current.push(new Branch(e.clientX, e.clientY));
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      if (destroyed) return;
      ctx.fillStyle = "rgba(0, 5, 10, 0.1)";
      ctx.fillRect(0, 0, width, height);

      if (pathHistoryRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pathHistoryRef.current[0].x, pathHistoryRef.current[0].y);
        for (let i = 1; i < pathHistoryRef.current.length; i++) {
          ctx.lineTo(pathHistoryRef.current[i].x, pathHistoryRef.current[i].y);
        }
        ctx.strokeStyle = vineColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      branchesRef.current = branchesRef.current.filter((b) => b.life > 0);
      for (const branch of branchesRef.current) {
        branch.update();
        branch.draw();
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      destroyed = true;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [vineColor, branchColor, maxBranchLength]);

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden bg-black ${className}`}
      style={{ backgroundColor: "#00050a" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full z-0" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default LivingVineBackground;

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
