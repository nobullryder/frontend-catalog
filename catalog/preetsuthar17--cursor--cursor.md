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
cursor.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from "motion/react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MousePointer2 } from "lucide-react";
 
function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
 

export type MouseTrackerContextType = {
  position: { x: number; y: number };
  active: boolean;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  pointerRef: React.RefObject<HTMLDivElement | null>;
};

const MouseTrackerContext = React.createContext<
  MouseTrackerContextType | undefined
>(undefined);

export const useMouseTracker = (): MouseTrackerContextType => {
  const context = React.useContext(MouseTrackerContext);
  if (!context) {
    throw new Error("useMouseTracker must be used within MouseTrackerProvider");
  }
  return context;
};

export type MouseTrackerProviderProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function MouseTrackerProvider({
  ref,
  children,
  ...rest
}: MouseTrackerProviderProps) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [active, setActive] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const pointerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const container = wrapper.parentElement;
    if (!container) return;

    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }

    const updatePosition = (e: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
      setActive(true);
    };

    const clearPosition = () => setActive(false);

    container.addEventListener("mousemove", updatePosition);
    container.addEventListener("mouseleave", clearPosition);

    return () => {
      container.removeEventListener("mousemove", updatePosition);
      container.removeEventListener("mouseleave", clearPosition);
    };
  }, []);

  return (
    <MouseTrackerContext.Provider
      value={{ position, active, wrapperRef, pointerRef }}
    >
      <div ref={wrapperRef} data-role="tracker-wrapper" {...rest}>
        {children}
      </div>
    </MouseTrackerContext.Provider>
  );
}

export type PointerProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

function Pointer({ ref, className, style, children, ...rest }: PointerProps) {
  const { position, active, wrapperRef, pointerRef } = useMouseTracker();
  React.useImperativeHandle(ref, () => pointerRef.current as HTMLDivElement);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    const container = wrapperRef.current?.parentElement;
    if (container && active) container.style.cursor = "none";

    return () => {
      if (container) container.style.cursor = "default";
    };
  }, [active, wrapperRef]);

  React.useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={pointerRef}
          data-role="custom-pointer"
          className={cx(
            "pointer-events-none z-[9999] absolute transform -translate-x-1/2 -translate-y-1/2",
            className
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type Anchor =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "center";

export type PointerFollowerProps = HTMLMotionProps<"div"> & {
  align?: Anchor;
  gap?: number;
  transition?: SpringOptions;
  children: React.ReactNode;
};

function PointerFollower({
  ref,
  align = "bottom-right",
  gap = 20,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  children,
  className,
  style,
  ...rest
}: PointerFollowerProps) {
  const { position, active, pointerRef } = useMouseTracker();
  const followerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => followerRef.current as HTMLDivElement);

  const getOffset = React.useCallback(() => {
    const box = followerRef.current?.getBoundingClientRect();
    const w = box?.width ?? 0;
    const h = box?.height ?? 0;

    switch (align) {
      case "center":
        return { x: w / 2, y: h / 2 };
      case "top":
        return { x: w / 2, y: h + gap };
      case "top-left":
        return { x: w + gap, y: h + gap };
      case "top-right":
        return { x: -gap, y: h + gap };
      case "bottom":
        return { x: w / 2, y: -gap };
      case "bottom-left":
        return { x: w + gap, y: -gap };
      case "bottom-right":
        return { x: -gap, y: -gap };
      case "left":
        return { x: w + gap, y: h / 2 };
      case "right":
        return { x: -gap, y: h / 2 };
      default:
        return { x: 0, y: 0 };
    }
  }, [align, gap]);

  const offset = getOffset();
  const pointerBox = pointerRef.current?.getBoundingClientRect();
  const pw = pointerBox?.width ?? 20;
  const ph = pointerBox?.height ?? 20;

  const x = position.x - offset.x + pw / 2;
  const y = position.y - offset.y + ph / 2;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={followerRef}
          data-role="pointer-follower"
          className={cx(
            "pointer-events-none z-[9998] absolute transform -translate-x-1/2 -translate-y-1/2 font-medium",
            className
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export {
  MouseTrackerProvider,
  Pointer,
  PointerFollower,
  useMouseTracker,
  type MouseTrackerContextType as CursorContextType,
  type MouseTrackerProviderProps as CursorProviderProps,
  type PointerProps as CursorProps,
  type PointerFollowerProps as CursorFollowProps,
};


code.demo.tsx
import {
  MouseTrackerProvider as CursorProvider,
  Pointer as Cursor,
  PointerFollower as CursorFollow,
} from "@/components/ui/cursor";

 
import Link from "next/link";

import { MousePointer2 } from "lucide-react";
import { Star } from "lucide-react";

const Demo = () => {
  return (
    <div className="max-w-sm rounded-2xl bg-secondary/50 border border-primary/10 shadow-md overflow-hidden relative group">
      <div className="p-6 flex flex-col gap-8">
        <p className="text-4xl font-bold tracking-tight">
          Ready to build something amazing?
        </p>
        <p className="text-primary/70 text-lg max-w-2xl">
          Join thousands of developers who are already using HextaUI to create
          stunning websites with less effort. Start building today!
        </p>
        <div className="flex items-center flex-wrap justify-center gap-4">
          <Link
            href="/docs/get-started"
            className="cursor-none px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 "
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/sponsors/preetsuthar17"
            target="_blank"
            className="cursor-none px-6 bg-linear-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10  hover:fill-yellow-300"
          >
            <Star size={15} fill="yellow" /> Sponsor HextaUI
          </Link>
        </div>
      </div>

      <CursorProvider>
        <Cursor>
          <MousePointer2 className="fill-blue-500 stroke-white/10" size={30} />
        </Cursor>
        <CursorFollow align="bottom-right">
          <div className="bg-blue-500 text-white border border-white/10 text-xs px-3 py-1 rounded-md shadow-md">
            HextaStudio
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  );
};


export { Demo }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/cursor.tsx
"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from "motion/react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MousePointer2 } from "lucide-react";
 
function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
 

export type MouseTrackerContextType = {
  position: { x: number; y: number };
  active: boolean;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  pointerRef: React.RefObject<HTMLDivElement | null>;
};

const MouseTrackerContext = React.createContext<
  MouseTrackerContextType | undefined
>(undefined);

export const useMouseTracker = (): MouseTrackerContextType => {
  const context = React.useContext(MouseTrackerContext);
  if (!context) {
    throw new Error("useMouseTracker must be used within MouseTrackerProvider");
  }
  return context;
};

export type MouseTrackerProviderProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function MouseTrackerProvider({
  ref,
  children,
  ...rest
}: MouseTrackerProviderProps) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [active, setActive] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const pointerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const container = wrapper.parentElement;
    if (!container) return;

    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }

    const updatePosition = (e: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
      setActive(true);
    };

    const clearPosition = () => setActive(false);

    container.addEventListener("mousemove", updatePosition);
    container.addEventListener("mouseleave", clearPosition);

    return () => {
      container.removeEventListener("mousemove", updatePosition);
      container.removeEventListener("mouseleave", clearPosition);
    };
  }, []);

  return (
    <MouseTrackerContext.Provider
      value={{ position, active, wrapperRef, pointerRef }}
    >
      <div ref={wrapperRef} data-role="tracker-wrapper" {...rest}>
        {children}
      </div>
    </MouseTrackerContext.Provider>
  );
}

export type PointerProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

function Pointer({ ref, className, style, children, ...rest }: PointerProps) {
  const { position, active, wrapperRef, pointerRef } = useMouseTracker();
  React.useImperativeHandle(ref, () => pointerRef.current as HTMLDivElement);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    const container = wrapperRef.current?.parentElement;
    if (container && active) container.style.cursor = "none";

    return () => {
      if (container) container.style.cursor = "default";
    };
  }, [active, wrapperRef]);

  React.useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={pointerRef}
          data-role="custom-pointer"
          className={cx(
            "pointer-events-none z-[9999] absolute transform -translate-x-1/2 -translate-y-1/2",
            className
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type Anchor =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "center";

export type PointerFollowerProps = HTMLMotionProps<"div"> & {
  align?: Anchor;
  gap?: number;
  transition?: SpringOptions;
  children: React.ReactNode;
};

function PointerFollower({
  ref,
  align = "bottom-right",
  gap = 20,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  children,
  className,
  style,
  ...rest
}: PointerFollowerProps) {
  const { position, active, pointerRef } = useMouseTracker();
  const followerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => followerRef.current as HTMLDivElement);

  const getOffset = React.useCallback(() => {
    const box = followerRef.current?.getBoundingClientRect();
    const w = box?.width ?? 0;
    const h = box?.height ?? 0;

    switch (align) {
      case "center":
        return { x: w / 2, y: h / 2 };
      case "top":
        return { x: w / 2, y: h + gap };
      case "top-left":
        return { x: w + gap, y: h + gap };
      case "top-right":
        return { x: -gap, y: h + gap };
      case "bottom":
        return { x: w / 2, y: -gap };
      case "bottom-left":
        return { x: w + gap, y: -gap };
      case "bottom-right":
        return { x: -gap, y: -gap };
      case "left":
        return { x: w + gap, y: h / 2 };
      case "right":
        return { x: -gap, y: h / 2 };
      default:
        return { x: 0, y: 0 };
    }
  }, [align, gap]);

  const offset = getOffset();
  const pointerBox = pointerRef.current?.getBoundingClientRect();
  const pw = pointerBox?.width ?? 20;
  const ph = pointerBox?.height ?? 20;

  const x = position.x - offset.x + pw / 2;
  const y = position.y - offset.y + ph / 2;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={followerRef}
          data-role="pointer-follower"
          className={cx(
            "pointer-events-none z-[9998] absolute transform -translate-x-1/2 -translate-y-1/2 font-medium",
            className
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export {
  MouseTrackerProvider,
  Pointer,
  PointerFollower,
  useMouseTracker,
  type MouseTrackerContextType as CursorContextType,
  type MouseTrackerProviderProps as CursorProviderProps,
  type PointerProps as CursorProps,
  type PointerFollowerProps as CursorFollowProps,
};

```

Install NPM dependencies:
```bash
clsx, motion, lucide-react, tailwind-merge
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
