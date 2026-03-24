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
bar-group-vertical.tsx
import React from 'react';
import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';

import { cityTemperature, CityTemperature } from '@visx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from '@visx/vendor/d3-time-format';

export type BarGroupChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

type CityName = 'New York' | 'San Francisco' | 'Austin';

const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';
export const background = '#612efb';

const data = cityTemperature.slice(0, 8);
const keys = Object.keys(data[0]).filter((d) => d !== 'date') as CityName[];
const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

const getDate = (d: CityTemperature) => d.date;

const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});
const cityScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});
const tempScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map((d) => Math.max(...keys.map((key) => Number(d[key])))))],
});
const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [blue, green, purple],
});

export const BarGroupChart = ({
  width,
  height,
  events = false,
  margin = defaultMargin,
}: BarGroupChartProps) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  dateScale.rangeRound([0, xMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Group top={margin.top} left={margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={getDate}
          x0Scale={dateScale}
          x1Scale={cityScale}
          yScale={tempScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                {barGroup.bars.map((bar) => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                    onClick={() => {
                      if (!events) return;
                      const { key, value } = bar;
                      alert(JSON.stringify({ key, value }));
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatDate}
        scale={dateScale}
        stroke={green}
        tickStroke={green}
        hideAxisLine
        tickLabelProps={{
          fill: green,
          fontSize: 11,
          textAnchor: 'middle',
        }}
      />
    </svg>
  );
};

code.demo.1747940847701.tsx

import { BarGroupChart } from "@/components/ui/bar-group-vertical";

const DemoBarGroupChart = () => {
  const width = 700;
  const height = 450;

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <BarGroupChart width={width} height={height} />
    </div>
  );
};

export { DemoBarGroupChart };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/bar-group-vertical.tsx
import React from 'react';
import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';

import { cityTemperature, CityTemperature } from '@visx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from '@visx/vendor/d3-time-format';

export type BarGroupChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

type CityName = 'New York' | 'San Francisco' | 'Austin';

const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';
export const background = '#612efb';

const data = cityTemperature.slice(0, 8);
const keys = Object.keys(data[0]).filter((d) => d !== 'date') as CityName[];
const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

const getDate = (d: CityTemperature) => d.date;

const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});
const cityScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});
const tempScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map((d) => Math.max(...keys.map((key) => Number(d[key])))))],
});
const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [blue, green, purple],
});

export const BarGroupChart = ({
  width,
  height,
  events = false,
  margin = defaultMargin,
}: BarGroupChartProps) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  dateScale.rangeRound([0, xMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Group top={margin.top} left={margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={getDate}
          x0Scale={dateScale}
          x1Scale={cityScale}
          yScale={tempScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                {barGroup.bars.map((bar) => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                    onClick={() => {
                      if (!events) return;
                      const { key, value } = bar;
                      alert(JSON.stringify({ key, value }));
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatDate}
        scale={dateScale}
        stroke={green}
        tickStroke={green}
        hideAxisLine
        tickLabelProps={{
          fill: green,
          fontSize: 11,
          textAnchor: 'middle',
        }}
      />
    </svg>
  );
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/shape, @visx/axis, @visx/mock-data, @visx/scale, @visx/vendor
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
