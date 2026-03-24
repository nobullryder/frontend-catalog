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


code.demo.1760583376921.tsx
import { useId } from 'react'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const TextareaInvalidDemo = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Invalid Textarea</Label>
      <Textarea aria-invalid placeholder='Type your feedback here' id={id} />
      <p className='text-destructive text-xs'>Your feedback is useful for us.</p>
    </div>
  )
}

export default TextareaInvalidDemo

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
