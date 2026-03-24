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
living-ferrofluid.tsx
import React from 'react';

export const Component = () => {

  return (
   <main className="hero-section w-full h-screen flex items-center justify-center">
                {/* This SVG filter is designed for a high-contrast, metallic look.
                    - feGaussianBlur blurs the shapes slightly to help them merge.
                    - feColorMatrix dramatically increases contrast, creating sharp, defined edges.
                    - feComposite merges the blurred, high-contrast shapes.
                    - feTurbulence and feDisplacementMap add the organic, spiky distortion.
                */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <filter id="ferrofluid">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -15" result="contrast" />
                        <feComposite in="SourceGraphic" in2="contrast" operator="atop"/>
                        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.08" numOctaves="3" result="noise" />
                        <feDisplacementMap in="contrast" in2="noise" scale="50" />
                    </filter>
                </svg>

                <div className="ferrofluid-canvas">
                    <div className="globule globule-1"></div>
                    <div className="globule globule-2"></div>
                    <div className="globule globule-3"></div>
                </div>

                {/* Content layered on top */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4" style={{textShadow: '0 0 15px rgba(0,0,0,0.5)'}}>
                        Forging the Future
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8" style={{textShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
                        Experience a new wave of digital artistry with dynamic, fluid animations that redefine interaction.
                    </p>
                    <a href="#" className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/20">
                        Discover Now
                    </a>
                </div>
            </main>
  );
};


code.demo.1758606610826.tsx
import { Component } from "@/components/ui/living-ferrofluid";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/living-ferrofluid.tsx
import React from 'react';

export const Component = () => {

  return (
   <main className="hero-section w-full h-screen flex items-center justify-center">
                {/* This SVG filter is designed for a high-contrast, metallic look.
                    - feGaussianBlur blurs the shapes slightly to help them merge.
                    - feColorMatrix dramatically increases contrast, creating sharp, defined edges.
                    - feComposite merges the blurred, high-contrast shapes.
                    - feTurbulence and feDisplacementMap add the organic, spiky distortion.
                */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <filter id="ferrofluid">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -15" result="contrast" />
                        <feComposite in="SourceGraphic" in2="contrast" operator="atop"/>
                        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.08" numOctaves="3" result="noise" />
                        <feDisplacementMap in="contrast" in2="noise" scale="50" />
                    </filter>
                </svg>

                <div className="ferrofluid-canvas">
                    <div className="globule globule-1"></div>
                    <div className="globule globule-2"></div>
                    <div className="globule globule-3"></div>
                </div>

                {/* Content layered on top */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4" style={{textShadow: '0 0 15px rgba(0,0,0,0.5)'}}>
                        Forging the Future
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8" style={{textShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
                        Experience a new wave of digital artistry with dynamic, fluid animations that redefine interaction.
                    </p>
                    <a href="#" className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/20">
                        Discover Now
                    </a>
                </div>
            </main>
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
