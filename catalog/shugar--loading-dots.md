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
loading-dots.tsx
import React from "react";

interface LoadingDotsProps {
  size?: number;
  children?: React.ReactNode;
}

const dots = [
  { animationDelay: "0s" },
  { animationDelay: "0.2s", marginLeft: 1 },
  { animationDelay: "0.4s", marginLeft: 1 },
]

export const LoadingDots = ({ size = 2, children }: LoadingDotsProps) => {
  return (
    <span className="inline-flex items-center">
      {children && <div className="mr-3">{children}</div>}
      {dots.map((dot) => (
        <span
          className="bg-gray-900 inline-block rounded-[50%] animate-loading"
          style={{ height: size, width: size, ...dot }}
        />
      ))}
    </span>
  );
};

code.demo.1751388869025.tsx
import { LoadingDots } from "@/components/ui/loading-dots";

export default function DefaultDemo() {
  return (
    <div className="flex flex-col gap-4">
      <LoadingDots />
      <LoadingDots size={4} />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loading-dots.tsx
import React from "react";

interface LoadingDotsProps {
  size?: number;
  children?: React.ReactNode;
}

const dots = [
  { animationDelay: "0s" },
  { animationDelay: "0.2s", marginLeft: 1 },
  { animationDelay: "0.4s", marginLeft: 1 },
]

export const LoadingDots = ({ size = 2, children }: LoadingDotsProps) => {
  return (
    <span className="inline-flex items-center">
      {children && <div className="mr-3">{children}</div>}
      {dots.map((dot) => (
        <span
          className="bg-gray-900 inline-block rounded-[50%] animate-loading"
          style={{ height: size, width: size, ...dot }}
        />
      ))}
    </span>
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
