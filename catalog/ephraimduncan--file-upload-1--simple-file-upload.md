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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, Upload, X } from "lucide-react";

export default function FileUpload05() {
  return (
    <div className="sm:mx-auto sm:max-w-lg flex items-center justify-center p-10 w-full max-w-lg">
      <form>
        <h3 className="text-lg font-semibold text-foreground">File Upload</h3>
        <div className="mt-4 flex justify-center space-x-4 rounded-md border border-dashed border-input px-6 py-10">
          <div className="sm:flex sm:items-center sm:gap-x-3">
            <Upload
              className="mx-auto h-8 w-8 text-muted-foreground sm:mx-0 sm:h-6 sm:w-6"
              aria-hidden={true}
            />
            <div className="mt-4 flex text-sm leading-6 text-foreground sm:mt-0">

              <Label
                htmlFor="file-upload-4"
                className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
              >
                <span> Drag and drop or choose file to upload </span>
                <input
                  id="file-upload-4"
                  name="file-upload-4"
                  type="file"
                  className="sr-only"
                />
              </Label>
            </div>
          </div>
        </div>
        <p className="mt-2 flex items-center justify-between text-xs leading-5 text-muted-foreground">
          Recommended max. size: 10 MB, Accepted file types: XLSX, XLS, CSV.
        </p>
        <div className="relative mt-8 rounded-lg bg-muted p-3">
          <div className="absolute right-1 top-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-sm p-2 text-muted-foreground hover:text-foreground"
              aria-label="Remove"
            >
              <X className="size-4 shrink-0" aria-hidden={true} />
            </Button>
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-input">
              <FileSpreadsheet
                className="size-5 text-foreground"
                aria-hidden={true}
              />
            </span>
            <div className="w-full">
              <p className="text-xs font-medium text-foreground">
                Revenue_Q1_2024.xlsx
              </p>
              <p className="mt-0.5 flex justify-between text-xs text-muted-foreground">
                <span>3.1 MB</span>
                <span>Completed</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap rounded-sm border border-input px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            className="whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}


code.demo.1753209223376.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FileUpload02() {
  return (
    <div className="flex items-center justify-center p-10">
      <Card>
        <CardHeader>
          <CardTitle>Set up your first workspace</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="#" method="POST">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">
                  Workspace <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="workspace-name"
                  name="workspace-name"
                  autoComplete="workspace-name"
                  placeholder="Workspace name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file-1">
                  Upload file <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="file-1"
                  name="file-1"
                  type="file"
                  accept=".csv, .xlsx, .xls"
                />
                <p className="text-sm text-muted-foreground">
                  You are only allowed to upload CSV, XLSX or XLS files.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-8">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/file-upload-1.tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, Upload, X } from "lucide-react";

export default function FileUpload05() {
  return (
    <div className="sm:mx-auto sm:max-w-lg flex items-center justify-center p-10 w-full max-w-lg">
      <form>
        <h3 className="text-lg font-semibold text-foreground">File Upload</h3>
        <div className="mt-4 flex justify-center space-x-4 rounded-md border border-dashed border-input px-6 py-10">
          <div className="sm:flex sm:items-center sm:gap-x-3">
            <Upload
              className="mx-auto h-8 w-8 text-muted-foreground sm:mx-0 sm:h-6 sm:w-6"
              aria-hidden={true}
            />
            <div className="mt-4 flex text-sm leading-6 text-foreground sm:mt-0">

              <Label
                htmlFor="file-upload-4"
                className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
              >
                <span> Drag and drop or choose file to upload </span>
                <input
                  id="file-upload-4"
                  name="file-upload-4"
                  type="file"
                  className="sr-only"
                />
              </Label>
            </div>
          </div>
        </div>
        <p className="mt-2 flex items-center justify-between text-xs leading-5 text-muted-foreground">
          Recommended max. size: 10 MB, Accepted file types: XLSX, XLS, CSV.
        </p>
        <div className="relative mt-8 rounded-lg bg-muted p-3">
          <div className="absolute right-1 top-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-sm p-2 text-muted-foreground hover:text-foreground"
              aria-label="Remove"
            >
              <X className="size-4 shrink-0" aria-hidden={true} />
            </Button>
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-input">
              <FileSpreadsheet
                className="size-5 text-foreground"
                aria-hidden={true}
              />
            </span>
            <div className="w-full">
              <p className="text-xs font-medium text-foreground">
                Revenue_Q1_2024.xlsx
              </p>
              <p className="mt-0.5 flex justify-between text-xs text-muted-foreground">
                <span>3.1 MB</span>
                <span>Completed</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap rounded-sm border border-input px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            className="whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Upload
          </Button>
        </div>
      </form>
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
