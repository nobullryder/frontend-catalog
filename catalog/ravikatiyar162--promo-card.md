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
promo-card.tsx
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for class merging.
import { Button } from "@/components/ui/button"; // Using shadcn's Button.

// Define the props for the component
export interface AnimatedPromoCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  className?: string;
}

export const AnimatedPromoCard = ({
  imageSrc,
  title,
  subtitle,
  buttonText,
  href,
  className,
}: AnimatedPromoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse position values using spring animation
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 50, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 50, mass: 0.5 });

  // Transform mouse position into rotation values for the 3D effect
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  // Handle mouse move event to update motion values
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset motion values on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={cn(
        "relative w-full max-w-lg h-72 rounded-xl overflow-hidden bg-background shadow-lg",
        className
      )}
    >
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 h-full flex flex-col justify-end p-6 text-card-foreground"
      >
        <h2 className="text-3xl font-bold text-white shadow-md">{title}</h2>
        <p className="text-md text-white/90 shadow-sm mt-1">{subtitle}</p>
        <div className="mt-6">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-neutral-200 text-black hover:bg-white transition-colors">
                {buttonText}
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

code.demo.1758606930486.tsx
import { AnimatedPromoCard } from "@/components/ui/promo-card"; // Adjust the import path

export default function AnimatedPromoCardDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background p-4">
      <AnimatedPromoCard
        imageSrc="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllfGVufDB8fDB8fHww?q=80&w=2070&auto=format&fit=crop" // Placeholder image
        title="Severance"
        subtitle="Season 2 streaming now"
        buttonText="Watch Now"
        href="#"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/promo-card.tsx
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for class merging.
import { Button } from "@/components/ui/button"; // Using shadcn's Button.

// Define the props for the component
export interface AnimatedPromoCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  className?: string;
}

export const AnimatedPromoCard = ({
  imageSrc,
  title,
  subtitle,
  buttonText,
  href,
  className,
}: AnimatedPromoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse position values using spring animation
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 50, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 50, mass: 0.5 });

  // Transform mouse position into rotation values for the 3D effect
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  // Handle mouse move event to update motion values
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset motion values on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={cn(
        "relative w-full max-w-lg h-72 rounded-xl overflow-hidden bg-background shadow-lg",
        className
      )}
    >
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 h-full flex flex-col justify-end p-6 text-card-foreground"
      >
        <h2 className="text-3xl font-bold text-white shadow-md">{title}</h2>
        <p className="text-md text-white/90 shadow-sm mt-1">{subtitle}</p>
        <div className="mt-6">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-neutral-200 text-black hover:bg-white transition-colors">
                {buttonText}
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
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
