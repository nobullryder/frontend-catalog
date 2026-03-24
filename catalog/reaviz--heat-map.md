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
heat-map.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  Heatmap,
  HeatmapSeries,
  HeatmapCell,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  SequentialLegend,
} from 'reaviz';

// Hook to detect dark mode preference
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false; 
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDarkMode;
}

// TypeScript types for heatmap data
interface HeatmapCellData {
  key: string; // X-axis identifier (e.g., time)
  data: number | undefined | null; // Cell value, allow undefined/null for validation
}

interface HeatmapRowData {
  key: string; // Y-axis identifier (e.g., day)
  data: HeatmapCellData[];
}

type HeatmapChartDataInput = HeatmapRowData[];

interface ValidatedHeatmapCellData {
  key: string;
  data: number; // Ensure data is a number after validation
}
interface ValidatedHeatmapRowData {
  key: string;
  data: ValidatedHeatmapCellData[];
}
type ValidatedHeatmapChartData = ValidatedHeatmapRowData[];


// Sample raw data for the heatmap, including potentially invalid entries
const rawHeatmapData: HeatmapChartDataInput = [
  { key: 'Mon', data: [
      { key: '0h', data: 10 }, { key: '4h', data: 15 }, { key: '8h', data: 20 },
      { key: '12h', data: 25 }, { key: '16h', data: 30 }, { key: '20h', data: 12 }
  ]},
  { key: 'Tue', data: [
      { key: '0h', data: 5 }, { key: '4h', data: Number('abc') }, { key: '8h', data: 18 }, // NaN data
      { key: '12h', data: 22 }, { key: '16h', data: 28 }, { key: '20h', data: 10 }
  ]},
  { key: 'Wed', data: [
      { key: '0h', data: 12 }, { key: '4h', data: 17 }, { key: '8h', data: undefined }, // undefined data
      { key: '12h', data: 27 }, { key: '16h', data: 32 }, { key: '20h', data: 14 }
  ]},
  { key: 'Thu', data: [
      { key: '0h', data: 8 }, { key: '4h', data: 13 }, { key: '8h', data: 22 },
      { key: '12h', data: 30 }, { key: '16h', data: 25 }, { key: '20h', data: 18 }
  ]},
  { key: 'Fri', data: [
      { key: '0h', data: 20 }, { key: '4h', data: 25 }, { key: '8h', data: 10 },
      { key: '12h', data: 15 }, { key: '16h', data: 5 }, { key: '20h', data: 22 }
  ]}
];

// Data validation function
const validateHeatmapData = (inputData: HeatmapChartDataInput): ValidatedHeatmapChartData => {
  return inputData.map(series => ({
    ...series,
    data: series.data.map(item => ({
      ...item,
      data: (typeof item.data === 'number' && !isNaN(item.data)) ? item.data : 0,
    })),
  }));
};

// Validated data to be used by the chart
const heatmapXSmallSimpleBlocksData: ValidatedHeatmapChartData = validateHeatmapData(rawHeatmapData);

// Color scheme for HeatmapSeries and SequentialLegend
// The first color will have the glow effect as per original snippet
const heatmapVisualizationColorScheme: string[] = ['#FFD440', '#F8A340', '#E84045'];
const heatmapGlowFilter = 'drop-shadow(0px 0px 5px #FFD44070)';

// Props for the component (currently none, but good for future extensibility)
interface IncidentHeatmapReportCardProps {}

const IncidentHeatmapReportCard: React.FC<IncidentHeatmapReportCardProps> = () => {
  const isDarkMode = useDarkMode();

  const xAxisTickLabelFill = isDarkMode ? '#E5E7EB' : '#374151'; // Tailwind gray-200 / gray-700

  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[350px] h-[450px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left px-7 pt-6 pb-8 font-bold text-black dark:text-white transition-colors duration-300">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={280} // Increased height for better visualization
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      style={{ fill: xAxisTickLabelFill }} // Dynamic fill for dark mode
                    />
                  }
                  tickSize={10} // Optimized tickSize
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={heatmapVisualizationColorScheme}
              padding={0.25}
              cell={ // Custom cell rendering to apply filter
                <HeatmapCell
                  style={(node) => {
                    // node.color is determined by HeatmapSeries based on its colorScheme and node.value
                    const style: React.CSSProperties & { filter?: string } = { fill: node.color };
                    if (node.color === heatmapVisualizationColorScheme[0]) {
                      style.filter = heatmapGlowFilter;
                    }
                    return style;
                  }}
                />
              }
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData} // Data for range calculation
          colorScheme={heatmapVisualizationColorScheme} // Consistent color scheme
          gradientClassName="!w-[20px]" // Original styling
          className="pl-1 pr-1 mt-6 !h-[135px] text-black dark:text-white transition-colors duration-300" // Original styling + dark mode text
        />
      </div>
    </div>
  );
};

export default IncidentHeatmapReportCard;

code.demo.1748121157745.tsx
import React from 'react';
import IncidentHeatmapReportCard from '@/components/ui/heat-map'; // Adjust path based on your project structure

// Demo page component to showcase the IncidentHeatmapReportCard
function IncidentHeatmapReportCardDemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <IncidentHeatmapReportCard />
    </div>
  );
}

export default IncidentHeatmapReportCardDemoPage;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/heat-map.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  Heatmap,
  HeatmapSeries,
  HeatmapCell,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  SequentialLegend,
} from 'reaviz';

// Hook to detect dark mode preference
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false; 
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDarkMode;
}

// TypeScript types for heatmap data
interface HeatmapCellData {
  key: string; // X-axis identifier (e.g., time)
  data: number | undefined | null; // Cell value, allow undefined/null for validation
}

interface HeatmapRowData {
  key: string; // Y-axis identifier (e.g., day)
  data: HeatmapCellData[];
}

type HeatmapChartDataInput = HeatmapRowData[];

interface ValidatedHeatmapCellData {
  key: string;
  data: number; // Ensure data is a number after validation
}
interface ValidatedHeatmapRowData {
  key: string;
  data: ValidatedHeatmapCellData[];
}
type ValidatedHeatmapChartData = ValidatedHeatmapRowData[];


// Sample raw data for the heatmap, including potentially invalid entries
const rawHeatmapData: HeatmapChartDataInput = [
  { key: 'Mon', data: [
      { key: '0h', data: 10 }, { key: '4h', data: 15 }, { key: '8h', data: 20 },
      { key: '12h', data: 25 }, { key: '16h', data: 30 }, { key: '20h', data: 12 }
  ]},
  { key: 'Tue', data: [
      { key: '0h', data: 5 }, { key: '4h', data: Number('abc') }, { key: '8h', data: 18 }, // NaN data
      { key: '12h', data: 22 }, { key: '16h', data: 28 }, { key: '20h', data: 10 }
  ]},
  { key: 'Wed', data: [
      { key: '0h', data: 12 }, { key: '4h', data: 17 }, { key: '8h', data: undefined }, // undefined data
      { key: '12h', data: 27 }, { key: '16h', data: 32 }, { key: '20h', data: 14 }
  ]},
  { key: 'Thu', data: [
      { key: '0h', data: 8 }, { key: '4h', data: 13 }, { key: '8h', data: 22 },
      { key: '12h', data: 30 }, { key: '16h', data: 25 }, { key: '20h', data: 18 }
  ]},
  { key: 'Fri', data: [
      { key: '0h', data: 20 }, { key: '4h', data: 25 }, { key: '8h', data: 10 },
      { key: '12h', data: 15 }, { key: '16h', data: 5 }, { key: '20h', data: 22 }
  ]}
];

// Data validation function
const validateHeatmapData = (inputData: HeatmapChartDataInput): ValidatedHeatmapChartData => {
  return inputData.map(series => ({
    ...series,
    data: series.data.map(item => ({
      ...item,
      data: (typeof item.data === 'number' && !isNaN(item.data)) ? item.data : 0,
    })),
  }));
};

// Validated data to be used by the chart
const heatmapXSmallSimpleBlocksData: ValidatedHeatmapChartData = validateHeatmapData(rawHeatmapData);

// Color scheme for HeatmapSeries and SequentialLegend
// The first color will have the glow effect as per original snippet
const heatmapVisualizationColorScheme: string[] = ['#FFD440', '#F8A340', '#E84045'];
const heatmapGlowFilter = 'drop-shadow(0px 0px 5px #FFD44070)';

// Props for the component (currently none, but good for future extensibility)
interface IncidentHeatmapReportCardProps {}

const IncidentHeatmapReportCard: React.FC<IncidentHeatmapReportCardProps> = () => {
  const isDarkMode = useDarkMode();

  const xAxisTickLabelFill = isDarkMode ? '#E5E7EB' : '#374151'; // Tailwind gray-200 / gray-700

  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[350px] h-[450px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left px-7 pt-6 pb-8 font-bold text-black dark:text-white transition-colors duration-300">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={280} // Increased height for better visualization
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      style={{ fill: xAxisTickLabelFill }} // Dynamic fill for dark mode
                    />
                  }
                  tickSize={10} // Optimized tickSize
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={heatmapVisualizationColorScheme}
              padding={0.25}
              cell={ // Custom cell rendering to apply filter
                <HeatmapCell
                  style={(node) => {
                    // node.color is determined by HeatmapSeries based on its colorScheme and node.value
                    const style: React.CSSProperties & { filter?: string } = { fill: node.color };
                    if (node.color === heatmapVisualizationColorScheme[0]) {
                      style.filter = heatmapGlowFilter;
                    }
                    return style;
                  }}
                />
              }
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData} // Data for range calculation
          colorScheme={heatmapVisualizationColorScheme} // Consistent color scheme
          gradientClassName="!w-[20px]" // Original styling
          className="pl-1 pr-1 mt-6 !h-[135px] text-black dark:text-white transition-colors duration-300" // Original styling + dark mode text
        />
      </div>
    </div>
  );
};

export default IncidentHeatmapReportCard;
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
