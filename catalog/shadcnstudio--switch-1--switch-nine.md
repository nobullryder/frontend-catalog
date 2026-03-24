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


code.demo.1760584544925.tsx
'use client'

import { useId, useState } from 'react'

import { Switch } from '@/components/ui/switch'

const SwitchDualToggleLabelDemo = () => {
  const id = useId()
  const [checked, setChecked] = useState(false)

  const toggleSwitch = () => setChecked(prev => !prev)

  return (
    <div className='group inline-flex items-center gap-2' data-state={checked ? 'checked' : 'unchecked'}>
      <span
        id={`${id}-yes`}
        className='group-data-[state=checked]:text-muted-foreground/70 cursor-pointer text-right text-sm font-medium'
        aria-controls={id}
        onClick={() => setChecked(false)}
      >
        Yes
      </span>
      <Switch id={id} checked={checked} onCheckedChange={toggleSwitch} aria-labelledby={`${id}-yes ${id}-no`} />
      <span
        id={`${id}-no`}
        className='group-data-[state=unchecked]:text-muted-foreground/70 cursor-pointer text-left text-sm font-medium'
        aria-controls={id}
        onClick={() => setChecked(true)}
      >
        No
      </span>
    </div>
  )
}

export default SwitchDualToggleLabelDemo

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
