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
statistics-card-15.tsx
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


code.demo.1753373727363.tsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChartNoAxesCombined, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const cards = [
  {
    color: 'bg-blue-600',
    icon: ChartNoAxesCombined,
    value: '27.3%',
    title: 'NPS Improvement',
    desc: 'Our new onboarding flow increased Net Promoter Score by 27.3% in Q2.',
    cta: 'Read full story',
  },
  {
    color: 'bg-emerald-600',
    icon: Users,
    value: '8,200',
    title: 'Active Users',
    desc: 'Highest monthly active users since launch. Engagement up 12% MoM.',
    cta: 'See user insights',
  },
  {
    color: 'bg-fuchsia-700',
    icon: TrendingUp,
    value: '$1.4M',
    title: 'ARR Growth',
    desc: 'Annual recurring revenue grew by $1.4M in the last quarter.',
    cta: 'View ARR breakdown',
  },
];

export default function StatisticCard15() {
  return (
    <div className="w-full max-w-5xl min-h-screen flex items-center justify-center p-6 lg:p-8">
      <div className="@container grow w-full">
        <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-8 w-full">
          {cards.map((card, i) => (
            <Card key={i} className={cn('rounded-2xl overflow-hidden shadow-lg p-0 border-0', card.color)}>
              <CardContent className="relative overflow-hidden flex flex-col justify-end py-6 px-0 pb-0">
                {/* Icon */}
                <div className="px-6 mb-3.5">
                  <card.icon className="size-8 text-white/60" />
                </div>

                {/* Main content */}
                <div className="flex-1 flex flex-col justify-center items-start px-6">
                  <div className="text-white text-4xl font-bold mb-6">{card.value}</div>
                  <div className="text-white text-lg font-semibold mb-1">{card.title}</div>
                  <div className="text-white/80 text-sm mb-2">{card.desc}</div>
                </div>

                {/* Bottom bar */}
                <Link
                  href="#"
                  className="group/card w-full bg-black/90 dark:bg-zinc-800 px-6 py-4 flex items-center justify-between mt-6"
                >
                  <span className="text-white text-sm font-medium">{card.cta}</span>
                  <ArrowRight className="group-hover/card:translate-x-1 transition-transform duration-300 w-5 h-5 text-white" />
                </Link>
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
src/components/ui/statistics-card-15.tsx
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
