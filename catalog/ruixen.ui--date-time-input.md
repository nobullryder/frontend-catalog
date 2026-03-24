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
date-time-input.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function DateTimeInput() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState("12:00");

  return (
    <div className="flex flex-col gap-4">
      {/* Date Picker */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[250px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="time" className="text-xs font-medium">
          Time
        </Label>
        <div className="relative w-[250px]">
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            step="60" // minute granularity
            className="pl-8"
          />
          <Clock className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-md border p-2 text-sm text-muted-foreground">
        Selected:{" "}
        {date ? (
          <>
            {format(date, "PPP")} at {time}
          </>
        ) : (
          "No date selected"
        )}
      </div>
    </div>
  );
}

export { DateTimeInput };


code.demo.1758972761478.tsx
"use client";

import { DateTimeInput } from "@/components/ui/date-time-input";

export default function DateTimeDemoPage() {
  return (
    <div className= "flex min-h-screen flex-col items-center justify-center" >
      <DateTimeInput />
      <div className = "mt-4 text-xs text-center text-muted-foreground" >
        Minimal design • made by{ " " }
          <a href="https://www.ruixen.com" target = "_blank" className = "underline" >
          ruixen.com
          < /a>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/date-time-input.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function DateTimeInput() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState("12:00");

  return (
    <div className="flex flex-col gap-4">
      {/* Date Picker */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-medium">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[250px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="time" className="text-xs font-medium">
          Time
        </Label>
        <div className="relative w-[250px]">
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            step="60" // minute granularity
            className="pl-8"
          />
          <Clock className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-md border p-2 text-sm text-muted-foreground">
        Selected:{" "}
        {date ? (
          <>
            {format(date, "PPP")} at {time}
          </>
        ) : (
          "No date selected"
        )}
      </div>
    </div>
  );
}

export { DateTimeInput };

```

Install NPM dependencies:
```bash
date-fns, lucide-react
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
