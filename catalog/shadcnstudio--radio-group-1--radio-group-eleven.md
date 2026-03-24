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

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const RadioGroupCardRadioDemo = () => {
  const id = useId()

  return (
    <RadioGroup className='w-full max-w-96 gap-2' defaultValue='1'>
      <div className='border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none'>
        <RadioGroupItem
          value='1'
          id={`${id}-1`}
          aria-label='plan-radio-basic'
          aria-describedby={`${id}-1-description`}
          className='size-5 after:absolute after:inset-0 [&_svg]:size-3'
        />
        <div className='grid grow gap-2'>
          <Label htmlFor={`${id}-1`} className='justify-between'>
            Basic <span className='text-muted-foreground text-xs leading-[inherit] font-normal'>Free</span>
          </Label>
          <p id={`${id}-1-description`} className='text-muted-foreground text-xs'>
            Get 1 project with 1 teams members.
          </p>
        </div>
      </div>

      <div className='border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none'>
        <RadioGroupItem
          value='2'
          id={`${id}-2`}
          aria-describedby={`${id}-2-description`}
          className='size-5 after:absolute after:inset-0 [&_svg]:size-3'
        />
        <div className='grid grow gap-2'>
          <Label htmlFor={`${id}-2`} className='justify-between'>
            Premium <span className='text-muted-foreground text-xs leading-[inherit] font-normal'>$5.00</span>
          </Label>
          <p id={`${id}-2-description`} className='text-muted-foreground text-xs'>
            Get 5 projects with 5 team members.
          </p>
        </div>
      </div>
    </RadioGroup>
  )
}

export default RadioGroupCardRadioDemo

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
