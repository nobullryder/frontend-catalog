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
file-upload-button.tsx
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Edit, File, Trash2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export interface FileUploadButtonProps {
  onFileSelect: (file: File) => Promise<void>;
  maxSize?: number;
  allowedTypes?: string[];
  className?: string;
  disabled?: boolean;
}

function getFileExtension(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toUpperCase() : "";
}

export function FileUploadButton({
  onFileSelect,
  maxSize = 10 * 1024 * 1024,
  allowedTypes = ["image/*", "application/pdf", "text/*"],
  className,
  disabled = false,
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      setPreviewUrl(null);
      setSelectedFile(null);
      try {
        if (file.size > maxSize) {
          setError(
            `File too large. Max size: ${Math.round(maxSize / 1024 / 1024)}MB`,
          );
          return;
        }
        if (allowedTypes && allowedTypes.length > 0) {
          const valid = allowedTypes.some((type) =>
            file.type.match(type.replace("*", ".*")),
          );
          if (!valid) {
            setError("File type not allowed");
            return;
          }
        }
        if (file.type.startsWith("image/")) {
          setPreviewUrl(URL.createObjectURL(file));
        } else {
          setPreviewUrl(null);
        }
        setSelectedFile(file);
        await onFileSelect(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onFileSelect, maxSize, allowedTypes],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled || uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setPopoverOpen(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleEdit = () => {
    setPopoverOpen(false);
    inputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const isImage = selectedFile && selectedFile.type.startsWith("image/");
  const fileExt = selectedFile ? getFileExtension(selectedFile.name) : "";

  return (
    <div
      className={cn(
        "relative flex items-center",
        dragActive && "ring-2 ring-primary/60 bg-primary/5",
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled && !uploading) setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={allowedTypes.join(",")}
        className="hidden"
        onChange={onInputChange}
        disabled={disabled || uploading}
      />
      {selectedFile ? (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isImage ? "View image preview" : "View file details"}
              disabled={disabled}
              className="h-8 w-8 sm:h-9 sm:w-9 p-0 overflow-hidden rounded-lg"
            >
              {isImage && previewUrl ? (
                <img
                  src={previewUrl}
                  alt={selectedFile.name}
                  className="object-cover w-full h-full rounded-lg"
                  style={{ display: "block" }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <span className="text-[10px] font-semibold text-muted-foreground leading-none mt-0.5">
                    {fileExt}
                  </span>
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-64 p-0" align="start">
            <div className="p-3 border-b">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">
                  {selectedFile.name}
                </span>
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
            </div>
            <div className="p-3">
              {isImage && previewUrl ? (
                <img
                  src={previewUrl}
                  alt={selectedFile.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-40 bg-muted rounded-lg mb-3">
                  <File className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    {fileExt}
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex-1"
                  aria-label="Change file"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Change
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className="flex-1"
                  aria-label="Remove file"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Attach file"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          {uploading ? (
            <Upload className="h-4 w-4 animate-spin" />
          ) : (
            <File className="h-4 w-4" />
          )}
        </Button>
      )}
      {error && (
        <div className="absolute left-full ml-1 sm:ml-2 bg-destructive/90 text-white text-xs rounded px-1 sm:px-2 py-0.5 sm:py-1 z-10 flex items-center gap-1 max-w-32 sm:max-w-48">
          <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}
    </div>
  );
}


code.demo.1751640178519.tsx
import { FileUploadButton } from "@/components/ui/file-upload-button";
import { useState } from "react";

export default function FileUploadDemo() {
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);

  const handleFileSelect = async (file: File) => {
    // Simulate async upload (e.g., to a server)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFileInfo({ name: file.name, size: file.size });
    console.log("Uploaded file:", file.name);
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-[200px]">
      <FileUploadButton
        onFileSelect={handleFileSelect}
        maxSize={5 * 1024 * 1024} // 5MB limit
        allowedTypes={["image/png", "image/jpeg", "application/pdf"]}
        className="border-none"
      />
      {fileInfo && (
        <div className="mt-2 text-sm text-foreground">
          <p className="font-medium">Uploaded File:</p>
          <p className="truncate">{fileInfo.name}</p>
          <p className="text-muted-foreground">{formatFileSize(fileInfo.size)}</p>
        </div>
      )}
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/file-upload-button.tsx
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Edit, File, Trash2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

export interface FileUploadButtonProps {
  onFileSelect: (file: File) => Promise<void>;
  maxSize?: number;
  allowedTypes?: string[];
  className?: string;
  disabled?: boolean;
}

function getFileExtension(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toUpperCase() : "";
}

export function FileUploadButton({
  onFileSelect,
  maxSize = 10 * 1024 * 1024,
  allowedTypes = ["image/*", "application/pdf", "text/*"],
  className,
  disabled = false,
}: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      setPreviewUrl(null);
      setSelectedFile(null);
      try {
        if (file.size > maxSize) {
          setError(
            `File too large. Max size: ${Math.round(maxSize / 1024 / 1024)}MB`,
          );
          return;
        }
        if (allowedTypes && allowedTypes.length > 0) {
          const valid = allowedTypes.some((type) =>
            file.type.match(type.replace("*", ".*")),
          );
          if (!valid) {
            setError("File type not allowed");
            return;
          }
        }
        if (file.type.startsWith("image/")) {
          setPreviewUrl(URL.createObjectURL(file));
        } else {
          setPreviewUrl(null);
        }
        setSelectedFile(file);
        await onFileSelect(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onFileSelect, maxSize, allowedTypes],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled || uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setPopoverOpen(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleEdit = () => {
    setPopoverOpen(false);
    inputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const isImage = selectedFile && selectedFile.type.startsWith("image/");
  const fileExt = selectedFile ? getFileExtension(selectedFile.name) : "";

  return (
    <div
      className={cn(
        "relative flex items-center",
        dragActive && "ring-2 ring-primary/60 bg-primary/5",
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled && !uploading) setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={allowedTypes.join(",")}
        className="hidden"
        onChange={onInputChange}
        disabled={disabled || uploading}
      />
      {selectedFile ? (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isImage ? "View image preview" : "View file details"}
              disabled={disabled}
              className="h-8 w-8 sm:h-9 sm:w-9 p-0 overflow-hidden rounded-lg"
            >
              {isImage && previewUrl ? (
                <img
                  src={previewUrl}
                  alt={selectedFile.name}
                  className="object-cover w-full h-full rounded-lg"
                  style={{ display: "block" }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <span className="text-[10px] font-semibold text-muted-foreground leading-none mt-0.5">
                    {fileExt}
                  </span>
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-64 p-0" align="start">
            <div className="p-3 border-b">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">
                  {selectedFile.name}
                </span>
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
            </div>
            <div className="p-3">
              {isImage && previewUrl ? (
                <img
                  src={previewUrl}
                  alt={selectedFile.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-40 bg-muted rounded-lg mb-3">
                  <File className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    {fileExt}
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex-1"
                  aria-label="Change file"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Change
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className="flex-1"
                  aria-label="Remove file"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Attach file"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          {uploading ? (
            <Upload className="h-4 w-4 animate-spin" />
          ) : (
            <File className="h-4 w-4" />
          )}
        </Button>
      )}
      {error && (
        <div className="absolute left-full ml-1 sm:ml-2 bg-destructive/90 text-white text-xs rounded px-1 sm:px-2 py-0.5 sm:py-1 z-10 flex items-center gap-1 max-w-32 sm:max-w-48">
          <X className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
          <span className="truncate">{error}</span>
        </div>
      )}
    </div>
  );
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
