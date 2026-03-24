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

export default function Vertical() {
  return (
    <div className="flex items-center justify-center gap-8 h-48">
      {/* With Label */}
      <div className="flex flex-col items-center space-y-3">
        <Progress.Root
          defaultValue={65}
          orientation="vertical"
          className="h-32"
        >
          <Progress.Track className="w-2 h-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex flex-col justify-end">
            <Progress.Range className="w-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out rounded-full" />
          </Progress.Track>
        </Progress.Root>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          65%
        </span>
      </div>

      {/* Different Heights */}
      <div className="flex items-end gap-4 h-32">
        <Progress.Root
          defaultValue={40}
          orientation="vertical"
          className="h-20"
        >
          <Progress.Track className="w-2 h-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex flex-col justify-end">
            <Progress.Range className="w-full bg-green-600 dark:bg-green-500 transition-all duration-300 ease-out rounded-full" />
          </Progress.Track>
        </Progress.Root>

        <Progress.Root
          defaultValue={75}
          orientation="vertical"
          className="h-28"
        >
          <Progress.Track className="w-2 h-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex flex-col justify-end">
            <Progress.Range className="w-full bg-orange-600 dark:bg-orange-500 transition-all duration-300 ease-out rounded-full" />
          </Progress.Track>
        </Progress.Root>

        <Progress.Root
          defaultValue={90}
          orientation="vertical"
          className="h-32"
        >
          <Progress.Track className="w-2 h-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex flex-col justify-end">
            <Progress.Range className="w-full bg-red-600 dark:bg-red-500 transition-all duration-300 ease-out rounded-full" />
          </Progress.Track>
        </Progress.Root>
      </div>
    </div>
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
