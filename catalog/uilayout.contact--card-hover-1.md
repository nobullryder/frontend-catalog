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
card-hover-1.tsx
import React from 'react';
import {
  ChevronRight,
  MoveUpRight,
} from 'lucide-react';

type ComponentProps = React.HTMLAttributes<HTMLDivElement>;

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-[400px] relative mt-4 h-[430px] group mx-auto dark:bg-black  bg-white dark:border-0 border rounded-md dark:text-white text-black flex flex-col ${className || ''}`}
        {...props}
      >
        <div className='w-full  rounded-t-md h-[350px] group-hover:h-[410px] overflow-hidden transition-all duration-300'>
          <img
            src={'https://images.unsplash.com/photo-1626639900752-3ea9001925ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt='person'
            width={600}
            height={600}
            className='h-full w-full  scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 object-cover transition-all duration-300'
          />
        </div>
        <article className='relative overflow-hidden  flex-grow'>
          <div className='info p-2 translate-y-0 group-hover:-translate-y-20 transition-all duration-300'>
            <p className='md:text-2xl font-semibold'>Naymur Rahman</p>
            <p className='sm:text-base text-sm'>CEO & Design Engineer</p>
          </div>
          <button className='absolute h-10 -bottom-8 opacity-0 group-hover:opacity-100 cursor-pointer group-hover:bottom-3  text-3xl font-medium transition-all duration-300 w-full text-center'>
            CEO & Design Engineer
          </button>
        </article>
      </div>
    );
  }
);

Component.displayName = 'Component';

export default Component;

code.demo.1749991908279.tsx
import React from 'react';
import Component from '@/components/ui/card-hover-1';

const ComponentDemo = () => {
  return (
    <div className='flex justify-center items-center min-h-[600px] p-4 bg-gray-100 dark:bg-gray-800'>
      <Component />
    </div>
  );
};

export { ComponentDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-hover-1.tsx
import React from 'react';
import {
  ChevronRight,
  MoveUpRight,
} from 'lucide-react';

type ComponentProps = React.HTMLAttributes<HTMLDivElement>;

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-[400px] relative mt-4 h-[430px] group mx-auto dark:bg-black  bg-white dark:border-0 border rounded-md dark:text-white text-black flex flex-col ${className || ''}`}
        {...props}
      >
        <div className='w-full  rounded-t-md h-[350px] group-hover:h-[410px] overflow-hidden transition-all duration-300'>
          <img
            src={'https://images.unsplash.com/photo-1626639900752-3ea9001925ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt='person'
            width={600}
            height={600}
            className='h-full w-full  scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 object-cover transition-all duration-300'
          />
        </div>
        <article className='relative overflow-hidden  flex-grow'>
          <div className='info p-2 translate-y-0 group-hover:-translate-y-20 transition-all duration-300'>
            <p className='md:text-2xl font-semibold'>Naymur Rahman</p>
            <p className='sm:text-base text-sm'>CEO & Design Engineer</p>
          </div>
          <button className='absolute h-10 -bottom-8 opacity-0 group-hover:opacity-100 cursor-pointer group-hover:bottom-3  text-3xl font-medium transition-all duration-300 w-full text-center'>
            CEO & Design Engineer
          </button>
        </article>
      </div>
    );
  }
);

Component.displayName = 'Component';

export default Component;
```

Install NPM dependencies:
```bash
lucide-react
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
