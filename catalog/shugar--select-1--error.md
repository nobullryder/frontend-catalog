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
select-1.tsx
import React from "react";
import { Error } from "@/components/ui/error";
import clsx from "clsx";

const sizes = [
  {
    xsmall: "h-6 text-xs pl-1.5 pr-[22px]",
    small: "h-8 text-sm pl-3 pr-9",
    medium: "h-10 text-sm pl-3 pr-9",
    large: "h-12 text-base pl-3 pr-9 rounded-lg"
  },
  {
    xsmall: "h-6 text-xs px-[22px]",
    small: "h-8 text-sm px-9",
    medium: "h-10 text-sm px-9",
    large: "h-12 text-base px-9 rounded-lg"
  }
];

const variants = {
  default: "",
  ghost: ""
};

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  variant?: keyof typeof variants;
  options?: Option[];
  label?: string;
  value?: string;
  placeholder?: string;
  size?: keyof typeof sizes[0];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const ArrowBottom = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
    />
  </svg>
);

export const Select = ({
  variant = "default",
  options,
  label,
  value,
  placeholder,
  size = "medium",
  suffix,
  prefix,
  disabled = false,
  error,
  onChange
}: SelectProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="select"
          className="cursor-text block font-sans text-[13px] text-gray-900 capitalize mb-2"
        >
          {label}
        </label>
      )}
      <div className={clsx(
        "relative flex items-center",
        disabled ? "fill-[#8f8f8f]" : "fill-[#666666] dark:fill-[#a1a1a1] hover:fill-[#171717] hover:dark:fill-[#ededed]"
      )}>
        <style>
          {`
          .xsmallIconContainer svg {
              width: 16px;
              height: 12px;
          }
          .smallIconContainer, .mediumIconContainer, .largeIconContainer svg {
              width: 16px;
              height: 16px;
          }
        `}
        </style>
        <select
          id="select"
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={clsx(
            "font-sans appearance-none w-full border rounded-[5px] duration-200 outline-none",
            sizes[prefix ? 1 : 0][size],
            disabled ? "cursor-not-allowed bg-gray-100 text-gray-700" : variant === "default" ? "text-gray-1000 bg-background-100 cursor-pointer" : "bg-transparent text-accents-5",
            error ? "border-error ring-red-900-alpha-160 ring-opacity-100 ring-[3px]" : `ring-gray-alpha-500 ring-opacity-100 focus:ring-[3px] ${variant === "default" ? "border-gray-alpha-400" : "border-transparent ring-none"}`
          )}
        >
          {placeholder && <option value="" disabled selected>{placeholder}</option>}
          {options && options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {prefix && (
          <span className={clsx(
            `inline-flex absolute pointer-events-none duration-150 ${size}IconContainer`,
            size === "xsmall" ? "left-[5px]" : "left-3"
          )}>
            {prefix}
          </span>
        )}
        <span
          className={clsx(
            `inline-flex absolute pointer-events-none duration-150 ${size}IconContainer`,
            size === "xsmall" ? "right-[5px]" : "right-3"
          )}>
          {suffix ? suffix : <ArrowBottom />}
        </span>
      </div>
      {error && (
        <div className="mt-2">
          <Error size={size === "large" ? "large" : "small"}>{error}</Error>
        </div>
      )}
    </div>
  );
};

code.demo.1751589081999.tsx
import { Select } from "@/components/ui/select-1";

export default function ErrorDemo() {
  return (
        <div className="flex gap-8 items-center justify-center">
          <Select
            error="Please select a value."
            placeholder="XSmall"
            size="xsmall"
          />
          <Select
            error="Please select a value."
            placeholder="Small"
            size="small"
          />
          <Select
            error="Please select a value."
            placeholder="Default"
          />
          <Select
            error="Please select a value."
            placeholder="Large"
            size="large"
          />
        </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/select-1.tsx
import React from "react";
import { Error } from "@/components/ui/error";
import clsx from "clsx";

const sizes = [
  {
    xsmall: "h-6 text-xs pl-1.5 pr-[22px]",
    small: "h-8 text-sm pl-3 pr-9",
    medium: "h-10 text-sm pl-3 pr-9",
    large: "h-12 text-base pl-3 pr-9 rounded-lg"
  },
  {
    xsmall: "h-6 text-xs px-[22px]",
    small: "h-8 text-sm px-9",
    medium: "h-10 text-sm px-9",
    large: "h-12 text-base px-9 rounded-lg"
  }
];

const variants = {
  default: "",
  ghost: ""
};

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  variant?: keyof typeof variants;
  options?: Option[];
  label?: string;
  value?: string;
  placeholder?: string;
  size?: keyof typeof sizes[0];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const ArrowBottom = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
    />
  </svg>
);

export const Select = ({
  variant = "default",
  options,
  label,
  value,
  placeholder,
  size = "medium",
  suffix,
  prefix,
  disabled = false,
  error,
  onChange
}: SelectProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="select"
          className="cursor-text block font-sans text-[13px] text-gray-900 capitalize mb-2"
        >
          {label}
        </label>
      )}
      <div className={clsx(
        "relative flex items-center",
        disabled ? "fill-[#8f8f8f]" : "fill-[#666666] dark:fill-[#a1a1a1] hover:fill-[#171717] hover:dark:fill-[#ededed]"
      )}>
        <style>
          {`
          .xsmallIconContainer svg {
              width: 16px;
              height: 12px;
          }
          .smallIconContainer, .mediumIconContainer, .largeIconContainer svg {
              width: 16px;
              height: 16px;
          }
        `}
        </style>
        <select
          id="select"
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={clsx(
            "font-sans appearance-none w-full border rounded-[5px] duration-200 outline-none",
            sizes[prefix ? 1 : 0][size],
            disabled ? "cursor-not-allowed bg-gray-100 text-gray-700" : variant === "default" ? "text-gray-1000 bg-background-100 cursor-pointer" : "bg-transparent text-accents-5",
            error ? "border-error ring-red-900-alpha-160 ring-opacity-100 ring-[3px]" : `ring-gray-alpha-500 ring-opacity-100 focus:ring-[3px] ${variant === "default" ? "border-gray-alpha-400" : "border-transparent ring-none"}`
          )}
        >
          {placeholder && <option value="" disabled selected>{placeholder}</option>}
          {options && options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {prefix && (
          <span className={clsx(
            `inline-flex absolute pointer-events-none duration-150 ${size}IconContainer`,
            size === "xsmall" ? "left-[5px]" : "left-3"
          )}>
            {prefix}
          </span>
        )}
        <span
          className={clsx(
            `inline-flex absolute pointer-events-none duration-150 ${size}IconContainer`,
            size === "xsmall" ? "right-[5px]" : "right-3"
          )}>
          {suffix ? suffix : <ArrowBottom />}
        </span>
      </div>
      {error && (
        <div className="mt-2">
          <Error size={size === "large" ? "large" : "small"}>{error}</Error>
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
