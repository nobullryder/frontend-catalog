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
error-alert-dialog.tsx
'use client';

import { XCircle } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Component = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>
                    Error Dialog
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 text-white border-0">
                <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-rose-400" />
                        <AlertDialogTitle className="text-white">Error Detected</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-gray-300">
                        We've encountered an error processing your request. Please try again or contact support if the issue
                        persists.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-gray-800 p-3 rounded-md my-2 text-sm text-gray-300 font-mono">
                    Error Code: 500 - Internal Server Error
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 border-gray-700 hover:bg-gray-800 text-white hover:text-white">Dismiss</AlertDialogCancel>
                    <AlertDialogAction className="bg-rose-500 hover:bg-rose-600 text-white hover:text-white">Contact Support</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

code.demo.1750554517848.tsx
import { Component } from '@/components/ui/error-alert-dialog';

const DemoAlertDialog = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-background">
      <Component />
    </div>
  );
};

export default DemoAlertDialog;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/error-alert-dialog.tsx
'use client';

import { XCircle } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Component = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>
                    Error Dialog
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 text-white border-0">
                <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-rose-400" />
                        <AlertDialogTitle className="text-white">Error Detected</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-gray-300">
                        We've encountered an error processing your request. Please try again or contact support if the issue
                        persists.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-gray-800 p-3 rounded-md my-2 text-sm text-gray-300 font-mono">
                    Error Code: 500 - Internal Server Error
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 border-gray-700 hover:bg-gray-800 text-white hover:text-white">Dismiss</AlertDialogCancel>
                    <AlertDialogAction className="bg-rose-500 hover:bg-rose-600 text-white hover:text-white">Contact Support</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
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
