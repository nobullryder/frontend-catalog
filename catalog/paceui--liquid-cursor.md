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
liquid-cursor.tsx
"use client";

import { ComponentProps, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type LiquidCursorProps = Omit<ComponentProps<"div">, "children"> & {
    size?: number;
    strong?: boolean;
};

export const LiquidCursor = ({ size = 40, strong = false, className, ...props }: LiquidCursorProps) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const prevPos = useRef({ x: 0, y: 0 });
    const prevAngle = useRef(0);

    useGSAP(() => {
        const clickDrop = () => {
            if (!cursorRef.current) return;

            gsap.to(cursorRef.current, {
                scale: 1.3,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(cursorRef.current, {
                        scale: 1,
                        duration: 0.4,
                        ease: "bounce.out",
                    });
                },
            });
        };
        const moveDrop = (e: MouseEvent) => {
            if (!cursorRef.current) return;

            const dx = e.clientX - prevPos.current.x;
            const dy = e.clientY - prevPos.current.y;

            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            let delta = angle - prevAngle.current;
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;

            const smoothingFactor = 0.2;
            const smoothAngle = prevAngle.current + delta * smoothingFactor;

            const maxStretch = 1.2;
            const stretch = Math.min(distance / 30, maxStretch);

            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);
            const total = absDx + absDy || 1;
            const xRatio = absDx / total;

            const scaleX = 1 + xRatio * stretch;
            const scaleY = 1 - xRatio * stretch * 0.3;

            gsap.to(cursorRef.current, {
                duration: 1,
                left: e.clientX - size / 2,
                top: e.clientY - size / 2,
                scaleX,
                scaleY,
                rotate: smoothAngle,
                ease: "power2.out",
            });

            prevAngle.current = smoothAngle;
            prevPos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("click", clickDrop);

        window.addEventListener("mousemove", moveDrop);
        return () => window.removeEventListener("mousemove", moveDrop);
    }, []);

    const lightStyle = {
        background: `
  radial-gradient(circle, 
    rgba(255, 255, 255, 0.25) 90%,  
    rgba(255, 255, 255, 0.1) 70%, 
    transparent 20%                
  )
`,
        border: "1px solid rgba(255, 255, 255, 0.25)",
    };

    const strongStyle = {
        background: `
    radial-gradient(125.95% 106.37% at 32.61% 3.41%,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.45) 28.13%,
    rgba(252, 252, 252, 0.35) 45.31%,
    rgba(248, 248, 248, 0.3) 66.67%,
    rgba(243, 243, 243, 0.25) 100%)
  `,
        boxShadow: `
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset -4px -8px 12px rgba(255, 255, 255, 0.05),
    inset 3px 3px 8px rgba(240, 240, 240, 0.04),
    inset 5px 10px 14px rgba(255, 255, 255, 0.03)
  `,
        border: "1px solid rgba(255, 255, 255, 0.2)",
    };

    return (
        <div
            {...props}
            ref={cursorRef}
            className={cn(
                "pointer-events-none fixed z-999 rounded-full saturate-[180%] backdrop-blur-[2px]",
                "dark:saturate-[160%] dark:backdrop-brightness-[0.8]",
                className,
            )}
            style={{
                height: size,
                width: size,
                ...(strong ? strongStyle : lightStyle),
            }}
        />
    );
};


code.demo.1750436925541.tsx
import { LiquidCursor } from "@/components/ui/liquid-cursor";

export const Demo = () => {
    return (
        <div className="cursor-none">
            <img
                src="https://images.unsplash.com/photo-1642510676258-397a4d69473a?w=1000"
                alt="Image"
                className="max-w-160 rounded"
            />
            <LiquidCursor size={44} />
        </div>
    );
};


export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/liquid-cursor.tsx
"use client";

import { ComponentProps, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type LiquidCursorProps = Omit<ComponentProps<"div">, "children"> & {
    size?: number;
    strong?: boolean;
};

export const LiquidCursor = ({ size = 40, strong = false, className, ...props }: LiquidCursorProps) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const prevPos = useRef({ x: 0, y: 0 });
    const prevAngle = useRef(0);

    useGSAP(() => {
        const clickDrop = () => {
            if (!cursorRef.current) return;

            gsap.to(cursorRef.current, {
                scale: 1.3,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(cursorRef.current, {
                        scale: 1,
                        duration: 0.4,
                        ease: "bounce.out",
                    });
                },
            });
        };
        const moveDrop = (e: MouseEvent) => {
            if (!cursorRef.current) return;

            const dx = e.clientX - prevPos.current.x;
            const dy = e.clientY - prevPos.current.y;

            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            let delta = angle - prevAngle.current;
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;

            const smoothingFactor = 0.2;
            const smoothAngle = prevAngle.current + delta * smoothingFactor;

            const maxStretch = 1.2;
            const stretch = Math.min(distance / 30, maxStretch);

            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);
            const total = absDx + absDy || 1;
            const xRatio = absDx / total;

            const scaleX = 1 + xRatio * stretch;
            const scaleY = 1 - xRatio * stretch * 0.3;

            gsap.to(cursorRef.current, {
                duration: 1,
                left: e.clientX - size / 2,
                top: e.clientY - size / 2,
                scaleX,
                scaleY,
                rotate: smoothAngle,
                ease: "power2.out",
            });

            prevAngle.current = smoothAngle;
            prevPos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("click", clickDrop);

        window.addEventListener("mousemove", moveDrop);
        return () => window.removeEventListener("mousemove", moveDrop);
    }, []);

    const lightStyle = {
        background: `
  radial-gradient(circle, 
    rgba(255, 255, 255, 0.25) 90%,  
    rgba(255, 255, 255, 0.1) 70%, 
    transparent 20%                
  )
`,
        border: "1px solid rgba(255, 255, 255, 0.25)",
    };

    const strongStyle = {
        background: `
    radial-gradient(125.95% 106.37% at 32.61% 3.41%,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.45) 28.13%,
    rgba(252, 252, 252, 0.35) 45.31%,
    rgba(248, 248, 248, 0.3) 66.67%,
    rgba(243, 243, 243, 0.25) 100%)
  `,
        boxShadow: `
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset -4px -8px 12px rgba(255, 255, 255, 0.05),
    inset 3px 3px 8px rgba(240, 240, 240, 0.04),
    inset 5px 10px 14px rgba(255, 255, 255, 0.03)
  `,
        border: "1px solid rgba(255, 255, 255, 0.2)",
    };

    return (
        <div
            {...props}
            ref={cursorRef}
            className={cn(
                "pointer-events-none fixed z-999 rounded-full saturate-[180%] backdrop-blur-[2px]",
                "dark:saturate-[160%] dark:backdrop-brightness-[0.8]",
                className,
            )}
            style={{
                height: size,
                width: size,
                ...(strong ? strongStyle : lightStyle),
            }}
        />
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
