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
feature-card.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

/**
 * Props for the FeatureCard component.
 * @param {React.ReactNode} icon - The icon element to display at the top of the card.
 * @param {string} title - The title or heading of the feature.
 * @param {string} description - The descriptive text for the feature.
 * @param {string} [className] - Optional additional class names for custom styling.
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * A responsive and theme-adaptive card component to highlight features.
 * Built with shadcn/ui principles.
 */
export const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground p-8 rounded-xl border flex flex-col items-center text-center",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:-translate-y-2",
        className
      )}
    >
      {/* Icon container */}
      <div className="mb-6 bg-secondary p-4 rounded-full">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

code.demo.1758911130633.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/feature-card'; // Adjust the import path as needed

// Data for the feature cards
const features = [
  {
    icon: (
      <img 
        src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-XimLfa9nmGlBpUT8xFkxuwQFz2hhXO.png&w=320&q=75" 
        alt="Experience Icon" 
        className="h-12 w-12"
      />
    ),
    title: "Help us to Improve",
    description: "In order to provide a better service we would like to collect your data for research purposes, you can decline it anytime!",
  },
  {
    icon: (
       <img 
        src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-CK4odMSKWdmIj0ueBtNq9HOZR6Fbgv.png&w=320&q=75" 
        alt="Notification Icon" 
        className="h-12 w-12"
      />
    ),
    title: "Get Notified",
    description: "Enhance your user experience by ensuring a seamless flow through the activation of notifications.",
  },
  {
    icon: (
       <img 
        src="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-JgVvskF7j2zQ9LmIWmnCHHInmpJcTJ.png&w=320&q=75" 
        alt="Location Icon" 
        className="h-12 w-12"
      />
    ),
    title: "Allow Location Access",
    description: "Your company needs it and Personalised recommendations of service providers.",
  },
];

// Animation variants for the container and items
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      // CORRECTED: Replaced the invalid cubic-bezier array with a standard easing function.
      ease: "easeOut", 
    },
  },
};

/**
 * A demo component to display a grid of animated FeatureCards.
 */
const FeatureCardDemo = () => {
  return (
    <div className="w-full bg-background text-foreground p-8 md:p-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeatureCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-card.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

/**
 * Props for the FeatureCard component.
 * @param {React.ReactNode} icon - The icon element to display at the top of the card.
 * @param {string} title - The title or heading of the feature.
 * @param {string} description - The descriptive text for the feature.
 * @param {string} [className] - Optional additional class names for custom styling.
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * A responsive and theme-adaptive card component to highlight features.
 * Built with shadcn/ui principles.
 */
export const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground p-8 rounded-xl border flex flex-col items-center text-center",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:-translate-y-2",
        className
      )}
    >
      {/* Icon container */}
      <div className="mb-6 bg-secondary p-4 rounded-full">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};
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
