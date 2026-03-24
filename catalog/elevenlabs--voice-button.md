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
voice-button.tsx
"use client"

import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LiveWaveform } from "@/components/ui/live-waveform"

export type VoiceButtonState =
  | "idle"
  | "recording"
  | "processing"
  | "success"
  | "error"

export interface VoiceButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onError"> {
  /**
   * Current state of the voice button
   * @default "idle"
   */
  state?: VoiceButtonState

  /**
   * Callback when button is clicked
   */
  onPress?: () => void

  /**
   * Content to display on the left side (label)
   * Can be a string or ReactNode for custom components
   */
  label?: React.ReactNode

  /**
   * Content to display on the right side (e.g., keyboard shortcut)
   * Can be a string or ReactNode for custom components
   * @example "⌥Space" or <kbd>⌘K</kbd>
   */
  trailing?: React.ReactNode

  /**
   * Icon to display in the center when idle (for icon size buttons)
   */
  icon?: React.ReactNode

  /**
   * Custom variant for the button
   * @default "outline"
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"

  /**
   * Size of the button
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon"

  /**
   * Custom className for the button
   */
  className?: string

  /**
   * Custom className for the waveform container
   */
  waveformClassName?: string

  /**
   * Duration in ms to show success/error states
   * @default 1500
   */
  feedbackDuration?: number

  /**
   * Disable the button
   */
  disabled?: boolean
}

export const VoiceButton = React.forwardRef<
  HTMLButtonElement,
  VoiceButtonProps
>(
  (
    {
      state = "idle",
      onPress,
      label,
      trailing,
      icon,
      variant = "outline",
      size = "default",
      className,
      waveformClassName,
      feedbackDuration = 1500,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [showFeedback, setShowFeedback] = React.useState(false)

    React.useEffect(() => {
      if (state === "success" || state === "error") {
        setShowFeedback(true)
        const timeout = setTimeout(
          () => setShowFeedback(false),
          feedbackDuration
        )
        return () => clearTimeout(timeout)
      } else {
        // Reset feedback when state changes away from success/error
        setShowFeedback(false)
      }
    }, [state, feedbackDuration])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onPress?.()
    }

    const isRecording = state === "recording"
    const isProcessing = state === "processing"
    const isSuccess = state === "success"
    const isError = state === "error"

    const buttonVariant = variant
    const isDisabled = disabled || isProcessing

    const displayLabel = label

    const shouldShowWaveform = isRecording || isProcessing || showFeedback
    const shouldShowTrailing = !shouldShowWaveform && trailing

    return (
      <Button
        ref={ref}
        type="button"
        variant={buttonVariant}
        size={size}
        onClick={handleClick}
        disabled={isDisabled}
        className={cn(
          "gap-2 transition-all duration-200",
          size === "icon" && "relative",
          className
        )}
        aria-label={"Voice Button"}
        {...props}
      >
        {size !== "icon" && displayLabel && (
          <span className="inline-flex shrink-0 items-center justify-start">
            {displayLabel}
          </span>
        )}

        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden transition-all duration-300",
            size === "icon"
              ? "absolute inset-0 rounded-sm border-0"
              : "h-5 w-24 rounded-sm border",
            isRecording
              ? "bg-primary/10 dark:bg-primary/5"
              : size === "icon"
                ? "bg-muted/50 border-0"
                : "border-border bg-muted/50",
            waveformClassName
          )}
        >
          {shouldShowWaveform && (
            <LiveWaveform
              active={isRecording}
              processing={isProcessing || isSuccess}
              barWidth={2}
              barGap={1}
              barRadius={4}
              fadeEdges={false}
              sensitivity={1.8}
              smoothingTimeConstant={0.85}
              height={20}
              mode="static"
              className="animate-in fade-in absolute inset-0 h-full w-full duration-300"
            />
          )}

          {shouldShowTrailing && (
            <div className="animate-in fade-in absolute inset-0 flex items-center justify-center duration-300">
              {typeof trailing === "string" ? (
                <span className="text-muted-foreground px-1.5 font-mono text-[10px] font-medium select-none">
                  {trailing}
                </span>
              ) : (
                trailing
              )}
            </div>
          )}

          {!shouldShowWaveform &&
            !shouldShowTrailing &&
            icon &&
            size === "icon" && (
              <div className="animate-in fade-in absolute inset-0 flex items-center justify-center duration-300">
                {icon}
              </div>
            )}

          {isSuccess && showFeedback && (
            <div className="animate-in fade-in bg-background/80 absolute inset-0 flex items-center justify-center duration-300">
              <span className="text-primary text-[10px] font-medium">
                <CheckIcon className="size-3.5" />
              </span>
            </div>
          )}

          {/* Error Icon */}
          {isError && showFeedback && (
            <div className="animate-in fade-in bg-background/80 absolute inset-0 flex items-center justify-center duration-300">
              <span className="text-destructive text-[10px] font-medium">
                <XIcon className="size-3.5" />
              </span>
            </div>
          )}
        </div>
      </Button>
    )
  }
)

VoiceButton.displayName = "VoiceButton"


code.demo.1760005762962.tsx
"use client"

import { useEffect, useState } from "react"

import { VoiceButton } from "@/components/ui/voice-button"

export default function VoiceButtonDemo() {
  const [state, setState] = useState<
    "idle" | "recording" | "processing" | "success" | "error"
  >("idle")

  const handlePress = () => {
    if (state === "idle") {
      setState("recording")
    } else if (state === "recording") {
      setState("processing")

      setTimeout(() => {
        setState("success")

        setTimeout(() => {
          setState("idle")
        }, 1500)
      }, 1000)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "Space") {
        e.preventDefault()
        handlePress()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [state])

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <VoiceButton
        label="Voice"
        trailing="⌥Space"
        state={state}
        onPress={handlePress}
        className="min-w-[180px]"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/voice-button.tsx
"use client"

import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LiveWaveform } from "@/components/ui/live-waveform"

export type VoiceButtonState =
  | "idle"
  | "recording"
  | "processing"
  | "success"
  | "error"

export interface VoiceButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onError"> {
  /**
   * Current state of the voice button
   * @default "idle"
   */
  state?: VoiceButtonState

  /**
   * Callback when button is clicked
   */
  onPress?: () => void

  /**
   * Content to display on the left side (label)
   * Can be a string or ReactNode for custom components
   */
  label?: React.ReactNode

  /**
   * Content to display on the right side (e.g., keyboard shortcut)
   * Can be a string or ReactNode for custom components
   * @example "⌥Space" or <kbd>⌘K</kbd>
   */
  trailing?: React.ReactNode

  /**
   * Icon to display in the center when idle (for icon size buttons)
   */
  icon?: React.ReactNode

  /**
   * Custom variant for the button
   * @default "outline"
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"

  /**
   * Size of the button
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon"

  /**
   * Custom className for the button
   */
  className?: string

  /**
   * Custom className for the waveform container
   */
  waveformClassName?: string

  /**
   * Duration in ms to show success/error states
   * @default 1500
   */
  feedbackDuration?: number

  /**
   * Disable the button
   */
  disabled?: boolean
}

export const VoiceButton = React.forwardRef<
  HTMLButtonElement,
  VoiceButtonProps
>(
  (
    {
      state = "idle",
      onPress,
      label,
      trailing,
      icon,
      variant = "outline",
      size = "default",
      className,
      waveformClassName,
      feedbackDuration = 1500,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [showFeedback, setShowFeedback] = React.useState(false)

    React.useEffect(() => {
      if (state === "success" || state === "error") {
        setShowFeedback(true)
        const timeout = setTimeout(
          () => setShowFeedback(false),
          feedbackDuration
        )
        return () => clearTimeout(timeout)
      } else {
        // Reset feedback when state changes away from success/error
        setShowFeedback(false)
      }
    }, [state, feedbackDuration])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onPress?.()
    }

    const isRecording = state === "recording"
    const isProcessing = state === "processing"
    const isSuccess = state === "success"
    const isError = state === "error"

    const buttonVariant = variant
    const isDisabled = disabled || isProcessing

    const displayLabel = label

    const shouldShowWaveform = isRecording || isProcessing || showFeedback
    const shouldShowTrailing = !shouldShowWaveform && trailing

    return (
      <Button
        ref={ref}
        type="button"
        variant={buttonVariant}
        size={size}
        onClick={handleClick}
        disabled={isDisabled}
        className={cn(
          "gap-2 transition-all duration-200",
          size === "icon" && "relative",
          className
        )}
        aria-label={"Voice Button"}
        {...props}
      >
        {size !== "icon" && displayLabel && (
          <span className="inline-flex shrink-0 items-center justify-start">
            {displayLabel}
          </span>
        )}

        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden transition-all duration-300",
            size === "icon"
              ? "absolute inset-0 rounded-sm border-0"
              : "h-5 w-24 rounded-sm border",
            isRecording
              ? "bg-primary/10 dark:bg-primary/5"
              : size === "icon"
                ? "bg-muted/50 border-0"
                : "border-border bg-muted/50",
            waveformClassName
          )}
        >
          {shouldShowWaveform && (
            <LiveWaveform
              active={isRecording}
              processing={isProcessing || isSuccess}
              barWidth={2}
              barGap={1}
              barRadius={4}
              fadeEdges={false}
              sensitivity={1.8}
              smoothingTimeConstant={0.85}
              height={20}
              mode="static"
              className="animate-in fade-in absolute inset-0 h-full w-full duration-300"
            />
          )}

          {shouldShowTrailing && (
            <div className="animate-in fade-in absolute inset-0 flex items-center justify-center duration-300">
              {typeof trailing === "string" ? (
                <span className="text-muted-foreground px-1.5 font-mono text-[10px] font-medium select-none">
                  {trailing}
                </span>
              ) : (
                trailing
              )}
            </div>
          )}

          {!shouldShowWaveform &&
            !shouldShowTrailing &&
            icon &&
            size === "icon" && (
              <div className="animate-in fade-in absolute inset-0 flex items-center justify-center duration-300">
                {icon}
              </div>
            )}

          {isSuccess && showFeedback && (
            <div className="animate-in fade-in bg-background/80 absolute inset-0 flex items-center justify-center duration-300">
              <span className="text-primary text-[10px] font-medium">
                <CheckIcon className="size-3.5" />
              </span>
            </div>
          )}

          {/* Error Icon */}
          {isError && showFeedback && (
            <div className="animate-in fade-in bg-background/80 absolute inset-0 flex items-center justify-center duration-300">
              <span className="text-destructive text-[10px] font-medium">
                <XIcon className="size-3.5" />
              </span>
            </div>
          )}
        </div>
      </Button>
    )
  }
)

VoiceButton.displayName = "VoiceButton"

```

Install NPM dependencies:
```bash
lucide-react
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
