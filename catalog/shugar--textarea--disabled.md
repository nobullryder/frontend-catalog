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
textarea.tsx
import React, { useState } from "react";
import { Error } from "@/components/ui/error";
import clsx from "clsx";

interface TextareaProps {
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  size?: "xSmall" | "small" | "mediumSmall" | "large";
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value?: string) => void;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export const Textarea = ({
  defaultValue,
  placeholder,
  disabled,
  error,
  size,
  style,
  value,
  onChange,
  className,
  ref
}: TextareaProps) => {
  const [_value, set_value] = useState(value);

  const _onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    set_value(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <textarea
        className={clsx(
          "rounded-md resize-none font-sans bg-background-100 text-geist-foreground placeholder:text-gray-900 outline-none w-full duration-150 border border-gray-alpha-400 hover:border-gray-alpha-500 hover:ring-0",
          size === "large" ? "h-12 py-2.5 px-3 text-base" : "h-10 p-2.5 text-sm",
          disabled && "bg-gray-100 text-gray-700 placeholder:text-gray-700 placeholder:opacity-50 cursor-not-allowed",
          error ? "ring-red-300 ring-4 border-red-900 text-error" : "focus:border-gray-alpha-600 focus:shadow-focus-input",
          className
        )}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={_value}
        onChange={_onChange}
        ref={ref}
      />
      {error && <Error size={size === "large" ? "large" : "small"}>{error}</Error>}
    </div>
  );
};

code.demo.1751441799389.tsx
import { Textarea } from "@/components/ui/textarea";

export default function DisabledDemo() {
  return (
    <div className="w-3/4">
        <Textarea
          disabled
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          style={{ minHeight: 100 }}
        />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/textarea.tsx
import React, { useState } from "react";
import { Error } from "@/components/ui/error";
import clsx from "clsx";

interface TextareaProps {
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  size?: "xSmall" | "small" | "mediumSmall" | "large";
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value?: string) => void;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export const Textarea = ({
  defaultValue,
  placeholder,
  disabled,
  error,
  size,
  style,
  value,
  onChange,
  className,
  ref
}: TextareaProps) => {
  const [_value, set_value] = useState(value);

  const _onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    set_value(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <textarea
        className={clsx(
          "rounded-md resize-none font-sans bg-background-100 text-geist-foreground placeholder:text-gray-900 outline-none w-full duration-150 border border-gray-alpha-400 hover:border-gray-alpha-500 hover:ring-0",
          size === "large" ? "h-12 py-2.5 px-3 text-base" : "h-10 p-2.5 text-sm",
          disabled && "bg-gray-100 text-gray-700 placeholder:text-gray-700 placeholder:opacity-50 cursor-not-allowed",
          error ? "ring-red-300 ring-4 border-red-900 text-error" : "focus:border-gray-alpha-600 focus:shadow-focus-input",
          className
        )}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={_value}
        onChange={_onChange}
        ref={ref}
      />
      {error && <Error size={size === "large" ? "large" : "small"}>{error}</Error>}
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
