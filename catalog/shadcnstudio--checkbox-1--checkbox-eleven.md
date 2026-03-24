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
checkbox-1.tsx
import { useId } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const CheckboxDemo = () => {
  const id = useId()

  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={id} />
      <Label htmlFor={id}>Accept terms and conditions</Label>
    </div>
  )
}

export default CheckboxDemo


code.demo.1760512663280.tsx
import { HeartIcon, CircleIcon, StarIcon } from 'lucide-react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

const CheckboxCustomIconsDemo = () => {
  return (
    <div className='flex items-center gap-2'>
      <CheckboxPrimitive.Root
        data-slot='checkbox'
        defaultChecked
        className='group focus-visible:ring-ring/50 rounded-sm outline-none focus-visible:ring-3'
        aria-label='Heart icon'
      >
        <span className='group-data-[state=checked]:hidden'>
          <HeartIcon className='stroke-1' />
        </span>
        <span className='group-data-[state=unchecked]:hidden'>
          <HeartIcon className='fill-destructive stroke-destructive stroke-1' />
        </span>
      </CheckboxPrimitive.Root>
      <CheckboxPrimitive.Root
        data-slot='checkbox'
        defaultChecked
        className='group focus-visible:ring-ring/50 rounded-sm outline-none focus-visible:ring-3'
        aria-label='Star icon'
      >
        <span className='group-data-[state=checked]:hidden'>
          <StarIcon className='stroke-1' />
        </span>
        <span className='group-data-[state=unchecked]:hidden'>
          <StarIcon className='fill-amber-500 stroke-amber-500 stroke-1 dark:fill-amber-400 dark:stroke-amber-400' />
        </span>
      </CheckboxPrimitive.Root>
      <CheckboxPrimitive.Root
        data-slot='checkbox'
        defaultChecked
        className='group focus-visible:ring-ring/50 rounded-sm outline-none focus-visible:ring-3'
        aria-label='Circle icon'
      >
        <span className='group-data-[state=checked]:hidden'>
          <CircleIcon className='stroke-1' />
        </span>
        <span className='group-data-[state=unchecked]:hidden'>
          <CircleIcon className='fill-green-600 stroke-green-600 stroke-1 dark:fill-green-400 dark:stroke-green-400' />
        </span>
      </CheckboxPrimitive.Root>
    </div>
  )
}

export default CheckboxCustomIconsDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/checkbox-1.tsx
import { useId } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const CheckboxDemo = () => {
  const id = useId()

  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={id} />
      <Label htmlFor={id}>Accept terms and conditions</Label>
    </div>
  )
}

export default CheckboxDemo

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
