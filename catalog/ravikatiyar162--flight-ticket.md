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
flight-ticket.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils"; // Your path to shadcn's 'cn' utility

// --- TYPE DEFINITIONS ---
type Airport = {
  code: string;
  name: string;
};

type Passenger = {
  name: string;
  type: "Adult" | "Child" | "Infant";
  baggage: string;
};

interface FlightTicketProps {
  /** The departure airport details. */
  departure: Airport;
  /** The arrival airport details. */
  arrival: Airport;
  /** The date and time of the flight. */
  flightDate: Date;
  /** An array of passenger objects. */
  passengers: Passenger[];
  /** NEW: Choose the appearance of the ticket stub. Defaults to 'barcode'. */
  stubVariant?: 'barcode' | 'solid';
  /** Optional custom class names for the container. */
  className?: string;
}

// --- BARCODE SUBCOMPONENT ---
const Barcode = React.memo(() => (
  <svg aria-hidden="true" className="w-full h-14" preserveAspectRatio="none">
    <rect x="0" y="0" width="100%" height="100%" fill="hsl(var(--card))" />
    {Array.from({ length: 80 }).map((_, i) => (
      <rect
        key={i}
        x={`${(i * 100) / 80}%`}
        y="0"
        width={Math.random() > 0.4 ? "1.2px" : "0.6px"}
        height="100%"
        fill="hsl(var(--card-foreground))"
      />
    ))}
  </svg>
));
Barcode.displayName = "Barcode";

// --- MAIN FLIGHT TICKET COMPONENT ---
export const FlightTicket = React.forwardRef<
  HTMLDivElement,
  FlightTicketProps
>(({ departure, arrival, flightDate, passengers, stubVariant = 'barcode', className }, ref) => {
  const formattedDate = flightDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = flightDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "w-full max-w-xs font-sans bg-card text-card-foreground border rounded-2xl shadow-lg overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      aria-label={`Flight ticket from ${departure.code} to ${arrival.code}`}
    >
      <div className="p-6 space-y-4">
        {/* Header and Flight Details... */}
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-card-foreground text-background rounded-full">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Flight Date</p>
              <p className="text-base font-bold">
                {formattedDate} &bull; {formattedTime}
              </p>
            </div>
          </div>

          <hr className="border-border/60" />

          {/* Flight Route */}
          <div className="flex items-center justify-between text-center">
            <div className="w-2/5">
              <h2 className="text-4xl font-black">{departure.code}</h2>
              <p className="text-xs text-muted-foreground truncate">{departure.name}</p>
            </div>
            <Plane className="w-5 h-5 text-muted-foreground" />
            <div className="w-2/5">
              <h2 className="text-4xl font-black">{arrival.code}</h2>
              <p className="text-xs text-muted-foreground truncate">{arrival.name}</p>
            </div>
          </div>

          <hr className="border-border/60" />
          
        {/* Passenger List */}
        <div className="space-y-3">
          {passengers.map((p, i) => (
             <div key={i} className="flex justify-between items-baseline">
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Baggage</p>
                  <p className="font-semibold text-sm">{p.baggage}</p>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* --- CONDITIONAL STUB AREA --- */}
      <div className="bg-card p-6 pt-4 border-t-2 border-dashed border-border">
        {stubVariant === 'barcode' ? (
          <Barcode />
        ) : (
          <div 
            className="w-full h-14 bg-card-foreground rounded-lg" 
            aria-label="Solid security strip"
          ></div>
        )}
      </div>
    </motion.div>
  );
});

FlightTicket.displayName = "FlightTicket";

code.demo.1758083128033.tsx
import { FlightTicket } from "@/components/ui/flight-ticket"; // Adjust path as needed

export default function FlightTicketDemo() {
  const ticketData = {
    departure: {
      code: "AMS",
      name: "Amsterdam Airport Schiphol",
    },
    arrival: {
      code: "CGK",
      name: "Soekarno Hatta International Airport",
    },
    flightDate: new Date("2024-04-29T14:15:00"),
    passengers: [
      {
        name: "Mr. Jonathan Wise",
        type: "Adult" as const,
        baggage: "20kg",
      },
      {
        name: "Mrs. Samantha William",
        type: "Adult" as const,
        baggage: "20kg",
      },
      {
        name: "Ms. Karen Summer",
        type: "Child" as const,
        baggage: "20kg",
      },
    ],
  };

  return (
    // The background is set to a neutral color to highlight the ticket
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <FlightTicket
        departure={ticketData.departure}
        arrival={ticketData.arrival}
        flightDate={ticketData.flightDate}
        passengers={ticketData.passengers}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/flight-ticket.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils"; // Your path to shadcn's 'cn' utility

// --- TYPE DEFINITIONS ---
type Airport = {
  code: string;
  name: string;
};

type Passenger = {
  name: string;
  type: "Adult" | "Child" | "Infant";
  baggage: string;
};

interface FlightTicketProps {
  /** The departure airport details. */
  departure: Airport;
  /** The arrival airport details. */
  arrival: Airport;
  /** The date and time of the flight. */
  flightDate: Date;
  /** An array of passenger objects. */
  passengers: Passenger[];
  /** NEW: Choose the appearance of the ticket stub. Defaults to 'barcode'. */
  stubVariant?: 'barcode' | 'solid';
  /** Optional custom class names for the container. */
  className?: string;
}

// --- BARCODE SUBCOMPONENT ---
const Barcode = React.memo(() => (
  <svg aria-hidden="true" className="w-full h-14" preserveAspectRatio="none">
    <rect x="0" y="0" width="100%" height="100%" fill="hsl(var(--card))" />
    {Array.from({ length: 80 }).map((_, i) => (
      <rect
        key={i}
        x={`${(i * 100) / 80}%`}
        y="0"
        width={Math.random() > 0.4 ? "1.2px" : "0.6px"}
        height="100%"
        fill="hsl(var(--card-foreground))"
      />
    ))}
  </svg>
));
Barcode.displayName = "Barcode";

// --- MAIN FLIGHT TICKET COMPONENT ---
export const FlightTicket = React.forwardRef<
  HTMLDivElement,
  FlightTicketProps
>(({ departure, arrival, flightDate, passengers, stubVariant = 'barcode', className }, ref) => {
  const formattedDate = flightDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = flightDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "w-full max-w-xs font-sans bg-card text-card-foreground border rounded-2xl shadow-lg overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      aria-label={`Flight ticket from ${departure.code} to ${arrival.code}`}
    >
      <div className="p-6 space-y-4">
        {/* Header and Flight Details... */}
        <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-card-foreground text-background rounded-full">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Flight Date</p>
              <p className="text-base font-bold">
                {formattedDate} &bull; {formattedTime}
              </p>
            </div>
          </div>

          <hr className="border-border/60" />

          {/* Flight Route */}
          <div className="flex items-center justify-between text-center">
            <div className="w-2/5">
              <h2 className="text-4xl font-black">{departure.code}</h2>
              <p className="text-xs text-muted-foreground truncate">{departure.name}</p>
            </div>
            <Plane className="w-5 h-5 text-muted-foreground" />
            <div className="w-2/5">
              <h2 className="text-4xl font-black">{arrival.code}</h2>
              <p className="text-xs text-muted-foreground truncate">{arrival.name}</p>
            </div>
          </div>

          <hr className="border-border/60" />
          
        {/* Passenger List */}
        <div className="space-y-3">
          {passengers.map((p, i) => (
             <div key={i} className="flex justify-between items-baseline">
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Baggage</p>
                  <p className="font-semibold text-sm">{p.baggage}</p>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* --- CONDITIONAL STUB AREA --- */}
      <div className="bg-card p-6 pt-4 border-t-2 border-dashed border-border">
        {stubVariant === 'barcode' ? (
          <Barcode />
        ) : (
          <div 
            className="w-full h-14 bg-card-foreground rounded-lg" 
            aria-label="Solid security strip"
          ></div>
        )}
      </div>
    </motion.div>
  );
});

FlightTicket.displayName = "FlightTicket";
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
