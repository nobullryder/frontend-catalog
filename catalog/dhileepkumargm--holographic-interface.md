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
holographic-interface.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

// Reusable BentoItem component with 3D tilt and spotlight effects
const BentoItem = ({ className, children }) => {
    const itemRef = useRef(null);

    useEffect(() => {
        const item = itemRef.current;
        if (!item) return;

        const handleMouseMove = (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            // Spotlight effect
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);

            // 3D Tilt effect
            const rotateX = (y - height / 2) / 20; // Adjust divisor for sensitivity
            const rotateY = -(x - width / 2) / 20;
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        };

        const handleMouseLeave = () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        };

        item.addEventListener('mousemove', handleMouseMove);
        item.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            item.removeEventListener('mousemove', handleMouseMove);
            item.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={itemRef} className={`bento-item ${className}`}>
            {children}
        </div>
    );
};

export default BentoItem;


code.demo.1758732292492.tsx
import { FiGlobe, FiLock } from 'react-icons/fi';
import BentoItem from "@/components/ui/holographic-interface";
import React, { useEffect, useRef } from 'react';

export default function DemoOne() {
    return (
            <div className="main-container">
                <div className="aurora-bg"></div>
                <div className="w-full max-w-6xl z-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-8">Holographic Interface</h1>
                    <div className="bento-grid">
                        
                        <BentoItem className="col-span-2 row-span-2 flex flex-col justify-between">
                            <svg className="animated-border"><rect width="100%" height="100%" rx="12"/></svg>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Quantum Analytics</h2>
                                <p className="mt-2 text-gray-400">Process complex data streams with our AI-powered visualization engine, providing predictive insights in real-time.</p>
                            </div>
                            <div className="mt-4 h-48 bg-black/20 border border-white/10 rounded-lg flex items-center justify-center text-gray-500">
                                [Live Data Feed Placeholder]
                            </div>
                        </BentoItem>

                        <BentoItem className="flex flex-col items-start justify-between">
                             <svg className="animated-border"><rect width="100%" height="100%" rx="12"/></svg>
                             <div>
                                <FiGlobe />
                                <h2 className="text-xl font-bold text-white mt-4">Orbital CDN</h2>
                                <p className="mt-2 text-gray-400 text-sm">Deploy content through a decentralized, global network for unparalleled speed and resilience.</p>
                             </div>
                        </BentoItem>

                        <BentoItem className="flex flex-col items-start justify-between">
                            <svg className="animated-border"><rect width="100%" height="100%" rx="12"/></svg>
                            <div>
                                <FiLock />
                                <h2 className="text-xl font-bold text-white mt-4">Biometric Auth</h2>
                                <p className="mt-2 text-gray-400 text-sm">Secure your system with next-generation biometric authentication protocols.</p>
                            </div>
                        </BentoItem>
                        
                        <BentoItem className="col-span-2 col-span-full-mobile">
                            <svg className="animated-border"><rect width="100%" height="100%" rx="12"/></svg>
                            <h2 className="text-xl font-bold text-white">Neural Functions</h2>
                            <p className="mt-2 text-gray-400 text-sm">Execute complex backend logic on our adaptive neural network. Scale beyond serverless.</p>
                        </BentoItem>
                    </div>
                </div>
            </div>
    );
};

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/holographic-interface.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

// Reusable BentoItem component with 3D tilt and spotlight effects
const BentoItem = ({ className, children }) => {
    const itemRef = useRef(null);

    useEffect(() => {
        const item = itemRef.current;
        if (!item) return;

        const handleMouseMove = (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            // Spotlight effect
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);

            // 3D Tilt effect
            const rotateX = (y - height / 2) / 20; // Adjust divisor for sensitivity
            const rotateY = -(x - width / 2) / 20;
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        };

        const handleMouseLeave = () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        };

        item.addEventListener('mousemove', handleMouseMove);
        item.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            item.removeEventListener('mousemove', handleMouseMove);
            item.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={itemRef} className={`bento-item ${className}`}>
            {children}
        </div>
    );
};

export default BentoItem;

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
