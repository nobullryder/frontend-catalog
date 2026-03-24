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
order-status-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for classname merging
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- TYPE DEFINITIONS for props ---
type StatusChange = {
  from: string;
  to: string;
};

type TimelineSubItem = {
  icon: React.ReactNode;
  text: string;
};

type TimelineItemProps = {
  icon: React.ReactNode;
  title: string;
  details?: string;
  statusChange?: StatusChange;
  subItems?: TimelineSubItem[];
  isLast?: boolean;
};

export type OrderStatusCardProps = {
  title: string;
  description: string;
  timelineItems: Omit<TimelineItemProps, "isLast">[];
  onClose?: () => void;
  onContinue: () => void;
};

// --- SUB-COMPONENTS for cleaner structure ---
const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  details,
  statusChange,
  subItems,
  isLast = false,
}) => (
  <div className="relative flex items-start">
    {/* Dotted line connecting timeline items */}
    {!isLast && (
      <div
        className="absolute left-[14px] top-[36px] h-[calc(100%-10px)] w-px border-l-2 border-dashed border-border"
        aria-hidden="true"
      />
    )}
    
    {/* Icon */}
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-background ring-4 ring-background">
      {icon}
    </div>
    
    {/* Content */}
    <div className="ml-4 flex-1">
      <p className="font-semibold text-foreground">{title}</p>
      {details && <p className="text-sm text-muted-foreground">{details}</p>}
      
      {/* Status Change Indicator */}
      {statusChange && (
        <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          <span>{statusChange.from}</span>
          <ArrowRight className="h-3 w-3" />
          <span>{statusChange.to}</span>
        </div>
      )}
      
      {/* Sub-items list */}
      {subItems && (
        <ul className="mt-2 space-y-2">
          {subItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  title,
  description,
  timelineItems,
  onClose,
  onContinue,
}) => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <Card
      as={motion.div}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md overflow-hidden rounded-xl border-none shadow-2xl shadow-primary/10"
    >
      {/* Card Header */}
      <CardHeader className="p-6">
        <motion.div variants={itemVariants} className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          )}
        </motion.div>
      </CardHeader>
      
      {/* Card Content with Timeline */}
      <CardContent className="px-6 pb-6">
        <div className="space-y-6">
          {timelineItems.map((item, index) => (
            <motion.div variants={itemVariants} key={index}>
              <TimelineItem {...item} isLast={index === timelineItems.length - 1} />
            </motion.div>
          ))}
        </div>
      </CardContent>
      
      {/* Card Footer */}
      <motion.div variants={itemVariants} className="bg-muted/40 p-6">
        <Button onClick={onContinue} className="w-full" size="lg">
          Continue
        </Button>
      </motion.div>
    </Card>
  );
};

code.demo.1759999189491.tsx
import { OrderStatusCard, OrderStatusCardProps } from "@/components/ui/order-status-card";
import { Clock, MessageSquare, User, CheckCircle2 } from "lucide-react";

// --- Demo Component ---
const OrderStatusCardDemo = () => {
  // Mock data to be passed as props
  const orderData: Omit<OrderStatusCardProps, "onContinue"> = {
    title: "Order completed! 🎉",
    description: "Order has been completed and feedback request sent to client.",
    timelineItems: [
      {
        icon: <Clock className="h-5 w-5 text-muted-foreground" />,
        title: "Order Duration: 7 days",
      },
      {
        icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
        title: "Feedback request has been sent",
        details: "12 Dec 2024, 12:15 • Company",
        subItems: [
          {
            icon: <User className="h-4 w-4" />,
            text: "Sent to: Jane Doe",
          },
        ],
      },
      {
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        title: "Order completed",
        details: "12 Dec 2024, 9:15 • John Smith",
        statusChange: {
          from: "In progress",
          to: "Completed",
        },
      },
    ],
    // The onClose prop is optional and can be omitted
    onClose: () => alert("Close button clicked!"),
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <OrderStatusCard
        {...orderData}
        onContinue={() => alert("Continue button clicked!")}
      />
    </div>
  );
};

export default OrderStatusCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/order-status-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for classname merging
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- TYPE DEFINITIONS for props ---
type StatusChange = {
  from: string;
  to: string;
};

type TimelineSubItem = {
  icon: React.ReactNode;
  text: string;
};

type TimelineItemProps = {
  icon: React.ReactNode;
  title: string;
  details?: string;
  statusChange?: StatusChange;
  subItems?: TimelineSubItem[];
  isLast?: boolean;
};

export type OrderStatusCardProps = {
  title: string;
  description: string;
  timelineItems: Omit<TimelineItemProps, "isLast">[];
  onClose?: () => void;
  onContinue: () => void;
};

// --- SUB-COMPONENTS for cleaner structure ---
const TimelineItem: React.FC<TimelineItemProps> = ({
  icon,
  title,
  details,
  statusChange,
  subItems,
  isLast = false,
}) => (
  <div className="relative flex items-start">
    {/* Dotted line connecting timeline items */}
    {!isLast && (
      <div
        className="absolute left-[14px] top-[36px] h-[calc(100%-10px)] w-px border-l-2 border-dashed border-border"
        aria-hidden="true"
      />
    )}
    
    {/* Icon */}
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-background ring-4 ring-background">
      {icon}
    </div>
    
    {/* Content */}
    <div className="ml-4 flex-1">
      <p className="font-semibold text-foreground">{title}</p>
      {details && <p className="text-sm text-muted-foreground">{details}</p>}
      
      {/* Status Change Indicator */}
      {statusChange && (
        <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          <span>{statusChange.from}</span>
          <ArrowRight className="h-3 w-3" />
          <span>{statusChange.to}</span>
        </div>
      )}
      
      {/* Sub-items list */}
      {subItems && (
        <ul className="mt-2 space-y-2">
          {subItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  title,
  description,
  timelineItems,
  onClose,
  onContinue,
}) => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <Card
      as={motion.div}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md overflow-hidden rounded-xl border-none shadow-2xl shadow-primary/10"
    >
      {/* Card Header */}
      <CardHeader className="p-6">
        <motion.div variants={itemVariants} className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          )}
        </motion.div>
      </CardHeader>
      
      {/* Card Content with Timeline */}
      <CardContent className="px-6 pb-6">
        <div className="space-y-6">
          {timelineItems.map((item, index) => (
            <motion.div variants={itemVariants} key={index}>
              <TimelineItem {...item} isLast={index === timelineItems.length - 1} />
            </motion.div>
          ))}
        </div>
      </CardContent>
      
      {/* Card Footer */}
      <motion.div variants={itemVariants} className="bg-muted/40 p-6">
        <Button onClick={onContinue} className="w-full" size="lg">
          Continue
        </Button>
      </motion.div>
    </Card>
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
