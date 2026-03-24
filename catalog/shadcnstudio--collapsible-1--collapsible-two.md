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
collapsible-1.tsx
import { ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const CollapsibleDemo = () => {
  return (
    <Collapsible className='flex w-full max-w-[350px] flex-col gap-2'>
      <div className='flex items-center justify-between gap-4 px-4'>
        <div className='text-sm font-semibold'>@peduarte starred 3 repositories</div>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <ChevronsUpDownIcon />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='rounded-md border px-4 py-2 font-mono text-sm'>@radix-ui/primitives</div>
      <CollapsibleContent className='flex flex-col gap-2'>
        <div className='rounded-md border px-4 py-2 font-mono text-sm'>@radix-ui/colors</div>
        <div className='rounded-md border px-4 py-2 font-mono text-sm'>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleDemo


code.demo.1760514342988.tsx
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type FileTreeItem = {
  name: string
} & (
  | {
      type: 'file'
      children?: never
    }
  | {
      type: 'folder'
      children: FileTreeItem[]
    }
)

const fileTree: FileTreeItem[] = [
  {
    name: 'components',
    type: 'folder',
    children: [
      {
        name: 'ui',
        type: 'folder',
        children: [
          { name: 'button.tsx', type: 'file' },
          { name: 'input.tsx', type: 'file' },
          { name: 'sidebar.tsx', type: 'file' }
        ]
      },
      { name: 'app-sidebar.tsx', type: 'file' }
    ]
  },
  {
    name: 'hooks',
    type: 'folder',
    children: [{ name: 'use-mobile.ts', type: 'file' }]
  },
  {
    name: 'lib',
    type: 'folder',
    children: [{ name: 'utils.ts', type: 'file' }]
  },
  {
    name: 'components.json',
    type: 'file'
  }
]

const FileTree = ({ item, level }: { level: number; item: FileTreeItem }) => {
  if (item.type === 'file') {
    return (
      <div
        className='focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]'
        style={{ paddingLeft: `${level === 0 ? 1.75 : 3.25}rem` }}
      >
        <FileIcon className='size-3 shrink-0' />
        <span className='text-muted-foreground text-sm'>{item.name}</span>
      </div>
    )
  }

  return (
    <Collapsible
      className='flex flex-col gap-1.5'
      style={{ paddingLeft: `${level === 0 ? 0 : 1.5}rem` }}
    >
      <CollapsibleTrigger className='focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]'>
        <ChevronRightIcon className='size-3 shrink-0 transition-transform [[data-state="open"]>&]:rotate-90' />
        <FolderIcon className='size-3 shrink-0 [[data-state=open]>&]:hidden' />
        <FolderOpenIcon className='size-3 shrink-0 [[data-state=closed]>&]:hidden' />
        <span className='text-sm'>{item.name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className='flex flex-col gap-1.5'>
        {item.children.map(item => (
          <FileTree key={item.name} item={item} level={level + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

const CollapsibleTreeDemo = () => {
  return (
    <div className='flex w-full max-w-48 flex-col gap-2'>
      {fileTree.map(item => (
        <FileTree key={item.name} item={item} level={0} />
      ))}
    </div>
  )
}

export default CollapsibleTreeDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/collapsible-1.tsx
import { ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const CollapsibleDemo = () => {
  return (
    <Collapsible className='flex w-full max-w-[350px] flex-col gap-2'>
      <div className='flex items-center justify-between gap-4 px-4'>
        <div className='text-sm font-semibold'>@peduarte starred 3 repositories</div>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <ChevronsUpDownIcon />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className='rounded-md border px-4 py-2 font-mono text-sm'>@radix-ui/primitives</div>
      <CollapsibleContent className='flex flex-col gap-2'>
        <div className='rounded-md border px-4 py-2 font-mono text-sm'>@radix-ui/colors</div>
        <div className='rounded-md border px-4 py-2 font-mono text-sm'>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleDemo

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
