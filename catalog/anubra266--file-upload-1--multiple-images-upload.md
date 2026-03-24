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

import { FileUpload } from "@ark-ui/react/file-upload";
import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

async function fileFromImageUrl(
  url: string,
  filename = "image.jpg"
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const contentType = blob.type || "image/jpeg";

  return new File([blob], filename, { type: contentType });
}

export default function MultipleImages() {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  useEffect(() => {
    Promise.all(
      Array.from({ length: 4 }).map((_, index) =>
        fileFromImageUrl(
          `https://picsum.photos/1000/800?grayscale&random=${index + 1}`,
          `photo${index + 1}.jpg`
        )
      )
    ).then((files) => {
      setAcceptedFiles(files);
    });
  }, []);

  return (
    <FileUpload.Root
      accept="image/*"
      maxFiles={10}
      className="w-full max-w-4xl"
      acceptedFiles={acceptedFiles}
      onFileChange={(e) => {
        setAcceptedFiles(e.acceptedFiles);
      }}
    >
      <FileUpload.Context>
        {({ acceptedFiles }) => (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-800 min-h-64">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Uploaded Files ({acceptedFiles.length})
              </h3>
              <FileUpload.Trigger className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-hidden focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2">
                <Upload className="w-3 h-3" />
                Add more
              </FileUpload.Trigger>
            </div>

            {/* Images Grid */}
            {acceptedFiles.length > 0 ? (
              <FileUpload.ItemGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {acceptedFiles.map((file) => (
                    <FileUpload.Item
                      key={file.name}
                      file={file}
                      className="relative"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <FileUpload.ItemPreview
                          type="image/*"
                          className="w-full h-full object-cover"
                        >
                          <FileUpload.ItemPreviewImage className="w-full h-full object-cover" />
                        </FileUpload.ItemPreview>

                        {/* Delete Button */}
                        <FileUpload.ItemDeleteTrigger className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 focus:outline-hidden focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                          <X className="w-3 h-3" />
                        </FileUpload.ItemDeleteTrigger>
                      </div>
                    </FileUpload.Item>
                  ))}
                </div>
              </FileUpload.ItemGroup>
            ) : (
              /* Empty State */
              <FileUpload.Dropzone className="flex flex-col items-center justify-center py-8 text-center cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 flex items-center justify-center mb-4">
                  <Upload className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Click to upload or drag and drop images here
                </p>
              </FileUpload.Dropzone>
            )}
          </div>
        )}
      </FileUpload.Context>

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
