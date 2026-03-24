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
profile-peek.tsx
"use client";

import { ComponentProps, ReactNode, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type HoverProfileCardProps = Omit<ComponentProps<"div">, "content"> & {
    trigger?: ReactNode;
    content?: ReactNode;
};

export const ProfilePeek = ({ trigger, content, className, ...props }: HoverProfileCardProps) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const component = componentRef.current;
            const card = cardRef.current;
            const content = contentRef.current;
            const trigger = triggerRef.current;
            if (!component || !card || !content || !trigger) return;

            const timeline = gsap.timeline({
                paused: true,
                defaults: { ease: "power2.inOut", duration: 0.4 },
            });

            gsap.set(card, {
                opacity: 0,
                scale: 0.9,
                y: -40,
                rotationX: -25,
                rotationY: 25,
                transformOrigin: "top left",
            });

            gsap.set(content, { y: -10, opacity: 0, display: "none" });

            timeline
                .to(content, {
                    display: "block",
                    duration: 0,
                })
                .to(component, {
                    zIndex: 10,
                    duration: 0,
                })
                .to(card, {
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    left: -16,
                    top: -16,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(3)",
                })
                .to(
                    triggerRef.current,
                    {
                        scale: 1.1,
                        duration: 0.4,
                    },
                    "<",
                )
                .to(
                    content,
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                    },
                    "-=0.4",
                );

            const onMouseEnter = () => {
                timeline.play();
            };

            const onMouseLeave = () => {
                timeline.reverse();
            };

            trigger.addEventListener("mouseenter", onMouseEnter);
            component.addEventListener("mouseleave", onMouseLeave);

            return () => {
                trigger.removeEventListener("mouseenter", onMouseEnter);
                component.removeEventListener("mouseleave", onMouseLeave);
            };
        },
        { scope: componentRef },
    );

    return (
        <div {...props} ref={componentRef} className={cn("relative z-0 [perspective:800px]", className)}>
            <div ref={cardRef} className="absolute [transform-style:preserve-3d]">
                <div ref={contentRef} style={{ display: "none" }}>
                    {content}
                </div>
            </div>

            <div className="relative" ref={triggerRef}>
                {trigger}
            </div>
        </div>
    );
};


code.demo.1750436529100.tsx
import { MapPinIcon, StarIcon } from "lucide-react";

import { ProfilePeek } from "@/components/ui/profile-peek";

export const Demo = () => {
    return (
        <div className="mb-24 flex items-center -space-x-4">
            <ProfilePeek
                trigger={
                    <img
                        src="/images/avatars/1.jpg"
                        alt="Avatar"
                        className="size-12 cursor-pointer rounded-full object-cover"
                    />
                }
                content={
                    <div className="bg-card w-80 rounded-md p-4 shadow-sm">
                        <div className="ms-16">
                            <h3 className="mt-1 text-xl/none font-medium">Alex Thompson</h3>
                            <p className="text-foreground/60 mt-1 text-sm/none">Product Designer at Loom</p>
                        </div>
                        <p className="text-foreground/80 mt-4 text-[15px] leading-tight">
                            Used many design systems, but this one saved time. Components worked across themes.
                        </p>
                        <div className="-mx-4 mt-3 border-t"></div>
                        <div className=""></div>
                        <div className="text-foreground/80 mt-3 flex items-center justify-between gap-2 text-sm tracking-tight">
                            <div className="flex items-center gap-1.5">
                                <MapPinIcon className="size-3.5" />
                                <span>San Francisco, CA</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="size-3.5 text-orange-500" />
                                <StarIcon className="size-3.5 text-orange-500" />
                                <StarIcon className="size-3.5 text-orange-500" />
                                <StarIcon className="size-3.5 text-orange-500" />
                                <StarIcon className="size-3.5 text-orange-500" />
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Demo; 
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/profile-peek.tsx
"use client";

import { ComponentProps, ReactNode, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type HoverProfileCardProps = Omit<ComponentProps<"div">, "content"> & {
    trigger?: ReactNode;
    content?: ReactNode;
};

export const ProfilePeek = ({ trigger, content, className, ...props }: HoverProfileCardProps) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const component = componentRef.current;
            const card = cardRef.current;
            const content = contentRef.current;
            const trigger = triggerRef.current;
            if (!component || !card || !content || !trigger) return;

            const timeline = gsap.timeline({
                paused: true,
                defaults: { ease: "power2.inOut", duration: 0.4 },
            });

            gsap.set(card, {
                opacity: 0,
                scale: 0.9,
                y: -40,
                rotationX: -25,
                rotationY: 25,
                transformOrigin: "top left",
            });

            gsap.set(content, { y: -10, opacity: 0, display: "none" });

            timeline
                .to(content, {
                    display: "block",
                    duration: 0,
                })
                .to(component, {
                    zIndex: 10,
                    duration: 0,
                })
                .to(card, {
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    left: -16,
                    top: -16,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(3)",
                })
                .to(
                    triggerRef.current,
                    {
                        scale: 1.1,
                        duration: 0.4,
                    },
                    "<",
                )
                .to(
                    content,
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                    },
                    "-=0.4",
                );

            const onMouseEnter = () => {
                timeline.play();
            };

            const onMouseLeave = () => {
                timeline.reverse();
            };

            trigger.addEventListener("mouseenter", onMouseEnter);
            component.addEventListener("mouseleave", onMouseLeave);

            return () => {
                trigger.removeEventListener("mouseenter", onMouseEnter);
                component.removeEventListener("mouseleave", onMouseLeave);
            };
        },
        { scope: componentRef },
    );

    return (
        <div {...props} ref={componentRef} className={cn("relative z-0 [perspective:800px]", className)}>
            <div ref={cardRef} className="absolute [transform-style:preserve-3d]">
                <div ref={contentRef} style={{ display: "none" }}>
                    {content}
                </div>
            </div>

            <div className="relative" ref={triggerRef}>
                {trigger}
            </div>
        </div>
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
