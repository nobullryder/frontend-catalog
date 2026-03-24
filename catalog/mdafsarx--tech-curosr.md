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
tech-curosr.tsx
"use client";
import React, { useEffect, useRef } from "react";

interface TechImage {
  name: string;
  src: string;
  image: HTMLImageElement;
}

interface Particle {
  x: number;
  y: number;
  alpha: number;
  image: HTMLImageElement;
  size: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const icons: { name: string; src: string }[] = [
  // replace with your image path
  {
    name: "JavaScript",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012752/js_nocitj.png",
  },
  {
    name: "TypeScript",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012632/ts_elsqw8.png",
  },
  {
    name: "React",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012941/react_ogt6ny.svg",
  },
  {
    name: "Next.js",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012973/next_hrodnb.svg",
  },
  {
    name: "HTML",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012812/html_xbcdkj.png",
  },
  {
    name: "CSS",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012862/css_1_irojyc.png",
  },
];

const TechCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const techImagesRef = useRef<TechImage[]>([]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      techImagesRef.current = await Promise.all(
        icons.map(({ name, src }) => {
          return new Promise<TechImage>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve({ name, src, image: img });
          });
        }),
      );
    };

    loadImages().then(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = particlesRef.current;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.update();
          p.draw(ctx);
          if (p.alpha <= 0) {
            particles.splice(i, 1);
          }
        }
        requestAnimationFrame(animate);
      };

      animate();

      const onMove = (e: MouseEvent) => {
        const randomIcon =
          techImagesRef.current[
            Math.floor(Math.random() * techImagesRef.current.length)
          ];

        const size = 22 + Math.random() * 8;

        const particle: Particle = {
          x: e.clientX,
          y: e.clientY,
          alpha: 1,
          image: randomIcon.image,
          size,
          update() {
            this.y -= 0.4;
            this.alpha -= 0.02;
          },
          draw(ctx: CanvasRenderingContext2D) {
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(
              this.image,
              this.x - this.size / 2,
              this.y - this.size / 2,
              this.size,
              this.size,
            );
            ctx.globalAlpha = 1;
          },
        };

        particles.push(particle);
      };

      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
      };
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default TechCursor;


code.demo.1759971693345.tsx
import React from "react";
import TechCursor from "@/components/ui/tech-curosr";

const TechCursorDemo = () => {
  return (
    <>
      <p className="text-3xl text-center pt-4 text-[#3ca2fa] font-bold">
        Move cursor to see the effect.
      </p>
      <TechCursor />
    </>
  );
};

export default TechCursorDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tech-curosr.tsx
"use client";
import React, { useEffect, useRef } from "react";

interface TechImage {
  name: string;
  src: string;
  image: HTMLImageElement;
}

interface Particle {
  x: number;
  y: number;
  alpha: number;
  image: HTMLImageElement;
  size: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const icons: { name: string; src: string }[] = [
  // replace with your image path
  {
    name: "JavaScript",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012752/js_nocitj.png",
  },
  {
    name: "TypeScript",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012632/ts_elsqw8.png",
  },
  {
    name: "React",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012941/react_ogt6ny.svg",
  },
  {
    name: "Next.js",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012973/next_hrodnb.svg",
  },
  {
    name: "HTML",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012812/html_xbcdkj.png",
  },
  {
    name: "CSS",
    src: "https://res.cloudinary.com/dz1fy2tof/image/upload/v1755012862/css_1_irojyc.png",
  },
];

const TechCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const techImagesRef = useRef<TechImage[]>([]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      techImagesRef.current = await Promise.all(
        icons.map(({ name, src }) => {
          return new Promise<TechImage>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve({ name, src, image: img });
          });
        }),
      );
    };

    loadImages().then(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = particlesRef.current;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.update();
          p.draw(ctx);
          if (p.alpha <= 0) {
            particles.splice(i, 1);
          }
        }
        requestAnimationFrame(animate);
      };

      animate();

      const onMove = (e: MouseEvent) => {
        const randomIcon =
          techImagesRef.current[
            Math.floor(Math.random() * techImagesRef.current.length)
          ];

        const size = 22 + Math.random() * 8;

        const particle: Particle = {
          x: e.clientX,
          y: e.clientY,
          alpha: 1,
          image: randomIcon.image,
          size,
          update() {
            this.y -= 0.4;
            this.alpha -= 0.02;
          },
          draw(ctx: CanvasRenderingContext2D) {
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(
              this.image,
              this.x - this.size / 2,
              this.y - this.size / 2,
              this.size,
              this.size,
            );
            ctx.globalAlpha = 1;
          },
        };

        particles.push(particle);
      };

      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
      };
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default TechCursor;

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
