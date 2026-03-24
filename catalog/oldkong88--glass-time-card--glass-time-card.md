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
glass-time-card.tsx
"use client"

import * as React from "react"
import { useState, useEffect } from "react"

interface GlassTimeCardProps {
  showSeconds?: boolean;
  showTimezone?: boolean;
}

export function GlassTimeCard(props: GlassTimeCardProps) {
  const { showSeconds = false, showTimezone = false } = props;
  
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timezoneName, setTimezoneName] = useState<string>("");
  
  useEffect(() => {
    const timezoneOffset = currentTime.getTimezoneOffset();
    
    const timezoneShorter = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const offset = -timezoneOffset / 60;
    const offsetStr = offset >= 0 ? `+${offset}` : `${offset}`;
    
    setTimezoneName(`${timezoneShorter} GMT${offsetStr}`);
    
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12: false
    });
  };
  
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    
    return `${weekday} | ${month} ${day}`;
  };

  return (
    <div className="w-80 text-white bg-neutral-white/20 shadow-xl backdrop-blur-xl p-4 rounded-lg border border-white/10">
      <div className="flex flex-col gap-1 items-center">
        <div className="text-sm">{formatDate(currentTime)}</div>
        <div className="text-5xl font-bold tabular-nums">{formatTime(currentTime)}</div>
        {showTimezone && (
          <div className="text-xs text-muted">{timezoneName}</div>
        )}
      </div>
    </div>
  )
}

code.demo.tsx
import { GlassTimeCard } from "@/components/ui/glass-time-card"

export function Demo() {
  return (
    <div className="w-screen h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <GlassTimeCard showSeconds showTimezone />
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
/components/ui/glass-time-card.tsx
"use client"

import * as React from "react"
import { useState, useEffect } from "react"

interface GlassTimeCardProps {
  showSeconds?: boolean;
  showTimezone?: boolean;
}

export function GlassTimeCard(props: GlassTimeCardProps) {
  const { showSeconds = false, showTimezone = false } = props;
  
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timezoneName, setTimezoneName] = useState<string>("");
  
  useEffect(() => {
    const timezoneOffset = currentTime.getTimezoneOffset();
    
    const timezoneShorter = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const offset = -timezoneOffset / 60;
    const offsetStr = offset >= 0 ? `+${offset}` : `${offset}`;
    
    setTimezoneName(`${timezoneShorter} GMT${offsetStr}`);
    
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined,
      hour12: false
    });
  };
  
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    
    return `${weekday} | ${month} ${day}`;
  };

  return (
    <div className="w-80 text-white bg-neutral-white/20 shadow-xl backdrop-blur-xl p-4 rounded-lg border border-white/10">
      <div className="flex flex-col gap-1 items-center">
        <div className="text-sm">{formatDate(currentTime)}</div>
        <div className="text-5xl font-bold tabular-nums">{formatTime(currentTime)}</div>
        {showTimezone && (
          <div className="text-xs text-muted">{timezoneName}</div>
        )}
      </div>
    </div>
  )
}
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
