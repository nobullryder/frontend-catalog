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
mail-checker-input.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import md5 from "md5"

export default function MailCheckInput() {
  const id = useId()
  const [email, setEmail] = useState("")

  // Generate gravatar URL if valid email
  const getAvatar = (email: string) => {
    if (!email.includes("@")) return null
    const hash = md5(email.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`
  }

  const avatarUrl = getAvatar(email)

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        Enter your email
      </Label>
      <div className="relative group">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={24}
            height={24}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border shadow-sm"
          />
        ) : (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
            ?
          </div>
        )}
        <Input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="pl-12 h-12 rounded-2xl border border-muted bg-background/80 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/40"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Stay updated with our latest news & articles.
      </p>
    </div>
  )
}


code.demo.1755965704723.tsx
import MailCheckInput from "@/components/ui/mail-checker-input";

export default function DemoOne() {
  return <MailCheckInput />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/mail-checker-input.tsx
"use client"

import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import md5 from "md5"

export default function MailCheckInput() {
  const id = useId()
  const [email, setEmail] = useState("")

  // Generate gravatar URL if valid email
  const getAvatar = (email: string) => {
    if (!email.includes("@")) return null
    const hash = md5(email.trim().toLowerCase())
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`
  }

  const avatarUrl = getAvatar(email)

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        Enter your email
      </Label>
      <div className="relative group">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={24}
            height={24}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border shadow-sm"
          />
        ) : (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
            ?
          </div>
        )}
        <Input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="pl-12 h-12 rounded-2xl border border-muted bg-background/80 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/40"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Stay updated with our latest news & articles.
      </p>
    </div>
  )
}

```

Install NPM dependencies:
```bash
md5, next
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
