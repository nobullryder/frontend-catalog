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
treemap-chart.tsx
// src/components/ui/treemap-chart.tsx

import React, { useState } from 'react';
import { Group } from '@visx/group';
import {
  Treemap,
  hierarchy,
  stratify,
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
} from '@visx/hierarchy';
import { TileMethod } from '@visx/hierarchy/lib/types';
import { shakespeare, Shakespeare } from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';

export const color1 = '#f3e9d2';
const color2 = '#4281a4';
export const background = '#114b5f';

const colorScale = scaleLinear<string>({
  domain: [0, Math.max(...shakespeare.map((d) => d.size ?? 0))],
  range: [color2, color1],
});

const data = stratify<Shakespeare>()
  .id((d) => d.id)
  .parentId((d) => d.parent)(shakespeare)
  .sum((d) => d.size ?? 0);

const tileMethods: { [tile: string]: TileMethod<typeof data> } = {
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
};

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

export type TreemapChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const TreemapChart = ({ width, height, margin = defaultMargin }: TreemapChartProps) => {
  const [tileMethod, setTileMethod] = useState<string>('treemapSquarify');
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0));

  return width < 10 ? null : (
    <div>
      <label>tile method</label>{' '}
      <select
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setTileMethod(e.target.value)}
        value={tileMethod}
      >
        {Object.keys(tileMethods).map((tile) => (
          <option key={tile} value={tile}>
            {tile}
          </option>
        ))}
      </select>
      <div>
        <svg width={width} height={height}>
          <rect width={width} height={height} rx={14} fill={background} />
          <Treemap<typeof data>
            top={margin.top}
            root={root}
            size={[xMax, yMax]}
            tile={tileMethods[tileMethod]}
            round
          >
            {(treemap) => (
              <Group>
                {treemap
                  .descendants()
                  .reverse()
                  .map((node, i) => {
                    const nodeWidth = node.x1 - node.x0;
                    const nodeHeight = node.y1 - node.y0;
                    return (
                      <Group
                        key={`node-${i}`}
                        top={node.y0 + margin.top}
                        left={node.x0 + margin.left}
                      >
                        {node.depth === 1 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            strokeWidth={4}
                            fill="transparent"
                          />
                        )}
                        {node.depth > 2 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            fill={colorScale(node.value || 0)}
                          />
                        )}
                      </Group>
                    );
                  })}
              </Group>
            )}
          </Treemap>
        </svg>
      </div>
    </div>
  );
};

code.demo.1747998171128.tsx
// src/components/ui/treemap-chart-demo.tsx

import { TreemapChart } from "@/components/ui/treemap-chart";

const DemoTreemapChart = () => {
  const width = 700;
  const height = 500;

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <TreemapChart width={width} height={height} />
    </div>
  );
};

export { DemoTreemapChart };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/treemap-chart.tsx
// src/components/ui/treemap-chart.tsx

import React, { useState } from 'react';
import { Group } from '@visx/group';
import {
  Treemap,
  hierarchy,
  stratify,
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
} from '@visx/hierarchy';
import { TileMethod } from '@visx/hierarchy/lib/types';
import { shakespeare, Shakespeare } from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';

export const color1 = '#f3e9d2';
const color2 = '#4281a4';
export const background = '#114b5f';

const colorScale = scaleLinear<string>({
  domain: [0, Math.max(...shakespeare.map((d) => d.size ?? 0))],
  range: [color2, color1],
});

const data = stratify<Shakespeare>()
  .id((d) => d.id)
  .parentId((d) => d.parent)(shakespeare)
  .sum((d) => d.size ?? 0);

const tileMethods: { [tile: string]: TileMethod<typeof data> } = {
  treemapSquarify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
};

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

export type TreemapChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const TreemapChart = ({ width, height, margin = defaultMargin }: TreemapChartProps) => {
  const [tileMethod, setTileMethod] = useState<string>('treemapSquarify');
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0));

  return width < 10 ? null : (
    <div>
      <label>tile method</label>{' '}
      <select
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setTileMethod(e.target.value)}
        value={tileMethod}
      >
        {Object.keys(tileMethods).map((tile) => (
          <option key={tile} value={tile}>
            {tile}
          </option>
        ))}
      </select>
      <div>
        <svg width={width} height={height}>
          <rect width={width} height={height} rx={14} fill={background} />
          <Treemap<typeof data>
            top={margin.top}
            root={root}
            size={[xMax, yMax]}
            tile={tileMethods[tileMethod]}
            round
          >
            {(treemap) => (
              <Group>
                {treemap
                  .descendants()
                  .reverse()
                  .map((node, i) => {
                    const nodeWidth = node.x1 - node.x0;
                    const nodeHeight = node.y1 - node.y0;
                    return (
                      <Group
                        key={`node-${i}`}
                        top={node.y0 + margin.top}
                        left={node.x0 + margin.left}
                      >
                        {node.depth === 1 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            strokeWidth={4}
                            fill="transparent"
                          />
                        )}
                        {node.depth > 2 && (
                          <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            fill={colorScale(node.value || 0)}
                          />
                        )}
                      </Group>
                    );
                  })}
              </Group>
            )}
          </Treemap>
        </svg>
      </div>
    </div>
  );
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/hierarchy, @visx/mock-data, @visx/scale
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
