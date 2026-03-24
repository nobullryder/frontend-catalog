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
switch.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const SwitchContext = createContext<{
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

interface SwitchProps {
  children: React.ReactNode;
  name?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
}

export const Switch = ({ children, name = "default", size = "medium", style }: SwitchProps) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <SwitchContext.Provider value={{ value, setValue }}>
      <div
        className={clsx(
          "flex bg-background-100 p-1 border border-gray-alpha-400",
          size === "small" && "h-8 rounded-md",
          size === "medium" && "h-10 rounded-md",
          size === "large" && "h-12 rounded-lg"
        )}
        style={style}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<SwitchControlProps>, { size, name }))}
      </div>
    </SwitchContext.Provider>
  );
};

interface SwitchControlProps {
  label?: string;
  value: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
}

const SwitchControl = ({
  label,
  value,
  defaultChecked,
  disabled = false,
  name,
  size = "medium",
  icon
}: SwitchControlProps) => {
  const context = useContext(SwitchContext);
  const checked = value === context?.value;

  useEffect(() => {
    if (defaultChecked) {
      context?.setValue(value);
    }
  }, []);

  return (
    <label
      className={clsx("flex flex-1 h-full", disabled && "cursor-not-allowed pointer-events-none")}
      onClick={() => context?.setValue(value)}
    >
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
        checked={checked}
        className="hidden"
      />
      <span
        className={twMerge(clsx(
          "flex items-center justify-center flex-1 cursor-pointer font-medium font-sans duration-150",
          checked ? "bg-gray-100 text-gray-1000 fill-gray-1000 rounded-sm" : "text-gray-900 hover:text-gray-1000 fill-gray-900 hover:fill-gray-1000",
          disabled && "text-gray-800 fill-gray-800",
          !icon && size === "small" && "text-sm px-3",
          !icon && size === "medium" && "text-sm px-3",
          !icon && size === "large" && "text-base px-4",
          icon && size === "small" && "py-1 px-2",
          icon && size === "medium" && "py-2 px-3",
          icon && size === "large" && "p-3"
        ))}
      >
        {icon ? <span className={clsx(size === "large" && "scale-125")}>{icon}</span> : label}
      </span>
    </label>
  );
};

Switch.Control = SwitchControl;


code.demo.1752057511504.tsx
import { Switch } from "@/components/ui/switch";

const GridSquare = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z"
    />
  </svg>
);

const ListUnordered = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 4C3.19036 4 3.75 3.44036 3.75 2.75C3.75 2.05964 3.19036 1.5 2.5 1.5C1.80964 1.5 1.25 2.05964 1.25 2.75C1.25 3.44036 1.80964 4 2.5 4ZM2.5 9.25C3.19036 9.25 3.75 8.69036 3.75 8C3.75 7.30964 3.19036 6.75 2.5 6.75C1.80964 6.75 1.25 7.30964 1.25 8C1.25 8.69036 1.80964 9.25 2.5 9.25ZM3.75 13.25C3.75 13.9404 3.19036 14.5 2.5 14.5C1.80964 14.5 1.25 13.9404 1.25 13.25C1.25 12.5596 1.80964 12 2.5 12C3.19036 12 3.75 12.5596 3.75 13.25ZM6.75 2H6V3.5H6.75H14.25H15V2H14.25H6.75ZM6.75 7.25H6V8.75H6.75H14.25H15V7.25H14.25H6.75ZM6.75 12.5H6V14H6.75H14.25H15V12.5H14.25H6.75Z"
    />
  </svg>
);

export default function TooltipDemo() {
  return (
      <div className="flex flex-col items-start gap-2 w-3/4">
        <Switch name="icons-small" size="small">
          <Switch.Control defaultChecked icon={<GridSquare />} value="source" />
          <Switch.Control icon={<ListUnordered />} value="output" />
        </Switch>
        <Switch name="icons-default">
          <Switch.Control defaultChecked icon={<GridSquare />} value="source" />
          <Switch.Control icon={<ListUnordered />} value="output" />
        </Switch>
        <Switch name="icons-large" size="large">
          <Switch.Control defaultChecked icon={<GridSquare />} value="source" />
          <Switch.Control icon={<ListUnordered />} value="output" />
        </Switch>
      </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/switch.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const SwitchContext = createContext<{
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

interface SwitchProps {
  children: React.ReactNode;
  name?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
}

export const Switch = ({ children, name = "default", size = "medium", style }: SwitchProps) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <SwitchContext.Provider value={{ value, setValue }}>
      <div
        className={clsx(
          "flex bg-background-100 p-1 border border-gray-alpha-400",
          size === "small" && "h-8 rounded-md",
          size === "medium" && "h-10 rounded-md",
          size === "large" && "h-12 rounded-lg"
        )}
        style={style}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<SwitchControlProps>, { size, name }))}
      </div>
    </SwitchContext.Provider>
  );
};

interface SwitchControlProps {
  label?: string;
  value: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
}

const SwitchControl = ({
  label,
  value,
  defaultChecked,
  disabled = false,
  name,
  size = "medium",
  icon
}: SwitchControlProps) => {
  const context = useContext(SwitchContext);
  const checked = value === context?.value;

  useEffect(() => {
    if (defaultChecked) {
      context?.setValue(value);
    }
  }, []);

  return (
    <label
      className={clsx("flex flex-1 h-full", disabled && "cursor-not-allowed pointer-events-none")}
      onClick={() => context?.setValue(value)}
    >
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
        checked={checked}
        className="hidden"
      />
      <span
        className={twMerge(clsx(
          "flex items-center justify-center flex-1 cursor-pointer font-medium font-sans duration-150",
          checked ? "bg-gray-100 text-gray-1000 fill-gray-1000 rounded-sm" : "text-gray-900 hover:text-gray-1000 fill-gray-900 hover:fill-gray-1000",
          disabled && "text-gray-800 fill-gray-800",
          !icon && size === "small" && "text-sm px-3",
          !icon && size === "medium" && "text-sm px-3",
          !icon && size === "large" && "text-base px-4",
          icon && size === "small" && "py-1 px-2",
          icon && size === "medium" && "py-2 px-3",
          icon && size === "large" && "p-3"
        ))}
      >
        {icon ? <span className={clsx(size === "large" && "scale-125")}>{icon}</span> : label}
      </span>
    </label>
  );
};

Switch.Control = SwitchControl;

```

Install NPM dependencies:
```bash
clsx, tailwind-merge
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
