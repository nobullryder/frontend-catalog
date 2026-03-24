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
breadcrumb.tsx
"use client";

import * as React from "react";
import { FeatherChevronRight } from "@subframe/core";

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

/* ---------- Item ---------- */

export interface ItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}

const Item = React.forwardRef<HTMLSpanElement, ItemProps>(function Item(
  { children, active = false, className, ...otherProps },
  ref
) {
  return children ? (
    <span
      ref={ref}
      {...otherProps}
      className={SubframeUtils.twClassNames(
        "group/bbdc1640 line-clamp-1 cursor-pointer break-words text-body font-body text-subtext-color hover:text-default-font",
        { "text-default-font": active },
        className
      )}
    >
      {children}
    </span>
  ) : null;
});

/* ---------- Divider ---------- */

export interface DividerProps
  extends React.ComponentProps<typeof FeatherChevronRight> {
  className?: string;
}

const Divider = React.forwardRef<
  React.ElementRef<typeof FeatherChevronRight>,
  DividerProps
>(function Divider({ className, ...otherProps }, ref) {
  return (
    <FeatherChevronRight
      ref={ref}
      {...otherProps}
      className={SubframeUtils.twClassNames(
        "text-body font-body text-subtext-color",
        className
      )}
    />
  );
});

/* ---------- Root ---------- */

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, ComponentProps>(function Component(
  { children, className, ...otherProps },
  ref
) {
  return children ? (
    <div
      ref={ref}
      {...otherProps}
      className={SubframeUtils.twClassNames("flex items-center gap-2", className)}
    >
      {children}
    </div>
  ) : null;
});

/* ---------- Compound export (named + default) ---------- */

export const Component = Object.assign(Root, { Item, Divider });
export default Component;


code.demo.1755898058614.tsx
import Component from "@/components/ui/breadcrumb";

export default function BreadcrumbsBasic() {
  return (
    <Component>
      <Component.Item>Home</Component.Item>
      <Component.Divider />
      <Component.Item>Library</Component.Item>
      <Component.Divider />
      <Component.Item active>Data</Component.Item>
    </Component>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/breadcrumb.tsx
"use client";

import * as React from "react";
import { FeatherChevronRight } from "@subframe/core";

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

/* ---------- Item ---------- */

export interface ItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
}

const Item = React.forwardRef<HTMLSpanElement, ItemProps>(function Item(
  { children, active = false, className, ...otherProps },
  ref
) {
  return children ? (
    <span
      ref={ref}
      {...otherProps}
      className={SubframeUtils.twClassNames(
        "group/bbdc1640 line-clamp-1 cursor-pointer break-words text-body font-body text-subtext-color hover:text-default-font",
        { "text-default-font": active },
        className
      )}
    >
      {children}
    </span>
  ) : null;
});

/* ---------- Divider ---------- */

export interface DividerProps
  extends React.ComponentProps<typeof FeatherChevronRight> {
  className?: string;
}

const Divider = React.forwardRef<
  React.ElementRef<typeof FeatherChevronRight>,
  DividerProps
>(function Divider({ className, ...otherProps }, ref) {
  return (
    <FeatherChevronRight
      ref={ref}
      {...otherProps}
      className={SubframeUtils.twClassNames(
        "text-body font-body text-subtext-color",
        className
      )}
    />
  );
});

/* ---------- Root ---------- */

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Root = React.forwardRef<HTMLDivElement, ComponentProps>(function Component(
  { children, className, ...otherProps },
  ref
) {
  return children ? (
    <div
      ref={ref}
      {...otherProps}
      className={SubframeUtils.twClassNames("flex items-center gap-2", className)}
    >
      {children}
    </div>
  ) : null;
});

/* ---------- Compound export (named + default) ---------- */

export const Component = Object.assign(Root, { Item, Divider });
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
