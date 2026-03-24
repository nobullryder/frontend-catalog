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
growth-hero-section.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Prop definition for the component
interface GrowthHeroSectionProps {
  /** The main title, can include <br /> for line breaks */
  title: React.ReactNode;
  /** The first paragraph of description text */
  description1: string;
  /** The second paragraph of description text */
  description2: string;
  /** An array of 4 image source URLs for the growth animation */
  images: [string, string, string, string];
  /** Call-to-action details */
  cta: {
    text: string;
    href: string;
  };
  /** Optional brand name to display at the top */
  brandName?: string;
  /** Optional className to override styles */
  className?: string;
}

/**
 * A responsive hero section with an animated image gallery.
 * Uses shadcn's theme variables for light/dark mode support.
 */
export const GrowthHeroSection = ({
  title,
  description1,
  description2,
  images,
  cta,
  brandName,
  className,
}: GrowthHeroSectionProps) => {

  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for each individual item (image, text)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className={cn(
        "w-full bg-background text-foreground antialiased",
        className
      )}
    >
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Optional Brand Name */}
        {brandName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 text-lg font-medium tracking-wide text-muted-foreground"
          >
            {brandName}
          </motion.div>
        )}

        {/* Animated Images */}
        <motion.div
          className="mb-8 flex items-end justify-center space-x-4 sm:space-x-6 md:space-x-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Illustration of a plant growing in four stages"
        >
          {images.map((src, index) => (
            <motion.div key={index} variants={itemVariants}>
              <img
                src={src}
                alt={`Plant growth stage ${index + 1}`}
                className="h-auto max-h-[120px] w-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="mb-6 max-w-3xl text-3xl font-medium tracking-tight text-foreground md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {/* Description Paragraphs */}
        <motion.div
          className="max-w-3xl space-y-4 text-base text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p>{description1}</p>
          <p>{description2}</p>
        </motion.div>

        {/* Call to Action Link */}
        <motion.a
          href={cta.href}
          className="mt-12 text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          aria-label={cta.text}
        >
          {cta.text}
        </motion.a>
      </div>
    </section>
  );
};

code.demo.1758804517096.tsx
import { GrowthHeroSection } from "@/components/ui/growth-hero-section"; // Adjust the import path

export default function GrowthHeroSectionDemo() {
  // Props are defined here and passed into the component for reusability
  const heroData = {
    brandName: "Bliss",
    title: (
      <>
        Accelerating The Builders
        <br />
        Of The Next Decade
      </>
    ),
    description1:
      "We're A Venture Capital Firm Focused On Early-Stage Startups With Disruptive Potential. With Deep Operational Experience And A Founder-First Approach, We Partner With Visionary Teams To Build Tomorrow's Category Leaders.",
    description2:
      "We Invest In Startups Solving Real-World Problems Through Technology, Design, And Grit. Our Global Network, Operational Support, And Long-Term Mindset Help Founders Move Fast And Build Things That Matter.",
    images: [
      "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-v9C8luPQsZdmebTqL8qWFnHq9MxOjA.png&w=320&q=75",
      "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-stQRgfBCiMg8IA6Bab2Ps4i8JGwdSY.png&w=320&q=75",
      "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-GpHZV8hHsDz012a8YoUSZPF2LKqIfV.png&w=320&q=75",
      "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-vhtQnzOAq2TG349yFiuZGtvFxPGfzU.png&w=320&q=75",
    ] as [string, string, string, string],
    cta: {
      text: "Apply To Join A Community",
      href: "#",
    },
  };

  return (
    <div className="w-full bg-background">
      <GrowthHeroSection {...heroData} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/growth-hero-section.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Prop definition for the component
interface GrowthHeroSectionProps {
  /** The main title, can include <br /> for line breaks */
  title: React.ReactNode;
  /** The first paragraph of description text */
  description1: string;
  /** The second paragraph of description text */
  description2: string;
  /** An array of 4 image source URLs for the growth animation */
  images: [string, string, string, string];
  /** Call-to-action details */
  cta: {
    text: string;
    href: string;
  };
  /** Optional brand name to display at the top */
  brandName?: string;
  /** Optional className to override styles */
  className?: string;
}

/**
 * A responsive hero section with an animated image gallery.
 * Uses shadcn's theme variables for light/dark mode support.
 */
export const GrowthHeroSection = ({
  title,
  description1,
  description2,
  images,
  cta,
  brandName,
  className,
}: GrowthHeroSectionProps) => {

  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for each individual item (image, text)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className={cn(
        "w-full bg-background text-foreground antialiased",
        className
      )}
    >
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Optional Brand Name */}
        {brandName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 text-lg font-medium tracking-wide text-muted-foreground"
          >
            {brandName}
          </motion.div>
        )}

        {/* Animated Images */}
        <motion.div
          className="mb-8 flex items-end justify-center space-x-4 sm:space-x-6 md:space-x-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="Illustration of a plant growing in four stages"
        >
          {images.map((src, index) => (
            <motion.div key={index} variants={itemVariants}>
              <img
                src={src}
                alt={`Plant growth stage ${index + 1}`}
                className="h-auto max-h-[120px] w-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="mb-6 max-w-3xl text-3xl font-medium tracking-tight text-foreground md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {/* Description Paragraphs */}
        <motion.div
          className="max-w-3xl space-y-4 text-base text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p>{description1}</p>
          <p>{description2}</p>
        </motion.div>

        {/* Call to Action Link */}
        <motion.a
          href={cta.href}
          className="mt-12 text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          aria-label={cta.text}
        >
          {cta.text}
        </motion.a>
      </div>
    </section>
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
