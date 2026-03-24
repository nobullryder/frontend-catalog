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
heatmap-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO string
}

interface HeatmapCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function HeatmapCalendar({ events, onAddEvent, onRemoveEvent }: HeatmapCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [newTitle, setNewTitle] = React.useState("")

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
    })
    setNewTitle("")
  }

  // Only days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  })

  // Count events per day
  const eventsCount = (date: Date) =>
    events.filter(
      (e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    )

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-700"
    if (count === 1) return "bg-green-200 dark:bg-green-800"
    if (count === 2) return "bg-green-400 dark:bg-green-700"
    if (count >= 3) return "bg-green-600 dark:bg-green-600"
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{format(selectedDate, "MMMM yyyy")}</h2>

      {/* Heatmap grid */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {daysInMonth.map((day) => {
          const dayEvents = eventsCount(day)
          return (
            <Popover key={day.toISOString()}>
              <PopoverTrigger asChild>
                <div
                  className={`w-10 h-10 rounded cursor-pointer flex items-center justify-center ${getIntensityColor(
                    dayEvents.length
                  )}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className="text-xs">{day.getDate()}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <Card>
                  <CardContent className="space-y-1 p-2">
                    <h3 className="font-medium text-sm">{format(day, "PPP")}</h3>
                    {dayEvents.length === 0 && (
                      <p className="text-xs text-muted-foreground">No events</p>
                    )}
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex justify-between items-center text-xs"
                      >
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
        })}
      </div>

      {/* Add new event */}
      {selectedDate && (
        <div className="flex gap-2 mt-4 items-center">
          <Input
            placeholder="New event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button onClick={handleAddEvent}>Add Event</Button>
        </div>
      )}
    </div>
  )
}


code.demo.1758739515404.tsx
"use client"

import * as React from "react"
import { HeatmapCalendar, CalendarEvent } from "@/components/ui/heatmap-calendar"

export default function DemoHeatmapCalendar() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: "1", title: "Meeting", date: new Date().toISOString() },
    { id: "2", title: "Design Review", date: new Date().toISOString() },
    { id: "3", title: "Deploy", date: new Date().toISOString() },
  ])

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event])
  }

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Heatmap Calendar Demo</h1>
      <HeatmapCalendar
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
src/components/ui/heatmap-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO string
}

interface HeatmapCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function HeatmapCalendar({ events, onAddEvent, onRemoveEvent }: HeatmapCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [newTitle, setNewTitle] = React.useState("")

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
    })
    setNewTitle("")
  }

  // Only days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  })

  // Count events per day
  const eventsCount = (date: Date) =>
    events.filter(
      (e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    )

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-700"
    if (count === 1) return "bg-green-200 dark:bg-green-800"
    if (count === 2) return "bg-green-400 dark:bg-green-700"
    if (count >= 3) return "bg-green-600 dark:bg-green-600"
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{format(selectedDate, "MMMM yyyy")}</h2>

      {/* Heatmap grid */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {daysInMonth.map((day) => {
          const dayEvents = eventsCount(day)
          return (
            <Popover key={day.toISOString()}>
              <PopoverTrigger asChild>
                <div
                  className={`w-10 h-10 rounded cursor-pointer flex items-center justify-center ${getIntensityColor(
                    dayEvents.length
                  )}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className="text-xs">{day.getDate()}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <Card>
                  <CardContent className="space-y-1 p-2">
                    <h3 className="font-medium text-sm">{format(day, "PPP")}</h3>
                    {dayEvents.length === 0 && (
                      <p className="text-xs text-muted-foreground">No events</p>
                    )}
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex justify-between items-center text-xs"
                      >
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
        })}
      </div>

      {/* Add new event */}
      {selectedDate && (
        <div className="flex gap-2 mt-4 items-center">
          <Input
            placeholder="New event title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
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
