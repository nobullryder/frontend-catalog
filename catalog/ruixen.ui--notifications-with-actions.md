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
notifications-with-actions.tsx
"use client";

import * as React from "react"
import { Bell, GripVertical, Trash2, Archive, ChevronRight } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
}

interface NotificationsWithActionsProps {
  items?: NotificationItem[]
  placement?: "top" | "right" | "bottom" | "left"
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome 🎉",
    description: "Thanks for checking out the notifications component!",
    time: "just now",
  },
  {
    id: "2",
    title: "System Update",
    description: "We’ve rolled out a new feature for you.",
    time: "1h ago",
  },
  {
    id: "3",
    title: "Reminder",
    description: "Don’t forget to finish your profile setup.",
    time: "3h ago",
  },
]

export default function NotificationsWithActions({
  items = defaultNotifications,
  placement = "bottom",
}: NotificationsWithActionsProps) {
  const [notifications, setNotifications] =
    React.useState<NotificationItem[]>(items)
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const handleArchive = () => {
    setActiveId(null)
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setActiveId(null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 text-xs px-1.5 py-0"
            >
              {notifications.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align="center"
        side={placement}
      >
        <Card className="max-h-80 overflow-y-auto rounded-lg border-none shadow-none">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition"
                  >
                    {/* Left text with animation */}
                    <motion.div
                      animate={{ x: isActive ? -40 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>

                    {/* Right side controls */}
                    <div className="ml-2 flex items-center">
                      {isActive ? (
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={handleArchive}
                          >
                            <Archive className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={() => setActiveId(null)}
                          >
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="p-1 rounded-md hover:bg-muted"
                          onClick={() =>
                            setActiveId(isActive ? null : item.id)
                          }
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  )
}


code.demo.1757214873492.tsx
import NotificationsWithActions from "@/components/ui/notifications-with-actions";

export default function DemoOne() {
  return <NotificationsWithActions />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/notifications-with-actions.tsx
"use client";

import * as React from "react"
import { Bell, GripVertical, Trash2, Archive, ChevronRight } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
}

interface NotificationsWithActionsProps {
  items?: NotificationItem[]
  placement?: "top" | "right" | "bottom" | "left"
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome 🎉",
    description: "Thanks for checking out the notifications component!",
    time: "just now",
  },
  {
    id: "2",
    title: "System Update",
    description: "We’ve rolled out a new feature for you.",
    time: "1h ago",
  },
  {
    id: "3",
    title: "Reminder",
    description: "Don’t forget to finish your profile setup.",
    time: "3h ago",
  },
]

export default function NotificationsWithActions({
  items = defaultNotifications,
  placement = "bottom",
}: NotificationsWithActionsProps) {
  const [notifications, setNotifications] =
    React.useState<NotificationItem[]>(items)
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const handleArchive = () => {
    setActiveId(null)
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setActiveId(null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 text-xs px-1.5 py-0"
            >
              {notifications.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align="center"
        side={placement}
      >
        <Card className="max-h-80 overflow-y-auto rounded-lg border-none shadow-none">
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No notifications
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition"
                  >
                    {/* Left text with animation */}
                    <motion.div
                      animate={{ x: isActive ? -40 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>

                    {/* Right side controls */}
                    <div className="ml-2 flex items-center">
                      {isActive ? (
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={handleArchive}
                          >
                            <Archive className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-muted"
                            onClick={() => setActiveId(null)}
                          >
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="p-1 rounded-md hover:bg-muted"
                          onClick={() =>
                            setActiveId(isActive ? null : item.id)
                          }
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </PopoverContent>
    </Popover>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
