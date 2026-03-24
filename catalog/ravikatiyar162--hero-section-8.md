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
hero-section-8.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn button is in this path

// Define the props for the component
interface FormBuilderHeroProps {
  /** The source URL for the main illustration. */
  illustrationSrc: string;
  /** The alt text for the illustration. */
  illustrationAlt?: string;
  /** The main heading text. */
  title: React.ReactNode;
  /** The descriptive paragraph below the title. */
  description: string;
  /** The text to display on the call-to-action button. */
  buttonText: string;
  /** The URL the button should link to. */
  buttonHref?: string;
}

/**
 * A responsive hero section component with animations.
 */
export const FormBuilderHero: React.FC<FormBuilderHeroProps> = ({
  illustrationSrc,
  illustrationAlt = "Hero Illustration",
  title,
  description,
  buttonText,
  buttonHref = "#",
}) => {
  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variant for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex w-full items-center justify-center bg-background px-4 py-20 md:py-32">
      <motion.div
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {/* Illustration */}
        <motion.div variants={itemVariants} className="mb-8">
          <img
            src={illustrationSrc}
            alt={illustrationAlt}
            className="h-auto w-64 select-none"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-lg text-base text-muted-foreground md:text-lg"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div variants={itemVariants}>
          <Button asChild size="lg">
            <a href={buttonHref}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

code.demo.1759488919081.tsx
import { FormBuilderHero } from "@/components/ui/hero-section-8"; // Adjust the import path

export default function HeroDemo() {
  return (
    <FormBuilderHero
      illustrationSrc="https://tally.so/images/demo/v2/roll-up-sleeves.png"
      illustrationAlt="A creative sketch of a person using a computer"
      title="Build stunning forms for free"
      description="It's as simple as one-two-three, and guess what? You don't even need an account to try it out!"
      buttonText="Create a free form"
      buttonHref="#"
    />
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-section-8.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn button is in this path

// Define the props for the component
interface FormBuilderHeroProps {
  /** The source URL for the main illustration. */
  illustrationSrc: string;
  /** The alt text for the illustration. */
  illustrationAlt?: string;
  /** The main heading text. */
  title: React.ReactNode;
  /** The descriptive paragraph below the title. */
  description: string;
  /** The text to display on the call-to-action button. */
  buttonText: string;
  /** The URL the button should link to. */
  buttonHref?: string;
}

/**
 * A responsive hero section component with animations.
 */
export const FormBuilderHero: React.FC<FormBuilderHeroProps> = ({
  illustrationSrc,
  illustrationAlt = "Hero Illustration",
  title,
  description,
  buttonText,
  buttonHref = "#",
}) => {
  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variant for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex w-full items-center justify-center bg-background px-4 py-20 md:py-32">
      <motion.div
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {/* Illustration */}
        <motion.div variants={itemVariants} className="mb-8">
          <img
            src={illustrationSrc}
            alt={illustrationAlt}
            className="h-auto w-64 select-none"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-lg text-base text-muted-foreground md:text-lg"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div variants={itemVariants}>
          <Button asChild size="lg">
            <a href={buttonHref}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
