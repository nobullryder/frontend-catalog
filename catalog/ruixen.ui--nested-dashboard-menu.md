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
nested-dashboard-menu.tsx
"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";

export default function NestedDashboardMenu() {
  return (
    <Menubar>
      {/* Dashboard */}
      <MenubarMenu>
        <MenubarTrigger>Dashboard</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Overview</MenubarItem>
          <MenubarItem>Statistics</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Quick Links</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Active Projects</MenubarItem>
              <MenubarItem>Pending Tasks</MenubarItem>
              <MenubarItem>Team Members</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Projects */}
      <MenubarMenu>
        <MenubarTrigger>Projects</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Projects</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Templates</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Web App Template</MenubarItem>
              <MenubarItem>Mobile App Template</MenubarItem>
              <MenubarItem>Marketing Template</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Create New Project</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Team */}
      <MenubarMenu>
        <MenubarTrigger>Team</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Members</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Roles</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Admin</MenubarItem>
              <MenubarItem>Editor</MenubarItem>
              <MenubarItem>Viewer</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Invite New Member</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Tasks */}
      <MenubarMenu>
        <MenubarTrigger>Tasks</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>My Tasks</MenubarItem>
          <MenubarItem>Assigned Tasks</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Categories</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Development</MenubarItem>
              <MenubarItem>Design</MenubarItem>
              <MenubarItem>Marketing</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Reports */}
      <MenubarMenu>
        <MenubarTrigger>Reports</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Project Reports</MenubarItem>
          <MenubarItem>Task Reports</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Analytics</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Weekly Overview</MenubarItem>
              <MenubarItem>Monthly Trends</MenubarItem>
              <MenubarItem>Team Performance</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Settings */}
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Profile Settings</MenubarItem>
          <MenubarItem>Account Settings</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Preferences</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Notifications</MenubarItem>
              <MenubarItem>Language</MenubarItem>
              <MenubarItem>Theme</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}


code.demo.1756144290964.tsx
import NestedDashboardMenu from "@/components/ui/nested-dashboard-menu";

export default function DemoOne() {
  return <NestedDashboardMenu />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/nested-dashboard-menu.tsx
"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";

export default function NestedDashboardMenu() {
  return (
    <Menubar>
      {/* Dashboard */}
      <MenubarMenu>
        <MenubarTrigger>Dashboard</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Overview</MenubarItem>
          <MenubarItem>Statistics</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Quick Links</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Active Projects</MenubarItem>
              <MenubarItem>Pending Tasks</MenubarItem>
              <MenubarItem>Team Members</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Projects */}
      <MenubarMenu>
        <MenubarTrigger>Projects</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Projects</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Templates</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Web App Template</MenubarItem>
              <MenubarItem>Mobile App Template</MenubarItem>
              <MenubarItem>Marketing Template</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Create New Project</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Team */}
      <MenubarMenu>
        <MenubarTrigger>Team</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>All Members</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Roles</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Admin</MenubarItem>
              <MenubarItem>Editor</MenubarItem>
              <MenubarItem>Viewer</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Invite New Member</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Tasks */}
      <MenubarMenu>
        <MenubarTrigger>Tasks</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>My Tasks</MenubarItem>
          <MenubarItem>Assigned Tasks</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Categories</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Development</MenubarItem>
              <MenubarItem>Design</MenubarItem>
              <MenubarItem>Marketing</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Reports */}
      <MenubarMenu>
        <MenubarTrigger>Reports</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Project Reports</MenubarItem>
          <MenubarItem>Task Reports</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Analytics</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Weekly Overview</MenubarItem>
              <MenubarItem>Monthly Trends</MenubarItem>
              <MenubarItem>Team Performance</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* Settings */}
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Profile Settings</MenubarItem>
          <MenubarItem>Account Settings</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Preferences</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Notifications</MenubarItem>
              <MenubarItem>Language</MenubarItem>
              <MenubarItem>Theme</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

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
