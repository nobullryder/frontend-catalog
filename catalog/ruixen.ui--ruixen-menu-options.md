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
ruixen-menu-options.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function RuixenMenuOptions() {
  return (
    <div className="flex justify-center items-center h-screen">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="flex items-center gap-2">
            ⚙️ Actions Panel
            <ChevronDown className="opacity-60" size={16} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 rounded-xl shadow-lg">
          {/* Quick Edits */}
          <DropdownMenuGroup>
            <DropdownMenuItem title="Make changes to the current item">
              ✏️ Rename
              <DropdownMenuShortcut>⌘ R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem title="Create a copy">
              🧬 Clone
              <DropdownMenuShortcut>⌘ C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Organize */}
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>🗂 Move</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>📁 To Folder</DropdownMenuItem>
                <DropdownMenuItem>📌 To Project</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem title="Add to your favorites list">
              ⭐ Pin Item
            </DropdownMenuItem>
            <DropdownMenuItem title="Collaborate with others">
              🤝 Share
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Settings */}
          <DropdownMenuGroup>
            <DropdownMenuItem>🔧 Settings</DropdownMenuItem>
            <DropdownMenuItem>📜 View Logs</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Destructive */}
          <DropdownMenuItem
            className="text-red-600 focus:text-red-700"
            title="Permanently remove this item"
          >
            🗑 Delete Forever
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


code.demo.1753438385987.tsx
import RuixenMenuOptions from "@/components/ui/ruixen-menu-options";

export default function DemoOne() {
  return <RuixenMenuOptions />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/ruixen-menu-options.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function RuixenMenuOptions() {
  return (
    <div className="flex justify-center items-center h-screen">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="flex items-center gap-2">
            ⚙️ Actions Panel
            <ChevronDown className="opacity-60" size={16} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 rounded-xl shadow-lg">
          {/* Quick Edits */}
          <DropdownMenuGroup>
            <DropdownMenuItem title="Make changes to the current item">
              ✏️ Rename
              <DropdownMenuShortcut>⌘ R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem title="Create a copy">
              🧬 Clone
              <DropdownMenuShortcut>⌘ C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Organize */}
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>🗂 Move</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>📁 To Folder</DropdownMenuItem>
                <DropdownMenuItem>📌 To Project</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem title="Add to your favorites list">
              ⭐ Pin Item
            </DropdownMenuItem>
            <DropdownMenuItem title="Collaborate with others">
              🤝 Share
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Settings */}
          <DropdownMenuGroup>
            <DropdownMenuItem>🔧 Settings</DropdownMenuItem>
            <DropdownMenuItem>📜 View Logs</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Destructive */}
          <DropdownMenuItem
            className="text-red-600 focus:text-red-700"
            title="Permanently remove this item"
          >
            🗑 Delete Forever
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
