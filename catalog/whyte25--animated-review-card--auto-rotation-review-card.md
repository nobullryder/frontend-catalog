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
animated-review-card.tsx
"use client"

import { useEffect, useState } from "react"
import { cva } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BorderBeam } from "@/components/ui/border-beam"

interface Review {
  id: number | string
  name: string
  avatar: string
  text: string
  rating: number
}

type ThemeColor = "default" | "primary" | "elegant" | "vibrant" | "minimal"

interface AnimatedReviewCardsProps {
  reviews?: Review[]
  interactionType?: "drag" | "click"
  animationDuration?: number
  scaleStep?: number
  verticalSpacing?: number
  horizontalSpacing?: number
  autoRotate?: boolean
  rotateInterval?: number
  theme?: ThemeColor
  showBorderBeam?: boolean
  classNames?: {
    container?: string
    card?: string
    cardContent?: string
    header?: string
    avatar?: string
    name?: string
    text?: string
    rating?: string
    star?: string
    activeStarColor?: string
    inactiveStarColor?: string
  }
}

const cardVariants = cva(
  "absolute h-[300px] w-[300px] overflow-hidden rounded-lg bg-background sm:w-[350px] md:h-[250px] md:w-[550px]",
  {
    variants: {
      theme: {
        default: "border border-border bg-background",
        primary: "bg-primary-50 border border-primary/20",
        elegant:
          "border border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
        vibrant:
          "border border-fuchsia-400 bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white dark:border-fuchsia-700 dark:from-fuchsia-600 dark:to-pink-600",
        minimal:
          "border border-gray-100 bg-gray-50 text-gray-900 dark:border-gray-900 dark:bg-gray-950 dark:text-gray-100",
      },
      cursor: {
        drag: "cursor-grab active:cursor-grabbing",
        click: "cursor-pointer",
      },
    },
  }
)

const nameVariants = cva("text-lg font-semibold", {
  variants: {
    theme: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      elegant: "text-zinc-900 dark:text-zinc-100",
      vibrant: "text-white",
      minimal: "text-gray-900 dark:text-gray-100",
    },
  },
})

const textVariants = cva("select-none text-start text-sm", {
  variants: {
    theme: {
      default: "text-foreground",
      primary: "text-primary/80",
      elegant: "text-zinc-600 dark:text-zinc-300",
      vibrant: "text-white/90",
      minimal: "text-gray-600 dark:text-gray-400",
    },
  },
})

const starColorVariants = {
  default: {
    active: "text-yellow-400 fill-current",
    inactive: "text-muted stroke-muted-foreground/20",
  },
  primary: {
    active: "text-primary",
    inactive: "text-primary/20",
  },
  elegant: {
    active: "text-zinc-700 dark:text-zinc-300 fill-current",
    inactive: "text-zinc-300 dark:text-zinc-600",
  },
  vibrant: {
    active: "text-white fill-current",
    inactive: "text-white/40",
  },
  minimal: {
    active: "text-gray-900 dark:text-gray-100 fill-current",
    inactive: "text-gray-200 dark:text-gray-700",
  },
}

export const AnimatedReviewCards = ({
  reviews: initialReviewsProp = [],
  interactionType = "drag",
  animationDuration = 0.3,
  scaleStep = 0.05,
  verticalSpacing = 10,
  horizontalSpacing = 20,
  autoRotate = true,
  rotateInterval = 6000,
  theme = "default",
  showBorderBeam = true,
  classNames,
}: AnimatedReviewCardsProps) => {
  const starColors = starColorVariants[theme]
  const [reviews, setReviews] = useState(initialReviewsProp)
  const [isInteracting, setIsInteracting] = useState(false)

  // Inline isMobile (no external hook)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return

    const mql = window.matchMedia("(max-width: 640px)")
    const update = () => setIsMobile(mql.matches)

    // init + subscribe
    update()
    mql.addEventListener?.("change", update)
    // Fallback for older browsers
    // @ts-expect-error older Safari
    mql.addListener?.(update)

    return () => {
      mql.removeEventListener?.("change", update)
      // @ts-expect-error older Safari
      mql.removeListener?.(update)
    }
  }, [])

  const handleInteraction = (index: number) => {
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews]
      const [removed] = newReviews.splice(index, 1)
      newReviews.push(removed)
      return newReviews
    })
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (autoRotate && !isInteracting) {
      intervalId = setInterval(() => {
        handleInteraction(0)
      }, rotateInterval)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [autoRotate, rotateInterval, isInteracting])

  return (
    <div
      className={cn(
        "not-prose relative flex h-[400px] w-full items-center justify-center md:h-[350px]",
        classNames?.container
      )}
    >
      <AnimatePresence>
        {reviews.map((review, index) => (
          <motion.div
            key={review?.id}
            initial={{ scale: 0.8, y: 100, opacity: 0 }}
            animate={{
              scale: 1 + index * scaleStep,
              y: index * -verticalSpacing,
              x: !isMobile ? index * horizontalSpacing : undefined,
              opacity: index === reviews?.length - 1 ? 0.7 : 1,
              zIndex: reviews.length - index,
            }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ duration: animationDuration }}
            drag={interactionType === "drag" ? "y" : false}
            dragConstraints={interactionType === "drag" ? { top: 0, bottom: 0 } : undefined}
            onDragStart={() => setIsInteracting(true)}
            onDragEnd={() => {
              setIsInteracting(false)
              interactionType === "drag" && handleInteraction(index)
            }}
            onClick={() => {
              if (interactionType === "click") {
                setIsInteracting(true)
                handleInteraction(index)
                setTimeout(() => setIsInteracting(false), 300)
              }
            }}
            title={interactionType === "drag" ? "Drag me" : "Click me"}
            className={cardVariants({
              theme,
              cursor: interactionType,
              className: classNames?.card,
            })}
          >
            <div className={cn("relative h-full w-full rounded-lg p-6", classNames?.cardContent)}>
              <div className={cn("mb-4 flex items-center", classNames?.header)}>
                <Avatar className={cn("mr-4 h-10 w-10", classNames?.avatar)}>
                  <AvatarImage src={review?.avatar} alt={review?.name} />
                  <AvatarFallback>{review?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className={nameVariants({ theme, className: classNames?.name })}>
                  {review?.name}
                </h2>
              </div>

              <p className={textVariants({ theme, className: classNames?.text })}>
                {review?.text}
              </p>

              <div className={cn("absolute bottom-6 flex items-center", classNames?.rating)}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < review?.rating
                        ? classNames?.activeStarColor || starColors.active
                        : classNames?.inactiveStarColor || starColors.inactive,
                      classNames?.star
                    )}
                  />
                ))}
              </div>

              {index === 0 && showBorderBeam && (
                <BorderBeam
                  size={250}
                  colorFrom={theme === "vibrant" ? "#ffffff" : undefined}
                  colorTo={theme === "vibrant" ? "#ffffff" : undefined}
                  duration={12}
                  delay={9}
                />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}


code.demo.1756781837437.tsx
"use client"
 
import { useState } from "react"
 
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
import { AnimatedReviewCards } from "@/components/ui/animated-review-card"
 
export const initialReviews = [
  {
    id: 1,
    name: "James Bryan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    text: "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.",
    rating: 5,
  },
  {
    id: 2,
    name: "Keith Johnson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 3,
  },
  {
    id: 3,
    name: "Mark Sloan",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 4,
  },
]
 
export default function AnimatedReviewCardsAutoRotateDemo() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotateInterval, setRotateInterval] = useState(3000)
  const [showBorderBeam, setShowBorderBeam] = useState(true)
 
  return (
    <div className="not-prose flex w-full flex-col justify-center space-y-8">
      <div className="mx-10 mb-8 flex flex-wrap gap-4">
        <Button
          variant={autoRotate ? "default" : "outline"}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? "Auto-Rotate: ON" : "Auto-Rotate: OFF"}
        </Button>
 
        <div className="flex items-center gap-2">
          <span className="text-sm">Interval:</span>
          <Select
            value={rotateInterval.toString()}
            onValueChange={(value) => setRotateInterval(Number(value))}
            disabled={!autoRotate}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000">1 second</SelectItem>
              <SelectItem value="3000">3 seconds</SelectItem>
              <SelectItem value="5000">5 seconds</SelectItem>
              <SelectItem value="8000">8 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant={showBorderBeam ? "default" : "outline"}
          onClick={() => setShowBorderBeam(!showBorderBeam)}
        >
          {showBorderBeam ? "Border Beam: ON" : "Border Beam: OFF"}
        </Button>
      </div>
 
      <AnimatedReviewCards
        reviews={initialReviews}
        autoRotate={autoRotate}
        rotateInterval={rotateInterval}
        theme="default"
        showBorderBeam={showBorderBeam}
      />
    </div>
  )
}
 
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/animated-review-card.tsx
"use client"

import { useEffect, useState } from "react"
import { cva } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BorderBeam } from "@/components/ui/border-beam"

interface Review {
  id: number | string
  name: string
  avatar: string
  text: string
  rating: number
}

type ThemeColor = "default" | "primary" | "elegant" | "vibrant" | "minimal"

interface AnimatedReviewCardsProps {
  reviews?: Review[]
  interactionType?: "drag" | "click"
  animationDuration?: number
  scaleStep?: number
  verticalSpacing?: number
  horizontalSpacing?: number
  autoRotate?: boolean
  rotateInterval?: number
  theme?: ThemeColor
  showBorderBeam?: boolean
  classNames?: {
    container?: string
    card?: string
    cardContent?: string
    header?: string
    avatar?: string
    name?: string
    text?: string
    rating?: string
    star?: string
    activeStarColor?: string
    inactiveStarColor?: string
  }
}

const cardVariants = cva(
  "absolute h-[300px] w-[300px] overflow-hidden rounded-lg bg-background sm:w-[350px] md:h-[250px] md:w-[550px]",
  {
    variants: {
      theme: {
        default: "border border-border bg-background",
        primary: "bg-primary-50 border border-primary/20",
        elegant:
          "border border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
        vibrant:
          "border border-fuchsia-400 bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white dark:border-fuchsia-700 dark:from-fuchsia-600 dark:to-pink-600",
        minimal:
          "border border-gray-100 bg-gray-50 text-gray-900 dark:border-gray-900 dark:bg-gray-950 dark:text-gray-100",
      },
      cursor: {
        drag: "cursor-grab active:cursor-grabbing",
        click: "cursor-pointer",
      },
    },
  }
)

const nameVariants = cva("text-lg font-semibold", {
  variants: {
    theme: {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      elegant: "text-zinc-900 dark:text-zinc-100",
      vibrant: "text-white",
      minimal: "text-gray-900 dark:text-gray-100",
    },
  },
})

const textVariants = cva("select-none text-start text-sm", {
  variants: {
    theme: {
      default: "text-foreground",
      primary: "text-primary/80",
      elegant: "text-zinc-600 dark:text-zinc-300",
      vibrant: "text-white/90",
      minimal: "text-gray-600 dark:text-gray-400",
    },
  },
})

const starColorVariants = {
  default: {
    active: "text-yellow-400 fill-current",
    inactive: "text-muted stroke-muted-foreground/20",
  },
  primary: {
    active: "text-primary",
    inactive: "text-primary/20",
  },
  elegant: {
    active: "text-zinc-700 dark:text-zinc-300 fill-current",
    inactive: "text-zinc-300 dark:text-zinc-600",
  },
  vibrant: {
    active: "text-white fill-current",
    inactive: "text-white/40",
  },
  minimal: {
    active: "text-gray-900 dark:text-gray-100 fill-current",
    inactive: "text-gray-200 dark:text-gray-700",
  },
}

export const AnimatedReviewCards = ({
  reviews: initialReviewsProp = [],
  interactionType = "drag",
  animationDuration = 0.3,
  scaleStep = 0.05,
  verticalSpacing = 10,
  horizontalSpacing = 20,
  autoRotate = true,
  rotateInterval = 6000,
  theme = "default",
  showBorderBeam = true,
  classNames,
}: AnimatedReviewCardsProps) => {
  const starColors = starColorVariants[theme]
  const [reviews, setReviews] = useState(initialReviewsProp)
  const [isInteracting, setIsInteracting] = useState(false)

  // Inline isMobile (no external hook)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return

    const mql = window.matchMedia("(max-width: 640px)")
    const update = () => setIsMobile(mql.matches)

    // init + subscribe
    update()
    mql.addEventListener?.("change", update)
    // Fallback for older browsers
    // @ts-expect-error older Safari
    mql.addListener?.(update)

    return () => {
      mql.removeEventListener?.("change", update)
      // @ts-expect-error older Safari
      mql.removeListener?.(update)
    }
  }, [])

  const handleInteraction = (index: number) => {
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews]
      const [removed] = newReviews.splice(index, 1)
      newReviews.push(removed)
      return newReviews
    })
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (autoRotate && !isInteracting) {
      intervalId = setInterval(() => {
        handleInteraction(0)
      }, rotateInterval)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [autoRotate, rotateInterval, isInteracting])

  return (
    <div
      className={cn(
        "not-prose relative flex h-[400px] w-full items-center justify-center md:h-[350px]",
        classNames?.container
      )}
    >
      <AnimatePresence>
        {reviews.map((review, index) => (
          <motion.div
            key={review?.id}
            initial={{ scale: 0.8, y: 100, opacity: 0 }}
            animate={{
              scale: 1 + index * scaleStep,
              y: index * -verticalSpacing,
              x: !isMobile ? index * horizontalSpacing : undefined,
              opacity: index === reviews?.length - 1 ? 0.7 : 1,
              zIndex: reviews.length - index,
            }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ duration: animationDuration }}
            drag={interactionType === "drag" ? "y" : false}
            dragConstraints={interactionType === "drag" ? { top: 0, bottom: 0 } : undefined}
            onDragStart={() => setIsInteracting(true)}
            onDragEnd={() => {
              setIsInteracting(false)
              interactionType === "drag" && handleInteraction(index)
            }}
            onClick={() => {
              if (interactionType === "click") {
                setIsInteracting(true)
                handleInteraction(index)
                setTimeout(() => setIsInteracting(false), 300)
              }
            }}
            title={interactionType === "drag" ? "Drag me" : "Click me"}
            className={cardVariants({
              theme,
              cursor: interactionType,
              className: classNames?.card,
            })}
          >
            <div className={cn("relative h-full w-full rounded-lg p-6", classNames?.cardContent)}>
              <div className={cn("mb-4 flex items-center", classNames?.header)}>
                <Avatar className={cn("mr-4 h-10 w-10", classNames?.avatar)}>
                  <AvatarImage src={review?.avatar} alt={review?.name} />
                  <AvatarFallback>{review?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className={nameVariants({ theme, className: classNames?.name })}>
                  {review?.name}
                </h2>
              </div>

              <p className={textVariants({ theme, className: classNames?.text })}>
                {review?.text}
              </p>

              <div className={cn("absolute bottom-6 flex items-center", classNames?.rating)}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < review?.rating
                        ? classNames?.activeStarColor || starColors.active
                        : classNames?.inactiveStarColor || starColors.inactive,
                      classNames?.star
                    )}
                  />
                ))}
              </div>

              {index === 0 && showBorderBeam && (
                <BorderBeam
                  size={250}
                  colorFrom={theme === "vibrant" ? "#ffffff" : undefined}
                  colorTo={theme === "vibrant" ? "#ffffff" : undefined}
                  duration={12}
                  delay={9}
                />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

```

Install NPM dependencies:
```bash
class-variance-authority, framer-motion, lucide-react
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
