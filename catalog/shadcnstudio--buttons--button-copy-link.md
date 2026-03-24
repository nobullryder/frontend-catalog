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
buttons.tsx
import { Button } from '@/components/ui/button'

const ButtonDemo = () => {
  return <Button>Button</Button>
}

export default ButtonDemo


code.demo.1760427556630.tsx
import { CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonCopyDemo = () => {
  return (
    <div className='flex h-11.5 items-center overflow-hidden rounded-full border px-1'>
      <p className='text-muted-foreground max-w-56 truncate overflow-hidden px-2.5 text-sm'>
        https://shadcnstudio.com/docs/components/button
      </p>
      <Button
        size='icon'
        className='rounded-full bg-sky-600 text-white hover:bg-sky-600/90 focus-visible:ring-sky-600/20 dark:bg-sky-400/60 dark:focus-visible:ring-sky-400/40'
      >
        <CopyIcon size={15}/>
        <span className='sr-only'>Copy</span>
      </Button>
    </div>
  )
}

export default ButtonCopyDemo

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/buttons.tsx
import { Button } from '@/components/ui/button'

const ButtonDemo = () => {
  return <Button>Button</Button>
}

export default ButtonDemo

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
