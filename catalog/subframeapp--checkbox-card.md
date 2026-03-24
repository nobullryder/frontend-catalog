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
checkbox-card.tsx
"use client";

import * as React from "react";
import * as SubframeCore from "@subframe/core";
import { FeatherCheck } from "@subframe/core";

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

/* -------------------- Types -------------------- */

export interface ComponentProps
  extends React.ComponentProps<typeof SubframeCore.Checkbox.Root> {
  hideCheckbox?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/* -------------------- Component -------------------- */

export const Component = React.forwardRef<HTMLButtonElement, ComponentProps>(
  function Component(
    { hideCheckbox = false, children, className, ...otherProps },
    ref
  ) {
    return (
      <SubframeCore.Checkbox.Root asChild {...otherProps}>
        <button
          ref={ref}
          className={SubframeUtils.twClassNames(
            // card base
            "group inline-flex w-full cursor-pointer items-center gap-4 rounded-md border p-4 text-left transition-colors",
            // light
            "border-zinc-300 bg-white hover:bg-zinc-50",
            // dark
            "dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800",
            // focus
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
            // checked state accent
            "aria-[checked=true]:border-indigo-300 aria-[checked=true]:bg-indigo-50",
            "dark:aria-[checked=true]:border-indigo-600/50 dark:aria-[checked=true]:bg-indigo-900/30",
            // disabled
            "disabled:cursor-not-allowed disabled:opacity-60",
            className
          )}
        >
          <div
            className={SubframeUtils.twClassNames(
              "flex h-5 w-5 flex-none items-center justify-center rounded-[3px] border-2 transition-colors",
              // default box
              "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
              // focus/active accent via parent group
              "group-active:border-indigo-600 group-focus-within:border-indigo-600",
              // checked fill
              "group-aria-[checked=true]:border-indigo-600 group-aria-[checked=true]:bg-indigo-600",
              // disabled
              "group-disabled:border-zinc-300 group-disabled:bg-zinc-100 dark:group-disabled:bg-zinc-800",
              { hidden: hideCheckbox }
            )}
          >
            <FeatherCheck
              className={SubframeUtils.twClassNames(
                "hidden group-aria-[checked=true]:inline-flex",
                "text-white text-[14px] leading-[14px]"
              )}
            />
          </div>

          {children ? (
            <div className="flex min-w-0 grow items-center gap-4">
              {children}
            </div>
          ) : null}
        </button>
      </SubframeCore.Checkbox.Root>
    );
  }
);

// Named + default export
export default Component;


code.demo.1755899226314.tsx
import Component from "@/components/ui/checkbox-card";

export default function CheckboxCardWithMedia() {
  return (
    <div className="max-w-lg space-y-3 rounded-lg p-4 ring-1 bg-white text-gray-900 ring-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700">
      <Component>
        <div className="flex min-w-0 items-center gap-3">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=160&auto=format&fit=crop"
            className="h-10 w-10 flex-none rounded-md object-cover"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">
              Marketing newsletter
            </div>
            <div className="truncate text-xs text-zinc-600 dark:text-zinc-400">
              Tips, insights and case studies curated weekly.
            </div>
          </div>
        </div>
      </Component>

      <Component disabled defaultChecked>
        <div className="flex min-w-0 items-center gap-3">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=160&auto=format&fit=crop"
            className="h-10 w-10 flex-none rounded-md object-cover"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">
              Early access program
            </div>
            <div className="truncate text-xs text-zinc-600 dark:text-zinc-400">
              You’re already enrolled.
            </div>
          </div>
        </div>
      </Component>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/checkbox-card.tsx
"use client";

import * as React from "react";
import * as SubframeCore from "@subframe/core";
import { FeatherCheck } from "@subframe/core";

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

/* -------------------- Types -------------------- */

export interface ComponentProps
  extends React.ComponentProps<typeof SubframeCore.Checkbox.Root> {
  hideCheckbox?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

/* -------------------- Component -------------------- */

export const Component = React.forwardRef<HTMLButtonElement, ComponentProps>(
  function Component(
    { hideCheckbox = false, children, className, ...otherProps },
    ref
  ) {
    return (
      <SubframeCore.Checkbox.Root asChild {...otherProps}>
        <button
          ref={ref}
          className={SubframeUtils.twClassNames(
            // card base
            "group inline-flex w-full cursor-pointer items-center gap-4 rounded-md border p-4 text-left transition-colors",
            // light
            "border-zinc-300 bg-white hover:bg-zinc-50",
            // dark
            "dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800",
            // focus
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
            // checked state accent
            "aria-[checked=true]:border-indigo-300 aria-[checked=true]:bg-indigo-50",
            "dark:aria-[checked=true]:border-indigo-600/50 dark:aria-[checked=true]:bg-indigo-900/30",
            // disabled
            "disabled:cursor-not-allowed disabled:opacity-60",
            className
          )}
        >
          <div
            className={SubframeUtils.twClassNames(
              "flex h-5 w-5 flex-none items-center justify-center rounded-[3px] border-2 transition-colors",
              // default box
              "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
              // focus/active accent via parent group
              "group-active:border-indigo-600 group-focus-within:border-indigo-600",
              // checked fill
              "group-aria-[checked=true]:border-indigo-600 group-aria-[checked=true]:bg-indigo-600",
              // disabled
              "group-disabled:border-zinc-300 group-disabled:bg-zinc-100 dark:group-disabled:bg-zinc-800",
              { hidden: hideCheckbox }
            )}
          >
            <FeatherCheck
              className={SubframeUtils.twClassNames(
                "hidden group-aria-[checked=true]:inline-flex",
                "text-white text-[14px] leading-[14px]"
              )}
            />
          </div>

          {children ? (
            <div className="flex min-w-0 grow items-center gap-4">
              {children}
            </div>
          ) : null}
        </button>
      </SubframeCore.Checkbox.Root>
    );
  }
);

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
