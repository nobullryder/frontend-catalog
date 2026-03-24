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
play-store-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayStoreButtonProps = React.ComponentProps<typeof Button>;

export function PlayStoreButton({
  className,
  ...props
}: Omit<PlayStoreButtonProps, "children">) {
  return (
    <Button className={cn("h-11 gap-2", className)} {...props}>
      <PlayStoreIcon className="size-5" />
      <div className="text-left flex flex-col items-start justify-center pr-2">
        <span className="text-[10px] leading-none font-light tracking-tighter">
          GET IT ON
        </span>
        <p className="text-base font-bold leading-none">Google Play</p>
      </div>
    </Button>
  );
}

function PlayStoreIcon({
  fill = "currentColor",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <path d="m21.762,9.942L4.67.378c-.721-.466-1.635-.504-2.393-.099-.768.411-1.246,1.208-1.246,2.08v19.282c0,.872.477,1.668,1.246,2.079.755.404,1.668.37,2.393-.098l17.092-9.564c.756-.423,1.207-1.192,1.207-2.058s-.451-1.635-1.207-2.058Zm-5.746-1.413l-2.36,2.36L5.302,2.534l10.714,5.995ZM2.604,21.906V2.094l9.941,9.906L2.604,21.906Zm2.698-.439l8.355-8.355,2.36,2.36-10.714,5.995Zm15.692-8.78l-3.552,1.987-2.674-2.674,2.674-2.674,3.552,1.987c.363.203.402.548.402.686s-.039.483-.402.686Z" />
    </svg>
  );
}


code.demo.1759058258140.tsx
import { PlayStoreButton } from "@/components/ui/play-store-button";
import { cn } from "@/lib/utils";

export default function DemoOne() {
 return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
          "blur-[30px]"
        )}
      />

      <a href="#">
        <PlayStoreButton />
      </a>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/play-store-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayStoreButtonProps = React.ComponentProps<typeof Button>;

export function PlayStoreButton({
  className,
  ...props
}: Omit<PlayStoreButtonProps, "children">) {
  return (
    <Button className={cn("h-11 gap-2", className)} {...props}>
      <PlayStoreIcon className="size-5" />
      <div className="text-left flex flex-col items-start justify-center pr-2">
        <span className="text-[10px] leading-none font-light tracking-tighter">
          GET IT ON
        </span>
        <p className="text-base font-bold leading-none">Google Play</p>
      </div>
    </Button>
  );
}

function PlayStoreIcon({
  fill = "currentColor",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <path d="m21.762,9.942L4.67.378c-.721-.466-1.635-.504-2.393-.099-.768.411-1.246,1.208-1.246,2.08v19.282c0,.872.477,1.668,1.246,2.079.755.404,1.668.37,2.393-.098l17.092-9.564c.756-.423,1.207-1.192,1.207-2.058s-.451-1.635-1.207-2.058Zm-5.746-1.413l-2.36,2.36L5.302,2.534l10.714,5.995ZM2.604,21.906V2.094l9.941,9.906L2.604,21.906Zm2.698-.439l8.355-8.355,2.36,2.36-10.714,5.995Zm15.692-8.78l-3.552,1.987-2.674-2.674,2.674-2.674,3.552,1.987c.363.203.402.548.402.686s-.039.483-.402.686Z" />
    </svg>
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
