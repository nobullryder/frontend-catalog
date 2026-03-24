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
checkbox-1.tsx
import { Checkbox } from "@ark-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

export default function BasicCheckbox() {
  return (
    <Checkbox.Root className="flex items-center gap-3 cursor-pointer">
      <Checkbox.Control className="w-5 h-5 bg-white border-2 border-gray-300 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-hover:border-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500 dark:data-hover:border-gray-400 transition-all duration-200 flex items-center justify-center">
        <Checkbox.Indicator>
          <CheckIcon className="w-3.5 h-3.5 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer">
        Accept terms and conditions
      </Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}


code.demo.1756418319876.tsx
"use client";
import { Checkbox } from "@ark-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

export default function SimpleTodoCheckbox() {
  const [completed, setCompleted] = useState(true);

  return (
    <div className="max-w-md">
      <Checkbox.Root
        checked={completed}
        onCheckedChange={(details) => setCompleted(details.checked === true)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <Checkbox.Control className="w-5 h-5 bg-white border-2 border-gray-300 rounded data-[state=checked]:bg-slate-700 data-[state=checked]:border-slate-700 data-hover:border-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:data-[state=checked]:bg-slate-400 dark:data-[state=checked]:border-slate-400 dark:data-hover:border-gray-400 transition-all duration-200 flex items-center justify-center">
          <Checkbox.Indicator>
            <CheckIcon className="w-3.5 h-3.5 text-white dark:text-slate-800" />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label
          className={`text-base cursor-pointer transition-all duration-200 ${
            completed
              ? "text-gray-500 line-through dark:text-gray-400"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          Simple todo item
        </Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/checkbox-1.tsx
import { Checkbox } from "@ark-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

export default function BasicCheckbox() {
  return (
    <Checkbox.Root className="flex items-center gap-3 cursor-pointer">
      <Checkbox.Control className="w-5 h-5 bg-white border-2 border-gray-300 rounded data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-hover:border-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500 dark:data-hover:border-gray-400 transition-all duration-200 flex items-center justify-center">
        <Checkbox.Indicator>
          <CheckIcon className="w-3.5 h-3.5 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer">
        Accept terms and conditions
      </Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}

```

Install NPM dependencies:
```bash
lucide-react, @ark-ui/react
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
