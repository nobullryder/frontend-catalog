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
registration-stepper.tsx
// components/ui/registration-stepper.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the type for a single step
export interface StepProps {
  step: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

// Define the props for the main component
interface RegistrationStepperProps {
  className?: string;
  steps: StepProps[];
  currentStep: number;
  headerTitle: string;
  headerStatus: string;
}

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

const contentVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
};

export const RegistrationStepper = ({
  className,
  steps,
  currentStep,
  headerTitle,
  headerStatus,
}: RegistrationStepperProps) => {

  return (
    <div className={cn("w-screen max-w-md mx-auto", className)}>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold leading-none tracking-tight text-lg">{headerTitle}</h3>
            <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              {headerStatus}
            </span>
          </div>
        </div>

        <div className="p-6 pt-0">
          <ol className="space-y-2">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <li key={step.title} className="overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="relative flex h-8 w-8 items-center justify-center">
                        <AnimatePresence>
                          {isCompleted ? (
                            <motion.div
                              key="check"
                              variants={iconVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                            >
                              <CheckCircle2 className="h-8 w-8 text-green-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="circle"
                              initial={{ scale: 1 }}
                              animate={{ scale: isActive ? 1.1 : 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Circle
                                className={cn(
                                  "h-8 w-8 text-muted-foreground",
                                  isActive && "text-primary"
                                )}
                              />
                              <span
                                className={cn(
                                  "absolute text-sm font-semibold text-muted-foreground",
                                   "inset-0 flex items-center justify-center",
                                   isActive && "text-primary-foreground bg-primary rounded-full h-6 w-6 m-1"
                                )}
                              >
                                {stepNumber}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {/* Connector line */}
                      {index < steps.length - 1 && (
                         <div className="mt-2 h-8 w-px bg-border" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h4 className={cn("font-medium", isActive && "text-foreground", isCompleted && "text-muted-foreground")}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isActive && "rotate-180")} />
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="content"
                            variants={contentVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="overflow-hidden"
                          >
                            <div className="pt-4">{step.content}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

code.demo.1760427047033.tsx
// demo.tsx
"use client";

import React, { useState, useEffect } from "react";
import { RegistrationStepper, StepProps } from "@/components/ui/registration-stepper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Helper components for the demo content
const CurrencyToggle = () => (
  <div className="flex items-center text-sm border rounded-md p-1 bg-muted">
    <button className="px-3 py-1 rounded-sm bg-background text-foreground shadow-sm">ETH</button>
    <button className="px-3 py-1 text-muted-foreground">USD</button>
  </div>
);

const PriceDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center text-sm">
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

const CircularTimer = ({ timeLeft, onCancel }: { timeLeft: number; onCancel: () => void }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = ((60 - timeLeft) / 60) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 my-4 rounded-lg border bg-muted">
        <div className="relative h-28 w-28">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-border"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <motion.circle
              className="text-green-500"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
              style={{ rotate: -90, originX: "50%", originY: "50%" }}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: progress }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-green-500">{timeLeft}</span>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4 max-w-xs">
          This timer helps prevent others from registering the name before you do. Your name is not registered until you've completed the second transaction.
        </p>
        <Button variant="ghost" className="mt-4" onClick={onCancel}>Cancel</Button>
    </div>
  );
};


// Main Demo Component
export default function RegistrationStepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(60);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 1 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCurrentStep(2); // Auto-advance to the next step
    }
    return () => clearInterval(interval);
  }, [currentStep, timer]);

  const handleCommit = () => {
    setCurrentStep(1); // Move to the timer step
  };
  
  const resetFlow = () => {
      setCurrentStep(0);
      setTimer(60);
  };

  const steps: StepProps[] = [
    {
      step: 1,
      title: "Commit",
      description: "Complete a transaction to begin the timer",
      content: (
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center p-2 border rounded-lg">
              <p className="font-mono font-medium">20.5 Gwei</p>
              <CurrencyToggle />
          </div>
          <div className="space-y-2 text-sm">
              <PriceDetail label="1 year registration" value="0.036 ETH" />
              <PriceDetail label="Est. network fee" value="0.0096 ETH" />
          </div>
           <div className="border-t pt-2">
              <PriceDetail label="Estimated total" value="0.0457 ETH" />
          </div>
          <Button className="w-full" onClick={handleCommit}>
            Commit
          </Button>
        </div>
      ),
    },
    {
      step: 2,
      title: "Wait 60 seconds",
      description: "This timer prevents front-running",
      content: <CircularTimer timeLeft={timer} onCancel={resetFlow} />,
    },
    {
      step: 3,
      title: "Complete transaction",
      description: "Open wallet and confirm transaction",
      content: (
        <div className="mt-2 text-center">
          <p className="text-sm text-muted-foreground mb-4">You are ready to complete the registration.</p>
          <Button className="w-full">Secure Name</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-background p-10">
      <RegistrationStepper
        currentStep={currentStep}
        steps={steps}
        headerTitle="karigirwa.eth"
        headerStatus="Available"
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/registration-stepper.tsx
// components/ui/registration-stepper.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the type for a single step
export interface StepProps {
  step: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

// Define the props for the main component
interface RegistrationStepperProps {
  className?: string;
  steps: StepProps[];
  currentStep: number;
  headerTitle: string;
  headerStatus: string;
}

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } },
};

const contentVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
};

export const RegistrationStepper = ({
  className,
  steps,
  currentStep,
  headerTitle,
  headerStatus,
}: RegistrationStepperProps) => {

  return (
    <div className={cn("w-screen max-w-md mx-auto", className)}>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold leading-none tracking-tight text-lg">{headerTitle}</h3>
            <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
              {headerStatus}
            </span>
          </div>
        </div>

        <div className="p-6 pt-0">
          <ol className="space-y-2">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <li key={step.title} className="overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="relative flex h-8 w-8 items-center justify-center">
                        <AnimatePresence>
                          {isCompleted ? (
                            <motion.div
                              key="check"
                              variants={iconVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                            >
                              <CheckCircle2 className="h-8 w-8 text-green-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="circle"
                              initial={{ scale: 1 }}
                              animate={{ scale: isActive ? 1.1 : 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Circle
                                className={cn(
                                  "h-8 w-8 text-muted-foreground",
                                  isActive && "text-primary"
                                )}
                              />
                              <span
                                className={cn(
                                  "absolute text-sm font-semibold text-muted-foreground",
                                   "inset-0 flex items-center justify-center",
                                   isActive && "text-primary-foreground bg-primary rounded-full h-6 w-6 m-1"
                                )}
                              >
                                {stepNumber}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {/* Connector line */}
                      {index < steps.length - 1 && (
                         <div className="mt-2 h-8 w-px bg-border" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h4 className={cn("font-medium", isActive && "text-foreground", isCompleted && "text-muted-foreground")}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isActive && "rotate-180")} />
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="content"
                            variants={contentVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="overflow-hidden"
                          >
                            <div className="pt-4">{step.content}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
