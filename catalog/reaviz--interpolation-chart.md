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
interpolation-chart.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  FunnelChart,
  FunnelSeries,
  FunnelArc,
  TooltipArea,
  FunnelAxis,
  FunnelAxisLine,
} from 'reaviz';

// Hook to detect dark mode preference
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state directly from media query on client
    if (typeof window === 'undefined') {
      return false; // Default for SSR, actual value determined on client
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // This effect runs only on the client
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Listener for changes in color scheme preference
    const handler = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener('change', handler);
    
    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handler);
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

  return isDarkMode;
}

// TypeScript type for funnel chart data points
interface FunnelChartDataPoint {
  key: string;
  data: number | undefined; // Allow undefined initially to demonstrate validation
  // Reaviz allows optional metadata, fill, stroke, etc. per data point
  // metadata?: any; 
}

// Sample raw data for the funnel chart, including potentially invalid entries
const rawSimpleFunnelData: FunnelChartDataPoint[] = [
  { key: 'Prospects', data: 1500 },
  { key: 'Leads', data: 1200 },
  { key: 'Qualified Leads', data: 800 },
  { key: 'Proposals', data: 500 },
  { key: 'Negotiations', data: 250 },
  { key: 'Closed Won', data: 150 },
  { key: 'Invalid Entry', data: Number('abc') }, // Example of NaN data
  { key: 'Missing Data Point', data: undefined }, // Example of undefined data
];

// Data validation function: ensures 'data' property is a valid number, defaults to 0 if not.
const validateFunnelData = (inputData: FunnelChartDataPoint[]): { key: string; data: number }[] => {
  return inputData.map(point => ({
    ...point,
    data: (typeof point.data === 'number' && !isNaN(point.data)) ? point.data : 0,
  }));
};

// Prepare validated data once, outside the component scope
const validatedSimpleFunnelData = validateFunnelData(rawSimpleFunnelData);

// Props for the component (currently none, but good for future extensibility)
interface IncidentReportCardProps {}

const IncidentReportCard: React.FC<IncidentReportCardProps> = () => {
  const isDarkMode = useDarkMode();
  
  // Dynamically set axis line color based on theme for better visibility
  const axisLineColor = isDarkMode ? '#E5E7EB' : '#000000'; // Tailwind's gray-200 for dark, black for light

  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl w-[300px] h-[386px] shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left px-7 pt-6 pb-8 font-bold text-black dark:text-white transition-colors duration-300">
        Incident Report
      </h3>
      <FunnelChart
        id="interpolation" // Preserving original ID attribute
        data={validatedSimpleFunnelData}
        height={200} // Explicit chart height for better layout control
        series={
          <FunnelSeries
            arc={
              <FunnelArc
                colorScheme={'#40D3F4'} // Original color scheme
                interpolation="step" // Original interpolation
                gradient={null} // No gradient as per original
                tooltip={<TooltipArea />} // Standard tooltip for interactivity
                glow={{ // Glow effect as per original
                  blur: 15,
                  color: '#40D3F475',
                }}
              />
            }
            axis={
              <FunnelAxis
                label={null} // No axis labels as per original
                line={
                  <FunnelAxisLine 
                    strokeColor={axisLineColor} // Theme-aware stroke color
                  />
                }
              />
            }
          />
        }
      />
    </div>
  );
};

export default IncidentReportCard;

code.demo.1748120820099.tsx
import React from 'react';
import IncidentReportCard from '@/components/ui/interpolation-chart'; 
function IncidentReportCardDemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 p-4 transition-colors duration-300">
      <IncidentReportCard />
    </div>
  );
}

export default IncidentReportCardDemoPage;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/interpolation-chart.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  FunnelChart,
  FunnelSeries,
  FunnelArc,
  TooltipArea,
  FunnelAxis,
  FunnelAxisLine,
} from 'reaviz';

// Hook to detect dark mode preference
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state directly from media query on client
    if (typeof window === 'undefined') {
      return false; // Default for SSR, actual value determined on client
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // This effect runs only on the client
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Listener for changes in color scheme preference
    const handler = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener('change', handler);
    
    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handler);
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

  return isDarkMode;
}

// TypeScript type for funnel chart data points
interface FunnelChartDataPoint {
  key: string;
  data: number | undefined; // Allow undefined initially to demonstrate validation
  // Reaviz allows optional metadata, fill, stroke, etc. per data point
  // metadata?: any; 
}

// Sample raw data for the funnel chart, including potentially invalid entries
const rawSimpleFunnelData: FunnelChartDataPoint[] = [
  { key: 'Prospects', data: 1500 },
  { key: 'Leads', data: 1200 },
  { key: 'Qualified Leads', data: 800 },
  { key: 'Proposals', data: 500 },
  { key: 'Negotiations', data: 250 },
  { key: 'Closed Won', data: 150 },
  { key: 'Invalid Entry', data: Number('abc') }, // Example of NaN data
  { key: 'Missing Data Point', data: undefined }, // Example of undefined data
];

// Data validation function: ensures 'data' property is a valid number, defaults to 0 if not.
const validateFunnelData = (inputData: FunnelChartDataPoint[]): { key: string; data: number }[] => {
  return inputData.map(point => ({
    ...point,
    data: (typeof point.data === 'number' && !isNaN(point.data)) ? point.data : 0,
  }));
};

// Prepare validated data once, outside the component scope
const validatedSimpleFunnelData = validateFunnelData(rawSimpleFunnelData);

// Props for the component (currently none, but good for future extensibility)
interface IncidentReportCardProps {}

const IncidentReportCard: React.FC<IncidentReportCardProps> = () => {
  const isDarkMode = useDarkMode();
  
  // Dynamically set axis line color based on theme for better visibility
  const axisLineColor = isDarkMode ? '#E5E7EB' : '#000000'; // Tailwind's gray-200 for dark, black for light

  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black rounded-3xl w-[300px] h-[386px] shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] overflow-hidden transition-colors duration-300">
      <h3 className="text-3xl text-left px-7 pt-6 pb-8 font-bold text-black dark:text-white transition-colors duration-300">
        Incident Report
      </h3>
      <FunnelChart
        id="interpolation" // Preserving original ID attribute
        data={validatedSimpleFunnelData}
        height={200} // Explicit chart height for better layout control
        series={
          <FunnelSeries
            arc={
              <FunnelArc
                colorScheme={'#40D3F4'} // Original color scheme
                interpolation="step" // Original interpolation
                gradient={null} // No gradient as per original
                tooltip={<TooltipArea />} // Standard tooltip for interactivity
                glow={{ // Glow effect as per original
                  blur: 15,
                  color: '#40D3F475',
                }}
              />
            }
            axis={
              <FunnelAxis
                label={null} // No axis labels as per original
                line={
                  <FunnelAxisLine 
                    strokeColor={axisLineColor} // Theme-aware stroke color
                  />
                }
              />
            }
          />
        }
      />
    </div>
  );
};

export default IncidentReportCard;
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
