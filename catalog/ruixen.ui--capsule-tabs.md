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
capsule-tabs.tsx
"use client";

import * as React from "react";
import {Button} from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ScrollableTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface CapsuleTabsProps {
  items?: ScrollableTabItem[];
  defaultValue?: string;
  className?: string;
  visibleCount?: number; // number of tabs per page
}

export default function CapsuleTabs({
  items = Array.from({ length: 20 }, (_, i) => ({
    value: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    content: `Content for Tab ${i + 1}`,
  })),
  defaultValue,
  className,
  visibleCount = 5,
}: CapsuleTabsProps) {
  const [active, setActive] = React.useState(defaultValue || items[0].value);
  const [page, setPage] = React.useState(0);

  const totalPages = Math.ceil(items.length / visibleCount);

  const currentPageTabs = React.useMemo(() => {
    const start = page * visibleCount;
    return items.slice(start, start + visibleCount);
  }, [page, items, visibleCount]);

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 0));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex gap-2 my-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <span
              key={idx}
              onClick={() => setPage(idx)}
              className={cn(
                "w-3 h-3 rounded-full cursor-pointer transition-colors",
                idx === page ? "bg-primary" : "bg-foreground/30"
              )}
            />
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 w-full max-w-lg">
        {/* Left arrow */}
        <Button
          variant="icon"
          onClick={handlePrevPage}
          disabled={page === 0}
          className="p-2 rounded-full bg-background/50 hover:bg-background/70 disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Tabs value={active} onValueChange={setActive} className="flex-1 flex   flex-col">
          <TabsList className="flex gap-2 w-fit mx-auto justify-center">
            {currentPageTabs.map((item) => {
              const isActive = item.value === active;
              return (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  asChild
                >
                  <motion.button
                    className={cn(
                      "px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all",
                      isActive ? "bg-primary text-white shadow-md" : "bg-background/50 text-foreground/70"
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                  </motion.button>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <div className="p-4 bg-card">{item.content}</div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Right arrow */}
        <Button
          variant="icon"
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className="p-2 rounded-full bg-background/50 hover:bg-background/70 disabled:opacity-40"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}


code.demo.1758464195216.tsx
import CapsuleTabs from "@/components/ui/capsule-tabs";

export default function DemoOne() {
  return <CapsuleTabs />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/capsule-tabs.tsx
"use client";

import * as React from "react";
import {Button} from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ScrollableTabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface CapsuleTabsProps {
  items?: ScrollableTabItem[];
  defaultValue?: string;
  className?: string;
  visibleCount?: number; // number of tabs per page
}

export default function CapsuleTabs({
  items = Array.from({ length: 20 }, (_, i) => ({
    value: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    content: `Content for Tab ${i + 1}`,
  })),
  defaultValue,
  className,
  visibleCount = 5,
}: CapsuleTabsProps) {
  const [active, setActive] = React.useState(defaultValue || items[0].value);
  const [page, setPage] = React.useState(0);

  const totalPages = Math.ceil(items.length / visibleCount);

  const currentPageTabs = React.useMemo(() => {
    const start = page * visibleCount;
    return items.slice(start, start + visibleCount);
  }, [page, items, visibleCount]);

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 0));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex gap-2 my-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <span
              key={idx}
              onClick={() => setPage(idx)}
              className={cn(
                "w-3 h-3 rounded-full cursor-pointer transition-colors",
                idx === page ? "bg-primary" : "bg-foreground/30"
              )}
            />
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 w-full max-w-lg">
        {/* Left arrow */}
        <Button
          variant="icon"
          onClick={handlePrevPage}
          disabled={page === 0}
          className="p-2 rounded-full bg-background/50 hover:bg-background/70 disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Tabs value={active} onValueChange={setActive} className="flex-1 flex   flex-col">
          <TabsList className="flex gap-2 w-fit mx-auto justify-center">
            {currentPageTabs.map((item) => {
              const isActive = item.value === active;
              return (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  asChild
                >
                  <motion.button
                    className={cn(
                      "px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all",
                      isActive ? "bg-primary text-white shadow-md" : "bg-background/50 text-foreground/70"
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                  </motion.button>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {items.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              <div className="p-4 bg-card">{item.content}</div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Right arrow */}
        <Button
          variant="icon"
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className="p-2 rounded-full bg-background/50 hover:bg-background/70 disabled:opacity-40"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
