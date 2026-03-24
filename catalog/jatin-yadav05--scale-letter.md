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
scale-letter.tsx
'use client'
import React, { useState } from 'react';

export default function LetterHoverEffect() {
    const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
    const text = "Hover Me";

    const getThemeColors = () => {
        return {
            text: 'var(--th-text, #222)',
            textDark: 'var(--th-text-dark, #fff)',
            shadow: '0 2px 6px rgba(0,0,0,0.15)',
            shadowLight: '0 2px 6px rgba(0,0,0,0.08)',
            shadowDark: '0 2px 6px rgba(0,0,0,0.25)',
        };
    };

    const getLetterStyle = (index: number) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex >= 0 ? Math.abs(index - hoveredIndex) : 0;

        let scale = 1;
        let translateY = 0;
        let rotateX = 0;
        let brightness = 1;

        if (hoveredIndex >= 0) {
            if (isHovered) {
                scale = 1.4;
                translateY = -20;
                rotateX = -15;
                brightness = 1.3;
            } else if (distance === 1) {
                scale = 1.2;
                translateY = -10;
                rotateX = -8;
                brightness = 1.15;
            } else if (distance === 2) {
                scale = 1.1;
                translateY = -5;
                rotateX = -4;
                brightness = 1.08;
            }
        }

        // Use CSS variables for color and shadow, so theme can be controlled via Tailwind or global CSS
        return {
            transform: `
                perspective(1000px) 
                translateY(${translateY}px) 
                rotateX(${rotateX}deg) 
                scale(${scale})
                translateZ(${isHovered ? 30 : distance <= 2 ? 15 : 0}px)
            `,
            filter: `brightness(${brightness})`,
            textShadow: distance <= 2
                ? 'var(--th-shadow, 0 2px 6px rgba(0,0,0,0.15))'
                : 'var(--th-shadow-light, 0 1px 2px rgba(0,0,0,0.08))',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: isHovered ? 10 : distance <= 2 ? 5 : 1,
            color: 'var(--th-text, #222)',
            marginRight: '0.1em',
        };
    };
    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br dark:from-black/90 dark:to-black from-white/90 to-white transition-colors duration-500">
            <div className="text-6xl font-medium select-none text-black dark:text-white">
                <span className="inline-flex">
                    {text.split('').map((letter, index) => (
                        <span
                            key={index}
                            className="inline-block cursor-pointer relative"
                            style={getLetterStyle(index)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(-1)}
                        >
                            <span className="font-bold" style={{ color: 'var(--th-text, #222)' }}>
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        </span>
                    ))}
                </span>
            </div>
            {/* Inline style for demo; move to global CSS for production */}
           <style jsx global>{`
                :root {
                    --th-text: #000; /* Dark text for light theme */
                    --th-shadow: 0 2px 6px rgba(0,0,0,0.15);
                    --th-shadow-light: 0 1px 2px rgba(0,0,0,0.08);
                }
                html.dark {
                    --th-text: #fff; /* Light text for dark theme */
                    --th-shadow: 0 2px 6px rgba(0,0,0,0.25);
                    --th-shadow-light: 0 1px 2px rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
    );
}

code.demo.1751219152010.tsx
import Component from "@/components/ui/scale-letter";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scale-letter.tsx
'use client'
import React, { useState } from 'react';

export default function LetterHoverEffect() {
    const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
    const text = "Hover Me";

    const getThemeColors = () => {
        return {
            text: 'var(--th-text, #222)',
            textDark: 'var(--th-text-dark, #fff)',
            shadow: '0 2px 6px rgba(0,0,0,0.15)',
            shadowLight: '0 2px 6px rgba(0,0,0,0.08)',
            shadowDark: '0 2px 6px rgba(0,0,0,0.25)',
        };
    };

    const getLetterStyle = (index: number) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex >= 0 ? Math.abs(index - hoveredIndex) : 0;

        let scale = 1;
        let translateY = 0;
        let rotateX = 0;
        let brightness = 1;

        if (hoveredIndex >= 0) {
            if (isHovered) {
                scale = 1.4;
                translateY = -20;
                rotateX = -15;
                brightness = 1.3;
            } else if (distance === 1) {
                scale = 1.2;
                translateY = -10;
                rotateX = -8;
                brightness = 1.15;
            } else if (distance === 2) {
                scale = 1.1;
                translateY = -5;
                rotateX = -4;
                brightness = 1.08;
            }
        }

        // Use CSS variables for color and shadow, so theme can be controlled via Tailwind or global CSS
        return {
            transform: `
                perspective(1000px) 
                translateY(${translateY}px) 
                rotateX(${rotateX}deg) 
                scale(${scale})
                translateZ(${isHovered ? 30 : distance <= 2 ? 15 : 0}px)
            `,
            filter: `brightness(${brightness})`,
            textShadow: distance <= 2
                ? 'var(--th-shadow, 0 2px 6px rgba(0,0,0,0.15))'
                : 'var(--th-shadow-light, 0 1px 2px rgba(0,0,0,0.08))',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: isHovered ? 10 : distance <= 2 ? 5 : 1,
            color: 'var(--th-text, #222)',
            marginRight: '0.1em',
        };
    };
    return (
        <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br dark:from-black/90 dark:to-black from-white/90 to-white transition-colors duration-500">
            <div className="text-6xl font-medium select-none text-black dark:text-white">
                <span className="inline-flex">
                    {text.split('').map((letter, index) => (
                        <span
                            key={index}
                            className="inline-block cursor-pointer relative"
                            style={getLetterStyle(index)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(-1)}
                        >
                            <span className="font-bold" style={{ color: 'var(--th-text, #222)' }}>
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        </span>
                    ))}
                </span>
            </div>
            {/* Inline style for demo; move to global CSS for production */}
           <style jsx global>{`
                :root {
                    --th-text: #000; /* Dark text for light theme */
                    --th-shadow: 0 2px 6px rgba(0,0,0,0.15);
                    --th-shadow-light: 0 1px 2px rgba(0,0,0,0.08);
                }
                html.dark {
                    --th-text: #fff; /* Light text for dark theme */
                    --th-shadow: 0 2px 6px rgba(0,0,0,0.25);
                    --th-shadow-light: 0 1px 2px rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
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
