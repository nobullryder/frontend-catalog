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
behavioral-history-select.tsx
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface HistoryOption {
  value: string;
  label: string;
}

interface BehavioralHistorySelectProps {
  options: HistoryOption[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  maxHistory?: number; // recent items to remember
  storageKey?: string; // localStorage key
  selectWidth?: string | number; // fixed width
}

interface StoredHistory {
  value: string;
  count: number;
  timestamp: number;
}

export const BehavioralHistorySelect: React.FC<BehavioralHistorySelectProps> = ({
  options,
  label,
  placeholder = "Select an option...",
  onChange,
  defaultValue,
  maxHistory = 5,
  storageKey = "behavioral_history_select",
  selectWidth = "280px",
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");
  const [history, setHistory] = React.useState<StoredHistory[]>([]);

  // Load history from localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) setHistory(JSON.parse(stored));
    }
  }, [storageKey]);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);

    setHistory((prev) => {
      const existing = prev.find((h) => h.value === value);
      let updated: StoredHistory[];
      if (existing) {
        updated = prev.map((h) =>
          h.value === value
            ? { ...h, count: h.count + 1, timestamp: Date.now() }
            : h
        );
      } else {
        updated = [...prev, { value, count: 1, timestamp: Date.now() }];
      }

      // Sort by frequency & recency
      updated.sort((a, b) => {
        if (b.count === a.count) return b.timestamp - a.timestamp;
        return b.count - a.count;
      });

      // Limit recent history
      const limited = updated.slice(0, maxHistory);

      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(limited));
      }

      return limited;
    });
  };

  // Prepare sections
  const recentItems = history
    .map((h) => options.find((o) => o.value === h.value))
    .filter(Boolean) as HistoryOption[];

  const otherItems = options.filter((o) => !recentItems.some((r) => r.value === o.value));

  return (
    <div className="flex flex-col gap-2">
      <Select defaultValue={defaultValue} onValueChange={handleChange}>
        <SelectTrigger
          className="w-full"
          style={{ width: selectWidth, minWidth: selectWidth }}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent style={{ width: selectWidth }}>
          {label && (
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
            </SelectGroup>
          )}

          {recentItems.length > 0 && (
            <SelectGroup>
              <SelectLabel>Recent</SelectLabel>
              {recentItems.map((opt) => {
                const stored = history.find((h) => h.value === opt.value);
                return (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="flex justify-between items-center w-full"
                  >
                    <span>{opt.label}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-2">
                      {stored?.count}×
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          )}

          {otherItems.length > 0 && (
            <SelectGroup>
              <SelectLabel>Other Options</SelectLabel>
              {otherItems.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};


code.demo.1758910283981.tsx
"use client";

import * as React from "react";
import { BehavioralHistorySelect, HistoryOption } from "@/components/ui/behavioral-history-select";

const options: HistoryOption[] = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

export default function DemoBehavioralHistorySelect () {
  const [selected, setSelected] = React.useState<string>("");

  return (
    <div className="p-8 flex flex-col gap-6 items-start">
      <h1 className="text-xl font-bold">Behavioral History Select Demo</h1>

      <BehavioralHistorySelect
        options={options}
        label="Select a framework"
        placeholder="Choose framework..."
        onChange={setSelected}
        maxHistory={3}
        storageKey="framework_select_demo"
        selectWidth="300px"
      />

      {selected && (
        <p>
          Selected: <strong>{selected}</strong>
        </p>
      )}
    </div>
  );
};

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/behavioral-history-select.tsx
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface HistoryOption {
  value: string;
  label: string;
}

interface BehavioralHistorySelectProps {
  options: HistoryOption[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  maxHistory?: number; // recent items to remember
  storageKey?: string; // localStorage key
  selectWidth?: string | number; // fixed width
}

interface StoredHistory {
  value: string;
  count: number;
  timestamp: number;
}

export const BehavioralHistorySelect: React.FC<BehavioralHistorySelectProps> = ({
  options,
  label,
  placeholder = "Select an option...",
  onChange,
  defaultValue,
  maxHistory = 5,
  storageKey = "behavioral_history_select",
  selectWidth = "280px",
}) => {
  const [selected, setSelected] = React.useState(defaultValue || "");
  const [history, setHistory] = React.useState<StoredHistory[]>([]);

  // Load history from localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) setHistory(JSON.parse(stored));
    }
  }, [storageKey]);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);

    setHistory((prev) => {
      const existing = prev.find((h) => h.value === value);
      let updated: StoredHistory[];
      if (existing) {
        updated = prev.map((h) =>
          h.value === value
            ? { ...h, count: h.count + 1, timestamp: Date.now() }
            : h
        );
      } else {
        updated = [...prev, { value, count: 1, timestamp: Date.now() }];
      }

      // Sort by frequency & recency
      updated.sort((a, b) => {
        if (b.count === a.count) return b.timestamp - a.timestamp;
        return b.count - a.count;
      });

      // Limit recent history
      const limited = updated.slice(0, maxHistory);

      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(limited));
      }

      return limited;
    });
  };

  // Prepare sections
  const recentItems = history
    .map((h) => options.find((o) => o.value === h.value))
    .filter(Boolean) as HistoryOption[];

  const otherItems = options.filter((o) => !recentItems.some((r) => r.value === o.value));

  return (
    <div className="flex flex-col gap-2">
      <Select defaultValue={defaultValue} onValueChange={handleChange}>
        <SelectTrigger
          className="w-full"
          style={{ width: selectWidth, minWidth: selectWidth }}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent style={{ width: selectWidth }}>
          {label && (
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
            </SelectGroup>
          )}

          {recentItems.length > 0 && (
            <SelectGroup>
              <SelectLabel>Recent</SelectLabel>
              {recentItems.map((opt) => {
                const stored = history.find((h) => h.value === opt.value);
                return (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="flex justify-between items-center w-full"
                  >
                    <span>{opt.label}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full ml-2">
                      {stored?.count}×
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          )}

          {otherItems.length > 0 && (
            <SelectGroup>
              <SelectLabel>Other Options</SelectLabel>
              {otherItems.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
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
