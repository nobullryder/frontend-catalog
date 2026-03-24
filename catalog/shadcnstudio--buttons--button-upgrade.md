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


code.demo.1760427556629.tsx
import { ZapIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const ButtonUpgradeDemo = () => {
  return (
    <Button className='bg-transparent bg-gradient-to-r from-amber-600 via-amber-600/60 to-amber-600 [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center] focus-visible:ring-amber-600/20 dark:from-amber-400 dark:via-amber-400/60 dark:to-amber-400 dark:focus-visible:ring-amber-400/40'>


      Upgrade <ZapIcon size={16}/>
    </Button>
  )
}

export default ButtonUpgradeDemo

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
