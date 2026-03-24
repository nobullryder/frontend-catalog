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
pagination.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const paginationVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "gap-1",
      compact: "gap-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const paginationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default:
          "rounded-ele h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        outline:
          "rounded-ele h-9 w-9 border border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        ghost:
          "rounded-ele h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
      },
      size: {
        default: "h-9 w-9",
        sm: "h-8 w-8 text-xs",
        lg: "h-10 w-10",
      },
      state: {
        default: "",
        active:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus-visible:ring-ring",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

const paginationNavVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-ele px-3 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8 text-xs px-2",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {}

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {
  isActive?: boolean;
}

export interface PaginationNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationNavVariants> {}

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, variant, ...props }, ref) => (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(paginationVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
);
Pagination.displayName = "Pagination";

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, variant, size, state, isActive, ...props }, ref) => (
    <button
      className={cn(
        paginationItemVariants({
          variant,
          size,
          state: isActive ? "active" : state,
          className,
        })
      )}
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      {...props}
    />
  )
);
PaginationItem.displayName = "PaginationItem";

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationNavProps
>(({ className, size, children, ...props }, ref) => (
  <button
    className={cn(paginationNavVariants({ size, className }))}
    ref={ref}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    {children || "Previous"}
  </button>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNavProps>(
  ({ className, size, children, ...props }, ref) => (
    <button
      className={cn(paginationNavVariants({ size, className }))}
      ref={ref}
      {...props}
    >
      {children || "Next"}
      <ChevronRight className="h-4 w-4" />
    </button>
  )
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    className={cn(
      "inline-flex items-center justify-center h-9 w-9 text-muted-foreground",
      className
    )}
    ref={ref}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
  paginationItemVariants,
  paginationNavVariants,
};

code.demo.1753352338179.tsx
import { Pagination, PaginationPrevious, PaginationItem, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import React, { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export default function DemoOne() { 
  const [currentPage, setCurrentPage] = React.useState(5);

  const totalPages = 20;
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 768px)");     
  
  const getVisiblePages = () => {

    const delta = isMobile ? 1 : isTablet ? 1 : 2;
    const rangeWithDots = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    rangeWithDots.push(1);
    
    let startPage = Math.max(2, currentPage - delta);
    let endPage = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage === 1) {
      endPage = Math.min(totalPages - 1, 1 + (delta * 2));
    } else if (currentPage === totalPages) {
      startPage = Math.max(2, totalPages - (delta * 2));
    } else {
      startPage = Math.max(2, Math.min(startPage, currentPage));
      endPage = Math.min(totalPages - 1, Math.max(endPage, currentPage));
    }

    if (startPage > 2) {
      rangeWithDots.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      rangeWithDots.push("...");
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };

  return(
    <>
      <div className="w-full overflow-x-auto">
          <Pagination className="flex-wrap min-w-fit">
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              size={isMobile ? "sm" : "default"}
            >
              {isMobile ? "Prev" : "Previous"}
            </PaginationPrevious>
            {getVisiblePages().map((page, index) =>
              page === "..." ? (
                <PaginationEllipsis key={`ellipsis-${index}`} />
              ) : (
                <PaginationItem
                  key={page}
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page as number)}
                  size={isMobile ? "sm" : "default"}
                >
                  {page}
                </PaginationItem>
              ),
            )}
            <PaginationNext
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              size={isMobile ? "sm" : "default"}
            >
              {isMobile ? "Next" : "Next"}
            </PaginationNext>
          </Pagination>
        </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pagination.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const paginationVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "gap-1",
      compact: "gap-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const paginationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default:
          "rounded-ele h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        outline:
          "rounded-ele h-9 w-9 border border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        ghost:
          "rounded-ele h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
      },
      size: {
        default: "h-9 w-9",
        sm: "h-8 w-8 text-xs",
        lg: "h-10 w-10",
      },
      state: {
        default: "",
        active:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus-visible:ring-ring",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

const paginationNavVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-ele px-3 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8 text-xs px-2",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {}

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {
  isActive?: boolean;
}

export interface PaginationNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationNavVariants> {}

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, variant, ...props }, ref) => (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(paginationVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
);
Pagination.displayName = "Pagination";

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, variant, size, state, isActive, ...props }, ref) => (
    <button
      className={cn(
        paginationItemVariants({
          variant,
          size,
          state: isActive ? "active" : state,
          className,
        })
      )}
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      {...props}
    />
  )
);
PaginationItem.displayName = "PaginationItem";

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationNavProps
>(({ className, size, children, ...props }, ref) => (
  <button
    className={cn(paginationNavVariants({ size, className }))}
    ref={ref}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    {children || "Previous"}
  </button>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNavProps>(
  ({ className, size, children, ...props }, ref) => (
    <button
      className={cn(paginationNavVariants({ size, className }))}
      ref={ref}
      {...props}
    >
      {children || "Next"}
      <ChevronRight className="h-4 w-4" />
    </button>
  )
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    className={cn(
      "inline-flex items-center justify-center h-9 w-9 text-muted-foreground",
      className
    )}
    ref={ref}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
  paginationItemVariants,
  paginationNavVariants,
};
```

Install NPM dependencies:
```bash
class-variance-authority, lucide-react
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
