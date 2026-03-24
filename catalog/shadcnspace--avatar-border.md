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
avatar-border.tsx
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon } from "lucide-react";
const BorderAvatarDemo = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="relative w-fit">
        <Avatar className="ring-offset-background ring-2 ring-teal-600 ring-offset-2 dark:ring-teal-400">
          <AvatarImage
            src="https://images.shadcnspace.com/assets/profiles/user-2.jpg"
            alt="border avatar"
          />
          <AvatarFallback className="text-xs">HR</AvatarFallback>
        </Avatar>
        <span className="absolute -right-1.5 -bottom-1.5 inline-flex size-4 items-center justify-center rounded-full bg-teal-600 dark:bg-teal-400">
          <CheckIcon className="size-3 text-white" />
        </span>
      </div>
    </div>
  );
};

export default BorderAvatarDemo;


code.demo.1773068709168.tsx
import BorderAvatarDemo from "@/components/ui/avatar-border";

export default function DemoOne() {
  return <BorderAvatarDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar-border.tsx
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon } from "lucide-react";
const BorderAvatarDemo = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="relative w-fit">
        <Avatar className="ring-offset-background ring-2 ring-teal-600 ring-offset-2 dark:ring-teal-400">
          <AvatarImage
            src="https://images.shadcnspace.com/assets/profiles/user-2.jpg"
            alt="border avatar"
          />
          <AvatarFallback className="text-xs">HR</AvatarFallback>
        </Avatar>
        <span className="absolute -right-1.5 -bottom-1.5 inline-flex size-4 items-center justify-center rounded-full bg-teal-600 dark:bg-teal-400">
          <CheckIcon className="size-3 text-white" />
        </span>
      </div>
    </div>
  );
};

export default BorderAvatarDemo;

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
