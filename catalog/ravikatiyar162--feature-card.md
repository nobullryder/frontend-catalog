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
// components/ui/feature-card.tsx

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the props for the FeatureCard component
interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, title, description, children, ...props }, ref) => {
    
    // Animation variants for framer-motion
    const cardVariants = {
      offscreen: {
        y: 30,
        opacity: 0,
      },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8",
          className
        )}
        {...props}
      >
        <div className="flex-grow">
          {/* Card Header: Title and Description */}
          <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        
        {/* Main Content Area */}
        <div className="mt-6">{children}</div>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export { FeatureCard };

code.demo.1758821186081.tsx
// demo.tsx

import React from "react";
import { FeatureCard } from "@/components/ui/feature-card"; // Adjust the import path

// Helper component for the demo: Progress Item
const SavingsPlanItem = ({
  icon,
  title,
  members,
  progress,
  amount,
  target,
  daysLeft,
}: {
  icon: string;
  title: string;
  members: number;
  progress: number;
  amount: number;
  target: number;
  daysLeft?: number;
}) => (
  <div className="mb-4 flex items-center gap-4 last:mb-0">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
      {/* In a real app, you'd use an Image component */}
      <img src={icon} alt={title} className="h-6 w-6" />
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <p className="font-medium text-card-foreground">{title}</p>
        <p className="text-sm font-semibold text-card-foreground">{progress}%</p>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>${amount.toLocaleString()} of ${target.toLocaleString()}</span>
        {daysLeft && <span>{daysLeft} days left</span>}
        <span>{members} members</span>
      </div>
    </div>
  </div>
);

// The main demo component
const FeatureCardDemo = () => {
  return (
    <div className="w-full max-w-4xl p-4 md:p-8">
      <FeatureCard
        title="Multiple Savings Plan"
        description="Nest offers a variety of savings plans, from Flexible to Target Savings, to make sure you can save for what matters most, your way."
      >
        <div className="flex flex-col space-y-4">
          <SavingsPlanItem
            icon="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-YimA3sxsT00vWqiUyzyLUshxsSZvll.png&w=320&q=75"
            title="Birthday"
            progress={63}
            amount={25200}
            target={40200}
            members={200}
          />
          <SavingsPlanItem
            icon="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-iZKfmUSHuQtDn1W2NBIwoLZ0epsnzZ.png&w=320&q=75"
            title="Graduation"
            progress={63}
            amount={3500}
            target={45000}
            members={200}
          />
          <SavingsPlanItem
            icon="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-CYiGxD8xsd3dQiAxNDGC5vDunvHJ4P.png&w=320&q=75"
            title="NYSC"
            progress={86}
            amount={38000}
            target={42000}
            members={200}
            daysLeft={28}
          />
        </div>
      </FeatureCard>
    </div>
  );
};

export default FeatureCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-card.tsx
// components/ui/feature-card.tsx

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the props for the FeatureCard component
interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, title, description, children, ...props }, ref) => {
    
    // Animation variants for framer-motion
    const cardVariants = {
      offscreen: {
        y: 30,
        opacity: 0,
      },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8",
          className
        )}
        {...props}
      >
        <div className="flex-grow">
          {/* Card Header: Title and Description */}
          <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        
        {/* Main Content Area */}
        <div className="mt-6">{children}</div>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
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
