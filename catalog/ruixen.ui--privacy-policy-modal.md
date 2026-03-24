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
privacy-policy-modal.tsx
"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

const privacySections = [
  {
    title: "Information Collection",
    content:
      "We collect data to improve your experience, including usage patterns and preferences.",
  },
  {
    title: "Use of Data",
    content:
      "Your data helps us provide better services and personalized recommendations.",
  },
  {
    title: "Third-Party Sharing",
    content:
      "We do not sell your information. We may share anonymized data with partners for analytics.",
  },
  {
    title: "Cookies & Tracking",
    content:
      "Cookies are used to enhance site functionality and analyze trends.",
  },
  {
    title: "Security Measures",
    content:
      "We protect your data using encryption and secure storage.",
  },
  {
    title: "User Rights",
    content:
      "You can request access, correction, or deletion of your personal data anytime.",
  },
  {
    title: "Policy Updates",
    content:
      "Changes to this policy will be communicated on the website. Continued use implies consent.",
  },
]

export default function PrivacyPolicyModal() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const content = contentRef.current
    if (!content) return
    const progress = Math.min(
      1,
      content.scrollTop / (content.scrollHeight - content.clientHeight)
    )
    setScrollProgress(progress)
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">View Privacy Policy</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col p-0 sm:max-h-[80vh] sm:max-w-md gap-0 !rounded-2xl">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white">Privacy Policy</DialogTitle>
          </DialogHeader>

          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto p-4 flex-1 space-y-4"
            style={{ maxHeight: "60vh" }}
          >
            {privacySections.map((section, idx) => (
              <div key={idx}>
                <p className="font-medium">{section.title}</p>
                <p className="text-sm text-gray-500">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div
            className="h-1 bg-blue-500 transition-all duration-200 rounded-3xl"
            style={{ width: `${scrollProgress * 100}%` }}
          />

          <DialogFooter className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-2xl">Decline</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={scrollProgress < 1} className="rounded-2xl">Accept</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}


code.demo.1755716832458.tsx
import PrivacyPolicyModal from "@/components/ui/privacy-policy-modal";

export default function DemoOne() {
  return (
    <div>
      <PrivacyPolicyModal />
    </div>
    );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/privacy-policy-modal.tsx
"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

const privacySections = [
  {
    title: "Information Collection",
    content:
      "We collect data to improve your experience, including usage patterns and preferences.",
  },
  {
    title: "Use of Data",
    content:
      "Your data helps us provide better services and personalized recommendations.",
  },
  {
    title: "Third-Party Sharing",
    content:
      "We do not sell your information. We may share anonymized data with partners for analytics.",
  },
  {
    title: "Cookies & Tracking",
    content:
      "Cookies are used to enhance site functionality and analyze trends.",
  },
  {
    title: "Security Measures",
    content:
      "We protect your data using encryption and secure storage.",
  },
  {
    title: "User Rights",
    content:
      "You can request access, correction, or deletion of your personal data anytime.",
  },
  {
    title: "Policy Updates",
    content:
      "Changes to this policy will be communicated on the website. Continued use implies consent.",
  },
]

export default function PrivacyPolicyModal() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const content = contentRef.current
    if (!content) return
    const progress = Math.min(
      1,
      content.scrollTop / (content.scrollHeight - content.clientHeight)
    )
    setScrollProgress(progress)
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">View Privacy Policy</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col p-0 sm:max-h-[80vh] sm:max-w-md gap-0 !rounded-2xl">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white">Privacy Policy</DialogTitle>
          </DialogHeader>

          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto p-4 flex-1 space-y-4"
            style={{ maxHeight: "60vh" }}
          >
            {privacySections.map((section, idx) => (
              <div key={idx}>
                <p className="font-medium">{section.title}</p>
                <p className="text-sm text-gray-500">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div
            className="h-1 bg-blue-500 transition-all duration-200 rounded-3xl"
            style={{ width: `${scrollProgress * 100}%` }}
          />

          <DialogFooter className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-2xl">Decline</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={scrollProgress < 1} className="rounded-2xl">Accept</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

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
