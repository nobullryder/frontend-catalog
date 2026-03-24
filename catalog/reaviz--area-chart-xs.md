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
area-chart-xs.tsx
import React, { useEffect, useState } from 'react';
import {
  AreaChart, AreaSeries, Area, LinearXAxis, LinearXAxisTickSeries,
  LinearXAxisTickLabel, LinearYAxis, LinearYAxisTickSeries, GridlineSeries,
  Gridline, Gradient, GradientStop,
} from 'reaviz';

export interface DataPoint {
  key: Date;
  data: number;
}

export interface ComponentProps {
  id: string;
  data: DataPoint[];
  width?: number;
  height?: number;
  colorScheme?: string;
  xAxisFormat?: (value: number | Date) => string;
  showXAxisTicks?: boolean;
  showYAxisTicks?: boolean;
  isDarkMode?: boolean;
}

const defaultXAxisFormat = (v: number | Date) => new Date(v).toLocaleDateString('en-US', {
  month: 'numeric', day: 'numeric'
});

const getCssVariable = (variableName: string, fallback: string = '#000000'): string => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
   if (value.includes(',')) return `rgb(${value})`;
  return value || fallback;
};

const getCssVariableWithOpacity = (variableName: string, opacity: number, fallback: string = 'rgba(0,0,0,0)'): string => {
   if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
   if (value.includes(',')) return `rgba(${value}, ${opacity})`;
  if (value.startsWith('#') && value.length === 7) {
    const r = parseInt(value.slice(1, 3), 16); const g = parseInt(value.slice(3, 5), 16); const b = parseInt(value.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (value.startsWith('#') && value.length === 4) {
    const r = parseInt(value.slice(1,2)+value.slice(1,2),16); const g = parseInt(value.slice(2,3)+value.slice(2,3),16); const b = parseInt(value.slice(3,4)+value.slice(3,4),16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return value || fallback;
}

export const Component: React.FC<ComponentProps> = ({
  id, data, width, height, colorScheme: propColorScheme,
  xAxisFormat = defaultXAxisFormat, showXAxisTicks = true, showYAxisTicks = false, isDarkMode
}) => {
  const [themeColors, setThemeColors] = useState({
    axisTickColor: 'rgb(var(--chart-axis-tick-color))',
    gridlineColor: 'rgba(var(--chart-gridline-color), 0.47)',
    seriesColor: 'rgb(var(--chart-series-color))',
    gradientStop2Opacity: 0.4,
    noDataColor: 'rgb(var(--foreground))'
  });

  useEffect(() => {
    setThemeColors({
      axisTickColor: getCssVariable('--chart-axis-tick-color', '#505050'),
      gridlineColor: getCssVariableWithOpacity('--chart-gridline-color', 0.47, '#D0D0D075'),
      seriesColor: getCssVariable('--chart-series-color', '#007AFF'),
      gradientStop2Opacity: parseFloat(getCssVariable('--chart-gradient-stop-2-opacity', '0.4')),
      noDataColor: getCssVariable('--foreground', '#000000')
    });
  }, [isDarkMode]);

  if (!data || data.length === 0) {
    return <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeColors.noDataColor }}>No data</div>;
  }

  const colorScheme = propColorScheme || themeColors.seriesColor;

  return (
    <AreaChart id={id} data={data} width={width} height={height}
      series={<AreaSeries area={<Area gradient={<Gradient stops={[<GradientStop key="0"stopOpacity={0}offset="0%"/>,<GradientStop key="1"offset="100%"stopOpacity={themeColors.gradientStop2Opacity}/>]}/>} />}/>}
      xAxis={<LinearXAxis type="time" tickSeries={showXAxisTicks ? <LinearXAxisTickSeries label={<LinearXAxisTickLabel format={xAxisFormat} fill={themeColors.axisTickColor}/>} tickSize={10}/> : undefined} axisLine={null}/>}
      yAxis={<LinearYAxis axisLine={null} tickSeries={showYAxisTicks ? <LinearYAxisTickSeries tickSize={10}label={{fill:themeColors.axisTickColor}}/> : <LinearYAxisTickSeries line={null}label={null}tickSize={0}/>}/>}
      gridlines={<GridlineSeries line={<Gridline strokeColor={themeColors.gridlineColor}/>}/>}
      colorScheme={[colorScheme]}
    />
  );
};

code.demo.1748004195601.tsx
// src/DemoOne.tsx

import React, { useState, useEffect } from 'react';
import { Component as AreaChartComponent, DataPoint } from '@/components/ui/area-chart-xs';
import { cn } from "@/lib/utils";

const generateDemoData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const startDate = new Date(2023, 0, 1);
  for (let i = 0; i < 15; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i * 7);
    data.push({
      key: currentDate,
      data: Math.floor(Math.random() * 100) + 20,
    });
  }
  return data;
};

const areaSingleSeriesSimpleData: DataPoint[] = generateDemoData();

const DemoOne = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); 

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={cn("flex w-full min-h-screen justify-center items-center p-8 bg-background text-foreground transition-colors duration-300")}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={cn(
            "px-4 py-2 rounded-lg shadow font-medium border border-border",
            "bg-card text-card-foreground hover:bg-muted"
          )}
        >
          Toggle Theme (Current: {isDarkMode ? 'Dark' : 'Light'})
        </button>
      </div>
      <div
        className={cn(
            "flex flex-col pt-4 pb-4 rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[450px] h-[386px] overflow-hidden",
            "bg-card"
        )}
      >
        <h3 className={cn("text-3xl text-left pl-7 pr-7 pt-6 pb-8 font-bold text-card-foreground")}>
          Incident Report
        </h3>
        <div className="flex-grow pl-2 pr-5 pb-2">
          <AreaChartComponent
            id="incidentReportChart"
            data={areaSingleSeriesSimpleData}
          />
        </div>
      </div>
    </div>
  );
};

export { DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/area-chart-xs.tsx
import React, { useEffect, useState } from 'react';
import {
  AreaChart, AreaSeries, Area, LinearXAxis, LinearXAxisTickSeries,
  LinearXAxisTickLabel, LinearYAxis, LinearYAxisTickSeries, GridlineSeries,
  Gridline, Gradient, GradientStop,
} from 'reaviz';

export interface DataPoint {
  key: Date;
  data: number;
}

export interface ComponentProps {
  id: string;
  data: DataPoint[];
  width?: number;
  height?: number;
  colorScheme?: string;
  xAxisFormat?: (value: number | Date) => string;
  showXAxisTicks?: boolean;
  showYAxisTicks?: boolean;
  isDarkMode?: boolean;
}

const defaultXAxisFormat = (v: number | Date) => new Date(v).toLocaleDateString('en-US', {
  month: 'numeric', day: 'numeric'
});

const getCssVariable = (variableName: string, fallback: string = '#000000'): string => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
   if (value.includes(',')) return `rgb(${value})`;
  return value || fallback;
};

const getCssVariableWithOpacity = (variableName: string, opacity: number, fallback: string = 'rgba(0,0,0,0)'): string => {
   if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
   if (value.includes(',')) return `rgba(${value}, ${opacity})`;
  if (value.startsWith('#') && value.length === 7) {
    const r = parseInt(value.slice(1, 3), 16); const g = parseInt(value.slice(3, 5), 16); const b = parseInt(value.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (value.startsWith('#') && value.length === 4) {
    const r = parseInt(value.slice(1,2)+value.slice(1,2),16); const g = parseInt(value.slice(2,3)+value.slice(2,3),16); const b = parseInt(value.slice(3,4)+value.slice(3,4),16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return value || fallback;
}

export const Component: React.FC<ComponentProps> = ({
  id, data, width, height, colorScheme: propColorScheme,
  xAxisFormat = defaultXAxisFormat, showXAxisTicks = true, showYAxisTicks = false, isDarkMode
}) => {
  const [themeColors, setThemeColors] = useState({
    axisTickColor: 'rgb(var(--chart-axis-tick-color))',
    gridlineColor: 'rgba(var(--chart-gridline-color), 0.47)',
    seriesColor: 'rgb(var(--chart-series-color))',
    gradientStop2Opacity: 0.4,
    noDataColor: 'rgb(var(--foreground))'
  });

  useEffect(() => {
    setThemeColors({
      axisTickColor: getCssVariable('--chart-axis-tick-color', '#505050'),
      gridlineColor: getCssVariableWithOpacity('--chart-gridline-color', 0.47, '#D0D0D075'),
      seriesColor: getCssVariable('--chart-series-color', '#007AFF'),
      gradientStop2Opacity: parseFloat(getCssVariable('--chart-gradient-stop-2-opacity', '0.4')),
      noDataColor: getCssVariable('--foreground', '#000000')
    });
  }, [isDarkMode]);

  if (!data || data.length === 0) {
    return <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeColors.noDataColor }}>No data</div>;
  }

  const colorScheme = propColorScheme || themeColors.seriesColor;

  return (
    <AreaChart id={id} data={data} width={width} height={height}
      series={<AreaSeries area={<Area gradient={<Gradient stops={[<GradientStop key="0"stopOpacity={0}offset="0%"/>,<GradientStop key="1"offset="100%"stopOpacity={themeColors.gradientStop2Opacity}/>]}/>} />}/>}
      xAxis={<LinearXAxis type="time" tickSeries={showXAxisTicks ? <LinearXAxisTickSeries label={<LinearXAxisTickLabel format={xAxisFormat} fill={themeColors.axisTickColor}/>} tickSize={10}/> : undefined} axisLine={null}/>}
      yAxis={<LinearYAxis axisLine={null} tickSeries={showYAxisTicks ? <LinearYAxisTickSeries tickSize={10}label={{fill:themeColors.axisTickColor}}/> : <LinearYAxisTickSeries line={null}label={null}tickSize={0}/>}/>}
      gridlines={<GridlineSeries line={<Gridline strokeColor={themeColors.gridlineColor}/>}/>}
      colorScheme={[colorScheme]}
    />
  );
};
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
