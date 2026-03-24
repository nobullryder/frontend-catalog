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
editable-components.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";

export default function Basic() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Editable.Root
        placeholder="Enter some text..."
        defaultValue="Click to edit"
      >
        <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Basic Editable
        </Editable.Label>
        <Editable.Area className="relative">
          <Editable.Input className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10" />
          <Editable.Preview className="w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10" />
        </Editable.Area>
      </Editable.Root>
    </div>
  );
}


code.demo.1756369082387.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";
import { User, Check, X, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ProfileField() {
  const [value, setValue] = useState("johndoe@example.com");
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValueChange = (details: { value: string }) => {
    setValue(details.value);
    setIsValid(validateEmail(details.value));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Update your account information
            </p>
          </div>
        </div>

        <Editable.Root
          placeholder="Enter your email..."
          value={value}
          onValueChange={handleValueChange}
          invalid={!isValid}
        >
          <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </Editable.Label>
          <div className="flex items-center space-x-2">
            <Editable.Area className="flex-1">
              <Editable.Input
                className={`w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 transition-colors min-h-10 ${
                  !isValid
                    ? "border-red-300 dark:border-red-600 focus:ring-red-500 dark:focus:ring-red-400"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                }`}
              />
              <Editable.Preview
                className={`w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10 ${
                  !isValid ? "ring-1 ring-red-200 dark:ring-red-800" : ""
                }`}
              />
            </Editable.Area>
            <Editable.Context>
              {(editable) => (
                <Editable.Control className="flex items-center space-x-1">
                  {editable.editing ? (
                    <>
                      <Editable.SubmitTrigger
                        disabled={!isValid}
                        className={`p-1.5 rounded-md transition-colors ${
                          isValid
                            ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                            : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </Editable.SubmitTrigger>
                      <Editable.CancelTrigger className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                        <X className="h-4 w-4" />
                      </Editable.CancelTrigger>
                    </>
                  ) : null}
                </Editable.Control>
              )}
            </Editable.Context>
          </div>
          {!isValid && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              Please enter a valid email address
            </p>
          )}
        </Editable.Root>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/editable-components.tsx
"use client";

import { Editable } from "@ark-ui/react/editable";

export default function Basic() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Editable.Root
        placeholder="Enter some text..."
        defaultValue="Click to edit"
      >
        <Editable.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Basic Editable
        </Editable.Label>
        <Editable.Area className="relative">
          <Editable.Input className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors min-h-10" />
          <Editable.Preview className="w-full px-3 py-2 text-sm border border-transparent rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 cursor-text transition-colors min-h-10" />
        </Editable.Area>
      </Editable.Root>
    </div>
  );
}

```

Install NPM dependencies:
```bash
@ark-ui/react
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
