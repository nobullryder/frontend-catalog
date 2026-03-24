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
countdown-button.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CountdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  countdown: number; // in seconds
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function CountdownButton({ label, countdown, size = "md", onClick, className, ...props }: CountdownButtonProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleClick = () => {
    if (onClick) onClick();
    setTimeLeft(countdown);
    setDisabled(true);
  };

  return (
    <Button
      className={cn(sizeConfig[size], className)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {disabled ? `${label} in ${timeLeft}s` : label}
    </Button>
  );
}


code.demo.1758566211532.tsx
import CountdownButton from "@/components/ui/countdown-button";

export default function DemoCountdownButton() {
  return (
    <div className="flex gap-4">
      <CountdownButton label="Resend OTP" countdown={20} />
      <CountdownButton label="Retry" countdown={10} size="lg" />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/countdown-button.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CountdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  countdown: number; // in seconds
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function CountdownButton({ label, countdown, size = "md", onClick, className, ...props }: CountdownButtonProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleClick = () => {
    if (onClick) onClick();
    setTimeLeft(countdown);
    setDisabled(true);
  };

  return (
    <Button
      className={cn(sizeConfig[size], className)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {disabled ? `${label} in ${timeLeft}s` : label}
    </Button>
  );
}

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
