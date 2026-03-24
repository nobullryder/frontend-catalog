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
activity-stats-card.tsx
// components/ui/stats-card.tsx

import * as React from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Define the props for the component
interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The icon to display. Accepts any React node, recommended: lucide-react icon. */
  icon: React.ReactNode;
  /** The main title of the card. */
  title: string;
  /** The primary numerical value to display. The animation will count up to this number. */
  metric: number;
  /** A unit or suffix for the metric (e.g., "K", "M", "%"). */
  metricUnit?: string;
  /** A short description or secondary stat displayed below the metric. */
  subtext: string;
  /** Optional custom class for the icon's background container. */
  iconContainerClassName?: string;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      className,
      icon,
      title,
      metric,
      metricUnit,
      subtext,
      iconContainerClassName,
      ...props
    },
    ref
  ) => {
    const metricRef = React.useRef<HTMLHeadingElement>(null);

    // Effect to animate the number when the `metric` prop changes
    React.useEffect(() => {
      const node = metricRef.current;
      if (!node) return;

      const controls = animate(0, metric, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          // Format to have a maximum of 2 decimal places
          node.textContent = value.toFixed(2);
        },
      });

      // Cleanup function to stop animation on unmount
      return () => controls.stop();
    }, [metric]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-xs flex-col gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Header section with Icon and Title */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground",
              iconContainerClassName
            )}
          >
            {icon}
          </div>
          <p className="text-lg font-medium text-foreground">{title}</p>
        </div>

        {/* Main metric section */}
        <div className="flex items-baseline gap-1">
          <h2
            ref={metricRef}
            className="text-5xl font-bold tracking-tighter md:text-6xl"
            // Adding ARIA attributes for accessibility
            aria-live="polite"
            aria-atomic="true"
          >
            0.00
          </h2>
          {metricUnit && (
            <span className="text-4xl font-bold text-muted-foreground md:text-5xl">
              {metricUnit}
            </span>
          )}
        </div>

        {/* Subtext section */}
        <p className="text-base text-muted-foreground">{subtext}</p>
      </div>
    );
  }
);
StatsCard.displayName = "StatsCard";

export { StatsCard };

code.demo.1758284546781.tsx
import { StatsCard } from "@/components/ui/activity-stats-card"; // Adjust the import path
import { Activity } from "lucide-react"; // FINAL CORRECTION: Use the 'Activity' icon

export default function StatsCardDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <StatsCard
        title="Morning Run"
        metric={4.91}
        metricUnit="K"
        subtext="302 Calories"
        icon={<Activity className="h-6 w-6" />} 
        iconContainerClassName="bg-indigo-500 text-white"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/activity-stats-card.tsx
// components/ui/stats-card.tsx

import * as React from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// Define the props for the component
interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The icon to display. Accepts any React node, recommended: lucide-react icon. */
  icon: React.ReactNode;
  /** The main title of the card. */
  title: string;
  /** The primary numerical value to display. The animation will count up to this number. */
  metric: number;
  /** A unit or suffix for the metric (e.g., "K", "M", "%"). */
  metricUnit?: string;
  /** A short description or secondary stat displayed below the metric. */
  subtext: string;
  /** Optional custom class for the icon's background container. */
  iconContainerClassName?: string;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      className,
      icon,
      title,
      metric,
      metricUnit,
      subtext,
      iconContainerClassName,
      ...props
    },
    ref
  ) => {
    const metricRef = React.useRef<HTMLHeadingElement>(null);

    // Effect to animate the number when the `metric` prop changes
    React.useEffect(() => {
      const node = metricRef.current;
      if (!node) return;

      const controls = animate(0, metric, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          // Format to have a maximum of 2 decimal places
          node.textContent = value.toFixed(2);
        },
      });

      // Cleanup function to stop animation on unmount
      return () => controls.stop();
    }, [metric]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-xs flex-col gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Header section with Icon and Title */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground",
              iconContainerClassName
            )}
          >
            {icon}
          </div>
          <p className="text-lg font-medium text-foreground">{title}</p>
        </div>

        {/* Main metric section */}
        <div className="flex items-baseline gap-1">
          <h2
            ref={metricRef}
            className="text-5xl font-bold tracking-tighter md:text-6xl"
            // Adding ARIA attributes for accessibility
            aria-live="polite"
            aria-atomic="true"
          >
            0.00
          </h2>
          {metricUnit && (
            <span className="text-4xl font-bold text-muted-foreground md:text-5xl">
              {metricUnit}
            </span>
          )}
        </div>

        {/* Subtext section */}
        <p className="text-base text-muted-foreground">{subtext}</p>
      </div>
    );
  }
);
StatsCard.displayName = "StatsCard";

export { StatsCard };
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
