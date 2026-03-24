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
wheel-pagination.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WheelPaginationProps {
  totalPages?: number;
  className?: string;
  visibleCount?: number; // Number of pages visible at once
  onChange?: (page: number) => void;
}

export default function WheelPagination({
  totalPages = 50,
  visibleCount = 5,
  className,
  onChange,
}: WheelPaginationProps) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  const prevPage = () => setActive((p) => Math.max(p - 1, 0));
  const nextPage = () => setActive((p) => Math.min(p + 1, totalPages - 1));

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) setActive((p) => Math.max(p - 1, 0));
    else if (e.deltaY > 0) setActive((p) => Math.min(p + 1, totalPages - 1));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Determine visible pages based on active
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(visibleCount / 2);
    let start = active - half;
    let end = active + half;

    if (start < 0) {
      end += -start;
      start = 0;
    }
    if (end > totalPages - 1) {
      start -= end - (totalPages - 1);
      end = totalPages - 1;
      if (start < 0) start = 0;
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-2 p-4 select-none cursor-pointer",
        className
      )}
    >
      {/* Previous arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevPage}
        disabled={active === 0}
        className="text-gray-400 hover:text-primary disabled:opacity-40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Page numbers carousel */}
      <div className="flex gap-2">
        {visiblePages.map((p) => (
          <motion.div
            key={p}
            layout
            animate={{ scale: active === p ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full font-medium min-h-[40px]",
              active === p
                ? "bg-primary text-white border border-primary"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            )}
            onClick={() => setActive(p)}
          >
            {p + 1}
          </motion.div>
        ))}
      </div>

      {/* Next arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={nextPage}
        disabled={active === totalPages - 1}
        className="text-gray-400 hover:text-primary disabled:opacity-40 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}


code.demo.1758447586544.tsx
import WheelPagination from "@/components/ui/wheel-pagination";

export default function DemoOne() {
  const handlePageChange = (page: number) => {
    console.log("Active Page:", page + 1);
  };

  return (
      <WheelPagination
        totalPages={50}        // Total number of pages
        visibleCount={7}       // Number of pages visible at once
        className="bg-white dark:bg-gray-800"
        onChange={handlePageChange} // Callback when page changes
      />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/wheel-pagination.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WheelPaginationProps {
  totalPages?: number;
  className?: string;
  visibleCount?: number; // Number of pages visible at once
  onChange?: (page: number) => void;
}

export default function WheelPagination({
  totalPages = 50,
  visibleCount = 5,
  className,
  onChange,
}: WheelPaginationProps) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  const prevPage = () => setActive((p) => Math.max(p - 1, 0));
  const nextPage = () => setActive((p) => Math.min(p + 1, totalPages - 1));

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) setActive((p) => Math.max(p - 1, 0));
    else if (e.deltaY > 0) setActive((p) => Math.min(p + 1, totalPages - 1));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Determine visible pages based on active
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(visibleCount / 2);
    let start = active - half;
    let end = active + half;

    if (start < 0) {
      end += -start;
      start = 0;
    }
    if (end > totalPages - 1) {
      start -= end - (totalPages - 1);
      end = totalPages - 1;
      if (start < 0) start = 0;
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-2 p-4 select-none cursor-pointer",
        className
      )}
    >
      {/* Previous arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevPage}
        disabled={active === 0}
        className="text-gray-400 hover:text-primary disabled:opacity-40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Page numbers carousel */}
      <div className="flex gap-2">
        {visiblePages.map((p) => (
          <motion.div
            key={p}
            layout
            animate={{ scale: active === p ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full font-medium min-h-[40px]",
              active === p
                ? "bg-primary text-white border border-primary"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            )}
            onClick={() => setActive(p)}
          >
            {p + 1}
          </motion.div>
        ))}
      </div>

      {/* Next arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={nextPage}
        disabled={active === totalPages - 1}
        className="text-gray-400 hover:text-primary disabled:opacity-40 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
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
