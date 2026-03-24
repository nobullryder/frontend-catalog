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
loader.tsx
"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="relative w-12 h-12 mx-auto">
      {/* Shadow */}
      {/* <div className="absolute top-16 left-0 w-12 h-[2px] bg-[#f0808050] rounded-full animate-shadow-jump" /> */}
      
      {/* Box */}
      <div className="absolute w-full h-full bg-[#f08080] rounded-md animate-box-jump" />
      
      {/* Tailwind keyframe styles */}
      <style>{`
        @keyframes box-jump {
          15% {
            border-bottom-right-radius: 3px;
          }
          25% {
            transform: translateY(9px) rotate(22.5deg);
          }
          50% {
            transform: translateY(18px) scale(1, 0.9) rotate(45deg);
            border-bottom-right-radius: 40px;
          }
          75% {
            transform: translateY(9px) rotate(67.5deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }

        @keyframes shadow-jump {
          0%, 100% {
            transform: scale(1, 1);
          }
          50% {
            transform: scale(1.2, 1);
          }
        }

        .animate-box-jump {
          animation: box-jump 0.5s linear infinite;
        }

        .animate-shadow-jump {
          animation: shadow-jump 0.5s linear infinite;
        }
      `}</style>
    </div>
  );
}


code.demo.1753162548119.tsx
import Loader from "@/components/ui/loader";

export default function DemoOne() {
  return <Loader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader.tsx
"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="relative w-12 h-12 mx-auto">
      {/* Shadow */}
      {/* <div className="absolute top-16 left-0 w-12 h-[2px] bg-[#f0808050] rounded-full animate-shadow-jump" /> */}
      
      {/* Box */}
      <div className="absolute w-full h-full bg-[#f08080] rounded-md animate-box-jump" />
      
      {/* Tailwind keyframe styles */}
      <style>{`
        @keyframes box-jump {
          15% {
            border-bottom-right-radius: 3px;
          }
          25% {
            transform: translateY(9px) rotate(22.5deg);
          }
          50% {
            transform: translateY(18px) scale(1, 0.9) rotate(45deg);
            border-bottom-right-radius: 40px;
          }
          75% {
            transform: translateY(9px) rotate(67.5deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }

        @keyframes shadow-jump {
          0%, 100% {
            transform: scale(1, 1);
          }
          50% {
            transform: scale(1.2, 1);
          }
        }

        .animate-box-jump {
          animation: box-jump 0.5s linear infinite;
        }

        .animate-shadow-jump {
          animation: shadow-jump 0.5s linear infinite;
        }
      `}</style>
    </div>
  );
}

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
