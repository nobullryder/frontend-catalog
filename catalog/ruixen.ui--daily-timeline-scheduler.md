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
daily-timeline-scheduler.tsx
"use client"

import * as React from "react"
import { format, setHours, setMinutes } from "date-fns"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Trash2, Pencil } from "lucide-react"

type Event = {
  title: string
  time: Date
}

type DailyTimelineProps = {
  startHour?: number // e.g. 6 for 6AM
  endHour?: number // e.g. 20 for 8PM
  stepMinutes?: number // e.g. 60 (hourly), 30, 15
  initialEvents?: Event[]
  title?: string
}

export default function DailyTimelineScheduler({
  startHour = 6,
  endHour = 20,
  stepMinutes = 60,
  initialEvents = [],
  title = "Daily Timeline",
}: DailyTimelineProps) {
  const [events, setEvents] = React.useState<Event[]>(initialEvents)
  const [selectedHour, setSelectedHour] = React.useState<number | null>(null)
  const [eventTitle, setEventTitle] = React.useState("")
  const [eventMinute, setEventMinute] = React.useState("00")
  const [ampm, setAmpm] = React.useState("AM")
  const [editIndex, setEditIndex] = React.useState<number | null>(null)

  const timeSlots: { hour: number; minute: number }[] = []
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      timeSlots.push({ hour: h, minute: m })
    }
  }

  const saveEvent = () => {
    if (selectedHour === null || !eventTitle) return

    let hour = selectedHour
    if (ampm === "PM" && hour < 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0

    const newTime = setMinutes(setHours(new Date(), hour), parseInt(eventMinute))

    if (editIndex !== null) {
      const updated = [...events]
      updated[editIndex] = { title: eventTitle, time: newTime }
      setEvents(updated)
      setEditIndex(null)
    } else {
      setEvents((prev) => [...prev, { title: eventTitle, time: newTime }])
    }

    setEventTitle("")
    setEventMinute("00")
    setAmpm("AM")
    setSelectedHour(null)
  }

  const deleteEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index))
  }

  const startEdit = (index: number) => {
    const ev = events[index]
    setEventTitle(ev.title)
    setEventMinute(format(ev.time, "mm"))
    let h = parseInt(format(ev.time, "hh"))
    let a = format(ev.time, "a") as "AM" | "PM"
    setSelectedHour(h)
    setAmpm(a)
    setEditIndex(index)
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y max-h-[400px] overflow-y-auto">
          {timeSlots.map(({ hour, minute }, idx) => {
            const timeLabel = format(
              setMinutes(setHours(new Date(), hour), minute),
              "h:mm a"
            )
            const eventsAtTime = events.filter(
              (e) => format(e.time, "h:mm a") === timeLabel
            )
            return (
              <div key={idx} className="py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{timeLabel}</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedHour(hour > 12 ? hour - 12 : hour)
                          setAmpm(hour >= 12 ? "PM" : "AM")
                          setEditIndex(null)
                        }}
                      >
                        + Add
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 space-y-3">
                      <Input
                        placeholder="Event title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                      />
                      <div className="flex items-center gap-2">
                        <Select
                          value={eventMinute}
                          onValueChange={setEventMinute}
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["00", "15", "30", "45"].map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={ampm} onValueChange={setAmpm}>
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full" onClick={saveEvent}>
                        {editIndex !== null ? "Update Event" : "Save Event"}
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mt-2 space-y-2">
                  {eventsAtTime.map((ev, i) => {
                    const index = events.findIndex(
                      (e) =>
                        e.title === ev.title &&
                        format(e.time, "h:mm a") === format(ev.time, "h:mm a")
                    )
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-md border p-2 text-sm"
                      >
                        <span>
                          {format(ev.time, "h:mm a")} - {ev.title}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => startEdit(index)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteEvent(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}


code.demo.1757758441803.tsx
import DailyTimelineScheduler from "@/components/ui/daily-timeline-scheduler";

export default function DemoOne() {
  return <DailyTimelineScheduler />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/daily-timeline-scheduler.tsx
"use client"

import * as React from "react"
import { format, setHours, setMinutes } from "date-fns"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Trash2, Pencil } from "lucide-react"

type Event = {
  title: string
  time: Date
}

type DailyTimelineProps = {
  startHour?: number // e.g. 6 for 6AM
  endHour?: number // e.g. 20 for 8PM
  stepMinutes?: number // e.g. 60 (hourly), 30, 15
  initialEvents?: Event[]
  title?: string
}

export default function DailyTimelineScheduler({
  startHour = 6,
  endHour = 20,
  stepMinutes = 60,
  initialEvents = [],
  title = "Daily Timeline",
}: DailyTimelineProps) {
  const [events, setEvents] = React.useState<Event[]>(initialEvents)
  const [selectedHour, setSelectedHour] = React.useState<number | null>(null)
  const [eventTitle, setEventTitle] = React.useState("")
  const [eventMinute, setEventMinute] = React.useState("00")
  const [ampm, setAmpm] = React.useState("AM")
  const [editIndex, setEditIndex] = React.useState<number | null>(null)

  const timeSlots: { hour: number; minute: number }[] = []
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      timeSlots.push({ hour: h, minute: m })
    }
  }

  const saveEvent = () => {
    if (selectedHour === null || !eventTitle) return

    let hour = selectedHour
    if (ampm === "PM" && hour < 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0

    const newTime = setMinutes(setHours(new Date(), hour), parseInt(eventMinute))

    if (editIndex !== null) {
      const updated = [...events]
      updated[editIndex] = { title: eventTitle, time: newTime }
      setEvents(updated)
      setEditIndex(null)
    } else {
      setEvents((prev) => [...prev, { title: eventTitle, time: newTime }])
    }

    setEventTitle("")
    setEventMinute("00")
    setAmpm("AM")
    setSelectedHour(null)
  }

  const deleteEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index))
  }

  const startEdit = (index: number) => {
    const ev = events[index]
    setEventTitle(ev.title)
    setEventMinute(format(ev.time, "mm"))
    let h = parseInt(format(ev.time, "hh"))
    let a = format(ev.time, "a") as "AM" | "PM"
    setSelectedHour(h)
    setAmpm(a)
    setEditIndex(index)
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y max-h-[400px] overflow-y-auto">
          {timeSlots.map(({ hour, minute }, idx) => {
            const timeLabel = format(
              setMinutes(setHours(new Date(), hour), minute),
              "h:mm a"
            )
            const eventsAtTime = events.filter(
              (e) => format(e.time, "h:mm a") === timeLabel
            )
            return (
              <div key={idx} className="py-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{timeLabel}</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedHour(hour > 12 ? hour - 12 : hour)
                          setAmpm(hour >= 12 ? "PM" : "AM")
                          setEditIndex(null)
                        }}
                      >
                        + Add
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 space-y-3">
                      <Input
                        placeholder="Event title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                      />
                      <div className="flex items-center gap-2">
                        <Select
                          value={eventMinute}
                          onValueChange={setEventMinute}
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {["00", "15", "30", "45"].map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={ampm} onValueChange={setAmpm}>
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full" onClick={saveEvent}>
                        {editIndex !== null ? "Update Event" : "Save Event"}
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mt-2 space-y-2">
                  {eventsAtTime.map((ev, i) => {
                    const index = events.findIndex(
                      (e) =>
                        e.title === ev.title &&
                        format(e.time, "h:mm a") === format(ev.time, "h:mm a")
                    )
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-md border p-2 text-sm"
                      >
                        <span>
                          {format(ev.time, "h:mm a")} - {ev.title}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => startEdit(index)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteEvent(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

```

Install NPM dependencies:
```bash
date-fns, lucide-react
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
