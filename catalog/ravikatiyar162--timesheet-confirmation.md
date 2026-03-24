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
timesheet-confirmation.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn button is in this path
import { Separator } from "@/components/ui/separator"; // Assuming shadcn separator
import { cn } from "@/lib/utils"; // Assuming shadcn utility

// --- TYPE DEFINITIONS ---
interface TimeEntry {
  date: string;
  duration: string;
}

interface FinancialDetail {
  label: string;
  value: number;
  isCommission?: boolean;
}

interface TimesheetConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  taskName: string;
  timeEntries: TimeEntry[];
  financials: FinancialDetail[];
  totalHours: string;
  takeHomeAmount: number;
  className?: string;
}

// --- CURRENCY FORMATTER ---
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// --- MAIN COMPONENT ---
export function TimesheetConfirmation({
  isOpen,
  onClose,
  clientName,
  taskName,
  timeEntries = [],
  financials = [],
  totalHours,
  takeHomeAmount,
  className,
}: TimesheetConfirmationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "relative m-4 w-full max-w-4xl overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg",
              className
            )}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Panel: Confirmation */}
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center bg-background/50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { delay: 0.2, type: "spring", stiffness: 200, damping: 15 } }}
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-semibold">Your timesheet is on its way for approval!</h2>
                <p className="text-sm text-muted-foreground">
                  We've sent it to your clients and are just waiting on their approval to get you paid.
                </p>
                <div className="mt-4 flex flex-col w-full max-w-xs gap-2">
                  <Button onClick={onClose} size="lg">Got It</Button>
                  <Button onClick={onClose} variant="ghost">Submit another Timecard</Button>
                </div>
              </div>

              {/* Right Panel: Summary */}
              <div className="relative p-8">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
                <h3 className="text-xl font-semibold mb-6">Timecard Summary</h3>
                
                {/* Client & Task Details */}
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Client</p>
                    <p className="font-medium">{clientName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Task</p>
                    <p className="font-medium">{taskName}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Time Entries */}
                <div className="space-y-3">
                  {timeEntries.map((entry, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.3 + index * 0.1 } }}
                    >
                      <p className="text-muted-foreground">{entry.date}</p>
                      <p className="font-mono">{entry.duration}</p>
                    </motion.div>
                  ))}
                  <div className="flex justify-between items-center text-sm font-medium pt-2">
                    <p>Total</p>
                    <p className="font-mono">{totalHours}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Financial Summary */}
                <div className="space-y-3 text-sm">
                  {financials.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`flex justify-between items-center ${item.isCommission ? "text-destructive" : ""}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.5 + index * 0.1 } }}
                    >
                      <p>{item.label}</p>
                      <p className="font-mono">{item.isCommission ? "-" : ""}{currencyFormatter.format(item.value)}</p>
                    </motion.div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.8 } }}
                >
                  <p className="font-semibold">Take Home</p>
                  <p className="text-2xl font-bold text-primary">{currencyFormatter.format(takeHomeAmount)}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

code.demo.1760110732984.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { TimesheetConfirmation } from "@/components/ui/timesheet-confirmation";

export default function TimesheetConfirmationDemo() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Sample data to be passed into the component
  const sampleData = {
    clientName: "ONE Collective GmbH",
    taskName: "Product Design",
    timeEntries: [
      { date: "Monday, 7 May 2024", duration: "4:30" },
      { date: "Wednesday, 9 May 2024", duration: "1:30" },
      { date: "Wednesday, 11 May 2024", duration: "2:00" },
    ],
    totalHours: "8:00",
    financials: [
      { label: "8 Hours of Work", value: 1440.00 },
      { label: "ACME Commission (20%)", value: 288.00, isCommission: true },
    ],
    takeHomeAmount: 1152.00,
  };
  
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <Button onClick={() => setIsDialogOpen(true)}>
        Submit Timesheet
      </Button>

      <TimesheetConfirmation
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        clientName={sampleData.clientName}
        taskName={sampleData.taskName}
        timeEntries={sampleData.timeEntries}
        financials={sampleData.financials}
        totalHours={sampleData.totalHours}
        takeHomeAmount={sampleData.takeHomeAmount}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/timesheet-confirmation.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn button is in this path
import { Separator } from "@/components/ui/separator"; // Assuming shadcn separator
import { cn } from "@/lib/utils"; // Assuming shadcn utility

// --- TYPE DEFINITIONS ---
interface TimeEntry {
  date: string;
  duration: string;
}

interface FinancialDetail {
  label: string;
  value: number;
  isCommission?: boolean;
}

interface TimesheetConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  taskName: string;
  timeEntries: TimeEntry[];
  financials: FinancialDetail[];
  totalHours: string;
  takeHomeAmount: number;
  className?: string;
}

// --- CURRENCY FORMATTER ---
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// --- MAIN COMPONENT ---
export function TimesheetConfirmation({
  isOpen,
  onClose,
  clientName,
  taskName,
  timeEntries = [],
  financials = [],
  totalHours,
  takeHomeAmount,
  className,
}: TimesheetConfirmationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "relative m-4 w-full max-w-4xl overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg",
              className
            )}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Panel: Confirmation */}
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center bg-background/50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { delay: 0.2, type: "spring", stiffness: 200, damping: 15 } }}
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-semibold">Your timesheet is on its way for approval!</h2>
                <p className="text-sm text-muted-foreground">
                  We've sent it to your clients and are just waiting on their approval to get you paid.
                </p>
                <div className="mt-4 flex flex-col w-full max-w-xs gap-2">
                  <Button onClick={onClose} size="lg">Got It</Button>
                  <Button onClick={onClose} variant="ghost">Submit another Timecard</Button>
                </div>
              </div>

              {/* Right Panel: Summary */}
              <div className="relative p-8">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
                <h3 className="text-xl font-semibold mb-6">Timecard Summary</h3>
                
                {/* Client & Task Details */}
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Client</p>
                    <p className="font-medium">{clientName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Task</p>
                    <p className="font-medium">{taskName}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Time Entries */}
                <div className="space-y-3">
                  {timeEntries.map((entry, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.3 + index * 0.1 } }}
                    >
                      <p className="text-muted-foreground">{entry.date}</p>
                      <p className="font-mono">{entry.duration}</p>
                    </motion.div>
                  ))}
                  <div className="flex justify-between items-center text-sm font-medium pt-2">
                    <p>Total</p>
                    <p className="font-mono">{totalHours}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Financial Summary */}
                <div className="space-y-3 text-sm">
                  {financials.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`flex justify-between items-center ${item.isCommission ? "text-destructive" : ""}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: 0.5 + index * 0.1 } }}
                    >
                      <p>{item.label}</p>
                      <p className="font-mono">{item.isCommission ? "-" : ""}{currencyFormatter.format(item.value)}</p>
                    </motion.div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.8 } }}
                >
                  <p className="font-semibold">Take Home</p>
                  <p className="text-2xl font-bold text-primary">{currencyFormatter.format(takeHomeAmount)}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
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
