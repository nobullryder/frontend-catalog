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
newsletter.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    if (!email) return
    console.log("Subscribed with:", email)
    // Add your API call here
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-xl shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Subscribe to our newsletter.
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. 
          Duis tempor incididunt dolore.
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 dark:bg-slate-800 dark:text-gray-100"
          />
          <Button onClick={handleSubscribe} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


code.demo.1757347881401.tsx
import Newsletter from "@/components/ui/newsletter";

export default function DemoOne() {
  return <Newsletter />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/newsletter.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    if (!email) return
    console.log("Subscribed with:", email)
    // Add your API call here
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-xl shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Subscribe to our newsletter.
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. 
          Duis tempor incididunt dolore.
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 dark:bg-slate-800 dark:text-gray-100"
          />
          <Button onClick={handleSubscribe} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Subscribe
          </Button>
        </div>
      </CardContent>
    </Card>
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
