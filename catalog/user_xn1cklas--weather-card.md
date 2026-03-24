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
weather-card.tsx
"use client"

import * as React from "react"
import type { GetWeatherResult } from "@/components/ui/component"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function WeatherCard({ data }: { data?: GetWeatherResult }) {
  if (!data) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Powered by your tool</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No data yet. Pass <code>GetWeatherResult</code>.
          </div>
        </CardContent>
      </Card>
    )
  }

  const {
    location,
    temperature,
    unit,
    condition,
    high,
    low,
    humidity,
    windKph,
  } = data

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Weather</CardTitle>
        <CardDescription>Powered by your tool</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="text-lg font-semibold mb-1">{location}</div>
        <div className="flex items-baseline gap-3">
          <div className="text-5xl font-bold">
            {temperature}°{unit}
          </div>
          <div className="text-sm text-muted-foreground">{condition}</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-md bg-muted p-3 text-center">
            <div className="text-muted-foreground">High</div>
            <div className="font-medium">
              {high}°{unit}
            </div>
          </div>
          <div className="rounded-md bg-muted p-3 text-center">
            <div className="text-muted-foreground">Low</div>
            <div className="font-medium">
              {low}°{unit}
            </div>
          </div>
          <div className="rounded-md bg-muted p-3 text-center">
            <div className="text-muted-foreground">Humidity</div>
            <div className="font-medium">{Math.round(humidity * 100)}%</div>
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          Wind: {windKph} kph
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard


code.demo.1757008326833.tsx
"use client"

import * as React from "react"
import WeatherCard from "@/components/ui/weather-card"
import type { GetWeatherResult } from "@/components/ui/weather-card"

export default function Demo() {
  const mock: GetWeatherResult = {
    location: "Tbilisi, GE",
    unit: "C",
    temperature: 27,
    condition: "Partly cloudy",
    high: 29,
    low: 20,
    humidity: 0.58,
    windKph: 14,
    icon: "weather-partly",
  }

  return <WeatherCard data={mock} />
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/weather-card.tsx
"use client"

import * as React from "react"
import type { GetWeatherResult } from "@/components/ui/component"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function WeatherCard({ data }: { data?: GetWeatherResult }) {
  if (!data) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>Powered by your tool</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No data yet. Pass <code>GetWeatherResult</code>.
          </div>
        </CardContent>
      </Card>
    )
  }

  const {
    location,
    temperature,
    unit,
    condition,
    high,
    low,
    humidity,
    windKph,
  } = data

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Weather</CardTitle>
        <CardDescription>Powered by your tool</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="text-lg font-semibold mb-1">{location}</div>
        <div className="flex items-baseline gap-3">
          <div className="text-5xl font-bold">
            {temperature}°{unit}
          </div>
          <div className="text-sm text-muted-foreground">{condition}</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-md bg-muted p-3 text-center">
            <div className="text-muted-foreground">High</div>
            <div className="font-medium">
              {high}°{unit}
            </div>
          </div>
          <div className="rounded-md bg-muted p-3 text-center">
            <div className="text-muted-foreground">Low</div>
            <div className="font-medium">
              {low}°{unit}
            </div>
          </div>
          <div className="rounded-md bg-muted p-3 text-center">
            <div className="text-muted-foreground">Humidity</div>
            <div className="font-medium">{Math.round(humidity * 100)}%</div>
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          Wind: {windKph} kph
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard

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
