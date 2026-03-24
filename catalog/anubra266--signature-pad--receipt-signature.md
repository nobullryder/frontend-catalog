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
signature-pad.tsx
"use client";

import { SignaturePad } from "@ark-ui/react/signature-pad";

export default function BasicSignaturePad() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-md w-full">
        <SignaturePad.Root>
          <SignaturePad.Label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Sign below
          </SignaturePad.Label>
          <SignaturePad.Control className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <SignaturePad.Segment className="w-full h-full stroke-gray-900 dark:stroke-gray-100 fill-gray-900 dark:fill-gray-100" />
            <SignaturePad.ClearTrigger className="absolute top-2 right-2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              Clear
            </SignaturePad.ClearTrigger>
            <SignaturePad.Guide className="absolute bottom-4 left-2 right-2 border-b border-dashed border-gray-400 dark:border-gray-500" />
          </SignaturePad.Control>
        </SignaturePad.Root>
      </div>
    </div>
  );
}


code.demo.1756191359488.tsx
"use client";

import { SignaturePad } from "@ark-ui/react/signature-pad";
import { useState } from "react";
import { Receipt, CreditCard, User } from "lucide-react";

export default function ReceiptSignature() {
  const [hasSignature, setHasSignature] = useState(false);

  const handleDrawEnd = () => {
    setHasSignature(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-sm w-full">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          {/* Receipt Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  Store Receipt
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                #12345
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Receipt Items */}
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Coffee</span>
              <span className="text-gray-900 dark:text-gray-100">$4.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Sandwich</span>
              <span className="text-gray-900 dark:text-gray-100">$8.75</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="text-gray-900 dark:text-gray-100">$1.06</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-semibold">
              <span className="text-gray-900 dark:text-gray-100">Total</span>
              <span className="text-gray-900 dark:text-gray-100">$14.31</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Payment: Visa ending in 1234
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Cashier: John Smith
              </span>
            </div>
          </div>

          {/* Signature Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
            <div className="text-center">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Customer Signature
              </span>
            </div>

            <SignaturePad.Root onDrawEnd={handleDrawEnd}>
              <SignaturePad.Control className="relative w-full h-24 bg-gray-50 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                <SignaturePad.Segment className="w-full h-full stroke-gray-900 dark:stroke-gray-100 fill-gray-900 dark:fill-gray-100" />
                <SignaturePad.ClearTrigger className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs">
                  Clear
                </SignaturePad.ClearTrigger>
                <SignaturePad.Guide className="absolute bottom-3 left-2 right-2 border-b border-dashed border-gray-400 dark:border-gray-500" />
              </SignaturePad.Control>
            </SignaturePad.Root>

            <div className="text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {hasSignature ? "✓ Signed" : "Please sign above"}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Thank you for your purchase!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Keep this receipt for your records
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/signature-pad.tsx
"use client";

import { SignaturePad } from "@ark-ui/react/signature-pad";

export default function BasicSignaturePad() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full px-4 py-12 rounded-xl flex items-center justify-center">
      <div className="max-w-md w-full">
        <SignaturePad.Root>
          <SignaturePad.Label className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Sign below
          </SignaturePad.Label>
          <SignaturePad.Control className="relative w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <SignaturePad.Segment className="w-full h-full stroke-gray-900 dark:stroke-gray-100 fill-gray-900 dark:fill-gray-100" />
            <SignaturePad.ClearTrigger className="absolute top-2 right-2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              Clear
            </SignaturePad.ClearTrigger>
            <SignaturePad.Guide className="absolute bottom-4 left-2 right-2 border-b border-dashed border-gray-400 dark:border-gray-500" />
          </SignaturePad.Control>
        </SignaturePad.Root>
      </div>
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
