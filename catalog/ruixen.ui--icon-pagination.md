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
icon-pagination.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface IconPaginationProps {
  totalPages?: number;
  className?: string;
  maxVisible?: number; // max icons to show around active
  onChange?: (page: number) => void; // callback for active page
}

export default function IconPagination({
  totalPages = 200,
  className,
  maxVisible = 5,
  onChange,
}: IconPaginationProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  const prevPage = () => setActive((p) => Math.max(p - 1, 0));
  const nextPage = () => setActive((p) => Math.min(p + 1, totalPages - 1));

  // Generate default icons (colored squares for demo)
  const getIconItem = (id: number) => ({
    id,
    icon: () => (
      <div
        className={cn(
          "w-5 h-5 rounded",
          id % 5 === 0
            ? "bg-red-400"
            : id % 5 === 1
            ? "bg-green-400"
            : id % 5 === 2
            ? "bg-blue-400"
            : id % 5 === 3
            ? "bg-yellow-400"
            : "bg-purple-400"
        )}
      />
    ),
    label: `Page ${id + 1}`,
  });

  // Determine visible pages
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(active - half, 1);
    let end = Math.min(active + half, totalPages - 2);

    if (active - half <= 1) end = maxVisible - 1;
    if (active + half >= totalPages - 2) start = totalPages - maxVisible;

    start = Math.max(start, 1);
    end = Math.min(end, totalPages - 2);

    pages.push(0); // first page
    if (start > 1) pages.push(-1); // ellipsis

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 2) pages.push(-1); // ellipsis
    if (totalPages > 1) pages.push(totalPages - 1); // last page

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn("flex items-center gap-2 p-4 flex-wrap", className)}>
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

      <TooltipProvider delayDuration={100}>
        {visiblePages.map((p, idx) =>
          p === -1 ? (
            <div key={`dots-${idx}`} className="w-6 h-6 flex items-center justify-center text-gray-400 select-none">
              ...
            </div>
          ) : (
            <Tooltip key={p}>
              <TooltipTrigger asChild>
                <Button
                  variant={active === p ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActive(p)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-transform",
                    active === p
                      ? "scale-110 bg-primary text-white border border-primary"
                      : "bg-gray-200 dark:bg-gray-700"
                  )}
                >
                  {getIconItem(p).icon({})}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {getIconItem(p).label}
              </TooltipContent>
            </Tooltip>
          )
        )}
      </TooltipProvider>

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


code.demo.1758446482274.tsx
import IconPagination from "@/components/ui/icon-pagination";

export default function DemoOne() {
  return <IconPagination />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/icon-pagination.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface IconPaginationProps {
  totalPages?: number;
  className?: string;
  maxVisible?: number; // max icons to show around active
  onChange?: (page: number) => void; // callback for active page
}

export default function IconPagination({
  totalPages = 200,
  className,
  maxVisible = 5,
  onChange,
}: IconPaginationProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (onChange) onChange(active);
  }, [active, onChange]);

  const prevPage = () => setActive((p) => Math.max(p - 1, 0));
  const nextPage = () => setActive((p) => Math.min(p + 1, totalPages - 1));

  // Generate default icons (colored squares for demo)
  const getIconItem = (id: number) => ({
    id,
    icon: () => (
      <div
        className={cn(
          "w-5 h-5 rounded",
          id % 5 === 0
            ? "bg-red-400"
            : id % 5 === 1
            ? "bg-green-400"
            : id % 5 === 2
            ? "bg-blue-400"
            : id % 5 === 3
            ? "bg-yellow-400"
            : "bg-purple-400"
        )}
      />
    ),
    label: `Page ${id + 1}`,
  });

  // Determine visible pages
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(active - half, 1);
    let end = Math.min(active + half, totalPages - 2);

    if (active - half <= 1) end = maxVisible - 1;
    if (active + half >= totalPages - 2) start = totalPages - maxVisible;

    start = Math.max(start, 1);
    end = Math.min(end, totalPages - 2);

    pages.push(0); // first page
    if (start > 1) pages.push(-1); // ellipsis

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 2) pages.push(-1); // ellipsis
    if (totalPages > 1) pages.push(totalPages - 1); // last page

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn("flex items-center gap-2 p-4 flex-wrap", className)}>
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

      <TooltipProvider delayDuration={100}>
        {visiblePages.map((p, idx) =>
          p === -1 ? (
            <div key={`dots-${idx}`} className="w-6 h-6 flex items-center justify-center text-gray-400 select-none">
              ...
            </div>
          ) : (
            <Tooltip key={p}>
              <TooltipTrigger asChild>
                <Button
                  variant={active === p ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActive(p)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-transform",
                    active === p
                      ? "scale-110 bg-primary text-white border border-primary"
                      : "bg-gray-200 dark:bg-gray-700"
                  )}
                >
                  {getIconItem(p).icon({})}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {getIconItem(p).label}
              </TooltipContent>
            </Tooltip>
          )
        )}
      </TooltipProvider>

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
lucide-react
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
