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
progress-button.tsx
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";

/**
 * ProgressButton
 *
 * A button that shows progress feedback for async actions.
 * After click, it can display a loading spinner or a progress bar.
 * Useful for actions like Submit, Pay, Upload.
 */

interface ProgressButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loadingLabel?: string;
  successLabel?: string;
  showBar?: boolean; // if true, show progress bar instead of spinner
  duration?: number; // fake progress duration in ms when showBar is true
}

const ProgressButton: React.FC<ProgressButtonProps> = ({
  label,
  loadingLabel = "Processing...",
  successLabel = "Done!",
  showBar = false,
  duration = 2000,
  className,
  onClick,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    setLoading(true);
    setSuccess(false);
    setProgress(0);

    if (showBar) {
      let step = 0;
      const interval = setInterval(() => {
        step += 100 / (duration / 100);
        setProgress(Math.min(step, 100));
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500);
      }, duration);
    } else {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }

    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-4 py-2 disabled:opacity-60",
        className
      )}
      disabled={loading}
      {...props}
    >
      {showBar && loading ? (
        <div className="absolute bottom-0 left-0 h-1 bg-primary-foreground/50 w-full overflow-hidden rounded-b-lg">
          <div
            className="h-full bg-primary-foreground transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      <span className="flex items-center gap-2">
        {loading && !showBar && <Loader2 className="w-4 h-4 animate-spin" />}
        {success && <Check className="w-4 h-4" />}
        {!loading && !success && label}
        {loading && !success && (showBar ? loadingLabel : loadingLabel)}
        {success && successLabel}
      </span>
    </button>
  );
};

export default ProgressButton;

code.demo.1758555306091.tsx
import { Loader2, Check } from "lucide-react";
import ProgressButton from "@/components/ui/progress-button";

export default function DemoProgressButton() {
  return (
    <div className="flex gap-6 flex-wrap">
      <ProgressButton label="Submit" />
      <ProgressButton label="Pay" loadingLabel="Processing Payment" />
      <ProgressButton label="Upload" showBar duration={3000} />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress-button.tsx
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Check } from "lucide-react";

/**
 * ProgressButton
 *
 * A button that shows progress feedback for async actions.
 * After click, it can display a loading spinner or a progress bar.
 * Useful for actions like Submit, Pay, Upload.
 */

interface ProgressButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loadingLabel?: string;
  successLabel?: string;
  showBar?: boolean; // if true, show progress bar instead of spinner
  duration?: number; // fake progress duration in ms when showBar is true
}

const ProgressButton: React.FC<ProgressButtonProps> = ({
  label,
  loadingLabel = "Processing...",
  successLabel = "Done!",
  showBar = false,
  duration = 2000,
  className,
  onClick,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    setLoading(true);
    setSuccess(false);
    setProgress(0);

    if (showBar) {
      let step = 0;
      const interval = setInterval(() => {
        step += 100 / (duration / 100);
        setProgress(Math.min(step, 100));
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setLoading(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 1500);
      }, duration);
    } else {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }

    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 px-4 py-2 disabled:opacity-60",
        className
      )}
      disabled={loading}
      {...props}
    >
      {showBar && loading ? (
        <div className="absolute bottom-0 left-0 h-1 bg-primary-foreground/50 w-full overflow-hidden rounded-b-lg">
          <div
            className="h-full bg-primary-foreground transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      <span className="flex items-center gap-2">
        {loading && !showBar && <Loader2 className="w-4 h-4 animate-spin" />}
        {success && <Check className="w-4 h-4" />}
        {!loading && !success && label}
        {loading && !success && (showBar ? loadingLabel : loadingLabel)}
        {success && successLabel}
      </span>
    </button>
  );
};

export default ProgressButton;
```

Install NPM dependencies:
```bash
lucide-react
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
