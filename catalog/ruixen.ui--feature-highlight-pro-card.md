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
feature-highlight-pro-card.tsx
'use client'

import * as React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FeatureHighlightProCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
  floating?: boolean
}

export const FeatureHighlightProCard = React.forwardRef<
  HTMLDivElement,
  FeatureHighlightProCardProps
>(
  (
    {
      imageSrc,
      imageAlt = 'Feature image',
      title,
      description,
      buttonText,
      onButtonClick,
      floating = true,
      className,
      ...props
    },
    ref
  ) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [15, -15])
    const rotateY = useTransform(x, [-100, 100], [-15, 15])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const offsetX = e.clientX - rect.left - rect.width / 2
      const offsetY = e.clientY - rect.top - rect.height / 2
      x.set(offsetX)
      y.set(offsetY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className={cn(
          'relative flex flex-col items-center justify-center text-center rounded-3xl border bg-card p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/40 overflow-hidden w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
        {...props}
      >
        {/* Background gradient glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-80 blur-3xl" />

        {/* Floating 3D Image */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            floating
              ? { y: [0, -15, 0] } // Slightly faster and more visible floating
              : {}
          }
          transition={
            floating
              ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              : {}
          }
          className="relative w-full flex justify-center"
        >
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-[240px] sm:max-w-[280px] md:max-w-[320px] w-full object-contain select-none rounded-3xl"
            draggable={false}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {/* Shadow below image */}
          <div className="absolute bottom-0 left-1/2 h-8 w-3/5 -translate-x-1/2 rounded-full bg-black/10 blur-xl" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-2 sm:px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {description}
        </motion.p>

        {/* Button */}
        {buttonText && (
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={onButtonClick}
              className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    )
  }
)

FeatureHighlightProCard.displayName = 'FeatureHighlightProCard'


code.demo.1759989408722.tsx
'use client'

import { Gift, Sparkles } from 'lucide-react'
import { FeatureHighlightProCard } from '@/components/ui/feature-highlight-pro-card'

export default function FeatureCardDemo() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12">
      <FeatureHighlightProCard
        imageSrc="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gift-4.png"
        title="Gifts that Make Moments Shine"
        description="Surprise your loved ones with perfectly curated gift boxes, crafted to bring smiles and unforgettable memories. Personalize every detail and let your gesture speak louder than words."
        buttonText="Explore Gifts"
        onButtonClick={() => alert('Redirecting to gifts...')}
      />
    </main>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-highlight-pro-card.tsx
'use client'

import * as React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FeatureHighlightProCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
  floating?: boolean
}

export const FeatureHighlightProCard = React.forwardRef<
  HTMLDivElement,
  FeatureHighlightProCardProps
>(
  (
    {
      imageSrc,
      imageAlt = 'Feature image',
      title,
      description,
      buttonText,
      onButtonClick,
      floating = true,
      className,
      ...props
    },
    ref
  ) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [15, -15])
    const rotateY = useTransform(x, [-100, 100], [-15, 15])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const offsetX = e.clientX - rect.left - rect.width / 2
      const offsetY = e.clientY - rect.top - rect.height / 2
      x.set(offsetX)
      y.set(offsetY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className={cn(
          'relative flex flex-col items-center justify-center text-center rounded-3xl border bg-card p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/40 overflow-hidden w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
        {...props}
      >
        {/* Background gradient glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-80 blur-3xl" />

        {/* Floating 3D Image */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            floating
              ? { y: [0, -15, 0] } // Slightly faster and more visible floating
              : {}
          }
          transition={
            floating
              ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              : {}
          }
          className="relative w-full flex justify-center"
        >
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-[240px] sm:max-w-[280px] md:max-w-[320px] w-full object-contain select-none rounded-3xl"
            draggable={false}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {/* Shadow below image */}
          <div className="absolute bottom-0 left-1/2 h-8 w-3/5 -translate-x-1/2 rounded-full bg-black/10 blur-xl" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-2 sm:px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {description}
        </motion.p>

        {/* Button */}
        {buttonText && (
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={onButtonClick}
              className="rounded-full px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </motion.div>
    )
  }
)

FeatureHighlightProCard.displayName = 'FeatureHighlightProCard'

```

Install NPM dependencies:
```bash
framer-motion
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
