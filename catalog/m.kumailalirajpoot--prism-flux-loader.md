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
prism-flux-loader.tsx
"use client";

import React, { useState, useEffect } from "react";
import {PlusIcon} from "lucide-react"
interface CubeLoaderProps {
  size?: number; // cube size
  speed?: number; // rotation speed
  textSeize?: number;
}

export const PrismFluxLoader: React.FC<CubeLoaderProps> = ({
  size = 30,
  speed = 5,
  textSize = 50,
}) => {
  const [time, setTime] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // Loader steps
  const statuses = ["Fetching", "Fixing", "Updating", "Placing", "Syncing", "Processing"];

  // Cube rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02 * speed);
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  // Status text timer (changes every 600ms)
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 600);
    return () => clearInterval(statusInterval);
  }, [statuses.length]);

  const half = size / 2;
  const currentStatus = statuses[statusIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[220px]">
      {/* Cube Container */}
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateY(${time * 30}deg) rotateX(${time * 30}deg)`,
        }}
      >
        {/* Cube Faces */}
        {statuses.slice(0, 6).map((text, i) => {
          const faceTransforms = [
            `rotateY(0deg) translateZ(${half}px)`,   // front
            `rotateY(180deg) translateZ(${half}px)`, // back
            `rotateY(90deg) translateZ(${half}px)`,  // right
            `rotateY(-90deg) translateZ(${half}px)`, // left
            `rotateX(90deg) translateZ(${half}px)`,  // top
            `rotateX(-90deg) translateZ(${half}px)`, // bottom
          ];

          const borderHue = i * 60;

          return (
            <div
              key={i}
              className={`absolute flex items-center justify-center text-[${textSize}px] font-semibold text-foreground`}
              style={{
                width: size,
                height: size,
                border: `1px solid var(--foreground)`,
                transform: faceTransforms[i],
                backfaceVisibility: "hidden",
              }}
            >
             <PlusIcon/>
            </div>
          );
        })}
      </div>

      {/* Status Text Below Cube */}
      <div
        className="text-sm font-semibold text-foreground tracking-wide"
      >
        {currentStatus}...
      </div>
    </div>
  );
};


code.demo.1769192771309.tsx
import { PrismFluxLoader } from "@/components/ui/prism-flux-loader";

export default function DemoOne() {
  return <PrismFluxLoader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/prism-flux-loader.tsx
"use client";

import React, { useState, useEffect } from "react";
import {PlusIcon} from "lucide-react"
interface CubeLoaderProps {
  size?: number; // cube size
  speed?: number; // rotation speed
  textSeize?: number;
}

export const PrismFluxLoader: React.FC<CubeLoaderProps> = ({
  size = 30,
  speed = 5,
  textSize = 50,
}) => {
  const [time, setTime] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // Loader steps
  const statuses = ["Fetching", "Fixing", "Updating", "Placing", "Syncing", "Processing"];

  // Cube rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02 * speed);
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  // Status text timer (changes every 600ms)
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 600);
    return () => clearInterval(statusInterval);
  }, [statuses.length]);

  const half = size / 2;
  const currentStatus = statuses[statusIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[220px]">
      {/* Cube Container */}
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateY(${time * 30}deg) rotateX(${time * 30}deg)`,
        }}
      >
        {/* Cube Faces */}
        {statuses.slice(0, 6).map((text, i) => {
          const faceTransforms = [
            `rotateY(0deg) translateZ(${half}px)`,   // front
            `rotateY(180deg) translateZ(${half}px)`, // back
            `rotateY(90deg) translateZ(${half}px)`,  // right
            `rotateY(-90deg) translateZ(${half}px)`, // left
            `rotateX(90deg) translateZ(${half}px)`,  // top
            `rotateX(-90deg) translateZ(${half}px)`, // bottom
          ];

          const borderHue = i * 60;

          return (
            <div
              key={i}
              className={`absolute flex items-center justify-center text-[${textSize}px] font-semibold text-foreground`}
              style={{
                width: size,
                height: size,
                border: `1px solid var(--foreground)`,
                transform: faceTransforms[i],
                backfaceVisibility: "hidden",
              }}
            >
             <PlusIcon/>
            </div>
          );
        })}
      </div>

      {/* Status Text Below Cube */}
      <div
        className="text-sm font-semibold text-foreground tracking-wide"
      >
        {currentStatus}...
      </div>
    </div>
  );
};

```

Install NPM dependencies:
```bash
lucide-react
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
