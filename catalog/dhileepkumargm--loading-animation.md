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

export const KineticTypographyLoader = () => {
    const loaderTextRef = useRef(null);
    const words = ["LOADING", "ASSEMBLING", "FINALIZING"];
    let currentWordIndex = 0;

    useEffect(() => {
        const loaderText = loaderTextRef.current;
        if (!loaderText) return;

        let animationTimeout;
        let wordCycleTimeout;

        function animateWord() {
            const word = words[currentWordIndex];
            loaderText.innerHTML = ''; // Clear previous word

            const chars = word.split('').map((char, index) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                
                const fromX = (Math.random() - 0.5) * 800;
                const fromY = (Math.random() - 0.5) * 800;
                const fromZ = (Math.random() - 0.5) * 800;
                const fromRotX = (Math.random() - 0.5) * 360;
                const fromRotY = (Math.random() - 0.5) * 360;
                span.style.setProperty('--transform-from', `translate3d(${fromX}px, ${fromY}px, ${fromZ}px) rotateX(${fromRotX}deg) rotateY(${fromRotY}deg)`);
                
                span.style.animationName = 'fly-in';
                span.style.animationDelay = `${index * 0.05}s`;
                span.style.animationPlayState = 'running';
                
                loaderText.appendChild(span);
                return span;
            });

            animationTimeout = setTimeout(() => {
                chars.forEach((span, index) => {
                    const toX = (Math.random() - 0.5) * 800;
                    const toY = (Math.random() - 0.5) * 800;
                    const toZ = (Math.random() - 0.5) * 800;
                    const toRotX = (Math.random() - 0.5) * 360;
                    const toRotY = (Math.random() - 0.5) * 360;
                    span.style.setProperty('--transform-to', `translate3d(${toX}px, ${toY}px, ${toZ}px) rotateX(${toRotX}deg) rotateY(${toRotY}deg)`);

                    span.style.animationName = 'fly-out';
                    span.style.animationDelay = `${(chars.length - index) * 0.05}s`;
                });
            }, 2500);

            wordCycleTimeout = setTimeout(() => {
                currentWordIndex = (currentWordIndex + 1) % words.length;
                animateWord();
            }, 3500);
        }

        animateWord();

        // Cleanup function to clear timeouts when the component unmounts
        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(wordCycleTimeout);
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="loader-container">
            <h1 ref={loaderTextRef} className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white whitespace-nowrap">
            </h1>
        </div>
    );
};


code.demo.1756117926923.tsx
import { KineticTypographyLoader } from "@/components/ui/loading-animation";

export default function DemoOne() {
  return <KineticTypographyLoader />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/loading-animation.tsx
import React, { useEffect, useRef } from 'react';

export const KineticTypographyLoader = () => {
    const loaderTextRef = useRef(null);
    const words = ["LOADING", "ASSEMBLING", "FINALIZING"];
    let currentWordIndex = 0;

    useEffect(() => {
        const loaderText = loaderTextRef.current;
        if (!loaderText) return;

        let animationTimeout;
        let wordCycleTimeout;

        function animateWord() {
            const word = words[currentWordIndex];
            loaderText.innerHTML = ''; // Clear previous word

            const chars = word.split('').map((char, index) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                
                const fromX = (Math.random() - 0.5) * 800;
                const fromY = (Math.random() - 0.5) * 800;
                const fromZ = (Math.random() - 0.5) * 800;
                const fromRotX = (Math.random() - 0.5) * 360;
                const fromRotY = (Math.random() - 0.5) * 360;
                span.style.setProperty('--transform-from', `translate3d(${fromX}px, ${fromY}px, ${fromZ}px) rotateX(${fromRotX}deg) rotateY(${fromRotY}deg)`);
                
                span.style.animationName = 'fly-in';
                span.style.animationDelay = `${index * 0.05}s`;
                span.style.animationPlayState = 'running';
                
                loaderText.appendChild(span);
                return span;
            });

            animationTimeout = setTimeout(() => {
                chars.forEach((span, index) => {
                    const toX = (Math.random() - 0.5) * 800;
                    const toY = (Math.random() - 0.5) * 800;
                    const toZ = (Math.random() - 0.5) * 800;
                    const toRotX = (Math.random() - 0.5) * 360;
                    const toRotY = (Math.random() - 0.5) * 360;
                    span.style.setProperty('--transform-to', `translate3d(${toX}px, ${toY}px, ${toZ}px) rotateX(${toRotX}deg) rotateY(${toRotY}deg)`);

                    span.style.animationName = 'fly-out';
                    span.style.animationDelay = `${(chars.length - index) * 0.05}s`;
                });
            }, 2500);

            wordCycleTimeout = setTimeout(() => {
                currentWordIndex = (currentWordIndex + 1) % words.length;
                animateWord();
            }, 3500);
        }

        animateWord();

        // Cleanup function to clear timeouts when the component unmounts
        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(wordCycleTimeout);
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="loader-container">
            <h1 ref={loaderTextRef} className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white whitespace-nowrap">
            </h1>
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
