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
radio-group-1.tsx
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const RadioGroupDemo = () => {
  return (
    <RadioGroup defaultValue='higher-secondary'>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='higher-secondary' id='higher-secondary' />
        <Label htmlFor='higher-secondary'>Higher Secondary</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='graduation' id='graduation' />
        <Label htmlFor='graduation'>Graduation</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='post-graduation' id='post-graduation' />
        <Label htmlFor='post-graduation'>Post Graduation</Label>
      </div>
    </RadioGroup>
  )
}

export default RadioGroupDemo


code.demo.1761028811506.tsx
import { useId } from 'react'

import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const RadioGroupSplitListGroupDemo = () => {
  const id = useId()

  const items = [
    { value: '1', label: 'Pro', price: '$39/mo' },
    { value: '2', label: 'Team', price: '$69/mo' },
    { value: '3', label: 'Enterprise', price: 'Custom' }
  ]

  return (
    <RadioGroup className='w-full max-w-96 gap-0 space-y-2 rounded-md *:rounded-full' defaultValue='2'>
      {items.map(item => (
        <div
          key={`${id}-${item.value}`}
          className='border-input has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground relative flex flex-col gap-4 border p-4 outline-none has-data-[state=checked]:z-10'
        >
          <div className='group flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <RadioGroupItem
                id={`${id}-${item.value}`}
                value={item.value}
                aria-label={`plan-radio-${item.value}`}
                className='text-primary bg-accent data-[state=checked]:bg-primary-foreground! data-[state=checked]:border-primary-foreground data-[state=checked]:[&_svg]:fill-primary after:absolute after:inset-0'
                aria-describedby={`${`${id}-${item.value}`}-price`}
              />
              <Label className='inline-flex items-center' htmlFor={`${id}-${item.value}`}>
                {item.label}
                {item.value === '2' && (
                  <Badge
                    variant='outline'
                    className='border-green-500 bg-green-500/10 px-1.5 py-px text-xs text-green-500'
                  >
                    Best Seller
                  </Badge>
                )}
              </Label>
            </div>
            <div
              id={`${`${id}-${item.value}`}-price`}
              className='group-has-checked:text-primary-foreground text-xs leading-[inherit]'
            >
              {item.price}
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  )
}

export default RadioGroupSplitListGroupDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio-group-1.tsx
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const RadioGroupDemo = () => {
  return (
    <RadioGroup defaultValue='higher-secondary'>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='higher-secondary' id='higher-secondary' />
        <Label htmlFor='higher-secondary'>Higher Secondary</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='graduation' id='graduation' />
        <Label htmlFor='graduation'>Graduation</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='post-graduation' id='post-graduation' />
        <Label htmlFor='post-graduation'>Post Graduation</Label>
      </div>
    </RadioGroup>
  )
}

export default RadioGroupDemo

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
