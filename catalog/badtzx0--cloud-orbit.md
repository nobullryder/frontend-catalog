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
cloud-orbit.tsx
"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface Image {
  url: string
  name: string
}

interface CloudOrbitProps {
  duration?: number
  children?: React.ReactNode
  size?: number
  className?: string
  images?: Image[]
  [key: string]:
    | string
    | number
    | boolean
    | React.ReactNode
    | Image[]
    | undefined
}

export function CloudOrbit({
  duration = 2,
  children,
  size = 160,
  className,
  images = [],
  ...props
}: CloudOrbitProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const lastTimestamp = React.useRef(0)

  React.useEffect(() => {
    let animationFrameId: number

    const updateFrame = (timestamp: number) => {
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = timestamp
      }

      const elapsedTime = (timestamp - lastTimestamp.current) / 1000
      const currentImageIndex =
        Math.floor(elapsedTime / duration) % images.length

      setCurrentIndex(currentImageIndex)

      animationFrameId = requestAnimationFrame(updateFrame)
    }

    if (images.length > 0) {
      animationFrameId = requestAnimationFrame(updateFrame)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [duration, images.length])

  return (
    <div
      style={
        {
          "--size": `${size}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex h-full w-full items-center justify-center rounded-full select-none",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {images.length > 0 &&
          images.map(
            (image, index) =>
              index === currentIndex && (
                <motion.img
                  key={image.url}
                  src={image.url}
                  alt={image.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [0.8, 1] }}
                  exit={{ opacity: 0, scale: [1, 0.8] }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 7,
                  }}
                  className={cn(
                    "absolute z-10 rounded-[inherit] border border-gray-100 bg-gradient-to-t from-neutral-100 to-white inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7",
                    className
                  )}
                  style={{ width: size, height: size }}
                />
              )
          )}
      </AnimatePresence>
      {children}
    </div>
  )
}

interface OrbitingImageProps {
  speed?: number
  radius?: number
  startAt?: number
  size?: number
  className?: string
  images?: Image[]
  duration?: number
  [key: string]:
    | string
    | number
    | boolean
    | React.ReactNode
    | Image[]
    | undefined
}

export function OrbitingImage({
  speed = 20,
  radius = 100,
  startAt = 0,
  size = 80,
  className,
  images = [],
  duration = 2,
  ...props
}: OrbitingImageProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const lastTimestamp = React.useRef(0)

  React.useEffect(() => {
    let animationFrameId: number

    const updateFrame = (timestamp: number) => {
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = timestamp
      }

      const elapsedTime = (timestamp - lastTimestamp.current) / 1000
      const currentImageIndex =
        Math.floor(elapsedTime / duration) % images.length

      setCurrentIndex(currentImageIndex)

      animationFrameId = requestAnimationFrame(updateFrame)
    }

    if (images.length > 0) {
      animationFrameId = requestAnimationFrame(updateFrame)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [duration, images.length])

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{
        transform: [
          `rotate(${startAt * 360}deg) translateY(-${radius}px) rotate(-${startAt * 360}deg)`,
          `rotate(${startAt * 360 + 90}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 90}deg)`,
          `rotate(${startAt * 360 + 180}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 180}deg)`,
          `rotate(${startAt * 360 + 270}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 270}deg)`,
          `rotate(${startAt * 360 + 360}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 360}deg)`,
        ],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
      className={cn(
        "absolute z-[5] flex transform-gpu items-center justify-center rounded-full p-[5%]",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {images.length > 0 &&
          images.map(
            (image, index) =>
              index === currentIndex && (
                <motion.div
                  key={image.url}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    position: "absolute",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [0.8, 1] }}
                  exit={{ opacity: 0, scale: [1, 0.8] }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 7,
                  }}
                  className={cn(
                    "rounded-full border border-gray-100 bg-gradient-to-t from-neutral-100 to-white p-[15%] inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7",
                    className
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="flex h-full w-full items-center justify-center rounded-full object-contain"
                  />
                </motion.div>
              )
          )}
      </AnimatePresence>
    </motion.div>
  )
}


code.demo.1754499842631.tsx
import {
  CloudOrbit,
  OrbitingImage,
} from "@/components/ui/cloud-orbit"

const orbitingImagesData = [
  {
    speed: 20,
    radius: 119,
    size: 53,
    startAt: 0.15625,
    images: [
      {
        name: "Deepseek Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/deepseek-logo.webp",
      },
      {
        name: "Drizzle ORM Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/drizzle-orm-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 118,
    size: 85,
    startAt: 0.25,
    images: [
      {
        name: "Motion Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/motion-logo.webp",
      },
      {
        name: "Deepseek Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/deepseek-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 130,
    size: 73,
    startAt: 0.4375,
    images: [
      {
        name: "Tailwind Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/tailwindcss-logo.webp",
      },
      {
        name: "Motion Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/motion-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 120,
    size: 49,
    startAt: 0.61,
    images: [
      {
        name: "Edge Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/edge-logo.webp",
      },
      {
        name: "Tailwind Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/tailwindcss-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 136,
    size: 40,
    startAt: 0.65625,
    images: [
      {
        name: "Linear Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/linear-logo.webp",
      },
      {
        name: "Edge Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/edge-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 111,
    size: 87,
    startAt: 0.75,
    images: [
      {
        name: "React Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/react-logo.webp",
      },
      {
        name: "Linear Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/linear-logo.webp",
      },
    ],
  },
  {
    speed: 20,
    radius: 124,
    size: 73,
    startAt: 0.9375,
    images: [
      {
        name: "Drizzle ORM Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/drizzle-orm-logo.webp",
      },
      {
        name: "React Logo",
        url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/react-logo.webp",
      },
    ],
  },
]

export default function CloudOrbitDemo() {
  return (
    <CloudOrbit
      duration={3}
      size={160}
      images={[
        {
          name: "Charlie Avatar",
          url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/avatar-1.webp",
        },
        {
          name: "Tommy Avatar",
          url: "https://cdn.badtz-ui.com/images/components/cloud-orbit/avatar-2.webp",
        },
      ]}
    >
      {orbitingImagesData.map((orbit, index) => (
        <OrbitingImage
          key={index}
          speed={orbit.speed}
          radius={orbit.radius}
          size={orbit.size}
          startAt={orbit.startAt}
          images={orbit.images}
          duration={3}
        />
      ))}
    </CloudOrbit>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cloud-orbit.tsx
"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface Image {
  url: string
  name: string
}

interface CloudOrbitProps {
  duration?: number
  children?: React.ReactNode
  size?: number
  className?: string
  images?: Image[]
  [key: string]:
    | string
    | number
    | boolean
    | React.ReactNode
    | Image[]
    | undefined
}

export function CloudOrbit({
  duration = 2,
  children,
  size = 160,
  className,
  images = [],
  ...props
}: CloudOrbitProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const lastTimestamp = React.useRef(0)

  React.useEffect(() => {
    let animationFrameId: number

    const updateFrame = (timestamp: number) => {
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = timestamp
      }

      const elapsedTime = (timestamp - lastTimestamp.current) / 1000
      const currentImageIndex =
        Math.floor(elapsedTime / duration) % images.length

      setCurrentIndex(currentImageIndex)

      animationFrameId = requestAnimationFrame(updateFrame)
    }

    if (images.length > 0) {
      animationFrameId = requestAnimationFrame(updateFrame)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [duration, images.length])

  return (
    <div
      style={
        {
          "--size": `${size}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative flex h-full w-full items-center justify-center rounded-full select-none",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {images.length > 0 &&
          images.map(
            (image, index) =>
              index === currentIndex && (
                <motion.img
                  key={image.url}
                  src={image.url}
                  alt={image.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [0.8, 1] }}
                  exit={{ opacity: 0, scale: [1, 0.8] }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 7,
                  }}
                  className={cn(
                    "absolute z-10 rounded-[inherit] border border-gray-100 bg-gradient-to-t from-neutral-100 to-white inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7",
                    className
                  )}
                  style={{ width: size, height: size }}
                />
              )
          )}
      </AnimatePresence>
      {children}
    </div>
  )
}

interface OrbitingImageProps {
  speed?: number
  radius?: number
  startAt?: number
  size?: number
  className?: string
  images?: Image[]
  duration?: number
  [key: string]:
    | string
    | number
    | boolean
    | React.ReactNode
    | Image[]
    | undefined
}

export function OrbitingImage({
  speed = 20,
  radius = 100,
  startAt = 0,
  size = 80,
  className,
  images = [],
  duration = 2,
  ...props
}: OrbitingImageProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const lastTimestamp = React.useRef(0)

  React.useEffect(() => {
    let animationFrameId: number

    const updateFrame = (timestamp: number) => {
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = timestamp
      }

      const elapsedTime = (timestamp - lastTimestamp.current) / 1000
      const currentImageIndex =
        Math.floor(elapsedTime / duration) % images.length

      setCurrentIndex(currentImageIndex)

      animationFrameId = requestAnimationFrame(updateFrame)
    }

    if (images.length > 0) {
      animationFrameId = requestAnimationFrame(updateFrame)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [duration, images.length])

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{
        transform: [
          `rotate(${startAt * 360}deg) translateY(-${radius}px) rotate(-${startAt * 360}deg)`,
          `rotate(${startAt * 360 + 90}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 90}deg)`,
          `rotate(${startAt * 360 + 180}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 180}deg)`,
          `rotate(${startAt * 360 + 270}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 270}deg)`,
          `rotate(${startAt * 360 + 360}deg) translateY(-${radius}px) rotate(-${startAt * 360 + 360}deg)`,
        ],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
      className={cn(
        "absolute z-[5] flex transform-gpu items-center justify-center rounded-full p-[5%]",
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {images.length > 0 &&
          images.map(
            (image, index) =>
              index === currentIndex && (
                <motion.div
                  key={image.url}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    position: "absolute",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [0.8, 1] }}
                  exit={{ opacity: 0, scale: [1, 0.8] }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 7,
                  }}
                  className={cn(
                    "rounded-full border border-gray-100 bg-gradient-to-t from-neutral-100 to-white p-[15%] inset-shadow-sm inset-shadow-black/2 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:inset-shadow-white/7",
                    className
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="flex h-full w-full items-center justify-center rounded-full object-contain"
                  />
                </motion.div>
              )
          )}
      </AnimatePresence>
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
