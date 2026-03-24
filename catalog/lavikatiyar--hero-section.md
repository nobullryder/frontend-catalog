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
hero-section.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility for classnames
import { Button } from '@/components/ui/button'; // Assuming shadcn Button component

// Define the props for the component
interface FinancialHeroProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl1: string;
  imageUrl2: string;
  className?: string;
}

// Reusable animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const cardsVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.3,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

/**
 * A responsive hero section component with animated text and card images.
 */
export const FinancialHero = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl1,
  imageUrl2,
  className,
}: FinancialHeroProps) => {
  // Inline style for the grid background to easily use CSS variables
  const gridBackgroundStyle = {
    backgroundImage:
      'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)',
    backgroundSize: '3rem 3rem',
  };

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-background text-foreground',
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={gridBackgroundStyle}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <motion.div
        className="relative container mx-auto flex min-h-[80vh] items-center justify-between px-6 py-20 lg:flex-row flex-col gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left: Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
          <motion.h1
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-muted-foreground"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <a href={buttonLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 text-base">
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Right: Card Images */}
        <motion.div
          className="relative lg:w-1/2 h-full w-full flex items-center justify-center"
          variants={cardsVariants}
        >
          {/* Back Card */}
          <motion.img
            src={imageUrl2}
            alt="Financial Card Back"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
            className="absolute h-48 md:h-80 rounded-2xl shadow-2xl object-cover transform rotate-[-6deg] translate-x-24"
          />
          {/* Front Card */}
          <motion.img
            src={imageUrl1}
            alt="Financial Card Front"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: 5, transition: { duration: 0.3 } }}
            className="absolute h-48 md:h-80 rounded-2xl shadow-2xl object-cover transform rotate-[6deg] -translate-x-16"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

code.demo.1760260926492.tsx
import React from 'react';
import { FinancialHero } from '@/components/ui/hero-section'; // Adjust the import path as needed

// Demo component to showcase the FinancialHero
const FinancialHeroDemo = () => {
  return (
    <div className="w-full bg-background">
      <FinancialHero
        title={
          <>
            Ready to Transform Your <br />
            <span className="text-primary">Management?</span>
          </>
        }
        description="Experience the future of finance with our cutting-edge SaaS platform. Start optimizing your financial operations today!"
        buttonText="Download app"
        buttonLink="#"
        imageUrl1="https://images.unsplash.com/photo-1579965342575-16428a7c8881?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900?q=80&w=1974&auto=format&fit=crop"
        imageUrl2="https://plus.unsplash.com/premium_photo-1664013263421-91e3a8101259?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900?q=80&w=2070&auto=format&fit=crop"
      />
    </div>
  );
};

export default FinancialHeroDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-section.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a `cn` utility for classnames
import { Button } from '@/components/ui/button'; // Assuming shadcn Button component

// Define the props for the component
interface FinancialHeroProps {
  title: React.ReactNode;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl1: string;
  imageUrl2: string;
  className?: string;
}

// Reusable animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const cardsVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.3,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

/**
 * A responsive hero section component with animated text and card images.
 */
export const FinancialHero = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl1,
  imageUrl2,
  className,
}: FinancialHeroProps) => {
  // Inline style for the grid background to easily use CSS variables
  const gridBackgroundStyle = {
    backgroundImage:
      'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)',
    backgroundSize: '3rem 3rem',
  };

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-background text-foreground',
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={gridBackgroundStyle}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <motion.div
        className="relative container mx-auto flex min-h-[80vh] items-center justify-between px-6 py-20 lg:flex-row flex-col gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left: Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
          <motion.h1
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-muted-foreground"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <a href={buttonLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 text-base">
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Right: Card Images */}
        <motion.div
          className="relative lg:w-1/2 h-full w-full flex items-center justify-center"
          variants={cardsVariants}
        >
          {/* Back Card */}
          <motion.img
            src={imageUrl2}
            alt="Financial Card Back"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: -5, transition: { duration: 0.3 } }}
            className="absolute h-48 md:h-80 rounded-2xl shadow-2xl object-cover transform rotate-[-6deg] translate-x-24"
          />
          {/* Front Card */}
          <motion.img
            src={imageUrl1}
            alt="Financial Card Front"
            variants={cardItemVariants}
            whileHover={{ y: -10, rotate: 5, transition: { duration: 0.3 } }}
            className="absolute h-48 md:h-80 rounded-2xl shadow-2xl object-cover transform rotate-[6deg] -translate-x-16"
          />
        </motion.div>
      </motion.div>
    </section>
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
