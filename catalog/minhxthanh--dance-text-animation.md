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
dance-text-animation.tsx
import React from 'react';

/**
 * A mesmerizing dance animation component that displays a dynamic text effect
 * with layered CSS animations and a dark theme.
 */
const DanceTextAnimation = () => {
  return (
    <>
      <style>
        {`
          @keyframes dance {
            0%, 100% { 
              opacity: 1; 
              transform: translate(-50%, -50%) scale(1) rotate(0deg);
              text-shadow: 0 0 10px rgba(255, 69, 0, 0.8), 0 0 20px rgba(255, 140, 0, 0.6); 
            }
            25% { 
              opacity: 0.7; 
              transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
              text-shadow: 0 0 15px rgba(255, 69, 0, 0.9), 0 0 25px rgba(255, 140, 0, 0.7); 
            }
            50% { 
              opacity: 0.9; 
              transform: translate(-50%, -50%) scale(0.95) rotate(-2deg);
              text-shadow: 0 0 8px rgba(255, 69, 0, 0.7), 0 0 15px rgba(255, 140, 0, 0.5); 
            }
            75% { 
              opacity: 0.8; 
              transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
              text-shadow: 0 0 12px rgba(255, 69, 0, 0.8), 0 0 22px rgba(255, 140, 0, 0.6); 
            }
          }

          .dance-animation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            pointer-events: none;
          }

          .dance-layer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 6rem;
            font-weight: 900;
            mix-blend-mode: screen;
            animation: dance 2s infinite;
            white-space: nowrap;
            will-change: transform, opacity;
          }

          .dance-layer-1 {
            color: #ff4500;
            animation-delay: 0s;
            z-index: 1;
          }

          .dance-layer-2 {
            color: #ff8c00;
            animation-delay: 0.3s;
            animation-duration: 2.2s;
            z-index: 2;
          }

          .dance-layer-3 {
            color: #ffac1c;
            animation-delay: 0.6s;
            animation-duration: 2.4s;
            z-index: 3;
          }
        `}
      </style>

      <div className="min-h-screen bg-black relative">
        {/* Dance Animation */}
        <div className="dance-animation">
          <div className="dance-layer dance-layer-1">DANCE TEXT</div>
          <div className="dance-layer dance-layer-2">DANCE TEXT</div>
          <div className="dance-layer dance-layer-3">DANCE TEXT</div>
        </div>
      </div>
    </>
  );
};

export default DanceTextAnimation;

code.demo.1748758345928.tsx
// This is file with demos of your component
// Each export is one usecase for your component

import DanceTextAnimation from "@/components/ui/dance-text-animation";

const DemoOne = () => {
  return (
    <div className="items-center w-full h-screen">
      <DanceTextAnimation />
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dance-text-animation.tsx
import React from 'react';

/**
 * A mesmerizing dance animation component that displays a dynamic text effect
 * with layered CSS animations and a dark theme.
 */
const DanceTextAnimation = () => {
  return (
    <>
      <style>
        {`
          @keyframes dance {
            0%, 100% { 
              opacity: 1; 
              transform: translate(-50%, -50%) scale(1) rotate(0deg);
              text-shadow: 0 0 10px rgba(255, 69, 0, 0.8), 0 0 20px rgba(255, 140, 0, 0.6); 
            }
            25% { 
              opacity: 0.7; 
              transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
              text-shadow: 0 0 15px rgba(255, 69, 0, 0.9), 0 0 25px rgba(255, 140, 0, 0.7); 
            }
            50% { 
              opacity: 0.9; 
              transform: translate(-50%, -50%) scale(0.95) rotate(-2deg);
              text-shadow: 0 0 8px rgba(255, 69, 0, 0.7), 0 0 15px rgba(255, 140, 0, 0.5); 
            }
            75% { 
              opacity: 0.8; 
              transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
              text-shadow: 0 0 12px rgba(255, 69, 0, 0.8), 0 0 22px rgba(255, 140, 0, 0.6); 
            }
          }

          .dance-animation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            pointer-events: none;
          }

          .dance-layer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 6rem;
            font-weight: 900;
            mix-blend-mode: screen;
            animation: dance 2s infinite;
            white-space: nowrap;
            will-change: transform, opacity;
          }

          .dance-layer-1 {
            color: #ff4500;
            animation-delay: 0s;
            z-index: 1;
          }

          .dance-layer-2 {
            color: #ff8c00;
            animation-delay: 0.3s;
            animation-duration: 2.2s;
            z-index: 2;
          }

          .dance-layer-3 {
            color: #ffac1c;
            animation-delay: 0.6s;
            animation-duration: 2.4s;
            z-index: 3;
          }
        `}
      </style>

      <div className="min-h-screen bg-black relative">
        {/* Dance Animation */}
        <div className="dance-animation">
          <div className="dance-layer dance-layer-1">DANCE TEXT</div>
          <div className="dance-layer dance-layer-2">DANCE TEXT</div>
          <div className="dance-layer dance-layer-3">DANCE TEXT</div>
        </div>
      </div>
    </>
  );
};

export default DanceTextAnimation;
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
