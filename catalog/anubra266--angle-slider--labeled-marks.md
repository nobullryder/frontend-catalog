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
angle-slider.tsx
"use client";
import { AngleSlider } from "@ark-ui/react/angle-slider";

const width = 200;
const thickness = 20;

export default function WithKnobAngleSlider() {
  return (
    <AngleSlider.Root
      defaultValue={45}
      className="relative w-[200px] h-[200px] flex items-center justify-center"
    >
      <AngleSlider.Control className="absolute inset-0">
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          className="[--gradient-start:#3b82f6] [--gradient-end:#9333ea] dark:[--gradient-start:#60a5fa] dark:[--gradient-end:#a855f7]"
          style={
            {
              "--size": `${width}px`,
              "--thickness": `${thickness}px`,
              "--percent": "calc((var(--value) / 360) * 100)",
            } as React.CSSProperties
          }
        >
          <title>Slider Ring</title>
          {/* Track circle */}
          <circle
            className="stroke-gray-300 dark:stroke-gray-600 fill-transparent"
            style={
              {
                "--radius": "calc(var(--size) / 2 - var(--thickness) / 2)",
                cx: "calc(var(--size) / 2)",
                cy: "calc(var(--size) / 2)",
                r: "var(--radius)",
                strokeWidth: "var(--thickness)",
              } as React.CSSProperties
            }
          />
          {/* Progress circle */}
          <circle
            className="fill-transparent"
            style={
              {
                "--radius": "calc(var(--size) / 2 - var(--thickness) / 2)",
                cx: "calc(var(--size) / 2)",
                cy: "calc(var(--size) / 2)",
                r: "var(--radius)",
                strokeWidth: "var(--thickness)",
                "--circumference": "calc(2 * 3.14159 * var(--radius))",
                "--offset":
                  "calc(var(--circumference) * (100 - var(--percent)) / 100)",
                strokeDashoffset:
                  "calc(var(--circumference) * ((100 - var(--percent)) / 100))",
                strokeDasharray: "var(--circumference)",
                strokeLinecap: "round",
                transformOrigin: "center",
                transform: "rotate(-90deg)",
                stroke: "url(#progressGradient)",
              } as React.CSSProperties
            }
          />
          {/* Gradient definitions */}
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--gradient-start)" />
              <stop offset="100%" stopColor="var(--gradient-end)" />
            </linearGradient>
          </defs>
        </svg>
        <AngleSlider.Thumb className="absolute top-0 right-0 bottom-0 left-[calc(50%-1.5px)] pointer-events-none h-full w-[3px] flex items-start outline-hidden">
          <span className="bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 w-5 h-5 rounded-full shrink-0 scale-125 shadow-lg shadow-blue-500/25 dark:shadow-blue-400/25 border-2 border-white dark:border-gray-800" />
        </AngleSlider.Thumb>
      </AngleSlider.Control>
      <div className="flex items-center flex-col gap-0">
        <AngleSlider.ValueText className="text-4xl text-gray-900 dark:text-gray-100 font-semibold">
          <AngleSlider.Context>
            {(context) => <>{context.value}°</>}
          </AngleSlider.Context>
        </AngleSlider.ValueText>
        <AngleSlider.Label className="text-sm text-gray-600 dark:text-gray-400">
          degrees
        </AngleSlider.Label>
      </div>
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}


code.demo.1756476749742.tsx
"use client";
import { AngleSlider } from "@ark-ui/react/angle-slider";

export default function WithLabeledMarksAngleSlider() {
  const markerPositions = [
    { value: 0, label: "0°" },
    { value: 45, label: "45°" },
    { value: 90, label: "90°" },
    { value: 135, label: "135°" },
    { value: 180, label: "180°" },
    { value: 225, label: "225°" },
    { value: 270, label: "270°" },
    { value: 315, label: "315°" },
  ];

  return (
    <AngleSlider.Root
      defaultValue={75}
      className="relative flex items-center justify-center"
    >
      <AngleSlider.Control className="[--size:200px] [--thumb-color:rgb(59_130_246)] dark:[--thumb-color:rgb(96_165_250)] [--thumb-size:40px] [--thumb-indicator-size:min(var(--thumb-size),calc(var(--size)/2))] w-(--size) h-(--size) rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center user-select:none relative">
        {/* Thumb indicator */}
        <AngleSlider.Thumb className="absolute top-0 right-0 bottom-0 left-[calc(50%-1.5px)] pointer-events-none h-full w-[3px] outline-hidden before:absolute before:right-0 before:top-0 before:h-(--thumb-indicator-size) before:bg-(--thumb-color) before:w-[3px] before:rounded-full" />

        {/* Markers with lines */}
        <AngleSlider.MarkerGroup className="absolute inset-px rounded-(--size) pointer-events-none">
          {markerPositions.map((marker, i) => (
            <AngleSlider.Marker
              key={i}
              value={marker.value}
              className="w-0.5 absolute top-0 bottom-0 left-[calc(50%-1px)] [--marker-color:rgb(156_163_175)] dark:[--marker-color:rgb(209_213_219)] before:absolute before:top-[calc(var(--thumb-size)/3)] before:left-[0.5px] before:h-[calc(var(--thumb-size)/1.5)] before:bg-(--marker-color) before:w-[2px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full"
            />
          ))}
        </AngleSlider.MarkerGroup>

        {/* Marker labels positioned outside the circle */}
        <div className="absolute inset-0 pointer-events-none">
          {markerPositions.map((marker, i) => {
            // Calculate position for each label outside the circle
            const angle = (marker.value * Math.PI) / 180;
            const radius = 114; // Distance from center for labels
            const x = Math.cos(angle - Math.PI / 2) * radius;
            const y = Math.sin(angle - Math.PI / 2) * radius;

            return (
              <div
                key={`label-${i}`}
                className="absolute text-sm font-medium text-gray-700 dark:text-gray-300 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                {marker.label}
              </div>
            );
          })}
        </div>

        {/* Center content */}
        <AngleSlider.ValueText className="text-4xl text-gray-900 dark:text-white font-bold">
          <AngleSlider.Context>
            {(context) => <>{context.value}°</>}
          </AngleSlider.Context>
        </AngleSlider.ValueText>
        <AngleSlider.Label className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          degrees
        </AngleSlider.Label>
      </AngleSlider.Control>
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/angle-slider.tsx
"use client";
import { AngleSlider } from "@ark-ui/react/angle-slider";

const width = 200;
const thickness = 20;

export default function WithKnobAngleSlider() {
  return (
    <AngleSlider.Root
      defaultValue={45}
      className="relative w-[200px] h-[200px] flex items-center justify-center"
    >
      <AngleSlider.Control className="absolute inset-0">
        <svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          className="[--gradient-start:#3b82f6] [--gradient-end:#9333ea] dark:[--gradient-start:#60a5fa] dark:[--gradient-end:#a855f7]"
          style={
            {
              "--size": `${width}px`,
              "--thickness": `${thickness}px`,
              "--percent": "calc((var(--value) / 360) * 100)",
            } as React.CSSProperties
          }
        >
          <title>Slider Ring</title>
          {/* Track circle */}
          <circle
            className="stroke-gray-300 dark:stroke-gray-600 fill-transparent"
            style={
              {
                "--radius": "calc(var(--size) / 2 - var(--thickness) / 2)",
                cx: "calc(var(--size) / 2)",
                cy: "calc(var(--size) / 2)",
                r: "var(--radius)",
                strokeWidth: "var(--thickness)",
              } as React.CSSProperties
            }
          />
          {/* Progress circle */}
          <circle
            className="fill-transparent"
            style={
              {
                "--radius": "calc(var(--size) / 2 - var(--thickness) / 2)",
                cx: "calc(var(--size) / 2)",
                cy: "calc(var(--size) / 2)",
                r: "var(--radius)",
                strokeWidth: "var(--thickness)",
                "--circumference": "calc(2 * 3.14159 * var(--radius))",
                "--offset":
                  "calc(var(--circumference) * (100 - var(--percent)) / 100)",
                strokeDashoffset:
                  "calc(var(--circumference) * ((100 - var(--percent)) / 100))",
                strokeDasharray: "var(--circumference)",
                strokeLinecap: "round",
                transformOrigin: "center",
                transform: "rotate(-90deg)",
                stroke: "url(#progressGradient)",
              } as React.CSSProperties
            }
          />
          {/* Gradient definitions */}
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--gradient-start)" />
              <stop offset="100%" stopColor="var(--gradient-end)" />
            </linearGradient>
          </defs>
        </svg>
        <AngleSlider.Thumb className="absolute top-0 right-0 bottom-0 left-[calc(50%-1.5px)] pointer-events-none h-full w-[3px] flex items-start outline-hidden">
          <span className="bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 w-5 h-5 rounded-full shrink-0 scale-125 shadow-lg shadow-blue-500/25 dark:shadow-blue-400/25 border-2 border-white dark:border-gray-800" />
        </AngleSlider.Thumb>
      </AngleSlider.Control>
      <div className="flex items-center flex-col gap-0">
        <AngleSlider.ValueText className="text-4xl text-gray-900 dark:text-gray-100 font-semibold">
          <AngleSlider.Context>
            {(context) => <>{context.value}°</>}
          </AngleSlider.Context>
        </AngleSlider.ValueText>
        <AngleSlider.Label className="text-sm text-gray-600 dark:text-gray-400">
          degrees
        </AngleSlider.Label>
      </div>
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react
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
