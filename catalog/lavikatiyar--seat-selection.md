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
seat-selection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assumes shadcn/ui's utility function

// SECTION: Type Definitions for component props

export interface SeatInfo {
  id: string; // Unique identifier for the seat, e.g., 'A1'
  number?: number; // The display number on the seat
  isSpacer?: boolean; // Renders an empty space instead of a seat
}

export interface SeatRowInfo {
  rowId: string; // The row identifier, e.g., 'A'
  seats: SeatInfo[];
}

export interface SeatCategoryInfo {
  categoryName: string; // e.g., 'PRIME', 'CLASSIC'
  price: number;
  rows: SeatRowInfo[];
}

interface SeatSelectionProps {
  layout: SeatCategoryInfo[];
  selectedSeats: string[];
  occupiedSeats: string[];
  onSeatSelect: (seatId: string) => void; // Callback function for seat interaction
  className?: string;
}

// !SECTION

// --- Sub-components ---

// Renders the curved screen at the top
const Screen = () => (
  <div className="relative w-full flex justify-center items-center mb-12">
    <motion.div
      className="h-12 w-full max-w-2xl border-b-4 border-foreground"
      style={{
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        boxShadow: '0px 15px 30px -5px hsl(var(--foreground) / 0.5)',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
    <motion.span
      className="absolute -bottom-2 text-sm font-medium tracking-widest text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      SCREEN
    </motion.span>
  </div>
);

// Renders an individual seat
interface SeatProps {
  seat: SeatInfo;
  status: 'available' | 'selected' | 'occupied';
  onSelect: (id: string) => void;
}

const Seat = React.memo(({ seat, status, onSelect }: SeatProps) => {
  // Render a spacer div if the seat is a spacer
  if (seat.isSpacer) {
    return <div className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />;
  }

  const isOccupied = status === 'occupied';

  return (
    <motion.button
      onClick={() => !isOccupied && onSelect(seat.id)}
      disabled={isOccupied}
      aria-label={`Seat ${seat.id}, ${status}`}
      aria-pressed={status === 'selected'}
      className={cn(
        'w-8 h-8 md:w-10 md:h-10 rounded-md border flex items-center justify-center text-xs font-semibold transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background',
        {
          'bg-card text-card-foreground hover:bg-accent hover:border-primary cursor-pointer': status === 'available',
          'bg-primary text-primary-foreground border-primary cursor-pointer': status === 'selected',
          'bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50': isOccupied,
        }
      )}
      // Animation props for visual feedback
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: isOccupied ? 1 : 1.1, y: isOccupied ? 0 : -2 }}
      whileTap={{ scale: isOccupied ? 1 : 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {seat.number}
    </motion.button>
  );
});
Seat.displayName = 'Seat';

// --- Main Component ---

export const SeatSelection = ({
  layout,
  selectedSeats,
  occupiedSeats,
  onSeatSelect,
  className,
}: SeatSelectionProps) => {
  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.02 } },
  };

  return (
    <div className={cn('w-full flex flex-col items-center gap-12 p-4 bg-background', className)}>
      <Screen />
      <motion.div
        className="w-full flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {layout.map((category) => (
          <div key={category.categoryName} className="flex flex-col items-center gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              {category.categoryName} ({new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(category.price)} + GST)
            </h3>
            <div className="w-full bg-card p-2 sm:p-4 rounded-lg border flex flex-col gap-2">
              {category.rows.map((row) => (
                <motion.div
                  key={row.rowId}
                  className="flex items-center justify-center gap-2"
                  variants={rowVariants}
                >
                  <div className="w-6 text-sm font-medium text-muted-foreground select-none">{row.rowId}</div>
                  <div className="flex-1 flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap">
                    {row.seats.map((seat) => (
                      <Seat
                        key={seat.id}
                        seat={seat}
                        onSelect={onSeatSelect}
                        status={
                          occupiedSeats.includes(seat.id)
                            ? 'occupied'
                            : selectedSeats.includes(seat.id)
                            ? 'selected'
                            : 'available'
                        }
                      />
                    ))}
                  </div>
                  <div className="w-6 text-sm font-medium text-muted-foreground select-none">{row.rowId}</div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

code.demo.1758160983442.tsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SeatSelection,
  SeatCategoryInfo,
} from '@/components/ui/seat-selection';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui Button

// --- Helper to generate seat layout data programmatically ---
const generateSeats = (start: number, end: number, rowId: string) => {
    let seats = [];
    for (let i = start; i <= end; i++) {
        seats.push({ id: `${rowId}${i}`, number: i });
    }
    return seats;
};

// --- Demo Data structured based on the provided image ---
const seatLayoutData: SeatCategoryInfo[] = [
  {
    categoryName: 'CLASSIC',
    price: 135.58,
    rows: [
      { rowId: 'A', seats: [...generateSeats(1, 9, 'A'), { id: 'A-spacer', isSpacer: true }, ...generateSeats(10, 21, 'A')] },
      { rowId: 'B', seats: [...generateSeats(1, 9, 'B'), { id: 'B-spacer', isSpacer: true }, ...generateSeats(10, 21, 'B')] },
      { rowId: 'C', seats: [...generateSeats(1, 2, 'C'), { id: 'C-spacer-1', isSpacer: true }, ...generateSeats(3, 9, 'C'), { id: 'C-spacer-2', isSpacer: true }, ...generateSeats(10, 12, 'C'), { id: 'C-spacer-3', isSpacer: true }, ...generateSeats(13, 21, 'C')] },
    ],
  },
  {
    categoryName: 'CLASSIC PLUS',
    price: 169.48,
    rows: [
      { rowId: 'D', seats: [...generateSeats(1, 9, 'D'), { id: 'D-spacer', isSpacer: true }, ...generateSeats(10, 21, 'D')] },
      { rowId: 'E', seats: [...generateSeats(1, 9, 'E'), { id: 'E-spacer', isSpacer: true }, ...generateSeats(10, 21, 'E')] },
      { rowId: 'F', seats: [...generateSeats(1, 9, 'F'), { id: 'F-spacer', isSpacer: true }, ...generateSeats(10, 21, 'F')] },
      { rowId: 'G', seats: [...generateSeats(1, 9, 'G'), { id: 'G-spacer', isSpacer: true }, ...generateSeats(10, 21, 'G')] },
      { rowId: 'H', seats: [...generateSeats(1, 9, 'H'), { id: 'H-spacer', isSpacer: true }, ...generateSeats(10, 21, 'H')] },
    ],
  },
  {
    categoryName: 'PRIME',
    price: 186.44,
    rows: [
        { rowId: 'J', seats: [...generateSeats(1, 13, 'J'), { id: 'J-spacer', isSpacer: true }, ...generateSeats(14, 25, 'J')] },
        { rowId: 'K', seats: [...generateSeats(1, 13, 'K'), { id: 'K-spacer', isSpacer: true }, ...generateSeats(14, 25, 'K')] },
    ],
  },
];

// Seat legend component for the demo
const Legend = () => (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 p-4 rounded-md border bg-card text-card-foreground">
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded border bg-card"></div><span className="text-sm">Available</span></div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded border-primary bg-primary"></div><span className="text-sm">Selected</span></div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded border bg-muted opacity-50"></div><span className="text-sm">Occupied</span></div>
    </div>
);

const SeatSelectionDemo = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['H12']);
  const occupiedSeats = useMemo(() => ['J17', 'J18', 'J19', 'C1', 'C2', 'C10', 'C11', 'G9'], []);

  // Handles seat selection logic, allowing toggle
  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  // Calculates total price based on selected seats
  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seatId) => {
      for (const category of seatLayoutData) {
        if (category.rows.some(row => row.seats.some(seat => seat.id === seatId))) {
          return total + category.price;
        }
      }
      return total;
    }, 0);
  }, [selectedSeats]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center py-8">
      <SeatSelection
        layout={seatLayoutData}
        selectedSeats={selectedSeats}
        occupiedSeats={occupiedSeats}
        onSeatSelect={handleSeatSelect}
      />
      <Legend />
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div
            className="mt-8 w-full max-w-md p-4 bg-card border rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-foreground">Your Selection</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSeats.sort().map(seatId => (
                <span key={seatId} className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                  {seatId}
                </span>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-md font-medium text-muted-foreground">Total Price:</span>
                <span className="text-xl font-bold text-foreground">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalPrice)}
                    <span className="text-xs font-normal text-muted-foreground"> + GST</span>
                </span>
            </div>
            <Button className="w-full mt-4">Proceed to Payment</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatSelectionDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/seat-selection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assumes shadcn/ui's utility function

// SECTION: Type Definitions for component props

export interface SeatInfo {
  id: string; // Unique identifier for the seat, e.g., 'A1'
  number?: number; // The display number on the seat
  isSpacer?: boolean; // Renders an empty space instead of a seat
}

export interface SeatRowInfo {
  rowId: string; // The row identifier, e.g., 'A'
  seats: SeatInfo[];
}

export interface SeatCategoryInfo {
  categoryName: string; // e.g., 'PRIME', 'CLASSIC'
  price: number;
  rows: SeatRowInfo[];
}

interface SeatSelectionProps {
  layout: SeatCategoryInfo[];
  selectedSeats: string[];
  occupiedSeats: string[];
  onSeatSelect: (seatId: string) => void; // Callback function for seat interaction
  className?: string;
}

// !SECTION

// --- Sub-components ---

// Renders the curved screen at the top
const Screen = () => (
  <div className="relative w-full flex justify-center items-center mb-12">
    <motion.div
      className="h-12 w-full max-w-2xl border-b-4 border-foreground"
      style={{
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        boxShadow: '0px 15px 30px -5px hsl(var(--foreground) / 0.5)',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
    <motion.span
      className="absolute -bottom-2 text-sm font-medium tracking-widest text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      SCREEN
    </motion.span>
  </div>
);

// Renders an individual seat
interface SeatProps {
  seat: SeatInfo;
  status: 'available' | 'selected' | 'occupied';
  onSelect: (id: string) => void;
}

const Seat = React.memo(({ seat, status, onSelect }: SeatProps) => {
  // Render a spacer div if the seat is a spacer
  if (seat.isSpacer) {
    return <div className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />;
  }

  const isOccupied = status === 'occupied';

  return (
    <motion.button
      onClick={() => !isOccupied && onSelect(seat.id)}
      disabled={isOccupied}
      aria-label={`Seat ${seat.id}, ${status}`}
      aria-pressed={status === 'selected'}
      className={cn(
        'w-8 h-8 md:w-10 md:h-10 rounded-md border flex items-center justify-center text-xs font-semibold transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background',
        {
          'bg-card text-card-foreground hover:bg-accent hover:border-primary cursor-pointer': status === 'available',
          'bg-primary text-primary-foreground border-primary cursor-pointer': status === 'selected',
          'bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50': isOccupied,
        }
      )}
      // Animation props for visual feedback
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: isOccupied ? 1 : 1.1, y: isOccupied ? 0 : -2 }}
      whileTap={{ scale: isOccupied ? 1 : 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {seat.number}
    </motion.button>
  );
});
Seat.displayName = 'Seat';

// --- Main Component ---

export const SeatSelection = ({
  layout,
  selectedSeats,
  occupiedSeats,
  onSeatSelect,
  className,
}: SeatSelectionProps) => {
  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.02 } },
  };

  return (
    <div className={cn('w-full flex flex-col items-center gap-12 p-4 bg-background', className)}>
      <Screen />
      <motion.div
        className="w-full flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {layout.map((category) => (
          <div key={category.categoryName} className="flex flex-col items-center gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              {category.categoryName} ({new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(category.price)} + GST)
            </h3>
            <div className="w-full bg-card p-2 sm:p-4 rounded-lg border flex flex-col gap-2">
              {category.rows.map((row) => (
                <motion.div
                  key={row.rowId}
                  className="flex items-center justify-center gap-2"
                  variants={rowVariants}
                >
                  <div className="w-6 text-sm font-medium text-muted-foreground select-none">{row.rowId}</div>
                  <div className="flex-1 flex justify-center items-center gap-1.5 sm:gap-2 flex-wrap">
                    {row.seats.map((seat) => (
                      <Seat
                        key={seat.id}
                        seat={seat}
                        onSelect={onSeatSelect}
                        status={
                          occupiedSeats.includes(seat.id)
                            ? 'occupied'
                            : selectedSeats.includes(seat.id)
                            ? 'selected'
                            : 'available'
                        }
                      />
                    ))}
                  </div>
                  <div className="w-6 text-sm font-medium text-muted-foreground select-none">{row.rowId}</div>
                </motion.div>
              ))}
            </div>
          </div>
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
