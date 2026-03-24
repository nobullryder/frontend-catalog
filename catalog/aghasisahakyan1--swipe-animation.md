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
swipe-animation.tsx
"use client";

import { motion, useMotionValue, useTransform } from "motion/react";

export const DraggableGradientIcon = () => {
  const dragX = useMotionValue(0);

  const xStops = [-100, 0, 100];

  const backgroundGradient = useTransform(dragX, xStops, [
    "linear-gradient(180deg, #ff008c 0%, #d309e1 100%)",
    "linear-gradient(180deg, #7700ff 0%, #4400ff 100%)",
    "linear-gradient(180deg, #e6ff00 0%, #03d100 100%)",
  ]);

  const strokeColor = useTransform(dragX, xStops, [
    "#d309e1",
    "#4400ff",
    "#03d100",
  ]);

  const tickProgress = useTransform(dragX, [10, 100], [0, 1]);
  const crossProgressA = useTransform(dragX, [-10, -55], [0, 1]);
  const crossProgressB = useTransform(dragX, [-50, -100], [0, 1]);

  return (
    <div className="flex justify-center items-center p-4">
      <motion.div
        style={{ ...containerStyles, background: backgroundGradient }}
      >
        <motion.div
          className="icon-wrapper"
          style={{ ...boxStyles, x: dragX }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
        >
          <svg viewBox="0 0 50 50" className="progress-svg">
            {/* Circle */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M 0,20 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0"
              style={{ x: 5, y: 5 }}
            />
            {/* Tick */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M14,26 L22,33 L35,16"
              strokeDasharray="0 1"
              style={{ pathLength: tickProgress }}
            />
            {/* Cross A */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossProgressA }}
            />
            {/* Cross B */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossProgressB }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ================= Styles ================= */

const boxStyles: React.CSSProperties = {
  width: 140,
  height: 140,
  backgroundColor: "#f5f5f5",
  borderRadius: 20,
  padding: 20,
};

const containerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  width: 500,
  height: 300,
  maxWidth: "100%",
  borderRadius: 20,
};


code.demo.1759614517807.tsx
import { DraggableGradientIcon } from "@/components/ui/swipe-animation";

export default function DemoOne() {
  return <DraggableGradientIcon />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/swipe-animation.tsx
"use client";

import { motion, useMotionValue, useTransform } from "motion/react";

export const DraggableGradientIcon = () => {
  const dragX = useMotionValue(0);

  const xStops = [-100, 0, 100];

  const backgroundGradient = useTransform(dragX, xStops, [
    "linear-gradient(180deg, #ff008c 0%, #d309e1 100%)",
    "linear-gradient(180deg, #7700ff 0%, #4400ff 100%)",
    "linear-gradient(180deg, #e6ff00 0%, #03d100 100%)",
  ]);

  const strokeColor = useTransform(dragX, xStops, [
    "#d309e1",
    "#4400ff",
    "#03d100",
  ]);

  const tickProgress = useTransform(dragX, [10, 100], [0, 1]);
  const crossProgressA = useTransform(dragX, [-10, -55], [0, 1]);
  const crossProgressB = useTransform(dragX, [-50, -100], [0, 1]);

  return (
    <div className="flex justify-center items-center p-4">
      <motion.div
        style={{ ...containerStyles, background: backgroundGradient }}
      >
        <motion.div
          className="icon-wrapper"
          style={{ ...boxStyles, x: dragX }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
        >
          <svg viewBox="0 0 50 50" className="progress-svg">
            {/* Circle */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M 0,20 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0"
              style={{ x: 5, y: 5 }}
            />
            {/* Tick */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M14,26 L22,33 L35,16"
              strokeDasharray="0 1"
              style={{ pathLength: tickProgress }}
            />
            {/* Cross A */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossProgressA }}
            />
            {/* Cross B */}
            <motion.path
              fill="none"
              strokeWidth={2}
              stroke={strokeColor}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossProgressB }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ================= Styles ================= */

const boxStyles: React.CSSProperties = {
  width: 140,
  height: 140,
  backgroundColor: "#f5f5f5",
  borderRadius: 20,
  padding: 20,
};

const containerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  width: 500,
  height: 300,
  maxWidth: "100%",
  borderRadius: 20,
};

```

Install NPM dependencies:
```bash
motion
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
