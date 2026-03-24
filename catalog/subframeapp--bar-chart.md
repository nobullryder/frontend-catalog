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
bar-chart.tsx
"use client";

import * as React from "react";
import * as SubframeCore from "@subframe/core";

/**
 * IMPORTANT: Local SubframeUtils lives INSIDE this component file.
 * Provides createTwClassNames() and twClassNames instance.
 */
namespace SubframeUtils {
  export type ClassValue =
    | string
    | null
    | undefined
    | false
    | Record<string, boolean>;

  export function createTwClassNames() {
    return (...classes: ClassValue[]) =>
      classes
        .flatMap((c) => {
          if (!c) return [];
          if (typeof c === "string") return [c];
          return Object.entries(c)
            .filter(([, ok]) => !!ok)
            .map(([k]) => k);
        })
        .join(" ");
  }

  export const twClassNames = createTwClassNames();
}

export interface ComponentProps
  extends React.ComponentProps<typeof SubframeCore.BarChart> {
  stacked?: boolean;
  className?: string;
}

export const Component = React.forwardRef<
  React.ElementRef<typeof SubframeCore.BarChart>,
  ComponentProps
>(function Component({ stacked = false, className, ...otherProps }, ref) {
  return (
    <SubframeCore.BarChart
      ref={ref}
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      stacked={stacked}
      colors={["#0c6d62", "#083932", "#12a594", "#09443c", "#10b3a3", "#0b544a"]}
      dark
      {...otherProps}
    />
  );
});

// Named + default export
export default Component;


code.demo.1755897555243.tsx
import Component from "@/components/ui/bar-chart";

export default function BarChartBasic() {
  return (
    <Component
      data={[
        { name: "Mon", seriesA: 12, seriesB: 8 },
        { name: "Tue", seriesA: 18, seriesB: 5 },
        { name: "Wed", seriesA: 10, seriesB: 12 },
        { name: "Thu", seriesA: 16, seriesB: 7 },
        { name: "Fri", seriesA: 20, seriesB: 9 },
      ]}
      categories={["seriesA", "seriesB"]}
      index="name"
    />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bar-chart.tsx
"use client";

import * as React from "react";
import * as SubframeCore from "@subframe/core";

/**
 * IMPORTANT: Local SubframeUtils lives INSIDE this component file.
 * Provides createTwClassNames() and twClassNames instance.
 */
namespace SubframeUtils {
  export type ClassValue =
    | string
    | null
    | undefined
    | false
    | Record<string, boolean>;

  export function createTwClassNames() {
    return (...classes: ClassValue[]) =>
      classes
        .flatMap((c) => {
          if (!c) return [];
          if (typeof c === "string") return [c];
          return Object.entries(c)
            .filter(([, ok]) => !!ok)
            .map(([k]) => k);
        })
        .join(" ");
  }

  export const twClassNames = createTwClassNames();
}

export interface ComponentProps
  extends React.ComponentProps<typeof SubframeCore.BarChart> {
  stacked?: boolean;
  className?: string;
}

export const Component = React.forwardRef<
  React.ElementRef<typeof SubframeCore.BarChart>,
  ComponentProps
>(function Component({ stacked = false, className, ...otherProps }, ref) {
  return (
    <SubframeCore.BarChart
      ref={ref}
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      stacked={stacked}
      colors={["#0c6d62", "#083932", "#12a594", "#09443c", "#10b3a3", "#0b544a"]}
      dark
      {...otherProps}
    />
  );
});

// Named + default export
export default Component;

```

Install NPM dependencies:
```bash
@subframe/core
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
