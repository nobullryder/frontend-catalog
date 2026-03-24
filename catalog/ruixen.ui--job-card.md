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
job-card.tsx
"use client"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JobCardProps {
  title?: string
  company?: string
  rate?: string
  location?: string
  type?: string
  experience?: string
  logoUrl?: string
}

export default function JobCard({
  title = "Software Engineer",
  company = "Tech Corp",
  rate = "$80k - $100k",
  location = "Remote",
  type = "Full-time",
  experience = "2+ years",
  logoUrl = "",
}: JobCardProps) {
  return (
    <Card className="w-80 rounded-2xl shadow-sm border border-border bg-card text-card-foreground transition-colors">
      {/* Header with avatar + rate */}
      <CardHeader className="flex flex-row items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={logoUrl} alt={company} />
            <AvatarFallback>
              {company.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{company}</p>
            <p className="text-sm text-muted-foreground">{rate}</p>
          </div>
        </div>
      </CardHeader>

      {/* Main content */}
      <CardContent className="px-4 py-3">
        <h2 className="text-xl font-medium leading-snug">{title}</h2>
        <div className="mt-3 space-y-2 text-sm">
          <p>
            <span className="font-medium">Location:</span> {location}
          </p>
          <p>
            <span className="font-medium">Type:</span> {type}
          </p>
          <p>
            <span className="font-medium">Experience:</span> {experience}
          </p>
        </div>
      </CardContent>

      {/* Footer with multiple buttons */}
      <CardFooter className="flex justify-between gap-2 px-4 py-6 border-t">
        <Button
          variant="outline"
          className="rounded-xl px-4"
        >
          Save
        </Button>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="rounded-xl px-4"
          >
            Share
          </Button>
          <Button
            variant="default"
            className="rounded-xl px-6"
          >
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


code.demo.1757382121379.tsx
import JobCard from "@/components/ui/job-card";

export default function DemoOne() {
  return <JobCard />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/job-card.tsx
"use client"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JobCardProps {
  title?: string
  company?: string
  rate?: string
  location?: string
  type?: string
  experience?: string
  logoUrl?: string
}

export default function JobCard({
  title = "Software Engineer",
  company = "Tech Corp",
  rate = "$80k - $100k",
  location = "Remote",
  type = "Full-time",
  experience = "2+ years",
  logoUrl = "",
}: JobCardProps) {
  return (
    <Card className="w-80 rounded-2xl shadow-sm border border-border bg-card text-card-foreground transition-colors">
      {/* Header with avatar + rate */}
      <CardHeader className="flex flex-row items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={logoUrl} alt={company} />
            <AvatarFallback>
              {company.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{company}</p>
            <p className="text-sm text-muted-foreground">{rate}</p>
          </div>
        </div>
      </CardHeader>

      {/* Main content */}
      <CardContent className="px-4 py-3">
        <h2 className="text-xl font-medium leading-snug">{title}</h2>
        <div className="mt-3 space-y-2 text-sm">
          <p>
            <span className="font-medium">Location:</span> {location}
          </p>
          <p>
            <span className="font-medium">Type:</span> {type}
          </p>
          <p>
            <span className="font-medium">Experience:</span> {experience}
          </p>
        </div>
      </CardContent>

      {/* Footer with multiple buttons */}
      <CardFooter className="flex justify-between gap-2 px-4 py-6 border-t">
        <Button
          variant="outline"
          className="rounded-xl px-4"
        >
          Save
        </Button>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="rounded-xl px-4"
          >
            Share
          </Button>
          <Button
            variant="default"
            className="rounded-xl px-6"
          >
            Apply
          </Button>
        </div>
      </CardFooter>
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
