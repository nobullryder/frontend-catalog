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
drag-and-draw.tsx
// components/ui/component.tsx
import React, { useCallback, useState, useEffect } from 'react';
import { LinePath } from '@visx/shape';
import { useDrag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { cn } from "@/lib/utils";

type Point = { x: number; y: number }[];
type Line = Point[];
type Lines = Line[];

export type ComponentProps = {
  width: number;
  height: number;
  data?: Lines;
};

export const Component = ({ data = [], width, height }: ComponentProps) => {
  const [lines, setLines] = useState<Lines>(data);
  const onDragStart = useCallback(
    (currDrag) => {
      setLines((currLines) => [...currLines, [{ x: currDrag.x, y: currDrag.y }]]);
    },
    [setLines],
  );
  const onDragMove = useCallback(
    (currDrag) => {
      setLines((currLines) => {
        const nextLines = [...currLines];
        const newPoint = { x: currDrag.x + currDrag.dx, y: currDrag.y + currDrag.dy };
        const lastIndex = nextLines.length - 1;
        if (lastIndex >= 0 && nextLines[lastIndex]) {
          nextLines[lastIndex] = [...nextLines[lastIndex], newPoint];
        } else {
          nextLines.push([newPoint]);
        }
        return nextLines;
      });
    },
    [setLines],
  );
  const {
    x = 0,
    y = 0,
    dx,
    dy,
    isDragging,
    dragStart,
    dragEnd,
    dragMove,
  } = useDrag({
    onDragStart,
    onDragMove,
    resetOnStart: true,
  });

  return width < 10 || height < 10 ? null : (
    <div className="DragII" style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
        <rect fill="#04002b" width={width} height={height} rx={14} />
        {lines.map((line, i) => (
          <LinePath
            key={`line-${i}`}
            fill="transparent"
            stroke="url(#stroke)"
            strokeWidth={3}
            data={line}
            curve={curveBasis}
            x={(d) => d.x}
            y={(d) => d.y}
            defined={(d) => typeof d.x === 'number' && typeof d.y === 'number'}
          />
        ))}

        <g>
          {isDragging && (
            <rect
              width={width}
              height={height}
              onMouseMove={dragMove}
              onMouseUp={dragEnd}
              onTouchMove={dragMove}
              onTouchEnd={dragEnd}
              fill="transparent"
            />
          )}
          {isDragging && (
            <g style={{ pointerEvents: 'none' }}>
              <rect
                fill="white"
                width={8}
                height={8}
                x={x + dx - 4}
                y={y + dy - 4}
              />
              <circle cx={x} cy={y} r={4} fill="transparent" stroke="white" />
            </g>
          )}
          <rect
            fill="transparent"
            width={width}
            height={height}
            onMouseDown={dragStart}
            onMouseUp={isDragging ? dragEnd : undefined}
            onMouseMove={isDragging ? dragMove : undefined}
            onTouchStart={dragStart}
            onTouchEnd={isDragging ? dragEnd : undefined}
            onTouchMove={isDragging ? dragMove : undefined}
          />
        </g>
      </svg>

      <style jsx>{`
        .DragII {
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        svg {
          margin: 1rem 0;
          cursor: crosshair;
        }

        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
};

code.demo.1747920757296.tsx
// DemoOne.tsx
import React, { useState, useEffect } from "react";
import { Component } from "@/components/ui/drag-and-draw";
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

  if (dimensions.width === 0 || dimensions.height === 0) {
    return (
      <div className={cn("flex w-screen h-screen justify-center items-center bg-gray-900 text-white")}>
        Загрузка размеров...
      </div>
    );
  }

  const chartWidth = dimensions.width * 0.9;
  const chartHeight = dimensions.height * 0.9;

  return (
    <div className={cn("w-screen h-screen overflow-hidden bg-gray-800 flex justify-center items-center")}>
      <Component
        width={chartWidth}
        height={chartHeight}
      />
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/drag-and-draw.tsx
// components/ui/component.tsx
import React, { useCallback, useState, useEffect } from 'react';
import { LinePath } from '@visx/shape';
import { useDrag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { cn } from "@/lib/utils";

type Point = { x: number; y: number }[];
type Line = Point[];
type Lines = Line[];

export type ComponentProps = {
  width: number;
  height: number;
  data?: Lines;
};

export const Component = ({ data = [], width, height }: ComponentProps) => {
  const [lines, setLines] = useState<Lines>(data);
  const onDragStart = useCallback(
    (currDrag) => {
      setLines((currLines) => [...currLines, [{ x: currDrag.x, y: currDrag.y }]]);
    },
    [setLines],
  );
  const onDragMove = useCallback(
    (currDrag) => {
      setLines((currLines) => {
        const nextLines = [...currLines];
        const newPoint = { x: currDrag.x + currDrag.dx, y: currDrag.y + currDrag.dy };
        const lastIndex = nextLines.length - 1;
        if (lastIndex >= 0 && nextLines[lastIndex]) {
          nextLines[lastIndex] = [...nextLines[lastIndex], newPoint];
        } else {
          nextLines.push([newPoint]);
        }
        return nextLines;
      });
    },
    [setLines],
  );
  const {
    x = 0,
    y = 0,
    dx,
    dy,
    isDragging,
    dragStart,
    dragEnd,
    dragMove,
  } = useDrag({
    onDragStart,
    onDragMove,
    resetOnStart: true,
  });

  return width < 10 || height < 10 ? null : (
    <div className="DragII" style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
        <rect fill="#04002b" width={width} height={height} rx={14} />
        {lines.map((line, i) => (
          <LinePath
            key={`line-${i}`}
            fill="transparent"
            stroke="url(#stroke)"
            strokeWidth={3}
            data={line}
            curve={curveBasis}
            x={(d) => d.x}
            y={(d) => d.y}
            defined={(d) => typeof d.x === 'number' && typeof d.y === 'number'}
          />
        ))}

        <g>
          {isDragging && (
            <rect
              width={width}
              height={height}
              onMouseMove={dragMove}
              onMouseUp={dragEnd}
              onTouchMove={dragMove}
              onTouchEnd={dragEnd}
              fill="transparent"
            />
          )}
          {isDragging && (
            <g style={{ pointerEvents: 'none' }}>
              <rect
                fill="white"
                width={8}
                height={8}
                x={x + dx - 4}
                y={y + dy - 4}
              />
              <circle cx={x} cy={y} r={4} fill="transparent" stroke="white" />
            </g>
          )}
          <rect
            fill="transparent"
            width={width}
            height={height}
            onMouseDown={dragStart}
            onMouseUp={isDragging ? dragEnd : undefined}
            onMouseMove={isDragging ? dragMove : undefined}
            onTouchStart={dragStart}
            onTouchEnd={isDragging ? dragEnd : undefined}
            onTouchMove={isDragging ? dragMove : undefined}
          />
        </g>
      </svg>

      <style jsx>{`
        .DragII {
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        svg {
          margin: 1rem 0;
          cursor: crosshair;
        }

        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
};
```

Install NPM dependencies:
```bash
@visx/shape, @visx/drag, @visx/curve, @visx/gradient
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
