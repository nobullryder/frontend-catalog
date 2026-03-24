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
file-upload-1.tsx
"use client";

import { FileUpload } from "@ark-ui/react/file-upload";
import { User } from "lucide-react";

export default function Basic() {
  return (
    <FileUpload.Root
      maxFiles={1}
      accept="image/*"
      className="flex flex-col items-start gap-3"
    >
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <>
            <div className="flex items-center gap-3">
              {/* Image Preview / Placeholder */}
              <div className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                {acceptedFiles.length > 0 ? (
                  <FileUpload.ItemGroup>
                    <FileUpload.Item file={acceptedFiles[0]}>
                      <FileUpload.ItemPreview type="image/*">
                        <FileUpload.ItemPreviewImage className="w-full h-full object-cover" />
                      </FileUpload.ItemPreview>
                    </FileUpload.Item>
                  </FileUpload.ItemGroup>
                ) : (
                  <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                )}
              </div>

              {/* Upload/Change Button */}
              <FileUpload.Trigger className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2">
                {acceptedFiles.length > 0 ? "Change image" : "Upload image"}
              </FileUpload.Trigger>
            </div>

            {/* Filename and Remove */}
            {acceptedFiles.length > 0 && (
              <FileUpload.ItemGroup>
                <FileUpload.Item
                  file={acceptedFiles[0]}
                  className="flex items-center gap-2"
                >
                  <FileUpload.ItemName className="text-sm text-gray-600 dark:text-gray-400" />
                  <FileUpload.ItemDeleteTrigger className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                    Remove
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              </FileUpload.ItemGroup>
            )}
          </>
        )}
      </FileUpload.Context>

      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
}


code.demo.1756339006638.tsx
"use client";

import {
  FileUpload,
  type FileUploadFileError,
} from "@ark-ui/react/file-upload";
import { DownloadTrigger } from "@ark-ui/react/download-trigger";

import {
  FileText,
  Upload,
  Download,
  Trash2,
  File as FileIcon,
  FileArchive,
  FileSpreadsheet,
  Video,
  Headphones,
  Image,
} from "lucide-react";

const errorMessages: Record<FileUploadFileError, string> = {
  TOO_MANY_FILES: "📊 Too many files selected (max 3 allowed)",
  FILE_INVALID_TYPE: "🚫 Invalid file type (only images and PDFs allowed)",
  FILE_TOO_LARGE: "📏 File too large (max 1MB)",
  FILE_TOO_SMALL: "📐 File too small (min 1KB)",
  FILE_INVALID: "⚠️ Invalid file",
  FILE_EXISTS: "🔄 File already exists",
};

const getFileExtension = (filename: string) => {
  const ext = filename.split(".").pop()?.toUpperCase();
  return ext || "FILE";
};

const getFileIcon = (file: File) => {
  const fileType = file.type;
  const fileName = file.name;

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileText className="w-4 h-4 opacity-60" />;
  } else if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <FileArchive className="w-4 h-4 opacity-60" />;
  } else if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <FileSpreadsheet className="w-4 h-4 opacity-60" />;
  } else if (fileType.includes("video/")) {
    return <Video className="w-4 h-4 opacity-60" />;
  } else if (fileType.includes("audio/")) {
    return <Headphones className="w-4 h-4 opacity-60" />;
  } else if (fileType.startsWith("image/")) {
    return <Image className="w-4 h-4 opacity-60" />;
  }
  return <FileIcon className="w-4 h-4 opacity-60" />;
};

export default function FilesTable() {
  return (
    <FileUpload.Root
      maxFiles={10}
      // maxFileSize={100 * 1024 * 1024}
      className="w-full max-w-4xl"
      defaultAcceptedFiles={[
        new File(["Welcome to Ark UI React`"], "document.pdf", {
          type: "text/plain",
        }),
        new File(
          ["Welcome to Ark UI React, this is a zip file`"],
          "showcase.zip",
          {
            type: "application/zip",
          }
        ),
        new File(
          ["Welcome to Ark UI React, this is an excel file`"],
          "data.xlsx",
          {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          }
        ),

        new File(
          ["Welcome to Ark UI React, this is an audio file`"],
          "audio.mp3",
          {
            type: "audio/mpeg",
          }
        ),
        new File(
          ["Welcome to Ark UI React, this is a video file`"],
          "documentary.mp4",
          {
            type: "video/mp4",
          }
        ),
      ]}
    >
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Files ({acceptedFiles.length})
              </h3>
              <div className="flex items-center gap-2">
                <FileUpload.Trigger className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2">
                  <Upload className="w-3 h-3" />
                  Add files
                </FileUpload.Trigger>
                {acceptedFiles.length > 0 && (
                  <FileUpload.ClearTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-hidden focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2">
                    <Trash2 className="w-3 h-3" />
                    Remove all
                  </FileUpload.ClearTrigger>
                )}
              </div>
            </div>

            {/* Table */}
            {acceptedFiles.length > 0 ? (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="col-span-5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Name
                  </div>
                  <div className="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Type
                  </div>
                  <div className="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Size
                  </div>
                  <div className="col-span-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Actions
                  </div>
                </div>

                {/* Table Body */}
                <FileUpload.ItemGroup>
                  {acceptedFiles.map((file, index) => (
                    <FileUpload.Item key={file.name} file={file}>
                      <div
                        className={`grid grid-cols-12 gap-3 px-4 py-3 ${
                          index !== acceptedFiles.length - 1
                            ? "border-b border-gray-200 dark:border-gray-700"
                            : ""
                        }`}
                      >
                        {/* Name */}
                        <div className="col-span-5 flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 flex items-center justify-center shrink-0">
                            {file.type.startsWith("image/") ? (
                              <FileUpload.ItemPreview type="image/*">
                                <FileUpload.ItemPreviewImage className="w-4 h-4 object-cover rounded" />
                              </FileUpload.ItemPreview>
                            ) : (
                              getFileIcon(file)
                            )}
                          </div>
                          <FileUpload.ItemName className="text-sm text-gray-900 dark:text-gray-100 truncate" />
                        </div>

                        {/* Type */}
                        <div className="col-span-2 flex items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {getFileExtension(file.name)}
                          </span>
                        </div>

                        {/* Size */}
                        <div className="col-span-2 flex items-center">
                          <FileUpload.ItemSizeText className="text-sm text-gray-600 dark:text-gray-400" />
                        </div>

                        {/* Actions */}
                        <div className="col-span-3 flex items-center gap-2">
                          <DownloadTrigger
                            data={file}
                            fileName={file.name}
                            mimeType={file.type}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Download className="w-4 h-4" />
                          </DownloadTrigger>
                          <FileUpload.ItemDeleteTrigger className="w-6 h-6 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                            <Trash2 className="w-4 h-4" />
                          </FileUpload.ItemDeleteTrigger>
                        </div>
                      </div>
                    </FileUpload.Item>
                  ))}
                </FileUpload.ItemGroup>
              </div>
            ) : (
              /* Empty State */
              <FileUpload.Dropzone className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center py-12 px-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 flex items-center justify-center mb-3">
                  <FileText className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Drag & drop files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Max 10 files • Up to 100MB each
                  </p>
                </div>
              </FileUpload.Dropzone>
            )}
          </div>
        )}
      </FileUpload.Context>

      {/* Rejected Files Section */}
      <div data-status="rejected">
        <h3>❌ Rejected Files</h3>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ rejectedFiles }) =>
              rejectedFiles.length === 0 ? (
                <div>No rejected files</div>
              ) : (
                rejectedFiles.map((fileRejection) => (
                  <FileUpload.Item
                    key={fileRejection.file.name}
                    file={fileRejection.file}
                    className="file-item"
                    data-status="rejected"
                  >
                    <FileUpload.ItemName />
                    <FileUpload.ItemSizeText />
                    <div>
                      <strong>Validation Errors:</strong>
                      {fileRejection.errors.map((error, index) => (
                        <div key={index} data-error-code={error}>
                          {errorMessages[error as FileUploadFileError] ||
                            `❓ ${error}`}
                        </div>
                      ))}
                    </div>
                  </FileUpload.Item>
                ))
              )
            }
          </FileUpload.Context>
        </FileUpload.ItemGroup>
      </div>

      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/file-upload-1.tsx
"use client";

import { FileUpload } from "@ark-ui/react/file-upload";
import { User } from "lucide-react";

export default function Basic() {
  return (
    <FileUpload.Root
      maxFiles={1}
      accept="image/*"
      className="flex flex-col items-start gap-3"
    >
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <>
            <div className="flex items-center gap-3">
              {/* Image Preview / Placeholder */}
              <div className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                {acceptedFiles.length > 0 ? (
                  <FileUpload.ItemGroup>
                    <FileUpload.Item file={acceptedFiles[0]}>
                      <FileUpload.ItemPreview type="image/*">
                        <FileUpload.ItemPreviewImage className="w-full h-full object-cover" />
                      </FileUpload.ItemPreview>
                    </FileUpload.Item>
                  </FileUpload.ItemGroup>
                ) : (
                  <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                )}
              </div>

              {/* Upload/Change Button */}
              <FileUpload.Trigger className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2">
                {acceptedFiles.length > 0 ? "Change image" : "Upload image"}
              </FileUpload.Trigger>
            </div>

            {/* Filename and Remove */}
            {acceptedFiles.length > 0 && (
              <FileUpload.ItemGroup>
                <FileUpload.Item
                  file={acceptedFiles[0]}
                  className="flex items-center gap-2"
                >
                  <FileUpload.ItemName className="text-sm text-gray-600 dark:text-gray-400" />
                  <FileUpload.ItemDeleteTrigger className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                    Remove
                  </FileUpload.ItemDeleteTrigger>
                </FileUpload.Item>
              </FileUpload.ItemGroup>
            )}
          </>
        )}
      </FileUpload.Context>

      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react, lucide-react
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
