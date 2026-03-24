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
'use client'

import { useState } from 'react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const CollapsibleShowMoreDemo = () => {
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(true)
  const [isCancelOrderOpen, setIsCancelOrderOpen] = useState(false)

  return (
    <div className='w-[400px] h-[300px] space-y-4 overflow-auto rounded-md border p-4'>
      <div className='space-y-2'>
        <p className='font-medium'>How can I track my order?</p>
        <Collapsible open={isTrackOrderOpen} onOpenChange={setIsTrackOrderOpen} className='space-y-2'>
          <CollapsibleContent>
            <p className='text-sm'>
              To track your order, simply log in to your account and navigate to the order history section. You&apos;ll
              find detailed information about your order status and tracking number there.
            </p>
          </CollapsibleContent>
          <CollapsibleTrigger>
            <span className='text-muted-foreground text-sm underline'>
              {isTrackOrderOpen ? 'Hide answer' : 'Show answer'}
            </span>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      <div className='space-y-2'>
        <p className='font-medium'>Can I cancel my order?</p>
        <Collapsible open={isCancelOrderOpen} onOpenChange={setIsCancelOrderOpen} className='space-y-2'>
          <CollapsibleContent>
            <p className='text-sm'>
              Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full refund.
            </p>
          </CollapsibleContent>
          <CollapsibleTrigger>
            <span className='text-muted-foreground text-sm underline'>
              {isCancelOrderOpen ? 'Hide answer' : 'Show answer'}
            </span>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    </div>
  )
}

export default CollapsibleShowMoreDemo

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
