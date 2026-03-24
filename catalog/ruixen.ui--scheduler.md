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
scheduler.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit2 } from "lucide-react"

type Event = {
  id: number
  date: Date
  time: string
}

export default function Scheduler() {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string>("12")
  const [selectedMinute, setSelectedMinute] = useState<string>("00")
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const handleSave = () => {
    if (!selectedDate) return
    const time = `${selectedHour}:${selectedMinute}`

    if (editingEvent) {
      setEvents(events.map(ev => 
        ev.id === editingEvent.id ? { ...ev, date: selectedDate, time } : ev
      ))
      setEditingEvent(null)
    } else {
      setEvents([...events, { id: Date.now(), date: selectedDate, time }])
    }

    setSelectedDate(undefined)
    setSelectedHour("12")
    setSelectedMinute("00")
    setOpen(false)
  }

  const handleEdit = (event: Event) => {
    setSelectedDate(new Date(event.date))
    const [hour, minute] = event.time.split(":")
    setSelectedHour(hour)
    setSelectedMinute(minute)
    setEditingEvent(event)
    setOpen(true)
  }

  const handleDelete = (id: number) => {
    setEvents(events.filter(ev => ev.id !== id))
  }

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {editingEvent ? "Edit Event" : "Schedule Event"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" side="bottom" align="start">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />

            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <Label>Hour</Label>
                <Select value={selectedHour} onValueChange={setSelectedHour}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <Label>Minute</Label>
                <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["00", "15", "30", "45"].map(min => (
                      <SelectItem key={min} value={min}>
                        {min}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              {editingEvent ? "Update Event" : "Add Event"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="grid gap-2">
        {events.length === 0 && (
          <p className="text-sm text-muted-foreground">No events scheduled.</p>
        )}

        {events.map(ev => (
          <Card key={ev.id} className="flex items-center justify-between p-3">
            <CardContent className="p-0">
              <p className="font-medium">{ev.date.toDateString()}</p>
              <p className="text-sm text-muted-foreground">at {ev.time}</p>
            </CardContent>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(ev)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(ev.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


code.demo.1757757635933.tsx
import Scheduler from "@/components/ui/scheduler";

export default function DemoOne() {
  return <Scheduler />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scheduler.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit2 } from "lucide-react"

type Event = {
  id: number
  date: Date
  time: string
}

export default function Scheduler() {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string>("12")
  const [selectedMinute, setSelectedMinute] = useState<string>("00")
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const handleSave = () => {
    if (!selectedDate) return
    const time = `${selectedHour}:${selectedMinute}`

    if (editingEvent) {
      setEvents(events.map(ev => 
        ev.id === editingEvent.id ? { ...ev, date: selectedDate, time } : ev
      ))
      setEditingEvent(null)
    } else {
      setEvents([...events, { id: Date.now(), date: selectedDate, time }])
    }

    setSelectedDate(undefined)
    setSelectedHour("12")
    setSelectedMinute("00")
    setOpen(false)
  }

  const handleEdit = (event: Event) => {
    setSelectedDate(new Date(event.date))
    const [hour, minute] = event.time.split(":")
    setSelectedHour(hour)
    setSelectedMinute(minute)
    setEditingEvent(event)
    setOpen(true)
  }

  const handleDelete = (id: number) => {
    setEvents(events.filter(ev => ev.id !== id))
  }

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {editingEvent ? "Edit Event" : "Schedule Event"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" side="bottom" align="start">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />

            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <Label>Hour</Label>
                <Select value={selectedHour} onValueChange={setSelectedHour}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2">
                <Label>Minute</Label>
                <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["00", "15", "30", "45"].map(min => (
                      <SelectItem key={min} value={min}>
                        {min}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              {editingEvent ? "Update Event" : "Add Event"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="grid gap-2">
        {events.length === 0 && (
          <p className="text-sm text-muted-foreground">No events scheduled.</p>
        )}

        {events.map(ev => (
          <Card key={ev.id} className="flex items-center justify-between p-3">
            <CardContent className="p-0">
              <p className="font-medium">{ev.date.toDateString()}</p>
              <p className="text-sm text-muted-foreground">at {ev.time}</p>
            </CardContent>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(ev)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(ev.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
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
