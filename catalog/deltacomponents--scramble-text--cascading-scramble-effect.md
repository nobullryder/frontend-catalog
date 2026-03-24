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
scramble-text.tsx
"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { useScramble } from "use-scramble"

import { cn } from "@/lib/utils"

interface ScrambleTextProps {
  /** The text that will be scrambled and displayed */
  text: string
  /** Speed of the scrambling effect (higher is faster) */
  speed?: number
  /** Optional custom CSS class for the container */
  className?: string
  /** Whether to start the animation automatically when mounted */
  autoStart?: boolean
  /** Callback function when animation completes */
  onComplete?: () => void
  /** Whether to use intersection observer to trigger animation when visible */
  useIntersectionObserver?: boolean
  /** Whether to retrigger animation when element comes into view again */
  retriggerOnIntersection?: boolean
  /** Threshold for intersection observer (0-1) */
  intersectionThreshold?: number
  /** Root margin for intersection observer */
  intersectionRootMargin?: string
  /** Whether to scramble text on hover */
  scrambleOnHover?: boolean
}

export interface ScrambleTextHandle {
  start: () => void
  reset: () => void
}

const ScrambleText = forwardRef<ScrambleTextHandle, ScrambleTextProps>(
  (
    {
      text,
      speed = 80,
      className = "",
      autoStart = true,
      onComplete,
      useIntersectionObserver = false,
      retriggerOnIntersection = false,
      intersectionThreshold = 0.3,
      intersectionRootMargin = "0px",
      scrambleOnHover = false,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const hasCompletedOnce = useRef(false)

    const { ref: scrambleRef, replay } = useScramble({
      text,
      speed: speed / 100, // Convert to 0-1 range
      tick: 2,
      step: 1,
      range: [65, 125], // Use default range (A-Z, a-z, and some special chars)
      scramble: 2,
      playOnMount: autoStart && !useIntersectionObserver,
      onAnimationEnd: () => {
        hasCompletedOnce.current = true
        onComplete?.()
      },
      overdrive: false, // Disable underscore characters
    })

    useImperativeHandle(ref, () => ({
      start: () => replay(),
      reset: () => {
        // Reset internal state
        hasCompletedOnce.current = false
        // Replay the animation
        replay()
      },
    }))

    // Handle Intersection Observer
    useEffect(() => {
      if (!useIntersectionObserver || !containerRef.current) return

      const observerOptions = {
        root: null,
        rootMargin: intersectionRootMargin,
        threshold: intersectionThreshold,
      }

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasCompletedOnce.current || retriggerOnIntersection) {
              replay()
            }

            // If not set to retrigger, unobserve after first animation
            if (!retriggerOnIntersection) {
              observer.unobserve(entry.target)
            }
          }
        })
      }

      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      )
      observer.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current)
        }
      }
    }, [
      useIntersectionObserver,
      retriggerOnIntersection,
      intersectionThreshold,
      intersectionRootMargin,
      replay,
    ])

    const handleMouseEnter = () => {
      if (scrambleOnHover) {
        replay()
      }
    }

    return (
      <>
        <span className="sr-only">{text}</span>
        <span
          ref={containerRef}
          className={cn("inline-block whitespace-pre-wrap", className)}
          aria-hidden="true"
          onMouseEnter={scrambleOnHover ? handleMouseEnter : undefined}
        >
          <span ref={scrambleRef} />
        </span>
      </>
    )
  }
)

ScrambleText.displayName = "ScrambleText"
export default ScrambleText


code.demo.1756874184389.tsx
"use client"

import { useEffect, useRef } from "react"
import ScrambleText, { ScrambleTextHandle } from "@/components/ui/scramble-text"

export default function ScrambleTextAlbumsDemo() {
  const tracks = [
    "1. BLOOD. - 1:58",
    "2. DNA. - 3:05",
    "3. YAH. - 2:40",
    "4. ELEMENT. - 3:28",
    "5. FEEL. - 3:34",
    "6. LOYALTY. (feat. Rihanna) - 3:47",
    "7. PRIDE. - 4:35",
    "8. HUMBLE. - 2:57",
    "9. LUST. - 5:07",
    "10. LOVE. (feat. Zacari) - 3:33",
    "11. XXX. (feat. U2) - 4:14",
    "12. FEAR. - 7:40",
    "13. GOD. - 4:08",
    "14. DUCKWORTH. - 4:08",
  ]

  const scrambleRefs = useRef<(ScrambleTextHandle | null)[]>([])

  useEffect(() => {
    tracks.forEach((_, index) => {
      const delay = index * 50
      setTimeout(() => {
        scrambleRefs.current[index]?.start()
      }, delay)
    })
  }, [])

  return (
    <div className="w-full h-full flex flex-col text-sm md:text-lg lg:text-lg xl:text-xl justify-start items-start bg-background text-foreground font-normal overflow-hidden py-16 px-8 sm:px-16 md:px-20 lg:px-24 text-left">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">DAMN.</h2>
        <p className="text-muted-foreground">Kendrick Lamar • 2017</p>
      </div>
      {tracks.map((track, index) => (
        <ScrambleText
          key={index}
          ref={(el) => {
            scrambleRefs.current[index] = el
          }}
          text={track}
          speed={120}
          autoStart={false}
          className="mb-1"
        />
      ))}
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/scramble-text.tsx
"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { useScramble } from "use-scramble"

import { cn } from "@/lib/utils"

interface ScrambleTextProps {
  /** The text that will be scrambled and displayed */
  text: string
  /** Speed of the scrambling effect (higher is faster) */
  speed?: number
  /** Optional custom CSS class for the container */
  className?: string
  /** Whether to start the animation automatically when mounted */
  autoStart?: boolean
  /** Callback function when animation completes */
  onComplete?: () => void
  /** Whether to use intersection observer to trigger animation when visible */
  useIntersectionObserver?: boolean
  /** Whether to retrigger animation when element comes into view again */
  retriggerOnIntersection?: boolean
  /** Threshold for intersection observer (0-1) */
  intersectionThreshold?: number
  /** Root margin for intersection observer */
  intersectionRootMargin?: string
  /** Whether to scramble text on hover */
  scrambleOnHover?: boolean
}

export interface ScrambleTextHandle {
  start: () => void
  reset: () => void
}

const ScrambleText = forwardRef<ScrambleTextHandle, ScrambleTextProps>(
  (
    {
      text,
      speed = 80,
      className = "",
      autoStart = true,
      onComplete,
      useIntersectionObserver = false,
      retriggerOnIntersection = false,
      intersectionThreshold = 0.3,
      intersectionRootMargin = "0px",
      scrambleOnHover = false,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const hasCompletedOnce = useRef(false)

    const { ref: scrambleRef, replay } = useScramble({
      text,
      speed: speed / 100, // Convert to 0-1 range
      tick: 2,
      step: 1,
      range: [65, 125], // Use default range (A-Z, a-z, and some special chars)
      scramble: 2,
      playOnMount: autoStart && !useIntersectionObserver,
      onAnimationEnd: () => {
        hasCompletedOnce.current = true
        onComplete?.()
      },
      overdrive: false, // Disable underscore characters
    })

    useImperativeHandle(ref, () => ({
      start: () => replay(),
      reset: () => {
        // Reset internal state
        hasCompletedOnce.current = false
        // Replay the animation
        replay()
      },
    }))

    // Handle Intersection Observer
    useEffect(() => {
      if (!useIntersectionObserver || !containerRef.current) return

      const observerOptions = {
        root: null,
        rootMargin: intersectionRootMargin,
        threshold: intersectionThreshold,
      }

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasCompletedOnce.current || retriggerOnIntersection) {
              replay()
            }

            // If not set to retrigger, unobserve after first animation
            if (!retriggerOnIntersection) {
              observer.unobserve(entry.target)
            }
          }
        })
      }

      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      )
      observer.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current)
        }
      }
    }, [
      useIntersectionObserver,
      retriggerOnIntersection,
      intersectionThreshold,
      intersectionRootMargin,
      replay,
    ])

    const handleMouseEnter = () => {
      if (scrambleOnHover) {
        replay()
      }
    }

    return (
      <>
        <span className="sr-only">{text}</span>
        <span
          ref={containerRef}
          className={cn("inline-block whitespace-pre-wrap", className)}
          aria-hidden="true"
          onMouseEnter={scrambleOnHover ? handleMouseEnter : undefined}
        >
          <span ref={scrambleRef} />
        </span>
      </>
    )
  }
)

ScrambleText.displayName = "ScrambleText"
export default ScrambleText

```

Install NPM dependencies:
```bash
use-scramble
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
