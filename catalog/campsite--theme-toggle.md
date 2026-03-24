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
theme-toggle.tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { SystemTheme } from "@/components/ui/system-theme"
import { LightTheme } from "@/components/ui/light-theme"
import { DarkTheme } from "@/components/ui/dark-theme"

type ThemeType = "light" | "dark" | "system"

interface ThemeOption {
  value: ThemeType
  label: string
  icon: React.ComponentType
}

const themes: ThemeOption[] = [
  { value: "light", label: "Light", icon: LightTheme },
  { value: "dark", label: "Dark", icon: DarkTheme },
  { value: "system", label: "System", icon: SystemTheme },
]

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [systemTheme, setSystemTheme] = React.useState<"dark" | "light">(
    "light",
  )

  React.useEffect(() => {
    setMounted(true)
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(media.matches ? "dark" : "light")

    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-tertiary relative flex w-full scroll-m-4 flex-col rounded-lg border">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-3">
        <div className="font-medium text-base text-primary">Theme</div>
      </div>
      <p className="font-normal text-sm text-secondary mt-0.5 px-3 lg:max-w-2xl">
        Choose your interface color theme
      </p>
      <div className="bg-quaternary my-3 h-px w-full" />
      <div className="p-8 pt-4">
        <form>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value: ThemeType) => setTheme(value)}
            className="grid gap-3 max-sm:space-y-3 sm:grid-cols-3"
          >
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isSelected = theme === themeOption.value
              const isSystem = themeOption.value === "system"
              const currentSystemTheme = isSystem
                ? systemTheme
                : themeOption.value

              return (
                <div
                  key={themeOption.value}
                  className={cn(
                    "flex items-end justify-center rounded-md border px-1.5 pt-3 transition",
                    currentSystemTheme,
                    {
                      "border-blue-500 ring-2 ring-blue-800/60": isSelected,
                      "bg-gray-50": themeOption.value === "light",
                      "bg-secondary": themeOption.value !== "light",
                    },
                  )}
                >
                  <RadioGroupItem
                    value={themeOption.value}
                    id={themeOption.value}
                    className="sr-only"
                  />
                  <label
                    htmlFor={themeOption.value}
                    className="relative cursor-pointer"
                  >
                    <span className="block h-full w-full overflow-hidden">
                      <span className="block rounded-t-sm border border-b-0 shadow-xl shadow-black/20 icon-border">
                        <Icon />
                      </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-2 flex justify-center sm:-bottom-1">
                      <span className="relative">
                        <span className="relative inline-flex h-[30px] transform-gpu touch-none select-none items-center justify-center gap-2 rounded-md border-none border-transparent bg-button px-3 text-[13px] font-semibold leading-none text-primary shadow-button after:absolute after:-inset-[1px] after:block after:rounded-md after:bg-gradient-to-t after:from-black/5 after:opacity-50 after:transition-opacity hover:after:opacity-100 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:after:from-black/[0.15] dark:focus-visible:ring-blue-600">
                          {themeOption.label}
                        </span>
                        {isSelected && (
                          <motion.span
                            className="absolute inset-x-1.5 -bottom-3 h-0.5 rounded-full bg-blue-500 max-sm:hidden"
                            layoutId="activeTheme"
                          />
                        )}
                      </span>
                    </span>
                  </label>
                </div>
              )
            })}
          </RadioGroup>
        </form>
      </div>
    </div>
  )
}


code.demo.1737732149621.tsx
import { ThemeToggle } from "@/components/ui/theme-toggle"

function SettingsPage() {
  return (
    <div className="container">
      <ThemeToggle />
    </div>
  )
}

export { SettingsPage }
```

Copy-paste these files for dependencies:
```tsx
/components/ui/theme-toggle.tsx
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { SystemTheme } from "@/components/ui/system-theme"
import { LightTheme } from "@/components/ui/light-theme"
import { DarkTheme } from "@/components/ui/dark-theme"

type ThemeType = "light" | "dark" | "system"

interface ThemeOption {
  value: ThemeType
  label: string
  icon: React.ComponentType
}

const themes: ThemeOption[] = [
  { value: "light", label: "Light", icon: LightTheme },
  { value: "dark", label: "Dark", icon: DarkTheme },
  { value: "system", label: "System", icon: SystemTheme },
]

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [systemTheme, setSystemTheme] = React.useState<"dark" | "light">(
    "light",
  )

  React.useEffect(() => {
    setMounted(true)
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(media.matches ? "dark" : "light")

    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [])

  if (!mounted) return null

  return (
    <div className="bg-tertiary relative flex w-full scroll-m-4 flex-col rounded-lg border">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-3">
        <div className="font-medium text-base text-primary">Theme</div>
      </div>
      <p className="font-normal text-sm text-secondary mt-0.5 px-3 lg:max-w-2xl">
        Choose your interface color theme
      </p>
      <div className="bg-quaternary my-3 h-px w-full" />
      <div className="p-8 pt-4">
        <form>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value: ThemeType) => setTheme(value)}
            className="grid gap-3 max-sm:space-y-3 sm:grid-cols-3"
          >
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isSelected = theme === themeOption.value
              const isSystem = themeOption.value === "system"
              const currentSystemTheme = isSystem
                ? systemTheme
                : themeOption.value

              return (
                <div
                  key={themeOption.value}
                  className={cn(
                    "flex items-end justify-center rounded-md border px-1.5 pt-3 transition",
                    currentSystemTheme,
                    {
                      "border-blue-500 ring-2 ring-blue-800/60": isSelected,
                      "bg-gray-50": themeOption.value === "light",
                      "bg-secondary": themeOption.value !== "light",
                    },
                  )}
                >
                  <RadioGroupItem
                    value={themeOption.value}
                    id={themeOption.value}
                    className="sr-only"
                  />
                  <label
                    htmlFor={themeOption.value}
                    className="relative cursor-pointer"
                  >
                    <span className="block h-full w-full overflow-hidden">
                      <span className="block rounded-t-sm border border-b-0 shadow-xl shadow-black/20 icon-border">
                        <Icon />
                      </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-2 flex justify-center sm:-bottom-1">
                      <span className="relative">
                        <span className="relative inline-flex h-[30px] transform-gpu touch-none select-none items-center justify-center gap-2 rounded-md border-none border-transparent bg-button px-3 text-[13px] font-semibold leading-none text-primary shadow-button after:absolute after:-inset-[1px] after:block after:rounded-md after:bg-gradient-to-t after:from-black/5 after:opacity-50 after:transition-opacity hover:after:opacity-100 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:after:from-black/[0.15] dark:focus-visible:ring-blue-600">
                          {themeOption.label}
                        </span>
                        {isSelected && (
                          <motion.span
                            className="absolute inset-x-1.5 -bottom-3 h-0.5 rounded-full bg-blue-500 max-sm:hidden"
                            layoutId="activeTheme"
                          />
                        )}
                      </span>
                    </span>
                  </label>
                </div>
              )
            })}
          </RadioGroup>
        </form>
      </div>
    </div>
  )
}

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
```tsx
/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```
```tsx
/components/ui/input.tsx
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```
```tsx
/components/ui/label.tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```
```tsx
/components/ui/checkbox.tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```
```tsx
/components/ui/select.tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```
```tsx
/components/ui/switch.tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```
```tsx
/components/ui/system-theme.tsx
import React from "react"

export const SystemTheme = () => {
  return (
    <svg
      width="177"
      height="140"
      viewBox="0 0 177 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_77_39)">
        <path d="M-12 -12H189L-12 140V-12Z" fill="#F5F5F5" />
        <mask
          id="mask0_77_39"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="-12"
          y="-12"
          width="201"
          height="152"
        >
          <path d="M189 -12V140H-12L189 -12Z" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_77_39)">
          <path
            d="M174 0H3C1.34315 0 0 1.34315 0 3V159C0 160.657 1.34315 162 3 162H174C175.657 162 177 160.657 177 159V3C177 1.34315 175.657 0 174 0Z"
            fill="#171717"
          />
          <path
            d="M44 0H174C175.657 0 177 1.34315 177 3V151H44V0Z"
            fill="#262626"
          />
          <path
            d="M35 12C37.2091 12 39 10.2091 39 8C39 5.79086 37.2091 4 35 4C32.7909 4 31 5.79086 31 8C31 10.2091 32.7909 12 35 12Z"
            fill="#525252"
          />
          <path
            d="M73 44C75.2091 44 77 42.2091 77 40C77 37.7909 75.2091 36 73 36C70.7909 36 69 37.7909 69 40C69 42.2091 70.7909 44 73 44Z"
            fill="#525252"
          />
          <path
            d="M26 5H6C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11H26C26.5523 11 27 10.5523 27 10V6C27 5.44772 26.5523 5 26 5Z"
            fill="#404040"
          />
          <path
            d="M38 16H6C5.44772 16 5 16.4477 5 17V21C5 21.5523 5.44772 22 6 22H38C38.5523 22 39 21.5523 39 21V17C39 16.4477 38.5523 16 38 16Z"
            fill="#171717"
          />
          <path
            d="M38 26H6C5.44772 26 5 26.4477 5 27V31C5 31.5523 5.44772 32 6 32H38C38.5523 32 39 31.5523 39 31V27C39 26.4477 38.5523 26 38 26Z"
            fill="#404040"
          />
          <path
            d="M93 37H82C81.4477 37 81 37.4477 81 38C81 38.5523 81.4477 39 82 39H93C93.5523 39 94 38.5523 94 38C94 37.4477 93.5523 37 93 37Z"
            fill="#A3A3A3"
          />
          <path
            d="M114 37H97C96.4477 37 96 37.4477 96 38C96 38.5523 96.4477 39 97 39H114C114.552 39 115 38.5523 115 38C115 37.4477 114.552 37 114 37Z"
            fill="#A3A3A3"
          />
          <path
            d="M88 42H82C81.4477 42 81 42.4477 81 43C81 43.5523 81.4477 44 82 44H88C88.5523 44 89 43.5523 89 43C89 42.4477 88.5523 42 88 42Z"
            fill="#525252"
          />
          <path
            d="M105 42H92C91.4477 42 91 42.4477 91 43C91 43.5523 91.4477 44 92 44H105C105.552 44 106 43.5523 106 43C106 42.4477 105.552 42 105 42Z"
            fill="#525252"
          />
          <path
            d="M113 42H109C108.448 42 108 42.4477 108 43C108 43.5523 108.448 44 109 44H113C113.552 44 114 43.5523 114 43C114 42.4477 113.552 42 113 42Z"
            fill="#525252"
          />
          <path
            d="M127 42H117C116.448 42 116 42.4477 116 43C116 43.5523 116.448 44 117 44H127C127.552 44 128 43.5523 128 43C128 42.4477 127.552 42 127 42Z"
            fill="#525252"
          />
          <path
            d="M138 42H131C130.448 42 130 42.4477 130 43C130 43.5523 130.448 44 131 44H138C138.552 44 139 43.5523 139 43C139 42.4477 138.552 42 138 42Z"
            fill="#525252"
          />
          <path
            d="M76 47H70C69.4477 47 69 47.4477 69 48C69 48.5523 69.4477 49 70 49H76C76.5523 49 77 48.5523 77 48C77 47.4477 76.5523 47 76 47Z"
            fill="#525252"
          />
          <path
            d="M81 48C81 47.4477 80.5523 47 80 47C79.4477 47 79 47.4477 79 48C79 48.5523 79.4477 49 80 49C80.5523 49 81 48.5523 81 48Z"
            fill="#525252"
          />
          <path
            d="M91 47H84C83.4477 47 83 47.4477 83 48C83 48.5523 83.4477 49 84 49H91C91.5523 49 92 48.5523 92 48C92 47.4477 91.5523 47 91 47Z"
            fill="#525252"
          />
          <path
            d="M109 47H95C94.4477 47 94 47.4477 94 48C94 48.5523 94.4477 49 95 49H109C109.552 49 110 48.5523 110 48C110 47.4477 109.552 47 109 47Z"
            fill="#525252"
          />
          <path
            d="M118 47H113C112.448 47 112 47.4477 112 48C112 48.5523 112.448 49 113 49H118C118.552 49 119 48.5523 119 48C119 47.4477 118.552 47 118 47Z"
            fill="#525252"
          />
          <path
            d="M123 47H122C121.448 47 121 47.4477 121 48C121 48.5523 121.448 49 122 49H123C123.552 49 124 48.5523 124 48C124 47.4477 123.552 47 123 47Z"
            fill="#525252"
          />
          <path
            d="M134 47H127C126.448 47 126 47.4477 126 48C126 48.5523 126.448 49 127 49H134C134.552 49 135 48.5523 135 48C135 47.4477 134.552 47 134 47Z"
            fill="#525252"
          />
          <path
            d="M140 47H138C137.448 47 137 47.4477 137 48C137 48.5523 137.448 49 138 49H140C140.552 49 141 48.5523 141 48C141 47.4477 140.552 47 140 47Z"
            fill="#525252"
          />
          <path
            d="M148 47H144C143.448 47 143 47.4477 143 48C143 48.5523 143.448 49 144 49H148C148.552 49 149 48.5523 149 48C149 47.4477 148.552 47 148 47Z"
            fill="#525252"
          />
          <path
            d="M38 36H6C5.44772 36 5 36.4477 5 37V41C5 41.5523 5.44772 42 6 42H38C38.5523 42 39 41.5523 39 41V37C39 36.4477 38.5523 36 38 36Z"
            fill="#262626"
          />
          <path
            d="M38 46H6C5.44772 46 5 46.4477 5 47V51C5 51.5523 5.44772 52 6 52H38C38.5523 52 39 51.5523 39 51V47C39 46.4477 38.5523 46 38 46Z"
            fill="#262626"
          />
          <path
            d="M38 56H6C5.44772 56 5 56.4477 5 57V61C5 61.5523 5.44772 62 6 62H38C38.5523 62 39 61.5523 39 61V57C39 56.4477 38.5523 56 38 56Z"
            fill="#262626"
          />
          <path
            d="M149 53H73C70.7909 53 69 54.7909 69 57V96C69 98.2091 70.7909 100 73 100H149C151.209 100 153 98.2091 153 96V57C153 54.7909 151.209 53 149 53Z"
            fill="#404040"
          />
        </g>
        <mask
          id="mask1_77_39"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="-12"
          y="-12"
          width="201"
          height="152"
        >
          <path d="M-12 -12H189L-12 140V-12Z" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask1_77_39)">
          <path
            d="M0 3C0 1.34314 1.34315 0 3 0H174C175.657 0 177 1.34315 177 3V159C177 160.657 175.657 162 174 162H3C1.34315 162 0 160.657 0 159V3Z"
            fill="white"
          />
          <path
            d="M44 0H174C175.657 0 177 1.34315 177 3V151H44V0Z"
            fill="#FAFAFA"
          />
          <path
            d="M39 8C39 10.2091 37.2091 12 35 12C32.7909 12 31 10.2091 31 8C31 5.79086 32.7909 4 35 4C37.2091 4 39 5.79086 39 8Z"
            fill="#D4D4D4"
          />
          <path
            d="M77 40C77 42.2091 75.2091 44 73 44C70.7909 44 69 42.2091 69 40C69 37.7909 70.7909 36 73 36C75.2091 36 77 37.7909 77 40Z"
            fill="#D4D4D4"
          />
          <path
            d="M5 6C5 5.44772 5.44772 5 6 5H26C26.5523 5 27 5.44772 27 6V10C27 10.5523 26.5523 11 26 11H6C5.44772 11 5 10.5523 5 10V6Z"
            fill="#E5E5E5"
          />
          <path
            d="M5 17C5 16.4477 5.44772 16 6 16H38C38.5523 16 39 16.4477 39 17V21C39 21.5523 38.5523 22 38 22H6C5.44772 22 5 21.5523 5 21V17Z"
            fill="white"
          />
          <path
            d="M5 27C5 26.4477 5.44772 26 6 26H38C38.5523 26 39 26.4477 39 27V31C39 31.5523 38.5523 32 38 32H6C5.44772 32 5 31.5523 5 31V27Z"
            fill="#E5E5E5"
          />
          <path
            d="M81 38C81 37.4477 81.4477 37 82 37H93C93.5523 37 94 37.4477 94 38C94 38.5523 93.5523 39 93 39H82C81.4477 39 81 38.5523 81 38Z"
            fill="#A3A3A3"
          />
          <path
            d="M96 38C96 37.4477 96.4477 37 97 37H114C114.552 37 115 37.4477 115 38C115 38.5523 114.552 39 114 39H97C96.4477 39 96 38.5523 96 38Z"
            fill="#A3A3A3"
          />
          <path
            d="M81 43C81 42.4477 81.4477 42 82 42H88C88.5523 42 89 42.4477 89 43C89 43.5523 88.5523 44 88 44H82C81.4477 44 81 43.5523 81 43Z"
            fill="#E5E5E5"
          />
          <path
            d="M91 43C91 42.4477 91.4477 42 92 42H105C105.552 42 106 42.4477 106 43C106 43.5523 105.552 44 105 44H92C91.4477 44 91 43.5523 91 43Z"
            fill="#E5E5E5"
          />
          <path
            d="M108 43C108 42.4477 108.448 42 109 42H113C113.552 42 114 42.4477 114 43C114 43.5523 113.552 44 113 44H109C108.448 44 108 43.5523 108 43Z"
            fill="#E5E5E5"
          />
          <path
            d="M116 43C116 42.4477 116.448 42 117 42H127C127.552 42 128 42.4477 128 43C128 43.5523 127.552 44 127 44H117C116.448 44 116 43.5523 116 43Z"
            fill="#E5E5E5"
          />
          <path
            d="M130 43C130 42.4477 130.448 42 131 42H138C138.552 42 139 42.4477 139 43C139 43.5523 138.552 44 138 44H131C130.448 44 130 43.5523 130 43Z"
            fill="#E5E5E5"
          />
          <path
            d="M69 48C69 47.4477 69.4477 47 70 47H76C76.5523 47 77 47.4477 77 48C77 48.5523 76.5523 49 76 49H70C69.4477 49 69 48.5523 69 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M79 48C79 47.4477 79.4477 47 80 47C80.5523 47 81 47.4477 81 48C81 48.5523 80.5523 49 80 49C79.4477 49 79 48.5523 79 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M83 48C83 47.4477 83.4477 47 84 47H91C91.5523 47 92 47.4477 92 48C92 48.5523 91.5523 49 91 49H84C83.4477 49 83 48.5523 83 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M94 48C94 47.4477 94.4477 47 95 47H109C109.552 47 110 47.4477 110 48C110 48.5523 109.552 49 109 49H95C94.4477 49 94 48.5523 94 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M112 48C112 47.4477 112.448 47 113 47H118C118.552 47 119 47.4477 119 48C119 48.5523 118.552 49 118 49H113C112.448 49 112 48.5523 112 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M121 48C121 47.4477 121.448 47 122 47H123C123.552 47 124 47.4477 124 48C124 48.5523 123.552 49 123 49H122C121.448 49 121 48.5523 121 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M126 48C126 47.4477 126.448 47 127 47H134C134.552 47 135 47.4477 135 48C135 48.5523 134.552 49 134 49H127C126.448 49 126 48.5523 126 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M137 48C137 47.4477 137.448 47 138 47H140C140.552 47 141 47.4477 141 48C141 48.5523 140.552 49 140 49H138C137.448 49 137 48.5523 137 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M143 48C143 47.4477 143.448 47 144 47H148C148.552 47 149 47.4477 149 48C149 48.5523 148.552 49 148 49H144C143.448 49 143 48.5523 143 48Z"
            fill="#E5E5E5"
          />
          <path
            d="M5 37C5 36.4477 5.44772 36 6 36H38C38.5523 36 39 36.4477 39 37V41C39 41.5523 38.5523 42 38 42H6C5.44772 42 5 41.5523 5 41V37Z"
            fill="#F5F5F5"
          />
          <path
            d="M5 47C5 46.4477 5.44772 46 6 46H38C38.5523 46 39 46.4477 39 47V51C39 51.5523 38.5523 52 38 52H6C5.44772 52 5 51.5523 5 51V47Z"
            fill="#F5F5F5"
          />
          <path
            d="M5 57C5 56.4477 5.44772 56 6 56H38C38.5523 56 39 56.4477 39 57V61C39 61.5523 38.5523 62 38 62H6C5.44772 62 5 61.5523 5 61V57Z"
            fill="#F5F5F5"
          />
          <path
            d="M69 57C69 54.7909 70.7909 53 73 53H149C151.209 53 153 54.7909 153 57V96C153 98.2091 151.209 100 149 100H73C70.7909 100 69 98.2091 69 96V57Z"
            fill="#E5E5E5"
          />
        </g>
        <rect
          width="177"
          height="140"
          fill="url(#paint0_linear_77_39)"
          fillOpacity="0.04"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_77_39"
          x1="88.5"
          y1="0"
          x2="88.5"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.565789" stopOpacity="0" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_77_39">
          <rect width="177" height="140" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

```
```tsx
/components/ui/light-theme.tsx
import React from "react"

export const LightTheme = () => {
  return (
    <svg
      width="177"
      height="140"
      viewBox="0 0 177 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_77_15)">
        <rect width="177" height="162" rx="3" fill="white" />
        <rect
          x="-0.5"
          y="-0.5"
          width="178"
          height="163"
          rx="3.5"
          stroke="black"
          strokeOpacity="0.01"
        />
        <g filter="url(#filter0_d_77_15)">
          <path
            d="M44 0H174C175.657 0 177 1.34315 177 3V151H44V0Z"
            fill="#FAFAFA"
          />
        </g>
        <circle cx="35" cy="8" r="4" fill="#D4D4D4" />
        <circle cx="73" cy="40" r="4" fill="#D4D4D4" />
        <rect x="5" y="5" width="22" height="6" rx="1" fill="#E5E5E5" />
        <rect x="5" y="16" width="34" height="6" rx="1" fill="white" />
        <rect
          x="5.5"
          y="16.5"
          width="33"
          height="5"
          rx="0.5"
          stroke="black"
          strokeOpacity="0.08"
        />
        <rect x="5" y="26" width="34" height="6" rx="1" fill="#E5E5E5" />
        <rect x="81" y="37" width="13" height="2" rx="1" fill="#A3A3A3" />
        <rect x="96" y="37" width="19" height="2" rx="1" fill="#A3A3A3" />
        <rect x="81" y="42" width="8" height="2" rx="1" fill="#E5E5E5" />
        <rect x="91" y="42" width="15" height="2" rx="1" fill="#E5E5E5" />
        <rect x="108" y="42" width="6" height="2" rx="1" fill="#E5E5E5" />
        <rect x="116" y="42" width="12" height="2" rx="1" fill="#E5E5E5" />
        <rect x="130" y="42" width="9" height="2" rx="1" fill="#E5E5E5" />
        <rect x="69" y="47" width="8" height="2" rx="1" fill="#E5E5E5" />
        <rect x="79" y="47" width="2" height="2" rx="1" fill="#E5E5E5" />
        <rect x="83" y="47" width="9" height="2" rx="1" fill="#E5E5E5" />
        <rect x="94" y="47" width="16" height="2" rx="1" fill="#E5E5E5" />
        <rect x="112" y="47" width="7" height="2" rx="1" fill="#E5E5E5" />
        <rect x="121" y="47" width="3" height="2" rx="1" fill="#E5E5E5" />
        <rect x="126" y="47" width="9" height="2" rx="1" fill="#E5E5E5" />
        <rect x="137" y="47" width="4" height="2" rx="1" fill="#E5E5E5" />
        <rect x="143" y="47" width="6" height="2" rx="1" fill="#E5E5E5" />
        <rect x="5" y="36" width="34" height="6" rx="1" fill="#F5F5F5" />
        <rect x="5" y="46" width="34" height="6" rx="1" fill="#F5F5F5" />
        <rect x="5" y="56" width="34" height="6" rx="1" fill="#F5F5F5" />
        <rect x="69" y="53" width="84" height="47" rx="4" fill="#E5E5E5" />
        <rect
          width="177"
          height="140"
          fill="url(#paint0_linear_77_15)"
          fillOpacity="0.04"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_77_15"
          x="43"
          y="0"
          width="134"
          height="151"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_77_15"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_15"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_77_15"
          x1="88.5"
          y1="0"
          x2="88.5"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.565789" stopOpacity="0" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_77_15">
          <rect width="177" height="140" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
```
```tsx
/components/ui/dark-theme.tsx
import React from "react"

export const DarkTheme = () => {
  return (
    <svg
      width="177"
      height="140"
      viewBox="0 0 177 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_77_16)">
        <rect width="177" height="162" rx="3" fill="#171717" />
        <g filter="url(#filter0_d_77_16)">
          <path
            d="M44 0H174C175.657 0 177 1.34315 177 3V151H44V0Z"
            fill="#262626"
          />
        </g>
        <circle cx="35" cy="8" r="4" fill="#525252" />
        <circle cx="73" cy="40" r="4" fill="#525252" />
        <rect x="5" y="5" width="22" height="6" rx="1" fill="#404040" />
        <rect x="5" y="16" width="34" height="6" rx="1" fill="#171717" />
        <rect
          x="5.5"
          y="16.5"
          width="33"
          height="5"
          rx="0.5"
          stroke="white"
          strokeOpacity="0.12"
        />
        <rect x="5" y="26" width="34" height="6" rx="1" fill="#404040" />
        <rect x="81" y="37" width="13" height="2" rx="1" fill="#A3A3A3" />
        <rect x="96" y="37" width="19" height="2" rx="1" fill="#A3A3A3" />
        <rect x="81" y="42" width="8" height="2" rx="1" fill="#525252" />
        <rect x="91" y="42" width="15" height="2" rx="1" fill="#525252" />
        <rect x="108" y="42" width="6" height="2" rx="1" fill="#525252" />
        <rect x="116" y="42" width="12" height="2" rx="1" fill="#525252" />
        <rect x="130" y="42" width="9" height="2" rx="1" fill="#525252" />
        <rect x="69" y="47" width="8" height="2" rx="1" fill="#525252" />
        <rect x="79" y="47" width="2" height="2" rx="1" fill="#525252" />
        <rect x="83" y="47" width="9" height="2" rx="1" fill="#525252" />
        <rect x="94" y="47" width="16" height="2" rx="1" fill="#525252" />
        <rect x="112" y="47" width="7" height="2" rx="1" fill="#525252" />
        <rect x="121" y="47" width="3" height="2" rx="1" fill="#525252" />
        <rect x="126" y="47" width="9" height="2" rx="1" fill="#525252" />
        <rect x="137" y="47" width="4" height="2" rx="1" fill="#525252" />
        <rect x="143" y="47" width="6" height="2" rx="1" fill="#525252" />
        <rect x="5" y="36" width="34" height="6" rx="1" fill="#262626" />
        <rect x="5" y="46" width="34" height="6" rx="1" fill="#262626" />
        <rect x="5" y="56" width="34" height="6" rx="1" fill="#262626" />
        <rect x="69" y="53" width="84" height="47" rx="4" fill="#404040" />
        <rect
          width="177"
          height="140"
          fill="url(#paint0_linear_77_16)"
          fillOpacity="0.32"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_77_16"
          x="43"
          y="0"
          width="134"
          height="151"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_77_16"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_77_16"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_77_16"
          x1="88.5"
          y1="0"
          x2="88.5"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.565789" stopOpacity="0" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_77_16">
          <rect width="177" height="140" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

```
```tsx
/components/ui/radio-group.tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```

Install NPM dependencies:
```bash
framer-motion, @radix-ui/react-slot, class-variance-authority, @radix-ui/react-label, lucide-react, @radix-ui/react-checkbox, @radix-ui/react-select, @radix-ui/react-switch, @radix-ui/react-radio-group
```

Extend existing tailwind.config.js with this code:
```js
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "primary": "#f5f5f5",
        "secondary": "#d4d4d4",
        "tertiary": "#a3a3a3",
        "bg-primary": "#0d0d0d",
        "bg-secondary": "#171717",
        "bg-tertiary": "#262626",
        "bg-quaternary": "#313131",
        "bg-button": "#313131",
        "border-primary": "hsla(0, 0%, 100%, 0.12)",
        "border-secondary": "hsla(0, 0%, 100%, 0.08)"
      },
      "boxShadow": {
        "button": "0px -1px 0px 0px hsla(0, 0%, 100%, 0.04), 0px 0px 0px 1px hsla(0, 0%, 100%, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 2px 0px rgba(0, 0, 0, 0.04), 0px 4px 2px 0px rgba(0, 0, 0, 0.04), 0px 6px 3px 0px rgba(0, 0, 0, 0.04)"
      }
    }
  }
}
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
