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
monthly-heatmap-calendar.tsx
"use client"

import * as React from "react"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
} from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

export default function MonthlyHeatmapCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [events, setEvents] = React.useState<{ [key: string]: { time: string; title: string }[] }>({})
  const [eventTitle, setEventTitle] = React.useState("")
  const [eventHour, setEventHour] = React.useState("12")
  const [eventMinute, setEventMinute] = React.useState("00")
  const [ampm, setAmpm] = React.useState("AM")

  // Build month grid
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const rows = []
  let days: JSX.Element[] = []
  let day = startDate

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day
      const key = format(cloneDay, "yyyy-MM-dd")
      const hasEvents = events[key]?.length > 0

      days.push(
        <div
          key={cloneDay.toString()}
          className={`border h-10 mb-2 flex items-start justify-center cursor-pointer relative rounded-md ${
            !isSameMonth(cloneDay, monthStart) ? "bg-muted/20 text-muted-foreground" : "bg-background"
          }`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-full flex items-start justify-center text-sm p-2"
              >
                {format(cloneDay, "d")}
                {hasEvents && (
                  <Badge
                    variant="default"
                    className="absolute top-1 right-1 h-2 w-2 rounded-full p-0"
                  ></Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-3">
              <h4 className="font-medium">{format(cloneDay, "PPP")}</h4>
              <Input
                placeholder="Event title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <div className="flex gap-2 items-center">
                <Select value={eventHour} onValueChange={setEventHour}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const h = (i + 1).toString().padStart(2, "0")
                      return (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <span>:</span>

                <Select value={eventMinute} onValueChange={setEventMinute}>
                  <SelectTrigger className="w-[70px]">
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
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  if (!eventTitle) return
                  const time = `${eventHour}:${eventMinute} ${ampm}`
                  const newEvent = { time, title: eventTitle }
                  setEvents((prev) => ({
                    ...prev,
                    [key]: [...(prev[key] || []), newEvent],
                  }))
                  setEventTitle("")
                }}
              >
                Save Event
              </Button>

              <div className="space-y-2">
                {events[key]?.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <span>
                      {event.time} - {event.title}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEvents((prev) => {
                          const updated = [...(prev[key] || [])]
                          updated.splice(index, 1)
                          return { ...prev, [key]: updated }
                        })
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div className="grid grid-cols-7 gap-2" key={day.toString()}>
        {days}
      </div>
    )
    days = []
  }

  // Month and Year Selectors
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const years = Array.from({ length: 21 }, (_, i) => 2015 + i)

  return (
    <Card className="p-2">
      <CardContent className="p-2">
        <div className="flex justify-between items-center mb-2">
          {/* Month Selector */}
          <Select
            value={currentMonth.getMonth().toString()}
            onValueChange={(val) => {
              const newDate = new Date(currentMonth)
              newDate.setMonth(parseInt(val))
              setCurrentMonth(newDate)
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue>{months[currentMonth.getMonth()]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((m, i) => (
                <SelectItem key={m} value={i.toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Selector */}
          <Select
            value={currentMonth.getFullYear().toString()}
            onValueChange={(val) => {
              const newDate = new Date(currentMonth)
              newDate.setFullYear(parseInt(val))
              setCurrentMonth(newDate)
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue>{currentMonth.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {rows}
      </CardContent>
    </Card>
  )
}


code.demo.1757759493230.tsx
import MonthlyHeatmapCalendar from "@/components/ui/monthly-heatmap-calendar";

export default function DemoOne() {
  return <MonthlyHeatmapCalendar />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/monthly-heatmap-calendar.tsx
"use client"

import * as React from "react"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
} from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

export default function MonthlyHeatmapCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [events, setEvents] = React.useState<{ [key: string]: { time: string; title: string }[] }>({})
  const [eventTitle, setEventTitle] = React.useState("")
  const [eventHour, setEventHour] = React.useState("12")
  const [eventMinute, setEventMinute] = React.useState("00")
  const [ampm, setAmpm] = React.useState("AM")

  // Build month grid
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const rows = []
  let days: JSX.Element[] = []
  let day = startDate

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day
      const key = format(cloneDay, "yyyy-MM-dd")
      const hasEvents = events[key]?.length > 0

      days.push(
        <div
          key={cloneDay.toString()}
          className={`border h-10 mb-2 flex items-start justify-center cursor-pointer relative rounded-md ${
            !isSameMonth(cloneDay, monthStart) ? "bg-muted/20 text-muted-foreground" : "bg-background"
          }`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-full flex items-start justify-center text-sm p-2"
              >
                {format(cloneDay, "d")}
                {hasEvents && (
                  <Badge
                    variant="default"
                    className="absolute top-1 right-1 h-2 w-2 rounded-full p-0"
                  ></Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-3">
              <h4 className="font-medium">{format(cloneDay, "PPP")}</h4>
              <Input
                placeholder="Event title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <div className="flex gap-2 items-center">
                <Select value={eventHour} onValueChange={setEventHour}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const h = (i + 1).toString().padStart(2, "0")
                      return (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <span>:</span>

                <Select value={eventMinute} onValueChange={setEventMinute}>
                  <SelectTrigger className="w-[70px]">
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
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  if (!eventTitle) return
                  const time = `${eventHour}:${eventMinute} ${ampm}`
                  const newEvent = { time, title: eventTitle }
                  setEvents((prev) => ({
                    ...prev,
                    [key]: [...(prev[key] || []), newEvent],
                  }))
                  setEventTitle("")
                }}
              >
                Save Event
              </Button>

              <div className="space-y-2">
                {events[key]?.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <span>
                      {event.time} - {event.title}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEvents((prev) => {
                          const updated = [...(prev[key] || [])]
                          updated.splice(index, 1)
                          return { ...prev, [key]: updated }
                        })
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div className="grid grid-cols-7 gap-2" key={day.toString()}>
        {days}
      </div>
    )
    days = []
  }

  // Month and Year Selectors
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const years = Array.from({ length: 21 }, (_, i) => 2015 + i)

  return (
    <Card className="p-2">
      <CardContent className="p-2">
        <div className="flex justify-between items-center mb-2">
          {/* Month Selector */}
          <Select
            value={currentMonth.getMonth().toString()}
            onValueChange={(val) => {
              const newDate = new Date(currentMonth)
              newDate.setMonth(parseInt(val))
              setCurrentMonth(newDate)
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue>{months[currentMonth.getMonth()]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((m, i) => (
                <SelectItem key={m} value={i.toString()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Selector */}
          <Select
            value={currentMonth.getFullYear().toString()}
            onValueChange={(val) => {
              const newDate = new Date(currentMonth)
              newDate.setFullYear(parseInt(val))
              setCurrentMonth(newDate)
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue>{currentMonth.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {rows}
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
