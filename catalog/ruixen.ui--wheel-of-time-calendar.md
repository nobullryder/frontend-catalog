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
wheel-of-time-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Trash2 } from "lucide-react"
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
  date: Date
}

interface WheelOfTimeCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (e: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function WheelOfTimeCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: WheelOfTimeCalendarProps) {
  const [rotation, setRotation] = React.useState(0)
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [month, setMonth] = React.useState(new Date().getMonth()) // 0-based

  const radius = 150
  const center = 200

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const segmentCount = daysInMonth
  const segmentAngle = (2 * Math.PI) / segmentCount

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getSegmentPosition = (i: number) => {
    const angle = i * segmentAngle + (rotation * Math.PI) / 180
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  const eventsForSegment = (index: number) => {
    return events.filter(
      (ev) =>
        ev.date.getFullYear() === year &&
        ev.date.getMonth() === month &&
        ev.date.getDate() === index + 1
    )
  }

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0")
    const monthName = monthNames[date.getMonth()].slice(0, 3)
    return `${day} ${monthName} ${date.getFullYear()}`
  }

  const yearOptions = Array.from({ length: 21 }, (_, i) => year - 10 + i)

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Month/Year Select */}
      <div className="flex gap-4 mb-4 flex-wrap justify-center items-center">
        <div className="flex flex-col">
          <span className="font-medium text-sm mb-1">Month</span>
          <Select value={month.toString()} onValueChange={(val) => setMonth(Number(val))}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((name, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm mb-1">Year</span>
          <Select value={year.toString()} onValueChange={(val) => setYear(Number(val))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rotate Controls */}
      <div className="flex gap-2">
        <Button onClick={() => setRotation((r) => r - 15)}>⟲ Rotate Left</Button>
        <Button onClick={() => setRotation((r) => r + 15)}>Rotate Right ⟳</Button>
      </div>

      {/* Wheel */}
      <div className="relative w-[400px] h-[400px] rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {[...Array(segmentCount)].map((_, i) => {
            const startAngle = i * segmentAngle + (rotation * Math.PI) / 180
            const endAngle = startAngle + segmentAngle
            const x1 = center + radius * Math.cos(startAngle)
            const y1 = center + radius * Math.sin(startAngle)
            const x2 = center + radius * Math.cos(endAngle)
            const y2 = center + radius * Math.sin(endAngle)

            return (
              <path
                key={i}
                d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
                fill={i % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            )
          })}
        </svg>

        {[...Array(segmentCount)].map((_, i) => {
          const { x, y } = getSegmentPosition(i)
          const segEvents = eventsForSegment(i)
          return (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-[10px] cursor-pointer transition-colors ${
                    segEvents.length > 0
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-neutral-500 text-white dark:bg-neutral-700 dark:text-neutral-200"
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {i + 1}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <Card>
                  <CardContent className="p-2 space-y-2 text-sm">
                    <div className="font-medium">{formatDate(new Date(year, month, i + 1))}</div>
                    {segEvents.length === 0 && (
                      <div className="text-xs text-muted-foreground">No events</div>
                    )}
                    {segEvents.map((ev) => (
                      <div key={ev.id} className="flex justify-between items-center">
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
    </div>
  )
}


code.demo.1758808852393.tsx
"use client"

import * as React from "react"
import { WheelOfTimeCalendar, CalendarEvent } from "@/components/ui/wheel-of-time-calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"

export default function DemoWheelPage() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([])
  const [title, setTitle] = React.useState("")
  const [day, setDay] = React.useState("")

  const addEvent = (e: CalendarEvent) => {
    setEvents((prev) => [...prev, e])
  }

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  const handleAdd = () => {
    if (!title || !day) return
    addEvent({
      id: uuidv4(),
      title,
      date: new Date(2025, 8, parseInt(day)),
    })
    setTitle("")
    setDay("")
  }

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-2xl font-semibold">🌀 Wheel of Time Calendar</h1>
      <WheelOfTimeCalendar
        events={events}
        onAddEvent={addEvent}
        onRemoveEvent={removeEvent}
        segments={30} // like days in a month
      />

      {/* Add Event */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Day (1-30)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/wheel-of-time-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Trash2 } from "lucide-react"
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
  date: Date
}

interface WheelOfTimeCalendarProps {
  events: CalendarEvent[]
  onAddEvent: (e: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
}

export function WheelOfTimeCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
}: WheelOfTimeCalendarProps) {
  const [rotation, setRotation] = React.useState(0)
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [month, setMonth] = React.useState(new Date().getMonth()) // 0-based

  const radius = 150
  const center = 200

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const segmentCount = daysInMonth
  const segmentAngle = (2 * Math.PI) / segmentCount

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getSegmentPosition = (i: number) => {
    const angle = i * segmentAngle + (rotation * Math.PI) / 180
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  const eventsForSegment = (index: number) => {
    return events.filter(
      (ev) =>
        ev.date.getFullYear() === year &&
        ev.date.getMonth() === month &&
        ev.date.getDate() === index + 1
    )
  }

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0")
    const monthName = monthNames[date.getMonth()].slice(0, 3)
    return `${day} ${monthName} ${date.getFullYear()}`
  }

  const yearOptions = Array.from({ length: 21 }, (_, i) => year - 10 + i)

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Month/Year Select */}
      <div className="flex gap-4 mb-4 flex-wrap justify-center items-center">
        <div className="flex flex-col">
          <span className="font-medium text-sm mb-1">Month</span>
          <Select value={month.toString()} onValueChange={(val) => setMonth(Number(val))}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((name, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm mb-1">Year</span>
          <Select value={year.toString()} onValueChange={(val) => setYear(Number(val))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rotate Controls */}
      <div className="flex gap-2">
        <Button onClick={() => setRotation((r) => r - 15)}>⟲ Rotate Left</Button>
        <Button onClick={() => setRotation((r) => r + 15)}>Rotate Right ⟳</Button>
      </div>

      {/* Wheel */}
      <div className="relative w-[400px] h-[400px] rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {[...Array(segmentCount)].map((_, i) => {
            const startAngle = i * segmentAngle + (rotation * Math.PI) / 180
            const endAngle = startAngle + segmentAngle
            const x1 = center + radius * Math.cos(startAngle)
            const y1 = center + radius * Math.sin(startAngle)
            const x2 = center + radius * Math.cos(endAngle)
            const y2 = center + radius * Math.sin(endAngle)

            return (
              <path
                key={i}
                d={`M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
                fill={i % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            )
          })}
        </svg>

        {[...Array(segmentCount)].map((_, i) => {
          const { x, y } = getSegmentPosition(i)
          const segEvents = eventsForSegment(i)
          return (
            <Popover key={i}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-[10px] cursor-pointer transition-colors ${
                    segEvents.length > 0
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-neutral-500 text-white dark:bg-neutral-700 dark:text-neutral-200"
                  }`}
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {i + 1}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <Card>
                  <CardContent className="p-2 space-y-2 text-sm">
                    <div className="font-medium">{formatDate(new Date(year, month, i + 1))}</div>
                    {segEvents.length === 0 && (
                      <div className="text-xs text-muted-foreground">No events</div>
                    )}
                    {segEvents.map((ev) => (
                      <div key={ev.id} className="flex justify-between items-center">
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
    </div>
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
