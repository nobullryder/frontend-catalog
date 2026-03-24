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
slider-1.tsx
import React, { useEffect, useState } from "react";

interface SliderProps {
  onValueChange: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

export const Slider = ({ onValueChange, value }: SliderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let theme;
    if (typeof window === "undefined") {
      theme = "system";
    } else {
      theme = localStorage.getItem("theme") || "system";
    }

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative flex justify-center items-center mb-4">
        <style jsx>
          {`
              .slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 6px;
                  height: 14px;
                  background: white;
                  cursor: pointer;
                  border-radius: 1px;
                  box-shadow: 0 0 0 1px rgba(0, 0, 0, .21), 0 1px 2px rgba(0, 0, 0, .04);
                  transition: box-shadow .2s, background .2s, transform .2s;
              }

              .slider::-moz-range-thumb {
                  appearance: none;
                  width: 6px;
                  height: 14px;
                  background: white;
                  cursor: pointer;
                  border-radius: 1px;
                  border: none;
                  box-shadow: 0 0 0 1px rgba(0, 0, 0, .21), 0 1px 2px rgba(0, 0, 0, .04);
                  transition: box-shadow .2s, background .2s, transform .2s;
              }
          `}
        </style>
        <input
          type="range"
          min="1"
          max="100"
          value={value}
          onChange={(event) => onValueChange(parseInt(event.target.value, 10))}
          className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
          style={{
            background: `linear-gradient(to right, #006bff ${value - 0.5}%, ${isDarkMode ? "#1f1f1f" : "#ebebeb"} ${value - 0.5}%)`
          }}
        />
      </div>
    </div>
  );
};

code.demo.1750911183295.tsx
import { useState } from "react";
import { Slider } from "@/components/ui/slider-1";

export default function DemoOne() {
  const [value, setValue] = useState<number>(50);

  return <Slider onValueChange={setValue} value={value} />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/slider-1.tsx
import React, { useEffect, useState } from "react";

interface SliderProps {
  onValueChange: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

export const Slider = ({ onValueChange, value }: SliderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let theme;
    if (typeof window === "undefined") {
      theme = "system";
    } else {
      theme = localStorage.getItem("theme") || "system";
    }

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative flex justify-center items-center mb-4">
        <style jsx>
          {`
              .slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 6px;
                  height: 14px;
                  background: white;
                  cursor: pointer;
                  border-radius: 1px;
                  box-shadow: 0 0 0 1px rgba(0, 0, 0, .21), 0 1px 2px rgba(0, 0, 0, .04);
                  transition: box-shadow .2s, background .2s, transform .2s;
              }

              .slider::-moz-range-thumb {
                  appearance: none;
                  width: 6px;
                  height: 14px;
                  background: white;
                  cursor: pointer;
                  border-radius: 1px;
                  border: none;
                  box-shadow: 0 0 0 1px rgba(0, 0, 0, .21), 0 1px 2px rgba(0, 0, 0, .04);
                  transition: box-shadow .2s, background .2s, transform .2s;
              }
          `}
        </style>
        <input
          type="range"
          min="1"
          max="100"
          value={value}
          onChange={(event) => onValueChange(parseInt(event.target.value, 10))}
          className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
          style={{
            background: `linear-gradient(to right, #006bff ${value - 0.5}%, ${isDarkMode ? "#1f1f1f" : "#ebebeb"} ${value - 0.5}%)`
          }}
        />
      </div>
    </div>
  );
};
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
