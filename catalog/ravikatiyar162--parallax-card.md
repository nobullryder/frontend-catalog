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
parallax-card.tsx
// components/ui/parallax-tilt-card.tsx
import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

// --- PROPS DEFINITION ---
export interface ParallaxTiltCardProps {
  /**
   * The main title of the card.
   */
  title: string;
  /**
   * A short description displayed under the title.
   */
  description: string;
  /**
   * The URL for the primary image to be displayed prominently on the card.
   */
  imageUrl: string;
  /**
   * Optional class names for extending or overriding the component's styles.
   */
  className?: string;
}

const ParallaxTiltCard = React.forwardRef<
  HTMLDivElement,
  ParallaxTiltCardProps
>(({ title, description, imageUrl, className }, ref) => {
  // --- MOTION VALUES ---
  // Track mouse position relative to the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // --- SPRING ANIMATIONS ---
  // Create smooth, spring-based animations for mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30, bounce: 0 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30, bounce: 0 });

  // --- TRANSFORMATIONS ---
  // Rotate the card based on mouse position
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  // Apply parallax effect to inner elements for depth
  const translateZImage = useTransform(mouseYSpring, [-0.5, 0.5], [-25, 25]);
  const translateZContent = useTransform(mouseYSpring, [-0.5, 0.5], [25, -25]);

  // --- EVENT HANDLERS ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Normalize mouse position to a range of -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d", // Enable 3D transformations for children
      }}
      className={cn(
        "relative h-80 w-72 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30",
        "dark:from-primary/20 dark:to-primary/40",
        className
      )}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid grid-rows-2 place-content-center rounded-xl bg-card shadow-lg"
      >
        {/* Image with Parallax */}
        <motion.div
          style={{
            transform: "translateZ(40px)",
            translateY: translateZImage,
          }}
          className="relative h-full w-full"
        >
          <img
            src={imageUrl}
            alt={title}
            className="pointer-events-none absolute -top-12 left-1/2 h-[120%] w-auto -translate-x-1/2 object-contain"
          />
        </motion.div>

        {/* Text Content with Parallax */}
        <motion.div
          style={{
            transform: "translateZ(30px)",
            translateY: translateZContent,
          }}
          className="p-6 pt-0 text-center"
        >
          <h2 className="text-xl font-bold text-card-foreground">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
});
ParallaxTiltCard.displayName = "ParallaxTiltCard";

export { ParallaxTiltCard };

code.demo.1758200405779.tsx
// demo.tsx
import { ParallaxTiltCard } from "@/components/ui/parallax-card";

export default function ParallaxTiltCardDemo() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-8 bg-background p-8">
      <ParallaxTiltCard
        title="Treasure Map"
        description="Get instant, personalized treasure map insights and recommendations."
        imageUrl="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-YPr7im1ndABBcrdS1hCqCMvIBtvHSY.png&w=320&q=75"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/parallax-card.tsx
// components/ui/parallax-tilt-card.tsx
import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

// --- PROPS DEFINITION ---
export interface ParallaxTiltCardProps {
  /**
   * The main title of the card.
   */
  title: string;
  /**
   * A short description displayed under the title.
   */
  description: string;
  /**
   * The URL for the primary image to be displayed prominently on the card.
   */
  imageUrl: string;
  /**
   * Optional class names for extending or overriding the component's styles.
   */
  className?: string;
}

const ParallaxTiltCard = React.forwardRef<
  HTMLDivElement,
  ParallaxTiltCardProps
>(({ title, description, imageUrl, className }, ref) => {
  // --- MOTION VALUES ---
  // Track mouse position relative to the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // --- SPRING ANIMATIONS ---
  // Create smooth, spring-based animations for mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30, bounce: 0 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30, bounce: 0 });

  // --- TRANSFORMATIONS ---
  // Rotate the card based on mouse position
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  // Apply parallax effect to inner elements for depth
  const translateZImage = useTransform(mouseYSpring, [-0.5, 0.5], [-25, 25]);
  const translateZContent = useTransform(mouseYSpring, [-0.5, 0.5], [25, -25]);

  // --- EVENT HANDLERS ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Normalize mouse position to a range of -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d", // Enable 3D transformations for children
      }}
      className={cn(
        "relative h-80 w-72 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30",
        "dark:from-primary/20 dark:to-primary/40",
        className
      )}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid grid-rows-2 place-content-center rounded-xl bg-card shadow-lg"
      >
        {/* Image with Parallax */}
        <motion.div
          style={{
            transform: "translateZ(40px)",
            translateY: translateZImage,
          }}
          className="relative h-full w-full"
        >
          <img
            src={imageUrl}
            alt={title}
            className="pointer-events-none absolute -top-12 left-1/2 h-[120%] w-auto -translate-x-1/2 object-contain"
          />
        </motion.div>

        {/* Text Content with Parallax */}
        <motion.div
          style={{
            transform: "translateZ(30px)",
            translateY: translateZContent,
          }}
          className="p-6 pt-0 text-center"
        >
          <h2 className="text-xl font-bold text-card-foreground">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
});
ParallaxTiltCard.displayName = "ParallaxTiltCard";

export { ParallaxTiltCard };
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
