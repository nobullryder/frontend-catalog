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
flight-status-card.tsx
// components/ui/flight-status-card.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a lib/utils.ts for shadcn

// Define the props interface for type safety and reusability
export interface FlightStatusCardProps {
  airlineName: string;
  airlineLogo: React.ReactNode;
  planeImageSrc: string;
  flightNumber: string;
  gate: string;
  origin: { city: string; code: string };
  destination: { city: string; code: string };
  status: {
    text: string;
    color: 'green' | 'orange' | 'red';
  };
  boardingStatusText: string;
  boardingTimeLeft?: string; // Optional time left text
  gateCloseTime: string;
  boardingStartTime: string;
  boardingEndTime: string;
  progressPercent: number; // A number from 0 to 100 for the progress bar
  className?: string;
}

// Mapping status colors to tailwind classes
const statusColorMap = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

export const FlightStatusCard = React.forwardRef<HTMLDivElement, FlightStatusCardProps>(
  ({
    airlineName,
    airlineLogo,
    planeImageSrc,
    flightNumber,
    gate,
    origin,
    destination,
    status,
    boardingStatusText,
    boardingTimeLeft,
    gateCloseTime,
    boardingStartTime,
    boardingEndTime,
    progressPercent,
    className,
  }, ref) => {
    // Ensure progress is capped between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progressPercent));

    return (
      <div
        ref={ref}
        className={cn(
          'w-full w-md rounded-2xl bg-card text-card-foreground shadow-lg overflow-hidden font-sans border',
          className
        )}
      >
        {/* Top section with plane image and flight details */}
        <div className="p-6 pb-4 bg-card">
          <motion.div
            initial={{ opacity: 0, x: +50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex items-center justify-center relative h-80 mt-4 mb-2"
          >
            <img
              src={planeImageSrc}
              alt="Airplane"
              className="absolute h-full w-auto object-contain"
            />
          </motion.div>

          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {airlineLogo}
              <span className="font-semibold text-sm text-muted-foreground">{airlineName}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-foreground">
                {flightNumber} &middot; Gate {gate}
              </p>
              <div className="flex items-center justify-end gap-2 text-muted-foreground">
                <span>{origin.code}</span>
                <ArrowRight className="h-4 w-4" />
                <span>{destination.code}</span>
              </div>
               <div className="flex items-center justify-end gap-1.5 mt-1">
                <span className={cn('h-2 w-2 rounded-full', statusColorMap[status.color])}></span>
                <span className="text-xs font-medium">{status.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with boarding progress */}
        <div className="bg-foreground text-background p-5 rounded-t-xl">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">{boardingStatusText}</span>
              {boardingTimeLeft && (
                <span className="text-red-400 font-bold text-xs animate-pulse">
                  &middot; {boardingTimeLeft}
                </span>
              )}
            </div>
            <span className="font-medium">Gate closes at {gateCloseTime}</span>
          </div>

          {/* Progress bar */}
          <div className="relative w-full my-4">
            <div className="h-1.5 w-full bg-muted/50 rounded-full"></div>
            <motion.div
              className="absolute top-0 h-1.5 bg-background rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${clampedProgress}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -top-1.5 h-4 w-4 bg-background rounded-full border-2 border-foreground"
              initial={{ left: '0%' }}
              animate={{ left: `${clampedProgress}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ transform: 'translateX(-50%)' }}
              aria-valuenow={clampedProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
              aria-label="Boarding progress"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground-dark">
            <span>{boardingStartTime}</span>
            <span>{boardingEndTime}</span>
          </div>
        </div>
      </div>
    );
  }
);

FlightStatusCard.displayName = 'FlightStatusCard';

code.demo.1758292024507.tsx
// demo.tsx

import React, { useState, useEffect } from 'react';
import { FlightStatusCard } from '@/components/ui/flight-status-card';
import { PlaneTakeoff } from 'lucide-react';

const FlightStatusCardDemo = () => {
  const [progress, setProgress] = useState(0);

  // Animate progress for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-background p-4">
      <FlightStatusCard
        airlineName="AIR CANADA"
        airlineLogo={<PlaneTakeoff className="h-6 w-6 text-red-600" />}
        planeImageSrc="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ofFaHj1aADhV9vhZ5kUv0TLyEblR1U.png&w=320&q=75" // Replace with your actual plane image URL
        flightNumber="AC287"
        gate="E7"
        origin={{ city: 'Toronto', code: 'YYZ' }}
        destination={{ city: 'Paris', code: 'CDG' }}
        status={{ text: 'On Time', color: 'green' }}
        boardingStatusText="Boarding"
        boardingTimeLeft="5m left"
        gateCloseTime="9:15 PM"
        boardingStartTime="8:45 PM"
        boardingEndTime="9:15 PM"
        progressPercent={progress}
      />
    </div>
  );
};

export default FlightStatusCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flight-status-card.tsx
// components/ui/flight-status-card.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a lib/utils.ts for shadcn

// Define the props interface for type safety and reusability
export interface FlightStatusCardProps {
  airlineName: string;
  airlineLogo: React.ReactNode;
  planeImageSrc: string;
  flightNumber: string;
  gate: string;
  origin: { city: string; code: string };
  destination: { city: string; code: string };
  status: {
    text: string;
    color: 'green' | 'orange' | 'red';
  };
  boardingStatusText: string;
  boardingTimeLeft?: string; // Optional time left text
  gateCloseTime: string;
  boardingStartTime: string;
  boardingEndTime: string;
  progressPercent: number; // A number from 0 to 100 for the progress bar
  className?: string;
}

// Mapping status colors to tailwind classes
const statusColorMap = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

export const FlightStatusCard = React.forwardRef<HTMLDivElement, FlightStatusCardProps>(
  ({
    airlineName,
    airlineLogo,
    planeImageSrc,
    flightNumber,
    gate,
    origin,
    destination,
    status,
    boardingStatusText,
    boardingTimeLeft,
    gateCloseTime,
    boardingStartTime,
    boardingEndTime,
    progressPercent,
    className,
  }, ref) => {
    // Ensure progress is capped between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progressPercent));

    return (
      <div
        ref={ref}
        className={cn(
          'w-full w-md rounded-2xl bg-card text-card-foreground shadow-lg overflow-hidden font-sans border',
          className
        )}
      >
        {/* Top section with plane image and flight details */}
        <div className="p-6 pb-4 bg-card">
          <motion.div
            initial={{ opacity: 0, x: +50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex items-center justify-center relative h-80 mt-4 mb-2"
          >
            <img
              src={planeImageSrc}
              alt="Airplane"
              className="absolute h-full w-auto object-contain"
            />
          </motion.div>

          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {airlineLogo}
              <span className="font-semibold text-sm text-muted-foreground">{airlineName}</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-foreground">
                {flightNumber} &middot; Gate {gate}
              </p>
              <div className="flex items-center justify-end gap-2 text-muted-foreground">
                <span>{origin.code}</span>
                <ArrowRight className="h-4 w-4" />
                <span>{destination.code}</span>
              </div>
               <div className="flex items-center justify-end gap-1.5 mt-1">
                <span className={cn('h-2 w-2 rounded-full', statusColorMap[status.color])}></span>
                <span className="text-xs font-medium">{status.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with boarding progress */}
        <div className="bg-foreground text-background p-5 rounded-t-xl">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">{boardingStatusText}</span>
              {boardingTimeLeft && (
                <span className="text-red-400 font-bold text-xs animate-pulse">
                  &middot; {boardingTimeLeft}
                </span>
              )}
            </div>
            <span className="font-medium">Gate closes at {gateCloseTime}</span>
          </div>

          {/* Progress bar */}
          <div className="relative w-full my-4">
            <div className="h-1.5 w-full bg-muted/50 rounded-full"></div>
            <motion.div
              className="absolute top-0 h-1.5 bg-background rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${clampedProgress}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -top-1.5 h-4 w-4 bg-background rounded-full border-2 border-foreground"
              initial={{ left: '0%' }}
              animate={{ left: `${clampedProgress}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ transform: 'translateX(-50%)' }}
              aria-valuenow={clampedProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
              aria-label="Boarding progress"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground-dark">
            <span>{boardingStartTime}</span>
            <span>{boardingEndTime}</span>
          </div>
        </div>
      </div>
    );
  }
);

FlightStatusCard.displayName = 'FlightStatusCard';
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
