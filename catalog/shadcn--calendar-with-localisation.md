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
calendar-with-localisation.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};


code.demo.1749972605587.tsx
"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"
import { enUS, es } from "react-day-picker/locale"

import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card-shadcn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const localizedStrings = {
  en: {
    title: "Book an appointment",
    description: "Select the dates for your appointment",
  },
  es: {
    title: "Reserva una cita",
    description: "Selecciona las fechas para tu cita",
  },
} as const

export default function Calendar12() {
  const [locale, setLocale] =
    React.useState<keyof typeof localizedStrings>("es")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 8, 9),
    to: new Date(2025, 8, 17),
  })

  return (
    <Card>
      <CardHeader className="relative border-b">
        <CardTitle>{localizedStrings[locale].title}</CardTitle>
        <CardDescription>
          {localizedStrings[locale].description}
        </CardDescription>
        <Select
          value={locale}
          onValueChange={(value) =>
            setLocale(value as keyof typeof localizedStrings)
          }
        >
          <SelectTrigger className="absolute right-4 top-4 w-[100px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          defaultMonth={dateRange?.from}
          numberOfMonths={2}
          locale={locale === "es" ? es : enUS}
          className="bg-transparent p-0"
          buttonVariant="outline"
        />
      </CardContent>
    </Card>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/calendar-with-localisation.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

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
