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
calendar-lume.tsx
"use client";

import { useState } from "react";
import {
  format,
  eachYearOfInterval,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from "date-fns";
import { Calendar as BaseCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

function CalendarLume() {
  const today = new Date();
  const [step, setStep] = useState<"year" | "month" | "day">("year");
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);

  // years 1900 → 2100
  const yearRange = eachYearOfInterval({
    start: startOfYear(new Date(1900, 0, 1)),
    end: endOfYear(new Date(2100, 11, 31)),
  });

  return (
    <div className="rounded-xl bg-background/80 backdrop-blur-md w-[380px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">
          {step === "year" && "Select a Year"}
          {step === "month" && `Year ${selectedYear}`}
          {step === "day" && format(selectedDate ?? today, "MMMM yyyy")}
        </h2>

        {/* Breadcrumb buttons */}
        <div className="flex gap-2">
          <Button
            variant={step === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setStep("year")}
          >
            Year
          </Button>
          <Button
            variant={step === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setStep("month")}
            disabled={step === "year"} // can't go to month before selecting a year
          >
            Month
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "year" && (
          <motion.div
            key="year"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-80"
          >
            <ScrollArea className="h-full">
              <div className="grid grid-cols-3 gap-2">
                {yearRange.map((year) => (
                  <Button
                    key={year.getFullYear()}
                    variant={
                      year.getFullYear() === selectedYear ? "default" : "outline"
                    }
                    size="sm"
                    className="h-10"
                    onClick={() => {
                      setSelectedYear(year.getFullYear());
                      setStep("month");
                    }}
                  >
                    {year.getFullYear()}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}

        {step === "month" && (
          <motion.div
            key="month"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-3 gap-2"
          >
            {eachMonthOfInterval({
              start: startOfYear(new Date(selectedYear, 0, 1)),
              end: endOfYear(new Date(selectedYear, 11, 31)),
            }).map((month) => (
              <Button
                key={month.toISOString()}
                variant={
                  month.getMonth() === selectedMonth ? "default" : "outline"
                }
                size="sm"
                className="h-12 flex flex-col"
                onClick={() => {
                  setSelectedMonth(month.getMonth());
                  setStep("day");
                  setSelectedDate(new Date(selectedYear, month.getMonth(), 1));
                }}
              >
                <span className="text-sm font-medium">
                  {format(month, "MMM")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedYear}
                </span>
              </Button>
            ))}
          </motion.div>
        )}

        {step === "day" && (
          <motion.div
            key="day"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BaseCalendar
              mode="single"
              month={new Date(selectedYear, selectedMonth, 1)}
              selected={selectedDate}
              onSelect={setSelectedDate}
              onMonthChange={(date) => {
                setSelectedYear(date.getFullYear());
                setSelectedMonth(date.getMonth());
              }}
              className="rounded-lg border border-border bg-card mx-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { CalendarLume };


code.demo.1758969585790.tsx
"use client";

import { CalendarLume } from "@/components/ui/calendar-lume";

export default function CalendarDemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center to-slate-200 p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Better Calendar Demo
        </h1>
        <CalendarLume />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/calendar-lume.tsx
"use client";

import { useState } from "react";
import {
  format,
  eachYearOfInterval,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from "date-fns";
import { Calendar as BaseCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

function CalendarLume() {
  const today = new Date();
  const [step, setStep] = useState<"year" | "month" | "day">("year");
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);

  // years 1900 → 2100
  const yearRange = eachYearOfInterval({
    start: startOfYear(new Date(1900, 0, 1)),
    end: endOfYear(new Date(2100, 11, 31)),
  });

  return (
    <div className="rounded-xl bg-background/80 backdrop-blur-md w-[380px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">
          {step === "year" && "Select a Year"}
          {step === "month" && `Year ${selectedYear}`}
          {step === "day" && format(selectedDate ?? today, "MMMM yyyy")}
        </h2>

        {/* Breadcrumb buttons */}
        <div className="flex gap-2">
          <Button
            variant={step === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setStep("year")}
          >
            Year
          </Button>
          <Button
            variant={step === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setStep("month")}
            disabled={step === "year"} // can't go to month before selecting a year
          >
            Month
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "year" && (
          <motion.div
            key="year"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-80"
          >
            <ScrollArea className="h-full">
              <div className="grid grid-cols-3 gap-2">
                {yearRange.map((year) => (
                  <Button
                    key={year.getFullYear()}
                    variant={
                      year.getFullYear() === selectedYear ? "default" : "outline"
                    }
                    size="sm"
                    className="h-10"
                    onClick={() => {
                      setSelectedYear(year.getFullYear());
                      setStep("month");
                    }}
                  >
                    {year.getFullYear()}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}

        {step === "month" && (
          <motion.div
            key="month"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-3 gap-2"
          >
            {eachMonthOfInterval({
              start: startOfYear(new Date(selectedYear, 0, 1)),
              end: endOfYear(new Date(selectedYear, 11, 31)),
            }).map((month) => (
              <Button
                key={month.toISOString()}
                variant={
                  month.getMonth() === selectedMonth ? "default" : "outline"
                }
                size="sm"
                className="h-12 flex flex-col"
                onClick={() => {
                  setSelectedMonth(month.getMonth());
                  setStep("day");
                  setSelectedDate(new Date(selectedYear, month.getMonth(), 1));
                }}
              >
                <span className="text-sm font-medium">
                  {format(month, "MMM")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedYear}
                </span>
              </Button>
            ))}
          </motion.div>
        )}

        {step === "day" && (
          <motion.div
            key="day"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BaseCalendar
              mode="single"
              month={new Date(selectedYear, selectedMonth, 1)}
              selected={selectedDate}
              onSelect={setSelectedDate}
              onMonthChange={(date) => {
                setSelectedYear(date.getFullYear());
                setSelectedMonth(date.getMonth());
              }}
              className="rounded-lg border border-border bg-card mx-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { CalendarLume };

```

Install NPM dependencies:
```bash
date-fns, framer-motion
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
