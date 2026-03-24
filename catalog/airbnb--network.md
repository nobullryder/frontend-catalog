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
network.tsx
// src/components/ui/component.tsx

import React from 'react';
import { DefaultNode, Graph } from '@visx/network';

interface CustomNodeData {
  id: string;
  x: number;
  y: number;
  color?: string;
}

interface CustomLinkData {
  source: CustomNodeData;
  target: CustomNodeData;
  dashed?: boolean;
}

interface GraphData {
  nodes: CustomNodeData[];
  links: CustomLinkData[];
}

const defaultNodes: CustomNodeData[] = [
  { id: 'node-1', x: 50, y: 20 },
  { id: 'node-2', x: 200, y: 250 },
  { id: 'node-3', x: 300, y: 40, color: '#26deb0' },
];

const defaultLinks: CustomLinkData[] = [
  { source: defaultNodes[0], target: defaultNodes[1] },
  { source: defaultNodes[1], target: defaultNodes[2] },
  { source: defaultNodes[2], target: defaultNodes[0], dashed: true },
];

const defaultGraphData: GraphData = {
  nodes: defaultNodes,
  links: defaultLinks,
};

const defaultBackgroundColor = '#272b4d';

export interface ComponentProps {
  width: number;
  height: number;
  graphData?: GraphData;
  backgroundColor?: string;
  offsetTop?: number;
  offsetLeft?: number;
}

const CustomNodeComponent: React.FC<{ node: CustomNodeData }> = ({ node }) => {
  return node.color ? <DefaultNode fill={node.color} /> : <DefaultNode />;
};

const CustomLinkComponent: React.FC<{ link: CustomLinkData }> = ({ link }) => {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      strokeWidth={2}
      stroke="#999"
      strokeOpacity={0.6}
      strokeDasharray={link.dashed ? '8,4' : undefined}
    />
  );
};


export const Component: React.FC<ComponentProps> = ({
  width,
  height,
  graphData = defaultGraphData,
  backgroundColor = defaultBackgroundColor,
  offsetTop = 0,
  offsetLeft = 0, 
}) => {
  if (width < 10 || height < 10) return null;

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={backgroundColor} />
      <Graph<CustomLinkData, CustomNodeData>
        graph={graphData}
        top={offsetTop}
        left={offsetLeft}
        nodeComponent={CustomNodeComponent}
        linkComponent={CustomLinkComponent}
      />
    </svg>
  );
};

code.demo.1748003073498.tsx
// src/DemoOne.tsx

import React from 'react';
import { Component as NetworkGraphComponent } from '@/components/ui/network';
import { cn } from "@/lib/utils";

const customNodesForDemo = [
  { id: 'a', x: 50, y: 50, color: '#ff6b6b' },
  { id: 'b', x: 250, y: 80 },
  { id: 'c', x: 150, y: 250, color: '#4ecdc4' },
  { id: 'd', x: 350, y: 280 },
];

const customLinksForDemo = [
  { source: customNodesForDemo[0], target: customNodesForDemo[1], dashed: true },
  { source: customNodesForDemo[1], target: customNodesForDemo[2] },
  { source: customNodesForDemo[2], target: customNodesForDemo[3] },
  { source: customNodesForDemo[3], target: customNodesForDemo[0] },
  { source: customNodesForDemo[0], target: customNodesForDemo[2] },
];

const demoGraphData = {
  nodes: customNodesForDemo,
  links: customLinksForDemo,
};


const DemoOne = () => {
  return (
    <div className={cn("flex w-full min-h-screen justify-center items-center p-4 bg-gray-700")}>
      <div className="rounded-lg shadow-xl overflow-hidden">
        <NetworkGraphComponent
          width={500}
          height={400}
          graphData={demoGraphData} 
        />
      </div>
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/network.tsx
// src/components/ui/component.tsx

import React from 'react';
import { DefaultNode, Graph } from '@visx/network';

interface CustomNodeData {
  id: string;
  x: number;
  y: number;
  color?: string;
}

interface CustomLinkData {
  source: CustomNodeData;
  target: CustomNodeData;
  dashed?: boolean;
}

interface GraphData {
  nodes: CustomNodeData[];
  links: CustomLinkData[];
}

const defaultNodes: CustomNodeData[] = [
  { id: 'node-1', x: 50, y: 20 },
  { id: 'node-2', x: 200, y: 250 },
  { id: 'node-3', x: 300, y: 40, color: '#26deb0' },
];

const defaultLinks: CustomLinkData[] = [
  { source: defaultNodes[0], target: defaultNodes[1] },
  { source: defaultNodes[1], target: defaultNodes[2] },
  { source: defaultNodes[2], target: defaultNodes[0], dashed: true },
];

const defaultGraphData: GraphData = {
  nodes: defaultNodes,
  links: defaultLinks,
};

const defaultBackgroundColor = '#272b4d';

export interface ComponentProps {
  width: number;
  height: number;
  graphData?: GraphData;
  backgroundColor?: string;
  offsetTop?: number;
  offsetLeft?: number;
}

const CustomNodeComponent: React.FC<{ node: CustomNodeData }> = ({ node }) => {
  return node.color ? <DefaultNode fill={node.color} /> : <DefaultNode />;
};

const CustomLinkComponent: React.FC<{ link: CustomLinkData }> = ({ link }) => {
  return (
    <line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      strokeWidth={2}
      stroke="#999"
      strokeOpacity={0.6}
      strokeDasharray={link.dashed ? '8,4' : undefined}
    />
  );
};


export const Component: React.FC<ComponentProps> = ({
  width,
  height,
  graphData = defaultGraphData,
  backgroundColor = defaultBackgroundColor,
  offsetTop = 0,
  offsetLeft = 0, 
}) => {
  if (width < 10 || height < 10) return null;

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={backgroundColor} />
      <Graph<CustomLinkData, CustomNodeData>
        graph={graphData}
        top={offsetTop}
        left={offsetLeft}
        nodeComponent={CustomNodeComponent}
        linkComponent={CustomLinkComponent}
      />
    </svg>
  );
};
```

Install NPM dependencies:
```bash
@visx/network
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
