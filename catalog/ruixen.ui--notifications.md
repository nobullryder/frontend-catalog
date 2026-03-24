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
notifications.tsx
"use client";

import * as React from "react";
import { BellRing, MessageCircle, AlertTriangle, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Notification {
  id: number;
  type: "message" | "alert" | "success";
  message: string;
  timestamp?: string;
  read?: boolean;
}

interface NotificationsProps {
  notifications?: Notification[];
  icon?: React.ReactNode;
  maxHeight?: string;
}

const defaultNotifications: Notification[] = [
  { id: 1, type: "message", message: "New message from John", timestamp: "2m ago" },
  { id: 2, type: "success", message: "Report generated successfully", timestamp: "10m ago" },
  { id: 3, type: "alert", message: "Server downtime scheduled", timestamp: "1h ago" },
];

export default function Notifications({
  notifications = defaultNotifications,
  icon,
  maxHeight = "64",
}: NotificationsProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-5 h-5" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <BellRing className="w-5 h-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 rounded-full border hover:border-gray-200 hover:bg-gray-100 inline-flex items-center justify-center">
        {icon || <BellRing className="w-5 h-5 text-gray-700" />}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="center" // center the dropdown below the icon
        className={`w-96 bg-white border border-gray-200 rounded-md shadow-lg max-h-${maxHeight} overflow-y-auto divide-y divide-gray-100`}
      >
        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-gray-400 cursor-default">
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={`flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer ${
                n.read ? "opacity-70" : "font-medium"
              }`}
            >
              <div>{getIcon(n.type)}</div>
              <div className="flex flex-col">
                <span>{n.message}</span>
                {n.timestamp && (
                  <span className="text-xs text-gray-400 mt-1">{n.timestamp}</span>
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


code.demo.1757080766972.tsx
import Notifications from "@/components/ui/notifications";

export default function DemoOne() {
  return <Notifications />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/notifications.tsx
"use client";

import * as React from "react";
import { BellRing, MessageCircle, AlertTriangle, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Notification {
  id: number;
  type: "message" | "alert" | "success";
  message: string;
  timestamp?: string;
  read?: boolean;
}

interface NotificationsProps {
  notifications?: Notification[];
  icon?: React.ReactNode;
  maxHeight?: string;
}

const defaultNotifications: Notification[] = [
  { id: 1, type: "message", message: "New message from John", timestamp: "2m ago" },
  { id: 2, type: "success", message: "Report generated successfully", timestamp: "10m ago" },
  { id: 3, type: "alert", message: "Server downtime scheduled", timestamp: "1h ago" },
];

export default function Notifications({
  notifications = defaultNotifications,
  icon,
  maxHeight = "64",
}: NotificationsProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-5 h-5" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <BellRing className="w-5 h-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 rounded-full border hover:border-gray-200 hover:bg-gray-100 inline-flex items-center justify-center">
        {icon || <BellRing className="w-5 h-5 text-gray-700" />}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="center" // center the dropdown below the icon
        className={`w-96 bg-white border border-gray-200 rounded-md shadow-lg max-h-${maxHeight} overflow-y-auto divide-y divide-gray-100`}
      >
        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-gray-400 cursor-default">
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={`flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer ${
                n.read ? "opacity-70" : "font-medium"
              }`}
            >
              <div>{getIcon(n.type)}</div>
              <div className="flex flex-col">
                <span>{n.message}</span>
                {n.timestamp && (
                  <span className="text-xs text-gray-400 mt-1">{n.timestamp}</span>
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
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
