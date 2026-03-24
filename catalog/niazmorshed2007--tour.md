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
tour.tsx
"use client"

import { AnimatePresence, motion } from "motion/react"
import type React from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Torus } from "lucide-react"

// Constants
export const TOUR_STEP_IDS = {
  TEAM_SWITCHER: "team-switcher",
  WRITING_AREA: "writing-area",
  ASK_AI: "ask-ai",
  FAVORITES: "favorites",
} as const

export interface TourStep {
  content: React.ReactNode
  selectorId: string
  width?: number
  height?: number
  onClickWithinArea?: () => void
  position?: "top" | "bottom" | "left" | "right"
}

interface TourContextType {
  currentStep: number
  totalSteps: number
  nextStep: () => void
  previousStep: () => void
  endTour: () => void
  isActive: boolean
  startTour: () => void
  setSteps: (steps: TourStep[]) => void
  steps: TourStep[]
  isTourCompleted: boolean
  setIsTourCompleted: (completed: boolean) => void
}

interface TourProviderProps {
  children: React.ReactNode
  onComplete?: () => void
  className?: string
  isTourCompleted?: boolean
}

const TourContext = createContext<TourContextType | null>(null)

const PADDING = 16;
const CONTENT_WIDTH = 300;
const CONTENT_HEIGHT = 174;

function getElementPosition(id: string) {
  const element = document.getElementById(id)
  if (!element) return null
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  }
}

function calculateContentPosition(
  elementPos: { top: number; left: number; width: number; height: number },
  position: "top" | "bottom" | "left" | "right" = "bottom",
) {
  let left = elementPos.left
  let top = elementPos.top

  switch (position) {
    case "top":
      top = elementPos.top - CONTENT_HEIGHT - PADDING
      left = elementPos.left + elementPos.width / 2 - CONTENT_WIDTH / 2
      break
    case "bottom":
      top = elementPos.top + elementPos.height + PADDING
      left = elementPos.left + elementPos.width / 2 - CONTENT_WIDTH / 2
      break
    case "left":
      left = elementPos.left - CONTENT_WIDTH - PADDING
      top = elementPos.top + elementPos.height / 2 - CONTENT_HEIGHT / 2
      break
    case "right":
      left = elementPos.left + elementPos.width + PADDING
      top = elementPos.top + elementPos.height / 2 - CONTENT_HEIGHT / 2
      break
  }

  return {
    top,
    left,
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
  }
}

export function TourProvider({
  children,
  onComplete,
  className,
  isTourCompleted = false,
}: TourProviderProps) {
  const [steps, setSteps] = useState<TourStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [elementPosition, setElementPosition] = useState<{
    top: number
    left: number
    width: number
    height: number
  } | null>(null)
  const [isCompleted, setIsCompleted] = useState(isTourCompleted)

  const updateElementPosition = useCallback(() => {
    if (currentStep >= 0 && currentStep < steps.length) {
      const position = getElementPosition(steps[currentStep]?.selectorId ?? "")
      if (position) {
        setElementPosition(position)
      }
    }
  }, [currentStep, steps])

  useEffect(() => {
    updateElementPosition()
    window.addEventListener("resize", updateElementPosition)
    window.addEventListener("scroll", updateElementPosition)

    return () => {
      window.removeEventListener("resize", updateElementPosition)
      window.removeEventListener("scroll", updateElementPosition)
    }
  }, [updateElementPosition])

  const nextStep = useCallback(async () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        return -1
      }
      return prev + 1
    })

    if (currentStep === steps.length - 1) {
      setIsTourCompleted(true)
      onComplete?.()
    }
  }, [steps.length, onComplete, currentStep])

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const endTour = useCallback(() => {
    setCurrentStep(-1)
  }, [])

  const startTour = useCallback(() => {
    if (isTourCompleted) {
      return
    }
    setCurrentStep(0)
  }, [isTourCompleted])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        currentStep >= 0 &&
        elementPosition &&
        steps[currentStep]?.onClickWithinArea
      ) {
        const clickX = e.clientX + window.scrollX
        const clickY = e.clientY + window.scrollY

        const isWithinBounds =
          clickX >= elementPosition.left &&
          clickX <=
            elementPosition.left +
              (steps[currentStep]?.width || elementPosition.width) &&
          clickY >= elementPosition.top &&
          clickY <=
            elementPosition.top +
              (steps[currentStep]?.height || elementPosition.height)

        if (isWithinBounds) {
          steps[currentStep].onClickWithinArea?.()
        }
      }
    },
    [currentStep, elementPosition, steps],
  )

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [handleClick])

  const setIsTourCompleted = useCallback((completed: boolean) => {
    setIsCompleted(completed)
  }, [])

  return (
    <TourContext.Provider
      value={{
        currentStep,
        totalSteps: steps.length,
        nextStep,
        previousStep,
        endTour,
        isActive: currentStep >= 0,
        startTour,
        setSteps,
        steps,
        isTourCompleted: isCompleted,
        setIsTourCompleted,
      }}
    >
      {children}
      <AnimatePresence>
        {currentStep >= 0 && elementPosition && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-hidden bg-black/50"
              style={{
                clipPath: `polygon(
                  0% 0%,
                  0% 100%,
                  100% 100%,
                  100% 0%,
                  
                  ${elementPosition.left}px 0%,
                  ${elementPosition.left}px ${elementPosition.top}px,
                  ${elementPosition.left + (steps[currentStep]?.width || elementPosition.width)}px ${elementPosition.top}px,
                  ${elementPosition.left + (steps[currentStep]?.width || elementPosition.width)}px ${elementPosition.top + (steps[currentStep]?.height || elementPosition.height)}px,
                  ${elementPosition.left}px ${elementPosition.top + (steps[currentStep]?.height || elementPosition.height)}px,
                  ${elementPosition.left}px 0%
                )`,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: "fixed",
                top: elementPosition.top,
                left: elementPosition.left,
                width: elementPosition.width,
                height: elementPosition.height,
              }}
              className={cn("z-[100] border-2 border-primary", className)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                ...calculateContentPosition(
                  elementPosition,
                  steps[currentStep]?.position,
                ),
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: "fixed",
                zIndex: 1000,
                width: CONTENT_WIDTH,
              }}
              className="bg-background relative rounded-lg border p-4 shadow-lg min-h-[120px]"
            >
              <div className="text-muted-foreground absolute right-4 top-2 text-xs">
                {currentStep + 1} / {steps.length}
              </div>
              <AnimatePresence mode="wait">
                <div>
                  <motion.div
                    key={`tour-content-${currentStep}`}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    className="overflow-hidden pt-4"
                    transition={{
                      duration: 0.2,
                      height: {
                        duration: 0.4,
                      },
                    }}
                  >
                    {steps[currentStep]?.content}
                  </motion.div>
                  <div className="mt-4 flex justify-between">
                    {currentStep > 0 && (
                      <Button
                        onClick={previousStep}
                        variant="ghost"
                        disabled={currentStep === 0}
                        className="text-sm"
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      onClick={nextStep}
                      variant="ghost"
                      className={cn("text-sm", !currentStep && "ml-auto")}
                    >
                      {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error("useTour must be used within a TourProvider")
  }
  return context
}

export function TourAlertDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { startTour, steps, isTourCompleted, currentStep } = useTour()

  if (isTourCompleted || steps.length === 0 || currentStep > -1) {
    return null
  }

  const handleSkip = async () => {
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md p-6">
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <div className="relative mb-4">
            <motion.div
              initial={{ scale: 0.7, filter: "blur(10px)" }}
              animate={{
                scale: 1,
                filter: "blur(0px)",
                y: [0, -8, 0],
                rotate: [42, 48, 42],
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                y: {
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <Torus className="size-32 stroke-1 text-primary" />
            </motion.div>
          </div>
          <AlertDialogTitle className="text-center text-xl font-medium">
            Welcome to the Tour
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground mt-2 text-center text-sm">
            Take a quick tour to learn about the key features and functionality
            of this application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-6 space-y-3">
          <Button onClick={startTour} className="w-full">
            Start Tour
          </Button>
          <Button onClick={handleSkip} variant="ghost" className="w-full">
            Skip Tour
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}


code.demo.1737712250654.tsx
"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  TourProvider,
  TourAlertDialog,
  useTour,
  TOUR_STEP_IDS,
} from "@/components/ui/tour"
import { useState } from "react"

function TourDemo() {
  const [showTourDialog, setShowTourDialog] = useState(true)

  return (
    <TourProvider>
      <div className="container max-w-[300px] mx-auto py-10">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Tour Demo</h1>
            <p className="text-muted-foreground">
              Example of the tour component in action.
            </p>
          </div>

          <div className="grid gap-8">
            <div className="flex items-center justify-between">
              <div id={TOUR_STEP_IDS.TEAM_SWITCHER} className="inline-block">
                <Button size="lg">
                  Team Switcher
                </Button>
              </div>

              <div id={TOUR_STEP_IDS.ASK_AI} className="inline-block">
                <Button variant="outline" size="lg">
                  Ask AI
                </Button>
              </div>
            </div>

            <div
              id={TOUR_STEP_IDS.WRITING_AREA}
              className="border rounded-lg p-6 min-h-[200px] bg-muted/30"
            >
              <div className="text-muted-foreground text-sm">Writing Area</div>
            </div>

            <div className="flex justify-end">
              <div id={TOUR_STEP_IDS.FAVORITES} className="inline-block">
                <Button variant="secondary" size="lg">
                  Favorites
                </Button>
              </div>
            </div>
          </div>
        </div>

        <TourSteps />
        <TourAlertDialog isOpen={showTourDialog} setIsOpen={setShowTourDialog} />
      </div>
    </TourProvider>
  )
}

function TourSteps() {
  const { setSteps } = useTour()

  useEffect(() => {
    setSteps([
      {
        content: (
          <div className="space-y-2">
            <h3 className="font-medium">Team Switcher</h3>
            <p className="text-sm text-muted-foreground">
              Switch between different teams and workspaces with a single click
            </p>
          </div>
        ),
        selectorId: TOUR_STEP_IDS.TEAM_SWITCHER,
        position: "bottom",
      },
      {
        content: (
          <div className="space-y-2">
            <h3 className="font-medium">Writing Area</h3>
            <p className="text-sm text-muted-foreground">
              A dedicated space for writing and editing your content with real-time
              collaboration
            </p>
          </div>
        ),
        selectorId: TOUR_STEP_IDS.WRITING_AREA,
        position: "top",
      },
      {
        content: (
          <div className="space-y-2">
            <h3 className="font-medium">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Get intelligent suggestions and help from our AI assistant
            </p>
          </div>
        ),
        selectorId: TOUR_STEP_IDS.ASK_AI,
        position: "bottom",
      },
      {
        content: (
          <div className="space-y-2">
            <h3 className="font-medium">Favorites</h3>
            <p className="text-sm text-muted-foreground">
              Quick access to your most important items and frequently used features
            </p>
          </div>
        ),
        selectorId: TOUR_STEP_IDS.FAVORITES,
        position: "left",
      },
    ])
  }, [setSteps])

  return null
}

export { TourDemo }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/tour.tsx
"use client"

import { AnimatePresence, motion } from "motion/react"
import type React from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { Torus } from "lucide-react"

// Constants
export const TOUR_STEP_IDS = {
  TEAM_SWITCHER: "team-switcher",
  WRITING_AREA: "writing-area",
  ASK_AI: "ask-ai",
  FAVORITES: "favorites",
} as const

export interface TourStep {
  content: React.ReactNode
  selectorId: string
  width?: number
  height?: number
  onClickWithinArea?: () => void
  position?: "top" | "bottom" | "left" | "right"
}

interface TourContextType {
  currentStep: number
  totalSteps: number
  nextStep: () => void
  previousStep: () => void
  endTour: () => void
  isActive: boolean
  startTour: () => void
  setSteps: (steps: TourStep[]) => void
  steps: TourStep[]
  isTourCompleted: boolean
  setIsTourCompleted: (completed: boolean) => void
}

interface TourProviderProps {
  children: React.ReactNode
  onComplete?: () => void
  className?: string
  isTourCompleted?: boolean
}

const TourContext = createContext<TourContextType | null>(null)

const PADDING = 16;
const CONTENT_WIDTH = 300;
const CONTENT_HEIGHT = 174;

function getElementPosition(id: string) {
  const element = document.getElementById(id)
  if (!element) return null
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  }
}

function calculateContentPosition(
  elementPos: { top: number; left: number; width: number; height: number },
  position: "top" | "bottom" | "left" | "right" = "bottom",
) {
  let left = elementPos.left
  let top = elementPos.top

  switch (position) {
    case "top":
      top = elementPos.top - CONTENT_HEIGHT - PADDING
      left = elementPos.left + elementPos.width / 2 - CONTENT_WIDTH / 2
      break
    case "bottom":
      top = elementPos.top + elementPos.height + PADDING
      left = elementPos.left + elementPos.width / 2 - CONTENT_WIDTH / 2
      break
    case "left":
      left = elementPos.left - CONTENT_WIDTH - PADDING
      top = elementPos.top + elementPos.height / 2 - CONTENT_HEIGHT / 2
      break
    case "right":
      left = elementPos.left + elementPos.width + PADDING
      top = elementPos.top + elementPos.height / 2 - CONTENT_HEIGHT / 2
      break
  }

  return {
    top,
    left,
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
  }
}

export function TourProvider({
  children,
  onComplete,
  className,
  isTourCompleted = false,
}: TourProviderProps) {
  const [steps, setSteps] = useState<TourStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [elementPosition, setElementPosition] = useState<{
    top: number
    left: number
    width: number
    height: number
  } | null>(null)
  const [isCompleted, setIsCompleted] = useState(isTourCompleted)

  const updateElementPosition = useCallback(() => {
    if (currentStep >= 0 && currentStep < steps.length) {
      const position = getElementPosition(steps[currentStep]?.selectorId ?? "")
      if (position) {
        setElementPosition(position)
      }
    }
  }, [currentStep, steps])

  useEffect(() => {
    updateElementPosition()
    window.addEventListener("resize", updateElementPosition)
    window.addEventListener("scroll", updateElementPosition)

    return () => {
      window.removeEventListener("resize", updateElementPosition)
      window.removeEventListener("scroll", updateElementPosition)
    }
  }, [updateElementPosition])

  const nextStep = useCallback(async () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        return -1
      }
      return prev + 1
    })

    if (currentStep === steps.length - 1) {
      setIsTourCompleted(true)
      onComplete?.()
    }
  }, [steps.length, onComplete, currentStep])

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const endTour = useCallback(() => {
    setCurrentStep(-1)
  }, [])

  const startTour = useCallback(() => {
    if (isTourCompleted) {
      return
    }
    setCurrentStep(0)
  }, [isTourCompleted])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        currentStep >= 0 &&
        elementPosition &&
        steps[currentStep]?.onClickWithinArea
      ) {
        const clickX = e.clientX + window.scrollX
        const clickY = e.clientY + window.scrollY

        const isWithinBounds =
          clickX >= elementPosition.left &&
          clickX <=
            elementPosition.left +
              (steps[currentStep]?.width || elementPosition.width) &&
          clickY >= elementPosition.top &&
          clickY <=
            elementPosition.top +
              (steps[currentStep]?.height || elementPosition.height)

        if (isWithinBounds) {
          steps[currentStep].onClickWithinArea?.()
        }
      }
    },
    [currentStep, elementPosition, steps],
  )

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [handleClick])

  const setIsTourCompleted = useCallback((completed: boolean) => {
    setIsCompleted(completed)
  }, [])

  return (
    <TourContext.Provider
      value={{
        currentStep,
        totalSteps: steps.length,
        nextStep,
        previousStep,
        endTour,
        isActive: currentStep >= 0,
        startTour,
        setSteps,
        steps,
        isTourCompleted: isCompleted,
        setIsTourCompleted,
      }}
    >
      {children}
      <AnimatePresence>
        {currentStep >= 0 && elementPosition && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 overflow-hidden bg-black/50"
              style={{
                clipPath: `polygon(
                  0% 0%,
                  0% 100%,
                  100% 100%,
                  100% 0%,
                  
                  ${elementPosition.left}px 0%,
                  ${elementPosition.left}px ${elementPosition.top}px,
                  ${elementPosition.left + (steps[currentStep]?.width || elementPosition.width)}px ${elementPosition.top}px,
                  ${elementPosition.left + (steps[currentStep]?.width || elementPosition.width)}px ${elementPosition.top + (steps[currentStep]?.height || elementPosition.height)}px,
                  ${elementPosition.left}px ${elementPosition.top + (steps[currentStep]?.height || elementPosition.height)}px,
                  ${elementPosition.left}px 0%
                )`,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: "fixed",
                top: elementPosition.top,
                left: elementPosition.left,
                width: elementPosition.width,
                height: elementPosition.height,
              }}
              className={cn("z-[100] border-2 border-primary", className)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                ...calculateContentPosition(
                  elementPosition,
                  steps[currentStep]?.position,
                ),
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: "fixed",
                zIndex: 1000,
                width: CONTENT_WIDTH,
              }}
              className="bg-background relative rounded-lg border p-4 shadow-lg min-h-[120px]"
            >
              <div className="text-muted-foreground absolute right-4 top-2 text-xs">
                {currentStep + 1} / {steps.length}
              </div>
              <AnimatePresence mode="wait">
                <div>
                  <motion.div
                    key={`tour-content-${currentStep}`}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    className="overflow-hidden pt-4"
                    transition={{
                      duration: 0.2,
                      height: {
                        duration: 0.4,
                      },
                    }}
                  >
                    {steps[currentStep]?.content}
                  </motion.div>
                  <div className="mt-4 flex justify-between">
                    {currentStep > 0 && (
                      <Button
                        onClick={previousStep}
                        variant="ghost"
                        disabled={currentStep === 0}
                        className="text-sm"
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      onClick={nextStep}
                      variant="ghost"
                      className={cn("text-sm", !currentStep && "ml-auto")}
                    >
                      {currentStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error("useTour must be used within a TourProvider")
  }
  return context
}

export function TourAlertDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { startTour, steps, isTourCompleted, currentStep } = useTour()

  if (isTourCompleted || steps.length === 0 || currentStep > -1) {
    return null
  }

  const handleSkip = async () => {
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md p-6">
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <div className="relative mb-4">
            <motion.div
              initial={{ scale: 0.7, filter: "blur(10px)" }}
              animate={{
                scale: 1,
                filter: "blur(0px)",
                y: [0, -8, 0],
                rotate: [42, 48, 42],
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                y: {
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <Torus className="size-32 stroke-1 text-primary" />
            </motion.div>
          </div>
          <AlertDialogTitle className="text-center text-xl font-medium">
            Welcome to the Tour
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground mt-2 text-center text-sm">
            Take a quick tour to learn about the key features and functionality
            of this application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-6 space-y-3">
          <Button onClick={startTour} className="w-full">
            Start Tour
          </Button>
          <Button onClick={handleSkip} variant="ghost" className="w-full">
            Skip Tour
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

```
```tsx
/components/ui/alert-dialog.tsx
"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100%-4rem)] w-full -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border bg-background p-6 shadow-lg shadow-black/5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[400px] sm:rounded-xl",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

```
```tsx
/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

Install NPM dependencies:
```bash
motion, lucide-react, @radix-ui/react-alert-dialog, @radix-ui/react-slot, class-variance-authority
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
