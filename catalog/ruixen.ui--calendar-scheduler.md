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
calendar-scheduler.tsx
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
import { cn } from "@/lib/utils";

export interface CalendarSchedulerProps {
  timeSlots?: string[];
  onConfirm?: (value: { date?: Date; time?: string }) => void;
}

function CalendarScheduler({
  timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ],
  onConfirm,
}: CalendarSchedulerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string | undefined>();

  return (
    <div>
    <Card className="w-[600px] shadow-none border-none bg-background">
      <CardHeader>
        <CardTitle className="text-base">Schedule a Meeting</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        {/* Calendar Section */}
        <div className="flex-1 border rounded-md p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </div>

        {/* Time Slots Section */}
        <div className="flex-1 border rounded-md p-2 overflow-y-auto max-h-[320px]">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Pick a time
          </p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={time === slot ? "default" : "outline"}
                size="sm"
                className={cn("w-full", time === slot && "ring-2 ring-primary")}
                onClick={() => setTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setDate(undefined);
            setTime(undefined);
          }}
        >
          Reset
        </Button>
        <Button
          size="sm"
          onClick={() => onConfirm?.({ date, time })}
          disabled={!date || !time}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
    <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • made by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}

export { CalendarScheduler };


code.demo.1758973993750.tsx
"use client";

import { CalendarScheduler } from "@/components/ui/calendar-scheduler";

export default function SchedulerDemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <CalendarScheduler
          onConfirm={(val) => {
            console.log("Scheduled:", val);
          }}
        />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/calendar-scheduler.tsx
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
import { cn } from "@/lib/utils";

export interface CalendarSchedulerProps {
  timeSlots?: string[];
  onConfirm?: (value: { date?: Date; time?: string }) => void;
}

function CalendarScheduler({
  timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ],
  onConfirm,
}: CalendarSchedulerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string | undefined>();

  return (
    <div>
    <Card className="w-[600px] shadow-none border-none bg-background">
      <CardHeader>
        <CardTitle className="text-base">Schedule a Meeting</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4">
        {/* Calendar Section */}
        <div className="flex-1 border rounded-md p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </div>

        {/* Time Slots Section */}
        <div className="flex-1 border rounded-md p-2 overflow-y-auto max-h-[320px]">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Pick a time
          </p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={time === slot ? "default" : "outline"}
                size="sm"
                className={cn("w-full", time === slot && "ring-2 ring-primary")}
                onClick={() => setTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setDate(undefined);
            setTime(undefined);
          }}
        >
          Reset
        </Button>
        <Button
          size="sm"
          onClick={() => onConfirm?.({ date, time })}
          disabled={!date || !time}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
    <div className="mt-4 text-xs text-center text-muted-foreground">
        Minimal design • made by{" "}
        <a href="https://www.ruixen.com" target="_blank" className="underline">
          ruixen.com
        </a>
      </div>
    </div>
  );
}

export { CalendarScheduler };

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
