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
special-card.tsx
"use client"

import { useEffect, useState, type MouseEvent } from "react"
import Image from "next/image"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from "motion/react"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  title: string
  description: string
  bgClass?: string
}

function FeatureCard({
  title,
  description,
  bgClass,
  children,
}: CardProps & {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className="animated-cards relative w-full rounded-[16px]"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-neutral-900/90 to-stone-800 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90",
          "md:hover:border-transparent",
          bgClass
        )}
      >
        <div className="m-10 min-h-[550px] w-full">
          <div className="flex w-4/6 flex-col gap-3">
            <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
              {title}
            </h2>
            <p className="text-sm leading-5 text-neutral-300 dark:text-zinc-400 sm:text-base sm:leading-5">
              <Balancer>{description}</Balancer>
            </p>
          </div>
          {mounted ? children : null}
        </div>
      </div>
    </motion.div>
  )
}

const steps = [
  { id: "1", name: "" },
  { id: "2", name: "" },
  { id: "3", name: "" },
]

export function SkiperCard({
  image,
  step1img1Class,
  step1img2Class,
  step2img1Class,
  step2img2Class,
  step3imgClass,
  step4imgClass,
  ...props
}: CardProps & {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  image: {
    step1light1: string
    step1light2: string
    step2light1: string
    step2light2: string
    step3light: string
    step4light: string
    alt: string
  }
}) {
  const { currentNumber: step, increment } = useNumberCycler()

  return (
    <FeatureCard {...props}>
      <div
        className={cn(
          { "translate-x-0 opacity-0": step < 3 },
          "absolute left-2/4 top-1/3 flex w-full -translate-x-1/2 -translate-y-[33%] flex-col gap-12 text-center text-2xl font-bold transition-all duration-500 md:w-3/5 "
        )}
      >
        <Image
          alt={image.alt}
          className={cn("pointer-events-none top-1/2 w-[90%] overflow-hidden rounded-2xl border border-neutral-100/10 transition-all duration-500 dark:border-zinc-700 md:left-[35px] md:top-[30%] md:w-full", step4imgClass)}
          src={image.step4light}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
      </div>

      <>
        <Image
          alt={image.alt}
          className={cn(step1img1Class, {
            "-translate-x-36 opacity-0 rounded-2xl": step > 0,
          })}
          src={image.step1light1}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <Image
          alt={image.alt}
          className={cn(step1img2Class, {
            "-translate-x-24 opacity-0 rounded-2xl": step > 0,
          })}
          src={image.step1light2}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />

        <Image
          alt={image.alt}
          className={cn(
            step2img1Class,
            "rounded-2xl",
            { "translate-x-36 opacity-0": step < 1 },
            { "-translate-x-36 opacity-0": step > 1 }
          )}
          src={image.step2light1}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <Image
          alt={image.alt}
          className={cn(
            step2img2Class,
            "rounded-2xl ",
            { "translate-x-24 opacity-0": step < 1 },
            { "-translate-x-24 opacity-0": step > 1 }
          )}
          src={image.step2light2}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <Image
          alt={image.alt}
          className={cn(
            step3imgClass,
            "rounded-2xl",
            { "translate-x-36 opacity-0": step < 2 },
            { "-translate-x-36 opacity-0": step > 2 },
            { "opacity-90": step === 2 }
          )}
          src={image.step3light}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <div className="absolute left-48 top-5 z-50 size-full cursor-pointer md:left-0">
          <Steps current={step} onChange={() => {}} steps={steps} />
        </div>
      </>

      <div
        className="absolute right-0 top-0 z-50 size-full cursor-pointer md:left-0"
        onClick={() => increment()}
      />
    </FeatureCard>
  )
}

function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

interface StepsProps {
  steps: { id: string; name: string }[]
  current: number
  onChange: (stepIdx: number) => void
}

export function Steps({ steps, current, onChange }: StepsProps) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4 ">
      <ol
        className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0"
        role="list"
      >
        {steps.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          const isFuture = !isCompleted && !isCurrent
          return (
            <li
              className={cn(
                "relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                isCompleted ? "bg-neutral-500/20" : "bg-neutral-500/10"
              )}
              key={`${step.name}-${stepIdx}`}
            >
              <div
                className={cn(
                  "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2",
                  (isFuture || isCurrent) && "pointer-events-none"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className="flex shrink-0 items-center justify-center rounded-full duration-300">
                  {isCompleted ? (
                    <IconCheck className="size-3 stroke-white stroke-[3] text-white dark:stroke-black" />
                  ) : (
                    <span
                      className={cn(
                        "text-xs",
                        !isCurrent && "text-[#C6EA7E]"
                      )}
                    >
                      {stepIdx + 1}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium duration-300",
                    isCompleted && "text-brand-400 dark:text-brand-500",
                    isFuture && "text-neutral-500"
                  )}
                >
                  {step.name}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function useNumberCycler() {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [dummy, setDummy] = useState(0)

  const increment = () => {
    setCurrentNumber((prevNumber) => {
      return (prevNumber + 1) % 4
    })

    setDummy((prev) => prev + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        return (prevNumber + 1) % 4
      })
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [dummy])

  return {
    increment,
    currentNumber,
  }
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isSmall = window.matchMedia("(max-width: 768px)").matches
    const isMobileDevice = Boolean(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
        userAgent
      )
    )

    const isDev = process.env.NODE_ENV !== "production"
    if (isDev) setIsMobile(isSmall || isMobileDevice)

    setIsMobile(isSmall && isMobileDevice)
  }, [])

  return isMobile
}

code.demo.1750555959582.tsx
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { SkiperCard } from "@/components/ui/special-card"

const shiftCard = "https://plus.unsplash.com/premium_photo-1749857804698-270c9cdc544b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const family = "https://plus.unsplash.com/premium_photo-1748880489948-5ccf839bd9a9?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const carousel = "https://images.unsplash.com/photo-1750096319146-6310519b5af2?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const textureFull = "https://images.unsplash.com/photo-1748365335160-566e2b914b45?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const skiper = "https://images.unsplash.com/photo-1749742756679-678e39a9b31d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D";
const textureCard = "https://images.unsplash.com/photo-1706781273757-4ed613b26e9b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const DemoComponent = () => {
  return (
    <section className="relative my-14 w-full overflow-hidden " id="features">
      <div className=" p-2">
        <div className="mb-8 mx-auto pt-4 md:container">
          <div className=" mx-auto">
            <div className="flex w-full items-center justify-center">
              <Badge
                variant="outline"
                className="mb-8 rounded-[14px] border border-black/10 bg-white text-base dark:border dark:border-white/10 dark:bg-transparent md:left-6"
              >
                <SparklesIcon className="  fill-[#EEBDE0] stroke-1 text-neutral-800" />
                Component Preview
              </Badge>
            </div>

            <div className=" mx-auto max-w-4xl rounded-[34px] bg-neutral-700">
              <div className="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
                <SkiperCard
                  step1img1Class={cn(
                    "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                    "left-1/4 top-[57%] rounded-[24px] max-md:scale-[160%] max-md:rounded-[24px] md:left-[35px] md:top-[29%]",
                    "md:group-hover:translate-y-2"
                  )}
                  step1img2Class={cn(
                    "pointer-events-none w-3/5 overflow-hidden border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                    "left-[69%] top-[53%] rounded-2xl max-md:scale-[160%] max-md:rounded-[24px] md:left-[calc(50%+35px+1rem)] md:top-[21%]",
                    "md:group-hover:-translate-y-6 "
                  )}
                  step2img1Class={cn(
                    "pointer-events-none w-[50%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "left-1/4 top-[69%] max-md:scale-[160%] md:left-[35px] md:top-[30%]",
                    "md:group-hover:translate-y-2"
                  )}
                  step2img2Class={cn(
                    "pointer-events-none w-2/5 overflow-hidden rounded-2xl rounded-t-[24px] border border-stone-100/10 transition-all duration-500 group-hover:-translate-y-6 dark:border-stone-700",
                    "left-[70%] top-[53%] max-md:scale-[140%] md:left-[calc(50%+27px+1rem)] md:top-1/4",
                    "md:group-hover:-translate-y-6"
                  )}
                  step3imgClass={cn(
                    "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "left-[5%] top-[50%] md:left-1/2 md:left-[68px] md:top-[30%]"
                  )}
                  step4imgClass={cn(
                    "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                    "left-[5%] top-[50%] md:left-1/2 md:left-[68px] md:top-[30%]"
                  )}
                  description="Make your app 🤌"
                  bgClass="lg:bg-gradient-to-tr"
                  image={{
                    step1light1: family,
                    step1light2: shiftCard,
                    step2light1: carousel,
                    step2light2: textureFull,
                    step3light: textureCard,
                    step4light: skiper,
                    alt: "Something",
                  }}
                  title="Components that pop"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoComponent;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/special-card.tsx
"use client"

import { useEffect, useState, type MouseEvent } from "react"
import Image from "next/image"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from "motion/react"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  title: string
  description: string
  bgClass?: string
}

function FeatureCard({
  title,
  description,
  bgClass,
  children,
}: CardProps & {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className="animated-cards relative w-full rounded-[16px]"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-neutral-900/90 to-stone-800 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90",
          "md:hover:border-transparent",
          bgClass
        )}
      >
        <div className="m-10 min-h-[550px] w-full">
          <div className="flex w-4/6 flex-col gap-3">
            <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
              {title}
            </h2>
            <p className="text-sm leading-5 text-neutral-300 dark:text-zinc-400 sm:text-base sm:leading-5">
              <Balancer>{description}</Balancer>
            </p>
          </div>
          {mounted ? children : null}
        </div>
      </div>
    </motion.div>
  )
}

const steps = [
  { id: "1", name: "" },
  { id: "2", name: "" },
  { id: "3", name: "" },
]

export function SkiperCard({
  image,
  step1img1Class,
  step1img2Class,
  step2img1Class,
  step2img2Class,
  step3imgClass,
  step4imgClass,
  ...props
}: CardProps & {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  image: {
    step1light1: string
    step1light2: string
    step2light1: string
    step2light2: string
    step3light: string
    step4light: string
    alt: string
  }
}) {
  const { currentNumber: step, increment } = useNumberCycler()

  return (
    <FeatureCard {...props}>
      <div
        className={cn(
          { "translate-x-0 opacity-0": step < 3 },
          "absolute left-2/4 top-1/3 flex w-full -translate-x-1/2 -translate-y-[33%] flex-col gap-12 text-center text-2xl font-bold transition-all duration-500 md:w-3/5 "
        )}
      >
        <Image
          alt={image.alt}
          className={cn("pointer-events-none top-1/2 w-[90%] overflow-hidden rounded-2xl border border-neutral-100/10 transition-all duration-500 dark:border-zinc-700 md:left-[35px] md:top-[30%] md:w-full", step4imgClass)}
          src={image.step4light}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
      </div>

      <>
        <Image
          alt={image.alt}
          className={cn(step1img1Class, {
            "-translate-x-36 opacity-0 rounded-2xl": step > 0,
          })}
          src={image.step1light1}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <Image
          alt={image.alt}
          className={cn(step1img2Class, {
            "-translate-x-24 opacity-0 rounded-2xl": step > 0,
          })}
          src={image.step1light2}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />

        <Image
          alt={image.alt}
          className={cn(
            step2img1Class,
            "rounded-2xl",
            { "translate-x-36 opacity-0": step < 1 },
            { "-translate-x-36 opacity-0": step > 1 }
          )}
          src={image.step2light1}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <Image
          alt={image.alt}
          className={cn(
            step2img2Class,
            "rounded-2xl ",
            { "translate-x-24 opacity-0": step < 1 },
            { "-translate-x-24 opacity-0": step > 1 }
          )}
          src={image.step2light2}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <Image
          alt={image.alt}
          className={cn(
            step3imgClass,
            "rounded-2xl",
            { "translate-x-36 opacity-0": step < 2 },
            { "-translate-x-36 opacity-0": step > 2 },
            { "opacity-90": step === 2 }
          )}
          src={image.step3light}
          width={800}
          height={300}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
          }}
        />
        <div className="absolute left-48 top-5 z-50 size-full cursor-pointer md:left-0">
          <Steps current={step} onChange={() => {}} steps={steps} />
        </div>
      </>

      <div
        className="absolute right-0 top-0 z-50 size-full cursor-pointer md:left-0"
        onClick={() => increment()}
      />
    </FeatureCard>
  )
}

function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

interface StepsProps {
  steps: { id: string; name: string }[]
  current: number
  onChange: (stepIdx: number) => void
}

export function Steps({ steps, current, onChange }: StepsProps) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4 ">
      <ol
        className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0"
        role="list"
      >
        {steps.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          const isFuture = !isCompleted && !isCurrent
          return (
            <li
              className={cn(
                "relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                isCompleted ? "bg-neutral-500/20" : "bg-neutral-500/10"
              )}
              key={`${step.name}-${stepIdx}`}
            >
              <div
                className={cn(
                  "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2",
                  (isFuture || isCurrent) && "pointer-events-none"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className="flex shrink-0 items-center justify-center rounded-full duration-300">
                  {isCompleted ? (
                    <IconCheck className="size-3 stroke-white stroke-[3] text-white dark:stroke-black" />
                  ) : (
                    <span
                      className={cn(
                        "text-xs",
                        !isCurrent && "text-[#C6EA7E]"
                      )}
                    >
                      {stepIdx + 1}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium duration-300",
                    isCompleted && "text-brand-400 dark:text-brand-500",
                    isFuture && "text-neutral-500"
                  )}
                >
                  {step.name}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function useNumberCycler() {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [dummy, setDummy] = useState(0)

  const increment = () => {
    setCurrentNumber((prevNumber) => {
      return (prevNumber + 1) % 4
    })

    setDummy((prev) => prev + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        return (prevNumber + 1) % 4
      })
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [dummy])

  return {
    increment,
    currentNumber,
  }
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isSmall = window.matchMedia("(max-width: 768px)").matches
    const isMobileDevice = Boolean(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
        userAgent
      )
    )

    const isDev = process.env.NODE_ENV !== "production"
    if (isDev) setIsMobile(isSmall || isMobileDevice)

    setIsMobile(isSmall && isMobileDevice)
  }, [])

  return isMobile
}
```

Install NPM dependencies:
```bash
next, motion, react-wrap-balancer
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
