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
progress-bar.tsx
"use client";

import { useEffect, useState } from "react";
import { Progress } from "@ark-ui/react/progress";

type ProgressWithLabelProps = {
  value: number;              
  label?: string;         
  delay?: number;         
  duration?: number;     
  colorFrom?: string;        
  colorTo?: string;         
  className?: string;
};

export function ProgressWithLabel({
  value,
  label,
  delay,
  duration,
  colorFrom,
  colorTo,
  className,
}: ProgressWithLabelProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <Progress.Root
      value={progress}
      className={`w-full max-w-md mx-auto space-y-3 p-4 rounded-2xl shadow-sm 
        bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {label && (
        <div className="flex justify-between items-center">
          <Progress.Label className="text-base font-semibold text-gray-800 dark:text-gray-200">
            {label}
          </Progress.Label>
        </div>
      )}

      <div className="relative w-full">
        <Progress.Track className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <Progress.Range
            className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo} 
              transition-all ease-out rounded-full shadow-sm`}
            style={{ transitionDuration: `${duration}ms` }}
          />
        </Progress.Track>
        <Progress.ValueText className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white" />
      </div>
    </Progress.Root>
  );
}


code.demo.1757052424247.tsx
import { ProgressWithLabel } from "@/components/ui/progress-bar";

export default function DemoOne() {
  return <ProgressWithLabel 
  value={76} 
  label="Upload Progress" 
  colorFrom="from-red-500" 
  colorTo="to-pink-600"
  duration={2000}
  delay={200}
/>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress-bar.tsx
"use client";

import { useEffect, useState } from "react";
import { Progress } from "@ark-ui/react/progress";

type ProgressWithLabelProps = {
  value: number;              
  label?: string;         
  delay?: number;         
  duration?: number;     
  colorFrom?: string;        
  colorTo?: string;         
  className?: string;
};

export function ProgressWithLabel({
  value,
  label,
  delay,
  duration,
  colorFrom,
  colorTo,
  className,
}: ProgressWithLabelProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <Progress.Root
      value={progress}
      className={`w-full max-w-md mx-auto space-y-3 p-4 rounded-2xl shadow-sm 
        bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {label && (
        <div className="flex justify-between items-center">
          <Progress.Label className="text-base font-semibold text-gray-800 dark:text-gray-200">
            {label}
          </Progress.Label>
        </div>
      )}

      <div className="relative w-full">
        <Progress.Track className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <Progress.Range
            className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo} 
              transition-all ease-out rounded-full shadow-sm`}
            style={{ transitionDuration: `${duration}ms` }}
          />
        </Progress.Track>
        <Progress.ValueText className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white" />
      </div>
    </Progress.Root>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react
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
