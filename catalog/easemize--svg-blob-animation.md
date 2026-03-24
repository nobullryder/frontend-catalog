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
svg-blob-animation.tsx
import React from 'react';

const SvgBlobAnimation: React.FC = () => {
  return (
    <div id="bg-wrap">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="Gradient1" cx="50%" cy="50%" fx="1%" fy="50%" r=".5">
            <animate attributeName="fx" dur="10s" values="1%;5%;1%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
            <stop offset="0%" stopColor="rgba(255, 0, 255, 1)"></stop>
            <stop offset="100%" stopColor="rgba(255, 0, 255, 0)"></stop>
          </radialGradient>
          <radialGradient id="Gradient2" cx="50%" cy="50%" fx="1%" fy="50%" r=".5">
            <animate attributeName="fx" dur="8s" values="1%;5%;1%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
            <stop offset="0%" stopColor="rgba(255, 255, 0, 1)"></stop>
            <stop offset="100%" stopColor="rgba(255, 255, 0, 0)"></stop>
          </radialGradient>
          <radialGradient id="Gradient3" cx="50%" cy="50%" fx="1%" fy="50%" r=".5">
            <animate attributeName="fx" dur="7s" values="1%;5%;1%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
            <stop offset="0%" stopColor="rgba(0, 255, 255, 1)"></stop>
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)"></stop>
          </radialGradient>
        </defs>
        <rect x="10%" y="5%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(0 50 50)">
          <animate attributeName="x" dur="8s" values="10%;0%;10%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animate attributeName="y" dur="9s" values="5%;15%;5%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite"></animateTransform>
        </rect>
        <rect x="-10%" y="10%" width="100%" height="100%" fill="url(#Gradient2)" transform="rotate(0 50 50)">
          <animate attributeName="x" dur="9s" values="-10%;0%;-10%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animate attributeName="y" dur="10s" values="10%;30%;10%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="6s" repeatCount="indefinite"></animateTransform>
        </rect>
        <rect x="5%" y="5%" width="100%" height="100%" fill="url(#Gradient3)" transform="rotate(0 50 50)">
          <animate attributeName="x" dur="10s" values="5%;15%;5%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animate attributeName="y" dur="7s" values="5%;15%;5%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="5s" repeatCount="indefinite"></animateTransform>
        </rect>
      </svg>
    </div>
  );
};

export {SvgBlobAnimation}

code.demo.1748400169033.tsx
import { SvgBlobAnimation } from "@/components/ui/svg-blob-animation";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SvgBlobAnimation />
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/svg-blob-animation.tsx
import React from 'react';

const SvgBlobAnimation: React.FC = () => {
  return (
    <div id="bg-wrap">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="Gradient1" cx="50%" cy="50%" fx="1%" fy="50%" r=".5">
            <animate attributeName="fx" dur="10s" values="1%;5%;1%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
            <stop offset="0%" stopColor="rgba(255, 0, 255, 1)"></stop>
            <stop offset="100%" stopColor="rgba(255, 0, 255, 0)"></stop>
          </radialGradient>
          <radialGradient id="Gradient2" cx="50%" cy="50%" fx="1%" fy="50%" r=".5">
            <animate attributeName="fx" dur="8s" values="1%;5%;1%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
            <stop offset="0%" stopColor="rgba(255, 255, 0, 1)"></stop>
            <stop offset="100%" stopColor="rgba(255, 255, 0, 0)"></stop>
          </radialGradient>
          <radialGradient id="Gradient3" cx="50%" cy="50%" fx="1%" fy="50%" r=".5">
            <animate attributeName="fx" dur="7s" values="1%;5%;1%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
            <stop offset="0%" stopColor="rgba(0, 255, 255, 1)"></stop>
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)"></stop>
          </radialGradient>
        </defs>
        <rect x="10%" y="5%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(0 50 50)">
          <animate attributeName="x" dur="8s" values="10%;0%;10%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animate attributeName="y" dur="9s" values="5%;15%;5%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite"></animateTransform>
        </rect>
        <rect x="-10%" y="10%" width="100%" height="100%" fill="url(#Gradient2)" transform="rotate(0 50 50)">
          <animate attributeName="x" dur="9s" values="-10%;0%;-10%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animate attributeName="y" dur="10s" values="10%;30%;10%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="6s" repeatCount="indefinite"></animateTransform>
        </rect>
        <rect x="5%" y="5%" width="100%" height="100%" fill="url(#Gradient3)" transform="rotate(0 50 50)">
          <animate attributeName="x" dur="10s" values="5%;15%;5%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animate attributeName="y" dur="7s" values="5%;15%;5%" repeatCount="indefinite" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"></animate>
          <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="5s" repeatCount="indefinite"></animateTransform>
        </rect>
      </svg>
    </div>
  );
};

export {SvgBlobAnimation}
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
