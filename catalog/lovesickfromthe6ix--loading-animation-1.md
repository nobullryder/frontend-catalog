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
loading-animation-1.tsx
import React, { useEffect, useRef } from 'react';

const ConcentricRingsLoader = ({ 
  size = 120,
  color = '#eb3b5a',
  text = 'Loading...',
  showText = true,
  rings = 4
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < rings; i++) {
        const baseRadius = (size * 0.1) + i * (size * 0.15);
        const pulse = Math.sin(time * 0.03 - i * 0.5) * (size * 0.05);
        const radius = Math.min(baseRadius + pulse, size / 2 - 2);
        const opacity = 0.2 + Math.sin(time * 0.03 - i * 0.5) * 0.3;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add dots on rings
        const numDots = 8;
        for (let j = 0; j < numDots; j++) {
          const angle = (j / numDots) * Math.PI * 2 + time * 0.02 * (i % 2 ? 1 : -1);
          const dotX = centerX + Math.cos(angle) * radius;
          const dotY = centerY + Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
      
      // Center pulse
      const centerPulse = Math.sin(time * 0.05) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 * centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, color, rings]);

  return (
    <div className="concentric-rings-loader">
      <canvas ref={canvasRef}></canvas>
      {showText && <div className="loader-text">{text}</div>}
    </div>
  );
};

export default ConcentricRingsLoader;

code.demo.1756395256527.tsx
import ConcentricRingsLoader from "@/components/ui/loading-animation-1";

export default function DemoOne() {
  return <ConcentricRingsLoader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loading-animation-1.tsx
import React, { useEffect, useRef } from 'react';

const ConcentricRingsLoader = ({ 
  size = 120,
  color = '#eb3b5a',
  text = 'Loading...',
  showText = true,
  rings = 4
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < rings; i++) {
        const baseRadius = (size * 0.1) + i * (size * 0.15);
        const pulse = Math.sin(time * 0.03 - i * 0.5) * (size * 0.05);
        const radius = Math.min(baseRadius + pulse, size / 2 - 2);
        const opacity = 0.2 + Math.sin(time * 0.03 - i * 0.5) * 0.3;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add dots on rings
        const numDots = 8;
        for (let j = 0; j < numDots; j++) {
          const angle = (j / numDots) * Math.PI * 2 + time * 0.02 * (i % 2 ? 1 : -1);
          const dotX = centerX + Math.cos(angle) * radius;
          const dotY = centerY + Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
      
      // Center pulse
      const centerPulse = Math.sin(time * 0.05) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 * centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, color, rings]);

  return (
    <div className="concentric-rings-loader">
      <canvas ref={canvasRef}></canvas>
      {showText && <div className="loader-text">{text}</div>}
    </div>
  );
};

export default ConcentricRingsLoader;
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
