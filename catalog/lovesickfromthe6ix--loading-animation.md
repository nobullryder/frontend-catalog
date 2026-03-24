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
loading-animation.tsx
import React, { useEffect, useRef } from 'react';

const RadialPulseLoader = ({ 
  size = 150, 
  color = '#667eea',
  text = 'Loading...',
  showText = true 
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
      
      const numRays = 8;
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const pulse = Math.sin(time * 0.03 + i * 0.5) * (size * 0.2) + (size * 0.25);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const x = centerX + Math.cos(angle) * pulse;
        const y = centerY + Math.sin(angle) * pulse;
        ctx.lineTo(x, y);
        
        const opacity = 0.3 + Math.sin(time * 0.03 + i * 0.5) * 0.7;
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      
      // Center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
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
  }, [size, color]);

  return (
    <div className="radial-pulse-loader">
      <canvas ref={canvasRef}></canvas>
      {showText && <div className="loader-text">{text}</div>}
    </div>
  );
};

export default RadialPulseLoader;

code.demo.1756393684482.tsx
import React, { useState } from 'react';
import RadialPulseLoader from "@/components/ui/loading-animation";

export default function DemoOne() {
  const [loading, setLoading] = useState({
    radial: false,
    orbital: false,
    pendulum: false,
    pulse: false,
    concentric: false,
    sequential: false
  });

  const simulateLoading = (loaderType) => {
    setLoading(prev => ({ ...prev, [loaderType]: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [loaderType]: false }));
    }, 3000);
  };
  return (
    <div className="loader-card">
      <div className="loader-container">
        <RadialPulseLoader text="Loading content..." />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loading-animation.tsx
import React, { useEffect, useRef } from 'react';

const RadialPulseLoader = ({ 
  size = 150, 
  color = '#667eea',
  text = 'Loading...',
  showText = true 
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
      
      const numRays = 8;
      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const pulse = Math.sin(time * 0.03 + i * 0.5) * (size * 0.2) + (size * 0.25);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const x = centerX + Math.cos(angle) * pulse;
        const y = centerY + Math.sin(angle) * pulse;
        ctx.lineTo(x, y);
        
        const opacity = 0.3 + Math.sin(time * 0.03 + i * 0.5) * 0.7;
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      
      // Center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
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
  }, [size, color]);

  return (
    <div className="radial-pulse-loader">
      <canvas ref={canvasRef}></canvas>
      {showText && <div className="loader-text">{text}</div>}
    </div>
  );
};

export default RadialPulseLoader;
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
