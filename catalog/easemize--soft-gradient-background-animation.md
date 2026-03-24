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
soft-gradient-background-animation.tsx
import React, { useEffect } from 'react';
import { useState } from "react";
import { cn } from "@/lib/utils";
interface BgradientAnimProps {
  className?: string;
  animationDuration?: number;
}

const BgradientAnim: React.FC<BgradientAnimProps> = ({
  className = "",
  animationDuration = 5,
}) => {
  useEffect(() => {
    // Add required CSS for the oklch gradient animation
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @property --hue1 {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
      @property --hue2 {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
      
      .oklch-gradient-bg {
        background-image: linear-gradient(
            in oklch longer hue to right,
            oklch(0.95 0.07 var(--hue1) / 60%),
            oklch(0.92 0.08 var(--hue2) / 60%)
          ),
          linear-gradient(
            in oklch longer hue to bottom,
            oklch(0.95 0.07 var(--hue1) / 60%),
            oklch(0.92 0.08 var(--hue2) / 60%)
          );
        background-size: 100% 100%;
        animation-name: anim_bg;
        animation-duration: ${animationDuration}s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      
      @keyframes anim_bg {
        0% {
          --hue1: 30deg;
          --hue2: 180deg;
        }
        100% {
          --hue1: 390deg;
          --hue2: 540deg;
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [animationDuration]);

  return (
    <div className={`oklch-gradient-bg w-full h-full ${className}`} />
  );
};

export {BgradientAnim}

code.demo.1748400610826.tsx
import { BgradientAnim } from "@/components/ui/soft-gradient-background-animation";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <BgradientAnim />
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/soft-gradient-background-animation.tsx
import React, { useEffect } from 'react';
import { useState } from "react";
import { cn } from "@/lib/utils";
interface BgradientAnimProps {
  className?: string;
  animationDuration?: number;
}

const BgradientAnim: React.FC<BgradientAnimProps> = ({
  className = "",
  animationDuration = 5,
}) => {
  useEffect(() => {
    // Add required CSS for the oklch gradient animation
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @property --hue1 {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
      @property --hue2 {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
      
      .oklch-gradient-bg {
        background-image: linear-gradient(
            in oklch longer hue to right,
            oklch(0.95 0.07 var(--hue1) / 60%),
            oklch(0.92 0.08 var(--hue2) / 60%)
          ),
          linear-gradient(
            in oklch longer hue to bottom,
            oklch(0.95 0.07 var(--hue1) / 60%),
            oklch(0.92 0.08 var(--hue2) / 60%)
          );
        background-size: 100% 100%;
        animation-name: anim_bg;
        animation-duration: ${animationDuration}s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      
      @keyframes anim_bg {
        0% {
          --hue1: 30deg;
          --hue2: 180deg;
        }
        100% {
          --hue1: 390deg;
          --hue2: 540deg;
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [animationDuration]);

  return (
    <div className={`oklch-gradient-bg w-full h-full ${className}`} />
  );
};

export {BgradientAnim}
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
