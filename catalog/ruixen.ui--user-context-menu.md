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
user-context-menu.tsx
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Sparkles,
  Star,
  Heart,
  Camera,
} from "lucide-react";

export default function UserContextMenu() {
  return (
    <ContextMenu>
      {/* Trigger */}
      <ContextMenuTrigger className="flex cursor-pointer items-center gap-3 rounded-lg bg-white border border-border p-4 hover:bg-muted/50 transition-all">
        <Avatar className="size-10 border border-border">
          <AvatarFallback className="bg-muted text-foreground font-semibold">
            SG
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-foreground">Srinath G</span>
          <span className="text-muted-foreground text-xs">Right-click to open menu</span>
        </div>
      </ContextMenuTrigger>

      {/* Context Menu */}
      <ContextMenuContent className="w-60 rounded-md border border-border bg-white shadow-md">
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70 font-medium">
          <User className="size-4" />
          View Dashboard
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Mail className="size-4" />
          Messages
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Camera className="size-4" />
          Update Picture
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Heart className="size-4" />
          Liked Posts
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Sparkles className="size-4" />
          Achievements
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Star className="size-4" />
          Upgrade to Pro
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Shield className="size-4" />
          Account Protection
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Shield className="size-4" />
          Privacy & Security
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 text-red-600 hover:bg-red-50 font-medium">
          <LogOut className="size-4" />
          Sign Out
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}


code.demo.1760578820229.tsx
import UserContextMenu from "@/components/ui/user-context-menu";

export default function UserContextMenuDemo() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <UserContextMenu />
        <p className="text-muted-foreground mt-8">
          Right-click the card below to explore user options.
        </p>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/user-context-menu.tsx
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Sparkles,
  Star,
  Heart,
  Camera,
} from "lucide-react";

export default function UserContextMenu() {
  return (
    <ContextMenu>
      {/* Trigger */}
      <ContextMenuTrigger className="flex cursor-pointer items-center gap-3 rounded-lg bg-white border border-border p-4 hover:bg-muted/50 transition-all">
        <Avatar className="size-10 border border-border">
          <AvatarFallback className="bg-muted text-foreground font-semibold">
            SG
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-foreground">Srinath G</span>
          <span className="text-muted-foreground text-xs">Right-click to open menu</span>
        </div>
      </ContextMenuTrigger>

      {/* Context Menu */}
      <ContextMenuContent className="w-60 rounded-md border border-border bg-white shadow-md">
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70 font-medium">
          <User className="size-4" />
          View Dashboard
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Mail className="size-4" />
          Messages
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Camera className="size-4" />
          Update Picture
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Heart className="size-4" />
          Liked Posts
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Sparkles className="size-4" />
          Achievements
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Star className="size-4" />
          Upgrade to Pro
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Shield className="size-4" />
          Account Protection
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 hover:bg-muted/70">
          <Shield className="size-4" />
          Privacy & Security
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem className="flex items-center gap-2 text-red-600 hover:bg-red-50 font-medium">
          <LogOut className="size-4" />
          Sign Out
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

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
