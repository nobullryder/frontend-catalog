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
sign-in-card.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInCard() {
  const [email, setEmail] = useState("")

  const handleNext = () => {
    console.log("Email entered:", email)
    // Add authentication logic here
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full min-w-md rounded-xl shadow-md bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft Logo"
              width={20}
              height={20}
              priority
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Microsoft
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Sign in
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Input
            type="text"
            placeholder="E-mail, phone, or Skype"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 dark:bg-gray-700 dark:text-gray-100"
          />
          <div className="mt-4 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              No account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Create one!
              </a>
            </p>
            <p className="mt-1">
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Can’t access your account?
              </a>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


code.demo.1757348725444.tsx
import SignInCard from "@/components/ui/sign-in-card";

export default function DemoOne() {
  return <SignInCard />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sign-in-card.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInCard() {
  const [email, setEmail] = useState("")

  const handleNext = () => {
    console.log("Email entered:", email)
    // Add authentication logic here
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full min-w-md rounded-xl shadow-md bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft Logo"
              width={20}
              height={20}
              priority
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Microsoft
            </span>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Sign in
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Input
            type="text"
            placeholder="E-mail, phone, or Skype"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 dark:bg-gray-700 dark:text-gray-100"
          />
          <div className="mt-4 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              No account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Create one!
              </a>
            </p>
            <p className="mt-1">
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Can’t access your account?
              </a>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

```

Install NPM dependencies:
```bash
next
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
