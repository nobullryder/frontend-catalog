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
button-rotate-1.tsx
import { Button } from "@/components/ui/button";
import { Moon } from "@aliimam/icons";
import { cn } from "@/lib/utils";

export function ButtonDemo() {
  return (
    <div className="flex gap-3">
      
      <Button size={"icon"} className="relative p-0.5 overflow-hidden">
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full items-center text-primary-foreground justify-center rounded-sm backdrop-blur-3xl"
          )}
        >
          <Moon />
        </span>
      </Button>
 
      <Button
         
        className="relative  p-0.5 inline-flex overflow-hidden"
      >
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full items-center text-primary-foreground justify-centerrounded-sm px-6 backdrop-blur-3xl"
          )}
        >
          Rotate Background
        </span>
      </Button>

      <Button size={"icon"} className="relative p-0.5 overflow-hidden">
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full items-center justify-center text-foreground rounded-sm bg-background backdrop-blur-3xl"
          )}
        >
          <Moon />
        </span>
      </Button>

      <Button
         
        className="relative p-0.5 inline-flex overflow-hidden"
      >
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full text-foreground items-center justify-center rounded-sm bg-background px-6 backdrop-blur-3xl"
          )}
        >
          Rotate Border
        </span>
      </Button>
    </div>
  );
}


code.demo.1760101829522.tsx
import { ButtonDemo } from "@/components/ui/button-rotate-1";

export default function DemoOne() {
  return <ButtonDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-rotate-1.tsx
import { Button } from "@/components/ui/button";
import { Moon } from "@aliimam/icons";
import { cn } from "@/lib/utils";

export function ButtonDemo() {
  return (
    <div className="flex gap-3">
      
      <Button size={"icon"} className="relative p-0.5 overflow-hidden">
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full items-center text-primary-foreground justify-center rounded-sm backdrop-blur-3xl"
          )}
        >
          <Moon />
        </span>
      </Button>
 
      <Button
         
        className="relative  p-0.5 inline-flex overflow-hidden"
      >
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full items-center text-primary-foreground justify-centerrounded-sm px-6 backdrop-blur-3xl"
          )}
        >
          Rotate Background
        </span>
      </Button>

      <Button size={"icon"} className="relative p-0.5 overflow-hidden">
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full items-center justify-center text-foreground rounded-sm bg-background backdrop-blur-3xl"
          )}
        >
          <Moon />
        </span>
      </Button>

      <Button
         
        className="relative p-0.5 inline-flex overflow-hidden"
      >
        <span
          className={cn(
            "absolute inset-[-300%] animate-[spin_3s_linear_infinite]",
            "bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#fff_50%,var(--primary)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,#000_50%,var(--primary)_100%)]"
          )}
        />
        <span
          className={cn(
            "inline-flex size-full text-foreground items-center justify-center rounded-sm bg-background px-6 backdrop-blur-3xl"
          )}
        >
          Rotate Border
        </span>
      </Button>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@aliimam/icons
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
