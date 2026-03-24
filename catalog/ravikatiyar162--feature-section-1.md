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
feature-section-1.tsx
// components/ui/feature-section.tsx

import * as React from "react"
import { cn } from "@/lib/utils" // Assuming you have a `cn` utility from shadcn
import { Button } from "@/components/ui/button" // Assuming a shadcn Button component

// Define the types for the component props for type safety and clarity
interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface CallToAction {
  title: string
  description: string
  appleUrl: string
  googleUrl: string
}

export interface FeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  mainIcon: React.ReactNode
  title: string
  subtitle: string
  features: Feature[]
  callToAction: CallToAction
}

// Helper component for SVG store icons for a cleaner look
const AppStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 30 30" fill="currentColor" {...props}>
    <path d="M15.385.01a4.34 4.34 0 00-2.955 1.056c-.72.63-1.393 1.81-1.393 3.326 0 .078.006.156.008.235a4.39 4.39 0 00-3.002-1.037c-1.564 0-2.992.934-3.834 2.333a5.75 5.75 0 00-1.2 3.655c0 2.223.97 4.293 2.23 5.619.1.106.208.209.32.308-1.56 2.05-1.551 4.542.062 6.223.738.773 1.764 1.22 2.852 1.22 1.01 0 1.95-.39 2.923-1.168a12.6 12.6 0 002.056-1.845 4.36 4.36 0 002.033 1.845c.995.795 2.016 1.168 3.031 1.168 1.088 0 2.114-.447 2.852-1.22.784-.817 1.15-1.859 1.15-2.926 0-1.537-.73-2.932-1.9-3.957.54-.15.934-.352 1.25-.602a4.42 4.42 0 001.44-2.228c.03-.133.05-.268.062-.404a4.44 4.44 0 00-3.32-4.998c-1.442-.317-2.88.24-3.722 1.34-.04-.008-.08-.01-.12-.01-.13 0-.258.01-.385.023a4.2 4.2 0 00-3.13-2.433zm-4.323 2.12c.574 0 1.09.18 1.51.492a4.38 4.38 0 00-1.503 3.125c-.001.04-.001.079-.001.12 0 .15.01.3.027.445a4.38 4.38 0 00-1.583-3.085c.5-.66 1.28-1.1 2.048-1.1zm7.886 0c.767 0 1.548.44 2.048 1.1a4.38 4.38 0 00-1.58 3.085c.017-.145.027-.295.027-.445 0-.04 0-.08-.002-.12a4.38 4.38 0 00-1.503-3.125c.42-.312.936-.492 1.51-.492z" />
  </svg>
)

const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 30 30" fill="currentColor" {...props}>
    <path d="M4.532 28.232l18.31-9.32a1.49 1.49 0 000-2.65L4.531 1.768a1.49 1.49 0 00-2.175 1.325v23.814a1.49 1.49 0 002.176 1.325zM22.18 16.32l-6.046-3.793 6.046-3.793v7.586zM24.84 18.17l-1.92-1.185v-4.14l1.92-1.184a1.51 1.51 0 011.51 2.655 1.49 1.49 0 01-1.51 1.854z" />
  </svg>
)

const FeatureSection = React.forwardRef<HTMLElement, FeatureSectionProps>(
  ({ mainIcon, title, subtitle, features, callToAction, className, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("container mx-auto max-w-5xl py-12 sm:py-24", className)} {...props}>
        <div className="flex flex-col items-center text-center">
          {/* Main Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {mainIcon}
          </div>

          {/* Main Title and Subtitle */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-left sm:mt-20 lg:max-w-none lg:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-x-6">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 text-foreground">{feature.title}</h3>
                <p className="mt-1 text-base leading-7 text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Card */}
        <div className="mt-16 rounded-2xl border bg-card p-8 text-center sm:mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{callToAction.title}</h2>
          <p className="mt-2 text-muted-foreground">{callToAction.description}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href={callToAction.appleUrl} target="_blank" rel="noopener noreferrer">
                <AppStoreIcon className="mr-2 h-5 w-5" />
                Download on the App Store
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href={callToAction.googleUrl} target="_blank" rel="noopener noreferrer">
                <GooglePlayIcon className="mr-2 h-5 w-5" />
                Get it on Google Play
              </a>
            </Button>
          </div>
        </div>
      </section>
    )
  }
)
FeatureSection.displayName = "FeatureSection"

export { FeatureSection }

code.demo.1760114116071.tsx
"use client" // Required for Framer Motion

import {
  Heart,
  WifiOff,
  ShieldCheck,
  BatteryCharging,
  Network,
} from "lucide-react"
import { motion } from "framer-motion"
import { FeatureSection } from "@/components/ui/feature-section-1"

// Animation variants for the container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

export default function FeatureSectionDemo() {
  // Define the data to be passed into the component
  const featureData = {
    mainIcon: <Heart className="h-8 w-8" />,
    title: "Offline Emergency Connect",
    subtitle: "Stay connected during emergencies, even when networks are down.",
    features: [
      {
        icon: <WifiOff className="h-6 w-6" />,
        title: "Works Offline",
        description:
          "Send and receive messages even when cellular networks and internet connections are unavailable.",
      },
      {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "Emergency-Only",
        description:
          "Connect with only the people you choose, for emergency situations and check-ins.",
      },
      {
        icon: <BatteryCharging className="h-6 w-6" />,
        title: "Battery Efficient",
        description:
          "Designed to conserve battery life while maintaining connectivity with nearby devices.",
      },
      {
        icon: <Network className="h-6 w-6" />,
        title: "Mesh Network",
        description:
          "Messages can hop through nearby devices to reach contacts beyond direct range.",
      },
    ],
    callToAction: {
      title: "Be Prepared for Emergencies",
      description:
        "One-time purchase of $10 with a $5 monthly subscription for ongoing service and maintenance.",
      appleUrl: "#",
      googleUrl: "#",
    },
  }

  return (
    // Wrap the component with motion.div for animations
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants}>
        <FeatureSection {...featureData} />
      </motion.div>
    </motion.div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-section-1.tsx
// components/ui/feature-section.tsx

import * as React from "react"
import { cn } from "@/lib/utils" // Assuming you have a `cn` utility from shadcn
import { Button } from "@/components/ui/button" // Assuming a shadcn Button component

// Define the types for the component props for type safety and clarity
interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface CallToAction {
  title: string
  description: string
  appleUrl: string
  googleUrl: string
}

export interface FeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  mainIcon: React.ReactNode
  title: string
  subtitle: string
  features: Feature[]
  callToAction: CallToAction
}

// Helper component for SVG store icons for a cleaner look
const AppStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 30 30" fill="currentColor" {...props}>
    <path d="M15.385.01a4.34 4.34 0 00-2.955 1.056c-.72.63-1.393 1.81-1.393 3.326 0 .078.006.156.008.235a4.39 4.39 0 00-3.002-1.037c-1.564 0-2.992.934-3.834 2.333a5.75 5.75 0 00-1.2 3.655c0 2.223.97 4.293 2.23 5.619.1.106.208.209.32.308-1.56 2.05-1.551 4.542.062 6.223.738.773 1.764 1.22 2.852 1.22 1.01 0 1.95-.39 2.923-1.168a12.6 12.6 0 002.056-1.845 4.36 4.36 0 002.033 1.845c.995.795 2.016 1.168 3.031 1.168 1.088 0 2.114-.447 2.852-1.22.784-.817 1.15-1.859 1.15-2.926 0-1.537-.73-2.932-1.9-3.957.54-.15.934-.352 1.25-.602a4.42 4.42 0 001.44-2.228c.03-.133.05-.268.062-.404a4.44 4.44 0 00-3.32-4.998c-1.442-.317-2.88.24-3.722 1.34-.04-.008-.08-.01-.12-.01-.13 0-.258.01-.385.023a4.2 4.2 0 00-3.13-2.433zm-4.323 2.12c.574 0 1.09.18 1.51.492a4.38 4.38 0 00-1.503 3.125c-.001.04-.001.079-.001.12 0 .15.01.3.027.445a4.38 4.38 0 00-1.583-3.085c.5-.66 1.28-1.1 2.048-1.1zm7.886 0c.767 0 1.548.44 2.048 1.1a4.38 4.38 0 00-1.58 3.085c.017-.145.027-.295.027-.445 0-.04 0-.08-.002-.12a4.38 4.38 0 00-1.503-3.125c.42-.312.936-.492 1.51-.492z" />
  </svg>
)

const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 30 30" fill="currentColor" {...props}>
    <path d="M4.532 28.232l18.31-9.32a1.49 1.49 0 000-2.65L4.531 1.768a1.49 1.49 0 00-2.175 1.325v23.814a1.49 1.49 0 002.176 1.325zM22.18 16.32l-6.046-3.793 6.046-3.793v7.586zM24.84 18.17l-1.92-1.185v-4.14l1.92-1.184a1.51 1.51 0 011.51 2.655 1.49 1.49 0 01-1.51 1.854z" />
  </svg>
)

const FeatureSection = React.forwardRef<HTMLElement, FeatureSectionProps>(
  ({ mainIcon, title, subtitle, features, callToAction, className, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("container mx-auto max-w-5xl py-12 sm:py-24", className)} {...props}>
        <div className="flex flex-col items-center text-center">
          {/* Main Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {mainIcon}
          </div>

          {/* Main Title and Subtitle */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-left sm:mt-20 lg:max-w-none lg:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-x-6">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 text-foreground">{feature.title}</h3>
                <p className="mt-1 text-base leading-7 text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Card */}
        <div className="mt-16 rounded-2xl border bg-card p-8 text-center sm:mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{callToAction.title}</h2>
          <p className="mt-2 text-muted-foreground">{callToAction.description}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href={callToAction.appleUrl} target="_blank" rel="noopener noreferrer">
                <AppStoreIcon className="mr-2 h-5 w-5" />
                Download on the App Store
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href={callToAction.googleUrl} target="_blank" rel="noopener noreferrer">
                <GooglePlayIcon className="mr-2 h-5 w-5" />
                Get it on Google Play
              </a>
            </Button>
          </div>
        </div>
      </section>
    )
  }
)
FeatureSection.displayName = "FeatureSection"

export { FeatureSection }
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
