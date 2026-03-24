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
url-input.tsx
"use client"

import { useEffect, useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe } from "lucide-react"

export default function UrlInput() {
  const id = useId()
  const [url, setUrl] = useState("")
  const [favicon, setFavicon] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setFavicon(null)
      return
    }

    try {
      const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`)
      const faviconUrl = `${parsedUrl.origin}/favicon.ico`
      setFavicon(faviconUrl)
    } catch {
      setFavicon(null)
    }
  }, [url])

  return (
    <div className="space-y-2 max-w-md mx-auto">
      <Label htmlFor={id}>Website URL</Label>
      <div className="relative">
        <Input
          id={id}
          className="peer ps-12 rounded-lg"
          placeholder="example.com"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <span className="absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
          {favicon ? (
            <img
              src={favicon}
              alt="favicon"
              className="h-5 w-5 rounded-sm"
              onError={() => setFavicon(null)} // fallback if favicon missing
            />
          ) : (
            <Globe className="h-5 w-5 text-muted-foreground" />
          )}
        </span>
      </div>
    </div>
  )
}


code.demo.1757010833801.tsx
import UrlInput from "@/components/ui/url-input";

export default function DemoOne() {
  return <UrlInput />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/url-input.tsx
"use client"

import { useEffect, useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe } from "lucide-react"

export default function UrlInput() {
  const id = useId()
  const [url, setUrl] = useState("")
  const [favicon, setFavicon] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setFavicon(null)
      return
    }

    try {
      const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`)
      const faviconUrl = `${parsedUrl.origin}/favicon.ico`
      setFavicon(faviconUrl)
    } catch {
      setFavicon(null)
    }
  }, [url])

  return (
    <div className="space-y-2 max-w-md mx-auto">
      <Label htmlFor={id}>Website URL</Label>
      <div className="relative">
        <Input
          id={id}
          className="peer ps-12 rounded-lg"
          placeholder="example.com"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <span className="absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
          {favicon ? (
            <img
              src={favicon}
              alt="favicon"
              className="h-5 w-5 rounded-sm"
              onError={() => setFavicon(null)} // fallback if favicon missing
            />
          ) : (
            <Globe className="h-5 w-5 text-muted-foreground" />
          )}
        </span>
      </div>
    </div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react
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
