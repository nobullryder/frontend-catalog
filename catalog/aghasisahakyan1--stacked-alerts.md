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
stacked-alerts.tsx
"use client";
import { motion, Variants } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type NotificationStackProps = {
  cardTitle?: string;
  cardDescription?: string;
  items?: { title: string; body: string; time: string }[];
};

const defaultItems = [
  { title: "Stripe", body: "Payout processed $1,240.00", time: "just now" },
  { title: "GitHub", body: "New star on repo", time: "2m" },
  { title: "Vercel", body: "Preview ready", time: "6m" },
];

export const NotificationCenterStack = ({
  cardTitle = "Stacked alerts",
  cardDescription = "Multiple incoming updates layered as a tidy stack.",
  items = defaultItems,
}: NotificationStackProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariant: Variants = {
    open: { y: -12, transition: { duration: 0.25 } },
    close: { y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="close"
      animate={isHovered ? "open" : "close"}
      className={cn(
        "relative",
        "flex max-w-[350px] items-center justify-center",
        "rounded-lg border border-primary/5 bg-neutral-100 p-6 dark:bg-neutral-950",
      )}
    >
      <div className="relative h-[230px] w-[264px]">
        {items.map((n, i) => {
          const z = items.length - i;
          const offsets = [0, 8, 16];
          const rotate = [-2, 0, 2];
          return (
            <motion.div
              key={n.title + i}
              variants={cardVariant}
              style={{ zIndex: z }}
              animate={{
                rotate: isHovered ? rotate[i % rotate.length] : 0,
                y: isHovered ? -offsets[i % offsets.length] : 0,
                boxShadow: isHovered
                  ? "0 12px 28px rgba(0,0,0,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: i * 0.05 }}
              className="absolute left-1/2 top-1/2 h-16 w-[92%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border bg-neutral-300 dark:border-neutral-800 dark:bg-neutral-800"
            >
              <div className="flex h-full items-center gap-3 px-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-200 shadow dark:bg-neutral-700">
                  <div className="h-3 w-3 rounded-sm bg-cyan-400" />
                </div>
                <div className="flex w-full flex-col overflow-hidden">
                  <div className="flex w-full items-center justify-between">
                    <p className="truncate text-xs font-medium text-neutral-900 dark:text-neutral-100">
                      {n.title}
                    </p>
                    <span className="text-[10px] text-neutral-500">{n.time}</span>
                  </div>
                  <p className="w-[95%] truncate text-start text-[10px] text-neutral-700 dark:text-neutral-400">
                    {n.body}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-0 w-full px-6">
        <h3 className="text-sm font-semibold text-primary">{cardTitle}</h3>
        <p className="mt-1 text-xs text-neutral-500">{cardDescription}</p>
      </div>
    </motion.div>
  );
};

export default NotificationCenterStack;




code.demo.1757030964623.tsx
import { NotificationCenterStack } from "@/components/ui/stacked-alerts";

export default function DemoOne() {
  return <NotificationCenterStack />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stacked-alerts.tsx
"use client";
import { motion, Variants } from "motion/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type NotificationStackProps = {
  cardTitle?: string;
  cardDescription?: string;
  items?: { title: string; body: string; time: string }[];
};

const defaultItems = [
  { title: "Stripe", body: "Payout processed $1,240.00", time: "just now" },
  { title: "GitHub", body: "New star on repo", time: "2m" },
  { title: "Vercel", body: "Preview ready", time: "6m" },
];

export const NotificationCenterStack = ({
  cardTitle = "Stacked alerts",
  cardDescription = "Multiple incoming updates layered as a tidy stack.",
  items = defaultItems,
}: NotificationStackProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariant: Variants = {
    open: { y: -12, transition: { duration: 0.25 } },
    close: { y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="close"
      animate={isHovered ? "open" : "close"}
      className={cn(
        "relative",
        "flex max-w-[350px] items-center justify-center",
        "rounded-lg border border-primary/5 bg-neutral-100 p-6 dark:bg-neutral-950",
      )}
    >
      <div className="relative h-[230px] w-[264px]">
        {items.map((n, i) => {
          const z = items.length - i;
          const offsets = [0, 8, 16];
          const rotate = [-2, 0, 2];
          return (
            <motion.div
              key={n.title + i}
              variants={cardVariant}
              style={{ zIndex: z }}
              animate={{
                rotate: isHovered ? rotate[i % rotate.length] : 0,
                y: isHovered ? -offsets[i % offsets.length] : 0,
                boxShadow: isHovered
                  ? "0 12px 28px rgba(0,0,0,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: i * 0.05 }}
              className="absolute left-1/2 top-1/2 h-16 w-[92%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border bg-neutral-300 dark:border-neutral-800 dark:bg-neutral-800"
            >
              <div className="flex h-full items-center gap-3 px-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-200 shadow dark:bg-neutral-700">
                  <div className="h-3 w-3 rounded-sm bg-cyan-400" />
                </div>
                <div className="flex w-full flex-col overflow-hidden">
                  <div className="flex w-full items-center justify-between">
                    <p className="truncate text-xs font-medium text-neutral-900 dark:text-neutral-100">
                      {n.title}
                    </p>
                    <span className="text-[10px] text-neutral-500">{n.time}</span>
                  </div>
                  <p className="w-[95%] truncate text-start text-[10px] text-neutral-700 dark:text-neutral-400">
                    {n.body}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-0 w-full px-6">
        <h3 className="text-sm font-semibold text-primary">{cardTitle}</h3>
        <p className="mt-1 text-xs text-neutral-500">{cardDescription}</p>
      </div>
    </motion.div>
  );
};

export default NotificationCenterStack;



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
