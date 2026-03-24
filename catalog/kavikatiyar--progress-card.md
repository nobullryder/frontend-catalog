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
progress-card.tsx
import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { X, File, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

// Utility to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const cardVariants = cva(
  "relative flex w-full max-w-md items-center space-x-4 overflow-hidden rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all",
  {
    variants: {
      status: {
        uploading: "border-border",
        complete: "border-green-500/50",
        error: "border-destructive/50",
      },
    },
    defaultVariants: {
      status: "uploading",
    },
  }
)

export interface UploadProgressCardProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  /** The name of the file being uploaded. */
  fileName: string;
  /** The total size of the file in bytes. */
  fileSize: number;
  /** The upload progress percentage (0-100). */
  progress: number;
  /** A ReactNode to display as the file icon. */
  icon?: React.ReactNode;
  /** Callback function invoked when the cancel button is clicked. */
  onCancel: () => void;
}

const UploadProgressCard = React.forwardRef<
  HTMLDivElement,
  UploadProgressCardProps
>(({ className, status, fileName, fileSize, progress, icon, onCancel, ...props }, ref) => {
  const uploadedSize = (fileSize * progress) / 100;
  const isComplete = progress === 100;

  return (
    <motion.div
      ref={ref}
      className={cn(cardVariants({ status }), className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      {...props}
    >
      {/* File Icon */}
      <div className="shrink-0 text-muted-foreground">
        {isComplete ? (
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        ) : (
          icon || <File className="h-8 w-8" />
        )}
      </div>

      {/* File Details & Progress Bar */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{fileName}</p>
        <div className="mt-2 space-y-1">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {isComplete ? formatFileSize(fileSize) : `${formatFileSize(uploadedSize)} of ${formatFileSize(fileSize)}`}
            </span>
            <span>{isComplete ? "Complete" : `${Math.round(progress)}%`}</span>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {!isComplete && (
         <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={onCancel}
            aria-label="Cancel upload"
          >
            <X className="h-4 w-4" />
          </Button>
      )}
    </motion.div>
  );
});
UploadProgressCard.displayName = "UploadProgressCard";

export { UploadProgressCard };

code.demo.1758265266870.tsx
import React, { useState, useEffect } from "react";
import { UploadProgressCard } from "@/components/ui/progress-card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function UploadProgressCardDemo() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"uploading" | "complete">("uploading");

  // Simulate upload progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isUploading && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 10;
          if (next >= 100) {
            clearInterval(interval!);
            setIsUploading(false);
            setStatus("complete");
            return 100;
          }
          return next;
        });
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isUploading, progress]);

  const handleStartUpload = () => {
    setProgress(0);
    setStatus("uploading");
    setIsUploading(true);
  };

  const handleCancel = () => {
    setIsUploading(false);
    console.log("Upload cancelled by user.");
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4 p-4">
      {!isUploading && progress === 0 && (
        <Button onClick={handleStartUpload}>Simulate File Upload</Button>
      )}

      {(isUploading || progress > 0) && (
        <UploadProgressCard
          fileName="Brief new project.pdf"
          fileSize={8100000} // 8.1 MB in bytes
          progress={progress}
          status={status}
          onCancel={handleCancel}
          icon={<FileText className="h-8 w-8 text-red-500" />}
        />
      )}
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/progress-card.tsx
import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { X, File, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

// Utility to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const cardVariants = cva(
  "relative flex w-full max-w-md items-center space-x-4 overflow-hidden rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all",
  {
    variants: {
      status: {
        uploading: "border-border",
        complete: "border-green-500/50",
        error: "border-destructive/50",
      },
    },
    defaultVariants: {
      status: "uploading",
    },
  }
)

export interface UploadProgressCardProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  /** The name of the file being uploaded. */
  fileName: string;
  /** The total size of the file in bytes. */
  fileSize: number;
  /** The upload progress percentage (0-100). */
  progress: number;
  /** A ReactNode to display as the file icon. */
  icon?: React.ReactNode;
  /** Callback function invoked when the cancel button is clicked. */
  onCancel: () => void;
}

const UploadProgressCard = React.forwardRef<
  HTMLDivElement,
  UploadProgressCardProps
>(({ className, status, fileName, fileSize, progress, icon, onCancel, ...props }, ref) => {
  const uploadedSize = (fileSize * progress) / 100;
  const isComplete = progress === 100;

  return (
    <motion.div
      ref={ref}
      className={cn(cardVariants({ status }), className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      {...props}
    >
      {/* File Icon */}
      <div className="shrink-0 text-muted-foreground">
        {isComplete ? (
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        ) : (
          icon || <File className="h-8 w-8" />
        )}
      </div>

      {/* File Details & Progress Bar */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{fileName}</p>
        <div className="mt-2 space-y-1">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {isComplete ? formatFileSize(fileSize) : `${formatFileSize(uploadedSize)} of ${formatFileSize(fileSize)}`}
            </span>
            <span>{isComplete ? "Complete" : `${Math.round(progress)}%`}</span>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      {!isComplete && (
         <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={onCancel}
            aria-label="Cancel upload"
          >
            <X className="h-4 w-4" />
          </Button>
      )}
    </motion.div>
  );
});
UploadProgressCard.displayName = "UploadProgressCard";

export { UploadProgressCard };
```

Install NPM dependencies:
```bash
framer-motion, class-variance-authority, lucide-react
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
