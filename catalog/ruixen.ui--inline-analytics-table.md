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
inline-analytics-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

const items = [
  { id: "1", region: "North America", sales: 1200, revenue: 25000, growth: 12 },
  { id: "2", region: "Europe", sales: 900, revenue: 18000, growth: -5 },
  { id: "3", region: "Asia", sales: 1500, revenue: 30000, growth: 20 },
  { id: "4", region: "South America", sales: 600, revenue: 10000, growth: 8 },
  { id: "5", region: "Africa", sales: 400, revenue: 7000, growth: -3 },
];

// utility for growth trend icons
function GrowthIcon({ growth }: { growth: number }) {
  return growth >= 0 ? (
    <TrendingUp className="h-4 w-4 text-green-500" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-500" />
  );
}

export default function InlineAnalyticsTable() {
  return (
    <div className="bg-background p-4 overflow-x-auto">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Region</TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Sales</span>
                <Progress value={70} className="h-1 mt-1" />
              </div>
            </TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Revenue</span>
                <Progress value={60} className="h-1 mt-1" />
              </div>
            </TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Growth</span>
                <Progress value={50} className="h-1 mt-1" />
              </div>
            </TableHead>
            <TableHead className="text-left w-[15%]">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.region}</TableCell>
              <TableCell>{item.sales}</TableCell>
              <TableCell>${item.revenue.toLocaleString()}</TableCell>
              <TableCell>{item.growth}%</TableCell>
              <TableCell className="text-right">
                <GrowthIcon growth={item.growth} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>
              $
              {items
                .reduce((acc, cur) => acc + cur.revenue, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell colSpan={2}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Wide Inline Analytics Table with balanced spacing
      </p>
    </div>
  );
}


code.demo.1757839975232.tsx
import InlineAnalyticsTable from "@/components/ui/inline-analytics-table";

export default function DemoOne() {
  return <InlineAnalyticsTable />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/inline-analytics-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

const items = [
  { id: "1", region: "North America", sales: 1200, revenue: 25000, growth: 12 },
  { id: "2", region: "Europe", sales: 900, revenue: 18000, growth: -5 },
  { id: "3", region: "Asia", sales: 1500, revenue: 30000, growth: 20 },
  { id: "4", region: "South America", sales: 600, revenue: 10000, growth: 8 },
  { id: "5", region: "Africa", sales: 400, revenue: 7000, growth: -3 },
];

// utility for growth trend icons
function GrowthIcon({ growth }: { growth: number }) {
  return growth >= 0 ? (
    <TrendingUp className="h-4 w-4 text-green-500" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-500" />
  );
}

export default function InlineAnalyticsTable() {
  return (
    <div className="bg-background p-4 overflow-x-auto">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Region</TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Sales</span>
                <Progress value={70} className="h-1 mt-1" />
              </div>
            </TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Revenue</span>
                <Progress value={60} className="h-1 mt-1" />
              </div>
            </TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Growth</span>
                <Progress value={50} className="h-1 mt-1" />
              </div>
            </TableHead>
            <TableHead className="text-left w-[15%]">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.region}</TableCell>
              <TableCell>{item.sales}</TableCell>
              <TableCell>${item.revenue.toLocaleString()}</TableCell>
              <TableCell>{item.growth}%</TableCell>
              <TableCell className="text-right">
                <GrowthIcon growth={item.growth} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>
              $
              {items
                .reduce((acc, cur) => acc + cur.revenue, 0)
                .toLocaleString()}
            </TableCell>
            <TableCell colSpan={2}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Wide Inline Analytics Table with balanced spacing
      </p>
    </div>
  );
}

```

Install NPM dependencies:
```bash
lucide-react
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
