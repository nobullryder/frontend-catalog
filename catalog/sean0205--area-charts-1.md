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
area-charts-1.tsx
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


code.demo.1753376923606.tsx
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleDollarSign, TrendingUp, UserPlus } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

// Business Case 1: SaaS Revenue Tracking
const revenueData = [
  { value: 1000 },
  { value: 4500 },
  { value: 2000 },
  { value: 5200 },
  { value: 1500 },
  { value: 6100 },
  { value: 3000 },
  { value: 6800 },
  { value: 2000 },
  { value: 1000 },
  { value: 4000 },
  { value: 2000 },
  { value: 3000 },
  { value: 2000 },
  { value: 6238 },
];

// Business Case 2: New Customer Acquisition
const customersData = [
  { value: 2000 },
  { value: 4500 },
  { value: 2000 },
  { value: 5200 },
  { value: 1500 },
  { value: 5100 },
  { value: 2500 },
  { value: 6800 },
  { value: 1800 },
  { value: 1000 },
  { value: 3000 },
  { value: 2000 },
  { value: 2700 },
  { value: 2000 },
  { value: 4238 },
];

// Business Case 3: Monthly Active Users
const activeUsersData = [
  { value: 2000 },
  { value: 3500 },
  { value: 2000 },
  { value: 5200 },
  { value: 1200 },
  { value: 4100 },
  { value: 3500 },
  { value: 5800 },
  { value: 2000 },
  { value: 800 },
  { value: 3000 },
  { value: 1000 },
  { value: 4000 },
  { value: 2000 },
  { value: 4238 },
];

// Business cards configuration
// Use custom or Tailwind standard colors: https://tailwindcss.com/docs/colors
const businessCards = [
  {
    title: 'Revenue',
    period: 'Last 28 days',
    value: '6.238$',
    timestamp: '',
    data: revenueData,
    color: 'var(--color-emerald-500)',
    icon: CircleDollarSign,
    gradientId: 'revenueGradient',
  },
  {
    title: 'New Customers',
    period: 'Last 28 days',
    value: '6.202',
    timestamp: '3h ago',
    data: customersData,
    color: 'var(--color-blue-500)',
    icon: UserPlus,
    gradientId: 'customersGradient',
  },
  {
    title: 'Active Users',
    period: 'Last 28 days',
    value: '18.945',
    timestamp: '1h ago',
    data: activeUsersData,
    color: 'var(--color-violet-500)',
    icon: TrendingUp,
    gradientId: 'usersGradient',
  },
];

export default function AreaChart1() {
  return (
    <div className="w-full max-w-5xl min-h-screen flex items-center justify-center p-6 lg:p-8">
      <div className="@container w-full max-w-6xl">
        {/* Grid of 3 cards */}
        <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-6">
          {businessCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Card key={i}>
                <CardContent className="space-y-5">
                  {/* Header with icon and title */}
                  <div className="flex items-center gap-2">
                    <Icon className="size-5" style={{ color: card.color }} />
                    <span className="text-base font-semibold">{card.title}</span>
                  </div>

                  <div className="flex items-end gap-2.5 justify-between">
                    {/* Details */}
                    <div className="flex flex-col gap-1">
                      {/* Period */}
                      <div className="text-sm text-muted-foreground whitespace-nowrap">{card.period}</div>

                      {/* Value */}
                      <div className="text-3xl font-bold text-foreground tracking-tight">{card.value}</div>
                    </div>

                    {/* Chart */}
                    <div className="max-w-40 h-16 w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={card.data}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 5,
                          }}
                        >
                          <defs>
                            <linearGradient id={card.gradientId} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={card.color} stopOpacity={0.3} />
                              <stop offset="100%" stopColor={card.color} stopOpacity={0.05} />
                            </linearGradient>
                            <filter id={`dotShadow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.5)" />
                            </filter>
                          </defs>

                          <Tooltip
                            cursor={{ stroke: card.color, strokeWidth: 1, strokeDasharray: '2 2' }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const value = payload[0].value as number;
                                const formatValue = (val: number) => {
                                  if (card.title === 'Revenue') {
                                    return `${(val / 1000).toFixed(1)}k US$`;
                                  } else if (card.title === 'New Customers') {
                                    return `${(val / 1000).toFixed(1)}k`;
                                  } else {
                                    return `${(val / 1000).toFixed(1)}k`;
                                  }
                                };

                                return (
                                  <div className="bg-background/95 backdrop-blur-sm border border-border shadow-lg rounded-lg p-2 pointer-events-none">
                                    <p className="text-sm font-semibold text-foreground">{formatValue(value)}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />

                          {/* Area with gradient and enhanced shadow */}
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={card.color}
                            fill={`url(#${card.gradientId})`}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                              r: 6,
                              fill: card.color,
                              stroke: 'white',
                              strokeWidth: 2,
                              filter: `url(#dotShadow${i})`,
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}


```

Copy-paste these files for dependencies:
```tsx
src/components/ui/area-charts-1.tsx
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
