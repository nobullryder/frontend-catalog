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
onboarding.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, AtSign, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the props interface for type safety and reusability
interface OnboardingCardProps {
  heroImageSrc: string;
  title: string;
  subtitle: string;
  displayName: string;
  onDisplayNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onContinueClick: () => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * A responsive and animated onboarding card component.
 * It follows shadcn/ui theming and best practices.
 */
export const OnboardingCard = React.forwardRef<HTMLDivElement, OnboardingCardProps>(
  ({
    heroImageSrc,
    title,
    subtitle,
    displayName,
    onDisplayNameChange,
    onUploadClick,
    onContinueClick,
    isLoading = false,
    className,
  }, ref) => {

    // CORRECTED: Variants for the parent container to orchestrate animations
    const containerVariants = {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15, // Stagger the animation of children
        },
      },
      exit: { opacity: 0 },
    };

    // CORRECTED: Variants for individual child items to fade in
    const itemVariants = {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
      exit: { opacity: 0, y: 20 },
    };

    return (
      <AnimatePresence>
        <motion.div
          ref={ref}
          className={cn("w-full max-w-md overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg", className)}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Hero Image Section */}
          <motion.img
            src={heroImageSrc}
            alt="Welcome Hero Image"
            className="h-48 w-full object-cover"
            variants={itemVariants}
          />

          <div className="flex flex-col space-y-6 p-6 sm:p-8">
            {/* Header Text */}
            <motion.div variants={itemVariants} className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </motion.div>

            {/* Photo Upload Section */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <UserCircle2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Your Photo</p>
                  <p className="text-xs text-muted-foreground">PNG or JPEG, up to 5MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onUploadClick}>
                <Camera className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </motion.div>

            {/* Display Name Input */}
            <motion.div variants={itemVariants} className="relative flex flex-col space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </label>
              <AtSign className="absolute bottom-2.5 left-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="displayName"
                type="text"
                placeholder="username"
                value={displayName}
                onChange={onDisplayNameChange}
                className="pl-10"
              />
            </motion.div>

            {/* Continue Button */}
            <motion.div variants={itemVariants}>
              <Button
                className="w-full"
                size="lg"
                onClick={onContinueClick}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

OnboardingCard.displayName = "OnboardingCard";

code.demo.1759301421272.tsx
import * as React from "react";
import { OnboardingCard } from "@/components/ui/onboarding";

/**
 * A demo component to showcase the OnboardingCard.
 */
export default function OnboardingCardDemo() {
  const [displayName, setDisplayName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Handler for the display name input change
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic validation: allow only alphanumeric characters and underscores
    const validUsername = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
    setDisplayName(validUsername);
  };

  // Placeholder function for upload button click
  const handleUploadClick = () => {
    alert("Upload button clicked!");
  };

  // Placeholder function for continue button click
  const handleContinueClick = () => {
    if (!displayName) {
      alert("Please enter a display name.");
      return;
    }
    setIsLoading(true);
    console.log("Continuing with display name:", displayName);
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome, ${displayName}!`);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <OnboardingCard
        heroImageSrc="https://plus.unsplash.com/premium_photo-1695716578059-36842e9c045d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlYWNvY2slMjBmZWF0aGVyfGVufDB8fDB8fHww?q=80&w=2864&auto=format&fit=crop"
        title="Welcome to Genesis"
        subtitle="Your first journey here!"
        displayName={displayName}
        onDisplayNameChange={handleDisplayNameChange}
        onUploadClick={handleUploadClick}
        onContinueClick={handleContinueClick}
        isLoading={isLoading}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/onboarding.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, AtSign, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the props interface for type safety and reusability
interface OnboardingCardProps {
  heroImageSrc: string;
  title: string;
  subtitle: string;
  displayName: string;
  onDisplayNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onContinueClick: () => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * A responsive and animated onboarding card component.
 * It follows shadcn/ui theming and best practices.
 */
export const OnboardingCard = React.forwardRef<HTMLDivElement, OnboardingCardProps>(
  ({
    heroImageSrc,
    title,
    subtitle,
    displayName,
    onDisplayNameChange,
    onUploadClick,
    onContinueClick,
    isLoading = false,
    className,
  }, ref) => {

    // CORRECTED: Variants for the parent container to orchestrate animations
    const containerVariants = {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15, // Stagger the animation of children
        },
      },
      exit: { opacity: 0 },
    };

    // CORRECTED: Variants for individual child items to fade in
    const itemVariants = {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
      exit: { opacity: 0, y: 20 },
    };

    return (
      <AnimatePresence>
        <motion.div
          ref={ref}
          className={cn("w-full max-w-md overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg", className)}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Hero Image Section */}
          <motion.img
            src={heroImageSrc}
            alt="Welcome Hero Image"
            className="h-48 w-full object-cover"
            variants={itemVariants}
          />

          <div className="flex flex-col space-y-6 p-6 sm:p-8">
            {/* Header Text */}
            <motion.div variants={itemVariants} className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </motion.div>

            {/* Photo Upload Section */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <UserCircle2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Your Photo</p>
                  <p className="text-xs text-muted-foreground">PNG or JPEG, up to 5MB</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onUploadClick}>
                <Camera className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </motion.div>

            {/* Display Name Input */}
            <motion.div variants={itemVariants} className="relative flex flex-col space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </label>
              <AtSign className="absolute bottom-2.5 left-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="displayName"
                type="text"
                placeholder="username"
                value={displayName}
                onChange={onDisplayNameChange}
                className="pl-10"
              />
            </motion.div>

            {/* Continue Button */}
            <motion.div variants={itemVariants}>
              <Button
                className="w-full"
                size="lg"
                onClick={onContinueClick}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

OnboardingCard.displayName = "OnboardingCard";
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
