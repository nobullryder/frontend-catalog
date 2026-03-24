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
progress.tsx
import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility for class names

// Props interface for type-safety and reusability
interface Vo2MaxCardProps {
  /** The main title of the card. */
  title: string;
  /** The primary numerical value to display. */
  value: number;
  /** A descriptive status text below the value (e.g., 'Excellent'). */
  status: string;
  /** A footer description. Can be a string or a ReactNode for rich text. */
  description: React.ReactNode;
  /** The progress percentage (0-100) for the radial bar. */
  progress: number;
  /** An icon component to display in the top-right corner. */
  icon: React.ReactNode;
  /** Optional className to merge with the default card styles. */
  className?: string;
}

export const Vo2MaxCard: React.FC<Vo2MaxCardProps> = ({
  title,
  value,
  status,
  description,
  progress,
  icon,
  className,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const progressValue = useMotionValue(0);

  React.useEffect(() => {
    // Animate the numerical value
    const valueAnimation = animate(count, value, {
      duration: 1.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    });

    // Animate the progress bar
    const progressAnimation = animate(progressValue, progress, {
      duration: 1.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    });

    return () => {
      valueAnimation.stop();
      progressAnimation.stop();
    };
  }, [value, progress, count, progressValue]);

  // SVG circle properties
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(
    progressValue,
    (v) => circumference - (v / 100) * circumference
  );

  return (
    <div
      className={cn(
        'relative flex w-full max-w-sm flex-col gap-4 rounded-2xl border bg-card p-6 text-card-foreground shadow-sm overflow-hidden',
        className
      )}
    >
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {icon}
        </div>
      </div>

      {/* Radial Progress and Value */}
      <div className="relative flex h-56 w-full items-center justify-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="-rotate-90"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Background track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            fill="transparent"
            className="stroke-primary/10"
            strokeDasharray="8 12" // Creates the segmented look
            strokeLinecap="round"
          />
          {/* Foreground progress */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            fill="transparent"
            className="stroke-primary"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Central Text Content */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span className="text-6xl font-bold tracking-tighter">
            {rounded}
          </motion.span>
          <p className="text-xl font-medium text-muted-foreground">{status}</p>
        </div>
      </div>

      {/* Footer Description */}
      <div className="text-center text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  );
};

code.demo.1758071118032.tsx
import { Heart } from 'lucide-react';
import { Vo2MaxCard } from '@/components/ui/progress'; // Adjust the import path as needed

const Vo2MaxCardDemo = () => {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <Vo2MaxCard
        title="Vo2 Max"
        value={51}
        status="Excellent"
        progress={51} // Represents the filled portion of the circle, e.g., 51%
        icon={<Heart size={20} />}
        description={
          <>
            Your Vo2 Max is in the{' '}
            <span className="font-semibold text-primary">Top 15%</span>
            <br />
            for your age and gender
          </>
        }
      />
    </div>
  );
};

export default Vo2MaxCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress.tsx
import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility for class names

// Props interface for type-safety and reusability
interface Vo2MaxCardProps {
  /** The main title of the card. */
  title: string;
  /** The primary numerical value to display. */
  value: number;
  /** A descriptive status text below the value (e.g., 'Excellent'). */
  status: string;
  /** A footer description. Can be a string or a ReactNode for rich text. */
  description: React.ReactNode;
  /** The progress percentage (0-100) for the radial bar. */
  progress: number;
  /** An icon component to display in the top-right corner. */
  icon: React.ReactNode;
  /** Optional className to merge with the default card styles. */
  className?: string;
}

export const Vo2MaxCard: React.FC<Vo2MaxCardProps> = ({
  title,
  value,
  status,
  description,
  progress,
  icon,
  className,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const progressValue = useMotionValue(0);

  React.useEffect(() => {
    // Animate the numerical value
    const valueAnimation = animate(count, value, {
      duration: 1.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    });

    // Animate the progress bar
    const progressAnimation = animate(progressValue, progress, {
      duration: 1.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    });

    return () => {
      valueAnimation.stop();
      progressAnimation.stop();
    };
  }, [value, progress, count, progressValue]);

  // SVG circle properties
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(
    progressValue,
    (v) => circumference - (v / 100) * circumference
  );

  return (
    <div
      className={cn(
        'relative flex w-full max-w-sm flex-col gap-4 rounded-2xl border bg-card p-6 text-card-foreground shadow-sm overflow-hidden',
        className
      )}
    >
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {icon}
        </div>
      </div>

      {/* Radial Progress and Value */}
      <div className="relative flex h-56 w-full items-center justify-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="-rotate-90"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Background track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            fill="transparent"
            className="stroke-primary/10"
            strokeDasharray="8 12" // Creates the segmented look
            strokeLinecap="round"
          />
          {/* Foreground progress */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="12"
            fill="transparent"
            className="stroke-primary"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Central Text Content */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span className="text-6xl font-bold tracking-tighter">
            {rounded}
          </motion.span>
          <p className="text-xl font-medium text-muted-foreground">{status}</p>
        </div>
      </div>

      {/* Footer Description */}
      <div className="text-center text-sm text-muted-foreground">
        {description}
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
