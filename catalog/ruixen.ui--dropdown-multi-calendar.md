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
dropdown-multi-calendar.tsx
"use client";

import * as React from "react";
import { format, setMonth, setYear } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropdownMultiCalendar() {
  const today = new Date();
  const [month, setMonthState] = React.useState(today.getMonth());
  const [year, setYearState] = React.useState(today.getFullYear());
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

  const handleRemove = (date: Date) => {
    setSelectedDates((prev) =>
      prev.filter((d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"))
    );
  };

  const handleMonthChange = (newMonth: number) => {
    setMonthState(newMonth);
  };

  const handleYearChange = (newYear: number) => {
    setYearState(newYear);
  };

  const displayMonth = setMonth(setYear(today, year), month);

  return (
    <Card className="w-[400px] shadow-none border-none bg-background">
      <CardContent className="flex flex-col gap-4">
        {/* Dropdowns */}
        <div className="flex gap-2">
          {/* Year Select */}
          <Select
            value={year.toString()}
            onValueChange={(val) => handleYearChange(Number(val))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 50 }, (_, i) => year - 25 + i).map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month Select */}
          <Select
            value={month.toString()}
            onValueChange={(val) => handleMonthChange(Number(val))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {format(new Date(2000, i, 1), "MMMM")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar */}
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={(dates) => setSelectedDates(dates ?? [])}
          month={displayMonth}
          onMonthChange={(date) => {
            setMonthState(date.getMonth());
            setYearState(date.getFullYear());
          }}
          className="rounded-md border"
        />

        {/* Selected dates list */}
        <div className="flex flex-wrap gap-2">
          {selectedDates.length === 0 && (
            <p className="text-xs text-muted-foreground">No dates selected</p>
          )}
          {selectedDates
            .sort((a, b) => a.getTime() - b.getTime())
            .map((d) => (
              <Badge
                key={d.toISOString()}
                variant="secondary"
                className="flex items-center gap-2"
              >
                {format(d, "PPP")}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemove(d)}
                >
                  ✕
                </Button>
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          onClick={() => console.log("Selected dates:", selectedDates)}
          disabled={selectedDates.length === 0}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}

export { DropdownMultiCalendar };


code.demo.1758990466880.tsx
"use client";

import { DropdownMultiCalendar } from "@/components/ui/dropdown-multi-calendar";

export default function DropdownMultiCalendarDemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <DropdownMultiCalendar />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dropdown-multi-calendar.tsx
"use client";

import * as React from "react";
import { format, setMonth, setYear } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropdownMultiCalendar() {
  const today = new Date();
  const [month, setMonthState] = React.useState(today.getMonth());
  const [year, setYearState] = React.useState(today.getFullYear());
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

  const handleRemove = (date: Date) => {
    setSelectedDates((prev) =>
      prev.filter((d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"))
    );
  };

  const handleMonthChange = (newMonth: number) => {
    setMonthState(newMonth);
  };

  const handleYearChange = (newYear: number) => {
    setYearState(newYear);
  };

  const displayMonth = setMonth(setYear(today, year), month);

  return (
    <Card className="w-[400px] shadow-none border-none bg-background">
      <CardContent className="flex flex-col gap-4">
        {/* Dropdowns */}
        <div className="flex gap-2">
          {/* Year Select */}
          <Select
            value={year.toString()}
            onValueChange={(val) => handleYearChange(Number(val))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 50 }, (_, i) => year - 25 + i).map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month Select */}
          <Select
            value={month.toString()}
            onValueChange={(val) => handleMonthChange(Number(val))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {format(new Date(2000, i, 1), "MMMM")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar */}
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={(dates) => setSelectedDates(dates ?? [])}
          month={displayMonth}
          onMonthChange={(date) => {
            setMonthState(date.getMonth());
            setYearState(date.getFullYear());
          }}
          className="rounded-md border"
        />

        {/* Selected dates list */}
        <div className="flex flex-wrap gap-2">
          {selectedDates.length === 0 && (
            <p className="text-xs text-muted-foreground">No dates selected</p>
          )}
          {selectedDates
            .sort((a, b) => a.getTime() - b.getTime())
            .map((d) => (
              <Badge
                key={d.toISOString()}
                variant="secondary"
                className="flex items-center gap-2"
              >
                {format(d, "PPP")}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemove(d)}
                >
                  ✕
                </Button>
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          onClick={() => console.log("Selected dates:", selectedDates)}
          disabled={selectedDates.length === 0}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}

export { DropdownMultiCalendar };

```

Install NPM dependencies:
```bash
date-fns
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
