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
music-equalizer-upload.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export type UploadFile = {
  id: string
  file: File
  status: "uploading" | "done"
}

interface MusicEqualizerUploadProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
}

export function MusicEqualizerUpload({ files, onRemove }: MusicEqualizerUploadProps) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full relative overflow-hidden">
              <CardContent className="flex justify-between items-center p-3">
                {/* File name */}
                <p className="font-medium break-all">{file.file.name}</p>

                {/* Equalizer bars */}
                {file.status === "uploading" && (
                  <div className="flex items-end gap-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 bg-blue-500 dark:bg-blue-400"
                        animate={{ height: ["4px", "12px", "4px"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + i * 0.1,
                          repeatType: "loop"
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Remove button */}
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-4"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(file.id)
                    }}
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


code.demo.1758737306223.tsx
"use client"

import * as React from "react"
import { MusicEqualizerUpload, UploadFile } from "@/components/ui/music-equalizer-upload"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"

export default function DemoMusicEqualizerUpload() {
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  // Simulate upload completion after 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.status === "uploading"
            ? { ...f, status: "done" }
            : f
        )
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    // Filter only audio files
    const audioFiles = Array.from(e.target.files).filter(file => file.type.startsWith("audio/"))

    const newFiles: UploadFile[] = audioFiles.map((file) => ({
      id: uuidv4(),
      file,
      status: "uploading"
    }))

    setFiles((prev) => [...prev, ...newFiles])
    e.target.value = "" // reset input to allow re-upload
  }

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Music Equalizer Upload Demo (Audio Only)</h1>

      <input
        type="file"
        multiple
        accept="audio/*"       // Accept only audio files
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <Button onClick={() => inputRef.current?.click()}>Upload Audio Files</Button>

      <MusicEqualizerUpload files={files} onRemove={handleRemove} />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/music-equalizer-upload.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export type UploadFile = {
  id: string
  file: File
  status: "uploading" | "done"
}

interface MusicEqualizerUploadProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
}

export function MusicEqualizerUpload({ files, onRemove }: MusicEqualizerUploadProps) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full relative overflow-hidden">
              <CardContent className="flex justify-between items-center p-3">
                {/* File name */}
                <p className="font-medium break-all">{file.file.name}</p>

                {/* Equalizer bars */}
                {file.status === "uploading" && (
                  <div className="flex items-end gap-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 bg-blue-500 dark:bg-blue-400"
                        animate={{ height: ["4px", "12px", "4px"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + i * 0.1,
                          repeatType: "loop"
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Remove button */}
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-4"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(file.id)
                    }}
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
