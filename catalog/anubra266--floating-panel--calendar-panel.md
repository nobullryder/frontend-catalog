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
floating-panel.tsx
"use client";

import { FloatingPanel } from "@ark-ui/react/floating-panel";
import { Portal } from "@ark-ui/react/portal";
import { ArrowDownLeft, Maximize2, Minus, X, GripVertical } from "lucide-react";

export default function Basic() {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Open Panel
      </FloatingPanel.Trigger>

      <Portal>
        <FloatingPanel.Positioner className="z-50">
          <FloatingPanel.Content className="flex flex-col bg-white dark:bg-gray-900 rounded-lg data-maximized:rounded-none border border-gray-200 dark:border-gray-700 w-full shadow-md min-w-80">
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header className="py-2 px-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-move">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <FloatingPanel.Title className="font-medium text-gray-900 dark:text-gray-100">
                    Floating Panel
                  </FloatingPanel.Title>
                </div>
                <FloatingPanel.Control className="flex items-center gap-1">
                  <FloatingPanel.StageTrigger
                    stage="minimized"
                    className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger
                    stage="maximized"
                    className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger
                    stage="default"
                    className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <ArrowDownLeft className="w-3 h-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.CloseTrigger className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                    <X className="w-3 h-3" />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>

            <FloatingPanel.Body className="flex flex-col gap-4 p-4">
              <p className="text-gray-600 dark:text-gray-300">
                This is a basic floating panel. You can drag it around by the
                header, resize it using the edges, and control its state using
                the buttons in the header.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try dragging, resizing, minimizing, maximizing, or closing this
                panel.
              </p>
            </FloatingPanel.Body>

            {/* Resize handles */}
            <FloatingPanel.ResizeTrigger axis="n" />
            <FloatingPanel.ResizeTrigger axis="e" />
            <FloatingPanel.ResizeTrigger axis="w" />
            <FloatingPanel.ResizeTrigger axis="s" />
            <FloatingPanel.ResizeTrigger axis="ne" />
            <FloatingPanel.ResizeTrigger axis="se" />
            <FloatingPanel.ResizeTrigger axis="sw" />
            <FloatingPanel.ResizeTrigger axis="nw" />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  );
}


code.demo.1756338679831.tsx
"use client";

import { FloatingPanel } from "@ark-ui/react/floating-panel";
import { Portal } from "@ark-ui/react/portal";
import { Calculator as CalculatorIcon, X } from "lucide-react";
import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewNumber) {
      setDisplay(num);
      setWaitingForNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewNumber(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewNumber(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const inputPercentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  // Regular number buttons that follow the same pattern
  const numberButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
  const operations = [
    { symbol: "÷", position: 3 },
    { symbol: "×", position: 7 },
    { symbol: "-", position: 11 },
    { symbol: "+", position: 15 },
  ];

  return (
    <FloatingPanel.Root defaultSize={{ width: 280, height: 380 }}>
      <FloatingPanel.Trigger className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2">
        <CalculatorIcon className="w-4 h-4" />
        Calculator
      </FloatingPanel.Trigger>

      <Portal>
        <FloatingPanel.Positioner className="z-50">
          <FloatingPanel.Content className="flex flex-col bg-gray-900 dark:bg-gray-800 rounded-lg data-maximized:rounded-none shadow-xl border border-gray-700 dark:border-gray-600 w-full data-[stage=maximized]:rounded-none">
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header className="py-2 px-4 bg-gray-800 dark:bg-gray-700 border-b border-gray-700 dark:border-gray-600 flex justify-between items-center rounded-t-lg cursor-move">
                <div className="flex items-center gap-2">
                  <CalculatorIcon className="w-5 h-5 text-indigo-400" />
                  <FloatingPanel.Title className="font-medium text-white">
                    Calculator
                  </FloatingPanel.Title>
                </div>
                <FloatingPanel.Control className="flex items-center gap-1">
                  <FloatingPanel.CloseTrigger className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                    <X className="w-3 h-3" />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>

            <FloatingPanel.Body className="p-4">
              {/* Display */}
              <div className="bg-black rounded-lg p-4 mb-3">
                <div className="text-right text-xl font-mono text-white truncate">
                  {display}
                </div>
              </div>

              {/* Button Grid */}
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 - Function buttons */}
                <button
                  onClick={clear}
                  className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-gray-600 hover:bg-gray-500 text-white"
                >
                  AC
                </button>
                <button
                  onClick={toggleSign}
                  className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-gray-600 hover:bg-gray-500 text-white"
                >
                  ±
                </button>
                <button
                  onClick={inputPercentage}
                  className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-gray-600 hover:bg-gray-500 text-white"
                >
                  %
                </button>
                <button
                  onClick={() => inputOperation("÷")}
                  className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-orange-600 hover:bg-orange-500 text-white"
                >
                  ÷
                </button>

                {/* Number buttons mapped in groups of 3 with operations */}
                {[0, 1, 2].map((rowIndex) => (
                  <>
                    {numberButtons
                      .slice(rowIndex * 3, (rowIndex + 1) * 3)
                      .map((num) => (
                        <button
                          key={num}
                          onClick={() => inputNumber(num)}
                          className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-gray-700 hover:bg-gray-600 text-white"
                        >
                          {num}
                        </button>
                      ))}
                    <button
                      onClick={() =>
                        inputOperation(operations[rowIndex + 1].symbol)
                      }
                      className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-orange-600 hover:bg-orange-500 text-white"
                    >
                      {operations[rowIndex + 1].symbol}
                    </button>
                  </>
                ))}

                {/* Bottom row - special buttons */}
                {["0", "."].map((num) => (
                  <button
                    onClick={() => inputNumber(num)}
                    className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={performCalculation}
                  className="h-10 flex items-center justify-center font-medium rounded-md text-sm transition-colors bg-orange-600 hover:bg-orange-500 text-white"
                >
                  =
                </button>
              </div>
            </FloatingPanel.Body>

            {/* Resize handles */}
            <FloatingPanel.ResizeTrigger axis="n" />
            <FloatingPanel.ResizeTrigger axis="e" />
            <FloatingPanel.ResizeTrigger axis="w" />
            <FloatingPanel.ResizeTrigger axis="s" />
            <FloatingPanel.ResizeTrigger axis="ne" />
            <FloatingPanel.ResizeTrigger axis="se" />
            <FloatingPanel.ResizeTrigger axis="sw" />
            <FloatingPanel.ResizeTrigger axis="nw" />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/floating-panel.tsx
"use client";

import { FloatingPanel } from "@ark-ui/react/floating-panel";
import { Portal } from "@ark-ui/react/portal";
import { ArrowDownLeft, Maximize2, Minus, X, GripVertical } from "lucide-react";

export default function Basic() {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Open Panel
      </FloatingPanel.Trigger>

      <Portal>
        <FloatingPanel.Positioner className="z-50">
          <FloatingPanel.Content className="flex flex-col bg-white dark:bg-gray-900 rounded-lg data-maximized:rounded-none border border-gray-200 dark:border-gray-700 w-full shadow-md min-w-80">
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header className="py-2 px-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-move">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <FloatingPanel.Title className="font-medium text-gray-900 dark:text-gray-100">
                    Floating Panel
                  </FloatingPanel.Title>
                </div>
                <FloatingPanel.Control className="flex items-center gap-1">
                  <FloatingPanel.StageTrigger
                    stage="minimized"
                    className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger
                    stage="maximized"
                    className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger
                    stage="default"
                    className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <ArrowDownLeft className="w-3 h-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.CloseTrigger className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                    <X className="w-3 h-3" />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>

            <FloatingPanel.Body className="flex flex-col gap-4 p-4">
              <p className="text-gray-600 dark:text-gray-300">
                This is a basic floating panel. You can drag it around by the
                header, resize it using the edges, and control its state using
                the buttons in the header.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try dragging, resizing, minimizing, maximizing, or closing this
                panel.
              </p>
            </FloatingPanel.Body>

            {/* Resize handles */}
            <FloatingPanel.ResizeTrigger axis="n" />
            <FloatingPanel.ResizeTrigger axis="e" />
            <FloatingPanel.ResizeTrigger axis="w" />
            <FloatingPanel.ResizeTrigger axis="s" />
            <FloatingPanel.ResizeTrigger axis="ne" />
            <FloatingPanel.ResizeTrigger axis="se" />
            <FloatingPanel.ResizeTrigger axis="sw" />
            <FloatingPanel.ResizeTrigger axis="nw" />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
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
