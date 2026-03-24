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
stats-card-1.tsx
// components/ui/stats-card.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Props for the StatsCard component.
 * @param {string} title - The title of the statistic (e.g., "Total Revenue").
 * @param {string} value - The main value to display (e.g., "₹4,52,318").
 * @param {React.ReactNode} icon - The icon to display in the card header.
 * @param {string} change - The change percentage or value (e.g., "+20.1%").
 * @param {'positive' | 'negative'} changeType - Determines the color of the change text.
 * @param {string} [className] - Optional additional class names for the card.
 */
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative';
  className?: string;
}

/**
 * A responsive card component for displaying key statistics with a trend indicator.
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
  className,
}) => {
  const changeColor = changeType === 'positive'
    ? 'text-emerald-600 dark:text-emerald-500'
    : 'text-destructive';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {/* Icon is passed as a child */}
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={cn("text-xs text-muted-foreground mt-1", changeColor)}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
};

code.demo.1759251384327.tsx
// demo.tsx

import { StatsCard } from '@/components/ui/stats-card-1'; // Adjust the import path as needed
import { Users, CreditCard, IndianRupee, Activity } from 'lucide-react'; // Using lucide-react for icons

const StatsCardDemo = () => {
  return (
    <div className="bg-background min-h-screen w-full p-4 sm:p-8">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="₹4,52,318"
          icon={<IndianRupee className="h-4 w-4 text-muted-foreground" />}
          change="+20.1%"
          changeType="positive"
        />
        <StatsCard
          title="Subscriptions"
          value="+2350"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change="+180.1%"
          changeType="positive"
        />
        <StatsCard
          title="Sales"
          value="+12,234"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          change="+19%"
          changeType="positive"
        />
        <StatsCard
          title="Active Now"
          value="+573"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          change="-2.1%"
          changeType="negative"
        />
        <StatsCard
          title="Total Revenue"
          value="₹4,52,318"
          icon={<IndianRupee className="h-4 w-4 text-muted-foreground" />}
          change="+20.1%"
          changeType="positive"
        />
        <StatsCard
          title="Subscriptions"
          value="+2350"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change="+180.1%"
          changeType="positive"
        />
      </div>
    </div>
  );
};

export default StatsCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stats-card-1.tsx
// components/ui/stats-card.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Props for the StatsCard component.
 * @param {string} title - The title of the statistic (e.g., "Total Revenue").
 * @param {string} value - The main value to display (e.g., "₹4,52,318").
 * @param {React.ReactNode} icon - The icon to display in the card header.
 * @param {string} change - The change percentage or value (e.g., "+20.1%").
 * @param {'positive' | 'negative'} changeType - Determines the color of the change text.
 * @param {string} [className] - Optional additional class names for the card.
 */
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative';
  className?: string;
}

/**
 * A responsive card component for displaying key statistics with a trend indicator.
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
  className,
}) => {
  const changeColor = changeType === 'positive'
    ? 'text-emerald-600 dark:text-emerald-500'
    : 'text-destructive';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {/* Icon is passed as a child */}
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={cn("text-xs text-muted-foreground mt-1", changeColor)}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
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
