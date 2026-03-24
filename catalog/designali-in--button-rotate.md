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
button-rotate.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Component = () => {
  const text = "SEXY SHADCN BUTTON";

  return (
    <div className="border p-1 rounded-full border-dotted border-primary">
    <Button
      className="relative w-[100px] h-[100px] rounded-full overflow-hidden p-0 grid place-content-center bg-primary"
    >
      <p
        className="absolute inset-0"
        style={{
          animation: "text-rotation 8s linear infinite",
          position: "absolute",
          inset: 0,
        }}
      >
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            style={{ 
              position: "absolute",
              inset: "6px",
              transform: `rotate(${19 * i}deg)`,
              transformOrigin: "50% 50%",
              userSelect: "none",
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

      <div className="relative w-[40px] h-[40px] rounded-full text-primary bg-white flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-4 h-4  transition-transform duration-300 ease-in-out"
          style={{ transform: "translate(0, 0)" }}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-4 h-4  transition-transform duration-300 ease-in-out"
          style={{ transform: "translate(-150%, 150%)" }}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes text-rotation {
          to {
            rotate: 360deg;
          }
        }
        p {
          animation: text-rotation 8s linear infinite;
        }
        span {
          user-select: none;
        }
        button:hover svg:first-child {
          transform: translate(150%, -150%);
          color: black;
        }
        button:hover svg:last-child {
          transform: translate(0);
          color: black;
          transition-delay: 0.1s;
        }
      `}</style>
    </Button>
    </div>
  );
}

code.demo.1750836686057.tsx
import { Component } from "@/components/ui/button-rotate";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-rotate.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Component = () => {
  const text = "SEXY SHADCN BUTTON";

  return (
    <div className="border p-1 rounded-full border-dotted border-primary">
    <Button
      className="relative w-[100px] h-[100px] rounded-full overflow-hidden p-0 grid place-content-center bg-primary"
    >
      <p
        className="absolute inset-0"
        style={{
          animation: "text-rotation 8s linear infinite",
          position: "absolute",
          inset: 0,
        }}
      >
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            style={{ 
              position: "absolute",
              inset: "6px",
              transform: `rotate(${19 * i}deg)`,
              transformOrigin: "50% 50%",
              userSelect: "none",
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

      <div className="relative w-[40px] h-[40px] rounded-full text-primary bg-white flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-4 h-4  transition-transform duration-300 ease-in-out"
          style={{ transform: "translate(0, 0)" }}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-4 h-4  transition-transform duration-300 ease-in-out"
          style={{ transform: "translate(-150%, 150%)" }}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes text-rotation {
          to {
            rotate: 360deg;
          }
        }
        p {
          animation: text-rotation 8s linear infinite;
        }
        span {
          user-select: none;
        }
        button:hover svg:first-child {
          transform: translate(150%, -150%);
          color: black;
        }
        button:hover svg:last-child {
          transform: translate(0);
          color: black;
          transition-delay: 0.1s;
        }
      `}</style>
    </Button>
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
