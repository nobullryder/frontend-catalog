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
project-selector.tsx
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, FolderIcon, LayoutDashboard, Code2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


export type Project = {
  id: string;
  name: string;
  icon: React.ElementType;
};


export const projects: Project[] = [
  { id: 'proj1', name: 'Frontend Redesign', icon: LayoutDashboard },
  { id: 'proj2', name: 'API Integration', icon: Code2 },
  { id: 'proj3', name: 'Marketing Website', icon: FolderIcon },
];

interface ProjectSelectorProps {
  projectList: Project[];
  project: Project | undefined;
  onChange: (project: Project | undefined) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projectList, project, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const SelectedIcon = project ? project.icon : FolderIcon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between text-muted-foreground"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <SelectedIcon className="size-5 shrink-0" />
            <span className="truncate font-medium text-foreground">
              {project ? project.name : 'Select project...'}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projectList.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      onChange(item.id === project?.id ? undefined : item);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 size-4',
                        project?.id === item.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <ItemIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span>{item.name}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSelector;

code.demo.1749409464568.tsx
'use client';

import { useState } from 'react';
import { FolderIcon } from 'lucide-react';
import ProjectSelector, { projects } from '@/components/ui/project-selector';
import type { Project } from '@/components/ui/project-selector';

const ProjectSelectorDemo = () => {
   const [project, setProject] = useState<Project | undefined>(projects[0]);

   const SelectedIcon = project ? project.icon : FolderIcon;

   return (
      <div className="flex w-full flex-col items-center justify-center gap-10 p-4">
         <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-lg font-semibold">Project Selector</h2>
            <p className="text-sm text-muted-foreground">Select a project from the dropdown.</p>
         </div>

         <ProjectSelector project={project} onChange={setProject} projectList={projects} />

         <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-lg border bg-background p-6 shadow-sm">
            <h3 className="text-base font-medium text-muted-foreground">Current Project</h3>
            <div className="flex items-center gap-3 text-lg font-semibold">
               <SelectedIcon className="size-6 text-foreground" />
               <span>{project ? project.name : 'No Project'}</span>
            </div>
         </div>
      </div>
   );
};

export { ProjectSelectorDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/project-selector.tsx
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, FolderIcon, LayoutDashboard, Code2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


export type Project = {
  id: string;
  name: string;
  icon: React.ElementType;
};


export const projects: Project[] = [
  { id: 'proj1', name: 'Frontend Redesign', icon: LayoutDashboard },
  { id: 'proj2', name: 'API Integration', icon: Code2 },
  { id: 'proj3', name: 'Marketing Website', icon: FolderIcon },
];

interface ProjectSelectorProps {
  projectList: Project[];
  project: Project | undefined;
  onChange: (project: Project | undefined) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projectList, project, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const SelectedIcon = project ? project.icon : FolderIcon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between text-muted-foreground"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <SelectedIcon className="size-5 shrink-0" />
            <span className="truncate font-medium text-foreground">
              {project ? project.name : 'Select project...'}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projectList.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      onChange(item.id === project?.id ? undefined : item);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 size-4',
                        project?.id === item.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <ItemIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span>{item.name}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSelector;
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
