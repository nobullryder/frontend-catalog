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
price.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utility for classnames
import { Button } from '@/components/ui/button'; // Assuming shadcn button

// --- ICONS ---
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn('w-5 h-5', className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

// --- CVA VARIANTS FOR THE CARD ---
const cardVariants = cva(
  'relative flex flex-col p-8 rounded-2xl border shadow-sm transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card border-border',
        popular:
          'bg-card border-primary shadow-lg shadow-primary/10 -translate-y-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// --- PROPS INTERFACE ---
export interface PricingCardProps extends VariantProps<typeof cardVariants> {
  className?: string;
  planName: string;
  description: string;
  price: number;
  billingCycle: string;
  features: string[];
  buttonText: string;
  isCurrentPlan?: boolean;
  icon?: React.ReactNode;
}

// --- COMPONENT DEFINITION ---
const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      variant,
      planName,
      description,
      price,
      billingCycle,
      features,
      buttonText,
      isCurrentPlan = false,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        {/* Popular Badge */}
        {variant === 'popular' && (
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
            POPULAR
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          {icon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-card-foreground">{planName}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="my-6">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-muted-foreground">{billingCycle}</span>
        </div>

        {/* Button */}
        <Button
          className="w-full"
          size="lg"
          variant={isCurrentPlan ? 'secondary' : variant === 'popular' ? 'default' : 'outline'}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Current plan' : buttonText}
        </Button>

        {/* Features */}
        <ul className="mt-8 space-y-4 text-sm text-muted-foreground flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  }
);

PricingCard.displayName = 'PricingCard';

export { PricingCard };

code.demo.1758032740310.tsx
'use client';

import { PricingCard } from '@/components/ui/price';
import { motion } from 'framer-motion';

// --- ICONS for the demo ---
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56v4.82a6 6 0 01-1.83-1.01l-4.01-4.01a6 6 0 01-1.01-1.83H7.5a6 6 0 017.38-5.84zM10.5 14.5L14 11m-3.5 3.5v-4.5h4.5" />
  </svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375M9 12h6.375m-6.375 5.25h6.375M5.25 6.75h.008v.008H5.25V6.75zm.008 5.25h.008v.008H5.25v-.008zm0 5.25h.008v.008H5.25v-.008zm13.5-5.25h.008v.008h-.008v-.008zm0 5.25h.008v.008h-.008v-.008zM12 21V3" />
  </svg>
);


// --- FADE-IN ANIMATION VARIANTS ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Stagger the animation of children
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
      ease: 'easeOut',
    },
  },
};

export default function PricingPageDemo() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Business Plan --- */}
        <motion.div variants={itemVariants}>
          <PricingCard
            planName="Business"
            description="For solo entrepreneurs"
            price={19}
            billingCycle="/month"
            features={[
              '10 inventory locations',
              '24/7 chat support',
              'Localized global selling (3 markets)',
              'POS Lite',
            ]}
            buttonText="Get Business"
            icon={<UserIcon />}
            isCurrentPlan={true}
          />
        </motion.div>

        {/* --- Advanced Plan (Popular) --- */}
        <motion.div variants={itemVariants}>
          <PricingCard
            variant="popular"
            planName="Advanced"
            description="As your business scales"
            price={299}
            billingCycle="/month"
            features={[
              'Custom reports and analytics',
              'Enhanced 24/7 chat support',
              'Localized global selling (3 markets)',
              '15 additional staff accounts',
              '10x checkout capacity',
            ]}
            buttonText="Get Advanced"
            icon={<RocketIcon />}
          />
        </motion.div>

        {/* --- Plus Plan --- */}
        <motion.div variants={itemVariants}>
          <PricingCard
            planName="Plus"
            description="For more complex businesses"
            price={2300}
            billingCycle="/month"
            features={[
              'Custom reports and analytics',
              '200 inventory locations',
              'Priority 24/7 phone support',
              'Localized global selling (50 markets)',
              'Unlimited staff accounts',
            ]}
            buttonText="Get Plus"
            icon={<BuildingIcon />}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/price.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming you have a utility for classnames
import { Button } from '@/components/ui/button'; // Assuming shadcn button

// --- ICONS ---
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn('w-5 h-5', className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

// --- CVA VARIANTS FOR THE CARD ---
const cardVariants = cva(
  'relative flex flex-col p-8 rounded-2xl border shadow-sm transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card border-border',
        popular:
          'bg-card border-primary shadow-lg shadow-primary/10 -translate-y-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// --- PROPS INTERFACE ---
export interface PricingCardProps extends VariantProps<typeof cardVariants> {
  className?: string;
  planName: string;
  description: string;
  price: number;
  billingCycle: string;
  features: string[];
  buttonText: string;
  isCurrentPlan?: boolean;
  icon?: React.ReactNode;
}

// --- COMPONENT DEFINITION ---
const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      variant,
      planName,
      description,
      price,
      billingCycle,
      features,
      buttonText,
      isCurrentPlan = false,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        {/* Popular Badge */}
        {variant === 'popular' && (
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
            POPULAR
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          {icon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-card-foreground">{planName}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="my-6">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-muted-foreground">{billingCycle}</span>
        </div>

        {/* Button */}
        <Button
          className="w-full"
          size="lg"
          variant={isCurrentPlan ? 'secondary' : variant === 'popular' ? 'default' : 'outline'}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Current plan' : buttonText}
        </Button>

        {/* Features */}
        <ul className="mt-8 space-y-4 text-sm text-muted-foreground flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  }
);

PricingCard.displayName = 'PricingCard';

export { PricingCard };
```

Install NPM dependencies:
```bash
class-variance-authority, framer-motion
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
