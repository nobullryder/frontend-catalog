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
tabs.tsx
import React from "react";
import { Tooltip } from "@/components/ui/tooltip";

type TTabVariant = "primary" | "secondary";

export interface ITab {
  title?: string;
  value: string;
  disabled?: boolean;
  icon?: string;
  tooltip?: string;
}

interface TabsProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  tabs: ITab[];
  disabled?: boolean;
  variant?: TTabVariant;
}

interface TabProps extends ITab {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  variant: TTabVariant;
}

const getClasses = (isSelected: boolean, disabled: boolean, variant: TTabVariant) => {
  let classes = `relative overflow-visible box-border font-sans text-sm flex gap-0.5 duration-100 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;
  if (isSelected) {
    if (variant === "primary") {
      classes += " border-b-2 border-gray-1000 -mb-0.5";
    } else if (variant === "secondary") {
      classes += " bg-gray-1000";
    }
  } else {
    if (variant === "secondary") {
      if (disabled) {
        classes += " bg-gray-200";
      } else {
        classes += " bg-gray-alpha-200";
      }
    }
  }
  if (variant === "primary") {
    classes += " pb-[5px] hover:text-gray-1000";
  } else if (variant === "secondary") {
    classes += " h-6 rounded-md text-[13px] px-1.5 items-center";
  }
  if (disabled) {
    classes += isSelected ? " text-gray-1000" : " text-gray-900";
  } else {
    if (variant === "primary") {
      classes += isSelected ? " text-gray-1000" : " text-gray-900";
    } else {
      classes += isSelected ? " text-background-100" : " text-gray-1000";
    }
  }

  return classes;
};

const Tab = ({
  selected,
  setSelected,
  title,
  value,
  disabled = false,
  icon,
  variant
}: TabProps) => {
  if (!title && !icon) {
    return;
  }

  return (
    <div
      className={getClasses(selected === value, disabled, variant)}
      onClick={() => {
        if (!disabled) {
          setSelected(value);
        }
      }}
    >
      {icon && <img src={icon} alt={title} width={16} height={16} />}
      <div>{title}</div>
    </div>
  );
};

export const Tabs = ({
  selected,
  setSelected,
  tabs,
  disabled = false,
  variant = "primary"
}: TabsProps) => {
  return (
    <div
      className={`flex${disabled ? " cursor-not-allowed" : ""} ${variant === "primary" ? "gap-6 pb-[1px] border-b border-accents-2" : "gap-2"}`}>
      {tabs.map((tab) => tab.tooltip ? (
        <Tooltip text={tab.tooltip}>
          <Tab
            key={tab.value}
            selected={selected}
            setSelected={setSelected}
            disabled={disabled || tab.disabled}
            variant={variant}
            {...tab}
          />
        </Tooltip>
      ) : (
        <Tab
          key={tab.value}
          selected={selected}
          setSelected={setSelected}
          disabled={disabled || tab.disabled}
          variant={variant}
          {...tab}
        />
      ))}
    </div>
  );
};

code.demo.tsx
import React, { useState } from "react";
import { ITab, Tabs } from "@/components/ui/tabs";

const defaultTabs: ITab[] = [
  {
    title: "Apple",
    value: "apple"
  },
  {
    title: "Orange",
    value: "orange"
  },
  {
    title: "Mango",
    value: "mango"
  }
];

const disabledTabs: ITab[] = [
  {
    title: "Apple",
    value: "apple"
  },
  {
    title: "Orange",
    value: "orange"
  },
  {
    title: "Disabled",
    value: "disabled",
    disabled: true,
    tooltip: "Disabled tooltip",
  }
];

const iconsTabs: ITab[] = [
  {
    title: "Apple",
    value: "apple",
    icon: "https://www.svgrepo.com/show/530203/apple.svg"
  },
  {
    value: "orange",
    icon: "https://www.svgrepo.com/show/474519/orange.svg"
  },
  {
    title: "Mango",
    value: "mango"
  }
];

export const Default = () => {
  const [selected1, setSelected1] = useState<string>("apple");

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-xl dark:text-white">Default</div>
      <Tabs selected={selected1} setSelected={setSelected1} tabs={defaultTabs} />
    </div>
  );
};

export const Disabled = () => {
  const [selected2, setSelected2] = useState<string>("apple");

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-xl dark:text-white">Disabled</div>
      <Tabs selected={selected2} setSelected={setSelected2} tabs={defaultTabs} disabled />
    </div>
  );
};

export const DisableSpecificTabs = () => {
  const [selected3, setSelected3] = useState<string>("apple");

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-xl dark:text-white">Disable specific tabs</div>
      <Tabs selected={selected3} setSelected={setSelected3} tabs={disabledTabs} />
    </div>
  );
};

export const WithIcons = () => {
  const [selected4, setSelected4] = useState<string>("apple");

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-xl dark:text-white">With icons</div>
      <Tabs selected={selected4} setSelected={setSelected4} tabs={iconsTabs} />
    </div>
  );
};

export const Secondary = () => {
  const [selected5, setSelected5] = useState<string>("apple");

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-xl dark:text-white">Secondary</div>
      <Tabs
        selected={selected5}
        setSelected={setSelected5}
        tabs={disabledTabs}
        variant="secondary"
      />
    </div>
  );
};
```

Copy-paste these files for dependencies:
```tsx
/components/ui/tabs.tsx
import React from "react";
import { Tooltip } from "@/components/ui/tooltip";

type TTabVariant = "primary" | "secondary";

export interface ITab {
  title?: string;
  value: string;
  disabled?: boolean;
  icon?: string;
  tooltip?: string;
}

interface TabsProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  tabs: ITab[];
  disabled?: boolean;
  variant?: TTabVariant;
}

interface TabProps extends ITab {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  variant: TTabVariant;
}

const getClasses = (isSelected: boolean, disabled: boolean, variant: TTabVariant) => {
  let classes = `relative overflow-visible box-border font-sans text-sm flex gap-0.5 duration-100 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;
  if (isSelected) {
    if (variant === "primary") {
      classes += " border-b-2 border-gray-1000 -mb-0.5";
    } else if (variant === "secondary") {
      classes += " bg-gray-1000";
    }
  } else {
    if (variant === "secondary") {
      if (disabled) {
        classes += " bg-gray-200";
      } else {
        classes += " bg-gray-alpha-200";
      }
    }
  }
  if (variant === "primary") {
    classes += " pb-[5px] hover:text-gray-1000";
  } else if (variant === "secondary") {
    classes += " h-6 rounded-md text-[13px] px-1.5 items-center";
  }
  if (disabled) {
    classes += isSelected ? " text-gray-1000" : " text-gray-900";
  } else {
    if (variant === "primary") {
      classes += isSelected ? " text-gray-1000" : " text-gray-900";
    } else {
      classes += isSelected ? " text-background-100" : " text-gray-1000";
    }
  }

  return classes;
};

const Tab = ({
  selected,
  setSelected,
  title,
  value,
  disabled = false,
  icon,
  variant
}: TabProps) => {
  if (!title && !icon) {
    return;
  }

  return (
    <div
      className={getClasses(selected === value, disabled, variant)}
      onClick={() => {
        if (!disabled) {
          setSelected(value);
        }
      }}
    >
      {icon && <img src={icon} alt={title} width={16} height={16} />}
      <div>{title}</div>
    </div>
  );
};

export const Tabs = ({
  selected,
  setSelected,
  tabs,
  disabled = false,
  variant = "primary"
}: TabsProps) => {
  return (
    <div
      className={`flex${disabled ? " cursor-not-allowed" : ""} ${variant === "primary" ? "gap-6 pb-[1px] border-b border-accents-2" : "gap-2"}`}>
      {tabs.map((tab) => tab.tooltip ? (
        <Tooltip text={tab.tooltip}>
          <Tab
            key={tab.value}
            selected={selected}
            setSelected={setSelected}
            disabled={disabled || tab.disabled}
            variant={variant}
            {...tab}
          />
        </Tooltip>
      ) : (
        <Tab
          key={tab.value}
          selected={selected}
          setSelected={setSelected}
          disabled={disabled || tab.disabled}
          variant={variant}
          {...tab}
        />
      ))}
    </div>
  );
};
```
```tsx
/components/ui/tooltip.tsx
import React, { useMemo } from "react";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const types = {
  success: "!bg-success !text-white",
  warning: "!bg-warning !text-black",
  error: "!bg-error !text-white",
  violet: "!bg-violet !text-white",
  default: "!bg-foreground !text-background-100",
};

interface TooltipProps {
  children: React.ReactNode;
  text: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: boolean;
  boxAlign?: "left" | "right" | "center";
  type?: keyof typeof types;
  tip?: boolean;
  center?: boolean;
}

export const Tooltip = ({
  children,
  text,
  position = "top",
  delay = true,
  boxAlign = "center",
  type = "default",
  tip = true,
  center = true
}: TooltipProps) => {
  const id = useMemo(() => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }, []);

  return (
    <div>
      <div id={id} className="font-sans">{children}</div>
      <ReactTooltip
        anchorSelect={`#${id}`}
        //@ts-ignore
        place={`${position}${{ left: "-start", right: "-end", center: "" }[boxAlign]}`}
        delayShow={delay ? 500 : 0}
        opacity={1}
        noArrow={!tip}
        className={`!font-sans !text-[13px] !max-w-52 !rounded-lg ${types[type]}${center ? " text-center" : " text-start"}`}
      >
        {text}
      </ReactTooltip>
    </div>
  );
};
```

Install NPM dependencies:
```bash
react-tooltip
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray-200": "var(--ds-gray-200)",
        "gray-900": "var(--ds-gray-900)",
        "gray-1000": "var(--ds-gray-1000)",
        "gray-alpha-200": "var(--ds-gray-alpha-200)",
        "accents-2": "var(--accents-2)",
        "background-100": "var(--ds-background-100)",
        "success": "var(--geist-success)",
        "error": "var(--geist-error)",
        "warning": "var(--geist-warning)",
        "violet": "var(--geist-violet)",
        "foreground": "var(--geist-foreground)"
      }
    }
  }
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
