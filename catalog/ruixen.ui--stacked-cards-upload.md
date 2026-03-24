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
stacked-cards-upload.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export type UploadFile = {
  id: string
  file: File
  progress: number
  status: "uploading" | "done"
}

interface StackedCardsUploadProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
}

export function StackedCardsUpload({ files, onRemove }: StackedCardsUploadProps) {
  return (
    <div className="flex flex-col gap-4 relative">
      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: files.length - i }}
          >
            <Card className="relative overflow-hidden">
              {/* Progress background */}
              {file.status !== "done" && (
                <div
                  className="absolute top-0 left-0 h-full bg-gray-300 dark:bg-gray-700 opacity-30 z-0 transition-all"
                  style={{ width: `${file.progress}%` }}
                />
              )}

              <CardContent className="relative flex justify-between items-center p-4">
                {/* File name */}
                <p className="font-medium break-all flex-1 z-10 text-center sm:text-left">
                  {file.file.name}
                </p>

                {/* Remove button */}
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 z-10"
                    onClick={() => onRemove(file.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}


code.demo.1758729180221.tsx
"use client"

import * as React from "react"
import { StackedCardsUpload, UploadFile } from "@/components/ui/stacked-cards-upload"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"

export default function DemoStackedCardsUpload() {
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  // Fake upload simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading"
            ? {
                ...f,
                progress: Math.min(f.progress + 10, 100),
                status: f.progress + 10 >= 100 ? "done" : "uploading",
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
      <h1 className="text-2xl font-semibold">Stacked Cards Upload Demo</h1>

      <input
        type="file"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />

      <Button onClick={() => inputRef.current?.click()}>Upload Files</Button>

      <StackedCardsUpload files={files} onRemove={handleRemove} />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stacked-cards-upload.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export type UploadFile = {
  id: string
  file: File
  progress: number
  status: "uploading" | "done"
}

interface StackedCardsUploadProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
}

export function StackedCardsUpload({ files, onRemove }: StackedCardsUploadProps) {
  return (
    <div className="flex flex-col gap-4 relative">
      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: files.length - i }}
          >
            <Card className="relative overflow-hidden">
              {/* Progress background */}
              {file.status !== "done" && (
                <div
                  className="absolute top-0 left-0 h-full bg-gray-300 dark:bg-gray-700 opacity-30 z-0 transition-all"
                  style={{ width: `${file.progress}%` }}
                />
              )}

              <CardContent className="relative flex justify-between items-center p-4">
                {/* File name */}
                <p className="font-medium break-all flex-1 z-10 text-center sm:text-left">
                  {file.file.name}
                </p>

                {/* Remove button */}
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 z-10"
                    onClick={() => onRemove(file.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
