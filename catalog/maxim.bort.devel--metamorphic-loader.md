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
metamorphic-loader.tsx
"use client";
import React from "react";

export interface MetamorphicLoaderProps {
  size: number;             // Size of the largest circle
  color?: string;           // Base color for the circles (optional)
  lighteningStep?: number;  // Step for lightening the color (optional)
}

// Helper function to lighten a color (same as your original)
function lightenColor(color: string, amount: number) {
  if (!color) return "#000000"; // Default to black if color is undefined

  const rgb = color.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb) return color;

  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);

  const newR = Math.min(255, Math.max(0, r + amount));
  const newG = Math.min(255, Math.max(0, g + amount));
  const newB = Math.min(255, Math.max(0, b + amount));

  // Convert the new RGB values back to hexadecimal
  return (
    "#" +
    newR.toString(16).padStart(2, "0") +
    newG.toString(16).padStart(2, "0") +
    newB.toString(16).padStart(2, "0")
  );
}

export const MetamorphicLoader: React.FC<MetamorphicLoaderProps> = ({
  size,
  color = "#8f10f6",
  lighteningStep = 24,
}) => {
  const circleSizes = Array.from({ length: 9 }, (_, i) => size - i * lighteningStep);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      {circleSizes.map((circleSize, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            borderRadius: "50%",
            backgroundColor: lightenColor(color, index * lighteningStep),
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: "metamorphic-spin 2s alternate infinite",
            animationDelay: `${(index + 1) * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes metamorphic-spin {
          0% {
            border-radius: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          20% {
            border-radius: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          90% {
            border-radius: 5%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          100% {
            border-radius: 5%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
};


code.demo.1749543831040.tsx
"use client";
import React from "react";
import { MetamorphicLoader } from "@/components/ui/metamorphic-loader";

const Purple = () => (
  <div>
    <MetamorphicLoader size={260} />
  </div>
);

const Blue = () => (
  <div>
    <MetamorphicLoader size={200} color="#156ef6" lighteningStep={18} />
  </div>
);

const Green = () => (
  <div>
    <MetamorphicLoader size={216} color="#6cc606" />
  </div>
);

const Orange = () => (
   <div>
    <MetamorphicLoader size={124} color="#ffa300" lighteningStep={14} />
  </div>
);

const Emerald = () => (
  <div>
    <MetamorphicLoader size={300} color="#019a41" lighteningStep={50} />
  </div>
);

export { Purple, Blue, Green, Orange, Emerald };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/metamorphic-loader.tsx
"use client";
import React from "react";

export interface MetamorphicLoaderProps {
  size: number;             // Size of the largest circle
  color?: string;           // Base color for the circles (optional)
  lighteningStep?: number;  // Step for lightening the color (optional)
}

// Helper function to lighten a color (same as your original)
function lightenColor(color: string, amount: number) {
  if (!color) return "#000000"; // Default to black if color is undefined

  const rgb = color.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb) return color;

  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);

  const newR = Math.min(255, Math.max(0, r + amount));
  const newG = Math.min(255, Math.max(0, g + amount));
  const newB = Math.min(255, Math.max(0, b + amount));

  // Convert the new RGB values back to hexadecimal
  return (
    "#" +
    newR.toString(16).padStart(2, "0") +
    newG.toString(16).padStart(2, "0") +
    newB.toString(16).padStart(2, "0")
  );
}

export const MetamorphicLoader: React.FC<MetamorphicLoaderProps> = ({
  size,
  color = "#8f10f6",
  lighteningStep = 24,
}) => {
  const circleSizes = Array.from({ length: 9 }, (_, i) => size - i * lighteningStep);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      {circleSizes.map((circleSize, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            borderRadius: "50%",
            backgroundColor: lightenColor(color, index * lighteningStep),
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: "metamorphic-spin 2s alternate infinite",
            animationDelay: `${(index + 1) * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes metamorphic-spin {
          0% {
            border-radius: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          20% {
            border-radius: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          90% {
            border-radius: 5%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          100% {
            border-radius: 5%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
        }
      `}</style>
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
