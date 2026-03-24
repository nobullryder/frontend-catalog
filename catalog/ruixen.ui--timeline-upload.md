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
timeline-upload.tsx
"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Circle, CheckCircle2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type UploadFile = {
  id: string
  file: File
  progress: number
  status: "uploading" | "done"
}

interface TimelineUploadProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
}

export function TimelineUpload({ files, onRemove }: TimelineUploadProps) {
  return (
    <div className="flex flex-col gap-6">
      {files.map((file, i) => (
        <div key={file.id} className="flex items-start gap-4">
          {/* Timeline connector */}
          <div className="flex flex-col items-center">
            {file.status === "done" ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-blue-500" />
            )}
            {i !== files.length - 1 && (
              <div className="w-px flex-1 bg-muted" />
            )}
          </div>

          {/* File Card */}
          <Card className="w-full">
            <CardContent className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                {/* File/Folder Name */}
                <p className="font-medium break-all flex-1 pr-4">📄 {file.file.name}</p>

                {/* Status and Remove */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {file.status === "done" ? "Completed" : "Uploading..."}
                  </span>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onRemove(file.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {file.status !== "done" && (
                <Progress value={file.progress} className="h-2" />
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}


code.demo.1758728296870.tsx
"use client"

import * as React from "react"
import { TimelineUpload, UploadFile } from "@/components/ui/timeline-upload"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"

export default function DemoTimelineUpload() {
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const folderRef = React.useRef<HTMLInputElement | null>(null)

  // Fake upload simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading"
            ? {
                ...f,
                progress: Math.min(f.progress + 15, 100),
                status: f.progress + 15 >= 100 ? "done" : "uploading",
              }
            : f
        )
      )
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles: UploadFile[] = Array.from(e.target.files).map((file) => ({
      id: uuidv4(),
      file,
      progress: 0,
      status: "uploading",
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-medium">Timeline Upload Demo</h1>

      {/* Hidden file inputs */}
      <input
        type="file"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        className="hidden"
        ref={folderRef}
        onChange={handleFileSelect}
      />

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => inputRef.current?.click()}>
          Upload Files
        </Button>
        <Button variant="outline" onClick={() => folderRef.current?.click()}>
          Upload Folder
        </Button>
      </div>

      {/* Upload Timeline */}
      <TimelineUpload files={files} onRemove={handleRemove} />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/timeline-upload.tsx
"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Circle, CheckCircle2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type UploadFile = {
  id: string
  file: File
  progress: number
  status: "uploading" | "done"
}

interface TimelineUploadProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
}

export function TimelineUpload({ files, onRemove }: TimelineUploadProps) {
  return (
    <div className="flex flex-col gap-6">
      {files.map((file, i) => (
        <div key={file.id} className="flex items-start gap-4">
          {/* Timeline connector */}
          <div className="flex flex-col items-center">
            {file.status === "done" ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-blue-500" />
            )}
            {i !== files.length - 1 && (
              <div className="w-px flex-1 bg-muted" />
            )}
          </div>

          {/* File Card */}
          <Card className="w-full">
            <CardContent className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                {/* File/Folder Name */}
                <p className="font-medium break-all flex-1 pr-4">📄 {file.file.name}</p>

                {/* Status and Remove */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {file.status === "done" ? "Completed" : "Uploading..."}
                  </span>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onRemove(file.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {file.status !== "done" && (
                <Progress value={file.progress} className="h-2" />
              )}
            </CardContent>
          </Card>
        </div>
      ))}
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
