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
hover-card.tsx
// component.tsx
import React from 'react';
import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'default', size = 'default', asChild, className, ...props }, ref) => {

    const sizeClasses = {
      default: 'w-[400px] h-[400px]',
      sm: 'w-[300px] h-[300px]',
      lg: 'w-[500px] h-[500px]',
    };

    const gradientVariants = {
      default: 'from-[#02cc6e25] via-[#02cc6e5b] to-[#02cc6e]',
      primary: 'from-[#007bff25] via-[#007bff5b] to-[#007bff]',
      secondary: 'from-[#ffc10725] via-[#ffc1075b] to-[#ffc107]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative mt-4 group mx-auto dark:bg-black bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <figure className='w-full h-full rounded-md overflow-hidden'>
          <Image
            src={
              'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format'
            }
            alt='shoes'
            width={600}
            height={600}
            className='h-full w-full scale-105 group-hover:scale-100 rounded-lg object-cover transition-all duration-300'
          />
        </figure>
        <div className={cn('absolute top-0 left-0 w-full h-full transition-all duration-300 bg-gradient-to-b', gradientVariants[variant])}></div>
        <article className='p-4 space-y-2 absolute -bottom-10 group-hover:bottom-0 transition-all duration-300'>
          <h1 className='text-2xl font-semibold capitalize w-[90%]'>
            Learn why going to the mountains can change your thoughts and
            lifestyle forever
          </h1>
          <a
            href='#'
            className='text-base dark:text-white text-blue-600 font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300'
          >
            Read Story
            <span>
              <ChevronsRight />
            </span>
          </a>
        </article>
      </div>
    );
  }
);

Component.displayName = 'Component';

export default Component;

code.demo.1749991746087.tsx
// demo.tsx
import React from 'react';
import Component from '@/components/ui/hover-card';

const ComponentDemo = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-12 p-8 bg-gray-900 min-h-screen text-white'>
      <div className='flex flex-wrap justify-center gap-8'>
        <div className='flex flex-col items-center gap-2'>
          <Component />
        </div>
      </div>
    </div>
  );
};

export { ComponentDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hover-card.tsx
// component.tsx
import React from 'react';
import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'default', size = 'default', asChild, className, ...props }, ref) => {

    const sizeClasses = {
      default: 'w-[400px] h-[400px]',
      sm: 'w-[300px] h-[300px]',
      lg: 'w-[500px] h-[500px]',
    };

    const gradientVariants = {
      default: 'from-[#02cc6e25] via-[#02cc6e5b] to-[#02cc6e]',
      primary: 'from-[#007bff25] via-[#007bff5b] to-[#007bff]',
      secondary: 'from-[#ffc10725] via-[#ffc1075b] to-[#ffc107]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative mt-4 group mx-auto dark:bg-black bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <figure className='w-full h-full rounded-md overflow-hidden'>
          <Image
            src={
              'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format'
            }
            alt='shoes'
            width={600}
            height={600}
            className='h-full w-full scale-105 group-hover:scale-100 rounded-lg object-cover transition-all duration-300'
          />
        </figure>
        <div className={cn('absolute top-0 left-0 w-full h-full transition-all duration-300 bg-gradient-to-b', gradientVariants[variant])}></div>
        <article className='p-4 space-y-2 absolute -bottom-10 group-hover:bottom-0 transition-all duration-300'>
          <h1 className='text-2xl font-semibold capitalize w-[90%]'>
            Learn why going to the mountains can change your thoughts and
            lifestyle forever
          </h1>
          <a
            href='#'
            className='text-base dark:text-white text-blue-600 font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 transition-all duration-300'
          >
            Read Story
            <span>
              <ChevronsRight />
            </span>
          </a>
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
next, lucide-react
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
