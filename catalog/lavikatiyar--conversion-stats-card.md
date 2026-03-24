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
conversion-stats-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the type for each statistical item
interface StatItem {
  label: string;
  value: number;
  percentage: number;
  change: number;
  changeType: "increase" | "decrease";
  color: string; // Tailwind color class e.g., 'bg-emerald-500'
}

// Define the props for the main component
interface ConversionStatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  data: StatItem[];
  onActionClick?: () => void;
}

const ConversionStatsCard = React.forwardRef<
  HTMLDivElement,
  ConversionStatsCardProps
>(({ className, title, data, onActionClick, ...props }, ref) => {
  
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <Card
      ref={ref}
      className={cn("w-full max-w-md", className)}
      {...props}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {onActionClick && (
            <Button variant="ghost" size="icon" onClick={onActionClick} aria-label="View details">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Composite Progress Bar */}
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden flex" role="progressbar" aria-valuenow={totalPercentage} aria-valuemin={0} aria-valuemax={100}>
            {data.map((item, index) => (
              <motion.div
                key={index}
                className={cn("h-full", item.color)}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.2 }}
              />
            ))}
          </div>

          {/* Stats Breakdown */}
          <div className="flex flex-col gap-4">
            {data.map((item, index) => {
              const TrendIcon = item.changeType === "increase" ? ArrowUp : ArrowDown;
              const trendColor = item.changeType === "increase" ? "text-emerald-500" : "text-red-500";
              const formattedValue = new Intl.NumberFormat('en-US').format(item.value);
              const formattedChange = new Intl.NumberFormat('en-US').format(item.change);

              return (
                <motion.div key={index} className="flex items-start justify-between" variants={itemVariants}>
                  <div className="flex items-center gap-3">
                    <span className={cn("h-6 w-1 rounded-full", item.color)} />
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        {item.percentage.toFixed(1)}%
                      </p>
                      <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
                        <TrendIcon className="h-3 w-3" />
                        <span>{formattedChange}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formattedValue}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
});

ConversionStatsCard.displayName = "ConversionStatsCard";

export { ConversionStatsCard };

code.demo.1758821906984.tsx
import { ConversionStatsCard } from "@/components/ui/conversion-stats-card";

// Demo data simulating the provided image
const conversionData = [
  {
    label: "Visitor",
    value: 12565,
    percentage: 75.3,
    change: 2424,
    changeType: "increase" as const, // Use 'as const' for type safety
    color: "bg-emerald-500",
  },
  {
    label: "Product sales",
    value: 1421,
    percentage: 24.7,
    change: 213,
    changeType: "decrease" as const,
    color: "bg-amber-400",
  },
];

export default function ConversionStatsCardDemo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <ConversionStatsCard
        title="Conversion Rates"
        data={conversionData}
        onActionClick={() => alert("Action button clicked!")}
        className="shadow-lg"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/conversion-stats-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the type for each statistical item
interface StatItem {
  label: string;
  value: number;
  percentage: number;
  change: number;
  changeType: "increase" | "decrease";
  color: string; // Tailwind color class e.g., 'bg-emerald-500'
}

// Define the props for the main component
interface ConversionStatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  data: StatItem[];
  onActionClick?: () => void;
}

const ConversionStatsCard = React.forwardRef<
  HTMLDivElement,
  ConversionStatsCardProps
>(({ className, title, data, onActionClick, ...props }, ref) => {
  
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <Card
      ref={ref}
      className={cn("w-full max-w-md", className)}
      {...props}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {onActionClick && (
            <Button variant="ghost" size="icon" onClick={onActionClick} aria-label="View details">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Composite Progress Bar */}
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden flex" role="progressbar" aria-valuenow={totalPercentage} aria-valuemin={0} aria-valuemax={100}>
            {data.map((item, index) => (
              <motion.div
                key={index}
                className={cn("h-full", item.color)}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.2 }}
              />
            ))}
          </div>

          {/* Stats Breakdown */}
          <div className="flex flex-col gap-4">
            {data.map((item, index) => {
              const TrendIcon = item.changeType === "increase" ? ArrowUp : ArrowDown;
              const trendColor = item.changeType === "increase" ? "text-emerald-500" : "text-red-500";
              const formattedValue = new Intl.NumberFormat('en-US').format(item.value);
              const formattedChange = new Intl.NumberFormat('en-US').format(item.change);

              return (
                <motion.div key={index} className="flex items-start justify-between" variants={itemVariants}>
                  <div className="flex items-center gap-3">
                    <span className={cn("h-6 w-1 rounded-full", item.color)} />
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        {item.percentage.toFixed(1)}%
                      </p>
                      <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
                        <TrendIcon className="h-3 w-3" />
                        <span>{formattedChange}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formattedValue}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
});

ConversionStatsCard.displayName = "ConversionStatsCard";

export { ConversionStatsCard };
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
