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
hover-text-glow.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";

export const Component = ({
  text = "Hover Me",
  duration = 0.25,
}: {
  text?: string;
  duration?: number;
}) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [hover, setHover] = React.useState(false);
  const [mask, setMask] = React.useState({ cx: "50%", cy: "50%" });

  // Track cursor position relative to SVG
  React.useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((coords.x - rect.left) / rect.width) * 100;
    const cy = ((coords.y - rect.top) / rect.height) * 100;
    setMask({ cx: `${cx}%`, cy: `${cy}%` });
  }, [coords]);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden p-6">
      <svg
        ref={svgRef}
        className="select-none"
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
      >
        <defs>
          {/* gradient for stroke reveal */}
          <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
            {hover ? (
              <>
                <stop offset="0%" stopColor="hsl(250, 90%, 65%)" />
                <stop offset="25%" stopColor="hsl(260, 85%, 70%)" />
                <stop offset="50%" stopColor="hsl(280, 85%, 70%)" />
                <stop offset="75%" stopColor="hsl(310, 80%, 70%)" />
                <stop offset="100%" stopColor="hsl(340, 85%, 70%)" />
              </>
            ) : (
              <stop offset="0%" stopColor="hsl(var(--foreground))" />
            )}
          </linearGradient>

          {/* mask gradient that moves with cursor */}
          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            animate={mask}
            transition={{ duration, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="textMask">
            <rect width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        {/* base text outline */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.4"
          className="font-bold font-[helvetica] fill-transparent text-[4rem] stroke-neutral-800 dark:stroke-neutral-300"
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          {text}
        </motion.text>

        {/* hover reveal gradient text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="0.4"
          mask="url(#textMask)"
          className="font-bold font-[helvetica] fill-transparent text-[4rem]"
          style={{ opacity: hover ? 1 : 0.5, transition: "opacity 0.3s ease" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};


code.demo.1759612918454.tsx
import { Component } from "@/components/ui/hover-text-glow";

export default function DemoTextHoverEffect() {
  return (
    <div className="flex h-[300px] w-full items-center justify-center bg-background">
      <Component text="Hover Me" duration={0.3} />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-text-glow.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";

export const Component = ({
  text = "Hover Me",
  duration = 0.25,
}: {
  text?: string;
  duration?: number;
}) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [hover, setHover] = React.useState(false);
  const [mask, setMask] = React.useState({ cx: "50%", cy: "50%" });

  // Track cursor position relative to SVG
  React.useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((coords.x - rect.left) / rect.width) * 100;
    const cy = ((coords.y - rect.top) / rect.height) * 100;
    setMask({ cx: `${cx}%`, cy: `${cy}%` });
  }, [coords]);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden p-6">
      <svg
        ref={svgRef}
        className="select-none"
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
      >
        <defs>
          {/* gradient for stroke reveal */}
          <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
            {hover ? (
              <>
                <stop offset="0%" stopColor="hsl(250, 90%, 65%)" />
                <stop offset="25%" stopColor="hsl(260, 85%, 70%)" />
                <stop offset="50%" stopColor="hsl(280, 85%, 70%)" />
                <stop offset="75%" stopColor="hsl(310, 80%, 70%)" />
                <stop offset="100%" stopColor="hsl(340, 85%, 70%)" />
              </>
            ) : (
              <stop offset="0%" stopColor="hsl(var(--foreground))" />
            )}
          </linearGradient>

          {/* mask gradient that moves with cursor */}
          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            animate={mask}
            transition={{ duration, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="textMask">
            <rect width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        {/* base text outline */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.4"
          className="font-bold font-[helvetica] fill-transparent text-[4rem] stroke-neutral-800 dark:stroke-neutral-300"
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          {text}
        </motion.text>

        {/* hover reveal gradient text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="0.4"
          mask="url(#textMask)"
          className="font-bold font-[helvetica] fill-transparent text-[4rem]"
          style={{ opacity: hover ? 1 : 0.5, transition: "opacity 0.3s ease" }}
        >
          {text}
        </text>
      </svg>
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
