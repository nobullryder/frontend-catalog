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
icon-label-subtext-button.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DownloadCloud, Loader2, Check } from "lucide-react";

/**
 * IconLabelSubtextButton
 *
 * A compact, accessible, and highly re-usable button for actions that
 * need an icon, a strong primary label and a smaller contextual subtext.
 * Built with shadcn/ui primitives and Tailwind. Includes built-in
 * loading & success states, an optional badge, and an optional tooltip.
 */

type Variant = "default" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface IconLabelSubtextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode; // preferred: lucide-react icon
  label: string;
  subtext?: string;
  badge?: string | number; // small badge shown top-right
  tooltip?: string; // optional tooltip content
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  success?: boolean; // briefly show success icon instead of provided icon
}

function sizeClasses(size: Size) {
  switch (size) {
    case "sm":
      return {
        padding: "px-3 py-2",
        icon: "w-4 h-4",
        label: "text-sm",
        subtext: "text-xs",
      };
    case "lg":
      return {
        padding: "px-5 py-3",
        icon: "w-6 h-6",
        label: "text-base",
        subtext: "text-sm",
      };
    case "md":
    default:
      return {
        padding: "px-4 py-2.5",
        icon: "w-5 h-5",
        label: "text-sm font-medium",
        subtext: "text-xs",
      };
  }
}

function variantClasses(variant: Variant) {
  switch (variant) {
    case "ghost":
      return "bg-transparent hover:bg-muted/50 border-transparent";
    case "outline":
      return "bg-transparent border border-border hover:bg-muted";
    case "default":
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90";
  }
}

const IconLabelSubtextButton: React.FC<IconLabelSubtextButtonProps> = ({
  icon,
  label,
  subtext,
  badge,
  tooltip,
  variant = "default",
  size = "md",
  loading = false,
  success = false,
  className,
  disabled,
  ...props
}) => {
  const s = sizeClasses(size);
  const v = variantClasses(variant);

  const inner = (
    <button
      type="button"
      className={cn(
        "relative inline-flex items-center gap-3 rounded-2xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring",
        s.padding,
        v,
        className,
        disabled && "opacity-60 cursor-not-allowed"
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Icon */}
      <span className={cn("flex items-center justify-center rounded-md", s.icon)} aria-hidden>
        {loading ? (
          <Loader2 className={cn(s.icon, "animate-spin")} />
        ) : success ? (
          <Check className={cn(s.icon)} />
        ) : (
          icon ?? <DownloadCloud className={cn(s.icon)} />
        )}
      </span>

      {/* Text column */}
      <span className="flex flex-col items-start leading-none">
        <span className={cn(s.label)}>{label}</span>
        {subtext ? <span className={cn("text-muted-foreground", s.subtext)}>{subtext}</span> : null}
      </span>

      {/* Optional small badge */}
      {badge !== undefined ? (
        <span className="absolute -top-2 -right-2">
          <Badge className="p-1 min-w-[1.25rem] h-5 text-[0.65rem]">{badge}</Badge>
        </span>
      ) : null}
    </button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{inner}</TooltipTrigger>
          <TooltipContent side="top">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return inner;
};

export default IconLabelSubtextButton;


code.demo.1758554993282.tsx
import IconLabelSubtextButton from "@/components/ui/icon-label-subtext-button"
import { DownloadCloud, Loader2, Check } from "lucide-react";

export default function DemoIconLabelSubtextButton() {
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <div className="flex gap-4 items-center">
        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Download"
          subtext="File size: 12MB"
          onClick={() => alert("Downloading...")}
        />

        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Export CSV"
          subtext="Rows: 12,341"
          variant="outline"
          size="lg"
          badge={"NEW"}
        />

        <IconLabelSubtextButton
          icon={<DownloadCloud />}
          label="Save"
          subtext="Auto-save enabled"
          variant="ghost"
          size="sm"
          tooltip="Saves your current draft to cloud storage"
        />
      </div>

      <div className="flex gap-4 items-center">
        <IconLabelSubtextButton icon={<DownloadCloud />} label="Upload" subtext=".png, .jpg only" loading />
        <IconLabelSubtextButton icon={<DownloadCloud />} label="Sent" subtext="Delivered" success />
      </div>

      <p className="text-sm text-muted-foreground">
        Use cases: downloads, uploads, attachments, contextual actions (e.g., "Add — 3 items"), or any place where a short
        caption helps reduce ambiguity.
      </p>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/icon-label-subtext-button.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DownloadCloud, Loader2, Check } from "lucide-react";

/**
 * IconLabelSubtextButton
 *
 * A compact, accessible, and highly re-usable button for actions that
 * need an icon, a strong primary label and a smaller contextual subtext.
 * Built with shadcn/ui primitives and Tailwind. Includes built-in
 * loading & success states, an optional badge, and an optional tooltip.
 */

type Variant = "default" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface IconLabelSubtextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode; // preferred: lucide-react icon
  label: string;
  subtext?: string;
  badge?: string | number; // small badge shown top-right
  tooltip?: string; // optional tooltip content
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  success?: boolean; // briefly show success icon instead of provided icon
}

function sizeClasses(size: Size) {
  switch (size) {
    case "sm":
      return {
        padding: "px-3 py-2",
        icon: "w-4 h-4",
        label: "text-sm",
        subtext: "text-xs",
      };
    case "lg":
      return {
        padding: "px-5 py-3",
        icon: "w-6 h-6",
        label: "text-base",
        subtext: "text-sm",
      };
    case "md":
    default:
      return {
        padding: "px-4 py-2.5",
        icon: "w-5 h-5",
        label: "text-sm font-medium",
        subtext: "text-xs",
      };
  }
}

function variantClasses(variant: Variant) {
  switch (variant) {
    case "ghost":
      return "bg-transparent hover:bg-muted/50 border-transparent";
    case "outline":
      return "bg-transparent border border-border hover:bg-muted";
    case "default":
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90";
  }
}

const IconLabelSubtextButton: React.FC<IconLabelSubtextButtonProps> = ({
  icon,
  label,
  subtext,
  badge,
  tooltip,
  variant = "default",
  size = "md",
  loading = false,
  success = false,
  className,
  disabled,
  ...props
}) => {
  const s = sizeClasses(size);
  const v = variantClasses(variant);

  const inner = (
    <button
      type="button"
      className={cn(
        "relative inline-flex items-center gap-3 rounded-2xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring",
        s.padding,
        v,
        className,
        disabled && "opacity-60 cursor-not-allowed"
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Icon */}
      <span className={cn("flex items-center justify-center rounded-md", s.icon)} aria-hidden>
        {loading ? (
          <Loader2 className={cn(s.icon, "animate-spin")} />
        ) : success ? (
          <Check className={cn(s.icon)} />
        ) : (
          icon ?? <DownloadCloud className={cn(s.icon)} />
        )}
      </span>

      {/* Text column */}
      <span className="flex flex-col items-start leading-none">
        <span className={cn(s.label)}>{label}</span>
        {subtext ? <span className={cn("text-muted-foreground", s.subtext)}>{subtext}</span> : null}
      </span>

      {/* Optional small badge */}
      {badge !== undefined ? (
        <span className="absolute -top-2 -right-2">
          <Badge className="p-1 min-w-[1.25rem] h-5 text-[0.65rem]">{badge}</Badge>
        </span>
      ) : null}
    </button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{inner}</TooltipTrigger>
          <TooltipContent side="top">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return inner;
};

export default IconLabelSubtextButton;

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
