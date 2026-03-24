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
radial-animated-doodle.tsx
import React from 'react';

const RadialAnimation = ({ 
  count = 100, 
  size = 80, 
  duration = 4, 
  hue = 240,
  className = "" 
}) => {
  // Generate array of items
  const items = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className={`flex items-center justify-center w-full min-h-screen overflow-hidden bg-slate-900 ${className}`}>
      <div 
        className="relative rounded-full"
        style={{
          '--size': `${size}vmin`,
          '--c': count,
          '--dur': `${duration}s`,
          '--hue': `${hue}deg`,
          height: `${size}vmin`,
          width: `${size}vmin`,
        }}
      >
        {items.map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border-2 bg-slate-900"
            style={{
              '--i': i,
              '--width': 'calc(var(--size) / 4)',
              '--height': 'calc(((4 * (pow(var(--move), 2))) - (4 * var(--move)) + 1) * (var(--size) / 4))',
              '--del': 'calc(var(--dur) / var(--c) * 4)',
              '--color': `hsl(calc(4turn / var(--c) * var(--i)), 100%, 50%)`,
              height: 'calc(var(--height))',
              width: 'calc(var(--width))',
              borderColor: 'var(--color)',
              transform: `
                translate(-50%, -50%)
                rotate(calc(1turn / var(--c) * var(--i)))
                translateY(calc(((var(--size) - var(--height)) / 2) * (.5 - var(--move)) * 2))
              `,
              animation: 'move var(--dur) cubic-bezier(0.37, 0, 0.63, 1) infinite alternate',
              animationDelay: 'calc(var(--del) * var(--i) * -1)',
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes move {
          from { --move: 0; }
          to   { --move: 1; }
        }
        @property --move {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
      `}</style>
    </div>
  );
};



export default RadialAnimation;

code.demo.1754993911019.tsx
import RadialAnimation from "@/components/ui/radial-animated-doodle";

export default function DemoOne() {
  return <RadialAnimation />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radial-animated-doodle.tsx
import React from 'react';

const RadialAnimation = ({ 
  count = 100, 
  size = 80, 
  duration = 4, 
  hue = 240,
  className = "" 
}) => {
  // Generate array of items
  const items = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className={`flex items-center justify-center w-full min-h-screen overflow-hidden bg-slate-900 ${className}`}>
      <div 
        className="relative rounded-full"
        style={{
          '--size': `${size}vmin`,
          '--c': count,
          '--dur': `${duration}s`,
          '--hue': `${hue}deg`,
          height: `${size}vmin`,
          width: `${size}vmin`,
        }}
      >
        {items.map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full border-2 bg-slate-900"
            style={{
              '--i': i,
              '--width': 'calc(var(--size) / 4)',
              '--height': 'calc(((4 * (pow(var(--move), 2))) - (4 * var(--move)) + 1) * (var(--size) / 4))',
              '--del': 'calc(var(--dur) / var(--c) * 4)',
              '--color': `hsl(calc(4turn / var(--c) * var(--i)), 100%, 50%)`,
              height: 'calc(var(--height))',
              width: 'calc(var(--width))',
              borderColor: 'var(--color)',
              transform: `
                translate(-50%, -50%)
                rotate(calc(1turn / var(--c) * var(--i)))
                translateY(calc(((var(--size) - var(--height)) / 2) * (.5 - var(--move)) * 2))
              `,
              animation: 'move var(--dur) cubic-bezier(0.37, 0, 0.63, 1) infinite alternate',
              animationDelay: 'calc(var(--del) * var(--i) * -1)',
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes move {
          from { --move: 0; }
          to   { --move: 1; }
        }
        @property --move {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
      `}</style>
    </div>
  );
};



export default RadialAnimation;
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
