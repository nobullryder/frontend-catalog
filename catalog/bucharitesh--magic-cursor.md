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
magic-cursor.tsx
"use client";

import * as React from "react";
import { Sparkle } from "lucide-react";
import { createRoot } from "react-dom/client";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface MouseSparklesProps {
  /**
   * Custom icon component to render instead of the default Sparkle
   * @default Sparkle from lucide-react
   */
  icon?: React.ReactNode;
  /**
   * Duration of the star animation in milliseconds
   * @default 1500
   */
  starAnimationDuration?: number;
  /**
   * Minimum time between star spawns in milliseconds
   * @default 250
   */
  minimumTimeBetweenStars?: number;
  /**
   * Minimum distance between star spawns in pixels
   * @default 75
   */
  minimumDistanceBetweenStars?: number;
  /**
   * Duration of the glow effect in milliseconds
   * @default 75
   */
  glowDuration?: number;
  /**
   * Maximum spacing between glow points in pixels
   * @default 10
   */
  maximumGlowPointSpacing?: number;
  /**
   * Colors for the stars in RGB format
   * @default ["249 146 253", "252 254 255"]
   */
  colors?: string[];
  /**
   * Sizes for the stars
   * @default ["1.4rem", "1rem", "0.6rem"]
   */
  sizes?: string[];
  /**
   * Custom class name
   */
  className?: string;
}

const Component = React.forwardRef<HTMLDivElement, MouseSparklesProps>(
  (
    {
      icon: Icon = <Sparkle className="h-full w-full" />,
      starAnimationDuration = 1500,
      minimumTimeBetweenStars = 250,
      minimumDistanceBetweenStars = 75,
      glowDuration = 75,
      maximumGlowPointSpacing = 10,
      colors = ["249 146 253", "252 254 255"],
      sizes = ["1.4rem", "1rem", "0.6rem"],
      className,
      ...props
    },
    ref,
  ) => {
    const configRef = React.useRef({
      starAnimationDuration,
      minimumTimeBetweenStars,
      minimumDistanceBetweenStars,
      glowDuration,
      maximumGlowPointSpacing,
      colors,
      sizes,
      animations: ["fall-1", "fall-2", "fall-3"],
    });

    const lastRef = React.useRef({
      starTimestamp: new Date().getTime(),
      starPosition: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
    });

    let count = 0;

    const createStar = React.useCallback(
      (position: Point) => {
        const wrapper = document.createElement("div");
        const color = selectRandom(configRef.current.colors);
        const size = selectRandom(configRef.current.sizes);

        wrapper.className = cn("mouse-sparkles-star", className);
        wrapper.style.left = `${position.x}px`;
        wrapper.style.top = `${position.y}px`;
        wrapper.style.fontSize = size;
        wrapper.style.color = `rgb(${color})`;
        wrapper.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
        wrapper.style.animationName = configRef.current.animations[count++ % 3];
        wrapper.style.animationDuration = `${configRef.current.starAnimationDuration}ms`;

        document.body.appendChild(wrapper);

        const root = createRoot(wrapper);
        root.render(Icon);

        setTimeout(() => {
          root.unmount();
          document.body.removeChild(wrapper);
        }, configRef.current.starAnimationDuration);
      },
      [Icon, className],
    );

    const createGlowPoint = React.useCallback(
      (position: Point) => {
        const glow = document.createElement("div");
        glow.className = cn("mouse-sparkles-glow-point", className);
        glow.style.left = `${position.x}px`;
        glow.style.top = `${position.y}px`;

        document.body.appendChild(glow);
        setTimeout(
          () => document.body.removeChild(glow),
          configRef.current.glowDuration,
        );
      },
      [className],
    );

    const createGlow = React.useCallback(
      (last: Point, current: Point) => {
        const distance = calcDistance(last, current);
        const quantity = Math.max(
          Math.floor(distance / configRef.current.maximumGlowPointSpacing),
          1,
        );

        const dx = (current.x - last.x) / quantity;
        const dy = (current.y - last.y) / quantity;

        Array.from({ length: quantity }).forEach((_, index) => {
          const x = last.x + dx * index;
          const y = last.y + dy * index;
          createGlowPoint({ x, y });
        });
      },
      [createGlowPoint],
    );

    const handleOnMove = React.useCallback(
      (e: { clientX: number; clientY: number }) => {
        const mousePosition = { x: e.clientX, y: e.clientY };

        if (
          lastRef.current.mousePosition.x === 0 &&
          lastRef.current.mousePosition.y === 0
        ) {
          lastRef.current.mousePosition = mousePosition;
        }

        const now = new Date().getTime();
        const hasMovedFarEnough =
          calcDistance(lastRef.current.starPosition, mousePosition) >=
          configRef.current.minimumDistanceBetweenStars;
        const hasBeenLongEnough =
          now - lastRef.current.starTimestamp >
          configRef.current.minimumTimeBetweenStars;

        if (hasMovedFarEnough || hasBeenLongEnough) {
          createStar(mousePosition);
          lastRef.current.starTimestamp = now;
          lastRef.current.starPosition = mousePosition;
        }

        createGlow(lastRef.current.mousePosition, mousePosition);
        lastRef.current.mousePosition = mousePosition;
      },
      [createStar, createGlow],
    );

    React.useEffect(() => {
      window.addEventListener("mousemove", handleOnMove);
      window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
      document.body.addEventListener("mouseleave", () => {
        lastRef.current.mousePosition = { x: 0, y: 0 };
      });

      return () => {
        window.removeEventListener("mousemove", handleOnMove);
        window.removeEventListener("touchmove", (e) =>
          handleOnMove(e.touches[0]),
        );
        document.body.removeEventListener("mouseleave", () => {
          lastRef.current.mousePosition = { x: 0, y: 0 };
        });
      };
    }, [handleOnMove]);

    return null;
  },
);

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function selectRandom<T>(items: T[]): T {
  return items[rand(0, items.length - 1)];
}

export function calcDistance(a: Point, b: Point) {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

Component.displayName = "Component";

export { Component };


code.demo.1753479659644.tsx
import { Component } from "@/components/ui/magic-cursor";

export default function DemoOne() {
  return (
    <div
      className="w-screen h-screen bg-white overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgb(119, 46, 195), rgb(58, 18, 153))",
      }}
    >
      <Component />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/magic-cursor.tsx
"use client";

import * as React from "react";
import { Sparkle } from "lucide-react";
import { createRoot } from "react-dom/client";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface MouseSparklesProps {
  /**
   * Custom icon component to render instead of the default Sparkle
   * @default Sparkle from lucide-react
   */
  icon?: React.ReactNode;
  /**
   * Duration of the star animation in milliseconds
   * @default 1500
   */
  starAnimationDuration?: number;
  /**
   * Minimum time between star spawns in milliseconds
   * @default 250
   */
  minimumTimeBetweenStars?: number;
  /**
   * Minimum distance between star spawns in pixels
   * @default 75
   */
  minimumDistanceBetweenStars?: number;
  /**
   * Duration of the glow effect in milliseconds
   * @default 75
   */
  glowDuration?: number;
  /**
   * Maximum spacing between glow points in pixels
   * @default 10
   */
  maximumGlowPointSpacing?: number;
  /**
   * Colors for the stars in RGB format
   * @default ["249 146 253", "252 254 255"]
   */
  colors?: string[];
  /**
   * Sizes for the stars
   * @default ["1.4rem", "1rem", "0.6rem"]
   */
  sizes?: string[];
  /**
   * Custom class name
   */
  className?: string;
}

const Component = React.forwardRef<HTMLDivElement, MouseSparklesProps>(
  (
    {
      icon: Icon = <Sparkle className="h-full w-full" />,
      starAnimationDuration = 1500,
      minimumTimeBetweenStars = 250,
      minimumDistanceBetweenStars = 75,
      glowDuration = 75,
      maximumGlowPointSpacing = 10,
      colors = ["249 146 253", "252 254 255"],
      sizes = ["1.4rem", "1rem", "0.6rem"],
      className,
      ...props
    },
    ref,
  ) => {
    const configRef = React.useRef({
      starAnimationDuration,
      minimumTimeBetweenStars,
      minimumDistanceBetweenStars,
      glowDuration,
      maximumGlowPointSpacing,
      colors,
      sizes,
      animations: ["fall-1", "fall-2", "fall-3"],
    });

    const lastRef = React.useRef({
      starTimestamp: new Date().getTime(),
      starPosition: { x: 0, y: 0 },
      mousePosition: { x: 0, y: 0 },
    });

    let count = 0;

    const createStar = React.useCallback(
      (position: Point) => {
        const wrapper = document.createElement("div");
        const color = selectRandom(configRef.current.colors);
        const size = selectRandom(configRef.current.sizes);

        wrapper.className = cn("mouse-sparkles-star", className);
        wrapper.style.left = `${position.x}px`;
        wrapper.style.top = `${position.y}px`;
        wrapper.style.fontSize = size;
        wrapper.style.color = `rgb(${color})`;
        wrapper.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
        wrapper.style.animationName = configRef.current.animations[count++ % 3];
        wrapper.style.animationDuration = `${configRef.current.starAnimationDuration}ms`;

        document.body.appendChild(wrapper);

        const root = createRoot(wrapper);
        root.render(Icon);

        setTimeout(() => {
          root.unmount();
          document.body.removeChild(wrapper);
        }, configRef.current.starAnimationDuration);
      },
      [Icon, className],
    );

    const createGlowPoint = React.useCallback(
      (position: Point) => {
        const glow = document.createElement("div");
        glow.className = cn("mouse-sparkles-glow-point", className);
        glow.style.left = `${position.x}px`;
        glow.style.top = `${position.y}px`;

        document.body.appendChild(glow);
        setTimeout(
          () => document.body.removeChild(glow),
          configRef.current.glowDuration,
        );
      },
      [className],
    );

    const createGlow = React.useCallback(
      (last: Point, current: Point) => {
        const distance = calcDistance(last, current);
        const quantity = Math.max(
          Math.floor(distance / configRef.current.maximumGlowPointSpacing),
          1,
        );

        const dx = (current.x - last.x) / quantity;
        const dy = (current.y - last.y) / quantity;

        Array.from({ length: quantity }).forEach((_, index) => {
          const x = last.x + dx * index;
          const y = last.y + dy * index;
          createGlowPoint({ x, y });
        });
      },
      [createGlowPoint],
    );

    const handleOnMove = React.useCallback(
      (e: { clientX: number; clientY: number }) => {
        const mousePosition = { x: e.clientX, y: e.clientY };

        if (
          lastRef.current.mousePosition.x === 0 &&
          lastRef.current.mousePosition.y === 0
        ) {
          lastRef.current.mousePosition = mousePosition;
        }

        const now = new Date().getTime();
        const hasMovedFarEnough =
          calcDistance(lastRef.current.starPosition, mousePosition) >=
          configRef.current.minimumDistanceBetweenStars;
        const hasBeenLongEnough =
          now - lastRef.current.starTimestamp >
          configRef.current.minimumTimeBetweenStars;

        if (hasMovedFarEnough || hasBeenLongEnough) {
          createStar(mousePosition);
          lastRef.current.starTimestamp = now;
          lastRef.current.starPosition = mousePosition;
        }

        createGlow(lastRef.current.mousePosition, mousePosition);
        lastRef.current.mousePosition = mousePosition;
      },
      [createStar, createGlow],
    );

    React.useEffect(() => {
      window.addEventListener("mousemove", handleOnMove);
      window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
      document.body.addEventListener("mouseleave", () => {
        lastRef.current.mousePosition = { x: 0, y: 0 };
      });

      return () => {
        window.removeEventListener("mousemove", handleOnMove);
        window.removeEventListener("touchmove", (e) =>
          handleOnMove(e.touches[0]),
        );
        document.body.removeEventListener("mouseleave", () => {
          lastRef.current.mousePosition = { x: 0, y: 0 };
        });
      };
    }, [handleOnMove]);

    return null;
  },
);

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function selectRandom<T>(items: T[]): T {
  return items[rand(0, items.length - 1)];
}

export function calcDistance(a: Point, b: Point) {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

Component.displayName = "Component";

export { Component };

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
