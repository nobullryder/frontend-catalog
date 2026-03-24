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
layer-parallax-hero.tsx
// Layered parallax hero with depth and 3D transforms
// Multiple layers that respond to mouse movement

"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

export const LayeredParallaxHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Layer 1 - Furthest back */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateX(${mousePos.x * -30}px) translateY(${mousePos.y * -30}px) translateZ(-100px)`,
          transition: "transform 0.3s ease-out"
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-border" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-border" />
      </div>

      {/* Layer 2 - Middle */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateX(${mousePos.x * -20}px) translateY(${mousePos.y * -20}px) translateZ(-50px)`,
          transition: "transform 0.2s ease-out"
        }}
      >
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-primary/20 rounded-lg rotate-12 blur-xl" />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-primary/30 rounded-lg -rotate-12 blur-xl" />
      </div>

      {/* Layer 3 - Closest */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateX(${mousePos.x * -10}px) translateY(${mousePos.y * -10}px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-primary/60" />
        <div className="absolute bottom-32 right-32 w-3 h-3 rounded-full bg-primary/40" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-primary/50" />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{
          transform: `translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px) translateZ(50px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">Depth & Motion</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-none">
              Multi-
              <span className="block bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Dimensional
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Experience interfaces that respond to your every move
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-6">
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold overflow-hidden hover:shadow-2xl hover:shadow-primary/50 transition-shadow">
              <span className="relative z-10">Enter Experience</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button className="px-8 py-4 border border-border bg-card/50 backdrop-blur-sm text-card-foreground rounded-lg font-semibold hover:bg-accent transition-colors">
              Learn More
            </button>
          </div>

          {/* Floating cards */}
          <div className="grid grid-cols-3 gap-4 pt-16 max-w-4xl mx-auto">
            {[
              { title: "Intuitive", desc: "Natural interactions" },
              { title: "Responsive", desc: "Instant feedback" },
              { title: "Immersive", desc: "Full engagement" }
            ].map((item, i) => (
              <div 
                key={i}
                className="p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors"
                style={{
                  transform: `translateZ(${20 + i * 10}px)`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="text-lg font-semibold text-foreground">{item.title}</div>
                <div className="text-sm text-muted-foreground mt-2">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


code.demo.1759612080133.tsx
import { LayeredParallaxHero } from "@/components/ui/layer-parallax-hero";

export default function DemoOne() {
  return <LayeredParallaxHero />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/layer-parallax-hero.tsx
// Layered parallax hero with depth and 3D transforms
// Multiple layers that respond to mouse movement

"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

export const LayeredParallaxHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Layer 1 - Furthest back */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateX(${mousePos.x * -30}px) translateY(${mousePos.y * -30}px) translateZ(-100px)`,
          transition: "transform 0.3s ease-out"
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-border" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-border" />
      </div>

      {/* Layer 2 - Middle */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateX(${mousePos.x * -20}px) translateY(${mousePos.y * -20}px) translateZ(-50px)`,
          transition: "transform 0.2s ease-out"
        }}
      >
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-primary/20 rounded-lg rotate-12 blur-xl" />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-primary/30 rounded-lg -rotate-12 blur-xl" />
      </div>

      {/* Layer 3 - Closest */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateX(${mousePos.x * -10}px) translateY(${mousePos.y * -10}px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-primary/60" />
        <div className="absolute bottom-32 right-32 w-3 h-3 rounded-full bg-primary/40" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-primary/50" />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{
          transform: `translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px) translateZ(50px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">Depth & Motion</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-none">
              Multi-
              <span className="block bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Dimensional
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Experience interfaces that respond to your every move
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-6">
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold overflow-hidden hover:shadow-2xl hover:shadow-primary/50 transition-shadow">
              <span className="relative z-10">Enter Experience</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button className="px-8 py-4 border border-border bg-card/50 backdrop-blur-sm text-card-foreground rounded-lg font-semibold hover:bg-accent transition-colors">
              Learn More
            </button>
          </div>

          {/* Floating cards */}
          <div className="grid grid-cols-3 gap-4 pt-16 max-w-4xl mx-auto">
            {[
              { title: "Intuitive", desc: "Natural interactions" },
              { title: "Responsive", desc: "Instant feedback" },
              { title: "Immersive", desc: "Full engagement" }
            ].map((item, i) => (
              <div 
                key={i}
                className="p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors"
                style={{
                  transform: `translateZ(${20 + i * 10}px)`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="text-lg font-semibold text-foreground">{item.title}</div>
                <div className="text-sm text-muted-foreground mt-2">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
