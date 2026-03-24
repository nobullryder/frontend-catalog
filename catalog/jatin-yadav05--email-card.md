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
email-card.tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-foreground/20 blur-2xl"></div>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Email Subscription Card</h1>
          <p className="text-muted-foreground">A minimal, polished interface</p>
        </div>

        <div className="gradient-border">
          <Card className="p-6 space-y-4 shadow-lg shadow-primary/5 border-0">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full input-border focus:ring-2 focus:ring-primary/5 focus:border-primary/10 transition-all duration-200"
              />
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs bg-foreground/10 text-foreground border-foreground/20">
                Active
              </Badge>
              <Button size="sm" className="px-6 bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">Simple, clean, and functional design</p>
        </div>
      </div>
    </div>
  )
}


code.demo.1756203800158.tsx
import Component from "@/components/ui/email-card";

export default function DemoOne() {
  return <Component />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/email-card.tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-foreground/20 blur-2xl"></div>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Email Subscription Card</h1>
          <p className="text-muted-foreground">A minimal, polished interface</p>
        </div>

        <div className="gradient-border">
          <Card className="p-6 space-y-4 shadow-lg shadow-primary/5 border-0">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full input-border focus:ring-2 focus:ring-primary/5 focus:border-primary/10 transition-all duration-200"
              />
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs bg-foreground/10 text-foreground border-foreground/20">
                Active
              </Badge>
              <Button size="sm" className="px-6 bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">Simple, clean, and functional design</p>
        </div>
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
