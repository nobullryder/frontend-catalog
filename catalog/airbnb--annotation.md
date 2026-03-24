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
annotation.tsx
// components/ui/component.tsx
import React from 'react';
import { HtmlLabel, Label, Connector, CircleSubject, LineSubject, Annotation, AnnotationLabelProps } from '@visx/annotation';
import { LinePath } from '@visx/shape';
import { ScaleTime, ScaleLinear } from '@visx/scale';

export const orange = '#ff7e67';
export const greens = ['#ecf4f3', '#68b0ab', '#006a71'];

export interface DataPoint {
  date: string;
  value: number;
}

const findNearestDatum = ({
  accessor,
  data,
  scale,
  value,
}: {
  accessor: (d: DataPoint) => number | Date;
  data: DataPoint[];
  scale: ScaleTime<number, number> | ScaleLinear<number, number> | any;
  value: number;
}): DataPoint | null => {
  if (!data || data.length === 0) return null;

  let nearestDatum: DataPoint | null = null;
  let minDiff = Infinity;

  for (const datum of data) {
    const accessorValue = accessor(datum);
    if (accessorValue === undefined || accessorValue === null) continue;

    const scaledValue = scale(accessorValue);
    if (scaledValue === undefined) continue;

    const diff = Math.abs(value - scaledValue);
    if (diff < minDiff) {
      minDiff = diff;
      nearestDatum = datum;
    }
  }
  return nearestDatum;
};

export type VisxAnnotationChartProps = {
  width: number;
  height: number;
  data: DataPoint[];
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  getDate: (d: DataPoint) => Date;
  getStockValue: (d: DataPoint) => number;

  AnnotationComponent: React.ElementType<any>;
  annotationPosition: { x: number; y: number; dx: number; dy: number };
  onAnnotationPositionChange: (
    position: { x: number; y: number; dx: number; dy: number }
  ) => void;
  
  connectorType: 'line' | 'elbow' | 'curve' | undefined;
  labelType: 'svg' | 'html';
  subjectType: 'circle' | 'vertical-line' | 'horizontal-line';
  
  title: string;
  subtitle: string;
  labelWidth: number;
  approxTooltipHeight: number;

  editLabelPosition?: boolean;
  editSubjectPosition?: boolean;
  showAnchorLine?: boolean;
  horizontalAnchor?: AnnotationLabelProps['horizontalAnchor'];
  verticalAnchor?: AnnotationLabelProps['verticalAnchor'];
};

export const Component = ({
  width,
  height,
  data,
  xScale,
  yScale,
  getDate,
  getStockValue,
  AnnotationComponent,
  annotationPosition,
  onAnnotationPositionChange,
  connectorType,
  labelType,
  subjectType,
  title,
  subtitle,
  labelWidth,
  approxTooltipHeight,
  editLabelPosition = true,
  editSubjectPosition = true,
  showAnchorLine = true,
  horizontalAnchor,
  verticalAnchor,
}: VisxAnnotationChartProps) => {
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={greens[0]} />
      <LinePath
        stroke={greens[2]}
        strokeWidth={2}
        data={data}
        x={(d) => xScale(getDate(d)) ?? 0}
        y={(d) => yScale(getStockValue(d)) ?? 0}
      />
      <AnnotationComponent
        width={width}
        height={height}
        x={annotationPosition.x}
        y={annotationPosition.y}
        dx={annotationPosition.dx}
        dy={annotationPosition.dy}
        canEditLabel={editLabelPosition}
        canEditSubject={editSubjectPosition}
        onDragEnd={({ event, ...nextPosition }: {
          event: any;
          x: number;
          y: number;
          dx: number;
          dy: number;
        }) => {
          const nearestDatum = findNearestDatum({
            accessor: subjectType === 'horizontal-line' ? getStockValue : getDate,
            data,
            scale: subjectType === 'horizontal-line' ? yScale : xScale,
            value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
          });
          const x = xScale(getDate(nearestDatum!)) ?? 0;
          const y = yScale(getStockValue(nearestDatum!)) ?? 0;

          const shouldFlipDx =
            (nextPosition.dx > 0 && x + nextPosition.dx + labelWidth > width) ||
            (nextPosition.dx < 0 && x + nextPosition.dx - labelWidth <= 0);
          const shouldFlipDy =
            (nextPosition.dy > 0 && height - (y + nextPosition.dy) < approxTooltipHeight) ||
            (nextPosition.dy < 0 && y + nextPosition.dy - approxTooltipHeight <= 0);
          onAnnotationPositionChange({
            x,
            y,
            dx: (shouldFlipDx ? -1 : 1) * nextPosition.dx,
            dy: (shouldFlipDy ? -1 : 1) * nextPosition.dy,
          });
        }}
      >
        <Connector stroke={orange} type={connectorType} />
        {labelType === 'svg' ? (
          <Label
            backgroundFill="white"
            showAnchorLine={showAnchorLine}
            anchorLineStroke={greens[2]}
            backgroundProps={{ stroke: greens[1] }}
            fontColor={greens[2]}
            horizontalAnchor={horizontalAnchor}
            subtitle={subtitle}
            title={title}
            verticalAnchor={verticalAnchor}
            width={labelWidth}
          />
        ) : (
          <HtmlLabel
            showAnchorLine={showAnchorLine}
            anchorLineStroke={greens[2]}
            horizontalAnchor={horizontalAnchor}
            verticalAnchor={verticalAnchor}
            containerStyle={{
              width: labelWidth,
              background: 'white',
              border: `1px solid ${greens[1]}`,
              borderRadius: 2,
              color: greens[2],
              fontSize: '0.55em',
              lineHeight: '1em',
              padding: '0 0.4em 0 1em',
              fontWeight: 200,
            }}
          >
            <h3 style={{ margin: '1em 0 -0.5em' }}>{title}</h3>
            <p>{subtitle}</p>
          </HtmlLabel>
        )}
        {subjectType === 'circle' && <CircleSubject stroke={orange} />}
        {subjectType !== 'circle' && (
          <LineSubject
            orientation={subjectType === 'vertical-line' ? 'vertical' : 'horizontal'}
            stroke={orange}
            min={0}
            max={subjectType === 'vertical-line' ? height : width}
          />
        )}
      </AnnotationComponent>
    </svg>
  );
};

code.demo.1747921047254.tsx
// DemoOne.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Component, DataPoint } from '@/components/ui/annotation'; 
import { Annotation } from '@visx/annotation';
import { scaleTime, scaleLinear } from '@visx/scale';
import { extent } from 'd3-array';
import { cn } from '@/lib/utils';

const mockStockData: DataPoint[] = [
  { date: '2023-01-01', value: 100 },
  { date: '2023-01-05', value: 110 },
  { date: '2023-01-10', value: 105 },
  { date: '2023-01-15', value: 120 },
  { date: '2023-01-20', value: 115 },
  { date: '2023-01-25', value: 130 },
  { date: '2023-01-30', value: 125 },
  { date: '2023-02-05', value: 135 },
  { date: '2023-02-10', value: 140 },
  { date: '2023-02-15', value: 138 },
  { date: '2023-02-20', value: 150 },
];

const getDate = (d: DataPoint): Date => new Date(d.date);
const getStockValue = (d: DataPoint): number => d.value;

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

  const margin = { top: 20, right: 30, bottom: 50, left: 50 };

  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;

  const xScale = useMemo(() => scaleTime<number>({
    domain: extent(mockStockData, getDate) as [Date, Date],
    range: [0, innerWidth],
  }), [innerWidth]);

  const yScale = useMemo(() => scaleLinear<number>({
    domain: [
      Math.min(...mockStockData.map(getStockValue)) * 0.9,
      Math.max(...mockStockData.map(getStockValue)) * 1.1,
    ],
    range: [innerHeight, 0],
  }), [innerHeight]);

  const defaultAnnotatedDatum = mockStockData[5]; 
  const initialAnnotationX = xScale(getDate(defaultAnnotatedDatum)) ?? 0;
  const initialAnnotationY = yScale(getStockValue(defaultAnnotatedDatum)) ?? 0;

  const [annotationPosition, setAnnotationPosition] = useState({
    x: initialAnnotationX,
    y: initialAnnotationY,
    dx: 50,
    dy: -50,
  });

  useEffect(() => {
  
    const currentX = xScale(getDate(defaultAnnotatedDatum)) ?? 0;
    const currentY = yScale(getStockValue(defaultAnnotatedDatum)) ?? 0;
    setAnnotationPosition((prev) => ({
      x: currentX,
      y: currentY,
      dx: prev.dx,
      dy: prev.dy,
    }));
  }, [xScale, yScale, defaultAnnotatedDatum]);


  if (chartWidth === 0 || chartHeight === 0) {
    return (
      <div className={cn("flex w-screen h-screen justify-center items-center bg-gray-900 text-white")}>
        Загрузка...
      </div>
    );
  }

  return (
    <div className={cn("w-screen h-screen overflow-hidden bg-gray-800 flex justify-center items-center")}>
      <svg width={chartWidth} height={chartHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Component
            width={innerWidth}
            height={innerHeight}
            data={mockStockData}
            xScale={xScale}
            yScale={yScale}
            getDate={getDate}
            getStockValue={getStockValue}
            AnnotationComponent={Annotation}
            annotationPosition={annotationPosition}
            onAnnotationPositionChange={setAnnotationPosition}
            connectorType="elbow"
            labelType="html" 
            subjectType="circle"
            subtitle="The stock reached its highest value today."
            labelWidth={160}
            approxTooltipHeight={70}
            editLabelPosition={true}
            editSubjectPosition={true}
            showAnchorLine={true}
            horizontalAnchor="start"
            verticalAnchor="end"
          />
        </g>
      </svg>
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/annotation.tsx
// components/ui/component.tsx
import React from 'react';
import { HtmlLabel, Label, Connector, CircleSubject, LineSubject, Annotation, AnnotationLabelProps } from '@visx/annotation';
import { LinePath } from '@visx/shape';
import { ScaleTime, ScaleLinear } from '@visx/scale';

export const orange = '#ff7e67';
export const greens = ['#ecf4f3', '#68b0ab', '#006a71'];

export interface DataPoint {
  date: string;
  value: number;
}

const findNearestDatum = ({
  accessor,
  data,
  scale,
  value,
}: {
  accessor: (d: DataPoint) => number | Date;
  data: DataPoint[];
  scale: ScaleTime<number, number> | ScaleLinear<number, number> | any;
  value: number;
}): DataPoint | null => {
  if (!data || data.length === 0) return null;

  let nearestDatum: DataPoint | null = null;
  let minDiff = Infinity;

  for (const datum of data) {
    const accessorValue = accessor(datum);
    if (accessorValue === undefined || accessorValue === null) continue;

    const scaledValue = scale(accessorValue);
    if (scaledValue === undefined) continue;

    const diff = Math.abs(value - scaledValue);
    if (diff < minDiff) {
      minDiff = diff;
      nearestDatum = datum;
    }
  }
  return nearestDatum;
};

export type VisxAnnotationChartProps = {
  width: number;
  height: number;
  data: DataPoint[];
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  getDate: (d: DataPoint) => Date;
  getStockValue: (d: DataPoint) => number;

  AnnotationComponent: React.ElementType<any>;
  annotationPosition: { x: number; y: number; dx: number; dy: number };
  onAnnotationPositionChange: (
    position: { x: number; y: number; dx: number; dy: number }
  ) => void;
  
  connectorType: 'line' | 'elbow' | 'curve' | undefined;
  labelType: 'svg' | 'html';
  subjectType: 'circle' | 'vertical-line' | 'horizontal-line';
  
  title: string;
  subtitle: string;
  labelWidth: number;
  approxTooltipHeight: number;

  editLabelPosition?: boolean;
  editSubjectPosition?: boolean;
  showAnchorLine?: boolean;
  horizontalAnchor?: AnnotationLabelProps['horizontalAnchor'];
  verticalAnchor?: AnnotationLabelProps['verticalAnchor'];
};

export const Component = ({
  width,
  height,
  data,
  xScale,
  yScale,
  getDate,
  getStockValue,
  AnnotationComponent,
  annotationPosition,
  onAnnotationPositionChange,
  connectorType,
  labelType,
  subjectType,
  title,
  subtitle,
  labelWidth,
  approxTooltipHeight,
  editLabelPosition = true,
  editSubjectPosition = true,
  showAnchorLine = true,
  horizontalAnchor,
  verticalAnchor,
}: VisxAnnotationChartProps) => {
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={greens[0]} />
      <LinePath
        stroke={greens[2]}
        strokeWidth={2}
        data={data}
        x={(d) => xScale(getDate(d)) ?? 0}
        y={(d) => yScale(getStockValue(d)) ?? 0}
      />
      <AnnotationComponent
        width={width}
        height={height}
        x={annotationPosition.x}
        y={annotationPosition.y}
        dx={annotationPosition.dx}
        dy={annotationPosition.dy}
        canEditLabel={editLabelPosition}
        canEditSubject={editSubjectPosition}
        onDragEnd={({ event, ...nextPosition }: {
          event: any;
          x: number;
          y: number;
          dx: number;
          dy: number;
        }) => {
          const nearestDatum = findNearestDatum({
            accessor: subjectType === 'horizontal-line' ? getStockValue : getDate,
            data,
            scale: subjectType === 'horizontal-line' ? yScale : xScale,
            value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
          });
          const x = xScale(getDate(nearestDatum!)) ?? 0;
          const y = yScale(getStockValue(nearestDatum!)) ?? 0;

          const shouldFlipDx =
            (nextPosition.dx > 0 && x + nextPosition.dx + labelWidth > width) ||
            (nextPosition.dx < 0 && x + nextPosition.dx - labelWidth <= 0);
          const shouldFlipDy =
            (nextPosition.dy > 0 && height - (y + nextPosition.dy) < approxTooltipHeight) ||
            (nextPosition.dy < 0 && y + nextPosition.dy - approxTooltipHeight <= 0);
          onAnnotationPositionChange({
            x,
            y,
            dx: (shouldFlipDx ? -1 : 1) * nextPosition.dx,
            dy: (shouldFlipDy ? -1 : 1) * nextPosition.dy,
          });
        }}
      >
        <Connector stroke={orange} type={connectorType} />
        {labelType === 'svg' ? (
          <Label
            backgroundFill="white"
            showAnchorLine={showAnchorLine}
            anchorLineStroke={greens[2]}
            backgroundProps={{ stroke: greens[1] }}
            fontColor={greens[2]}
            horizontalAnchor={horizontalAnchor}
            subtitle={subtitle}
            title={title}
            verticalAnchor={verticalAnchor}
            width={labelWidth}
          />
        ) : (
          <HtmlLabel
            showAnchorLine={showAnchorLine}
            anchorLineStroke={greens[2]}
            horizontalAnchor={horizontalAnchor}
            verticalAnchor={verticalAnchor}
            containerStyle={{
              width: labelWidth,
              background: 'white',
              border: `1px solid ${greens[1]}`,
              borderRadius: 2,
              color: greens[2],
              fontSize: '0.55em',
              lineHeight: '1em',
              padding: '0 0.4em 0 1em',
              fontWeight: 200,
            }}
          >
            <h3 style={{ margin: '1em 0 -0.5em' }}>{title}</h3>
            <p>{subtitle}</p>
          </HtmlLabel>
        )}
        {subjectType === 'circle' && <CircleSubject stroke={orange} />}
        {subjectType !== 'circle' && (
          <LineSubject
            orientation={subjectType === 'vertical-line' ? 'vertical' : 'horizontal'}
            stroke={orange}
            min={0}
            max={subjectType === 'vertical-line' ? height : width}
          />
        )}
      </AnnotationComponent>
    </svg>
  );
};
```

Install NPM dependencies:
```bash
@visx/annotation, @visx/shape, @visx/scale
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
