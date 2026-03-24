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
multi-month-calendar.tsx
"use client";

import * as React from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type MultiMonthCalendarProps = {
  numberOfMonths?: number;
  mode?: "single" | "range";
  selected?: Date | DateRange | undefined;
  onSelect?: (date: Date | DateRange | undefined) => void;
  showOutsideDays?: boolean;
  className?: string;
};

function MultiMonthCalendar({
  numberOfMonths = 2,
  mode = "single",
  selected,
  onSelect,
  showOutsideDays = true,
  className,
}: MultiMonthCalendarProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // ✅ Default select = today
  const defaultSelected =
    selected ??
    (mode === "range" ? { from: today, to: today } : today);

  const defaultComponents = {
    Chevron: (props: any) =>
      props.orientation === "left" ? (
        <ChevronLeft size={16} strokeWidth={2} {...props} aria-hidden="true" />
      ) : (
        <ChevronRight size={16} strokeWidth={2} {...props} aria-hidden="true" />
      ),
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Year / Month dropdowns */}
      <div className="flex justify-center gap-2">
        <Select defaultValue={String(currentYear)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 5 }).map((_, idx) => {
              const year = currentYear - 2 + idx;
              return (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select defaultValue={String(currentMonth)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }).map((_, idx) => (
              <SelectItem key={idx} value={String(idx)}>
                {new Date(0, idx).toLocaleString("default", { month: "long" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <DayPicker
        mode={mode}
        numberOfMonths={numberOfMonths}
        selected={defaultSelected}
        onSelect={onSelect}
        showOutsideDays={showOutsideDays}
        className={cn("rounded-lg border border-border bg-background p-2 w-fit", className)}
        components={defaultComponents}
        classNames={{
          months: "flex flex-col sm:flex-row gap-6",
          month_caption: "text-sm font-medium text-center mb-2",
          weekday: "text-xs font-medium text-muted-foreground/80",

          // ✅ Selection Highlight Styles
          day_button: cn(
            "relative flex size-9 items-center justify-center rounded-md text-sm",
            "hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white",
            // selected single day or range start/end
            "group-data-[selected]:bg-black group-data-[selected]:text-white dark:group-data-[selected]:bg-white dark:group-data-[selected]:text-black",
            // range middle (lighter gray in light theme, same dark gray in dark theme)
            "group-[.range-middle]:bg-neutral-200 dark:group-[.range-middle]:bg-neutral-700 group-[.range-middle]:text-black dark:group-[.range-middle]:text-white",
            // smooth range edges
            "group-[.range-start:not(.range-end)]:rounded-r-none group-[.range-end:not(.range-start)]:rounded-l-none group-[.range-middle]:rounded-none",
            // disabled / outside
            "group-data-[disabled]:text-muted-foreground/30 group-data-[disabled]:line-through group-data-[disabled]:pointer-events-none group-data-[outside]:text-muted-foreground/30"
          ),

          day: "group size-9 px-0 text-sm",
          range_start: "range-start",
          range_end: "range-end",
          range_middle: "range-middle",

          // today marker
          today:
            "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-black dark:*:after:bg-white",
        }}
      />

      {/* Credits */}
      <p className="text-xs text-muted-foreground text-center mt-2">
        Powered by{" "}
        <a
          href="https://www.ruixen.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          ruixen.com
        </a>
      </p>
    </div>
  );
}
MultiMonthCalendar.displayName = "MultiMonthCalendar";

export { MultiMonthCalendar };


code.demo.1758954438005.tsx
"use client";

import { useState } from "react";
import { MultiMonthCalendar } from "@/components/ui/multi-month-calendar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

export default function DemoMultiMonthCalendar() {
  const today = new Date();

  // Range example
  const [range, setRange] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 3),
  });

  // Single date example
  const [single, setSingle] = useState<Date | undefined>(today);

  return (
    <div className="flex flex-col gap-10 p-8">
      <h1 className="text-xl font-semibold text-center">Multi-Month Calendar Demo</h1>

      {/* Range Mode */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-semibold">Range Mode</h2>
        <MultiMonthCalendar
          numberOfMonths={3}
          mode="range"
          selected={range}
          onSelect={setRange}
        />
        {range?.from && range?.to && (
          <p className="text-sm text-muted-foreground">
            Selected: {range.from.toDateString()} → {range.to.toDateString()}
          </p>
        )}
      </div>

      {/* Single Mode */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-semibold">Single Date Mode</h2>
        <MultiMonthCalendar
          numberOfMonths={2}
          mode="single"
          selected={single}
          onSelect={setSingle}
        />
        {single && (
          <p className="text-sm text-muted-foreground">
            Selected: {single.toDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/multi-month-calendar.tsx
"use client";

import * as React from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type MultiMonthCalendarProps = {
  numberOfMonths?: number;
  mode?: "single" | "range";
  selected?: Date | DateRange | undefined;
  onSelect?: (date: Date | DateRange | undefined) => void;
  showOutsideDays?: boolean;
  className?: string;
};

function MultiMonthCalendar({
  numberOfMonths = 2,
  mode = "single",
  selected,
  onSelect,
  showOutsideDays = true,
  className,
}: MultiMonthCalendarProps) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // ✅ Default select = today
  const defaultSelected =
    selected ??
    (mode === "range" ? { from: today, to: today } : today);

  const defaultComponents = {
    Chevron: (props: any) =>
      props.orientation === "left" ? (
        <ChevronLeft size={16} strokeWidth={2} {...props} aria-hidden="true" />
      ) : (
        <ChevronRight size={16} strokeWidth={2} {...props} aria-hidden="true" />
      ),
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Year / Month dropdowns */}
      <div className="flex justify-center gap-2">
        <Select defaultValue={String(currentYear)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 5 }).map((_, idx) => {
              const year = currentYear - 2 + idx;
              return (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select defaultValue={String(currentMonth)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }).map((_, idx) => (
              <SelectItem key={idx} value={String(idx)}>
                {new Date(0, idx).toLocaleString("default", { month: "long" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <DayPicker
        mode={mode}
        numberOfMonths={numberOfMonths}
        selected={defaultSelected}
        onSelect={onSelect}
        showOutsideDays={showOutsideDays}
        className={cn("rounded-lg border border-border bg-background p-2 w-fit", className)}
        components={defaultComponents}
        classNames={{
          months: "flex flex-col sm:flex-row gap-6",
          month_caption: "text-sm font-medium text-center mb-2",
          weekday: "text-xs font-medium text-muted-foreground/80",

          // ✅ Selection Highlight Styles
          day_button: cn(
            "relative flex size-9 items-center justify-center rounded-md text-sm",
            "hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white",
            // selected single day or range start/end
            "group-data-[selected]:bg-black group-data-[selected]:text-white dark:group-data-[selected]:bg-white dark:group-data-[selected]:text-black",
            // range middle (lighter gray in light theme, same dark gray in dark theme)
            "group-[.range-middle]:bg-neutral-200 dark:group-[.range-middle]:bg-neutral-700 group-[.range-middle]:text-black dark:group-[.range-middle]:text-white",
            // smooth range edges
            "group-[.range-start:not(.range-end)]:rounded-r-none group-[.range-end:not(.range-start)]:rounded-l-none group-[.range-middle]:rounded-none",
            // disabled / outside
            "group-data-[disabled]:text-muted-foreground/30 group-data-[disabled]:line-through group-data-[disabled]:pointer-events-none group-data-[outside]:text-muted-foreground/30"
          ),

          day: "group size-9 px-0 text-sm",
          range_start: "range-start",
          range_end: "range-end",
          range_middle: "range-middle",

          // today marker
          today:
            "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-black dark:*:after:bg-white",
        }}
      />

      {/* Credits */}
      <p className="text-xs text-muted-foreground text-center mt-2">
        Powered by{" "}
        <a
          href="https://www.ruixen.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          ruixen.com
        </a>
      </p>
    </div>
  );
}
MultiMonthCalendar.displayName = "MultiMonthCalendar";

export { MultiMonthCalendar };

```

Install NPM dependencies:
```bash
lucide-react, react-day-picker
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
