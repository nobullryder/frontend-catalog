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
onboarding-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your shadcn/ui utility for classnames
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Assuming you have shadcn/ui Card

// Define the props for the component
interface ProductOnboardingCardProps {
  mainIcon: React.ReactNode;
  title: string;
  description: string;
  cardIcon: React.ReactNode;
  cardHeaderLabel: string;
  cardTitle: string;
  cardDescription: string;
  buttonText: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * A visually engaging card for product feature definition or onboarding steps.
 * Features a staggered entrance animation for all its elements.
 */
export const ProductOnboardingCard = React.forwardRef<
  HTMLDivElement,
  ProductOnboardingCardProps
>(
  (
    {
      mainIcon,
      title,
      description,
      cardIcon,
      cardHeaderLabel,
      cardTitle,
      cardDescription,
      buttonText,
      onButtonClick,
      className,
    },
    ref
  ) => {
    // Animation variants for the container and its children
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-6 text-center max-w-md w-full p-4",
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Icon with Gradient */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 p-3 shadow-lg"
        >
          {mainIcon}
        </motion.div>

        {/* Main Title */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-foreground"
        >
          {title}
        </motion.h2>

        {/* Main Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground max-w-xs"
        >
          {description}
        </motion.p>

        {/* Inner Card */}
        <motion.div variants={itemVariants} className="w-full">
          <Card className="text-left shadow-sm">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              {cardIcon}
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                {cardHeaderLabel}
              </span>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-card-foreground">
                {cardTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cardDescription}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Button */}
        <motion.button
          variants={itemVariants}
          onClick={onButtonClick}
          className="w-full max-w-xs rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-background"
        >
          {buttonText}
        </motion.button>
      </motion.div>
    );
  }
);

ProductOnboardingCard.displayName = "ProductOnboardingCard";

code.demo.1758823037119.tsx
import { ProductOnboardingCard } from "@/components/ui/onboarding-card";
import { Menu, FileText } from "lucide-react"; // Using lucide-react for icons

const ProductOnboardingDemo = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <ProductOnboardingCard
        mainIcon={<Menu className="h-7 w-7 text-white" />}
        title="Define your product"
        description="Provide your product name, description, pricing method, and how customers will receive it."
        cardIcon={<FileText className="h-4 w-4 text-muted-foreground" />}
        cardHeaderLabel="Define your product"
        cardTitle="Set name, type, and pricing."
        cardDescription="Add a title, short description, and choose file or link as your delivery method."
        buttonText="Share Product"
        onButtonClick={() => alert("Button clicked!")}
      />
    </div>
  );
};

export default ProductOnboardingDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/onboarding-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Your shadcn/ui utility for classnames
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Assuming you have shadcn/ui Card

// Define the props for the component
interface ProductOnboardingCardProps {
  mainIcon: React.ReactNode;
  title: string;
  description: string;
  cardIcon: React.ReactNode;
  cardHeaderLabel: string;
  cardTitle: string;
  cardDescription: string;
  buttonText: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * A visually engaging card for product feature definition or onboarding steps.
 * Features a staggered entrance animation for all its elements.
 */
export const ProductOnboardingCard = React.forwardRef<
  HTMLDivElement,
  ProductOnboardingCardProps
>(
  (
    {
      mainIcon,
      title,
      description,
      cardIcon,
      cardHeaderLabel,
      cardTitle,
      cardDescription,
      buttonText,
      onButtonClick,
      className,
    },
    ref
  ) => {
    // Animation variants for the container and its children
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-6 text-center max-w-md w-full p-4",
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Icon with Gradient */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 p-3 shadow-lg"
        >
          {mainIcon}
        </motion.div>

        {/* Main Title */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-foreground"
        >
          {title}
        </motion.h2>

        {/* Main Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground max-w-xs"
        >
          {description}
        </motion.p>

        {/* Inner Card */}
        <motion.div variants={itemVariants} className="w-full">
          <Card className="text-left shadow-sm">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              {cardIcon}
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                {cardHeaderLabel}
              </span>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-card-foreground">
                {cardTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cardDescription}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Button */}
        <motion.button
          variants={itemVariants}
          onClick={onButtonClick}
          className="w-full max-w-xs rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-background"
        >
          {buttonText}
        </motion.button>
      </motion.div>
    );
  }
);

ProductOnboardingCard.displayName = "ProductOnboardingCard";
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
