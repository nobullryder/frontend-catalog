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
radial-bar.tsx
// src/components/ui/radial-bars-component.tsx
import React, { useMemo, useState } from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientLightgreenGreen } from '@visx/gradient';
import { scaleBand, scaleRadial } from '@visx/scale';
import { Text } from '@visx/text';
import { cn } from "@/lib/utils"; 
const toRadians = (x: number) => (x * Math.PI) / 180;
const toDegrees = (x: number) => (x * 180) / Math.PI;

const defaultMargin = { top: 20, bottom: 20, left: 20, right: 20 };
const defaultBarColor = '#93F9B9';
const defaultInnerRadiusRatio = 1 / 3;

export interface RadialBarsComponentProps<Datum> {
  width: number;
  height: number;
  data: Datum[];
  getCategory: (d: Datum) => string;
  getValue: (d: Datum) => number;
  showControls?: boolean;
  margin?: { top: number; bottom: number; left: number; right: number };
  barColor?: string;
  innerRadiusRatio?: number; 
  initialRotation?: number; 
  initialSortByCategory?: boolean;
}

export const Component = <Datum,>({
  width,
  height,
  data,
  getCategory,
  getValue,
  showControls = true,
  margin = defaultMargin,
  barColor = defaultBarColor,
  innerRadiusRatio = defaultInnerRadiusRatio,
  initialRotation = 0, 
  initialSortByCategory = true,
}: RadialBarsComponentProps<Datum>) => {
  const [rotation, setRotation] = useState(toRadians(initialRotation)); 
  const [sortByCategory, setSortByCategory] = useState(initialSortByCategory);

  const categorySort = (a: Datum, b: Datum) => getCategory(a).localeCompare(getCategory(b));
  const valueSort = (a: Datum, b: Datum) => getValue(b) - getValue(a);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radiusMax = Math.min(xMax, yMax) / 2;
  const innerRadius = radiusMax * innerRadiusRatio;

  const xDomain = useMemo(
    () => data.slice().sort(sortByCategory ? categorySort : valueSort).map(getCategory),
    [data, sortByCategory, categorySort, valueSort, getCategory], 
  );

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0 + rotation, 2 * Math.PI + rotation],
        domain: xDomain,
        padding: 0.2,
      }),
    [rotation, xDomain],
  );

  const yScale = useMemo(
    () =>
      scaleRadial<number>({
        range: [innerRadius, radiusMax],
        domain: [0, Math.max(...data.map(getValue), 0)],
      }),
    [innerRadius, radiusMax, data, getValue], 
  );

  if (width < 10 || height < 10 || radiusMax <= 0) return null;

  return (
    <>
      <svg width={width} height={height}>
        <GradientLightgreenGreen id="radial-bars-green-gradient" />
        <rect width={width} height={height} fill="url(#radial-bars-green-gradient)" rx={14} />
        <Group top={yMax / 2 + margin.top} left={xMax / 2 + margin.left}>
          {data.map((d, i) => {
            const category = getCategory(d);
            const value = getValue(d);

            const startAngle = xScale(category);
            if (startAngle === undefined) return null;

            const midAngle = startAngle + xScale.bandwidth() / 2;
            const endAngle = startAngle + xScale.bandwidth();
            const outerRadius = yScale(value) ?? innerRadius; 
            const textRadius = outerRadius + 4; 
            const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
            const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

            return (
              <React.Fragment key={`bar-segment-${category}-${i}`}>
                <Arc
                  cornerRadius={4}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius > 0 ? innerRadius : 0.1} 
                  fill={barColor}
                />
                <Text
                  x={textX}
                  y={textY}
                  dominantBaseline="middle" 
                  textAnchor="middle"
                  fontSize={10} 
                  fontWeight="bold"
                  fill={barColor} 
                  angle={toDegrees(midAngle)}
                  angleDeg={toDegrees(midAngle)} 
                >
                  {category}
                </Text>
              </React.Fragment>
            );
          })}
        </Group>
      </svg>
      {showControls && (
        <div className={cn("radial-bars-controls p-4 space-y-2 text-sm bg-gray-50 rounded-b-lg")}>
          <div>
            <label className="flex items-center space-x-2">
              <strong>Rotate:</strong>
              <input
                type="range"
                min="0"
                max="360"
                className="w-full"
                value={toDegrees(rotation)}
                onChange={(e) => setRotation(toRadians(Number(e.target.value)))}
              />
              <span>{toDegrees(rotation).toFixed(0)}°</span>
            </label>
          </div>
          <div>
            <strong>Sort bars:</strong>
            <div className="flex space-x-4 mt-1">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name={`sort-type-${width}-${height}`} 
                  checked={sortByCategory}
                  onChange={() => setSortByCategory(true)}
                />
                <span>By Category</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name={`sort-type-${width}-${height}`} 
                  checked={!sortByCategory}
                  onChange={() => setSortByCategory(false)}
                />
                <span>By Value</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

code.demo.1748001298714.tsx
// src/demos/RadialBarsDemo.tsx
import React from 'react';

import { Component as RadialBarsComponent } from '@/components/ui/radial-bar';
import { letterFrequency, LetterFrequency } from '@visx/mock-data'; 
import { cn } from "@/lib/utils";


const chartData = letterFrequency.slice(0, 15); 
const getCategoryAccessor = (d: LetterFrequency): string => d.letter;
const getValueAccessor = (d: LetterFrequency): number => Number(d.frequency) * 100; 
const DemoOne = () => {
  return (
    <div className={cn("flex w-full min-h-screen justify-center items-center p-4 bg-slate-200")}>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-center text-gray-700">
                Radial Bar Chart (Letter Frequency)
            </h1>
        </div>
        <RadialBarsComponent<LetterFrequency> 
          width={600}
          height={600}
          data={chartData}
          getCategory={getCategoryAccessor}
          getValue={getValueAccessor}
          showControls={true}
          barColor="#88d8b0" 
        />
      </div>
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radial-bar.tsx
// src/components/ui/radial-bars-component.tsx
import React, { useMemo, useState } from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientLightgreenGreen } from '@visx/gradient';
import { scaleBand, scaleRadial } from '@visx/scale';
import { Text } from '@visx/text';
import { cn } from "@/lib/utils"; 
const toRadians = (x: number) => (x * Math.PI) / 180;
const toDegrees = (x: number) => (x * 180) / Math.PI;

const defaultMargin = { top: 20, bottom: 20, left: 20, right: 20 };
const defaultBarColor = '#93F9B9';
const defaultInnerRadiusRatio = 1 / 3;

export interface RadialBarsComponentProps<Datum> {
  width: number;
  height: number;
  data: Datum[];
  getCategory: (d: Datum) => string;
  getValue: (d: Datum) => number;
  showControls?: boolean;
  margin?: { top: number; bottom: number; left: number; right: number };
  barColor?: string;
  innerRadiusRatio?: number; 
  initialRotation?: number; 
  initialSortByCategory?: boolean;
}

export const Component = <Datum,>({
  width,
  height,
  data,
  getCategory,
  getValue,
  showControls = true,
  margin = defaultMargin,
  barColor = defaultBarColor,
  innerRadiusRatio = defaultInnerRadiusRatio,
  initialRotation = 0, 
  initialSortByCategory = true,
}: RadialBarsComponentProps<Datum>) => {
  const [rotation, setRotation] = useState(toRadians(initialRotation)); 
  const [sortByCategory, setSortByCategory] = useState(initialSortByCategory);

  const categorySort = (a: Datum, b: Datum) => getCategory(a).localeCompare(getCategory(b));
  const valueSort = (a: Datum, b: Datum) => getValue(b) - getValue(a);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radiusMax = Math.min(xMax, yMax) / 2;
  const innerRadius = radiusMax * innerRadiusRatio;

  const xDomain = useMemo(
    () => data.slice().sort(sortByCategory ? categorySort : valueSort).map(getCategory),
    [data, sortByCategory, categorySort, valueSort, getCategory], 
  );

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0 + rotation, 2 * Math.PI + rotation],
        domain: xDomain,
        padding: 0.2,
      }),
    [rotation, xDomain],
  );

  const yScale = useMemo(
    () =>
      scaleRadial<number>({
        range: [innerRadius, radiusMax],
        domain: [0, Math.max(...data.map(getValue), 0)],
      }),
    [innerRadius, radiusMax, data, getValue], 
  );

  if (width < 10 || height < 10 || radiusMax <= 0) return null;

  return (
    <>
      <svg width={width} height={height}>
        <GradientLightgreenGreen id="radial-bars-green-gradient" />
        <rect width={width} height={height} fill="url(#radial-bars-green-gradient)" rx={14} />
        <Group top={yMax / 2 + margin.top} left={xMax / 2 + margin.left}>
          {data.map((d, i) => {
            const category = getCategory(d);
            const value = getValue(d);

            const startAngle = xScale(category);
            if (startAngle === undefined) return null;

            const midAngle = startAngle + xScale.bandwidth() / 2;
            const endAngle = startAngle + xScale.bandwidth();
            const outerRadius = yScale(value) ?? innerRadius; 
            const textRadius = outerRadius + 4; 
            const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
            const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

            return (
              <React.Fragment key={`bar-segment-${category}-${i}`}>
                <Arc
                  cornerRadius={4}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius > 0 ? innerRadius : 0.1} 
                  fill={barColor}
                />
                <Text
                  x={textX}
                  y={textY}
                  dominantBaseline="middle" 
                  textAnchor="middle"
                  fontSize={10} 
                  fontWeight="bold"
                  fill={barColor} 
                  angle={toDegrees(midAngle)}
                  angleDeg={toDegrees(midAngle)} 
                >
                  {category}
                </Text>
              </React.Fragment>
            );
          })}
        </Group>
      </svg>
      {showControls && (
        <div className={cn("radial-bars-controls p-4 space-y-2 text-sm bg-gray-50 rounded-b-lg")}>
          <div>
            <label className="flex items-center space-x-2">
              <strong>Rotate:</strong>
              <input
                type="range"
                min="0"
                max="360"
                className="w-full"
                value={toDegrees(rotation)}
                onChange={(e) => setRotation(toRadians(Number(e.target.value)))}
              />
              <span>{toDegrees(rotation).toFixed(0)}°</span>
            </label>
          </div>
          <div>
            <strong>Sort bars:</strong>
            <div className="flex space-x-4 mt-1">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name={`sort-type-${width}-${height}`} 
                  checked={sortByCategory}
                  onChange={() => setSortByCategory(true)}
                />
                <span>By Category</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name={`sort-type-${width}-${height}`} 
                  checked={!sortByCategory}
                  onChange={() => setSortByCategory(false)}
                />
                <span>By Value</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
```

Install NPM dependencies:
```bash
@visx/shape, @visx/group, @visx/gradient, @visx/scale, @visx/text
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
