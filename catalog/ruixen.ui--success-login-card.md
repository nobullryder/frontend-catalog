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
success-login-card.tsx
// components/ui/success-login-card.tsx
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Field {
  id: string
  label: string
  type: string
  placeholder?: string
}

interface SuccessLoginCardProps {
  title?: string
  description?: string
  fields: Field[]
  onChange: (id: string, value: string) => void
  onSubmit: () => Promise<boolean>
  successMessage?: string
  animationType?: "checkmark" | "color-shift" | "none"
}

export default function SuccessLoginCard({
  title = "Sign In",
  description = "Enter your details to continue",
  fields,
  onChange,
  onSubmit,
  successMessage = "Login Successful!",
  animationType = "checkmark",
}: SuccessLoginCardProps) {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const result = await onSubmit()
    setLoading(false)
    if (result) setSuccess(true)
  }

  return (
    <motion.div
      className="relative w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      animate={
        success && animationType === "color-shift"
          ? { backgroundColor: "#d1fae5" } // green-100
          : {}
      }
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100">
        {success ? successMessage : title}
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-300">
        {!success && description}
      </p>

      <AnimatePresence>
        {!success && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
            <Button
              className="mt-4 w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      {success && animationType === "checkmark" && (
        <motion.div
          key="checkmark"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}


code.demo.1758686308913.tsx
// demo/SuccessLoginDemo.tsx
"use client"

import * as React from "react"
import SuccessLoginCard from "@/components/ui/success-login-card"

export default function DemoOne() {
  const [form, setForm] = React.useState<{ [key: string]: string }>({})

  const handleChange = (id: string, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    console.log("Form Submitted:", form)
    // Fake API delay
    await new Promise((res) => setTimeout(res, 1000))
    return true // simulate success
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SuccessLoginCard
        title="Create Your Account"
        description="Fill in the details below to get started"
        fields={[
          { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
          { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
          { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
          { id: "password", label: "Password", type: "password", placeholder: "********" },
          { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "********" },
          { id: "company", label: "Company / Organization", type: "text", placeholder: "Ruixen Pvt. Ltd." },
          { id: "role", label: "Role", type: "text", placeholder: "Software Developer" },
        ]}
        onChange={handleChange}
        onSubmit={handleSubmit}
        successMessage="🎉 Account Created Successfully!"
        animationType="confetti"
      />
    </div>
  )
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/success-login-card.tsx
// components/ui/success-login-card.tsx
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Field {
  id: string
  label: string
  type: string
  placeholder?: string
}

interface SuccessLoginCardProps {
  title?: string
  description?: string
  fields: Field[]
  onChange: (id: string, value: string) => void
  onSubmit: () => Promise<boolean>
  successMessage?: string
  animationType?: "checkmark" | "color-shift" | "none"
}

export default function SuccessLoginCard({
  title = "Sign In",
  description = "Enter your details to continue",
  fields,
  onChange,
  onSubmit,
  successMessage = "Login Successful!",
  animationType = "checkmark",
}: SuccessLoginCardProps) {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const result = await onSubmit()
    setLoading(false)
    if (result) setSuccess(true)
  }

  return (
    <motion.div
      className="relative w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      animate={
        success && animationType === "color-shift"
          ? { backgroundColor: "#d1fae5" } // green-100
          : {}
      }
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100">
        {success ? successMessage : title}
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-300">
        {!success && description}
      </p>

      <AnimatePresence>
        {!success && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="mt-1"
                />
              </div>
            ))}
            <Button
              className="mt-4 w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      {success && animationType === "checkmark" && (
        <motion.div
          key="checkmark"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center mt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}

```

Install NPM dependencies:
```bash
framer-motion
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
