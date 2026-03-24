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
multi-step-form.tsx
// components/ui/multi-step-form.tsx
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

const multiStepFormVariants = cva(
  "flex flex-col",
  {
    variants: {
      size: {
        default: "md:w-[700px]",
        sm: "md:w-[550px]",
        lg: "md:w-[850px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface MultiStepFormProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof multiStepFormVariants> {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  footerContent?: React.ReactNode;
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({
    className,
    size,
    currentStep,
    totalSteps,
    title,
    description,
    onBack,
    onNext,
    onClose,
    backButtonText = "Back",
    nextButtonText = "Next Step",
    footerContent,
    children,
    ...props
  }, ref) => {
    const progress = Math.round((currentStep / totalSteps) * 100);

    const variants = {
      hidden: { opacity: 0, x: 100 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    };

    return (
      <Card ref={ref} className={cn(multiStepFormVariants({ size }), className)} {...props}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{title}</CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
          <div className="flex items-center gap-4 pt-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {currentStep}/{totalSteps} completed
            </p>
          </div>
        </CardHeader>

        <CardContent className="min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>{footerContent}</div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={onBack}>
                {backButtonText}
              </Button>
            )}
            <Button onClick={onNext}>
              {nextButtonText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };

code.demo.1759059265420.tsx
// demo.tsx
"use client";

import * as React from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Globe,
  Info,
} from "lucide-react";

import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipIcon = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const VignettePurchaseFormDemo = () => {
  // Demo state for a 3-step form, currently on step 2
  const [currentStep, setCurrentStep] = React.useState(2);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <MultiStepForm
        currentStep={currentStep}
        totalSteps={totalSteps}
        title="Find Vignette"
        description="Make your Vignet purchase easily by completing the necessary steps."
        onBack={handleBack}
        onNext={handleNext}
        onClose={() => alert("Close button clicked!")}
        footerContent={
          <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Need Help? <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      >
        {/* Render content based on the current step */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Country Selection */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="country">In which country is your vehicle registered</Label>
                  <TooltipIcon text="Select the country where your vehicle is officially registered." />
                </div>
                <Select>
                  <SelectTrigger id="country">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Select a country..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="gb">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <TooltipIcon text="The date your vignette should become valid." />
                </div>
                <Input id="start-date" placeholder="DD / MM / YYYY" />
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="reg-number">Registration Number</Label>
                   <TooltipIcon text="Enter your vehicle's registration number exactly as it appears on your documents." />
                </div>
                <Input id="reg-number" placeholder="Enter Registration Number" />
              </div>

              {/* Confirm Registration Number */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="confirm-reg-number">Enter registration number again</Label>
                   <TooltipIcon text="Please re-enter the registration number to avoid any mistakes." />
                </div>
                <Input id="confirm-reg-number" placeholder="Confirm number" />
              </div>
            </div>

            {/* Alert Message */}
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please make sure to select the start date before proceeding to the next step.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </MultiStepForm>
    </div>
  );
};

export default VignettePurchaseFormDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/multi-step-form.tsx
// components/ui/multi-step-form.tsx
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

const multiStepFormVariants = cva(
  "flex flex-col",
  {
    variants: {
      size: {
        default: "md:w-[700px]",
        sm: "md:w-[550px]",
        lg: "md:w-[850px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface MultiStepFormProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof multiStepFormVariants> {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  footerContent?: React.ReactNode;
}

const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({
    className,
    size,
    currentStep,
    totalSteps,
    title,
    description,
    onBack,
    onNext,
    onClose,
    backButtonText = "Back",
    nextButtonText = "Next Step",
    footerContent,
    children,
    ...props
  }, ref) => {
    const progress = Math.round((currentStep / totalSteps) * 100);

    const variants = {
      hidden: { opacity: 0, x: 100 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    };

    return (
      <Card ref={ref} className={cn(multiStepFormVariants({ size }), className)} {...props}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{title}</CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
          <div className="flex items-center gap-4 pt-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {currentStep}/{totalSteps} completed
            </p>
          </div>
        </CardHeader>

        <CardContent className="min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>{footerContent}</div>
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={onBack}>
                {backButtonText}
              </Button>
            )}
            <Button onClick={onNext}>
              {nextButtonText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";

export { MultiStepForm };
```

Install NPM dependencies:
```bash
lucide-react, framer-motion, class-variance-authority
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
