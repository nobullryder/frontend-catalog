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
win-98-button.tsx
// Disclaimer: original button at https://jdan.github.io/98.css/#button

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Win98Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-mono text-xs -outline-offset-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          "focus:outline-dotted focus:outline-1 focus:outline-black",
          "focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-black",
          "text-black bg-[silver] text-transparent [text-shadow:0_0_#222] disabled:[text-shadow:1_1_0_#fff] disabled:text-[grey]",
          "shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_grey,inset_2px_2px_#dfdfdf]",
          "active:shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#0a0a0a,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]",
          "disabled:shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_grey,inset_2px_2px_#dfdfdf]",
          "h-7 px-3 min-w-20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Win98Button.displayName = "Win98Button";

export { Win98Button };


code.demo.tsx
import { Win98Button } from "@/components/ui/win-98-button";

function Win98ButtonDemo() {
  return (
    <div className="w-full h-screen max-h-[300px] bg-[silver] flex items-center justify-center">
      <Win98Button>Click me</Win98Button>
    </div>
  );
}

export { Win98ButtonDemo };

```

Copy-paste these files for dependencies:
```tsx
/components/ui/win-98-button.tsx
// Disclaimer: original button at https://jdan.github.io/98.css/#button

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Win98Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-mono text-xs -outline-offset-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          "focus:outline-dotted focus:outline-1 focus:outline-black",
          "focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-black",
          "text-black bg-[silver] text-transparent [text-shadow:0_0_#222] disabled:[text-shadow:1_1_0_#fff] disabled:text-[grey]",
          "shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_grey,inset_2px_2px_#dfdfdf]",
          "active:shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#0a0a0a,inset_-2px_-2px_#dfdfdf,inset_2px_2px_#808080]",
          "disabled:shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#fff,inset_-2px_-2px_grey,inset_2px_2px_#dfdfdf]",
          "h-7 px-3 min-w-20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Win98Button.displayName = "Win98Button";

export { Win98Button };

```

Install NPM dependencies:
```bash
@radix-ui/react-slot
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
