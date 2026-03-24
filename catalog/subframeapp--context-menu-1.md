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
context-menu-1.tsx
"use client";

import * as React from "react";
import * as SubframeCore from "@subframe/core";
import { FeatherStar } from "@subframe/core";

/** Local utils inside the file */
namespace SubframeUtils {
  export type ClassValue = string | null | undefined | false | Record<string, boolean>;
  export function createTwClassNames() {
    return (...classes: ClassValue[]) =>
      classes
        .flatMap((c) => {
          if (!c) return [];
          if (typeof c === "string") return [c];
          return Object.entries(c).filter(([, ok]) => !!ok).map(([k]) => k);
        })
        .join(" ");
  }
  export const twClassNames = createTwClassNames();
}

/** Shared row UI */
function Row({
  children,
  icon,
  rightSlot,
  className,
  refCb,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
  refCb?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refCb ?? undefined}
      className={SubframeUtils.twClassNames(
        "group flex h-8 w-full cursor-pointer select-none items-center gap-2 rounded-md px-2",
        "hover:bg-zinc-100 active:bg-zinc-50 data-[highlighted]:bg-zinc-100",
        "dark:hover:bg-zinc-800 dark:active:bg-zinc-900 dark:data-[highlighted]:bg-zinc-800",
        className
      )}
    >
      <div className="flex h-4 w-4 flex-none items-center justify-center">
        {icon ? (
          <SubframeCore.IconWrapper className="text-zinc-700 dark:text-zinc-300">
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
      </div>
      {children ? (
        <span className="line-clamp-1 min-w-0 grow text-sm text-zinc-900 dark:text-zinc-100">
          {children}
        </span>
      ) : null}
      {rightSlot ? (
        <div className="ml-2 flex flex-none items-center justify-center">{rightSlot}</div>
      ) : null}
    </div>
  );
}

/** Item (ContextMenu only) */
export interface ItemProps
  extends Omit<React.ComponentProps<typeof SubframeCore.ContextMenu.Item>, "asChild"> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}
const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
  { children, icon = <FeatherStar />, rightSlot, className, ...otherProps },
  ref
) {
  return (
    <SubframeCore.ContextMenu.Item asChild {...otherProps}>
      <Row refCb={(el) => (ref ? (ref as any)(el) : undefined)} icon={icon} rightSlot={rightSlot} className={className}>
        {children}
      </Row>
    </SubframeCore.ContextMenu.Item>
  );
});

/** Divider */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { className, ...otherProps },
  ref
) {
  return (
    <div ref={ref} {...otherProps} className={SubframeUtils.twClassNames("px-1 py-1", className)}>
      <div className="h-px w-full bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
});

/** Root (ContextMenu only) */
export interface ComponentProps
  extends Omit<React.ComponentProps<typeof SubframeCore.ContextMenu.Root>, "children"> {
  /** Menu body (rows & dividers) */
  children?: React.ReactNode;
  /** Card classes */
  className?: string;
  /** Visible area to right-click on */
  trigger?: React.ReactNode;
}
const Root = React.forwardRef<HTMLDivElement, ComponentProps>(function Component(
  { children, className, trigger, ...rootProps },
  ref
) {
  if (!children) return null;

  const container = (
    <div
      ref={ref}
      className={SubframeUtils.twClassNames(
        "flex min-w-[192px] flex-col items-start rounded-md border px-1 py-1 shadow-lg",
        "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
        className
      )}
    >
      {children}
    </div>
  );

  return (
    <SubframeCore.ContextMenu.Root {...rootProps}>
      <SubframeCore.ContextMenu.Trigger asChild>
        {trigger ?? (
          <div
            className={SubframeUtils.twClassNames(
              "rounded-md border border-dashed p-6 text-sm text-zinc-600",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800",
              "border-zinc-300 dark:border-zinc-700 dark:text-zinc-300"
            )}
          >
            Right-click here
          </div>
        )}
      </SubframeCore.ContextMenu.Trigger>
      <SubframeCore.ContextMenu.Content asChild>{container}</SubframeCore.ContextMenu.Content>
    </SubframeCore.ContextMenu.Root>
  );
});

/** Compound export */
export const Component = Object.assign(Root, { Item, Divider });
export default Component;


code.demo.1755899846138.tsx
import Component from "@/components/ui/context-menu-1";
import { FeatherEdit, FeatherTrash2, FeatherCopy } from "@subframe/core";

export default function ContextMenuRightClick() {
  return (
    <div className="max-w-sm space-y-4 rounded-lg p-4 ring-1 bg-white text-gray-900 ring-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700">
      <Component
        trigger={
          <div className="rounded-md border border-zinc-300 p-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            Right-click this box to open the menu
          </div>
        }
      >
        <Component.Item icon={<FeatherEdit />}>Rename</Component.Item>
        <Component.Item icon={<FeatherCopy />}>Duplicate</Component.Item>
        <Component.Divider />
        <Component.Item icon={<FeatherTrash2 />}>Delete</Component.Item>
      </Component>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/context-menu-1.tsx
"use client";

import * as React from "react";
import * as SubframeCore from "@subframe/core";
import { FeatherStar } from "@subframe/core";

/** Local utils inside the file */
namespace SubframeUtils {
  export type ClassValue = string | null | undefined | false | Record<string, boolean>;
  export function createTwClassNames() {
    return (...classes: ClassValue[]) =>
      classes
        .flatMap((c) => {
          if (!c) return [];
          if (typeof c === "string") return [c];
          return Object.entries(c).filter(([, ok]) => !!ok).map(([k]) => k);
        })
        .join(" ");
  }
  export const twClassNames = createTwClassNames();
}

/** Shared row UI */
function Row({
  children,
  icon,
  rightSlot,
  className,
  refCb,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
  refCb?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refCb ?? undefined}
      className={SubframeUtils.twClassNames(
        "group flex h-8 w-full cursor-pointer select-none items-center gap-2 rounded-md px-2",
        "hover:bg-zinc-100 active:bg-zinc-50 data-[highlighted]:bg-zinc-100",
        "dark:hover:bg-zinc-800 dark:active:bg-zinc-900 dark:data-[highlighted]:bg-zinc-800",
        className
      )}
    >
      <div className="flex h-4 w-4 flex-none items-center justify-center">
        {icon ? (
          <SubframeCore.IconWrapper className="text-zinc-700 dark:text-zinc-300">
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
      </div>
      {children ? (
        <span className="line-clamp-1 min-w-0 grow text-sm text-zinc-900 dark:text-zinc-100">
          {children}
        </span>
      ) : null}
      {rightSlot ? (
        <div className="ml-2 flex flex-none items-center justify-center">{rightSlot}</div>
      ) : null}
    </div>
  );
}

/** Item (ContextMenu only) */
export interface ItemProps
  extends Omit<React.ComponentProps<typeof SubframeCore.ContextMenu.Item>, "asChild"> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}
const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
  { children, icon = <FeatherStar />, rightSlot, className, ...otherProps },
  ref
) {
  return (
    <SubframeCore.ContextMenu.Item asChild {...otherProps}>
      <Row refCb={(el) => (ref ? (ref as any)(el) : undefined)} icon={icon} rightSlot={rightSlot} className={className}>
        {children}
      </Row>
    </SubframeCore.ContextMenu.Item>
  );
});

/** Divider */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { className, ...otherProps },
  ref
) {
  return (
    <div ref={ref} {...otherProps} className={SubframeUtils.twClassNames("px-1 py-1", className)}>
      <div className="h-px w-full bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
});

/** Root (ContextMenu only) */
export interface ComponentProps
  extends Omit<React.ComponentProps<typeof SubframeCore.ContextMenu.Root>, "children"> {
  /** Menu body (rows & dividers) */
  children?: React.ReactNode;
  /** Card classes */
  className?: string;
  /** Visible area to right-click on */
  trigger?: React.ReactNode;
}
const Root = React.forwardRef<HTMLDivElement, ComponentProps>(function Component(
  { children, className, trigger, ...rootProps },
  ref
) {
  if (!children) return null;

  const container = (
    <div
      ref={ref}
      className={SubframeUtils.twClassNames(
        "flex min-w-[192px] flex-col items-start rounded-md border px-1 py-1 shadow-lg",
        "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
        className
      )}
    >
      {children}
    </div>
  );

  return (
    <SubframeCore.ContextMenu.Root {...rootProps}>
      <SubframeCore.ContextMenu.Trigger asChild>
        {trigger ?? (
          <div
            className={SubframeUtils.twClassNames(
              "rounded-md border border-dashed p-6 text-sm text-zinc-600",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800",
              "border-zinc-300 dark:border-zinc-700 dark:text-zinc-300"
            )}
          >
            Right-click here
          </div>
        )}
      </SubframeCore.ContextMenu.Trigger>
      <SubframeCore.ContextMenu.Content asChild>{container}</SubframeCore.ContextMenu.Content>
    </SubframeCore.ContextMenu.Root>
  );
});

/** Compound export */
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
