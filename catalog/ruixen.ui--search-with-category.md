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
search-with-category.tsx
"use client"

import { useId } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchWithCategory() {
  const id = useId()

  return (
    <div className="space-y-2 mx-auto max-w-md">
      <Label htmlFor={id}>Search with category</Label>

      <div className="flex rounded-md shadow-sm">
        {/* Category selector */}
        <Select>
          <SelectTrigger className="h-10 w-[120px] rounded-e-none border-r-0 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="products">Products</SelectItem>
            <SelectItem value="blogs">Blogs</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="docs">Docs</SelectItem>
          </SelectContent>
        </Select>

        {/* Search input */}
        <Input
          id={id}
          type="text"
          placeholder="Search..."
          className="h-10 -ms-px rounded-none text-sm focus-visible:z-10 shadow-none"
        />

        {/* Search button */}
        <Button
          type="submit"
          className="h-10 rounded-s-none rounded-e-md"
          variant="secondary"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}


code.demo.1756181628617.tsx
import SearchWithCategory from "@/components/ui/search-with-category";

export default function DemoOne() {
  return <SearchWithCategory />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/search-with-category.tsx
"use client"

import { useId } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchWithCategory() {
  const id = useId()

  return (
    <div className="space-y-2 mx-auto max-w-md">
      <Label htmlFor={id}>Search with category</Label>

      <div className="flex rounded-md shadow-sm">
        {/* Category selector */}
        <Select>
          <SelectTrigger className="h-10 w-[120px] rounded-e-none border-r-0 text-sm">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="products">Products</SelectItem>
            <SelectItem value="blogs">Blogs</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="docs">Docs</SelectItem>
          </SelectContent>
        </Select>

        {/* Search input */}
        <Input
          id={id}
          type="text"
          placeholder="Search..."
          className="h-10 -ms-px rounded-none text-sm focus-visible:z-10 shadow-none"
        />

        {/* Search button */}
        <Button
          type="submit"
          className="h-10 rounded-s-none rounded-e-md"
          variant="secondary"
        >
          <Search className="h-5 w-5" />
        </Button>
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
