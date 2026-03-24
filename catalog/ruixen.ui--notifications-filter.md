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
notifications-filter.tsx
"use client"

import * as React from "react"
import {
  Bell,
  Info,
  AlertCircle,
  Calendar,
  Filter,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface NotificationItem {
  id: string
  category: "updates" | "alerts" | "reminders"
  icon: React.ReactNode
  title: string
  description: string
  time: string
}

interface NotificationsFilterProps {
  items?: NotificationItem[]
  placement?: "top" | "bottom" | "left" | "right"
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    category: "updates",
    icon: <Info className="h-4 w-4" />,
    title: "System Update",
    description: "A new feature has been deployed.",
    time: "just now",
  },
  {
    id: "2",
    category: "alerts",
    icon: <AlertCircle className="h-4 w-4" />,
    title: "Security Alert",
    description: "Suspicious login detected.",
    time: "1h ago",
  },
  {
    id: "3",
    category: "reminders",
    icon: <Calendar className="h-4 w-4" />,
    title: "Meeting Reminder",
    description: "Project sync at 3 PM.",
    time: "2h ago",
  },
  {
    id: "4",
    category: "updates",
    icon: <Info className="h-4 w-4" />,
    title: "Weekly Report",
    description: "Your weekly summary is ready.",
    time: "1d ago",
  },
]

const categories = [
  { key: "all", label: "All" },
  { key: "updates", label: "Updates" },
  { key: "alerts", label: "Alerts" },
  { key: "reminders", label: "Reminders" },
]

export default function NotificationsFilter({
  items = defaultNotifications,
  placement = "bottom",
}: NotificationsFilterProps) {
  const [selected, setSelected] = React.useState("all")

  const filteredItems =
    selected === "all"
      ? items
      : items.filter((item) => item.category === selected)

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

      <PopoverContent
        side={placement}
        align="center"
        className="w-80 p-0"
      >
        {/* Header with filter */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <Filter className="h-4 w-4" /> Notifications
          </h2>
        </div>

        {/* Category buttons */}
        <div className="flex gap-2 px-4 py-2 border-b overflow-x-auto">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={selected === cat.key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelected(cat.key)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Notifications list */}
        {filteredItems.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground text-center">
            No notifications in this category
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-muted/50 transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}


code.demo.1757256850520.tsx
import NotificationsFilter from "@/components/ui/notifications-filter";

export default function DemoOne() {
  return <NotificationsFilter />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/notifications-filter.tsx
"use client"

import * as React from "react"
import {
  Bell,
  Info,
  AlertCircle,
  Calendar,
  Filter,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface NotificationItem {
  id: string
  category: "updates" | "alerts" | "reminders"
  icon: React.ReactNode
  title: string
  description: string
  time: string
}

interface NotificationsFilterProps {
  items?: NotificationItem[]
  placement?: "top" | "bottom" | "left" | "right"
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "1",
    category: "updates",
    icon: <Info className="h-4 w-4" />,
    title: "System Update",
    description: "A new feature has been deployed.",
    time: "just now",
  },
  {
    id: "2",
    category: "alerts",
    icon: <AlertCircle className="h-4 w-4" />,
    title: "Security Alert",
    description: "Suspicious login detected.",
    time: "1h ago",
  },
  {
    id: "3",
    category: "reminders",
    icon: <Calendar className="h-4 w-4" />,
    title: "Meeting Reminder",
    description: "Project sync at 3 PM.",
    time: "2h ago",
  },
  {
    id: "4",
    category: "updates",
    icon: <Info className="h-4 w-4" />,
    title: "Weekly Report",
    description: "Your weekly summary is ready.",
    time: "1d ago",
  },
]

const categories = [
  { key: "all", label: "All" },
  { key: "updates", label: "Updates" },
  { key: "alerts", label: "Alerts" },
  { key: "reminders", label: "Reminders" },
]

export default function NotificationsFilter({
  items = defaultNotifications,
  placement = "bottom",
}: NotificationsFilterProps) {
  const [selected, setSelected] = React.useState("all")

  const filteredItems =
    selected === "all"
      ? items
      : items.filter((item) => item.category === selected)

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

      <PopoverContent
        side={placement}
        align="center"
        className="w-80 p-0"
      >
        {/* Header with filter */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <Filter className="h-4 w-4" /> Notifications
          </h2>
        </div>

        {/* Category buttons */}
        <div className="flex gap-2 px-4 py-2 border-b overflow-x-auto">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={selected === cat.key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelected(cat.key)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Notifications list */}
        {filteredItems.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground text-center">
            No notifications in this category
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-muted/50 transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-medium text-sm">{item.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
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
