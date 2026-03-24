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
trip-details-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define variants for the status badge using cva
const badgeVariants = cva(
  "capitalize",
  {
    variants: {
      status: {
        upcoming: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
        completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      },
    },
    defaultVariants: {
      status: "upcoming",
    },
  }
);

// Define the type for each action button
export interface TripAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
}

// Define the props for the main component
export interface TripDetailsCardProps extends VariantProps<typeof badgeVariants> {
  origin: string;
  destination: string;
  travelerName: string;
  tripId: string;
  travelDate: Date;
  actions: TripAction[];
  className?: string;
  status: "upcoming" | "completed" | "cancelled";
}

const TripDetailsCard = React.forwardRef<
  HTMLDivElement,
  TripDetailsCardProps
>(({ 
    className, 
    origin,
    destination,
    travelerName,
    status,
    tripId,
    travelDate,
    actions,
    ...props 
}, ref) => {
  
  // Format the date for display
  const formattedDate = travelDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "max-w-4xl w-full rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {/* Main content section */}
      <div className="p-6 space-y-4">
        {/* Header with locations and status */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {origin} <ArrowRight className="h-5 w-5 text-muted-foreground" /> {destination}
            </h2>
            <p className="text-sm text-muted-foreground">
              {travelerName} is travelling
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge className={cn(badgeVariants({ status }))}>{status}</Badge>
            <span className="text-xs text-muted-foreground font-mono">Trip ID: {tripId}</span>
          </div>
        </div>
        
        {/* Date Section */}
        <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">{origin} → {destination}</p>
            <p className="text-lg font-semibold text-foreground">{formattedDate}</p>
        </div>
      </div>
      
      {/* Actions Toolbar */}
      <div className="bg-muted/50 px-6 py-3 border-t">
        <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 -mb-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'ghost'}
              size="sm"
              onClick={action.onClick}
              disabled={action.disabled}
              className="flex-shrink-0"
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

TripDetailsCard.displayName = "TripDetailsCard";

export { TripDetailsCard };

code.demo.1758650125830.tsx
import { 
  TripDetailsCard,
  type TripAction,
} from "@/components/ui/trip-details-card";
import { 
  XCircle, 
  RefreshCcw, 
  History, 
  FileText, 
  Download 
} from "lucide-react";

// Demo component to showcase the TripDetailsCard
export default function TripDetailsCardDemo() {
  
  // Define sample actions for the card's toolbar
  const tripActions: TripAction[] = [
    {
      label: "Cancel flights",
      icon: XCircle,
      variant: "ghost",
      onClick: () => alert("Cancel flights clicked!"),
      // Custom styling for destructive action
      className: "text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-500"
    },
    {
      label: "Calculate refund",
      icon: RefreshCcw,
      variant: "ghost",
      onClick: () => alert("Calculate refund clicked!"),
    },
    {
      label: "Reschedule flights",
      icon: History,
      variant: "ghost",
      onClick: () => alert("Reschedule flights clicked!"),
    },
    {
      label: "Download invoice",
      icon: FileText,
      variant: "ghost",
      onClick: () => alert("Download invoice clicked!"),
    },
    {
      label: "Download ticket",
      icon: Download,
      variant: "ghost",
      onClick: () => alert("Download ticket clicked!"),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <TripDetailsCard
        origin="Chandigarh"
        destination="Lucknow"
        travelerName="Kavi"
        status="upcoming"
        tripId="250793635642"
        travelDate={new Date("2025-10-20T00:00:00Z")}
        actions={tripActions}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/trip-details-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define variants for the status badge using cva
const badgeVariants = cva(
  "capitalize",
  {
    variants: {
      status: {
        upcoming: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
        completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      },
    },
    defaultVariants: {
      status: "upcoming",
    },
  }
);

// Define the type for each action button
export interface TripAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
}

// Define the props for the main component
export interface TripDetailsCardProps extends VariantProps<typeof badgeVariants> {
  origin: string;
  destination: string;
  travelerName: string;
  tripId: string;
  travelDate: Date;
  actions: TripAction[];
  className?: string;
  status: "upcoming" | "completed" | "cancelled";
}

const TripDetailsCard = React.forwardRef<
  HTMLDivElement,
  TripDetailsCardProps
>(({ 
    className, 
    origin,
    destination,
    travelerName,
    status,
    tripId,
    travelDate,
    actions,
    ...props 
}, ref) => {
  
  // Format the date for display
  const formattedDate = travelDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "max-w-4xl w-full rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {/* Main content section */}
      <div className="p-6 space-y-4">
        {/* Header with locations and status */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {origin} <ArrowRight className="h-5 w-5 text-muted-foreground" /> {destination}
            </h2>
            <p className="text-sm text-muted-foreground">
              {travelerName} is travelling
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge className={cn(badgeVariants({ status }))}>{status}</Badge>
            <span className="text-xs text-muted-foreground font-mono">Trip ID: {tripId}</span>
          </div>
        </div>
        
        {/* Date Section */}
        <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">{origin} → {destination}</p>
            <p className="text-lg font-semibold text-foreground">{formattedDate}</p>
        </div>
      </div>
      
      {/* Actions Toolbar */}
      <div className="bg-muted/50 px-6 py-3 border-t">
        <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 -mb-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'ghost'}
              size="sm"
              onClick={action.onClick}
              disabled={action.disabled}
              className="flex-shrink-0"
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

TripDetailsCard.displayName = "TripDetailsCard";

export { TripDetailsCard };
```

Install NPM dependencies:
```bash
framer-motion, lucide-react, class-variance-authority
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
