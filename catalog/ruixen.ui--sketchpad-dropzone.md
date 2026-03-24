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
sketchpad-dropzone.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export type DropFile = {
  id: string
  file: File
}

interface SketchpadDropzoneProps {
  files: DropFile[]
  onDrop?: (files: FileList) => void
  onRemove?: (id: string) => void
}

export function SketchpadDropzone({ files, onDrop, onRemove }: SketchpadDropzoneProps) {
  const dropRef = React.useRef<HTMLDivElement | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && onDrop) {
      onDrop(e.dataTransfer.files)
    }
  }

  // Handle click to open file manager
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onDrop) {
      onDrop(e.target.files)
      e.target.value = "" // reset input so same file can be selected again
    }
  }

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {/* Drop Zone / Sketchpad */}
      <div
        ref={dropRef}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 min-h-[300px] bg-white dark:bg-gray-800 flex flex-wrap gap-4 items-start cursor-pointer"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.05) 25px), repeating-linear-gradient(-90deg, transparent, transparent 24px, rgba(0,0,0,0.05) 25px)"
        }}
      >
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ scale: 0, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Card className="w-40 bg-yellow-50 dark:bg-yellow-900 shadow-lg relative">
                <CardContent className="p-2 flex justify-between items-center">
                  <p className="font-medium text-sm break-all">{file.file.name}</p>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(file.id)
                        }}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}


code.demo.1758735063570.tsx
"use client"

import * as React from "react"
import { SketchpadDropzone, DropFile } from "@/components/ui/sketchpad-dropzone"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"

export default function DemoSketchpadDropzone() {
  const [files, setFiles] = React.useState<DropFile[]>([])

  const handleDrop = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: uuidv4(),
      file
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Sketchpad Drop Zone Demo</h1>

      <p className="text-sm text-muted-foreground">
        Drag and drop files onto the sketchpad. They will appear as pinned notes.
      </p>

      <SketchpadDropzone files={files} onDrop={handleDrop} onRemove={handleRemove} />

      <Button
        onClick={() => setFiles([])}
        variant="outline"
        className="mt-4"
      >
        Clear All
      </Button>
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/sketchpad-dropzone.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export type DropFile = {
  id: string
  file: File
}

interface SketchpadDropzoneProps {
  files: DropFile[]
  onDrop?: (files: FileList) => void
  onRemove?: (id: string) => void
}

export function SketchpadDropzone({ files, onDrop, onRemove }: SketchpadDropzoneProps) {
  const dropRef = React.useRef<HTMLDivElement | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && onDrop) {
      onDrop(e.dataTransfer.files)
    }
  }

  // Handle click to open file manager
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onDrop) {
      onDrop(e.target.files)
      e.target.value = "" // reset input so same file can be selected again
    }
  }

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {/* Drop Zone / Sketchpad */}
      <div
        ref={dropRef}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 min-h-[300px] bg-white dark:bg-gray-800 flex flex-wrap gap-4 items-start cursor-pointer"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.05) 25px), repeating-linear-gradient(-90deg, transparent, transparent 24px, rgba(0,0,0,0.05) 25px)"
        }}
      >
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ scale: 0, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Card className="w-40 bg-yellow-50 dark:bg-yellow-900 shadow-lg relative">
                <CardContent className="p-2 flex justify-between items-center">
                  <p className="font-medium text-sm break-all">{file.file.name}</p>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove(file.id)
                        }}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
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
