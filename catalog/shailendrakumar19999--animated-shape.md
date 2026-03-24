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
animated-shape.tsx
'use client';

import { useEffect, useRef } from 'react';
import { animate, svg, utils } from 'animejs';

interface ShadowProps {
  className?: string;
}

export function Shadow({ className }: ShadowProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPolygonElement>(null);
  const path2Ref = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    if (!svgRef.current || !path1Ref.current || !path2Ref.current) return;

    const $path1 = path1Ref.current;
    const $path2 = path2Ref.current;

    function animateRandomPoints() {
      // Update the points attribute on #path-2
      const newPoints = generatePoints();
      $path2.setAttribute('points', newPoints);
      
      // Morph the points of #path-1 into #path-2
      animate($path1, {
        points: svg.morphTo($path2),
        ease: 'inOutCirc',
        duration: 500,
        onComplete: animateRandomPoints,
      });
    }

    // Start the animation
    animateRandomPoints();

    // Cleanup function
    return () => {
      // Stop any ongoing animations
      if (svgRef.current) {
        animate.remove(svgRef.current);
      }
    };
  }, []);

  // A function to generate random points on #path-2 on each iteration
  function generatePoints(): string {
    const total = utils.random(4, 64);
    const r1 = utils.random(4, 56);
    const r2 = 56;
    const isOdd = (n: number): boolean => n % 2 === 1;
    let points = '';
    
    for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
      const r = isOdd(i) ? r1 : r2;
      const a = (2 * Math.PI * i) / l - Math.PI / 2;
      const x = 152 + utils.round(r * Math.cos(a), 0);
      const y = 56 + utils.round(r * Math.sin(a), 0);
      points += `${x},${y} `;
    }
    return points;
  }

  return (
    <svg ref={svgRef} viewBox="0 0 304 112" className={className}>
      <g
        strokeWidth="2"
        stroke="currentColor"
        strokeLinejoin="round"
        fill="none"
        fillRule="evenodd"
      >
        <polygon
          ref={path1Ref}
          id="path-1"
          points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
        />
        <polygon
          ref={path2Ref}
          style={{ opacity: 0 }}
          id="path-2"
          points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
        />
      </g>
    </svg>
  );
}


code.demo.1755943078348.tsx
import { Shadow } from "@/components/ui/animated-shape";

export default function DemoOne() {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Animated Shadow Demo
        </h1>
        <Shadow className="w-80 h-28" />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-shape.tsx
'use client';

import { useEffect, useRef } from 'react';
import { animate, svg, utils } from 'animejs';

interface ShadowProps {
  className?: string;
}

export function Shadow({ className }: ShadowProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPolygonElement>(null);
  const path2Ref = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    if (!svgRef.current || !path1Ref.current || !path2Ref.current) return;

    const $path1 = path1Ref.current;
    const $path2 = path2Ref.current;

    function animateRandomPoints() {
      // Update the points attribute on #path-2
      const newPoints = generatePoints();
      $path2.setAttribute('points', newPoints);
      
      // Morph the points of #path-1 into #path-2
      animate($path1, {
        points: svg.morphTo($path2),
        ease: 'inOutCirc',
        duration: 500,
        onComplete: animateRandomPoints,
      });
    }

    // Start the animation
    animateRandomPoints();

    // Cleanup function
    return () => {
      // Stop any ongoing animations
      if (svgRef.current) {
        animate.remove(svgRef.current);
      }
    };
  }, []);

  // A function to generate random points on #path-2 on each iteration
  function generatePoints(): string {
    const total = utils.random(4, 64);
    const r1 = utils.random(4, 56);
    const r2 = 56;
    const isOdd = (n: number): boolean => n % 2 === 1;
    let points = '';
    
    for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
      const r = isOdd(i) ? r1 : r2;
      const a = (2 * Math.PI * i) / l - Math.PI / 2;
      const x = 152 + utils.round(r * Math.cos(a), 0);
      const y = 56 + utils.round(r * Math.sin(a), 0);
      points += `${x},${y} `;
    }
    return points;
  }

  return (
    <svg ref={svgRef} viewBox="0 0 304 112" className={className}>
      <g
        strokeWidth="2"
        stroke="currentColor"
        strokeLinejoin="round"
        fill="none"
        fillRule="evenodd"
      >
        <polygon
          ref={path1Ref}
          id="path-1"
          points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
        />
        <polygon
          ref={path2Ref}
          style={{ opacity: 0 }}
          id="path-2"
          points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
        />
      </g>
    </svg>
  );
}

```

Install NPM dependencies:
```bash
animejs
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
