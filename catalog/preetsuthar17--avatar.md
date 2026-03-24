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
avatar.tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full shadow-sm/2 bg-background",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, tooltip, ...props }, ref) => {
  const avatar = (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return avatar;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{avatar}</TooltipTrigger>
        <TooltipContent {...tooltipProps} />
      </Tooltip>
    </TooltipProvider>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  size?: VariantProps<typeof avatarVariants>["size"];
  children: React.ReactElement[];
}

const avatarGroupSpacing = {
  tight: "-space-x-2",
  normal: "-space-x-1",
  loose: "space-x-1",
};

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { className, max = 3, spacing = "normal", size = "md", children, ...props },
    ref,
  ) => {
    const avatarsToShow = children.slice(0, max);
    const remainingCount = Math.max(0, children.length - max);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          avatarGroupSpacing[spacing],
          className,
        )}
        {...props}
      >
        {avatarsToShow.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: index,
              size,
              className: cn(
                "border-2 border-background",
                (child.props as any)?.className,
              ),
            } as any);
          }
          return child;
        })}
        {remainingCount > 0 && (
          <Avatar
            size={size}
            className="border-2 border-background"
          >
            <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants };
export type { AvatarGroupProps };

code.demo.1753354556283.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DemoOne() {
  return(
    <>
      <div className="flex gap-4 flex-wrap items-center">
        <Avatar>
          <AvatarImage
            src="https://github.com/preetsuthar17.png"
            alt="@preetsuthar17"
          />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/fuma-nama.png" alt="@fuma-nama" />
          <AvatarFallback>FN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/avatar.tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full shadow-sm/2 bg-background",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, tooltip, ...props }, ref) => {
  const avatar = (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return avatar;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{avatar}</TooltipTrigger>
        <TooltipContent {...tooltipProps} />
      </Tooltip>
    </TooltipProvider>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  size?: VariantProps<typeof avatarVariants>["size"];
  children: React.ReactElement[];
}

const avatarGroupSpacing = {
  tight: "-space-x-2",
  normal: "-space-x-1",
  loose: "space-x-1",
};

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { className, max = 3, spacing = "normal", size = "md", children, ...props },
    ref,
  ) => {
    const avatarsToShow = children.slice(0, max);
    const remainingCount = Math.max(0, children.length - max);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          avatarGroupSpacing[spacing],
          className,
        )}
        {...props}
      >
        {avatarsToShow.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: index,
              size,
              className: cn(
                "border-2 border-background",
                (child.props as any)?.className,
              ),
            } as any);
          }
          return child;
        })}
        {remainingCount > 0 && (
          <Avatar
            size={size}
            className="border-2 border-background"
          >
            <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants };
export type { AvatarGroupProps };
```

Install NPM dependencies:
```bash
@radix-ui/react-avatar, class-variance-authority
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
