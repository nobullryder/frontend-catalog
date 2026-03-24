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
grid-background.tsx
"use client"

import * as React from "react"

export function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}

code.demo.tsx
import { GridBackground } from "@/components/ui/grid-background";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";

export function Page() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl mx-auto p-8 space-y-12">
          <div className="space-y-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
              Join Our Product Launch Waitlist
            </h2>
            <p className="text-xl text-gray-400 max-w-lg mx-auto">
              Be part of something truly extraordinary. Join thousands of others
              already gaining early access to our revolutionary new product.
            </p>
          </div>

          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 bg-gray-950/50 border-gray-800"
            />
            <Button
              className="h-12 px-6 bg-black hover:bg-black/90 text-white"
              variant="ghost"
            >
              Get Notified
            </Button>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <Avatar className="border-2 w-12 h-12">
                  <AvatarFallback className="text-sm font-semibold border-white/20 bg-purple-600">JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 w-12 h-12">
                  <AvatarFallback className="text-sm font-semibold border-white/20 bg-blue-600">AS</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 w-12 h-12">
                  <AvatarFallback className="text-sm font-semibold border-white/20 bg-blue-700">MK</AvatarFallback>
                </Avatar>
              </div>
              <span className="font-bold">100+ people on the waitlist</span>
            </div>

            <div className="flex gap-6 justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-300"
              >
                <Icons.twitter className="w-5 h-5 fill-current" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-300"
              >
                <Icons.gitHub className="w-5 h-5 fill-current" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
/components/ui/grid-background.tsx
"use client"

import * as React from "react"

export function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
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
