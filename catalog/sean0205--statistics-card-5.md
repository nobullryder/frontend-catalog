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
statistics-card-5.tsx
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


code.demo.1753163067432.tsx
import { Button } from '@/components/ui/button-1';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '@/components/ui/card';
import { BanknoteArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const balanceData = {
  balance: 10976.95,
  delta: 5.7,
  currencies: [
    { code: 'USD', percent: 30, color: 'bg-white' },
    { code: 'GBP', percent: 20, color: 'bg-indigo-400' },
    { code: 'EUR', percent: 15, color: 'bg-blue-500' },
    { code: 'JPY', percent: 20, color: 'bg-violet-600' },
    { code: 'CNY', percent: 15, color: 'bg-fuchsia-600' },
  ],
};

export default function StatisticCard5() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 lg:p-8">
      <Card className="w-full max-w-xl rounded-2xl shadow-xl border-0 bg-zinc-900  text-white">
        <CardHeader className="border-0 pb-2 pt-6">
          <CardTitle className="text-lg font-semibold text-zinc-400">Balance</CardTitle>
          <CardToolbar>
            <Button className="bg-zinc-800 text-zinc-100 border-zinc-800 hover:bg-zinc-700 hover:text-zinc-100">
              <BanknoteArrowUp />
              Topup
            </Button>
          </CardToolbar>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-5">
            <span className="text-3xl font-bold tracking-tight text-white">
              ${balanceData.balance.toLocaleString()}
            </span>
            <span className="text-base font-semibold text-green-400 ms-2">+{balanceData.delta}%</span>
          </div>

          <div className="border-b border-zinc-700 mb-6" />

          {/* Segmented Progress Bar */}
          <div className="flex items-center gap-1.5 w-full mb-3">
            {balanceData.currencies.map((cur) => (
              <div
                key={cur.code}
                className="space-y-2.5"
                style={{
                  width: `${cur.percent}%`,
                }}
              >
                <div className={cn(cur.color, 'h-2.5 w-full overflow-hidden  rounded-sm transition-all')} />

                <div key={cur.code} className="flex flex-col items-start flex-1">
                  <span className="text-xs text-zinc-400 font-medium">{cur.code}</span>
                  <span className="text-base font-semibold text-white">{cur.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/statistics-card-5.tsx
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
