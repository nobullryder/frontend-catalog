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
tracker-card.tsx
"use client";

import * as React from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the shape of a food suggestion object
interface Suggestion {
  name: string;
  calories: number;
}

// Define the props for the main component
export interface CalorieTrackerCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  currentCalories: number;
  goalCalories: number;
  suggestions: Suggestion[];
  onRecord?: () => void;
  className?: string;
}

const CalorieTrackerCard = React.forwardRef<
  HTMLDivElement,
  CalorieTrackerCardProps
>(
  (
    {
      className,
      icon,
      title,
      subtitle,
      currentCalories,
      goalCalories,
      suggestions,
      onRecord,
    },
    ref
  ) => {
    // Calculate progress percentage, ensuring it doesn't exceed 100
    const progressPercentage = Math.min((currentCalories / goalCalories) * 100, 100);

    // Animate the calorie count with a spring effect
    const animatedCalories = useSpring(0, {
      damping: 40,
      stiffness: 300,
    });
    
    // Transform the animated value to a rounded integer for display
    const displayCalories = useTransform(animatedCalories, (value) =>
      value.toFixed(0)
    );

    // Update the animation when the currentCalories prop changes
    React.useEffect(() => {
      animatedCalories.set(currentCalories);
    }, [currentCalories, animatedCalories]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-3xl bg-card p-6 text-card-foreground shadow-lg",
          "flex flex-col gap-6 border",
          className
        )}
      >
        {/* Card Header */}
        <header className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <h2 className="font-bold text-lg">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <button className="text-muted-foreground">
            <ChevronUp className="h-5 w-5" />
          </button>
        </header>

        {/* Main Calorie Display */}
        <div className="flex flex-col gap-2">
            <div className="flex items-end gap-3">
                 <motion.p className="text-6xl font-bold tracking-tighter">
                    {displayCalories}
                </motion.p>
                <p className="mb-2 text-muted-foreground font-medium">
                    of {goalCalories}
                </p>
                <p className="mb-2 ml-auto font-medium">Calories</p>
            </div>
          {/* Progress Bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-primary/10">
                <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </div>
        </div>
        
        {/* Food Suggestions Section */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">Food suggestions</h3>
          <ul className="flex flex-col gap-2">
            {suggestions.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <p className="text-muted-foreground">{item.name}</p>
                <p className="font-medium">{item.calories} Kcal</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <Button
          onClick={onRecord}
          className="w-full rounded-full py-6 text-base font-semibold"
        >
          + Record Your Consumptions
        </Button>
      </div>
    );
  }
);

CalorieTrackerCard.displayName = "CalorieTrackerCard";

export { CalorieTrackerCard };

code.demo.1758263710398.tsx
import { Pizza } from "lucide-react";
import { CalorieTrackerCard } from "@/components/ui/tracker-card";

export default function CalorieTrackerDemo() {
  // Sample data for the component
  const foodSuggestions = [
    { name: "One bowl of salad and salmon", calories: 285 },
    { name: "Oven Baked Chicken breast", calories: 482 },
  ];

  const handleRecordClick = () => {
    // You can add your custom logic here, e.g., open a modal
    alert("Record button clicked!");
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <CalorieTrackerCard
        icon={<Pizza className="h-6 w-6" />}
        title="Daily Calories"
        subtitle="Calories consumption in a day"
        currentCalories={582}
        goalCalories={2250}
        suggestions={foodSuggestions}
        onRecord={handleRecordClick}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tracker-card.tsx
"use client";

import * as React from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the shape of a food suggestion object
interface Suggestion {
  name: string;
  calories: number;
}

// Define the props for the main component
export interface CalorieTrackerCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  currentCalories: number;
  goalCalories: number;
  suggestions: Suggestion[];
  onRecord?: () => void;
  className?: string;
}

const CalorieTrackerCard = React.forwardRef<
  HTMLDivElement,
  CalorieTrackerCardProps
>(
  (
    {
      className,
      icon,
      title,
      subtitle,
      currentCalories,
      goalCalories,
      suggestions,
      onRecord,
    },
    ref
  ) => {
    // Calculate progress percentage, ensuring it doesn't exceed 100
    const progressPercentage = Math.min((currentCalories / goalCalories) * 100, 100);

    // Animate the calorie count with a spring effect
    const animatedCalories = useSpring(0, {
      damping: 40,
      stiffness: 300,
    });
    
    // Transform the animated value to a rounded integer for display
    const displayCalories = useTransform(animatedCalories, (value) =>
      value.toFixed(0)
    );

    // Update the animation when the currentCalories prop changes
    React.useEffect(() => {
      animatedCalories.set(currentCalories);
    }, [currentCalories, animatedCalories]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-3xl bg-card p-6 text-card-foreground shadow-lg",
          "flex flex-col gap-6 border",
          className
        )}
      >
        {/* Card Header */}
        <header className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <h2 className="font-bold text-lg">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <button className="text-muted-foreground">
            <ChevronUp className="h-5 w-5" />
          </button>
        </header>

        {/* Main Calorie Display */}
        <div className="flex flex-col gap-2">
            <div className="flex items-end gap-3">
                 <motion.p className="text-6xl font-bold tracking-tighter">
                    {displayCalories}
                </motion.p>
                <p className="mb-2 text-muted-foreground font-medium">
                    of {goalCalories}
                </p>
                <p className="mb-2 ml-auto font-medium">Calories</p>
            </div>
          {/* Progress Bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-primary/10">
                <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </div>
        </div>
        
        {/* Food Suggestions Section */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">Food suggestions</h3>
          <ul className="flex flex-col gap-2">
            {suggestions.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <p className="text-muted-foreground">{item.name}</p>
                <p className="font-medium">{item.calories} Kcal</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <Button
          onClick={onRecord}
          className="w-full rounded-full py-6 text-base font-semibold"
        >
          + Record Your Consumptions
        </Button>
      </div>
    );
  }
);

CalorieTrackerCard.displayName = "CalorieTrackerCard";

export { CalorieTrackerCard };
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
