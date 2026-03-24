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
composer-input.tsx
// components/ui/composer-input.tsx

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Trash2,
  Paperclip,
  Mic,
  Image as ImageIcon,
  Wand2,
  MoreHorizontal,
  CornerDownLeft,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils" // Your utility for merging class names
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Define the structure for an attachment
export interface Attachment {
  id: string
  fileName: string
  fileType: "image" | "document"
  thumbnailUrl?: string // URL for image previews
}

// Define props for the component
export interface ComposerInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend: (message: string, attachments: Attachment[]) => void
  initialAttachments?: Attachment[]
  placeholder?: string
}

const ComposerInput = React.forwardRef<HTMLDivElement, ComposerInputProps>(
  ({ className, onSend, initialAttachments = [], placeholder = "Type your message...", ...props }, ref) => {
    const [message, setMessage] = React.useState("")
    const [attachments, setAttachments] = React.useState<Attachment[]>(initialAttachments)

    const handleSend = () => {
      if (message.trim() || attachments.length > 0) {
        onSend(message, attachments)
        setMessage("")
        setAttachments([])
      }
    }

    const handleRemoveAttachment = (id: string) => {
      setAttachments((prev) => prev.filter((att) => att.id !== id))
    }
    
    // An array of toolbar items for easier mapping
    const toolbarItems = [
      { icon: Bold, tooltip: "Bold" },
      { icon: Italic, tooltip: "Italic" },
      { icon: Underline, tooltip: "Underline" },
      { icon: List, tooltip: "Bullet List" },
      { icon: ListOrdered, tooltip: "Numbered List" },
      { icon: Quote, tooltip: "Quote" },
      { icon: Code, tooltip: "Code" },
      { icon: Link, tooltip: "Link" },
    ];
    
    // An array of action button items
    const actionItems = [
      { icon: Paperclip, tooltip: "Attach File" },
      { icon: Mic, tooltip: "Voice Message" },
      { icon: ImageIcon, tooltip: "Add Image" },
      { icon: Wand2, tooltip: "AI Assist" },
      { icon: MoreHorizontal, tooltip: "More Options" },
    ];

    return (
      <TooltipProvider>
        <div
          ref={ref}
          className={cn(
            "flex flex-col w-full rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
            className
          )}
          {...props}
        >
          {/* Top Toolbar */}
          <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-1">
              {toolbarItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <item.icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Main text area */}
          <div className="p-2 flex-grow">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="w-full min-h-[100px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
            />
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <AnimatePresence>
                  {attachments.map((att) => (
                    <motion.div
                      key={att.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="relative group"
                    >
                      <div className="aspect-square w-full rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {att.fileType === "image" && att.thumbnailUrl ? (
                          <img src={att.thumbnailUrl} alt={att.fileName} className="h-full w-full object-cover"/>
                        ) : (
                          <Paperclip className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                       <button
                          onClick={() => handleRemoveAttachment(att.id)}
                          className="absolute -top-1 -right-1 bg-background border rounded-full p-0.5 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove attachment"
                        >
                          <X className="h-3 w-3" />
                        </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between p-2 border-t">
            <div className="flex items-center gap-1">
              {actionItems.map((item, index) => (
                 <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <item.icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleSend} size="sm">
                Send
                <CornerDownLeft className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </TooltipProvider>
    )
  }
)

ComposerInput.displayName = "ComposerInput"

export { ComposerInput }

code.demo.1760165544765.tsx
// demo.tsx

import React from "react"
import { toast } from "sonner"
import { ComposerInput, Attachment } from "@/components/ui/composer-input" // Adjust path as needed

// Sample attachments for the demo
const sampleAttachments: Attachment[] = [
  {
    id: '1',
    fileName: 'Project-Brief.pdf',
    fileType: 'document',
  },
  {
    id: '2',
    fileName: 'UI-Mockup.png',
    fileType: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=200',
  },
  {
    id: '3',
    fileName: 'Design-Assets.zip',
    fileType: 'document',
  }
];

export default function ComposerInputDemo() {
  const handleSend = (message: string, attachments: Attachment[]) => {
    // In a real app, this function would send the data to an API
    console.log("Sending message:", message)
    console.log("With attachments:", attachments)

    // Use sonner to show a success toast
    toast.success("Message Sent!", {
      description: `Your message and ${attachments.length} attachments have been sent.`,
      duration: 3000,
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
      <ComposerInput
        onSend={handleSend}
        initialAttachments={sampleAttachments}
        placeholder="Share your thoughts or attach a file..."
        aria-label="Comment composer"
      />
    </div>
  )
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/composer-input.tsx
// components/ui/composer-input.tsx

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Trash2,
  Paperclip,
  Mic,
  Image as ImageIcon,
  Wand2,
  MoreHorizontal,
  CornerDownLeft,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils" // Your utility for merging class names
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Define the structure for an attachment
export interface Attachment {
  id: string
  fileName: string
  fileType: "image" | "document"
  thumbnailUrl?: string // URL for image previews
}

// Define props for the component
export interface ComposerInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend: (message: string, attachments: Attachment[]) => void
  initialAttachments?: Attachment[]
  placeholder?: string
}

const ComposerInput = React.forwardRef<HTMLDivElement, ComposerInputProps>(
  ({ className, onSend, initialAttachments = [], placeholder = "Type your message...", ...props }, ref) => {
    const [message, setMessage] = React.useState("")
    const [attachments, setAttachments] = React.useState<Attachment[]>(initialAttachments)

    const handleSend = () => {
      if (message.trim() || attachments.length > 0) {
        onSend(message, attachments)
        setMessage("")
        setAttachments([])
      }
    }

    const handleRemoveAttachment = (id: string) => {
      setAttachments((prev) => prev.filter((att) => att.id !== id))
    }
    
    // An array of toolbar items for easier mapping
    const toolbarItems = [
      { icon: Bold, tooltip: "Bold" },
      { icon: Italic, tooltip: "Italic" },
      { icon: Underline, tooltip: "Underline" },
      { icon: List, tooltip: "Bullet List" },
      { icon: ListOrdered, tooltip: "Numbered List" },
      { icon: Quote, tooltip: "Quote" },
      { icon: Code, tooltip: "Code" },
      { icon: Link, tooltip: "Link" },
    ];
    
    // An array of action button items
    const actionItems = [
      { icon: Paperclip, tooltip: "Attach File" },
      { icon: Mic, tooltip: "Voice Message" },
      { icon: ImageIcon, tooltip: "Add Image" },
      { icon: Wand2, tooltip: "AI Assist" },
      { icon: MoreHorizontal, tooltip: "More Options" },
    ];

    return (
      <TooltipProvider>
        <div
          ref={ref}
          className={cn(
            "flex flex-col w-full rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
            className
          )}
          {...props}
        >
          {/* Top Toolbar */}
          <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-1">
              {toolbarItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <item.icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Main text area */}
          <div className="p-2 flex-grow">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="w-full min-h-[100px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
            />
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <AnimatePresence>
                  {attachments.map((att) => (
                    <motion.div
                      key={att.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="relative group"
                    >
                      <div className="aspect-square w-full rounded-md overflow-hidden bg-muted flex items-center justify-center">
                        {att.fileType === "image" && att.thumbnailUrl ? (
                          <img src={att.thumbnailUrl} alt={att.fileName} className="h-full w-full object-cover"/>
                        ) : (
                          <Paperclip className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                       <button
                          onClick={() => handleRemoveAttachment(att.id)}
                          className="absolute -top-1 -right-1 bg-background border rounded-full p-0.5 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove attachment"
                        >
                          <X className="h-3 w-3" />
                        </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between p-2 border-t">
            <div className="flex items-center gap-1">
              {actionItems.map((item, index) => (
                 <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <item.icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleSend} size="sm">
                Send
                <CornerDownLeft className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </TooltipProvider>
    )
  }
)

ComposerInput.displayName = "ComposerInput"

export { ComposerInput }
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
