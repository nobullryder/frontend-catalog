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
split-action-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SplitActionButton
 *
 * A button that combines a primary action and a secondary dropdown.
 * Left side triggers main action.
 * Right side opens a dropdown with additional options.
 * Useful for actions like "Save" + "Save As..." or "Export" + formats.
 */

interface SplitActionButtonProps {
  mainLabel: string;
  mainAction: () => void;
  secondaryActions: { label: string; onClick: () => void }[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const SplitActionButton: React.FC<SplitActionButtonProps> = ({
  mainLabel,
  mainAction,
  secondaryActions,
  size = "md",
  className,
}) => {
  return (
    <div className={cn("inline-flex rounded-lg overflow-hidden border border-border", className)}>
      {/* Main action button */}
      <Button
        variant="default"
        className={cn("rounded-none rounded-l-lg", sizeClasses[size])}
        onClick={mainAction}
      >
        {mainLabel}
      </Button>

      {/* Dropdown trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className={cn("rounded-none rounded-r-lg", sizeClasses[size])}>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {secondaryActions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SplitActionButton;

code.demo.1758556476299.tsx
import SplitActionButton from "@/components/ui/split-action-button";

export default function DemoSplitActionButton() {
  return (
    <div className="flex gap-4">
      <SplitActionButton
        mainLabel="Save"
        mainAction={() => alert("Saved!")}
        secondaryActions={[
          { label: "Save As PDF", onClick: () => alert("Saved as PDF") },
          { label: "Save As DOCX", onClick: () => alert("Saved as DOCX") },
        ]}
      />

      <SplitActionButton
        mainLabel="Export"
        mainAction={() => alert("Exported!")}
        secondaryActions={[
          { label: "Export CSV", onClick: () => alert("Exported CSV") },
          { label: "Export XLSX", onClick: () => alert("Exported XLSX") },
        ]}
        size="lg"
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/split-action-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SplitActionButton
 *
 * A button that combines a primary action and a secondary dropdown.
 * Left side triggers main action.
 * Right side opens a dropdown with additional options.
 * Useful for actions like "Save" + "Save As..." or "Export" + formats.
 */

interface SplitActionButtonProps {
  mainLabel: string;
  mainAction: () => void;
  secondaryActions: { label: string; onClick: () => void }[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const SplitActionButton: React.FC<SplitActionButtonProps> = ({
  mainLabel,
  mainAction,
  secondaryActions,
  size = "md",
  className,
}) => {
  return (
    <div className={cn("inline-flex rounded-lg overflow-hidden border border-border", className)}>
      {/* Main action button */}
      <Button
        variant="default"
        className={cn("rounded-none rounded-l-lg", sizeClasses[size])}
        onClick={mainAction}
      >
        {mainLabel}
      </Button>

      {/* Dropdown trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className={cn("rounded-none rounded-r-lg", sizeClasses[size])}>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {secondaryActions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={action.onClick}>
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SplitActionButton;
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
