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
credit-card-hero.tsx
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreditCardHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  subtext: string;
  cta: string;
  onCtaClick?: () => void;
  primaryCardImage?: string;
  secondaryCardImage?: string;
}

export const CreditCardHero = React.forwardRef<HTMLDivElement, CreditCardHeroProps>(
  (
    {
      className,
      headline,
      subtext,
      cta,
      onCtaClick,
      primaryCardImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
      secondaryCardImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg",
      ...props
    },
    ref
  ) => {
    // Track mouse movement for tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 400], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 600], [-8, 8]);
    const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(300);
          mouseY.set(200);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative flex flex-col items-center justify-center text-center border-12 px-6 py-20 bg-background rounded-3xl shadow-lg",
          className
        )}
        {...props}
      >
        {/* Text */}
        <div className="relative z-20">
          <h2 className="text-4xl font-bold text-card-foreground max-w-xl">{headline}</h2>
          <p className="mt-4 text-base text-muted-foreground max-w-md">{subtext}</p>
          <button
            onClick={onCtaClick}
            className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            {cta}
          </button>
        </div>

        {/* Floating Cards OUTSIDE the content */}

        {/* Bigger Card - bottom left */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="absolute -bottom-20 -left-28 h-44 w-80 rounded-xl bg-cover bg-center shadow-2xl z-10"
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: `url(${primaryCardImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl" />
          <div className="relative z-10 p-5 text-white">
            <p className="text-base font-semibold tracking-widest">**** 4590</p>
            <div className="flex justify-between text-xs mt-2">
              <span>JANE DOE</span>
              <span>11/29</span>
            </div>
          </div>
        </motion.div>

        {/* Smaller Card - top right */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          className="absolute -top-12 -right-24 h-32 w-60 rounded-xl bg-cover bg-center shadow-xl z-10"
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: `url(${secondaryCardImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl" />
          <div className="relative z-10 p-3 text-white">
            <p className="text-sm font-semibold tracking-widest">**** 7421</p>
            <div className="flex justify-between text-[11px] mt-1">
              <span>JOHN DOE</span>
              <span>07/31</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

CreditCardHero.displayName = "CreditCardHero";


code.demo.1759045447239.tsx
"use client";

import * as React from "react";
import { CreditCardHero } from "@/components/ui/credit-card-hero";

export default function CreditCardHeroDemo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/20 p-8">
      <CreditCardHero
        headline="The Future of Digital Banking"
        subtext="Secure, globally accepted, and packed with exclusive rewards — your new digital credit card is here."
        cta="Apply Now"
        onCtaClick={() => alert("CTA Clicked!")}
        primaryCardImage="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png"
        secondaryCardImage="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg"
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/credit-card-hero.tsx
"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreditCardHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  subtext: string;
  cta: string;
  onCtaClick?: () => void;
  primaryCardImage?: string;
  secondaryCardImage?: string;
}

export const CreditCardHero = React.forwardRef<HTMLDivElement, CreditCardHeroProps>(
  (
    {
      className,
      headline,
      subtext,
      cta,
      onCtaClick,
      primaryCardImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png",
      secondaryCardImage = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_gradient.jpeg",
      ...props
    },
    ref
  ) => {
    // Track mouse movement for tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 400], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 600], [-8, 8]);
    const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(300);
          mouseY.set(200);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative flex flex-col items-center justify-center text-center border-12 px-6 py-20 bg-background rounded-3xl shadow-lg",
          className
        )}
        {...props}
      >
        {/* Text */}
        <div className="relative z-20">
          <h2 className="text-4xl font-bold text-card-foreground max-w-xl">{headline}</h2>
          <p className="mt-4 text-base text-muted-foreground max-w-md">{subtext}</p>
          <button
            onClick={onCtaClick}
            className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
          >
            {cta}
          </button>
        </div>

        {/* Floating Cards OUTSIDE the content */}

        {/* Bigger Card - bottom left */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="absolute -bottom-20 -left-28 h-44 w-80 rounded-xl bg-cover bg-center shadow-2xl z-10"
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: `url(${primaryCardImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl" />
          <div className="relative z-10 p-5 text-white">
            <p className="text-base font-semibold tracking-widest">**** 4590</p>
            <div className="flex justify-between text-xs mt-2">
              <span>JANE DOE</span>
              <span>11/29</span>
            </div>
          </div>
        </motion.div>

        {/* Smaller Card - top right */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          className="absolute -top-12 -right-24 h-32 w-60 rounded-xl bg-cover bg-center shadow-xl z-10"
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              backgroundImage: `url(${secondaryCardImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40 rounded-xl" />
          <div className="relative z-10 p-3 text-white">
            <p className="text-sm font-semibold tracking-widest">**** 7421</p>
            <div className="flex justify-between text-[11px] mt-1">
              <span>JOHN DOE</span>
              <span>07/31</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

CreditCardHero.displayName = "CreditCardHero";

```

Install NPM dependencies:
```bash
framer-motion
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
