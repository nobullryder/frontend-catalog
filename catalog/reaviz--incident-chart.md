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
incident-chart.tsx
'use client';

import React from 'react';
import {
  BarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  BarSeries,
  Bar,
  GridlineSeries,
  Gridline,
} from 'reaviz';


interface ChartCategoryData {
  key: string;
  data: number | null; // Allow null for raw data before validation
}

const mediumCategoryDataRaw: ChartCategoryData[] = [
  { key: 'Phishing Attempts', data: 180 },
  { key: 'Malware Detections', data: 150 },
  { key: 'Ransomware Blocks', data: 120 },
  { key: 'DDoS Mitigations', data: 90 },
  { key: 'Insider Incidents', data: 75 },
  { key: 'APT Campaigns', data: 60 },
  { key: 'Data Exfiltration', data: 45 },
];

// Validate and prepare data: ensure `data` properties are valid numbers
const validatedMediumCategoryData = mediumCategoryDataRaw.map(item => ({
  ...item,
  data: (typeof item.data === 'number' && !isNaN(item.data)) ? item.data : 0,
}));

const chartColors = ['#5B14C5', '#9152EE', '#40E5D1', '#A840E8', '#4C86FF', '#0D4ED2', '#40D3F4'];

interface IncidentReportBarChartWidgetProps {
  // Props can be added here if needed for customization, e.g., title, data
}

function IncidentReportBarChartWidget({}: IncidentReportBarChartWidgetProps): JSX.Element {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[350px] h-[386px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-neutral-800 dark:text-white">
        Incident Report
      </h3>
      <BarChart
        height={250} // Explicit height for the chart
        data={validatedMediumCategoryData}
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
                    fill="#9A9AAF" // Color for tick labels, legible on dark/light
                  />
                }
                tickSize={10} // Optimized tickSize
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                glow={{
                  blur: 20,
                  opacity: 0.5,
                }}
                gradient={null} // As per original source
              />
            }
            colorScheme={chartColors}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries
            line={<Gridline strokeColor="#7E7E8F75" />} // Specific color for gridlines
          />
        }
      />
    </div>
  );
}

export default IncidentReportBarChartWidget;

code.demo.1748118600454.tsx
import React from 'react';
import IncidentReportBarChartWidget from '@/components/ui/incident-chart';

function IncidentReportBarChartWidgetDemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 p-4 transition-colors duration-300">
      <IncidentReportBarChartWidget />
    </div>
  );
}

export default IncidentReportBarChartWidgetDemoPage;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/incident-chart.tsx
'use client';

import React from 'react';
import {
  BarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  BarSeries,
  Bar,
  GridlineSeries,
  Gridline,
} from 'reaviz';


interface ChartCategoryData {
  key: string;
  data: number | null; // Allow null for raw data before validation
}

const mediumCategoryDataRaw: ChartCategoryData[] = [
  { key: 'Phishing Attempts', data: 180 },
  { key: 'Malware Detections', data: 150 },
  { key: 'Ransomware Blocks', data: 120 },
  { key: 'DDoS Mitigations', data: 90 },
  { key: 'Insider Incidents', data: 75 },
  { key: 'APT Campaigns', data: 60 },
  { key: 'Data Exfiltration', data: 45 },
];

// Validate and prepare data: ensure `data` properties are valid numbers
const validatedMediumCategoryData = mediumCategoryDataRaw.map(item => ({
  ...item,
  data: (typeof item.data === 'number' && !isNaN(item.data)) ? item.data : 0,
}));

const chartColors = ['#5B14C5', '#9152EE', '#40E5D1', '#A840E8', '#4C86FF', '#0D4ED2', '#40D3F4'];

interface IncidentReportBarChartWidgetProps {
  // Props can be added here if needed for customization, e.g., title, data
}

function IncidentReportBarChartWidget({}: IncidentReportBarChartWidgetProps): JSX.Element {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[350px] h-[386px] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-neutral-800 dark:text-white">
        Incident Report
      </h3>
      <BarChart
        height={250} // Explicit height for the chart
        data={validatedMediumCategoryData}
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
                    fill="#9A9AAF" // Color for tick labels, legible on dark/light
                  />
                }
                tickSize={10} // Optimized tickSize
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                glow={{
                  blur: 20,
                  opacity: 0.5,
                }}
                gradient={null} // As per original source
              />
            }
            colorScheme={chartColors}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries
            line={<Gridline strokeColor="#7E7E8F75" />} // Specific color for gridlines
          />
        }
      />
    </div>
  );
}

export default IncidentReportBarChartWidget;
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
