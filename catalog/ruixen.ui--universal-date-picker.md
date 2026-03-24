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
universal-date-picker.tsx
"use client";

import * as React from "react";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, subMonths } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

type Mode = "single" | "range";

export function UniversalDatePicker({ className }: { className?: string }) {
  const id = useId();
  const [mode, setMode] = useState<Mode>("single");
  const [date, setDate] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();

  const today = new Date();
  const presets = [
    { label: "Today", range: { from: today, to: today } },
    { label: "Yesterday", range: { from: subDays(today, 1), to: subDays(today, 1) } },
    { label: "Last 7 days", range: { from: subDays(today, 6), to: today } },
    { label: "Last 30 days", range: { from: subDays(today, 29), to: today } },
    { label: "This Month", range: { from: startOfMonth(today), to: endOfMonth(today) } },
    { label: "Last Month", range: { from: startOfMonth(subMonths(today, 1)), to: endOfMonth(subMonths(today, 1)) } },
    { label: "This Year", range: { from: startOfYear(today), to: endOfYear(today) } },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>Date picker (Advanced)</Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === "single" ? "default" : "outline"}
            onClick={() => setMode("single")}
          >
            Single
          </Button>
          <Button
            size="sm"
            variant={mode === "range" ? "default" : "outline"}
            onClick={() => setMode("range")}
          >
            Range
          </Button>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "group w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
              !date && !range && "text-muted-foreground"
            )}
          >
            <span className="truncate">
              {mode === "single" && date
                ? format(date, "PPP")
                : mode === "range" && range
                ? `${range.from ? format(range.from, "PPP") : "—"} – ${
                    range.to ? format(range.to, "PPP") : "—"
                  }`
                : "Pick a date"}
            </span>
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto max-h-[300px] overflow-y-auto p-3 space-y-3" align="start">
          {/* Presets */}
          <Card className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <Button
                  key={p.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    if (mode === "single") {
                      setDate(p.range.to);
                    } else {
                      setRange(p.range);
                    }
                  }}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Calendar */}
          <Calendar
            mode={mode}
            selected={mode === "single" ? date : range}
            onSelect={mode === "single" ? setDate : setRange}
            showOutsideDays
            className="rounded-md border"
          />

          {/* Year Selector */}
          <Card className="p-3">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 9 }, (_, i) => today.getFullYear() - 4 + i).map(
                (year) => (
                  <Button
                    key={year}
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const yDate = new Date(year, today.getMonth(), today.getDate());
                      if (mode === "single") {
                        setDate(yDate);
                      } else {
                        setRange({ from: startOfYear(yDate), to: endOfYear(yDate) });
                      }
                    }}
                  >
                    {year}
                  </Button>
                )
              )}
            </div>
          </Card>
        </PopoverContent>
      </Popover>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Inspired by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}


code.demo.1758959564165.tsx
"use client";

import { Card } from "@/components/ui/card";
import { UniversalDatePicker } from "@/components/ui/universal-date-picker";

export default function UniversalDatePickerDemo() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <Card className="p-6 max-w-lg w-full space-y-4 shadow-none border-none">
        <h2 className="text-lg font-semibold">Date Picker Demo</h2>
        <p className="text-sm text-muted-foreground">
          This date picker supports single and range modes, quick presets, and year selection.
        </p>
        <UniversalDatePicker />
      </Card>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/universal-date-picker.tsx
"use client";

import * as React from "react";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, subMonths } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

type Mode = "single" | "range";

export function UniversalDatePicker({ className }: { className?: string }) {
  const id = useId();
  const [mode, setMode] = useState<Mode>("single");
  const [date, setDate] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();

  const today = new Date();
  const presets = [
    { label: "Today", range: { from: today, to: today } },
    { label: "Yesterday", range: { from: subDays(today, 1), to: subDays(today, 1) } },
    { label: "Last 7 days", range: { from: subDays(today, 6), to: today } },
    { label: "Last 30 days", range: { from: subDays(today, 29), to: today } },
    { label: "This Month", range: { from: startOfMonth(today), to: endOfMonth(today) } },
    { label: "Last Month", range: { from: startOfMonth(subMonths(today, 1)), to: endOfMonth(subMonths(today, 1)) } },
    { label: "This Year", range: { from: startOfYear(today), to: endOfYear(today) } },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>Date picker (Advanced)</Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === "single" ? "default" : "outline"}
            onClick={() => setMode("single")}
          >
            Single
          </Button>
          <Button
            size="sm"
            variant={mode === "range" ? "default" : "outline"}
            onClick={() => setMode("range")}
          >
            Range
          </Button>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "group w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
              !date && !range && "text-muted-foreground"
            )}
          >
            <span className="truncate">
              {mode === "single" && date
                ? format(date, "PPP")
                : mode === "range" && range
                ? `${range.from ? format(range.from, "PPP") : "—"} – ${
                    range.to ? format(range.to, "PPP") : "—"
                  }`
                : "Pick a date"}
            </span>
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto max-h-[300px] overflow-y-auto p-3 space-y-3" align="start">
          {/* Presets */}
          <Card className="p-2">
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <Button
                  key={p.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    if (mode === "single") {
                      setDate(p.range.to);
                    } else {
                      setRange(p.range);
                    }
                  }}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Calendar */}
          <Calendar
            mode={mode}
            selected={mode === "single" ? date : range}
            onSelect={mode === "single" ? setDate : setRange}
            showOutsideDays
            className="rounded-md border"
          />

          {/* Year Selector */}
          <Card className="p-3">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 9 }, (_, i) => today.getFullYear() - 4 + i).map(
                (year) => (
                  <Button
                    key={year}
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const yDate = new Date(year, today.getMonth(), today.getDate());
                      if (mode === "single") {
                        setDate(yDate);
                      } else {
                        setRange({ from: startOfYear(yDate), to: endOfYear(yDate) });
                      }
                    }}
                  >
                    {year}
                  </Button>
                )
              )}
            </div>
          </Card>
        </PopoverContent>
      </Popover>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Inspired by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
date-fns, lucide-react, react-day-picker
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
