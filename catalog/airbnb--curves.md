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
curves.tsx
// components/ui/component.tsx
/* eslint react/jsx-handler-names: "off" */
import React, { useState, useMemo, useRef } from 'react';
import { extent, max } from '@visx/vendor/d3-array'; 
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group'; 
import { LinePath } from '@visx/shape'; 
import { scaleTime, scaleLinear } from '@visx/scale';
import { MarkerArrow, MarkerCross, MarkerX, MarkerCircle, MarkerLine } from '@visx/marker'; 
import generateDateValue, { DateValue } from '@visx/mock-data/lib/generators/genDateValue';

type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);
const lineCount = 5;
const series = new Array(lineCount).fill(null).map((_, i) =>
  generateDateValue(25,  i / 72).sort(
    (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime(),
  ),
);
const allData = series.reduce((rec, d) => rec.concat(d), []);

const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

const xScale = scaleTime<number>({
  domain: extent(allData, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
  domain: [0, max(allData, getY) as number],
});

export type ComponentProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

export const Component = ({ width, height, showControls = true }: ComponentProps) => {
  const [curveType, setCurveType] = useState<CurveType>('curveNatural');
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const svgHeight = showControls ? height - 40 : height;
  const lineHeight = svgHeight / lineCount;

  xScale.range([0, width - 50]);
  yScale.range([lineHeight - 2, 0]);

  return (
    <div className="visx-curves-demo">
      {showControls && (
        <>
          <label>
            Curve type  
            <select onChange={(e) => setCurveType(e.target.value as CurveType)} value={curveType}>
              {curveTypes.map((curve) => (
                <option key={curve} value={curve}>
                  {curve}
                </option>
              ))}
            </select>
          </label>
           
          <label>
            Show points 
            <input
              type="checkbox"
              checked={showPoints}
              onChange={() => setShowPoints(!showPoints)}
            />
          </label>
          <br />
        </>
      )}
      <svg width={width} height={svgHeight}>
        <MarkerX
          id="marker-x"
          stroke="#333"
          size={22}
          strokeWidth={4}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCross
          id="marker-cross"
          stroke="#333"
          size={22}
          strokeWidth={4}
          strokeOpacity={0.6}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
        <MarkerArrow id="marker-arrow-odd" stroke="#333" size={8} strokeWidth={1} />
        <MarkerLine id="marker-line" fill="#333" size={16} strokeWidth={1} />
        <MarkerArrow id="marker-arrow" fill="#333" refX={2} size={6} />
        <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14} />
        {width > 8 &&
          series.map((lineData, i) => {
            const even = i % 2 === 0;
            let markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
            if (i === 1) markerStart = 'url(#marker-line)';
            const markerEnd = even ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)';
            return (
              <Group key={`lines-${i}`} top={i * lineHeight} left={13}>
                {showPoints &&
                  lineData.map((d, j) => (
                    <circle
                      key={i + j}
                      r={3}
                      cx={xScale(getX(d))}
                      cy={yScale(getY(d))}
                      stroke="rgba(33,33,33,0.5)"
                      fill="transparent"
                    />
                  ))}
                <LinePath<DateValue>
                  curve={allCurves[curveType]}
                  data={lineData}
                  x={(d) => xScale(getX(d)) ?? 0}
                  y={(d) => yScale(getY(d)) ?? 0}
                  stroke="#333"
                  strokeWidth={even ? 2 : 1}
                  strokeOpacity={even ? 0.6 : 1}
                  shapeRendering="geometricPrecision"
                  markerMid="url(#marker-circle)"
                  markerStart={markerStart}
                  markerEnd={markerEnd}
                />
              </Group>
            );
          })}
      </svg>
      <style jsx>{`
        .visx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

code.demo.1747928089336.tsx
// DemoOne.tsx
import React, { useState, useEffect } from "react";
import { Component } from "@/components/ui/curves"; 
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

  
  const showControls = true; 

  
  const controlledHeight = showControls ? chartHeight - 40 : chartHeight;

  return (
    <div className={cn("w-screen h-screen overflow-hidden bg-gray-800 flex justify-center items-center")}>
      <Component
        width={chartWidth * 0.9} 
        height={controlledHeight * 0.9} 
        showControls={showControls}
      />
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/curves.tsx
// components/ui/component.tsx
/* eslint react/jsx-handler-names: "off" */
import React, { useState, useMemo, useRef } from 'react';
import { extent, max } from '@visx/vendor/d3-array'; 
import * as allCurves from '@visx/curve';
import { Group } from '@visx/group'; 
import { LinePath } from '@visx/shape'; 
import { scaleTime, scaleLinear } from '@visx/scale';
import { MarkerArrow, MarkerCross, MarkerX, MarkerCircle, MarkerLine } from '@visx/marker'; 
import generateDateValue, { DateValue } from '@visx/mock-data/lib/generators/genDateValue';

type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);
const lineCount = 5;
const series = new Array(lineCount).fill(null).map((_, i) =>
  generateDateValue(25,  i / 72).sort(
    (a: DateValue, b: DateValue) => a.date.getTime() - b.date.getTime(),
  ),
);
const allData = series.reduce((rec, d) => rec.concat(d), []);

const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

const xScale = scaleTime<number>({
  domain: extent(allData, getX) as [Date, Date],
});
const yScale = scaleLinear<number>({
  domain: [0, max(allData, getY) as number],
});

export type ComponentProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

export const Component = ({ width, height, showControls = true }: ComponentProps) => {
  const [curveType, setCurveType] = useState<CurveType>('curveNatural');
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const svgHeight = showControls ? height - 40 : height;
  const lineHeight = svgHeight / lineCount;

  xScale.range([0, width - 50]);
  yScale.range([lineHeight - 2, 0]);

  return (
    <div className="visx-curves-demo">
      {showControls && (
        <>
          <label>
            Curve type  
            <select onChange={(e) => setCurveType(e.target.value as CurveType)} value={curveType}>
              {curveTypes.map((curve) => (
                <option key={curve} value={curve}>
                  {curve}
                </option>
              ))}
            </select>
          </label>
           
          <label>
            Show points 
            <input
              type="checkbox"
              checked={showPoints}
              onChange={() => setShowPoints(!showPoints)}
            />
          </label>
          <br />
        </>
      )}
      <svg width={width} height={svgHeight}>
        <MarkerX
          id="marker-x"
          stroke="#333"
          size={22}
          strokeWidth={4}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCross
          id="marker-cross"
          stroke="#333"
          size={22}
          strokeWidth={4}
          strokeOpacity={0.6}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCircle id="marker-circle" fill="#333" size={2} refX={2} />
        <MarkerArrow id="marker-arrow-odd" stroke="#333" size={8} strokeWidth={1} />
        <MarkerLine id="marker-line" fill="#333" size={16} strokeWidth={1} />
        <MarkerArrow id="marker-arrow" fill="#333" refX={2} size={6} />
        <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14} />
        {width > 8 &&
          series.map((lineData, i) => {
            const even = i % 2 === 0;
            let markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
            if (i === 1) markerStart = 'url(#marker-line)';
            const markerEnd = even ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)';
            return (
              <Group key={`lines-${i}`} top={i * lineHeight} left={13}>
                {showPoints &&
                  lineData.map((d, j) => (
                    <circle
                      key={i + j}
                      r={3}
                      cx={xScale(getX(d))}
                      cy={yScale(getY(d))}
                      stroke="rgba(33,33,33,0.5)"
                      fill="transparent"
                    />
                  ))}
                <LinePath<DateValue>
                  curve={allCurves[curveType]}
                  data={lineData}
                  x={(d) => xScale(getX(d)) ?? 0}
                  y={(d) => yScale(getY(d)) ?? 0}
                  stroke="#333"
                  strokeWidth={even ? 2 : 1}
                  strokeOpacity={even ? 0.6 : 1}
                  shapeRendering="geometricPrecision"
                  markerMid="url(#marker-circle)"
                  markerStart={markerStart}
                  markerEnd={markerEnd}
                />
              </Group>
            );
          })}
      </svg>
      <style jsx>{`
        .visx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};
```

Install NPM dependencies:
```bash
@visx/vendor, @visx/curve, @visx/group, @visx/shape, @visx/scale, @visx/marker, @visx/mock-data
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
