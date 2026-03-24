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
auth-tabs-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa"

export default function AuthTabsCard() {
  const [activeTab, setActiveTab] = React.useState<"sign-in" | "sign-up">("sign-in")

  const toggleTab = () => {
    setActiveTab((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"))
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Triggers */}
          <TabsList className="mb-6">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In */}
          <TabsContent value="sign-in">
            <div className="flex flex-col gap-4">

              {/* Social Login */}
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <FaGoogle /> Sign in with Google
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <FaGithub /> Sign in with GitHub
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <FaLinkedin /> Sign in with LinkedIn
                </Button>
              </div>

              <div className="flex items-center justify-center my-2 text-gray-400 dark:text-gray-300">or</div>

              {/* Email & Password */}
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" type="email" placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" type="password" placeholder="********" className="mt-1" />
              </div>
              <Button className="mt-4 w-full">Sign In</Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
                Don’t have an account?{" "}
                <span
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                  onClick={toggleTab}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </TabsContent>

          {/* Sign Up */}
          <TabsContent value="sign-up">
            <div className="flex flex-col gap-4">

              <div>
                <Label htmlFor="signup-name">Name</Label>
                <Input id="signup-name" type="text" placeholder="Your Name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="********" className="mt-1" />
              </div>
              <Button className="mt-4 w-full">Sign Up</Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
                Already have an account?{" "}
                <span
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                  onClick={toggleTab}
                >
                  Sign In
                </span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


code.demo.1758659170234.tsx
import AuthTabsCard from "@/components/ui/auth-tabs-card";

export default function DemoOne() {
  return <AuthTabsCard />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/auth-tabs-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa"

export default function AuthTabsCard() {
  const [activeTab, setActiveTab] = React.useState<"sign-in" | "sign-up">("sign-in")

  const toggleTab = () => {
    setActiveTab((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"))
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Triggers */}
          <TabsList className="mb-6">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In */}
          <TabsContent value="sign-in">
            <div className="flex flex-col gap-4">

              {/* Social Login */}
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <FaGoogle /> Sign in with Google
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <FaGithub /> Sign in with GitHub
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <FaLinkedin /> Sign in with LinkedIn
                </Button>
              </div>

              <div className="flex items-center justify-center my-2 text-gray-400 dark:text-gray-300">or</div>

              {/* Email & Password */}
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" type="email" placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" type="password" placeholder="********" className="mt-1" />
              </div>
              <Button className="mt-4 w-full">Sign In</Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
                Don’t have an account?{" "}
                <span
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                  onClick={toggleTab}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </TabsContent>

          {/* Sign Up */}
          <TabsContent value="sign-up">
            <div className="flex flex-col gap-4">

              <div>
                <Label htmlFor="signup-name">Name</Label>
                <Input id="signup-name" type="text" placeholder="Your Name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="********" className="mt-1" />
              </div>
              <Button className="mt-4 w-full">Sign Up</Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
                Already have an account?{" "}
                <span
                  className="font-medium text-blue-500 cursor-pointer hover:underline"
                  onClick={toggleTab}
                >
                  Sign In
                </span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
react-icons
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
