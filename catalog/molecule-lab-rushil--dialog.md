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
dialog.tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

type DialogContextType = {
  open: boolean
  animated: boolean
}

const DialogContext = React.createContext<DialogContextType | undefined>(
  undefined,
)

const useDialog = (): DialogContextType => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a Dialog")
  }
  return context
}

function Dialog({
  children,
  open: openProp,
  onOpenChange: setOpenProp,
  animated = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & { animated?: boolean }) {
  const [_open, _setOpen] = React.useState(false)

  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value

      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
    },
    [setOpenProp, open],
  )

  const contextValue = React.useMemo<DialogContextType>(
    () => ({ open, animated }),
    [open, animated],
  )

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogPrimitive.Root
        data-slot="dialog"
        {...props}
        onOpenChange={setOpen}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  )
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  animated = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  animated?: boolean
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className,
      )}
      asChild
      {...props}
    >
      <motion.div
        key="dialog-overlay"
        initial={animated ? { opacity: 0, filter: "blur(4px)" } : {}}
        animate={animated ? { opacity: 1, filter: "blur(0px)" } : {}}
        exit={animated ? { opacity: 0, filter: "blur(4px)" } : {}}
        transition={animated ? { duration: 0.2, ease: "easeInOut" } : {}}
      />
    </DialogPrimitive.Overlay>
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  const { open, animated } = useDialog()

  return (
    <AnimatePresence>
      {open && (
        <DialogPortal forceMount data-slot="dialog-portal">
          <DialogOverlay animated={animated} />
          <DialogPrimitive.Content asChild forceMount {...props}>
            <motion.div
              key="dialog-content"
              data-slot="dialog-content"
              initial={
                animated
                  ? {
                      opacity: 0,
                      filter: "blur(4px)",
                      transform: `perspective(500px) rotateY(30deg) scale(0.8)`,
                    }
                  : {}
              }
              animate={
                animated
                  ? {
                      opacity: 1,
                      filter: "blur(0px)",
                      transform: `perspective(500px) rotateY(0deg) scale(1)`,
                    }
                  : {}
              }
              exit={
                animated
                  ? {
                      opacity: 0,
                      filter: "blur(4px)",
                      transform: `perspective(500px) rotateY(30deg) scale(0.8)`,
                    }
                  : {}
              }
              className={cn(
                "bg-primary-foreground fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border p-4",
                className,
              )}
              transition={
                animated ? { type: "spring", stiffness: 150, damping: 25 } : {}
              }
            >
              {children}
              {showCloseButton && (
                <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "mb-2.5 leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}


code.demo.1756056464810.tsx
import {  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from "@/components/ui/dialog";

import {Button} from '@/components/ui/button'

export default function DemoOne() {
  return <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dialog.tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

type DialogContextType = {
  open: boolean
  animated: boolean
}

const DialogContext = React.createContext<DialogContextType | undefined>(
  undefined,
)

const useDialog = (): DialogContextType => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a Dialog")
  }
  return context
}

function Dialog({
  children,
  open: openProp,
  onOpenChange: setOpenProp,
  animated = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & { animated?: boolean }) {
  const [_open, _setOpen] = React.useState(false)

  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value

      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
    },
    [setOpenProp, open],
  )

  const contextValue = React.useMemo<DialogContextType>(
    () => ({ open, animated }),
    [open, animated],
  )

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogPrimitive.Root
        data-slot="dialog"
        {...props}
        onOpenChange={setOpen}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  )
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  animated = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  animated?: boolean
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className,
      )}
      asChild
      {...props}
    >
      <motion.div
        key="dialog-overlay"
        initial={animated ? { opacity: 0, filter: "blur(4px)" } : {}}
        animate={animated ? { opacity: 1, filter: "blur(0px)" } : {}}
        exit={animated ? { opacity: 0, filter: "blur(4px)" } : {}}
        transition={animated ? { duration: 0.2, ease: "easeInOut" } : {}}
      />
    </DialogPrimitive.Overlay>
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  const { open, animated } = useDialog()

  return (
    <AnimatePresence>
      {open && (
        <DialogPortal forceMount data-slot="dialog-portal">
          <DialogOverlay animated={animated} />
          <DialogPrimitive.Content asChild forceMount {...props}>
            <motion.div
              key="dialog-content"
              data-slot="dialog-content"
              initial={
                animated
                  ? {
                      opacity: 0,
                      filter: "blur(4px)",
                      transform: `perspective(500px) rotateY(30deg) scale(0.8)`,
                    }
                  : {}
              }
              animate={
                animated
                  ? {
                      opacity: 1,
                      filter: "blur(0px)",
                      transform: `perspective(500px) rotateY(0deg) scale(1)`,
                    }
                  : {}
              }
              exit={
                animated
                  ? {
                      opacity: 0,
                      filter: "blur(4px)",
                      transform: `perspective(500px) rotateY(30deg) scale(0.8)`,
                    }
                  : {}
              }
              className={cn(
                "bg-primary-foreground fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border p-4",
                className,
              )}
              transition={
                animated ? { type: "spring", stiffness: 150, damping: 25 } : {}
              }
            >
              {children}
              {showCloseButton && (
                <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "mb-2.5 leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

Install NPM dependencies:
```bash
@radix-ui/react-dialog, lucide-react, motion
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
