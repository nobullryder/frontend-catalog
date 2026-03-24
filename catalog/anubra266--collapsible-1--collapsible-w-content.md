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
collapsible-1.tsx
import { Collapsible } from "@ark-ui/react/collapsible";
import { ChevronDownIcon } from "lucide-react";

export default function BasicCollapsible() {
  return (
    <Collapsible.Root className="w-full max-w-sm h-40">
      <Collapsible.Trigger className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
        Toggle
        <Collapsible.Indicator className="transition-transform duration-200 data-[state=open]:rotate-180">
          <ChevronDownIcon className="w-4 h-4" />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Content
          </p>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
} 

code.demo.1756417984200.tsx
import { Collapsible } from "@ark-ui/react/collapsible";
import { ChevronDownIcon } from "lucide-react";

export default function CollapsibleWithContent() {
  return (
    <div className="w-full max-w-md space-y-4 h-52">
      <Collapsible.Root>
        <Collapsible.Trigger className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
          <span>What is React?</span>
          <Collapsible.Indicator className="transition-transform duration-200 data-[state=open]:rotate-180">
            <ChevronDownIcon className="w-5 h-5" />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
          <div className="px-4 py-3 border-x border-b border-gray-300 dark:border-gray-600 rounded-b-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              React is a free and open-source front-end JavaScript library for
              building user interfaces based on components. It is maintained by
              Meta and a community of individual developers and companies.
            </p>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      <Collapsible.Root>
        <Collapsible.Trigger className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
          <span>How do I get started?</span>
          <Collapsible.Indicator className="transition-transform duration-200 data-[state=open]:rotate-180">
            <ChevronDownIcon className="w-5 h-5" />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
          <div className="px-4 py-3 border-x border-b border-gray-300 dark:border-gray-600 rounded-b-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              You can start by installing React using npm or yarn, then create
              your first component. Check out the official React documentation
              for detailed tutorials and guides.
            </p>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/collapsible-1.tsx
import { Collapsible } from "@ark-ui/react/collapsible";
import { ChevronDownIcon } from "lucide-react";

export default function BasicCollapsible() {
  return (
    <Collapsible.Root className="w-full max-w-sm h-40">
      <Collapsible.Trigger className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
        Toggle
        <Collapsible.Indicator className="transition-transform duration-200 data-[state=open]:rotate-180">
          <ChevronDownIcon className="w-4 h-4" />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Content
          </p>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
} 
```

Install NPM dependencies:
```bash
@ark-ui/react, lucide-react
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
