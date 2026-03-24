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
loader-13.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assumes you have a `cn` utility function

// Self-contained keyframes for the animation. This makes the component portable.
const animationKeyframes = `
  @keyframes infinity-loader-travel {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -100; }
  }
`;

export interface InfinityLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loader in pixels.
   * @default 40
   */
  size?: number;
  /**
   * Additional class names for the container for custom styling.
   */
  className?: string;
}

const InfinityLoader = React.forwardRef<HTMLDivElement, InfinityLoaderProps>(
  ({ className, size = 40, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        {/* Injects the keyframes into the document head */}
        <style>{animationKeyframes}</style>
        <svg
          // FIX: Expanded viewBox from "0 0 40 40" to "-2 -2 44 44".
          // This adds a 2px padding on all sides to prevent the 4px stroke from being clipped.
          viewBox="-2 -2 44 44"
          height={size}
          width={size}
          aria-hidden="true" // Decorative SVG is hidden from screen readers
        >
          {/* Background track path using muted theme color */}
          <path
            className="stroke-muted opacity-50"
            fill="none"
            strokeWidth={4}
            pathLength={100}
            d="M29.76 18.72 c0 7.28-3.92 13.6-9.84 16.96 c-2.88 1.68-6.24 2.64-9.84 2.64 c-3.6 0-6.88-0.96-9.76-2.64 c0-7.28 3.92-13.52 9.84-16.96 c2.88-1.68 6.24-2.64 9.76-2.64 S26.88 17.04 29.76 18.72 c5.84 3.36 9.76 9.68 9.84 16.96 c-2.88 1.68-6.24 2.64-9.76 2.64 c-3.6 0-6.88-0.96-9.84-2.64 c-5.84-3.36-9.76-9.68-9.76-16.96 c0-7.28 3.92-13.6 9.76-16.96 C25.84 5.12 29.76 11.44 29.76 18.72z"
          />
          {/* Animated path using primary theme color */}
          <path
            style={{ animation: `infinity-loader-travel 2s linear infinite` }}
            className="stroke-primary"
            fill="none"
            strokeWidth={4}
            strokeDasharray="15, 85"
            strokeDashoffset={0}
            strokeLinecap="round"
            pathLength={100}
            d="M29.76 18.72 c0 7.28-3.92 13.6-9.84 16.96 c-2.88 1.68-6.24 2.64-9.84 2.64 c-3.6 0-6.88-0.96-9.76-2.64 c0-7.28 3.92-13.52 9.84-16.96 c2.88-1.68 6.24-2.64 9.76-2.64 S26.88 17.04 29.76 18.72 c5.84 3.36 9.76 9.68 9.84 16.96 c-2.88 1.68-6.24 2.64-9.76 2.64 c-3.6 0-6.88-0.96-9.84-2.64 c-5.84-3.36-9.76-9.68-9.76-16.96 c0-7.28 3.92-13.6 9.76-16.96 C25.84 5.12 29.76 11.44 29.76 18.72z"
          />
        </svg>
        {/* Accessible text for screen readers */}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
InfinityLoader.displayName = "InfinityLoader";

export { InfinityLoader };

code.demo.1757013981585.tsx
import { InfinityLoader } from "@/components/ui/loader-13";

export default function InfinityLoaderDemo() {
  return (
    <div className="flex min-h-[250px] w-full items-center justify-center bg-background p-4">
      <InfinityLoader 
        size={200} 
        // Change the color by passing any Tailwind stroke utility class here.
        // Examples: "[&>svg>path:last-child]:stroke-sky-500"
        //           "[&>svg>path:last-child]:stroke-amber-500"
        className="[&>svg>path:last-child]:stroke-destructive" 
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader-13.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assumes you have a `cn` utility function

// Self-contained keyframes for the animation. This makes the component portable.
const animationKeyframes = `
  @keyframes infinity-loader-travel {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -100; }
  }
`;

export interface InfinityLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loader in pixels.
   * @default 40
   */
  size?: number;
  /**
   * Additional class names for the container for custom styling.
   */
  className?: string;
}

const InfinityLoader = React.forwardRef<HTMLDivElement, InfinityLoaderProps>(
  ({ className, size = 40, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        {/* Injects the keyframes into the document head */}
        <style>{animationKeyframes}</style>
        <svg
          // FIX: Expanded viewBox from "0 0 40 40" to "-2 -2 44 44".
          // This adds a 2px padding on all sides to prevent the 4px stroke from being clipped.
          viewBox="-2 -2 44 44"
          height={size}
          width={size}
          aria-hidden="true" // Decorative SVG is hidden from screen readers
        >
          {/* Background track path using muted theme color */}
          <path
            className="stroke-muted opacity-50"
            fill="none"
            strokeWidth={4}
            pathLength={100}
            d="M29.76 18.72 c0 7.28-3.92 13.6-9.84 16.96 c-2.88 1.68-6.24 2.64-9.84 2.64 c-3.6 0-6.88-0.96-9.76-2.64 c0-7.28 3.92-13.52 9.84-16.96 c2.88-1.68 6.24-2.64 9.76-2.64 S26.88 17.04 29.76 18.72 c5.84 3.36 9.76 9.68 9.84 16.96 c-2.88 1.68-6.24 2.64-9.76 2.64 c-3.6 0-6.88-0.96-9.84-2.64 c-5.84-3.36-9.76-9.68-9.76-16.96 c0-7.28 3.92-13.6 9.76-16.96 C25.84 5.12 29.76 11.44 29.76 18.72z"
          />
          {/* Animated path using primary theme color */}
          <path
            style={{ animation: `infinity-loader-travel 2s linear infinite` }}
            className="stroke-primary"
            fill="none"
            strokeWidth={4}
            strokeDasharray="15, 85"
            strokeDashoffset={0}
            strokeLinecap="round"
            pathLength={100}
            d="M29.76 18.72 c0 7.28-3.92 13.6-9.84 16.96 c-2.88 1.68-6.24 2.64-9.84 2.64 c-3.6 0-6.88-0.96-9.76-2.64 c0-7.28 3.92-13.52 9.84-16.96 c2.88-1.68 6.24-2.64 9.76-2.64 S26.88 17.04 29.76 18.72 c5.84 3.36 9.76 9.68 9.84 16.96 c-2.88 1.68-6.24 2.64-9.76 2.64 c-3.6 0-6.88-0.96-9.84-2.64 c-5.84-3.36-9.76-9.68-9.76-16.96 c0-7.28 3.92-13.6 9.76-16.96 C25.84 5.12 29.76 11.44 29.76 18.72z"
          />
        </svg>
        {/* Accessible text for screen readers */}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
InfinityLoader.displayName = "InfinityLoader";

export { InfinityLoader };
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
