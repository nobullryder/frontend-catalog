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
animated-canvas.tsx
import React, { useEffect, useRef } from 'react';

// Easing functions
const ease = {
  quint: {
    in: (t, b, c, d) => {
      t /= d;
      return c * t * t * t * t * t + b;
    },
    out: (t, b, c, d) => {
      t = t / d - 1;
      return c * (t * t * t * t * t + 1) + b;
    }
  }
};

// Linear interpolation
const lerp = (a, b, t) => a + (b - a) * t;

const AnimatedCanvas = ({
  count = 40,
  lineColor = 'hsl(180, 70%, 50%)',
  heightMultiplier = 0.4,
  speed = 0.0001,
  lineWidth = 1,
  className = "",
  direction = 'left-to-right' // 'left-to-right' or 'right-to-left'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Line drawing function
    const line = (x1, y1, x2, y2, close = false) => {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      if (close) ctx.closePath();
    };

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      
      const c = 1 / count;
      const time_ = Date.now() * speed;
      
      for (let i = 0; i < count; i++) {
        const t_ = i * c;
        const time = (time_ + t_) % 1;
        const t = ease.quint.in(time, 0, 1, 1);
        const ty = ease.quint.out(t, 0, 1, 1);
        // Adjust x based on direction
        const x = direction === 'left-to-right' 
          ? lerp(canvas.width, 0, t)
          : lerp(0, canvas.width, t);
        const y = ty * canvas.height * heightMultiplier;
        line(x, y, x, canvas.height - y, false);
      }
      
      ctx.stroke();
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count, lineColor, heightMultiplier, speed, lineWidth, direction]);

  return <canvas ref={canvasRef} className={className} style={{ display: 'block' }} />;
};

export {AnimatedCanvas};

code.demo.1757519546916.tsx
import { AnimatedCanvas } from "@/components/ui/animated-canvas";

export default function DemoOne() {
  return (
    <div className="h-[400px] relative w-full flex items-center justify-center"> 
      <AnimatedCanvas 
        count={50} 
        lineColor={"#fff200"}
        heightMultiplier={0.4}
        speed={0.00002}
        lineWidth={2}
        className="h-80 w-full"
        direction={"right-to-left"}
      />
      <AnimatedCanvas 
        count={50} 
        lineColor={"#fff200"}
        heightMultiplier={0.4}
        speed={0.00002}
        lineWidth={2} 
        className="h-80 w-full"
      />
      <span className="pointer-events-none top-10 absolute z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap">
        Animated
      </span>
       <span className="pointer-events-none bottom-10 absolute z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap">
        Canvas
      </span>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-canvas.tsx
import React, { useEffect, useRef } from 'react';

// Easing functions
const ease = {
  quint: {
    in: (t, b, c, d) => {
      t /= d;
      return c * t * t * t * t * t + b;
    },
    out: (t, b, c, d) => {
      t = t / d - 1;
      return c * (t * t * t * t * t + 1) + b;
    }
  }
};

// Linear interpolation
const lerp = (a, b, t) => a + (b - a) * t;

const AnimatedCanvas = ({
  count = 40,
  lineColor = 'hsl(180, 70%, 50%)',
  heightMultiplier = 0.4,
  speed = 0.0001,
  lineWidth = 1,
  className = "",
  direction = 'left-to-right' // 'left-to-right' or 'right-to-left'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Line drawing function
    const line = (x1, y1, x2, y2, close = false) => {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      if (close) ctx.closePath();
    };

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      
      const c = 1 / count;
      const time_ = Date.now() * speed;
      
      for (let i = 0; i < count; i++) {
        const t_ = i * c;
        const time = (time_ + t_) % 1;
        const t = ease.quint.in(time, 0, 1, 1);
        const ty = ease.quint.out(t, 0, 1, 1);
        // Adjust x based on direction
        const x = direction === 'left-to-right' 
          ? lerp(canvas.width, 0, t)
          : lerp(0, canvas.width, t);
        const y = ty * canvas.height * heightMultiplier;
        line(x, y, x, canvas.height - y, false);
      }
      
      ctx.stroke();
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count, lineColor, heightMultiplier, speed, lineWidth, direction]);

  return <canvas ref={canvasRef} className={className} style={{ display: 'block' }} />;
};

export {AnimatedCanvas};
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
