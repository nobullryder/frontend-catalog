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
rising-glow.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type RisingGlowProps = {
  width?: number | string;
  height?: number | string;
  particleCount?: number;
  particleColor?: string;
  className?: string;
};

export const RisingGlow: React.FC<RisingGlowProps> = ({
  width = "100%",
  height = 120,
  particleCount = 20,
  particleColor = "#00f7ff",
  className,
}) => {
  const [particles, setParticles] = useState<
    { left: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: particleCount }, () => ({
      left: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(arr);
  }, [particleCount]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: particleColor,
          }}
          animate={{ y: [-10, -height, -10], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};


code.demo.1760106053880.tsx
"use client";

import React from "react";
import { RisingGlow } from "@/components/ui/rising-glow";

export default function RisingGlowDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl md:text-8xl font-bold relative z-10">
        Lumina
      </h1>
      {/* Rising Glow animation below text */}
      <div className="w-full max-w-4xl">
        <RisingGlow
          particleCount={80}
          particleColor="#7CF734"
          height={100}
          width="100%"
        />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/rising-glow.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type RisingGlowProps = {
  width?: number | string;
  height?: number | string;
  particleCount?: number;
  particleColor?: string;
  className?: string;
};

export const RisingGlow: React.FC<RisingGlowProps> = ({
  width = "100%",
  height = 120,
  particleCount = 20,
  particleColor = "#00f7ff",
  className,
}) => {
  const [particles, setParticles] = useState<
    { left: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: particleCount }, () => ({
      left: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(arr);
  }, [particleCount]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: particleColor,
          }}
          animate={{ y: [-10, -height, -10], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

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
