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
coss-avatar.tsx
"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  className,
  ...props
}: AvatarPrimitive.Root.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-background align-middle font-medium text-xs",
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      className={cn("size-full object-cover", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { AvatarPrimitive };


code.demo.1773930543454.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/component";

const users = [
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces",
    fallback: "JD",
    name: "Jane Doe",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=faces",
    fallback: "JN",
    name: "John Newman",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces",
    fallback: "MK",
    name: "Mark K",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=faces",
    fallback: "SA",
    name: "Sara A",
  },
  {
    src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=96&h=96&fit=crop&crop=faces",
    fallback: "TL",
    name: "Tom L",
  },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-background p-8">
      <div className="flex flex-col items-center gap-10">
        {/* Standard group */}
        <div className="flex items-center">
          {users.slice(0, 4).map((user, i) => (
            <Avatar
              key={user.fallback}
              className="size-10 ring-2 ring-background"
              style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: users.length - i }}
              title={user.name}
            >
              <AvatarImage src={user.src} alt={user.name} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar
            className="size-10 ring-2 ring-background bg-muted"
            style={{ marginLeft: "-10px", zIndex: 0 }}
          >
            <AvatarFallback className="text-xs font-medium text-muted-foreground bg-muted">
              +5
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Small group */}
        <div className="flex items-center">
          {users.map((user, i) => (
            <Avatar
              key={user.fallback}
              className="size-8 ring-2 ring-background"
              style={{ marginLeft: i === 0 ? 0 : "-8px", zIndex: users.length - i }}
              title={user.name}
            >
              <AvatarImage src={user.src} alt={user.name} />
              <AvatarFallback className="text-[10px]">{user.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        {/* Fallback group */}
        <div className="flex items-center">
          {users.slice(0, 4).map((user, i) => (
            <Avatar
              key={user.fallback}
              className="size-10 ring-2 ring-background"
              style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: users.length - i }}
              title={user.name}
            >
              <AvatarImage src="/broken.png" alt={user.name} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/coss-avatar.tsx
"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  className,
  ...props
}: AvatarPrimitive.Root.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-background align-middle font-medium text-xs",
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      className={cn("size-full object-cover", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { AvatarPrimitive };

```

Install NPM dependencies:
```bash
@base-ui/react
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
