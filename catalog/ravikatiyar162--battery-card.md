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
battery-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn
import { Zap, Smartphone } from "lucide-react";

// Props definition for type-safety and reusability
export interface BatteryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  deviceName: string;
  deviceIcon?: React.ReactNode;
  batteryLevel: number; // A number from 0 to 100
  isCharging: boolean;
  timeToFull: string;
  estimateLabel?: string;
}

const BatteryCard = React.forwardRef<HTMLDivElement, BatteryCardProps>(
  (
    {
      className,
      deviceName,
      deviceIcon = <Smartphone className="h-4 w-4" />,
      batteryLevel,
      isCharging,
      timeToFull,
      estimateLabel = "Full battery estimate",
      ...props
    },
    ref
  ) => {
    // Clamp battery level between 0 and 100
    const clampedBatteryLevel = Math.max(0, Math.min(100, batteryLevel));

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-2xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {deviceIcon}
            <span>{deviceName}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 items-center gap-4">
          {/* Battery Animation Container */}
          <div className="relative col-span-1 h-32 w-full overflow-hidden rounded-lg bg-muted/40">
            {/* The animated wave */}
            <div
              className="absolute bottom-0 w-[2000px] transition-all duration-500 ease-in-out"
              style={{ height: `${clampedBatteryLevel}%` }}
            >
              <svg
                className="absolute -bottom-1 h-4 w-[2000px] animate-[wave-animation_7s_linear_infinite]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 88.6"
                style={{ fill: `hsl(var(--battery-wave))` }}
              >
                <path d="M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.7h800v-.2-31.4z" />
              </svg>
              <svg
                className="absolute -bottom-1 h-5 w-[2000px] animate-[wave-animation_10s_linear_infinite]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 88.6"
                style={{
                  fill: `hsl(var(--battery-wave))`,
                  opacity: 0.5,
                }}
              >
                <path d="M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.7h800v-.2-31.4z" />
              </svg>
            </div>
            
            {/* Battery Level Text and Charging Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
              {isCharging && (
                <Zap className="h-5 w-5" style={{ color: `hsl(var(--battery-wave-foreground))` }} />
              )}
              <span className="text-xl font-bold" style={{ color: `hsl(var(--battery-wave-foreground))` }}>
                {clampedBatteryLevel}%
              </span>
            </div>
          </div>
          
          {/* Time Estimate Section */}
          <div className="col-span-2 flex flex-col items-start justify-center">
            <p className="text-4xl font-bold tracking-tight text-foreground">
              {timeToFull}
            </p>
            <p className="text-sm text-muted-foreground">{estimateLabel}</p>
          </div>
        </div>
      </div>
    );
  }
);

BatteryCard.displayName = "BatteryCard";

export { BatteryCard };

code.demo.1759329204157.tsx
import * as React from "react";
import { BatteryCard } from "@/components/ui/battery-card"; // Adjust the import path
import { Laptop } from "lucide-react";

const BatteryCardDemo = () => {
  const [batteryLevel, setBatteryLevel] = React.useState(55);

  // Effect to simulate battery charging for demonstration purposes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prevLevel) => {
        const newLevel = prevLevel + 1;
        // Reset when it reaches 100
        return newLevel > 100 ? 20 : newLevel;
      });
    }, 800); // Update every 800ms

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  // Format the remaining time based on battery level
  const formatTime = (level: number) => {
    if (level >= 100) return "Charged";
    const remainingPercentage = 100 - level;
    const minutesRemaining = Math.round(remainingPercentage * 1.5); // Simple estimation logic
    const hours = Math.floor(minutesRemaining / 60);
    const minutes = minutesRemaining % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="flex items-center justify-center bg-background p-10">
      <BatteryCard
        deviceName="Josh MacBook"
        deviceIcon={<Laptop className="h-4 w-4" />}
        batteryLevel={batteryLevel}
        isCharging={true}
        timeToFull={formatTime(batteryLevel)}
        estimateLabel="Time to full charge"
      />
    </div>
  );
};

export default BatteryCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/battery-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn
import { Zap, Smartphone } from "lucide-react";

// Props definition for type-safety and reusability
export interface BatteryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  deviceName: string;
  deviceIcon?: React.ReactNode;
  batteryLevel: number; // A number from 0 to 100
  isCharging: boolean;
  timeToFull: string;
  estimateLabel?: string;
}

const BatteryCard = React.forwardRef<HTMLDivElement, BatteryCardProps>(
  (
    {
      className,
      deviceName,
      deviceIcon = <Smartphone className="h-4 w-4" />,
      batteryLevel,
      isCharging,
      timeToFull,
      estimateLabel = "Full battery estimate",
      ...props
    },
    ref
  ) => {
    // Clamp battery level between 0 and 100
    const clampedBatteryLevel = Math.max(0, Math.min(100, batteryLevel));

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-2xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {deviceIcon}
            <span>{deviceName}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 items-center gap-4">
          {/* Battery Animation Container */}
          <div className="relative col-span-1 h-32 w-full overflow-hidden rounded-lg bg-muted/40">
            {/* The animated wave */}
            <div
              className="absolute bottom-0 w-[2000px] transition-all duration-500 ease-in-out"
              style={{ height: `${clampedBatteryLevel}%` }}
            >
              <svg
                className="absolute -bottom-1 h-4 w-[2000px] animate-[wave-animation_7s_linear_infinite]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 88.6"
                style={{ fill: `hsl(var(--battery-wave))` }}
              >
                <path d="M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.7h800v-.2-31.4z" />
              </svg>
              <svg
                className="absolute -bottom-1 h-5 w-[2000px] animate-[wave-animation_10s_linear_infinite]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 88.6"
                style={{
                  fill: `hsl(var(--battery-wave))`,
                  opacity: 0.5,
                }}
              >
                <path d="M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.7h800v-.2-31.4z" />
              </svg>
            </div>
            
            {/* Battery Level Text and Charging Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
              {isCharging && (
                <Zap className="h-5 w-5" style={{ color: `hsl(var(--battery-wave-foreground))` }} />
              )}
              <span className="text-xl font-bold" style={{ color: `hsl(var(--battery-wave-foreground))` }}>
                {clampedBatteryLevel}%
              </span>
            </div>
          </div>
          
          {/* Time Estimate Section */}
          <div className="col-span-2 flex flex-col items-start justify-center">
            <p className="text-4xl font-bold tracking-tight text-foreground">
              {timeToFull}
            </p>
            <p className="text-sm text-muted-foreground">{estimateLabel}</p>
          </div>
        </div>
      </div>
    );
  }
);

BatteryCard.displayName = "BatteryCard";

export { BatteryCard };
```

Install NPM dependencies:
```bash
lucide-react
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
