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
areachart-multiseries.tsx
'use client';
import React from 'react';
import {
  AreaChart,
  AreaSeries,
  Area,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  GridlineSeries,
  Gridline,
  Gradient,
  GradientStop
} from 'reaviz';

const areaMultiSeriesInterpolationSmoothData = [
  {
    key: 'Series 1',
    data: [
      { key: new Date(2023, 0, 1), data: 10 },
      { key: new Date(2023, 0, 8), data: 15 },
      { key: new Date(2023, 0, 15), data: 12 },
      { key: new Date(2023, 0, 22), data: 18 },
      { key: new Date(2023, 0, 29), data: 20 },
      { key: new Date(2023, 1, 5), data: 22 },
      { key: new Date(2023, 1, 12), data: 19 },
    ]
  },
  {
    key: 'Series 2',
    data: [
      { key: new Date(2023, 0, 1), data: 20 },
      { key: new Date(2023, 0, 8), data: 25 },
      { key: new Date(2023, 0, 15), data: 22 },
      { key: new Date(2023, 0, 22), data: 30 },
      { key: new Date(2023, 0, 29), data: 35 },
      { key: new Date(2023, 1, 5), data: 32 },
      { key: new Date(2023, 1, 12), data: 28 },
    ]
  },
  {
    key: 'Series 3',
    data: [
      { key: new Date(2023, 0, 1), data: 5 },
      { key: new Date(2023, 0, 8), data: 8 },
      { key: new Date(2023, 0, 15), data: 10 },
      { key: new Date(2023, 0, 22), data: 12 },
      { key: new Date(2023, 0, 29), data: 15 },
      { key: new Date(2023, 1, 5), data: 18 },
      { key: new Date(2023, 1, 12), data: 16 },
    ]
  }
];

// Гарантируем, что все значения - числа
areaMultiSeriesInterpolationSmoothData.forEach(series => {
  series.data.forEach(item => {
    item.data = typeof item.data === 'number' && !isNaN(item.data) ? item.data : 0;
  });
});

const IncidentReportCard = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black transition-colors duration-300 rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[300px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black dark:text-white transition-colors duration-300">
        Incident Report
      </h3>
      <AreaChart
        id="multi-series-interpolation-smooth"
        data={areaMultiSeriesInterpolationSmoothData}
        height={200}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric',
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={10}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={null}
                tickSize={20}
              />
            }
          />
        }
        series={
          <AreaSeries
            type="grouped"
            interpolation="smooth"
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />,
                    ]}
                  />
                }
              />
            }
            colorScheme={['#5B14C5', '#DAC5F9', '#B58BF3']}
          />
        }
        gridlines={
          <GridlineSeries
            line={<Gridline strokeColor="#7E7E8F75" />}
          />
        }
      />
    </div>
  );
};

export default IncidentReportCard;

code.demo.1748079943975.tsx

import React from 'react';
import IncidentReportCard from '@/components/ui/areachart-multiseries'; 
function DemoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
   
      <IncidentReportCard />
    </div>
  );
}

export default DemoPage;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/areachart-multiseries.tsx
'use client';
import React from 'react';
import {
  AreaChart,
  AreaSeries,
  Area,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  GridlineSeries,
  Gridline,
  Gradient,
  GradientStop
} from 'reaviz';

const areaMultiSeriesInterpolationSmoothData = [
  {
    key: 'Series 1',
    data: [
      { key: new Date(2023, 0, 1), data: 10 },
      { key: new Date(2023, 0, 8), data: 15 },
      { key: new Date(2023, 0, 15), data: 12 },
      { key: new Date(2023, 0, 22), data: 18 },
      { key: new Date(2023, 0, 29), data: 20 },
      { key: new Date(2023, 1, 5), data: 22 },
      { key: new Date(2023, 1, 12), data: 19 },
    ]
  },
  {
    key: 'Series 2',
    data: [
      { key: new Date(2023, 0, 1), data: 20 },
      { key: new Date(2023, 0, 8), data: 25 },
      { key: new Date(2023, 0, 15), data: 22 },
      { key: new Date(2023, 0, 22), data: 30 },
      { key: new Date(2023, 0, 29), data: 35 },
      { key: new Date(2023, 1, 5), data: 32 },
      { key: new Date(2023, 1, 12), data: 28 },
    ]
  },
  {
    key: 'Series 3',
    data: [
      { key: new Date(2023, 0, 1), data: 5 },
      { key: new Date(2023, 0, 8), data: 8 },
      { key: new Date(2023, 0, 15), data: 10 },
      { key: new Date(2023, 0, 22), data: 12 },
      { key: new Date(2023, 0, 29), data: 15 },
      { key: new Date(2023, 1, 5), data: 18 },
      { key: new Date(2023, 1, 12), data: 16 },
    ]
  }
];

// Гарантируем, что все значения - числа
areaMultiSeriesInterpolationSmoothData.forEach(series => {
  series.data.forEach(item => {
    item.data = typeof item.data === 'number' && !isNaN(item.data) ? item.data : 0;
  });
});

const IncidentReportCard = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white dark:bg-black transition-colors duration-300 rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[300px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black dark:text-white transition-colors duration-300">
        Incident Report
      </h3>
      <AreaChart
        id="multi-series-interpolation-smooth"
        data={areaMultiSeriesInterpolationSmoothData}
        height={200}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric',
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={10}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={null}
                tickSize={20}
              />
            }
          />
        }
        series={
          <AreaSeries
            type="grouped"
            interpolation="smooth"
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />,
                    ]}
                  />
                }
              />
            }
            colorScheme={['#5B14C5', '#DAC5F9', '#B58BF3']}
          />
        }
        gridlines={
          <GridlineSeries
            line={<Gridline strokeColor="#7E7E8F75" />}
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
