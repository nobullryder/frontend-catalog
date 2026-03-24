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
statistics-card-12.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};


code.demo.1753374103817.tsx
import { Badge } from '@/components/ui/badge-2';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, LifeBuoy, Smile } from 'lucide-react';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const cards = [
  {
    icon: LifeBuoy,
    iconBg: 'border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
    value: 320,
    label: 'Support Tickets',
    info: (
      <Badge variant="secondary" appearance="light">
        12 Open, 308 Closed
      </Badge>
    ),
  },
  {
    icon: CheckCircle2,
    iconBg: 'border-green-200 dark:border-green-800 text-green-600 dark:text-green-400',
    value: '98%',
    label: 'Resolved',
    info: (
      <Badge variant="success" appearance="light">
        +2.1% this month
      </Badge>
    ),
  },
  {
    icon: Smile,
    iconBg: 'border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400',
    value: '4.8',
    label: 'Satisfaction Rate',
    info: (
      <Badge variant="secondary" appearance="light">
        Avg. (out of 5)
      </Badge>
    ),
  },
];

export default function StatisticCard12() {
  return (
    <div className="w-full max-w-5xl min-h-screen flex items-center justify-center p-6 lg:p-8">
      <div className="@container grow w-full">
        <div className="grow grid grid-cols-1 @3xl:grid-cols-3 gap-5 max-w-5xl">
          {cards.map((card, i) => (
            <Card key={i}>
              <CardContent className="flex flex-col items-start gap-6">
                {/* Icon */}
                <div className={cn(`rounded-xl flex items-center justify-center size-12 border`, card.iconBg)}>
                  <card.icon className="size-6" />
                </div>

                {/* Value & Label */}
                <div className="space-y-0.5">
                  <div className="text-2xl font-bold text-foreground leading-none">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.label}</div>
                </div>

                {card.info}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


```

Copy-paste these files for dependencies:
```tsx
src/components/ui/statistics-card-12.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

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
