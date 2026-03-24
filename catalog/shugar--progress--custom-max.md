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
progress.tsx
import React from "react";

type TProgressType = "default" | "success" | "warning" | "error" | "secondary";

interface ProgressProps {
  value: number;
  max?: number;
  colors?: { [key: string]: string; };
  type?: TProgressType;
}

const getColor = (value: number, type: TProgressType, colors?: any) => {
  if (colors) {
    const keys = Object.keys(colors);
    for (let i = keys.length - 1; i >= 0; i--) {
      if (value >= parseInt(keys[i])) {
        return colors[keys[i]];
      }
    }
  } else {
    switch (type) {
      case "default":
        return "var(--ds-gray-1000)";
      case "success":
        return "var(--ds-blue-700)";
      case "error":
        return "var(--ds-red-700)";
      case "warning":
        return "var(--ds-amber-700)";
      case "secondary":
        return "var(--ds-gray-700)";
    }
  }
};

export const Progress = ({ value, max = 100, colors, type = "default" }: ProgressProps) => {
  return (
    <progress
      value={value}
      max={max}
      className="text-gray-1000 appearance-none border-none [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-[5px] [&::-webkit-progress-value]:rounded-[5px] [&::-moz-progress-bar]:rounded-[5px] h-2.5 w-full [&::-webkit-progress-value]:transition-all [&::-moz-progress-bar]:transition-all"
      // @ts-ignore
      style={{ "--ds-progress-color": getColor(value, type, colors) }}
    />
  );
};

code.demo.1751618999928.tsx
import { Progress } from "@/components/ui/progress";

export default function CustomMaxDemo() {
  return <Progress max={40} value={30} />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress.tsx
import React from "react";

type TProgressType = "default" | "success" | "warning" | "error" | "secondary";

interface ProgressProps {
  value: number;
  max?: number;
  colors?: { [key: string]: string; };
  type?: TProgressType;
}

const getColor = (value: number, type: TProgressType, colors?: any) => {
  if (colors) {
    const keys = Object.keys(colors);
    for (let i = keys.length - 1; i >= 0; i--) {
      if (value >= parseInt(keys[i])) {
        return colors[keys[i]];
      }
    }
  } else {
    switch (type) {
      case "default":
        return "var(--ds-gray-1000)";
      case "success":
        return "var(--ds-blue-700)";
      case "error":
        return "var(--ds-red-700)";
      case "warning":
        return "var(--ds-amber-700)";
      case "secondary":
        return "var(--ds-gray-700)";
    }
  }
};

export const Progress = ({ value, max = 100, colors, type = "default" }: ProgressProps) => {
  return (
    <progress
      value={value}
      max={max}
      className="text-gray-1000 appearance-none border-none [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-bar]:rounded-[5px] [&::-webkit-progress-value]:rounded-[5px] [&::-moz-progress-bar]:rounded-[5px] h-2.5 w-full [&::-webkit-progress-value]:transition-all [&::-moz-progress-bar]:transition-all"
      // @ts-ignore
      style={{ "--ds-progress-color": getColor(value, type, colors) }}
    />
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
