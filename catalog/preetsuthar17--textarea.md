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
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const textareaVariants = cva(
  "flex min-h-[60px] w-full rounded-ele border border-border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical transition-colors scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground scrollbar-corner-transparent shadow-sm/2",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive:
          "border-destructive focus-visible:ring-destructive",
        ghost:
          "border-transparent bg-accent focus-visible:bg-input focus-visible:border-border",
      },
      size: {
        default: "min-h-[80px] px-3 py-2",
        sm: "min-h-[60px] px-3 py-2 text-xs",
        lg: "min-h-[100px] px-4 py-2",
        xl: "min-h-[120px] px-6 py-3 text-base",
        fixed: "h-[80px] px-3 py-2 resize-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant, size, error, clearable, onClear, value, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      props.defaultValue || ""
    );
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine external ref with internal ref
    React.useImperativeHandle(ref, () => textareaRef.current!);

    const textareaVariant = error ? "destructive" : variant;

    // Determine if this is a controlled component
    const isControlled = value !== undefined;
    const textareaValue = isControlled ? value : internalValue;
    const showClearButton =
      clearable && textareaValue && String(textareaValue).length > 0;

    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      props.onChange?.(e);
    };

    const handleClear = () => {
      // Clear the internal state for uncontrolled inputs
      if (!isControlled) {
        setInternalValue("");
      }

      // Call the onClear callback if provided
      onClear?.();

      // Create a synthetic event to trigger onChange with empty value
      if (textareaRef.current) {
        const textarea = textareaRef.current;

        // Set the textarea's value directly
        textarea.value = "";

        // Create a synthetic React ChangeEvent
        const syntheticEvent = {
          target: textarea,
          currentTarget: textarea,
          nativeEvent: new Event("input", { bubbles: true }),
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
          persist: () => {},
          preventDefault: () => {},
          stopPropagation: () => {},
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 0,
          isTrusted: true,
          timeStamp: Date.now(),
          type: "change",
        } as React.ChangeEvent<HTMLTextAreaElement>;

        // Trigger the onChange handler
        props.onChange?.(syntheticEvent);

        // Focus the textarea after clearing
        textarea.focus();
      }
    };

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            textareaVariants({ variant: textareaVariant, size, className }),
            showClearButton && "pr-10"
          )}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "hsl(var(--hu-border)) transparent",
          }}
          ref={textareaRef}
          {...(isControlled
            ? { value: textareaValue }
            : { defaultValue: props.defaultValue })}
          onChange={handleTextareaChange}
          {...(({ defaultValue, ...rest }) => rest)(props)}
        />
        {/* Clear button */}
        {showClearButton && (
          <div className="absolute right-3 top-3 flex items-center gap-1 z-10">
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
              tabIndex={-1}
            >
              <X />
            </button>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };

code.demo.1753272940163.tsx
import { Textarea } from "@/components/ui/textarea";

export default function DemoOne() {
  return (
    <>
      <div className="max-w-sm w-full">
        <Textarea placeholder="Enter your message here..." />
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/textarea.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const textareaVariants = cva(
  "flex min-h-[60px] w-full rounded-ele border border-border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical transition-colors scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground scrollbar-corner-transparent shadow-sm/2",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive:
          "border-destructive focus-visible:ring-destructive",
        ghost:
          "border-transparent bg-accent focus-visible:bg-input focus-visible:border-border",
      },
      size: {
        default: "min-h-[80px] px-3 py-2",
        sm: "min-h-[60px] px-3 py-2 text-xs",
        lg: "min-h-[100px] px-4 py-2",
        xl: "min-h-[120px] px-6 py-3 text-base",
        fixed: "h-[80px] px-3 py-2 resize-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant, size, error, clearable, onClear, value, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      props.defaultValue || ""
    );
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine external ref with internal ref
    React.useImperativeHandle(ref, () => textareaRef.current!);

    const textareaVariant = error ? "destructive" : variant;

    // Determine if this is a controlled component
    const isControlled = value !== undefined;
    const textareaValue = isControlled ? value : internalValue;
    const showClearButton =
      clearable && textareaValue && String(textareaValue).length > 0;

    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      props.onChange?.(e);
    };

    const handleClear = () => {
      // Clear the internal state for uncontrolled inputs
      if (!isControlled) {
        setInternalValue("");
      }

      // Call the onClear callback if provided
      onClear?.();

      // Create a synthetic event to trigger onChange with empty value
      if (textareaRef.current) {
        const textarea = textareaRef.current;

        // Set the textarea's value directly
        textarea.value = "";

        // Create a synthetic React ChangeEvent
        const syntheticEvent = {
          target: textarea,
          currentTarget: textarea,
          nativeEvent: new Event("input", { bubbles: true }),
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
          persist: () => {},
          preventDefault: () => {},
          stopPropagation: () => {},
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 0,
          isTrusted: true,
          timeStamp: Date.now(),
          type: "change",
        } as React.ChangeEvent<HTMLTextAreaElement>;

        // Trigger the onChange handler
        props.onChange?.(syntheticEvent);

        // Focus the textarea after clearing
        textarea.focus();
      }
    };

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            textareaVariants({ variant: textareaVariant, size, className }),
            showClearButton && "pr-10"
          )}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "hsl(var(--hu-border)) transparent",
          }}
          ref={textareaRef}
          {...(isControlled
            ? { value: textareaValue }
            : { defaultValue: props.defaultValue })}
          onChange={handleTextareaChange}
          {...(({ defaultValue, ...rest }) => rest)(props)}
        />
        {/* Clear button */}
        {showClearButton && (
          <div className="absolute right-3 top-3 flex items-center gap-1 z-10">
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
              tabIndex={-1}
            >
              <X />
            </button>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
```

Install NPM dependencies:
```bash
class-variance-authority, lucide-react
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
