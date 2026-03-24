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
input.tsx
import React, { useEffect, useRef, useState } from "react";
import { Error } from "@/components/ui/error";
import clsx from "clsx";

const sizes = {
  xSmall: "h-6 text-xs rounded-md",
  small: "h-8 text-sm rounded-md",
  mediumSmall: "h-10 text-sm rounded-md",
  medium: "h-10 text-sm rounded-md",
  large: "h-12 text-base rounded-lg"
};

interface InputProps {
  placeholder?: string;
  size?: keyof typeof sizes;
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  prefixStyling?: boolean | string;
  suffixStyling?: boolean | string;
  disabled?: boolean;
  error?: string | boolean;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.RefObject<HTMLInputElement | null>;
  className?: string;
  wrapperClassName?: string;
}

export const Input = ({
  placeholder,
  size = "medium",
  prefix,
  suffix,
  prefixStyling = true,
  suffixStyling = true,
  disabled = false,
  error,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  ref,
  className,
  wrapperClassName,
  ...rest
}: InputProps) => {
  const [_value, set_value] = useState(value || "");
  const _ref = ref ? ref : useRef<HTMLInputElement>(null);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_value(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      set_value(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2" onClick={() => _ref.current?.focus()}>
      {label && (
        <div className="capitalize text-[13px] text-gray-900">
          {label}
        </div>
      )}
      <div className={clsx(
        "flex items-center duration-150 font-sans",
        error ? "shadow-error-input hover:shadow-error-input-hover" : "border border-gray-alpha-400 hover:border-gray-alpha-500 focus-within:border-transparent focus-within:shadow-focus-input",
        sizes[size],
        disabled ? "cursor-not-allowed bg-gray-100" : "bg-background-100",
        wrapperClassName
      )}>
        {prefix && (
          <div
            className={clsx(
              "text-gray-700 fill-gray-700 h-full flex items-center justify-center",
              prefixStyling === true ? "bg-background-200 border-r border-gray-alpha-400 px-3" : `pl-3${!prefixStyling ? "" : ` ${prefixStyling}`}`,
              size === "large" ? "rounded-l-lg" : "rounded-l-md"
            )}>
            {prefix}
          </div>
        )}
        <input
          className={clsx(
            "w-full inline-flex appearance-none placeholder:text-gray-900 placeholder:opacity-70 outline-none",
            (size === "xSmall" || size === "mediumSmall") ? "px-2" : "px-3",
            disabled ? "cursor-not-allowed bg-gray-100 text-gray-700" : "bg-background-100 text-geist-foreground",
            className
          )}
          placeholder={placeholder}
          disabled={disabled}
          value={_value}
          onChange={_onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={_ref}
          {...rest}
        />
        {suffix && (
          <div className={clsx(
            "text-gray-700 fill-gray-700 h-full flex items-center justify-center",
            suffixStyling === true ? "bg-background-200 border-l border-gray-alpha-400 px-3" : `pr-3 ${!suffixStyling ? "" : ` ${suffixStyling}`}`,
            size === "large" ? "rounded-r-lg" : "rounded-r-md"
          )}>
            {suffix}
          </div>
        )}
      </div>
      {typeof error === "string" && <Error size={size === "large" ? "large" : "small"}>{error}</Error>}
    </div>
  );
};

code.demo.1752489504121.tsx
import { Input } from "@/components/ui/input";

const ArrowCircleUp = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25 10.75V11.5H8.75V10.75V6.56066L10.2197 8.03033L10.75 8.56066L11.8107 7.5L11.2803 6.96967L8.53033 4.21967C8.23744 3.92678 7.76256 3.92678 7.46967 4.21967L4.71967 6.96967L4.18934 7.5L5.25 8.56066L5.78033 8.03033L7.25 6.56066V10.75ZM14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
    />
  </svg>
);

export default function PrefixAndSuffixDemo() {
  return (
      <div className="flex flex-col items-start gap-4">
          <Input
            aria-labelledby="Demo"
            placeholder="Default"
            prefix={<ArrowCircleUp />}
          />

          <Input
            aria-labelledby="Demo"
            placeholder="Default"
            suffix={<ArrowCircleUp />}
          />

          <Input
            aria-labelledby="Demo"
            placeholder="Default"
            prefix="https://"
            suffix=".com"
          />

          <Input
            aria-labelledby="Demo"
            placeholder="Default"
            prefix={<ArrowCircleUp />}
            prefixStyling={false}
            suffix={<ArrowCircleUp />}
            suffixStyling={false}
          />

          <Input
            aria-labelledby="Demo"
            placeholder="Default"
            prefix="vercel/"
            suffix={<ArrowCircleUp />}
            suffixStyling={false}
          />
        </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/input.tsx
import React, { useEffect, useRef, useState } from "react";
import { Error } from "@/components/ui/error";
import clsx from "clsx";

const sizes = {
  xSmall: "h-6 text-xs rounded-md",
  small: "h-8 text-sm rounded-md",
  mediumSmall: "h-10 text-sm rounded-md",
  medium: "h-10 text-sm rounded-md",
  large: "h-12 text-base rounded-lg"
};

interface InputProps {
  placeholder?: string;
  size?: keyof typeof sizes;
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  prefixStyling?: boolean | string;
  suffixStyling?: boolean | string;
  disabled?: boolean;
  error?: string | boolean;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.RefObject<HTMLInputElement | null>;
  className?: string;
  wrapperClassName?: string;
}

export const Input = ({
  placeholder,
  size = "medium",
  prefix,
  suffix,
  prefixStyling = true,
  suffixStyling = true,
  disabled = false,
  error,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  ref,
  className,
  wrapperClassName,
  ...rest
}: InputProps) => {
  const [_value, set_value] = useState(value || "");
  const _ref = ref ? ref : useRef<HTMLInputElement>(null);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_value(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      set_value(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-2" onClick={() => _ref.current?.focus()}>
      {label && (
        <div className="capitalize text-[13px] text-gray-900">
          {label}
        </div>
      )}
      <div className={clsx(
        "flex items-center duration-150 font-sans",
        error ? "shadow-error-input hover:shadow-error-input-hover" : "border border-gray-alpha-400 hover:border-gray-alpha-500 focus-within:border-transparent focus-within:shadow-focus-input",
        sizes[size],
        disabled ? "cursor-not-allowed bg-gray-100" : "bg-background-100",
        wrapperClassName
      )}>
        {prefix && (
          <div
            className={clsx(
              "text-gray-700 fill-gray-700 h-full flex items-center justify-center",
              prefixStyling === true ? "bg-background-200 border-r border-gray-alpha-400 px-3" : `pl-3${!prefixStyling ? "" : ` ${prefixStyling}`}`,
              size === "large" ? "rounded-l-lg" : "rounded-l-md"
            )}>
            {prefix}
          </div>
        )}
        <input
          className={clsx(
            "w-full inline-flex appearance-none placeholder:text-gray-900 placeholder:opacity-70 outline-none",
            (size === "xSmall" || size === "mediumSmall") ? "px-2" : "px-3",
            disabled ? "cursor-not-allowed bg-gray-100 text-gray-700" : "bg-background-100 text-geist-foreground",
            className
          )}
          placeholder={placeholder}
          disabled={disabled}
          value={_value}
          onChange={_onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={_ref}
          {...rest}
        />
        {suffix && (
          <div className={clsx(
            "text-gray-700 fill-gray-700 h-full flex items-center justify-center",
            suffixStyling === true ? "bg-background-200 border-l border-gray-alpha-400 px-3" : `pr-3 ${!suffixStyling ? "" : ` ${suffixStyling}`}`,
            size === "large" ? "rounded-r-lg" : "rounded-r-md"
          )}>
            {suffix}
          </div>
        )}
      </div>
      {typeof error === "string" && <Error size={size === "large" ? "large" : "small"}>{error}</Error>}
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
