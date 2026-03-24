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
bubble-button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// A new component to create the bubble effect
const Bubbles = () => {
  // Keyframes for the bubble animation are defined here for self-containment
  const keyframes = `
    @keyframes rise {
      0% {
        transform: translateY(0) scale(1);
        opacity: 0.4;
      }
      100% {
        transform: translateY(-100px) scale(0);
        opacity: 0;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div className="absolute inset-0 z-5 overflow-hidden rounded-full">
        {/* Generate multiple spans to act as bubbles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            // The animation is paused by default and only runs on group-hover
            className="absolute bottom-[-10px] block rounded-full bg-foreground/20 [animation-play-state:paused] group-hover:[animation-play-state:running]"
            style={{
              width: `${Math.random() * 12 + 4}px`, // Random size
              height: `${Math.random() * 12 + 4}px`, // Random size
              left: `${Math.random() * 95}%`, // Random horizontal position
              animation: `rise ${2 + Math.random() * 3}s ${ // Random duration
                Math.random() * 4
              }s linear infinite`, // Random delay
            }}
          />
        ))}
      </div>
    </>
  );
};

export interface UsageBadgeProps {
  /** The icon to display next to the plan name. */
  icon: React.ReactNode;
  /** The name of the current plan (e.g., "Free", "Pro"). */
  planName: string;
  /** The current usage count. */
  usage: number;
  /** The total limit for the plan. */
  limit: number;
  /** The content to show inside the hover tooltip. */
  tooltipContent: React.ReactNode;
  /** Optional additional class names for custom styling. */
  className?: string;
}

const UsageBadge = React.forwardRef<HTMLDivElement, UsageBadgeProps>(
  ({ icon, planName, usage, limit, tooltipContent, className }, ref) => {
    // Calculate the percentage of usage for the progress bar
    const usagePercentage = limit > 0 ? (usage / limit) * 100 : 0;

    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              ref={ref}
              className={cn(
                // Added "group" to enable group-hover states for child elements
                // Increased padding (px-4 py-2) and text size (text-base)
                "group relative inline-flex cursor-default items-center gap-3 overflow-hidden rounded-full border bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground shadow-sm transition-all hover:shadow-md",
                className
              )}
            >
              {/* Add the bubble animation component */}
              <Bubbles />

              {/* Icon */}
              <div className="z-10">{icon}</div>

              {/* Text Content */}
              <div className="z-10">
                <span>{planName}</span>
                <span className="ml-2 opacity-70">
                  {usage}/{limit} left
                </span>
              </div>
              
              {/* Progress Bar Background */}
              <div className="absolute inset-0 z-0 h-full w-full bg-secondary" />

              {/* Progress Bar Fill */}
              <div
                className="absolute inset-y-0 left-0 z-0 h-full bg-foreground/10 transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-center">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

UsageBadge.displayName = "UsageBadge";

export { UsageBadge };

code.demo.1753885282860.tsx
import { Database } from "lucide-react"; // Using lucide-react for icons
import { UsageBadge } from "@/components/ui/bubble-button"; // Adjust the import path as needed

export default function UsageBadgeDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center bg-background p-4">
      <UsageBadge
        icon={<Database className="h-4 w-4" />}
        planName="Free"
        usage={20}
        limit={20}
        tooltipContent={
          <p>
            You are on the free plan.
            <br />
            20/20 generations left.
          </p>
        }
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bubble-button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// A new component to create the bubble effect
const Bubbles = () => {
  // Keyframes for the bubble animation are defined here for self-containment
  const keyframes = `
    @keyframes rise {
      0% {
        transform: translateY(0) scale(1);
        opacity: 0.4;
      }
      100% {
        transform: translateY(-100px) scale(0);
        opacity: 0;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div className="absolute inset-0 z-5 overflow-hidden rounded-full">
        {/* Generate multiple spans to act as bubbles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            // The animation is paused by default and only runs on group-hover
            className="absolute bottom-[-10px] block rounded-full bg-foreground/20 [animation-play-state:paused] group-hover:[animation-play-state:running]"
            style={{
              width: `${Math.random() * 12 + 4}px`, // Random size
              height: `${Math.random() * 12 + 4}px`, // Random size
              left: `${Math.random() * 95}%`, // Random horizontal position
              animation: `rise ${2 + Math.random() * 3}s ${ // Random duration
                Math.random() * 4
              }s linear infinite`, // Random delay
            }}
          />
        ))}
      </div>
    </>
  );
};

export interface UsageBadgeProps {
  /** The icon to display next to the plan name. */
  icon: React.ReactNode;
  /** The name of the current plan (e.g., "Free", "Pro"). */
  planName: string;
  /** The current usage count. */
  usage: number;
  /** The total limit for the plan. */
  limit: number;
  /** The content to show inside the hover tooltip. */
  tooltipContent: React.ReactNode;
  /** Optional additional class names for custom styling. */
  className?: string;
}

const UsageBadge = React.forwardRef<HTMLDivElement, UsageBadgeProps>(
  ({ icon, planName, usage, limit, tooltipContent, className }, ref) => {
    // Calculate the percentage of usage for the progress bar
    const usagePercentage = limit > 0 ? (usage / limit) * 100 : 0;

    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              ref={ref}
              className={cn(
                // Added "group" to enable group-hover states for child elements
                // Increased padding (px-4 py-2) and text size (text-base)
                "group relative inline-flex cursor-default items-center gap-3 overflow-hidden rounded-full border bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground shadow-sm transition-all hover:shadow-md",
                className
              )}
            >
              {/* Add the bubble animation component */}
              <Bubbles />

              {/* Icon */}
              <div className="z-10">{icon}</div>

              {/* Text Content */}
              <div className="z-10">
                <span>{planName}</span>
                <span className="ml-2 opacity-70">
                  {usage}/{limit} left
                </span>
              </div>
              
              {/* Progress Bar Background */}
              <div className="absolute inset-0 z-0 h-full w-full bg-secondary" />

              {/* Progress Bar Fill */}
              <div
                className="absolute inset-y-0 left-0 z-0 h-full bg-foreground/10 transition-all duration-300"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-center">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

UsageBadge.displayName = "UsageBadge";

export { UsageBadge };
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
