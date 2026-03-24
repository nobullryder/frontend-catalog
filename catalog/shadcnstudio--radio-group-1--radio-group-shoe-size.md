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

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const RadioGroupChipDemo = () => {
  const id = useId()

  const items = [
    { value: '1', label: 'Size: 6 (UK)' },
    { value: '2', label: 'Size: 7 (UK)', disabled: true },
    { value: '3', label: 'Size: 8 (UK)' },
    { value: '4', label: 'Size: 9 (UK)' },
    { value: '5', label: 'Size: 10 (UK)' }
  ]

  return (
    <fieldset className='w-full max-w-96 space-y-4'>
      <legend className='text-foreground text-sm leading-none font-medium'>Select Shoe Size: </legend>
      <RadioGroup className='grid grid-cols-3 gap-2' defaultValue='1'>
        {items.map(item => (
          <label
            key={`${id}-${item.value}`}
            className='border-input has-data-[state=checked]:border-primary/80 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50'
          >
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className='sr-only after:absolute after:inset-0'
              aria-label={`size-radio-${item.value}`}
              disabled={item.disabled}
            />
            <p className='text-foreground text-sm leading-none font-medium'>{item.label}</p>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  )
}

export default RadioGroupChipDemo

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
