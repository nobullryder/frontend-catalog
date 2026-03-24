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
active-effect.tsx
"use client";

import { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SwitchActiveEffectDemo = () => {
  const id = useId();
  const [checked, setChecked] = useState(false);

  const toggle = () => setChecked((prev) => !prev);

  return (
    <div
      className="border border-input has-data-checked:border-primary/50 relative flex w-full items-start justify-between gap-2 rounded-md p-4 outline-none"
      onClick={toggle}
    >
      <div className="flex flex-col gap-2 grow">
        <Label htmlFor={id} onClick={toggle}>
          Remember me
        </Label>
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          Save my login details for next time.
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
      />
    </div>
  );
};

export default SwitchActiveEffectDemo;


code.demo.1772714159865.tsx
import SwitchActiveEffectDemo from "@/components/ui/active-effect";

export default function DemoOne() {
  return (
    <div className="p-4 w-full">
      <SwitchActiveEffectDemo />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/active-effect.tsx
"use client";

import { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SwitchActiveEffectDemo = () => {
  const id = useId();
  const [checked, setChecked] = useState(false);

  const toggle = () => setChecked((prev) => !prev);

  return (
    <div
      className="border border-input has-data-checked:border-primary/50 relative flex w-full items-start justify-between gap-2 rounded-md p-4 outline-none"
      onClick={toggle}
    >
      <div className="flex flex-col gap-2 grow">
        <Label htmlFor={id} onClick={toggle}>
          Remember me
        </Label>
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          Save my login details for next time.
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
      />
    </div>
  );
};

export default SwitchActiveEffectDemo;

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
