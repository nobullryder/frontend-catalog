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
gooey-pagination.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GooeyPaginationProps {
  totalPages?: number;
  className?: string;
}

export default function GooeyPagination({
  totalPages = 7,
  className,
}: GooeyPaginationProps) {
  const [active, setActive] = useState(0);

  const prevPage = () => setActive((prev) => (prev > 0 ? prev - 1 : prev));
  const nextPage = () =>
    setActive((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-6 p-4 relative",
        className
      )}
    >
      {/* SVG gooey filter */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

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

      {/* Page dots */}
      <div className="flex gap-4 relative" style={{ filter: "url(#goo)" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setActive(i)}
            className="relative w-6 h-6 flex items-center justify-center"
          >
            <AnimatePresence>
              {active === i && (
                <motion.div
                  layoutId="active-dot"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute w-6 h-6 rounded-full bg-primary/70"
                />
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 transition-colors"
            />
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


code.demo.1758433361654.tsx
import GooeyPagination from "@/components/ui/gooey-pagination";

export default function DemoOne() {
  return <GooeyPagination />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/gooey-pagination.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GooeyPaginationProps {
  totalPages?: number;
  className?: string;
}

export default function GooeyPagination({
  totalPages = 7,
  className,
}: GooeyPaginationProps) {
  const [active, setActive] = useState(0);

  const prevPage = () => setActive((prev) => (prev > 0 ? prev - 1 : prev));
  const nextPage = () =>
    setActive((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-6 p-4 relative",
        className
      )}
    >
      {/* SVG gooey filter */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

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

      {/* Page dots */}
      <div className="flex gap-4 relative" style={{ filter: "url(#goo)" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setActive(i)}
            className="relative w-6 h-6 flex items-center justify-center"
          >
            <AnimatePresence>
              {active === i && (
                <motion.div
                  layoutId="active-dot"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute w-6 h-6 rounded-full bg-primary/70"
                />
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 transition-colors"
            />
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
framer-motion, lucide-react
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
