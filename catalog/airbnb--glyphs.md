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
glyphs.tsx
// components/ui/component.tsx
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import {
  Glyph as CustomGlyph,
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphSquare,
  GlyphStar,
  GlyphTriangle,
  GlyphWye,
} from '@visx/glyph';
import { LinePath } from '@visx/shape';
import { genDateValue, DateValue } from '@visx/mock-data'; 
import { scaleTime, scaleLinear } from '@visx/scale';
import { curveMonotoneX, curveBasis } from '@visx/curve';

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

export const primaryColor = '#8921e0';
export const secondaryColor = '#00f2ff';
const contrastColor = '#ffffff';

const Glyphs = [
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphStar,
  GlyphTriangle,
  GlyphSquare,
  GlyphWye,
  ({ left, top }: { left: number; top: number }) => (
    <CustomGlyph left={left} top={top}>
      <circle r={12} fill={secondaryColor} />
      <text fontSize={16} textAnchor="middle" dy="0.5em">
        {'💜'}
      </text>
    </CustomGlyph>
  ),
];

const data: DateValue[] = genDateValue(Glyphs.length * 2, 0.91);

const date = (d: DateValue) => d.date.valueOf();
const value = (d: DateValue) => d.value;

export type ComponentProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

export const Component = ({ width, height, margin = defaultMargin }: ComponentProps) => {
  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => scaleTime<number>({
    domain: [Math.min(...data.map(date)), Math.max(...data.map(date))],
    range: [0, innerWidth],
  }), [innerWidth]);

  const yScale = useMemo(() => scaleLinear<number>({
    domain: [0, Math.max(...data.map(value))],
    range: [innerHeight, 0],
  }), [innerHeight]);

  const getX = (d: DateValue) => xScale(date(d)) ?? 0;
  const getY = (d: DateValue) => yScale(value(d)) ?? 0;

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={secondaryColor} rx={14} />
      <Group left={margin.left} top={margin.top}>
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke={primaryColor}
          strokeWidth={2}
          strokeDasharray="2,2"
          curve={curveBasis}
        />
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke={primaryColor}
          strokeWidth={2}
          curve={curveMonotoneX}
        />
        {data.map((d, i) => {
          const CurrGlyph = Glyphs[i % Glyphs.length];
          const left = getX(d);
          const top = getY(d);
          return (
            <g key={`line-glyph-${i}`}>
              <CurrGlyph
                left={left}
                top={top}
                size={110}
                stroke={secondaryColor}
                strokeWidth={10}
              />
              <CurrGlyph
                left={left}
                top={top}
                size={110}
                fill={i % 2 === 0 ? primaryColor : contrastColor}
                stroke={i % 2 === 0 ? contrastColor : primaryColor}
                strokeWidth={2}
              />
            </g>
          );
        })}
      </Group>
    </svg>
  );
};

code.demo.1747933444372.tsx
// DemoOne.tsx
import React, { useState, useEffect } from "react";
import { Component, secondaryColor } from "@/components/ui/glyphs";
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
    <div className={cn("w-screen h-screen overflow-hidden flex justify-center items-center")} style={{ backgroundColor: secondaryColor }}>
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
src/components/ui/glyphs.tsx
// components/ui/component.tsx
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import {
  Glyph as CustomGlyph,
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphSquare,
  GlyphStar,
  GlyphTriangle,
  GlyphWye,
} from '@visx/glyph';
import { LinePath } from '@visx/shape';
import { genDateValue, DateValue } from '@visx/mock-data'; 
import { scaleTime, scaleLinear } from '@visx/scale';
import { curveMonotoneX, curveBasis } from '@visx/curve';

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

export const primaryColor = '#8921e0';
export const secondaryColor = '#00f2ff';
const contrastColor = '#ffffff';

const Glyphs = [
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphStar,
  GlyphTriangle,
  GlyphSquare,
  GlyphWye,
  ({ left, top }: { left: number; top: number }) => (
    <CustomGlyph left={left} top={top}>
      <circle r={12} fill={secondaryColor} />
      <text fontSize={16} textAnchor="middle" dy="0.5em">
        {'💜'}
      </text>
    </CustomGlyph>
  ),
];

const data: DateValue[] = genDateValue(Glyphs.length * 2, 0.91);

const date = (d: DateValue) => d.date.valueOf();
const value = (d: DateValue) => d.value;

export type ComponentProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

export const Component = ({ width, height, margin = defaultMargin }: ComponentProps) => {
  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => scaleTime<number>({
    domain: [Math.min(...data.map(date)), Math.max(...data.map(date))],
    range: [0, innerWidth],
  }), [innerWidth]);

  const yScale = useMemo(() => scaleLinear<number>({
    domain: [0, Math.max(...data.map(value))],
    range: [innerHeight, 0],
  }), [innerHeight]);

  const getX = (d: DateValue) => xScale(date(d)) ?? 0;
  const getY = (d: DateValue) => yScale(value(d)) ?? 0;

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={secondaryColor} rx={14} />
      <Group left={margin.left} top={margin.top}>
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke={primaryColor}
          strokeWidth={2}
          strokeDasharray="2,2"
          curve={curveBasis}
        />
        <LinePath
          data={data}
          x={getX}
          y={getY}
          stroke={primaryColor}
          strokeWidth={2}
          curve={curveMonotoneX}
        />
        {data.map((d, i) => {
          const CurrGlyph = Glyphs[i % Glyphs.length];
          const left = getX(d);
          const top = getY(d);
          return (
            <g key={`line-glyph-${i}`}>
              <CurrGlyph
                left={left}
                top={top}
                size={110}
                stroke={secondaryColor}
                strokeWidth={10}
              />
              <CurrGlyph
                left={left}
                top={top}
                size={110}
                fill={i % 2 === 0 ? primaryColor : contrastColor}
                stroke={i % 2 === 0 ? contrastColor : primaryColor}
                strokeWidth={2}
              />
            </g>
          );
        })}
      </Group>
    </svg>
  );
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/glyph, @visx/shape, @visx/mock-data, @visx/scale, @visx/curve
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
