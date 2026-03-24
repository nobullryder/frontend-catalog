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
layered-funnel-chart.tsx
'use client';

import React from 'react';
import {
  FunnelChart,
  FunnelSeries,
  FunnelArc,
  TooltipArea,
  FunnelAxis,
  FunnelAxisLine,
} from 'reaviz';

// Data Definitions and Validation
interface FunnelDataPoint {
  key: string;
  data: number | null;
}

const simpleFunnelDataRaw: FunnelDataPoint[] = [
  { key: 'All Events', data: 1000 },
  { key: 'Alerts Triggered', data: 750 },
  { key: 'Incidents Created', data: 500 },
  { key: 'Escalated', data: 250 },
  { key: 'Resolved', data: 200 },
];

// Validate and prepare chart data
const validatedSimpleFunnelData = simpleFunnelDataRaw.map(item => ({
  ...item,
  data: (typeof item.data === 'number' && !isNaN(item.data)) ? item.data : 0,
}));

// Color scheme for layered funnel - ensure colors are distinct enough for layers
const layeredFunnelChartColors = ['#EE409430', '#EE409475', '#EE4094', '#BB015A', '#8A0042'];

interface LayeredFunnelWidgetProps {
  title?: string;
}

function LayeredFunnelWidget({ title = "Incident Report" }: LayeredFunnelWidgetProps): JSX.Element {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[300px] h-[420px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-neutral-800 dark:text-white">
        {title}
      </h3>
      <div className="flex-grow px-4">
        <FunnelChart
          id="layered-incident-funnel"
          height={280} // Explicit height for the chart
          data={validatedSimpleFunnelData}
          series={
            <FunnelSeries
              arc={
                <FunnelArc
                  colorScheme={layeredFunnelChartColors}
                  gradient={null}
                  tooltip={<TooltipArea />}
                  variant="layered" // Key property for layered effect
                  glow={{
                    blur: 15,
                    color: '#EE409499', // Glow color matching the theme
                  }}
                />
              }
              axis={
                <FunnelAxis
                  label={null}
                  line={
                    <FunnelAxisLine 
                      strokeColor={'#4A5568'} // Neutral color for axis line
                      className="dark:stroke-gray-600" // Dark mode specific color
                    />
                  }
                />
              }
            />
          }
        />
      </div>
    </div>
  );
}

export default LayeredFunnelWidget;

code.demo.1748120518404.tsx
import React from 'react';
import LayeredFunnelWidget from '@/components/ui/layered-funnel-chart';

function LayeredFunnelWidgetDemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 p-4 transition-colors duration-300">
      <LayeredFunnelWidget title="Layered Incident Funnel" />
    </div>
  );
}

export default LayeredFunnelWidgetDemoPage;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/layered-funnel-chart.tsx
'use client';

import React from 'react';
import {
  FunnelChart,
  FunnelSeries,
  FunnelArc,
  TooltipArea,
  FunnelAxis,
  FunnelAxisLine,
} from 'reaviz';

// Data Definitions and Validation
interface FunnelDataPoint {
  key: string;
  data: number | null;
}

const simpleFunnelDataRaw: FunnelDataPoint[] = [
  { key: 'All Events', data: 1000 },
  { key: 'Alerts Triggered', data: 750 },
  { key: 'Incidents Created', data: 500 },
  { key: 'Escalated', data: 250 },
  { key: 'Resolved', data: 200 },
];

// Validate and prepare chart data
const validatedSimpleFunnelData = simpleFunnelDataRaw.map(item => ({
  ...item,
  data: (typeof item.data === 'number' && !isNaN(item.data)) ? item.data : 0,
}));

// Color scheme for layered funnel - ensure colors are distinct enough for layers
const layeredFunnelChartColors = ['#EE409430', '#EE409475', '#EE4094', '#BB015A', '#8A0042'];

interface LayeredFunnelWidgetProps {
  title?: string;
}

function LayeredFunnelWidget({ title = "Incident Report" }: LayeredFunnelWidgetProps): JSX.Element {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[300px] h-[420px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-neutral-800 dark:text-white">
        {title}
      </h3>
      <div className="flex-grow px-4">
        <FunnelChart
          id="layered-incident-funnel"
          height={280} // Explicit height for the chart
          data={validatedSimpleFunnelData}
          series={
            <FunnelSeries
              arc={
                <FunnelArc
                  colorScheme={layeredFunnelChartColors}
                  gradient={null}
                  tooltip={<TooltipArea />}
                  variant="layered" // Key property for layered effect
                  glow={{
                    blur: 15,
                    color: '#EE409499', // Glow color matching the theme
                  }}
                />
              }
              axis={
                <FunnelAxis
                  label={null}
                  line={
                    <FunnelAxisLine 
                      strokeColor={'#4A5568'} // Neutral color for axis line
                      className="dark:stroke-gray-600" // Dark mode specific color
                    />
                  }
                />
              }
            />
          }
        />
      </div>
    </div>
  );
}

export default LayeredFunnelWidget;
```

Install NPM dependencies:
```bash
reaviz
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
