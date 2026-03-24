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
flight-card-1.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn

// Define the props for the FlightCard component
export interface FlightCardProps {
  imageUrl: string;
  airline: string;
  flightCode: string;
  flightClass: string;
  departureCode: string;
  departureCity: string;
  departureTime: string;
  arrivalCode: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string;
  className?: string;
}

// Main component definition
export const FlightCard = React.forwardRef<HTMLDivElement, FlightCardProps>(
  (
    {
      imageUrl,
      airline,
      flightCode,
      flightClass,
      departureCode,
      departureCity,
      departureTime,
      arrivalCode,
      arrivalCity,
      arrivalTime,
      duration,
      className,
    },
    ref
  ) => {
    // Animation variants for the container and its children
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          when: "beforeChildren",
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "max-w-sm w-full font-sans rounded-2xl overflow-hidden shadow-lg bg-card border border-border",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      >
        {/* Flight Image */}
        <div className="relative h-40">
          <img
            src={imageUrl}
            alt="View from airplane window"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Flight Details Container */}
        <div className="p-6 pt-4">
          {/* Main Flight Route */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="text-left">
              <p className="text-sm text-muted-foreground">{departureTime}</p>
              <p className="text-4xl font-bold text-card-foreground">
                {departureCode}
              </p>
              <p className="text-xs text-muted-foreground">{departureCity}</p>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">{flightCode}</p>
              <div className="flex items-center gap-2 my-1">
                <div className="h-px w-8 bg-border" />
                <Plane className="h-4 w-4 text-muted-foreground" />
                <div className="h-px w-8 bg-border" />
              </div>
              <p className="text-xs text-muted-foreground">{duration}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">{arrivalTime}</p>
              <p className="text-4xl font-bold text-card-foreground">
                {arrivalCode}
              </p>
              <p className="text-xs text-muted-foreground">{arrivalCity}</p>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t border-dashed border-border my-5"
          />

          {/* Additional Details */}
          <motion.div
            variants={itemVariants}
            className="flex justify-between text-center"
          >
            <InfoItem label="Airline" value={airline} />
            <InfoItem label="Flight Code" value={flightCode} />
            <InfoItem label="Class" value={flightClass} />
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

FlightCard.displayName = "FlightCard";

// Helper component for bottom info items
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="font-semibold text-card-foreground">{value}</span>
  </div>
);

code.demo.1758823961763.tsx
import { FlightCard } from "@/components/ui/flight-card-1"; // Adjust the import path

export default function FlightCardDemo() {
  const flightData = {
    imageUrl: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=2070&auto=format&fit=crop",
    airline: "Lion Air",
    flightCode: "JT 880",
    flightClass: "Economy",
    departureCode: "SUB",
    departureCity: "Surabaya",
    departureTime: "08:45 PM",
    arrivalCode: "SIN",
    arrivalCity: "Singapore",
    arrivalTime: "12:10 AM",
    duration: "3 Hours 25 Minutes",
  };

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <FlightCard {...flightData} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flight-card-1.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn

// Define the props for the FlightCard component
export interface FlightCardProps {
  imageUrl: string;
  airline: string;
  flightCode: string;
  flightClass: string;
  departureCode: string;
  departureCity: string;
  departureTime: string;
  arrivalCode: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string;
  className?: string;
}

// Main component definition
export const FlightCard = React.forwardRef<HTMLDivElement, FlightCardProps>(
  (
    {
      imageUrl,
      airline,
      flightCode,
      flightClass,
      departureCode,
      departureCity,
      departureTime,
      arrivalCode,
      arrivalCity,
      arrivalTime,
      duration,
      className,
    },
    ref
  ) => {
    // Animation variants for the container and its children
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          when: "beforeChildren",
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "max-w-sm w-full font-sans rounded-2xl overflow-hidden shadow-lg bg-card border border-border",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      >
        {/* Flight Image */}
        <div className="relative h-40">
          <img
            src={imageUrl}
            alt="View from airplane window"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Flight Details Container */}
        <div className="p-6 pt-4">
          {/* Main Flight Route */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div className="text-left">
              <p className="text-sm text-muted-foreground">{departureTime}</p>
              <p className="text-4xl font-bold text-card-foreground">
                {departureCode}
              </p>
              <p className="text-xs text-muted-foreground">{departureCity}</p>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">{flightCode}</p>
              <div className="flex items-center gap-2 my-1">
                <div className="h-px w-8 bg-border" />
                <Plane className="h-4 w-4 text-muted-foreground" />
                <div className="h-px w-8 bg-border" />
              </div>
              <p className="text-xs text-muted-foreground">{duration}</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">{arrivalTime}</p>
              <p className="text-4xl font-bold text-card-foreground">
                {arrivalCode}
              </p>
              <p className="text-xs text-muted-foreground">{arrivalCity}</p>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t border-dashed border-border my-5"
          />

          {/* Additional Details */}
          <motion.div
            variants={itemVariants}
            className="flex justify-between text-center"
          >
            <InfoItem label="Airline" value={airline} />
            <InfoItem label="Flight Code" value={flightCode} />
            <InfoItem label="Class" value={flightClass} />
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

FlightCard.displayName = "FlightCard";

// Helper component for bottom info items
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="font-semibold text-card-foreground">{value}</span>
  </div>
);
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
