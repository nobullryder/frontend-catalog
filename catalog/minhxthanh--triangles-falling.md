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
triangles-falling.tsx
import React, { useMemo, useEffect } from 'react';

const Triangles = () => {
  const total = 200;
  // Precompute all random values once
  const triangles = useMemo(() => {
    return Array.from({ length: total }).map((_, i) => {
      const size = Math.random() * 50; // between 0 and 50px
      const rotate = Math.random() * 360; // between 0 and 360deg
      const hue = Math.floor(Math.random() * 360); // 0–359
      // animation-delay: -i*(10s/200)
      const delaySec = -(i * (10 / total)).toFixed(3);
      // random target translate coords (±500px)
      const tx = (Math.random() * 1000) - 500;
      const ty = (Math.random() * 1000) - 500;
      return { size, rotate, hue, delaySec, tx, ty };
    });
  }, []);

  // Ensure the wrapper fills the viewport
  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = 'black';
    document.body.style.backgroundImage = 'radial-gradient(circle at center, white 0%, #222 10%, black 60%)';
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div
      className="relative"
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        height: '100vh',
        width: '100vw',
      }}
    >
      {triangles.map(({ size, rotate, hue, delaySec, tx, ty }, idx) => (
        <div
          key={idx}
          className="absolute top-1/2 left-1/2 filter grayscale"
          style={{
            height: 0,
            width: 0,
            borderTop: `${size}px solid hsla(${hue},100%,50%,1)`,
            borderRight: `${size}px solid transparent`,
            borderLeft: `${size}px solid transparent`,
            marginLeft: `-${size / 2}px`,
            marginTop: `-${size / 2}px`,
            opacity: 0,
            transform: `rotate(${rotate}deg) translate3d(0,0,-1500px) scale(0)`,
            animation: `anim${idx} 10s infinite linear`,
            animationDelay: `${delaySec}s`,
          }}
        />
      ))}

      {/* Generate 200 @keyframes blocks—one per triangle */}
      <style>
        {triangles
          .map(
            ({ rotate, tx, ty }, idx) => `
          @keyframes anim${idx} {
            0% {
              opacity: 1;
              transform: rotate(${rotate * 1.5}deg) translate3d(${tx}px, ${ty}px, 1000px) scale(1);
            }
          }
        `
          )
          .join('\n')}
      </style>
    </div>
  );
};

export default Triangles;


code.demo.1748942167513.tsx
import Triangles from "@/components/ui/triangles-falling";

const DemoOne = () => {
  return <Triangles />;
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/triangles-falling.tsx
import React, { useMemo, useEffect } from 'react';

const Triangles = () => {
  const total = 200;
  // Precompute all random values once
  const triangles = useMemo(() => {
    return Array.from({ length: total }).map((_, i) => {
      const size = Math.random() * 50; // between 0 and 50px
      const rotate = Math.random() * 360; // between 0 and 360deg
      const hue = Math.floor(Math.random() * 360); // 0–359
      // animation-delay: -i*(10s/200)
      const delaySec = -(i * (10 / total)).toFixed(3);
      // random target translate coords (±500px)
      const tx = (Math.random() * 1000) - 500;
      const ty = (Math.random() * 1000) - 500;
      return { size, rotate, hue, delaySec, tx, ty };
    });
  }, []);

  // Ensure the wrapper fills the viewport
  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = 'black';
    document.body.style.backgroundImage = 'radial-gradient(circle at center, white 0%, #222 10%, black 60%)';
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div
      className="relative"
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        height: '100vh',
        width: '100vw',
      }}
    >
      {triangles.map(({ size, rotate, hue, delaySec, tx, ty }, idx) => (
        <div
          key={idx}
          className="absolute top-1/2 left-1/2 filter grayscale"
          style={{
            height: 0,
            width: 0,
            borderTop: `${size}px solid hsla(${hue},100%,50%,1)`,
            borderRight: `${size}px solid transparent`,
            borderLeft: `${size}px solid transparent`,
            marginLeft: `-${size / 2}px`,
            marginTop: `-${size / 2}px`,
            opacity: 0,
            transform: `rotate(${rotate}deg) translate3d(0,0,-1500px) scale(0)`,
            animation: `anim${idx} 10s infinite linear`,
            animationDelay: `${delaySec}s`,
          }}
        />
      ))}

      {/* Generate 200 @keyframes blocks—one per triangle */}
      <style>
        {triangles
          .map(
            ({ rotate, tx, ty }, idx) => `
          @keyframes anim${idx} {
            0% {
              opacity: 1;
              transform: rotate(${rotate * 1.5}deg) translate3d(${tx}px, ${ty}px, 1000px) scale(1);
            }
          }
        `
          )
          .join('\n')}
      </style>
    </div>
  );
};

export default Triangles;

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
