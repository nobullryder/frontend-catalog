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
animated-feature-card.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming a 'cn' utility from shadcn

// Props interface for type-safety and reusability
interface AnimatedFeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  featureNumber: string;
  handle: string;
  className?: string;
}

/**
 * A reusable card component for showcasing features with an animation effect.
 * It's designed to be responsive and theme-adaptive using shadcn's CSS variables.
 */
export const AnimatedFeatureCard = ({
  title,
  description,
  imageSrc,
  featureNumber,
  handle,
  className,
}: AnimatedFeatureCardProps) => {
  // Animation variants for framer-motion
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-card p-6 shadow-sm',
        className
      )}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Top section: Title */}
      <div className="mb-6 rounded-lg bg-background/50 p-3 text-center text-sm text-card-foreground">
        <p>{title}</p>
      </div>

      {/* Middle section: Image */}
      <div className="flex flex-grow items-center justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="h-auto w-full max-w-[250px] object-contain"
        />
      </div>

      {/* Bottom section: Description and metadata */}
      <div className="mt-6 flex flex-col items-center text-center">
        <p className="text-lg font-medium text-foreground">{description}</p>
      </div>

      <div className="mt-8 flex items-center justify-between text-muted-foreground">
        <span className="text-sm font-mono">{featureNumber}</span>
        <span className="text-sm font-medium">{handle}</span>
      </div>
    </motion.div>
  );
};

code.demo.1759047169404.tsx
import React from 'react';
import { AnimatedFeatureCard } from '@/components/ui/animated-feature-card'; // Adjust the import path

/**
 * A demo component to showcase the AnimatedFeatureCard.
 */
const FeatureCardDemo = () => {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <AnimatedFeatureCard
        title="Generate a skeuomorphic isomorphic 3D icon of a modern coffee maker."
        description="Icons can be easily generated using AI. This lowers the barrier of entry."
        // A placeholder image that matches the style. Replace with your actual image URL.
        imageSrc="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-u1weJfn0wFuPr9VJ0wUijZy2DVdtph.png&w=320&q=75"
        featureNumber="05"
        handle="@ravikatiyar"
      />
    </div>
  );
};

export default FeatureCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-feature-card.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming a 'cn' utility from shadcn

// Props interface for type-safety and reusability
interface AnimatedFeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  featureNumber: string;
  handle: string;
  className?: string;
}

/**
 * A reusable card component for showcasing features with an animation effect.
 * It's designed to be responsive and theme-adaptive using shadcn's CSS variables.
 */
export const AnimatedFeatureCard = ({
  title,
  description,
  imageSrc,
  featureNumber,
  handle,
  className,
}: AnimatedFeatureCardProps) => {
  // Animation variants for framer-motion
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-card p-6 shadow-sm',
        className
      )}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Top section: Title */}
      <div className="mb-6 rounded-lg bg-background/50 p-3 text-center text-sm text-card-foreground">
        <p>{title}</p>
      </div>

      {/* Middle section: Image */}
      <div className="flex flex-grow items-center justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="h-auto w-full max-w-[250px] object-contain"
        />
      </div>

      {/* Bottom section: Description and metadata */}
      <div className="mt-6 flex flex-col items-center text-center">
        <p className="text-lg font-medium text-foreground">{description}</p>
      </div>

      <div className="mt-8 flex items-center justify-between text-muted-foreground">
        <span className="text-sm font-mono">{featureNumber}</span>
        <span className="text-sm font-medium">{handle}</span>
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
