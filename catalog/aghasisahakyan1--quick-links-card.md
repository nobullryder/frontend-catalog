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
quick-links-card.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Re-using the Cross SVG from the original example
const Cross = () => (
  <svg
    width="130"
    height="130"
    viewBox="0 0 130 130"
    fill="none"
    className={'scale-125'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 11L118.899 119M11.101 119L119 11" stroke="#282828" strokeWidth="31" />
  </svg>
)

export const NavCardWrapper: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div
    className={cn(
      'min-h-[300px] h-auto max-w-sm w-full bg-purple-500 relative overflow-hidden rounded-2xl text-white p-6',
      className
    )}
  >
    <div className={'absolute top-0 left-0 w-full h-full z-[0]'}>
        <div className={'w-fit h-fit absolute top-0 -left-10 z-0 animate-[spin_5s_linear_infinite]'}> <Cross /> </div>
        <div className={'w-fit h-fit absolute top-1/2 -right-12 z-0 animate-[spin_5s_linear_infinite]'}> <Cross /> </div>
        <div className={'w-fit h-fit absolute top-[85%] -left-5 z-0 animate-[spin_5s_linear_infinite]'}> <Cross /> </div>
    </div>
    <div className="relative z-[2]">{children}</div>
  </div>
)

export const NavCardHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <h2 className={cn('text-3xl font-bold border-b-4 border-white/50 pb-2 mb-4', className)}>
    {children}
  </h2>
)

export const NavCardLink: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({
  href,
  children,
  className
}) => (
  <Link href={href}>
    <a className={cn('block text-xl font-semibold py-2 hover:bg-white/10 rounded-md px-2 transition-colors', className)}>
        {children}
    </a>
  </Link>
)

code.demo.1757325034282.tsx
import { 
  NavCardWrapper, 
  NavCardHeading, 
  NavCardLink 
} from "@/components/ui/quick-links-card"; // Adjust import path as needed

export default function DemoEleven() {
  return (
    <div className={'h-screen w-full flex gap-12 items-center justify-center bg-gray-100'}>
      <NavCardWrapper>
        <NavCardHeading>
          Quick Links
        </NavCardHeading>
        <nav className="flex flex-col gap-2">
            <NavCardLink href="/dashboard">Dashboard</NavCardLink>
            <NavCardLink href="/settings">Settings</NavCardLink>
            <NavCardLink href="/profile">My Profile</NavCardLink>
            <NavCardLink href="/help">Help & Support</NavCardLink>
        </nav>
      </NavCardWrapper>
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/quick-links-card.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Re-using the Cross SVG from the original example
const Cross = () => (
  <svg
    width="130"
    height="130"
    viewBox="0 0 130 130"
    fill="none"
    className={'scale-125'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 11L118.899 119M11.101 119L119 11" stroke="#282828" strokeWidth="31" />
  </svg>
)

export const NavCardWrapper: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div
    className={cn(
      'min-h-[300px] h-auto max-w-sm w-full bg-purple-500 relative overflow-hidden rounded-2xl text-white p-6',
      className
    )}
  >
    <div className={'absolute top-0 left-0 w-full h-full z-[0]'}>
        <div className={'w-fit h-fit absolute top-0 -left-10 z-0 animate-[spin_5s_linear_infinite]'}> <Cross /> </div>
        <div className={'w-fit h-fit absolute top-1/2 -right-12 z-0 animate-[spin_5s_linear_infinite]'}> <Cross /> </div>
        <div className={'w-fit h-fit absolute top-[85%] -left-5 z-0 animate-[spin_5s_linear_infinite]'}> <Cross /> </div>
    </div>
    <div className="relative z-[2]">{children}</div>
  </div>
)

export const NavCardHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <h2 className={cn('text-3xl font-bold border-b-4 border-white/50 pb-2 mb-4', className)}>
    {children}
  </h2>
)

export const NavCardLink: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({
  href,
  children,
  className
}) => (
  <Link href={href}>
    <a className={cn('block text-xl font-semibold py-2 hover:bg-white/10 rounded-md px-2 transition-colors', className)}>
        {children}
    </a>
  </Link>
)
```

Install NPM dependencies:
```bash
next
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
