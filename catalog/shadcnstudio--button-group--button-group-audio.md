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


code.demo.1760455322557.tsx
import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'

const ButtonGroupRoundedDemo = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-full shadow-xs">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-none rounded-l-full shadow-none focus-visible:z-10">
              <SkipBackIcon />
              <span className="sr-only">Skip Back</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Skip Back</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-none shadow-none focus-visible:z-10">
              <PlayIcon />
              <span className="sr-only">Play</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Play</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-none shadow-none focus-visible:z-10">
              <PauseIcon />
              <span className="sr-only">Pause</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Pause</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-none rounded-r-full shadow-none focus-visible:z-10">
              <SkipForwardIcon />
              <span className="sr-only">Skip Forward</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">Skip Forward</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export default ButtonGroupRoundedDemo

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
