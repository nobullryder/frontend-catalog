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
event-calendar.tsx
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO string
}

interface EventCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function EventCalendar({ events, onAddEvent, onRemoveEvent }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [newTitle, setNewTitle] = React.useState("")

  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (e) => format(new Date(e.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )
    : []

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
    })
    setNewTitle("")
  }

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
      />

      {/* Events list for selected date */}
      {selectedDate && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            Events on {format(selectedDate, "PPP")}
          </h2>

          {eventsForSelectedDate.length === 0 && (
            <p className="text-sm text-muted-foreground">No events yet.</p>
          )}

          {eventsForSelectedDate.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-2 flex justify-between items-center text-sm">
                <span>{event.title}</span>
                {onRemoveEvent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => onRemoveEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Add new event */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="New event title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={handleAddEvent}>Add Event</Button>
          </div>
        </div>
      )}
    </div>
  )
}


code.demo.1758738981144.tsx
"use client"

import * as React from "react"
import { EventCalendar, CalendarEvent } from "@/components/ui/event-calendar"

export default function DemoEventCalendar() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: "1", title: "Kickoff Meeting", date: new Date().toISOString() },
    { id: "2", title: "Design Review", date: new Date().toISOString() },
  ])

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event])
  }

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Event Calendar Demo</h1>
      <EventCalendar
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
src/components/ui/event-calendar.tsx
"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { format } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO string
}

interface EventCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (event: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function EventCalendar({ events, onAddEvent, onRemoveEvent }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [newTitle, setNewTitle] = React.useState("")

  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (e) => format(new Date(e.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )
    : []

  const handleAddEvent = () => {
    if (!selectedDate || !newTitle.trim()) return
    onAddEvent({
      id: uuidv4(),
      title: newTitle.trim(),
      date: selectedDate.toISOString(),
    })
    setNewTitle("")
  }

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="w-full"
      />

      {/* Events list for selected date */}
      {selectedDate && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            Events on {format(selectedDate, "PPP")}
          </h2>

          {eventsForSelectedDate.length === 0 && (
            <p className="text-sm text-muted-foreground">No events yet.</p>
          )}

          {eventsForSelectedDate.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-2 flex justify-between items-center text-sm">
                <span>{event.title}</span>
                {onRemoveEvent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => onRemoveEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Add new event */}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="New event title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={handleAddEvent}>Add Event</Button>
          </div>
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
