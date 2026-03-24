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
use-item-overflow.tsx
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

interface UseOverflowOptions {
  /** Total number of items to manage */
  total: number;
  /** Maximum number of items to show (optional) */
  max?: number;
  /** Gap between items in pixels */
  gap?: number;
}

export function useOverflow({
  total,
  max = Infinity,
  gap = 8,
}: UseOverflowOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(total);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.getBoundingClientRect().width;
    const items = itemsRef.current.filter(
      (item): item is HTMLElement => item !== null
    );

    if (items.length === 0) {
      setVisibleCount(0);
      return;
    }

    // Get the width of the last item (will be our "more" indicator)
    const moreItemWidth = items[items.length - 1].getBoundingClientRect().width;

    let totalWidth = 0;
    let count = 0;

    // Calculate how many items we can fit
    for (let i = 0; i < Math.min(items.length - 1, max); i++) {
      const itemWidth = items[i].getBoundingClientRect().width;

      if (totalWidth + itemWidth + gap <= containerWidth) {
        totalWidth += itemWidth + gap;
        count++;
      } else {
        break;
      }
    }

    // If we need to show the "more" indicator, make sure we have space for it
    if (count < total) {
      while (count > 0 && totalWidth + moreItemWidth + gap > containerWidth) {
        const itemWidth = items[count - 1].getBoundingClientRect().width;
        totalWidth -= itemWidth + gap;
        count--;
      }
    }

    setVisibleCount(count);
  }, [total, max, gap]);

  // Measure on mount and when dependencies change
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Measure on resize
  useResizeObserver({
    ref: containerRef,
    onResize: measure,
  });

  const registerItem = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      itemsRef.current[index] = element;
    },
    []
  );

  return {
    containerRef,
    registerItem,
    visibleCount,
    hiddenCount: Math.max(0, total - visibleCount),
    isVisible: (index: number) => index < visibleCount,
  };
}


code.demo.1737989666654.tsx
import { useOverflow } from "@/hooks/use-item-overflow";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function OverflowDemo() {
  const [items, setItems] = useState(() =>
    Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`)
  );

  const [maxItems, setMaxItems] = useState(Infinity);

  const { containerRef, registerItem, isVisible, hiddenCount } = useOverflow({
    total: items.length,
    max: maxItems,
    gap: 8,
  });

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            setItems((prev) => [...prev, `Item ${prev.length + 1}`])
          }
        >
          Add Item
        </Button>

        <Button
          variant="outline"
          onClick={() => setItems((prev) => prev.slice(0, -1))}
          disabled={items.length === 0}
        >
          Remove Item
        </Button>

        <Button
          variant="outline"
          onClick={() => setMaxItems((prev) => (prev === 3 ? Infinity : 3))}
        >
          {maxItems === Infinity ? "Limit to 3" : "Remove Limit"}
        </Button>
      </div>

      <div className="w-[500px] border rounded-lg p-4">
        <div ref={containerRef} className="flex gap-2 flex-wrap">
          {items.map((item, index) => (
            <Button
              key={index}
              ref={registerItem(index)}
              size="sm"
              variant="secondary"
              className="transition-opacity duration-200"
              style={{
                opacity: isVisible(index) ? 1 : 0,
                pointerEvents: isVisible(index) ? "auto" : "none",
                position: isVisible(index) ? "relative" : "absolute",
              }}
            >
              {item}
            </Button>
          ))}

          {hiddenCount > 0 && (
            <Button
              ref={registerItem(items.length)}
              size="sm"
              variant="outline"
            >
              +{hiddenCount} more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { OverflowDemo };

```

Copy-paste these files for dependencies:
```tsx
/components/hooks/use-item-overflow.tsx
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

interface UseOverflowOptions {
  /** Total number of items to manage */
  total: number;
  /** Maximum number of items to show (optional) */
  max?: number;
  /** Gap between items in pixels */
  gap?: number;
}

export function useOverflow({
  total,
  max = Infinity,
  gap = 8,
}: UseOverflowOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(total);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.getBoundingClientRect().width;
    const items = itemsRef.current.filter(
      (item): item is HTMLElement => item !== null
    );

    if (items.length === 0) {
      setVisibleCount(0);
      return;
    }

    // Get the width of the last item (will be our "more" indicator)
    const moreItemWidth = items[items.length - 1].getBoundingClientRect().width;

    let totalWidth = 0;
    let count = 0;

    // Calculate how many items we can fit
    for (let i = 0; i < Math.min(items.length - 1, max); i++) {
      const itemWidth = items[i].getBoundingClientRect().width;

      if (totalWidth + itemWidth + gap <= containerWidth) {
        totalWidth += itemWidth + gap;
        count++;
      } else {
        break;
      }
    }

    // If we need to show the "more" indicator, make sure we have space for it
    if (count < total) {
      while (count > 0 && totalWidth + moreItemWidth + gap > containerWidth) {
        const itemWidth = items[count - 1].getBoundingClientRect().width;
        totalWidth -= itemWidth + gap;
        count--;
      }
    }

    setVisibleCount(count);
  }, [total, max, gap]);

  // Measure on mount and when dependencies change
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Measure on resize
  useResizeObserver({
    ref: containerRef,
    onResize: measure,
  });

  const registerItem = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      itemsRef.current[index] = element;
    },
    []
  );

  return {
    containerRef,
    registerItem,
    visibleCount,
    hiddenCount: Math.max(0, total - visibleCount),
    isVisible: (index: number) => index < visibleCount,
  };
}

```
```tsx
/hooks/use-item-overflow.tsx
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

interface UseOverflowOptions {
  /** Total number of items to manage */
  total: number;
  /** Maximum number of items to show (optional) */
  max?: number;
  /** Gap between items in pixels */
  gap?: number;
}

export function useOverflow({
  total,
  max = Infinity,
  gap = 8,
}: UseOverflowOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(total);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.getBoundingClientRect().width;
    const items = itemsRef.current.filter(
      (item): item is HTMLElement => item !== null
    );

    if (items.length === 0) {
      setVisibleCount(0);
      return;
    }

    // Get the width of the last item (will be our "more" indicator)
    const moreItemWidth = items[items.length - 1].getBoundingClientRect().width;

    let totalWidth = 0;
    let count = 0;

    // Calculate how many items we can fit
    for (let i = 0; i < Math.min(items.length - 1, max); i++) {
      const itemWidth = items[i].getBoundingClientRect().width;

      if (totalWidth + itemWidth + gap <= containerWidth) {
        totalWidth += itemWidth + gap;
        count++;
      } else {
        break;
      }
    }

    // If we need to show the "more" indicator, make sure we have space for it
    if (count < total) {
      while (count > 0 && totalWidth + moreItemWidth + gap > containerWidth) {
        const itemWidth = items[count - 1].getBoundingClientRect().width;
        totalWidth -= itemWidth + gap;
        count--;
      }
    }

    setVisibleCount(count);
  }, [total, max, gap]);

  // Measure on mount and when dependencies change
  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Measure on resize
  useResizeObserver({
    ref: containerRef,
    onResize: measure,
  });

  const registerItem = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      itemsRef.current[index] = element;
    },
    []
  );

  return {
    containerRef,
    registerItem,
    visibleCount,
    hiddenCount: Math.max(0, total - visibleCount),
    isVisible: (index: number) => index < visibleCount,
  };
}

```

Install NPM dependencies:
```bash
usehooks-ts
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
