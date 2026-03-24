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
import { Button } from '@/components/ui/button'

const ButtonSocialIconsDemo = () => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      <Button variant='outline' size='icon'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto'
          alt='Google Icon'
          className='size-5'
        />
      </Button>
      <Button variant='outline' size='icon'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=20&height=20&format=auto'
          alt='X Icon'
          className='size-5 dark:invert'
        />
      </Button>
      <Button variant='outline' size='icon'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/facebook-icon.png?width=20&height=20&format=auto'
          alt='Facebook Icon'
          className='size-5'
        />
      </Button>
      <Button variant='outline' size='icon'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/github-icon.png?width=20&height=20&format=auto'
          alt='GitHub Icon'
          className='size-5 dark:invert'
        />
      </Button>
    </div>
  )
}

export default ButtonSocialIconsDemo

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
