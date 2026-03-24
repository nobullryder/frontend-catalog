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
auth-dialog.tsx
"use client"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function AuthDialog() {
  const [mode, setMode] = useState<"signup" | "login">("signup")
  const [showPassword, setShowPassword] = useState(false)
  const id = useId()

  const toggleMode = () => setMode(mode === "signup" ? "login" : "signup")
  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-lg">Sign up / Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {mode === "signup" ? "Sign Up" : "Login"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {mode === "signup"
                ? "We just need a few details to get you started."
                : "Enter your credentials to log in."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>Full name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Matt Welsh"
                  type="text"
                  required
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
                className="rounded-lg"
              />
            </div>
            <div className="relative">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-[38px] text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="button" className="w-full rounded-lg">
            {mode === "signup" ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="mt-2 text-center text-sm text-muted-foreground">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button className="underline" onClick={toggleMode}>
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button className="underline" onClick={toggleMode}>
                Sign Up
              </button>
            </>
          )}
        </div>

        {mode === "signup" && (
          <>
            <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1 my-4">
              <span className="text-muted-foreground text-xs">Or</span>
            </div>
            <Button variant="outline" className="w-full rounded-lg">
              Continue with Google
            </Button>
            <p className="text-muted-foreground text-center text-xs mt-2">
              By signing up you agree to our{" "}
              <a className="underline hover:no-underline" href="#">
                Terms
              </a>
              .
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}


code.demo.1755716755877.tsx
import AuthDialog from "@/components/ui/auth-dialog";

export default function DemoOne() {
  return <AuthDialog />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/auth-dialog.tsx
"use client"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function AuthDialog() {
  const [mode, setMode] = useState<"signup" | "login">("signup")
  const [showPassword, setShowPassword] = useState(false)
  const id = useId()

  const toggleMode = () => setMode(mode === "signup" ? "login" : "signup")
  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-lg">Sign up / Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {mode === "signup" ? "Sign Up" : "Login"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {mode === "signup"
                ? "We just need a few details to get you started."
                : "Enter your credentials to log in."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>Full name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Matt Welsh"
                  type="text"
                  required
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                required
                className="rounded-lg"
              />
            </div>
            <div className="relative">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-[38px] text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="button" className="w-full rounded-lg">
            {mode === "signup" ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="mt-2 text-center text-sm text-muted-foreground">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button className="underline" onClick={toggleMode}>
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button className="underline" onClick={toggleMode}>
                Sign Up
              </button>
            </>
          )}
        </div>

        {mode === "signup" && (
          <>
            <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1 my-4">
              <span className="text-muted-foreground text-xs">Or</span>
            </div>
            <Button variant="outline" className="w-full rounded-lg">
              Continue with Google
            </Button>
            <p className="text-muted-foreground text-center text-xs mt-2">
              By signing up you agree to our{" "}
              <a className="underline hover:no-underline" href="#">
                Terms
              </a>
              .
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

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
