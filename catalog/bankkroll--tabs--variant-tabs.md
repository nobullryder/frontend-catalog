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
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsVariants = cva("", {
  variants: {
    variant: {
      default: "",
      underline: "",
      pill: "",
      rounded: "",
      folder: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted p-1 rounded-md",
        underline:
          "space-x-6 bg-transparent space-x-4 p-0 border-b rounded-none",
        pill: "bg-transparent p-0 gap-0.5",
        rounded: "bg-muted p-2 rounded-full",
        folder: "space-x-1 border-b",
      },
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-sm data-[state=active]:bg-background data-[state=inactive]:hover:bg-primary/5 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        underline:
          "rounded-none data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=inactive]:hover:text-foreground",
        pill: "data-[state=active]:bg-primary data-[state=inactive]:bg-muted data-[state=inactive]:hover:bg-primary/20 data-[state=active]:text-primary-foreground  first:rounded-l-full last:rounded-r-full data-[state=active]:shadow-sm",
        rounded:
          "rounded-full data-[state=active]:bg-primary data-[state=inactive]:hover:bg-primary/5 data-[state=active]:text-primary-foreground",
        folder:
          "h-9 px-3 rounded-t-lg -mb-[2px] transition-all duration-200 ease-in-out border border-transparent data-[state=inactive]:hover:bg-muted data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-border data-[state=active]:border-b-transparent hover:data-[state=active]:border-b-transparent",
      },
    },
  },
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsVariants> {}

const TabsContext = React.createContext<VariantProps<typeof tabsVariants>>({
  variant: "default",
});

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsContext.Provider value={{ variant }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn(tabsVariants({ variant, className }))}
      {...props}
    />
  </TabsContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };


code.demo.tsx
"use client"

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

function BaseTabs({ variant }: { variant: any }) {
  return (
    <Tabs defaultValue="tab1" variant={variant} className="w-full max-w-md mx-auto">
      <TabsList>
        <TabsTrigger value="tab1">Tab One</TabsTrigger>
        <TabsTrigger value="tab2">Tab Two</TabsTrigger>
        <TabsTrigger value="tab3">Tab Three</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">This is tab one content.</TabsContent>
      <TabsContent value="tab2">Here goes content for tab two.</TabsContent>
      <TabsContent value="tab3">Tab three's content shows here.</TabsContent>
    </Tabs>
  )
}

function DemoDefault() {
  return <BaseTabs variant="default" />
}

function DemoUnderline() {
  return <BaseTabs variant="underline" />
}

function DemoPill() {
  return <BaseTabs variant="pill" />
}

function DemoRounded() {
  return <BaseTabs variant="rounded" />
}

function DemoFolder() {
  return <BaseTabs variant="folder" />
}

export {
  DemoDefault,
  DemoUnderline,
  DemoPill,
  DemoRounded,
  DemoFolder,
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/tabs.tsx
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsVariants = cva("", {
  variants: {
    variant: {
      default: "",
      underline: "",
      pill: "",
      rounded: "",
      folder: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted p-1 rounded-md",
        underline:
          "space-x-6 bg-transparent space-x-4 p-0 border-b rounded-none",
        pill: "bg-transparent p-0 gap-0.5",
        rounded: "bg-muted p-2 rounded-full",
        folder: "space-x-1 border-b",
      },
    },
  },
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-sm data-[state=active]:bg-background data-[state=inactive]:hover:bg-primary/5 data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        underline:
          "rounded-none data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=inactive]:hover:text-foreground",
        pill: "data-[state=active]:bg-primary data-[state=inactive]:bg-muted data-[state=inactive]:hover:bg-primary/20 data-[state=active]:text-primary-foreground  first:rounded-l-full last:rounded-r-full data-[state=active]:shadow-sm",
        rounded:
          "rounded-full data-[state=active]:bg-primary data-[state=inactive]:hover:bg-primary/5 data-[state=active]:text-primary-foreground",
        folder:
          "h-9 px-3 rounded-t-lg -mb-[2px] transition-all duration-200 ease-in-out border border-transparent data-[state=inactive]:hover:bg-muted data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-border data-[state=active]:border-b-transparent hover:data-[state=active]:border-b-transparent",
      },
    },
  },
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsVariants> {}

const TabsContext = React.createContext<VariantProps<typeof tabsVariants>>({
  variant: "default",
});

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsContext.Provider value={{ variant }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn(tabsVariants({ variant, className }))}
      {...props}
    />
  </TabsContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

Install NPM dependencies:
```bash
@radix-ui/react-tabs, class-variance-authority
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
