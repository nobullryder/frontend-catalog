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
accordion.tsx
"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const accordionContentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    filter: "blur(0px)",
  },
  closed: {
    height: 0,
    opacity: 0,
    filter: "blur(4px)",
  },
}

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("bg-primary-foreground rounded-lg border px-5", className)}
      {...props}
    />
  )
}

function AccordionItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("relative border-b last:border-b-0", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger({
  children,
  className,
  showIcon = true,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  showIcon?: boolean
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-header"
        className="group active:text-foreground/50 focus-visible:bg-muted flex flex-1 items-start justify-between gap-4 py-4 font-semibold disabled:opacity-50"
        {...props}
      >
        {children}
        {showIcon && (
          <ChevronDown className="size-6 duration-300 group-data-[state=open]:rotate-180" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const element = contentRef.current?.parentElement
    if (!element) return

    const observer = new MutationObserver(() => {
      const state = element.getAttribute("data-state")
      setIsOpen(state === "open")
    })

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    })

    // Set initial state
    const initialState = element.getAttribute("data-state")
    setIsOpen(initialState === "open")

    return () => observer.disconnect()
  }, [])

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden"
      {...props}
    >
      <motion.div
        ref={contentRef}
        animate={isOpen ? "open" : "closed"}
        initial={"closed"}
        variants={accordionContentVariants}
        transition={{
          height: {
            duration: 0.3,
            ease: "easeOut",
          },
          opacity: {
            duration: 0.2,
            delay: 0.1,
          },
          filter: {
            duration: 0.15,
            delay: 0.05,
          },
        }}
      >
        <div className={cn("text-muted-foreground pb-4", className)}>
          {children}
        </div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }


code.demo.1755713480248.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DemoOne() {
  return (
    <Accordion className="w-full m-8" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          It works by analyzing your requirements, leveraging advanced AI
          algorithms to understand context, and executing tasks based on your
          instructions. It can integrate with your workflow, learn from
          feedback, and continuously improve its performance.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How secure is my data?</AccordionTrigger>
        <AccordionContent>
          We implement enterprise-grade security measures including end-to-end
          encryption, secure data centers, and regular security audits. Your
          data is protected according to industry best practices and compliance
          standards.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
        <AccordionContent>
          Yes, we offer a 14-day free trial that gives you full access to all
          features. No credit card is required to start your trial, and you can
          upgrade or cancel at any time.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/accordion.tsx
"use client"

import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const accordionContentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    filter: "blur(0px)",
  },
  closed: {
    height: 0,
    opacity: 0,
    filter: "blur(4px)",
  },
}

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("bg-primary-foreground rounded-lg border px-5", className)}
      {...props}
    />
  )
}

function AccordionItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("relative border-b last:border-b-0", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger({
  children,
  className,
  showIcon = true,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  showIcon?: boolean
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-header"
        className="group active:text-foreground/50 focus-visible:bg-muted flex flex-1 items-start justify-between gap-4 py-4 font-semibold disabled:opacity-50"
        {...props}
      >
        {children}
        {showIcon && (
          <ChevronDown className="size-6 duration-300 group-data-[state=open]:rotate-180" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const element = contentRef.current?.parentElement
    if (!element) return

    const observer = new MutationObserver(() => {
      const state = element.getAttribute("data-state")
      setIsOpen(state === "open")
    })

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    })

    // Set initial state
    const initialState = element.getAttribute("data-state")
    setIsOpen(initialState === "open")

    return () => observer.disconnect()
  }, [])

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden"
      {...props}
    >
      <motion.div
        ref={contentRef}
        animate={isOpen ? "open" : "closed"}
        initial={"closed"}
        variants={accordionContentVariants}
        transition={{
          height: {
            duration: 0.3,
            ease: "easeOut",
          },
          opacity: {
            duration: 0.2,
            delay: 0.1,
          },
          filter: {
            duration: 0.15,
            delay: 0.05,
          },
        }}
      >
        <div className={cn("text-muted-foreground pb-4", className)}>
          {children}
        </div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

Install NPM dependencies:
```bash
motion, lucide-react, @radix-ui/react-accordion
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
