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
toggle-1.tsx
import React from "react";
import clsx from "clsx";

const colors = {
  blue: {
    backgroundColor: "bg-blue-700",
    fill: "fill-blue-1000 dark:fill-blue-100"
  },
  red: {
    backgroundColor: "bg-red-600",
    fill: "fill-red-1000 dark:fill-red-100"
  },
  amber: {
    backgroundColor: "bg-amber-700",
    fill: "fill-amber-1000 dark:fill-amber-100"
  },
  green: {
    backgroundColor: "bg-green-700",
    fill: "fill-green-1000 dark:fill-green-100"
  },
  teal: {
    backgroundColor: "bg-teal-700",
    fill: "fill-teal-1000 dark:fill-teal-100"
  },
  purple: {
    backgroundColor: "bg-purple-700",
    fill: "fill-purple-1000 dark:fill-purple-100"
  },
  pink: {
    backgroundColor: "bg-pink-700",
    fill: "fill-pink-1000 dark:fill-pink-100"
  },
  gray: {
    backgroundColor: "bg-gray-700",
    fill: "fill-gray-1000 dark:fill-gray-100"
  }
};

type TToggleColor = keyof typeof colors;

interface ToggleProps {
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: "small" | "large";
  color?: TToggleColor;
  icon?: {
    checked: React.ReactNode;
    unchecked: React.ReactNode;
  };
  direction?: "switch-first" | "label-first";
  children?: React.ReactNode;
}

const getClasses = (checked: boolean, disabled: boolean, size: "small" | "large", color?: TToggleColor) => {
  let toggle = "rounded-[14px] inline-block relative duration-150";
  let thumb = "rounded-[50%] border border-transparent absolute top-1/2 -translate-y-1/2 shadow-toggle duration-150 flex items-center justify-center";
  if (size === "small") {
    toggle += " h-3.5 w-7";
    thumb += " h-3 w-3";
  } else {
    toggle += " h-6 w-10";
    thumb += " h-[22px] w-[22px]";
  }
  if (checked) {
    if (size === "small") {
      thumb += " left-3.5";
    } else {
      thumb += " left-4";
    }
    if (disabled) {
      toggle += " bg-accents-1 border border-accents-2 cursor-not-allowed";
      thumb += " bg-gray-200";
    } else {
      toggle += ` ${color ? `bg-gray-100" ${colors[color].fill}` : "bg-success fill-gray-900 dark:fill-background-100"} border border-gray-alpha-400 cursor-pointer`;
      thumb += " bg-background-100 dark:bg-gray-1000";
    }
  } else {
    if (disabled) {
      toggle += " bg-background-100 border border-gray-alpha-400 cursor-not-allowed";
      thumb += " bg-gray-200 left-0";
    } else {
      toggle += ` ${color ? `${colors[color].backgroundColor} ${colors[color].fill}` : "bg-background-100 fill-gray-900 dark:fill-background-100"} border border-gray-alpha-400 cursor-pointer`;
      thumb += " bg-background-200 dark:bg-gray-1000 left-0";
    }
  }

  return { toggle, thumb };
};

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  size = "small",
  color,
  icon,
  direction = "label-first",
  children,
  ...rest
}: ToggleProps) => {
  return (
    <label
      className={clsx(
        "relative inline-flex gap-2 items-center py-[3px] text-xs text-geist-secondary select-none",
        direction === "switch-first" && "flex-row-reverse"
      )}
      {...rest}
    >
      {children && <span>{children}</span>}
      <input
        className="absolute w-0 h-0 appearance-none"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={getClasses(checked, disabled, size, color).toggle}>
        <div className={getClasses(checked, disabled, size, color).thumb}>
          {icon && checked && icon.checked}
          {icon && !checked && icon.unchecked}
        </div>
      </span>
    </label>
  );
};

code.demo.1751440980110.tsx
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle-1";

const LockClosedSmall = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 6V7H6.5V6C6.5 5.17157 7.17157 4.5 8 4.5C8.82843 4.5 9.5 5.17157 9.5 6ZM5 7V6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6V7H12V11.5C12 12.3284 11.3284 13 10.5 13H5.5C4.67157 13 4 12.3284 4 11.5V7H5Z"
    />
  </svg>
);

const LockOpenSmall = () => (
  <svg
    height="16"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 7V6C13.5 5.17157 12.8284 4.5 12 4.5C11.1716 4.5 10.5 5.17157 10.5 6V7H12V8.5V9V11.5C12 12.3284 11.3284 13 10.5 13H5.5C4.67157 13 4 12.3284 4 11.5V7H9V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V7H13.5Z"
    />
  </svg>
);

export default function DefaultDemo() {
  const [checked5, setChecked5] = useState(true);
  return (
    <div className="flex flex-col gap-2 w-3/4">
        <Toggle
          aria-label="Enable Firewall"
          checked={checked5}
          color="amber"
          icon={{
            checked: <LockClosedSmall />,
            unchecked: <LockOpenSmall />
          }}
          onChange={(): void => setChecked5(!checked5)}
        />
        <Toggle
          aria-label="Enable Firewall"
          checked={checked5}
          color="red"
          icon={{
            checked: <LockClosedSmall />,
            unchecked: <LockOpenSmall />
          }}
          onChange={(): void => setChecked5(!checked5)}
        />
        <Toggle
          aria-label="Enable Firewall"
          checked={checked5}
          color="amber"
          icon={{
            checked: <LockClosedSmall />,
            unchecked: <LockOpenSmall />
          }}
          onChange={(): void => setChecked5(!checked5)}
          size="large"
        />
        <Toggle
          aria-label="Enable Firewall"
          checked={checked5}
          color="red"
          icon={{
            checked: <LockClosedSmall />,
            unchecked: <LockOpenSmall />
          }}
          onChange={(): void => setChecked5(!checked5)}
          size="large"
        />
      </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/toggle-1.tsx
import React from "react";
import clsx from "clsx";

const colors = {
  blue: {
    backgroundColor: "bg-blue-700",
    fill: "fill-blue-1000 dark:fill-blue-100"
  },
  red: {
    backgroundColor: "bg-red-600",
    fill: "fill-red-1000 dark:fill-red-100"
  },
  amber: {
    backgroundColor: "bg-amber-700",
    fill: "fill-amber-1000 dark:fill-amber-100"
  },
  green: {
    backgroundColor: "bg-green-700",
    fill: "fill-green-1000 dark:fill-green-100"
  },
  teal: {
    backgroundColor: "bg-teal-700",
    fill: "fill-teal-1000 dark:fill-teal-100"
  },
  purple: {
    backgroundColor: "bg-purple-700",
    fill: "fill-purple-1000 dark:fill-purple-100"
  },
  pink: {
    backgroundColor: "bg-pink-700",
    fill: "fill-pink-1000 dark:fill-pink-100"
  },
  gray: {
    backgroundColor: "bg-gray-700",
    fill: "fill-gray-1000 dark:fill-gray-100"
  }
};

type TToggleColor = keyof typeof colors;

interface ToggleProps {
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  size?: "small" | "large";
  color?: TToggleColor;
  icon?: {
    checked: React.ReactNode;
    unchecked: React.ReactNode;
  };
  direction?: "switch-first" | "label-first";
  children?: React.ReactNode;
}

const getClasses = (checked: boolean, disabled: boolean, size: "small" | "large", color?: TToggleColor) => {
  let toggle = "rounded-[14px] inline-block relative duration-150";
  let thumb = "rounded-[50%] border border-transparent absolute top-1/2 -translate-y-1/2 shadow-toggle duration-150 flex items-center justify-center";
  if (size === "small") {
    toggle += " h-3.5 w-7";
    thumb += " h-3 w-3";
  } else {
    toggle += " h-6 w-10";
    thumb += " h-[22px] w-[22px]";
  }
  if (checked) {
    if (size === "small") {
      thumb += " left-3.5";
    } else {
      thumb += " left-4";
    }
    if (disabled) {
      toggle += " bg-accents-1 border border-accents-2 cursor-not-allowed";
      thumb += " bg-gray-200";
    } else {
      toggle += ` ${color ? `bg-gray-100" ${colors[color].fill}` : "bg-success fill-gray-900 dark:fill-background-100"} border border-gray-alpha-400 cursor-pointer`;
      thumb += " bg-background-100 dark:bg-gray-1000";
    }
  } else {
    if (disabled) {
      toggle += " bg-background-100 border border-gray-alpha-400 cursor-not-allowed";
      thumb += " bg-gray-200 left-0";
    } else {
      toggle += ` ${color ? `${colors[color].backgroundColor} ${colors[color].fill}` : "bg-background-100 fill-gray-900 dark:fill-background-100"} border border-gray-alpha-400 cursor-pointer`;
      thumb += " bg-background-200 dark:bg-gray-1000 left-0";
    }
  }

  return { toggle, thumb };
};

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  size = "small",
  color,
  icon,
  direction = "label-first",
  children,
  ...rest
}: ToggleProps) => {
  return (
    <label
      className={clsx(
        "relative inline-flex gap-2 items-center py-[3px] text-xs text-geist-secondary select-none",
        direction === "switch-first" && "flex-row-reverse"
      )}
      {...rest}
    >
      {children && <span>{children}</span>}
      <input
        className="absolute w-0 h-0 appearance-none"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={getClasses(checked, disabled, size, color).toggle}>
        <div className={getClasses(checked, disabled, size, color).thumb}>
          {icon && checked && icon.checked}
          {icon && !checked && icon.unchecked}
        </div>
      </span>
    </label>
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
