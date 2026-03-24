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
stats-card.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';

import { cn } from '@/lib/utils'; // Your utility for merging class names
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Type definition for each data point in the chart
export interface ChartDataPoint {
  label: string;
  currentValue: number; // Value for the primary bar (e.g., this week)
  previousValue: number; // Value for the secondary bar (e.g., last week)
}

// Props for the ActivityStatsCard component
export interface ActivityStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The main title of the card */
  title: string;
  /** A React node for the icon, e.g., <Run /> */
  icon: React.ReactNode;
  /** The primary metric to display, e.g., "48,75 KM" */
  mainValue: string;
  /** The percentage change value (positive or negative) */
  changeValue: number;
  /** The description for the change, e.g., "vs last week" */
  changeDescription: string;
  /** Array of data points for the bar chart */
  chartData: ChartDataPoint[];
  /** Optional click handler for the action button */
  onActionClick?: () => void;
  /** Optional class names to style the primary chart bar */
  primaryBarClassName?: string;
  /** Optional class names to style the secondary chart bar */
  secondaryBarClassName?: string;
}

const ActivityStatsCard = React.forwardRef<
  HTMLDivElement,
  ActivityStatsCardProps
>(
  (
    {
      className,
      title,
      icon,
      mainValue,
      changeValue,
      changeDescription,
      chartData,
      onActionClick,
      primaryBarClassName,   // <-- New prop
      secondaryBarClassName, // <-- New prop
      ...props
    },
    ref
  ) => {
    // ... (rest of the component logic remains the same)
    const ChangeIndicator =
      changeValue > 0 ? ArrowUpRight : ArrowDownRight;
    const changeColor =
      changeValue > 0
        ? 'text-green-500'
        : changeValue < 0
        ? 'text-red-500'
        : 'text-muted-foreground';

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.2,
        },
      },
    };

    const barVariants = {
      hidden: { height: '0%', opacity: 0 },
      visible: (height: number) => ({
        height: `${height}%`,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 25,
        },
      }),
    };


    return (
      <Card
        className={cn('w-full max-w-sm overflow-hidden', className)}
        ref={ref}
        {...props}
      >
        <CardHeader className="pb-4">
          {/* ... CardHeader JSX ... */}
           <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-primary">{icon}</div>
              <CardTitle className="text-lg font-medium">{title}</CardTitle>
            </div>
            {onActionClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onActionClick}
                aria-label="View details"
              >
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
           {/* ... CardContent main value and change indicator JSX ... */}
            <p className="text-4xl font-bold tracking-tight text-card-foreground">
                {mainValue}
            </p>
            <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
                <ChangeIndicator className="h-4 w-4" />
                <span>
                {Math.abs(changeValue)}%{' '}
                <span className="text-muted-foreground">{changeDescription}</span>
                </span>
            </div>

          {/* Bar Chart Section */}
          <div className="mt-6 h-32 w-full">
            <AnimatePresence>
              <motion.div
                key="chart"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex h-full w-full items-end justify-between gap-2"
              >
                {chartData.map((point) => (
                  <div
                    key={point.label}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="relative flex h-full w-full items-end justify-center gap-1.5">
                      {/* Current Value Bar with new custom class */}
                      <motion.div
                        custom={point.currentValue}
                        variants={barVariants}
                        className={cn(
                          'w-full rounded-sm bg-primary', // Default class
                          primaryBarClassName           // Override class
                        )}
                        aria-valuenow={point.currentValue}
                        aria-label={`Current value: ${point.currentValue}`}
                        role="progressbar"
                      />
                      {/* Previous Value Bar with new custom class */}
                      <motion.div
                        custom={point.previousValue}
                        variants={barVariants}
                        className={cn(
                          'w-full rounded-sm bg-muted', // Default class
                          secondaryBarClassName         // Override class
                        )}
                        aria-valuenow={point.previousValue}
                        aria-label={`Previous value: ${point.previousValue}`}
                        role="progressbar"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {point.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ActivityStatsCard.displayName = 'ActivityStatsCard';

export { ActivityStatsCard };

code.demo.1758266775349.tsx
import { Footprints } from 'lucide-react';
import {
  ActivityStatsCard,
  type ChartDataPoint,
} from '@/components/ui/stats-card';

// Sample data for the demo
const sampleChartData: ChartDataPoint[] = [
  { label: '01', currentValue: 90, previousValue: 45 },
  { label: '02', currentValue: 60, previousValue: 75 },
  { label: '03', currentValue: 70, previousValue: 35 },
  { label: '04', currentValue: 50, previousValue: 65 },
  { label: '05', currentValue: 85, previousValue: 40 },
  { label: '06', currentValue: 75, previousValue: 68 },
  { label: '07', currentValue: 95, previousValue: 42 },
  { label: '08', currentValue: 60, previousValue: 30 },
];

export default function ActivityStatsCardDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <ActivityStatsCard
        title="Running last week"
        icon={<Footprints className="h-6 w-6" />}
        mainValue="48,75 KM"
        changeValue={2.1}
        changeDescription="vs last week"
        chartData={sampleChartData}
        onActionClick={() => console.log('Action button clicked!')}
        // 👇 Use the new props to change bar colors
        primaryBarClassName="bg-violet-500"
        secondaryBarClassName="bg-violet-200 dark:bg-violet-900"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stats-card.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';

import { cn } from '@/lib/utils'; // Your utility for merging class names
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Type definition for each data point in the chart
export interface ChartDataPoint {
  label: string;
  currentValue: number; // Value for the primary bar (e.g., this week)
  previousValue: number; // Value for the secondary bar (e.g., last week)
}

// Props for the ActivityStatsCard component
export interface ActivityStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The main title of the card */
  title: string;
  /** A React node for the icon, e.g., <Run /> */
  icon: React.ReactNode;
  /** The primary metric to display, e.g., "48,75 KM" */
  mainValue: string;
  /** The percentage change value (positive or negative) */
  changeValue: number;
  /** The description for the change, e.g., "vs last week" */
  changeDescription: string;
  /** Array of data points for the bar chart */
  chartData: ChartDataPoint[];
  /** Optional click handler for the action button */
  onActionClick?: () => void;
  /** Optional class names to style the primary chart bar */
  primaryBarClassName?: string;
  /** Optional class names to style the secondary chart bar */
  secondaryBarClassName?: string;
}

const ActivityStatsCard = React.forwardRef<
  HTMLDivElement,
  ActivityStatsCardProps
>(
  (
    {
      className,
      title,
      icon,
      mainValue,
      changeValue,
      changeDescription,
      chartData,
      onActionClick,
      primaryBarClassName,   // <-- New prop
      secondaryBarClassName, // <-- New prop
      ...props
    },
    ref
  ) => {
    // ... (rest of the component logic remains the same)
    const ChangeIndicator =
      changeValue > 0 ? ArrowUpRight : ArrowDownRight;
    const changeColor =
      changeValue > 0
        ? 'text-green-500'
        : changeValue < 0
        ? 'text-red-500'
        : 'text-muted-foreground';

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.2,
        },
      },
    };

    const barVariants = {
      hidden: { height: '0%', opacity: 0 },
      visible: (height: number) => ({
        height: `${height}%`,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 25,
        },
      }),
    };


    return (
      <Card
        className={cn('w-full max-w-sm overflow-hidden', className)}
        ref={ref}
        {...props}
      >
        <CardHeader className="pb-4">
          {/* ... CardHeader JSX ... */}
           <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-primary">{icon}</div>
              <CardTitle className="text-lg font-medium">{title}</CardTitle>
            </div>
            {onActionClick && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onActionClick}
                aria-label="View details"
              >
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
           {/* ... CardContent main value and change indicator JSX ... */}
            <p className="text-4xl font-bold tracking-tight text-card-foreground">
                {mainValue}
            </p>
            <div className={`flex items-center gap-1 text-sm ${changeColor}`}>
                <ChangeIndicator className="h-4 w-4" />
                <span>
                {Math.abs(changeValue)}%{' '}
                <span className="text-muted-foreground">{changeDescription}</span>
                </span>
            </div>

          {/* Bar Chart Section */}
          <div className="mt-6 h-32 w-full">
            <AnimatePresence>
              <motion.div
                key="chart"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex h-full w-full items-end justify-between gap-2"
              >
                {chartData.map((point) => (
                  <div
                    key={point.label}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="relative flex h-full w-full items-end justify-center gap-1.5">
                      {/* Current Value Bar with new custom class */}
                      <motion.div
                        custom={point.currentValue}
                        variants={barVariants}
                        className={cn(
                          'w-full rounded-sm bg-primary', // Default class
                          primaryBarClassName           // Override class
                        )}
                        aria-valuenow={point.currentValue}
                        aria-label={`Current value: ${point.currentValue}`}
                        role="progressbar"
                      />
                      {/* Previous Value Bar with new custom class */}
                      <motion.div
                        custom={point.previousValue}
                        variants={barVariants}
                        className={cn(
                          'w-full rounded-sm bg-muted', // Default class
                          secondaryBarClassName         // Override class
                        )}
                        aria-valuenow={point.previousValue}
                        aria-label={`Previous value: ${point.previousValue}`}
                        role="progressbar"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {point.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ActivityStatsCard.displayName = 'ActivityStatsCard';

export { ActivityStatsCard };
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
