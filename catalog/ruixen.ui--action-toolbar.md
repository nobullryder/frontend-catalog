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
action-toolbar.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToolbarButton {
  label: string;
  icon?: React.ReactNode;
  count?: number;
  onClick?: () => void;
  dropdownItems?: string[];
  active?: boolean;
}

interface ActionToolbarProps {
  buttons: ToolbarButton[];
  compact?: boolean;
  className?: string;
}

export function ActionToolbar({ buttons, compact = false, className = "" }: ActionToolbarProps) {
  const [activeStates, setActiveStates] = useState<boolean[]>(
    buttons.map((btn) => !!btn.active)
  );

  const handleToggle = (index: number, onClick?: () => void) => {
    const updated = [...activeStates];
    updated[index] = !updated[index];
    setActiveStates(updated);
    if (onClick) onClick();
  };

  return (
    <div
      className={cn(
        "relative z-0 flex flex-wrap items-center rounded-2xl border border-muted bg-gradient-to-b from-background to-muted/30 p-1 shadow-sm",
        className
      )}
    >
      {buttons.map((btn, index) => {
        const isActive = activeStates[index];

        const buttonClasses = cn(
          "flex items-center gap-2 px-3 h-9 rounded-xl transition-all duration-200",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-muted/80 hover:text-foreground text-muted-foreground"
        );

        if (btn.dropdownItems) {
          return (
            <div key={index} className="flex items-center">
              <Button
                onClick={() => handleToggle(index, btn.onClick)}
                variant="ghost"
                className={cn(buttonClasses, compact && "px-2")}
              >
                {btn.icon}
                <span className="font-medium">{btn.label}</span>
                {btn.count !== undefined && (
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className="text-xs font-mono -me-1"
                  >
                    {btn.count}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-0.5 h-9 w-8 rounded-xl hover:bg-muted/80"
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {btn.dropdownItems.map((item, i) => (
                    <DropdownMenuItem key={i} onClick={() => console.log(item)}>
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        }

        return (
          <Button
            key={index}
            onClick={() => handleToggle(index, btn.onClick)}
            variant="ghost"
            className={cn(buttonClasses, compact && "px-2")}
          >
            {btn.icon}
            <span className="font-medium">{btn.label}</span>
            {btn.count !== undefined && (
              <Badge
                variant={isActive ? "secondary" : "outline"}
                className="text-xs font-mono -me-1"
              >
                {btn.count}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}


code.demo.1760578020869.tsx
import { AlignLeft, AlignCenter, AlignRight, Edit3, MoreHorizontal } from "lucide-react";
import { ActionToolbar } from "@/components/ui/action-toolbar";

export default function ToolbarDemo() {
  return (
    <div className="p-6">
      <ActionToolbar
        buttons={[
          { label: "Left", icon: <AlignLeft className="size-4" /> },
          { label: "Center", icon: <AlignCenter className="size-4" /> },
          { label: "Right", icon: <AlignRight className="size-4" /> },
          {
            label: "Edit",
            icon: <Edit3 className="size-4" />,
            dropdownItems: ["Rename", "Duplicate", "Move to…"],
          },
          {
            label: "More",
            icon: <MoreHorizontal className="size-4" />,
            dropdownItems: ["Settings", "Export", "Archive"],
          },
        ]}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/action-toolbar.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToolbarButton {
  label: string;
  icon?: React.ReactNode;
  count?: number;
  onClick?: () => void;
  dropdownItems?: string[];
  active?: boolean;
}

interface ActionToolbarProps {
  buttons: ToolbarButton[];
  compact?: boolean;
  className?: string;
}

export function ActionToolbar({ buttons, compact = false, className = "" }: ActionToolbarProps) {
  const [activeStates, setActiveStates] = useState<boolean[]>(
    buttons.map((btn) => !!btn.active)
  );

  const handleToggle = (index: number, onClick?: () => void) => {
    const updated = [...activeStates];
    updated[index] = !updated[index];
    setActiveStates(updated);
    if (onClick) onClick();
  };

  return (
    <div
      className={cn(
        "relative z-0 flex flex-wrap items-center rounded-2xl border border-muted bg-gradient-to-b from-background to-muted/30 p-1 shadow-sm",
        className
      )}
    >
      {buttons.map((btn, index) => {
        const isActive = activeStates[index];

        const buttonClasses = cn(
          "flex items-center gap-2 px-3 h-9 rounded-xl transition-all duration-200",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-muted/80 hover:text-foreground text-muted-foreground"
        );

        if (btn.dropdownItems) {
          return (
            <div key={index} className="flex items-center">
              <Button
                onClick={() => handleToggle(index, btn.onClick)}
                variant="ghost"
                className={cn(buttonClasses, compact && "px-2")}
              >
                {btn.icon}
                <span className="font-medium">{btn.label}</span>
                {btn.count !== undefined && (
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className="text-xs font-mono -me-1"
                  >
                    {btn.count}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-0.5 h-9 w-8 rounded-xl hover:bg-muted/80"
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {btn.dropdownItems.map((item, i) => (
                    <DropdownMenuItem key={i} onClick={() => console.log(item)}>
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        }

        return (
          <Button
            key={index}
            onClick={() => handleToggle(index, btn.onClick)}
            variant="ghost"
            className={cn(buttonClasses, compact && "px-2")}
          >
            {btn.icon}
            <span className="font-medium">{btn.label}</span>
            {btn.count !== undefined && (
              <Badge
                variant={isActive ? "secondary" : "outline"}
                className="text-xs font-mono -me-1"
              >
                {btn.count}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}

```

Install NPM dependencies:
```bash
lucide-react
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
