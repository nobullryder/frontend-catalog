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
animated-shadcn-s-tabs.tsx
"use client";

import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { indicatorClassName?: string }
>(({ className, indicatorClassName, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const tabsListRef = useRef<HTMLDivElement | null>(null);

  const updateIndicator = React.useCallback(() => {
    if (!tabsListRef.current) return;

    const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');
    if (!activeTab) return;

    const activeRect = activeTab.getBoundingClientRect();
    const tabsRect = tabsListRef.current.getBoundingClientRect();

    requestAnimationFrame(() => {
      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        top: activeRect.top - tabsRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    });
  }, []);

  useEffect(() => {
    // Initial update
    const timeoutId = setTimeout(updateIndicator, 0);

    // Event listeners
    window.addEventListener("resize", updateIndicator);
    const observer = new MutationObserver(updateIndicator);

    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div className="relative" ref={tabsListRef}>
      <TabsPrimitive.List
        ref={ref}
        data-slot="tabs-list"
        className={cn(
          "bg-muted text-muted-foreground relative inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
          className
        )}
        {...props}
      />
      <div
        className={cn("absolute rounded-md border border-transparent bg-background shadow-sm dark:border-input dark:bg-input/30 transition-all duration-300 ease-in-out", indicatorClassName)}
        style={indicatorStyle}
      />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 z-10",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("flex-1 outline-none mt-2 slide-down-xs", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };



code.demo.1756904176976.tsx

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-shadcn-s-tabs";

export default function HorizontalTabsShowcase() {
  return (
    <div className="w-full max-w-xl">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
        Vertical Tabs
      </h2>
      <Tabs
        defaultValue="option1"
        className="flex flex-row gap-2"
      >
        <TabsList className="mt-2 flex flex-col items-stretch w-full h-auto">
          <TabsTrigger value="option1">Option 1</TabsTrigger>
          <TabsTrigger value="option2">Option 2</TabsTrigger>
          <TabsTrigger value="option3">Option 3</TabsTrigger>
          <TabsTrigger value="option4">Option 4</TabsTrigger>
        </TabsList>

        <TabsContent value="option1">
          <div className="flex flex-col gap-1 p-4 border rounded-lg">
            <span className="text-lg font-semibold"> Option 1 </span>
            Culpa et irure aute incididunt anim fugiat elit irure ullamco consectetur consequat labore. Dolore officia anim do sunt. Esse aliquip amet Lorem reprehenderit. Aliqua ea id reprehenderit dolor qui et aliquip. Elit sit sit ut id esse ex velit nostrud minim ea sint reprehenderit ex reprehenderit. Cillum magna in elit est duis exercitation elit dolor eu deserunt reprehenderit. In exercitation tempor mollit aute labore.
          </div>
        </TabsContent>
        <TabsContent value="option2">
          <div className="flex flex-col gap-1 p-4 border rounded-lg">
            <span className="text-lg font-semibold"> Option 2 </span>
            Culpa et irure aute incididunt anim fugiat elit irure ullamco consectetur consequat labore. Dolore officia anim do sunt. Esse aliquip amet Lorem reprehenderit. Aliqua ea id reprehenderit dolor qui et aliquip. Elit sit sit ut id esse ex velit nostrud minim ea sint reprehenderit ex reprehenderit. Cillum magna in elit est duis exercitation elit dolor eu deserunt reprehenderit. In exercitation tempor mollit aute labore.
          </div>
        </TabsContent>
        <TabsContent value="option3">
          <div className="flex flex-col gap-1 p-4 border rounded-lg">
            <span className="text-lg font-semibold"> Option 3 </span>
            Culpa et irure aute incididunt anim fugiat elit irure ullamco consectetur consequat labore. Dolore officia anim do sunt. Esse aliquip amet Lorem reprehenderit. Aliqua ea id reprehenderit dolor qui et aliquip. Elit sit sit ut id esse ex velit nostrud minim ea sint reprehenderit ex reprehenderit. Cillum magna in elit est duis exercitation elit dolor eu deserunt reprehenderit. In exercitation tempor mollit aute labore.
          </div>
        </TabsContent>
        <TabsContent value="option4">
          <div className="flex flex-col gap-1 p-4 border rounded-lg">
            <span className="text-lg font-semibold"> Option 4 </span>
            Culpa et irure aute incididunt anim fugiat elit irure ullamco consectetur consequat labore. Dolore officia anim do sunt. Esse aliquip amet Lorem reprehenderit. Aliqua ea id reprehenderit dolor qui et aliquip. Elit sit sit ut id esse ex velit nostrud minim ea sint reprehenderit ex reprehenderit. Cillum magna in elit est duis exercitation elit dolor eu deserunt reprehenderit. In exercitation tempor mollit aute labore.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-shadcn-s-tabs.tsx
"use client";

import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { indicatorClassName?: string }
>(({ className, indicatorClassName, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const tabsListRef = useRef<HTMLDivElement | null>(null);

  const updateIndicator = React.useCallback(() => {
    if (!tabsListRef.current) return;

    const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');
    if (!activeTab) return;

    const activeRect = activeTab.getBoundingClientRect();
    const tabsRect = tabsListRef.current.getBoundingClientRect();

    requestAnimationFrame(() => {
      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        top: activeRect.top - tabsRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    });
  }, []);

  useEffect(() => {
    // Initial update
    const timeoutId = setTimeout(updateIndicator, 0);

    // Event listeners
    window.addEventListener("resize", updateIndicator);
    const observer = new MutationObserver(updateIndicator);

    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div className="relative" ref={tabsListRef}>
      <TabsPrimitive.List
        ref={ref}
        data-slot="tabs-list"
        className={cn(
          "bg-muted text-muted-foreground relative inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
          className
        )}
        {...props}
      />
      <div
        className={cn("absolute rounded-md border border-transparent bg-background shadow-sm dark:border-input dark:bg-input/30 transition-all duration-300 ease-in-out", indicatorClassName)}
        style={indicatorStyle}
      />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 z-10",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("flex-1 outline-none mt-2 slide-down-xs", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };


```

Install NPM dependencies:
```bash
@radix-ui/react-tabs
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
