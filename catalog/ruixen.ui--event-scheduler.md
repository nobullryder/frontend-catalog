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
event-scheduler.tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, PlusCircle, CalendarDays, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function EventScheduler() {
  const [date, setDate] = React.useState<Date>()
  const [hour, setHour] = React.useState("12")
  const [minute, setMinute] = React.useState("00")
  const [ampm, setAmpm] = React.useState("AM")
  const [title, setTitle] = React.useState("")
  const [events, setEvents] = React.useState<{ id: number; title: string; date: Date }[]>([])

  // Combine date + time into one datetime
  const selectedDateTime = React.useMemo(() => {
    if (!date) return null
    const d = new Date(date)
    let h = parseInt(hour)
    if (ampm === "PM" && h < 12) h += 12
    if (ampm === "AM" && h === 12) h = 0
    d.setHours(h, parseInt(minute), 0, 0)
    return d
  }, [date, hour, minute, ampm])

  // Add event
  const handleAddEvent = () => {
    if (!title || !selectedDateTime) return
    setEvents((prev) => [
      ...prev,
      { id: Date.now(), title, date: selectedDateTime },
    ])
    setTitle("")
    setDate(undefined)
    setHour("12")
    setMinute("00")
    setAmpm("AM")
  }

  // Delete event
  const handleDeleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id))
  }

  return (
    <div className="grid md:grid-cols-2 gap-1">
      {/* Event Creation */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="p-3">
          <CardTitle className="flex items-center gap-2 text-normal">
            <CalendarDays className="h-5 w-5 text-primary" />
            Create Event
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-3">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Event Title</label>
            <Input
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-1 justify-center">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[250px] justify-start text-left font-normal w-full",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-4"
                side="bottom"
                align="start"
                sideOffset={6}
                alignOffset={0}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Time</label>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const h = i + 1
                    return (
                      <SelectItem key={h} value={h.toString().padStart(2, "0")}>
                        {h.toString().padStart(2, "0")}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <span className="font-semibold">:</span>

              <Select value={minute} onValueChange={setMinute}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="MM" />
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
          </div>

          {/* Add Button */}
          <Button
            onClick={handleAddEvent}
            disabled={!title || !selectedDateTime}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Add Event
          </Button>
        </CardContent>
      </Card>

      {/* Event List */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Scheduled Events</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {events.length === 0 && (
            <p className="text-sm text-muted-foreground">No events scheduled</p>
          )}
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex justify-between items-center border rounded-lg px-3 py-2"
            >
              <div>
                <span className="font-medium block">{ev.title}</span>
                <span className="text-sm text-muted-foreground">
                  {format(ev.date, "PPP p")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteEvent(ev.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}


code.demo.1757754963390.tsx
import EventScheduler from "@/components/ui/event-scheduler";

export default function DemoOne() {
  return <EventScheduler />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/event-scheduler.tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, PlusCircle, CalendarDays, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function EventScheduler() {
  const [date, setDate] = React.useState<Date>()
  const [hour, setHour] = React.useState("12")
  const [minute, setMinute] = React.useState("00")
  const [ampm, setAmpm] = React.useState("AM")
  const [title, setTitle] = React.useState("")
  const [events, setEvents] = React.useState<{ id: number; title: string; date: Date }[]>([])

  // Combine date + time into one datetime
  const selectedDateTime = React.useMemo(() => {
    if (!date) return null
    const d = new Date(date)
    let h = parseInt(hour)
    if (ampm === "PM" && h < 12) h += 12
    if (ampm === "AM" && h === 12) h = 0
    d.setHours(h, parseInt(minute), 0, 0)
    return d
  }, [date, hour, minute, ampm])

  // Add event
  const handleAddEvent = () => {
    if (!title || !selectedDateTime) return
    setEvents((prev) => [
      ...prev,
      { id: Date.now(), title, date: selectedDateTime },
    ])
    setTitle("")
    setDate(undefined)
    setHour("12")
    setMinute("00")
    setAmpm("AM")
  }

  // Delete event
  const handleDeleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id))
  }

  return (
    <div className="grid md:grid-cols-2 gap-1">
      {/* Event Creation */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="p-3">
          <CardTitle className="flex items-center gap-2 text-normal">
            <CalendarDays className="h-5 w-5 text-primary" />
            Create Event
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-3">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Event Title</label>
            <Input
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-1 justify-center">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[250px] justify-start text-left font-normal w-full",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-4"
                side="bottom"
                align="start"
                sideOffset={6}
                alignOffset={0}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Time</label>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const h = i + 1
                    return (
                      <SelectItem key={h} value={h.toString().padStart(2, "0")}>
                        {h.toString().padStart(2, "0")}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <span className="font-semibold">:</span>

              <Select value={minute} onValueChange={setMinute}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="MM" />
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
          </div>

          {/* Add Button */}
          <Button
            onClick={handleAddEvent}
            disabled={!title || !selectedDateTime}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Add Event
          </Button>
        </CardContent>
      </Card>

      {/* Event List */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Scheduled Events</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {events.length === 0 && (
            <p className="text-sm text-muted-foreground">No events scheduled</p>
          )}
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex justify-between items-center border rounded-lg px-3 py-2"
            >
              <div>
                <span className="font-medium block">{ev.title}</span>
                <span className="text-sm text-muted-foreground">
                  {format(ev.date, "PPP p")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteEvent(ev.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
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
