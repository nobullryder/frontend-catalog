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
welcome-modal.tsx
"use client"

import * as React from "react"
import { X, ArrowRight, ExternalLink, HelpCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export interface WelcomeModalProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  title: React.ReactNode
  description: string
  mainActionText: string
  onMainActionClick: () => void
  showDontShowAgain?: boolean
  helpLink?: string
}

const WelcomeModal = ({
  title,
  description,
  mainActionText,
  onMainActionClick,
  showDontShowAgain = true,
  helpLink = "#",
  children,
  ...props
}: WelcomeModalProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="w-full sm:max-w-xl rounded-2xl bg-background p-0 shadow-2xl border-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        {/* Main content area with responsive padding */}
        <div className="p-6 sm:p-8 pb-0">
            <DialogHeader>
              {/* Responsive title font size */}
              <DialogTitle className="flex items-center text-xl sm:text-2xl font-bold text-foreground">
                {title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-1 text-base">
                {description}
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-6 text-foreground">
                {children}
            </div>
        </div>

        {/* Footer area with responsive padding */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 flex items-start space-x-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                    <p className="font-semibold">Need help accessing your account?</p>
                    <p className="text-sm text-muted-foreground">If you're experiencing any login issues, I'm here to help. Reach out to me directly on X for immediate assistance.</p>
                    <Button asChild variant="link" className="p-0 h-auto mt-2 text-sm font-semibold">
                        <a href={helpLink}>
                           Get login assistance <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* Responsive action bar */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center w-full gap-4 sm:gap-2">
                {showDontShowAgain && (
                    <div className="flex items-center space-x-2">
                        <Checkbox id="dont-show-again" className="rounded-[4px]"/>
                        <label
                            htmlFor="dont-show-again"
                            className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Don't show again
                        </label>
                    </div>
                )}
               <div className="sm:flex-grow"></div>
                <Button size="lg" onClick={onMainActionClick} className="font-semibold w-full sm:w-auto">
                    {mainActionText}
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
WelcomeModal.displayName = "WelcomeModal"

export { WelcomeModal }


code.demo.1754223888024.tsx
"use client"

import * as React from "react"
import { WelcomeModal } from "@/components/ui/welcome-modal" // Adjust the import path
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function WelcomeModalDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleMainAction = () => {
    console.log("Main action clicked!")
    setIsOpen(false)
  }

  const handleHelpAction = () => {
    console.log("Help action clicked!")
    // You can add any action here, like opening a support chat
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background p-4">
      <Button onClick={() => setIsOpen(true)}>Show Welcome Modal</Button>
      <WelcomeModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title={
          <>
            <span role="img" aria-label="wave" className="mr-3 text-3xl">🤘</span>
            Welcome Newcult.co Users
          </>
        }
        description="All newcult.co templates are now included with cult pro"
        mainActionText="View templates"
        onMainActionClick={handleMainAction}
        onHelpClick={handleHelpAction}
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">For new users</h3>
            <p className="text-muted-foreground">
              You can find all 9 full stack templates <span className="underline font-medium text-primary cursor-pointer">here</span>. Ship full stack products using faster with our expanded collection.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg flex items-center">
              For existing users
              <Badge variant="secondary" className="ml-2 border border-border font-semibold">$299 Value</Badge>
            </h3>
            <p className="text-muted-foreground">
              All OG newcult.co members have been given the $299 Lifetime License for free. No action required.
            </p>
          </div>
        </div>
      </WelcomeModal>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/welcome-modal.tsx
"use client"

import * as React from "react"
import { X, ArrowRight, ExternalLink, HelpCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export interface WelcomeModalProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  title: React.ReactNode
  description: string
  mainActionText: string
  onMainActionClick: () => void
  showDontShowAgain?: boolean
  helpLink?: string
}

const WelcomeModal = ({
  title,
  description,
  mainActionText,
  onMainActionClick,
  showDontShowAgain = true,
  helpLink = "#",
  children,
  ...props
}: WelcomeModalProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="w-full sm:max-w-xl rounded-2xl bg-background p-0 shadow-2xl border-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        {/* Main content area with responsive padding */}
        <div className="p-6 sm:p-8 pb-0">
            <DialogHeader>
              {/* Responsive title font size */}
              <DialogTitle className="flex items-center text-xl sm:text-2xl font-bold text-foreground">
                {title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-1 text-base">
                {description}
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-6 text-foreground">
                {children}
            </div>
        </div>

        {/* Footer area with responsive padding */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 flex items-start space-x-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                    <p className="font-semibold">Need help accessing your account?</p>
                    <p className="text-sm text-muted-foreground">If you're experiencing any login issues, I'm here to help. Reach out to me directly on X for immediate assistance.</p>
                    <Button asChild variant="link" className="p-0 h-auto mt-2 text-sm font-semibold">
                        <a href={helpLink}>
                           Get login assistance <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* Responsive action bar */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center w-full gap-4 sm:gap-2">
                {showDontShowAgain && (
                    <div className="flex items-center space-x-2">
                        <Checkbox id="dont-show-again" className="rounded-[4px]"/>
                        <label
                            htmlFor="dont-show-again"
                            className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Don't show again
                        </label>
                    </div>
                )}
               <div className="sm:flex-grow"></div>
                <Button size="lg" onClick={onMainActionClick} className="font-semibold w-full sm:w-auto">
                    {mainActionText}
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
WelcomeModal.displayName = "WelcomeModal"

export { WelcomeModal }

```

Install NPM dependencies:
```bash
lucide-react, class-variance-authority
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
