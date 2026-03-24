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
spotlight-background.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";

const SpotlightBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 150); // idle after 150ms
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Smooth circle spotlight */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mouse.x,
          top: mouse.y,
          width: isMoving ? "220px" : "280px", // shrink when moving, expand when idle
          height: isMoving ? "220px" : "280px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(56,189,248,0.7) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default SpotlightBackground;


code.demo.1758084376925.tsx
import SpotlightBackground from "@/components/ui/spotlight-background";

export default function Demo() {
  return (
      <div className="relative w-full h-screen bg-white dark:bg-slate-950 overflow-hidden">
        <SpotlightBackground />
        <div className="relative z-10 flex items-center justify-center h-full">
          <p className="text-lg text-gray-700 dark:text-slate-300 md:text-xl text-center">
            A smooth glowing light that follows your cursor.
          </p>
        </div>
      </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/spotlight-background.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";

const SpotlightBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 150); // idle after 150ms
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Smooth circle spotlight */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mouse.x,
          top: mouse.y,
          width: isMoving ? "220px" : "280px", // shrink when moving, expand when idle
          height: isMoving ? "220px" : "280px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(56,189,248,0.7) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default SpotlightBackground;

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
