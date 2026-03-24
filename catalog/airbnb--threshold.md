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
threshold.tsx
// components/ui/component.tsx
import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { curveBasis } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { cityTemperature, CityTemperature } from '@visx/mock-data/';

export const background = '#f3f3f3';

const date = (d: CityTemperature) => new Date(d.date).valueOf();
const ny = (d: CityTemperature) => Number(d['New York']);
const sf = (d: CityTemperature) => Number(d['San Francisco']);

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type ComponentProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const Component = ({ width, height, margin = defaultMargin }: ComponentProps) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const timeScale = useMemo(() => scaleTime<number>({
    domain: [Math.min(...cityTemperature.map(date)), Math.max(...cityTemperature.map(date))],
    range: [0, xMax],
  }), [xMax]);

  const temperatureScale = useMemo(() => scaleLinear<number>({
    domain: [
      Math.min(...cityTemperature.map((d) => Math.min(ny(d), sf(d)))),
      Math.max(...cityTemperature.map((d) => Math.max(ny(d), sf(d)))),
    ],
    nice: true,
    range: [yMax, 0],
  }), [yMax]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={temperatureScale} />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
          </text>
          <Threshold<CityTemperature>
            id={`${Math.random()}`}
            data={cityTemperature}
            x={(d) => timeScale(date(d)) ?? 0}
            y0={(d) => temperatureScale(ny(d)) ?? 0}
            y1={(d) => temperatureScale(sf(d)) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => temperatureScale(sf(d)) ?? 0}
            stroke="#222"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => temperatureScale(ny(d)) ?? 0}
            stroke="#222"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  );
};

code.demo.1747928934740.tsx
// DemoOne.tsx
import React, { useState, useEffect } from "react";
import { Component, background } from "@/components/ui/threshold"; 
import { cn } from "@/lib/utils"; 
const DemoOne = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const chartWidth = dimensions.width;
  const chartHeight = dimensions.height;

  if (chartWidth === 0 || chartHeight === 0) {
    return (
      <div className={cn("flex w-screen h-screen justify-center items-center bg-gray-900 text-white")}>
        Загрузка...
      </div>
    );
  }

  const displayWidth = chartWidth * 0.9;
  const displayHeight = chartHeight * 0.9;

  return (
    <div className={cn("w-screen h-screen overflow-hidden flex justify-center items-center")} style={{ backgroundColor: background }}>
      <Component
        width={displayWidth}
        height={displayHeight}
      />
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/threshold.tsx
// components/ui/component.tsx
import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { curveBasis } from '@visx/curve';
import { LinePath } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { cityTemperature, CityTemperature } from '@visx/mock-data/';

export const background = '#f3f3f3';

const date = (d: CityTemperature) => new Date(d.date).valueOf();
const ny = (d: CityTemperature) => Number(d['New York']);
const sf = (d: CityTemperature) => Number(d['San Francisco']);

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type ComponentProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const Component = ({ width, height, margin = defaultMargin }: ComponentProps) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const timeScale = useMemo(() => scaleTime<number>({
    domain: [Math.min(...cityTemperature.map(date)), Math.max(...cityTemperature.map(date))],
    range: [0, xMax],
  }), [xMax]);

  const temperatureScale = useMemo(() => scaleLinear<number>({
    domain: [
      Math.min(...cityTemperature.map((d) => Math.min(ny(d), sf(d)))),
      Math.max(...cityTemperature.map((d) => Math.max(ny(d), sf(d)))),
    ],
    nice: true,
    range: [yMax, 0],
  }), [yMax]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={temperatureScale} />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
          </text>
          <Threshold<CityTemperature>
            id={`${Math.random()}`}
            data={cityTemperature}
            x={(d) => timeScale(date(d)) ?? 0}
            y0={(d) => temperatureScale(ny(d)) ?? 0}
            y1={(d) => temperatureScale(sf(d)) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => temperatureScale(sf(d)) ?? 0}
            stroke="#222"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => temperatureScale(ny(d)) ?? 0}
            stroke="#222"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  );
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/curve, @visx/shape, @visx/threshold, @visx/scale, @visx/axis, @visx/grid, @visx/mock-data, @visx/mock-data/
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
