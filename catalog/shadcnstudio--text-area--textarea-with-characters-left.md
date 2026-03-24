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
text-area.tsx
import { Textarea } from '@/components/ui/textarea'

const TextareaDemo = () => {
  return <Textarea placeholder='Type your message here.' className='w-full max-w-xs' />
}

export default TextareaDemo


code.demo.1760583376922.tsx
'use client'

import { useId, useState, type ChangeEvent } from 'react'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const maxLength = 200
const initialValue = ''

const TextareaCharacterLeftDemo = () => {
  const [value, setValue] = useState(initialValue)
  const [characterCount, setCharacterCount] = useState(initialValue.length)

  const id = useId()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setValue(e.target.value)
      setCharacterCount(e.target.value.length)
    }
  }

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Textarea with characters left</Label>
      <Textarea placeholder='Type your feedback here' value={value} maxLength={maxLength} onChange={handleChange} />
      <p className='text-muted-foreground text-xs'>
        <span className='tabular-nums'>{maxLength - characterCount}</span> characters left
      </p>
    </div>
  )
}

export default TextareaCharacterLeftDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/text-area.tsx
import { Textarea } from '@/components/ui/textarea'

const TextareaDemo = () => {
  return <Textarea placeholder='Type your message here.' className='w-full max-w-xs' />
}

export default TextareaDemo

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
