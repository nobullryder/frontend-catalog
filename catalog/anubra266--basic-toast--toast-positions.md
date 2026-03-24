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
basic-toast.tsx
"use client";

import { Toast, Toaster, createToaster } from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";

const toaster = createToaster({
  placement: "bottom-end",
  gap: 16,
  overlap: true,
});

export default function ToastBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <button
        type="button"
        onClick={() =>
          toaster.create({
            title: "Welcome!",
            description: "Your account has been created successfully.",
            type: "success",
          })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
      >
        Show Toast
      </button>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root className="bg-white rounded-lg shadow-md border border-gray-100 min-w-80 p-4 relative overflow-anywhere transition-all duration-300 ease-default will-change-transform h-(--height) opacity-(--opacity) translate-x-(--x) translate-y-(--y) scale-(--scale) z-(--z-index)">
              <Toast.Title className="text-gray-900 font-semibold text-sm">
                {toast.title}
              </Toast.Title>
              <Toast.Description className="text-gray-600 text-sm mt-1">
                {toast.description}
              </Toast.Description>
              <Toast.CloseTrigger className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  );
}


code.demo.1756145123657.tsx
"use client";

import { Toast, Toaster, createToaster } from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";

const positions = [
  { label: "Top Left", value: "top-start" as const },
  { label: "Top Center", value: "top" as const },
  { label: "Top Right", value: "top-end" as const },
  { label: "Bottom Left", value: "bottom-start" as const },
  { label: "Bottom Center", value: "bottom" as const },
  { label: "Bottom Right", value: "bottom-end" as const },
];

// Create toasters for each position
const toasters = positions.reduce((acc, pos) => {
  acc[pos.value] = createToaster({
    placement: pos.value,
    gap: 16,
    overlap: true,
  });
  return acc;
}, {} as Record<string, ReturnType<typeof createToaster>>);

export default function ToastPositions() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <div className="grid grid-cols-3 gap-2 max-w-md">
        {positions.map((position) => (
          <button
            key={position.value}
            type="button"
            onClick={() =>
              toasters[position.value].create({
                title: position.label,
                description: `Toast from ${position.label.toLowerCase()}.`,
                type: "info",
              })
            }
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs font-medium text-center"
          >
            {position.label}
          </button>
        ))}
      </div>

      {/* Render toasters for each position */}
      {positions.map((position) => (
        <Portal key={position.value}>
          <Toaster toaster={toasters[position.value]}>
            {(toast) => (
              <Toast.Root className="bg-white border-2 border-gray-300 rounded-xl shadow-lg min-w-80 p-4 relative overflow-anywhere transition-all duration-300 ease-default will-change-transform h-(--height) opacity-(--opacity) translate-x-(--x) translate-y-(--y) scale-(--scale) z-(--z-index)">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  <div className="flex-1">
                    <Toast.Title className="text-gray-900 font-semibold text-sm">
                      {toast.title}
                    </Toast.Title>
                    <Toast.Description className="text-gray-600 text-sm mt-1">
                      {toast.description}
                    </Toast.Description>
                  </div>
                </div>
                <Toast.CloseTrigger className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700">
                  <X className="w-3 h-3" />
                </Toast.CloseTrigger>
              </Toast.Root>
            )}
          </Toaster>
        </Portal>
      ))}
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/basic-toast.tsx
"use client";

import { Toast, Toaster, createToaster } from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";

const toaster = createToaster({
  placement: "bottom-end",
  gap: 16,
  overlap: true,
});

export default function ToastBasic() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex flex-col items-center">
      <button
        type="button"
        onClick={() =>
          toaster.create({
            title: "Welcome!",
            description: "Your account has been created successfully.",
            type: "success",
          })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
      >
        Show Toast
      </button>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root className="bg-white rounded-lg shadow-md border border-gray-100 min-w-80 p-4 relative overflow-anywhere transition-all duration-300 ease-default will-change-transform h-(--height) opacity-(--opacity) translate-x-(--x) translate-y-(--y) scale-(--scale) z-(--z-index)">
              <Toast.Title className="text-gray-900 font-semibold text-sm">
                {toast.title}
              </Toast.Title>
              <Toast.Description className="text-gray-600 text-sm mt-1">
                {toast.description}
              </Toast.Description>
              <Toast.CloseTrigger className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
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
