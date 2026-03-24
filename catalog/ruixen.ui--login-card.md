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
login-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function LoginCard() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden border">

      {/* Login Card */}
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-lg z-10 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Sign In</h2>

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

        <Button className="w-full mt-2">Login</Button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}


code.demo.1758657184799.tsx
import LoginCard from "@/components/ui/login-card";

export default function DemoOne() {
  return <LoginCard />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/login-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function LoginCard() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden border">

      {/* Login Card */}
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-xl shadow-lg z-10 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Sign In</h2>

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

        <Button className="w-full mt-2">Login</Button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
framer-motion
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
