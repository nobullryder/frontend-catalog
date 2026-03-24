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
area-chart.tsx
"use client";
/* Area Chart — https://www.subframe.com/library/components/area-chart */

import React from "react";
import * as SubframeCore from "@subframe/core";

/* local utils */
const SubframeUtils = {
  twClassNames: SubframeCore.createTwClassNames([
    "text-caption",
    "text-caption-bold",
    "text-body",
    "text-body-bold",
    "text-heading-3",
    "text-heading-2",
    "text-heading-1",
    "text-monospace-body",
  ]),
};

type DataPoint = Record<string, string | number>;

interface AreaChartRootProps
  extends Omit<
    React.ComponentProps<typeof SubframeCore.AreaChart>,
    "data" | "categories" | "index"
  > {
  data?: DataPoint[];
  categories?: string[];
  index?: string;
  stacked?: boolean;
  className?: string;
}

/* safe defaults */
const defaultIndex = "Year";
const defaultCategories = ["Psychology", "Business", "Biology"];
const defaultData: DataPoint[] = [
  { Year: "2018", Psychology: 125, Business: 120, Biology: 90 },
  { Year: "2019", Psychology: 110, Business: 130, Biology: 85 },
  { Year: "2020", Psychology: 135, Business: 100, Biology: 95 },
  { Year: "2021", Psychology: 105, Business: 115, Biology: 120 },
  { Year: "2022", Psychology: 140, Business: 125, Biology: 130 },
];

const AreaChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.AreaChart>,
  AreaChartRootProps
>(function AreaChartRoot(
  {
    data = defaultData,
    categories = defaultCategories,
    index = defaultIndex,
    stacked = false,
    className,
    ...otherProps
  }: AreaChartRootProps,
  ref
) {
  return (
    <SubframeCore.AreaChart
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      ref={ref}
      data={data}
      categories={categories}
      index={index}
      stacked={stacked}
      colors={["#0c6d62", "#12a594", "#10b3a3", "#0b544a"]}
      dark
      {...otherProps}
    />
  );
});

export const AreaChart = AreaChartRoot;
export default AreaChart;


code.demo.1755895267117.tsx
import Component from "@/components/ui/area-chart";

export default function DemoFour() {
  return (
    <Component
      className="max-w-3xl h-56"
      dark={false}
      stacked={false}
      index="Hour"
      categories={["Active Users"]}
      data={[
        { Hour: "09:00", "Active Users": 42 },
        { Hour: "10:00", "Active Users": 58 },
        { Hour: "11:00", "Active Users": 61 },
        { Hour: "12:00", "Active Users": 45 },
        { Hour: "13:00", "Active Users": 70 },
        { Hour: "14:00", "Active Users": 76 },
        { Hour: "15:00", "Active Users": 68 },
        { Hour: "16:00", "Active Users": 80 },
      ]}
      colors={["#0b544a"]}
    />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/area-chart.tsx
"use client";
/* Area Chart — https://www.subframe.com/library/components/area-chart */

import React from "react";
import * as SubframeCore from "@subframe/core";

/* local utils */
const SubframeUtils = {
  twClassNames: SubframeCore.createTwClassNames([
    "text-caption",
    "text-caption-bold",
    "text-body",
    "text-body-bold",
    "text-heading-3",
    "text-heading-2",
    "text-heading-1",
    "text-monospace-body",
  ]),
};

type DataPoint = Record<string, string | number>;

interface AreaChartRootProps
  extends Omit<
    React.ComponentProps<typeof SubframeCore.AreaChart>,
    "data" | "categories" | "index"
  > {
  data?: DataPoint[];
  categories?: string[];
  index?: string;
  stacked?: boolean;
  className?: string;
}

/* safe defaults */
const defaultIndex = "Year";
const defaultCategories = ["Psychology", "Business", "Biology"];
const defaultData: DataPoint[] = [
  { Year: "2018", Psychology: 125, Business: 120, Biology: 90 },
  { Year: "2019", Psychology: 110, Business: 130, Biology: 85 },
  { Year: "2020", Psychology: 135, Business: 100, Biology: 95 },
  { Year: "2021", Psychology: 105, Business: 115, Biology: 120 },
  { Year: "2022", Psychology: 140, Business: 125, Biology: 130 },
];

const AreaChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.AreaChart>,
  AreaChartRootProps
>(function AreaChartRoot(
  {
    data = defaultData,
    categories = defaultCategories,
    index = defaultIndex,
    stacked = false,
    className,
    ...otherProps
  }: AreaChartRootProps,
  ref
) {
  return (
    <SubframeCore.AreaChart
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      ref={ref}
      data={data}
      categories={categories}
      index={index}
      stacked={stacked}
      colors={["#0c6d62", "#12a594", "#10b3a3", "#0b544a"]}
      dark
      {...otherProps}
    />
  );
});

export const AreaChart = AreaChartRoot;
export default AreaChart;

```

Install NPM dependencies:
```bash
@subframe/core
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
