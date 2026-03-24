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

export default function DisabledDemo() {
  return (
        <Switch>
          <Switch.Control defaultChecked disabled label="Source" value="source" />
          <Switch.Control disabled label="Output" value="output" />
        </Switch>
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
