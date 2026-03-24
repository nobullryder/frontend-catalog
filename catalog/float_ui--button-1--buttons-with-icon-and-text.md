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
button-1.tsx
import React from "react";

type ButtonSize = "sm" | "default" | "md" | "lg" | "xl";

interface IconButtonProps {
  size?: ButtonSize;
}

const sizeClasses: Record<ButtonSize, { button: string; icon: string }> = {
  sm: { button: "px-2.5 py-2.5", icon: "w-5 h-5" },
  default: { button: "px-3 py-3", icon: "w-5 h-5" },
  md: { button: "px-3.5 py-3.5", icon: "w-6 h-6" },
  lg: { button: "px-4 py-4", icon: "w-6 h-6" },
  xl: { button: "px-5 py-5", icon: "w-7 h-7" },
};

function IconButton({ size = "default" }: IconButtonProps) {
  return (
    <button
      className={`${sizeClasses[size].button} text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={sizeClasses[size].icon}
      >
        <path
          fillRule="evenodd"
          d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default IconButton;


code.demo.1755764179402.tsx
import React from "react";

type ButtonSize = "sm" | "default" | "md" | "lg" | "xl";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  icon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, { button: string; icon: string }> = {
  sm: { button: "px-3 py-1.5 text-sm", icon: "w-4 h-4" },
  default: { button: "px-4 py-2", icon: "w-5 h-5" },
  md: { button: "px-5 py-3", icon: "w-6 h-6" },
  lg: { button: "px-6 py-3.5", icon: "w-6 h-6" },
  xl: { button: "px-7 py-4", icon: "w-6 h-6" },
};

function IconButton({
  size = "default",
  icon,
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 ${sizeClasses[size].button} text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200 ${className}`}
      {...props}
    >
      {icon && <span className={sizeClasses[size].icon}>{icon}</span>}
      {children}
    </button>
  );
}

// Example usage + export
export default function Demo() {
  const BookmarkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-full h-full"
    >
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 
        2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 
        18.089l-7.165 3.583A.75.75 0 013.75 
        21V5.507c0-1.47 1.073-2.756 
        2.57-2.93z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="flex flex-col gap-3">
      <IconButton size="sm" icon={BookmarkIcon}>Small</IconButton>
      <IconButton icon={BookmarkIcon}>Default</IconButton>
      <IconButton size="md" icon={BookmarkIcon}>Medium</IconButton>
      <IconButton size="lg" icon={BookmarkIcon}>Large</IconButton>
      <IconButton size="xl" icon={BookmarkIcon}>Extra Large</IconButton>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-1.tsx
import React from "react";

type ButtonSize = "sm" | "default" | "md" | "lg" | "xl";

interface IconButtonProps {
  size?: ButtonSize;
}

const sizeClasses: Record<ButtonSize, { button: string; icon: string }> = {
  sm: { button: "px-2.5 py-2.5", icon: "w-5 h-5" },
  default: { button: "px-3 py-3", icon: "w-5 h-5" },
  md: { button: "px-3.5 py-3.5", icon: "w-6 h-6" },
  lg: { button: "px-4 py-4", icon: "w-6 h-6" },
  xl: { button: "px-5 py-5", icon: "w-7 h-7" },
};

function IconButton({ size = "default" }: IconButtonProps) {
  return (
    <button
      className={`${sizeClasses[size].button} text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={sizeClasses[size].icon}
      >
        <path
          fillRule="evenodd"
          d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default IconButton;

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
