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
animated-tabs.tsx
"use client" 

import * as React from "react"
import { useEffect, useRef, useState } from "react";
 
export interface AnimatedTabsProps {
  tabs: { label: string }[];
}
 
export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
 
  useEffect(() => {
    const container = containerRef.current;
 
    if (container && activeTab) {
      const activeTabElement = activeTabRef.current;
 
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
 
        const clipLeft = offsetLeft + 16;
        const clipRight = offsetLeft + offsetWidth + 16;
 
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100,
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100,
        ).toFixed()}% round 17px)`;
      }
    }
  }, [activeTab]);
 
  return (
    <div className="relative bg-secondary/50 border border-primary/10 mx-auto flex w-fit flex-col items-center rounded-full py-2 px-4">
      <div
        ref={containerRef}
        className="absolute z-10 w-full overflow-hidden [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]"
      >
        <div className="relative flex w-full justify-center bg-primary">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.label)}
              className="flex h-8 items-center rounded-full p-3 text-sm font-medium text-primary-foreground"
              tabIndex={-1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
 
      <div className="relative flex w-full justify-center">
        {tabs.map(({ label }, index) => {
          const isActive = activeTab === label;
 
          return (
            <button
              key={index}
              ref={isActive ? activeTabRef : null}
              onClick={() => setActiveTab(label)}
              className="flex h-8 items-center cursor-pointer rounded-full p-3 text-sm font-medium text-muted-foreground"
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

code.demo.tsx
import { AnimatedTabs } from "@/components/ui/animated-tabs"

const Demo = () => {
    return (
        <>
        <AnimatedTabs
            tabs={[
                { label: "Home" },
                { label: "About" },
                { label: "Resources" },
                { label: "Docs" },
                { label: "Support" },
            ]}
            />;
        </>
    )
}


export {Demo }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/animated-tabs.tsx
"use client" 

import * as React from "react"
import { useEffect, useRef, useState } from "react";
 
export interface AnimatedTabsProps {
  tabs: { label: string }[];
}
 
export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
 
  useEffect(() => {
    const container = containerRef.current;
 
    if (container && activeTab) {
      const activeTabElement = activeTabRef.current;
 
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
 
        const clipLeft = offsetLeft + 16;
        const clipRight = offsetLeft + offsetWidth + 16;
 
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100,
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100,
        ).toFixed()}% round 17px)`;
      }
    }
  }, [activeTab]);
 
  return (
    <div className="relative bg-secondary/50 border border-primary/10 mx-auto flex w-fit flex-col items-center rounded-full py-2 px-4">
      <div
        ref={containerRef}
        className="absolute z-10 w-full overflow-hidden [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]"
      >
        <div className="relative flex w-full justify-center bg-primary">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.label)}
              className="flex h-8 items-center rounded-full p-3 text-sm font-medium text-primary-foreground"
              tabIndex={-1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
 
      <div className="relative flex w-full justify-center">
        {tabs.map(({ label }, index) => {
          const isActive = activeTab === label;
 
          return (
            <button
              key={index}
              ref={isActive ? activeTabRef : null}
              onClick={() => setActiveTab(label)}
              className="flex h-8 items-center cursor-pointer rounded-full p-3 text-sm font-medium text-muted-foreground"
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
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
