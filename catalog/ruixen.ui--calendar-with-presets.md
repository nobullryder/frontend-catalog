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
calendar-with-presets.tsx
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-6",
    month: "w-full",
    month_caption:
      "relative mb-2 flex h-9 items-center justify-center text-base font-semibold text-foreground",
    caption_label: "text-sm font-medium",
    nav: "absolute top-1 flex w-full justify-between px-2 z-10",
    button_previous: cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "size-8 rounded-full text-muted-foreground hover:text-foreground"
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "size-8 rounded-full text-muted-foreground hover:text-foreground"
    ),
    weekdays:
      "grid grid-cols-7 text-center text-xs font-medium uppercase text-muted-foreground/80",
    weekday: "py-1",
    week: "grid grid-cols-7",
    day_button:
      "relative flex size-9 items-center justify-center rounded-full text-sm transition-all " +
      "hover:bg-accent hover:text-accent-foreground " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 " +
      // ✅ clear strong selection
      "group-data-[selected]:bg-black group-data-[selected]:text-white " +
      "dark:group-data-[selected]:bg-white dark:group-data-[selected]:text-black " +
      "group-data-[selected]:shadow-md " +
      "group-data-[disabled]:opacity-40 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:hover:bg-transparent group-data-[disabled]:hover:text-muted-foreground/40",
    day: "text-center",
    range_start:
      "rounded-l-full bg-black text-white dark:bg-white dark:text-black shadow-md",
    range_end:
      "rounded-r-full bg-black text-white dark:bg-white dark:text-black shadow-md",
    range_middle:
      "bg-black/10 text-foreground dark:bg-white/20 rounded-none transition-colors",
    today:
      "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary",
    outside:
      "text-muted-foreground/50 hover:text-accent-foreground hover:bg-accent/30",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
  };

  const mergedClassNames: typeof defaultClassNames = Object.keys(
    defaultClassNames
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof classNames],
            classNames[key as keyof typeof classNames]
          )
        : defaultClassNames[key as keyof typeof classNames],
    }),
    {} as typeof defaultClassNames
  );

  const defaultComponents = {
    Chevron: ({ orientation, ...props }: any) => {
      const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
      return <Icon size={18} strokeWidth={2} {...props} aria-hidden="true" />;
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit p-3 bg-card rounded-xl border shadow-sm", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };


code.demo.1758958090329.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar-with-presets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker";
import {
  subDays,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
} from "date-fns";

export default function CalendarWithPresets() {
  const today = new Date();

  // 📌 Define Presets
  const presets: Record<string, { from: Date; to: Date }> = {
    Today: { from: today, to: today },
    Yesterday: { from: subDays(today, 1), to: subDays(today, 1) },
    "Last 7 Days": { from: subDays(today, 6), to: today },
    "Last 14 Days": { from: subDays(today, 13), to: today },
    "Last 30 Days": { from: subDays(today, 29), to: today },
    "Last 90 Days": { from: subDays(today, 89), to: today },
    "Month to Date": { from: startOfMonth(today), to: today },
    "Quarter to Date": { from: startOfQuarter(today), to: today },
    "Year to Date": { from: startOfYear(today), to: today },
    "Last Month": {
      from: startOfMonth(subDays(startOfMonth(today), 1)),
      to: endOfMonth(subDays(startOfMonth(today), 1)),
    },
    "Last Quarter": {
      from: startOfQuarter(subDays(startOfQuarter(today), 1)),
      to: endOfQuarter(subDays(startOfQuarter(today), 1)),
    },
    "Last Year": {
      from: startOfYear(subDays(startOfYear(today), 1)),
      to: endOfYear(subDays(startOfYear(today), 1)),
    },
  };

  const [date, setDate] = useState<DateRange | undefined>(presets["Last 7 Days"]);
  const [month, setMonth] = useState<Date>(today);

  // 📌 Dynamic height lock (card matches calendar height)
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarHeight, setCalendarHeight] = useState<number>(0);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendarHeight(calendarRef.current.offsetHeight);
    }
  }, [month]);

  return (
    <Card className="p-4">
      <div className="flex max-sm:flex-col">
        {/* Sidebar Presets with Scroll */}
        <div
          className="sm:w-40 border-r pr-2 max-sm:border-b max-sm:mb-2 overflow-y-auto"
          style={{ maxHeight: calendarHeight || 300 }}
        >
          <div className="flex flex-col gap-1">
            {Object.entries(presets).map(([label, range]) => (
              <Button
                key={label}
                variant="ghost"
                size="sm"
                className="justify-start w-full"
                onClick={() => {
                  setDate(range);
                  setMonth(range.to);
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="sm:hidden my-2" />

        {/* Calendar */}
        <div className="flex-1 flex justify-center" ref={calendarRef}>
          <Calendar
            mode="range"
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={setDate}
            className="bg-background p-2 rounded-md"
            disabled={[{ after: today }]}
          />
        </div>
      </div>

      {/* Credits */}
      <p
        className="mt-4 text-xs text-center text-muted-foreground"
        role="region"
        aria-live="polite"
      >
        Range calendar with configurable presets — built with{" "}
        <a
          href="https://daypicker.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          React DayPicker
        </a>
        ,{" "}
        <a
          href="https://www.ruixen.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Ruixen
        </a>{" "}
        & shadcn/ui
      </p>
    </Card>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/calendar-with-presets.tsx
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-6",
    month: "w-full",
    month_caption:
      "relative mb-2 flex h-9 items-center justify-center text-base font-semibold text-foreground",
    caption_label: "text-sm font-medium",
    nav: "absolute top-1 flex w-full justify-between px-2 z-10",
    button_previous: cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "size-8 rounded-full text-muted-foreground hover:text-foreground"
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "size-8 rounded-full text-muted-foreground hover:text-foreground"
    ),
    weekdays:
      "grid grid-cols-7 text-center text-xs font-medium uppercase text-muted-foreground/80",
    weekday: "py-1",
    week: "grid grid-cols-7",
    day_button:
      "relative flex size-9 items-center justify-center rounded-full text-sm transition-all " +
      "hover:bg-accent hover:text-accent-foreground " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 " +
      // ✅ clear strong selection
      "group-data-[selected]:bg-black group-data-[selected]:text-white " +
      "dark:group-data-[selected]:bg-white dark:group-data-[selected]:text-black " +
      "group-data-[selected]:shadow-md " +
      "group-data-[disabled]:opacity-40 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:hover:bg-transparent group-data-[disabled]:hover:text-muted-foreground/40",
    day: "text-center",
    range_start:
      "rounded-l-full bg-black text-white dark:bg-white dark:text-black shadow-md",
    range_end:
      "rounded-r-full bg-black text-white dark:bg-white dark:text-black shadow-md",
    range_middle:
      "bg-black/10 text-foreground dark:bg-white/20 rounded-none transition-colors",
    today:
      "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary",
    outside:
      "text-muted-foreground/50 hover:text-accent-foreground hover:bg-accent/30",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
  };

  const mergedClassNames: typeof defaultClassNames = Object.keys(
    defaultClassNames
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof classNames],
            classNames[key as keyof typeof classNames]
          )
        : defaultClassNames[key as keyof typeof classNames],
    }),
    {} as typeof defaultClassNames
  );

  const defaultComponents = {
    Chevron: ({ orientation, ...props }: any) => {
      const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
      return <Icon size={18} strokeWidth={2} {...props} aria-hidden="true" />;
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit p-3 bg-card rounded-xl border shadow-sm", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

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
