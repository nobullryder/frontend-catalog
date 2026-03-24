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
origami-fold-out-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

type Event = {
  id: number
  title: string
  date: Date
}

export function OrigamiFoldOutCalendar() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [title, setTitle] = React.useState("")
  const [displayedMonth, setDisplayedMonth] = React.useState<Date>(new Date())

  const addEvent = () => {
    if (!title || !selectedDate) return
    setEvents([...events, { id: Date.now(), title, date: selectedDate }])
    setTitle("")
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const eventsByDate = (date: Date) =>
    events.filter((e) => e.date.toDateString() === date.toDateString())

  // update displayed month when user picks new date
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  // calculate days in displayed month
  const year = displayedMonth.getFullYear()
  const month = displayedMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return (
    <div className="flex flex-col gap-6">
      {/* Add Event */}
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <Label>Event Title</Label>
            <Input
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="mt-1 w-[160px]">
                  {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={displayedMonth}
                  onMonthChange={setDisplayedMonth}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-5">
            <Button onClick={addEvent}>
              <Plus className="w-4 h-4 mr-1" /> Add Event
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Origami Fold-Out View */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">
            {displayedMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <div className="h-[500px] overflow-y-auto pr-2">
            <Accordion type="single" collapsible className="w-full">
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = new Date(year, month, i + 1)
                const dayEvents = eventsByDate(day)

                return (
                  <AccordionItem
                    key={i}
                    value={`day-${i}`}
                    className="border rounded-lg mb-2 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-2 text-lg font-semibold">
                      Day {i + 1} — {day.toDateString()}{" "}
                      {dayEvents.length > 0 && `(${dayEvents.length} events)`}
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/40 p-4 space-y-2">
                      {dayEvents.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No events</p>
                      ) : (
                        dayEvents.map((ev) => (
                          <Card
                            key={ev.id}
                            className="shadow-sm border border-dashed relative transition-transform hover:scale-[1.01]"
                          >
                            <CardContent className="flex justify-between items-center p-3">
                              <span className="font-medium">{ev.title}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteEvent(ev.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


code.demo.1758818929724.tsx
import { OrigamiFoldOutCalendar } from "@/components/ui/origami-fold-out-calendar"

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Origami Fold-Out Calendar</h1>
      <OrigamiFoldOutCalendar />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/origami-fold-out-calendar.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

type Event = {
  id: number
  title: string
  date: Date
}

export function OrigamiFoldOutCalendar() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [title, setTitle] = React.useState("")
  const [displayedMonth, setDisplayedMonth] = React.useState<Date>(new Date())

  const addEvent = () => {
    if (!title || !selectedDate) return
    setEvents([...events, { id: Date.now(), title, date: selectedDate }])
    setTitle("")
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const eventsByDate = (date: Date) =>
    events.filter((e) => e.date.toDateString() === date.toDateString())

  // update displayed month when user picks new date
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  // calculate days in displayed month
  const year = displayedMonth.getFullYear()
  const month = displayedMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return (
    <div className="flex flex-col gap-6">
      {/* Add Event */}
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <Label>Event Title</Label>
            <Input
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="mt-1 w-[160px]">
                  {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={displayedMonth}
                  onMonthChange={setDisplayedMonth}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-5">
            <Button onClick={addEvent}>
              <Plus className="w-4 h-4 mr-1" /> Add Event
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Origami Fold-Out View */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">
            {displayedMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <div className="h-[500px] overflow-y-auto pr-2">
            <Accordion type="single" collapsible className="w-full">
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = new Date(year, month, i + 1)
                const dayEvents = eventsByDate(day)

                return (
                  <AccordionItem
                    key={i}
                    value={`day-${i}`}
                    className="border rounded-lg mb-2 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-2 text-lg font-semibold">
                      Day {i + 1} — {day.toDateString()}{" "}
                      {dayEvents.length > 0 && `(${dayEvents.length} events)`}
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/40 p-4 space-y-2">
                      {dayEvents.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No events</p>
                      ) : (
                        dayEvents.map((ev) => (
                          <Card
                            key={ev.id}
                            className="shadow-sm border border-dashed relative transition-transform hover:scale-[1.01]"
                          >
                            <CardContent className="flex justify-between items-center p-3">
                              <span className="font-medium">{ev.title}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteEvent(ev.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </CardContent>
      </Card>
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
