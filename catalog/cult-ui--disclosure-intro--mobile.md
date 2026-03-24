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
disclosure-intro.tsx
// FILE: src/components/ui/component.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import {
  AnimatePresence as FramerAnimatePresence,
  motion as framerMotion,
  useAnimation as framerUseAnimation,
  type PanInfo as FramerPanInfo,
} from "framer-motion"
import { CheckIcon, ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Progress } from "@/components/ui/progress"

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches ?? false
}

function useFeatureVisibility(featureId: string) {
  const [isVisible, setIsVisible] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const storedValue = localStorage.getItem(`feature_${featureId}`)
    setIsVisible(storedValue ? JSON.parse(storedValue) : true)
  }, [featureId])

  const hideFeature = () => {
    localStorage.setItem(`feature_${featureId}`, JSON.stringify(false))
    setIsVisible(false)
  }

  return { isVisible: isVisible === null ? false : isVisible, hideFeature }
}

function useSwipe(onSwipe: (direction: "left" | "right") => void) {
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: FramerPanInfo
  ) => {
    if (info.offset.x > 100) {
      onSwipe("right")
    } else if (info.offset.x < -100) {
      onSwipe("left")
    }
  }

  return { handleDragEnd }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
}

const slideInOut = (direction: 1 | -1) => ({
  initial: { opacity: 0, x: 20 * direction },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 * direction },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
})

const hoverScale = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
}

function StepPreview({ step, direction }: { step: Step; direction: 1 | -1 }) {
  const controls = framerUseAnimation()

  React.useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.3 },
    })
  }, [controls, step])

  return (
    <framerMotion.div
      {...slideInOut(direction)}
      className="relative h-full w-full   overflow-hidden rounded-sm rounded-rb-lg rounded-tl-xl ring-2 ring-black/10 dark:ring-black/10 dark:ring-offset-black ring-offset-8"
    >
      {step.media ? (
        <div className="relative bg-black h-full w-full">
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="h-full w-full max-h-[700px]"
          >
            {step.media.type === "image" ? (
              <Image
                src={step.media.src || "/placeholder.svg"}
                alt={step.media.alt || ""}
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={step.media.src}
                controls
                className="h-full w-full object-cover"
              />
            )}
          </framerMotion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="absolute bottom-0 left-0 right-0 p-6"
          >
            <h3 className="mb-2 text-2xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-white hidden md:block">
              {step.full_description}
            </p>
          </framerMotion.div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-6">
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center"
          >
            <h3 className="mb-2 text-2xl font-semibold text-primary">
              {step.title}
            </h3>
            <p className="text-muted-foreground">{step.full_description}</p>
          </framerMotion.div>
        </div>
      )}
    </framerMotion.div>
  )
}

interface StepTabProps {
  step: Step
  isActive: boolean
  onClick: () => void
  isCompleted: boolean
}

function StepTab({ step, isActive, onClick, isCompleted }: StepTabProps) {
  return (
    <framerMotion.button
      {...hoverScale}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start rounded-lg px-4 py-2 text-left transition-colors w-full",
        isActive ? "bg-muted border border-border" : "hover:bg-muted/70",
        "relative"
      )}
      aria-current={isActive ? "step" : undefined}
      aria-label={`${step.title}${isCompleted ? " (completed)" : ""}`}
    >
      <div className="mb-1 text-sm font-medium">{step.title}</div>
      <div className="text-xs hidden md:block text-muted-foreground line-clamp-2">
        {step.short_description}
      </div>
      {isCompleted && (
        <framerMotion.div {...fadeInScale} className="absolute right-2 top-2">
          <div className="rounded-full bg-primary p-1">
            <CheckIcon className="w-2 h-2 text-primary-foreground" />
          </div>
        </framerMotion.div>
      )}
    </framerMotion.button>
  )
}

interface Step {
  title: string
  short_description: string
  full_description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  media?: {
    type: "image" | "video"
    src: string
    alt?: string
  }
}

interface FeatureDisclosureProps {
  steps: Step[]
  featureId: string
  onComplete?: () => void
  onSkip?: () => void
  showProgressBar?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  forceVariant?: "mobile" | "desktop"
}

interface StepContentProps {
  steps: Step[]
  currentStep: number
  onSkip: () => void
  onNext: () => void
  onPrevious: () => void
  hideFeature: () => void
  completedSteps: number[]
  onStepSelect: (index: number) => void
  direction: 1 | -1
  isDesktop: boolean
}

function StepContent({
  steps,
  currentStep,
  onSkip,
  onNext,
  onPrevious,
  hideFeature,
  completedSteps,
  onStepSelect,
  direction,
  isDesktop,
  stepRef,
}: StepContentProps & { stepRef: React.RefObject<HTMLButtonElement> }) {
  const [skipNextTime, setSkipNextTime] = React.useState(false)

  const renderActionButton = (action: Step["action"]) => {
    if (!action) return null

    if (action.href) {
      return (
        <Button asChild className="w-full " size="sm" variant="link">
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2">
              {action.label}
              <ExternalLinkIcon className="w-4 h-4" />
            </span>
          </a>
        </Button>
      )
    }

    return (
      <Button
        className="w-full rounded-full"
        size="sm"
        variant="secondary"
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    )
  }

  return (
    <div className="flex h-full flex-col max-w-3xl mx-auto">
      {isDesktop && (
        <div className="flex-1  px-2 py-3">
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-2 flex flex-col justify-center items-center px-1"
          >
            {steps.map((step, index) => (
              <StepTab
                key={index}
                step={step}
                isActive={currentStep === index}
                onClick={() => onStepSelect(index)}
                isCompleted={completedSteps.includes(index)}
              />
            ))}
          </framerMotion.div>
        </div>
      )}
      <FramerAnimatePresence mode="wait" initial={false}>
        <framerMotion.div
          key={currentStep}
          {...slideInOut(direction)}
          className="mt-6 space-y-4 "
        >
          {!isDesktop && steps[currentStep]?.media && (
            <AspectRatio
              ratio={16 / 9}
              className="lg:overflow-hidden rounded-lg bg-muted "
            >
              {steps[currentStep]?.media?.type === "image" ? (
                <Image
                  src={steps[currentStep]?.media?.src || "/placeholder.svg"}
                  alt={steps[currentStep]?.media?.alt || ""}
                  fill
                  className="object-cover "
                />
              ) : (
                <video
                  src={steps[currentStep]?.media?.src}
                  controls
                  className="h-full w-full object-cover"
                />
              )}
            </AspectRatio>
          )}

          {steps[currentStep]?.action ? (
            <div className=" px-2">
              {renderActionButton(steps[currentStep]?.action)}
            </div>
          ) : (
            <div className="h-10" />
          )}

          <div className="flex items-center justify-between pr-4">
            <Button
              variant="ghost"
              onClick={onSkip}
              className="text-muted-foreground hover:bg-card rounded-full"
            >
              Skip all
            </Button>
            <div className="space-x-2">
              {currentStep > 0 && (
                <Button
                  onClick={onPrevious}
                  size="sm"
                  variant="ghost"
                  className="rounded-full hover:bg-transparent"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={() => {
                  if (skipNextTime) {
                    hideFeature()
                  }
                  onNext()
                }}
                size="sm"
                ref={stepRef}
                className="rounded-full"
              >
                {currentStep === steps.length - 1 ? "Done" : "Next"}
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 pb-4 px-4">
            <Checkbox
              id="skipNextTime"
              checked={skipNextTime}
              onCheckedChange={(checked) => setSkipNextTime(checked as boolean)}
            />
            <label
              htmlFor="skipNextTime"
              className="text-sm text-muted-foreground"
            >
              Don't show this again
            </label>
          </div>
        </framerMotion.div>
      </FramerAnimatePresence>
    </div>
  )
}

export function Component({
  steps,
  open,
  setOpen,
  featureId,
  onComplete,
  onSkip,
  showProgressBar = true,
  forceVariant,
}: FeatureDisclosureProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([0])
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const isDesktopQuery = useMediaQuery("(min-width: 768px)")
  const isDesktop = forceVariant ? forceVariant === "desktop" : isDesktopQuery
  const { isVisible, hideFeature } = useFeatureVisibility(featureId)
  const stepRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!isVisible) {
      setOpen(false)
    }
  }, [isVisible, setOpen])

  React.useEffect(() => {
    if (open && stepRef.current) {
      stepRef.current.focus()
    }
  }, [open, currentStep])

  if (!isVisible || !open) {
    return null
  }

  const handleNext = () => {
    setDirection(1)
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    )
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setOpen(false)
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    setDirection(-1)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setOpen(false)
    onSkip?.()
  }

  const handleStepSelect = (index: number) => {
    setDirection(index > currentStep ? 1 : -1)
    setCompletedSteps((prev) => {
      const newCompletedSteps = new Set(prev)
      if (index > currentStep) {
        for (let i = currentStep; i <= index; i++) {
          newCompletedSteps.add(i)
        }
      }
      return Array.from(newCompletedSteps)
    })
    setCurrentStep(index)
  }

  const handleSwipe = (swipeDirection: "left" | "right") => {
    if (swipeDirection === "left") {
      handleNext()
    } else {
      handlePrevious()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      handleNext()
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      handlePrevious()
    }
  }

  const { handleDragEnd } = useSwipe(handleSwipe)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-5xl p-0 gap-0 overflow-hidden "
          onKeyDown={handleKeyDown}
        >
          <DialogHeader className="p-6 space-y-2 bg-muted border-b border-border">
            <DialogTitle>Feature Tour</DialogTitle>
            {showProgressBar && (
              <div className="flex mt-2 w-full justify-center  ">
                <Progress
                  value={((currentStep + 1) / steps.length) * 100}
                  className="  h-1 "
                />
              </div>
            )}
          </DialogHeader>

          <div className="grid grid-cols-2 h-full">
            <div className="p-2 pr-[18px] ">
              <StepContent
                steps={steps}
                currentStep={currentStep}
                onSkip={handleSkip}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hideFeature={hideFeature}
                completedSteps={completedSteps}
                onStepSelect={handleStepSelect}
                direction={direction}
                isDesktop={isDesktop}
                stepRef={stepRef}
              />
            </div>
            <FramerAnimatePresence mode="wait" initial={false}>
              <StepPreview
                key={currentStep}
                step={steps[currentStep]}
                direction={direction}
              />
            </FramerAnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-[95vh] max-h-[95vh] ">
        <framerMotion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          onKeyDown={handleKeyDown}
          className="h-full flex flex-col max-w-3xl mx-auto"
        >
          <DrawerHeader className="text-left  pb-4 space-y-4">
            {showProgressBar && (
              <Progress
                value={((currentStep + 1) / steps.length) * 100}
                className="mb-4"
              />
            )}
            <DrawerTitle>{steps[currentStep]?.title}</DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4 pb-32">
              <div className="grid grid-cols-2 gap-2 mb-6">
                {steps.map((step, index) => (
                  <StepTab
                    key={index}
                    step={step}
                    isActive={currentStep === index}
                    onClick={() => handleStepSelect(index)}
                    isCompleted={completedSteps.includes(index)}
                  />
                ))}
              </div>
              <div className="relative aspect-[16/9] ring-2 ring-border ring-offset-8 ring-offset-background rounded-lg overflow-hidden">
                <StepPreview step={steps[currentStep]} direction={direction} />
              </div>

              <div className="space-y-4 border border-border p-3 rounded-lg">
                <p className="text-muted-foreground">
                  {steps[currentStep]?.short_description}
                </p>
                {steps[currentStep]?.action && (
                  <Button
                    asChild
                    className="w-full"
                    variant={
                      steps[currentStep]?.action?.href ? "outline" : "default"
                    }
                  >
                    {steps[currentStep]?.action?.href ? (
                      <a
                        href={steps[currentStep]?.action?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {steps[currentStep]?.action?.label}
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <button onClick={steps[currentStep]?.action?.onClick}>
                        {steps[currentStep]?.action?.label}
                      </button>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t bg-background">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="text-muted-foreground hover:bg-card rounded-full"
                >
                  Skip all
                </Button>
                <div className="space-x-2">
                  {currentStep > 0 && (
                    <Button
                      onClick={handlePrevious}
                      size="sm"
                      variant="ghost"
                      className="rounded-full hover:bg-transparent"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      handleNext()
                    }}
                    size="sm"
                    ref={stepRef}
                    className="rounded-full"
                  >
                    {currentStep === steps.length - 1 ? "Done" : "Next"}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skipNextTime"
                  onCheckedChange={(checked) => {
                    hideFeature()
                  }}
                />
                <label
                  htmlFor="skipNextTime"
                  className="text-sm text-muted-foreground"
                >
                  Don't show this again
                </label>
              </div>
            </div>
          </div>
        </framerMotion.div>
      </DrawerContent>
    </Drawer>
  )
}

code.demo.1750444142188.tsx
// FILE: src/demos/intro-disclosure-mobile-demo.tsx
"use client"

import { useEffect, useState } from "react"
import { ChevronDownIcon, ResetIcon } from "@radix-ui/react-icons"
import { DatabaseIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Component } from "@/components/ui/disclosure-intro"

const steps = [
  {
    title: "Welcome to Cult UI",
    short_description: "Discover our modern component library",
    full_description:
      "Welcome to Cult UI! Let's explore how our beautifully crafted components can help you build stunning user interfaces with ease.",
    media: {
      type: "image" as const,
      src: "/feature-3.png",
      alt: "Cult UI components overview",
    },
  },
  {
    title: "Customizable Components",
    short_description: "Style and adapt to your needs",
    full_description:
      "Every component is built with customization in mind. Use our powerful theming system with Tailwind CSS to match your brand perfectly.",
    media: {
      type: "image" as const,
      src: "/feature-2.png",
      alt: "Component customization interface",
    },
    action: {
      label: "View Theme Builder",
      href: "/docs/theming",
    },
  },
  {
    title: "Responsive & Accessible",
    short_description: "Built for everyone",
    full_description:
      "All components are fully responsive and follow WAI-ARIA guidelines, ensuring your application works seamlessly across all devices and is accessible to everyone.",
    media: {
      type: "image" as const,

      src: "/feature-1.png",
      alt: "Responsive design demonstration",
    },
  },
  {
    title: "Start Building",
    short_description: "Create your next project",
    full_description:
      "You're ready to start building! Check out our comprehensive documentation and component examples to create your next amazing project.",
    action: {
      label: "View Components",
      href: "/docs/components",
    },
  },
]

type StorageState = {
  mobile: string | null
}

function IntroDisclosureMobileDemo() {
  const [openMobile, setOpenMobile] = useState(true)
  const [debugOpen, setDebugOpen] = useState(false)
  const [storageState, setStorageState] = useState<StorageState>({
    mobile: null,
  })

  const updateStorageState = () => {
    if (typeof localStorage === "undefined") return
    setStorageState({
      mobile: localStorage.getItem("feature_intro-demo-mobile-only"),
    })
  }

  useEffect(() => {
    updateStorageState()
    if (typeof window !== "undefined") {
        window.addEventListener("storage", updateStorageState)
        return () => window.removeEventListener("storage", updateStorageState)
    }
  }, [])


  const handleResetMobile = () => {
    setOpenMobile(true)
    if (storageState.mobile === "false") {
        toast.info("Clear the local storage to trigger the feature again")
        setDebugOpen(true)
      }
    if (storageState.mobile === null) {
        updateStorageState()
    }
  }

  const handleClearMobile = () => {
    if (typeof localStorage === "undefined") return
    localStorage.removeItem("feature_intro-demo-mobile-only")
    updateStorageState()
    toast.success("Mobile storage cleared. Refresh page if needed.")
  }

  const handleDebugOpenChange = (open: boolean) => {
    if (open) {
      updateStorageState()
    }
    setDebugOpen(open)
  }

  return (
    <div className="w-full space-y-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight mb-4">
            IntroDisclosure Mobile Demo
          </h2>
          <p className="text-muted-foreground mb-6">
            Experience our feature introduction component in mobile variant. Click the reset button to restart the demo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 pt-0">
          <div className="flex flex-col">
            <div
              className={cn(
                "flex flex-col gap-6 rounded-lg border-2 p-6 transition-colors",
                !openMobile && "border-muted bg-muted/50",
                openMobile && "border-primary"
              )}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex  flex-col">
                  <p className="text-sm text-muted-foreground">
                    (Drawer + Swipe)
                  </p>
                  <h3 className="text-xl font-semibold">Mobile View</h3>
                </div>
                <button
                  onClick={handleResetMobile}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <ResetIcon className="mr-2 h-4 w-4" />
                  Start Demo
                </button>
              </div>
              <Component
                open={openMobile}
                setOpen={setOpenMobile}
                steps={steps}
                featureId="intro-demo-mobile-only"
                onComplete={() => toast.success("Mobile tour completed")}
                onSkip={() => toast.info("Mobile tour skipped")}
                forceVariant="mobile"
              />
              <div className="text-sm text-muted-foreground">
                Status: {openMobile ? "Active" : "Completed/Skipped"}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <Collapsible
            open={debugOpen}
            onOpenChange={handleDebugOpenChange}
            className="w-full"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-2  text-sm hover:bg-muted/50">
              <div className="flex flex-col items-start text-left">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <DatabaseIcon className="size-4" />{" "}
                  <span className="text-muted-foreground">
                    Browser Local Storage State
                  </span>
                </h4>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl">
                  This value represents the "Don't show again" checkbox state.
                  <br />- When set to{" "}
                  <code className="bg-background px-1">true</code>, the intro
                  will be hidden. <br /> - When{" "}
                  <code className="bg-background px-1">null</code>, the intro
                  will be shown.
                </p>
              </div>
              <ChevronDownIcon
                className={cn(
                  "size-8 transition-transform duration-200",
                  debugOpen && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md bg-muted p-4 text-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-muted-foreground">
                        Mobile State (feature_intro-demo-mobile-only):{" "}
                      </span>
                      <code className="rounded bg-background px-2 py-1">
                        {storageState.mobile === null
                          ? "null"
                          : storageState.mobile}
                      </code>
                    </div>
                    <Button size="sm" onClick={handleClearMobile}>
                      Reset Local Storage
                    </Button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

export default IntroDisclosureMobileDemo
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/disclosure-intro.tsx
// FILE: src/components/ui/component.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import {
  AnimatePresence as FramerAnimatePresence,
  motion as framerMotion,
  useAnimation as framerUseAnimation,
  type PanInfo as FramerPanInfo,
} from "framer-motion"
import { CheckIcon, ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Progress } from "@/components/ui/progress"

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches ?? false
}

function useFeatureVisibility(featureId: string) {
  const [isVisible, setIsVisible] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const storedValue = localStorage.getItem(`feature_${featureId}`)
    setIsVisible(storedValue ? JSON.parse(storedValue) : true)
  }, [featureId])

  const hideFeature = () => {
    localStorage.setItem(`feature_${featureId}`, JSON.stringify(false))
    setIsVisible(false)
  }

  return { isVisible: isVisible === null ? false : isVisible, hideFeature }
}

function useSwipe(onSwipe: (direction: "left" | "right") => void) {
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: FramerPanInfo
  ) => {
    if (info.offset.x > 100) {
      onSwipe("right")
    } else if (info.offset.x < -100) {
      onSwipe("left")
    }
  }

  return { handleDragEnd }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
}

const slideInOut = (direction: 1 | -1) => ({
  initial: { opacity: 0, x: 20 * direction },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 * direction },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
})

const hoverScale = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
}

function StepPreview({ step, direction }: { step: Step; direction: 1 | -1 }) {
  const controls = framerUseAnimation()

  React.useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.3 },
    })
  }, [controls, step])

  return (
    <framerMotion.div
      {...slideInOut(direction)}
      className="relative h-full w-full   overflow-hidden rounded-sm rounded-rb-lg rounded-tl-xl ring-2 ring-black/10 dark:ring-black/10 dark:ring-offset-black ring-offset-8"
    >
      {step.media ? (
        <div className="relative bg-black h-full w-full">
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="h-full w-full max-h-[700px]"
          >
            {step.media.type === "image" ? (
              <Image
                src={step.media.src || "/placeholder.svg"}
                alt={step.media.alt || ""}
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={step.media.src}
                controls
                className="h-full w-full object-cover"
              />
            )}
          </framerMotion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="absolute bottom-0 left-0 right-0 p-6"
          >
            <h3 className="mb-2 text-2xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-white hidden md:block">
              {step.full_description}
            </p>
          </framerMotion.div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-6">
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center"
          >
            <h3 className="mb-2 text-2xl font-semibold text-primary">
              {step.title}
            </h3>
            <p className="text-muted-foreground">{step.full_description}</p>
          </framerMotion.div>
        </div>
      )}
    </framerMotion.div>
  )
}

interface StepTabProps {
  step: Step
  isActive: boolean
  onClick: () => void
  isCompleted: boolean
}

function StepTab({ step, isActive, onClick, isCompleted }: StepTabProps) {
  return (
    <framerMotion.button
      {...hoverScale}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start rounded-lg px-4 py-2 text-left transition-colors w-full",
        isActive ? "bg-muted border border-border" : "hover:bg-muted/70",
        "relative"
      )}
      aria-current={isActive ? "step" : undefined}
      aria-label={`${step.title}${isCompleted ? " (completed)" : ""}`}
    >
      <div className="mb-1 text-sm font-medium">{step.title}</div>
      <div className="text-xs hidden md:block text-muted-foreground line-clamp-2">
        {step.short_description}
      </div>
      {isCompleted && (
        <framerMotion.div {...fadeInScale} className="absolute right-2 top-2">
          <div className="rounded-full bg-primary p-1">
            <CheckIcon className="w-2 h-2 text-primary-foreground" />
          </div>
        </framerMotion.div>
      )}
    </framerMotion.button>
  )
}

interface Step {
  title: string
  short_description: string
  full_description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  media?: {
    type: "image" | "video"
    src: string
    alt?: string
  }
}

interface FeatureDisclosureProps {
  steps: Step[]
  featureId: string
  onComplete?: () => void
  onSkip?: () => void
  showProgressBar?: boolean
  open: boolean
  setOpen: (open: boolean) => void
  forceVariant?: "mobile" | "desktop"
}

interface StepContentProps {
  steps: Step[]
  currentStep: number
  onSkip: () => void
  onNext: () => void
  onPrevious: () => void
  hideFeature: () => void
  completedSteps: number[]
  onStepSelect: (index: number) => void
  direction: 1 | -1
  isDesktop: boolean
}

function StepContent({
  steps,
  currentStep,
  onSkip,
  onNext,
  onPrevious,
  hideFeature,
  completedSteps,
  onStepSelect,
  direction,
  isDesktop,
  stepRef,
}: StepContentProps & { stepRef: React.RefObject<HTMLButtonElement> }) {
  const [skipNextTime, setSkipNextTime] = React.useState(false)

  const renderActionButton = (action: Step["action"]) => {
    if (!action) return null

    if (action.href) {
      return (
        <Button asChild className="w-full " size="sm" variant="link">
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2">
              {action.label}
              <ExternalLinkIcon className="w-4 h-4" />
            </span>
          </a>
        </Button>
      )
    }

    return (
      <Button
        className="w-full rounded-full"
        size="sm"
        variant="secondary"
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    )
  }

  return (
    <div className="flex h-full flex-col max-w-3xl mx-auto">
      {isDesktop && (
        <div className="flex-1  px-2 py-3">
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-2 flex flex-col justify-center items-center px-1"
          >
            {steps.map((step, index) => (
              <StepTab
                key={index}
                step={step}
                isActive={currentStep === index}
                onClick={() => onStepSelect(index)}
                isCompleted={completedSteps.includes(index)}
              />
            ))}
          </framerMotion.div>
        </div>
      )}
      <FramerAnimatePresence mode="wait" initial={false}>
        <framerMotion.div
          key={currentStep}
          {...slideInOut(direction)}
          className="mt-6 space-y-4 "
        >
          {!isDesktop && steps[currentStep]?.media && (
            <AspectRatio
              ratio={16 / 9}
              className="lg:overflow-hidden rounded-lg bg-muted "
            >
              {steps[currentStep]?.media?.type === "image" ? (
                <Image
                  src={steps[currentStep]?.media?.src || "/placeholder.svg"}
                  alt={steps[currentStep]?.media?.alt || ""}
                  fill
                  className="object-cover "
                />
              ) : (
                <video
                  src={steps[currentStep]?.media?.src}
                  controls
                  className="h-full w-full object-cover"
                />
              )}
            </AspectRatio>
          )}

          {steps[currentStep]?.action ? (
            <div className=" px-2">
              {renderActionButton(steps[currentStep]?.action)}
            </div>
          ) : (
            <div className="h-10" />
          )}

          <div className="flex items-center justify-between pr-4">
            <Button
              variant="ghost"
              onClick={onSkip}
              className="text-muted-foreground hover:bg-card rounded-full"
            >
              Skip all
            </Button>
            <div className="space-x-2">
              {currentStep > 0 && (
                <Button
                  onClick={onPrevious}
                  size="sm"
                  variant="ghost"
                  className="rounded-full hover:bg-transparent"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={() => {
                  if (skipNextTime) {
                    hideFeature()
                  }
                  onNext()
                }}
                size="sm"
                ref={stepRef}
                className="rounded-full"
              >
                {currentStep === steps.length - 1 ? "Done" : "Next"}
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 pb-4 px-4">
            <Checkbox
              id="skipNextTime"
              checked={skipNextTime}
              onCheckedChange={(checked) => setSkipNextTime(checked as boolean)}
            />
            <label
              htmlFor="skipNextTime"
              className="text-sm text-muted-foreground"
            >
              Don't show this again
            </label>
          </div>
        </framerMotion.div>
      </FramerAnimatePresence>
    </div>
  )
}

export function Component({
  steps,
  open,
  setOpen,
  featureId,
  onComplete,
  onSkip,
  showProgressBar = true,
  forceVariant,
}: FeatureDisclosureProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([0])
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const isDesktopQuery = useMediaQuery("(min-width: 768px)")
  const isDesktop = forceVariant ? forceVariant === "desktop" : isDesktopQuery
  const { isVisible, hideFeature } = useFeatureVisibility(featureId)
  const stepRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (!isVisible) {
      setOpen(false)
    }
  }, [isVisible, setOpen])

  React.useEffect(() => {
    if (open && stepRef.current) {
      stepRef.current.focus()
    }
  }, [open, currentStep])

  if (!isVisible || !open) {
    return null
  }

  const handleNext = () => {
    setDirection(1)
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    )
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setOpen(false)
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    setDirection(-1)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setOpen(false)
    onSkip?.()
  }

  const handleStepSelect = (index: number) => {
    setDirection(index > currentStep ? 1 : -1)
    setCompletedSteps((prev) => {
      const newCompletedSteps = new Set(prev)
      if (index > currentStep) {
        for (let i = currentStep; i <= index; i++) {
          newCompletedSteps.add(i)
        }
      }
      return Array.from(newCompletedSteps)
    })
    setCurrentStep(index)
  }

  const handleSwipe = (swipeDirection: "left" | "right") => {
    if (swipeDirection === "left") {
      handleNext()
    } else {
      handlePrevious()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      handleNext()
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      handlePrevious()
    }
  }

  const { handleDragEnd } = useSwipe(handleSwipe)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-5xl p-0 gap-0 overflow-hidden "
          onKeyDown={handleKeyDown}
        >
          <DialogHeader className="p-6 space-y-2 bg-muted border-b border-border">
            <DialogTitle>Feature Tour</DialogTitle>
            {showProgressBar && (
              <div className="flex mt-2 w-full justify-center  ">
                <Progress
                  value={((currentStep + 1) / steps.length) * 100}
                  className="  h-1 "
                />
              </div>
            )}
          </DialogHeader>

          <div className="grid grid-cols-2 h-full">
            <div className="p-2 pr-[18px] ">
              <StepContent
                steps={steps}
                currentStep={currentStep}
                onSkip={handleSkip}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hideFeature={hideFeature}
                completedSteps={completedSteps}
                onStepSelect={handleStepSelect}
                direction={direction}
                isDesktop={isDesktop}
                stepRef={stepRef}
              />
            </div>
            <FramerAnimatePresence mode="wait" initial={false}>
              <StepPreview
                key={currentStep}
                step={steps[currentStep]}
                direction={direction}
              />
            </FramerAnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-[95vh] max-h-[95vh] ">
        <framerMotion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          onKeyDown={handleKeyDown}
          className="h-full flex flex-col max-w-3xl mx-auto"
        >
          <DrawerHeader className="text-left  pb-4 space-y-4">
            {showProgressBar && (
              <Progress
                value={((currentStep + 1) / steps.length) * 100}
                className="mb-4"
              />
            )}
            <DrawerTitle>{steps[currentStep]?.title}</DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4 pb-32">
              <div className="grid grid-cols-2 gap-2 mb-6">
                {steps.map((step, index) => (
                  <StepTab
                    key={index}
                    step={step}
                    isActive={currentStep === index}
                    onClick={() => handleStepSelect(index)}
                    isCompleted={completedSteps.includes(index)}
                  />
                ))}
              </div>
              <div className="relative aspect-[16/9] ring-2 ring-border ring-offset-8 ring-offset-background rounded-lg overflow-hidden">
                <StepPreview step={steps[currentStep]} direction={direction} />
              </div>

              <div className="space-y-4 border border-border p-3 rounded-lg">
                <p className="text-muted-foreground">
                  {steps[currentStep]?.short_description}
                </p>
                {steps[currentStep]?.action && (
                  <Button
                    asChild
                    className="w-full"
                    variant={
                      steps[currentStep]?.action?.href ? "outline" : "default"
                    }
                  >
                    {steps[currentStep]?.action?.href ? (
                      <a
                        href={steps[currentStep]?.action?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {steps[currentStep]?.action?.label}
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <button onClick={steps[currentStep]?.action?.onClick}>
                        {steps[currentStep]?.action?.label}
                      </button>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t bg-background">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="text-muted-foreground hover:bg-card rounded-full"
                >
                  Skip all
                </Button>
                <div className="space-x-2">
                  {currentStep > 0 && (
                    <Button
                      onClick={handlePrevious}
                      size="sm"
                      variant="ghost"
                      className="rounded-full hover:bg-transparent"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      handleNext()
                    }}
                    size="sm"
                    ref={stepRef}
                    className="rounded-full"
                  >
                    {currentStep === steps.length - 1 ? "Done" : "Next"}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skipNextTime"
                  onCheckedChange={(checked) => {
                    hideFeature()
                  }}
                />
                <label
                  htmlFor="skipNextTime"
                  className="text-sm text-muted-foreground"
                >
                  Don't show this again
                </label>
              </div>
            </div>
          </div>
        </framerMotion.div>
      </DrawerContent>
    </Drawer>
  )
}
```

Install NPM dependencies:
```bash
next, framer-motion, lucide-react
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
