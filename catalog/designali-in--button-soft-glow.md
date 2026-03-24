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
button-soft-glow.tsx
import { Button } from "@/components/ui/button";
import { Moon } from "@aliimam/icons";

export function ButtonDemo() {
  return (
    <div className="flex gap-3">
      <Button 
        size={"icon"} 
        className="h-16 text-xl w-16 from-primary to-primary/85 text-primary-foreground border-2 border-foreground/10 bg-gradient-to-t shadow-xl shadow-primary/70 ring-4 ring-offset ring-background/30 transition-[filter] duration-200 hover:brightness-120 active:brightness-100"
      >
        <Moon strokeWidth={1.5} className="size-6" />
      </Button>
      <Button 
        className="h-16 text-xl px-12 from-primary to-primary/85 text-primary-foreground border-2 border-foreground/10 bg-gradient-to-t shadow-xl shadow-primary/70 ring-4 ring-offset ring-background/30 transition-[filter] duration-200 hover:brightness-120 active:brightness-100"
      >
       Soft Glow
      </Button>
    </div>
  );
}


code.demo.1760098311622.tsx
import { ButtonDemo } from "@/components/ui/button-soft-glow";

export default function DemoOne() {
  return <ButtonDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-soft-glow.tsx
import { Button } from "@/components/ui/button";
import { Moon } from "@aliimam/icons";

export function ButtonDemo() {
  return (
    <div className="flex gap-3">
      <Button 
        size={"icon"} 
        className="h-16 text-xl w-16 from-primary to-primary/85 text-primary-foreground border-2 border-foreground/10 bg-gradient-to-t shadow-xl shadow-primary/70 ring-4 ring-offset ring-background/30 transition-[filter] duration-200 hover:brightness-120 active:brightness-100"
      >
        <Moon strokeWidth={1.5} className="size-6" />
      </Button>
      <Button 
        className="h-16 text-xl px-12 from-primary to-primary/85 text-primary-foreground border-2 border-foreground/10 bg-gradient-to-t shadow-xl shadow-primary/70 ring-4 ring-offset ring-background/30 transition-[filter] duration-200 hover:brightness-120 active:brightness-100"
      >
       Soft Glow
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
