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
radio-group-dashed-demo.tsx
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const RadioGroupDashedDemo = () => {
  return (
    <RadioGroup defaultValue='economy' className='max-w-64'>
      <div className='flex items-center gap-2'>
        <RadioGroupItem
          value='economy'
          id='economy'
          className='border-primary data-checked:border-background border-dashed'
        />
        <Label htmlFor='economy'>Economy Shipping</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem
          value='priority'
          id='priority'
          className='border-primary data-checked:border-background border-dashed'
        />
        <Label htmlFor='priority'>Priority Shipping</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem
          value='next-day'
          id='next-day'
          className='border-primary data-checked:border-background border-dashed'
        />
        <Label htmlFor='next-day'>Next-Day Delivery</Label>
      </div>
    </RadioGroup>
  )
}

export default RadioGroupDashedDemo


code.demo.1772722261251.tsx
import RadioGroupDashedDemo from "@/components/ui/radio-group-dashed-demo";

export default function DemoOne() {
  return <RadioGroupDashedDemo/>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/radio-group-dashed-demo.tsx
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const RadioGroupDashedDemo = () => {
  return (
    <RadioGroup defaultValue='economy' className='max-w-64'>
      <div className='flex items-center gap-2'>
        <RadioGroupItem
          value='economy'
          id='economy'
          className='border-primary data-checked:border-background border-dashed'
        />
        <Label htmlFor='economy'>Economy Shipping</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem
          value='priority'
          id='priority'
          className='border-primary data-checked:border-background border-dashed'
        />
        <Label htmlFor='priority'>Priority Shipping</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem
          value='next-day'
          id='next-day'
          className='border-primary data-checked:border-background border-dashed'
        />
        <Label htmlFor='next-day'>Next-Day Delivery</Label>
      </div>
    </RadioGroup>
  )
}

export default RadioGroupDashedDemo

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
