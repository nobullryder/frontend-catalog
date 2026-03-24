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
liquid-glass.tsx
"use client";

import { CSSProperties, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type LiquidGlassProps = {
    width?: number;
    height?: number;
    borderRadius?: number;
    tintOpacity?: number;
    blur?: number;
};

export const LiquidGlass = (props: LiquidGlassProps) => {
    const { width = 120, height = 120, borderRadius = 12, tintOpacity = 0.1, blur = 2 } = props;

    const glassRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const glass = glassRef.current;
        const parent = glass?.parentElement;

        if (!glass || !parent) return;

        const mouseMove = (e: MouseEvent) => {
            if (!glassRef.current || !glassRef.current?.parentElement) return;

            const parentRect = parent.getBoundingClientRect();

            const posX = e.clientX - parentRect.left - width / 2;
            const posY = e.clientY - parentRect.top - height / 2;

            gsap.to(glassRef.current, {
                duration: 0.6,
                left: posX,
                top: posY,
                ease: "power2.out",
            });
        };

        if (!glassRef.current) return;

        if (parent) {
            window.addEventListener("mousemove", mouseMove);
        }

        return () => {
            window?.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" className="absolute overflow-hidden">
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.008 0.008"
                            numOctaves="2"
                            seed="92"
                            result="noise"></feTurbulence>
                        <feGaussianBlur in="noise" stdDeviation="2" result="blurred"></feGaussianBlur>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="blurred"
                            scale="80"
                            xChannelSelector="R"
                            yChannelSelector="G"></feDisplacementMap>
                    </filter>
                </defs>
            </svg>
            <div
                ref={glassRef}
                className={cn(
                    "absolute isolate z-999 rounded-(--lg-border-radius) shadow-lg",
                    [
                        "before:absolute before:inset-0 before:z-0 before:rounded-(--lg-border-radius) before:bg-[rgba(255,255,255,var(--lg-tint-opacity))] before:shadow-[inset_0_0_20px_-5px_rgba(255,255,255,0.7)] before:content-['']",
                    ],
                    [
                        "after:absolute after:inset-0 after:isolate after:-z-1 after:rounded-(--lg-border-radius) after:[filter:url(#glass-distortion)] after:backdrop-blur-[var(--lg-blur)] after:content-['']",
                    ],
                )}
                style={
                    {
                        "--lg-border-radius": `${borderRadius}px`,
                        "--lg-tint-opacity": tintOpacity,
                        "--lg-blur": `${blur}px`,
                        width: width,
                        height: height,
                    } as CSSProperties
                }></div>
        </>
    );
};


code.demo.1750437048272.tsx
import { LiquidGlass } from "@/components/ui/liquid-glass";

export const Demo = () => {
    return (
        <div className="relative cursor-none overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1000"
                alt="Background"
                className="aspect-square max-w-144 rounded-md object-cover"
            />
            <LiquidGlass borderRadius={60} blur={1} />
        </div>
    );
};


export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/liquid-glass.tsx
"use client";

import { CSSProperties, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type LiquidGlassProps = {
    width?: number;
    height?: number;
    borderRadius?: number;
    tintOpacity?: number;
    blur?: number;
};

export const LiquidGlass = (props: LiquidGlassProps) => {
    const { width = 120, height = 120, borderRadius = 12, tintOpacity = 0.1, blur = 2 } = props;

    const glassRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const glass = glassRef.current;
        const parent = glass?.parentElement;

        if (!glass || !parent) return;

        const mouseMove = (e: MouseEvent) => {
            if (!glassRef.current || !glassRef.current?.parentElement) return;

            const parentRect = parent.getBoundingClientRect();

            const posX = e.clientX - parentRect.left - width / 2;
            const posY = e.clientY - parentRect.top - height / 2;

            gsap.to(glassRef.current, {
                duration: 0.6,
                left: posX,
                top: posY,
                ease: "power2.out",
            });
        };

        if (!glassRef.current) return;

        if (parent) {
            window.addEventListener("mousemove", mouseMove);
        }

        return () => {
            window?.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" className="absolute overflow-hidden">
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.008 0.008"
                            numOctaves="2"
                            seed="92"
                            result="noise"></feTurbulence>
                        <feGaussianBlur in="noise" stdDeviation="2" result="blurred"></feGaussianBlur>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="blurred"
                            scale="80"
                            xChannelSelector="R"
                            yChannelSelector="G"></feDisplacementMap>
                    </filter>
                </defs>
            </svg>
            <div
                ref={glassRef}
                className={cn(
                    "absolute isolate z-999 rounded-(--lg-border-radius) shadow-lg",
                    [
                        "before:absolute before:inset-0 before:z-0 before:rounded-(--lg-border-radius) before:bg-[rgba(255,255,255,var(--lg-tint-opacity))] before:shadow-[inset_0_0_20px_-5px_rgba(255,255,255,0.7)] before:content-['']",
                    ],
                    [
                        "after:absolute after:inset-0 after:isolate after:-z-1 after:rounded-(--lg-border-radius) after:[filter:url(#glass-distortion)] after:backdrop-blur-[var(--lg-blur)] after:content-['']",
                    ],
                )}
                style={
                    {
                        "--lg-border-radius": `${borderRadius}px`,
                        "--lg-tint-opacity": tintOpacity,
                        "--lg-blur": `${blur}px`,
                        width: width,
                        height: height,
                    } as CSSProperties
                }></div>
        </>
    );
};

```

Install NPM dependencies:
```bash
@gsap/react, gsap
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
