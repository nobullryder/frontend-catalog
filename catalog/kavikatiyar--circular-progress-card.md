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
circular-progress-card.tsx
import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Props interface for type safety and component reusability
interface CircularProgressCardProps {
  title: string;
  description: string;
  currentValue: number;
  goalValue: number;
  currency?: string;
  progressColor?: string; // Prop to customize the progress bar color
  className?: string;
}

/**
 * A reusable card component to display goal progress with an animated circular bar.
 * The progress bar color is customizable via the `progressColor` prop.
 */
export const CircularProgressCard = ({
  title,
  description,
  currentValue,
  goalValue,
  currency = "$",
  progressColor,
  className,
}: CircularProgressCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  // Animate the progress bar when it enters the viewport
  const isInView = useInView(cardRef, { once: true, margin: "-20%" });

  // Memoize calculations for performance optimization
  const {
    progressPercentage,
    circumference,
    strokeDashoffset,
  } = React.useMemo(() => {
    const radius = 80;
    const circ = 2 * Math.PI * radius;
    const progress = Math.min(Math.max((currentValue / goalValue) * 100, 0), 100);
    const offset = circ * (1 - progress / 100);
    return {
      progressPercentage: Math.round(progress),
      circumference: circ,
      strokeDashoffset: offset,
    };
  }, [currentValue, goalValue]);

  // Determine the stroke color, defaulting to the primary theme color
  const color = progressColor || "hsl(var(--primary))";

  return (
    <Card ref={cardRef} className={cn("w-full max-w-sm text-center", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto h-52 w-52">
          {/* SVG container for the circular progress bar */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            role="img"
            aria-label={`Progress: ${progressPercentage}%`}
          >
            {/* Rotate the entire SVG to start the progress from the top */}
            <g transform="rotate(-90, 100, 100)">
              {/* Background track */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="hsl(var(--muted))"
                strokeWidth="16"
              />
              {/* Animated foreground progress bar */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke={color} // Apply the customizable color
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </g>
          </svg>
          {/* Text content centered inside the circle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">
              {progressPercentage}%
            </span>
            <span className="text-sm text-muted-foreground">
              {currency}
              {currentValue.toLocaleString()} / {currency}
              {goalValue.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

code.demo.1758103636329.tsx
import { CircularProgressCard } from "@/components/ui/circular-progress-card";

/**
 * A demo page to showcase the CircularProgressCard component.
 * It demonstrates default usage and customization via props.
 */
const CircularProgressCardDemo = () => {
  return (
    <div className="flex min-h-[500px] w-full flex-wrap items-center justify-center gap-8 bg-background p-4">
      {/* Example: Custom color passed as a prop */}
      <CircularProgressCard
        title="Project Completion"
        description="Tasks completed for the new feature launch."
        currentValue={128}
        goalValue={200}
        currency=""
        progressColor="hsl(142.1 76.2% 41.2%)" // Custom green color
      />
    </div>
  );
};

export default CircularProgressCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/circular-progress-card.tsx
import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Props interface for type safety and component reusability
interface CircularProgressCardProps {
  title: string;
  description: string;
  currentValue: number;
  goalValue: number;
  currency?: string;
  progressColor?: string; // Prop to customize the progress bar color
  className?: string;
}

/**
 * A reusable card component to display goal progress with an animated circular bar.
 * The progress bar color is customizable via the `progressColor` prop.
 */
export const CircularProgressCard = ({
  title,
  description,
  currentValue,
  goalValue,
  currency = "$",
  progressColor,
  className,
}: CircularProgressCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  // Animate the progress bar when it enters the viewport
  const isInView = useInView(cardRef, { once: true, margin: "-20%" });

  // Memoize calculations for performance optimization
  const {
    progressPercentage,
    circumference,
    strokeDashoffset,
  } = React.useMemo(() => {
    const radius = 80;
    const circ = 2 * Math.PI * radius;
    const progress = Math.min(Math.max((currentValue / goalValue) * 100, 0), 100);
    const offset = circ * (1 - progress / 100);
    return {
      progressPercentage: Math.round(progress),
      circumference: circ,
      strokeDashoffset: offset,
    };
  }, [currentValue, goalValue]);

  // Determine the stroke color, defaulting to the primary theme color
  const color = progressColor || "hsl(var(--primary))";

  return (
    <Card ref={cardRef} className={cn("w-full max-w-sm text-center", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto h-52 w-52">
          {/* SVG container for the circular progress bar */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            role="img"
            aria-label={`Progress: ${progressPercentage}%`}
          >
            {/* Rotate the entire SVG to start the progress from the top */}
            <g transform="rotate(-90, 100, 100)">
              {/* Background track */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke="hsl(var(--muted))"
                strokeWidth="16"
              />
              {/* Animated foreground progress bar */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="transparent"
                stroke={color} // Apply the customizable color
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </g>
          </svg>
          {/* Text content centered inside the circle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">
              {progressPercentage}%
            </span>
            <span className="text-sm text-muted-foreground">
              {currency}
              {currentValue.toLocaleString()} / {currency}
              {goalValue.toLocaleString()}
            </span>
          </div>
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
