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
side-panel-multi-calendar.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

function SidePanelMultiCalendar() {
  const [dates, setDates] = React.useState<Date[]>([]);

  // Group selected dates by month-year
  const groupedDates = dates.reduce<Record<string, Date[]>>((acc, date) => {
    const key = format(date, "MMMM yyyy");
    if (!acc[key]) acc[key] = [];
    acc[key].push(date);
    return acc;
  }, {});

  const handleRemove = (date: Date) => {
    setDates((prev) =>
      prev.filter((d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"))
    );
  };

  const handleClearMonth = (monthKey: string) => {
    setDates((prev) =>
      prev.filter((d) => format(d, "MMMM yyyy") !== monthKey)
    );
  };

  return (
    <Card className="w-[700px] shadow-none border-none bg-background">
      <CardHeader>
        <CardTitle className="text-base">Multi-Select Calendar with Side Panel</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        {/* Calendar Section */}
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={(selected) => setDates(selected ?? [])}
            className="rounded-md"
          />

        {/* Side Panel Section */}
        <div className="w-[260px]">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Selected Dates
          </p>
          <ScrollArea className="h-[280px] pr-2">
            {Object.keys(groupedDates).length === 0 && (
              <p className="text-xs text-muted-foreground">
                No dates selected
              </p>
            )}
            {Object.entries(groupedDates).map(([monthKey, datesInMonth]) => (
              <div key={monthKey} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold">{monthKey}</span>
                  <Button
                    size="xs"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => handleClearMonth(monthKey)}
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {datesInMonth
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((d) => (
                      <Button
                        key={d.toISOString()}
                        size="sm"
                        variant="secondary"
                        className="text-xs"
                        onClick={() => handleRemove(d)}
                      >
                        {format(d, "d")}
                      </Button>
                    ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          onClick={() => console.log("Confirmed:", dates)}
          disabled={dates.length === 0}
        >
          Confirm
        </Button>
      </CardFooter>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Inspired by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </Card>
  );
}

export { SidePanelMultiCalendar };


code.demo.1758989665636.tsx
"use client";

import { SidePanelMultiCalendar } from "@/components/ui/side-panel-multi-calendar";

export default function SidePanelMultiCalendarDemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <SidePanelMultiCalendar />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/side-panel-multi-calendar.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

function SidePanelMultiCalendar() {
  const [dates, setDates] = React.useState<Date[]>([]);

  // Group selected dates by month-year
  const groupedDates = dates.reduce<Record<string, Date[]>>((acc, date) => {
    const key = format(date, "MMMM yyyy");
    if (!acc[key]) acc[key] = [];
    acc[key].push(date);
    return acc;
  }, {});

  const handleRemove = (date: Date) => {
    setDates((prev) =>
      prev.filter((d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"))
    );
  };

  const handleClearMonth = (monthKey: string) => {
    setDates((prev) =>
      prev.filter((d) => format(d, "MMMM yyyy") !== monthKey)
    );
  };

  return (
    <Card className="w-[700px] shadow-none border-none bg-background">
      <CardHeader>
        <CardTitle className="text-base">Multi-Select Calendar with Side Panel</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        {/* Calendar Section */}
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={(selected) => setDates(selected ?? [])}
            className="rounded-md"
          />

        {/* Side Panel Section */}
        <div className="w-[260px]">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Selected Dates
          </p>
          <ScrollArea className="h-[280px] pr-2">
            {Object.keys(groupedDates).length === 0 && (
              <p className="text-xs text-muted-foreground">
                No dates selected
              </p>
            )}
            {Object.entries(groupedDates).map(([monthKey, datesInMonth]) => (
              <div key={monthKey} className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold">{monthKey}</span>
                  <Button
                    size="xs"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => handleClearMonth(monthKey)}
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {datesInMonth
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((d) => (
                      <Button
                        key={d.toISOString()}
                        size="sm"
                        variant="secondary"
                        className="text-xs"
                        onClick={() => handleRemove(d)}
                      >
                        {format(d, "d")}
                      </Button>
                    ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          onClick={() => console.log("Confirmed:", dates)}
          disabled={dates.length === 0}
        >
          Confirm
        </Button>
      </CardFooter>
      <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • Inspired by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </Card>
  );
}

export { SidePanelMultiCalendar };

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
