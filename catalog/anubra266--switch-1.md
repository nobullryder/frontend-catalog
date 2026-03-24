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
switch-1.tsx
"use client";

import { Switch } from "@ark-ui/react/switch";

export default function SwitchBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <Switch.Root className="flex items-center gap-3">
        <Switch.Control className="relative inline-flex w-11 p-0.5 items-center rounded-full bg-gray-300 transition-colors duration-200 ease-in-out data-[state=checked]:bg-blue-500 data-focus-visible:ring-2 data-focus-visible:ring-gray-300/50 data-[state=checked]:data-focus-visible:ring-gray-300/50 dark:bg-gray-600 dark:data-[state=checked]:bg-blue-500">
          <Switch.Thumb className="w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-full" />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>
    </div>
  );
}


code.demo.1756154623505.tsx
import SwitchBasic from "@/components/ui/switch-1";

export default function DemoOne() {
  return <SwitchBasic />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/switch-1.tsx
"use client";

import { Switch } from "@ark-ui/react/switch";

export default function SwitchBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <Switch.Root className="flex items-center gap-3">
        <Switch.Control className="relative inline-flex w-11 p-0.5 items-center rounded-full bg-gray-300 transition-colors duration-200 ease-in-out data-[state=checked]:bg-blue-500 data-focus-visible:ring-2 data-focus-visible:ring-gray-300/50 data-[state=checked]:data-focus-visible:ring-gray-300/50 dark:bg-gray-600 dark:data-[state=checked]:bg-blue-500">
          <Switch.Thumb className="w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-full" />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>
    </div>
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
