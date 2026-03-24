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
event-path-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Trash2 } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

type Event = {
  id: number
  title: string
  date: Date
}

const filterOptions = [
  { value: "last_week", label: "Last Week" },
  { value: "last_month", label: "Last Month" },
  { value: "last_3_months", label: "Last 3 Months" },
  { value: "last_6_months", label: "Last 6 Months" },
]

export function EventPathCalendar() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [title, setTitle] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [filter, setFilter] = React.useState<string>("last_month")

  const addEvent = () => {
    if (!title || !selectedDate) return
    setEvents([...events, { id: Date.now(), title, date: selectedDate }])
    setTitle("")
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id))
  }

  // Filter events based on selected filter
  const getFilteredEvents = () => {
    const now = new Date()
    let startDate = new Date()
    switch (filter) {
      case "last_week":
        startDate.setDate(now.getDate() - 7)
        break
      case "last_month":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "last_3_months":
        startDate.setMonth(now.getMonth() - 3)
        break
      case "last_6_months":
        startDate.setMonth(now.getMonth() - 6)
        break
      default:
        startDate = new Date(0)
    }
    return events.filter(ev => ev.date >= startDate && ev.date <= now)
  }

  // Sort events by date
  const sortedEvents = [...getFilteredEvents()].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="flex flex-col gap-6">
      {/* Add Event Form */}
      <Card className="p-2">
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            {/* Event Title */}
            <div className="flex-1 min-w-[200px]">
              <Label>Event Title</Label>
              <Input
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Date Picker */}
            <div className="flex flex-col">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="mt-1 w-[160px]">
                    {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Add Button */}
            <div className="mt-5">
              <Button onClick={addEvent}>Add Event</Button>
            </div>
          </div>

          {/* Filter Selector */}
          <div className="mt-4 w-[200px]">
            <Label>Filter Events</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Event Path */}
      <div className="relative w-full h-48 overflow-x-auto flex items-center gap-8 border dark:border-neutral-700 bg-white dark:bg-black rounded-lg px-4">
        {/* Horizontal path line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-400 dark:bg-white -translate-y-1/2"></div>

        {sortedEvents.map((ev, idx) => (
          <Popover key={ev.id}>
            <PopoverTrigger asChild>
              <div className="relative flex flex-col items-center cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-black dark:bg-white mb-2 flex items-center justify-center text-white dark:text-black text-xs">
                  {idx + 1}
                </div>
                <span className="text-xs text-black dark:text-white">{ev.date.toLocaleDateString()}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="flex flex-col gap-2 text-sm">
                <span className="font-semibold">{ev.title}</span>
                <span>Date: {ev.date.toDateString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => deleteEvent(ev.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  )
}


code.demo.1758806641534.tsx
"use client"

import * as React from "react"
import { EventPathCalendar } from "@/components/ui/event-path-calendar"

export default function EventPathCalendarDemo() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Event Path Calendar Demo</h1>
      <EventPathCalendar />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/event-path-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Trash2 } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

type Event = {
  id: number
  title: string
  date: Date
}

const filterOptions = [
  { value: "last_week", label: "Last Week" },
  { value: "last_month", label: "Last Month" },
  { value: "last_3_months", label: "Last 3 Months" },
  { value: "last_6_months", label: "Last 6 Months" },
]

export function EventPathCalendar() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [title, setTitle] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [filter, setFilter] = React.useState<string>("last_month")

  const addEvent = () => {
    if (!title || !selectedDate) return
    setEvents([...events, { id: Date.now(), title, date: selectedDate }])
    setTitle("")
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id))
  }

  // Filter events based on selected filter
  const getFilteredEvents = () => {
    const now = new Date()
    let startDate = new Date()
    switch (filter) {
      case "last_week":
        startDate.setDate(now.getDate() - 7)
        break
      case "last_month":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "last_3_months":
        startDate.setMonth(now.getMonth() - 3)
        break
      case "last_6_months":
        startDate.setMonth(now.getMonth() - 6)
        break
      default:
        startDate = new Date(0)
    }
    return events.filter(ev => ev.date >= startDate && ev.date <= now)
  }

  // Sort events by date
  const sortedEvents = [...getFilteredEvents()].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="flex flex-col gap-6">
      {/* Add Event Form */}
      <Card className="p-2">
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            {/* Event Title */}
            <div className="flex-1 min-w-[200px]">
              <Label>Event Title</Label>
              <Input
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Date Picker */}
            <div className="flex flex-col">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="mt-1 w-[160px]">
                    {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                </PopoverContent>
              </Popover>
            </div>

            {/* Add Button */}
            <div className="mt-5">
              <Button onClick={addEvent}>Add Event</Button>
            </div>
          </div>

          {/* Filter Selector */}
          <div className="mt-4 w-[200px]">
            <Label>Filter Events</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Event Path */}
      <div className="relative w-full h-48 overflow-x-auto flex items-center gap-8 border dark:border-neutral-700 bg-white dark:bg-black rounded-lg px-4">
        {/* Horizontal path line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-400 dark:bg-white -translate-y-1/2"></div>

        {sortedEvents.map((ev, idx) => (
          <Popover key={ev.id}>
            <PopoverTrigger asChild>
              <div className="relative flex flex-col items-center cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-black dark:bg-white mb-2 flex items-center justify-center text-white dark:text-black text-xs">
                  {idx + 1}
                </div>
                <span className="text-xs text-black dark:text-white">{ev.date.toLocaleDateString()}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="flex flex-col gap-2 text-sm">
                <span className="font-semibold">{ev.title}</span>
                <span>Date: {ev.date.toDateString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => deleteEvent(ev.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
