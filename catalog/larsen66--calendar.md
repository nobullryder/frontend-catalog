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
calendar.tsx
// component.tsx
"use client";

import * as React from "react";
import { Calendar, CalendarProps } from "@/components/ui/calendar-rac";

export interface DateViewerProps extends CalendarProps {}

const DateViewer = React.forwardRef<HTMLDivElement, DateViewerProps>(
  ({ className, ...props }, ref) => {
    return (
      <Calendar
        ref={ref}
        className={`rounded-lg border shadow-sm ${className}`}
        {...props}
      />
    );
  }
);

DateViewer.displayName = "DateViewer";

export default DateViewer;

code.demo.1749426021802.tsx
// demo.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import DateViewer from "@/components/ui/calendar";

const DateViewerDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));

  return (
    <div className="flex min-h-[450px] w-full items-center justify-center bg-background p-10">
      <DateViewer
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
      />
    </div>
  );
};

export { DateViewerDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/calendar.tsx
// component.tsx
"use client";

import * as React from "react";
import { Calendar, CalendarProps } from "@/components/ui/calendar-rac";

export interface DateViewerProps extends CalendarProps {}

const DateViewer = React.forwardRef<HTMLDivElement, DateViewerProps>(
  ({ className, ...props }, ref) => {
    return (
      <Calendar
        ref={ref}
        className={`rounded-lg border shadow-sm ${className}`}
        {...props}
      />
    );
  }
);

DateViewer.displayName = "DateViewer";

export default DateViewer;
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
