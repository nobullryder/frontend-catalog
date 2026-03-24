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
animated-tabs-background.tsx
"use client";

import { useState, useRef, useId, ReactElement, Children } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CleanMotionBgProps = {
  children: ReactElement<{ "data-key": string }> | ReactElement<{ "data-key": string }>[];
  onChange?: (activeKey: string | null) => void;
  className?: string;
  hoverable?: boolean;
  defaultKey?: string | null;
};

export const CleanMotionBackground = ({
  children,
  onChange,
  className,
  hoverable = true,
  defaultKey = null,
}: CleanMotionBgProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(defaultKey);
  const id = useId();
  const stableId = useRef(id);
  const bgLayoutId = `clean-bg-${stableId.current}`;

  const updateActive = (key: string | null) => {
    setActiveKey(key);
    onChange?.(key);
  };

  if (hoverable) {
    // Hoverable version: track hover on each child but don't clear background in gaps
    return (
      <div
        className={cn("relative flex gap-2", className)}
        onMouseLeave={() => updateActive(null)} // clear only when leaving the container
      >
        {Children.map(children, (child: ReactElement<any>, idx) => {
          const keyAttr = child.props["data-key"];
          const isActive = activeKey === keyAttr;

          return (
<div
  key={idx}
  className="relative inline-flex rounded-md"
  onMouseEnter={() => updateActive(keyAttr)}
>
  {/* Background */}
  {isActive && (
    <motion.div
      layoutId={bgLayoutId}
      className="absolute inset-0 rounded-md pointer-events-none"
      initial={false}
      animate={{ backgroundColor: "var(--primary-hover)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  )}

  {/* Foreground content */}
  <div className="relative z-10 cursor-pointer transition-colors duration-200 px-4 py-2">
    {child.props.children}
  </div>
</div>

          );
        })}
      </div>
    );
  }

  // Clickable version
  return (
    <div className={cn("relative flex gap-2", className)}>
      {Children.map(children, (child: ReactElement<any>, idx) => {
        const keyAttr = child.props["data-key"];
        const isActive = activeKey === keyAttr;

        return (
          <div
            key={idx}
            className="relative inline-flex rounded-md"
            onClick={() => updateActive(keyAttr)}
          >
            {isActive && (
              <motion.div
                layoutId={bgLayoutId}
                className="absolute inset-0 rounded-md pointer-events-none"
                initial={false}
                animate={{ backgroundColor: "var(--primary-hover)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative z-10 cursor-pointer transition-colors duration-200">
              {child.props.children}
            </div>
          </div>
        );
      })}
    </div>
  );
};


code.demo.1759156368752.tsx
import { CleanMotionBackground } from "@/components/ui/animated-tabs-background";

export default function DemoMotionBg() {
  return (
    <CleanMotionBackground
      bgClass="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"
      hoverActivate
    >
      <div data-key="one" className="p-4 text-white font-bold text-lg">First Item</div>
      <div data-key="two" className="p-4 text-white font-bold text-lg">Second Item</div>
      <div data-key="three" className="p-4 text-white font-bold text-lg">Third Item</div>
    </CleanMotionBackground>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-tabs-background.tsx
"use client";

import { useState, useRef, useId, ReactElement, Children } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CleanMotionBgProps = {
  children: ReactElement<{ "data-key": string }> | ReactElement<{ "data-key": string }>[];
  onChange?: (activeKey: string | null) => void;
  className?: string;
  hoverable?: boolean;
  defaultKey?: string | null;
};

export const CleanMotionBackground = ({
  children,
  onChange,
  className,
  hoverable = true,
  defaultKey = null,
}: CleanMotionBgProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(defaultKey);
  const id = useId();
  const stableId = useRef(id);
  const bgLayoutId = `clean-bg-${stableId.current}`;

  const updateActive = (key: string | null) => {
    setActiveKey(key);
    onChange?.(key);
  };

  if (hoverable) {
    // Hoverable version: track hover on each child but don't clear background in gaps
    return (
      <div
        className={cn("relative flex gap-2", className)}
        onMouseLeave={() => updateActive(null)} // clear only when leaving the container
      >
        {Children.map(children, (child: ReactElement<any>, idx) => {
          const keyAttr = child.props["data-key"];
          const isActive = activeKey === keyAttr;

          return (
<div
  key={idx}
  className="relative inline-flex rounded-md"
  onMouseEnter={() => updateActive(keyAttr)}
>
  {/* Background */}
  {isActive && (
    <motion.div
      layoutId={bgLayoutId}
      className="absolute inset-0 rounded-md pointer-events-none"
      initial={false}
      animate={{ backgroundColor: "var(--primary-hover)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  )}

  {/* Foreground content */}
  <div className="relative z-10 cursor-pointer transition-colors duration-200 px-4 py-2">
    {child.props.children}
  </div>
</div>

          );
        })}
      </div>
    );
  }

  // Clickable version
  return (
    <div className={cn("relative flex gap-2", className)}>
      {Children.map(children, (child: ReactElement<any>, idx) => {
        const keyAttr = child.props["data-key"];
        const isActive = activeKey === keyAttr;

        return (
          <div
            key={idx}
            className="relative inline-flex rounded-md"
            onClick={() => updateActive(keyAttr)}
          >
            {isActive && (
              <motion.div
                layoutId={bgLayoutId}
                className="absolute inset-0 rounded-md pointer-events-none"
                initial={false}
                animate={{ backgroundColor: "var(--primary-hover)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative z-10 cursor-pointer transition-colors duration-200">
              {child.props.children}
            </div>
          </div>
        );
      })}
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
