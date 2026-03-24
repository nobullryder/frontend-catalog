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
loading-indicator.tsx
import React from 'react';

const SqueezeLoader = ({ 
  size = 60, // Size in pixels
  color1 = '#3498db', 
  color2 = '#e74c3c',
  spinDuration = 10, // Duration in seconds
  squeezeDuration = 3, // Duration in seconds
  className = "",
  containerClassName = ""
}) => {
  return (
    <div className={`flex items-center justify-center min-h-screen w-screen bg-background ${containerClassName}`}>
      <div className={`flex justify-center ${className}`}>
        <div 
          className="relative"
          style={{
            '--color1': color1,
            '--color2': color2,
            '--spin-duration': `${spinDuration}s`,
            '--squeeze-duration': `${squeezeDuration}s`,
            width: `${size}px`,
            height: `${size}px`,
            animation: 'spin var(--spin-duration) infinite linear',
          }}
        >
          {/* First element (blue by default) */}
          <div
            className="absolute"
            style={{
              background: 'var(--color1)',
              animation: 'squeeze var(--squeeze-duration) infinite',
            }}
          />
          
          {/* Second element (red by default) with rounded corners */}
          <div
            className="absolute rounded-full"
            style={{
              background: 'var(--color2)',
              animation: 'squeeze var(--squeeze-duration) infinite',
              animationDelay: '-1.25s',
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes squeeze {
          0% { inset: 0 2em 2em 0; }
          12.5% { inset: 0 2em 0 0; }
          25% { inset: 2em 2em 0 0; }
          37.5% { inset: 2em 0 0 0; }
          50% { inset: 2em 0 0 2em; }
          62.5% { inset: 0 0 0 2em; }
          75% { inset: 0 0 2em 2em; }
          87.5% { inset: 0 0 2em 0; }
          100% { inset: 0 2em 2em 0; }
        }
        @keyframes spin {
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};


export default SqueezeLoader;

code.demo.1755253303336.tsx
import SqueezeLoader from "@/components/ui/loading-indicator";

export default function DemoOne() {
  return <div>
      {/* Default loader */}
      <SqueezeLoader />
      
      {/* Alternative configurations - uncomment to see variations */}
      {/*
      <SqueezeLoader 
        size={80} 
        color1="#9b59b6" 
        color2="#f39c12" 
        spinDuration={8} 
        squeezeDuration={2}
      />
      
      <SqueezeLoader 
        size={40} 
        color1="#2ecc71" 
        color2="#e67e22" 
        spinDuration={15} 
        squeezeDuration={4}
        containerClassName="bg-gray-900"
      />
      
      <SqueezeLoader 
        size={100} 
        color1="#1abc9c" 
        color2="#c0392b" 
        spinDuration={6} 
        squeezeDuration={2.5}
      />
      */}
    </div>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loading-indicator.tsx
import React from 'react';

const SqueezeLoader = ({ 
  size = 60, // Size in pixels
  color1 = '#3498db', 
  color2 = '#e74c3c',
  spinDuration = 10, // Duration in seconds
  squeezeDuration = 3, // Duration in seconds
  className = "",
  containerClassName = ""
}) => {
  return (
    <div className={`flex items-center justify-center min-h-screen w-screen bg-background ${containerClassName}`}>
      <div className={`flex justify-center ${className}`}>
        <div 
          className="relative"
          style={{
            '--color1': color1,
            '--color2': color2,
            '--spin-duration': `${spinDuration}s`,
            '--squeeze-duration': `${squeezeDuration}s`,
            width: `${size}px`,
            height: `${size}px`,
            animation: 'spin var(--spin-duration) infinite linear',
          }}
        >
          {/* First element (blue by default) */}
          <div
            className="absolute"
            style={{
              background: 'var(--color1)',
              animation: 'squeeze var(--squeeze-duration) infinite',
            }}
          />
          
          {/* Second element (red by default) with rounded corners */}
          <div
            className="absolute rounded-full"
            style={{
              background: 'var(--color2)',
              animation: 'squeeze var(--squeeze-duration) infinite',
              animationDelay: '-1.25s',
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes squeeze {
          0% { inset: 0 2em 2em 0; }
          12.5% { inset: 0 2em 0 0; }
          25% { inset: 2em 2em 0 0; }
          37.5% { inset: 2em 0 0 0; }
          50% { inset: 2em 0 0 2em; }
          62.5% { inset: 0 0 0 2em; }
          75% { inset: 0 0 2em 2em; }
          87.5% { inset: 0 0 2em 0; }
          100% { inset: 0 2em 2em 0; }
        }
        @keyframes spin {
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};


export default SqueezeLoader;
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
