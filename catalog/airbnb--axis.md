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
axis.tsx
// components/ui/component.tsx
import React, { useCallback, useState, useMemo } from 'react';
import AreaClosed from '@visx/shape/lib/shapes/AreaClosed';
import { curveMonotoneX } from '@visx/curve';
import { scaleUtc, scaleLinear, scaleLog, scaleBand, ScaleInput, coerceNumber } from '@visx/scale';
import { Axis, Orientation, SharedAxisProps, AxisScale } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { AnimatedAxis, AnimatedGridRows, AnimatedGridColumns } from '@visx/react-spring';
import { getSeededRandom } from '@visx/mock-data';
import { LinearGradient } from '@visx/gradient';
import { timeFormat } from '@visx/vendor/d3-time-format';
import { GridRowsProps } from '@visx/grid/lib/grids/GridRows';
import { GridColumnsProps } from '@visx/grid/lib/grids/GridColumns';

export const backgroundColor = '#da7cff';
const axisColor = '#fff';
const tickLabelColor = '#fff';
export const labelColor = '#340098';
const gridColor = '#6e0fca';
const seededRandom = getSeededRandom(0.5);
const margin = {
  top: 40,
  right: 150,
  bottom: 20,
  left: 50,
};

const tickLabelProps = {
  fill: tickLabelColor,
  fontSize: 12,
  fontFamily: 'sans-serif',
  textAnchor: 'middle',
} as const;

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

export type VisxAxisProps = {
  width: number;
  height: number;
  showControls?: boolean; 
  dataToggle: boolean;
  animationTrajectory: AnimationTrajectory;
  useAnimatedComponents: boolean;
};

type AnimationTrajectory = 'outside' | 'center' | 'min' | 'max' | undefined;

type AxisComponentType = React.FC<
  SharedAxisProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;
type GridRowsComponentType = React.FC<
  GridRowsProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;
type GridColumnsComponentType = React.FC<
  GridColumnsProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;

export const Component = ({
  width: outerWidth = 800,
  height: outerHeight = 800,
  showControls = true,
  dataToggle,
  animationTrajectory,
  useAnimatedComponents,
}: VisxAxisProps) => {

  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  interface AxisDemoProps<Scale extends AxisScale> extends SharedAxisProps<Scale> {
    values: ScaleInput<Scale>[];
  }

  const AxisComponent: AxisComponentType = useAnimatedComponents ? AnimatedAxis : Axis;
  const GridRowsComponent: GridRowsComponentType = useAnimatedComponents
    ? AnimatedGridRows
    : GridRows;
  const GridColumnsComponent: GridColumnsComponentType = useAnimatedComponents
    ? AnimatedGridColumns
    : GridColumns;

  const axes: AxisDemoProps<AxisScale<number>>[] = useMemo(() => {
    const linearValues = dataToggle ? [0, 2, 4, 6, 8, 10] : [6, 8, 10, 12];
    const bandValues = dataToggle ? ['a', 'b', 'c', 'd'] : ['d', 'c', 'b', 'a'];
    const timeValues = dataToggle
      ? [new Date('2020-01-01'), new Date('2020-02-01')]
      : [new Date('2020-02-01'), new Date('2020-03-01')];
    const logValues = dataToggle ? [1, 10, 100, 1000, 10000] : [0.0001, 0.001, 0.1, 1, 10, 100];

    return [
      {
        scale: scaleLinear({
          domain: getMinMax(linearValues),
          range: [0, width],
        }),
        values: linearValues,
        tickFormat: (v: number, index: number, ticks: { value: number; index: number }[]) =>
          index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : `${v}`,
        label: 'linear',
      },
      {
        scale: scaleBand({
          domain: bandValues,
          range: [0, width],
          paddingOuter: 0,
          paddingInner: 1,
        }),
        values: bandValues,
        tickFormat: (v: string) => v,
        label: 'categories',
      },
      {
        scale: scaleUtc({
          domain: getMinMax(timeValues),
          range: [0, width],
        }),
        values: timeValues,
        tickFormat: (v: Date, i: number) =>
          i === 3 ? '🎉' : width > 400 || i % 2 === 0 ? timeFormat('%b %d')(v) : '',
        label: 'time',
      },
      {
        scale: scaleLog({
          domain: getMinMax(logValues),
          range: [0, width],
        }),
        values: logValues,
        tickFormat: (v: number) => {
          const asString = `${v}`;
          return asString.match(/^[.01?[\]]*$/) ? asString : '';
        },
        label: 'log',
      },
    ];
  }, [dataToggle, width]);

  if (width < 10) return null;

  const scalePadding = 40;
  const scaleHeight = height / axes.length - scalePadding;

  const yScale = scaleLinear({
    domain: [100, 0],
    range: [scaleHeight, 0],
  });

  return (
    <>
      <svg width={outerWidth} height={outerHeight}>
        <LinearGradient
          id="visx-axis-gradient"
          from={backgroundColor}
          to={backgroundColor}
          toOpacity={0.5}
        />
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          fill={'url(#visx-axis-gradient)'}
          rx={14}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          {axes.map(({ scale, values, label, tickFormat }, i) => (
            <g key={`scale-${i}`} transform={`translate(0, ${i * (scaleHeight + scalePadding)})`}>
              <GridRowsComponent
                key={`gridrows-${animationTrajectory}`}
                scale={yScale}
                stroke={gridColor}
                width={width}
                numTicks={dataToggle ? 1 : 3}
                animationTrajectory={animationTrajectory}
              />
              <GridColumnsComponent
                key={`gridcolumns-${animationTrajectory}`}
                scale={scale}
                stroke={gridColor}
                height={scaleHeight}
                numTicks={dataToggle ? 5 : 2}
                animationTrajectory={animationTrajectory}
              />
              <AreaClosed
                data={values.map((x) => [
                  (scale(x) ?? 0) +
                    ('bandwidth' in scale && typeof scale!.bandwidth !== 'undefined'
                      ? scale.bandwidth!() / 2
                      : 0),
                  yScale(10 + seededRandom() * 90),
                ])}
                yScale={yScale}
                curve={curveMonotoneX}
                fill={gridColor}
                fillOpacity={0.2}
              />
              <AxisComponent
                key={`axis-${animationTrajectory}`}
                orientation={Orientation.bottom}
                top={scaleHeight}
                scale={scale}
                tickFormat={tickFormat}
                stroke={axisColor}
                tickStroke={axisColor}
                tickLabelProps={tickLabelProps}
                tickValues={label === 'log' || label === 'time' ? undefined : values}
                numTicks={label === 'time' ? 6 : undefined}
                label={label}
                labelProps={{
                  x: width + 30,
                  y: -10,
                  fill: labelColor,
                  fontSize: 18,
                  strokeWidth: 0,
                  stroke: '#fff',
                  paintOrder: 'stroke',
                  fontFamily: 'sans-serif',
                  textAnchor: 'start',
                }}
                animationTrajectory={animationTrajectory}
              />
            </g>
          ))}
        </g>
      </svg>
      {showControls && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: 10 }}>
          <div style={{ fontSize: 12 }}>
            <label>
              <input
                type="checkbox"
                checked={useAnimatedComponents}
                onChange={() => { /* Handled in DemoOne */ }}
              />{' '}
              enable animation
            </label>
               
            {useAnimatedComponents && (
              <>
                <strong>animation trajectory</strong>
                <label>
                  <input
                    type="radio"
                    value="outside"
                    checked={animationTrajectory === 'outside'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  outside
                </label>
                <label>
                  <input
                    type="radio"
                    value="center"
                    checked={animationTrajectory === 'center'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  center
                </label>
                <label>
                  <input
                    type="radio"
                    value="min"
                    checked={animationTrajectory === 'min'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  min
                </label>
                <label>
                  <input
                    type="radio"
                    value="max"
                    checked={animationTrajectory === 'max'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  max
                </label>
              </>
            )}
          </div>
          {useAnimatedComponents && (
            <button onClick={() => { /* Handled in DemoOne */ }}>Update scales</button>
          )}
        </div>
      )}
    </>
  );
}

code.demo.1747921921329.tsx
// DemoOne.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Component, backgroundColor } from '@/components/ui/axis';
import { cn } from '@/lib/utils';

type AnimationTrajectory = 'outside' | 'center' | 'min' | 'max' | undefined;

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


  const [useAnimatedComponents, setUseAnimatedComponents] = useState(true); // 
  const [dataToggle, setDataToggle] = useState(true);
  const [animationTrajectory, setAnimationTrajectory] = useState<AnimationTrajectory>('center');

  const outerWidth = dimensions.width;
  const outerHeight = dimensions.height;

  if (outerWidth === 0 || outerHeight === 0) {
    return (
      <div className={cn("flex w-screen h-screen justify-center items-center bg-gray-900 text-white")}>
        Загрузка...
      </div>
    );
  }

  return (
    <div className={cn("w-screen h-screen overflow-hidden flex justify-center items-center")} style={{ backgroundColor: backgroundColor }}>
      <Component
        width={outerWidth}
        height={outerHeight}
        showControls={true}
        dataToggle={dataToggle}
        animationTrajectory={animationTrajectory}
        useAnimatedComponents={useAnimatedComponents}
      />

      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: 10 }}>
        <div style={{ fontSize: 12 }}>
          <label>
            <input
              type="checkbox"
              checked={useAnimatedComponents}
              onChange={() => { }} 
              disabled={true} 
            />{' '}
            enable animation
          </label>
             
          {useAnimatedComponents && ( 
            <>
              <strong>animation trajectory</strong>
              <label>
                <input
                  type="radio"
                  value="outside"
                  checked={animationTrajectory === 'outside'}
                  onChange={() => setAnimationTrajectory('outside')}
                />{' '}
                outside
              </label>
              <label>
                <input
                  type="radio"
                  value="center"
                  checked={animationTrajectory === 'center'}
                  onChange={() => setAnimationTrajectory('center')}
                />{' '}
                center
              </label>
              <label>
                <input
                  type="radio"
                  value="min"
                  checked={animationTrajectory === 'min'}
                  onChange={() => setAnimationTrajectory('min')}
                />{' '}
                min
              </label>
              <label>
                <input
                  type="radio"
                  value="max"
                  checked={animationTrajectory === 'max'}
                  onChange={() => setAnimationTrajectory('max')}
                />{' '}
                max
              </label>
            </>
          )}
        </div>
        {useAnimatedComponents && (
          <button onClick={() => setDataToggle(!dataToggle)} style={{ background: '#340098', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Update scales</button>
        )}
      </div>
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/axis.tsx
// components/ui/component.tsx
import React, { useCallback, useState, useMemo } from 'react';
import AreaClosed from '@visx/shape/lib/shapes/AreaClosed';
import { curveMonotoneX } from '@visx/curve';
import { scaleUtc, scaleLinear, scaleLog, scaleBand, ScaleInput, coerceNumber } from '@visx/scale';
import { Axis, Orientation, SharedAxisProps, AxisScale } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { AnimatedAxis, AnimatedGridRows, AnimatedGridColumns } from '@visx/react-spring';
import { getSeededRandom } from '@visx/mock-data';
import { LinearGradient } from '@visx/gradient';
import { timeFormat } from '@visx/vendor/d3-time-format';
import { GridRowsProps } from '@visx/grid/lib/grids/GridRows';
import { GridColumnsProps } from '@visx/grid/lib/grids/GridColumns';

export const backgroundColor = '#da7cff';
const axisColor = '#fff';
const tickLabelColor = '#fff';
export const labelColor = '#340098';
const gridColor = '#6e0fca';
const seededRandom = getSeededRandom(0.5);
const margin = {
  top: 40,
  right: 150,
  bottom: 20,
  left: 50,
};

const tickLabelProps = {
  fill: tickLabelColor,
  fontSize: 12,
  fontFamily: 'sans-serif',
  textAnchor: 'middle',
} as const;

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

export type VisxAxisProps = {
  width: number;
  height: number;
  showControls?: boolean; 
  dataToggle: boolean;
  animationTrajectory: AnimationTrajectory;
  useAnimatedComponents: boolean;
};

type AnimationTrajectory = 'outside' | 'center' | 'min' | 'max' | undefined;

type AxisComponentType = React.FC<
  SharedAxisProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;
type GridRowsComponentType = React.FC<
  GridRowsProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;
type GridColumnsComponentType = React.FC<
  GridColumnsProps<AxisScale> & {
    animationTrajectory: AnimationTrajectory;
  }
>;

export const Component = ({
  width: outerWidth = 800,
  height: outerHeight = 800,
  showControls = true,
  dataToggle,
  animationTrajectory,
  useAnimatedComponents,
}: VisxAxisProps) => {

  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  interface AxisDemoProps<Scale extends AxisScale> extends SharedAxisProps<Scale> {
    values: ScaleInput<Scale>[];
  }

  const AxisComponent: AxisComponentType = useAnimatedComponents ? AnimatedAxis : Axis;
  const GridRowsComponent: GridRowsComponentType = useAnimatedComponents
    ? AnimatedGridRows
    : GridRows;
  const GridColumnsComponent: GridColumnsComponentType = useAnimatedComponents
    ? AnimatedGridColumns
    : GridColumns;

  const axes: AxisDemoProps<AxisScale<number>>[] = useMemo(() => {
    const linearValues = dataToggle ? [0, 2, 4, 6, 8, 10] : [6, 8, 10, 12];
    const bandValues = dataToggle ? ['a', 'b', 'c', 'd'] : ['d', 'c', 'b', 'a'];
    const timeValues = dataToggle
      ? [new Date('2020-01-01'), new Date('2020-02-01')]
      : [new Date('2020-02-01'), new Date('2020-03-01')];
    const logValues = dataToggle ? [1, 10, 100, 1000, 10000] : [0.0001, 0.001, 0.1, 1, 10, 100];

    return [
      {
        scale: scaleLinear({
          domain: getMinMax(linearValues),
          range: [0, width],
        }),
        values: linearValues,
        tickFormat: (v: number, index: number, ticks: { value: number; index: number }[]) =>
          index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : `${v}`,
        label: 'linear',
      },
      {
        scale: scaleBand({
          domain: bandValues,
          range: [0, width],
          paddingOuter: 0,
          paddingInner: 1,
        }),
        values: bandValues,
        tickFormat: (v: string) => v,
        label: 'categories',
      },
      {
        scale: scaleUtc({
          domain: getMinMax(timeValues),
          range: [0, width],
        }),
        values: timeValues,
        tickFormat: (v: Date, i: number) =>
          i === 3 ? '🎉' : width > 400 || i % 2 === 0 ? timeFormat('%b %d')(v) : '',
        label: 'time',
      },
      {
        scale: scaleLog({
          domain: getMinMax(logValues),
          range: [0, width],
        }),
        values: logValues,
        tickFormat: (v: number) => {
          const asString = `${v}`;
          return asString.match(/^[.01?[\]]*$/) ? asString : '';
        },
        label: 'log',
      },
    ];
  }, [dataToggle, width]);

  if (width < 10) return null;

  const scalePadding = 40;
  const scaleHeight = height / axes.length - scalePadding;

  const yScale = scaleLinear({
    domain: [100, 0],
    range: [scaleHeight, 0],
  });

  return (
    <>
      <svg width={outerWidth} height={outerHeight}>
        <LinearGradient
          id="visx-axis-gradient"
          from={backgroundColor}
          to={backgroundColor}
          toOpacity={0.5}
        />
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          fill={'url(#visx-axis-gradient)'}
          rx={14}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          {axes.map(({ scale, values, label, tickFormat }, i) => (
            <g key={`scale-${i}`} transform={`translate(0, ${i * (scaleHeight + scalePadding)})`}>
              <GridRowsComponent
                key={`gridrows-${animationTrajectory}`}
                scale={yScale}
                stroke={gridColor}
                width={width}
                numTicks={dataToggle ? 1 : 3}
                animationTrajectory={animationTrajectory}
              />
              <GridColumnsComponent
                key={`gridcolumns-${animationTrajectory}`}
                scale={scale}
                stroke={gridColor}
                height={scaleHeight}
                numTicks={dataToggle ? 5 : 2}
                animationTrajectory={animationTrajectory}
              />
              <AreaClosed
                data={values.map((x) => [
                  (scale(x) ?? 0) +
                    ('bandwidth' in scale && typeof scale!.bandwidth !== 'undefined'
                      ? scale.bandwidth!() / 2
                      : 0),
                  yScale(10 + seededRandom() * 90),
                ])}
                yScale={yScale}
                curve={curveMonotoneX}
                fill={gridColor}
                fillOpacity={0.2}
              />
              <AxisComponent
                key={`axis-${animationTrajectory}`}
                orientation={Orientation.bottom}
                top={scaleHeight}
                scale={scale}
                tickFormat={tickFormat}
                stroke={axisColor}
                tickStroke={axisColor}
                tickLabelProps={tickLabelProps}
                tickValues={label === 'log' || label === 'time' ? undefined : values}
                numTicks={label === 'time' ? 6 : undefined}
                label={label}
                labelProps={{
                  x: width + 30,
                  y: -10,
                  fill: labelColor,
                  fontSize: 18,
                  strokeWidth: 0,
                  stroke: '#fff',
                  paintOrder: 'stroke',
                  fontFamily: 'sans-serif',
                  textAnchor: 'start',
                }}
                animationTrajectory={animationTrajectory}
              />
            </g>
          ))}
        </g>
      </svg>
      {showControls && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: 10 }}>
          <div style={{ fontSize: 12 }}>
            <label>
              <input
                type="checkbox"
                checked={useAnimatedComponents}
                onChange={() => { /* Handled in DemoOne */ }}
              />{' '}
              enable animation
            </label>
               
            {useAnimatedComponents && (
              <>
                <strong>animation trajectory</strong>
                <label>
                  <input
                    type="radio"
                    value="outside"
                    checked={animationTrajectory === 'outside'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  outside
                </label>
                <label>
                  <input
                    type="radio"
                    value="center"
                    checked={animationTrajectory === 'center'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  center
                </label>
                <label>
                  <input
                    type="radio"
                    value="min"
                    checked={animationTrajectory === 'min'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  min
                </label>
                <label>
                  <input
                    type="radio"
                    value="max"
                    checked={animationTrajectory === 'max'}
                    onChange={() => { /* Handled in DemoOne */ }}
                  />{' '}
                  max
                </label>
              </>
            )}
          </div>
          {useAnimatedComponents && (
            <button onClick={() => { /* Handled in DemoOne */ }}>Update scales</button>
          )}
        </div>
      )}
    </>
  );
}
```

Install NPM dependencies:
```bash
@visx/shape, @visx/curve, @visx/scale, @visx/axis, @visx/grid, @visx/react-spring, @visx/mock-data, @visx/gradient, @visx/vendor
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
