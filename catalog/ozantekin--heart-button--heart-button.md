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
heart-button.tsx
"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
 
const animations = {
  count: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  heart: {
    initial: { scale: 1 },
    tapActive: { scale: 0.8 },
    tapCompleted: { scale: 1 },
  },
  particle: (index: number) => ({
    initial: { x: "50%", y: "50%", scale: 0, opacity: 0 },
    animate: {
      x: `calc(50% + ${Math.cos((index * Math.PI) / 3) * 30}px)`,
      y: `calc(50% + ${Math.sin((index * Math.PI) / 3) * 30}px)`,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    },
    transition: { duration: 0.8, delay: index * 0.05, ease: "easeOut" },
  }),
  glow: {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: [1, 1.5], opacity: [0.8, 0] },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  pulse: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: [1.2, 1.8, 1.2], opacity: [0, 0.3, 0] },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};
 
export function HeartButton() {
  const [clickCount, setClickCount] = React.useState(0);
  const [count, setCount] = React.useState(16);
 
  const maxClicks = 5;
  const isCompleted = clickCount >= maxClicks;
 
  const fillPercentage = Math.min(100, (clickCount / maxClicks) * 100);
  const isActive = clickCount > 0;
  const sizeMultiplier = 1 + clickCount * 0.04;
 
  const handleClick = () => {
    if (clickCount < maxClicks) {
      setClickCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
    }
  };
 
  return (
    <div className="relative">
      <Button
        className="py-0 pe-0 overflow-visible"
        variant="outline"
        onClick={handleClick}
        aria-pressed={isActive}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? sizeMultiplier : 1 }}
          whileTap={
            isCompleted
              ? animations.heart.tapCompleted
              : animations.heart.tapActive
          }
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative"
        >
          <Heart className="opacity-60" size={16} aria-hidden="true" />
 
          <Heart
            className="absolute inset-0 text-red-500 fill-red-500 transition-all duration-300"
            size={16}
            aria-hidden="true"
            style={{ clipPath: `inset(${100 - fillPercentage}% 0 0 0)` }}
          />
 
          <AnimatePresence>
            {isCompleted && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)",
                  }}
                  {...animations.pulse}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 10px 2px rgba(239,68,68,0.6)" }}
                  {...animations.glow}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
 
        <span className="mx-1.5">Like</span>
 
        <span className="relative inline-flex items-center justify-center h-full px-3 text-xs font-medium rounded-full text-muted-foreground before:absolute before:inset-0 before:w-px before:bg-border ms-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              variants={animations.count}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </span>
      </Button>
 
      <AnimatePresence>
        {isCompleted && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-500"
                initial={animations.particle(i).initial}
                animate={animations.particle(i).animate}
                transition={animations.particle(i).transition}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

code.demo.tsx
import { HeartButton } from "@/components/ui/heart-button"

export function HeartButtonDemo() {
  return <HeartButton/>;
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/heart-button.tsx
"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
 
const animations = {
  count: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  heart: {
    initial: { scale: 1 },
    tapActive: { scale: 0.8 },
    tapCompleted: { scale: 1 },
  },
  particle: (index: number) => ({
    initial: { x: "50%", y: "50%", scale: 0, opacity: 0 },
    animate: {
      x: `calc(50% + ${Math.cos((index * Math.PI) / 3) * 30}px)`,
      y: `calc(50% + ${Math.sin((index * Math.PI) / 3) * 30}px)`,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    },
    transition: { duration: 0.8, delay: index * 0.05, ease: "easeOut" },
  }),
  glow: {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: [1, 1.5], opacity: [0.8, 0] },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  pulse: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: [1.2, 1.8, 1.2], opacity: [0, 0.3, 0] },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};
 
export function HeartButton() {
  const [clickCount, setClickCount] = React.useState(0);
  const [count, setCount] = React.useState(16);
 
  const maxClicks = 5;
  const isCompleted = clickCount >= maxClicks;
 
  const fillPercentage = Math.min(100, (clickCount / maxClicks) * 100);
  const isActive = clickCount > 0;
  const sizeMultiplier = 1 + clickCount * 0.04;
 
  const handleClick = () => {
    if (clickCount < maxClicks) {
      setClickCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
    }
  };
 
  return (
    <div className="relative">
      <Button
        className="py-0 pe-0 overflow-visible"
        variant="outline"
        onClick={handleClick}
        aria-pressed={isActive}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? sizeMultiplier : 1 }}
          whileTap={
            isCompleted
              ? animations.heart.tapCompleted
              : animations.heart.tapActive
          }
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative"
        >
          <Heart className="opacity-60" size={16} aria-hidden="true" />
 
          <Heart
            className="absolute inset-0 text-red-500 fill-red-500 transition-all duration-300"
            size={16}
            aria-hidden="true"
            style={{ clipPath: `inset(${100 - fillPercentage}% 0 0 0)` }}
          />
 
          <AnimatePresence>
            {isCompleted && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%)",
                  }}
                  {...animations.pulse}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 10px 2px rgba(239,68,68,0.6)" }}
                  {...animations.glow}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
 
        <span className="mx-1.5">Like</span>
 
        <span className="relative inline-flex items-center justify-center h-full px-3 text-xs font-medium rounded-full text-muted-foreground before:absolute before:inset-0 before:w-px before:bg-border ms-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              variants={animations.count}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </span>
      </Button>
 
      <AnimatePresence>
        {isCompleted && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-500"
                initial={animations.particle(i).initial}
                animate={animations.particle(i).animate}
                transition={animations.particle(i).transition}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```
```tsx
/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

Install NPM dependencies:
```bash
lucide-react, framer-motion, @radix-ui/react-slot, class-variance-authority
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
