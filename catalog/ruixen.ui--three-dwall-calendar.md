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
three-dwall-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO
}

interface ThreeDWallCalendarProps {
  events: CalendarEvent[]
  onAddEvent?: (e: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
  panelWidth?: number
  panelHeight?: number
  columns?: number
}

export function ThreeDWallCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
  panelWidth = 160,
  panelHeight = 120,
  columns = 7,
}: ThreeDWallCalendarProps) {
  const [dateRef, setDateRef] = React.useState<Date>(new Date())
  const [title, setTitle] = React.useState("")
  const [newDate, setNewDate] = React.useState("")
  const wallRef = React.useRef<HTMLDivElement | null>(null)

  // 3D tilt state
  const [tiltX, setTiltX] = React.useState(18)
  const [tiltY, setTiltY] = React.useState(0)
  const isDragging = React.useRef(false)
  const dragStart = React.useRef<{ x: number; y: number } | null>(null)

  // month days
  const days = eachDayOfInterval({
    start: startOfMonth(dateRef),
    end: endOfMonth(dateRef),
  })

  const eventsForDay = (d: Date) =>
    events.filter((ev) => format(new Date(ev.date), "yyyy-MM-dd") === format(d, "yyyy-MM-dd"))

  // Add event handler
  const handleAdd = () => {
    if (!title.trim() || !newDate) return
    onAddEvent?.({
      id: uuidv4(),
      title: title.trim(),
      date: new Date(newDate).toISOString(),
    })
    setTitle("")
    setNewDate("")
  }

  // wheel tilt
  const onWheel = (e: React.WheelEvent) => {
    setTiltX((t) => Math.max(0, Math.min(50, t + e.deltaY * 0.02)))
    setTiltY((t) => Math.max(-45, Math.min(45, t + e.deltaX * 0.05)))
  }

  // drag tilt
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId) // ✅ Correct element
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setTiltY((t) => Math.max(-60, Math.min(60, t + dx * 0.1)))
    setTiltX((t) => Math.max(0, Math.min(60, t - dy * 0.1)))
    dragStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = () => {
    isDragging.current = false
    dragStart.current = null
  }

  const gap = 12
  const rowCount = Math.ceil(days.length / columns)
  const wallCenterRow = (rowCount - 1) / 2

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Button onClick={() => setDateRef((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>
          Prev Month
        </Button>
        <div className="font-semibold">{format(dateRef, "MMMM yyyy")}</div>
        <Button onClick={() => setDateRef((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>
          Next Month
        </Button>
      </div>

      {/* Wall container */}
      <div
        ref={wallRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="w-full overflow-auto"
        style={{ perspective: 1200 }}
      >
        <div
          className="mx-auto"
          style={{
            width: columns * (panelWidth + gap),
            transformStyle: "preserve-3d",
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: "transform 120ms linear",
          }}
        >
          <div
            className="relative"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, ${panelWidth}px)`,
              gridAutoRows: `${panelHeight}px`,
              gap: `${gap}px`,
              transformStyle: "preserve-3d",
              padding: gap,
            }}
          >
            {days.map((day, idx) => {
              const row = Math.floor(idx / columns)
              const rowOffset = row - wallCenterRow
              const z = Math.max(-80, 40 - Math.abs(rowOffset) * 20)
              const dayEvents = eventsForDay(day)

              return (
                <div
                  key={day.toISOString()}
                  className="relative"
                  style={{
                    transform: `translateZ(${z}px)`,
                    zIndex: Math.round(100 - Math.abs(rowOffset)),
                  }}
                >
                  <Card className="h-full overflow-visible">
                    <CardContent className="p-3 h-full flex flex-col">
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-medium">{format(day, "d")}</div>
                        <div className="text-xs text-muted-foreground">{format(day, "EEE")}</div>
                      </div>

                      {/* events */}
                      <div className="relative mt-2 flex-1">
                        {dayEvents.map((ev, i) => {
                          const left = 8 + (i * 34) % (panelWidth - 40)
                          const top = 8 + Math.floor((i * 34) / (panelWidth - 40)) * 28
                          return (
                            <Popover key={ev.id}>
                              <PopoverTrigger asChild>
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <div
                                      className="absolute w-7 h-7 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-[10px] cursor-pointer shadow"
                                      style={{ left, top, transform: `translateZ(20px)` }}
                                    >
                                      •
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="text-xs font-medium">
                                    {ev.title}
                                  </HoverCardContent>
                                </HoverCard>
                              </PopoverTrigger>
                              <PopoverContent className="w-48">
                                <Card>
                                  <CardContent className="flex justify-between items-center p-2 text-sm">
                                    <div>
                                      <div className="font-medium">{ev.title}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {format(new Date(ev.date), "PPP p")}
                                      </div>
                                    </div>
                                    {onRemoveEvent && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => onRemoveEvent(ev.id)}
                                      >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    )}
                                  </CardContent>
                                </Card>
                              </PopoverContent>
                            </Popover>
                          )
                        })}
                      </div>

                      <div className="mt-2 text-xs text-muted-foreground">
                        {dayEvents.length} event(s)
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add event form */}
      <div className="flex gap-2 items-center">
        <Input placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <Button onClick={handleAdd}>Add Event</Button>
      </div>
    </div>
  )
}


code.demo.1758743855341.tsx
"use client"

import * as React from "react"
import { ThreeDWallCalendar, CalendarEvent } from "@/components/ui/three-dwall-calendar"
import { v4 as uuidv4 } from "uuid"

export default function Demo3DWallCalendar() {
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    { id: uuidv4(), title: "Sprint Planning", date: new Date().toISOString() },
    { id: uuidv4(), title: "Design Handoff", date: new Date(new Date().getTime() + 24*60*60*1000).toISOString() },
    { id: uuidv4(), title: "Demo", date: new Date(new Date().getTime() + 3*24*60*60*1000).toISOString() },
  ])

  const addEvent = (ev: CalendarEvent) => setEvents((p) => [...p, ev])
  const removeEvent = (id: string) => setEvents((p) => p.filter(e => e.id !== id))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">3D Wall Calendar Demo</h1>
      <ThreeDWallCalendar events={events} onAddEvent={addEvent} onRemoveEvent={removeEvent} />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/three-dwall-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns"

export type CalendarEvent = {
  id: string
  title: string
  date: string // ISO
}

interface ThreeDWallCalendarProps {
  events: CalendarEvent[]
  onAddEvent?: (e: CalendarEvent) => void
  onRemoveEvent?: (id: string) => void
  panelWidth?: number
  panelHeight?: number
  columns?: number
}

export function ThreeDWallCalendar({
  events,
  onAddEvent,
  onRemoveEvent,
  panelWidth = 160,
  panelHeight = 120,
  columns = 7,
}: ThreeDWallCalendarProps) {
  const [dateRef, setDateRef] = React.useState<Date>(new Date())
  const [title, setTitle] = React.useState("")
  const [newDate, setNewDate] = React.useState("")
  const wallRef = React.useRef<HTMLDivElement | null>(null)

  // 3D tilt state
  const [tiltX, setTiltX] = React.useState(18)
  const [tiltY, setTiltY] = React.useState(0)
  const isDragging = React.useRef(false)
  const dragStart = React.useRef<{ x: number; y: number } | null>(null)

  // month days
  const days = eachDayOfInterval({
    start: startOfMonth(dateRef),
    end: endOfMonth(dateRef),
  })

  const eventsForDay = (d: Date) =>
    events.filter((ev) => format(new Date(ev.date), "yyyy-MM-dd") === format(d, "yyyy-MM-dd"))

  // Add event handler
  const handleAdd = () => {
    if (!title.trim() || !newDate) return
    onAddEvent?.({
      id: uuidv4(),
      title: title.trim(),
      date: new Date(newDate).toISOString(),
    })
    setTitle("")
    setNewDate("")
  }

  // wheel tilt
  const onWheel = (e: React.WheelEvent) => {
    setTiltX((t) => Math.max(0, Math.min(50, t + e.deltaY * 0.02)))
    setTiltY((t) => Math.max(-45, Math.min(45, t + e.deltaX * 0.05)))
  }

  // drag tilt
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId) // ✅ Correct element
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setTiltY((t) => Math.max(-60, Math.min(60, t + dx * 0.1)))
    setTiltX((t) => Math.max(0, Math.min(60, t - dy * 0.1)))
    dragStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = () => {
    isDragging.current = false
    dragStart.current = null
  }

  const gap = 12
  const rowCount = Math.ceil(days.length / columns)
  const wallCenterRow = (rowCount - 1) / 2

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Button onClick={() => setDateRef((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>
          Prev Month
        </Button>
        <div className="font-semibold">{format(dateRef, "MMMM yyyy")}</div>
        <Button onClick={() => setDateRef((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>
          Next Month
        </Button>
      </div>

      {/* Wall container */}
      <div
        ref={wallRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="w-full overflow-auto"
        style={{ perspective: 1200 }}
      >
        <div
          className="mx-auto"
          style={{
            width: columns * (panelWidth + gap),
            transformStyle: "preserve-3d",
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: "transform 120ms linear",
          }}
        >
          <div
            className="relative"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, ${panelWidth}px)`,
              gridAutoRows: `${panelHeight}px`,
              gap: `${gap}px`,
              transformStyle: "preserve-3d",
              padding: gap,
            }}
          >
            {days.map((day, idx) => {
              const row = Math.floor(idx / columns)
              const rowOffset = row - wallCenterRow
              const z = Math.max(-80, 40 - Math.abs(rowOffset) * 20)
              const dayEvents = eventsForDay(day)

              return (
                <div
                  key={day.toISOString()}
                  className="relative"
                  style={{
                    transform: `translateZ(${z}px)`,
                    zIndex: Math.round(100 - Math.abs(rowOffset)),
                  }}
                >
                  <Card className="h-full overflow-visible">
                    <CardContent className="p-3 h-full flex flex-col">
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-medium">{format(day, "d")}</div>
                        <div className="text-xs text-muted-foreground">{format(day, "EEE")}</div>
                      </div>

                      {/* events */}
                      <div className="relative mt-2 flex-1">
                        {dayEvents.map((ev, i) => {
                          const left = 8 + (i * 34) % (panelWidth - 40)
                          const top = 8 + Math.floor((i * 34) / (panelWidth - 40)) * 28
                          return (
                            <Popover key={ev.id}>
                              <PopoverTrigger asChild>
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <div
                                      className="absolute w-7 h-7 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-[10px] cursor-pointer shadow"
                                      style={{ left, top, transform: `translateZ(20px)` }}
                                    >
                                      •
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="text-xs font-medium">
                                    {ev.title}
                                  </HoverCardContent>
                                </HoverCard>
                              </PopoverTrigger>
                              <PopoverContent className="w-48">
                                <Card>
                                  <CardContent className="flex justify-between items-center p-2 text-sm">
                                    <div>
                                      <div className="font-medium">{ev.title}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {format(new Date(ev.date), "PPP p")}
                                      </div>
                                    </div>
                                    {onRemoveEvent && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => onRemoveEvent(ev.id)}
                                      >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    )}
                                  </CardContent>
                                </Card>
                              </PopoverContent>
                            </Popover>
                          )
                        })}
                      </div>

                      <div className="mt-2 text-xs text-muted-foreground">
                        {dayEvents.length} event(s)
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add event form */}
      <div className="flex gap-2 items-center">
        <Input placeholder="Event title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <Button onClick={handleAdd}>Add Event</Button>
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
