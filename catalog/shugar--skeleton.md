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
skeleton.tsx
import React from "react";
import clsx from "clsx";
import { Property } from "csstype";
import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  width?: Property.Width | number;
  height?: Property.Height | number;
  boxHeight?: number;
  show?: boolean;
  pill?: boolean;
  rounded?: boolean;
  squared?: boolean;
  animated?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Skeleton = ({
  width,
  height,
  boxHeight,
  show = true,
  pill = false,
  rounded = false,
  squared = false,
  animated = true,
  children,
  className
}: SkeletonProps) => {
  return (
    <span
      className={twMerge(clsx(
        "block rounded-[5px]",
        !children && show && "bg-skeleton-gradient bg-[length:400%_100%]",
        children && show && !width && !height && "relative after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:rounded after:bg-skeleton-gradient after:bg-[length:400%_100%]",
        pill && "rounded-full after:rounded-full",
        rounded && "rounded-[50%] after:rounded-[50%]",
        squared && "rounded-none after:rounded-none",
        animated && !children && show && "animate-skeleton-loading",
        animated && children && show && "after:animate-skeleton-loading",
        className
      ))}
      style={{
        minHeight: height || 24,
        width: children ? "fit-content" : width,
        marginBottom: `calc(${(boxHeight || "100%")} - (${typeof height === "number" ? height : 0}))`
    }}
    >
      {children}
    </span>
  );
};

code.demo.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const DefaultWithSetWidth = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">Default with set width</div>
    <Skeleton width={160} />
  </div>
)

export const DefaultWithBoxHeight = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">Default with box height</div>
    <Skeleton boxHeight={42} width={160} />
  </div>
)

export const WrappingChildren = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">Wrapping children</div>
    <Skeleton>
      <Button>Hidden by skeleton</Button>
    </Skeleton>

    <Skeleton show={false}>
      <Button>Not hidden by skeleton</Button>
    </Skeleton>
  </div>
)

export const WrappingChildrenWithFixedSize = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">Wrapping children with fixed size</div>
    <Skeleton height={100} width="100%">
      {null}
    </Skeleton>

    <Skeleton height={100} width="100%">
      <Button>Not hidden by Skeleton</Button>
    </Skeleton>
  </div>
)

export const Pill = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">Pill</div>
    <Skeleton pill width={48} />
  </div>
)

export const Rounded = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">Rounded</div>
    <Skeleton boxHeight={48} height={48} rounded width={48} />
  </div>
)

export const Squared = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">Squared</div>
    <Skeleton boxHeight={48} height={48} squared width={48} />
  </div>
)

export const NoAnimation = () => (
  <div className="flex flex-col gap-4">
    <div className="font-bold text-xl dark:text-white">No animation</div>
    <Skeleton animated={false} height={100} width="100%">
      {null}
    </Skeleton>
  </div>
);
```

Copy-paste these files for dependencies:
```tsx
/components/ui/skeleton.tsx
import React from "react";
import clsx from "clsx";
import { Property } from "csstype";
import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  width?: Property.Width | number;
  height?: Property.Height | number;
  boxHeight?: number;
  show?: boolean;
  pill?: boolean;
  rounded?: boolean;
  squared?: boolean;
  animated?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Skeleton = ({
  width,
  height,
  boxHeight,
  show = true,
  pill = false,
  rounded = false,
  squared = false,
  animated = true,
  children,
  className
}: SkeletonProps) => {
  return (
    <span
      className={twMerge(clsx(
        "block rounded-[5px]",
        !children && show && "bg-skeleton-gradient bg-[length:400%_100%]",
        children && show && !width && !height && "relative after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:rounded after:bg-skeleton-gradient after:bg-[length:400%_100%]",
        pill && "rounded-full after:rounded-full",
        rounded && "rounded-[50%] after:rounded-[50%]",
        squared && "rounded-none after:rounded-none",
        animated && !children && show && "animate-skeleton-loading",
        animated && children && show && "after:animate-skeleton-loading",
        className
      ))}
      style={{
        minHeight: height || 24,
        width: children ? "fit-content" : width,
        marginBottom: `calc(${(boxHeight || "100%")} - (${typeof height === "number" ? height : 0}))`
    }}
    >
      {children}
    </span>
  );
};
```

Install NPM dependencies:
```bash
clsx, csstype, tailwind-merge
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {},
      "backgroundImage": {
        "skeleton-gradient": "linear-gradient(270deg, var(--accents-1), var(--accents-2), var(--accents-2), var(--accents-1))"
      },
      "animation": {
        "skeleton-loading": "skeletonLoading 8s infinite ease-in-out"
      },
      "keyframes": {
        "skeletonLoading": {
          "0%": {
            "backgroundPosition": "200% 0"
          },
          "100%": {
            "backgroundPosition": "-200% 0"
          }
        }
      }
    }
  }
}
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
