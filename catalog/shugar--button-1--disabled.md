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
button-1.tsx
import React from "react";
import { Spinner } from "@/components/ui/spinner-1";
import clsx from "clsx";

const sizes = [
  {
    tiny: "px-1.5 h-6 text-sm",
    small: "px-1.5 h-8 text-sm",
    medium: "px-2.5 h-10 text-sm",
    large: "px-3.5 h-12 text-base"
  },
  {
    tiny: "w-6 h-6 text-sm",
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base"
  }
];

const types = {
  primary: "bg-gray-1000 hover:bg-gray-1000-h text-background-100 fill-background-100",
  secondary: "bg-background-100 hover:bg-gray-alpha-200 text-gray-1000 fill-gray-1000 border border-gray-alpha-400",
  tertiary: "bg-none hover:bg-gray-alpha-200 text-gray-1000 fill-gray-1000",
  error: "bg-red-800 hover:bg-red-900 text-white fill-white",
  warning: "bg-amber-800 hover:bg-amber-850 text-black fill-black"
};

const shapes = {
  square: {
    tiny: "rounded",
    small: "rounded-md",
    medium: "rounded-md",
    large: "rounded-lg"
  },
  circle: {
    tiny: "rounded-[100%]",
    small: "rounded-[100%]",
    medium: "rounded-[100%]",
    large: "rounded-[100%]"
  },
  rounded: {
    tiny: "rounded-[100px]",
    small: "rounded-[100px]",
    medium: "rounded-[100px]",
    large: "rounded-[100px]"
  }
};

export interface ButtonProps {
  size?: keyof typeof sizes[0];
  type?: keyof typeof types;
  variant?: "styled" | "unstyled";
  shape?: keyof typeof shapes;
  svgOnly?: boolean;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
}

export const Button = ({
  size = "medium",
  type = "primary",
  variant = "styled",
  shape = "square",
  svgOnly = false,
  children,
  prefix,
  suffix,
  shadow = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  ref,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      type="submit"
      disabled={disabled}
      onClick={onClick}
      tabIndex={0}
      className={clsx(
        "flex justify-center items-center gap-0.5 duration-150",
        sizes[+svgOnly][size],
        (disabled || loading) ? "bg-gray-100 text-gray-700 border border-gray-400 cursor-not-allowed" : types[type],
        shapes[shape][size],
        shadow && "shadow-border-small border-none",
        fullWidth && "w-full",
        variant === "unstyled" ? "outline-none px-0 h-fit bg-transparent hover:bg-transparent text-gray-1000" : "focus:shadow-focus-ring focus:outline-0",
        className
      )}
      {...rest}
    >
      {loading
        ? <Spinner size={size === "large" ? 24 : 16} />
        : prefix
      }
      <span className={clsx(
        "relative overflow-hidden whitespace-nowrap overflow-ellipsis font-sans",
        size !== "tiny" && variant !== "unstyled" && "px-1.5"
      )}>
        {children}
      </span>
      {!loading && suffix}
    </button>
  );
};

code.demo.1751968744645.tsx
import { Button } from "@/components/ui/button-1";

export default function DisabledDemo() {
  return (
        <div className="flex justify-between items-center gap-2">
          <Button disabled size="small">
            Upload
          </Button>
          <Button disabled>Upload</Button>
          <Button disabled size="large">
            Upload
          </Button>
        </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-1.tsx
import React from "react";
import { Spinner } from "@/components/ui/spinner-1";
import clsx from "clsx";

const sizes = [
  {
    tiny: "px-1.5 h-6 text-sm",
    small: "px-1.5 h-8 text-sm",
    medium: "px-2.5 h-10 text-sm",
    large: "px-3.5 h-12 text-base"
  },
  {
    tiny: "w-6 h-6 text-sm",
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base"
  }
];

const types = {
  primary: "bg-gray-1000 hover:bg-gray-1000-h text-background-100 fill-background-100",
  secondary: "bg-background-100 hover:bg-gray-alpha-200 text-gray-1000 fill-gray-1000 border border-gray-alpha-400",
  tertiary: "bg-none hover:bg-gray-alpha-200 text-gray-1000 fill-gray-1000",
  error: "bg-red-800 hover:bg-red-900 text-white fill-white",
  warning: "bg-amber-800 hover:bg-amber-850 text-black fill-black"
};

const shapes = {
  square: {
    tiny: "rounded",
    small: "rounded-md",
    medium: "rounded-md",
    large: "rounded-lg"
  },
  circle: {
    tiny: "rounded-[100%]",
    small: "rounded-[100%]",
    medium: "rounded-[100%]",
    large: "rounded-[100%]"
  },
  rounded: {
    tiny: "rounded-[100px]",
    small: "rounded-[100px]",
    medium: "rounded-[100px]",
    large: "rounded-[100px]"
  }
};

export interface ButtonProps {
  size?: keyof typeof sizes[0];
  type?: keyof typeof types;
  variant?: "styled" | "unstyled";
  shape?: keyof typeof shapes;
  svgOnly?: boolean;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
}

export const Button = ({
  size = "medium",
  type = "primary",
  variant = "styled",
  shape = "square",
  svgOnly = false,
  children,
  prefix,
  suffix,
  shadow = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  ref,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      type="submit"
      disabled={disabled}
      onClick={onClick}
      tabIndex={0}
      className={clsx(
        "flex justify-center items-center gap-0.5 duration-150",
        sizes[+svgOnly][size],
        (disabled || loading) ? "bg-gray-100 text-gray-700 border border-gray-400 cursor-not-allowed" : types[type],
        shapes[shape][size],
        shadow && "shadow-border-small border-none",
        fullWidth && "w-full",
        variant === "unstyled" ? "outline-none px-0 h-fit bg-transparent hover:bg-transparent text-gray-1000" : "focus:shadow-focus-ring focus:outline-0",
        className
      )}
      {...rest}
    >
      {loading
        ? <Spinner size={size === "large" ? 24 : 16} />
        : prefix
      }
      <span className={clsx(
        "relative overflow-hidden whitespace-nowrap overflow-ellipsis font-sans",
        size !== "tiny" && variant !== "unstyled" && "px-1.5"
      )}>
        {children}
      </span>
      {!loading && suffix}
    </button>
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
