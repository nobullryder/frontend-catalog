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
card-hover-2.tsx
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
      default: 'w-[400px] h-[450px]',
      sm: 'w-[300px] h-[350px]',
      lg: 'w-[500px] h-[550px]',
    };

    const overlayBgClasses = {
      default: 'bg-[#c34c32]',
      primary: 'bg-blue-600',
      secondary: 'bg-purple-600',
    };

    const gradientFromClasses = {
      default: 'from-[#c34c32]',
      primary: 'from-blue-600',
      secondary: 'from-purple-600',
    };

    const Comp = asChild ? React.Fragment : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          'relative mt-4 overflow-hidden group mx-auto dark:bg-black bg-white dark:border-0 border rounded-md dark:text-white text-black flex flex-col',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div className='w-full h-full'>
          <Image
            src={
              'https://images.unsplash.com/photo-1583071299210-c6c113f4ac91?q=80&w=800&auto=format&fit=crop'
            }
            alt='Portrait Girl'
            width={600}
            height={600}
            className='h-full w-full scale-105 group-hover:scale-100 object-cover transition-all duration-300 rounded-md'
          />
        </div>
        <article className={cn('p-8 w-full h-full overflow-hidden z-10 absolute top-0 flex flex-col justify-end rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300', overlayBgClasses[variant])}>
          <div className='translate-y-10 group-hover:translate-y-0 transition-all duration-300 space-y-2'>
            <h1 className='md:text-2xl font-semibold'>Who We are</h1>
            <p className='sm:text-base text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              consectetur ducimus vel nemo deserunt possimus inventore ipsum
              nostrum. Sapiente, facilis?
            </p>
            <button className='p-2 bg-black flex rounded-md text-white'>
              Learn More <ChevronsRight />
            </button>
          </div>
        </article>
        <article className={cn('p-2 w-full h-[20%] flex flex-col justify-end overflow-hidden absolute bottom-0 rounded-b-md opacity-100 group-hover:opacity-0 group-hover:-bottom-4 transition-all duration-300 bg-gradient-to-t', gradientFromClasses[variant])}>
          <h1 className='md:text-2xl font-semibold'>Naymur Rahman</h1>
          <p className='sm:text-base text-sm'>CEO & Design Engineer</p>
        </article>
      </Comp>
    );
  }
);

Component.displayName = 'Component';

export default Component;

code.demo.1749992924518.tsx
// demo.tsx
import React from 'react';
import Component from '@/components/ui/card-hover-2';
import { ChevronsRight } from 'lucide-react';

const ComponentDemo = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-12 p-8 bg-gray-900 min-h-screen text-white'>
      <div className='flex flex-wrap justify-center gap-8'>
  
        <div className='flex flex-col items-center gap-2'>
          <Component size='lg' />
        </div>


      </div>
    </div>
  );
};

export { ComponentDemo as DemoOne };
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-hover-2.tsx
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
      default: 'w-[400px] h-[450px]',
      sm: 'w-[300px] h-[350px]',
      lg: 'w-[500px] h-[550px]',
    };

    const overlayBgClasses = {
      default: 'bg-[#c34c32]',
      primary: 'bg-blue-600',
      secondary: 'bg-purple-600',
    };

    const gradientFromClasses = {
      default: 'from-[#c34c32]',
      primary: 'from-blue-600',
      secondary: 'from-purple-600',
    };

    const Comp = asChild ? React.Fragment : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          'relative mt-4 overflow-hidden group mx-auto dark:bg-black bg-white dark:border-0 border rounded-md dark:text-white text-black flex flex-col',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div className='w-full h-full'>
          <Image
            src={
              'https://images.unsplash.com/photo-1583071299210-c6c113f4ac91?q=80&w=800&auto=format&fit=crop'
            }
            alt='Portrait Girl'
            width={600}
            height={600}
            className='h-full w-full scale-105 group-hover:scale-100 object-cover transition-all duration-300 rounded-md'
          />
        </div>
        <article className={cn('p-8 w-full h-full overflow-hidden z-10 absolute top-0 flex flex-col justify-end rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300', overlayBgClasses[variant])}>
          <div className='translate-y-10 group-hover:translate-y-0 transition-all duration-300 space-y-2'>
            <h1 className='md:text-2xl font-semibold'>Who We are</h1>
            <p className='sm:text-base text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              consectetur ducimus vel nemo deserunt possimus inventore ipsum
              nostrum. Sapiente, facilis?
            </p>
            <button className='p-2 bg-black flex rounded-md text-white'>
              Learn More <ChevronsRight />
            </button>
          </div>
        </article>
        <article className={cn('p-2 w-full h-[20%] flex flex-col justify-end overflow-hidden absolute bottom-0 rounded-b-md opacity-100 group-hover:opacity-0 group-hover:-bottom-4 transition-all duration-300 bg-gradient-to-t', gradientFromClasses[variant])}>
          <h1 className='md:text-2xl font-semibold'>Naymur Rahman</h1>
          <p className='sm:text-base text-sm'>CEO & Design Engineer</p>
        </article>
      </Comp>
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
