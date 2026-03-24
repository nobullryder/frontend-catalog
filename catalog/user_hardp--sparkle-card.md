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
sparkle-card.tsx
import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type SparkleCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Number of sparkles */
  sparkles?: number;
  /** Duration of one sparkle cycle */
  duration?: number;
};

type Sparkle = { id: number; x: number; y: number };

function getRandomSparkle(id: number): Sparkle {
  return {
    id,
    x: Math.random() * 100, // %
    y: Math.random() * 100,
  };
}

export  function SparkleCard({
  children,
  className,
  sparkles = 15,
  duration = 3,
}: SparkleCardProps) {
  const [dots, setDots] = useState<Sparkle[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: sparkles }, (_, i) => getRandomSparkle(i)));
  }, [sparkles]);

  const respawnSparkle = (id: number) => {
    setDots((prev) =>
      prev.map((dot) => (dot.id === id ? getRandomSparkle(id) : dot))
    );
  };

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-border p-6 bg-background shadow-md",
        className
      )}
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot) => (
          <motion.span
            key={dot.id + "-" + dot.x + "-" + dot.y} // key changes to reset animation
            className="absolute"
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration,
              repeat: 0, // play once
              delay: Math.random() * duration, // stagger
            }}
            onAnimationComplete={() => respawnSparkle(dot.id)}
          >
            {/* Tailwind handles theme: white in dark, black in light */}
            <span className="block w-0.5 h-0.5 rounded-full bg-black dark:bg-white" />
          </motion.span>
        ))}
      </div>

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}


code.demo.1756881531606.tsx
// demo.tsx
import { SparkleCard } from "@/components/ui/sparkle-card"

export default function DemoOne() {
  return (
    <SparkleCard>
      <div className="text-center text-foreground">
        ✨ Hello, I am a Sparkle Card!
      </div>
    </SparkleCard>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sparkle-card.tsx
import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type SparkleCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Number of sparkles */
  sparkles?: number;
  /** Duration of one sparkle cycle */
  duration?: number;
};

type Sparkle = { id: number; x: number; y: number };

function getRandomSparkle(id: number): Sparkle {
  return {
    id,
    x: Math.random() * 100, // %
    y: Math.random() * 100,
  };
}

export  function SparkleCard({
  children,
  className,
  sparkles = 15,
  duration = 3,
}: SparkleCardProps) {
  const [dots, setDots] = useState<Sparkle[]>([]);

  useEffect(() => {
    setDots(Array.from({ length: sparkles }, (_, i) => getRandomSparkle(i)));
  }, [sparkles]);

  const respawnSparkle = (id: number) => {
    setDots((prev) =>
      prev.map((dot) => (dot.id === id ? getRandomSparkle(id) : dot))
    );
  };

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-border p-6 bg-background shadow-md",
        className
      )}
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot) => (
          <motion.span
            key={dot.id + "-" + dot.x + "-" + dot.y} // key changes to reset animation
            className="absolute"
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration,
              repeat: 0, // play once
              delay: Math.random() * duration, // stagger
            }}
            onAnimationComplete={() => respawnSparkle(dot.id)}
          >
            {/* Tailwind handles theme: white in dark, black in light */}
            <span className="block w-0.5 h-0.5 rounded-full bg-black dark:bg-white" />
          </motion.span>
        ))}
      </div>

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
clsx, motion
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
