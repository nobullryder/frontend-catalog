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
color-selector.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  colors: string[];
  size?: "default" | "sm" | "lg";
  defaultValue: string;
  name?: string;
  onColorSelect?: (color: string) => void;
  className?: string;
}

const colorMap = {
  default: "var(--foreground)",
  red: "var(--color-red-500)",
  green: "var(--color-green-500)",
  blue: "var(--color-blue-500)",
  yellow: "var(--color-yellow-500)",
  purple: "var(--color-purple-500)",
  pink: "var(--color-pink-500)",
  indigo: "var(--color-indigo-500)",
  orange: "var(--color-orange-500)",
  teal: "var(--color-teal-500)",
  cyan: "var(--color-cyan-500)",
  lime: "var(--color-lime-500)",
  emerald: "var(--color-emerald-500)",
  violet: "var(--color-violet-500)",
  fuchsia: "var(--color-fuchsia-500)",
  rose: "var(--color-rose-500)",
  sky: "var(--color-sky-500)",
  amber: "var(--color-amber-500)",
} as const;

export function ColorSelector(
  { colors, size = "default", defaultValue, name, onColorSelect, className }:
    ColorSelectorProps,
) {
  const [selectedColor, setSelectedColor] = useState<string>(defaultValue);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorSelect?.(color);
  };

  const getSizeClass = (size: "default" | "sm" | "lg") => {
    switch (size) {
      case "sm":
        return "size-4";
      case "default":
        return "size-5";
      case "lg":
        return "size-6";
      default:
        return "size-5";
    }
  };

  const getColorValue = (color: string): string => {
    return colorMap[color as keyof typeof colorMap] || color;
  };

  const sizeClass = getSizeClass(size);

  return (
    <div className={cn("flex gap-2", className)}>
      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedColor}
        />
      )}
      {colors.map((color) => {
        const colorValue = getColorValue(color);
        return (
          <div
            key={color}
            className={`${sizeClass} rounded-full cursor-pointer transition-transform duration-200 active:scale-90 ${
              selectedColor === color
                ? "ring-2 ring-offset-2 ring-gray-400"
                : ""
            }`}
            style={{
              backgroundColor: colorValue,
              ...(selectedColor === color && {
                boxShadow:
                  `inset 0 0 0 2px var(--background), 0 0 0 2px ${colorValue}`,
              }),
            }}
            onClick={() => handleColorSelect(color)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleColorSelect(color);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Select ${color} color`}
            aria-pressed={selectedColor === color}
          />
        );
      })}
    </div>
  );
}


code.demo.1773094901253.tsx
import { ColorSelector } from "@/components/ui/color-selector"

export default function ColorSelectorDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <ColorSelector
        colors={["red", "blue", "green", "purple", "orange", "pink", "yellow", "cyan"]}
        defaultValue="blue"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/color-selector.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  colors: string[];
  size?: "default" | "sm" | "lg";
  defaultValue: string;
  name?: string;
  onColorSelect?: (color: string) => void;
  className?: string;
}

const colorMap = {
  default: "var(--foreground)",
  red: "var(--color-red-500)",
  green: "var(--color-green-500)",
  blue: "var(--color-blue-500)",
  yellow: "var(--color-yellow-500)",
  purple: "var(--color-purple-500)",
  pink: "var(--color-pink-500)",
  indigo: "var(--color-indigo-500)",
  orange: "var(--color-orange-500)",
  teal: "var(--color-teal-500)",
  cyan: "var(--color-cyan-500)",
  lime: "var(--color-lime-500)",
  emerald: "var(--color-emerald-500)",
  violet: "var(--color-violet-500)",
  fuchsia: "var(--color-fuchsia-500)",
  rose: "var(--color-rose-500)",
  sky: "var(--color-sky-500)",
  amber: "var(--color-amber-500)",
} as const;

export function ColorSelector(
  { colors, size = "default", defaultValue, name, onColorSelect, className }:
    ColorSelectorProps,
) {
  const [selectedColor, setSelectedColor] = useState<string>(defaultValue);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorSelect?.(color);
  };

  const getSizeClass = (size: "default" | "sm" | "lg") => {
    switch (size) {
      case "sm":
        return "size-4";
      case "default":
        return "size-5";
      case "lg":
        return "size-6";
      default:
        return "size-5";
    }
  };

  const getColorValue = (color: string): string => {
    return colorMap[color as keyof typeof colorMap] || color;
  };

  const sizeClass = getSizeClass(size);

  return (
    <div className={cn("flex gap-2", className)}>
      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedColor}
        />
      )}
      {colors.map((color) => {
        const colorValue = getColorValue(color);
        return (
          <div
            key={color}
            className={`${sizeClass} rounded-full cursor-pointer transition-transform duration-200 active:scale-90 ${
              selectedColor === color
                ? "ring-2 ring-offset-2 ring-gray-400"
                : ""
            }`}
            style={{
              backgroundColor: colorValue,
              ...(selectedColor === color && {
                boxShadow:
                  `inset 0 0 0 2px var(--background), 0 0 0 2px ${colorValue}`,
              }),
            }}
            onClick={() => handleColorSelect(color)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleColorSelect(color);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Select ${color} color`}
            aria-pressed={selectedColor === color}
          />
        );
      })}
    </div>
  );
}

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
