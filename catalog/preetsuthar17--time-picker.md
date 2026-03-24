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
time-picker.tsx
"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  showCurrentTimeButton?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  disabled,
  error,
  className,
  showCurrentTimeButton = true,
}) => {
  const getDefaultTime = React.useCallback(() => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return {
      hour: String(h).padStart(2, "0"),
      minute: String(m).padStart(2, "0"),
      amPm: ap,
    };
  }, []);

  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [amPm, setAmPm] = React.useState<string>("AM");

  const handleSetCurrentTime = React.useCallback(() => {
    const def = getDefaultTime();
    setHour(def.hour);
    setMinute(def.minute);
    setAmPm(def.amPm);
    if (onChange) {
      const newValue = `${def.hour}:${def.minute} ${def.amPm}`;
      onChange(newValue);
    }
  }, [getDefaultTime, onChange]);

  React.useEffect(() => {
    if (!value) {
      const def = getDefaultTime();
      setHour(def.hour);
      setMinute(def.minute);
      setAmPm(def.amPm);
      if (onChange) {
        const newValue = `${def.hour}:${def.minute} ${def.amPm}`;
        onChange(newValue);
      }
    } else if (
      typeof value === "string" &&
      value.match(/^\d{1,2}:\d{2} (AM|PM)$/)
    ) {
      const [hm, ap] = value.split(" ");
      const [h, m] = hm.split(":");
      setHour(h);
      setMinute(m);
      setAmPm(ap);
    }
  }, []);

  const handleChange = React.useCallback(
    (h: string, m: string, ap: string) => {
      setHour(h);
      setMinute(m);
      setAmPm(ap);
      if (h && m && ap && onChange) {
        const newValue = `${h}:${m} ${ap}`;
        if (newValue !== value) {
          onChange(newValue);
        }
      }
    },
    [onChange, value]
  );

  return (
    <div
      className={
        className ??
        "flex w-full flex-col items-center gap-2" +
          (error ? "rounded border border-red-500 p-2" : "")
      }
    >
      <div className="flex w-full items-left gap-2 justify-center">
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(val, minute, amPm),
              [minute, amPm, handleChange]
            )}
            value={hour}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) =>
                String(i + 1).padStart(2, "0")
              ).map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span>:</span>
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, val, amPm),
              [hour, amPm, handleChange]
            )}
            value={minute}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) =>
                String(i).padStart(2, "0")
              ).map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, minute, val),
              [hour, minute, handleChange]
            )}
            value={amPm}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {showCurrentTimeButton && (
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={disabled}
          onClick={handleSetCurrentTime}
        >
          Set Current Time
        </Button>
      )}
    </div>
  );
};


code.demo.1754962627157.tsx
import { TimePicker } from "@/components/ui/time-picker";
import * as React from "react";

export default function DemoOne() {
  const [time, setTime] = React.useState<string>();

  return <TimePicker value={time} onChange={setTime} />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/time-picker.tsx
"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  showCurrentTimeButton?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  disabled,
  error,
  className,
  showCurrentTimeButton = true,
}) => {
  const getDefaultTime = React.useCallback(() => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    return {
      hour: String(h).padStart(2, "0"),
      minute: String(m).padStart(2, "0"),
      amPm: ap,
    };
  }, []);

  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [amPm, setAmPm] = React.useState<string>("AM");

  const handleSetCurrentTime = React.useCallback(() => {
    const def = getDefaultTime();
    setHour(def.hour);
    setMinute(def.minute);
    setAmPm(def.amPm);
    if (onChange) {
      const newValue = `${def.hour}:${def.minute} ${def.amPm}`;
      onChange(newValue);
    }
  }, [getDefaultTime, onChange]);

  React.useEffect(() => {
    if (!value) {
      const def = getDefaultTime();
      setHour(def.hour);
      setMinute(def.minute);
      setAmPm(def.amPm);
      if (onChange) {
        const newValue = `${def.hour}:${def.minute} ${def.amPm}`;
        onChange(newValue);
      }
    } else if (
      typeof value === "string" &&
      value.match(/^\d{1,2}:\d{2} (AM|PM)$/)
    ) {
      const [hm, ap] = value.split(" ");
      const [h, m] = hm.split(":");
      setHour(h);
      setMinute(m);
      setAmPm(ap);
    }
  }, []);

  const handleChange = React.useCallback(
    (h: string, m: string, ap: string) => {
      setHour(h);
      setMinute(m);
      setAmPm(ap);
      if (h && m && ap && onChange) {
        const newValue = `${h}:${m} ${ap}`;
        if (newValue !== value) {
          onChange(newValue);
        }
      }
    },
    [onChange, value]
  );

  return (
    <div
      className={
        className ??
        "flex w-full flex-col items-center gap-2" +
          (error ? "rounded border border-red-500 p-2" : "")
      }
    >
      <div className="flex w-full items-left gap-2 justify-center">
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(val, minute, amPm),
              [minute, amPm, handleChange]
            )}
            value={hour}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) =>
                String(i + 1).padStart(2, "0")
              ).map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span>:</span>
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, val, amPm),
              [hour, amPm, handleChange]
            )}
            value={minute}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) =>
                String(i).padStart(2, "0")
              ).map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-16">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, minute, val),
              [hour, minute, handleChange]
            )}
            value={amPm}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {showCurrentTimeButton && (
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={disabled}
          onClick={handleSetCurrentTime}
        >
          Set Current Time
        </Button>
      )}
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
