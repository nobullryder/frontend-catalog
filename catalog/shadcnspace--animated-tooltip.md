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
animated-tooltip.tsx
"use client";

import { motion, useTransform, useMotionValue, useSpring } from "motion/react";

type Item = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

const TooltipItem = ({ item }: { item: Item }) => {
  const x = useMotionValue(0);

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), {
    stiffness: 100,
    damping: 15,
  });

  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), {
    stiffness: 100,
    damping: 15,
  });

  return (
    <div className="group relative">
      <motion.div
        style={{ translateX, rotate }}
        className="pointer-events-none absolute -top-16 left-1/2 hidden -translate-x-1/2 flex-col items-center rounded-md bg-blue-500 px-4 py-2 text-xs shadow-xl group-hover:flex"
      >
        <p className="whitespace-nowrap text-sm font-medium text-white">
          {item.name}
        </p>
        <p className="whitespace-nowrap text-xs text-white/50">
          {item.designation}
        </p>
      </motion.div>

      <img
        onMouseMove={(e) =>
          x.set(e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2)
        }
        src={item.image}
        alt={item.name}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full object-cover object-top transition duration-500 group-hover:z-30 group-hover:scale-105"
      />
    </div>
  );
};

const AnimatedTooltipMotion = () => {
  const items: Item[] = [
    {
      id: 1,
      name: "Aarav Mehta",
      designation: "AI Researcher",
      image: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
    },
    {
      id: 2,
      name: "Sofia Martinez",
      designation: "Cloud Architect",
      image: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
    },
    {
      id: 3,
      name: "Kenji Tanaka",
      designation: "Cybersecurity Analyst",
      image: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
    },
    {
      id: 4,
      name: "Amelia Rossi",
      designation: "UX Strategist",
      image: "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
    },
  ];

  return (
    <div className="flex items-center justify-center -space-x-2">
      {items.map((item) => (
        <TooltipItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AnimatedTooltipMotion;


code.demo.1772709544968.tsx
import AnimatedTooltipMotion from "@/components/ui/animated-tooltip";

export default function DemoOne() {
  return <AnimatedTooltipMotion />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-tooltip.tsx
"use client";

import { motion, useTransform, useMotionValue, useSpring } from "motion/react";

type Item = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

const TooltipItem = ({ item }: { item: Item }) => {
  const x = useMotionValue(0);

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), {
    stiffness: 100,
    damping: 15,
  });

  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), {
    stiffness: 100,
    damping: 15,
  });

  return (
    <div className="group relative">
      <motion.div
        style={{ translateX, rotate }}
        className="pointer-events-none absolute -top-16 left-1/2 hidden -translate-x-1/2 flex-col items-center rounded-md bg-blue-500 px-4 py-2 text-xs shadow-xl group-hover:flex"
      >
        <p className="whitespace-nowrap text-sm font-medium text-white">
          {item.name}
        </p>
        <p className="whitespace-nowrap text-xs text-white/50">
          {item.designation}
        </p>
      </motion.div>

      <img
        onMouseMove={(e) =>
          x.set(e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2)
        }
        src={item.image}
        alt={item.name}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full object-cover object-top transition duration-500 group-hover:z-30 group-hover:scale-105"
      />
    </div>
  );
};

const AnimatedTooltipMotion = () => {
  const items: Item[] = [
    {
      id: 1,
      name: "Aarav Mehta",
      designation: "AI Researcher",
      image: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
    },
    {
      id: 2,
      name: "Sofia Martinez",
      designation: "Cloud Architect",
      image: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
    },
    {
      id: 3,
      name: "Kenji Tanaka",
      designation: "Cybersecurity Analyst",
      image: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
    },
    {
      id: 4,
      name: "Amelia Rossi",
      designation: "UX Strategist",
      image: "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
    },
  ];

  return (
    <div className="flex items-center justify-center -space-x-2">
      {items.map((item) => (
        <TooltipItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AnimatedTooltipMotion;

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
