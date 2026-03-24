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
particle-animation-1.tsx
import React, { useEffect, useState } from 'react';

const ParticleAnimation = ({
  gridSize = 500,
  containerSize = '40vmin',
  particleCount = 500,
  colors = ['#00b8a9', '#f8f3d4', '#f6416c', '#ffde7d'],
  animationDuration = [1, 2],
  perspective = '10vmin',
  particleWidth = '40%',
  particleHeight = '1px'
}) => {
  const [particles, setParticles] = useState([]);

  // Generate random value between min and max
  const random = (min, max) => Math.random() * (max - min) + min;

  // Generate random color from the colors array
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // Generate random rotation
  const randomRotation = () => random(-180, 180);

  // Create particles data
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      duration: random(animationDuration[0], animationDuration[1]),
      delay: -random(0.1, 2),
      rotateX: randomRotation(),
      rotateY: randomRotation(),
      rotateZ: randomRotation(),
      gradientStops: Math.floor(random(2, 5)),
      color: randomColor(),
      transparentStop: random(50, 100)
    }));
    setParticles(newParticles);
  }, [particleCount, animationDuration, colors]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      style={{
        perspective: perspective
      }}
    >
      <div 
        className="relative grid place-items-center"
        style={{
          width: containerSize,
          height: containerSize,
          gridTemplateColumns: '1fr'
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              width: particleWidth,
              height: particleHeight,
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
              background: `linear-gradient(to left, ${particle.color}, transparent ${particle.transparentStop}%)`,
              animation: `move-${particle.id} ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              transformOrigin: '0 center',
              '--rotateX': `${particle.rotateX}deg`,
              '--rotateY': `${particle.rotateY}deg`,
              '--rotateZ': `${particle.rotateZ}deg`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        ${particles.map(particle => `
          @keyframes move-${particle.id} {
            0% {
              transform: translateX(50%) rotateX(${particle.rotateX}deg) rotateY(${particle.rotateY}deg) rotateZ(${particle.rotateZ}deg) scale(2);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              transform: translateX(50%) rotateX(${particle.rotateX}deg) rotateY(${particle.rotateY}deg) rotateZ(${particle.rotateZ}deg) scale(0);
              opacity: 1;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};
 

export { ParticleAnimation }

code.demo.1757135784365.tsx
import { ParticleAnimation } from "@/components/ui/particle-animation-1";

export default function DemoOne() {
   return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full overflow-hidden">
        <ParticleAnimation 
          particleCount={500}
          colors={['#fff200', '#a855f7', '#f43f5e', '#22c55e']}
          animationDuration={[1, 5]}
          containerSize="100vmin" 
        />
      </div>
        <span className="absolute pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Time Travell
      </span>
    </div>
  );
};
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/particle-animation-1.tsx
import React, { useEffect, useState } from 'react';

const ParticleAnimation = ({
  gridSize = 500,
  containerSize = '40vmin',
  particleCount = 500,
  colors = ['#00b8a9', '#f8f3d4', '#f6416c', '#ffde7d'],
  animationDuration = [1, 2],
  perspective = '10vmin',
  particleWidth = '40%',
  particleHeight = '1px'
}) => {
  const [particles, setParticles] = useState([]);

  // Generate random value between min and max
  const random = (min, max) => Math.random() * (max - min) + min;

  // Generate random color from the colors array
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // Generate random rotation
  const randomRotation = () => random(-180, 180);

  // Create particles data
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      duration: random(animationDuration[0], animationDuration[1]),
      delay: -random(0.1, 2),
      rotateX: randomRotation(),
      rotateY: randomRotation(),
      rotateZ: randomRotation(),
      gradientStops: Math.floor(random(2, 5)),
      color: randomColor(),
      transparentStop: random(50, 100)
    }));
    setParticles(newParticles);
  }, [particleCount, animationDuration, colors]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      style={{
        perspective: perspective
      }}
    >
      <div 
        className="relative grid place-items-center"
        style={{
          width: containerSize,
          height: containerSize,
          gridTemplateColumns: '1fr'
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              width: particleWidth,
              height: particleHeight,
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d',
              background: `linear-gradient(to left, ${particle.color}, transparent ${particle.transparentStop}%)`,
              animation: `move-${particle.id} ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              transformOrigin: '0 center',
              '--rotateX': `${particle.rotateX}deg`,
              '--rotateY': `${particle.rotateY}deg`,
              '--rotateZ': `${particle.rotateZ}deg`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        ${particles.map(particle => `
          @keyframes move-${particle.id} {
            0% {
              transform: translateX(50%) rotateX(${particle.rotateX}deg) rotateY(${particle.rotateY}deg) rotateZ(${particle.rotateZ}deg) scale(2);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              transform: translateX(50%) rotateX(${particle.rotateX}deg) rotateY(${particle.rotateY}deg) rotateZ(${particle.rotateZ}deg) scale(0);
              opacity: 1;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};
 

export { ParticleAnimation }
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
