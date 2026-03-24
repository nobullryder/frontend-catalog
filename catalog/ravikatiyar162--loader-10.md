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
loader-10.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assumes a standard shadcn setup

export interface GooeyLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The primary color for the goo effect. Defaults to shadcn's primary color. */
  primaryColor?: string;
  /** The secondary color for the goo effect. Defaults to shadcn's secondary color. */
  secondaryColor?: string;
  /** The color for the bottom border. Defaults to shadcn's border color. */
  borderColor?: string;
}

const GooeyLoader = React.forwardRef<HTMLDivElement, GooeyLoaderProps>(
  ({ className, primaryColor, secondaryColor, borderColor, ...props }, ref) => {
    // CSS variables for dynamic styling. Falls back to shadcn's theme variables.
    const style = {
      "--gooey-primary-color": primaryColor || "hsl(var(--primary))",
      "--gooey-secondary-color": secondaryColor || "hsl(var(--secondary))",
      "--gooey-border-color": borderColor || "hsl(var(--border))",
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center text-sm", className)}
        style={style}
        role="status"
        aria-label="Loading"
        {...props}
      >
        {/* SVG filter for the gooey effect */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="gooey-loader-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation={12} result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 48 -7"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Embedded styles for complex animations and pseudo-elements that are not
          achievable with standard Tailwind classes. Using CSS variables makes them theme-aware.
        */}
        <style>
          {`
            .gooey-loader {
              width: 12em;
              height: 3em;
              position: relative;
              overflow: hidden;
              border-bottom: 8px solid var(--gooey-border-color);
              filter: url(#gooey-loader-filter);
            }

            .gooey-loader::before,
            .gooey-loader::after {
              content: '';
              position: absolute;
              border-radius: 50%;
            }

            .gooey-loader::before {
              width: 22em;
              height: 18em;
              background-color: var(--gooey-primary-color);
              left: -2em;
              bottom: -18em;
              animation: gooey-loader-wee1 2s linear infinite;
            }

            .gooey-loader::after {
              width: 16em;
              height: 12em;
              background-color: var(--gooey-secondary-color);
              left: -4em;
              bottom: -12em;
              animation: gooey-loader-wee2 2s linear infinite 0.75s;
            }

            @keyframes gooey-loader-wee1 {
              0% {
                transform: translateX(-10em) rotate(0deg);
              }
              100% {
                transform: translateX(7em) rotate(180deg);
              }
            }

            @keyframes gooey-loader-wee2 {
              0% {
                transform: translateX(-8em) rotate(0deg);
              }
              100% {
                transform: translateX(8em) rotate(180deg);
              }
            }
          `}
        </style>

        {/* The loader element that the styles target */}
        <div className="gooey-loader" />
      </div>
    );
  }
);
GooeyLoader.displayName = "GooeyLoader";

export { GooeyLoader };

code.demo.1756028689238.tsx
import { GooeyLoader } from "@/components/ui/loader-10"; // Adjust path as needed

export default function GooeyLoaderDemo() {
  return (
    // A minimal container to center the component for presentation.
    <div className="flex items-center justify-center w-full min-h-[250px]">
      <GooeyLoader
        primaryColor="#f87171" // red-400
        secondaryColor="#fca5a5" // red-300
        borderColor="#e5e7eb" // gray-200
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader-10.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assumes a standard shadcn setup

export interface GooeyLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The primary color for the goo effect. Defaults to shadcn's primary color. */
  primaryColor?: string;
  /** The secondary color for the goo effect. Defaults to shadcn's secondary color. */
  secondaryColor?: string;
  /** The color for the bottom border. Defaults to shadcn's border color. */
  borderColor?: string;
}

const GooeyLoader = React.forwardRef<HTMLDivElement, GooeyLoaderProps>(
  ({ className, primaryColor, secondaryColor, borderColor, ...props }, ref) => {
    // CSS variables for dynamic styling. Falls back to shadcn's theme variables.
    const style = {
      "--gooey-primary-color": primaryColor || "hsl(var(--primary))",
      "--gooey-secondary-color": secondaryColor || "hsl(var(--secondary))",
      "--gooey-border-color": borderColor || "hsl(var(--border))",
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center text-sm", className)}
        style={style}
        role="status"
        aria-label="Loading"
        {...props}
      >
        {/* SVG filter for the gooey effect */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="gooey-loader-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation={12} result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 48 -7"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Embedded styles for complex animations and pseudo-elements that are not
          achievable with standard Tailwind classes. Using CSS variables makes them theme-aware.
        */}
        <style>
          {`
            .gooey-loader {
              width: 12em;
              height: 3em;
              position: relative;
              overflow: hidden;
              border-bottom: 8px solid var(--gooey-border-color);
              filter: url(#gooey-loader-filter);
            }

            .gooey-loader::before,
            .gooey-loader::after {
              content: '';
              position: absolute;
              border-radius: 50%;
            }

            .gooey-loader::before {
              width: 22em;
              height: 18em;
              background-color: var(--gooey-primary-color);
              left: -2em;
              bottom: -18em;
              animation: gooey-loader-wee1 2s linear infinite;
            }

            .gooey-loader::after {
              width: 16em;
              height: 12em;
              background-color: var(--gooey-secondary-color);
              left: -4em;
              bottom: -12em;
              animation: gooey-loader-wee2 2s linear infinite 0.75s;
            }

            @keyframes gooey-loader-wee1 {
              0% {
                transform: translateX(-10em) rotate(0deg);
              }
              100% {
                transform: translateX(7em) rotate(180deg);
              }
            }

            @keyframes gooey-loader-wee2 {
              0% {
                transform: translateX(-8em) rotate(0deg);
              }
              100% {
                transform: translateX(8em) rotate(180deg);
              }
            }
          `}
        </style>

        {/* The loader element that the styles target */}
        <div className="gooey-loader" />
      </div>
    );
  }
);
GooeyLoader.displayName = "GooeyLoader";

export { GooeyLoader };
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
