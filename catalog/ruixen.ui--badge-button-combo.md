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
badge-button-combo.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeButtonComboProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  badge?: string | number;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function BadgeButtonCombo({ label, badge, size = "md", className, ...props }: BadgeButtonComboProps) {
  return (
    <div className="relative inline-block">
      <Button className={cn(sizeConfig[size], className)} {...props}>
        {label}
      </Button>
      {badge !== undefined && (
        <span className="absolute -top-2 -right-2">
          <Badge className="p-1 min-w-[1.25rem] h-5 text-[0.65rem] flex items-center justify-center">{badge}</Badge>
        </span>
      )}
    </div>
  );
}

code.demo.1758561177968.tsx
import BadgeButtonCombo from "@/components/ui/badge-button-combo";

export default function DemoBadgeButtonCombo() {
  return (
    <div className="flex gap-4">
      <BadgeButtonCombo label="Messages" badge={3} />
      <BadgeButtonCombo label="Notifications" badge="New" />
      <BadgeButtonCombo label="Beta Feature" badge="Beta" size="lg" />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/badge-button-combo.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeButtonComboProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  badge?: string | number;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function BadgeButtonCombo({ label, badge, size = "md", className, ...props }: BadgeButtonComboProps) {
  return (
    <div className="relative inline-block">
      <Button className={cn(sizeConfig[size], className)} {...props}>
        {label}
      </Button>
      {badge !== undefined && (
        <span className="absolute -top-2 -right-2">
          <Badge className="p-1 min-w-[1.25rem] h-5 text-[0.65rem] flex items-center justify-center">{badge}</Badge>
        </span>
      )}
    </div>
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
