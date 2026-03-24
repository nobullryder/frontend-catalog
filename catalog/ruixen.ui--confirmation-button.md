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
confirmation-button.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ConfirmationButton
 *
 * A button that requires confirmation before performing an action.
 * First click changes text to "Are you sure?" and shows ✅ / ❌ choices.
 * Prevents accidental actions like "Delete".
 */

interface ConfirmationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  label,
  confirmLabel = "Are you sure?",
  onConfirm,
  size = "md",
  className,
  ...props
}) => {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000); // reset after 3s
    } else {
      onConfirm();
      setConfirming(false);
    }
  };

  return (
    <div className="inline-flex gap-2">
      {!confirming ? (
        <Button className={cn(sizeConfig[size], className)} onClick={handleClick} {...props}>
          {label}
        </Button>
      ) : (
        <>
          <Button
            className={cn(sizeConfig[size], className, "bg-red-600 text-white")}
            onClick={handleClick}
          >
            ✅ {confirmLabel}
          </Button>
          <Button
            className={cn(sizeConfig[size], className, "bg-gray-300 text-black")}
            onClick={() => setConfirming(false)}
          >
            ❌
          </Button>
        </>
      )}
    </div>
  );
};

export default ConfirmationButton;

code.demo.1758558526709.tsx
import ConfirmationButton from "@/components/ui/confirmation-button";

export default function DemoConfirmationButton() {
  return (
    <div className="flex gap-4">
      <ConfirmationButton label="Delete" onConfirm={() => alert('Deleted!')} />
      <ConfirmationButton label="Archive" confirmLabel="Really archive?" onConfirm={() => alert('Archived!')} size="lg" />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/confirmation-button.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ConfirmationButton
 *
 * A button that requires confirmation before performing an action.
 * First click changes text to "Are you sure?" and shows ✅ / ❌ choices.
 * Prevents accidental actions like "Delete".
 */

interface ConfirmationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  label,
  confirmLabel = "Are you sure?",
  onConfirm,
  size = "md",
  className,
  ...props
}) => {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000); // reset after 3s
    } else {
      onConfirm();
      setConfirming(false);
    }
  };

  return (
    <div className="inline-flex gap-2">
      {!confirming ? (
        <Button className={cn(sizeConfig[size], className)} onClick={handleClick} {...props}>
          {label}
        </Button>
      ) : (
        <>
          <Button
            className={cn(sizeConfig[size], className, "bg-red-600 text-white")}
            onClick={handleClick}
          >
            ✅ {confirmLabel}
          </Button>
          <Button
            className={cn(sizeConfig[size], className, "bg-gray-300 text-black")}
            onClick={() => setConfirming(false)}
          >
            ❌
          </Button>
        </>
      )}
    </div>
  );
};

export default ConfirmationButton;
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
