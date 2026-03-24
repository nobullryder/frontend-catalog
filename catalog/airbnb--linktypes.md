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
linktypes.tsx
// src/components/ui/tree-chart.tsx

/* eslint-disable react/jsx-handler-names */
import React, { useState, useMemo, useCallback } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { HierarchyPointNode, HierarchyPointLink } from '@visx/hierarchy/lib/types';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import {
  LinkRadial, LinkVertical, LinkHorizontal,
  LinkHorizontalStep, LinkVerticalStep, LinkRadialStep,
  LinkHorizontalLine, LinkVerticalLine, LinkRadialLine,
  LinkHorizontalCurve, LinkVerticalCurve, LinkRadialCurve,
} from '@visx/shape';


const mainBackground = '#272b4d'; 
const rootNodeFill = '#fa7268'; 
const nodeBorderColor = '#00f2e0'; 
const leafTextColor = 'white'; 
const parentTextColor = 'white';
const linkColor = '#f584e0'; 


const useForceUpdate = () => {
  const [, update] = useState(0);
  return useCallback(() => update((prev) => prev + 1), []);
};

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const data: TreeNode = {
  name: 'T',
  children: [
    {
      name: 'A',
      children: [
        { name: 'A1' },
        { name: 'A2' },
        { name: 'A3' },
        {
          name: 'C',
          children: [
            {
              name: 'C1',
            },
            {
              name: 'D',
              children: [
                {
                  name: 'D1',
                },
                {
                  name: 'D2',
                },
                {
                  name: 'D3',
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Z' },
    {
      name: 'B',
      children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
    },
  ],
};


const getLinkComponent = ({ layout, linkType, orientation }: { layout: string; linkType: string; orientation: string }) => {
  if (layout === 'polar') {
    if (linkType === 'step') {
      return LinkRadialStep;
    }
    if (linkType === 'line') {
      return LinkRadialLine;
    }
    if (linkType === 'curve') {
      return LinkRadialCurve;
    }
    return LinkRadial;
  }
  if (orientation === 'vertical') {
    if (linkType === 'step') {
      return LinkVerticalStep;
    }
    if (linkType === 'line') {
      return LinkVerticalLine;
    }
    if (linkType === 'curve') {
      return LinkVerticalCurve;
    }
    return LinkVertical;
  }
  if (linkType === 'step') {
    return LinkHorizontalStep;
  }
  if (linkType === 'line') {
    return LinkHorizontalLine;
  }
  if (linkType === 'curve') {
    return LinkHorizontalCurve;
  }
  return LinkHorizontal;
};


interface LinkControlsProps {
  layout: string;
  orientation: string;
  linkType: string;
  stepPercent: number;
  setLayout: (layout: string) => void;
  setOrientation: (orientation: string) => void;
  setLinkType: (linkType: string) => void;
  setStepPercent: (percent: number) => void;
}

const LinkControls: React.FC<LinkControlsProps> = ({
  layout,
  orientation,
  linkType,
  stepPercent,
  setLayout,
  setOrientation,
  setLinkType,
  setStepPercent,
}) => (
  <div className="controls">
    <label>
      Layout:
      <select onChange={(e) => setLayout(e.target.value)} value={layout}>
        <option value="cartesian">Cartesian</option>
        <option value="polar">Polar</option>
      </select>
    </label>
    <label>
      Orientation:
      <select
        onChange={(e) => setOrientation(e.target.value)}
        value={orientation}
        disabled={layout === 'polar'}
      >
        <option value="vertical">Vertical</option>
        <option value="horizontal">Horizontal</option>
      </select>
    </label>
    <label>
      Link Type:
      <select onChange={(e) => setLinkType(e.target.value)} value={linkType}>
        <option value="diagonal">Diagonal</option>
        <option value="step">Step</option>
        <option value="curve">Curve</option>
        <option value="line">Line</option>
      </select>
    </label>
    <label>
      Step Percent:
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        onChange={(e) => setStepPercent(Number(e.target.value))}
        value={stepPercent}
        disabled={linkType !== 'step'}
      />
    </label>
  </div>
);


function RootNode({ node, top, left, forceUpdate }: { node: HierarchyPointNode<TreeNode>; top: number; left: number; forceUpdate: () => void }) {
  const radius = 12; 
  return (
    <Group top={top} left={left}>
      <circle
        r={radius}
        fill={rootNodeFill}
        stroke={nodeBorderColor}
        strokeWidth={1}
        strokeDasharray="2,2" 
        onClick={() => {
          node.data.isExpanded = !node.data.isExpanded;
          forceUpdate();
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={parentTextColor} 
      >
        {node.data.name}
      </text>
    </Group>
  );
}


function Node({ node, top, left, forceUpdate }: { node: HierarchyPointNode<TreeNode>; top: number; left: number; forceUpdate: () => void }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  const isParentInData = !!node.data.children && node.data.children.length > 0;

  return (
    <Group top={top} left={left}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={mainBackground}
        stroke={nodeBorderColor}
        strokeWidth={1}
        strokeDasharray={isParentInData ? '0' : '2,2'} 
        rx={isParentInData ? 4 : 10}
        onClick={() => {
          node.data.isExpanded = !node.data.isExpanded;
          forceUpdate();
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={isParentInData ? parentTextColor : leafTextColor} 
      >
        {node.data.name}
      </text>
    </Group>
  );
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type TreeChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const TreeChart = ({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: TreeChartProps) => {
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  const rootNode = useMemo(
    () => hierarchy<TreeNode>(data, (d) => (d.isExpanded ? null : d.children)),
    [data, forceUpdate]
  );

  return totalWidth < 10 ? null : (
    <div>
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill={mainBackground} />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={rootNode}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / 0.5} 
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={linkType === 'step' ? stepPercent : undefined}
                    stroke={linkColor} 
                    strokeWidth="1.5" 
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else { 
                    top = node.x; 
                    left = node.y;
                  }

                  if (node.depth === 0) {
                    return <RootNode key={key} node={node} top={top} left={left} forceUpdate={forceUpdate} />;
                  }
                  return <Node key={key} node={node} top={top} left={left} forceUpdate={forceUpdate} />;
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          gap: 10px;
          color: white;
          background: ${mainBackground};
          padding: 10px;
          border-radius: 8px;
        }
        .controls label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: white;
        }
        .controls select,
        .controls input[type='range'] {
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
          background: #444;
          color: white;
        }
        .controls select option {
          background: #444;
          color: white;
        }
      `,
        }}
      />
    </div>
  );
};

code.demo.1747943099194.tsx
import { TreeChart } from "@/components/ui/linktypes";

const DemoTreeChart = () => {
  const width = 800;
  const height = 600;

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <TreeChart width={width} height={height} />
    </div>
  );
};

export { DemoTreeChart };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/linktypes.tsx
// src/components/ui/tree-chart.tsx

/* eslint-disable react/jsx-handler-names */
import React, { useState, useMemo, useCallback } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { HierarchyPointNode, HierarchyPointLink } from '@visx/hierarchy/lib/types';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import {
  LinkRadial, LinkVertical, LinkHorizontal,
  LinkHorizontalStep, LinkVerticalStep, LinkRadialStep,
  LinkHorizontalLine, LinkVerticalLine, LinkRadialLine,
  LinkHorizontalCurve, LinkVerticalCurve, LinkRadialCurve,
} from '@visx/shape';


const mainBackground = '#272b4d'; 
const rootNodeFill = '#fa7268'; 
const nodeBorderColor = '#00f2e0'; 
const leafTextColor = 'white'; 
const parentTextColor = 'white';
const linkColor = '#f584e0'; 


const useForceUpdate = () => {
  const [, update] = useState(0);
  return useCallback(() => update((prev) => prev + 1), []);
};

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const data: TreeNode = {
  name: 'T',
  children: [
    {
      name: 'A',
      children: [
        { name: 'A1' },
        { name: 'A2' },
        { name: 'A3' },
        {
          name: 'C',
          children: [
            {
              name: 'C1',
            },
            {
              name: 'D',
              children: [
                {
                  name: 'D1',
                },
                {
                  name: 'D2',
                },
                {
                  name: 'D3',
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Z' },
    {
      name: 'B',
      children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
    },
  ],
};


const getLinkComponent = ({ layout, linkType, orientation }: { layout: string; linkType: string; orientation: string }) => {
  if (layout === 'polar') {
    if (linkType === 'step') {
      return LinkRadialStep;
    }
    if (linkType === 'line') {
      return LinkRadialLine;
    }
    if (linkType === 'curve') {
      return LinkRadialCurve;
    }
    return LinkRadial;
  }
  if (orientation === 'vertical') {
    if (linkType === 'step') {
      return LinkVerticalStep;
    }
    if (linkType === 'line') {
      return LinkVerticalLine;
    }
    if (linkType === 'curve') {
      return LinkVerticalCurve;
    }
    return LinkVertical;
  }
  if (linkType === 'step') {
    return LinkHorizontalStep;
  }
  if (linkType === 'line') {
    return LinkHorizontalLine;
  }
  if (linkType === 'curve') {
    return LinkHorizontalCurve;
  }
  return LinkHorizontal;
};


interface LinkControlsProps {
  layout: string;
  orientation: string;
  linkType: string;
  stepPercent: number;
  setLayout: (layout: string) => void;
  setOrientation: (orientation: string) => void;
  setLinkType: (linkType: string) => void;
  setStepPercent: (percent: number) => void;
}

const LinkControls: React.FC<LinkControlsProps> = ({
  layout,
  orientation,
  linkType,
  stepPercent,
  setLayout,
  setOrientation,
  setLinkType,
  setStepPercent,
}) => (
  <div className="controls">
    <label>
      Layout:
      <select onChange={(e) => setLayout(e.target.value)} value={layout}>
        <option value="cartesian">Cartesian</option>
        <option value="polar">Polar</option>
      </select>
    </label>
    <label>
      Orientation:
      <select
        onChange={(e) => setOrientation(e.target.value)}
        value={orientation}
        disabled={layout === 'polar'}
      >
        <option value="vertical">Vertical</option>
        <option value="horizontal">Horizontal</option>
      </select>
    </label>
    <label>
      Link Type:
      <select onChange={(e) => setLinkType(e.target.value)} value={linkType}>
        <option value="diagonal">Diagonal</option>
        <option value="step">Step</option>
        <option value="curve">Curve</option>
        <option value="line">Line</option>
      </select>
    </label>
    <label>
      Step Percent:
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        onChange={(e) => setStepPercent(Number(e.target.value))}
        value={stepPercent}
        disabled={linkType !== 'step'}
      />
    </label>
  </div>
);


function RootNode({ node, top, left, forceUpdate }: { node: HierarchyPointNode<TreeNode>; top: number; left: number; forceUpdate: () => void }) {
  const radius = 12; 
  return (
    <Group top={top} left={left}>
      <circle
        r={radius}
        fill={rootNodeFill}
        stroke={nodeBorderColor}
        strokeWidth={1}
        strokeDasharray="2,2" 
        onClick={() => {
          node.data.isExpanded = !node.data.isExpanded;
          forceUpdate();
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={parentTextColor} 
      >
        {node.data.name}
      </text>
    </Group>
  );
}


function Node({ node, top, left, forceUpdate }: { node: HierarchyPointNode<TreeNode>; top: number; left: number; forceUpdate: () => void }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  const isParentInData = !!node.data.children && node.data.children.length > 0;

  return (
    <Group top={top} left={left}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={mainBackground}
        stroke={nodeBorderColor}
        strokeWidth={1}
        strokeDasharray={isParentInData ? '0' : '2,2'} 
        rx={isParentInData ? 4 : 10}
        onClick={() => {
          node.data.isExpanded = !node.data.isExpanded;
          forceUpdate();
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={isParentInData ? parentTextColor : leafTextColor} 
      >
        {node.data.name}
      </text>
    </Group>
  );
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type TreeChartProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export const TreeChart = ({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: TreeChartProps) => {
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  const rootNode = useMemo(
    () => hierarchy<TreeNode>(data, (d) => (d.isExpanded ? null : d.children)),
    [data, forceUpdate]
  );

  return totalWidth < 10 ? null : (
    <div>
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill={mainBackground} />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={rootNode}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / 0.5} 
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={linkType === 'step' ? stepPercent : undefined}
                    stroke={linkColor} 
                    strokeWidth="1.5" 
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else { 
                    top = node.x; 
                    left = node.y;
                  }

                  if (node.depth === 0) {
                    return <RootNode key={key} node={node} top={top} left={left} forceUpdate={forceUpdate} />;
                  }
                  return <Node key={key} node={node} top={top} left={left} forceUpdate={forceUpdate} />;
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          gap: 10px;
          color: white;
          background: ${mainBackground};
          padding: 10px;
          border-radius: 8px;
        }
        .controls label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: white;
        }
        .controls select,
        .controls input[type='range'] {
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
          background: #444;
          color: white;
        }
        .controls select option {
          background: #444;
          color: white;
        }
      `,
        }}
      />
    </div>
  );
};
```

Install NPM dependencies:
```bash
@visx/group, @visx/hierarchy, @visx/gradient, d3-shape, @visx/shape
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
