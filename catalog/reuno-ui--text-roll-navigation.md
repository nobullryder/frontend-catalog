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
text-roll-navigation.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";


const cn = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(" ");

const navigationItems = [
  { name: "Home", href: "/", description: "" },
  { name: "Components", href: "/components", description: "" },
  { name: "Pricing", href: "/pricing", description: "" },
  { name: "How to use", href: "/docs/quick-start", description: "" },
  { name: "Account", href: "/user", description: "" },
  { name: "Login", href: "/login", description: "" },
];

const STAGGER = 0.035;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => (
  <motion.span
    initial="initial"
    whileHover="hovered"
    className={cn("relative block overflow-hidden", className)}
    style={{ lineHeight: 0.75 }}
    aria-label={children}
  >
    <div>
      {children.split("").map((l, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - (children.length - 1) / 2)
          : STAGGER * i;
        return (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: "easeInOut", delay }}
          >
            {l}
          </motion.span>
        );
      })}
    </div>

    <div className="absolute inset-0">
      {children.split("").map((l, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - (children.length - 1) / 2)
          : STAGGER * i;
        return (
          <motion.span
            key={`bot-${i}`}
            className="inline-block"
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: "easeInOut", delay }}
          >
            {l}
          </motion.span>
        );
      })}
    </div>
  </motion.span>
);

export const Skiper58: React.FC<{ className?: string }> = ({ className }) => (
  <ul
    className={cn(
      "flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm",
      className
    )}
  >
    {navigationItems.map((item, index) => (
      <li className="relative flex flex-col items-center" key={index}>
        <a
          href={item.href}
          className="group relative block cursor-pointer select-none"
          aria-label={item.name}
        >
          <TextRoll
            center
            className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
          >
            {item.name}
          </TextRoll>
          <div className="mt-1 flex items-center justify-center">
            <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
              {item.description}
            </span>
          </div>
          <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
        </a>
      </li>
    ))}
  </ul>
);


code.demo.1757691549634.tsx
"use client";

import React from "react";
import { Skiper58, TextRoll } from "@/components/ui/text-roll-navigation"; // путь к компоненту

export default function Demo() {
  return (
    <div className="min-h-[60vh] grid place-items-center p-8">
      <div className="mx-auto max-w-3xl w-full">
        {/* Полный список */}
        <Skiper58 />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-roll-navigation.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";


const cn = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(" ");

const navigationItems = [
  { name: "Home", href: "/", description: "" },
  { name: "Components", href: "/components", description: "" },
  { name: "Pricing", href: "/pricing", description: "" },
  { name: "How to use", href: "/docs/quick-start", description: "" },
  { name: "Account", href: "/user", description: "" },
  { name: "Login", href: "/login", description: "" },
];

const STAGGER = 0.035;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => (
  <motion.span
    initial="initial"
    whileHover="hovered"
    className={cn("relative block overflow-hidden", className)}
    style={{ lineHeight: 0.75 }}
    aria-label={children}
  >
    <div>
      {children.split("").map((l, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - (children.length - 1) / 2)
          : STAGGER * i;
        return (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: "easeInOut", delay }}
          >
            {l}
          </motion.span>
        );
      })}
    </div>

    <div className="absolute inset-0">
      {children.split("").map((l, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - (children.length - 1) / 2)
          : STAGGER * i;
        return (
          <motion.span
            key={`bot-${i}`}
            className="inline-block"
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: "easeInOut", delay }}
          >
            {l}
          </motion.span>
        );
      })}
    </div>
  </motion.span>
);

export const Skiper58: React.FC<{ className?: string }> = ({ className }) => (
  <ul
    className={cn(
      "flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm",
      className
    )}
  >
    {navigationItems.map((item, index) => (
      <li className="relative flex flex-col items-center" key={index}>
        <a
          href={item.href}
          className="group relative block cursor-pointer select-none"
          aria-label={item.name}
        >
          <TextRoll
            center
            className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
          >
            {item.name}
          </TextRoll>
          <div className="mt-1 flex items-center justify-center">
            <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
              {item.description}
            </span>
          </div>
          <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
        </a>
      </li>
    ))}
  </ul>
);

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
