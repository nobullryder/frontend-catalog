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
separator-1.tsx
import * as React from 'react';
import { Separator } from '@base-ui-components/react/separator';

export default function ExampleSeparator() {
  return (
    <div className="flex gap-4 text-nowrap">
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Home
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Pricing
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Blog
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Support
      </a>

      <Separator orientation="vertical" className="w-px bg-gray-300" />

      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Log in
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Sign up
      </a>
    </div>
  );
}


code.demo.1753378039606.tsx
import ExampleSeparator  from "@/components/ui/separator-1";

export default function DemoOne() {
  return <ExampleSeparator />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/separator-1.tsx
import * as React from 'react';
import { Separator } from '@base-ui-components/react/separator';

export default function ExampleSeparator() {
  return (
    <div className="flex gap-4 text-nowrap">
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Home
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Pricing
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Blog
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Support
      </a>

      <Separator orientation="vertical" className="w-px bg-gray-300" />

      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Log in
      </a>
      <a
        href="#"
        className="text-sm text-gray-900 decoration-gray-400 decoration-1 underline-offset-2 outline-none hover:underline focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800"
      >
        Sign up
      </a>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@base-ui-components/react
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
