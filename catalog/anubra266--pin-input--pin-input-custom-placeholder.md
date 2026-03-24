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
pin-input.tsx
"use client";

import { PinInput } from "@ark-ui/react/pin-input";

export default function Basic() {
  return (
    <div className="flex items-center justify-center min-h-32">
      <div className="w-80">
        <PinInput.Root onValueComplete={(e) => console.log(e.valueAsString)}>
          <PinInput.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            Enter PIN
          </PinInput.Label>
          <PinInput.Control className="flex gap-2">
            {[0, 1, 2, 3].map((_, index) => (
              <PinInput.Input
                key={index}
                index={index}
                className="w-12 h-12 text-center text-lg font-medium border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
              />
            ))}
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.Root>
      </div>
    </div>
  );
}


code.demo.1756242175983.tsx
"use client";

import { PinInput } from "@ark-ui/react/pin-input";

export default function CustomPlaceholder() {
  return (
    <div className="flex items-center justify-center min-h-32">
      <div className="w-80">
        <PinInput.Root
          placeholder="*"
          onValueComplete={(e) => console.log(e.valueAsString)}
        >
          <PinInput.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            Enter access code
          </PinInput.Label>
          <PinInput.Control className="flex gap-2">
            {[0, 1, 2, 3, 4].map((_, index) => (
              <PinInput.Input
                key={index}
                index={index}
                className="w-12 h-12 text-center text-lg font-medium border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
              />
            ))}
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.Root>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Uses asterisk (*) as placeholder instead of default circle
        </p>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/pin-input.tsx
"use client";

import { PinInput } from "@ark-ui/react/pin-input";

export default function Basic() {
  return (
    <div className="flex items-center justify-center min-h-32">
      <div className="w-80">
        <PinInput.Root onValueComplete={(e) => console.log(e.valueAsString)}>
          <PinInput.Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            Enter PIN
          </PinInput.Label>
          <PinInput.Control className="flex gap-2">
            {[0, 1, 2, 3].map((_, index) => (
              <PinInput.Input
                key={index}
                index={index}
                className="w-12 h-12 text-center text-lg font-medium border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
              />
            ))}
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.Root>
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
