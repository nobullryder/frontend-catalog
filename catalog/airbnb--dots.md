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
dots.tsx
// src/components/ui/dots-chart.tsx

import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { GradientPinkRed } from '@visx/gradient';
import { scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
import { localPoint } from '@visx/event';
import { getSeededRandom, genRandomNormalPoints } from '@visx/mock-data';

export type PointsRange = [number, number];

const seededRandom = getSeededRandom(0.5);


const points: PointsRange[] = genRandomNormalPoints(
  600, 
  seededRandom,
);

const x = (d: PointsRange) => d[0];
const y = (d: PointsRange) => d[1];

export type DotsChartProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

let tooltipTimeout: number;

export const DotsChart = withTooltip<DotsChartProps, PointsRange>(
  ({
    width,
    height,
    showControls = true,
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  }: DotsChartProps & WithTooltipProvidedProps<PointsRange>) => {
    if (width < 10) return null;
    const [showVoronoi, setShowVoronoi] = useState(showControls);
    const svgRef = useRef<SVGSVGElement>(null);
    const xScale = useMemo(
      () =>
        scaleLinear<number>({
          domain: [1.3, 2.2], 
          range: [0, width],
          clamp: true,
        }),
      [width],
    );
    const yScale = useMemo(
      () =>
        scaleLinear<number>({
          domain: [0.75, 1.6],
          range: [height, 0],
          clamp: true,
        }),
      [height],
    );
    const voronoiLayout = useMemo(
      () =>
        voronoi<PointsRange>({
          x: (d) => xScale(x(d)) ?? 0,
          y: (d) => yScale(y(d)) ?? 0,
          width,
          height,
        })(points),
      [width, height, xScale, yScale],
    );

    const handleMouseMove = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        if (!svgRef.current) return;

        const point = localPoint(svgRef.current, event);
        if (!point) return;
        const neighborRadius = 100;
        const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
        if (closest) {
          showTooltip({
            tooltipLeft: xScale(x(closest.data)),
            tooltipTop: yScale(y(closest.data)),
            tooltipData: closest.data,
          });
        }
      },
      [xScale, yScale, showTooltip, voronoiLayout],
    );

    const handleMouseLeave = useCallback(() => {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    }, [hideTooltip]);

    return (
      <div>
        <svg width={width} height={height} ref={svgRef}>
          <GradientPinkRed id="dots-pink" />
          <rect
            width={width}
            height={height}
            rx={14}
            fill="url(#dots-pink)"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseLeave}
          />
          <Group pointerEvents="none">
            {points.map((point, i) => (
              <Circle
                key={`point-${point[0]}-${i}`}
                className="dot"
                cx={xScale(x(point))}
                cy={yScale(y(point))}
                r={i % 3 === 0 ? 2 : 3}
                fill={tooltipData === point ? 'white' : '#f6c431'}
              />
            ))}
            {showVoronoi &&
              voronoiLayout
                .polygons()
                .map((polygon, i) => (
                  <VoronoiPolygon
                    key={`polygon-${i}`}
                    polygon={polygon}
                    fill="white"
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.2}
                    fillOpacity={tooltipData === polygon.data ? 0.5 : 0}
                  />
                ))}
          </Group>
        </svg>
        {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
          <Tooltip left={tooltipLeft + 10} top={tooltipTop + 10}>
            <div>
              <strong>x:</strong> {x(tooltipData)}
            </div>
            <div>
              <strong>y:</strong> {y(tooltipData)}
            </div>
          </Tooltip>
        )}
        {showControls && (
          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: 12 }}>
              <input
                type="checkbox"
                checked={showVoronoi}
                onChange={() => setShowVoronoi(!showVoronoi)}
              />
               Show voronoi point map
            </label>
          </div>
        )}
      </div>
    );
  },
);

code.demo.1747945422183.tsx

import { DotsChart } from "@/components/ui/dots";

const DemoDotsChart = () => {
  const width = 700;
  const height = 500;

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <DotsChart width={width} height={height} showControls={true} />
    </div>
  );
};

export { DemoDotsChart };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dots.tsx
// src/components/ui/dots-chart.tsx

import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { GradientPinkRed } from '@visx/gradient';
import { scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
import { localPoint } from '@visx/event';
import { getSeededRandom, genRandomNormalPoints } from '@visx/mock-data';

export type PointsRange = [number, number];

const seededRandom = getSeededRandom(0.5);


const points: PointsRange[] = genRandomNormalPoints(
  600, 
  seededRandom,
);

const x = (d: PointsRange) => d[0];
const y = (d: PointsRange) => d[1];

export type DotsChartProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

let tooltipTimeout: number;

export const DotsChart = withTooltip<DotsChartProps, PointsRange>(
  ({
    width,
    height,
    showControls = true,
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  }: DotsChartProps & WithTooltipProvidedProps<PointsRange>) => {
    if (width < 10) return null;
    const [showVoronoi, setShowVoronoi] = useState(showControls);
    const svgRef = useRef<SVGSVGElement>(null);
    const xScale = useMemo(
      () =>
        scaleLinear<number>({
          domain: [1.3, 2.2], 
          range: [0, width],
          clamp: true,
        }),
      [width],
    );
    const yScale = useMemo(
      () =>
        scaleLinear<number>({
          domain: [0.75, 1.6],
          range: [height, 0],
          clamp: true,
        }),
      [height],
    );
    const voronoiLayout = useMemo(
      () =>
        voronoi<PointsRange>({
          x: (d) => xScale(x(d)) ?? 0,
          y: (d) => yScale(y(d)) ?? 0,
          width,
          height,
        })(points),
      [width, height, xScale, yScale],
    );

    const handleMouseMove = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        if (!svgRef.current) return;

        const point = localPoint(svgRef.current, event);
        if (!point) return;
        const neighborRadius = 100;
        const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
        if (closest) {
          showTooltip({
            tooltipLeft: xScale(x(closest.data)),
            tooltipTop: yScale(y(closest.data)),
            tooltipData: closest.data,
          });
        }
      },
      [xScale, yScale, showTooltip, voronoiLayout],
    );

    const handleMouseLeave = useCallback(() => {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    }, [hideTooltip]);

    return (
      <div>
        <svg width={width} height={height} ref={svgRef}>
          <GradientPinkRed id="dots-pink" />
          <rect
            width={width}
            height={height}
            rx={14}
            fill="url(#dots-pink)"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseLeave}
          />
          <Group pointerEvents="none">
            {points.map((point, i) => (
              <Circle
                key={`point-${point[0]}-${i}`}
                className="dot"
                cx={xScale(x(point))}
                cy={yScale(y(point))}
                r={i % 3 === 0 ? 2 : 3}
                fill={tooltipData === point ? 'white' : '#f6c431'}
              />
            ))}
            {showVoronoi &&
              voronoiLayout
                .polygons()
                .map((polygon, i) => (
                  <VoronoiPolygon
                    key={`polygon-${i}`}
                    polygon={polygon}
                    fill="white"
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.2}
                    fillOpacity={tooltipData === polygon.data ? 0.5 : 0}
                  />
                ))}
          </Group>
        </svg>
        {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
          <Tooltip left={tooltipLeft + 10} top={tooltipTop + 10}>
            <div>
              <strong>x:</strong> {x(tooltipData)}
            </div>
            <div>
              <strong>y:</strong> {y(tooltipData)}
            </div>
          </Tooltip>
        )}
        {showControls && (
          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: 12 }}>
              <input
                type="checkbox"
                checked={showVoronoi}
                onChange={() => setShowVoronoi(!showVoronoi)}
              />
               Show voronoi point map
            </label>
          </div>
        )}
      </div>
    );
  },
);
```

Install NPM dependencies:
```bash
@visx/group, @visx/shape, @visx/gradient, @visx/scale, @visx/tooltip, @visx/voronoi, @visx/event, @visx/mock-data
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
