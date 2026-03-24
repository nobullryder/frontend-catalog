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
interactive-ripple-background.tsx
// Original animated background with ripple effect
// Creates interactive ripples that respond to user interaction

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export const RippleBackground = ({ children }: { children?: React.ReactNode }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      x,
      y,
      id: rippleIdRef.current++,
      timestamp: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
  };

  // Auto-generate ambient ripples
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      const newRipple: Ripple = {
        x,
        y,
        id: rippleIdRef.current++,
        timestamp: Date.now()
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden cursor-pointer"
      onClick={createRipple}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ripple" />
          <div
            className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-ripple"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-pink-400/10 animate-ripple"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Interactive Ripple Background
              </h2>
              <p className="text-gray-600">
                Click anywhere to create ripples
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }
        
        .animate-ripple {
          animation: ripple 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};


code.demo.1759611383741.tsx
import { RippleBackground } from "@/components/ui/interactive-ripple-background";

export default function DemoOne() {
  return <RippleBackground />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/interactive-ripple-background.tsx
// Original animated background with ripple effect
// Creates interactive ripples that respond to user interaction

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export const RippleBackground = ({ children }: { children?: React.ReactNode }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      x,
      y,
      id: rippleIdRef.current++,
      timestamp: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
  };

  // Auto-generate ambient ripples
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      const newRipple: Ripple = {
        x,
        y,
        id: rippleIdRef.current++,
        timestamp: Date.now()
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden cursor-pointer"
      onClick={createRipple}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ripple" />
          <div
            className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-ripple"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-pink-400/10 animate-ripple"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Interactive Ripple Background
              </h2>
              <p className="text-gray-600">
                Click anywhere to create ripples
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }
        
        .animate-ripple {
          animation: ripple 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

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
