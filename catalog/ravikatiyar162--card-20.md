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
card-20.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Defines the shape of a single expense item
export interface ExpenseItem {
  category: string;
  percentage: number;
  amount: number;
  color: string; // HSL color string e.g., "221.2 83.2% 53.3%"
}

// Defines the props for the WeeklyExpenseCard component
export interface WeeklyExpenseCardProps {
  title: string;
  dateRange: string;
  data: ExpenseItem[];
  currency?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

// Helper to format currency
const formatCurrency = (amount: number, currencySymbol: string) => {
  return `${currencySymbol}${amount.toFixed(2)}`;
};

/**
 * A responsive and theme-adaptive card for displaying expense summaries
 * with an animated donut chart and a clear, color-coded legend.
 */
export const WeeklyExpenseCard = ({
  title,
  dateRange,
  data,
  currency = "$",
  buttonText = "View Report",
  onButtonClick,
  className,
}: WeeklyExpenseCardProps) => {
  const totalAmount = React.useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data]
  );

  // Donut chart properties
  const size = 180;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <Card
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-2xl bg-card p-4 font-sans",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between p-2">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold tracking-tight text-card-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{dateRange}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardHeader>

      <CardContent className="p-2">
        {/* Animated Donut Chart */}
        <div className="relative my-6 flex h-48 w-full items-center justify-center">
          <AnimatePresence>
            <motion.svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              className="-rotate-90"
            >
              {/* Background Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="hsl(var(--muted))"
                strokeWidth={strokeWidth}
              />

              {/* Data Segments */}
              {data.map((item) => {
                const segmentLength = (item.percentage / 100) * circumference;
                const offset =
                  (accumulatedPercentage / 100) * circumference;
                accumulatedPercentage += item.percentage;

                return (
                  <motion.circle
                    key={item.category}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={`hsl(${item.color})`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{
                      strokeDashoffset: [circumference, circumference - offset - segmentLength],
                      transition: { duration: 0.8, ease: "easeInOut" },
                    }}
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.svg>
          </AnimatePresence>

          {/* Central Label */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total Spent</span>
            <span className="text-2xl font-bold text-card-foreground">
              {formatCurrency(totalAmount, currency)}
            </span>
          </div>
        </div>

        {/* Legend Section */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div
              key={item.category}
              className="flex h-24 flex-col justify-end rounded-2xl bg-muted/50 p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: `hsl(${item.color})` }}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-muted-foreground">
                  {item.category}
                </p>
              </div>
              <p className="mt-1 text-xl font-bold text-card-foreground">
                {formatCurrency(item.amount, currency)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

code.demo.1758103430739.tsx
import {
  WeeklyExpenseCard,
  ExpenseItem,
} from "@/components/ui/card-20";

// Sample data for the expense card demo
const expenseData: ExpenseItem[] = [
  {
    category: "Grocery",
    percentage: 48,
    amount: 758.2,
    color: "221.2 83.2% 53.3%", // Blue
  },
  {
    category: "Food & Drink",
    percentage: 32,
    amount: 512.6,
    color: "142.1 76.2% 36.3%", // Green
  },
  {
    category: "Shopping",
    percentage: 13,
    amount: 205.45,
    color: "346.8 77.2% 49.8%", // Pink
  },
  {
    category: "Transportation",
    percentage: 7,
    amount: 110.8,
    color: "35.8 91.7% 54.5%", // Orange
  },
];

const WeeklyExpenseCardDemo = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-10">
      <WeeklyExpenseCard
        title="Weekly Expense"
        dateRange="From 1 - 6 Apr, 2024"
        data={expenseData}
        onButtonClick={() => alert("View Report Clicked!")}
      />
    </div>
  );
};

export default WeeklyExpenseCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-20.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Defines the shape of a single expense item
export interface ExpenseItem {
  category: string;
  percentage: number;
  amount: number;
  color: string; // HSL color string e.g., "221.2 83.2% 53.3%"
}

// Defines the props for the WeeklyExpenseCard component
export interface WeeklyExpenseCardProps {
  title: string;
  dateRange: string;
  data: ExpenseItem[];
  currency?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

// Helper to format currency
const formatCurrency = (amount: number, currencySymbol: string) => {
  return `${currencySymbol}${amount.toFixed(2)}`;
};

/**
 * A responsive and theme-adaptive card for displaying expense summaries
 * with an animated donut chart and a clear, color-coded legend.
 */
export const WeeklyExpenseCard = ({
  title,
  dateRange,
  data,
  currency = "$",
  buttonText = "View Report",
  onButtonClick,
  className,
}: WeeklyExpenseCardProps) => {
  const totalAmount = React.useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data]
  );

  // Donut chart properties
  const size = 180;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <Card
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-2xl bg-card p-4 font-sans",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between p-2">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold tracking-tight text-card-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{dateRange}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardHeader>

      <CardContent className="p-2">
        {/* Animated Donut Chart */}
        <div className="relative my-6 flex h-48 w-full items-center justify-center">
          <AnimatePresence>
            <motion.svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              className="-rotate-90"
            >
              {/* Background Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="hsl(var(--muted))"
                strokeWidth={strokeWidth}
              />

              {/* Data Segments */}
              {data.map((item) => {
                const segmentLength = (item.percentage / 100) * circumference;
                const offset =
                  (accumulatedPercentage / 100) * circumference;
                accumulatedPercentage += item.percentage;

                return (
                  <motion.circle
                    key={item.category}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={`hsl(${item.color})`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{
                      strokeDashoffset: [circumference, circumference - offset - segmentLength],
                      transition: { duration: 0.8, ease: "easeInOut" },
                    }}
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.svg>
          </AnimatePresence>

          {/* Central Label */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Total Spent</span>
            <span className="text-2xl font-bold text-card-foreground">
              {formatCurrency(totalAmount, currency)}
            </span>
          </div>
        </div>

        {/* Legend Section */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div
              key={item.category}
              className="flex h-24 flex-col justify-end rounded-2xl bg-muted/50 p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: `hsl(${item.color})` }}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-muted-foreground">
                  {item.category}
                </p>
              </div>
              <p className="mt-1 text-xl font-bold text-card-foreground">
                {formatCurrency(item.amount, currency)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

Install NPM dependencies:
```bash
framer-motion
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
