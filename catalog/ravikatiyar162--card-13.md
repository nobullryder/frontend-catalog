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
card-13.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn

// Define the type for a single slot
export interface Slot {
  id: string | number;
  day: number;
  month: string;
}

// Define the props for the AvailabilityCard component
export interface AvailabilityCardProps {
  /**
   * The main title for the card.
   */
  title?: string;
  /**
   * An array of available slots to display.
   */
  slots: Slot[];
  /**
   * The ID of the currently selected slot.
   */
  selectedSlotId: string | number | null;
  /**
   * Callback function triggered when a slot is selected.
   */
  onSlotSelect: (id: string | number) => void;
  /**
   * Optional additional class names for the card container.
   */
  className?: string;
}

/**
 * A card component to display and select available time slots.
 * It's responsive, theme-aware, and includes animations.
 */
export const AvailabilityCard = ({
  title = "Free Slots Available",
  slots,
  selectedSlotId,
  onSlotSelect,
  className,
}: AvailabilityCardProps) => {
  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Animation variants for each slot item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-lg",
        className
      )}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <motion.div
        className="grid grid-cols-2 gap-4 p-6 pt-0 sm:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {slots.map((slot) => (
          <motion.button
            key={slot.id}
            onClick={() => onSlotSelect(slot.id)}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={slot.id === selectedSlotId}
            className={cn(
              "flex aspect-square flex-col items-center justify-center rounded-lg border text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              slot.id === selectedSlotId
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <span className="text-3xl font-bold leading-none">
              {slot.day.toString().padStart(2, '0')}
            </span>
            <span
              className={cn(
                "mt-1",
                slot.id === selectedSlotId
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              )}
            >
              {slot.month}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

code.demo.1757834104317.tsx
import * as React from "react";
import { AvailabilityCard, Slot } from "@/components/ui/card-13";

// Sample data for the demo
const sampleSlots: Slot[] = [
  { id: 1, day: 12, month: "June" },
  { id: 2, day: 18, month: "June" },
  { id: 3, day: 20, month: "June" },
  { id: 4, day: 2, month: "July" },
  { id: 5, day: 10, month: "July" },
  { id: 6, day: 15, month: "July" },
];

/**
 * A demo component to showcase the AvailabilityCard.
 */
export default function AvailabilityCardDemo() {
  // State to manage the currently selected slot
  const [selectedSlot, setSelectedSlot] = React.useState<string | number | null>(sampleSlots[0].id);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <AvailabilityCard
        slots={sampleSlots}
        selectedSlotId={selectedSlot}
        onSlotSelect={setSelectedSlot}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-13.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn

// Define the type for a single slot
export interface Slot {
  id: string | number;
  day: number;
  month: string;
}

// Define the props for the AvailabilityCard component
export interface AvailabilityCardProps {
  /**
   * The main title for the card.
   */
  title?: string;
  /**
   * An array of available slots to display.
   */
  slots: Slot[];
  /**
   * The ID of the currently selected slot.
   */
  selectedSlotId: string | number | null;
  /**
   * Callback function triggered when a slot is selected.
   */
  onSlotSelect: (id: string | number) => void;
  /**
   * Optional additional class names for the card container.
   */
  className?: string;
}

/**
 * A card component to display and select available time slots.
 * It's responsive, theme-aware, and includes animations.
 */
export const AvailabilityCard = ({
  title = "Free Slots Available",
  slots,
  selectedSlotId,
  onSlotSelect,
  className,
}: AvailabilityCardProps) => {
  // Animation variants for the container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Animation variants for each slot item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-lg",
        className
      )}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>
      <motion.div
        className="grid grid-cols-2 gap-4 p-6 pt-0 sm:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {slots.map((slot) => (
          <motion.button
            key={slot.id}
            onClick={() => onSlotSelect(slot.id)}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={slot.id === selectedSlotId}
            className={cn(
              "flex aspect-square flex-col items-center justify-center rounded-lg border text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              slot.id === selectedSlotId
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <span className="text-3xl font-bold leading-none">
              {slot.day.toString().padStart(2, '0')}
            </span>
            <span
              className={cn(
                "mt-1",
                slot.id === selectedSlotId
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              )}
            >
              {slot.month}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
framer-motion
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
