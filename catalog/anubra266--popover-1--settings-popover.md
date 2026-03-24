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
popover-1.tsx
"use client";

import { Popover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { Info } from "lucide-react";

export default function c() {
  return (
    <Popover.Root>
      <Popover.Trigger className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Info className="h-4 w-4" />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content className="z-50 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-lg data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out">
            <Popover.Arrow className="[--arrow-size:12px] [--arrow-background:var(--color-white)] dark:[--arrow-background:var(--color-gray-800)]">
              <Popover.ArrowTip className="border-t border-l border-gray-200 dark:border-gray-700" />
            </Popover.Arrow>
            <Popover.Title className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Quick Info
            </Popover.Title>
            <Popover.Description className="text-sm text-gray-600 dark:text-gray-400">
              This feature helps you understand how the component works. Click
              outside to close this popover.
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}


code.demo.1756241395996.tsx
"use client";

import { Popover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import {
  Settings,
  Moon,
  Bell,
  Shield,
  Globe,
  HelpCircle,
  Palette,
} from "lucide-react";
import { useState } from "react";

export default function PopoverSettingsMenu() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    twoFactor: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Popover.Root modal>
      <Popover.Trigger className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Settings className="h-5 w-5" />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content className="z-50 w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out">
            <Popover.Arrow className="[--arrow-size:12px] [--arrow-background:var(--color-white)] dark:[--arrow-background:var(--color-gray-800)]">
              <Popover.ArrowTip className="border-t border-l border-gray-200 dark:border-gray-700" />
            </Popover.Arrow>
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-3">
              <Popover.Title className="font-medium text-gray-900 dark:text-gray-100">
                Settings
              </Popover.Title>
            </div>

            {/* Settings List */}
            <div className="p-2">
              <div className="space-y-1">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Dark Mode
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSetting("darkMode")}
                    className={`relative inline-flex h-5 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.darkMode
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        settings.darkMode ? "translate-x-4" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Notifications
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSetting("notifications")}
                    className={`relative inline-flex h-5 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.notifications
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        settings.notifications
                          ? "translate-x-4"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Two-Factor Authentication Toggle */}
                <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Two-Factor Auth
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSetting("twoFactor")}
                    className={`relative inline-flex h-5 w-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      settings.twoFactor
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        settings.twoFactor ? "translate-x-4" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <hr className="my-1 border-gray-200 dark:border-gray-700" />

                {/* Other Settings */}
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Globe className="h-4 w-4" />
                  Language & Region
                </button>

                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Palette className="h-4 w-4" />
                  Appearance
                </button>

                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3">
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                Version 2.1.0
              </p>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/popover-1.tsx
"use client";

import { Popover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { Info } from "lucide-react";

export default function c() {
  return (
    <Popover.Root>
      <Popover.Trigger className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Info className="h-4 w-4" />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content className="z-50 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-lg data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out">
            <Popover.Arrow className="[--arrow-size:12px] [--arrow-background:var(--color-white)] dark:[--arrow-background:var(--color-gray-800)]">
              <Popover.ArrowTip className="border-t border-l border-gray-200 dark:border-gray-700" />
            </Popover.Arrow>
            <Popover.Title className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Quick Info
            </Popover.Title>
            <Popover.Description className="text-sm text-gray-600 dark:text-gray-400">
              This feature helps you understand how the component works. Click
              outside to close this popover.
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

```

Install NPM dependencies:
```bash
lucide-react, @ark-ui/react
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
