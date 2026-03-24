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
event-constellation-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
} from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO
}

interface EventConstellationCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (e: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function EventConstellationCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: EventConstellationCalendarProps) {
  const [dateRef, setDateRef] = React.useState(new Date())
  const [title, setTitle] = React.useState("")
  const [newDate, setNewDate] = React.useState("")

  // get days in month
  const days = eachDayOfInterval({
    start: startOfMonth(dateRef),
    end: endOfMonth(dateRef),
  })

  // filter events for given day
  const eventsForDay = (d: Date) =>
    events.filter(
      (ev) => format(new Date(ev.date), "yyyy-MM-dd") === format(d, "yyyy-MM-dd")
    )

  const handleAdd = () => {
    if (!title.trim() || !newDate) return
    onAddEvent({
      id: uuidv4(),
      title: title.trim(),
      date: new Date(newDate).toISOString(),
    })
    setTitle("")
    setNewDate("")
  }

  // ✅ Keep stars inside container (with padding)
  const getStarPosition = (dayIndex: number) => {
    const angle = (dayIndex / days.length) * 2 * Math.PI
    const radius = 100 + (dayIndex % 5) * 20 // smaller radius range
    const centerX = 200
    const centerY = 200
    const padding = 20 // ensures no star goes outside box
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return {
      x: Math.min(400 - padding, Math.max(padding, x)),
      y: Math.min(400 - padding, Math.max(padding, y)),
    }
  }

  return (
    <div className="space-y-4 flex flex-col items-center">
      {/* Month Navigation */}
      <div className="flex gap-2 items-center">
        <Button
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
          }
        >
          Prev
        </Button>
        <div className="font-semibold">{format(dateRef, "MMMM yyyy")}</div>
        <Button
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
          }
        >
          Next
        </Button>
      </div>

      {/* Starfield (Constellation Map) */}
      <div className="relative w-[400px] h-[400px] bg-neutral-900 dark:bg-neutral-950 rounded-lg overflow-hidden border border-neutral-700 dark:border-neutral-800">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {days.map((day, idx) => {
            const { x, y } = getStarPosition(idx)
            const dayEvents = eventsForDay(day)
            if (dayEvents.length === 0) return null

            // connect to next day with events
            const nextDay = days[idx + 1]
            if (!nextDay) return null
            const nextEvents = eventsForDay(nextDay)
            if (nextEvents.length === 0) return null

            const { x: nx, y: ny } = getStarPosition(idx + 1)

            return (
              <line
                key={`line-${idx}`}
                x1={x}
                y1={y}
                x2={nx}
                y2={ny}
                stroke="white"
                strokeWidth="1"
                opacity="0.4"
              />
            )
          })}
        </svg>

        {days.map((day, idx) => {
          const { x, y } = getStarPosition(idx)
          const dayEvents = eventsForDay(day)
          const hasEvents = dayEvents.length > 0

          return (
            <Popover key={day.toISOString()}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute w-6 h-6 flex items-center justify-center rounded-full text-[10px] cursor-pointer transition-colors ${
                    hasEvents
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-neutral-500 text-white dark:bg-neutral-700 dark:text-neutral-200"
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {format(day, "d")}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <Card>
                  <CardContent className="p-2 space-y-2 text-sm">
                    <div className="font-medium">{format(day, "PPP")}</div>
                    {dayEvents.length === 0 && (
                      <div className="text-xs text-muted-foreground">
                        No events
                      </div>
                    )}
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex justify-between items-center"
                      >
                        <span>{ev.title}</span>
                        {onRemoveEvent && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => onRemoveEvent(ev.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
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

      {/* Add Event */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  )
}


code.demo.1758799830906.tsx
"use client"

import * as React from "react"
import { EventConstellationCalendar, CalendarEvent } from "@/components/ui/event-constellation-calendar"
import { v4 as uuidv4 } from "uuid"

export default function EventConstellationDemo() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    {
      id: uuidv4(),
      title: "Kickoff Meeting",
      date: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: "Demo Review",
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Design Handoff",
      date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    },
  ])

  const handleAdd = (ev: CalendarEvent) => setEvents((p) => [...p, ev])
  const handleRemove = (id: string) => setEvents((p) => p.filter((e) => e.id !== id))

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">Event Constellation Calendar (Demo)</h1>
      <EventConstellationCalendar events={events} onAddEvent={handleAdd} onRemoveEvent={handleRemove} />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/event-constellation-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
} from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO
}

interface EventConstellationCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (e: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function EventConstellationCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: EventConstellationCalendarProps) {
  const [dateRef, setDateRef] = React.useState(new Date())
  const [title, setTitle] = React.useState("")
  const [newDate, setNewDate] = React.useState("")

  // get days in month
  const days = eachDayOfInterval({
    start: startOfMonth(dateRef),
    end: endOfMonth(dateRef),
  })

  // filter events for given day
  const eventsForDay = (d: Date) =>
    events.filter(
      (ev) => format(new Date(ev.date), "yyyy-MM-dd") === format(d, "yyyy-MM-dd")
    )

  const handleAdd = () => {
    if (!title.trim() || !newDate) return
    onAddEvent({
      id: uuidv4(),
      title: title.trim(),
      date: new Date(newDate).toISOString(),
    })
    setTitle("")
    setNewDate("")
  }

  // ✅ Keep stars inside container (with padding)
  const getStarPosition = (dayIndex: number) => {
    const angle = (dayIndex / days.length) * 2 * Math.PI
    const radius = 100 + (dayIndex % 5) * 20 // smaller radius range
    const centerX = 200
    const centerY = 200
    const padding = 20 // ensures no star goes outside box
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return {
      x: Math.min(400 - padding, Math.max(padding, x)),
      y: Math.min(400 - padding, Math.max(padding, y)),
    }
  }

  return (
    <div className="space-y-4 flex flex-col items-center">
      {/* Month Navigation */}
      <div className="flex gap-2 items-center">
        <Button
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
          }
        >
          Prev
        </Button>
        <div className="font-semibold">{format(dateRef, "MMMM yyyy")}</div>
        <Button
          onClick={() =>
            setDateRef((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
          }
        >
          Next
        </Button>
      </div>

      {/* Starfield (Constellation Map) */}
      <div className="relative w-[400px] h-[400px] bg-neutral-900 dark:bg-neutral-950 rounded-lg overflow-hidden border border-neutral-700 dark:border-neutral-800">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {days.map((day, idx) => {
            const { x, y } = getStarPosition(idx)
            const dayEvents = eventsForDay(day)
            if (dayEvents.length === 0) return null

            // connect to next day with events
            const nextDay = days[idx + 1]
            if (!nextDay) return null
            const nextEvents = eventsForDay(nextDay)
            if (nextEvents.length === 0) return null

            const { x: nx, y: ny } = getStarPosition(idx + 1)

            return (
              <line
                key={`line-${idx}`}
                x1={x}
                y1={y}
                x2={nx}
                y2={ny}
                stroke="white"
                strokeWidth="1"
                opacity="0.4"
              />
            )
          })}
        </svg>

        {days.map((day, idx) => {
          const { x, y } = getStarPosition(idx)
          const dayEvents = eventsForDay(day)
          const hasEvents = dayEvents.length > 0

          return (
            <Popover key={day.toISOString()}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute w-6 h-6 flex items-center justify-center rounded-full text-[10px] cursor-pointer transition-colors ${
                    hasEvents
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-neutral-500 text-white dark:bg-neutral-700 dark:text-neutral-200"
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {format(day, "d")}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <Card>
                  <CardContent className="p-2 space-y-2 text-sm">
                    <div className="font-medium">{format(day, "PPP")}</div>
                    {dayEvents.length === 0 && (
                      <div className="text-xs text-muted-foreground">
                        No events
                      </div>
                    )}
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex justify-between items-center"
                      >
                        <span>{ev.title}</span>
                        {onRemoveEvent && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => onRemoveEvent(ev.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
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

      {/* Add Event */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
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
