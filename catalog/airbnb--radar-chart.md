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
radar-chart.tsx
// src/components/ui/component.tsx
import React from 'react';
import { Group } from '@visx/group';
import { LetterFrequency } from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';
import { Point } from '@visx/point';
import { Line, LineRadial } from '@visx/shape';

const orange = '#ff9933';
export const pumpkin = '#f5810c';
const silver = '#d9d9d9';
export const chartBackground = '#FAF7E9';

const degrees = 360;

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (degrees / length) + (length % 2 === 0 ? 0 : degrees / length / 2),
  }));

const genPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step),
  }));
};


function genPolygonPoints<Datum>(
  dataArray: Datum[],
  scale: (n: number) => number,
  getValue: (d: Datum) => number,
) {
  const step = (Math.PI * 2) / dataArray.length;
  let pointString = "";
  const points: { x: number; y: number }[] = [];

  if (dataArray.length === 0) {
    return { points, pointString };
  }

  for (let i = 0; i < dataArray.length; i++) {
    const xVal = scale(getValue(dataArray[i])) * Math.sin(i * step);
    const yVal = scale(getValue(dataArray[i])) * Math.cos(i * step);
    points.push({ x: xVal, y: yVal });
    pointString += `${xVal},${yVal} `;
  }
  return { points, pointString: pointString.trim() };
}

const defaultMargin = { top: 40, left: 80, right: 80, bottom: 80 };

export interface RadarChartComponentProps {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  levels?: number;
  data: LetterFrequency[];
  getValue: (d: LetterFrequency) => number;
}

export const Component: React.FC<RadarChartComponentProps> = ({
  width,
  height,
  margin = defaultMargin,
  levels = 5,
  data,
  getValue,
}) => {
  if (width < 10 || !data || data.length === 0) return null; 

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;

  
  if (radius <= 0) return null;

  const radialScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear<number>({
    range: [0, radius],
    domain: [0, Math.max(...data.map(getValue), 0)],
  });

  const webs = genAngles(data.length);
  const axisLineEndpoints = genPoints(data.length, radius); 
  const polygonDataPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, getValue);
  const zeroPoint = new Point({ x: 0, y: 0 });

  return (
    <svg width={width} height={height}>
      <rect fill={chartBackground} width={width} height={height} rx={14} />
      <Group top={margin.top + yMax / 2} left={margin.left + xMax / 2}>
        {[...new Array(levels)].map((_, i) => (
          <LineRadial
            key={`web-${i}`}
            data={webs}
            angle={(d) => radialScale(d.angle) ?? 0}
            radius={((i + 1) * radius) / levels}
            fill="none"
            stroke={silver}
            strokeWidth={2}
            strokeOpacity={0.8}
            strokeLinecap="round"
          />
        ))}
        {[...new Array(data.length)].map((_, i) => (
          <Line key={`radar-line-${i}`} from={zeroPoint} to={axisLineEndpoints[i]} stroke={silver} />
        ))}
        {polygonDataPoints.pointString && (
          <polygon
            points={polygonDataPoints.pointString}
            fill={orange}
            fillOpacity={0.3}
            stroke={orange}
            strokeWidth={1}
          />
        )}
        {polygonDataPoints.points.map((point, i) => (
          <circle key={`radar-point-${i}`} cx={point.x} cy={point.y} r={4} fill={pumpkin} />
        ))}
      </Group>
    </svg>
  ); 
};

code.demo.1748000957746.tsx
// src/demo.tsx
import React from 'react';
import { Component } from "@/components/ui/radar-chart";
import { letterFrequency, LetterFrequency } from '@visx/mock-data';
import { cn } from "@/lib/utils"; 
const demoData = letterFrequency.slice(2, 12);

const getValueAccessor = (d: LetterFrequency): number => d.frequency;

const DemoOne = () => { 
  return (
    <div className={cn("flex w-full min-h-screen justify-center items-center p-4 bg-gray-100")}>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Radar Chart Example</h1>
        <Component
          width={500}
          height={500}
          data={demoData}
          getValue={getValueAccessor}
          levels={5}
          margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
        />
      </div>
    </div>
  );
};

export { DemoOne }; 
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radar-chart.tsx
// src/components/ui/component.tsx
import React from 'react';
import { Group } from '@visx/group';
import { LetterFrequency } from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';
import { Point } from '@visx/point';
import { Line, LineRadial } from '@visx/shape';

const orange = '#ff9933';
export const pumpkin = '#f5810c';
const silver = '#d9d9d9';
export const chartBackground = '#FAF7E9';

const degrees = 360;

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (degrees / length) + (length % 2 === 0 ? 0 : degrees / length / 2),
  }));

const genPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step),
  }));
};


function genPolygonPoints<Datum>(
  dataArray: Datum[],
  scale: (n: number) => number,
  getValue: (d: Datum) => number,
) {
  const step = (Math.PI * 2) / dataArray.length;
  let pointString = "";
  const points: { x: number; y: number }[] = [];

  if (dataArray.length === 0) {
    return { points, pointString };
  }

  for (let i = 0; i < dataArray.length; i++) {
    const xVal = scale(getValue(dataArray[i])) * Math.sin(i * step);
    const yVal = scale(getValue(dataArray[i])) * Math.cos(i * step);
    points.push({ x: xVal, y: yVal });
    pointString += `${xVal},${yVal} `;
  }
  return { points, pointString: pointString.trim() };
}

const defaultMargin = { top: 40, left: 80, right: 80, bottom: 80 };

export interface RadarChartComponentProps {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  levels?: number;
  data: LetterFrequency[];
  getValue: (d: LetterFrequency) => number;
}

export const Component: React.FC<RadarChartComponentProps> = ({
  width,
  height,
  margin = defaultMargin,
  levels = 5,
  data,
  getValue,
}) => {
  if (width < 10 || !data || data.length === 0) return null; 

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;

  
  if (radius <= 0) return null;

  const radialScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear<number>({
    range: [0, radius],
    domain: [0, Math.max(...data.map(getValue), 0)],
  });

  const webs = genAngles(data.length);
  const axisLineEndpoints = genPoints(data.length, radius); 
  const polygonDataPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, getValue);
  const zeroPoint = new Point({ x: 0, y: 0 });

  return (
    <svg width={width} height={height}>
      <rect fill={chartBackground} width={width} height={height} rx={14} />
      <Group top={margin.top + yMax / 2} left={margin.left + xMax / 2}>
        {[...new Array(levels)].map((_, i) => (
          <LineRadial
            key={`web-${i}`}
            data={webs}
            angle={(d) => radialScale(d.angle) ?? 0}
            radius={((i + 1) * radius) / levels}
            fill="none"
            stroke={silver}
            strokeWidth={2}
            strokeOpacity={0.8}
            strokeLinecap="round"
          />
        ))}
        {[...new Array(data.length)].map((_, i) => (
          <Line key={`radar-line-${i}`} from={zeroPoint} to={axisLineEndpoints[i]} stroke={silver} />
        ))}
        {polygonDataPoints.pointString && (
          <polygon
            points={polygonDataPoints.pointString}
            fill={orange}
            fillOpacity={0.3}
            stroke={orange}
            strokeWidth={1}
          />
        )}
        {polygonDataPoints.points.map((point, i) => (
          <circle key={`radar-point-${i}`} cx={point.x} cy={point.y} r={4} fill={pumpkin} />
        ))}
      </Group>
    </svg>
  ); 
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/mock-data, @visx/scale, @visx/point, @visx/shape
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
