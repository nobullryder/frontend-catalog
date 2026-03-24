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
dialog-2.tsx
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";

export default function AlertDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer inline-flex items-center justify-center">
          Alert dialog
        </button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className="data-[state=open]:animate-backdrop-in data-[state=closed]:animate-backdrop-out fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Content className="data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Are you sure?
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400">
                  Take a moment to review the details provided to ensure you
                  understand the implications.
                </Dialog.Description>
              </div>
              <div className="flex gap-3 justify-end">
                <Dialog.CloseTrigger asChild>
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center">
                    Cancel
                  </button>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild>
                  <button className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center">
                    Okay
                  </button>
                </Dialog.CloseTrigger>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}


code.demo.1756375737178.tsx
"use client";

import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import { useState, useRef } from "react";

export default function TermsDialog() {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer inline-flex items-center justify-center">
          Terms & Conditions
        </button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className="data-[state=open]:animate-backdrop-in data-[state=closed]:animate-backdrop-out fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Content className="data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out relative w-full max-w-lg h-[70vh] rounded-lg bg-white dark:bg-gray-900 shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                Terms & Conditions
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <button className="p-1 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.CloseTrigger>
            </div>

            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Acceptance of Terms
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  By accessing and using this website, users agree to comply
                  with and be bound by these Terms of Service. Users who do not
                  agree with these terms should discontinue use of the website
                  immediately.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  User Account Responsibilities
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Users are responsible for maintaining the confidentiality of
                  their account credentials. Any activities occurring under a
                  user's account are the sole responsibility of the account
                  holder. Users must notify the website administrators
                  immediately of any unauthorized account access.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Content Usage and Restrictions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  The website and its original content are protected by
                  intellectual property laws. Users may not reproduce,
                  distribute, modify, create derivative works, or commercially
                  exploit any content without explicit written permission from
                  the website owners.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Limitation of Liability
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  The website provides content "as is" without any warranties.
                  The website owners shall not be liable for direct, indirect,
                  incidental, consequential, or punitive damages arising from
                  user interactions with the platform.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  User Conduct Guidelines
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                  Users must adhere to the following guidelines when using our
                  platform:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                  <li>Not upload harmful or malicious content</li>
                  <li>Respect intellectual property rights</li>
                  <li>Maintain respectful communication</li>
                  <li>Report any suspicious activities</li>
                  <li>Follow all applicable local and international laws</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy and Data Protection
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  We are committed to protecting your privacy and personal data.
                  All user information is handled according to our Privacy
                  Policy and applicable data protection regulations. We do not
                  sell or share personal information with third parties without
                  explicit consent.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Termination of Service
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  We reserve the right to terminate or suspend user accounts and
                  access to our services at any time, without prior notice, for
                  conduct that violates these Terms of Service or is harmful to
                  other users or our business interests.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  Changes to Terms
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  These Terms of Service may be updated from time to time. Users
                  will be notified of significant changes, and continued use of
                  the website after such changes constitutes acceptance of the
                  modified terms.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
              {!hasReadToBottom ? (
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Read all terms before accepting.
                </p>
              ) : (
                <div />
              )}

              <div className="flex gap-3">
                <Dialog.CloseTrigger asChild>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center">
                    Cancel
                  </button>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild>
                  <button
                    disabled={!hasReadToBottom}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center ${
                      hasReadToBottom
                        ? "bg-gray-900 dark:bg-gray-600 text-white hover:bg-gray-800 dark:hover:bg-gray-500"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    I agree
                  </button>
                </Dialog.CloseTrigger>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/dialog-2.tsx
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";

export default function AlertDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer inline-flex items-center justify-center">
          Alert dialog
        </button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className="data-[state=open]:animate-backdrop-in data-[state=closed]:animate-backdrop-out fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Content className="data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Are you sure?
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400">
                  Take a moment to review the details provided to ensure you
                  understand the implications.
                </Dialog.Description>
              </div>
              <div className="flex gap-3 justify-end">
                <Dialog.CloseTrigger asChild>
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center">
                    Cancel
                  </button>
                </Dialog.CloseTrigger>
                <Dialog.CloseTrigger asChild>
                  <button className="px-4 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center">
                    Okay
                  </button>
                </Dialog.CloseTrigger>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
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
