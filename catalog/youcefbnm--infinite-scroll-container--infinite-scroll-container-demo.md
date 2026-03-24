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
infinite-scroll-container.tsx
"use client"
import * as React from "react"
import { motion, useInView } from "motion/react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

function Spinner() {
  return (
    <div className="inline-block size-6 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
  )
}
interface InfiniteScrollCellProps extends React.PropsWithChildren {
  isPending: boolean
  className?: string
}
export function InifniteScrollContainerCell ({
  isPending,
  children,
  className,
}: InfiniteScrollCellProps) {
    const revealRef = React.useRef<HTMLDivElement | null>(null)

  const isInView = useInView(revealRef, {
    once: true,
    amount: 0.3,
  })

  return (
     <div className={cn("relative", className)}>
      {isPending || !isInView ? (
        <motion.div
          initial="visible"
          animate={
            !isInView || isPending
              ? { opacity: 1, display: "block" }
              : { opacity: 0, display: "none" }
          }
        >
          <div className=" space-y-5 p-4">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-48 w-full" />
          </div>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {children}
        </motion.div>
      )}
      <div ref={revealRef} />
    </div>
  )
}

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  items: unknown[]
  isPending: boolean
  itemsCount: number | null | undefined
  loadMore: () => void
  className?: string
}
export function InfiniteScrollContainer({items,
  isPending,
  itemsCount,
  loadMore,
  children,
  className,}:InfiniteScrollContainerProps) {
  const observerRef = React.useRef<HTMLDivElement | null>(null)
  const allLoaded = items.length === itemsCount
  const hasMore = isPending && !allLoaded && items.length > 0
  React.useEffect(() => {
    const { current } = observerRef
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allLoaded && items.length > 0) {
          loadMore()
        }
      },
      { threshold: 1 }
    )

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  })

  return (
    <div className={className}>
      {children}
      {hasMore && <Spinner />}
      {items.length > 0 && itemsCount && items.length < itemsCount && (
        <div ref={observerRef} />
      )}
    </div>
  )
}

code.demo.tsx
"use client"

import * as React from "react"


import {InfiniteScrollContainer,InifniteScrollContainerCell} from "@/components/ui/infinite-scroll-container"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
interface Post {
  id: number
  userId: number
  title: string
  body: string
}

const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
const LIMIT = 10

export function InfiniteScrollContainerDemo() {
    const [posts, setPosts] = React.useState<Post[]>([])
  const [page, setPage] = React.useState<number>(0)
  const [totalCount, setTotalCount] = React.useState<number | null>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function fetchData() {
    setIsLoading(true)
    const start = page * LIMIT
    try {
      const response = await fetch(
        `${BASE_URL}?_start=${start}&_limit=${LIMIT}`
      )
      const totalItems = response.headers.get("x-total-count")
      const data = await response.json()

      setTotalCount(Number(totalItems))
      setPosts((prevPosts) => [...prevPosts, ...data])
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])


  return (
    <InfiniteScrollContainer
      items={posts}
      isPending={isLoading}
      itemsCount={totalCount}
      loadMore={fetchData}
      className="container mx-auto grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 p-12"
    >
      {posts.map((post, index) => (
        <InifniteScrollContainerCell isPending={isLoading} key={`${post.id}-${index}`}>
          <Card>
            <CardHeader>
              <CardTitle className="text-muted">#{post.id}</CardTitle>
              <CardDescription>{post.title}</CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-foreground">
              <p>{post.body}</p>
            </CardContent>
          </Card>
        </InifniteScrollContainerCell>
      ))}
    </InfiniteScrollContainer>
  )
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/infinite-scroll-container.tsx
"use client"
import * as React from "react"
import { motion, useInView } from "motion/react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

function Spinner() {
  return (
    <div className="inline-block size-6 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
  )
}
interface InfiniteScrollCellProps extends React.PropsWithChildren {
  isPending: boolean
  className?: string
}
export function InifniteScrollContainerCell ({
  isPending,
  children,
  className,
}: InfiniteScrollCellProps) {
    const revealRef = React.useRef<HTMLDivElement | null>(null)

  const isInView = useInView(revealRef, {
    once: true,
    amount: 0.3,
  })

  return (
     <div className={cn("relative", className)}>
      {isPending || !isInView ? (
        <motion.div
          initial="visible"
          animate={
            !isInView || isPending
              ? { opacity: 1, display: "block" }
              : { opacity: 0, display: "none" }
          }
        >
          <div className=" space-y-5 p-4">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-48 w-full" />
          </div>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {children}
        </motion.div>
      )}
      <div ref={revealRef} />
    </div>
  )
}

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  items: unknown[]
  isPending: boolean
  itemsCount: number | null | undefined
  loadMore: () => void
  className?: string
}
export function InfiniteScrollContainer({items,
  isPending,
  itemsCount,
  loadMore,
  children,
  className,}:InfiniteScrollContainerProps) {
  const observerRef = React.useRef<HTMLDivElement | null>(null)
  const allLoaded = items.length === itemsCount
  const hasMore = isPending && !allLoaded && items.length > 0
  React.useEffect(() => {
    const { current } = observerRef
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allLoaded && items.length > 0) {
          loadMore()
        }
      },
      { threshold: 1 }
    )

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  })

  return (
    <div className={className}>
      {children}
      {hasMore && <Spinner />}
      {items.length > 0 && itemsCount && items.length < itemsCount && (
        <div ref={observerRef} />
      )}
    </div>
  )
}
```
```tsx
/components/ui/skeleton.tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

```
```tsx
/components/ui/card.tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

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
