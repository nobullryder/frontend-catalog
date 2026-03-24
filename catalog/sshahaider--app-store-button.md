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
app-store-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppStoreButtonProps = React.ComponentProps<typeof Button>;

export function AppStoreButton({
  className,
  ...props
}: Omit<AppStoreButtonProps, "children">) {
  return (
    <Button className={cn("h-11 gap-2", className)} {...props}>
      <AppleIcon className="size-5" />
      <div className="text-left flex flex-col items-start justify-center pr-2">
        <span className="text-[10px] leading-none tracking-tighter">
          Download on the
        </span>
        <p className="text-base font-bold leading-none">App Store</p>
      </div>
    </Button>
  );
}

function AppleIcon({
  fill = "currentColor",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <g id="_Group_2">
        <g id="_Group_3">
          <path
            id="_Path_"
            d="M18.546,12.763c0.024-1.87,1.004-3.597,2.597-4.576c-1.009-1.442-2.64-2.323-4.399-2.378    c-1.851-0.194-3.645,1.107-4.588,1.107c-0.961,0-2.413-1.088-3.977-1.056C6.122,5.927,4.25,7.068,3.249,8.867    c-2.131,3.69-0.542,9.114,1.5,12.097c1.022,1.461,2.215,3.092,3.778,3.035c1.529-0.063,2.1-0.975,3.945-0.975    c1.828,0,2.364,0.975,3.958,0.938c1.64-0.027,2.674-1.467,3.66-2.942c0.734-1.041,1.299-2.191,1.673-3.408    C19.815,16.788,18.548,14.879,18.546,12.763z"
          />
          <path
            id="_Path_2"
            d="M15.535,3.847C16.429,2.773,16.87,1.393,16.763,0c-1.366,0.144-2.629,0.797-3.535,1.829    c-0.895,1.019-1.349,2.351-1.261,3.705C13.352,5.548,14.667,4.926,15.535,3.847z"
          />
        </g>
      </g>
    </svg>
  );
}


code.demo.1759058753773.tsx
import { AppStoreButton } from "@/components/ui/app-store-button";
import { cn } from "@/lib/utils";

export default function AppStoreButtonDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <a href="#">
        <AppStoreButton />
      </a>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full",
          "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
          "blur-[30px]"
        )}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/app-store-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppStoreButtonProps = React.ComponentProps<typeof Button>;

export function AppStoreButton({
  className,
  ...props
}: Omit<AppStoreButtonProps, "children">) {
  return (
    <Button className={cn("h-11 gap-2", className)} {...props}>
      <AppleIcon className="size-5" />
      <div className="text-left flex flex-col items-start justify-center pr-2">
        <span className="text-[10px] leading-none tracking-tighter">
          Download on the
        </span>
        <p className="text-base font-bold leading-none">App Store</p>
      </div>
    </Button>
  );
}

function AppleIcon({
  fill = "currentColor",
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <g id="_Group_2">
        <g id="_Group_3">
          <path
            id="_Path_"
            d="M18.546,12.763c0.024-1.87,1.004-3.597,2.597-4.576c-1.009-1.442-2.64-2.323-4.399-2.378    c-1.851-0.194-3.645,1.107-4.588,1.107c-0.961,0-2.413-1.088-3.977-1.056C6.122,5.927,4.25,7.068,3.249,8.867    c-2.131,3.69-0.542,9.114,1.5,12.097c1.022,1.461,2.215,3.092,3.778,3.035c1.529-0.063,2.1-0.975,3.945-0.975    c1.828,0,2.364,0.975,3.958,0.938c1.64-0.027,2.674-1.467,3.66-2.942c0.734-1.041,1.299-2.191,1.673-3.408    C19.815,16.788,18.548,14.879,18.546,12.763z"
          />
          <path
            id="_Path_2"
            d="M15.535,3.847C16.429,2.773,16.87,1.393,16.763,0c-1.366,0.144-2.629,0.797-3.535,1.829    c-0.895,1.019-1.349,2.351-1.261,3.705C13.352,5.548,14.667,4.926,15.535,3.847z"
          />
        </g>
      </g>
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
