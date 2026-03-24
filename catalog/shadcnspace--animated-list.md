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
animated-list.tsx
"use client"

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"
import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)

        return () => clearTimeout(timeout)
      }
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse()
      return result
    }, [index, childrenArray])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)
AnimatedList.displayName = "AnimatedList"

interface Item {
  avatar: string
  title: string
  subtitle: string
}

let Messages = [
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-1.jpg',
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
    title: 'New message',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-4.jpg',
    title: 'Bianca sent payment',
    subtitle: 'Check your earnings',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-7.jpg',
    title: 'John received payment',
    subtitle: '$230 deducted from account',
  },
]

Messages = Array.from({ length: 2 }, () => Messages).flat()

const Notification = ({ avatar, title, subtitle }: Item) => {
  return (
    <div
      className={cn(
        'relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4',
        'transition-all duration-200 ease-in-out hover:scale-105',
        // light styles (shadcn tokens)
        'bg-background border border-border',
      )}>
      <div className='flex items-center'>
        <span className='flex-shrink-0 relative'>
          <img
            src={avatar}
            width={45}
            height={45}
            alt='shadcnspace'
            className='rounded-full'
          />
        </span>
        <div className='ps-4'>
          <h5 className='text-sm font-semibold text-foreground mb-1'>
            {title}
          </h5>
          <p className='text-xs font-normal text-muted-foreground truncate'>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedListDemo() {
  return (
    <>
        <div
          className={cn(
            'relative h-96 flex items-center w-full flex-col overflow-hidden p-2'
          )}>
          <AnimatedList>
            {Messages.map((item, idx) => (
              <Notification {...item} key={idx} />
            ))}
          </AnimatedList>

          <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t'></div>
        </div>
    </>
  )
}


code.demo.1772797921840.tsx
import AnimatedListDemo from "@/components/ui/animated-list";

export default function DemoOne() {
  return <AnimatedListDemo/>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-list.tsx
"use client"

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"
import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)

        return () => clearTimeout(timeout)
      }
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse()
      return result
    }, [index, childrenArray])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)
AnimatedList.displayName = "AnimatedList"

interface Item {
  avatar: string
  title: string
  subtitle: string
}

let Messages = [
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-1.jpg',
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
    title: 'New message',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-4.jpg',
    title: 'Bianca sent payment',
    subtitle: 'Check your earnings',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar:
      'https://images.shadcnspace.com/assets/profiles/user-7.jpg',
    title: 'John received payment',
    subtitle: '$230 deducted from account',
  },
]

Messages = Array.from({ length: 2 }, () => Messages).flat()

const Notification = ({ avatar, title, subtitle }: Item) => {
  return (
    <div
      className={cn(
        'relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4',
        'transition-all duration-200 ease-in-out hover:scale-105',
        // light styles (shadcn tokens)
        'bg-background border border-border',
      )}>
      <div className='flex items-center'>
        <span className='flex-shrink-0 relative'>
          <img
            src={avatar}
            width={45}
            height={45}
            alt='shadcnspace'
            className='rounded-full'
          />
        </span>
        <div className='ps-4'>
          <h5 className='text-sm font-semibold text-foreground mb-1'>
            {title}
          </h5>
          <p className='text-xs font-normal text-muted-foreground truncate'>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedListDemo() {
  return (
    <>
        <div
          className={cn(
            'relative h-96 flex items-center w-full flex-col overflow-hidden p-2'
          )}>
          <AnimatedList>
            {Messages.map((item, idx) => (
              <Notification {...item} key={idx} />
            ))}
          </AnimatedList>

          <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t'></div>
        </div>
    </>
  )
}

```

Install NPM dependencies:
```bash
motion
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
