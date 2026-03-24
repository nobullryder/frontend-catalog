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
advanced-ai-chat-input.tsx
// components/ui/advanced-chat-input.tsx

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { CornerUpLeft, X } from "lucide-react";

// Interface for individual file props
interface FileAttachment {
  id: string | number;
  name: string;
  icon: React.ReactNode;
}

// Main component props interface
interface AdvancedChatInputProps extends React.HTMLAttributes<HTMLDivElement> {
  textareaProps?: TextareaProps;
  sendButtonProps?: ButtonProps;
  files?: FileAttachment[];
  onFileRemove?: (id: string | number) => void;
  onSend?: () => void;
  actionIcons?: React.ReactNode[];
}

const AdvancedChatInput = React.forwardRef<HTMLDivElement, AdvancedChatInputProps>(
  (
    {
      className,
      textareaProps,
      sendButtonProps,
      files = [],
      onFileRemove,
      onSend,
      actionIcons = [],
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const hasValue = !!textareaProps?.value;
    const hasFiles = files.length > 0;

    // Auto-resize textarea height
    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
      }
    }, [textareaProps?.value]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col rounded-xl border bg-card p-2 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Attached Files Section */}
        <AnimatePresence>
          {hasFiles && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2 flex flex-wrap gap-2"
            >
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-sm"
                >
                  {file.icon}
                  <span>{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => onFileRemove?.(file.id)}
                    aria-label={`Remove file ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input Area */}
        <div className="relative flex w-full items-end">
          <Textarea
            ref={textareaRef}
            rows={1}
            {...textareaProps}
            className={cn(
              "min-h-[40px] w-full resize-none border-none bg-transparent pr-20 shadow-none focus-visible:ring-0",
              textareaProps?.className
            )}
          />
        </div>

        {/* Actions and Send Button */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {actionIcons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          </div>

          <motion.div
            key={hasValue || hasFiles ? "active" : "inactive"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="icon"
              disabled={!hasValue && !hasFiles}
              onClick={onSend}
              {...sendButtonProps}
              className={cn("rounded-full", sendButtonProps?.className)}
            >
              <CornerUpLeft className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }
);

AdvancedChatInput.displayName = "AdvancedChatInput";

export { AdvancedChatInput, type FileAttachment };

code.demo.1759026406514.tsx
// demo.tsx

import * as React from "react";
import {
  AdvancedChatInput,
  type FileAttachment,
} from "@/components/ui/advanced-ai-chat-input";
import { Button } from "@/components/ui/button";
import { FileText, Link, Mic, Plus } from "lucide-react";

export default function AdvancedChatInputDemo() {
  const [inputValue, setInputValue] = React.useState("");
  const [files, setFiles] = React.useState<FileAttachment[]>([]);

  // Handler to add a new file attachment
  const handleAddFile = () => {
    const newFile: FileAttachment = {
      id: Date.now(),
      name: `document_${files.length + 1}.pdf`,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    };
    setFiles((prevFiles) => [...prevFiles, newFile]);
  };

  // Handler to remove a file by its ID
  const handleRemoveFile = (id: string | number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  // Handler for the send action
  const handleSend = () => {
    if (!inputValue && files.length === 0) return;
    console.log("Sending:", {
      message: inputValue,
      files: files.map((f) => f.name),
    });
    // Reset state after sending
    setInputValue("");
    setFiles([]);
  };

  // Define action icons to be passed as a prop
  const actionIcons = [
    <Button key="link" variant="ghost" size="icon" aria-label="Attach link">
      <Link className="h-4 w-4 text-muted-foreground" />
    </Button>,
    <Button key="mic" variant="ghost" size="icon" aria-label="Use microphone">
      <Mic className="h-4 w-4 text-muted-foreground" />
    </Button>,
  ];

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 bg-background p-4">
      <div className="w-full max-w-lg">
        <AdvancedChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What's on your mind?"
          files={files}
          onFileRemove={handleRemoveFile}
          onSend={handleSend}
          actionIcons={actionIcons}
          textareaProps={{
            onKeyDown: (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            },
          }}
        />
      </div>

      {/* Demo control to add files dynamically */}
      <Button variant="outline" onClick={handleAddFile}>
        <Plus className="mr-2 h-4 w-4" />
        Attach a file
      </Button>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/advanced-ai-chat-input.tsx
// components/ui/advanced-chat-input.tsx

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { CornerUpLeft, X } from "lucide-react";

// Interface for individual file props
interface FileAttachment {
  id: string | number;
  name: string;
  icon: React.ReactNode;
}

// Main component props interface
interface AdvancedChatInputProps extends React.HTMLAttributes<HTMLDivElement> {
  textareaProps?: TextareaProps;
  sendButtonProps?: ButtonProps;
  files?: FileAttachment[];
  onFileRemove?: (id: string | number) => void;
  onSend?: () => void;
  actionIcons?: React.ReactNode[];
}

const AdvancedChatInput = React.forwardRef<HTMLDivElement, AdvancedChatInputProps>(
  (
    {
      className,
      textareaProps,
      sendButtonProps,
      files = [],
      onFileRemove,
      onSend,
      actionIcons = [],
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const hasValue = !!textareaProps?.value;
    const hasFiles = files.length > 0;

    // Auto-resize textarea height
    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
      }
    }, [textareaProps?.value]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col rounded-xl border bg-card p-2 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Attached Files Section */}
        <AnimatePresence>
          {hasFiles && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2 flex flex-wrap gap-2"
            >
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-sm"
                >
                  {file.icon}
                  <span>{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => onFileRemove?.(file.id)}
                    aria-label={`Remove file ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input Area */}
        <div className="relative flex w-full items-end">
          <Textarea
            ref={textareaRef}
            rows={1}
            {...textareaProps}
            className={cn(
              "min-h-[40px] w-full resize-none border-none bg-transparent pr-20 shadow-none focus-visible:ring-0",
              textareaProps?.className
            )}
          />
        </div>

        {/* Actions and Send Button */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {actionIcons.map((icon, index) => (
              <React.Fragment key={index}>{icon}</React.Fragment>
            ))}
          </div>

          <motion.div
            key={hasValue || hasFiles ? "active" : "inactive"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="icon"
              disabled={!hasValue && !hasFiles}
              onClick={onSend}
              {...sendButtonProps}
              className={cn("rounded-full", sendButtonProps?.className)}
            >
              <CornerUpLeft className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }
);

AdvancedChatInput.displayName = "AdvancedChatInput";

export { AdvancedChatInput, type FileAttachment };
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
