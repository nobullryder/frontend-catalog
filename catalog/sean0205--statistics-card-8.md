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
statistics-card-8.tsx
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


code.demo.1753373424327.tsx
import { Badge } from '@/components/ui/badge-2';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, ShoppingCart, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const cards = [
  {
    icon: Briefcase,
    iconColor: 'text-green-600',
    title: 'Active Projects',
    badge: {
      color: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
      icon: TrendingUp,
      iconColor: 'text-green-500',
      text: '+12.8%',
    },
    value: 17,
    dateRange: 'From Jan 01 - Jul 30, 2024',
  },
  {
    icon: ShoppingCart,
    iconColor: 'text-blue-600',
    title: 'Orders Processed',
    badge: {
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
      icon: TrendingUp,
      iconColor: 'text-blue-500',
      text: '+3.7%',
    },
    value: 3421,
    dateRange: 'From Jan 01 - Jul 30, 2024',
  },
  {
    icon: Users,
    iconColor: 'text-pink-600',
    title: 'Churned Users',
    badge: {
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
      icon: TrendingDown,
      iconColor: 'text-pink-500',
      text: '-2.1%',
    },
    value: 89,
    dateRange: 'From Jan 01 - Jul 30, 2024',
  },
];

export default function StatisticCard8() {
  return (
    <div className="w-full max-w-5xl min-h-screen flex items-center justify-center p-6 lg:p-12">
      {/* Container */}
      <div className="@container grow w-full">
        {/* Grid */}
        <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-6">
          {/* Cards */}
          {cards.map((card, i) => (
            <Card key={i}>
              <CardContent className="flex flex-col h-full">
                {/* Title & Badge */}
                <div className="flex items-center justify-between mb-8">
                  <card.icon className={cn('size-6', card.iconColor)} />

                  <Badge className={cn('px-2 py-1 rounded-full', card.badge.color)}>
                    <card.badge.icon className={`w-3 h-3 ${card.badge.iconColor}`} />
                    {card.badge.text}
                  </Badge>
                </div>

                {/* Value & Date Range */}
                <div className="flex-1 flex flex-col justify-between grow">
                  {/* Value */}
                  <div>
                    <div className="text-base font-medium text-muted-foreground mb-1">{card.title}</div>
                    <div className="text-3xl font-bold text-foreground mb-6">{card.value.toLocaleString()}</div>
                  </div>
                  <div className="pt-3 border-t border-muted text-xs text-muted-foreground font-medium">
                    {card.dateRange}
                  </div>
                </div>
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
src/components/ui/statistics-card-8.tsx
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
