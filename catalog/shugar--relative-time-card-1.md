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
relative-time-card-1.tsx
import React, { useEffect, useState } from "react";
import { ContextCard } from "@/components/ui/context-card-1";

interface RelativeTimeCardProps {
  children: React.ReactNode;
  date: number;
  side?: "top" | "bottom" | "left" | "right";
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);

  const optionsDate: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };

  const utcDate = date.toLocaleDateString("en-US", { ...optionsDate, timeZone: "UTC" });
  const utcTime = date.toLocaleTimeString("en-US", { ...optionsTime, timeZone: "UTC" });

  const localDate = date.toLocaleDateString("en-US", optionsDate);
  const localTime = date.toLocaleTimeString("en-US", optionsTime);

  const timezoneOffset = (() => {
    const offset = -date.getTimezoneOffset() / 60;
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${Math.abs(offset)}`;
  })();

  return { utcDate, utcTime, localDate, localTime, timezoneOffset };
};

const useTimeAgo = (timestamp: number) => {
  const getTimeAgo = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp) / 1000);

    const years = Math.floor(diff / (60 * 60 * 24 * 365));
    const months = Math.floor((diff % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
    const days = Math.floor((diff % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
    const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / 60);
    const seconds = diff % 60;

    if (diff < 1) return "just now";
    if (years > 0) return `${years} year${years > 1 ? "s" : ""}${months > 0 ? `, ${months} month${months > 1 ? "s" : ""} ` : ""}${days > 0 ? `, ${days} day${days > 1 ? "s" : ""} ` : ""}ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""}${days > 0 ? `, ${days} day${days > 1 ? "s" : ""} ` : ""}ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}${hours > 0 ? `, ${hours} hour${hours > 1 ? "s" : ""} ` : ""}ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}${minutes > 0 ? `, ${minutes} minute${minutes > 1 ? "s" : ""} ` : ""}ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}${seconds > 0 ? `, ${seconds} second${seconds > 1 ? "s" : ""} ` : ""}ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const [timeAgo, setTimeAgo] = useState(getTimeAgo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
};

const Content = ({ date }: { date: number }) => {
  const { utcDate, utcTime, localDate, localTime, timezoneOffset } = formatTimestamp(date);
  const timeAgo = useTimeAgo(date);

  return (
    <div className="font-sans text-xs w-80">
      <div className="text-start text-gray-900">{timeAgo}</div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          <div className="px-2 rounded bg-gray-200 text-gray-900">
            UTC
          </div>
          <div>{utcDate}</div>
        </div>
        <div className="font-mono text-gray-900">{utcTime}</div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          <div className="px-2 rounded bg-gray-200 text-gray-900">
            {timezoneOffset}
          </div>
          <div>{localDate}</div>
        </div>
        <div className="font-mono text-gray-900">{localTime}</div>
      </div>
    </div>
  );
};

export const RelativeTimeCard = ({ children, date, side = "top" }: RelativeTimeCardProps) => {
  return (
    <ContextCard.Trigger
      content={<Content date={date} />}
      side={side}
    >
      {children}
    </ContextCard.Trigger>
  );
};

code.demo.1751589557372.tsx
import { RelativeTimeCard } from "@/components/ui/relative-time-card-1";

export default function DemoOne() {
  return (
    <RelativeTimeCard date={new Date().getTime()} side="top">
      <button>Hover Me</button>
    </RelativeTimeCard>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/relative-time-card-1.tsx
import React, { useEffect, useState } from "react";
import { ContextCard } from "@/components/ui/context-card-1";

interface RelativeTimeCardProps {
  children: React.ReactNode;
  date: number;
  side?: "top" | "bottom" | "left" | "right";
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);

  const optionsDate: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };

  const utcDate = date.toLocaleDateString("en-US", { ...optionsDate, timeZone: "UTC" });
  const utcTime = date.toLocaleTimeString("en-US", { ...optionsTime, timeZone: "UTC" });

  const localDate = date.toLocaleDateString("en-US", optionsDate);
  const localTime = date.toLocaleTimeString("en-US", optionsTime);

  const timezoneOffset = (() => {
    const offset = -date.getTimezoneOffset() / 60;
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${Math.abs(offset)}`;
  })();

  return { utcDate, utcTime, localDate, localTime, timezoneOffset };
};

const useTimeAgo = (timestamp: number) => {
  const getTimeAgo = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp) / 1000);

    const years = Math.floor(diff / (60 * 60 * 24 * 365));
    const months = Math.floor((diff % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
    const days = Math.floor((diff % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
    const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / 60);
    const seconds = diff % 60;

    if (diff < 1) return "just now";
    if (years > 0) return `${years} year${years > 1 ? "s" : ""}${months > 0 ? `, ${months} month${months > 1 ? "s" : ""} ` : ""}${days > 0 ? `, ${days} day${days > 1 ? "s" : ""} ` : ""}ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""}${days > 0 ? `, ${days} day${days > 1 ? "s" : ""} ` : ""}ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}${hours > 0 ? `, ${hours} hour${hours > 1 ? "s" : ""} ` : ""}ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}${minutes > 0 ? `, ${minutes} minute${minutes > 1 ? "s" : ""} ` : ""}ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}${seconds > 0 ? `, ${seconds} second${seconds > 1 ? "s" : ""} ` : ""}ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const [timeAgo, setTimeAgo] = useState(getTimeAgo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo());
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
};

const Content = ({ date }: { date: number }) => {
  const { utcDate, utcTime, localDate, localTime, timezoneOffset } = formatTimestamp(date);
  const timeAgo = useTimeAgo(date);

  return (
    <div className="font-sans text-xs w-80">
      <div className="text-start text-gray-900">{timeAgo}</div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          <div className="px-2 rounded bg-gray-200 text-gray-900">
            UTC
          </div>
          <div>{utcDate}</div>
        </div>
        <div className="font-mono text-gray-900">{utcTime}</div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          <div className="px-2 rounded bg-gray-200 text-gray-900">
            {timezoneOffset}
          </div>
          <div>{localDate}</div>
        </div>
        <div className="font-mono text-gray-900">{localTime}</div>
      </div>
    </div>
  );
};

export const RelativeTimeCard = ({ children, date, side = "top" }: RelativeTimeCardProps) => {
  return (
    <ContextCard.Trigger
      content={<Content date={date} />}
      side={side}
    >
      {children}
    </ContextCard.Trigger>
  );
};
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
