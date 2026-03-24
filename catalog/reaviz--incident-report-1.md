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
incident-report-1.tsx
import React from 'react';

const getColorForValue = (value: number, colorScheme: any[]) => {
  if (value >= 67) return colorScheme[2]?.fill || '#E84045';
  if (value >= 34) return colorScheme[1]?.fill || '#F8A340';
  return colorScheme[0]?.fill || '#FFD440';
};

const Heatmap = ({ height, data, yAxis, xAxis, series }: any) => {
  const seriesProps = series.props;
  const heatmapColorScheme = seriesProps?.colorScheme || [];
  const padding = seriesProps?.padding || 0;

  const xLabels = Array.from(new Set(data.map((d: any) => d.x)));
  const yLabels = Array.from(new Set(data.map((d: any) => d.y)));

  const gridData: { [key: string]: { [key: string]: number } } = {};
  data.forEach((d: any) => {
    if (!gridData[d.y]) gridData[d.y] = {};
    gridData[d.y][d.x] = d.value;
  });

  return (
    <div style={{ height: height }} className="flex flex-grow relative">
      <div className="flex-grow grid"
           style={{
             gridTemplateColumns: `repeat(${xLabels.length}, 1fr)`,
             gridTemplateRows: `repeat(${yLabels.length}, 1fr)`,
             gap: `${padding * 10}px`
           }}
      >
        {yLabels.map((yKey: string) => (
          xLabels.map((xKey: string) => {
            const value = gridData[yKey]?.[xKey] || 0;
            const color = getColorForValue(value, heatmapColorScheme);
            const isYellow = color === (heatmapColorScheme[0]?.fill || '#FFD440');
            const boxShadow = isYellow ? '0px 0px 5px #FFD44070' : 'none';
            return (
              <div
                key={`${xKey}-${yKey}`}
                className="rounded-sm"
                style={{
                  backgroundColor: color,
                  boxShadow: boxShadow
                }}
              ></div>
            );
          })
        ))}
      </div>
      <div className="absolute bottom-[-40px] left-0 right-0 flex justify-around text-white text-[8px]">
        {xLabels.map((label: string) => (
          <div key={label} className="flex-1 text-center" style={{ transform: 'rotate(-60deg)', transformOrigin: 'top center', paddingLeft: '5px' }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

const LinearYAxis = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearYAxisTickSeries = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearXAxis = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearXAxisTickSeries = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearXAxisTickLabel = ({ children, ...props }: any) => <span className="hidden">{children}</span>;
const HeatmapSeries = ({ children, colorScheme, padding, ...props }: any) => null;

const SequentialLegend = ({ className, colorScheme }: any) => {
  const gradientStyle = {
    background: `linear-gradient(to top, ${colorScheme.join(', ')})`
  };

  return (
    <div className={`flex flex-col items-center justify-between text-white text-[8px] ${className}`}>
      <span className="mb-1">100</span>
      <div className={`w-full flex-grow rounded-sm`} style={gradientStyle}></div>
      <span className="mt-1">0</span>
    </div>
  );
};

const heatmapXSmallSimpleBlocksData = [
  { x: 'Week 1', y: 'Type 1', value: 80 }, { x: 'Week 2', y: 'Type 1', value: 70 }, { x: 'Week 3', y: 'Type 1', value: 90 }, { x: 'Week 4', y: 'Type 1', value: 85 }, { x: 'Week 5', y: 'Type 1', value: 75 },
  { x: 'Week 1', y: 'Type 2', value: 20 }, { x: 'Week 2', y: 'Type 2', value: 30 }, { x: 'Week 3', y: 'Type 2', value: 40 }, { x: 'Week 4', y: 'Type 2', value: 35 }, { x: 'Week 5', y: 'Type 2', value: 25 },
  { x: 'Week 1', y: 'Type 3', value: 60 }, { x: 'Week 2', y: 'Type 3', value: 50 }, { x: 'Week 3', y: 'Type 3', value: 45 }, { x: 'Week 4', y: 'Type 3', value: 55 }, { x: 'Week 5', y: 'Type 3', value: 65 },
  { x: 'Week 1', y: 'Type 4', value: 10 }, { x: 'Week 2', y: 'Type 4', value: 15 }, { x: 'Week 3', y: 'Type 4', value: 25 }, { x: 'Week 4', y: 'Type 4', value: 20 }, { x: 'Week 5', y: 'Type 4', value: 5 },
  { x: 'Week 1', y: 'Type 5', value: 70 }, { x: 'Week 2', y: 'Type 5', value: 80 }, { x: 'Week 3', y: 'Type 5', value: 60 }, { x: 'Week 4', y: 'Type 5', value: 90 }, { x: 'Week 5', y: 'Type 5', value: 50 },
];

const schemes = {
  unifyvizwarm: [
    '#FFD440',
    '#F8A340',
    '#E84045'
  ]
};

export const IncidentReportHeatmap = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2 pb-10 relative">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={<LinearYAxis axisLine={null} tickSeries={<LinearYAxisTickSeries label={null} line={null} />} />}
          xAxis={<LinearXAxis axisLine={null} tickSeries={<LinearXAxisTickSeries line={null} label={<LinearXAxisTickLabel padding={10} rotation={-60} />} tickSize={30} />} />}
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#FFD440', filter: 'drop-shadow(0px 0px 5px #FFD44070)' },
                { fill: '#F8A340' },
                { fill: '#E84045' }
              ]}
              padding={0.25}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px]"
        />
      </div>
    </div>
  );
};

code.demo.1748018232627.tsx
import React from 'react';
import { IncidentReportHeatmap } from "@/components/ui/incident-report-1";

const DemoIncidentReportHeatmap = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-[#1B1A24]">
      <IncidentReportHeatmap />
    </div>
  );
};

export { DemoIncidentReportHeatmap };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/incident-report-1.tsx
import React from 'react';

const getColorForValue = (value: number, colorScheme: any[]) => {
  if (value >= 67) return colorScheme[2]?.fill || '#E84045';
  if (value >= 34) return colorScheme[1]?.fill || '#F8A340';
  return colorScheme[0]?.fill || '#FFD440';
};

const Heatmap = ({ height, data, yAxis, xAxis, series }: any) => {
  const seriesProps = series.props;
  const heatmapColorScheme = seriesProps?.colorScheme || [];
  const padding = seriesProps?.padding || 0;

  const xLabels = Array.from(new Set(data.map((d: any) => d.x)));
  const yLabels = Array.from(new Set(data.map((d: any) => d.y)));

  const gridData: { [key: string]: { [key: string]: number } } = {};
  data.forEach((d: any) => {
    if (!gridData[d.y]) gridData[d.y] = {};
    gridData[d.y][d.x] = d.value;
  });

  return (
    <div style={{ height: height }} className="flex flex-grow relative">
      <div className="flex-grow grid"
           style={{
             gridTemplateColumns: `repeat(${xLabels.length}, 1fr)`,
             gridTemplateRows: `repeat(${yLabels.length}, 1fr)`,
             gap: `${padding * 10}px`
           }}
      >
        {yLabels.map((yKey: string) => (
          xLabels.map((xKey: string) => {
            const value = gridData[yKey]?.[xKey] || 0;
            const color = getColorForValue(value, heatmapColorScheme);
            const isYellow = color === (heatmapColorScheme[0]?.fill || '#FFD440');
            const boxShadow = isYellow ? '0px 0px 5px #FFD44070' : 'none';
            return (
              <div
                key={`${xKey}-${yKey}`}
                className="rounded-sm"
                style={{
                  backgroundColor: color,
                  boxShadow: boxShadow
                }}
              ></div>
            );
          })
        ))}
      </div>
      <div className="absolute bottom-[-40px] left-0 right-0 flex justify-around text-white text-[8px]">
        {xLabels.map((label: string) => (
          <div key={label} className="flex-1 text-center" style={{ transform: 'rotate(-60deg)', transformOrigin: 'top center', paddingLeft: '5px' }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

const LinearYAxis = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearYAxisTickSeries = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearXAxis = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearXAxisTickSeries = ({ children, ...props }: any) => <div className="hidden">{children}</div>;
const LinearXAxisTickLabel = ({ children, ...props }: any) => <span className="hidden">{children}</span>;
const HeatmapSeries = ({ children, colorScheme, padding, ...props }: any) => null;

const SequentialLegend = ({ className, colorScheme }: any) => {
  const gradientStyle = {
    background: `linear-gradient(to top, ${colorScheme.join(', ')})`
  };

  return (
    <div className={`flex flex-col items-center justify-between text-white text-[8px] ${className}`}>
      <span className="mb-1">100</span>
      <div className={`w-full flex-grow rounded-sm`} style={gradientStyle}></div>
      <span className="mt-1">0</span>
    </div>
  );
};

const heatmapXSmallSimpleBlocksData = [
  { x: 'Week 1', y: 'Type 1', value: 80 }, { x: 'Week 2', y: 'Type 1', value: 70 }, { x: 'Week 3', y: 'Type 1', value: 90 }, { x: 'Week 4', y: 'Type 1', value: 85 }, { x: 'Week 5', y: 'Type 1', value: 75 },
  { x: 'Week 1', y: 'Type 2', value: 20 }, { x: 'Week 2', y: 'Type 2', value: 30 }, { x: 'Week 3', y: 'Type 2', value: 40 }, { x: 'Week 4', y: 'Type 2', value: 35 }, { x: 'Week 5', y: 'Type 2', value: 25 },
  { x: 'Week 1', y: 'Type 3', value: 60 }, { x: 'Week 2', y: 'Type 3', value: 50 }, { x: 'Week 3', y: 'Type 3', value: 45 }, { x: 'Week 4', y: 'Type 3', value: 55 }, { x: 'Week 5', y: 'Type 3', value: 65 },
  { x: 'Week 1', y: 'Type 4', value: 10 }, { x: 'Week 2', y: 'Type 4', value: 15 }, { x: 'Week 3', y: 'Type 4', value: 25 }, { x: 'Week 4', y: 'Type 4', value: 20 }, { x: 'Week 5', y: 'Type 4', value: 5 },
  { x: 'Week 1', y: 'Type 5', value: 70 }, { x: 'Week 2', y: 'Type 5', value: 80 }, { x: 'Week 3', y: 'Type 5', value: 60 }, { x: 'Week 4', y: 'Type 5', value: 90 }, { x: 'Week 5', y: 'Type 5', value: 50 },
];

const schemes = {
  unifyvizwarm: [
    '#FFD440',
    '#F8A340',
    '#E84045'
  ]
};

export const IncidentReportHeatmap = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2 pb-10 relative">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={<LinearYAxis axisLine={null} tickSeries={<LinearYAxisTickSeries label={null} line={null} />} />}
          xAxis={<LinearXAxis axisLine={null} tickSeries={<LinearXAxisTickSeries line={null} label={<LinearXAxisTickLabel padding={10} rotation={-60} />} tickSize={30} />} />}
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#FFD440', filter: 'drop-shadow(0px 0px 5px #FFD44070)' },
                { fill: '#F8A340' },
                { fill: '#E84045' }
              ]}
              padding={0.25}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px]"
        />
      </div>
    </div>
  );
};
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
