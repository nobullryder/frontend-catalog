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
card-6.tsx
// components/ui/minimal-steps-card.tsx

import React, { useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the structure for each data point
interface BarData {
  value: number;
}

// Define the component's props
export interface MinimalStepsCardProps {
  /** The main title of the card */
  title: string;
  /** The subtitle, usually a date */
  subtitle: string;
  /** The total number of steps to animate to */
  totalSteps: number;
  /** The unit label for the steps */
  stepsUnit?: string;
  /** A React node for the icon */
  icon: React.ReactNode;
  /** An array of numeric values for the bar chart */
  data: BarData[];
  /** Optional className for custom styling */
  className?: string;
}

/**
 * A minimalist, theme-adaptive card for displaying step data.
 * Features an animated counter and a vertical "fill" animation for the bar chart.
 * Note: Requires `framer-motion` to be installed.
 */
export const MinimalStepsCard = ({
  title,
  subtitle,
  totalSteps,
  stepsUnit = 'steps',
  icon,
  data = [],
  className,
}: MinimalStepsCardProps) => {
  // Memoize the max value to optimize performance
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);

  // Animated number using useSpring for a smooth count-up effect
  const animatedSteps = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const displaySteps = useTransform(animatedSteps, (v) =>
    new Intl.NumberFormat('en-US').format(Math.round(v))
  );

  useEffect(() => {
    animatedSteps.set(totalSteps);
  }, [animatedSteps, totalSteps]);

  // Animation variants for the bar container to stagger each bar's animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  // Animation variants for each individual bar's fill effect
  const barVariants: Variants = {
    hidden: { height: '0%' },
    visible: (customHeight: string) => ({
      height: customHeight,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <div
      className={cn(
        'flex w-full max-w-md flex-col rounded-2xl border bg-card p-6 text-card-foreground',
        className
      )}
      role="figure"
      aria-label={`${title} for ${subtitle}: ${totalSteps} ${stepsUnit}`}
    >
      {/* Header Section */}
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      </header>

      {/* Main Metric */}
      <div className="my-8" aria-live="polite">
        <motion.span className="text-5xl font-bold tracking-tight">
          {displaySteps}
        </motion.span>
        <span className="ml-2 text-xl text-muted-foreground">{stepsUnit}</span>
      </div>

      {/* Bar Chart Visualization */}
      <motion.div
        className="mt-auto flex h-32 w-full items-end gap-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Daily steps bar chart"
      >
        {data.map((item, index) => {
          const barHeight = `${(item.value / maxValue) * 100}%`;
          return (
            <div
              key={index}
              className="relative h-full w-full rounded-t-sm"
              aria-label={`Day ${index + 1}: ${item.value} steps`}
            >
              {/* Background/Track for the bar */}
              <div className="absolute bottom-0 h-full w-full rounded-t-sm bg-muted/30" />
              {/* Animated fill element */}
              <motion.div
                className="absolute bottom-0 w-full rounded-t-sm bg-card-foreground"
                variants={barVariants}
                custom={barHeight} // Pass the final height to the variant
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

code.demo.1758072283847.tsx
// demo.tsx

import React from 'react';
import { Footprints } from 'lucide-react'; // Using lucide-react for the icon
import { MinimalStepsCard } from '@/components/ui/card-6';

// Generate some sample data to populate the chart
const generateSampleData = (days: number) => {
  return Array.from({ length: days }, () => ({
    value: Math.floor(Math.random() * 20000) + 1000, // Steps between 1k and 21k
  }));
};

const MinimalStepsCardDemo = () => {
  // Generate data for 45 bars to fill the space nicely
  const chartData = generateSampleData(45);
  const totalSteps = chartData.reduce((sum, day) => sum + day.value, 0);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <MinimalStepsCard
        title="Monthly Steps"
        subtitle="January 2025"
        totalSteps={294944} // Using the number from the image for visual consistency
        icon={<Footprints className="h-5 w-5 text-muted-foreground" />}
        data={chartData}
      />
    </div>
  );
};

export default MinimalStepsCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-6.tsx
// components/ui/minimal-steps-card.tsx

import React, { useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the structure for each data point
interface BarData {
  value: number;
}

// Define the component's props
export interface MinimalStepsCardProps {
  /** The main title of the card */
  title: string;
  /** The subtitle, usually a date */
  subtitle: string;
  /** The total number of steps to animate to */
  totalSteps: number;
  /** The unit label for the steps */
  stepsUnit?: string;
  /** A React node for the icon */
  icon: React.ReactNode;
  /** An array of numeric values for the bar chart */
  data: BarData[];
  /** Optional className for custom styling */
  className?: string;
}

/**
 * A minimalist, theme-adaptive card for displaying step data.
 * Features an animated counter and a vertical "fill" animation for the bar chart.
 * Note: Requires `framer-motion` to be installed.
 */
export const MinimalStepsCard = ({
  title,
  subtitle,
  totalSteps,
  stepsUnit = 'steps',
  icon,
  data = [],
  className,
}: MinimalStepsCardProps) => {
  // Memoize the max value to optimize performance
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);

  // Animated number using useSpring for a smooth count-up effect
  const animatedSteps = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const displaySteps = useTransform(animatedSteps, (v) =>
    new Intl.NumberFormat('en-US').format(Math.round(v))
  );

  useEffect(() => {
    animatedSteps.set(totalSteps);
  }, [animatedSteps, totalSteps]);

  // Animation variants for the bar container to stagger each bar's animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  // Animation variants for each individual bar's fill effect
  const barVariants: Variants = {
    hidden: { height: '0%' },
    visible: (customHeight: string) => ({
      height: customHeight,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <div
      className={cn(
        'flex w-full max-w-md flex-col rounded-2xl border bg-card p-6 text-card-foreground',
        className
      )}
      role="figure"
      aria-label={`${title} for ${subtitle}: ${totalSteps} ${stepsUnit}`}
    >
      {/* Header Section */}
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      </header>

      {/* Main Metric */}
      <div className="my-8" aria-live="polite">
        <motion.span className="text-5xl font-bold tracking-tight">
          {displaySteps}
        </motion.span>
        <span className="ml-2 text-xl text-muted-foreground">{stepsUnit}</span>
      </div>

      {/* Bar Chart Visualization */}
      <motion.div
        className="mt-auto flex h-32 w-full items-end gap-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Daily steps bar chart"
      >
        {data.map((item, index) => {
          const barHeight = `${(item.value / maxValue) * 100}%`;
          return (
            <div
              key={index}
              className="relative h-full w-full rounded-t-sm"
              aria-label={`Day ${index + 1}: ${item.value} steps`}
            >
              {/* Background/Track for the bar */}
              <div className="absolute bottom-0 h-full w-full rounded-t-sm bg-muted/30" />
              {/* Animated fill element */}
              <motion.div
                className="absolute bottom-0 w-full rounded-t-sm bg-card-foreground"
                variants={barVariants}
                custom={barHeight} // Pass the final height to the variant
              />
            </div>
          );
        })}
      </motion.div>
    </div>
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
