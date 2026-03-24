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
basic-slider.tsx
"use client";

import { Slider } from "@ark-ui/react/slider";

export default function BasicSlider() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-md w-full">
        <Slider.Root>
          <Slider.ValueText className="text-sm text-gray-600 dark:text-gray-400 mb-4" />
          <Slider.Control className="relative flex items-center h-5">
            <Slider.Track className="relative flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <Slider.Range className="absolute h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              className="relative w-5 h-5 bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 rounded-full shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 z-10"
            >
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </div>
    </div>
  );
}


code.demo.1756190713047.tsx
"use client";

import { Slider } from "@ark-ui/react/slider";

export default function VerticalSlider() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-md w-full flex justify-center">
        <Slider.Root
          defaultValue={[50]}
          orientation="vertical"
          className="h-64"
        >
          <Slider.Control className="relative flex flex-col items-center h-full w-5">
            <Slider.Track className="relative flex-1 w-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <Slider.Range className="absolute w-full bg-blue-600 dark:bg-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              className="relative w-5 h-5 bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 rounded-full shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 z-10"
            >
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/basic-slider.tsx
"use client";

import { Slider } from "@ark-ui/react/slider";

export default function BasicSlider() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-md w-full">
        <Slider.Root>
          <Slider.ValueText className="text-sm text-gray-600 dark:text-gray-400 mb-4" />
          <Slider.Control className="relative flex items-center h-5">
            <Slider.Track className="relative flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <Slider.Range className="absolute h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              className="relative w-5 h-5 bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 rounded-full shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 z-10"
            >
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>
        </Slider.Root>
      </div>
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
