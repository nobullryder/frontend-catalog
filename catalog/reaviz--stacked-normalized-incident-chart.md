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
stacked-normalized-incident-chart.tsx
'use client';

import React from 'react';
import {
  StackedNormalizedAreaChart,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  StackedNormalizedAreaSeries,
  Line,
  Area,
  Gradient,
  GradientStop,
  GridlineSeries,
  Gridline,
  ChartDataTypes, // For chart data types
} from 'reaviz';

// Type definitions
interface ChartDataPoint {
  key: Date;
  data: number | null | undefined; // Allow null/undefined for initial data
}

interface ChartSeries {
  key: string;
  data: ChartDataPoint[];
}

// Data and Constants
const now = new Date();
const generateDate = (offsetDays: number): Date => {
  const date = new Date(now);
  date.setDate(now.getDate() - offsetDays);
  return date;
};

// Sample data for the stacked normalized area chart
// Order of series here will determine stacking order (first series at the bottom)
// and will map to the colorScheme accordingly.
const initialMultiDateData: ChartSeries[] = [
  {
    key: 'Category A', // Will use the first color in colorScheme
    data: Array.from({ length: 7 }, (_, i) => ({ key: generateDate(6 - i), data: Math.floor(Math.random() * 30) + 10 })),
  },
  {
    key: 'Category B', // Will use the second color
    data: Array.from({ length: 7 }, (_, i) => ({ key: generateDate(6 - i), data: Math.floor(Math.random() * 40) + 15 })),
  },
  {
    key: 'Category C', // Will use the third color
    data: Array.from({ length: 7 }, (_, i) => ({ key: generateDate(6 - i), data: Math.floor(Math.random() * 20) + 5 })),
  },
];

// Data validation utility
const validateChartData = (data: ChartSeries[]): ChartDataTypes[] => {
  return data.map(series => ({
    ...series,
    data: series.data.map(item => ({
      ...item,
      data: (typeof item.data !== 'number' || isNaN(item.data)) ? 0 : item.data,
    })),
  }));
};

const validatedChartData = validateChartData(initialMultiDateData);

const chartColorScheme = ['#FAE5F6', '#EE4094', '#BB015A']; // Light pink, Medium pink, Dark pink

const StackedNormalizedIncidentChart: React.FC = () => {
  return (
    <>
      {/* CSS Variables for Reaviz dark mode theming */}
      <style jsx global>{`
        :root {
          --reaviz-tick-fill: #9A9AAF; /* Original light mode tick fill */
          --reaviz-gridline-stroke: #7E7E8F75; /* Original light mode gridline */
        }
        .dark {
          --reaviz-tick-fill: #A0AEC0; /* Lighter gray for dark mode */
          --reaviz-gridline-stroke: rgba(74, 85, 104, 0.6); /* Darker, less opaque gridline for dark mode */
        }
      `}</style>
      <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-full max-w-sm min-h-[400px] overflow-hidden transition-colors duration-300">
        <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-gray-900 dark:text-white transition-colors duration-300">
          Incident Report
        </h3>
        <div className="reaviz-chart-container flex-grow px-2"> {/* Container for CSS vars, flex-grow for chart, padding for labels */}
          <StackedNormalizedAreaChart
            height={250} // Explicit height for the chart
            id="stacked-normalized-incident-report"
            data={validatedChartData}
            xAxis={
              <LinearXAxis
                type="time"
                tickSeries={
                  <LinearXAxisTickSeries
                    tickSize={10} // Optimized tickSize
                    label={
                      <LinearXAxisTickLabel
                        format={v => new Date(v).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                        fill="var(--reaviz-tick-fill)" // Use CSS variable
                      />
                    }
                  />
                }
              />
            }
            yAxis={
              <LinearYAxis
                axisLine={null} // Y-axis line often hidden for normalized charts
                tickSeries={
                  <LinearYAxisTickSeries
                    line={null}
                    label={null} // Y-axis labels often hidden for normalized (0-100%)
                    tickSize={10} // Optimized tickSize
                  />
                }
              />
            }
            series={
              <StackedNormalizedAreaSeries
                line={
                  <Line
                    strokeWidth={3}
                    glow={{ blur: 10 }}
                  />
                }
                area={
                  <Area // Area color will be determined by colorScheme, gradient applied on top
                    glow={{ blur: 20 }}
                    gradient={
                      <Gradient
                        stops={[
                          <GradientStop key={1} stopOpacity={0} />,
                          <GradientStop key={2} offset="80%" stopOpacity={0.2} />,
                        ]}
                      />
                    }
                  />
                }
                colorScheme={chartColorScheme}
              />
            }
            gridlines={
              <GridlineSeries
                line={<Gridline strokeColor="var(--reaviz-gridline-stroke)" />} // Use CSS variable
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default StackedNormalizedIncidentChart;

code.demo.1748117812962.tsx
import React from 'react';
import StackedNormalizedIncidentChart from '@/components/ui/stacked-normalized-incident-chart'; // Adjust path as per your actual structure

function StackedNormalizedIncidentChartDemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4 transition-colors duration-300">
      {/* 
        To enable dark mode for the demo page and component:
        1. Ensure Tailwind CSS is configured for dark mode (e.g., darkMode: 'class' in tailwind.config.js).
        2. Apply the 'dark' class to a parent element, typically <html> or <body>.
           For Next.js, this might be in your _app.tsx, layout.tsx, or a theme provider.
        Example for a global layout:
        <html lang="en" className={isDarkMode ? "dark" : ""}> // where isDarkMode is your theme state
      */}
      <StackedNormalizedIncidentChart />
    </div>
  );
}

export default StackedNormalizedIncidentChartDemoPage;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stacked-normalized-incident-chart.tsx
'use client';

import React from 'react';
import {
  StackedNormalizedAreaChart,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  StackedNormalizedAreaSeries,
  Line,
  Area,
  Gradient,
  GradientStop,
  GridlineSeries,
  Gridline,
  ChartDataTypes, // For chart data types
} from 'reaviz';

// Type definitions
interface ChartDataPoint {
  key: Date;
  data: number | null | undefined; // Allow null/undefined for initial data
}

interface ChartSeries {
  key: string;
  data: ChartDataPoint[];
}

// Data and Constants
const now = new Date();
const generateDate = (offsetDays: number): Date => {
  const date = new Date(now);
  date.setDate(now.getDate() - offsetDays);
  return date;
};

// Sample data for the stacked normalized area chart
// Order of series here will determine stacking order (first series at the bottom)
// and will map to the colorScheme accordingly.
const initialMultiDateData: ChartSeries[] = [
  {
    key: 'Category A', // Will use the first color in colorScheme
    data: Array.from({ length: 7 }, (_, i) => ({ key: generateDate(6 - i), data: Math.floor(Math.random() * 30) + 10 })),
  },
  {
    key: 'Category B', // Will use the second color
    data: Array.from({ length: 7 }, (_, i) => ({ key: generateDate(6 - i), data: Math.floor(Math.random() * 40) + 15 })),
  },
  {
    key: 'Category C', // Will use the third color
    data: Array.from({ length: 7 }, (_, i) => ({ key: generateDate(6 - i), data: Math.floor(Math.random() * 20) + 5 })),
  },
];

// Data validation utility
const validateChartData = (data: ChartSeries[]): ChartDataTypes[] => {
  return data.map(series => ({
    ...series,
    data: series.data.map(item => ({
      ...item,
      data: (typeof item.data !== 'number' || isNaN(item.data)) ? 0 : item.data,
    })),
  }));
};

const validatedChartData = validateChartData(initialMultiDateData);

const chartColorScheme = ['#FAE5F6', '#EE4094', '#BB015A']; // Light pink, Medium pink, Dark pink

const StackedNormalizedIncidentChart: React.FC = () => {
  return (
    <>
      {/* CSS Variables for Reaviz dark mode theming */}
      <style jsx global>{`
        :root {
          --reaviz-tick-fill: #9A9AAF; /* Original light mode tick fill */
          --reaviz-gridline-stroke: #7E7E8F75; /* Original light mode gridline */
        }
        .dark {
          --reaviz-tick-fill: #A0AEC0; /* Lighter gray for dark mode */
          --reaviz-gridline-stroke: rgba(74, 85, 104, 0.6); /* Darker, less opaque gridline for dark mode */
        }
      `}</style>
      <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-full max-w-sm min-h-[400px] overflow-hidden transition-colors duration-300">
        <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-gray-900 dark:text-white transition-colors duration-300">
          Incident Report
        </h3>
        <div className="reaviz-chart-container flex-grow px-2"> {/* Container for CSS vars, flex-grow for chart, padding for labels */}
          <StackedNormalizedAreaChart
            height={250} // Explicit height for the chart
            id="stacked-normalized-incident-report"
            data={validatedChartData}
            xAxis={
              <LinearXAxis
                type="time"
                tickSeries={
                  <LinearXAxisTickSeries
                    tickSize={10} // Optimized tickSize
                    label={
                      <LinearXAxisTickLabel
                        format={v => new Date(v).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                        fill="var(--reaviz-tick-fill)" // Use CSS variable
                      />
                    }
                  />
                }
              />
            }
            yAxis={
              <LinearYAxis
                axisLine={null} // Y-axis line often hidden for normalized charts
                tickSeries={
                  <LinearYAxisTickSeries
                    line={null}
                    label={null} // Y-axis labels often hidden for normalized (0-100%)
                    tickSize={10} // Optimized tickSize
                  />
                }
              />
            }
            series={
              <StackedNormalizedAreaSeries
                line={
                  <Line
                    strokeWidth={3}
                    glow={{ blur: 10 }}
                  />
                }
                area={
                  <Area // Area color will be determined by colorScheme, gradient applied on top
                    glow={{ blur: 20 }}
                    gradient={
                      <Gradient
                        stops={[
                          <GradientStop key={1} stopOpacity={0} />,
                          <GradientStop key={2} offset="80%" stopOpacity={0.2} />,
                        ]}
                      />
                    }
                  />
                }
                colorScheme={chartColorScheme}
              />
            }
            gridlines={
              <GridlineSeries
                line={<Gridline strokeColor="var(--reaviz-gridline-stroke)" />} // Use CSS variable
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default StackedNormalizedIncidentChart;
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
