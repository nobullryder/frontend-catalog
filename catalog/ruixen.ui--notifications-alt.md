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
notifications-alt.tsx
import * as React from "react"
import { Bell, Info } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Type definition for reusability
interface NotificationItem {
  id: string
  message: string
  time: string
  type?: "info" | "link" | "default"
  href?: string // optional link if type is link
}

interface NotificationsProps {
  items?: NotificationItem[]
}

// Default notifications
const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    message: "Welcome to the platform 🎉",
    time: "just now",
    type: "default",
  },
  {
    id: "2",
    message: "Check out our new documentation section",
    time: "10m ago",
    type: "link",
    href: "/docs",
  },
  {
    id: "3",
    message: "System maintenance scheduled for tonight",
    time: "2h ago",
    type: "info",
  },
]

export default function NotificationsAlt({ items = defaultNotifications }: NotificationsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
          {items.length > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 text-xs px-1.5 py-0"
            >
              {items.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0" align="center" side="bottom">
        <Card className="max-h-80 overflow-y-auto rounded-lg border-none shadow-none">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="p-4 flex gap-3 hover:bg-muted/50 transition">
                  {item.type === "info" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Important Information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}

                  <div className="flex-1">
                    {item.type === "link" && item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {item.message}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium">{item.message}</p>
                    )}
                    <span className="block text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  )
}

// Example usage
// <NotificationsAlt />
// <NotificationsAlt
//   items={[
//     { id: "1", message: "Welcome to the platform 🎉", time: "just now", type: "default" },
//     { id: "2", message: "Check out our new documentation section", time: "10m ago", type: "link", href: "/docs" },
//     { id: "3", message: "System maintenance scheduled for tonight", time: "2h ago", type: "info" },
//   ]}
// />


code.demo.1757213701981.tsx
import NotificationsAlt from "@/components/ui/notifications-alt";

export default function DemoOne() {
  return <NotificationsAlt />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/notifications-alt.tsx
import * as React from "react"
import { Bell, Info } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Type definition for reusability
interface NotificationItem {
  id: string
  message: string
  time: string
  type?: "info" | "link" | "default"
  href?: string // optional link if type is link
}

interface NotificationsProps {
  items?: NotificationItem[]
}

// Default notifications
const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    message: "Welcome to the platform 🎉",
    time: "just now",
    type: "default",
  },
  {
    id: "2",
    message: "Check out our new documentation section",
    time: "10m ago",
    type: "link",
    href: "/docs",
  },
  {
    id: "3",
    message: "System maintenance scheduled for tonight",
    time: "2h ago",
    type: "info",
  },
]

export default function NotificationsAlt({ items = defaultNotifications }: NotificationsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
          {items.length > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 text-xs px-1.5 py-0"
            >
              {items.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0" align="center" side="bottom">
        <Card className="max-h-80 overflow-y-auto rounded-lg border-none shadow-none">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="p-4 flex gap-3 hover:bg-muted/50 transition">
                  {item.type === "info" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Important Information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}

                  <div className="flex-1">
                    {item.type === "link" && item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        {item.message}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium">{item.message}</p>
                    )}
                    <span className="block text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  )
}

// Example usage
// <NotificationsAlt />
// <NotificationsAlt
//   items={[
//     { id: "1", message: "Welcome to the platform 🎉", time: "just now", type: "default" },
//     { id: "2", message: "Check out our new documentation section", time: "10m ago", type: "link", href: "/docs" },
//     { id: "3", message: "System maintenance scheduled for tonight", time: "2h ago", type: "info" },
//   ]}
// />

```

Install NPM dependencies:
```bash
next, lucide-react
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
