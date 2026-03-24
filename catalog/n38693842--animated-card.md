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
animated-card.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- IMAGE TRAIL CURSOR COMPONENT ---
const ImageTrailCursor: React.FC<{ images: string[] }> = ({ images }) => {
  const [trail, setTrail] = useState<
    { x: number; y: number; src: string; id: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const src = images[Math.floor(Math.random() * images.length)];

      setTrail((prev) => [
        ...prev.slice(-10),
        { x, y, src, id: Date.now() + Math.random() },
      ]);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, [images]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {trail.map((t) => (
        <motion.img
          key={t.id}
          src={t.src}
          alt=""
          initial={{ opacity: 0, scale: 0.6, x: t.x, y: t.y }}
          animate={{
            opacity: [1, 0.6, 0],
            scale: [1, 0.9, 0.7],
            x: t.x,
            y: t.y,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-xl pointer-events-none shadow-lg border border-black/10 dark:border-white/10"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      ))}
    </div>
  );
};

// --- MAIN DEMO COMPONENT ---
export const ImageTrailDemo: React.FC = () => {
  const images = [
    "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/16245254/pexels-photo-16245254.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2333293/pexels-photo-2333293.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/604684/pexels-photo-604684.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="flex flex-col gap-6 w-3/4 max-w-5xl mx-auto min-h-[28rem] p-4 sm:p-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hover Area */}
      <div className="
        relative w-full 
        border border-black/10 dark:border-white/20 
        rounded-2xl p-2 sm:p-4 
        flex items-center justify-center 
        h-80 sm:h-96 
        bg-white dark:bg-black 
        shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] 
        dark:shadow-[inset_0_4px_10px_rgba(255,255,255,0.1)] 
        overflow-hidden 
        transition-all duration-300
      ">
        <span className="
          absolute inset-0 flex items-center justify-center 
          text-2xl sm:text-3xl md:text-4xl font-semibold 
          text-black/30 dark:text-white/30 
          select-none pointer-events-none
        ">
          Hover Here
        </span>
        <ImageTrailCursor images={images} />
      </div>
    </div>
  );
};

// --- WRAPPER COMPONENT (LIGHT & DARK MODE) ---
export function Component() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center transition-colors duration-500">
      <ImageTrailDemo />
    </div>
  );
}


code.demo.1760641977489.tsx
import { Component } from "@/components/ui/animated-card";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-card.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- IMAGE TRAIL CURSOR COMPONENT ---
const ImageTrailCursor: React.FC<{ images: string[] }> = ({ images }) => {
  const [trail, setTrail] = useState<
    { x: number; y: number; src: string; id: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const src = images[Math.floor(Math.random() * images.length)];

      setTrail((prev) => [
        ...prev.slice(-10),
        { x, y, src, id: Date.now() + Math.random() },
      ]);
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, [images]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {trail.map((t) => (
        <motion.img
          key={t.id}
          src={t.src}
          alt=""
          initial={{ opacity: 0, scale: 0.6, x: t.x, y: t.y }}
          animate={{
            opacity: [1, 0.6, 0],
            scale: [1, 0.9, 0.7],
            x: t.x,
            y: t.y,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-xl pointer-events-none shadow-lg border border-black/10 dark:border-white/10"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      ))}
    </div>
  );
};

// --- MAIN DEMO COMPONENT ---
export const ImageTrailDemo: React.FC = () => {
  const images = [
    "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/16245254/pexels-photo-16245254.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2333293/pexels-photo-2333293.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/604684/pexels-photo-604684.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="flex flex-col gap-6 w-3/4 max-w-5xl mx-auto min-h-[28rem] p-4 sm:p-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hover Area */}
      <div className="
        relative w-full 
        border border-black/10 dark:border-white/20 
        rounded-2xl p-2 sm:p-4 
        flex items-center justify-center 
        h-80 sm:h-96 
        bg-white dark:bg-black 
        shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] 
        dark:shadow-[inset_0_4px_10px_rgba(255,255,255,0.1)] 
        overflow-hidden 
        transition-all duration-300
      ">
        <span className="
          absolute inset-0 flex items-center justify-center 
          text-2xl sm:text-3xl md:text-4xl font-semibold 
          text-black/30 dark:text-white/30 
          select-none pointer-events-none
        ">
          Hover Here
        </span>
        <ImageTrailCursor images={images} />
      </div>
    </div>
  );
};

// --- WRAPPER COMPONENT (LIGHT & DARK MODE) ---
export function Component() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center transition-colors duration-500">
      <ImageTrailDemo />
    </div>
  );
}

```

Install NPM dependencies:
```bash
framer-motion
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
