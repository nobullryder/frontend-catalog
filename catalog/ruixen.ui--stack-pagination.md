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
stack-pagination.tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Page {
  number: number
  content: React.ReactNode
}

interface StackPaginationProps {
  totalPages?: number
  visibleCount?: number
  className?: string
}

export default function StackPagination({
  totalPages = 20,
  visibleCount = 5,
  className,
}: StackPaginationProps) {
  const [activePage, setActivePage] = React.useState(1)
  const [flipped, setFlipped] = React.useState<number | null>(null)

  // Build a visible range with dots like standard pagination
  const getVisiblePages = () => {
    const pages: (number | "...")[] = []

    if (totalPages <= visibleCount + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const left = Math.max(2, activePage - 1)
    const right = Math.min(totalPages - 1, activePage + 1)

    pages.push(1)

    if (left > 2) pages.push("...")

    for (let i = left; i <= right; i++) {
      pages.push(i)
    }

    if (right < totalPages - 1) pages.push("...")

    pages.push(totalPages)

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 py-10", className)}>
      {/* 3D Stack of visible cards */}
      <div className="relative flex gap-4 perspective-[1200px]">
        {visiblePages.map((page, i) =>
          page === "..." ? (
            <div
              key={`dots-${i}`}
              className="flex items-center justify-center w-16 h-24 text-muted-foreground"
            >
              ...
            </div>
          ) : (
            <motion.div
              key={page}
              className="relative w-24 h-36 cursor-pointer"
              initial={{ rotateY: 0, z: 0 }}
              whileHover={{
                z: 40,
                rotateY: flipped === page ? 180 : 0,
              }}
              animate={{
                rotateY: flipped === page ? 180 : 0,
                z: activePage === page ? 30 : -i * 5,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setFlipped(flipped === page ? null : page)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <Card
                className={cn(
                  "absolute w-full h-full backface-hidden flex items-center justify-center",
                  activePage === page
                    ? "border-primary shadow-lg"
                    : "border-muted"
                )}
                onClick={() => setActivePage(page)}
              >
                <CardContent className="flex items-center justify-center text-lg font-semibold">
                  {page}
                </CardContent>
              </Card>

              {/* Back */}
              <Card className="absolute w-full h-full rotate-y-180 backface-hidden flex items-center justify-center bg-muted/30">
                <CardContent className="text-sm flex flex-col items-center gap-6">
                  <span>Page</span>
                  <span>Content</span>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={activePage === 1}
          onClick={() => {
            setActivePage((p) => Math.max(1, p - 1))
            setFlipped(null)
          }}
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={activePage === totalPages}
          onClick={() => {
            setActivePage((p) => Math.min(totalPages, p + 1))
            setFlipped(null)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}


code.demo.1758432573279.tsx
import StackPagination from "@/components/ui/stack-pagination";

export default function DemoOne() {
  return <StackPagination />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stack-pagination.tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Page {
  number: number
  content: React.ReactNode
}

interface StackPaginationProps {
  totalPages?: number
  visibleCount?: number
  className?: string
}

export default function StackPagination({
  totalPages = 20,
  visibleCount = 5,
  className,
}: StackPaginationProps) {
  const [activePage, setActivePage] = React.useState(1)
  const [flipped, setFlipped] = React.useState<number | null>(null)

  // Build a visible range with dots like standard pagination
  const getVisiblePages = () => {
    const pages: (number | "...")[] = []

    if (totalPages <= visibleCount + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const left = Math.max(2, activePage - 1)
    const right = Math.min(totalPages - 1, activePage + 1)

    pages.push(1)

    if (left > 2) pages.push("...")

    for (let i = left; i <= right; i++) {
      pages.push(i)
    }

    if (right < totalPages - 1) pages.push("...")

    pages.push(totalPages)

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 py-10", className)}>
      {/* 3D Stack of visible cards */}
      <div className="relative flex gap-4 perspective-[1200px]">
        {visiblePages.map((page, i) =>
          page === "..." ? (
            <div
              key={`dots-${i}`}
              className="flex items-center justify-center w-16 h-24 text-muted-foreground"
            >
              ...
            </div>
          ) : (
            <motion.div
              key={page}
              className="relative w-24 h-36 cursor-pointer"
              initial={{ rotateY: 0, z: 0 }}
              whileHover={{
                z: 40,
                rotateY: flipped === page ? 180 : 0,
              }}
              animate={{
                rotateY: flipped === page ? 180 : 0,
                z: activePage === page ? 30 : -i * 5,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setFlipped(flipped === page ? null : page)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <Card
                className={cn(
                  "absolute w-full h-full backface-hidden flex items-center justify-center",
                  activePage === page
                    ? "border-primary shadow-lg"
                    : "border-muted"
                )}
                onClick={() => setActivePage(page)}
              >
                <CardContent className="flex items-center justify-center text-lg font-semibold">
                  {page}
                </CardContent>
              </Card>

              {/* Back */}
              <Card className="absolute w-full h-full rotate-y-180 backface-hidden flex items-center justify-center bg-muted/30">
                <CardContent className="text-sm flex flex-col items-center gap-6">
                  <span>Page</span>
                  <span>Content</span>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={activePage === 1}
          onClick={() => {
            setActivePage((p) => Math.max(1, p - 1))
            setFlipped(null)
          }}
        >
          Prev
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={activePage === totalPages}
          onClick={() => {
            setActivePage((p) => Math.min(totalPages, p + 1))
            setFlipped(null)
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
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
