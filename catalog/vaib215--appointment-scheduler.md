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
appointment-scheduler.tsx
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Globe, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlot {
  time: string
  available: boolean
}

interface AvailableDate {
  date: number
  hasSlots: boolean
}

export interface AppointmentSchedulerProps {
  userName: string
  userAvatar?: string
  meetingTitle: string
  meetingType: string
  duration: string
  timezone: string
  availableDates: AvailableDate[]
  timeSlots: TimeSlot[]
  onDateSelect?: (date: number) => void
  onTimeSelect?: (time: string) => void
  onTimezoneChange?: (timezone: string) => void
  brandName?: string
}

export function AppointmentScheduler({
  userName,
  userAvatar,
  meetingTitle,
  meetingType,
  duration,
  timezone,
  availableDates,
  timeSlots,
  onDateSelect,
  onTimeSelect,
  onTimezoneChange,
  brandName = "Cal.com",
}: AppointmentSchedulerProps) {
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState(15)
  const [selectedTime, setSelectedTime] = useState("15:30")
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDateClick = (date: number) => {
    const isAvailable = availableDates.find((d) => d.date === date && d.hasSlots)
    if (isAvailable) {
      setSelectedDate(date)
      onDateSelect?.(date)
    }
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
    onTimeSelect?.(time)
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const getSelectedDayName = () => {
    const date = new Date(currentYear, currentMonth, selectedDate)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  const getSelectedDateFormatted = () => {
    const date = new Date(currentYear, currentMonth, selectedDate)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const formatTime = (time: string) => {
    if (timeFormat === "24h") return time

    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-0 rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
      {/* Left Panel - Meeting Info */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-3 animate-fade-in">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{userName}</span>
        </div>

        <div className="space-y-4 animate-fade-in animate-delay-100">
          <h2 className="text-2xl font-semibold text-foreground">{meetingTitle}</h2>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>{meetingType}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <button
                className="flex items-center gap-1 hover:text-foreground transition-colors"
                onClick={() => onTimezoneChange?.(timezone)}
              >
                <span>{timezone}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Panel - Calendar */}
      <div className="flex-1 p-4 md:p-6">
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between animate-fade-in">
            <h3 className="text-lg font-medium text-foreground">
              {monthNames[currentMonth]} <span className="text-muted-foreground">{currentYear}</span>
            </h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />
              }

              const isAvailable = availableDates.find((d) => d.date === day && d.hasSlots)
              const isSelected = day === selectedDate
              const hasIndicator = isAvailable && !isSelected

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  disabled={!isAvailable}
                  className={cn(
                    "relative h-12 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:scale-105 active:scale-95",
                    isSelected && "bg-primary text-primary-foreground shadow-lg scale-105",
                    !isSelected && isAvailable && "bg-secondary/50 text-foreground hover:bg-secondary",
                    !isAvailable && "text-muted-foreground/40 cursor-not-allowed",
                    "animate-fade-in",
                  )}
                  style={{
                    animationDelay: `${index * 10}ms`,
                  }}
                >
                  {day}
                  {hasIndicator && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-foreground" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right Panel - Time Slots */}
      <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-border bg-card p-6 flex flex-col">
        <div className="flex items-center justify-between animate-fade-in mb-4">
          <div className="text-sm">
            <span className="font-medium text-foreground">{getSelectedDayName()}</span>
            <span className="text-muted-foreground">, {getSelectedDateFormatted()}</span>
          </div>
          <div className="flex gap-1 rounded-lg bg-secondary p-1">
            <button
              onClick={() => setTimeFormat("12h")}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded transition-colors",
                timeFormat === "12h" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              12h
            </button>
            <button
              onClick={() => setTimeFormat("24h")}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded transition-colors",
                timeFormat === "24h" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              24h
            </button>
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-2 overflow-y-auto pr-2 scrollbar-thin max-h-[400px] lg:max-h-[500px]">
          {timeSlots.map((slot, index) => {
            const isSelected = slot.time === selectedTime
            return (
              <button
                key={slot.time}
                onClick={() => handleTimeClick(slot.time)}
                disabled={!slot.available}
                className={cn(
                  "w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isSelected && "bg-primary text-primary-foreground shadow-lg scale-[1.02]",
                  !isSelected && slot.available && "bg-secondary/50 text-foreground hover:bg-secondary",
                  !slot.available && "text-muted-foreground/40 cursor-not-allowed",
                  "animate-fade-in",
                )}
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                {formatTime(slot.time)}
              </button>
            )
          })}
        </div>

        <div className="pt-4 mt-4 border-t border-border animate-fade-in animate-delay-300">
          <p className="text-xs text-muted-foreground text-right">powered by {brandName}</p>
        </div>
      </div>
    </div>
  )
}


code.demo.1760642370876.tsx
import { AppointmentScheduler } from "@/components/ui/appointment-scheduler"

export default function AppointmentSchedulerDemo() {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  // Get dates for the current month that have availability
  const availableDates = [
    { date: 14, hasSlots: true },
    { date: 15, hasSlots: true },
    { date: 20, hasSlots: true },
    { date: 21, hasSlots: true },
    { date: 22, hasSlots: true },
    { date: 23, hasSlots: true },
    { date: 27, hasSlots: true },
    { date: 28, hasSlots: true },
    { date: 29, hasSlots: true },
    { date: 30, hasSlots: true },
  ]

  const timeSlots = [
    { time: "09:00", available: true },
    { time: "09:15", available: true },
    { time: "09:30", available: true },
    { time: "09:45", available: true },
    { time: "10:00", available: true },
    { time: "10:15", available: true },
    { time: "10:30", available: true },
    { time: "10:45", available: true },
    { time: "11:00", available: true },
    { time: "11:15", available: true },
    { time: "11:30", available: true },
    { time: "11:45", available: true },
    { time: "13:00", available: true },
    { time: "13:15", available: true },
    { time: "13:30", available: true },
    { time: "13:45", available: true },
    { time: "14:00", available: true },
    { time: "14:15", available: true },
    { time: "14:30", available: true },
    { time: "14:45", available: true },
    { time: "15:00", available: true },
    { time: "15:15", available: true },
    { time: "15:30", available: true },
    { time: "15:45", available: true },
    { time: "16:00", available: true },
    { time: "16:15", available: true },
    { time: "16:30", available: true },
    { time: "16:45", available: true },
    { time: "17:00", available: true },
    { time: "17:15", available: true },
    { time: "17:30", available: true },
    { time: "17:45", available: true },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <AppointmentScheduler
        userName="Jane Smith"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
        meetingTitle="15 Min Meeting"
        meetingType="Cal Video"
        duration="15 Minutes"
        timezone="America/Los_Angeles"
        availableDates={availableDates}
        timeSlots={timeSlots}
        onDateSelect={(date) => console.log("Selected date:", date)}
        onTimeSelect={(time) => console.log("Selected time:", time)}
        onTimezoneChange={(tz) => console.log("Timezone clicked:", tz)}
        brandName="Cal.com"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/appointment-scheduler.tsx
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Globe, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlot {
  time: string
  available: boolean
}

interface AvailableDate {
  date: number
  hasSlots: boolean
}

export interface AppointmentSchedulerProps {
  userName: string
  userAvatar?: string
  meetingTitle: string
  meetingType: string
  duration: string
  timezone: string
  availableDates: AvailableDate[]
  timeSlots: TimeSlot[]
  onDateSelect?: (date: number) => void
  onTimeSelect?: (time: string) => void
  onTimezoneChange?: (timezone: string) => void
  brandName?: string
}

export function AppointmentScheduler({
  userName,
  userAvatar,
  meetingTitle,
  meetingType,
  duration,
  timezone,
  availableDates,
  timeSlots,
  onDateSelect,
  onTimeSelect,
  onTimezoneChange,
  brandName = "Cal.com",
}: AppointmentSchedulerProps) {
  const now = new Date()
  const [currentMonth, setCurrentMonth] = useState(now.getMonth())
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState(15)
  const [selectedTime, setSelectedTime] = useState("15:30")
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDateClick = (date: number) => {
    const isAvailable = availableDates.find((d) => d.date === date && d.hasSlots)
    if (isAvailable) {
      setSelectedDate(date)
      onDateSelect?.(date)
    }
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
    onTimeSelect?.(time)
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  const getSelectedDayName = () => {
    const date = new Date(currentYear, currentMonth, selectedDate)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  const getSelectedDateFormatted = () => {
    const date = new Date(currentYear, currentMonth, selectedDate)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const formatTime = (time: string) => {
    if (timeFormat === "24h") return time

    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-0 rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
      {/* Left Panel - Meeting Info */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-3 animate-fade-in">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{userName}</span>
        </div>

        <div className="space-y-4 animate-fade-in animate-delay-100">
          <h2 className="text-2xl font-semibold text-foreground">{meetingTitle}</h2>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>{meetingType}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <button
                className="flex items-center gap-1 hover:text-foreground transition-colors"
                onClick={() => onTimezoneChange?.(timezone)}
              >
                <span>{timezone}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Panel - Calendar */}
      <div className="flex-1 p-4 md:p-6">
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between animate-fade-in">
            <h3 className="text-lg font-medium text-foreground">
              {monthNames[currentMonth]} <span className="text-muted-foreground">{currentYear}</span>
            </h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />
              }

              const isAvailable = availableDates.find((d) => d.date === day && d.hasSlots)
              const isSelected = day === selectedDate
              const hasIndicator = isAvailable && !isSelected

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  disabled={!isAvailable}
                  className={cn(
                    "relative h-12 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:scale-105 active:scale-95",
                    isSelected && "bg-primary text-primary-foreground shadow-lg scale-105",
                    !isSelected && isAvailable && "bg-secondary/50 text-foreground hover:bg-secondary",
                    !isAvailable && "text-muted-foreground/40 cursor-not-allowed",
                    "animate-fade-in",
                  )}
                  style={{
                    animationDelay: `${index * 10}ms`,
                  }}
                >
                  {day}
                  {hasIndicator && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-foreground" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right Panel - Time Slots */}
      <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-border bg-card p-6 flex flex-col">
        <div className="flex items-center justify-between animate-fade-in mb-4">
          <div className="text-sm">
            <span className="font-medium text-foreground">{getSelectedDayName()}</span>
            <span className="text-muted-foreground">, {getSelectedDateFormatted()}</span>
          </div>
          <div className="flex gap-1 rounded-lg bg-secondary p-1">
            <button
              onClick={() => setTimeFormat("12h")}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded transition-colors",
                timeFormat === "12h" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              12h
            </button>
            <button
              onClick={() => setTimeFormat("24h")}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded transition-colors",
                timeFormat === "24h" ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              24h
            </button>
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-2 overflow-y-auto pr-2 scrollbar-thin max-h-[400px] lg:max-h-[500px]">
          {timeSlots.map((slot, index) => {
            const isSelected = slot.time === selectedTime
            return (
              <button
                key={slot.time}
                onClick={() => handleTimeClick(slot.time)}
                disabled={!slot.available}
                className={cn(
                  "w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isSelected && "bg-primary text-primary-foreground shadow-lg scale-[1.02]",
                  !isSelected && slot.available && "bg-secondary/50 text-foreground hover:bg-secondary",
                  !slot.available && "text-muted-foreground/40 cursor-not-allowed",
                  "animate-fade-in",
                )}
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                {formatTime(slot.time)}
              </button>
            )
          })}
        </div>

        <div className="pt-4 mt-4 border-t border-border animate-fade-in animate-delay-300">
          <p className="text-xs text-muted-foreground text-right">powered by {brandName}</p>
        </div>
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
