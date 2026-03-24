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
radio-group-list.tsx
"use client";

import { useId, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const RadioGroupListDemo = () => {
  const id = useId();
  type PlanType = "1" | "2" | "3";
  const [value, setValue] = useState<PlanType>("2");

  const items = [
    { value: "1", label: "Pro", price: "$39/mo" },
    { value: "2", label: "Team", price: "$69/mo" },
    { value: "3", label: "Enterprise", price: "Custom" },
  ];

  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => setValue(value as PlanType)}
      className="w-full max-w-96 gap-0 -space-y-px rounded-md shadow-xs"
    >
      {items.map((item) => (
        <div
          key={`${id}-${item.value}`}
          onClick={() => setValue(item.value as PlanType)}
          className={cn(
            "border-input relative flex cursor-pointer flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md",
            value === item.value && "bg-accent border-border z-10",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label
                htmlFor={`${id}-${item.value}`}
                className="flex items-center gap-2 cursor-pointer font-semibold"
              >
                {item.label}
                <Badge
                  id={`${id}-${item.value}-price`}
                  className="text-xs font-normal bg-blue-500/10 text-blue-500"
                >
                  {item.price}
                </Badge>
              </Label>
            </div>

            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="pointer-events-none"
              aria-describedby={`${id}-${item.value}-price`}
            />
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupListDemo;


code.demo.1772722542759.tsx
import  RadioGroupListDemo  from "@/components/ui/radio-group-list";

export default function DemoOne() {
  return <RadioGroupListDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio-group-list.tsx
"use client";

import { useId, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const RadioGroupListDemo = () => {
  const id = useId();
  type PlanType = "1" | "2" | "3";
  const [value, setValue] = useState<PlanType>("2");

  const items = [
    { value: "1", label: "Pro", price: "$39/mo" },
    { value: "2", label: "Team", price: "$69/mo" },
    { value: "3", label: "Enterprise", price: "Custom" },
  ];

  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => setValue(value as PlanType)}
      className="w-full max-w-96 gap-0 -space-y-px rounded-md shadow-xs"
    >
      {items.map((item) => (
        <div
          key={`${id}-${item.value}`}
          onClick={() => setValue(item.value as PlanType)}
          className={cn(
            "border-input relative flex cursor-pointer flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md",
            value === item.value && "bg-accent border-border z-10",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label
                htmlFor={`${id}-${item.value}`}
                className="flex items-center gap-2 cursor-pointer font-semibold"
              >
                {item.label}
                <Badge
                  id={`${id}-${item.value}-price`}
                  className="text-xs font-normal bg-blue-500/10 text-blue-500"
                >
                  {item.price}
                </Badge>
              </Label>
            </div>

            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="pointer-events-none"
              aria-describedby={`${id}-${item.value}-price`}
            />
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupListDemo;

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
