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
stacked-bar.tsx
'use client';

import React from 'react';
import {
  StackedBarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  StackedBarSeries,
  Bar,
  GridlineSeries,
  Gridline,
} from 'reaviz';

// Data Definitions and Validation
interface StackSegment {
  key: string; // Series name, e.g., 'Low', 'Medium'
  data: number | null;
}

interface ChartCategoryData {
  key: string; // Category on X-axis, e.g., 'Phishing'
  data: StackSegment[];
}

const multiCategoryRaw: ChartCategoryData[] = [
  {
    key: 'Phishing',
    data: [
      { key: 'Low', data: 20 },
      { key: 'Medium', data: 30 },
      { key: 'High', data: 10 },
      { key: 'Critical', data: 5 },
    ],
  },
  {
    key: 'Malware',
    data: [
      { key: 'Low', data: 15 },
      { key: 'Medium', data: 25 },
      { key: 'High', data: 15 },
      { key: 'Critical', data: 8 },
    ],
  },
  {
    key: 'Ransomware',
    data: [
      { key: 'Low', data: 10 },
      { key: 'Medium', data: 20 },
      { key: 'High', data: 25 },
      { key: 'Critical', data: 12 },
    ],
  },
  {
    key: 'Spyware',
    data: [
      { key: 'Low', data: 25 },
      { key: 'Medium', data: 15 },
      { key: 'High', data: 8 },
      { key: 'Critical', data: 3 },
    ],
  },
];

// Validate and prepare chart data
const validatedMultiCategoryData = multiCategoryRaw.map(category => ({
  ...category,
  data: category.data.map(segment => ({
    ...segment,
    data: (typeof segment.data === 'number' && !isNaN(segment.data)) ? segment.data : 0,
  })),
}));

const legendItems = [
    { name: 'Low', color: '#4C86FF' },
    { name: 'Medium', color: '#40E5D1' },
    { name: 'High', color: '#40D3F4' },
    { name: 'Critical', color: '#9152EE' },
];
const chartColors = legendItems.map(item => item.color);


interface StackedIncidentReportWidgetProps {
  title?: string;
}

function StackedIncidentReportWidget({ title = "Incident Report" }: StackedIncidentReportWidgetProps): JSX.Element {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[350px] h-[420px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left p-7 pt-6 pb-4 font-bold text-neutral-800 dark:text-white">
        {title}
      </h3>
       <div className="flex justify-around w-full px-4 mb-4 text-xs">
        {legendItems.map(item => (
          <div key={item.name} className="flex gap-1 items-center">
            <div className="w-3 h-3" style={{ backgroundColor: item.color }} />
            <span className="text-neutral-600 dark:text-neutral-400">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex-grow px-2">
        <StackedBarChart
          height={280} // Adjusted chart height
          data={validatedMultiCategoryData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              type="category"
              tickSeries={
                <LinearXAxisTickSeries
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-45}
                      format={(text: string) => (text.length > 5 ? `${text.slice(0, 5)}...` : text)}
                      fill="#9A9AAF" // Theme-agnostic color for ticks
                    />
                  }
                  tickSize={15} // Optimized tickSize
                />
              }
            />
          }
          series={
            <StackedBarSeries
              bar={
                <Bar
                  glow={{
                    blur: 20,
                    opacity: 0.5,
                  }}
                  gradient={null}
                />
              }
              colorScheme={chartColors}
              padding={0.35}
            />
          }
          gridlines={
            <GridlineSeries
              line={<Gridline strokeColor="#7E7E8F75" />} // Theme-agnostic gridline color
            />
          }
        />
      </div>
    </div>
  );
}

export default StackedIncidentReportWidget;

code.demo.1748119575901.tsx
import React from 'react';
import StackedIncidentReportWidget from '@/components/ui/stacked-bar';

function StackedIncidentReportWidgetDemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 p-4 transition-colors duration-300">
      <StackedIncidentReportWidget />
    </div>
  );
}

export default StackedIncidentReportWidgetDemoPage;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stacked-bar.tsx
'use client';

import React from 'react';
import {
  StackedBarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  StackedBarSeries,
  Bar,
  GridlineSeries,
  Gridline,
} from 'reaviz';

// Data Definitions and Validation
interface StackSegment {
  key: string; // Series name, e.g., 'Low', 'Medium'
  data: number | null;
}

interface ChartCategoryData {
  key: string; // Category on X-axis, e.g., 'Phishing'
  data: StackSegment[];
}

const multiCategoryRaw: ChartCategoryData[] = [
  {
    key: 'Phishing',
    data: [
      { key: 'Low', data: 20 },
      { key: 'Medium', data: 30 },
      { key: 'High', data: 10 },
      { key: 'Critical', data: 5 },
    ],
  },
  {
    key: 'Malware',
    data: [
      { key: 'Low', data: 15 },
      { key: 'Medium', data: 25 },
      { key: 'High', data: 15 },
      { key: 'Critical', data: 8 },
    ],
  },
  {
    key: 'Ransomware',
    data: [
      { key: 'Low', data: 10 },
      { key: 'Medium', data: 20 },
      { key: 'High', data: 25 },
      { key: 'Critical', data: 12 },
    ],
  },
  {
    key: 'Spyware',
    data: [
      { key: 'Low', data: 25 },
      { key: 'Medium', data: 15 },
      { key: 'High', data: 8 },
      { key: 'Critical', data: 3 },
    ],
  },
];

// Validate and prepare chart data
const validatedMultiCategoryData = multiCategoryRaw.map(category => ({
  ...category,
  data: category.data.map(segment => ({
    ...segment,
    data: (typeof segment.data === 'number' && !isNaN(segment.data)) ? segment.data : 0,
  })),
}));

const legendItems = [
    { name: 'Low', color: '#4C86FF' },
    { name: 'Medium', color: '#40E5D1' },
    { name: 'High', color: '#40D3F4' },
    { name: 'Critical', color: '#9152EE' },
];
const chartColors = legendItems.map(item => item.color);


interface StackedIncidentReportWidgetProps {
  title?: string;
}

function StackedIncidentReportWidget({ title = "Incident Report" }: StackedIncidentReportWidgetProps): JSX.Element {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[350px] h-[420px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left p-7 pt-6 pb-4 font-bold text-neutral-800 dark:text-white">
        {title}
      </h3>
       <div className="flex justify-around w-full px-4 mb-4 text-xs">
        {legendItems.map(item => (
          <div key={item.name} className="flex gap-1 items-center">
            <div className="w-3 h-3" style={{ backgroundColor: item.color }} />
            <span className="text-neutral-600 dark:text-neutral-400">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex-grow px-2">
        <StackedBarChart
          height={280} // Adjusted chart height
          data={validatedMultiCategoryData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              type="category"
              tickSeries={
                <LinearXAxisTickSeries
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-45}
                      format={(text: string) => (text.length > 5 ? `${text.slice(0, 5)}...` : text)}
                      fill="#9A9AAF" // Theme-agnostic color for ticks
                    />
                  }
                  tickSize={15} // Optimized tickSize
                />
              }
            />
          }
          series={
            <StackedBarSeries
              bar={
                <Bar
                  glow={{
                    blur: 20,
                    opacity: 0.5,
                  }}
                  gradient={null}
                />
              }
              colorScheme={chartColors}
              padding={0.35}
            />
          }
          gridlines={
            <GridlineSeries
              line={<Gridline strokeColor="#7E7E8F75" />} // Theme-agnostic gridline color
            />
          }
        />
      </div>
    </div>
  );
}

export default StackedIncidentReportWidget;
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
