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
progress-1.tsx
"use client";

import { Progress } from "@ark-ui/react/progress";

export default function LinearBasic() {
  return (
    <Progress.Root defaultValue={65} className="w-full max-w-sm mx-auto">
      <Progress.Track className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <Progress.Range className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out rounded-full" />
      </Progress.Track>
    </Progress.Root>
  );
}


code.demo.1756196520584.tsx
"use client";

import { Progress } from "@ark-ui/react/progress";

export default function LinearIndeterminate() {
  return (
    <Progress.Root value={null} className="w-full max-w-sm mx-auto space-y-2">
      <Progress.Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Loading...
      </Progress.Label>
      <Progress.Track className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
        <Progress.Range className="h-full bg-blue-600 dark:bg-blue-500 rounded-full absolute inset-0 animate-pulse" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-600/20 to-transparent animate-[shimmer_2s_infinite] transform -translate-x-full" />
      </Progress.Track>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </Progress.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress-1.tsx
"use client";

import { Progress } from "@ark-ui/react/progress";

export default function LinearBasic() {
  return (
    <Progress.Root defaultValue={65} className="w-full max-w-sm mx-auto">
      <Progress.Track className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <Progress.Range className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out rounded-full" />
      </Progress.Track>
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
