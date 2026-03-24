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
switch-1.tsx
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const SwitchDemo = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  )
}

export default SwitchDemo


code.demo.1760584544926.tsx
import { ChartPieIcon, CodeIcon, PaletteIcon } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const skills = [
  { label: 'Web Development', icon: CodeIcon },
  { label: 'Data Analysis', icon: ChartPieIcon },
  { label: 'Graphic Design', icon: PaletteIcon }
]

const SwitchListGroupDemo = () => {
  return (
    <fieldset className='w-full max-w-96 space-y-4'>
      <legend className='text-foreground text-sm leading-none font-medium'>Switch to your preferred field: </legend>
      <ul className='flex w-full flex-col divide-y rounded-md border'>
        {skills.map(({ label, icon: Icon }) => (
          <li key={label}>
            <Label htmlFor={label} className='flex items-center justify-between gap-2 px-5 py-3'>
              <span className='flex items-center gap-2'>
                <Icon className='size-4' /> {label}
              </span>
              <Switch id={label} />
            </Label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

export default SwitchListGroupDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/switch-1.tsx
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const SwitchDemo = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  )
}

export default SwitchDemo

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
