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
context-menu-with-submenu.tsx
"use client";

import * as ContextMenu from "@radix-ui/react-context-menu";

const submenuItem = {
  name: "Plugins",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  ),
  submenu: [
    { name: "Unsplash", command: "" },
    { name: "Inbox Cleaner", command: "" },
    { name: "Auto layout", command: "" },
  ],
};

const menuItems = {
  group_1: [
    { name: "Share", command: "" },
    { name: "Move to", command: "Ctrl+M" },
  ],
  group_2: [{ name: "Copy link", command: "Ctrl+C" }],
  group_3: [
    { name: "Rename", command: "" },
    { name: "Duplicate", command: "" },
  ],
  group_4: [
    { name: "Delete", command: "Ctrl+D" },
    { name: "Archieve", command: "" },
    { name: "Import files", command: "" },
  ],
};

export default function ContextMenuDemo() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="max-w-sm h-32 mx-auto mt-12 rounded-lg border border-dashed bg-gray-50 text-sm flex items-center justify-center select-none text-gray-600">
        Right click here.
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          className="w-60 rounded-lg bg-white shadow-md border text-[13px] text-gray-800"
          sideOffset={5}
          align="end"
        >
          {/* Submenu */}
          <div className="pt-1.5 px-2">
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:data-[state=open]:text-white data-[highlighted]:data-[state=open]:bg-blue-600 data-[state=open]:bg-blue-50 rounded-lg duration-150 outline-none select-none">
                {submenuItem.name}
                <div className="text-gray-600 group-data-[highlighted]:text-white">
                  {submenuItem.icon}
                </div>
              </ContextMenu.SubTrigger>

              <ContextMenu.Portal>
                <ContextMenu.SubContent
                  className="w-60 rounded-lg bg-white shadow-md border text-[13px] text-gray-800"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <div className="py-1.5 px-2">
                    {submenuItem.submenu.map((item, idx) => (
                      <ContextMenu.Item
                        key={idx}
                        className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none"
                      >
                        {item.name}
                      </ContextMenu.Item>
                    ))}
                  </div>
                  <ContextMenu.Separator className="h-px bg-gray-200" />
                  <div className="py-1.5 px-2">
                    <ContextMenu.Item className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none">
                      Find more plugins{" "}
                      <span className="text-gray-500 group-data-[highlighted]:text-white">
                        Ctrl+P
                      </span>
                    </ContextMenu.Item>
                  </div>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
          </div>

          {/* Group 1 */}
          <div className="pb-1.5 px-2">
            {menuItems.group_1.map((item, idx) => (
              <ContextMenu.Item
                key={idx}
                className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none"
              >
                {item.name}
                <span className="text-gray-500 group-data-[highlighted]:text-white">
                  {item.command}
                </span>
              </ContextMenu.Item>
            ))}
          </div>

          {/* Other groups */}
          {[menuItems.group_2, menuItems.group_3, menuItems.group_4].map(
            (group, idx) => (
              <div key={idx}>
                <ContextMenu.Separator className="h-px bg-gray-200" />
                <div className="py-1.5 px-2">
                  {group.map((item, i) => (
                    <ContextMenu.Item
                      key={i}
                      className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none"
                    >
                      {item.name}
                      <span className="text-gray-500 group-data-[highlighted]:text-white">
                        {item.command}
                      </span>
                    </ContextMenu.Item>
                  ))}
                </div>
              </div>
            )
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}


code.demo.1755328326522.tsx
import ContextMenuDemo  from "@/components/ui/context-menu-with-submenu";

export default function DemoOne() {
  return <ContextMenuDemo />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/context-menu-with-submenu.tsx
"use client";

import * as ContextMenu from "@radix-ui/react-context-menu";

const submenuItem = {
  name: "Plugins",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  ),
  submenu: [
    { name: "Unsplash", command: "" },
    { name: "Inbox Cleaner", command: "" },
    { name: "Auto layout", command: "" },
  ],
};

const menuItems = {
  group_1: [
    { name: "Share", command: "" },
    { name: "Move to", command: "Ctrl+M" },
  ],
  group_2: [{ name: "Copy link", command: "Ctrl+C" }],
  group_3: [
    { name: "Rename", command: "" },
    { name: "Duplicate", command: "" },
  ],
  group_4: [
    { name: "Delete", command: "Ctrl+D" },
    { name: "Archieve", command: "" },
    { name: "Import files", command: "" },
  ],
};

export default function ContextMenuDemo() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="max-w-sm h-32 mx-auto mt-12 rounded-lg border border-dashed bg-gray-50 text-sm flex items-center justify-center select-none text-gray-600">
        Right click here.
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content
          className="w-60 rounded-lg bg-white shadow-md border text-[13px] text-gray-800"
          sideOffset={5}
          align="end"
        >
          {/* Submenu */}
          <div className="pt-1.5 px-2">
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:data-[state=open]:text-white data-[highlighted]:data-[state=open]:bg-blue-600 data-[state=open]:bg-blue-50 rounded-lg duration-150 outline-none select-none">
                {submenuItem.name}
                <div className="text-gray-600 group-data-[highlighted]:text-white">
                  {submenuItem.icon}
                </div>
              </ContextMenu.SubTrigger>

              <ContextMenu.Portal>
                <ContextMenu.SubContent
                  className="w-60 rounded-lg bg-white shadow-md border text-[13px] text-gray-800"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <div className="py-1.5 px-2">
                    {submenuItem.submenu.map((item, idx) => (
                      <ContextMenu.Item
                        key={idx}
                        className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none"
                      >
                        {item.name}
                      </ContextMenu.Item>
                    ))}
                  </div>
                  <ContextMenu.Separator className="h-px bg-gray-200" />
                  <div className="py-1.5 px-2">
                    <ContextMenu.Item className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none">
                      Find more plugins{" "}
                      <span className="text-gray-500 group-data-[highlighted]:text-white">
                        Ctrl+P
                      </span>
                    </ContextMenu.Item>
                  </div>
                </ContextMenu.SubContent>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
          </div>

          {/* Group 1 */}
          <div className="pb-1.5 px-2">
            {menuItems.group_1.map((item, idx) => (
              <ContextMenu.Item
                key={idx}
                className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none"
              >
                {item.name}
                <span className="text-gray-500 group-data-[highlighted]:text-white">
                  {item.command}
                </span>
              </ContextMenu.Item>
            ))}
          </div>

          {/* Other groups */}
          {[menuItems.group_2, menuItems.group_3, menuItems.group_4].map(
            (group, idx) => (
              <div key={idx}>
                <ContextMenu.Separator className="h-px bg-gray-200" />
                <div className="py-1.5 px-2">
                  {group.map((item, i) => (
                    <ContextMenu.Item
                      key={i}
                      className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none"
                    >
                      {item.name}
                      <span className="text-gray-500 group-data-[highlighted]:text-white">
                        {item.command}
                      </span>
                    </ContextMenu.Item>
                  ))}
                </div>
              </div>
            )
          )}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

```

Install NPM dependencies:
```bash
@radix-ui/react-context-menu
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
