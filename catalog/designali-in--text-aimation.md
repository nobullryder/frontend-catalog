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
text-aimation.tsx
import React from 'react';

const TextAnimation = ({ text, size = '20vmin', color = '#f43f5e', animationDuration = '1200ms'  }) => {
  const shadowColors = [
    `${color}40`,  
    `${color}33`,  
    `${color}26`,  
    `${color}1A`  
  ];
  const shadowDistanceStep = '0.033333em';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        margin: 0, 
        textRendering: 'optimizeLegibility',
        overflow: 'hidden',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div 
        id="text"
        style={{
          animation: `layerize cubic-bezier(0.4, 0.0, 0.2, 1) ${animationDuration} 200ms infinite alternate`,
          opacity: 0,
          width: '100%',
          color: color, 
          font: `${size} "Geist", sans-serif`,
          cursor: 'default',
          userSelect: 'none',
          textAlign: 'center',
          textShadow: shadowColors
            .map((shadowColor, i) => `${shadowDistanceStep} * ${i + 1} * 1 ${shadowDistanceStep} * ${i + 1} * 1 ${shadowColor}`)
            .join(', ')
        }}
      >
      <span className="italic tracking-tighter font-bold">
        {text}
        </span>
      </div>
      <style jsx>{`
        @keyframes layerize {
          0% {
            opacity: 0;
            transform: translate(0, 0);
            text-shadow: ${shadowColors
              .map(() => '0 0 transparent')
              .join(', ')};
          }
          100% {
            opacity: 1;
            transform: translate(calc(${shadowDistanceStep} * ${shadowColors.length} / -2), calc(${shadowDistanceStep} * ${shadowColors.length} / -2));
            text-shadow: ${shadowColors
              .map((shadowColor, i) => `calc(${shadowDistanceStep} * ${i + 1} * 1) calc(${shadowDistanceStep} * ${i + 1} * 1) ${shadowColor}`)
              .join(', ')};
          }
        }
      `}</style>
    </div>
  );
};

export { TextAnimation };

code.demo.1757591386493.tsx
import { TextAnimation } from "@/components/ui/text-aimation";

export default function DemoOne() {
  return <TextAnimation text="21st.dev" />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-aimation.tsx
import React from 'react';

const TextAnimation = ({ text, size = '20vmin', color = '#f43f5e', animationDuration = '1200ms'  }) => {
  const shadowColors = [
    `${color}40`,  
    `${color}33`,  
    `${color}26`,  
    `${color}1A`  
  ];
  const shadowDistanceStep = '0.033333em';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        margin: 0, 
        textRendering: 'optimizeLegibility',
        overflow: 'hidden',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div 
        id="text"
        style={{
          animation: `layerize cubic-bezier(0.4, 0.0, 0.2, 1) ${animationDuration} 200ms infinite alternate`,
          opacity: 0,
          width: '100%',
          color: color, 
          font: `${size} "Geist", sans-serif`,
          cursor: 'default',
          userSelect: 'none',
          textAlign: 'center',
          textShadow: shadowColors
            .map((shadowColor, i) => `${shadowDistanceStep} * ${i + 1} * 1 ${shadowDistanceStep} * ${i + 1} * 1 ${shadowColor}`)
            .join(', ')
        }}
      >
      <span className="italic tracking-tighter font-bold">
        {text}
        </span>
      </div>
      <style jsx>{`
        @keyframes layerize {
          0% {
            opacity: 0;
            transform: translate(0, 0);
            text-shadow: ${shadowColors
              .map(() => '0 0 transparent')
              .join(', ')};
          }
          100% {
            opacity: 1;
            transform: translate(calc(${shadowDistanceStep} * ${shadowColors.length} / -2), calc(${shadowDistanceStep} * ${shadowColors.length} / -2));
            text-shadow: ${shadowColors
              .map((shadowColor, i) => `calc(${shadowDistanceStep} * ${i + 1} * 1) calc(${shadowDistanceStep} * ${i + 1} * 1) ${shadowColor}`)
              .join(', ')};
          }
        }
      `}</style>
    </div>
  );
};

export { TextAnimation };
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
