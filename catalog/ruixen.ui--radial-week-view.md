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
radial-week-view.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format, addHours, startOfWeek, eachDayOfInterval, setHours } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO string
  hour: number
}

interface RadialWeekViewProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function RadialWeekView({ events, onAddEvent, onRemoveEvent }: RadialWeekViewProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [newTitle, setNewTitle] = React.useState("")
  const [newHour, setNewHour] = React.useState<number>(0)

  const startWeek = startOfWeek(selectedDate, { weekStartsOn: 0 }) // Sunday
  const weekDays = eachDayOfInterval({ start: startWeek, end: addHours(startWeek, 24 * 6) })

  const handleAddEvent = () => {
    if (!newTitle.trim()) return
    const eventDate = setHours(selectedDate, newHour)
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: eventDate.toISOString(),
      hour: newHour,
    })
    setNewTitle("")
  }

  const eventsForDay = (date: Date) =>
    events.filter((e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="relative w-[400px] h-[400px] rounded-full border border-gray-300 dark:border-gray-600">
        {/* Radial hours */}
        {[...Array(24)].map((_, hour) => {
          const angle = (hour / 24) * 360
          return (
            <div
              key={hour}
              className="absolute w-1 h-3 bg-gray-400 dark:bg-gray-500 top-1/2 left-1/2 origin-bottom"
              style={{
                transform: `rotate(${angle}deg) translateY(-50%)`,
              }}
            />
          )
        })}

        {/* Events */}
        {weekDays.map((day) => {
          const dayEvents = eventsForDay(day)
          return dayEvents.map((event) => {
            const angle = (event.hour / 24) * 360
            return (
              <Popover key={event.id}>
                <PopoverTrigger asChild>
                  <div
                    className="absolute w-6 h-6 bg-blue-400 dark:bg-blue-600 rounded-full top-1/2 left-1/2 cursor-pointer"
                    style={{
                      transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <Card>
                    <CardContent className="flex justify-between items-center p-2 text-sm">
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
                </PopoverContent>
              </Popover>
            )
          })
        })}
      </div>

      {/* Add Event */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Event title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          type="number"
          min={0}
          max={23}       // restrict hour input to 0-23
          placeholder="Hour (0-23)"
          value={newHour}
          onChange={(e) => {
            let val = Number(e.target.value)
            if (val < 0) val = 0
            if (val > 23) val = 23
            setNewHour(val)
          }}
        />
        <Button onClick={handleAddEvent}>Add Event</Button>
      </div>
    </div>
  )
}


code.demo.1758741203368.tsx
"use client"

import * as React from "react"
import { RadialWeekView, CalendarEvent } from "@/components/ui/radial-week-view"

export default function RadialWeekViewDemo() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([])

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event])
  }

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Radial Week View Demo</h2>
      <RadialWeekView
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
src/components/ui/radial-week-view.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format, addHours, startOfWeek, eachDayOfInterval, setHours } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO string
  hour: number
}

interface RadialWeekViewProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function RadialWeekView({ events, onAddEvent, onRemoveEvent }: RadialWeekViewProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [newTitle, setNewTitle] = React.useState("")
  const [newHour, setNewHour] = React.useState<number>(0)

  const startWeek = startOfWeek(selectedDate, { weekStartsOn: 0 }) // Sunday
  const weekDays = eachDayOfInterval({ start: startWeek, end: addHours(startWeek, 24 * 6) })

  const handleAddEvent = () => {
    if (!newTitle.trim()) return
    const eventDate = setHours(selectedDate, newHour)
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: eventDate.toISOString(),
      hour: newHour,
    })
    setNewTitle("")
  }

  const eventsForDay = (date: Date) =>
    events.filter((e) => format(new Date(e.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="relative w-[400px] h-[400px] rounded-full border border-gray-300 dark:border-gray-600">
        {/* Radial hours */}
        {[...Array(24)].map((_, hour) => {
          const angle = (hour / 24) * 360
          return (
            <div
              key={hour}
              className="absolute w-1 h-3 bg-gray-400 dark:bg-gray-500 top-1/2 left-1/2 origin-bottom"
              style={{
                transform: `rotate(${angle}deg) translateY(-50%)`,
              }}
            />
          )
        })}

        {/* Events */}
        {weekDays.map((day) => {
          const dayEvents = eventsForDay(day)
          return dayEvents.map((event) => {
            const angle = (event.hour / 24) * 360
            return (
              <Popover key={event.id}>
                <PopoverTrigger asChild>
                  <div
                    className="absolute w-6 h-6 bg-blue-400 dark:bg-blue-600 rounded-full top-1/2 left-1/2 cursor-pointer"
                    style={{
                      transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <Card>
                    <CardContent className="flex justify-between items-center p-2 text-sm">
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
                </PopoverContent>
              </Popover>
            )
          })
        })}
      </div>

      {/* Add Event */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Event title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          type="number"
          min={0}
          max={23}       // restrict hour input to 0-23
          placeholder="Hour (0-23)"
          value={newHour}
          onChange={(e) => {
            let val = Number(e.target.value)
            if (val < 0) val = 0
            if (val > 23) val = 23
            setNewHour(val)
          }}
        />
        <Button onClick={handleAddEvent}>Add Event</Button>
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, uuid, date-fns
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
