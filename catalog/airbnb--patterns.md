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
patterns.tsx

import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import {
  Pattern as CustomPattern,
  PatternLines,
  PatternCircles,
  PatternWaves,
} from '@visx/pattern';

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 80,
};

export type PatternShowcaseProps = { 
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

const Patterns: React.FC<{ id: string; prefersReducedMotion?: boolean }>[] = [
  ({ id }) => <PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1} />,
  ({ id, prefersReducedMotion }) => (
    <CustomPattern id={id} width={10} height={10}>
      {!prefersReducedMotion && (
        <animateTransform
          attributeType="xml"
          attributeName="patternTransform"
          type="translate"
          from="0 0"
          to="0 30"
          dur="10s"
          repeatCount="indefinite"
        />
      )}

      <circle cx={5} cy={5} r="3" stroke="none" fill="black" transform-origin="center" />
    </CustomPattern>
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['horizontal']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['diagonal']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['diagonalRightToLeft']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['vertical', 'horizontal']}
    />
  ),
  ({ id }) => <PatternCircles id={id} height={10} width={10} fill="black" complement />,
  ({ id, prefersReducedMotion }) => {
    const width = 10; // This width/height is for the pattern itself, not the component
    const height = 10;

    return (
      <CustomPattern id={id} width={width} height={height}>
        {!prefersReducedMotion && (
          <animateTransform
            attributeType="xml"
            attributeName="patternTransform"
            type="translate"
            from="0 0"
            to="50 0"
            dur="10s"
            repeatCount="indefinite"
          />
        )}
        <path
          d={`M 0 ${height / 2} c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${
            -height / 4
          } , ${height / 2} 0
               c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${
            height / 2
          } 0 M ${-height / 2} ${height / 2}
               c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${
            height / 2
          } 0 M ${height} ${height / 2}
               c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${-height / 4} , ${
            height / 2
          } 0`}
          fill="none"
          stroke="black"
          strokeWidth={1}
        />
      </CustomPattern>
    );
  },
  ({ id }) => (
    <PatternWaves id={id} height={6} width={6} fill="transparent" stroke="black" strokeWidth={1} />
  ),
];


export const PatternShowcase = ({ width, height, margin = defaultMargin }: PatternShowcaseProps) => {
  const prefersReducedMotionQuery =
    typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;

  const numColumns = 3;
  const numRows = Math.ceil(Patterns.length / numColumns); 
  const columnWidth = Math.max((width - margin.left - margin.right) / numColumns, 0);
  const rowHeight = Math.max((height - margin.bottom - margin.top) / numRows, 0);

  return width >= 10 ? (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#f5f2e3" rx={14} />
      <Group top={margin.top} left={margin.left}>
        {Patterns.map((Pattern, index) => {
          const columnIndex = index % numColumns;
          const rowIndex = Math.floor(index / numColumns);
          const id = `visx-pattern-demo-${index}`; 

          return (
            <React.Fragment key={id}>
              <Pattern id={id} prefersReducedMotion={prefersReducedMotion} />
              <Bar
                fill={`url(#${id})`}
                x={columnIndex * columnWidth}
                y={rowIndex * rowHeight}
                width={columnWidth}
                height={rowHeight}
                rx={14}
              />
            </React.Fragment>
          );
        })}
      </Group>
    </svg>
  ) : null;
};

code.demo.1747940571427.tsx
import { PatternShowcase } from "@/components/ui/patterns";

const DemoPatternShowcase = () => {

  const width = 800;
  const height = 600;

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <PatternShowcase width={width} height={height} />
    </div>
  );
};

export { DemoPatternShowcase };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/patterns.tsx

import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import {
  Pattern as CustomPattern,
  PatternLines,
  PatternCircles,
  PatternWaves,
} from '@visx/pattern';

const defaultMargin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 80,
};

export type PatternShowcaseProps = { 
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

const Patterns: React.FC<{ id: string; prefersReducedMotion?: boolean }>[] = [
  ({ id }) => <PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1} />,
  ({ id, prefersReducedMotion }) => (
    <CustomPattern id={id} width={10} height={10}>
      {!prefersReducedMotion && (
        <animateTransform
          attributeType="xml"
          attributeName="patternTransform"
          type="translate"
          from="0 0"
          to="0 30"
          dur="10s"
          repeatCount="indefinite"
        />
      )}

      <circle cx={5} cy={5} r="3" stroke="none" fill="black" transform-origin="center" />
    </CustomPattern>
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['horizontal']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['diagonal']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['diagonalRightToLeft']}
    />
  ),
  ({ id }) => (
    <PatternLines
      id={id}
      height={6}
      width={6}
      stroke="black"
      strokeWidth={1}
      orientation={['vertical', 'horizontal']}
    />
  ),
  ({ id }) => <PatternCircles id={id} height={10} width={10} fill="black" complement />,
  ({ id, prefersReducedMotion }) => {
    const width = 10; // This width/height is for the pattern itself, not the component
    const height = 10;

    return (
      <CustomPattern id={id} width={width} height={height}>
        {!prefersReducedMotion && (
          <animateTransform
            attributeType="xml"
            attributeName="patternTransform"
            type="translate"
            from="0 0"
            to="50 0"
            dur="10s"
            repeatCount="indefinite"
          />
        )}
        <path
          d={`M 0 ${height / 2} c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${
            -height / 4
          } , ${height / 2} 0
               c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${
            height / 2
          } 0 M ${-height / 2} ${height / 2}
               c ${height / 8} ${height / 4} , ${(height * 3) / 8} ${height / 4} , ${
            height / 2
          } 0 M ${height} ${height / 2}
               c ${height / 8} ${-height / 4} , ${(height * 3) / 8} ${-height / 4} , ${
            height / 2
          } 0`}
          fill="none"
          stroke="black"
          strokeWidth={1}
        />
      </CustomPattern>
    );
  },
  ({ id }) => (
    <PatternWaves id={id} height={6} width={6} fill="transparent" stroke="black" strokeWidth={1} />
  ),
];


export const PatternShowcase = ({ width, height, margin = defaultMargin }: PatternShowcaseProps) => {
  const prefersReducedMotionQuery =
    typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;

  const numColumns = 3;
  const numRows = Math.ceil(Patterns.length / numColumns); 
  const columnWidth = Math.max((width - margin.left - margin.right) / numColumns, 0);
  const rowHeight = Math.max((height - margin.bottom - margin.top) / numRows, 0);

  return width >= 10 ? (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#f5f2e3" rx={14} />
      <Group top={margin.top} left={margin.left}>
        {Patterns.map((Pattern, index) => {
          const columnIndex = index % numColumns;
          const rowIndex = Math.floor(index / numColumns);
          const id = `visx-pattern-demo-${index}`; 

          return (
            <React.Fragment key={id}>
              <Pattern id={id} prefersReducedMotion={prefersReducedMotion} />
              <Bar
                fill={`url(#${id})`}
                x={columnIndex * columnWidth}
                y={rowIndex * rowHeight}
                width={columnWidth}
                height={rowHeight}
                rx={14}
              />
            </React.Fragment>
          );
        })}
      </Group>
    </svg>
  ) : null;
};
```

Install NPM dependencies:
```bash
@visx/shape, @visx/group, @visx/pattern
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
