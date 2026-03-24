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
flight-search.tsx
// components/ui/flight-search-card.tsx

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Plane } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Interface for the component's props
export interface FlightSearchCardProps {
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  returnDate?: string | null;
  passengers: string;
  onSwapLocations: () => void;
  onRemoveReturnDate?: () => void;
  onSearch: () => void;
  className?: string;
}

// A smaller, reusable component for each section of the card
const InfoSection = ({ label, value, className }: { label: string; value: string; className?: string }) => (
  <div className={cn("grid gap-1.5", className)}>
    <span className="text-sm text-muted-foreground">{label}</span>
    <p className="text-lg font-semibold text-foreground truncate">{value}</p>
  </div>
);

export const FlightSearchCard = React.forwardRef<HTMLDivElement, FlightSearchCardProps>(
  (
    {
      fromLocation,
      toLocation,
      departureDate,
      returnDate,
      passengers,
      onSwapLocations,
      onRemoveReturnDate,
      onSearch,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden",
          className
        )}
      >
        <div className="p-6 space-y-6">
          {/* From/To Section with animation */}
          <div className="relative">
            <motion.div layoutId="fromLocation">
              <InfoSection label="From" value={fromLocation} />
            </motion.div>
            
            <Separator className="my-4" />

            <motion.div layoutId="toLocation">
              <InfoSection label="To" value={toLocation} />
            </motion.div>

            {/* Swap Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full h-10 w-10 bg-background hover:bg-muted"
              onClick={onSwapLocations}
              aria-label="Swap locations"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <Separator />

          {/* Date and Passenger Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoSection label="Departure date" value={departureDate} />
              <div className="relative">
                <AnimatePresence>
                  {returnDate && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <InfoSection label="Return date" value={returnDate} />
                      <Button
                        variant="link"
                        className="absolute -right-3 -bottom-3 text-xs text-muted-foreground"
                        onClick={onRemoveReturnDate}
                      >
                        Remove
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <InfoSection label="Passenger" value={passengers} />
          </div>
        </div>

        {/* Search Button Footer */}
        <div className="bg-muted/50 p-4">
          <Button onClick={onSearch} className="w-full" size="lg">
            <Plane className="mr-2 h-4 w-4" />
            Search Flights
          </Button>
        </div>
      </div>
    );
  }
);

FlightSearchCard.displayName = "FlightSearchCard";

code.demo.1758095840310.tsx
// demo.tsx

"use client";

import React, { useState } from "react";
import { FlightSearchCard } from "@/components/ui/flight-search"; // Adjust the import path

const FlightSearchDemo = () => {
  // State management for the flight search details
  const [from, setFrom] = useState("New York");
  const [to, setTo] = useState("Abu Dhabi");
  const [departure, setDeparture] = useState("Apr 29, 2024");
  const [returnDate, setReturnDate] = useState<string | null>("May 02, 2024");
  const [passengers, setPassengers] = useState("2 Adults - 1 Child");

  // Handler for swapping locations with a simple console log
  const handleSwapLocations = () => {
    console.log("Swapping locations...");
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  // Handler for removing the return date
  const handleRemoveReturn = () => {
    console.log("Removing return date...");
    setReturnDate(null);
  };

  // Handler for the search action
  const handleSearch = () => {
    alert(`Searching for flights:
      From: ${from}
      To: ${to}
      Departure: ${departure}
      Return: ${returnDate || 'One-way'}
      Passengers: ${passengers}
    `);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <FlightSearchCard
        fromLocation={from}
        toLocation={to}
        departureDate={departure}
        returnDate={returnDate}
        passengers={passengers}
        onSwapLocations={handleSwapLocations}
        onRemoveReturnDate={handleRemoveReturn}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default FlightSearchDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flight-search.tsx
// components/ui/flight-search-card.tsx

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Plane } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Interface for the component's props
export interface FlightSearchCardProps {
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  returnDate?: string | null;
  passengers: string;
  onSwapLocations: () => void;
  onRemoveReturnDate?: () => void;
  onSearch: () => void;
  className?: string;
}

// A smaller, reusable component for each section of the card
const InfoSection = ({ label, value, className }: { label: string; value: string; className?: string }) => (
  <div className={cn("grid gap-1.5", className)}>
    <span className="text-sm text-muted-foreground">{label}</span>
    <p className="text-lg font-semibold text-foreground truncate">{value}</p>
  </div>
);

export const FlightSearchCard = React.forwardRef<HTMLDivElement, FlightSearchCardProps>(
  (
    {
      fromLocation,
      toLocation,
      departureDate,
      returnDate,
      passengers,
      onSwapLocations,
      onRemoveReturnDate,
      onSearch,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden",
          className
        )}
      >
        <div className="p-6 space-y-6">
          {/* From/To Section with animation */}
          <div className="relative">
            <motion.div layoutId="fromLocation">
              <InfoSection label="From" value={fromLocation} />
            </motion.div>
            
            <Separator className="my-4" />

            <motion.div layoutId="toLocation">
              <InfoSection label="To" value={toLocation} />
            </motion.div>

            {/* Swap Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full h-10 w-10 bg-background hover:bg-muted"
              onClick={onSwapLocations}
              aria-label="Swap locations"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <Separator />

          {/* Date and Passenger Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoSection label="Departure date" value={departureDate} />
              <div className="relative">
                <AnimatePresence>
                  {returnDate && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <InfoSection label="Return date" value={returnDate} />
                      <Button
                        variant="link"
                        className="absolute -right-3 -bottom-3 text-xs text-muted-foreground"
                        onClick={onRemoveReturnDate}
                      >
                        Remove
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <InfoSection label="Passenger" value={passengers} />
          </div>
        </div>

        {/* Search Button Footer */}
        <div className="bg-muted/50 p-4">
          <Button onClick={onSearch} className="w-full" size="lg">
            <Plane className="mr-2 h-4 w-4" />
            Search Flights
          </Button>
        </div>
      </div>
    );
  }
);

FlightSearchCard.displayName = "FlightSearchCard";
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
