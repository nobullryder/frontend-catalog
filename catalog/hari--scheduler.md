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
scheduler.tsx
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ComponentProps {
  isRepeating: boolean;
  toggleRepeating: () => void;
  repeatInterval: string;
  setRepeatInterval: (interval: string) => void;
  daysOfWeek: string[];
}

const Switch = ({ toggle, value }: { toggle: () => void; value: boolean }) => {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input checked={value} type="checkbox" className="peer sr-only" onChange={toggle} />
      <div className="rtl:peer-checked:after:-translate-x-[unset] peer relative h-8 w-[53px] rounded-full bg-gray-200 transition-colors duration-500 after:absolute after:start-[5px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:duration-300 after:content-[''] peer-checked:bg-[#95ef90] peer-checked:after:translate-x-[19px] peer-checked:after:border-white"></div>
    </label>
  );
};

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
  initialText: string;
  finalText: string;
  supportsHover?: boolean;
  textClassName?: string;
  initialTextClassName?: string;
  finalTextClassName?: string;
  disableClick?: boolean;
  check?: boolean;
}

function SwapText({
  initialText,
  finalText,
  className,
  supportsHover = true,
  textClassName,
  initialTextClassName,
  finalTextClassName,
  disableClick,
  check,
  ...props
}: SwapTextProps) {
  const [active, setActive] = useState<boolean>(!check);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (check) {
      timeoutId = setTimeout(() => {
        setActive((current) => !current);
      }, 100);
    } else {
      timeoutId = setTimeout(() => {
        setActive((current) => !current);
      }, 100);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [check]);
  const common = "block transition-all duration-1000 ease-slow";
  const longWord = finalText.length > initialText.length ? finalText : null;
  return (
    <div {...props} className={cn("relative overflow-hidden text-foreground", className)}>
      <div
        className={cn("group cursor-pointer select-none text-3xl font-bold", textClassName)}
        onClick={() => !disableClick && setActive((current) => !current)}
      >
        <span
          className={cn(common, initialTextClassName, {
            "flex flex-col": true,
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {initialText}
          {Boolean(longWord?.length) && <span className="invisible h-0">{longWord}</span>}
        </span>
        <span
          className={cn(`${common} absolute top-full`, finalTextClassName, {
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {finalText}
        </span>
      </div>
    </div>
  );
}

export const Component: React.FC<ComponentProps> = ({
  isRepeating,
  toggleRepeating,
  repeatInterval,
  setRepeatInterval,
  daysOfWeek,
}) => {
  const selectedDays = isRepeating ? new Set(["Th", "Fr", "Su"]) : new Set(["Mo", "We", "Sa"]);
  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xl text-black">Is repeating</span>
        <Switch toggle={toggleRepeating} value={isRepeating} />
      </div>

      <div
        className={cn("mb-4 flex justify-between transition-opacity duration-500 ease-in-out", {
          "opacity-40": !isRepeating,
        })}
      >
        <label className="mt-5 text-slate-800">Repeat</label>
        <select
          disabled={!isRepeating}
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(e.target.value)}
          className="focus:ring-border-gray-100 mt-2 block w-[70%] rounded-xl border border-gray-100 bg-white px-3 py-3 font-bold text-black shadow-sm focus:border-gray-100 focus:outline-none"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div className="flex items-center rounded-2xl bg-gray-100 p-4">
        <div className="grid grid-cols-7 justify-around gap-2">
          {daysOfWeek.map((day) => (
            <SwapText
              key={day}
              check={selectedDays.has(day)}
              initialText={day}
              finalText={day}
              supportsHover={false}
              initialTextClassName="w-[37px] h-[37px] item-center text-center opacity-50 text-sm text-black rounded-lg p-2"
              finalTextClassName="w-[37px] h-[37px] item-center text-center text-sm	 text-black bg-white rounded-lg p-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

code.demo.1750178697741.tsx
// This is a demo of a preview
import React, { useState } from "react";
import { Component } from "@/components/ui/scheduler";

const DemoOne = () => {
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatInterval, setRepeatInterval] = useState("Weekly");
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const toggleRepeating = () => {
    setIsRepeating((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Component
        isRepeating={isRepeating}
        toggleRepeating={toggleRepeating}
        repeatInterval={repeatInterval}
        setRepeatInterval={setRepeatInterval}
        daysOfWeek={daysOfWeek}
      />
    </div>
  );
};

export default DemoOne;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scheduler.tsx
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ComponentProps {
  isRepeating: boolean;
  toggleRepeating: () => void;
  repeatInterval: string;
  setRepeatInterval: (interval: string) => void;
  daysOfWeek: string[];
}

const Switch = ({ toggle, value }: { toggle: () => void; value: boolean }) => {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input checked={value} type="checkbox" className="peer sr-only" onChange={toggle} />
      <div className="rtl:peer-checked:after:-translate-x-[unset] peer relative h-8 w-[53px] rounded-full bg-gray-200 transition-colors duration-500 after:absolute after:start-[5px] after:top-[4px] after:h-6 after:w-6 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:duration-300 after:content-[''] peer-checked:bg-[#95ef90] peer-checked:after:translate-x-[19px] peer-checked:after:border-white"></div>
    </label>
  );
};

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
  initialText: string;
  finalText: string;
  supportsHover?: boolean;
  textClassName?: string;
  initialTextClassName?: string;
  finalTextClassName?: string;
  disableClick?: boolean;
  check?: boolean;
}

function SwapText({
  initialText,
  finalText,
  className,
  supportsHover = true,
  textClassName,
  initialTextClassName,
  finalTextClassName,
  disableClick,
  check,
  ...props
}: SwapTextProps) {
  const [active, setActive] = useState<boolean>(!check);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (check) {
      timeoutId = setTimeout(() => {
        setActive((current) => !current);
      }, 100);
    } else {
      timeoutId = setTimeout(() => {
        setActive((current) => !current);
      }, 100);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [check]);
  const common = "block transition-all duration-1000 ease-slow";
  const longWord = finalText.length > initialText.length ? finalText : null;
  return (
    <div {...props} className={cn("relative overflow-hidden text-foreground", className)}>
      <div
        className={cn("group cursor-pointer select-none text-3xl font-bold", textClassName)}
        onClick={() => !disableClick && setActive((current) => !current)}
      >
        <span
          className={cn(common, initialTextClassName, {
            "flex flex-col": true,
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {initialText}
          {Boolean(longWord?.length) && <span className="invisible h-0">{longWord}</span>}
        </span>
        <span
          className={cn(`${common} absolute top-full`, finalTextClassName, {
            "-translate-y-full": active,
            "group-hover:-translate-y-full": supportsHover,
          })}
        >
          {finalText}
        </span>
      </div>
    </div>
  );
}

export const Component: React.FC<ComponentProps> = ({
  isRepeating,
  toggleRepeating,
  repeatInterval,
  setRepeatInterval,
  daysOfWeek,
}) => {
  const selectedDays = isRepeating ? new Set(["Th", "Fr", "Su"]) : new Set(["Mo", "We", "Sa"]);
  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xl text-black">Is repeating</span>
        <Switch toggle={toggleRepeating} value={isRepeating} />
      </div>

      <div
        className={cn("mb-4 flex justify-between transition-opacity duration-500 ease-in-out", {
          "opacity-40": !isRepeating,
        })}
      >
        <label className="mt-5 text-slate-800">Repeat</label>
        <select
          disabled={!isRepeating}
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(e.target.value)}
          className="focus:ring-border-gray-100 mt-2 block w-[70%] rounded-xl border border-gray-100 bg-white px-3 py-3 font-bold text-black shadow-sm focus:border-gray-100 focus:outline-none"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div className="flex items-center rounded-2xl bg-gray-100 p-4">
        <div className="grid grid-cols-7 justify-around gap-2">
          {daysOfWeek.map((day) => (
            <SwapText
              key={day}
              check={selectedDays.has(day)}
              initialText={day}
              finalText={day}
              supportsHover={false}
              initialTextClassName="w-[37px] h-[37px] item-center text-center opacity-50 text-sm text-black rounded-lg p-2"
              finalTextClassName="w-[37px] h-[37px] item-center text-center text-sm	 text-black bg-white rounded-lg p-2"
            />
          ))}
        </div>
      </div>
    </div>
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
