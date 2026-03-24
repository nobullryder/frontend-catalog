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
draw-line-text.tsx
"use client";

import { ComponentProps, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type DrawTextProps = {
    afterFill?: boolean;
    color?: string;
    fontSize?: number;
    letterSpacing?: number;
    oneByOne?: boolean;
    strokeWidth?: number;
    text: string;
    wordSpacing?: number;
} & ComponentProps<"svg">;

export const DrawLineText = ({
    text,
    oneByOne = true,
    afterFill = true,
    color = "black",
    fontSize = 40,
    wordSpacing = 10,
    strokeWidth = 1,
    letterSpacing = 0,
    ...props
}: DrawTextProps) => {
    const wrapperRef = useRef<SVGSVGElement | null>(null);

    const [textDimension, setTextDimension] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

    useGSAP(
        () => {
            const wrapperChildren = wrapperRef.current?.children;
            if (!wrapperChildren) return;
            const children = Array.from(wrapperChildren) as SVGTextElement[];
            let totalWidth = 0;
            let maxHeight = 0;
            children.forEach((el, index) => {
                el.setAttribute("x", totalWidth + "px");
                const elementWidth = el.getBoundingClientRect().width;
                const elementHeight = el.getBoundingClientRect().height;
                if (elementHeight > maxHeight) {
                    maxHeight = elementHeight;
                }
                totalWidth +=
                    +(elementWidth == 0 ? wordSpacing : elementWidth) +
                    (children.length - 1 != index ? letterSpacing : 0);
                const length = el.getComputedTextLength() * 8;
                el.style.strokeDasharray = length + "px";
                el.style.strokeDashoffset = length + "px";
            });
            setTextDimension({ width: totalWidth, height: maxHeight });

            const textChildren = children.filter((el) => el.getBoundingClientRect().width != 0);

            const tl = gsap.timeline();
            tl.to(textChildren, {
                strokeDashoffset: 0,
                duration: 2.5,
                ease: "linear",
                stagger: oneByOne ? 0.8 : 0,
            });
            if (afterFill) {
                tl.to(textChildren, {
                    fillOpacity: 1,
                    duration: 0.6,
                    ease: "power4.in",
                    stagger: {
                        amount: 0.2,
                        from: "center",
                    },
                });
            }
        },
        { scope: wrapperRef, dependencies: [text] },
    );

    return (
        <svg
            {...props}
            ref={wrapperRef}
            style={{
                userSelect: "none",
                width: textDimension.width + "px",
                height: textDimension.height * 1.03 + "px",
            }}>
            {text.split("").map((char, i) => (
                <text
                    key={i}
                    style={{
                        stroke: color,
                        fill: color,
                        fillOpacity: 0,
                        fontSize: fontSize,
                        strokeWidth: `${strokeWidth}px`,
                    }}
                    y={fontSize}>
                    {char}
                </text>
            ))}
        </svg>
    );
};


code.demo.1750436397740.tsx
import { DrawLineText } from "@/components/ui/draw-line-text";

export const Demo = () => {
    return (
        <DrawLineText
            className="font-medium"
            fontSize={60}
            strokeWidth={1.5}
            text="21st.dev"
            color="var(--color-foreground)"
        />
    );
};

export default Demo; 
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/draw-line-text.tsx
"use client";

import { ComponentProps, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type DrawTextProps = {
    afterFill?: boolean;
    color?: string;
    fontSize?: number;
    letterSpacing?: number;
    oneByOne?: boolean;
    strokeWidth?: number;
    text: string;
    wordSpacing?: number;
} & ComponentProps<"svg">;

export const DrawLineText = ({
    text,
    oneByOne = true,
    afterFill = true,
    color = "black",
    fontSize = 40,
    wordSpacing = 10,
    strokeWidth = 1,
    letterSpacing = 0,
    ...props
}: DrawTextProps) => {
    const wrapperRef = useRef<SVGSVGElement | null>(null);

    const [textDimension, setTextDimension] = useState<{ height: number; width: number }>({ height: 0, width: 0 });

    useGSAP(
        () => {
            const wrapperChildren = wrapperRef.current?.children;
            if (!wrapperChildren) return;
            const children = Array.from(wrapperChildren) as SVGTextElement[];
            let totalWidth = 0;
            let maxHeight = 0;
            children.forEach((el, index) => {
                el.setAttribute("x", totalWidth + "px");
                const elementWidth = el.getBoundingClientRect().width;
                const elementHeight = el.getBoundingClientRect().height;
                if (elementHeight > maxHeight) {
                    maxHeight = elementHeight;
                }
                totalWidth +=
                    +(elementWidth == 0 ? wordSpacing : elementWidth) +
                    (children.length - 1 != index ? letterSpacing : 0);
                const length = el.getComputedTextLength() * 8;
                el.style.strokeDasharray = length + "px";
                el.style.strokeDashoffset = length + "px";
            });
            setTextDimension({ width: totalWidth, height: maxHeight });

            const textChildren = children.filter((el) => el.getBoundingClientRect().width != 0);

            const tl = gsap.timeline();
            tl.to(textChildren, {
                strokeDashoffset: 0,
                duration: 2.5,
                ease: "linear",
                stagger: oneByOne ? 0.8 : 0,
            });
            if (afterFill) {
                tl.to(textChildren, {
                    fillOpacity: 1,
                    duration: 0.6,
                    ease: "power4.in",
                    stagger: {
                        amount: 0.2,
                        from: "center",
                    },
                });
            }
        },
        { scope: wrapperRef, dependencies: [text] },
    );

    return (
        <svg
            {...props}
            ref={wrapperRef}
            style={{
                userSelect: "none",
                width: textDimension.width + "px",
                height: textDimension.height * 1.03 + "px",
            }}>
            {text.split("").map((char, i) => (
                <text
                    key={i}
                    style={{
                        stroke: color,
                        fill: color,
                        fillOpacity: 0,
                        fontSize: fontSize,
                        strokeWidth: `${strokeWidth}px`,
                    }}
                    y={fontSize}>
                    {char}
                </text>
            ))}
        </svg>
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
