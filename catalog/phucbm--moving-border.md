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
moving-border.tsx
"use client";
import * as React from 'react';
import {useRef} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {cn} from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export type MovingBorderProps = {
    /** The content to be displayed inside the border. */
    children: React.ReactNode;

    /** Additional CSS classes for the inner content container. */
    className?: string;

    /** Additional CSS classes for the outer wrapper container. */
    outerClassName?: string;

    /** Width of the border in pixels. @default 1 */
    borderWidth?: number;

    /** Width of the gradient effect in pixels. If not specified, defaults to borderWidth * 10. */
    gradientWidth?: number;

    /** Border radius in pixels. Ignored if isCircle is true. @default 15 */
    radius?: number;

    /** Duration of one complete animation cycle in seconds. @default 3 */
    duration?: number;

    /** Array of color values for the gradient. If multiple colors provided, they will be animated in sequence. @default ["#355bd2"] */
    colors?: string[];

    /** Whether to render as a perfect circle with circular path animation. @default false */
    isCircle?: boolean;
};

export function MovingBorder({
                                 children,
                                 className,
                                 outerClassName,
                                 borderWidth = 1,
                                 radius = 15,
                                 gradientWidth,
                                 duration = 3,
                                 colors = ["#355bd2"],
                                 isCircle = false
                             }: MovingBorderProps) {
    const scope = useRef(null);

    // Use a large radius for perfect circle
    const effectiveRadius = isCircle ? 9999 : radius;

    useGSAP(
        () => {
            const root = scope.current as HTMLElement | null;
            if (!root) return;

            const movingGradient = root.querySelector<HTMLElement>(".moving-gradient");
            if (!movingGradient) return;

            let pathTl: gsap.core.Timeline | null = null;
            let colorTl: gsap.core.Timeline | null = null;

            // Function to create/update the path animation
            const updateAnimation = () => {
                // Kill existing timeline if it exists
                if (pathTl) {
                    pathTl.kill();
                }

                // Get current dimensions
                const rect = root.getBoundingClientRect();
                const width = rect.width - borderWidth * 2;
                const height = rect.height - borderWidth * 2;

                let path: { x: number; y: number; }[];

                if (isCircle) {
                    // Create a circular path using 64 coordinate points
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const circleRadius = Math.min(width, height) / 2;
                    const numPoints = 64;

                    path = Array.from({length: numPoints}, (_, i) => {
                        const angle = (i / numPoints) * Math.PI * 2;
                        return {
                            x: centerX + circleRadius * Math.cos(angle),
                            y: centerY + circleRadius * Math.sin(angle)
                        };
                    });
                } else {
                    // Calculate the path points accounting for border radius (rounded rectangle)
                    path = [
                        {x: effectiveRadius, y: 0},
                        {x: width - effectiveRadius, y: 0},
                        {x: width, y: effectiveRadius},
                        {x: width, y: height - effectiveRadius},
                        {x: width - effectiveRadius, y: height},
                        {x: effectiveRadius, y: height},
                        {x: 0, y: height - effectiveRadius},
                        {x: 0, y: effectiveRadius},
                        {x: effectiveRadius, y: 0},
                    ];
                }

                // Create new timeline for path
                pathTl = gsap.timeline({
                    repeat: -1,
                    defaults: {ease: "none", duration: duration}
                });

                pathTl.to(movingGradient, {
                    motionPath: {
                        path: path,
                        fromCurrent: false,
                        curviness: isCircle ? 1 : 1.5,
                    }
                });
            };

            // Function to create color animation
            const setupColorAnimation = () => {
                if (colors.length <= 1) {
                    // Single color - just set it
                    root.style.setProperty('--color', colors[0]);
                    return;
                }

                // Set initial color
                root.style.setProperty('--color', colors[0]);

                // Multiple colors - animate through them
                colorTl = gsap.timeline({
                    repeat: -1,
                    defaults: {ease: "none", duration: duration / colors.length}
                });

                // Animate through all colors and back to first for seamless loop
                colors.forEach((_, index) => {
                    const nextColor = colors[(index + 1) % colors.length];
                    colorTl!.to(root, {'--color': nextColor});
                });
            };

            // Initial setup
            updateAnimation();
            setupColorAnimation();

            // Watch for size changes
            const resizeObserver = new ResizeObserver(() => {
                updateAnimation();
            });

            resizeObserver.observe(root);

            // Cleanup
            return () => {
                if (pathTl) {
                    pathTl.kill();
                }
                if (colorTl) {
                    colorTl.kill();
                }
                resizeObserver.disconnect();
            };
        },
        {scope, dependencies: [borderWidth, effectiveRadius, gradientWidth, duration, colors, isCircle]}
    );

    return (
        // wrapper
        <div ref={scope} className={cn(`wrapper relative overflow-hidden`, outerClassName)}
             style={{
                 ['--color' as any]: colors[0],
                 padding: `${borderWidth}px`,
                 borderRadius: `${effectiveRadius + borderWidth}px`,
             }}>

            {/* moving gradient*/}
            <div className="moving-gradient aspect-square absolute top-0 left-0" style={{width: `${borderWidth}px`}}>
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
                    style={{
                        width: `${gradientWidth || borderWidth * 10}px`,
                        background: `radial-gradient(circle, var(--color) 0%, transparent 70%)`
                    }}>
                </div>
            </div>

            {/*inner*/}
            <div className={cn(`inner relative z-30 bg-white`, className)}
                 style={{
                     borderRadius: `${effectiveRadius}px`,
                 }}>
                {children}
            </div>
        </div>
    );
}

code.demo.1762237382565.tsx
import { MovingBorder } from "@/components/ui/moving-border";

export default function DemoOne() {
  return (
    <div className="flex justify-center items-center flex-wrap h-screen w-full gap-x-12 gap-y-6 bg-emerald-50">

            <div className="flex flex-col gap-3 justify-center items-center">

                {/* The radius prop should be identical with your rounded value */}
                <MovingBorder radius={10} borderWidth={2} gradientWidth={60} duration={3}
                              colors={["#dce817", "#10f400", "#75ba33"]}>
                    <button
                        className="rounded-[10px] w-[100px] aspect-video bg-emerald-200 flex justify-center items-center transition-all duration-500 hover:bg-emerald-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="icon icon-tabler icons-tabler-outline icon-tabler-mood-sing">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                            <path d="M9 9h.01"/>
                            <path d="M15 9h.01"/>
                            <path d="M15 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        </svg>
                    </button>
                </MovingBorder>

                <div>Button</div>
            </div>

            <div className="flex flex-col gap-3 justify-center items-center">

                {/* Circle */}
                <MovingBorder isCircle={true}
                              borderWidth={4}
                              gradientWidth={150}
                              duration={4}
                              colors={["#84b5ff", "#dad7f8", "#cb92ff"]}>
                    <div
                        className="w-[200px] aspect-square bg-accent rounded-full overflow-hidden flex justify-center items-center">
                        <img
                            className="object-cover w-full h-full"
                            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJrZ3NlejZ4ZXlvaDRnbTR1b2VmcG1waGM1Y3hvNGU4aGE0aHcweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BkNnO2qmCWTQuac/giphy.gif"
                            alt="A blurry photo of white flowers in a field"/>
                    </div>
                </MovingBorder>

                <div>Avatar</div>
            </div>
        </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/moving-border.tsx
"use client";
import * as React from 'react';
import {useRef} from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {cn} from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export type MovingBorderProps = {
    /** The content to be displayed inside the border. */
    children: React.ReactNode;

    /** Additional CSS classes for the inner content container. */
    className?: string;

    /** Additional CSS classes for the outer wrapper container. */
    outerClassName?: string;

    /** Width of the border in pixels. @default 1 */
    borderWidth?: number;

    /** Width of the gradient effect in pixels. If not specified, defaults to borderWidth * 10. */
    gradientWidth?: number;

    /** Border radius in pixels. Ignored if isCircle is true. @default 15 */
    radius?: number;

    /** Duration of one complete animation cycle in seconds. @default 3 */
    duration?: number;

    /** Array of color values for the gradient. If multiple colors provided, they will be animated in sequence. @default ["#355bd2"] */
    colors?: string[];

    /** Whether to render as a perfect circle with circular path animation. @default false */
    isCircle?: boolean;
};

export function MovingBorder({
                                 children,
                                 className,
                                 outerClassName,
                                 borderWidth = 1,
                                 radius = 15,
                                 gradientWidth,
                                 duration = 3,
                                 colors = ["#355bd2"],
                                 isCircle = false
                             }: MovingBorderProps) {
    const scope = useRef(null);

    // Use a large radius for perfect circle
    const effectiveRadius = isCircle ? 9999 : radius;

    useGSAP(
        () => {
            const root = scope.current as HTMLElement | null;
            if (!root) return;

            const movingGradient = root.querySelector<HTMLElement>(".moving-gradient");
            if (!movingGradient) return;

            let pathTl: gsap.core.Timeline | null = null;
            let colorTl: gsap.core.Timeline | null = null;

            // Function to create/update the path animation
            const updateAnimation = () => {
                // Kill existing timeline if it exists
                if (pathTl) {
                    pathTl.kill();
                }

                // Get current dimensions
                const rect = root.getBoundingClientRect();
                const width = rect.width - borderWidth * 2;
                const height = rect.height - borderWidth * 2;

                let path: { x: number; y: number; }[];

                if (isCircle) {
                    // Create a circular path using 64 coordinate points
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const circleRadius = Math.min(width, height) / 2;
                    const numPoints = 64;

                    path = Array.from({length: numPoints}, (_, i) => {
                        const angle = (i / numPoints) * Math.PI * 2;
                        return {
                            x: centerX + circleRadius * Math.cos(angle),
                            y: centerY + circleRadius * Math.sin(angle)
                        };
                    });
                } else {
                    // Calculate the path points accounting for border radius (rounded rectangle)
                    path = [
                        {x: effectiveRadius, y: 0},
                        {x: width - effectiveRadius, y: 0},
                        {x: width, y: effectiveRadius},
                        {x: width, y: height - effectiveRadius},
                        {x: width - effectiveRadius, y: height},
                        {x: effectiveRadius, y: height},
                        {x: 0, y: height - effectiveRadius},
                        {x: 0, y: effectiveRadius},
                        {x: effectiveRadius, y: 0},
                    ];
                }

                // Create new timeline for path
                pathTl = gsap.timeline({
                    repeat: -1,
                    defaults: {ease: "none", duration: duration}
                });

                pathTl.to(movingGradient, {
                    motionPath: {
                        path: path,
                        fromCurrent: false,
                        curviness: isCircle ? 1 : 1.5,
                    }
                });
            };

            // Function to create color animation
            const setupColorAnimation = () => {
                if (colors.length <= 1) {
                    // Single color - just set it
                    root.style.setProperty('--color', colors[0]);
                    return;
                }

                // Set initial color
                root.style.setProperty('--color', colors[0]);

                // Multiple colors - animate through them
                colorTl = gsap.timeline({
                    repeat: -1,
                    defaults: {ease: "none", duration: duration / colors.length}
                });

                // Animate through all colors and back to first for seamless loop
                colors.forEach((_, index) => {
                    const nextColor = colors[(index + 1) % colors.length];
                    colorTl!.to(root, {'--color': nextColor});
                });
            };

            // Initial setup
            updateAnimation();
            setupColorAnimation();

            // Watch for size changes
            const resizeObserver = new ResizeObserver(() => {
                updateAnimation();
            });

            resizeObserver.observe(root);

            // Cleanup
            return () => {
                if (pathTl) {
                    pathTl.kill();
                }
                if (colorTl) {
                    colorTl.kill();
                }
                resizeObserver.disconnect();
            };
        },
        {scope, dependencies: [borderWidth, effectiveRadius, gradientWidth, duration, colors, isCircle]}
    );

    return (
        // wrapper
        <div ref={scope} className={cn(`wrapper relative overflow-hidden`, outerClassName)}
             style={{
                 ['--color' as any]: colors[0],
                 padding: `${borderWidth}px`,
                 borderRadius: `${effectiveRadius + borderWidth}px`,
             }}>

            {/* moving gradient*/}
            <div className="moving-gradient aspect-square absolute top-0 left-0" style={{width: `${borderWidth}px`}}>
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full"
                    style={{
                        width: `${gradientWidth || borderWidth * 10}px`,
                        background: `radial-gradient(circle, var(--color) 0%, transparent 70%)`
                    }}>
                </div>
            </div>

            {/*inner*/}
            <div className={cn(`inner relative z-30 bg-white`, className)}
                 style={{
                     borderRadius: `${effectiveRadius}px`,
                 }}>
                {children}
            </div>
        </div>
    );
}
```

Install NPM dependencies:
```bash
gsap, @gsap/react
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
