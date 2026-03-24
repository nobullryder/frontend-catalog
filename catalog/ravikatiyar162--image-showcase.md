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
image-showcase.tsx
// components/ui/photo-stack-card.tsx

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Your shadcn utility for merging class names

// --- PROPS INTERFACE ---
interface PhotoStackCardProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
  category: string;
  title: string;
  subtitle: string;
  isActive?: boolean; // New prop to control the active state
}

// --- FRAMER MOTION VARIANTS ---
// For the image stack within the card
const imageContainerVariants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const imageVariants = {
  initial: { scale: 1, rotate: 0, y: 0 },
  hover: (i: number) => ({
    scale: 1.05,
    rotate: (i - 1) * 10,
    y: -20,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  }),
};

// For the card itself (click interaction)
const cardVariants = {
  inactive: {
    scale: 1,
    y: 0,
    zIndex: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  active: {
    scale: 1.05,
    y: -15,
    zIndex: 10,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const PhotoStackCard = React.forwardRef<
  HTMLDivElement,
  PhotoStackCardProps
>(({ className, images, category, title, subtitle, isActive, ...props }, ref) => {
  const displayImages = images.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative flex h-72 w-72 cursor-pointer flex-col justify-start rounded-xl bg-card p-6 shadow-xl",
        "transition-colors duration-300 ease-in-out hover:bg-card/90",
        className
      )}
      variants={cardVariants}
      animate={isActive ? "active" : "inactive"}
      // The hover animation is now within a nested motion div to avoid conflicts
      {...props}
    >
      {/* Text Content */}
      <div className="z-10">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {category}
        </p>
        <h2 className="mt-1 text-3xl font-bold text-card-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Image Stack */}
      <motion.div
        className="absolute bottom-0 right-0 h-48 w-full"
        variants={imageContainerVariants}
        initial="initial"
        whileHover="hover"
      >
        <AnimatePresence>
          {displayImages.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={`${title} memory image ${i + 1}`}
              custom={i}
              variants={imageVariants}
              className="absolute bottom-[-20px] right-6 h-40 w-auto origin-bottom-center rounded-lg border-4 border-background object-cover shadow-lg"
              style={{
                transform: `rotate(${(i - 1) * 4}deg)`,
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
PhotoStackCard.displayName = "PhotoStackCard";

code.demo.1758955751337.tsx
// demo.tsx

import * as React from "react";
import { PhotoStackCard } from "@/components/ui/image-showcase";

// --- DEMO DATA ---
const memoriesData = [
  {
    images: [
      "https://images.unsplash.com/photo-1644264249078-f15241a75fc7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fDgwfGVufDB8fDB8fHww?q=80&w=1964&auto=format&fit=crop",
      "https://plus.unsplash.com/premium_photo-1672116453000-c31b150f48ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ODB8ZW58MHx8MHx8fDA%3D?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "TRAVEL",
    title: "Black Sea",
    subtitle: "June 2023",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485160497022-3e09382fb310?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "ADVENTURE",
    title: "Alps",
    subtitle: "January 2024",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1925&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1643506454451-8924ad6722f5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fDgwfGVufDB8fDB8fHww?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "RELAXATION",
    title: "Maldives",
    subtitle: "August 2022",
  },
];

// --- DEMO COMPONENT ---
export default function PhotoStackCardDemo() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(1); // Default to the middle card

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <div className="relative flex h-72 w-full max-w-3xl items-center justify-center">
        {memoriesData.map((mem, index) => (
          <div
            key={mem.title}
            className="absolute"
            style={{
                // Position cards to overlap for a better visual effect
                transform: `translateX(${(index - 1) * 200}px)`,
            }}
          >
            <PhotoStackCard
              {...mem}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/image-showcase.tsx
// components/ui/photo-stack-card.tsx

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Your shadcn utility for merging class names

// --- PROPS INTERFACE ---
interface PhotoStackCardProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
  category: string;
  title: string;
  subtitle: string;
  isActive?: boolean; // New prop to control the active state
}

// --- FRAMER MOTION VARIANTS ---
// For the image stack within the card
const imageContainerVariants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const imageVariants = {
  initial: { scale: 1, rotate: 0, y: 0 },
  hover: (i: number) => ({
    scale: 1.05,
    rotate: (i - 1) * 10,
    y: -20,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  }),
};

// For the card itself (click interaction)
const cardVariants = {
  inactive: {
    scale: 1,
    y: 0,
    zIndex: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  active: {
    scale: 1.05,
    y: -15,
    zIndex: 10,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const PhotoStackCard = React.forwardRef<
  HTMLDivElement,
  PhotoStackCardProps
>(({ className, images, category, title, subtitle, isActive, ...props }, ref) => {
  const displayImages = images.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative flex h-72 w-72 cursor-pointer flex-col justify-start rounded-xl bg-card p-6 shadow-xl",
        "transition-colors duration-300 ease-in-out hover:bg-card/90",
        className
      )}
      variants={cardVariants}
      animate={isActive ? "active" : "inactive"}
      // The hover animation is now within a nested motion div to avoid conflicts
      {...props}
    >
      {/* Text Content */}
      <div className="z-10">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          {category}
        </p>
        <h2 className="mt-1 text-3xl font-bold text-card-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Image Stack */}
      <motion.div
        className="absolute bottom-0 right-0 h-48 w-full"
        variants={imageContainerVariants}
        initial="initial"
        whileHover="hover"
      >
        <AnimatePresence>
          {displayImages.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={`${title} memory image ${i + 1}`}
              custom={i}
              variants={imageVariants}
              className="absolute bottom-[-20px] right-6 h-40 w-auto origin-bottom-center rounded-lg border-4 border-background object-cover shadow-lg"
              style={{
                transform: `rotate(${(i - 1) * 4}deg)`,
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
PhotoStackCard.displayName = "PhotoStackCard";
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
