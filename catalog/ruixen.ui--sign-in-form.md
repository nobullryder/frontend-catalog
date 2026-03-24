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
sign-in-form.tsx
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"

export default function SignInForm() {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md border bg-background">
      <CardContent className="p-6 flex flex-col gap-6">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center gap-2 border rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-ring">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center gap-2 border rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-ring">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Remember me & Forgot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
          <button className="text-sm text-primary hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <Button variant="default" className="w-full h-12 text-base font-medium rounded-lg">
          Sign In
        </Button>

        {/* Social login buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              width={20}
              height={20}
              unoptimized
            />
            Continue with Apple
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
              alt="GitHub"
              width={20}
              height={20}
            />
            Continue with GitHub
          </Button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-muted-foreground mt-2">
          Don’t have an account?{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  )
}


code.demo.1757273241612.tsx
import SignInForm from "@/components/ui/sign-in-form";

export default function DemoOne() {
  return <SignInForm />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sign-in-form.tsx
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"

export default function SignInForm() {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md border bg-background">
      <CardContent className="p-6 flex flex-col gap-6">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center gap-2 border rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-ring">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center gap-2 border rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-ring">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Remember me & Forgot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
          <button className="text-sm text-primary hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <Button variant="default" className="w-full h-12 text-base font-medium rounded-lg">
          Sign In
        </Button>

        {/* Social login buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              width={20}
              height={20}
              unoptimized
            />
            Continue with Apple
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 rounded-lg flex items-center justify-center gap-3"
          >
            <Image
              src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
              alt="GitHub"
              width={20}
              height={20}
            />
            Continue with GitHub
          </Button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-muted-foreground mt-2">
          Don’t have an account?{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
