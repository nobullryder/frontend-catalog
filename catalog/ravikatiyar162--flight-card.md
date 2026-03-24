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
flight-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Updated the props interface for the logo
interface FlightCardProps {
  airline: {
    name: string;
    logo: string; // Changed from React.ReactNode to string for the image URL
    flightNumber: string;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency?: string;
  offer?: string;
  refundableType: string;
  onBook?: () => void;
  onFlightDetails?: () => void;
  className?: string;
}

// A helper for formatting currency
const formatCurrency = (amount: number, currency: string = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  departureTime,
  arrivalTime,
  duration,
  stops,
  price,
  currency = 'INR',
  offer,
  refundableType,
  onBook,
  onFlightDetails,
  className,
}) => {
  const stopText = stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-4xl rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="outline" className="bg-secondary/50">{refundableType}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-6 items-center">
          {/* Airline Info */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex items-center gap-3">
              {/* Updated to use an <img> tag for the logo */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-muted overflow-hidden">
                <img src={airline.logo} alt={`${airline.name} logo`} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{airline.name}</p>
                <p className="text-sm text-muted-foreground">{airline.flightNumber}</p>
              </div>
            </div>
             <Button 
                variant="link" 
                className="p-0 h-auto justify-start mt-2 text-sm" 
                onClick={onFlightDetails}
                aria-label="View flight details"
            >
                Flight Details
            </Button>
          </div>

          {/* Timeline */}
          <div className="md:col-span-5 flex items-center gap-2">
            <div className="text-center">
              <p className="font-bold text-lg text-foreground">{departureTime}</p>
            </div>
            <div className="flex-grow text-center">
                <p className="text-sm text-muted-foreground">{duration}</p>
                <div className="relative w-full h-px bg-border my-1">
                    <div className="absolute top-1/2 left-0 w-full h-px flex items-center justify-center">
                       {stops > 0 && <div className="w-2 h-2 rounded-full bg-primary border-2 border-card"></div>}
                    </div>
                </div>
                <p className="text-xs font-medium text-primary">{stopText}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-foreground">{arrivalTime}</p>
            </div>
          </div>

          {/* Pricing and Booking */}
          <div className="md:col-span-4 flex flex-col md:items-end gap-2">
             <p className="text-2xl font-bold text-foreground">{formatCurrency(price, currency)}</p>
             {offer && <p className="text-sm text-green-600 dark:text-green-500 text-right">{offer}</p>}
             <Button onClick={onBook} className="w-full md:w-auto mt-2" aria-label={`Book flight for ${formatCurrency(price, currency)}`}>
                Book
                <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

code.demo.1758705166717.tsx
import { FlightCard } from "@/components/ui/flight-card";

const FlightCardDemo = () => {
  // Sample data with an image URL for the logo
  const flightData = {
    airline: {
      name: "IndiGo",
      // Replaced the SVG component with a placeholder image URL
      logo: "https://static-assets-ct.flixcart.com/ct/assets/resources/images/logos/air-logos/svg_logos/6E.svg",
      flightNumber: "6E-2195",
    },
    departureTime: "12:45",
    arrivalTime: "20:00",
    duration: "7h 15m",
    stops: 1,
    price: 6916,
    currency: "INR",
    offer: "Get ₹968 off with Axis Cards",
    refundableType: "Partial Refundable",
  };

  // Dummy functions for button actions
  const handleBook = () => {
    alert(`Booking flight ${flightData.airline.flightNumber}...`);
  };

  const handleFlightDetails = () => {
    alert(`Showing details for flight ${flightData.airline.flightNumber}...`);
  };

  return (
    <div className="w-full min-h-[350px] flex items-center justify-center bg-background p-4">
      <FlightCard 
        {...flightData}
        onBook={handleBook}
        onFlightDetails={handleFlightDetails}
      />
    </div>
  );
};

export default FlightCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flight-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Updated the props interface for the logo
interface FlightCardProps {
  airline: {
    name: string;
    logo: string; // Changed from React.ReactNode to string for the image URL
    flightNumber: string;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency?: string;
  offer?: string;
  refundableType: string;
  onBook?: () => void;
  onFlightDetails?: () => void;
  className?: string;
}

// A helper for formatting currency
const formatCurrency = (amount: number, currency: string = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  departureTime,
  arrivalTime,
  duration,
  stops,
  price,
  currency = 'INR',
  offer,
  refundableType,
  onBook,
  onFlightDetails,
  className,
}) => {
  const stopText = stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-4xl rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="outline" className="bg-secondary/50">{refundableType}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-6 items-center">
          {/* Airline Info */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex items-center gap-3">
              {/* Updated to use an <img> tag for the logo */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-muted overflow-hidden">
                <img src={airline.logo} alt={`${airline.name} logo`} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{airline.name}</p>
                <p className="text-sm text-muted-foreground">{airline.flightNumber}</p>
              </div>
            </div>
             <Button 
                variant="link" 
                className="p-0 h-auto justify-start mt-2 text-sm" 
                onClick={onFlightDetails}
                aria-label="View flight details"
            >
                Flight Details
            </Button>
          </div>

          {/* Timeline */}
          <div className="md:col-span-5 flex items-center gap-2">
            <div className="text-center">
              <p className="font-bold text-lg text-foreground">{departureTime}</p>
            </div>
            <div className="flex-grow text-center">
                <p className="text-sm text-muted-foreground">{duration}</p>
                <div className="relative w-full h-px bg-border my-1">
                    <div className="absolute top-1/2 left-0 w-full h-px flex items-center justify-center">
                       {stops > 0 && <div className="w-2 h-2 rounded-full bg-primary border-2 border-card"></div>}
                    </div>
                </div>
                <p className="text-xs font-medium text-primary">{stopText}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-foreground">{arrivalTime}</p>
            </div>
          </div>

          {/* Pricing and Booking */}
          <div className="md:col-span-4 flex flex-col md:items-end gap-2">
             <p className="text-2xl font-bold text-foreground">{formatCurrency(price, currency)}</p>
             {offer && <p className="text-sm text-green-600 dark:text-green-500 text-right">{offer}</p>}
             <Button onClick={onBook} className="w-full md:w-auto mt-2" aria-label={`Book flight for ${formatCurrency(price, currency)}`}>
                Book
                <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
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
