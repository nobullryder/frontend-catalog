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
public-stats.tsx
import { tool } from "ai"
import { z } from "zod"

// Fetch global earthquake counts (per day) from USGS for the last N days
export const publicStatsTool = tool({
  description:
    "Fetch daily counts of global earthquakes from USGS for the last N days.",
  inputSchema: z.object({
    daysBack: z
      .number()
      .int()
      .min(1)
      .max(365)
      .default(30)
      .describe("How many days back from today (UTC) to include"),
    minMagnitude: z
      .number()
      .min(0)
      .max(10)
      .default(5)
      .describe("Minimum magnitude to include"),
  }),
  execute: async ({ daysBack, minMagnitude }): Promise<PublicStatsResult> => {
    const end = new Date()
    const start = new Date(end.getTime() - daysBack * 24 * 60 * 60 * 1000)

    const fmt = (d: Date) => d.toISOString().slice(0, 10)

    const params = new URLSearchParams({
      format: "geojson",
      starttime: fmt(start),
      endtime: fmt(end),
      minmagnitude: String(minMagnitude),
    })
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?${params.toString()}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`USGS API failed: ${res.status}`)
    const data = (await res.json()) as {
      features?: Array<{ properties?: { time?: number } }>
    }

    const counts = new Map<string, number>()
    for (const f of data.features ?? []) {
      const t = f?.properties?.time
      if (!Number.isFinite(t)) continue
      const day = new Date(Number(t)).toISOString().slice(0, 10)
      counts.set(day, (counts.get(day) || 0) + 1)
    }

    const series: StatsSeriesPoint[] = []
    for (let i = daysBack; i >= 0; i--) {
      const d = new Date(end.getTime() - i * 24 * 60 * 60 * 1000)
      const day = d.toISOString().slice(0, 10)
      series.push({ date: day, count: counts.get(day) || 0 })
    }

    return { title: `Global M${minMagnitude}+ earthquakes`, series }
  },
})

export interface StatsSeriesPoint {
  date: string // YYYY-MM-DD
  count: number
}

export interface PublicStatsResult {
  title: string
  series: StatsSeriesPoint[]
}

export default publicStatsTool


code.demo.1757007880663.tsx
"use client"

import * as React from "react"
import type { PublicStatsResult } from "@/components/ui/public-stats"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import type { TooltipContentProps } from "recharts/types/component/Tooltip"
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"
import type { Props as DefaultLegendContentProps } from "recharts/types/component/DefaultLegendContent"

export function StatsChart({ data }: { data?: PublicStatsResult }) {
  const config: ChartConfig = {
    // Use design system chart color for higher contrast in both themes
    count: { label: "Quakes", color: "var(--border)" },
  }

  const [live, setLive] = React.useState<PublicStatsResult | null>(null)
  React.useEffect(() => {
    if (data) return
    const controller = new AbortController()
    const fetchLive = async () => {
      try {
        const end = new Date()
        const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
        const fmt = (d: Date) => d.toISOString().slice(0, 10)
        const params = new URLSearchParams({
          format: "geojson",
          starttime: fmt(start),
          endtime: fmt(end),
          minmagnitude: String(5),
        })
        const res = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?${params.toString()}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error("USGS fetch failed")
        const json = (await res.json()) as {
          features?: Array<{ properties?: { time?: number } }>
        }
        const counts = new Map<string, number>()
        for (const f of json.features ?? []) {
          const t = f?.properties?.time
          if (!Number.isFinite(t)) continue
          const day = new Date(Number(t)).toISOString().slice(0, 10)
          counts.set(day, (counts.get(day) || 0) + 1)
        }
        const series: PublicStatsResult["series"] = []
        for (let i = 30; i >= 0; i--) {
          const d = new Date(end.getTime() - i * 24 * 60 * 60 * 1000)
          const day = d.toISOString().slice(0, 10)
          series.push({ date: day, count: counts.get(day) || 0 })
        }
        setLive({ title: "Global M5+ earthquakes", series })
      } catch {
        // swallow for demo; component will render nothing
      }
    }
    fetchLive()
    return () => controller.abort()
  }, [data])

  const source = data ?? live
  const chartData =
    source?.series.map((d) => ({ date: d.date, count: d.count })) ?? []

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{source?.title ?? "Public Stats"}</CardTitle>
        <CardDescription>Source: USGS Earthquake Catalog</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[300px]">
          <AreaChart
            data={chartData}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8} />
            <YAxis
              tickFormatter={(v) =>
                Intl.NumberFormat(undefined, { notation: "compact" }).format(
                  Number(v)
                )
              }
              tick={{ fontSize: 12 }}
              tickMargin={8}
            />
            <ChartTooltip
              content={(props: TooltipContentProps<ValueType, NameType>) => (
                <ChartTooltipContent {...props} />
              )}
            />
            <ChartLegend
              verticalAlign="top"
              content={(props: DefaultLegendContentProps) => (
                <ChartLegendContent
                  verticalAlign="top"
                  payload={props.payload}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--color-count)"
              fill="var(--color-count)"
              fillOpacity={0.2}
              name="Quakes"
              dot={{
                r: 2,
                stroke: "var(--color-count)",
                fill: "var(--color-count)",
              }}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default StatsChart

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/public-stats.tsx
import { tool } from "ai"
import { z } from "zod"

// Fetch global earthquake counts (per day) from USGS for the last N days
export const publicStatsTool = tool({
  description:
    "Fetch daily counts of global earthquakes from USGS for the last N days.",
  inputSchema: z.object({
    daysBack: z
      .number()
      .int()
      .min(1)
      .max(365)
      .default(30)
      .describe("How many days back from today (UTC) to include"),
    minMagnitude: z
      .number()
      .min(0)
      .max(10)
      .default(5)
      .describe("Minimum magnitude to include"),
  }),
  execute: async ({ daysBack, minMagnitude }): Promise<PublicStatsResult> => {
    const end = new Date()
    const start = new Date(end.getTime() - daysBack * 24 * 60 * 60 * 1000)

    const fmt = (d: Date) => d.toISOString().slice(0, 10)

    const params = new URLSearchParams({
      format: "geojson",
      starttime: fmt(start),
      endtime: fmt(end),
      minmagnitude: String(minMagnitude),
    })
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?${params.toString()}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`USGS API failed: ${res.status}`)
    const data = (await res.json()) as {
      features?: Array<{ properties?: { time?: number } }>
    }

    const counts = new Map<string, number>()
    for (const f of data.features ?? []) {
      const t = f?.properties?.time
      if (!Number.isFinite(t)) continue
      const day = new Date(Number(t)).toISOString().slice(0, 10)
      counts.set(day, (counts.get(day) || 0) + 1)
    }

    const series: StatsSeriesPoint[] = []
    for (let i = daysBack; i >= 0; i--) {
      const d = new Date(end.getTime() - i * 24 * 60 * 60 * 1000)
      const day = d.toISOString().slice(0, 10)
      series.push({ date: day, count: counts.get(day) || 0 })
    }

    return { title: `Global M${minMagnitude}+ earthquakes`, series }
  },
})

export interface StatsSeriesPoint {
  date: string // YYYY-MM-DD
  count: number
}

export interface PublicStatsResult {
  title: string
  series: StatsSeriesPoint[]
}

export default publicStatsTool

```

Install NPM dependencies:
```bash
ai, zod
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
