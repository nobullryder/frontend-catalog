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
living-origami-bg.tsx
import React from 'react';

// This is a self-contained React component that creates a "Living Origami" effect.
// An evolution of procedural animation, this simulates a flock of glowing origami
// birds flying across the screen. The effect is achieved with CSS 3D transforms
// and a procedurally generated set of layered animations.

export const Component = () => {
    // Generate a random number within a range
    const random = (min, max) => Math.random() * (max - min) + min;

    return (
            <main className="hero-section w-full h-screen">
                {/* Procedurally generate multiple drifters */}
                {[...Array(15)].map((_, i) => {
                    const duration = random(20, 40);
                    const delay = random(-40, 0);
                    const scale = random(0.2, 0.8);
                    
                    return (
                        <div key={i} className="drifter-container" style={{
                            '--y-start': `${random(-30, 30)}vh`,
                            '--y-end': `${random(-30, 30)}vh`,
                            '--r-start': `${random(-30, 30)}deg`,
                            '--r-end': `${random(-30, 30)}deg`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}>
                            <div className="origami-crane" style={{
                                transform: `scale(${scale})`,
                                animationDelay: `${random(-4, 0)}s`,
                            }}>
                                <div className="crane-part body"></div>
                                <div className="crane-part wing-left"></div>
                                <div className="crane-part wing-right"></div>
                                <div className="crane-part tail"></div>
                            </div>
                        </div>
                    );
                })}

                {/* The content container is empty */}
                <div className="relative z-10 text-center p-8 max-w-2xl">
                </div>
            </main>
    );
}


code.demo.1758730669680.tsx
import { Component } from "@/components/ui/living-origami-bg";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/living-origami-bg.tsx
import React from 'react';

// This is a self-contained React component that creates a "Living Origami" effect.
// An evolution of procedural animation, this simulates a flock of glowing origami
// birds flying across the screen. The effect is achieved with CSS 3D transforms
// and a procedurally generated set of layered animations.

export const Component = () => {
    // Generate a random number within a range
    const random = (min, max) => Math.random() * (max - min) + min;

    return (
            <main className="hero-section w-full h-screen">
                {/* Procedurally generate multiple drifters */}
                {[...Array(15)].map((_, i) => {
                    const duration = random(20, 40);
                    const delay = random(-40, 0);
                    const scale = random(0.2, 0.8);
                    
                    return (
                        <div key={i} className="drifter-container" style={{
                            '--y-start': `${random(-30, 30)}vh`,
                            '--y-end': `${random(-30, 30)}vh`,
                            '--r-start': `${random(-30, 30)}deg`,
                            '--r-end': `${random(-30, 30)}deg`,
                            animationDuration: `${duration}s`,
                            animationDelay: `${delay}s`,
                        }}>
                            <div className="origami-crane" style={{
                                transform: `scale(${scale})`,
                                animationDelay: `${random(-4, 0)}s`,
                            }}>
                                <div className="crane-part body"></div>
                                <div className="crane-part wing-left"></div>
                                <div className="crane-part wing-right"></div>
                                <div className="crane-part tail"></div>
                            </div>
                        </div>
                    );
                })}

                {/* The content container is empty */}
                <div className="relative z-10 text-center p-8 max-w-2xl">
                </div>
            </main>
    );
}

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
