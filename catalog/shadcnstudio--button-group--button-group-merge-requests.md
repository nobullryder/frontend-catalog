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
button-group.tsx
import { DownloadIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonGroupDownloadDemo = () => {
  return (
    <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
      <Button variant='outline' className='btn rounded-none rounded-l-md shadow-none focus-visible:z-10'>
        <DownloadIcon className="icon"/>
        Download
      </Button>
      <span className='bg-background dark:border-input dark:bg-input/30 flex items-center rounded-r-md border px-3 text-sm font-medium'>
        15k
      </span>
    </div>
  )
}

export default ButtonGroupDownloadDemo


code.demo.1760455322558.tsx
'use client'

import { useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const options = [
  {
    label: 'Merge pull request',
    description: 'All commits from this branch will be added to the base branch via a commit version.'
  },
  {
    label: 'Squash and merge',
    description: 'The 6 commits from this branch will be combined into one commit in the base branch.'
  },
  {
    label: 'Rebase and merge',
    description: 'The 6 commits from this branch will be rebased and added to the base branch.'
  }
]

const ButtonGroupDropdownDemo = () => {
  const [selectedIndex, setSelectedIndex] = useState('0')

  return (
    <div className='divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs'>
      <Button className='rounded-none rounded-l-md shadow-none focus-visible:z-10'>
        {options[Number(selectedIndex)].label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' className='rounded-none rounded-r-md focus-visible:z-10'>
            <ChevronDownIcon />
            <span className='sr-only'>Select option</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' sideOffset={4} align='end' className='max-w-64 md:max-w-xs!'>
          <DropdownMenuRadioGroup value={selectedIndex} onValueChange={setSelectedIndex}>
            {options.map((option, index) => (
              <DropdownMenuRadioItem key={option.label} value={String(index)} className='items-start [&>span]:pt-1.5'>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-medium'>{option.label}</span>
                  <span className='text-muted-foreground text-xs'>{option.description}</span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ButtonGroupDropdownDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/button-group.tsx
import { DownloadIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonGroupDownloadDemo = () => {
  return (
    <div className='inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse'>
      <Button variant='outline' className='btn rounded-none rounded-l-md shadow-none focus-visible:z-10'>
        <DownloadIcon className="icon"/>
        Download
      </Button>
      <span className='bg-background dark:border-input dark:bg-input/30 flex items-center rounded-r-md border px-3 text-sm font-medium'>
        15k
      </span>
    </div>
  )
}

export default ButtonGroupDownloadDemo

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
