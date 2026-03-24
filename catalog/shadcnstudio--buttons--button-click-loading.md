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
'use client'

import { useState } from 'react'

import { LoaderCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const ButtonPromiseDemo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<undefined | string>(undefined)

  const handleClick = async () => {
    setIsLoading(true)
    setStatus(undefined)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      setStatus(Math.random() > 0.5 ? 'Submitted!' : 'Rejected!')
    } catch (error) {
      setStatus('Rejected!')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant='link'
      onClick={handleClick}
      disabled={isLoading}
      className={cn('btn cursor-pointer hover:no-underline', {
        'text-green-600 dark:text-green-400': status === 'Submitted!',
        'text-destructive': status === 'Rejected!'
      })}
    >
      {isLoading ? (
        <>
          <LoaderCircleIcon className='icon animate-spin' />
          Loading
        </>
      ) : status ? (
        status
      ) : (
        'Click me'
      )}
    </Button>
  )
}

export default ButtonPromiseDemo

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
