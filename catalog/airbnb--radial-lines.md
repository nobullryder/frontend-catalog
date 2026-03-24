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
radial-lines.tsx
// components/ui/component.tsx
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Group } from '@visx/group';
import { LineRadial } from '@visx/shape';
import { scaleTime, scaleLog, NumberLike } from '@visx/scale';
import { curveBasisOpen } from '@visx/curve';
import { appleStock, AppleStock } from '@visx/mock-data';
import { LinearGradient } from '@visx/gradient';
import { AxisLeft } from '@visx/axis';
import { GridRadial, GridAngle } from '@visx/grid'; 
import { animated, useSpring } from '@react-spring/web';

const green = '#e5fd3d';
export const blue = '#aeeef8';
const darkgreen = '#dff84d';
export const background = '#744cca';
const darkbackground = '#603FA8';
const strokeColor = '#744cca';
const springConfig = {
  tension: 20,
};

function extent<Datum>(data: Datum[], value: (d: Datum) => number) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const date = (d: AppleStock) => new Date(d.date).valueOf();
const close = (d: AppleStock) => d.close;
const formatTicks = (val: NumberLike) => String(val);

const padding = 20;

const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

export type ComponentProps = {
  width: number;
  height: number;
  animate?: boolean;
};

export const Component = ({ width, height, animate = true }: ComponentProps) => {
  const lineRef = useRef<SVGPathElement>(null);
  const [lineLength, setLineLength] = useState<number>(0);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  const spring = useSpring({
    frame: shouldAnimate ? 0 : 1,
    config: springConfig,
    onRest: () => setShouldAnimate(false),
  });

  const effectDependency = lineRef.current;
  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, [effectDependency]);

  if (width < 10) return null;

  const xScale = useMemo(() => scaleTime({
    range: [0, Math.PI * 2],
    domain: extent(appleStock, date),
  }), []);

  const yScale = useMemo(() => scaleLog<number>({
    domain: extent(appleStock, close),
    range: [0, height / 2 - padding],
  }), [height]);

  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  const angle = useCallback((d: AppleStock) => xScale(date(d)) ?? 0, [xScale]);
  const radius = useCallback((d: AppleStock) => yScale(close(d)) ?? 0, [yScale]);

  const handlePress = () => setShouldAnimate(true);

  return (
    <>
      {animate && (
        <>
          <button type="button" onClick={handlePress} onTouchStart={handlePress}>
            Animate
          </button>
          <br />
        </>
      )}
      <svg width={width} height={height} onClick={() => setShouldAnimate(!shouldAnimate)}>
        <LinearGradient from={green} to={blue} id="line-gradient" />
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={height / 2} left={width / 2}>
          <GridAngle
            scale={xScale}
            outerRadius={height / 2 - padding}
            stroke={green}
            strokeWidth={1}
            strokeOpacity={0.3}
            strokeDasharray="5,2"
            numTicks={20}
          />
          <GridRadial
            scale={yScale}
            numTicks={5}
            stroke={blue}
            strokeWidth={1}
            fill={blue}
            fillOpacity={0.1}
            strokeOpacity={0.2}
          />
          <AxisLeft
            top={-height / 2 + padding}
            scale={reverseYScale}
            numTicks={5}
            tickStroke="none"
            tickLabelProps={{
              fontSize: 8,
              fill: blue,
              fillOpacity: 1,
              textAnchor: 'middle',
              dx: '1em',
              dy: '-0.5em',
              stroke: strokeColor,
              strokeWidth: 0.5,
              paintOrder: 'stroke',
            }}
            tickFormat={formatTicks}
            hideAxisLine
          />
          <LineRadial angle={angle} radius={radius} curve={curveBasisOpen}>
            {({ path }) => {
              const d = path(appleStock) || '';
              return (
                <>
                  <animated.path
                    d={d}
                    ref={lineRef}
                    strokeWidth={2}
                    strokeOpacity={0.8}
                    strokeLinecap="round"
                    fill="none"
                    stroke={animate ? darkbackground : 'url(#line-gradient)'}
                  />
                  {shouldAnimate && (
                    <animated.path
                      d={d}
                      strokeWidth={2}
                      strokeOpacity={0.8}
                      strokeLinecap="round"
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeDashoffset={spring.frame.interpolate((v) => v * lineLength)}
                      strokeDasharray={lineLength}
                    />
                  )}
                </>
              );
            }}
          </LineRadial>

          {[firstPoint, lastPoint].map((d, i) => {
            const cx = ((xScale(date(d)) ?? 0) * Math.PI) / 180;
            const cy = -(yScale(close(d)) ?? 0);
            return <circle key={`line-cap-${i}`} cx={cx} cy={cy} fill={darkgreen} r={3} />;
          })}
        </Group>
      </svg>
    </>
  );
};

code.demo.1747929620693.tsx
// DemoOne.tsx
import React, { useState, useEffect } from 'react';
import { Component, background } from '@/components/ui/radial-lines';
import { cn } from '@/lib/utils';

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
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
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

  const animateByDefault = true;

  return (
    <div className={cn("w-screen h-screen overflow-hidden flex justify-center items-center")} style={{ backgroundColor: background }}>
      <Component
        width={chartWidth}
        height={chartHeight}
        animate={animateByDefault}
      />
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radial-lines.tsx
// components/ui/component.tsx
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Group } from '@visx/group';
import { LineRadial } from '@visx/shape';
import { scaleTime, scaleLog, NumberLike } from '@visx/scale';
import { curveBasisOpen } from '@visx/curve';
import { appleStock, AppleStock } from '@visx/mock-data';
import { LinearGradient } from '@visx/gradient';
import { AxisLeft } from '@visx/axis';
import { GridRadial, GridAngle } from '@visx/grid'; 
import { animated, useSpring } from '@react-spring/web';

const green = '#e5fd3d';
export const blue = '#aeeef8';
const darkgreen = '#dff84d';
export const background = '#744cca';
const darkbackground = '#603FA8';
const strokeColor = '#744cca';
const springConfig = {
  tension: 20,
};

function extent<Datum>(data: Datum[], value: (d: Datum) => number) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const date = (d: AppleStock) => new Date(d.date).valueOf();
const close = (d: AppleStock) => d.close;
const formatTicks = (val: NumberLike) => String(val);

const padding = 20;

const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

export type ComponentProps = {
  width: number;
  height: number;
  animate?: boolean;
};

export const Component = ({ width, height, animate = true }: ComponentProps) => {
  const lineRef = useRef<SVGPathElement>(null);
  const [lineLength, setLineLength] = useState<number>(0);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  const spring = useSpring({
    frame: shouldAnimate ? 0 : 1,
    config: springConfig,
    onRest: () => setShouldAnimate(false),
  });

  const effectDependency = lineRef.current;
  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, [effectDependency]);

  if (width < 10) return null;

  const xScale = useMemo(() => scaleTime({
    range: [0, Math.PI * 2],
    domain: extent(appleStock, date),
  }), []);

  const yScale = useMemo(() => scaleLog<number>({
    domain: extent(appleStock, close),
    range: [0, height / 2 - padding],
  }), [height]);

  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  const angle = useCallback((d: AppleStock) => xScale(date(d)) ?? 0, [xScale]);
  const radius = useCallback((d: AppleStock) => yScale(close(d)) ?? 0, [yScale]);

  const handlePress = () => setShouldAnimate(true);

  return (
    <>
      {animate && (
        <>
          <button type="button" onClick={handlePress} onTouchStart={handlePress}>
            Animate
          </button>
          <br />
        </>
      )}
      <svg width={width} height={height} onClick={() => setShouldAnimate(!shouldAnimate)}>
        <LinearGradient from={green} to={blue} id="line-gradient" />
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={height / 2} left={width / 2}>
          <GridAngle
            scale={xScale}
            outerRadius={height / 2 - padding}
            stroke={green}
            strokeWidth={1}
            strokeOpacity={0.3}
            strokeDasharray="5,2"
            numTicks={20}
          />
          <GridRadial
            scale={yScale}
            numTicks={5}
            stroke={blue}
            strokeWidth={1}
            fill={blue}
            fillOpacity={0.1}
            strokeOpacity={0.2}
          />
          <AxisLeft
            top={-height / 2 + padding}
            scale={reverseYScale}
            numTicks={5}
            tickStroke="none"
            tickLabelProps={{
              fontSize: 8,
              fill: blue,
              fillOpacity: 1,
              textAnchor: 'middle',
              dx: '1em',
              dy: '-0.5em',
              stroke: strokeColor,
              strokeWidth: 0.5,
              paintOrder: 'stroke',
            }}
            tickFormat={formatTicks}
            hideAxisLine
          />
          <LineRadial angle={angle} radius={radius} curve={curveBasisOpen}>
            {({ path }) => {
              const d = path(appleStock) || '';
              return (
                <>
                  <animated.path
                    d={d}
                    ref={lineRef}
                    strokeWidth={2}
                    strokeOpacity={0.8}
                    strokeLinecap="round"
                    fill="none"
                    stroke={animate ? darkbackground : 'url(#line-gradient)'}
                  />
                  {shouldAnimate && (
                    <animated.path
                      d={d}
                      strokeWidth={2}
                      strokeOpacity={0.8}
                      strokeLinecap="round"
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeDashoffset={spring.frame.interpolate((v) => v * lineLength)}
                      strokeDasharray={lineLength}
                    />
                  )}
                </>
              );
            }}
          </LineRadial>

          {[firstPoint, lastPoint].map((d, i) => {
            const cx = ((xScale(date(d)) ?? 0) * Math.PI) / 180;
            const cy = -(yScale(close(d)) ?? 0);
            return <circle key={`line-cap-${i}`} cx={cx} cy={cy} fill={darkgreen} r={3} />;
          })}
        </Group>
      </svg>
    </>
  );
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/shape, @visx/scale, @visx/curve, @visx/mock-data, @visx/gradient, @visx/axis, @visx/grid, @react-spring/web
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
