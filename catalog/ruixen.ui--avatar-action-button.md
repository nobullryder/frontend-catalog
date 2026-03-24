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
avatar-action-button.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  avatarSrc?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { buttonHeight: "h-8 px-2", avatar: "w-6 h-6", gap: "gap-2", font: "text-sm" },
  md: { buttonHeight: "h-10 px-3", avatar: "w-8 h-8", gap: "gap-3", font: "text-base" },
  lg: { buttonHeight: "h-12 px-4", avatar: "w-10 h-10", gap: "gap-3", font: "text-lg" },
};

const AVATAR_URL = "https://www.ruixen.com/_next/image?url=%2Fruixen_light.png&w=96&q=75";

const AvatarActionButton: React.FC<AvatarActionButtonProps> = ({
  label,
  avatarSrc = AVATAR_URL,
  size = "md",
  className,
  ...props
}) => {
  const config = sizeConfig[size];

  return (
    <Button
      className={cn(
        "inline-flex items-center rounded-full bg-primary text-primary-foreground font-medium",
        config.buttonHeight,
        config.gap,
        className
      )}
      {...props}
    >
      <Avatar className={cn("rounded-full", config.avatar)}>
        <AvatarImage src={avatarSrc} />
      </Avatar>
      <span className={config.font}>{label}</span>
    </Button>
  );
};

export default AvatarActionButton;

code.demo.1758558099866.tsx
import AvatarActionButton from "@/components/ui/avatar-action-button"

export default function DemoAvatarActionButton() {
  return (
    <div className="flex gap-4">
      <AvatarActionButton label="Continue as John" size="sm" />
      <AvatarActionButton label="Continue as Jane" size="md" />
      <AvatarActionButton label="Continue as Guest" size="lg" />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar-action-button.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  avatarSrc?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { buttonHeight: "h-8 px-2", avatar: "w-6 h-6", gap: "gap-2", font: "text-sm" },
  md: { buttonHeight: "h-10 px-3", avatar: "w-8 h-8", gap: "gap-3", font: "text-base" },
  lg: { buttonHeight: "h-12 px-4", avatar: "w-10 h-10", gap: "gap-3", font: "text-lg" },
};

const AVATAR_URL = "https://www.ruixen.com/_next/image?url=%2Fruixen_light.png&w=96&q=75";

const AvatarActionButton: React.FC<AvatarActionButtonProps> = ({
  label,
  avatarSrc = AVATAR_URL,
  size = "md",
  className,
  ...props
}) => {
  const config = sizeConfig[size];

  return (
    <Button
      className={cn(
        "inline-flex items-center rounded-full bg-primary text-primary-foreground font-medium",
        config.buttonHeight,
        config.gap,
        className
      )}
      {...props}
    >
      <Avatar className={cn("rounded-full", config.avatar)}>
        <AvatarImage src={avatarSrc} />
      </Avatar>
      <span className={config.font}>{label}</span>
    </Button>
  );
};

export default AvatarActionButton;
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
