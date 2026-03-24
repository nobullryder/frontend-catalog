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
feature-section.tsx
import * as React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Type definitions for the component props
interface FeatureItem {
  text: string;
  href?: string;
}

interface FeatureCategory {
  icon: React.ReactNode;
  title: string;
  items: FeatureItem[];
}

export interface FeatureGridProps {
  title: React.ReactNode;
  subtitle: string;
  illustrationSrc: string;
  illustrationAlt?: string;
  categories: FeatureCategory[];
  buttonText: string;
  buttonHref: string;
  className?: string;
}

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

/**
 * A responsive grid component to showcase features or categories with animations.
 */
export const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
  (
    {
      title,
      subtitle,
      illustrationSrc,
      illustrationAlt = 'Feature illustration',
      categories,
      buttonText,
      buttonHref,
      className,
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn('w-full max-w-6xl mx-auto py-12 md:py-20 px-4', className)}
      >
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {subtitle}
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={illustrationSrc}
              alt={illustrationAlt}
              className="w-48 h-auto"
            />
          </div>
        </div>

        {/* Grid Container */}
        <motion.div
          className="rounded-xl border bg-card text-card-foreground p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-start"
              >
                <div className="mb-3 text-pink-500">{category.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <ul className="space-y-1.5 text-muted-foreground">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="hover:text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12"
          >
            <Button asChild size="lg" className="px-6">
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  },
);

FeatureGrid.displayName = 'FeatureGrid';

code.demo.1759488637337.tsx
import React from 'react';
import {
  Palette,
  FlaskConical,
  Megaphone,
  Users,
  Building,
  User,
} from 'lucide-react';
import { FeatureGrid } from '@/components/ui/feature-section'; // Adjust import path as needed

// Demo data for the categories
const featureCategories = [
  {
    icon: <Palette size={24} />,
    title: 'Creators',
    items: [
      { text: 'Sell products online' },
      { text: 'Grow your newsletter' },
      { text: 'Receive contact form messages' },
    ],
  },
  {
    icon: <FlaskConical size={24} />,
    title: 'Product',
    items: [
      { text: 'Gather audience feedback' },
      { text: 'Receive feature requests' },
      { text: 'Conduct user research', href: '#' },
    ],
  },
  {
    icon: <Megaphone size={24} />,
    title: 'Marketing',
    items: [
      { text: 'Generate leads' },
      { text: 'Register users' },
      { text: 'Measure customer satisfaction' },
    ],
  },
  {
    icon: <Users size={24} />,
    title: 'HR',
    items: [
      { text: 'Evaluate employee engagement' },
      { text: 'Receive job applications' },
      { text: 'Create exit surveys' },
    ],
  },
  {
    icon: <Building size={24} />,
    title: 'Office',
    items: [
      { text: 'Organize team events' },
      { text: 'Receive help desk tickets' },
      { text: 'Collect internal suggestions' },
    ],
  },
  {
    icon: <User size={24} />,
    title: 'Personal',
    items: [
      { text: 'Create an online quiz' },
      { text: 'Send an RSVP form' },
      { text: 'Organize a volunteer signup' },
    ],
  },
];

const FeatureGridDemo = () => {
  return (
    <div className="bg-background w-full">
      <FeatureGrid
        title={
          <>
            Designed{' '}
            <span className="relative inline-block">
              for you
              <svg
                viewBox="0 0 120 6"
                className="absolute left-0 bottom-0 -mb-1 w-full"
                aria-hidden="true"
              >
                <path
                  d="M1 4.5C25.46 1.63 78.43 1.39 119 4.5"
                  stroke="#f472b6" // pink-400
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
          </>
        }
        subtitle="Start from scratch or explore templates created by our community."
        illustrationSrc="https://tally.so/images/demo/v2/designed-for-you.png" // Replace with your image link
        categories={featureCategories}
        buttonText="Browse templates"
        buttonHref="#"
      />
    </div>
  );
};

export default FeatureGridDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-section.tsx
import * as React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Type definitions for the component props
interface FeatureItem {
  text: string;
  href?: string;
}

interface FeatureCategory {
  icon: React.ReactNode;
  title: string;
  items: FeatureItem[];
}

export interface FeatureGridProps {
  title: React.ReactNode;
  subtitle: string;
  illustrationSrc: string;
  illustrationAlt?: string;
  categories: FeatureCategory[];
  buttonText: string;
  buttonHref: string;
  className?: string;
}

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

/**
 * A responsive grid component to showcase features or categories with animations.
 */
export const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
  (
    {
      title,
      subtitle,
      illustrationSrc,
      illustrationAlt = 'Feature illustration',
      categories,
      buttonText,
      buttonHref,
      className,
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn('w-full max-w-6xl mx-auto py-12 md:py-20 px-4', className)}
      >
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {subtitle}
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={illustrationSrc}
              alt={illustrationAlt}
              className="w-48 h-auto"
            />
          </div>
        </div>

        {/* Grid Container */}
        <motion.div
          className="rounded-xl border bg-card text-card-foreground p-6 md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-start"
              >
                <div className="mb-3 text-pink-500">{category.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <ul className="space-y-1.5 text-muted-foreground">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="hover:text-primary hover:underline underline-offset-2 transition-colors"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12"
          >
            <Button asChild size="lg" className="px-6">
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  },
);

FeatureGrid.displayName = 'FeatureGrid';
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
