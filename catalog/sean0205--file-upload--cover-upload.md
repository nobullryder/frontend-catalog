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
file-upload.tsx
'use client';
 
import type React from 'react';
import { useCallback, useRef, useState, type ChangeEvent, type DragEvent, type InputHTMLAttributes } from 'react';
 
export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};
 
export type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};
 
export type FileUploadOptions = {
  maxFiles?: number; // Only used when multiple is true, defaults to Infinity
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean; // Defaults to false
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void; // Callback when files change
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void; // Callback when new files are added
};
 
export type FileUploadState = {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
};
 
export type FileUploadActions = {
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  getInputProps: (props?: InputHTMLAttributes<HTMLInputElement>) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
};
 
export const useFileUpload = (options: FileUploadOptions = {}): [FileUploadState, FileUploadActions] => {
  const {
    maxFiles = Infinity,
    maxSize = Infinity,
    accept = '*',
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded,
  } = options;
 
  const [state, setState] = useState<FileUploadState>({
    files: initialFiles.map((file) => ({
      file,
      id: file.id,
      preview: file.url,
    })),
    isDragging: false,
    errors: [],
  });
 
  const inputRef = useRef<HTMLInputElement>(null);
 
  const validateFile = useCallback(
    (file: File | FileMetadata): string | null => {
      if (file instanceof File) {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      } else {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      }
 
      if (accept !== '*') {
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        const fileType = file instanceof File ? file.type || '' : file.type;
        const fileExtension = `.${file instanceof File ? file.name.split('.').pop() : file.name.split('.').pop()}`;
 
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith('/*')) {
            const baseType = type.split('/')[0];
            return fileType.startsWith(`${baseType}/`);
          }
          return fileType === type;
        });
 
        if (!isAccepted) {
          return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`;
        }
      }
 
      return null;
    },
    [accept, maxSize],
  );
 
  const createPreview = useCallback((file: File | FileMetadata): string | undefined => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file.url;
  }, []);
 
  const generateUniqueId = useCallback((file: File | FileMetadata): string => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    return file.id;
  }, []);
 
  const clearFiles = useCallback(() => {
    setState((prev) => {
      // Clean up object URLs
      prev.files.forEach((file) => {
        if (file.preview && file.file instanceof File && file.file.type.startsWith('image/')) {
          URL.revokeObjectURL(file.preview);
        }
      });
 
      if (inputRef.current) {
        inputRef.current.value = '';
      }
 
      const newState = {
        ...prev,
        files: [],
        errors: [],
      };
 
      onFilesChange?.(newState.files);
      return newState;
    });
  }, [onFilesChange]);
 
  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) return;
 
      const newFilesArray = Array.from(newFiles);
      const errors: string[] = [];
 
      // Clear existing errors when new files are uploaded
      setState((prev) => ({ ...prev, errors: [] }));
 
      // In single file mode, clear existing files first
      if (!multiple) {
        clearFiles();
      }
 
      // Check if adding these files would exceed maxFiles (only in multiple mode)
      if (multiple && maxFiles !== Infinity && state.files.length + newFilesArray.length > maxFiles) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`);
        setState((prev) => ({ ...prev, errors }));
        return;
      }
 
      const validFiles: FileWithPreview[] = [];
 
      newFilesArray.forEach((file) => {
        // Only check for duplicates if multiple files are allowed
        if (multiple) {
          const isDuplicate = state.files.some(
            (existingFile) => existingFile.file.name === file.name && existingFile.file.size === file.size,
          );
 
          // Skip duplicate files silently
          if (isDuplicate) {
            return;
          }
        }
 
        // Check file size
        if (file.size > maxSize) {
          errors.push(
            multiple
              ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.`
              : `File exceeds the maximum size of ${formatBytes(maxSize)}.`,
          );
          return;
        }
 
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push({
            file,
            id: generateUniqueId(file),
            preview: createPreview(file),
          });
        }
      });
 
      // Only update state if we have valid files to add
      if (validFiles.length > 0) {
        // Call the onFilesAdded callback with the newly added valid files
        onFilesAdded?.(validFiles);
 
        setState((prev) => {
          const newFiles = !multiple ? validFiles : [...prev.files, ...validFiles];
          onFilesChange?.(newFiles);
          return {
            ...prev,
            files: newFiles,
            errors,
          };
        });
      } else if (errors.length > 0) {
        setState((prev) => ({
          ...prev,
          errors,
        }));
      }
 
      // Reset input value after handling files
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [
      state.files,
      maxFiles,
      multiple,
      maxSize,
      validateFile,
      createPreview,
      generateUniqueId,
      clearFiles,
      onFilesChange,
      onFilesAdded,
    ],
  );
 
  const removeFile = useCallback(
    (id: string) => {
      setState((prev) => {
        const fileToRemove = prev.files.find((file) => file.id === id);
        if (
          fileToRemove &&
          fileToRemove.preview &&
          fileToRemove.file instanceof File &&
          fileToRemove.file.type.startsWith('image/')
        ) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
 
        const newFiles = prev.files.filter((file) => file.id !== id);
        onFilesChange?.(newFiles);
 
        return {
          ...prev,
          files: newFiles,
          errors: [],
        };
      });
    },
    [onFilesChange],
  );
 
  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      errors: [],
    }));
  }, []);
 
  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);
 
  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
 
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
 
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);
 
  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
 
  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, isDragging: false }));
 
      // Don't process files if the input is disabled
      if (inputRef.current?.disabled) {
        return;
      }
 
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // In single file mode, only use the first file
        if (!multiple) {
          const file = e.dataTransfer.files[0];
          addFiles([file]);
        } else {
          addFiles(e.dataTransfer.files);
        }
      }
    },
    [addFiles, multiple],
  );
 
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
    },
    [addFiles],
  );
 
  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);
 
  const getInputProps = useCallback(
    (props: InputHTMLAttributes<HTMLInputElement> = {}) => {
      return {
        ...props,
        type: 'file' as const,
        onChange: handleFileChange,
        accept: props.accept || accept,
        multiple: props.multiple !== undefined ? props.multiple : multiple,
        ref: inputRef,
      };
    },
    [accept, multiple, handleFileChange],
  );
 
  return [
    state,
    {
      addFiles,
      removeFile,
      clearFiles,
      clearErrors,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      getInputProps,
    },
  ];
};
 
// Helper function to format bytes to human-readable format
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
 
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
 
  const i = Math.floor(Math.log(bytes) / Math.log(k));
 
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

code.demo.1753472024803.tsx
'use client';

import { useState } from 'react';
import { useFileUpload } from '@/components/ui/file-upload';
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from '@/components/ui/alert-1';
import { Button } from '@/components/ui/button-1';
import { CloudUpload, ImageIcon, TriangleAlert, Upload, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Throttle function
 * @param func - The function to throttle.
 * @param delay - Delay in milliseconds.
 */
export const throttle = (func: Function, delay: number) => {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
};

/**
 * Debounces a function to delay its execution until after a specified delay.
 *
 * @param func - The function to debounce.
 * @param wait - The delay in milliseconds.
 * @returns A debounced version of the provided function.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Generates a unique identifier using the current timestamp and a random number.
 *
 * @returns A string representing the unique ID.
 */
export function uid(): string {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString();
}

/**
 * Extracts initials from a given name.
 *
 * @param name - The full name to extract initials from.
 * @param count - The number of initials to return. Defaults to all initials.
 * @returns A string of initials from the name.
 */
export const getInitials = (name: string | null | undefined, count?: number): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase());

  return count && count > 0 ? initials.slice(0, count).join('') : initials.join('');
};

/**
 * Formats a date as a readable string in "Month Day, Year" format.
 *
 * @param input - A date string or timestamp to format.
 * @returns A string formatted as "Month Day, Year".
 */
export function formatDate(input: Date | string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Formats a date and time as a readable string in "Month Day, Year, Hour:Minute AM/PM" format.
 *
 * @param input - A date string or timestamp to format.
 * @returns A string formatted as "Month Day, Year, Hour:Minute AM/PM".
 */
export function formatDateTime(input: Date | string | number): string {
  const date = new Date(input);
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

/**
 * Formats a number as a currency string.
 *
 * @param amount - The numeric value to format as currency.
 * @param currency - The currency code (e.g., "USD", "EUR"). Defaults to "USD".
 * @param locale - The locale for formatting (e.g., "en-US"). Defaults to "en-US".
 * @returns A string formatted as currency.
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Constructs an absolute URL based on the base application URL.
 *
 * @param path - The relative path to append to the base URL.
 * @returns A string representing the absolute URL.
 */
export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

/**
 * Constructs an absolute URL for media assets.
 *
 * @param path - The relative path to the media asset (e.g., "/media/avatars/1.png").
 * @returns A string representing the absolute URL to the media asset.
 */
export function toAbsoluteUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${cleanPath}`;
}

/**
	Retrieves a list of supported time zones with their labels and values.
	This function fetches the available time zones from the environment,
	formats their offsets (e.g., "GMT+2"), and returns them in a sorted array.
*/
export const getTimeZones = (): { label: string; value: string }[] => {
  // Fetch supported timezones
  const timezones = Intl.supportedValuesOf('timeZone');

  return timezones
    .map((timezone) => {
      const formatter = new Intl.DateTimeFormat('en', {
        timeZone: timezone,
        timeZoneName: 'shortOffset',
      });
      const parts = formatter.formatToParts(new Date());
      const offset = parts.find((part) => part.type === 'timeZoneName')?.value || '';
      const formattedOffset = offset === 'GMT' ? 'GMT+0' : offset;

      return {
        value: timezone,
        label: `(${formattedOffset}) ${timezone.replace(/_/g, ' ')}`,
        numericOffset: parseInt(formattedOffset.replace('GMT', '').replace('+', '') || '0'),
      };
    })
    .sort((a, b) => a.numericOffset - b.numericOffset);
};

/**
 * Generates a URL-friendly slug from a given title.
 * @param title - The title to convert into a slug (e.g., "Write a Proposal")
 * @returns A slug string (e.g., "write-a-proposal")
 */
export function getSlug(title: string): string {
  // Return empty string for invalid input
  if (!title || typeof title !== 'string') {
    return '';
  }

  return title
    .toLowerCase() // Convert to lowercase for consistency
    .trim() // Remove leading/trailing whitespace
    .normalize('NFD') // Normalize unicode (e.g., "é" -> "e")
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces/hyphens
    .replaceAll(/\s+/g, '-') // Replace spaces with single hyphen
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

function formatBytes(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) return false;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopied(false);
      return false;
    }
  };

  return { copy, copied };
}

interface CoverUploadProps {
  maxSize?: number;
  accept?: string;
  className?: string;
  onImageChange?: (file: File | null) => void;
}

export default function CoverUpload({
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = 'image/*',
  className,
  onImageChange,
}: CoverUploadProps) {
  // Default cover image
  const defaultCoverImage: FileMetadata = {
    id: 'default-cover',
    name: 'cover-image.jpg',
    size: 2048000,
    type: 'image/jpeg',
    url: 'https://picsum.photos/1000/800?grayscale&random=3',
  };

  const [coverImage, setCoverImage] = useState<FileWithPreview | null>({
    id: defaultCoverImage.id,
    file: defaultCoverImage,
    preview: defaultCoverImage.url,
  });

  const [imageLoading, setImageLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [
    { isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept,
    multiple: false,
    onFilesChange: (files) => {
      if (files.length > 0) {
        setImageLoading(true);
        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        setCoverImage(files[0]);
        onImageChange?.(files[0].file as File);

        // Simulate upload progress
        simulateUpload();
      }
    },
  });

  // Simulate upload progress
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Simulate occasional upload failure (10% chance)
          if (Math.random() < 0.1) {
            setUploadError('Upload failed. Please try again.');
            return 0;
          }

          return 100;
        }

        // Random progress increment between 5-15%
        const increment = Math.random() * 10 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setImageLoading(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
    onImageChange?.(null);
  };

  const retryUpload = () => {
    if (coverImage) {
      setUploadError(null);
      setIsUploading(true);
      setUploadProgress(0);
      simulateUpload();
    }
  };

  const hasImage = coverImage && coverImage.preview;

  return (
    <div className="flex flex-col gap-5 p-10 w-full mx-auto h-screen justify-center items-center">
      <div className={cn('w-full space-y-4', className)}>
        {/* Cover Upload Area */}
        <div
          className={cn(
            'group relative overflow-hidden rounded-xl transition-all duration-200 border border-border',
            isDragging
              ? 'border-dashed border-primary bg-primary/5'
              : hasImage
                ? 'border-border bg-background hover:border-primary/50'
                : 'border-dashed border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5',
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Hidden file input */}
          <input {...getInputProps()} className="sr-only" />

          {hasImage ? (
            <>
              {/* Cover Image Display */}
              <div className="relative aspect-[21/9] w-full">
                {/* Loading placeholder */}
                {imageLoading && (
                  <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="size-5" />
                      <span className="text-sm">Loading image...</span>
                    </div>
                  </div>
                )}

                {/* Actual image */}
                <img
                  src={coverImage.preview}
                  alt="Cover"
                  className={cn(
                    'h-full w-full object-cover transition-opacity duration-300',
                    imageLoading ? 'opacity-0' : 'opacity-100',
                  )}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

                {/* Action buttons overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      onClick={openFileDialog}
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-gray-900 hover:bg-white"
                    >
                      <Upload />
                      Change Cover
                    </Button>
                    <Button onClick={removeCoverImage} variant="destructive" size="sm">
                      <XIcon />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Upload progress */}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="relative">
                      <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-white/20"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`}
                          className="text-white transition-all duration-300"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{Math.round(uploadProgress)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty State */
            <div
              className="flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center"
              onClick={openFileDialog}
            >
              <div className="rounded-full bg-primary/10 p-4">
                <CloudUpload className="size-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Upload Cover Image</h3>
                <p className="text-sm text-muted-foreground">Drag and drop an image here, or click to browse</p>
                <p className="text-xs text-muted-foreground">Recommended size: 1200x514px • Max size: 5MB</p>
              </div>

              <Button variant="outline" size="sm">
                <ImageIcon />
                Browse Files
              </Button>
            </div>
          )}
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <Alert variant="destructive" appearance="light" className="mt-5">
            <AlertIcon>
              <TriangleAlert />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>File upload error(s)</AlertTitle>
              <AlertDescription>
                {errors.map((error, index) => (
                  <p key={index} className="last:mb-0">
                    {error}
                  </p>
                ))}
              </AlertDescription>
            </AlertContent>
          </Alert>
        )}

        {/* Upload Error */}
        {uploadError && (
          <Alert variant="destructive" appearance="light" className="mt-5">
            <AlertIcon>
              <TriangleAlert />
            </AlertIcon>
            <AlertContent>
              <AlertTitle>Upload failed</AlertTitle>
              <AlertDescription>
                <p>{uploadError}</p>
                <Button onClick={retryUpload} variant="primary" size="sm">
                  Retry Upload
                </Button>
              </AlertDescription>
            </AlertContent>
          </Alert>
        )}

        {/* Upload Tips */}
        <div className="rounded-lg bg-muted/50 p-4">
          <h4 className="mb-2 text-sm font-medium">Cover Image Guidelines</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Use high-quality images with good lighting and composition</li>
            <li>• Recommended aspect ratio: 21:9 (ultrawide) for best results</li>
            <li>• Avoid images with important content near the edges</li>
            <li>• Supported formats: JPG, PNG, WebP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/file-upload.tsx
'use client';
 
import type React from 'react';
import { useCallback, useRef, useState, type ChangeEvent, type DragEvent, type InputHTMLAttributes } from 'react';
 
export type FileMetadata = {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
};
 
export type FileWithPreview = {
  file: File | FileMetadata;
  id: string;
  preview?: string;
};
 
export type FileUploadOptions = {
  maxFiles?: number; // Only used when multiple is true, defaults to Infinity
  maxSize?: number; // in bytes
  accept?: string;
  multiple?: boolean; // Defaults to false
  initialFiles?: FileMetadata[];
  onFilesChange?: (files: FileWithPreview[]) => void; // Callback when files change
  onFilesAdded?: (addedFiles: FileWithPreview[]) => void; // Callback when new files are added
};
 
export type FileUploadState = {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
};
 
export type FileUploadActions = {
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  getInputProps: (props?: InputHTMLAttributes<HTMLInputElement>) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
};
 
export const useFileUpload = (options: FileUploadOptions = {}): [FileUploadState, FileUploadActions] => {
  const {
    maxFiles = Infinity,
    maxSize = Infinity,
    accept = '*',
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded,
  } = options;
 
  const [state, setState] = useState<FileUploadState>({
    files: initialFiles.map((file) => ({
      file,
      id: file.id,
      preview: file.url,
    })),
    isDragging: false,
    errors: [],
  });
 
  const inputRef = useRef<HTMLInputElement>(null);
 
  const validateFile = useCallback(
    (file: File | FileMetadata): string | null => {
      if (file instanceof File) {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      } else {
        if (file.size > maxSize) {
          return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`;
        }
      }
 
      if (accept !== '*') {
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        const fileType = file instanceof File ? file.type || '' : file.type;
        const fileExtension = `.${file instanceof File ? file.name.split('.').pop() : file.name.split('.').pop()}`;
 
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension.toLowerCase() === type.toLowerCase();
          }
          if (type.endsWith('/*')) {
            const baseType = type.split('/')[0];
            return fileType.startsWith(`${baseType}/`);
          }
          return fileType === type;
        });
 
        if (!isAccepted) {
          return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`;
        }
      }
 
      return null;
    },
    [accept, maxSize],
  );
 
  const createPreview = useCallback((file: File | FileMetadata): string | undefined => {
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file.url;
  }, []);
 
  const generateUniqueId = useCallback((file: File | FileMetadata): string => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
    return file.id;
  }, []);
 
  const clearFiles = useCallback(() => {
    setState((prev) => {
      // Clean up object URLs
      prev.files.forEach((file) => {
        if (file.preview && file.file instanceof File && file.file.type.startsWith('image/')) {
          URL.revokeObjectURL(file.preview);
        }
      });
 
      if (inputRef.current) {
        inputRef.current.value = '';
      }
 
      const newState = {
        ...prev,
        files: [],
        errors: [],
      };
 
      onFilesChange?.(newState.files);
      return newState;
    });
  }, [onFilesChange]);
 
  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) return;
 
      const newFilesArray = Array.from(newFiles);
      const errors: string[] = [];
 
      // Clear existing errors when new files are uploaded
      setState((prev) => ({ ...prev, errors: [] }));
 
      // In single file mode, clear existing files first
      if (!multiple) {
        clearFiles();
      }
 
      // Check if adding these files would exceed maxFiles (only in multiple mode)
      if (multiple && maxFiles !== Infinity && state.files.length + newFilesArray.length > maxFiles) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`);
        setState((prev) => ({ ...prev, errors }));
        return;
      }
 
      const validFiles: FileWithPreview[] = [];
 
      newFilesArray.forEach((file) => {
        // Only check for duplicates if multiple files are allowed
        if (multiple) {
          const isDuplicate = state.files.some(
            (existingFile) => existingFile.file.name === file.name && existingFile.file.size === file.size,
          );
 
          // Skip duplicate files silently
          if (isDuplicate) {
            return;
          }
        }
 
        // Check file size
        if (file.size > maxSize) {
          errors.push(
            multiple
              ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.`
              : `File exceeds the maximum size of ${formatBytes(maxSize)}.`,
          );
          return;
        }
 
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push({
            file,
            id: generateUniqueId(file),
            preview: createPreview(file),
          });
        }
      });
 
      // Only update state if we have valid files to add
      if (validFiles.length > 0) {
        // Call the onFilesAdded callback with the newly added valid files
        onFilesAdded?.(validFiles);
 
        setState((prev) => {
          const newFiles = !multiple ? validFiles : [...prev.files, ...validFiles];
          onFilesChange?.(newFiles);
          return {
            ...prev,
            files: newFiles,
            errors,
          };
        });
      } else if (errors.length > 0) {
        setState((prev) => ({
          ...prev,
          errors,
        }));
      }
 
      // Reset input value after handling files
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [
      state.files,
      maxFiles,
      multiple,
      maxSize,
      validateFile,
      createPreview,
      generateUniqueId,
      clearFiles,
      onFilesChange,
      onFilesAdded,
    ],
  );
 
  const removeFile = useCallback(
    (id: string) => {
      setState((prev) => {
        const fileToRemove = prev.files.find((file) => file.id === id);
        if (
          fileToRemove &&
          fileToRemove.preview &&
          fileToRemove.file instanceof File &&
          fileToRemove.file.type.startsWith('image/')
        ) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
 
        const newFiles = prev.files.filter((file) => file.id !== id);
        onFilesChange?.(newFiles);
 
        return {
          ...prev,
          files: newFiles,
          errors: [],
        };
      });
    },
    [onFilesChange],
  );
 
  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      errors: [],
    }));
  }, []);
 
  const handleDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);
 
  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
 
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
 
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);
 
  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
 
  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, isDragging: false }));
 
      // Don't process files if the input is disabled
      if (inputRef.current?.disabled) {
        return;
      }
 
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // In single file mode, only use the first file
        if (!multiple) {
          const file = e.dataTransfer.files[0];
          addFiles([file]);
        } else {
          addFiles(e.dataTransfer.files);
        }
      }
    },
    [addFiles, multiple],
  );
 
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
    },
    [addFiles],
  );
 
  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);
 
  const getInputProps = useCallback(
    (props: InputHTMLAttributes<HTMLInputElement> = {}) => {
      return {
        ...props,
        type: 'file' as const,
        onChange: handleFileChange,
        accept: props.accept || accept,
        multiple: props.multiple !== undefined ? props.multiple : multiple,
        ref: inputRef,
      };
    },
    [accept, multiple, handleFileChange],
  );
 
  return [
    state,
    {
      addFiles,
      removeFile,
      clearFiles,
      clearErrors,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      getInputProps,
    },
  ];
};
 
// Helper function to format bytes to human-readable format
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
 
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
 
  const i = Math.floor(Math.log(bytes) / Math.log(k));
 
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};
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
