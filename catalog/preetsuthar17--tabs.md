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
tabs.tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsVariants = cva(
  "relative inline-flex items-center justify-center rounded-lg transition-all duration-300 w-full",
  {
    variants: {
      variant: {
        default:
          "bg-background border border-border",
        ghost: "bg-transparent",
        underline:
          "bg-transparent border-b border-border rounded-none",
      },
      size: {
        sm: "h-9 p-1",
        default: "h-10 p-1.5",
        lg: "h-12 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const tabTriggerVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground hover:text-foreground data-[state=active]:text-primary-foreground",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-accent data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent",
        underline:
          "text-muted-foreground hover:text-foreground data-[state=active]:text-accent-foreground rounded-none",
      },
      size: {
        sm: "px-2.5 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TabItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
}

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  indicatorColor?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      variant,
      size,
      items,
      defaultValue,
      value,
      onValueChange,
      indicatorColor = "hsl(var(--hu-accent))",
      ...props
    },
    ref
  ) => {
    const [activeValue, setActiveValue] = React.useState(
      value || defaultValue || items[0]?.id
    );
    const [activeTabBounds, setActiveTabBounds] = React.useState({
      left: 0,
      width: 0,
    });

    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    React.useEffect(() => {
      if (value !== undefined) {
        setActiveValue(value);
      }
    }, [value]);

    React.useEffect(() => {
      const activeIndex = items.findIndex(
        (item: TabItem) => item.id === activeValue
      );
      const activeTab = tabRefs.current[activeIndex];

      if (activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = activeTab.parentElement?.getBoundingClientRect();

        if (containerRect) {
          setActiveTabBounds({
            left: tabRect.left - containerRect.left,
            width: tabRect.width,
          });
        }
      }
    }, [activeValue, items]);

    const handleTabClick = (tabId: string) => {
      setActiveValue(tabId);
      onValueChange?.(tabId);
    };

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        {" "}
        {/* Animated indicator */}
        <motion.div
          className={cn(
            "absolute z-10",
            variant === "underline"
              ? "bottom-0 h-0.5 rounded-none"
              : "top-1 bottom-1 rounded-md"
          )}
          style={{
            backgroundColor:
              variant === "underline"
                ? "hsl(var(--hu-foreground))"
                : indicatorColor,
          }}
          initial={false}
          animate={{
            left: activeTabBounds.left,
            width: activeTabBounds.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
        {/* Tab triggers */}
        {items.map((item: TabItem, index: number) => {
          const isActive = activeValue === item.id;

          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={cn(
                tabTriggerVariants({ variant, size }),
                "relative z-20 text-muted-foreground data-[state=active]:text-accent-foreground gap-2"
              )}
              data-state={isActive ? "active" : "inactive"}
              onClick={() => handleTabClick(item.id)}
              type="button"
            >
              {item.icon && <span className="[&_svg]:size-4">{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

// Content component for tab panels
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, activeValue, children, ...props }, ref) => {
    const isActive = value === activeValue;

    if (!isActive) return null;

    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onTransitionEnd,
      ...divProps
    } = props;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...divProps}
      >
        {children}
      </motion.div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, tabsVariants };

code.demo.1753349063253.tsx
import { Tabs } from "@/components/ui/tabs";
import {Home, Settings, User} from "lucide-react"

export default function DemoOne() {
  return (
    <>
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <Tabs
          items={[
            { id: "home", label: "Home", icon: <Home /> },
            { id: "settings", label: "Settings", icon: <Settings /> },
            { id: "profile", label: "Profile", icon: <User /> },
          ]}
          defaultValue="home"
        />
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tabs.tsx
"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsVariants = cva(
  "relative inline-flex items-center justify-center rounded-lg transition-all duration-300 w-full",
  {
    variants: {
      variant: {
        default:
          "bg-background border border-border",
        ghost: "bg-transparent",
        underline:
          "bg-transparent border-b border-border rounded-none",
      },
      size: {
        sm: "h-9 p-1",
        default: "h-10 p-1.5",
        lg: "h-12 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const tabTriggerVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground hover:text-foreground data-[state=active]:text-primary-foreground",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-accent data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent",
        underline:
          "text-muted-foreground hover:text-foreground data-[state=active]:text-accent-foreground rounded-none",
      },
      size: {
        sm: "px-2.5 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TabItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
}

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  indicatorColor?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      variant,
      size,
      items,
      defaultValue,
      value,
      onValueChange,
      indicatorColor = "hsl(var(--hu-accent))",
      ...props
    },
    ref
  ) => {
    const [activeValue, setActiveValue] = React.useState(
      value || defaultValue || items[0]?.id
    );
    const [activeTabBounds, setActiveTabBounds] = React.useState({
      left: 0,
      width: 0,
    });

    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    React.useEffect(() => {
      if (value !== undefined) {
        setActiveValue(value);
      }
    }, [value]);

    React.useEffect(() => {
      const activeIndex = items.findIndex(
        (item: TabItem) => item.id === activeValue
      );
      const activeTab = tabRefs.current[activeIndex];

      if (activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = activeTab.parentElement?.getBoundingClientRect();

        if (containerRect) {
          setActiveTabBounds({
            left: tabRect.left - containerRect.left,
            width: tabRect.width,
          });
        }
      }
    }, [activeValue, items]);

    const handleTabClick = (tabId: string) => {
      setActiveValue(tabId);
      onValueChange?.(tabId);
    };

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        {" "}
        {/* Animated indicator */}
        <motion.div
          className={cn(
            "absolute z-10",
            variant === "underline"
              ? "bottom-0 h-0.5 rounded-none"
              : "top-1 bottom-1 rounded-md"
          )}
          style={{
            backgroundColor:
              variant === "underline"
                ? "hsl(var(--hu-foreground))"
                : indicatorColor,
          }}
          initial={false}
          animate={{
            left: activeTabBounds.left,
            width: activeTabBounds.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
        {/* Tab triggers */}
        {items.map((item: TabItem, index: number) => {
          const isActive = activeValue === item.id;

          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={cn(
                tabTriggerVariants({ variant, size }),
                "relative z-20 text-muted-foreground data-[state=active]:text-accent-foreground gap-2"
              )}
              data-state={isActive ? "active" : "inactive"}
              onClick={() => handleTabClick(item.id)}
              type="button"
            >
              {item.icon && <span className="[&_svg]:size-4">{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

// Content component for tab panels
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, activeValue, children, ...props }, ref) => {
    const isActive = value === activeValue;

    if (!isActive) return null;

    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onTransitionEnd,
      ...divProps
    } = props;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...divProps}
      >
        {children}
      </motion.div>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, tabsVariants };
```

Install NPM dependencies:
```bash
motion, class-variance-authority
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
