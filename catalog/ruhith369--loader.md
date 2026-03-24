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
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* rotation happens here, not on the positioning wrapper */}
      <div className="w-[200px] h-[200px] m-auto filter animate-[rotate-move_2s_ease-in-out_infinite]">
        <div className="dot dot-1 absolute w-[70px] h-[70px] rounded-full bg-[#ffc400] top-0 bottom-0 left-0 right-0 m-auto" />
        <div className="dot dot-2 absolute w-[70px] h-[70px] rounded-full bg-[#0051ff] top-0 bottom-0 left-0 right-0 m-auto" />
        <div className="dot dot-3 absolute w-[70px] h-[70px] rounded-full bg-[#ff1717] top-0 bottom-0 left-0 right-0 m-auto" />

        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="hidden">
          <defs>
            <filter id="goo">
              <feGaussianBlur result="blur" stdDeviation={10} in="SourceGraphic" />
              <feColorMatrix
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                mode="matrix"
                in="blur"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Loader;


code.demo.1759089991110.tsx
import React from "react";
import Loader from "@/components/ui/loader";

const DemoPage: React.FC = () => {
  return (
    <Loader />
  );
};

export default DemoPage;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* rotation happens here, not on the positioning wrapper */}
      <div className="w-[200px] h-[200px] m-auto filter animate-[rotate-move_2s_ease-in-out_infinite]">
        <div className="dot dot-1 absolute w-[70px] h-[70px] rounded-full bg-[#ffc400] top-0 bottom-0 left-0 right-0 m-auto" />
        <div className="dot dot-2 absolute w-[70px] h-[70px] rounded-full bg-[#0051ff] top-0 bottom-0 left-0 right-0 m-auto" />
        <div className="dot dot-3 absolute w-[70px] h-[70px] rounded-full bg-[#ff1717] top-0 bottom-0 left-0 right-0 m-auto" />

        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="hidden">
          <defs>
            <filter id="goo">
              <feGaussianBlur result="blur" stdDeviation={10} in="SourceGraphic" />
              <feColorMatrix
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                mode="matrix"
                in="blur"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Loader;

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
