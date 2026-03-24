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
browser-preview.tsx
import { cn } from "@/lib/utils";

export const BrowserComponent: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  className,
  children
}) => (
  <div
    className={cn(
      'relative text-sm dark:text-neutral-400 text-neutral-950 border dark:border-neutral-800 rounded-lg w-full h-[400px] dark:shadow-none shadow-lg shadow-gray-200 dark:dots-neutral-800 dots-gray-300 dark:bg-neutral-950 bg-white',
      className
    )}
  >
    <div
      className={
        'border-b border-inherit flex items-center justify-between w-full py-2 px-4 bg-inherit rounded-t-lg'
      }
    >
      <div className={'flex gap-2'}>
        <div className={'w-3 h-3 rounded-full dark:bg-neutral-800 bg-neutral-300'} />
        <div className={'w-3 h-3 rounded-full dark:bg-neutral-800 bg-neutral-300'} />
        <div className={'w-3 h-3 rounded-full dark:bg-neutral-800 bg-neutral-300'} />
      </div>
      <div
        className={
          'border border-inherit rounded-md flex gap-2 px-1.5 py-1 font-sans w-fit min-w-1/3'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          className={'dark:stroke-neutral-700 stroke-neutral-300 w-4 max-w-5'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className={'text-sm flex items-center justify-center'}>
          yourwebsite.com/admin/sales
        </span>
      </div>
      <div />
    </div>
    <div className={'w-full h-full absolute top-0 left-0 pt-12'}>{children}</div>
  </div>
)


code.demo.1756833195034.tsx
import { BrowserComponent } from "@/components/ui/browser-preview";

export default function DemoOne() {
  return <BrowserComponent className={'w-full max-w-[600px] h-[300px]'}>

    <section className={'w-full h-full flex items-center justify-center'}>

      <h1 className={'md:text-xl text-base'}>Hi!</h1>

    </section>

  </BrowserComponent>
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/browser-preview.tsx
import { cn } from "@/lib/utils";

export const BrowserComponent: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  className,
  children
}) => (
  <div
    className={cn(
      'relative text-sm dark:text-neutral-400 text-neutral-950 border dark:border-neutral-800 rounded-lg w-full h-[400px] dark:shadow-none shadow-lg shadow-gray-200 dark:dots-neutral-800 dots-gray-300 dark:bg-neutral-950 bg-white',
      className
    )}
  >
    <div
      className={
        'border-b border-inherit flex items-center justify-between w-full py-2 px-4 bg-inherit rounded-t-lg'
      }
    >
      <div className={'flex gap-2'}>
        <div className={'w-3 h-3 rounded-full dark:bg-neutral-800 bg-neutral-300'} />
        <div className={'w-3 h-3 rounded-full dark:bg-neutral-800 bg-neutral-300'} />
        <div className={'w-3 h-3 rounded-full dark:bg-neutral-800 bg-neutral-300'} />
      </div>
      <div
        className={
          'border border-inherit rounded-md flex gap-2 px-1.5 py-1 font-sans w-fit min-w-1/3'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          className={'dark:stroke-neutral-700 stroke-neutral-300 w-4 max-w-5'}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className={'text-sm flex items-center justify-center'}>
          yourwebsite.com/admin/sales
        </span>
      </div>
      <div />
    </div>
    <div className={'w-full h-full absolute top-0 left-0 pt-12'}>{children}</div>
  </div>
)

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
