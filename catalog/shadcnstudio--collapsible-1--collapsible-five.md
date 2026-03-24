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
import { ChevronDownIcon, StarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const CollapsibleFilterDemo = () => {
  return (
    <div className='w-full max-w-[350px] space-y-3'>
      <Collapsible className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-4 px-4'>
          <div className='text-sm font-semibold'>Price Range</div>
          <CollapsibleTrigger asChild className='group'>
            <Button variant='ghost' size='icon' className='size-8'>
              <ChevronDownIcon className='text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-4 px-4'>
            <Label htmlFor='min-price' className='shrink-0 text-sm font-medium'>
              Min Price
            </Label>
            <Input id='min-price' type='number' placeholder='0' className='max-w-58' />
          </div>
          <div className='flex items-center justify-between gap-4 px-4'>
            <Label htmlFor='max-price' className='shrink-0 text-sm font-medium'>
              Max Price
            </Label>
            <Input id='max-price' type='number' placeholder='1000' className='max-w-58' />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <Collapsible className='flex w-full max-w-[350px] flex-col gap-2'>
        <div className='flex items-center justify-between gap-4 px-4'>
          <div className='text-sm font-semibold'>Customer Ratings</div>
          <CollapsibleTrigger asChild className='group'>
            <Button variant='ghost' size='icon' className='size-8'>
              <ChevronDownIcon className='text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='rating-4' />
            <Label htmlFor='rating-4' className='flex shrink-0 items-center gap-1 text-sm font-medium'>
              <span className='flex items-center gap-1'>
                4
                <StarIcon className='size-4 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400' />
              </span>
              & Up
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='rating-3' />
            <Label htmlFor='rating-3' className='flex shrink-0 items-center gap-1 text-sm font-medium'>
              <span className='flex items-center gap-1'>
                3
                <StarIcon className='size-4 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400' />
              </span>
              & Up
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='rating-2' />
            <Label htmlFor='rating-2' className='flex shrink-0 items-center gap-1 text-sm font-medium'>
              <span className='flex items-center gap-1'>
                2
                <StarIcon className='size-4 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400' />
              </span>
              & Up
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <Collapsible className='flex w-full max-w-[350px] flex-col gap-2'>
        <div className='flex items-center justify-between gap-4 px-4'>
          <div className='text-sm font-semibold'>Brand</div>
          <CollapsibleTrigger asChild className='group'>
            <Button variant='ghost' size='icon' className='size-8'>
              <ChevronDownIcon className='text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='brand-apple' />
            <Label htmlFor='brand-apple' className='shrink-0 text-sm font-medium'>
              Apple
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='brand-samsung' />
            <Label htmlFor='brand-samsung' className='shrink-0 text-sm font-medium'>
              Samsung
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='brand-google' />
            <Label htmlFor='brand-google' className='shrink-0 text-sm font-medium'>
              Google
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='brand-oneplus' />
            <Label htmlFor='brand-oneplus' className='shrink-0 text-sm font-medium'>
              OnePlus
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='brand-xiaomi' />
            <Label htmlFor='brand-xiaomi' className='shrink-0 text-sm font-medium'>
              Xiaomi
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <Collapsible className='flex w-full max-w-[350px] flex-col gap-2'>
        <div className='flex items-center justify-between gap-4 px-4'>
          <div className='text-sm font-semibold'>Battery</div>
          <CollapsibleTrigger asChild className='group'>
            <Button variant='ghost' size='icon' className='size-8'>
              <ChevronDownIcon className='text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='flex flex-col gap-2'>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='battery-3500' />
            <Label htmlFor='battery-3500' className='shrink-0 text-sm font-medium'>
              3500mAh
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='battery-4000' />
            <Label htmlFor='battery-4000' className='shrink-0 text-sm font-medium'>
              4000mAh
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='battery-5000' />
            <Label htmlFor='battery-5000' className='shrink-0 text-sm font-medium'>
              5000mAh
            </Label>
          </div>
          <div className='flex items-center gap-2 px-4'>
            <Checkbox id='battery-6000' />
            <Label htmlFor='battery-6000' className='shrink-0 text-sm font-medium'>
              6000mAh
            </Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default CollapsibleFilterDemo

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
