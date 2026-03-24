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
voronoi.tsx
// components/ui/component.tsx
import React, { useState, useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { GradientOrangeRed, GradientPinkRed } from '@visx/gradient';
import { RectClipPath } from '@visx/clip-path';
import { voronoi, Polygon } from '@visx/delaunay';
import { localPoint } from '@visx/event';
import { getSeededRandom } from '@visx/mock-data';

type Datum = {
  x: number;
  y: number;
  id: string;
};

const seededRandom = getSeededRandom(0.88);

const data: Datum[] = new Array(150).fill(null).map(() => ({
  x: seededRandom(),
  y: seededRandom(),
  id: Math.random().toString(36).slice(2),
}));

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 76,
};

export type ComponentProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const Component = ({ width, height, margin = defaultMargin }: ComponentProps) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const voronoiDiagram = useMemo(
    () =>
      voronoi<Datum>({
        data,
        x: (d) => d.x * innerWidth,
        y: (d) => d.y * innerHeight,
        width: innerWidth,
        height: innerHeight,
      }),
    [innerWidth, innerHeight],
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [neighborIds, setNeighborIds] = useState<Set<string>>(new Set());

  return width < 10 || height < 10 ? null : (
    <svg width={width} height={height} ref={svgRef}>
      <GradientOrangeRed id="voronoi_orange_red" />
      <GradientPinkRed id="voronoi_pink_red" />
      <RectClipPath id="voronoi_clip" width={innerWidth} height={innerHeight} rx={14} />
      <Group
        top={margin.top}
        left={margin.left}
        clipPath="url(#voronoi_clip)"
        onMouseMove={(event) => {
          if (!svgRef.current) return;

          const point = localPoint(svgRef.current, event);
          if (!point) return;

          const closest = voronoiDiagram.delaunay.find(point.x, point.y);
          if (closest && data[closest].id !== hoveredId) {
            const neighbors = Array.from(voronoiDiagram.neighbors(closest));
            setNeighborIds(new Set(neighbors.map((d) => data[d].id)));
            setHoveredId(data[closest].id);
          }
        }}
        onMouseLeave={() => {
          setHoveredId(null);
          setNeighborIds(new Set());
        }}
      >
        {data.map((d, i) => (
          <Polygon
            key={`polygon-${d.id}`}
            polygon={voronoiDiagram.cellPolygon(i)}
            fill={
              hoveredId && (d.id === hoveredId || neighborIds.has(d.id))
                ? 'url(#voronoi_orange_red)'
                : 'url(#voronoi_pink_red)'
            }
            stroke="#fff"
            strokeWidth={1}
            fillOpacity={hoveredId && neighborIds.has(d.id) ? 0.5 : 1}
          />
        ))}
        {data.map(({ x, y, id }) => (
          <circle
            key={`circle-${id}`}
            r={2}
            cx={x * innerWidth}
            cy={y * innerHeight}
            fill={id === hoveredId ? 'fuchsia' : '#fff'}
            fillOpacity={0.8}
          />
        ))}
      </Group>
    </svg>
  );
};

code.demo.1747927358485.tsx
// DemoOne.tsx
import React, { useState, useEffect } from "react";
import { Component } from "@/components/ui/voronoi";
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
    <div className={cn("w-screen h-screen overflow-hidden bg-gray-800 flex justify-center items-center")}>
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
src/components/ui/voronoi.tsx
// components/ui/component.tsx
import React, { useState, useMemo, useRef } from 'react';
import { Group } from '@visx/group';
import { GradientOrangeRed, GradientPinkRed } from '@visx/gradient';
import { RectClipPath } from '@visx/clip-path';
import { voronoi, Polygon } from '@visx/delaunay';
import { localPoint } from '@visx/event';
import { getSeededRandom } from '@visx/mock-data';

type Datum = {
  x: number;
  y: number;
  id: string;
};

const seededRandom = getSeededRandom(0.88);

const data: Datum[] = new Array(150).fill(null).map(() => ({
  x: seededRandom(),
  y: seededRandom(),
  id: Math.random().toString(36).slice(2),
}));

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 76,
};

export type ComponentProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const Component = ({ width, height, margin = defaultMargin }: ComponentProps) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const voronoiDiagram = useMemo(
    () =>
      voronoi<Datum>({
        data,
        x: (d) => d.x * innerWidth,
        y: (d) => d.y * innerHeight,
        width: innerWidth,
        height: innerHeight,
      }),
    [innerWidth, innerHeight],
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [neighborIds, setNeighborIds] = useState<Set<string>>(new Set());

  return width < 10 || height < 10 ? null : (
    <svg width={width} height={height} ref={svgRef}>
      <GradientOrangeRed id="voronoi_orange_red" />
      <GradientPinkRed id="voronoi_pink_red" />
      <RectClipPath id="voronoi_clip" width={innerWidth} height={innerHeight} rx={14} />
      <Group
        top={margin.top}
        left={margin.left}
        clipPath="url(#voronoi_clip)"
        onMouseMove={(event) => {
          if (!svgRef.current) return;

          const point = localPoint(svgRef.current, event);
          if (!point) return;

          const closest = voronoiDiagram.delaunay.find(point.x, point.y);
          if (closest && data[closest].id !== hoveredId) {
            const neighbors = Array.from(voronoiDiagram.neighbors(closest));
            setNeighborIds(new Set(neighbors.map((d) => data[d].id)));
            setHoveredId(data[closest].id);
          }
        }}
        onMouseLeave={() => {
          setHoveredId(null);
          setNeighborIds(new Set());
        }}
      >
        {data.map((d, i) => (
          <Polygon
            key={`polygon-${d.id}`}
            polygon={voronoiDiagram.cellPolygon(i)}
            fill={
              hoveredId && (d.id === hoveredId || neighborIds.has(d.id))
                ? 'url(#voronoi_orange_red)'
                : 'url(#voronoi_pink_red)'
            }
            stroke="#fff"
            strokeWidth={1}
            fillOpacity={hoveredId && neighborIds.has(d.id) ? 0.5 : 1}
          />
        ))}
        {data.map(({ x, y, id }) => (
          <circle
            key={`circle-${id}`}
            r={2}
            cx={x * innerWidth}
            cy={y * innerHeight}
            fill={id === hoveredId ? 'fuchsia' : '#fff'}
            fillOpacity={0.8}
          />
        ))}
      </Group>
    </svg>
  );
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/gradient, @visx/clip-path, @visx/delaunay, @visx/event, @visx/mock-data
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
