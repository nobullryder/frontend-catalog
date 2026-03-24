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
gradient-reveal-text.tsx
"use client";

import React, { forwardRef, useImperativeHandle, useRef, useState, ElementType } from "react";
import { cn } from "@/lib/utils";

export type RevealDirection = "ltr" | "rtl" | "ttb" | "btt";

export type GradientRevealTextRef = {
  animate: (direction?: RevealDirection) => void;
  reset: () => void;
};

export interface GradientRevealTextProps {
  children: React.ReactNode;
  as?: ElementType;
  trigger?: "hover" | "inView" | "auto";
  gradient?: string;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  rounded?: string;
  className?: string;
  useTailwind?: boolean;
}

const GradientRevealText = forwardRef<GradientRevealTextRef, GradientRevealTextProps>(
  (
    {
      children,
      as = "span",
      trigger = "hover",
      gradient = "linear-gradient(to right, #06b6d4, #3b82f6)",
      direction = "ltr",
      duration = 0.8,
      delay = 0,
      rounded = "rounded-md p-1",
      className,
      useTailwind = false,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [active, setActive] = useState(trigger === "auto");

    useImperativeHandle(ref, () => ({
      animate: (dir?: RevealDirection) => {
        if (dir) direction = dir;
        setActive(true);
      },
      reset: () => setActive(false),
    }));

    const handleHover = () => {
      if (trigger === "hover") setActive(true);
    };
    const handleHoverLeave = () => {
      if (trigger === "hover") setActive(false);
    };

    const bgSize = active ? "100% 100%" : direction === "ltr" || direction === "rtl" ? "0% 100%" : "100% 0%";
    const bgPosition =
      direction === "rtl" ? "100% 0%" : direction === "btt" ? "0% 100%" : "0% 0%";

    const style: React.CSSProperties = {
      backgroundImage: useTailwind ? undefined : gradient,
      backgroundSize: bgSize,
      backgroundPosition: bgPosition,
      backgroundRepeat: "no-repeat",
      WebkitBoxDecorationBreak: "clone",
      boxDecorationBreak: "clone",
      transition: `background-size ${duration}s ease ${delay}s`,
      color: active ? "white" : "black", // Text white when gradient is applied
    };

    const elementClasses = cn(
      "inline",
      useTailwind ? gradient : "",
      rounded,
      className
    );

    const ElementTag = as || "span";

    return (
      <ElementTag
        ref={containerRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
        {...props}
      >
        <span className={elementClasses} style={style}>
          {children}
        </span>
      </ElementTag>
    );
  }
);

GradientRevealText.displayName = "GradientRevealText";
export default GradientRevealText;


code.demo.1758919920747.tsx
"use client";

import React, { useRef } from "react";
import GradientRevealText, { GradientRevealTextRef } from "@/components/ui/gradient-reveal-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GradientRevealTextDemo() {
  const ref1 = useRef<GradientRevealTextRef>(null);

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hover-triggered Gradient Reveal</CardTitle>
        </CardHeader>
        <CardContent>
          <GradientRevealText trigger="hover" gradient="linear-gradient(to right, #06b6d4, #3b82f6)">
            Hover Me
          </GradientRevealText>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto-triggered Gradient Reveal</CardTitle>
        </CardHeader>
        <CardContent>
          <GradientRevealText ref={ref1} trigger="auto" direction="ttb" gradient="linear-gradient(to bottom, #3b82f6, #06b6d4)">
            Auto Reveal
          </GradientRevealText>
          <div className="mt-4">
            <Button onClick={() => ref1.current?.animate()}>Animate</Button>
            <Button className="ml-2" onClick={() => ref1.current?.reset()}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/gradient-reveal-text.tsx
"use client";

import React, { forwardRef, useImperativeHandle, useRef, useState, ElementType } from "react";
import { cn } from "@/lib/utils";

export type RevealDirection = "ltr" | "rtl" | "ttb" | "btt";

export type GradientRevealTextRef = {
  animate: (direction?: RevealDirection) => void;
  reset: () => void;
};

export interface GradientRevealTextProps {
  children: React.ReactNode;
  as?: ElementType;
  trigger?: "hover" | "inView" | "auto";
  gradient?: string;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  rounded?: string;
  className?: string;
  useTailwind?: boolean;
}

const GradientRevealText = forwardRef<GradientRevealTextRef, GradientRevealTextProps>(
  (
    {
      children,
      as = "span",
      trigger = "hover",
      gradient = "linear-gradient(to right, #06b6d4, #3b82f6)",
      direction = "ltr",
      duration = 0.8,
      delay = 0,
      rounded = "rounded-md p-1",
      className,
      useTailwind = false,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [active, setActive] = useState(trigger === "auto");

    useImperativeHandle(ref, () => ({
      animate: (dir?: RevealDirection) => {
        if (dir) direction = dir;
        setActive(true);
      },
      reset: () => setActive(false),
    }));

    const handleHover = () => {
      if (trigger === "hover") setActive(true);
    };
    const handleHoverLeave = () => {
      if (trigger === "hover") setActive(false);
    };

    const bgSize = active ? "100% 100%" : direction === "ltr" || direction === "rtl" ? "0% 100%" : "100% 0%";
    const bgPosition =
      direction === "rtl" ? "100% 0%" : direction === "btt" ? "0% 100%" : "0% 0%";

    const style: React.CSSProperties = {
      backgroundImage: useTailwind ? undefined : gradient,
      backgroundSize: bgSize,
      backgroundPosition: bgPosition,
      backgroundRepeat: "no-repeat",
      WebkitBoxDecorationBreak: "clone",
      boxDecorationBreak: "clone",
      transition: `background-size ${duration}s ease ${delay}s`,
      color: active ? "white" : "black", // Text white when gradient is applied
    };

    const elementClasses = cn(
      "inline",
      useTailwind ? gradient : "",
      rounded,
      className
    );

    const ElementTag = as || "span";

    return (
      <ElementTag
        ref={containerRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
        {...props}
      >
        <span className={elementClasses} style={style}>
          {children}
        </span>
      </ElementTag>
    );
  }
);

GradientRevealText.displayName = "GradientRevealText";
export default GradientRevealText;

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
