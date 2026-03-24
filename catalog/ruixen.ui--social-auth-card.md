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
social-auth-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa"

export default function SocialAuthCard() {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border rounded-lg shadow-md overflow-hidden p-6 flex flex-col gap-6">
      
      {/* Social Login Buttons */}
      <div className="flex flex-col gap-4">
        <Button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white">
          <FaGoogle /> Continue with Google
        </Button>
        <Button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white">
          <FaGithub /> Continue with GitHub
        </Button>
        <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <FaLinkedin /> Continue with LinkedIn
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-300 text-sm">
        <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
        <span>or</span>
        <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
      </div>

      {/* Traditional Login Form */}
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" className="mt-1" />
        </div>
        <Button className="w-full mt-2">Login</Button>
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-300">
        Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
      </p>
    </div>
  )
}


code.demo.1758653701660.tsx
import SocialAuthCard from "@/components/ui/social-auth-card";

export default function DemoOne() {
  return <SocialAuthCard />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/social-auth-card.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa"

export default function SocialAuthCard() {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border rounded-lg shadow-md overflow-hidden p-6 flex flex-col gap-6">
      
      {/* Social Login Buttons */}
      <div className="flex flex-col gap-4">
        <Button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white">
          <FaGoogle /> Continue with Google
        </Button>
        <Button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white">
          <FaGithub /> Continue with GitHub
        </Button>
        <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <FaLinkedin /> Continue with LinkedIn
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-300 text-sm">
        <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
        <span>or</span>
        <span className="flex-1 border-t border-gray-300 dark:border-gray-600"></span>
      </div>

      {/* Traditional Login Form */}
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" className="mt-1" />
        </div>
        <Button className="w-full mt-2">Login</Button>
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-300">
        Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
      </p>
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
