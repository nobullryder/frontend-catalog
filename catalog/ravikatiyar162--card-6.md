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
card-6.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WaitlistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  footerContent?: React.ReactNode;
}

const WaitlistCard = React.forwardRef<HTMLDivElement, WaitlistCardProps>(
  ({ className, icon, title, description, footerContent, ...props }, ref) => {
    const titleId = React.useId();

    // Animation variants for the container to stagger children
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15, // Delay between each child animation
        },
      },
    };

    // Animation variants for each child item
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        ref={ref}
      >
        <Card
          className={cn("w-full max-w-md text-center", className)}
          role="region"
          aria-labelledby={titleId}
          {...props}
        >
          <CardHeader className="items-center">
            <motion.div variants={itemVariants}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle id={titleId}>{title}</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.p variants={itemVariants}>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </motion.p>
          </CardContent>
          {footerContent && (
            <CardFooter className="flex justify-center pt-4">
              <motion.div variants={itemVariants}>{footerContent}</motion.div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    );
  }
);

WaitlistCard.displayName = "WaitlistCard";

export { WaitlistCard };

code.demo.1757672295194.tsx
"use client"; // Required for useState and event handlers

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { MailCheck } from "lucide-react";
import { WaitlistCard } from "@/components/ui/card-6"; // Adjust the import path
import { Button } from "@/components/ui/button";

/**
 * An interactive demo to showcase the animated WaitlistCard.
 */
export default function WaitlistCardDemo() {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background p-4" style={{ minHeight: '450px' }}>
      <div className="absolute top-5">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide" : "Show"} Card
        </Button>
      </div>

      <AnimatePresence>
        {isVisible && (
          <WaitlistCard
            icon={<MailCheck className="h-8 w-8" />}
            title="You're on the waitlist!"
            description="Thanks for registering! We've received your information and will notify you via email as soon as a spot becomes available."
            footerContent={
              <p className="text-sm text-muted-foreground">
                Questions?{" "}
                <a
                  href="#"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Contact Support
                </a>
              </p>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-6.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WaitlistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  footerContent?: React.ReactNode;
}

const WaitlistCard = React.forwardRef<HTMLDivElement, WaitlistCardProps>(
  ({ className, icon, title, description, footerContent, ...props }, ref) => {
    const titleId = React.useId();

    // Animation variants for the container to stagger children
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15, // Delay between each child animation
        },
      },
    };

    // Animation variants for each child item
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        ref={ref}
      >
        <Card
          className={cn("w-full max-w-md text-center", className)}
          role="region"
          aria-labelledby={titleId}
          {...props}
        >
          <CardHeader className="items-center">
            <motion.div variants={itemVariants}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle id={titleId}>{title}</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.p variants={itemVariants}>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </motion.p>
          </CardContent>
          {footerContent && (
            <CardFooter className="flex justify-center pt-4">
              <motion.div variants={itemVariants}>{footerContent}</motion.div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    );
  }
);

WaitlistCard.displayName = "WaitlistCard";

export { WaitlistCard };
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
