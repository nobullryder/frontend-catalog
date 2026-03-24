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
split-login-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function SplitLoginCard() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white border dark:bg-gray-800">
      
      {/* Left Side: Welcome + Illustration */}
      <div className="md:w-1/2 bg-[#8371F5] dark:bg-blue-600 text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="mb-6 text-center">Sign in to continue to your dashboard and enjoy seamless experience.</p>
        <img
          src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
          alt="Login Illustration"
          className="w-16"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-6">Sign In</h3>
        
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" className="mt-1" />
          </div>
        </div>

        <Button className="mt-6 w-full">Login</Button>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
          Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}


code.demo.1758653221786.tsx
import SplitLoginCard from "@/components/ui/split-login-card";

export default function DemoOne() {
  return <SplitLoginCard />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/split-login-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function SplitLoginCard() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white border dark:bg-gray-800">
      
      {/* Left Side: Welcome + Illustration */}
      <div className="md:w-1/2 bg-[#8371F5] dark:bg-blue-600 text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="mb-6 text-center">Sign in to continue to your dashboard and enjoy seamless experience.</p>
        <img
          src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
          alt="Login Illustration"
          className="w-16"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-6">Sign In</h3>
        
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" className="mt-1" />
          </div>
        </div>

        <Button className="mt-6 w-full">Login</Button>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
          Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
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
