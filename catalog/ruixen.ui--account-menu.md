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
account-menu.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Users,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Palette,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

export default function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
        >
          <User className="w-5 h-5 text-blue-600" />
          <span>Srinath G</span>
          <ChevronDown className="ml-1 w-4 h-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-xl border border-slate-200 bg-white shadow-md p-2">
        {/* Account Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <LayoutDashboard className="w-4 h-4" />
          <span className="flex-1">Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <Users className="w-4 h-4" />
          <span className="flex-1">Team Space</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <Settings className="w-4 h-4" />
          <span className="flex-1">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        {/* Preferences Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Preferences
        </DropdownMenuLabel>

        {/* Theme Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
            <Palette className="w-4 h-4" />
            <span className="flex-1">Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border border-slate-200 bg-white shadow-sm p-1">
              <DropdownMenuRadioGroup value="light">
                <DropdownMenuRadioItem value="light" className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                  <Sun className="w-4 h-4" />
                  <span className="flex-1">Light</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark" className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                  <Moon className="w-4 h-4" />
                  <span className="flex-1">Dark</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system" className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                  <Bell className="w-4 h-4" />
                  <span className="flex-1">System Default</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* Notifications Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
            <Bell className="w-4 h-4" />
            <span className="flex-1">Notifications</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border border-slate-200 bg-white shadow-sm p-1">
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">Email Alerts</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">Push Notifications</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">SMS Alerts</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="my-1" />

        {/* Actions Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2 py-2 px-2 rounded hover:bg-red-50 text-red-600">
          <LogOut className="w-4 h-4" />
          <span className="flex-1">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


code.demo.1760579773385.tsx
"use client";

import AccountMenu from "@/components/ui/account-menu";

export default function AccountMenuDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-6">
        <AccountMenu />
      </div>

      <div className="max-w-md text-center text-slate-500 text-sm">
        <p>
          This menu demonstrates a professional dropdown design with clear
          icon-text spacing, nested submenus, and hover effects. Ideal for
          dashboards, team apps, and admin panels.
        </p>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/account-menu.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Users,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Palette,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

export default function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
        >
          <User className="w-5 h-5 text-blue-600" />
          <span>Srinath G</span>
          <ChevronDown className="ml-1 w-4 h-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-xl border border-slate-200 bg-white shadow-md p-2">
        {/* Account Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <LayoutDashboard className="w-4 h-4" />
          <span className="flex-1">Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <Users className="w-4 h-4" />
          <span className="flex-1">Team Space</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
          <Settings className="w-4 h-4" />
          <span className="flex-1">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        {/* Preferences Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Preferences
        </DropdownMenuLabel>

        {/* Theme Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
            <Palette className="w-4 h-4" />
            <span className="flex-1">Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border border-slate-200 bg-white shadow-sm p-1">
              <DropdownMenuRadioGroup value="light">
                <DropdownMenuRadioItem value="light" className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                  <Sun className="w-4 h-4" />
                  <span className="flex-1">Light</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark" className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                  <Moon className="w-4 h-4" />
                  <span className="flex-1">Dark</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system" className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                  <Bell className="w-4 h-4" />
                  <span className="flex-1">System Default</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* Notifications Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 rounded-lg py-2 px-2 hover:bg-slate-50">
            <Bell className="w-4 h-4" />
            <span className="flex-1">Notifications</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-44 rounded-lg border border-slate-200 bg-white shadow-sm p-1">
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">Email Alerts</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">Push Notifications</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-100">
                <Bell className="w-4 h-4" />
                <span className="flex-1">SMS Alerts</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="my-1" />

        {/* Actions Section */}
        <DropdownMenuLabel className="text-sm text-slate-600">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2 py-2 px-2 rounded hover:bg-red-50 text-red-600">
          <LogOut className="w-4 h-4" />
          <span className="flex-1">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

```

Install NPM dependencies:
```bash
lucide-react
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
