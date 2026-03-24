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
multi-step-button.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiStepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  steps: string[];
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function MultiStepButton({ steps, size = "md", className, ...props }: MultiStepButtonProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = () => {
    setCurrentStep(prev => (prev + 1 < steps.length ? prev + 1 : prev));
  };

  return (
    <Button
      className={cn(sizeConfig[size], className)}
      onClick={(e) => {
        handleClick();
        props.onClick?.(e);
      }}
      {...props}
    >
      {steps[currentStep]}
    </Button>
  );
}

code.demo.1758562352046.tsx
import MultiStepButton from "@/components/ui/multi-step-button";

export default function DemoMultiStepButton() {
  const steps = [
    "Step 1: Fill Info",
    "Step 2: Confirm",
    "Step 3: Done"
  ];

  return (
    <div className="flex gap-4">
      <MultiStepButton steps={steps} />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/multi-step-button.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiStepButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  steps: string[];
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function MultiStepButton({ steps, size = "md", className, ...props }: MultiStepButtonProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = () => {
    setCurrentStep(prev => (prev + 1 < steps.length ? prev + 1 : prev));
  };

  return (
    <Button
      className={cn(sizeConfig[size], className)}
      onClick={(e) => {
        handleClick();
        props.onClick?.(e);
      }}
      {...props}
    >
      {steps[currentStep]}
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
