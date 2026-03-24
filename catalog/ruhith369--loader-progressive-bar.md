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
loader-progressive-bar.tsx
import React from "react";

const LoaderProgressiveBar: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      {/* Loading text */}
      <div className="dark:text-white text-black text-[14pt] font-semibold ml-[10px]">
        Loading
        <span className="ml-[3px] animate-[blink_1.5s_infinite]">.</span>
        <span className="ml-[3px] animate-[blink_1.5s_infinite] [animation-delay:0.3s]">
          .
        </span>
        <span className="ml-[3px] animate-[blink_1.5s_infinite] [animation-delay:0.6s]">
          .
        </span>
      </div>

      {/* Bar background */}
      <div className="flex items-center box-border p-[5px] w-[200px] h-[30px] bg-[#212121] shadow-[inset_-2px_2px_4px_#0c0c0c] rounded-[15px]">
        {/* Loading bar */}
        <div className="relative flex justify-center flex-col w-0 h-[20px] overflow-hidden rounded-[10px]
          bg-gradient-to-t from-[rgba(222,74,15,1)] to-[rgba(249,199,79,1)]
          animate-[loading_4s_ease-out_infinite]">

          {/* White bars */}
          <div className="absolute flex items-center gap-[18px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-[10px] h-[45px] opacity-30 rotate-45
                  bg-gradient-to-tr from-white to-transparent"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0;
          }
          80% {
            width: 100%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderProgressiveBar;


code.demo.1759289341888.tsx
import LoaderProgressiveBar from "@/components/ui/loader-progressive-bar";

export default function DemoOne() {
  return <LoaderProgressiveBar />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loader-progressive-bar.tsx
import React from "react";

const LoaderProgressiveBar: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      {/* Loading text */}
      <div className="dark:text-white text-black text-[14pt] font-semibold ml-[10px]">
        Loading
        <span className="ml-[3px] animate-[blink_1.5s_infinite]">.</span>
        <span className="ml-[3px] animate-[blink_1.5s_infinite] [animation-delay:0.3s]">
          .
        </span>
        <span className="ml-[3px] animate-[blink_1.5s_infinite] [animation-delay:0.6s]">
          .
        </span>
      </div>

      {/* Bar background */}
      <div className="flex items-center box-border p-[5px] w-[200px] h-[30px] bg-[#212121] shadow-[inset_-2px_2px_4px_#0c0c0c] rounded-[15px]">
        {/* Loading bar */}
        <div className="relative flex justify-center flex-col w-0 h-[20px] overflow-hidden rounded-[10px]
          bg-gradient-to-t from-[rgba(222,74,15,1)] to-[rgba(249,199,79,1)]
          animate-[loading_4s_ease-out_infinite]">

          {/* White bars */}
          <div className="absolute flex items-center gap-[18px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-[10px] h-[45px] opacity-30 rotate-45
                  bg-gradient-to-tr from-white to-transparent"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0;
          }
          80% {
            width: 100%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderProgressiveBar;

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
