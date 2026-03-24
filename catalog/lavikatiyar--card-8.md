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
card-8.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button";

interface SpendingLimitCardProps {
  /** The main title of the card */
  title: string;
  /** A subtitle or date range shown below the title */
  dateRange: string;
  /** The text displayed on the button */
  buttonText: string;
  /** The current amount spent */
  currentSpending: number;
  /** The total spending limit */
  limit: number;
  /** The currency symbol to display */
  currency?: string;
  /** The number of segments in the progress bar */
  segments?: number;
  /** NEW: CSS class for the filled part of the progress bar */
  filledColorClass?: string;
  /** NEW: CSS class for the unfilled part of the progress bar */
  unfilledColorClass?: string;
  /** Callback function when the button is clicked */
  onButtonClick?: () => void;
  /** Optional additional class names for the card container */
  className?: string;
}

/**
 * A color-agnostic card to display spending limits with an animated progress bar.
 * Colors are now passed in as props.
 */
export const SpendingLimitCard = ({
  title,
  dateRange,
  buttonText,
  currentSpending,
  limit,
  currency = "$",
  segments = 7,
  // NEW: Props now accept any CSS class. Default values are provided.
  filledColorClass = "bg-primary",
  unfilledColorClass = "bg-primary/20",
  onButtonClick,
  className,
}: SpendingLimitCardProps) => {
  const percentage = limit > 0 ? (currentSpending / limit) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{dateRange}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </header>

      <div className="mt-6">
        <p className="text-4xl font-bold tracking-tight">
          {formatCurrency(currentSpending)}
          <span className="ml-2 text-base font-medium text-muted-foreground">
            of {formatCurrency(limit)}
          </span>
        </p>
      </div>

      <div
        className="mt-4"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${title} progress`}
      >
        <motion.div
          className="flex w-full items-center gap-1.5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: segments }).map((_, index) => {
            const segmentFilled = percentage > (index / segments) * 100;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "h-2.5 flex-1 rounded-full",
                  // UPDATED: Directly uses the props for coloring
                  segmentFilled ? filledColorClass : unfilledColorClass
                )}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

code.demo.1758102570545.tsx
import { SpendingLimitCard } from "@/components/ui/card-8";

/**
 * A demo component showcasing how to pass custom color classes
 * to the SpendingLimitCard.
 */
const SpendingLimitCardDemo = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-background p-4 md:flex-row md:items-start">
      
      {/* Example 1: Using default colors (no color props passed) */}
      <SpendingLimitCard
        title="Groceries Budget"
        dateRange="Data from 1-17 Sep, 2025"
        buttonText="View Report"
        currentSpending={252.98}
        limit={1200}
        // Define any valid Tailwind classes here
        filledColorClass="bg-green-500"
        unfilledColorClass="bg-green-500/20"
        onButtonClick={() => alert("Custom color card report clicked!")}
      />

    </div>
  );
};

export default SpendingLimitCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-8.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button";

interface SpendingLimitCardProps {
  /** The main title of the card */
  title: string;
  /** A subtitle or date range shown below the title */
  dateRange: string;
  /** The text displayed on the button */
  buttonText: string;
  /** The current amount spent */
  currentSpending: number;
  /** The total spending limit */
  limit: number;
  /** The currency symbol to display */
  currency?: string;
  /** The number of segments in the progress bar */
  segments?: number;
  /** NEW: CSS class for the filled part of the progress bar */
  filledColorClass?: string;
  /** NEW: CSS class for the unfilled part of the progress bar */
  unfilledColorClass?: string;
  /** Callback function when the button is clicked */
  onButtonClick?: () => void;
  /** Optional additional class names for the card container */
  className?: string;
}

/**
 * A color-agnostic card to display spending limits with an animated progress bar.
 * Colors are now passed in as props.
 */
export const SpendingLimitCard = ({
  title,
  dateRange,
  buttonText,
  currentSpending,
  limit,
  currency = "$",
  segments = 7,
  // NEW: Props now accept any CSS class. Default values are provided.
  filledColorClass = "bg-primary",
  unfilledColorClass = "bg-primary/20",
  onButtonClick,
  className,
}: SpendingLimitCardProps) => {
  const percentage = limit > 0 ? (currentSpending / limit) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{dateRange}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </header>

      <div className="mt-6">
        <p className="text-4xl font-bold tracking-tight">
          {formatCurrency(currentSpending)}
          <span className="ml-2 text-base font-medium text-muted-foreground">
            of {formatCurrency(limit)}
          </span>
        </p>
      </div>

      <div
        className="mt-4"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${title} progress`}
      >
        <motion.div
          className="flex w-full items-center gap-1.5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: segments }).map((_, index) => {
            const segmentFilled = percentage > (index / segments) * 100;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "h-2.5 flex-1 rounded-full",
                  // UPDATED: Directly uses the props for coloring
                  segmentFilled ? filledColorClass : unfilledColorClass
                )}
              />
            );
          })}
        </motion.div>
      </div>
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
