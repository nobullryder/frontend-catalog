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
magnetic-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface MagneticTabsProps {
  items?: MagneticTabItem[];
  defaultValue?: string;
  className?: string;
  indicatorPadding?: number; // padding around tab for indicator
}

export default function MagneticTabs({
  items = [
    { value: "overview", label: "Overview", content: "Overview content here." },
    { value: "activity", label: "Activity", content: "Activity content here." },
    { value: "settings", label: "Settings", content: "Settings content here." },
    { value: "faq", label: "FAQ", content: "FAQ content here." },
  ],
  defaultValue = "overview",
  className,
  indicatorPadding = 6,
}: MagneticTabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  const [hovered, setHovered] = React.useState<string | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const indicatorX = useMotionValue(0);
  const indicatorWidth = useMotionValue(0);
  const indicatorTop = useMotionValue(0);
  const indicatorHeight = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25 };
  const springX = useSpring(indicatorX, springConfig);
  const springW = useSpring(indicatorWidth, springConfig);
  const springTop = useSpring(indicatorTop, springConfig);
  const springH = useSpring(indicatorHeight, springConfig);

  const updateIndicator = (value: string) => {
    const idx = items.findIndex((item) => item.value === value);
    const btn = tabRefs.current[idx];
    const container = containerRef.current;
    if (btn && container) {
      const cRect = container.getBoundingClientRect();
      const tRect = btn.getBoundingClientRect();
      indicatorX.set(tRect.left - cRect.left - indicatorPadding);
      indicatorWidth.set(tRect.width + indicatorPadding * 2);
      indicatorTop.set(tRect.top - cRect.top - indicatorPadding);
      indicatorHeight.set(tRect.height + indicatorPadding * 2);
    }
  };

  React.useEffect(() => {
    updateIndicator(active);
    const ro = new ResizeObserver(() => updateIndicator(active));
    if (containerRef.current) ro.observe(containerRef.current);
    tabRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", () => updateIndicator(active));
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", () => updateIndicator(active));
    };
  }, [active, indicatorPadding]);

  React.useEffect(() => {
    if (hovered) updateIndicator(hovered);
    else updateIndicator(active);
  }, [hovered, active, indicatorPadding]);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[70vh]", className)}>
      <Tabs defaultValue={defaultValue} onValueChange={setActive} className="w-full max-w-lg">
        <TabsList
          ref={containerRef}
          className="relative flex justify-center gap-2 p-2 bg-background/60 "
        >
          {/* Magnetic Indicator */}
          <motion.div
            style={{
              left: springX,
              width: springW,
              top: springTop,
              height: springH,
            }}
            className="absolute rounded-lg bg-primary/30 pointer-events-none"
          >
            <motion.div
              className={cn("absolute inset-0 rounded-lg filter blur-md opacity-40")}
              initial={false}
              animate={{ opacity: 0.4 }}
            />
          </motion.div>

          {items.map((item, i) => (
            <TabsTrigger
              key={item.value}
              ref={(el) => (tabRefs.current[i] = el)}
              value={item.value}
              asChild
              onMouseEnter={() => setHovered(item.value)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.button
                className={cn(
                  "relative z-10 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active === item.value ? "text-white" : "text-foreground/80"
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {item.label}
              </motion.button>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-4 w-full max-w-lg relative">
          <AnimatePresence mode="wait">
            {items.map(
              (item) =>
                item.value === active && (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    className="absolute inset-0 p-4 bg-card rounded-lg"
                  >
                    {item.content}
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}


code.demo.1758455958520.tsx
// This is a demo file for the MagneticTabs component
// Users will see this in the preview

import MagneticTabs, { MagneticTabItem } from "@/components/ui/magnetic-tabs";

const tabItems: MagneticTabItem[] = [
  { value: "overview", label: "Overview", content: "Overview content goes here." },
  { value: "activity", label: "Activity", content: "Activity content goes here." },
  { value: "settings", label: "Settings", content: "Settings content goes here." },
  { value: "faq", label: "FAQ", content: "FAQ content goes here." },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <MagneticTabs
        items={tabItems}
        defaultValue="overview"
        indicatorPadding={8} // indicator size
        className="max-w-xl"
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/magnetic-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface MagneticTabsProps {
  items?: MagneticTabItem[];
  defaultValue?: string;
  className?: string;
  indicatorPadding?: number; // padding around tab for indicator
}

export default function MagneticTabs({
  items = [
    { value: "overview", label: "Overview", content: "Overview content here." },
    { value: "activity", label: "Activity", content: "Activity content here." },
    { value: "settings", label: "Settings", content: "Settings content here." },
    { value: "faq", label: "FAQ", content: "FAQ content here." },
  ],
  defaultValue = "overview",
  className,
  indicatorPadding = 6,
}: MagneticTabsProps) {
  const [active, setActive] = React.useState(defaultValue);
  const [hovered, setHovered] = React.useState<string | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const indicatorX = useMotionValue(0);
  const indicatorWidth = useMotionValue(0);
  const indicatorTop = useMotionValue(0);
  const indicatorHeight = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25 };
  const springX = useSpring(indicatorX, springConfig);
  const springW = useSpring(indicatorWidth, springConfig);
  const springTop = useSpring(indicatorTop, springConfig);
  const springH = useSpring(indicatorHeight, springConfig);

  const updateIndicator = (value: string) => {
    const idx = items.findIndex((item) => item.value === value);
    const btn = tabRefs.current[idx];
    const container = containerRef.current;
    if (btn && container) {
      const cRect = container.getBoundingClientRect();
      const tRect = btn.getBoundingClientRect();
      indicatorX.set(tRect.left - cRect.left - indicatorPadding);
      indicatorWidth.set(tRect.width + indicatorPadding * 2);
      indicatorTop.set(tRect.top - cRect.top - indicatorPadding);
      indicatorHeight.set(tRect.height + indicatorPadding * 2);
    }
  };

  React.useEffect(() => {
    updateIndicator(active);
    const ro = new ResizeObserver(() => updateIndicator(active));
    if (containerRef.current) ro.observe(containerRef.current);
    tabRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", () => updateIndicator(active));
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", () => updateIndicator(active));
    };
  }, [active, indicatorPadding]);

  React.useEffect(() => {
    if (hovered) updateIndicator(hovered);
    else updateIndicator(active);
  }, [hovered, active, indicatorPadding]);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[70vh]", className)}>
      <Tabs defaultValue={defaultValue} onValueChange={setActive} className="w-full max-w-lg">
        <TabsList
          ref={containerRef}
          className="relative flex justify-center gap-2 p-2 bg-background/60 "
        >
          {/* Magnetic Indicator */}
          <motion.div
            style={{
              left: springX,
              width: springW,
              top: springTop,
              height: springH,
            }}
            className="absolute rounded-lg bg-primary/30 pointer-events-none"
          >
            <motion.div
              className={cn("absolute inset-0 rounded-lg filter blur-md opacity-40")}
              initial={false}
              animate={{ opacity: 0.4 }}
            />
          </motion.div>

          {items.map((item, i) => (
            <TabsTrigger
              key={item.value}
              ref={(el) => (tabRefs.current[i] = el)}
              value={item.value}
              asChild
              onMouseEnter={() => setHovered(item.value)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.button
                className={cn(
                  "relative z-10 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active === item.value ? "text-white" : "text-foreground/80"
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {item.label}
              </motion.button>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-4 w-full max-w-lg relative">
          <AnimatePresence mode="wait">
            {items.map(
              (item) =>
                item.value === active && (
                  <motion.div
                    key={item.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    className="absolute inset-0 p-4 bg-card rounded-lg"
                  >
                    {item.content}
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </Tabs>
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
