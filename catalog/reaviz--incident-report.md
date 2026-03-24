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
incident-report.tsx
import React from 'react';
import {
  BarChart,
  BarSeries,
  Bar,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  GridlineSeries,
  Gridline
} from 'reaviz';

const mediumCategoryData = [
  { key: 'Service A', data: 10 },
  { key: 'Service B', data: 15 },
  { key: 'Service C', data: 7 },
  { key: 'Service D', data: 20 },
  { key: 'Service E', data: 12 },
  { key: 'Service F', data: 18 },
  { key: 'Service G', data: 9 },
];

const IncidentReportCard = () => {

  const chartAvailableWidth = 200;

  const headerHeightEstimate = 90;
  const chartAvailableHeight = 354 - headerHeightEstimate; 

  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div style={{ flexGrow: 1 }}>
        <BarChart
          width={chartAvailableWidth}
          height={chartAvailableHeight}
          data={mediumCategoryData}
          yAxis={<LinearYAxis axisLine={null} tickSeries={<LinearYAxisTickSeries line={null} label={null} />} />}
          xAxis={<LinearXAxis type="category" tickSeries={<LinearXAxisTickSeries label={<LinearXAxisTickLabel padding={10} rotation={-45} format={text => `${text.slice(0, 5)}...`} />} tickSize={30} />} />}
          series={<BarSeries bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />} colorScheme={['#5B14C5', '#9152EE', '#40E5D1', '#A840E8', '#4C86FF', '#0D4ED2', '#40D3F4']} padding={0.2} />}
          gridlines={<GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />}
        />
      </div>
    </div>
  );
};

export default IncidentReportCard;

code.demo.1748014615941.tsx
import React from 'react';
import IncidentReportCard from '@/components/ui/incident-report'; 
const Demo = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ position: 'absolute', top: '20px', left: '20px' }}>Демонстрация Incident Report Card</h1>
      <IncidentReportCard />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/incident-report.tsx
import React from 'react';
import {
  BarChart,
  BarSeries,
  Bar,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  GridlineSeries,
  Gridline
} from 'reaviz';

const mediumCategoryData = [
  { key: 'Service A', data: 10 },
  { key: 'Service B', data: 15 },
  { key: 'Service C', data: 7 },
  { key: 'Service D', data: 20 },
  { key: 'Service E', data: 12 },
  { key: 'Service F', data: 18 },
  { key: 'Service G', data: 9 },
];

const IncidentReportCard = () => {

  const chartAvailableWidth = 200;

  const headerHeightEstimate = 90;
  const chartAvailableHeight = 354 - headerHeightEstimate; 

  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div style={{ flexGrow: 1 }}>
        <BarChart
          width={chartAvailableWidth}
          height={chartAvailableHeight}
          data={mediumCategoryData}
          yAxis={<LinearYAxis axisLine={null} tickSeries={<LinearYAxisTickSeries line={null} label={null} />} />}
          xAxis={<LinearXAxis type="category" tickSeries={<LinearXAxisTickSeries label={<LinearXAxisTickLabel padding={10} rotation={-45} format={text => `${text.slice(0, 5)}...`} />} tickSize={30} />} />}
          series={<BarSeries bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />} colorScheme={['#5B14C5', '#9152EE', '#40E5D1', '#A840E8', '#4C86FF', '#0D4ED2', '#40D3F4']} padding={0.2} />}
          gridlines={<GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />}
        />
      </div>
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
