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
spiral-animation.tsx
import React, { useEffect, useRef } from 'react';

interface SpiralAnimationProps {
  totalDots?: number;
  size?: number;
  dotRadius?: number;
  margin?: number;
  duration?: number;
  dotColor?: string;
  backgroundColor?: string;
}

const SpiralAnimation: React.FC<SpiralAnimationProps> = ({
  totalDots = 600,
  size = 400,
  dotRadius = 2,
  margin = 2,
  duration = 3,
  dotColor = '#fff',
  backgroundColor = '#000'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // 2π/φ²
    const CENTER = size / 2;
    const MAX_RADIUS = CENTER - margin - dotRadius;
    const svgNS = "http://www.w3.org/2000/svg";

    // Clear any existing content
    svg.innerHTML = '';

    // Generate & animate dots
    for (let i = 0; i < totalDots; i++) {
      const idx = i + 0.5;
      const frac = idx / totalDots;
      const r = Math.sqrt(frac) * MAX_RADIUS;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      // Perfect SVG circle
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toString());
      c.setAttribute("cy", y.toString());
      c.setAttribute("r", dotRadius.toString());
      c.setAttribute("fill", dotColor);
      c.setAttribute("opacity", "0.6");
      svg.appendChild(c);

      // Radius pulse
      const animR = document.createElementNS(svgNS, "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute(
        "values",
        `${dotRadius * 0.5};${dotRadius * 1.5};${dotRadius * 0.5}`
      );
      animR.setAttribute("dur", `${duration}s`);
      animR.setAttribute("begin", `${frac * duration}s`);
      animR.setAttribute("repeatCount", "indefinite");
      animR.setAttribute("calcMode", "spline");
      animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      c.appendChild(animR);

      // Opacity pulse
      const animO = document.createElementNS(svgNS, "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("values", "0.3;1;0.3");
      animO.setAttribute("dur", `${duration}s`);
      animO.setAttribute("begin", `${frac * duration}s`);
      animO.setAttribute("repeatCount", "indefinite");
      animO.setAttribute("calcMode", "spline");
      animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      c.appendChild(animO);
    }
  }, [totalDots, size, dotRadius, margin, duration, dotColor]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <div style={{ width: size, height: size }}>
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        />
      </div>
    </div>
  );
};

export {SpiralAnimation}


code.demo.1748400058327.tsx
import { SpiralAnimation } from "@/components/ui/spiral-animation";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SpiralAnimation 
        totalDots={800} 
        dotColor="#fff" 
        backgroundColor="#000"
        duration={2}
      />
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/spiral-animation.tsx
import React, { useEffect, useRef } from 'react';

interface SpiralAnimationProps {
  totalDots?: number;
  size?: number;
  dotRadius?: number;
  margin?: number;
  duration?: number;
  dotColor?: string;
  backgroundColor?: string;
}

const SpiralAnimation: React.FC<SpiralAnimationProps> = ({
  totalDots = 600,
  size = 400,
  dotRadius = 2,
  margin = 2,
  duration = 3,
  dotColor = '#fff',
  backgroundColor = '#000'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // 2π/φ²
    const CENTER = size / 2;
    const MAX_RADIUS = CENTER - margin - dotRadius;
    const svgNS = "http://www.w3.org/2000/svg";

    // Clear any existing content
    svg.innerHTML = '';

    // Generate & animate dots
    for (let i = 0; i < totalDots; i++) {
      const idx = i + 0.5;
      const frac = idx / totalDots;
      const r = Math.sqrt(frac) * MAX_RADIUS;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      // Perfect SVG circle
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toString());
      c.setAttribute("cy", y.toString());
      c.setAttribute("r", dotRadius.toString());
      c.setAttribute("fill", dotColor);
      c.setAttribute("opacity", "0.6");
      svg.appendChild(c);

      // Radius pulse
      const animR = document.createElementNS(svgNS, "animate");
      animR.setAttribute("attributeName", "r");
      animR.setAttribute(
        "values",
        `${dotRadius * 0.5};${dotRadius * 1.5};${dotRadius * 0.5}`
      );
      animR.setAttribute("dur", `${duration}s`);
      animR.setAttribute("begin", `${frac * duration}s`);
      animR.setAttribute("repeatCount", "indefinite");
      animR.setAttribute("calcMode", "spline");
      animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      c.appendChild(animR);

      // Opacity pulse
      const animO = document.createElementNS(svgNS, "animate");
      animO.setAttribute("attributeName", "opacity");
      animO.setAttribute("values", "0.3;1;0.3");
      animO.setAttribute("dur", `${duration}s`);
      animO.setAttribute("begin", `${frac * duration}s`);
      animO.setAttribute("repeatCount", "indefinite");
      animO.setAttribute("calcMode", "spline");
      animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
      c.appendChild(animO);
    }
  }, [totalDots, size, dotRadius, margin, duration, dotColor]);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <div style={{ width: size, height: size }}>
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        />
      </div>
    </div>
  );
};

export {SpiralAnimation}

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
