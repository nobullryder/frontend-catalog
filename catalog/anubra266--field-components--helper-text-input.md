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
field-components.tsx
import { Field } from "@ark-ui/react/field";

export default function SimpleInput() {
  return (
      <Field.Root className="max-w-sm w-full">
        <Field.Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Personal Email
        </Field.Label>
        <Field.Input
          type="email"
          placeholder="john.doe@example.com"
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-900 dark:focus:border-gray-100 focus:outline-hidden focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100"
        />
      </Field.Root>
  );
}


code.demo.1756339627539.tsx
import { Field } from "@ark-ui/react/field";

export default function InputWithHelperText() {
  return (
    <Field.Root className="max-w-sm w-full">
      <Field.Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Recovery Email
      </Field.Label>
      <Field.Input
        type="email"
        placeholder="backup@yourmail.com"
        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-900 dark:focus:border-gray-100 focus:outline-hidden focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100"
      />
      <Field.HelperText className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Used for account recovery and security notifications
      </Field.HelperText>
    </Field.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/field-components.tsx
import { Field } from "@ark-ui/react/field";

export default function SimpleInput() {
  return (
      <Field.Root className="max-w-sm w-full">
        <Field.Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Personal Email
        </Field.Label>
        <Field.Input
          type="email"
          placeholder="john.doe@example.com"
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-900 dark:focus:border-gray-100 focus:outline-hidden focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100"
        />
      </Field.Root>
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
