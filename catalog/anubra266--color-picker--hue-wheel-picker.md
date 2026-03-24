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
color-picker.tsx
"use client";
import { Portal } from "@ark-ui/react/portal";
import { ColorPicker, parseColor } from "@ark-ui/react/color-picker";
import { PipetteIcon } from "lucide-react";

export default function BasicColorPicker() {
  return (
    <div className="w-full max-w-sm">
      <ColorPicker.Root defaultValue={parseColor("#000000")}>
        <div className="space-y-4">
          {/* Header with input and color swatch */}
          <div className="flex items-center gap-3">
            <ColorPicker.Control className="flex-1">
              <ColorPicker.ChannelInput
                channel="hex"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </ColorPicker.Control>
            <ColorPicker.Trigger className="w-12 h-10 rounded-md border-2 border-gray-300 dark:border-gray-600 overflow-hidden cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              <ColorPicker.TransparencyGrid className="w-full h-full [--size:8px] opacity-50" />
              <ColorPicker.ValueSwatch className="w-full h-full" />
            </ColorPicker.Trigger>
          </div>

          {/* Color Picker Content */}
          <Portal>
            <ColorPicker.Positioner>
              <ColorPicker.Content className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg space-y-4 z-50 w-80">
                {/* Color Area */}
                <ColorPicker.Area className="w-full h-36 rounded-md overflow-hidden relative">
                  <ColorPicker.AreaBackground className="w-full h-full" />
                  <ColorPicker.AreaThumb className="absolute w-3 h-3 bg-white border-2 border-black rounded-full shadow-xs -translate-x-1/2 -translate-y-1/2" />
                </ColorPicker.Area>

                {/* Eye Dropper and Sliders */}
                <div className="flex items-center gap-3">
                  <ColorPicker.EyeDropperTrigger className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <PipetteIcon className="w-4 h-4" />
                  </ColorPicker.EyeDropperTrigger>

                  <div className="flex-1 space-y-2">
                    {/* Hue Slider */}
                    <ColorPicker.ChannelSlider
                      channel="hue"
                      className="relative w-full h-3 rounded-full overflow-hidden"
                    >
                      <ColorPicker.ChannelSliderTrack className="w-full h-full bg-linear-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500" />
                      <ColorPicker.ChannelSliderThumb className="absolute top-1/2 w-3 h-3 bg-white border-2 border-black rounded-full shadow-xs -translate-y-1/2 -translate-x-1/2" />
                    </ColorPicker.ChannelSlider>

                    {/* Alpha Slider */}
                    <ColorPicker.ChannelSlider
                      channel="alpha"
                      className="relative w-full h-3 rounded-full overflow-hidden"
                    >
                      <ColorPicker.TransparencyGrid className="w-full h-full [--size:8px]" />
                      <ColorPicker.ChannelSliderTrack className="w-full h-full" />
                      <ColorPicker.ChannelSliderThumb className="absolute top-1/2 w-3 h-3 bg-white border-2 border-black rounded-full shadow-xs -translate-y-1/2 -translate-x-1/2" />
                    </ColorPicker.ChannelSlider>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="flex gap-2">
                  <ColorPicker.ChannelInput
                    channel="hex"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ColorPicker.ChannelInput
                    channel="alpha"
                    className="w-16 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </Portal>
        </div>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>
    </div>
  );
}


code.demo.1756377504083.tsx
// TODO: Add code"use client";

import { AngleSlider } from "@ark-ui/react/angle-slider";
import { parseColor } from "@ark-ui/react/color-picker";
import { useState } from "react";

export default function HueWheelColorPicker() {
  const [hue, setHue] = useState(329);

  // Convert hue angle to HSL color with better precision
  const getHueColor = (hueValue: number) => {
    return `hsl(${Math.round(hueValue)}, 100%, 50%)`;
  };

  // Get hex color for display
  const getHexColor = (hueValue: number) => {
    return parseColor(`hsl(${hueValue}, 100%, 50%)`).toString("hex");
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-6">
        {/* Color display */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={`${getHueColor(hue)} • ${getHexColor(hue)}`}
            readOnly
            className="flex-1 px-4 py-3 text-sm font-mono border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-xs"
          />
          <div
            className="w-14 h-12 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs"
            style={{ backgroundColor: getHueColor(hue) }}
          />
        </div>

        {/* Hue Wheel */}
        <div className="flex justify-center py-4">
          <AngleSlider.Root
            value={hue}
            onValueChange={(details) => setHue(details.value)}
            className="relative flex items-center justify-center"
          >
            <AngleSlider.Control
              className="w-56 h-56 rounded-full relative cursor-pointer [mask:radial-gradient(circle,transparent_52%,transparent_53%,black_53%,black_62%)]"
              style={{
                background: `conic-gradient(
                  hsl(0, 100%, 50%) 0deg,
                  hsl(30, 100%, 50%) 30deg,
                  hsl(60, 100%, 50%) 60deg,
                  hsl(90, 100%, 50%) 90deg,
                  hsl(120, 100%, 50%) 120deg,
                  hsl(150, 100%, 50%) 150deg,
                  hsl(180, 100%, 50%) 180deg,
                  hsl(210, 100%, 50%) 210deg,
                  hsl(240, 100%, 50%) 240deg,
                  hsl(270, 100%, 50%) 270deg,
                  hsl(300, 100%, 50%) 300deg,
                  hsl(330, 100%, 50%) 330deg,
                  hsl(360, 100%, 50%) 360deg
                )`,
              }}
            >
              <AngleSlider.Thumb className="absolute top-0 right-0 bottom-0 left-[calc(50%-1.5px)] pointer-events-none h-full w-[3px] flex items-start outline-hidden">
                <span className="border-2 border-white size-5 rounded-full shrink-0 shadow-gray-600 shadow-xs m-1.5" />
              </AngleSlider.Thumb>
            </AngleSlider.Control>

            <AngleSlider.HiddenInput />
          </AngleSlider.Root>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/color-picker.tsx
"use client";
import { Portal } from "@ark-ui/react/portal";
import { ColorPicker, parseColor } from "@ark-ui/react/color-picker";
import { PipetteIcon } from "lucide-react";

export default function BasicColorPicker() {
  return (
    <div className="w-full max-w-sm">
      <ColorPicker.Root defaultValue={parseColor("#000000")}>
        <div className="space-y-4">
          {/* Header with input and color swatch */}
          <div className="flex items-center gap-3">
            <ColorPicker.Control className="flex-1">
              <ColorPicker.ChannelInput
                channel="hex"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </ColorPicker.Control>
            <ColorPicker.Trigger className="w-12 h-10 rounded-md border-2 border-gray-300 dark:border-gray-600 overflow-hidden cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              <ColorPicker.TransparencyGrid className="w-full h-full [--size:8px] opacity-50" />
              <ColorPicker.ValueSwatch className="w-full h-full" />
            </ColorPicker.Trigger>
          </div>

          {/* Color Picker Content */}
          <Portal>
            <ColorPicker.Positioner>
              <ColorPicker.Content className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg space-y-4 z-50 w-80">
                {/* Color Area */}
                <ColorPicker.Area className="w-full h-36 rounded-md overflow-hidden relative">
                  <ColorPicker.AreaBackground className="w-full h-full" />
                  <ColorPicker.AreaThumb className="absolute w-3 h-3 bg-white border-2 border-black rounded-full shadow-xs -translate-x-1/2 -translate-y-1/2" />
                </ColorPicker.Area>

                {/* Eye Dropper and Sliders */}
                <div className="flex items-center gap-3">
                  <ColorPicker.EyeDropperTrigger className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <PipetteIcon className="w-4 h-4" />
                  </ColorPicker.EyeDropperTrigger>

                  <div className="flex-1 space-y-2">
                    {/* Hue Slider */}
                    <ColorPicker.ChannelSlider
                      channel="hue"
                      className="relative w-full h-3 rounded-full overflow-hidden"
                    >
                      <ColorPicker.ChannelSliderTrack className="w-full h-full bg-linear-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500" />
                      <ColorPicker.ChannelSliderThumb className="absolute top-1/2 w-3 h-3 bg-white border-2 border-black rounded-full shadow-xs -translate-y-1/2 -translate-x-1/2" />
                    </ColorPicker.ChannelSlider>

                    {/* Alpha Slider */}
                    <ColorPicker.ChannelSlider
                      channel="alpha"
                      className="relative w-full h-3 rounded-full overflow-hidden"
                    >
                      <ColorPicker.TransparencyGrid className="w-full h-full [--size:8px]" />
                      <ColorPicker.ChannelSliderTrack className="w-full h-full" />
                      <ColorPicker.ChannelSliderThumb className="absolute top-1/2 w-3 h-3 bg-white border-2 border-black rounded-full shadow-xs -translate-y-1/2 -translate-x-1/2" />
                    </ColorPicker.ChannelSlider>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="flex gap-2">
                  <ColorPicker.ChannelInput
                    channel="hex"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ColorPicker.ChannelInput
                    channel="alpha"
                    className="w-16 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </Portal>
        </div>
        <ColorPicker.HiddenInput />
      </ColorPicker.Root>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react, lucide-react
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
