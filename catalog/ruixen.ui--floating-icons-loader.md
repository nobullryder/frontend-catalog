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
floating-icons-loader.tsx
"use client";

import React from "react";

interface FloatingIconsLoaderProps {
  count?: number; // Number of icons
  size?: number; // Icon size in px
  color?: string; // Icon color
  Icon?: React.ElementType; // React icon component
}

const FloatingIconsLoader: React.FC<FloatingIconsLoaderProps> = ({
  count = 3,
  size = 40,
  color = "#5c3d99",
  Icon, // pass icon component
}) => {
  const icons = Array.from({ length: count });

  return (
    <div className="relative w-32 h-32 mx-auto">
      {icons.map((_, idx) => {
        const delay = idx * 0.3;
        const animationClass =
          idx % 3 === 0
            ? "animate-flowe-one"
            : idx % 3 === 1
            ? "animate-flowe-two"
            : "animate-flowe-three";

        return (
          <div
            key={idx}
            className={`absolute w-full h-full flex justify-center items-center ${animationClass}`}
            style={{ animationDelay: `${delay}s` }}
          >
            {Icon ? <Icon size={size} color={color} /> : null}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes flowe-one {
          0% { transform: scale(0.5) translateY(-200px); opacity:0; }
          25% { transform: scale(0.75) translateY(-100px); opacity:1; }
          50% { transform: scale(1) translateY(0); opacity:1; }
          75% { transform: scale(0.5) translateY(50px); opacity:1; }
          100% { transform: scale(0) translateY(100px); opacity:0; }
        }
        @keyframes flowe-two {
          0% { transform: scale(0.5) rotate(-10deg) translateY(-200px) translateX(-100px); opacity:0; }
          25% { transform: scale(1) rotate(-5deg) translateY(-100px) translateX(-50px); opacity:1; }
          50% { transform: scale(1) rotate(0deg) translateY(0) translateX(-25px); opacity:1; }
          75% { transform: scale(0.5) rotate(5deg) translateY(50px) translateX(0); opacity:1; }
          100% { transform: scale(0) rotate(10deg) translateY(100px) translateX(25px); opacity:0; }
        }
        @keyframes flowe-three {
          0% { transform: scale(0.5) rotate(10deg) translateY(-200px) translateX(100px); opacity:0; }
          25% { transform: scale(1) rotate(5deg) translateY(-100px) translateX(50px); opacity:1; }
          50% { transform: scale(1) rotate(0deg) translateY(0) translateX(25px); opacity:1; }
          75% { transform: scale(0.5) rotate(-5deg) translateY(50px) translateX(0); opacity:1; }
          100% { transform: scale(0) rotate(-10deg) translateY(100px) translateX(-25px); opacity:0; }
        }

        .animate-flowe-one { animation: flowe-one 1s linear infinite; }
        .animate-flowe-two { animation: flowe-two 1s linear infinite; }
        .animate-flowe-three { animation: flowe-three 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default FloatingIconsLoader;


code.demo.1760408947818.tsx
"use client";

import React from "react";
import { AlarmClockPlus, Airplay, BatteryCharging } from "lucide-react";
import FloatingIconsLoader from "@/components/ui/floating-icons-loader";

const LoaderDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8">

       <FloatingIconsLoader count={3} size={40} color="#5c3d99" Icon={AlarmClockPlus} />

      {/*<FloatingIconsLoader count={5} size={50} color="#ff4d6d" Icon={Airplay} />

      <FloatingIconsLoader count={8} size={30} color="#00ffd6" Icon={BatteryCharging} />*/}
    </div>
  );
};

export default LoaderDemoPage;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/floating-icons-loader.tsx
"use client";

import React from "react";

interface FloatingIconsLoaderProps {
  count?: number; // Number of icons
  size?: number; // Icon size in px
  color?: string; // Icon color
  Icon?: React.ElementType; // React icon component
}

const FloatingIconsLoader: React.FC<FloatingIconsLoaderProps> = ({
  count = 3,
  size = 40,
  color = "#5c3d99",
  Icon, // pass icon component
}) => {
  const icons = Array.from({ length: count });

  return (
    <div className="relative w-32 h-32 mx-auto">
      {icons.map((_, idx) => {
        const delay = idx * 0.3;
        const animationClass =
          idx % 3 === 0
            ? "animate-flowe-one"
            : idx % 3 === 1
            ? "animate-flowe-two"
            : "animate-flowe-three";

        return (
          <div
            key={idx}
            className={`absolute w-full h-full flex justify-center items-center ${animationClass}`}
            style={{ animationDelay: `${delay}s` }}
          >
            {Icon ? <Icon size={size} color={color} /> : null}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes flowe-one {
          0% { transform: scale(0.5) translateY(-200px); opacity:0; }
          25% { transform: scale(0.75) translateY(-100px); opacity:1; }
          50% { transform: scale(1) translateY(0); opacity:1; }
          75% { transform: scale(0.5) translateY(50px); opacity:1; }
          100% { transform: scale(0) translateY(100px); opacity:0; }
        }
        @keyframes flowe-two {
          0% { transform: scale(0.5) rotate(-10deg) translateY(-200px) translateX(-100px); opacity:0; }
          25% { transform: scale(1) rotate(-5deg) translateY(-100px) translateX(-50px); opacity:1; }
          50% { transform: scale(1) rotate(0deg) translateY(0) translateX(-25px); opacity:1; }
          75% { transform: scale(0.5) rotate(5deg) translateY(50px) translateX(0); opacity:1; }
          100% { transform: scale(0) rotate(10deg) translateY(100px) translateX(25px); opacity:0; }
        }
        @keyframes flowe-three {
          0% { transform: scale(0.5) rotate(10deg) translateY(-200px) translateX(100px); opacity:0; }
          25% { transform: scale(1) rotate(5deg) translateY(-100px) translateX(50px); opacity:1; }
          50% { transform: scale(1) rotate(0deg) translateY(0) translateX(25px); opacity:1; }
          75% { transform: scale(0.5) rotate(-5deg) translateY(50px) translateX(0); opacity:1; }
          100% { transform: scale(0) rotate(-10deg) translateY(100px) translateX(-25px); opacity:0; }
        }

        .animate-flowe-one { animation: flowe-one 1s linear infinite; }
        .animate-flowe-two { animation: flowe-two 1s linear infinite; }
        .animate-flowe-three { animation: flowe-three 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default FloatingIconsLoader;

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
