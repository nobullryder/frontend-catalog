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
loading-radar.tsx
import React from "react";

const LoadingRadar: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-[150px] h-[150px] rounded-full border border-[#333] shadow-[25px_25px_75px_rgba(0,0,0,0.55)] overflow-hidden">
      {/* inner dashed ring */}
      <div className="absolute inset-5 rounded-full border border-dashed border-[#444] shadow-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)]" />

      {/* center dashed circle */}
      <div className="absolute w-[50px] h-[50px] rounded-full border border-dashed border-[#444] shadow-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)]" />

      {/* radar sweep */}
      <span className="absolute top-1/2 left-1/2 w-1/2 h-full bg-transparent origin-top-left border-t border-dashed border-white animate-[radar81_2s_linear_infinite]">
        <span className="absolute top-0 left-0 w-full h-full bg-[seagreen] origin-top-left rotate-[-55deg] blur-[30px] drop-shadow-[20px_20px_20px_seagreen]" />
      </span>

      <style jsx>{`
        @keyframes radar81 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingRadar;


code.demo.1759287448167.tsx
import LoadingRadar from "@/components/ui/loading-radar";

export default function DemoOne() {
  return <LoadingRadar />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loading-radar.tsx
import React from "react";

const LoadingRadar: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-[150px] h-[150px] rounded-full border border-[#333] shadow-[25px_25px_75px_rgba(0,0,0,0.55)] overflow-hidden">
      {/* inner dashed ring */}
      <div className="absolute inset-5 rounded-full border border-dashed border-[#444] shadow-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)]" />

      {/* center dashed circle */}
      <div className="absolute w-[50px] h-[50px] rounded-full border border-dashed border-[#444] shadow-[inset_-5px_-5px_25px_rgba(0,0,0,0.25),inset_5px_5px_35px_rgba(0,0,0,0.25)]" />

      {/* radar sweep */}
      <span className="absolute top-1/2 left-1/2 w-1/2 h-full bg-transparent origin-top-left border-t border-dashed border-white animate-[radar81_2s_linear_infinite]">
        <span className="absolute top-0 left-0 w-full h-full bg-[seagreen] origin-top-left rotate-[-55deg] blur-[30px] drop-shadow-[20px_20px_20px_seagreen]" />
      </span>

      <style jsx>{`
        @keyframes radar81 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingRadar;

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
