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
follower-counter.tsx
// component.tsx
import * as React from "react";
import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import { useOnClickOutside } from "usehooks-ts";

export type PhotoType = {
  title: string;
  src: string;
};

interface FollowerMilestoneProps extends React.HTMLAttributes<HTMLDivElement> {
  targetCount: number;
  photos: PhotoType[];
  headerText: string;
  footerText: string;
}

const fontSize = 50;
const padding = 15;
const height = fontSize + padding;

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center font-semibold"
    >
      {number}
    </motion.span>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Counter({ value }: { value: number }) {
  return (
    <div
      style={{ fontSize }}
      className="flex items-center justify-center space-x-1 overflow-hidden rounded bg-white px-2 leading-none text-gray-900 dark:bg-white dark:text-gray-900"
    >
      <span className="font-semibold">+</span>
      <Digit place={1000} value={value} />
      <Digit place={100} value={value} />
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  );
}

const FollowerMilestone = React.forwardRef<
  HTMLDivElement,
  FollowerMilestoneProps
>(
  (
    { targetCount, photos, headerText, footerText, className, ...props },
    ref
  ) => {
    const [count, setCount] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [activePhoto, setActivePhoto] = useState<PhotoType | null>(null);
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => setActivePhoto(null));

    useEffect(() => {
      const timer = setTimeout(() => {
        setCount(targetCount);
      }, 300);
      return () => clearTimeout(timer);
    }, [targetCount]);

    useEffect(() => {
      if (count === targetCount) {
        setShowConfetti(true);
      }
    }, [count, targetCount]);

    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setActivePhoto(null);
        }
      }
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
      <div
        ref={ref}
        className={`relative flex w-full max-w-5xl flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:gap-2 ${className}`}
        {...props}
      >
        <div className="flex flex-col items-center justify-center text-slate-900 dark:text-slate-900">
          <motion.h3
            className="w-full text-left text-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {headerText}
          </motion.h3>
          <Counter value={count} />
          <motion.p
            className="w-full text-right text-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {footerText}
          </motion.p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 md:w-[60%]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.title}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.div
                className="relative h-44 w-full cursor-pointer after:absolute after:inset-0 after:z-10 after:rounded-2xl after:border-4 after:border-black/10"
                onClick={() => setActivePhoto(photo)}
                layoutId={`photo-${photo.title}`}
              >
                <img
                  className="h-full w-full rounded-2xl bg-slate-100 object-cover"
                  src={photo.src}
                  alt={photo.title}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 h-full w-full bg-black/50 backdrop-blur-md"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activePhoto && (
            <div
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden p-4"
              ref={modalRef}
            >
              <motion.div
                className="pointer-events-auto relative left-0 h-96 w-full max-w-[600px] after:absolute after:inset-0 after:z-10 after:rounded-2xl after:border-4 after:border-black/10"
                layoutId={`photo-${activePhoto.title}`}
              >
                <img
                  className="h-full w-full rounded-2xl bg-slate-100 object-cover"
                  src={activePhoto.src}
                  alt={activePhoto.title}
                />
              </motion.div>
              <motion.button
                className="pointer-events-auto absolute right-4 top-4 z-30 rounded-full bg-zinc-900 p-3 text-white shadow-md transition-transform duration-300 active:scale-90 dark:bg-zinc-900"
                onClick={() => setActivePhoto(null)}
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: -20,
                  transition: { duration: 0.05 },
                }}
                layout
              >
                <X />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {showConfetti && <Confetti />}
      </div>
    );
  }
);

FollowerMilestone.displayName = "FollowerMilestone";

export default FollowerMilestone;

code.demo.1749422478217.tsx
// demo.tsx
import * as React from "react";
import FollowerMilestone, { type PhotoType } from "@/components/ui/follower-counter";
import { RotateCcw } from "lucide-react";

const FollowerMilestoneDemo = () => {
  const PHOTOS: PhotoType[] = [
    {
      title: "Photo-1",
      src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&h=500&fit=crop&q=80",
    },
    {
      title: "Photo-2",
      src: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=500&h=500&fit=crop&q=80",
    },
    {
      title: "Photo-3",
      src: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&h=500&fit=crop&q=80",
    },
    {
      title: "Photo-4",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&q=80",
    },
    {
      title: "Photo-5",
      src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Photo-6",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80",
    },
    {
      title: "Photo-7",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80",
    },
    {
      title: "Photo-8",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&q=80",
    },
  ];

  const [key, setKey] = React.useState(0);
  const handleReload = () => setKey((prev) => prev + 1);

  return (
    <div className="relative flex min-h-[700px] w-full items-center justify-center overflow-hidden bg-white px-4 py-10 dark:bg-white md:min-h-[500px]">
      <FollowerMilestone
        key={key}
        targetCount={5000}
        photos={PHOTOS}
        headerText="Thanks for"
        footerText="Followers !"
      />
      <button
        onClick={handleReload}
        className="absolute bottom-4 right-4 rounded-full bg-zinc-900 p-3 text-white shadow-md transition-transform duration-300 active:scale-90 dark:bg-zinc-900"
      >
        <RotateCcw />
      </button>
    </div>
  );
};

export { FollowerMilestoneDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/follower-counter.tsx
// component.tsx
import * as React from "react";
import {
  MotionValue,
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import { useOnClickOutside } from "usehooks-ts";

export type PhotoType = {
  title: string;
  src: string;
};

interface FollowerMilestoneProps extends React.HTMLAttributes<HTMLDivElement> {
  targetCount: number;
  photos: PhotoType[];
  headerText: string;
  footerText: string;
}

const fontSize = 50;
const padding = 15;
const height = fontSize + padding;

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center font-semibold"
    >
      {number}
    </motion.span>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Counter({ value }: { value: number }) {
  return (
    <div
      style={{ fontSize }}
      className="flex items-center justify-center space-x-1 overflow-hidden rounded bg-white px-2 leading-none text-gray-900 dark:bg-white dark:text-gray-900"
    >
      <span className="font-semibold">+</span>
      <Digit place={1000} value={value} />
      <Digit place={100} value={value} />
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  );
}

const FollowerMilestone = React.forwardRef<
  HTMLDivElement,
  FollowerMilestoneProps
>(
  (
    { targetCount, photos, headerText, footerText, className, ...props },
    ref
  ) => {
    const [count, setCount] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [activePhoto, setActivePhoto] = useState<PhotoType | null>(null);
    const modalRef = useRef(null);

    useOnClickOutside(modalRef, () => setActivePhoto(null));

    useEffect(() => {
      const timer = setTimeout(() => {
        setCount(targetCount);
      }, 300);
      return () => clearTimeout(timer);
    }, [targetCount]);

    useEffect(() => {
      if (count === targetCount) {
        setShowConfetti(true);
      }
    }, [count, targetCount]);

    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setActivePhoto(null);
        }
      }
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
      <div
        ref={ref}
        className={`relative flex w-full max-w-5xl flex-col items-center justify-center gap-10 md:flex-row md:justify-between md:gap-2 ${className}`}
        {...props}
      >
        <div className="flex flex-col items-center justify-center text-slate-900 dark:text-slate-900">
          <motion.h3
            className="w-full text-left text-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {headerText}
          </motion.h3>
          <Counter value={count} />
          <motion.p
            className="w-full text-right text-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {footerText}
          </motion.p>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 md:w-[60%]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.title}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.div
                className="relative h-44 w-full cursor-pointer after:absolute after:inset-0 after:z-10 after:rounded-2xl after:border-4 after:border-black/10"
                onClick={() => setActivePhoto(photo)}
                layoutId={`photo-${photo.title}`}
              >
                <img
                  className="h-full w-full rounded-2xl bg-slate-100 object-cover"
                  src={photo.src}
                  alt={photo.title}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 h-full w-full bg-black/50 backdrop-blur-md"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activePhoto && (
            <div
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden p-4"
              ref={modalRef}
            >
              <motion.div
                className="pointer-events-auto relative left-0 h-96 w-full max-w-[600px] after:absolute after:inset-0 after:z-10 after:rounded-2xl after:border-4 after:border-black/10"
                layoutId={`photo-${activePhoto.title}`}
              >
                <img
                  className="h-full w-full rounded-2xl bg-slate-100 object-cover"
                  src={activePhoto.src}
                  alt={activePhoto.title}
                />
              </motion.div>
              <motion.button
                className="pointer-events-auto absolute right-4 top-4 z-30 rounded-full bg-zinc-900 p-3 text-white shadow-md transition-transform duration-300 active:scale-90 dark:bg-zinc-900"
                onClick={() => setActivePhoto(null)}
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: -20,
                  transition: { duration: 0.05 },
                }}
                layout
              >
                <X />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {showConfetti && <Confetti />}
      </div>
    );
  }
);

FollowerMilestone.displayName = "FollowerMilestone";

export default FollowerMilestone;
```

Install NPM dependencies:
```bash
usehooks-ts, lucide-react, framer-motion, react-confetti
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
