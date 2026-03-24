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
swipe-row-1.tsx
"use client"

import React from "react"
import { HTMLMotionProps, motion, type PanInfo } from "motion/react"

import { cn } from "@/lib/utils"

type SwipeRowContextType = {
  dragX: number
  setDragX: React.Dispatch<React.SetStateAction<number>>
  actionRefLeft?: React.RefObject<HTMLDivElement | null>
  actionRefRight?: React.RefObject<HTMLDivElement | null>
  handleDrag: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  handleDragEnd: (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void
}

const DRAG_THRESHOLD = 100
const ACTIONS_VIEW_THRESHOLD = 50

const SwipeRowContext = React.createContext<SwipeRowContextType | null>(null)

export function useSwipeRowContext() {
  const ctx = React.useContext(SwipeRowContext)
  if (!ctx)
    throw new Error("Swipe Row components must be used inside <SwipeRow>")
  return ctx
}

export function SwipeRow({
  className,
  children,
}: React.ComponentProps<"div"> & SwipeRowProps) {
  const [dragX, setDragX] = React.useState<number>(0)

  const actionRefLeft = React.useRef<HTMLDivElement>(null)
  const actionRefRight = React.useRef<HTMLDivElement>(null)

  const handleDragEnd = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const absoluteOffset = Math.abs(info.offset.x)

      if (
        actionRefLeft.current &&
        absoluteOffset > DRAG_THRESHOLD &&
        info.offset.x > 0
      ) {
        setDragX(actionRefLeft.current.offsetWidth)
      } else if (
        actionRefRight.current &&
        absoluteOffset > DRAG_THRESHOLD &&
        info.offset.x < 0
      ) {
        setDragX(-actionRefRight.current.offsetWidth)
      } else {
        setDragX(0)
      }
    },
    [],
  )

  const handleDrag = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setDragX(info.offset.x)
    },
    [],
  )

  const contextValue = React.useMemo<SwipeRowContextType>(
    () => ({
      dragX,
      setDragX,
      actionRefLeft,
      actionRefRight,
      handleDrag,
      handleDragEnd,
    }),
    [dragX, setDragX, actionRefLeft, actionRefRight, handleDrag, handleDragEnd],
  )

  return (
    <SwipeRowContext.Provider value={contextValue}>
      <div
        role="group"
        aria-roledescription="swipe-row-list-item"
        aria-label="swipe-row-item"
        className={cn("relative overflow-hidden w-full", className)}
      >
        {children}
      </div>
    </SwipeRowContext.Provider>
  )
}

export function SwipeRowContent({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const { actionRefLeft, actionRefRight, dragX, handleDrag, handleDragEnd } =
    useSwipeRowContext()

  return (
    <motion.div
      aria-label="swipe-row-item-content"
      tabIndex={0}
      className={cn(
        "relative p-4 cursor-grab active:cursor-grabbing select-none",
        className,
      )}
      drag="x"
      dragConstraints={{
        left: actionRefLeft?.current
          ? -actionRefLeft?.current?.offsetWidth || 0
          : 0,
        right: actionRefRight ? actionRefRight.current?.offsetWidth : 0,
      }}
      dragElastic={0.1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={{ x: dragX }}
      transition={{ stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SwipeLeftActions({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const { actionRefLeft, dragX } = useSwipeRowContext()
  return (
    <motion.div
      role="region"
      aria-label="left-actions"
      ref={actionRefLeft}
      className={cn(
        "absolute left-0 top-0 h-full flex items-center",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{
        opacity: dragX > ACTIONS_VIEW_THRESHOLD && actionRefLeft ? 1 : 0,
        x:
          dragX > 0 && actionRefLeft
            ? 0
            : -(actionRefLeft?.current?.offsetWidth || 0),
      }}
      transition={{ stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SwipeRightActions({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const { actionRefRight, dragX } = useSwipeRowContext()
  return (
    <motion.div
      role="region"
      aria-label="right-actions"
      ref={actionRefRight}
      className={cn(
        "absolute right-0 top-0 h-full flex items-center",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{
        opacity: dragX < -ACTIONS_VIEW_THRESHOLD && actionRefRight ? 1 : 0,
        x:
          dragX < 0 && actionRefRight
            ? 0
            : actionRefRight?.current?.offsetWidth || 0,
      }}
      transition={{ stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}


code.demo.1754980888612.tsx
import { Heart, Trash } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button} from "@/components/ui/button"
import {
  SwipeLeftActions,
  SwipeRightActions,
  SwipeRow,
  SwipeRowContent,
} from "@/components/ui/swipe-row-1"

const dummyListData = [
  {
    id: 1,
    name: "Ava Mitchell",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    fallback: "AM",
  },
  {
    id: 2,
    name: "Liam Patel",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    fallback: "LP",
  },
  {
    id: 3,
    name: "Sophia Nguyen",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    fallback: "SN",
  },
]

export default function SwipeRowListDemo() {
  return (
    <div className="mx-8 w-full md:w-2/3 rounded-md overflow-hidden divide-y divide-input bg-muted ">
      {dummyListData.map((item) => (
        <SwipeRow key={item.id}>
          <SwipeLeftActions>
            <LeftActions />
          </SwipeLeftActions>
          <SwipeRowContent>
            <div className="flex items-center gap-4">
              <div>
                <Avatar>
                  <AvatarImage src={item.avatar} alt={item.fallback} />
                  <AvatarFallback>{item.fallback}</AvatarFallback>
                </Avatar>
              </div>
              <div className='mr-auto'>
                <h3>{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Swipe to see actions
                </p>
              </div>
              <div>
              <Button>
                <a href='https://moleculeui.design' target='_blank'>Know More</a>
              </Button>
            </div>
            </div>
            
          </SwipeRowContent>
          <SwipeRightActions>
            <RightActions />
          </SwipeRightActions>
        </SwipeRow>
      ))}
    </div>
  )
}

function LeftActions() {
  return (
    <>
      <button className="h-full px-6 bg-blue-500 text-white flex items-center justify-center transition-colors">
        <Heart size={20} />
      </button>{" "}
    </>
  )
}

function RightActions() {
  return (
    <>
      <button className="h-full px-6 bg-red-500 text-white flex items-center justify-center transition-colors">
        <Trash size={20} />
      </button>
    </>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/swipe-row-1.tsx
"use client"

import React from "react"
import { HTMLMotionProps, motion, type PanInfo } from "motion/react"

import { cn } from "@/lib/utils"

type SwipeRowContextType = {
  dragX: number
  setDragX: React.Dispatch<React.SetStateAction<number>>
  actionRefLeft?: React.RefObject<HTMLDivElement | null>
  actionRefRight?: React.RefObject<HTMLDivElement | null>
  handleDrag: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  handleDragEnd: (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void
}

const DRAG_THRESHOLD = 100
const ACTIONS_VIEW_THRESHOLD = 50

const SwipeRowContext = React.createContext<SwipeRowContextType | null>(null)

export function useSwipeRowContext() {
  const ctx = React.useContext(SwipeRowContext)
  if (!ctx)
    throw new Error("Swipe Row components must be used inside <SwipeRow>")
  return ctx
}

export function SwipeRow({
  className,
  children,
}: React.ComponentProps<"div"> & SwipeRowProps) {
  const [dragX, setDragX] = React.useState<number>(0)

  const actionRefLeft = React.useRef<HTMLDivElement>(null)
  const actionRefRight = React.useRef<HTMLDivElement>(null)

  const handleDragEnd = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const absoluteOffset = Math.abs(info.offset.x)

      if (
        actionRefLeft.current &&
        absoluteOffset > DRAG_THRESHOLD &&
        info.offset.x > 0
      ) {
        setDragX(actionRefLeft.current.offsetWidth)
      } else if (
        actionRefRight.current &&
        absoluteOffset > DRAG_THRESHOLD &&
        info.offset.x < 0
      ) {
        setDragX(-actionRefRight.current.offsetWidth)
      } else {
        setDragX(0)
      }
    },
    [],
  )

  const handleDrag = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setDragX(info.offset.x)
    },
    [],
  )

  const contextValue = React.useMemo<SwipeRowContextType>(
    () => ({
      dragX,
      setDragX,
      actionRefLeft,
      actionRefRight,
      handleDrag,
      handleDragEnd,
    }),
    [dragX, setDragX, actionRefLeft, actionRefRight, handleDrag, handleDragEnd],
  )

  return (
    <SwipeRowContext.Provider value={contextValue}>
      <div
        role="group"
        aria-roledescription="swipe-row-list-item"
        aria-label="swipe-row-item"
        className={cn("relative overflow-hidden w-full", className)}
      >
        {children}
      </div>
    </SwipeRowContext.Provider>
  )
}

export function SwipeRowContent({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const { actionRefLeft, actionRefRight, dragX, handleDrag, handleDragEnd } =
    useSwipeRowContext()

  return (
    <motion.div
      aria-label="swipe-row-item-content"
      tabIndex={0}
      className={cn(
        "relative p-4 cursor-grab active:cursor-grabbing select-none",
        className,
      )}
      drag="x"
      dragConstraints={{
        left: actionRefLeft?.current
          ? -actionRefLeft?.current?.offsetWidth || 0
          : 0,
        right: actionRefRight ? actionRefRight.current?.offsetWidth : 0,
      }}
      dragElastic={0.1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={{ x: dragX }}
      transition={{ stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SwipeLeftActions({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const { actionRefLeft, dragX } = useSwipeRowContext()
  return (
    <motion.div
      role="region"
      aria-label="left-actions"
      ref={actionRefLeft}
      className={cn(
        "absolute left-0 top-0 h-full flex items-center",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{
        opacity: dragX > ACTIONS_VIEW_THRESHOLD && actionRefLeft ? 1 : 0,
        x:
          dragX > 0 && actionRefLeft
            ? 0
            : -(actionRefLeft?.current?.offsetWidth || 0),
      }}
      transition={{ stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SwipeRightActions({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  const { actionRefRight, dragX } = useSwipeRowContext()
  return (
    <motion.div
      role="region"
      aria-label="right-actions"
      ref={actionRefRight}
      className={cn(
        "absolute right-0 top-0 h-full flex items-center",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{
        opacity: dragX < -ACTIONS_VIEW_THRESHOLD && actionRefRight ? 1 : 0,
        x:
          dragX < 0 && actionRefRight
            ? 0
            : actionRefRight?.current?.offsetWidth || 0,
      }}
      transition={{ stiffness: 300 }}
      {...props}
    >
      {children}
    </motion.div>
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
