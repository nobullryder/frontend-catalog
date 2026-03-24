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
chrono-select.tsx
"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select"
import { format } from "date-fns"

interface ChronoSelectProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  yearRange?: [number, number] // e.g. [2000, 2030]
}

export function ChronoSelect({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  yearRange = [1970, 2050],
}: ChronoSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Date | undefined>(value)
  const [month, setMonth] = React.useState<Date>(selected ?? new Date())

  // years array
  const years = React.useMemo(() => {
    const [start, end] = yearRange
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [yearRange])

  const handleSelect = (date: Date | undefined) => {
    setSelected(date)
    setOpen(false)
    onChange?.(date)
  }

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year)
    const newDate = new Date(month)
    newDate.setFullYear(newYear)
    setMonth(newDate)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-2 space-y-2 w-auto">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-medium">
            {format(month, "MMMM")}
          </span>
          <Select
            defaultValue={String(month.getFullYear())}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="h-7 w-[90px] text-xs">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}


code.demo.1758924114445.tsx
"use client"

import * as React from "react"
import { ChronoSelect } from "@/components/ui/chrono-select"

export default function ChronoSelectDemo() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-xl font-semibold">Date Picker Demo</h1>

      <ChronoSelect
        value={date}
        onChange={setDate}
        yearRange={[1990, 2035]}
      />

      {date && (
        <p className="text-sm text-muted-foreground">
          You selected: {date.toDateString()}
        </p>
      )}
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/chrono-select.tsx
"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select"
import { format } from "date-fns"

interface ChronoSelectProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  yearRange?: [number, number] // e.g. [2000, 2030]
}

export function ChronoSelect({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  yearRange = [1970, 2050],
}: ChronoSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Date | undefined>(value)
  const [month, setMonth] = React.useState<Date>(selected ?? new Date())

  // years array
  const years = React.useMemo(() => {
    const [start, end] = yearRange
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [yearRange])

  const handleSelect = (date: Date | undefined) => {
    setSelected(date)
    setOpen(false)
    onChange?.(date)
  }

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year)
    const newDate = new Date(month)
    newDate.setFullYear(newYear)
    setMonth(newDate)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-2 space-y-2 w-auto">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-medium">
            {format(month, "MMMM")}
          </span>
          <Select
            defaultValue={String(month.getFullYear())}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="h-7 w-[90px] text-xs">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
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
