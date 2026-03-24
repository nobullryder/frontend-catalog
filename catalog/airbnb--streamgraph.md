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
streamgraph.tsx
import React, { useCallback, useState } from 'react';
import { Stack } from '@visx/shape';
import { PatternCircles, PatternWaves } from '@visx/pattern';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { transpose } from '@visx/vendor/d3-array';
import { animated, useSpring } from '@react-spring/web';


const useForceUpdate = () => {
  const [, update] = useState(0);
  return useCallback(() => update((prev) => prev + 1), []);
};

const generateData = (numSamples: number, numBumps: number) => {
  const data = new Array(numSamples);

  for (let i = 0; i < numSamples; ++i) {
    data[i] = 0;
  }

  for (let i = 0; i < numBumps; ++i) {
    const x = Math.random() * numSamples;
    const y = Math.random() * 0.1 + 0.1;
    const sigma = Math.random() * numSamples * 0.1;
    for (let j = 0; j < numSamples; ++j) {
      data[j] += y * Math.exp(-Math.pow(j - x, 2) / (2 * sigma * sigma));
    }
  }

  return data;
};


const NUM_LAYERS = 20;
const SAMPLES_PER_LAYER = 200;
const BUMPS_PER_LAYER = 10;
export const BACKGROUND = '#ffdede'; 

const range = (n: number) => Array.from(new Array(n), (_, i) => i);

const keys = range(NUM_LAYERS);

const xScale = scaleLinear<number>({
  domain: [0, SAMPLES_PER_LAYER - 1],
});
const yScale = scaleLinear<number>({
  domain: [-5, 5],
});
const colorScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['#ffc409', '#f14702', '#262d97', 'white', '#036ecd', '#9ecadd', '#51666e'],
});
const patternScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'circles', 'circles', 'circles', 'circles'],
});

// accessors
type Datum = number[];
const getY0 = (d: Datum) => yScale(d[0]) ?? 0;
const getY1 = (d: Datum) => yScale(d[1]) ?? 0;

export type StreamGraphProps = {
  width: number;
  height: number;
  animate?: boolean;
};

export const Streamgraph = ({ width, height, animate = true }: StreamGraphProps) => {
  const forceUpdate = useForceUpdate();
  const handlePress = () => forceUpdate();

  if (width < 10) return null;

  xScale.range([0, width]);
  yScale.range([height, 0]);

  // generate layers in render to update on touch
  const layers = transpose<number>(
    keys.map(() => generateData(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)),
  );

  return (
    <svg width={width} height={height}>
      <PatternCircles id="mustard" height={50} width={50} radius={5} fill="#036ecf" complement />
      <PatternWaves
        id="cherry"
        height={12}
        width={12}
        fill="transparent"
        stroke="#232493"
        strokeWidth={1}
      />
      <PatternCircles id="navy" height={70} width={60} radius={10} fill="white" complement />
      <PatternCircles
        complement
        id="circles"
        height={60}
        width={60}
        radius={10}
        fill="transparent"
      />

      <g onClick={handlePress} onTouchStart={handlePress}>
        <rect x={0} y={0} width={width} height={height} fill={BACKGROUND} rx={14} />
        <Stack<number[], number>
          data={layers}
          keys={keys}
          offset="wiggle"
          color={colorScale}
          x={(_, i) => xScale(i) ?? 0}
          y0={getY0}
          y1={getY1}
        >
          {({ stacks, path }) =>
            stacks.map((stack) => {
              const pathString = path(stack) || '';
              const tweened = animate ? useSpring({ pathString }) : { pathString };
              const color = colorScale(stack.key);
              const pattern = patternScale(stack.key);
              return (
                <g key={`series-${stack.key}`}>
                  <animated.path d={tweened.pathString} fill={color} />
                  <animated.path d={tweened.pathString} fill={`url(#${pattern})`} />
                </g>
              );
            })
          }
        </Stack>
      </g>
    </svg>
  );
};

code.demo.1747940222955.tsx

import { Streamgraph } from "@/components/ui/streamgraph"; 

const DemoStreamgraph = () => {
 
  const width = 1000; 
  const height = 500; 

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-50">
      <Streamgraph width={width} height={height} animate={true} />
    </div>
  );
};

export { DemoStreamgraph };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/streamgraph.tsx
import React, { useCallback, useState } from 'react';
import { Stack } from '@visx/shape';
import { PatternCircles, PatternWaves } from '@visx/pattern';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { transpose } from '@visx/vendor/d3-array';
import { animated, useSpring } from '@react-spring/web';


const useForceUpdate = () => {
  const [, update] = useState(0);
  return useCallback(() => update((prev) => prev + 1), []);
};

const generateData = (numSamples: number, numBumps: number) => {
  const data = new Array(numSamples);

  for (let i = 0; i < numSamples; ++i) {
    data[i] = 0;
  }

  for (let i = 0; i < numBumps; ++i) {
    const x = Math.random() * numSamples;
    const y = Math.random() * 0.1 + 0.1;
    const sigma = Math.random() * numSamples * 0.1;
    for (let j = 0; j < numSamples; ++j) {
      data[j] += y * Math.exp(-Math.pow(j - x, 2) / (2 * sigma * sigma));
    }
  }

  return data;
};


const NUM_LAYERS = 20;
const SAMPLES_PER_LAYER = 200;
const BUMPS_PER_LAYER = 10;
export const BACKGROUND = '#ffdede'; 

const range = (n: number) => Array.from(new Array(n), (_, i) => i);

const keys = range(NUM_LAYERS);

const xScale = scaleLinear<number>({
  domain: [0, SAMPLES_PER_LAYER - 1],
});
const yScale = scaleLinear<number>({
  domain: [-5, 5],
});
const colorScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['#ffc409', '#f14702', '#262d97', 'white', '#036ecd', '#9ecadd', '#51666e'],
});
const patternScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'circles', 'circles', 'circles', 'circles'],
});

// accessors
type Datum = number[];
const getY0 = (d: Datum) => yScale(d[0]) ?? 0;
const getY1 = (d: Datum) => yScale(d[1]) ?? 0;

export type StreamGraphProps = {
  width: number;
  height: number;
  animate?: boolean;
};

export const Streamgraph = ({ width, height, animate = true }: StreamGraphProps) => {
  const forceUpdate = useForceUpdate();
  const handlePress = () => forceUpdate();

  if (width < 10) return null;

  xScale.range([0, width]);
  yScale.range([height, 0]);

  // generate layers in render to update on touch
  const layers = transpose<number>(
    keys.map(() => generateData(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)),
  );

  return (
    <svg width={width} height={height}>
      <PatternCircles id="mustard" height={50} width={50} radius={5} fill="#036ecf" complement />
      <PatternWaves
        id="cherry"
        height={12}
        width={12}
        fill="transparent"
        stroke="#232493"
        strokeWidth={1}
      />
      <PatternCircles id="navy" height={70} width={60} radius={10} fill="white" complement />
      <PatternCircles
        complement
        id="circles"
        height={60}
        width={60}
        radius={10}
        fill="transparent"
      />

      <g onClick={handlePress} onTouchStart={handlePress}>
        <rect x={0} y={0} width={width} height={height} fill={BACKGROUND} rx={14} />
        <Stack<number[], number>
          data={layers}
          keys={keys}
          offset="wiggle"
          color={colorScale}
          x={(_, i) => xScale(i) ?? 0}
          y0={getY0}
          y1={getY1}
        >
          {({ stacks, path }) =>
            stacks.map((stack) => {
              const pathString = path(stack) || '';
              const tweened = animate ? useSpring({ pathString }) : { pathString };
              const color = colorScale(stack.key);
              const pattern = patternScale(stack.key);
              return (
                <g key={`series-${stack.key}`}>
                  <animated.path d={tweened.pathString} fill={color} />
                  <animated.path d={tweened.pathString} fill={`url(#${pattern})`} />
                </g>
              );
            })
          }
        </Stack>
      </g>
    </svg>
  );
};
```

Install NPM dependencies:
```bash
@visx/shape, @visx/pattern, @visx/scale, @visx/vendor, @react-spring/web
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
