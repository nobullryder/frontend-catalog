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
avatar-2.tsx
import * as React from "react";

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

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  size?: "x-large" | "large" | "medium" | "small" | "x-small";
  children?: React.ReactNode;
  image?: string;
  square?: boolean;
  className?: string;
}

export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  function Component(
    {
      variant = "brand",
      size = "medium",
      children,
      image,
      square = false,
      className,
      ...otherProps
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        {...otherProps}
        className={SubframeUtils.twClassNames(
          "group/bec25ae6 relative flex h-8 w-8 flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100",
          {
            "rounded-md": square,
            "h-5 w-5": size === "x-small",
            "h-6 w-6": size === "small",
            "h-12 w-12": size === "large",
            "h-16 w-16": size === "x-large",
            "bg-warning-100": variant === "warning",
            "bg-success-100": variant === "success",
            "bg-error-100": variant === "error",
            "bg-neutral-100": variant === "neutral",
          },
          className
        )}
      >
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "absolute line-clamp-1 w-full text-center font-['Inter'] text-[14px] font-[500] leading-[14px] text-brand-800",
              {
                "text-[10px] leading-[10px]":
                  size === "x-small" || size === "small",
                "text-[18px] leading-[18px]": size === "large",
                "text-[24px] leading-[24px]": size === "x-large",
                "text-warning-800": variant === "warning",
                "text-success-800": variant === "success",
                "text-error-800": variant === "error",
                "text-neutral-800": variant === "neutral",
              }
            )}
          >
            {children}
          </span>
        ) : null}

        {image ? (
          <img
            src={image}
            alt=""
            className={SubframeUtils.twClassNames(
              "absolute h-8 w-8 flex-none object-cover",
              {
                "h-5 w-5": size === "x-small",
                "h-6 w-6": size === "small",
                "h-12 w-12": size === "large",
                "h-16 w-16": size === "x-large",
              }
            )}
          />
        ) : null}
      </div>
    );
  }
);

// Named + default export
export default Component;


code.demo.1755901526912.tsx
// Mixed avatars (image + text)

import Component from "@/components/ui/avatar-2";

export default function AvatarMixed() {
  return (
    <div className="flex items-center gap-4">
      <Component
        size="x-large"
        variant="neutral"
        square
        image="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop"
      />
      <Component
        size="medium"
        variant="warning"
        image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop"
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar-2.tsx
import * as React from "react";

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

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  size?: "x-large" | "large" | "medium" | "small" | "x-small";
  children?: React.ReactNode;
  image?: string;
  square?: boolean;
  className?: string;
}

export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  function Component(
    {
      variant = "brand",
      size = "medium",
      children,
      image,
      square = false,
      className,
      ...otherProps
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        {...otherProps}
        className={SubframeUtils.twClassNames(
          "group/bec25ae6 relative flex h-8 w-8 flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100",
          {
            "rounded-md": square,
            "h-5 w-5": size === "x-small",
            "h-6 w-6": size === "small",
            "h-12 w-12": size === "large",
            "h-16 w-16": size === "x-large",
            "bg-warning-100": variant === "warning",
            "bg-success-100": variant === "success",
            "bg-error-100": variant === "error",
            "bg-neutral-100": variant === "neutral",
          },
          className
        )}
      >
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "absolute line-clamp-1 w-full text-center font-['Inter'] text-[14px] font-[500] leading-[14px] text-brand-800",
              {
                "text-[10px] leading-[10px]":
                  size === "x-small" || size === "small",
                "text-[18px] leading-[18px]": size === "large",
                "text-[24px] leading-[24px]": size === "x-large",
                "text-warning-800": variant === "warning",
                "text-success-800": variant === "success",
                "text-error-800": variant === "error",
                "text-neutral-800": variant === "neutral",
              }
            )}
          >
            {children}
          </span>
        ) : null}

        {image ? (
          <img
            src={image}
            alt=""
            className={SubframeUtils.twClassNames(
              "absolute h-8 w-8 flex-none object-cover",
              {
                "h-5 w-5": size === "x-small",
                "h-6 w-6": size === "small",
                "h-12 w-12": size === "large",
                "h-16 w-16": size === "x-large",
              }
            )}
          />
        ) : null}
      </div>
    );
  }
);

// Named + default export
export default Component;

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
