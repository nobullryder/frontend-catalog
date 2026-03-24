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
expandable-tabs-1.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TabItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
};

export type ExpandableTabsProps = {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
};

export const ExpandableTabs = ({
  tabs,
  defaultTabId = tabs[0]?.id,
  className,
}: ExpandableTabsProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-secondary text-secondary-foreground shadow-sm ",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        const Icon = tab.icon;

        return (
          <motion.div
            key={tab.id}
            layout
            className={cn(
              "flex items-center justify-center rounded-xl cursor-pointer overflow-hidden h-[50px]",
              tab.color,
              isActive ? "flex-1" : "flex-none",
            )}
            onClick={() => setActiveTabId(tab.id)}
            initial={false}
            animate={{
              width: isActive ? 140 : 50,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            <motion.div
              className="flex items-center justify-center h-[50px] aspect-square"
              initial={{ filter: "blur(10px)" }}
              animate={{ filter: "blur(0px)" }}
              exit={{ filter: "blur(10px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Icon className="flex-shrink-0 w-6 h-6 text-white aspect-square" />
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    className="ml-3 text-white font-medium max-sm:hidden"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

code.demo.1749137457796.tsx
import {
  ExpandableTabs,
  type TabItem,
} from "@/components/ui/expandable-tabs-1";

import { Zap, User, Sparkles, Mail } from "lucide-react";


const DemoOne = () => {
  const tabs: TabItem[] = [
    {
      id: "important",
      icon: Zap,
      label: "Important",
      color: "bg-blue-600",
    },
    {
      id: "profile",
      icon: User,
      label: "Profile",
      color: "bg-pink-500",
    },
    {
      id: "features",
      icon: Sparkles,
      label: "Features",
      color: "bg-pink-600",
    },
    {
      id: "messages",
      icon: Mail,
      label: "Messages",
      color: "bg-purple-500",
    },
  ];
  return (
    <>
    <div className= "w-full max-w-md mx-auto" >
    <ExpandableTabs tabs={ tabs } defaultTabId = "important" />
      </div>
      < />
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/expandable-tabs-1.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TabItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
};

export type ExpandableTabsProps = {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
};

export const ExpandableTabs = ({
  tabs,
  defaultTabId = tabs[0]?.id,
  className,
}: ExpandableTabsProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-secondary text-secondary-foreground shadow-sm ",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        const Icon = tab.icon;

        return (
          <motion.div
            key={tab.id}
            layout
            className={cn(
              "flex items-center justify-center rounded-xl cursor-pointer overflow-hidden h-[50px]",
              tab.color,
              isActive ? "flex-1" : "flex-none",
            )}
            onClick={() => setActiveTabId(tab.id)}
            initial={false}
            animate={{
              width: isActive ? 140 : 50,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            <motion.div
              className="flex items-center justify-center h-[50px] aspect-square"
              initial={{ filter: "blur(10px)" }}
              animate={{ filter: "blur(0px)" }}
              exit={{ filter: "blur(10px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Icon className="flex-shrink-0 w-6 h-6 text-white aspect-square" />
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    className="ml-3 text-white font-medium max-sm:hidden"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
```

Install NPM dependencies:
```bash
clsx, lucide-react, framer-motion, tailwind-merge
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
