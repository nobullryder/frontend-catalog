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
api-rate-limiting-card.tsx
"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { HiOutlineShieldCheck, HiOutlineShieldExclamation } from "react-icons/hi";
import { LuServerCog } from "react-icons/lu";

// Props for the component, including a list of recent events to display
type ApiEvent = {
  id: string;
  ip: string;
  status: "Allowed" | "Throttled";
};

type ComponentProps = {
  cardTitle?: string;
  cardDescription?: string;
  events?: ApiEvent[];
};

// Main Component
export const Component = ({
  cardTitle = "API Rate Limiting",
  cardDescription = "Protect your services from abuse by monitoring incoming traffic and automatically throttling requests that exceed defined limits.",
  events = [],
}: ComponentProps) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // Stagger the start of each dot's animation
        await controls.start((i) => ({
          opacity: [0, 1, 0],
          x: [-120, 0, 120],
          y: [Math.random() * 80 - 40, 0, Math.random() * 80 - 40],
          transition: {
            duration: 2,
            ease: "easeInOut",
            delay: i * 0.3,
          },
        }));
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before restarting the loop
      }
    };
    sequence();
  }, [controls]);

  const isThrottled = events.some(e => e.status === 'Throttled');

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden",
        "h-[28rem] w-full max-w-[350px] space-y-4",
        "rounded-md border border-neutral-800/50 bg-neutral-950",
      )}
    >
      {/* Animation Canvas */}
      <div className="absolute inset-x-0 top-10 flex h-48 items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Central server icon */}
          <motion.div
            className="z-10 flex size-20 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-lg"
            animate={{
              borderColor: isThrottled ? "rgba(239, 68, 68, 0.5)" : "rgba(52, 211, 153, 0.5)",
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            <LuServerCog className="size-8 text-neutral-400" />
          </motion.div>

          {/* Animated request dots */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              animate={controls}
              className="absolute left-1/2 top-1/2 size-2 rounded-full bg-emerald-500"
            />
          ))}

          {/* Throttling shield effect */}
          <motion.div
             className="absolute flex items-center justify-center"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{
                opacity: isThrottled ? 1 : 0,
                scale: isThrottled ? 1 : 0.8,
                transition: { duration: 0.3, ease: 'easeOut' }
             }}
          >
            <HiOutlineShieldExclamation className="size-32 text-red-500/50" />
          </motion.div>
        </div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 w-full px-4 pb-4">
        <div className="flex items-center gap-2">
            <motion.div
              animate={{ color: isThrottled ? "#ef4444" : "#10b981" }}
              transition={{ duration: 0.5 }}
            >
              {isThrottled ? <HiOutlineShieldExclamation /> : <HiOutlineShieldCheck />}
            </motion.div>
            <motion.p
              className="text-xs font-medium"
              animate={{ color: isThrottled ? "#ef4444" : "#10b981" }}
              transition={{ duration: 0.5 }}
            >
              {isThrottled ? "Throttling Active" : "All Systems Normal"}
            </motion.p>
        </div>
        <div className="mt-3 text-sm font-semibold text-white">{cardTitle}</div>
        <div className="mt-2 text-xs text-neutral-400">{cardDescription}</div>
      </div>
    </div>
  );
};

code.demo.1757032556595.tsx
import { Component } from "@/components/ui/api-rate-limiting-card";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/api-rate-limiting-card.tsx
"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { HiOutlineShieldCheck, HiOutlineShieldExclamation } from "react-icons/hi";
import { LuServerCog } from "react-icons/lu";

// Props for the component, including a list of recent events to display
type ApiEvent = {
  id: string;
  ip: string;
  status: "Allowed" | "Throttled";
};

type ComponentProps = {
  cardTitle?: string;
  cardDescription?: string;
  events?: ApiEvent[];
};

// Main Component
export const Component = ({
  cardTitle = "API Rate Limiting",
  cardDescription = "Protect your services from abuse by monitoring incoming traffic and automatically throttling requests that exceed defined limits.",
  events = [],
}: ComponentProps) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // Stagger the start of each dot's animation
        await controls.start((i) => ({
          opacity: [0, 1, 0],
          x: [-120, 0, 120],
          y: [Math.random() * 80 - 40, 0, Math.random() * 80 - 40],
          transition: {
            duration: 2,
            ease: "easeInOut",
            delay: i * 0.3,
          },
        }));
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before restarting the loop
      }
    };
    sequence();
  }, [controls]);

  const isThrottled = events.some(e => e.status === 'Throttled');

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden",
        "h-[28rem] w-full max-w-[350px] space-y-4",
        "rounded-md border border-neutral-800/50 bg-neutral-950",
      )}
    >
      {/* Animation Canvas */}
      <div className="absolute inset-x-0 top-10 flex h-48 items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Central server icon */}
          <motion.div
            className="z-10 flex size-20 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 shadow-lg"
            animate={{
              borderColor: isThrottled ? "rgba(239, 68, 68, 0.5)" : "rgba(52, 211, 153, 0.5)",
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            <LuServerCog className="size-8 text-neutral-400" />
          </motion.div>

          {/* Animated request dots */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              animate={controls}
              className="absolute left-1/2 top-1/2 size-2 rounded-full bg-emerald-500"
            />
          ))}

          {/* Throttling shield effect */}
          <motion.div
             className="absolute flex items-center justify-center"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{
                opacity: isThrottled ? 1 : 0,
                scale: isThrottled ? 1 : 0.8,
                transition: { duration: 0.3, ease: 'easeOut' }
             }}
          >
            <HiOutlineShieldExclamation className="size-32 text-red-500/50" />
          </motion.div>
        </div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 w-full px-4 pb-4">
        <div className="flex items-center gap-2">
            <motion.div
              animate={{ color: isThrottled ? "#ef4444" : "#10b981" }}
              transition={{ duration: 0.5 }}
            >
              {isThrottled ? <HiOutlineShieldExclamation /> : <HiOutlineShieldCheck />}
            </motion.div>
            <motion.p
              className="text-xs font-medium"
              animate={{ color: isThrottled ? "#ef4444" : "#10b981" }}
              transition={{ duration: 0.5 }}
            >
              {isThrottled ? "Throttling Active" : "All Systems Normal"}
            </motion.p>
        </div>
        <div className="mt-3 text-sm font-semibold text-white">{cardTitle}</div>
        <div className="mt-2 text-xs text-neutral-400">{cardDescription}</div>
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, react-icons
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
