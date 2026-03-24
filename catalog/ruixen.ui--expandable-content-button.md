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
expandable-content-button.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Twitter, Linkedin, Copy } from "lucide-react";

interface ExpandableContentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md" | "lg";
  options?: Array<{ label: string; icon?: React.ReactNode; onClick: () => void }>;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function ExpandableContentButton({
  label,
  size = "md",
  options = [],
  className,
  ...props
}: ExpandableContentButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="inline-block relative">
      <Button
        className={cn(
          "flex justify-between items-center w-full",
          sizeConfig[size],
          className
        )}
        onClick={() => setExpanded(!expanded)}
        {...props}
      >
        <span className="flex-1 text-left">{label}</span>
        <span className="flex-shrink-0 ml-2">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </Button>

      {expanded && options.length > 0 && (
        <div className="absolute mt-2 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50 border border-gray-200 dark:border-gray-700">
          {options.map((opt, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="justify-start w-full flex items-center gap-2"
              onClick={() => {
                opt.onClick();
                setExpanded(false);
              }}
            >
              {opt.icon && <span className="w-5 h-5">{opt.icon}</span>}
              <span>{opt.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

code.demo.1758560791994.tsx
import ExpandableContentButton from "@/components/ui/expandable-content-button"
import { ChevronDown, ChevronUp, Twitter, Linkedin, Copy } from "lucide-react";

// Demo Usage
export default function Demo() {
  return (
    <div className="flex gap-4">
      <ExpandableContentButton
        label="Filters"
        options={[
          { label: "Filter 1", onClick: () => alert("Filter 1 selected") },
          { label: "Filter 2", onClick: () => alert("Filter 2 selected") },
          { label: "Filter 3", onClick: () => alert("Filter 3 selected") },
        ]}
      />

      <ExpandableContentButton
        label="Share"
        options={[
          { label: "Twitter", icon: <Twitter className="w-4 h-4" />, onClick: () => alert("Shared on Twitter") },
          { label: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, onClick: () => alert("Shared on LinkedIn") },
          { label: "Copy Link", icon: <Copy className="w-4 h-4" />, onClick: () => alert("Link copied") },
        ]}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/expandable-content-button.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Twitter, Linkedin, Copy } from "lucide-react";

interface ExpandableContentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md" | "lg";
  options?: Array<{ label: string; icon?: React.ReactNode; onClick: () => void }>;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function ExpandableContentButton({
  label,
  size = "md",
  options = [],
  className,
  ...props
}: ExpandableContentButtonProps) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="inline-block relative">
      <Button
        className={cn(
          "flex justify-between items-center w-full",
          sizeConfig[size],
          className
        )}
        onClick={() => setExpanded(!expanded)}
        {...props}
      >
        <span className="flex-1 text-left">{label}</span>
        <span className="flex-shrink-0 ml-2">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </Button>

      {expanded && options.length > 0 && (
        <div className="absolute mt-2 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50 border border-gray-200 dark:border-gray-700">
          {options.map((opt, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="justify-start w-full flex items-center gap-2"
              onClick={() => {
                opt.onClick();
                setExpanded(false);
              }}
            >
              {opt.icon && <span className="w-5 h-5">{opt.icon}</span>}
              <span>{opt.label}</span>
            </Button>
          ))}
        </div>
      )}
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
