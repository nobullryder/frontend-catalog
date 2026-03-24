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
stacked-areas.tsx
// src/components/ui/stacked-areas-chart.tsx

import React from 'react';
import { AreaStack } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { GradientOrangeRed } from '@visx/gradient';
import { browserUsage, BrowserUsage } from '@visx/mock-data'; 
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeParse } from '@visx/vendor/d3-time-format';

type BrowserNames = keyof (typeof browserUsage)[0]; 

const data = browserUsage;
const keys = Object.keys(data[0]).filter((k) => k !== 'date') as BrowserNames[];
const parseDate = timeParse('%Y %b %d');
export const background = '#f38181';

const getDate = (d: BrowserUsage) => (parseDate(d.date) as Date).valueOf();
const getY0 = (d: SeriesPoint<BrowserUsage>) => d[0] / 100;
const getY1 = (d: SeriesPoint<BrowserUsage>) => d[1] / 100;

export type StackedAreasChartProps = {
  width: number;
  height: number;
  events?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const StackedAreasChart = ({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  events = false,
}: StackedAreasChartProps) => {
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const xScale = scaleTime<number>({
    range: [0, xMax],
    domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
  });
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
  });

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientOrangeRed id="stacked-area-orangered" />
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <AreaStack
        top={margin.top}
        left={margin.left}
        keys={keys}
        data={data}
        x={(d) => xScale(getDate(d.data)) ?? 0}
        y0={(d) => yScale(getY0(d)) ?? 0}
        y1={(d) => yScale(getY1(d)) ?? 0}
      >
        {({ stacks, path }) =>
          stacks.map((stack) => (
            <path
              key={`stack-${stack.key}`}
              d={path(stack) || ''}
              stroke="transparent"
              fill="url(#stacked-area-orangered)"
              onClick={() => {
                if (events) alert(`${stack.key}`);
              }}
            />
          ))
        }
      </AreaStack>
    </svg>
  );
};

code.demo.1747997899380.tsx
import { StackedAreasChart } from "@/components/ui/stacked-areas";

const DemoStackedAreasChart = () => {
  const width = 800;
  const height = 400;

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <StackedAreasChart width={width} height={height} events={true} />
    </div>
  );
};

export { DemoStackedAreasChart };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stacked-areas.tsx
// src/components/ui/stacked-areas-chart.tsx

import React from 'react';
import { AreaStack } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { GradientOrangeRed } from '@visx/gradient';
import { browserUsage, BrowserUsage } from '@visx/mock-data'; 
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeParse } from '@visx/vendor/d3-time-format';

type BrowserNames = keyof (typeof browserUsage)[0]; 

const data = browserUsage;
const keys = Object.keys(data[0]).filter((k) => k !== 'date') as BrowserNames[];
const parseDate = timeParse('%Y %b %d');
export const background = '#f38181';

const getDate = (d: BrowserUsage) => (parseDate(d.date) as Date).valueOf();
const getY0 = (d: SeriesPoint<BrowserUsage>) => d[0] / 100;
const getY1 = (d: SeriesPoint<BrowserUsage>) => d[1] / 100;

export type StackedAreasChartProps = {
  width: number;
  height: number;
  events?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const StackedAreasChart = ({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  events = false,
}: StackedAreasChartProps) => {
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const xScale = scaleTime<number>({
    range: [0, xMax],
    domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
  });
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
  });

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientOrangeRed id="stacked-area-orangered" />
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <AreaStack
        top={margin.top}
        left={margin.left}
        keys={keys}
        data={data}
        x={(d) => xScale(getDate(d.data)) ?? 0}
        y0={(d) => yScale(getY0(d)) ?? 0}
        y1={(d) => yScale(getY1(d)) ?? 0}
      >
        {({ stacks, path }) =>
          stacks.map((stack) => (
            <path
              key={`stack-${stack.key}`}
              d={path(stack) || ''}
              stroke="transparent"
              fill="url(#stacked-area-orangered)"
              onClick={() => {
                if (events) alert(`${stack.key}`);
              }}
            />
          ))
        }
      </AreaStack>
    </svg>
  );
};
```

Install NPM dependencies:
```bash
@visx/shape, @visx/gradient, @visx/mock-data, @visx/scale, @visx/vendor
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
