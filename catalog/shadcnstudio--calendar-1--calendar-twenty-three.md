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
calendar-1.tsx
'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar mode='single' defaultMonth={date} selected={date} onSelect={setDate} className='rounded-lg border' />
      <p className='text-muted-foreground mt-3 text-center text-xs' role='region'>
        Default Month
      </p>
    </div>
  )
}

export default CalendarDemo


code.demo.1760457561201.tsx
'use client'

import { useState } from 'react'

import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
  addDays,
  addMonths
} from 'date-fns'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const CalendarWithRangePresetsDemo = () => {
  const today = new Date()

  const yesterday = {
    from: subDays(today, 1),
    to: subDays(today, 1)
  }

  const tomorrow = {
    from: today,
    to: addDays(today, 1)
  }

  const last7Days = {
    from: subDays(today, 6),
    to: today
  }

  const next7Days = {
    from: addDays(today, 1),
    to: addDays(today, 7)
  }

  const last30Days = {
    from: subDays(today, 29),
    to: today
  }

  const monthToDate = {
    from: startOfMonth(today),
    to: today
  }

  const lastMonth = {
    from: startOfMonth(subMonths(today, 1)),
    to: endOfMonth(subMonths(today, 1))
  }

  const nextMonth = {
    from: startOfMonth(addMonths(today, 1)),
    to: endOfMonth(addMonths(today, 1))
  }

  const yearToDate = {
    from: startOfYear(today),
    to: today
  }

  const lastYear = {
    from: startOfYear(subYears(today, 1)),
    to: endOfYear(subYears(today, 1))
  }

  const [month, setMonth] = useState(today)
  const [date, setDate] = useState<DateRange | undefined>(last7Days)

  return (
    <div>
      <Card className='max-w-xs py-4'>
        <CardContent className='px-4'>
          <Calendar
            mode='range'
            selected={date}
            onSelect={newDate => {
              if (newDate) {
                setDate(newDate)
              }
            }}
            month={month}
            onMonthChange={setMonth}
            className='w-full bg-transparent p-0'
          />
        </CardContent>
        <CardFooter className='flex flex-wrap gap-2 border-t px-4 !pt-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate({
                from: today,
                to: today
              })
              setMonth(today)
            }}
          >
            Today
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(yesterday)
              setMonth(yesterday.to)
            }}
          >
            Yesterday
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(tomorrow)
              setMonth(tomorrow.to)
            }}
          >
            Tomorrow
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(last7Days)
              setMonth(last7Days.to)
            }}
          >
            Last 7 days
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(next7Days)
              setMonth(next7Days.to)
            }}
          >
            Next 7 days
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(last30Days)
              setMonth(last30Days.to)
            }}
          >
            Last 30 days
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(monthToDate)
              setMonth(monthToDate.to)
            }}
          >
            Month to date
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(lastMonth)
              setMonth(lastMonth.to)
            }}
          >
            Last month
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(nextMonth)
              setMonth(nextMonth.to)
            }}
          >
            Next month
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(yearToDate)
              setMonth(yearToDate.to)
            }}
          >
            Year to date
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setDate(lastYear)
              setMonth(lastYear.to)
            }}
          >
            Last year
          </Button>
        </CardFooter>
      </Card>
      <p className='text-muted-foreground mt-4 text-center text-xs' role='region'>
        Range calendar with presets
      </p>
    </div>
  )
}

export default CalendarWithRangePresetsDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/calendar-1.tsx
'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar mode='single' defaultMonth={date} selected={date} onSelect={setDate} className='rounded-lg border' />
      <p className='text-muted-foreground mt-3 text-center text-xs' role='region'>
        Default Month
      </p>
    </div>
  )
}

export default CalendarDemo

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
