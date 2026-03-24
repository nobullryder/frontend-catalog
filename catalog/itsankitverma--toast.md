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
toast.tsx
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon } from 'lucide-react'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

export const Basic = () => {
  return (
    <div className="p-6 space-y-4 text-center">
      {/* Section Title + Description */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Toast Notifications
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 w-80 py-3">
          Click the button below to trigger a sample toast notification with a title and description.
        </p>
      </div>

      {/* Button */}
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md 
                   hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        onClick={() =>
          toaster.create({
            title: 'Action Completed',
            description: 'Your request has been processed successfully.',
            type: 'info',
          })
        }
      >
        Add Toast
      </button>

      {/* Toaster */}
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root
            key={toast.id}
            className="rounded-xl shadow-lg p-4 mb-2 w-80 
                       bg-white text-gray-900 
                       dark:bg-gray-800 dark:text-gray-100 
                       border border-gray-200 dark:border-gray-700 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <Toast.Title className="font-semibold text-base">
                  {toast.title || 'Notification'}
                </Toast.Title>
                <Toast.Description className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {toast.description || 'No additional details provided.'}
                </Toast.Description>
              </div>
              <Toast.CloseTrigger
                className="text-gray-500 hover:text-gray-700 
                           dark:text-gray-400 dark:hover:text-gray-200 transition"
              >
                <XIcon className="w-5 h-5" />
              </Toast.CloseTrigger>
            </div>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}


code.demo.1756483741878.tsx
import { Basic } from "@/components/ui/toast";

export default function DemoOne() {
  return <Basic />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/toast.tsx
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon } from 'lucide-react'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
})

export const Basic = () => {
  return (
    <div className="p-6 space-y-4 text-center">
      {/* Section Title + Description */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Toast Notifications
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 w-80 py-3">
          Click the button below to trigger a sample toast notification with a title and description.
        </p>
      </div>

      {/* Button */}
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md 
                   hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        onClick={() =>
          toaster.create({
            title: 'Action Completed',
            description: 'Your request has been processed successfully.',
            type: 'info',
          })
        }
      >
        Add Toast
      </button>

      {/* Toaster */}
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root
            key={toast.id}
            className="rounded-xl shadow-lg p-4 mb-2 w-80 
                       bg-white text-gray-900 
                       dark:bg-gray-800 dark:text-gray-100 
                       border border-gray-200 dark:border-gray-700 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <Toast.Title className="font-semibold text-base">
                  {toast.title || 'Notification'}
                </Toast.Title>
                <Toast.Description className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {toast.description || 'No additional details provided.'}
                </Toast.Description>
              </div>
              <Toast.CloseTrigger
                className="text-gray-500 hover:text-gray-700 
                           dark:text-gray-400 dark:hover:text-gray-200 transition"
              >
                <XIcon className="w-5 h-5" />
              </Toast.CloseTrigger>
            </div>
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
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
