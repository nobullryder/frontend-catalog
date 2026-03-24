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
stacked-bar-calendar.tsx
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type CalendarEvent = {
  id: string
  title: string
  date: string
  category?: "low" | "medium" | "high"
}

interface StackedBarCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function StackedBarCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: StackedBarCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [newTitle, setNewTitle] = React.useState("")
  const [newCategory, setNewCategory] = React.useState<"low" | "medium" | "high">("medium")
  const [filter, setFilter] = React.useState<"all" | "low" | "medium" | "high">("all")

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
      category: newCategory,
    })
    setNewTitle("")
  }

  const filteredEvents = filter === "all" ? events : events.filter(e => e.category === filter)

  const eventsForDay = (date: Date) =>
    filteredEvents.filter(
      (e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    )

  const getColor = (category?: string) => {
    switch (category) {
      case "low":
        return "bg-blue-300 dark:bg-blue-700"
      case "medium":
        return "bg-green-400 dark:bg-green-600"
      case "high":
        return "bg-red-500 dark:bg-red-600"
      default:
        return "bg-gray-300 dark:bg-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 items-center">
        <span className="font-medium">Filter:</span>
        <Select value={filter} onValueChange={(val) => setFilter(val as any)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
        renderDay={(date) => {
          const dayEvents = eventsForDay(date)
          return (
            <Popover key={date.toISOString()}>
              <PopoverTrigger asChild>
                <div className="relative w-full h-20 flex flex-col justify-end cursor-pointer border border-gray-200 dark:border-gray-700 rounded">
                  {dayEvents.map((event, i) => (
                    <div
                      key={i}
                      className={`w-full ${getColor(event.category)} mb-0.5 rounded`}
                      style={{ height: `${18 / (dayEvents.length || 1)}px` }}
                    />
                  ))}
                  <span className="absolute top-1 left-1 text-xs">{date.getDate()}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <Card>
                  <CardContent className="space-y-1 p-2">
                    <h3 className="font-medium text-sm">{format(date, "PPP")}</h3>
                    {dayEvents.length === 0 && (
                      <p className="text-xs text-muted-foreground">No events</p>
                    )}
                    {dayEvents.map((event) => (
                      <div key={event.id} className="flex justify-between items-center text-xs">
                        <span>{event.title}</span>
                        {onRemoveEvent && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => onRemoveEvent(event.id)}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          )
        }}
      />

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Events on {format(selectedDate, "PPP")}</h3>
          <div className="space-y-2 mt-2">
            {eventsForDay(selectedDate).length === 0 && (
              <p className="text-xs text-muted-foreground">No events</p>
            )}
            {eventsForDay(selectedDate).map((event) => (
              <Card key={event.id}>
                <CardContent className="flex justify-between items-center p-2 text-xs">
                  <span>{event.title}</span>
                  {onRemoveEvent && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => onRemoveEvent(event.id)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Event */}
      {selectedDate && (
        <div className="flex gap-2 mt-4 items-center">
          <Input
            placeholder="New event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Select value={newCategory} onValueChange={(val) => setNewCategory(val as any)}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </div>
      )}
    </div>
  )
}


code.demo.1758740435927.tsx
"use client"

import * as React from "react"
import { StackedBarCalendar, CalendarEvent } from "@/components/ui/stacked-bar-calendar"

export default function StackedBarCalendarDemo() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: "1", title: "Team Meeting", date: new Date().toISOString(), category: "medium" },
    { id: "2", title: "Project Deadline", date: new Date().toISOString(), category: "high" },
    { id: "3", title: "Code Review", date: new Date().toISOString(), category: "low" },
  ])

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event])
  }

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Stacked Bar Calendar Demo</h1>
      <StackedBarCalendar
        events={events}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stacked-bar-calendar.tsx
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type CalendarEvent = {
  id: string
  title: string
  date: string
  category?: "low" | "medium" | "high"
}

interface StackedBarCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function StackedBarCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: StackedBarCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [newTitle, setNewTitle] = React.useState("")
  const [newCategory, setNewCategory] = React.useState<"low" | "medium" | "high">("medium")
  const [filter, setFilter] = React.useState<"all" | "low" | "medium" | "high">("all")

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
      category: newCategory,
    })
    setNewTitle("")
  }

  const filteredEvents = filter === "all" ? events : events.filter(e => e.category === filter)

  const eventsForDay = (date: Date) =>
    filteredEvents.filter(
      (e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    )

  const getColor = (category?: string) => {
    switch (category) {
      case "low":
        return "bg-blue-300 dark:bg-blue-700"
      case "medium":
        return "bg-green-400 dark:bg-green-600"
      case "high":
        return "bg-red-500 dark:bg-red-600"
      default:
        return "bg-gray-300 dark:bg-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 items-center">
        <span className="font-medium">Filter:</span>
        <Select value={filter} onValueChange={(val) => setFilter(val as any)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
        renderDay={(date) => {
          const dayEvents = eventsForDay(date)
          return (
            <Popover key={date.toISOString()}>
              <PopoverTrigger asChild>
                <div className="relative w-full h-20 flex flex-col justify-end cursor-pointer border border-gray-200 dark:border-gray-700 rounded">
                  {dayEvents.map((event, i) => (
                    <div
                      key={i}
                      className={`w-full ${getColor(event.category)} mb-0.5 rounded`}
                      style={{ height: `${18 / (dayEvents.length || 1)}px` }}
                    />
                  ))}
                  <span className="absolute top-1 left-1 text-xs">{date.getDate()}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <Card>
                  <CardContent className="space-y-1 p-2">
                    <h3 className="font-medium text-sm">{format(date, "PPP")}</h3>
                    {dayEvents.length === 0 && (
                      <p className="text-xs text-muted-foreground">No events</p>
                    )}
                    {dayEvents.map((event) => (
                      <div key={event.id} className="flex justify-between items-center text-xs">
                        <span>{event.title}</span>
                        {onRemoveEvent && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => onRemoveEvent(event.id)}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          )
        }}
      />

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Events on {format(selectedDate, "PPP")}</h3>
          <div className="space-y-2 mt-2">
            {eventsForDay(selectedDate).length === 0 && (
              <p className="text-xs text-muted-foreground">No events</p>
            )}
            {eventsForDay(selectedDate).map((event) => (
              <Card key={event.id}>
                <CardContent className="flex justify-between items-center p-2 text-xs">
                  <span>{event.title}</span>
                  {onRemoveEvent && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => onRemoveEvent(event.id)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add Event */}
      {selectedDate && (
        <div className="flex gap-2 mt-4 items-center">
          <Input
            placeholder="New event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Select value={newCategory} onValueChange={(val) => setNewCategory(val as any)}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </div>
      )}
    </div>
  )
}

```

Install NPM dependencies:
```bash
uuid, date-fns, lucide-react
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
