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
progress-1.tsx
import * as React from 'react';
import { Progress } from '@base-ui-components/react/progress';

export default function ExampleProgress() {
  const [value, setValue] = React.useState(20);

  // Simulate changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => Math.min(100, Math.round(current + Math.random() * 25)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress.Root className="grid w-48 grid-cols-2 gap-y-2" value={value}>
      <Progress.Label className="text-sm font-medium text-gray-900">
        Export data
      </Progress.Label>
      <Progress.Value className="col-start-2 text-right text-sm text-gray-900" />
      <Progress.Track className="col-span-full h-1 overflow-hidden rounded bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200">
        <Progress.Indicator className="block bg-gray-500 transition-all duration-500" />
      </Progress.Track>
    </Progress.Root>
  );
}


code.demo.1753379121356.tsx
import * as React from 'react';
import { Meter } from '@base-ui-components/react/meter';

export default function ExampleMeter() {
  return (
    <Meter.Root className="box-border grid w-48 grid-cols-2 gap-y-2" value={24}>
      <Meter.Label className="text-sm font-medium text-gray-900">
        Storage Used
      </Meter.Label>
      <Meter.Value className="col-start-2 m-0 text-right text-sm leading-5 text-gray-900" />
      <Meter.Track className="col-span-2 block h-2 w-48 overflow-hidden bg-gray-100 shadow-[inset_0_0_0_1px] shadow-gray-200">
        <Meter.Indicator className="block bg-gray-500 transition-all duration-500" />
      </Meter.Track>
    </Meter.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress-1.tsx
import * as React from 'react';
import { Progress } from '@base-ui-components/react/progress';

export default function ExampleProgress() {
  const [value, setValue] = React.useState(20);

  // Simulate changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => Math.min(100, Math.round(current + Math.random() * 25)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress.Root className="grid w-48 grid-cols-2 gap-y-2" value={value}>
      <Progress.Label className="text-sm font-medium text-gray-900">
        Export data
      </Progress.Label>
      <Progress.Value className="col-start-2 text-right text-sm text-gray-900" />
      <Progress.Track className="col-span-full h-1 overflow-hidden rounded bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200">
        <Progress.Indicator className="block bg-gray-500 transition-all duration-500" />
      </Progress.Track>
    </Progress.Root>
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
