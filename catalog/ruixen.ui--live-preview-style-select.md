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
live-preview-style-select.tsx
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface StyleOption {
  value: string;
  label: string;
  previewClass?: string;
  previewStyle?: React.CSSProperties;
  description?: string;
}

interface LivePreviewStyleSelectProps {
  options: StyleOption[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  previewHeight?: string | number;
  previewBgClass?: string;
  showDescription?: boolean;
  selectWidth?: string | number; // new prop
}

export const LivePreviewStyleSelect: React.FC<LivePreviewStyleSelectProps> = ({
  options,
  label,
  placeholder = "Select a style...",
  onChange,
  defaultValue,
  previewHeight = "160px",
  previewBgClass = "bg-gray-100 dark:bg-gray-800",
  showDescription = true,
  selectWidth = "250px",
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");
  const current = options.find((opt) => opt.value === selected);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Select
        defaultValue={defaultValue}
        onValueChange={(val) => {
          setSelected(val);
          onChange?.(val);
        }}
      >
        <SelectTrigger
          className={cn(
            "flex items-center justify-between truncate",
            "w-full"
          )}
          style={{ width: selectWidth }}
        >
          <SelectValue placeholder={placeholder} className="truncate" />
        </SelectTrigger>
        <SelectContent style={{ width: selectWidth }}>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="w-full" // full width for wrapping div
              >
                {/* Wrap inside flex-col container */}
                <div className="flex flex-col w-full">
                  <span className="truncate">{opt.label}</span>
                  {showDescription && opt.description && (
                    <span className="text-xs text-muted-foreground truncate">
                      {opt.description}
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Preview */}
      <div
        className={cn(
          "rounded-lg border shadow-inner flex items-center justify-center text-sm font-medium",
          previewBgClass,
          current?.previewClass
        )}
        style={{ height: previewHeight, ...current?.previewStyle }}
      >
        {current ? current.label : "Preview will appear here"}
      </div>
    </div>
  );
};


code.demo.1758909455534.tsx
"use client";

import * as React from "react";
import {
  LivePreviewStyleSelect,
  StyleOption,
} from "@/components/ui/live-preview-style-select";

const gradientOptions: StyleOption[] = [
  {
    value: "sunset",
    label: "Sunset Glow",
    previewClass: "bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300",
    description: "Warm pink-orange-yellow gradient",
  },
  {
    value: "aqua",
    label: "Aqua Breeze",
    previewClass: "bg-gradient-to-r from-teal-400 to-cyan-500",
    description: "Cool teal and cyan tones",
  },
  {
    value: "night",
    label: "Night Sky",
    previewClass: "bg-gradient-to-r from-indigo-900 via-purple-800 to-black",
    description: "Dark indigo with deep purple accents",
  },
  {
    value: "forest",
    label: "Forest Haze",
    previewClass: "bg-gradient-to-r from-green-600 via-lime-400 to-emerald-500",
    description: "Lush green earthy tones",
  },
];

export default function DemoLivePreviewStyleSelect (){
  const [style, setStyle] = React.useState<string>("");

  return (
    <div className="p-4 space-y-4">
      <LivePreviewStyleSelect
        options={gradientOptions}
        label="Select Gradient"
        placeholder="Choose a gradient..."
        selectWidth="280px"  // fixed width for all options
        previewHeight="180px"
      />
      {style && (
        <p className="text-sm text-gray-700">
          Selected style: <span className="font-semibold">{style}</span>
        </p>
      )}
    </div>
  );
};

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/live-preview-style-select.tsx
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface StyleOption {
  value: string;
  label: string;
  previewClass?: string;
  previewStyle?: React.CSSProperties;
  description?: string;
}

interface LivePreviewStyleSelectProps {
  options: StyleOption[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  previewHeight?: string | number;
  previewBgClass?: string;
  showDescription?: boolean;
  selectWidth?: string | number; // new prop
}

export const LivePreviewStyleSelect: React.FC<LivePreviewStyleSelectProps> = ({
  options,
  label,
  placeholder = "Select a style...",
  onChange,
  defaultValue,
  previewHeight = "160px",
  previewBgClass = "bg-gray-100 dark:bg-gray-800",
  showDescription = true,
  selectWidth = "250px",
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");
  const current = options.find((opt) => opt.value === selected);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Select
        defaultValue={defaultValue}
        onValueChange={(val) => {
          setSelected(val);
          onChange?.(val);
        }}
      >
        <SelectTrigger
          className={cn(
            "flex items-center justify-between truncate",
            "w-full"
          )}
          style={{ width: selectWidth }}
        >
          <SelectValue placeholder={placeholder} className="truncate" />
        </SelectTrigger>
        <SelectContent style={{ width: selectWidth }}>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="w-full" // full width for wrapping div
              >
                {/* Wrap inside flex-col container */}
                <div className="flex flex-col w-full">
                  <span className="truncate">{opt.label}</span>
                  {showDescription && opt.description && (
                    <span className="text-xs text-muted-foreground truncate">
                      {opt.description}
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Preview */}
      <div
        className={cn(
          "rounded-lg border shadow-inner flex items-center justify-center text-sm font-medium",
          previewBgClass,
          current?.previewClass
        )}
        style={{ height: previewHeight, ...current?.previewStyle }}
      >
        {current ? current.label : "Preview will appear here"}
      </div>
    </div>
  );
};

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
