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
image-uploader.tsx
"use client";

import { AlertCircle, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Input } from "./input";
import { Skeleton } from "./skeleton";

interface ImageUploadFieldProps {
  value?: File | string | null;
  onChange?: (value: File | string | null) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  aspectRatio?: number;
  defaultImage?: string;
  isLoading?: boolean;
  maxSize?: number;
}

export function ImageUploadField({
  value,
  onChange,
  onBlur,
  className,
  disabled = false,
  error = false,
  aspectRatio = 1,
  defaultImage,
  isLoading = false,
  maxSize = 4 * 1024 * 1024,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle preview URL generation and cleanup
  useEffect(() => {
    if (typeof value === "string") {
      setPreviewUrl(value);
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(defaultImage || null);
    }
  }, [value, defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Add null check before accessing file properties
    if (file && file.size) {
      onChange?.(file);
      onBlur?.();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isLoading) {
    return (
      <Skeleton
        className={cn(
          "rounded-lg border-2 border-dashed border-muted",
          className,
        )}
        style={{ aspectRatio }}
      />
    );
  }

  return (
    <div className={cn("group relative", className)}>
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
        aria-invalid={error}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 transition-all",
          "hover:border-primary/50 cursor-pointer bg-background",
          error
            ? "border-destructive hover:border-destructive"
            : "border-muted",
          disabled && "pointer-events-none opacity-50 cursor-not-allowed",
          previewUrl ? "border-solid" : "border-dashed",
        )}
        style={{ aspectRatio }}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <>
            <Image
              fill
              src={previewUrl}
              alt="Preview"
              className="object-cover transition-opacity group-hover:opacity-50"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {!disabled && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                <UploadCloud className="w-8 h-8 text-white/80" />
              </div>
            )}

            {!disabled && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Remove image");
                  handleRemove(e);
                }}
              >
                <X className="w-4 h-4 text-foreground/70" />
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
            <UploadCloud className="w-8 h-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                {maxSize
                  ? `Max size: ${maxSize / 1024 / 1024} MB`
                  : "Supported formats: JPG, PNG, GIF"}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 text-sm text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="w-4 h-4" />
            Invalid image
          </div>
        )}
      </div>
    </div>
  );
}


code.demo.1748947450680.tsx
"use client"

import {useState } from "react";
import { ImageUploadField } from "@/components/ui/image-uploader.tsx";

const DemoOne = () => {
const [image,setImage]=useState()

  return (
    <ImageUploadField 
        value={image}
        onChange={setImage}
      //  error
       className="w-48"
      />
  )
};
// form component
//  <FormField
//   control={form.control}
//   name="photo"
//   render={({ field }) => (
//   <FormItem>
//   <FormLabel>Profile Picture</FormLabel>
//   <FormControl>
//   <FormControl>
//   <ImageUploadField
//       {...field}
//       error={!!form.formState.errors.photo?.message}
//       className="w-48"
//       />
//   </FormControl>
//   </FormControl>
//   <FormMessage />
//   </FormItem>
//   )}
//   />
export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/image-uploader.tsx
"use client";

import { AlertCircle, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Input } from "./input";
import { Skeleton } from "./skeleton";

interface ImageUploadFieldProps {
  value?: File | string | null;
  onChange?: (value: File | string | null) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  aspectRatio?: number;
  defaultImage?: string;
  isLoading?: boolean;
  maxSize?: number;
}

export function ImageUploadField({
  value,
  onChange,
  onBlur,
  className,
  disabled = false,
  error = false,
  aspectRatio = 1,
  defaultImage,
  isLoading = false,
  maxSize = 4 * 1024 * 1024,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle preview URL generation and cleanup
  useEffect(() => {
    if (typeof value === "string") {
      setPreviewUrl(value);
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(defaultImage || null);
    }
  }, [value, defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Add null check before accessing file properties
    if (file && file.size) {
      onChange?.(file);
      onBlur?.();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (isLoading) {
    return (
      <Skeleton
        className={cn(
          "rounded-lg border-2 border-dashed border-muted",
          className,
        )}
        style={{ aspectRatio }}
      />
    );
  }

  return (
    <div className={cn("group relative", className)}>
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
        aria-invalid={error}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 transition-all",
          "hover:border-primary/50 cursor-pointer bg-background",
          error
            ? "border-destructive hover:border-destructive"
            : "border-muted",
          disabled && "pointer-events-none opacity-50 cursor-not-allowed",
          previewUrl ? "border-solid" : "border-dashed",
        )}
        style={{ aspectRatio }}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <>
            <Image
              fill
              src={previewUrl}
              alt="Preview"
              className="object-cover transition-opacity group-hover:opacity-50"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {!disabled && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                <UploadCloud className="w-8 h-8 text-white/80" />
              </div>
            )}

            {!disabled && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Remove image");
                  handleRemove(e);
                }}
              >
                <X className="w-4 h-4 text-foreground/70" />
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
            <UploadCloud className="w-8 h-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                {maxSize
                  ? `Max size: ${maxSize / 1024 / 1024} MB`
                  : "Supported formats: JPG, PNG, GIF"}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 text-sm text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="w-4 h-4" />
            Invalid image
          </div>
        )}
      </div>
    </div>
  );
}

```

Install NPM dependencies:
```bash
next, lucide-react
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
