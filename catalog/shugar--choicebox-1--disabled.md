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
choicebox-1.tsx
import React from "react";
import clsx from "clsx";

interface ChoiceboxGroupProps {
  direction: "row" | "column";
  label?: string;
  showLabel?: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string[]>>;
  type: "radio" | "checkbox";
  value: string | string[];
  children: React.ReactNode;
  disabled?: boolean;
}

export const ChoiceboxGroup = ({
  direction,
  label,
  showLabel,
  onChange,
  type,
  value,
  children,
  disabled
}: ChoiceboxGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      {showLabel && label && (
        <label className="font-sans text-[13px] text-gray-900">{label}</label>
      )}
      <div className={clsx("flex gap-4", direction === "row" ? "flex-row" : "flex-col")}>
        {React.Children.map(children, (child) => {
          const props = disabled ? {
            onChange,
            type,
            valueSelected: value,
            disabled
          } : {
            onChange,
            type,
            valueSelected: value
          };
          return React.cloneElement(child as React.ReactElement<any>, props);
        })}
      </div>
    </div>
  );
};

const getChoiceboxGroupClasses = (isSelected: boolean, type: "radio" | "checkbox") => {
  let className = "relative border w-4 h-4 duration-200";
  if (type === "radio") {
    className += " rounded-[50%] after:w-2 after:h-2 after:rounded-[50%] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 bg-background-100";
    if (isSelected) {
      className += " border-blue-900 after:bg-blue-900 after:scale-100";
    } else {
      className += " border-gray-500 after:bg-gray-500 after:scale-0";
    }
  } else {
    className += " rounded inline-flex items-center justify-center";
    if (isSelected) {
      className += " bg-blue-900 border-blue-900";
    } else {
      className += " bg-background-100 border-gray-500";
    }
  }

  return className;
};

interface ChoiceboxItemProps {
  title: string;
  description: string;
  value: string;
  type?: "radio" | "checkbox";
  valueSelected?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

ChoiceboxGroup.Item = ({
  title,
  description,
  value,
  type = "radio",
  valueSelected,
  onChange,
  disabled,
  children
}: ChoiceboxItemProps) => {
  const isSelected = !!(typeof valueSelected === "string" ? value === valueSelected : valueSelected?.includes(value));

  const onClick = () => {
    if (onChange && !disabled) {
      if (typeof valueSelected === "string") {
        onChange(value);
      } else {
        if (valueSelected) {
          if (isSelected) {
            onChange(valueSelected.filter((item) => item !== value));
          } else {
            onChange([...valueSelected, value]);
          }
        } else {
          onChange([value]);
        }
      }
    }
  };

  return (
    <div
      className={clsx(
        "border w-full rounded-md duration-150",
        isSelected ? "border-blue-600" : "border-gray-400",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        isSelected ? "bg-blue-100" : "bg-transparent"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 p-3">
        <div className="flex flex-col gap-1 font-sans text-sm">
          <span className={clsx(
            "font-medium",
            disabled ? "text-gray-500" : isSelected ? "text-blue-900" : "text-gray-1000"
          )}>
            {title}
          </span>
          <span className={disabled ? "text-gray-500" : isSelected ? "text-blue-900" : "text-gray-900"}>
            {description}
          </span>
        </div>
        <div className="flex items-center ml-auto">
          <input
            disabled={disabled}
            type={type}
            value={value}
            checked={isSelected}
            onChange={onClick}
            className="absolute w-[1px] h-[1px] p-0 m-[-1] overflow-hidden whitespace-nowrap border-none"
          />
          <span className={getChoiceboxGroupClasses(isSelected, type)}>
            {type === "checkbox" && (
              <svg
                className={clsx("shrink-0", isSelected ? "fill-blue-900" : "fill-background")}
                height="16"
                viewBox="0 0 20 20"
                width="16"
              >
                <path
                  className="stroke-background"
                  d="M14 7L8.5 12.5L6 10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            )}
          </span>
        </div>
      </div>
      {children && isSelected && (
        <div className={clsx("border-t", isSelected ? "border-blue-600" : "border-gray-400")}>
          {children}
        </div>
      )}
    </div>
  );
};


code.demo.1752223613861.tsx
import { useState } from "react";
import { ChoiceboxGroup } from "@/components/ui/choicebox-1";

export default function DisabledDemo() {
  const [value3, setValue3] = useState<string>("");
  const [value4, setValue4] = useState<string[]>([]);
  return (
      <div className="flex flex-col gap-4 w-3/4">
        <ChoiceboxGroup
          direction="row"
          disabled
          label="Choicebox group disabled"
          onChange={setValue3}
          showLabel
          type="radio"
          value={value3}
        >
          <ChoiceboxGroup.Item
            description="Free for two weeks"
            title="Pro Trial"
            value="trial"
          />
          <ChoiceboxGroup.Item
            description="Get started now"
            title="Pro"
            value="pro"
          />
        </ChoiceboxGroup>

        <ChoiceboxGroup
          direction="row"
          label="Single input disabled"
          onChange={setValue4}
          showLabel
          type="checkbox"
          value={value4}
        >
          <ChoiceboxGroup.Item
            description="Free for two weeks"
            disabled
            title="Pro Trial"
            value="trial"
          />
          <ChoiceboxGroup.Item
            description="Get started now"
            title="Pro"
            value="pro"
          />
        </ChoiceboxGroup>
      </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/choicebox-1.tsx
import React from "react";
import clsx from "clsx";

interface ChoiceboxGroupProps {
  direction: "row" | "column";
  label?: string;
  showLabel?: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<string[]>>;
  type: "radio" | "checkbox";
  value: string | string[];
  children: React.ReactNode;
  disabled?: boolean;
}

export const ChoiceboxGroup = ({
  direction,
  label,
  showLabel,
  onChange,
  type,
  value,
  children,
  disabled
}: ChoiceboxGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      {showLabel && label && (
        <label className="font-sans text-[13px] text-gray-900">{label}</label>
      )}
      <div className={clsx("flex gap-4", direction === "row" ? "flex-row" : "flex-col")}>
        {React.Children.map(children, (child) => {
          const props = disabled ? {
            onChange,
            type,
            valueSelected: value,
            disabled
          } : {
            onChange,
            type,
            valueSelected: value
          };
          return React.cloneElement(child as React.ReactElement<any>, props);
        })}
      </div>
    </div>
  );
};

const getChoiceboxGroupClasses = (isSelected: boolean, type: "radio" | "checkbox") => {
  let className = "relative border w-4 h-4 duration-200";
  if (type === "radio") {
    className += " rounded-[50%] after:w-2 after:h-2 after:rounded-[50%] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 bg-background-100";
    if (isSelected) {
      className += " border-blue-900 after:bg-blue-900 after:scale-100";
    } else {
      className += " border-gray-500 after:bg-gray-500 after:scale-0";
    }
  } else {
    className += " rounded inline-flex items-center justify-center";
    if (isSelected) {
      className += " bg-blue-900 border-blue-900";
    } else {
      className += " bg-background-100 border-gray-500";
    }
  }

  return className;
};

interface ChoiceboxItemProps {
  title: string;
  description: string;
  value: string;
  type?: "radio" | "checkbox";
  valueSelected?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

ChoiceboxGroup.Item = ({
  title,
  description,
  value,
  type = "radio",
  valueSelected,
  onChange,
  disabled,
  children
}: ChoiceboxItemProps) => {
  const isSelected = !!(typeof valueSelected === "string" ? value === valueSelected : valueSelected?.includes(value));

  const onClick = () => {
    if (onChange && !disabled) {
      if (typeof valueSelected === "string") {
        onChange(value);
      } else {
        if (valueSelected) {
          if (isSelected) {
            onChange(valueSelected.filter((item) => item !== value));
          } else {
            onChange([...valueSelected, value]);
          }
        } else {
          onChange([value]);
        }
      }
    }
  };

  return (
    <div
      className={clsx(
        "border w-full rounded-md duration-150",
        isSelected ? "border-blue-600" : "border-gray-400",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        isSelected ? "bg-blue-100" : "bg-transparent"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 p-3">
        <div className="flex flex-col gap-1 font-sans text-sm">
          <span className={clsx(
            "font-medium",
            disabled ? "text-gray-500" : isSelected ? "text-blue-900" : "text-gray-1000"
          )}>
            {title}
          </span>
          <span className={disabled ? "text-gray-500" : isSelected ? "text-blue-900" : "text-gray-900"}>
            {description}
          </span>
        </div>
        <div className="flex items-center ml-auto">
          <input
            disabled={disabled}
            type={type}
            value={value}
            checked={isSelected}
            onChange={onClick}
            className="absolute w-[1px] h-[1px] p-0 m-[-1] overflow-hidden whitespace-nowrap border-none"
          />
          <span className={getChoiceboxGroupClasses(isSelected, type)}>
            {type === "checkbox" && (
              <svg
                className={clsx("shrink-0", isSelected ? "fill-blue-900" : "fill-background")}
                height="16"
                viewBox="0 0 20 20"
                width="16"
              >
                <path
                  className="stroke-background"
                  d="M14 7L8.5 12.5L6 10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            )}
          </span>
        </div>
      </div>
      {children && isSelected && (
        <div className={clsx("border-t", isSelected ? "border-blue-600" : "border-gray-400")}>
          {children}
        </div>
      )}
    </div>
  );
};

```

Install NPM dependencies:
```bash
clsx
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
