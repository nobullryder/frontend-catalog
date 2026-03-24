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
steps.tsx
"use client";

import { Steps } from "@ark-ui/react/steps";

export default function BasicSteps() {
  const steps = [1, 2, 3, 4];

  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <Steps.Root count={4} defaultStep={1} className="w-full max-w-2xl">
        <Steps.List className="flex justify-between items-center">
          {steps.map((step, index) => (
            <Steps.Item
              key={step}
              index={index}
              className="relative flex not-last:flex-1 items-center"
            >
              <Steps.Trigger className="flex items-center gap-3 text-left rounded-md">
                <Steps.Indicator className="flex justify-center items-center shrink-0 rounded-full font-semibold w-8 h-8 text-sm border-2 data-complete:bg-blue-600 data-complete:text-white data-complete:border-blue-600 data-current:bg-blue-600 data-current:text-white data-current:border-blue-600 data-incomplete:bg-gray-100 data-incomplete:text-gray-500 data-incomplete:border-gray-200 dark:data-incomplete:bg-gray-700 dark:data-incomplete:text-gray-300 dark:data-incomplete:border-gray-600">
                  {step}
                </Steps.Indicator>
              </Steps.Trigger>
              <Steps.Separator
                hidden={index === steps.length - 1}
                className="flex-1 bg-gray-200 dark:bg-gray-700 h-0.5 mx-3 data-complete:bg-blue-600"
              />
            </Steps.Item>
          ))}
        </Steps.List>
      </Steps.Root>
    </div>
  );
}


code.demo.1756154461807.tsx
"use client";

import { Steps } from "@ark-ui/react/steps";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SegmentedSteps() {
  const steps = [1, 2, 3, 4];

  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <Steps.Root
        count={4}
        defaultStep={1}
        className="w-full max-w-2xl flex items-center gap-4"
      >
        <Steps.PrevTrigger className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent dark:text-gray-300 rounded-md">
          <ChevronLeft className="w-4 h-4" />
        </Steps.PrevTrigger>

        <Steps.List className="flex-1 flex justify-between items-start gap-1">
          {steps.map((step, index) => (
            <Steps.Item
              key={step}
              index={index}
              className="relative flex flex-col items-center flex-1"
            >
              <Steps.Trigger
                className="w-full flex flex-col items-start gap-2 text-left rounded-md group cursor-default"
                disabled
              >
                <Steps.Indicator className="w-full shrink-0 h-1 rounded-full data-complete:bg-blue-600 data-current:bg-blue-600 data-incomplete:bg-gray-300 dark:data-incomplete:bg-gray-600" />
              </Steps.Trigger>
            </Steps.Item>
          ))}
        </Steps.List>

        <Steps.NextTrigger className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent dark:text-gray-300 rounded-md">
          <ChevronRight className="w-4 h-4" />
        </Steps.NextTrigger>
      </Steps.Root>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/steps.tsx
"use client";

import { Steps } from "@ark-ui/react/steps";

export default function BasicSteps() {
  const steps = [1, 2, 3, 4];

  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <Steps.Root count={4} defaultStep={1} className="w-full max-w-2xl">
        <Steps.List className="flex justify-between items-center">
          {steps.map((step, index) => (
            <Steps.Item
              key={step}
              index={index}
              className="relative flex not-last:flex-1 items-center"
            >
              <Steps.Trigger className="flex items-center gap-3 text-left rounded-md">
                <Steps.Indicator className="flex justify-center items-center shrink-0 rounded-full font-semibold w-8 h-8 text-sm border-2 data-complete:bg-blue-600 data-complete:text-white data-complete:border-blue-600 data-current:bg-blue-600 data-current:text-white data-current:border-blue-600 data-incomplete:bg-gray-100 data-incomplete:text-gray-500 data-incomplete:border-gray-200 dark:data-incomplete:bg-gray-700 dark:data-incomplete:text-gray-300 dark:data-incomplete:border-gray-600">
                  {step}
                </Steps.Indicator>
              </Steps.Trigger>
              <Steps.Separator
                hidden={index === steps.length - 1}
                className="flex-1 bg-gray-200 dark:bg-gray-700 h-0.5 mx-3 data-complete:bg-blue-600"
              />
            </Steps.Item>
          ))}
        </Steps.List>
      </Steps.Root>
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
