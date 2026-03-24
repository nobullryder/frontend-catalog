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


code.demo.1756339006637.tsx
import Basic from "@/components/ui/file-upload-1";

export default function DemoOne() {
  return <Basic />;
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
