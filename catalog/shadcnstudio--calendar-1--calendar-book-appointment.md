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

import { CircleCheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const CalendarAppointmentBookingDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 20))
  const [selectedTime, setSelectedTime] = useState<string | null>('10:00')

  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15
    const hour = Math.floor(totalMinutes / 60) + 9
    const minute = totalMinutes % 60

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  })

  const bookedDates = Array.from({ length: 3 }, (_, i) => new Date(2025, 5, 17 + i))

  return (
    <div>
      <Card className='gap-0 p-0'>
        <CardHeader className='flex h-max justify-center border-b !p-4'>
          <CardTitle>Book your appointment</CardTitle>
        </CardHeader>
        <CardContent className='relative p-0 md:pr-48'>
          <div className='p-6'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              disabled={bookedDates}
              showOutsideDays={false}
              modifiers={{
                booked: bookedDates
              }}
              modifiersClassNames={{
                booked: '[&>button]:line-through opacity-100'
              }}
              className='bg-transparent p-0 [--cell-size:--spacing(10)]'
              formatters={{
                formatWeekdayName: date => {
                  return date.toLocaleString('en-US', { weekday: 'short' })
                }
              }}
            />
          </div>
          <div className='inset-y-0 right-0 flex w-full flex-col gap-4 border-t max-md:h-60 md:absolute md:w-48 md:border-t-0 md:border-l'>
            <ScrollArea className='h-full'>
              <div className='flex flex-col gap-2 p-6'>
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    onClick={() => setSelectedTime(time)}
                    className='w-full shadow-none'
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-4 border-t px-6 !py-5 md:flex-row'>
          <div className='flex items-center gap-2 text-sm'>
            {date && selectedTime ? (
              <>
                <CircleCheckIcon className='size-5 stroke-green-600 dark:stroke-green-400' />
                <span>
                  Your meeting is booked for{' '}
                  <span className='font-medium'>
                    {' '}
                    {date?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}{' '}
                  </span>
                  at <span className='font-medium'>{selectedTime}</span>.
                </span>
              </>
            ) : (
              <>Select a date and time for your meeting.</>
            )}
          </div>
          <Button disabled={!date || !selectedTime} className='w-full md:ml-auto md:w-auto' variant='outline'>
            Continue
          </Button>
        </CardFooter>
      </Card>
      <p className='text-muted-foreground mt-4 text-center text-xs' role='region'>
        Appointment calendar
      </p>
    </div>
  )
}

export default CalendarAppointmentBookingDemo

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
