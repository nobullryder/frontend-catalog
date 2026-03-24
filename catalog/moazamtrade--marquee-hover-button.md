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
marquee-hover-button.tsx
import * as React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type Button23Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  className?: string;
};

export const Button23: React.FC<Button23Props> = ({
  label = "Button",
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={clsx(
        "relative select-none outline-none",
        "inline-grid place-items-center",
        "font-black uppercase tracking-wide",
        "border overflow-hidden",
        "rounded-full px-12 py-3",
        "bg-white text-black border-neutral-200",
        "dark:bg-black dark:text-white dark:border-neutral-800",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-white",
        "dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-black",
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer active:scale-[0.99]",
        "font-sans",
        className
      )}
      {...props}
    >
      <span
        className={clsx(
          "absolute inset-0 grid place-items-center",
          "transition-opacity duration-200 ease-linear",
          "group-[.btn23-hover]:opacity-0"
        )}
        data-btn23="text"
      >
        {label}
      </span>

      <span
        aria-hidden="true"
        className={clsx(
          "absolute inset-0 grid place-items-center",
          "opacity-0",
          "btn23-marquee"
        )}
        data-btn23="marquee"
      >
        {label}
      </span>
      <span
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
    </motion.button>
  );
};

code.demo.1759405186253.tsx
import { Button23 }  from "@/components/ui/marquee-hover-button";

export default function DemoOne() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-6">
      <div className="space-x-4">
        <Button23 label="Button" />
        <Button23 label="Primary" className="border-neutral-300 dark:border-neutral-700" />
        <Button23 label="Disabled" disabled />
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/marquee-hover-button.tsx
import * as React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type Button23Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  className?: string;
};

export const Button23: React.FC<Button23Props> = ({
  label = "Button",
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={clsx(
        "relative select-none outline-none",
        "inline-grid place-items-center",
        "font-black uppercase tracking-wide",
        "border overflow-hidden",
        "rounded-full px-12 py-3",
        "bg-white text-black border-neutral-200",
        "dark:bg-black dark:text-white dark:border-neutral-800",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-white",
        "dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-black",
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer active:scale-[0.99]",
        "font-sans",
        className
      )}
      {...props}
    >
      <span
        className={clsx(
          "absolute inset-0 grid place-items-center",
          "transition-opacity duration-200 ease-linear",
          "group-[.btn23-hover]:opacity-0"
        )}
        data-btn23="text"
      >
        {label}
      </span>

      <span
        aria-hidden="true"
        className={clsx(
          "absolute inset-0 grid place-items-center",
          "opacity-0",
          "btn23-marquee"
        )}
        data-btn23="marquee"
      >
        {label}
      </span>
      <span
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
    </motion.button>
  );
};
```

Install NPM dependencies:
```bash
framer-motion, clsx
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
