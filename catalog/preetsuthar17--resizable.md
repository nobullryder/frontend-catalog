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
resizable.tsx
"use client";

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { cva, type VariantProps } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const resizablePanelVariants = cva("relative", {
  variants: {
    border: {
      none: "",
      left: "border-l",
      right: "border-r",
      top: "border-t",
      bottom: "border-b",
      all: "border",
      vertical: "border-l border-r",
      horizontal: "border-t border-b",
    },
  },
  defaultVariants: {
    border: "none",
  },
});

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentPropsWithoutRef<typeof PanelGroup>
>(({ className, ...props }, ref) => (
  <PanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

interface ResizablePanelProps
  extends React.ComponentPropsWithoutRef<typeof Panel>,
    VariantProps<typeof resizablePanelVariants> {}

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof Panel>,
  ResizablePanelProps
>(({ className, border, ...props }, ref) => (
  <Panel
    ref={ref}
    className={cn(resizablePanelVariants({ border }), className)}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = ({
  withHandle = true,
  className,
  ...props
}: React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </PanelResizeHandle>
);

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  resizablePanelVariants,
};

code.demo.1753351511368.tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle} from "@/components/ui/resizable";

export default function DemoOne() {
  return(
    <>
      <div className="max-w-md w-full mx-auto">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[300px] max-w-lg rounded-lg border"
        >
          <ResizablePanel defaultSize={25} minSize={20} border="right">
            <div className="flex h-full items-center justify-center p-4">
              <span className="font-semibold text-sm">Sidebar</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75} border="top">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={40} border="bottom">
                <div className="flex h-full items-center justify-center p-4">
                  <span className="font-semibold text-sm">Main Content</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="font-semibold text-sm">Footer</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/resizable.tsx
"use client";

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { cva, type VariantProps } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const resizablePanelVariants = cva("relative", {
  variants: {
    border: {
      none: "",
      left: "border-l",
      right: "border-r",
      top: "border-t",
      bottom: "border-b",
      all: "border",
      vertical: "border-l border-r",
      horizontal: "border-t border-b",
    },
  },
  defaultVariants: {
    border: "none",
  },
});

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentPropsWithoutRef<typeof PanelGroup>
>(({ className, ...props }, ref) => (
  <PanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

interface ResizablePanelProps
  extends React.ComponentPropsWithoutRef<typeof Panel>,
    VariantProps<typeof resizablePanelVariants> {}

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof Panel>,
  ResizablePanelProps
>(({ className, border, ...props }, ref) => (
  <Panel
    ref={ref}
    className={cn(resizablePanelVariants({ border }), className)}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = ({
  withHandle = true,
  className,
  ...props
}: React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </PanelResizeHandle>
);

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  resizablePanelVariants,
};
```

Install NPM dependencies:
```bash
react-resizable-panels, class-variance-authority, lucide-react
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
