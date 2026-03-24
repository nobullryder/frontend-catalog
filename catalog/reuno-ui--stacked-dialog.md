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
stacked-dialog.tsx
"use client"

import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type Dispatch,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from "react"
import * as Portal from "@radix-ui/react-portal"

import { cn } from "@/lib/utils"

type DialogStackContextType = {
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  totalDialogs: number
  setTotalDialogs: Dispatch<SetStateAction<number>>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  clickable: boolean
}

const DialogStackContext = createContext<DialogStackContextType>({
  activeIndex: 0,
  setActiveIndex: () => {},
  totalDialogs: 0,
  setTotalDialogs: () => {},
  isOpen: false,
  setIsOpen: () => {},
  clickable: false,
})

type DialogStackChildProps = {
  index?: number
}

export const DialogStack = ({
  children,
  className,
  open = false,
  onOpenChange,
  clickable = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  open?: boolean
  clickable?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  return (
    <DialogStackContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        totalDialogs: 0,
        setTotalDialogs: () => {},
        isOpen,
        setIsOpen,
        clickable,
      }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </DialogStackContext.Provider>
  )
}

export const DialogStackTrigger = ({
  children,
  className,
  onClick,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackTrigger must be used within a DialogStack")
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    context.setIsOpen(true)
    onClick?.(e)
  }

  if (asChild && children) {
    return cloneElement(children as ReactElement, {
      onClick: handleClick,
      className: cn(className, (children as ReactElement).props.className),
      ...props,
    })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
        "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const DialogStackOverlay = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackOverlay must be used within a DialogStack")
  }

  if (!context.isOpen) {
    return null
  }

  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: "This is a clickable overlay"
    <div
      className={cn(
        "fixed inset-0 z-50  ",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      onClick={() => context.setIsOpen(false)}
      {...props}
    />
  )
}

export const DialogStackBody = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children:
    | ReactElement<DialogStackChildProps>[]
    | ReactElement<DialogStackChildProps>
}) => {
  const context = useContext(DialogStackContext)
  const [totalDialogs, setTotalDialogs] = useState(Children.count(children))

  if (!context) {
    throw new Error("DialogStackBody must be used within a DialogStack")
  }

  if (!context.isOpen) {
    return null
  }

  return (
    <DialogStackContext.Provider
      value={{
        ...context,
        totalDialogs,
        setTotalDialogs,
      }}
    >
      <Portal.Root>
        <div
          className={cn(
            "pointer-events-none fixed inset-0 z-50 mx-auto flex w-full max-w-lg flex-col items-center justify-center",
            className
          )}
          {...props}
        >
          <div className="pointer-events-auto relative flex w-full flex-col items-center justify-center">
            {Children.map(children, (child, index) =>
              cloneElement(child as ReactElement, { index })
            )}
          </div>
        </div>
      </Portal.Root>
    </DialogStackContext.Provider>
  )
}

export const DialogStackContent = ({
  children,
  className,
  index = 0,
  offset = 10,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  index?: number
  offset?: number
}) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackContent must be used within a DialogStack")
  }

  if (!context.isOpen) {
    return null
  }

  const handleClick = () => {
    if (context.clickable && context.activeIndex > index) {
      context.setActiveIndex(index ?? 0)
    }
  }

  const distanceFromActive = index - context.activeIndex
  const translateY =
    distanceFromActive < 0
      ? `-${Math.abs(distanceFromActive) * offset}px`
      : `${Math.abs(distanceFromActive) * offset}px`

  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: "This is a clickable dialog"
    <div
      onClick={handleClick}
      className={cn(
        "size-full rounded-[22px] border-2 border-black/5 dark:border-white/20 bg-background p-2 shadow-lg transition-all duration-300 ",
        className
      )}
      style={{
        top: 0,
        transform: `translateY(${translateY})`,
        width: `calc(100% - ${Math.abs(distanceFromActive) * 10}px)`,
        zIndex: 50 - Math.abs(context.activeIndex - (index ?? 0)),
        position: distanceFromActive ? "absolute" : "relative",
        opacity: distanceFromActive > 0 ? 0 : 1,
        cursor:
          context.clickable && context.activeIndex > index
            ? "pointer"
            : "default",
      }}
      {...props}
    >
      <div
        className={cn(
          "size-full rounded-[14px] border border-black/5  bg-neutral-800/10 dark:bg-white/5 p-4 shadow-sm transition-all duration-300",
          context.activeIndex !== index &&
            "pointer-events-none select-none opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export const DialogStackHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)

export const DialogStackFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-center justify-end space-x-2 pt-4", className)}
    {...props}
  >
    {children}
  </div>
)

export const DialogStackNext = ({
  children,
  className,
  asChild,
  ...props
}: {
  asChild?: boolean
} & HTMLAttributes<HTMLButtonElement>) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackNext must be used within a DialogStack")
  }

  const handleNext = () => {
    if (context.activeIndex < context.totalDialogs - 1) {
      context.setActiveIndex(context.activeIndex + 1)
    }
  }

  if (asChild && children) {
    return cloneElement(children as ReactElement, {
      onClick: handleNext,
      className: cn(className, (children as ReactElement).props.className),
      ...props,
    })
  }

  return (
    <button
      type="button"
      onClick={handleNext}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={context.activeIndex >= context.totalDialogs - 1}
      {...props}
    >
      {children || "Next"}
    </button>
  )
}

export const DialogStackPrevious = ({
  children,
  className,
  asChild,
  ...props
}: {
  children?: ReactNode
  className?: string
  asChild?: boolean
} & HTMLAttributes<HTMLButtonElement>) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackPrevious must be used within a DialogStack")
  }

  const handlePrevious = () => {
    if (context.activeIndex > 0) {
      context.setActiveIndex(context.activeIndex - 1)
    }
  }

  if (asChild && children) {
    return cloneElement(children as ReactElement, {
      onClick: handlePrevious,
      className: cn(className, (children as ReactElement).props.className),
      ...props,
    })
  }

  return (
    <button
      type="button"
      onClick={handlePrevious}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={context.activeIndex <= 0}
      {...props}
    >
      {children || "Previous"}
    </button>
  )
}


code.demo.1750556415133.tsx
import React from "react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"

import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackOverlay,
  DialogStackPrevious,
  DialogStackTrigger,
} from "@/components/ui/stacked-dialog"

const Icons = {
  arrow: (props: any) => (
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.98298 6.19679C7.90428 5.66488 7.90428 4.33509 6.98298 3.80318L1.00704 0.352971C0.516375 0.0696831 -0.00492265 0.671685 0.345598 1.11682V1.11682C2.13943 3.39485 2.13943 6.60512 0.345598 8.88315V8.88315C-0.00492251 9.32828 0.516376 9.93029 1.00704 9.647L6.98298 6.19679Z"
        fill="black"
      />
    </svg>
  ),
}

const StackedDialogDemo = () => {
  const items = [
    {
      title: "I'm the first dialog",
      description: "With a fancy description",
      content: <p></p>,
    },
    {
      title: "I'm the second dialog",
      description: "With a fancy description",
      content: <p></p>,
    },
    {
      title: "I'm the third dialog",
      description: "With a fancy description",
      content: <p></p>,
    },
    {
      title: "I'm the fourth dialog",
      description: "With a fancy description",
      content: <p></p>,
    },
    {
      title: "I'm the fifth dialog",
      description: "With a fancy description",
      content: <p></p>,
    },
  ]

  return (
    <div className="flex items-center justify-center">
      <DialogStack>
        {/* Trigger */}
        <DialogStackTrigger>
          Click to open &nbsp;{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="fill-white dark:fill-black"
          >
            <path d="M11.589 3a.75.75 0 0 0-1.5 0v1.978a.75.75 0 0 0 1.5 0zM5.983 4.945A.75.75 0 0 0 4.917 6l1.47 1.483A.75.75 0 1 0 7.452 6.43zM16.761 6a.75.75 0 0 0-1.065-1.055l-1.47 1.484a.75.75 0 1 0 1.065 1.055zM11.8 10.096c-1.025-.404-1.994.617-1.61 1.61l3.581 9.25c.41 1.058 1.901 1.059 2.311 0l1.374-3.543l3.508-1.385c1.048-.414 1.048-1.903 0-2.317zm-6.84.067H3a.75.75 0 0 0 0 1.5h1.96a.75.75 0 0 0 0-1.5m2.492 5.234a.75.75 0 0 0-1.065-1.056l-1.47 1.484a.75.75 0 1 0 1.066 1.056z" />
          </svg>{" "}
        </DialogStackTrigger>

        {/* Overlay */}
        <DialogStackOverlay className=" backdrop-blur-[2px] " />
        {/* Body */}

        <DialogStackBody>
          {items.map((item, index) => (
            <DialogStackContent key={index}>
              <DialogStackHeader className="mt-2 flex flex-row  items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://100x-wallet.gxuri.in/avatar.png"
                    alt="@gxuri"
                  />
                </Avatar>
                <div>
                  <h1 className="text-2xl font-semibold leading-none tracking-tight">
                    {item.title}
                  </h1>
                  <p className=" text-black/50 dark:text-white/50 ">
                    {item.description}
                  </p>
                </div>
              </DialogStackHeader>

              {/* content here */}
              <div className="h-[50px]">{item.content}</div>

              <DialogStackFooter>
                <DialogStackPrevious className="flex gap-3">
                  {" "}
                  <Icons.arrow className="rotate-180" /> Previous{" "}
                </DialogStackPrevious>
                <DialogStackNext className="flex gap-3 ">
                  {" "}
                  Next <Icons.arrow />{" "}
                </DialogStackNext>
              </DialogStackFooter>
            </DialogStackContent>
          ))}
        </DialogStackBody>
      </DialogStack>
    </div>
  )
}

export default StackedDialogDemo;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stacked-dialog.tsx
"use client"

import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type Dispatch,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from "react"
import * as Portal from "@radix-ui/react-portal"

import { cn } from "@/lib/utils"

type DialogStackContextType = {
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  totalDialogs: number
  setTotalDialogs: Dispatch<SetStateAction<number>>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  clickable: boolean
}

const DialogStackContext = createContext<DialogStackContextType>({
  activeIndex: 0,
  setActiveIndex: () => {},
  totalDialogs: 0,
  setTotalDialogs: () => {},
  isOpen: false,
  setIsOpen: () => {},
  clickable: false,
})

type DialogStackChildProps = {
  index?: number
}

export const DialogStack = ({
  children,
  className,
  open = false,
  onOpenChange,
  clickable = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  open?: boolean
  clickable?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  return (
    <DialogStackContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        totalDialogs: 0,
        setTotalDialogs: () => {},
        isOpen,
        setIsOpen,
        clickable,
      }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </DialogStackContext.Provider>
  )
}

export const DialogStackTrigger = ({
  children,
  className,
  onClick,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackTrigger must be used within a DialogStack")
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    context.setIsOpen(true)
    onClick?.(e)
  }

  if (asChild && children) {
    return cloneElement(children as ReactElement, {
      onClick: handleClick,
      className: cn(className, (children as ReactElement).props.className),
      ...props,
    })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
        "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const DialogStackOverlay = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackOverlay must be used within a DialogStack")
  }

  if (!context.isOpen) {
    return null
  }

  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: "This is a clickable overlay"
    <div
      className={cn(
        "fixed inset-0 z-50  ",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      onClick={() => context.setIsOpen(false)}
      {...props}
    />
  )
}

export const DialogStackBody = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children:
    | ReactElement<DialogStackChildProps>[]
    | ReactElement<DialogStackChildProps>
}) => {
  const context = useContext(DialogStackContext)
  const [totalDialogs, setTotalDialogs] = useState(Children.count(children))

  if (!context) {
    throw new Error("DialogStackBody must be used within a DialogStack")
  }

  if (!context.isOpen) {
    return null
  }

  return (
    <DialogStackContext.Provider
      value={{
        ...context,
        totalDialogs,
        setTotalDialogs,
      }}
    >
      <Portal.Root>
        <div
          className={cn(
            "pointer-events-none fixed inset-0 z-50 mx-auto flex w-full max-w-lg flex-col items-center justify-center",
            className
          )}
          {...props}
        >
          <div className="pointer-events-auto relative flex w-full flex-col items-center justify-center">
            {Children.map(children, (child, index) =>
              cloneElement(child as ReactElement, { index })
            )}
          </div>
        </div>
      </Portal.Root>
    </DialogStackContext.Provider>
  )
}

export const DialogStackContent = ({
  children,
  className,
  index = 0,
  offset = 10,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  index?: number
  offset?: number
}) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackContent must be used within a DialogStack")
  }

  if (!context.isOpen) {
    return null
  }

  const handleClick = () => {
    if (context.clickable && context.activeIndex > index) {
      context.setActiveIndex(index ?? 0)
    }
  }

  const distanceFromActive = index - context.activeIndex
  const translateY =
    distanceFromActive < 0
      ? `-${Math.abs(distanceFromActive) * offset}px`
      : `${Math.abs(distanceFromActive) * offset}px`

  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: "This is a clickable dialog"
    <div
      onClick={handleClick}
      className={cn(
        "size-full rounded-[22px] border-2 border-black/5 dark:border-white/20 bg-background p-2 shadow-lg transition-all duration-300 ",
        className
      )}
      style={{
        top: 0,
        transform: `translateY(${translateY})`,
        width: `calc(100% - ${Math.abs(distanceFromActive) * 10}px)`,
        zIndex: 50 - Math.abs(context.activeIndex - (index ?? 0)),
        position: distanceFromActive ? "absolute" : "relative",
        opacity: distanceFromActive > 0 ? 0 : 1,
        cursor:
          context.clickable && context.activeIndex > index
            ? "pointer"
            : "default",
      }}
      {...props}
    >
      <div
        className={cn(
          "size-full rounded-[14px] border border-black/5  bg-neutral-800/10 dark:bg-white/5 p-4 shadow-sm transition-all duration-300",
          context.activeIndex !== index &&
            "pointer-events-none select-none opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export const DialogStackHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)

export const DialogStackFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-center justify-end space-x-2 pt-4", className)}
    {...props}
  >
    {children}
  </div>
)

export const DialogStackNext = ({
  children,
  className,
  asChild,
  ...props
}: {
  asChild?: boolean
} & HTMLAttributes<HTMLButtonElement>) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackNext must be used within a DialogStack")
  }

  const handleNext = () => {
    if (context.activeIndex < context.totalDialogs - 1) {
      context.setActiveIndex(context.activeIndex + 1)
    }
  }

  if (asChild && children) {
    return cloneElement(children as ReactElement, {
      onClick: handleNext,
      className: cn(className, (children as ReactElement).props.className),
      ...props,
    })
  }

  return (
    <button
      type="button"
      onClick={handleNext}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={context.activeIndex >= context.totalDialogs - 1}
      {...props}
    >
      {children || "Next"}
    </button>
  )
}

export const DialogStackPrevious = ({
  children,
  className,
  asChild,
  ...props
}: {
  children?: ReactNode
  className?: string
  asChild?: boolean
} & HTMLAttributes<HTMLButtonElement>) => {
  const context = useContext(DialogStackContext)

  if (!context) {
    throw new Error("DialogStackPrevious must be used within a DialogStack")
  }

  const handlePrevious = () => {
    if (context.activeIndex > 0) {
      context.setActiveIndex(context.activeIndex - 1)
    }
  }

  if (asChild && children) {
    return cloneElement(children as ReactElement, {
      onClick: handlePrevious,
      className: cn(className, (children as ReactElement).props.className),
      ...props,
    })
  }

  return (
    <button
      type="button"
      onClick={handlePrevious}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      disabled={context.activeIndex <= 0}
      {...props}
    >
      {children || "Previous"}
    </button>
  )
}

```

Install NPM dependencies:
```bash
@radix-ui/react-portal
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
