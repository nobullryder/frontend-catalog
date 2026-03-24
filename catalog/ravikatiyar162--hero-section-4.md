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
hero-section-4.tsx
// components/ui/hero-section.tsx

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component

// Props interface for type safety
interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  imageUrl: string;
}

// Animation variants for the container to orchestrate staggered animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Animation variants for child elements (text and buttons)
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      imageUrl,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />

        {/* Optional: Add a subtle overlay for better text readability */}
        <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />

        {/* Content Container */}
        <motion.div
          className="z-10 flex max-w-4xl flex-col items-center justify-center text-center text-primary-foreground"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Title */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 md:text-xl"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          {/* Animated Button Group */}
          <motion.div className="mt-10 flex items-center gap-x-6" variants={itemVariants}>
            <Button asChild size="lg">
              <a href={primaryButtonHref}>{primaryButtonText}</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={secondaryButtonHref}>{secondaryButtonText}</a>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };

code.demo.1758031716034.tsx
// demo.tsx

import { HeroSection } from "@/components/ui/hero-section-4"; // Adjust the import path

const HeroDemo = () => {
  return (
    <HeroSection
      title="Let's connect and collaborate"
      subtitle="Reach out today to discuss how we can elevate your online presence and drive results."
      primaryButtonText="Learn More"
      primaryButtonHref="#learn-more"
      secondaryButtonText="Sign Up"
      secondaryButtonHref="#signup"
      imageUrl="https://plus.unsplash.com/premium_photo-1707761862412-defd8b0b6d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDgzfHx8ZW58MHx8fHx8?q=80&w=2574&auto=format&fit=crop"
    />
  );
};

export default HeroDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-section-4.tsx
// components/ui/hero-section.tsx

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component

// Props interface for type safety
interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  imageUrl: string;
}

// Animation variants for the container to orchestrate staggered animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Animation variants for child elements (text and buttons)
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      imageUrl,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />

        {/* Optional: Add a subtle overlay for better text readability */}
        <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />

        {/* Content Container */}
        <motion.div
          className="z-10 flex max-w-4xl flex-col items-center justify-center text-center text-primary-foreground"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Title */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 md:text-xl"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          {/* Animated Button Group */}
          <motion.div className="mt-10 flex items-center gap-x-6" variants={itemVariants}>
            <Button asChild size="lg">
              <a href={primaryButtonHref}>{primaryButtonText}</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={secondaryButtonHref}>{secondaryButtonText}</a>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
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
