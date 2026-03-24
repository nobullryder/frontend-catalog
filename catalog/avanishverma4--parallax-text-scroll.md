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
parallax-text-scroll.tsx
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

// Wrap function (replacement for @motionone/utils)
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden -tracking-wider leading-[0.8] m-0 whitespace-nowrap flex flex-nowrap mt-[1px]">
      <motion.div 
        style={{ x }}
        className="font-semibold uppercase text-6xl flex whitespace-nowrap flex-nowrap will-change-transform"
      >
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  );
}

export default function ParallaxTextDemo() {
  return (
    <div 
      className="w-full min-h-screen bg-white text-gray-800 font-sans antialiased overflow-auto flex flex-col justify-center mt-[10px]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Parallax sections */}
      <section className="py-2 relative">
        <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
      </section>

      <section className="py-2 relative">
        <ParallaxText baseVelocity={5}>Scroll Velocity</ParallaxText>
      </section>

      <section className="py-2 relative">
        <ParallaxText baseVelocity={-3}>Smooth Animation</ParallaxText>
      </section>

      {/* Additional space for scrolling */}
      <div className="h-screen"></div>
    </div>
  );
}


code.demo.1758711254846.tsx
import Component from "@/components/ui/parallax-text-scroll";

export default function ParallaxTextDemo() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/parallax-text-scroll.tsx
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

// Wrap function (replacement for @motionone/utils)
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden -tracking-wider leading-[0.8] m-0 whitespace-nowrap flex flex-nowrap mt-[1px]">
      <motion.div 
        style={{ x }}
        className="font-semibold uppercase text-6xl flex whitespace-nowrap flex-nowrap will-change-transform"
      >
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  );
}

export default function ParallaxTextDemo() {
  return (
    <div 
      className="w-full min-h-screen bg-white text-gray-800 font-sans antialiased overflow-auto flex flex-col justify-center mt-[10px]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Parallax sections */}
      <section className="py-2 relative">
        <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
      </section>

      <section className="py-2 relative">
        <ParallaxText baseVelocity={5}>Scroll Velocity</ParallaxText>
      </section>

      <section className="py-2 relative">
        <ParallaxText baseVelocity={-3}>Smooth Animation</ParallaxText>
      </section>

      {/* Additional space for scrolling */}
      <div className="h-screen"></div>
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
