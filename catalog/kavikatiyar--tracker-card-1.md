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
tracker-card-1.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, FileText, Pencil, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Define the types for the component props
type StepStatus = "completed" | "active" | "pending" | "error";

interface Step {
  title: string;
  description: string;
  date?: string;
  status: StepStatus;
  icon: React.ElementType;
}

interface ProposalTrackerCardProps {
  imageUrl: string;
  status: string;
  title: string;
  price: number;
  steps: Step[];
  buttonText: string;
}

// Helper to get the right icon and style based on status
const getStatusAttributes = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return {
        Icon: CheckCircle2,
        iconClassName: "text-green-500",
        lineClassName: "bg-green-500",
      };
    case "active":
      return {
        Icon: Pencil,
        iconClassName: "text-primary",
        lineClassName: "bg-border",
      };
    case "pending":
      return {
        Icon: FileText,
        iconClassName: "text-muted-foreground",
        lineClassName: "bg-border",
      };
    case "error":
        return {
          Icon: AlertCircle,
          iconClassName: "text-destructive",
          lineClassName: "bg-border",
        };
    default:
      return {
        Icon: Circle,
        iconClassName: "text-muted-foreground",
        lineClassName: "bg-border",
      };
  }
};

export const ProposalTrackerCard: React.FC<ProposalTrackerCardProps> = ({
  imageUrl,
  status,
  title,
  price,
  steps,
  buttonText,
}) => {
  // Animation variants for Framer Motion
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-2xl border-none bg-card shadow-lg">
      <CardHeader className="p-0">
        <div className="flex items-start gap-4 p-6">
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col">
            <Badge
              variant="outline"
              className="mb-2 w-fit border-orange-300 bg-orange-50 text-orange-600"
            >
              {status}
            </Badge>
            <h2 className="text-xl font-bold text-card-foreground">{title}</h2>
            <p className="mt-1 text-2xl font-semibold text-card-foreground">
              ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Expected Total Monthly
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6">
        <motion.ul
          className="relative space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => {
            const { Icon, iconClassName, lineClassName } = getStatusAttributes(step.status);
            const isLastStep = index === steps.length - 1;

            return (
              <motion.li key={index} className="flex items-start gap-4" variants={itemVariants}>
                <div className="relative flex flex-col items-center">
                  <div className="z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                     <Icon className={cn("h-5 w-5", iconClassName)} />
                  </div>
                  {!isLastStep && (
                    <div className={cn("absolute top-9 h-[calc(100%-1.5rem)] w-0.5", lineClassName)} />
                  )}
                </div>
                <div className="flex-1 pb-6 pt-1.5">
                  {step.date && (
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  )}
                  <p className="font-semibold text-card-foreground">{step.title}</p>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {step.description}
                  </a>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <Button size="lg" className="w-full rounded-lg text-base font-semibold">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

code.demo.1758771247133.tsx
import { ProposalTrackerCard } from "@/components/ui/tracker-card-1";
import { CheckCircle2, Circle, FileText, Pencil } from "lucide-react";

const Demo = () => {
  // Sample data for the proposal tracker
  const proposalData = {
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop", // Replace with your image source
    status: "Awaiting Documents",
    title: "Greenwich Village",
    price: 3200.00,
    buttonText: "Manage Proposal",
    steps: [
      {
        title: "Credit Assessment Approved",
        description: "View Details",
        date: "10th January, 10:40",
        status: "completed",
        icon: CheckCircle2,
      },
      {
        title: "Proposal Sent",
        description: "View proposal",
        date: "12th January, 13:24",
        status: "completed",
        icon: CheckCircle2,
      },
      {
        title: "Manage Documents",
        description: "View & Send Documents",
        status: "active",
        icon: FileText,
      },
      {
        title: "Contracts",
        description: "See Contract Template",
        status: "pending",
        icon: Pencil,
      },
    ],
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <ProposalTrackerCard
        imageUrl={proposalData.imageUrl}
        status={proposalData.status}
        title={proposalData.title}
        price={proposalData.price}
        steps={proposalData.steps}
        buttonText={proposalData.buttonText}
      />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/tracker-card-1.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, FileText, Pencil, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Define the types for the component props
type StepStatus = "completed" | "active" | "pending" | "error";

interface Step {
  title: string;
  description: string;
  date?: string;
  status: StepStatus;
  icon: React.ElementType;
}

interface ProposalTrackerCardProps {
  imageUrl: string;
  status: string;
  title: string;
  price: number;
  steps: Step[];
  buttonText: string;
}

// Helper to get the right icon and style based on status
const getStatusAttributes = (status: StepStatus) => {
  switch (status) {
    case "completed":
      return {
        Icon: CheckCircle2,
        iconClassName: "text-green-500",
        lineClassName: "bg-green-500",
      };
    case "active":
      return {
        Icon: Pencil,
        iconClassName: "text-primary",
        lineClassName: "bg-border",
      };
    case "pending":
      return {
        Icon: FileText,
        iconClassName: "text-muted-foreground",
        lineClassName: "bg-border",
      };
    case "error":
        return {
          Icon: AlertCircle,
          iconClassName: "text-destructive",
          lineClassName: "bg-border",
        };
    default:
      return {
        Icon: Circle,
        iconClassName: "text-muted-foreground",
        lineClassName: "bg-border",
      };
  }
};

export const ProposalTrackerCard: React.FC<ProposalTrackerCardProps> = ({
  imageUrl,
  status,
  title,
  price,
  steps,
  buttonText,
}) => {
  // Animation variants for Framer Motion
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-2xl border-none bg-card shadow-lg">
      <CardHeader className="p-0">
        <div className="flex items-start gap-4 p-6">
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col">
            <Badge
              variant="outline"
              className="mb-2 w-fit border-orange-300 bg-orange-50 text-orange-600"
            >
              {status}
            </Badge>
            <h2 className="text-xl font-bold text-card-foreground">{title}</h2>
            <p className="mt-1 text-2xl font-semibold text-card-foreground">
              ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Expected Total Monthly
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pb-6">
        <motion.ul
          className="relative space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => {
            const { Icon, iconClassName, lineClassName } = getStatusAttributes(step.status);
            const isLastStep = index === steps.length - 1;

            return (
              <motion.li key={index} className="flex items-start gap-4" variants={itemVariants}>
                <div className="relative flex flex-col items-center">
                  <div className="z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                     <Icon className={cn("h-5 w-5", iconClassName)} />
                  </div>
                  {!isLastStep && (
                    <div className={cn("absolute top-9 h-[calc(100%-1.5rem)] w-0.5", lineClassName)} />
                  )}
                </div>
                <div className="flex-1 pb-6 pt-1.5">
                  {step.date && (
                    <p className="text-xs text-muted-foreground">{step.date}</p>
                  )}
                  <p className="font-semibold text-card-foreground">{step.title}</p>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {step.description}
                  </a>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <Button size="lg" className="w-full rounded-lg text-base font-semibold">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
```

Install NPM dependencies:
```bash
next, lucide-react, framer-motion
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
