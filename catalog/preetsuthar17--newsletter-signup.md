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
newsletter-signup.tsx
"use client";
 
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import confetti from "canvas-confetti";
 
export interface NewsletterSignupProps {
  onSubmit: (email: string) => Promise<void>;
  className?: string;
}
 
export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  onSubmit,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
 
    if (!email) {
      setError("Email is required");
      return;
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
 
    setIsSubmitting(true);
 
    try {
      await onSubmit(email);
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div
      className={`bg-secondary/50 border border-primary/10 rounded-lg p-6 ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start justify-center gap-1 flex-col overflow-y-hidden">
              <motion.h2
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Subscribe to our newsletter
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4 }}
              >
                Stay up to date with our latest news and updates.
              </motion.p>
            </div>
            <div className="space-y-2">
              <motion.label
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.6 }}
                className="font-medium text-sm"
                htmlFor="email"
              >
                Email address
              </motion.label>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.7 }}
              >
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus-visible:ring-0 focus-within:ring-0 focus:outline-white/10 "
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden text-sm flex items-center justify-center gap-2 px-4 py-2 bg-white border-black font-medium"
                >
                  <motion.div
                    key="default"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center px-4"
                  >
                    <Send className="h-4 w-4" />
                    <span className="ml-2">Subscribe</span>
                  </motion.div>
                </button>
              </motion.div>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Thank you for subscribing!
            </h2>
            <p className="text-muted-foreground">
              We've sent a confirmation email to your inbox.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

code.demo.tsx
import { NewsletterSignup } from "@/components/ui/newsletter-signup"


const Demo = () => {
  const handleSubmit = async (email: string) => {
    // Handle form submission
    // await submitToAPI(email);
    console.log("hello")
  };
 
  return <NewsletterSignup onSubmit={handleSubmit} />;
};

export { Demo }

```

Copy-paste these files for dependencies:
```tsx
/components/ui/newsletter-signup.tsx
"use client";
 
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import confetti from "canvas-confetti";
 
export interface NewsletterSignupProps {
  onSubmit: (email: string) => Promise<void>;
  className?: string;
}
 
export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  onSubmit,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
 
    if (!email) {
      setError("Email is required");
      return;
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
 
    setIsSubmitting(true);
 
    try {
      await onSubmit(email);
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div
      className={`bg-secondary/50 border border-primary/10 rounded-lg p-6 ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start justify-center gap-1 flex-col overflow-y-hidden">
              <motion.h2
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Subscribe to our newsletter
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4 }}
              >
                Stay up to date with our latest news and updates.
              </motion.p>
            </div>
            <div className="space-y-2">
              <motion.label
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.6 }}
                className="font-medium text-sm"
                htmlFor="email"
              >
                Email address
              </motion.label>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.7 }}
              >
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus-visible:ring-0 focus-within:ring-0 focus:outline-white/10 "
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden text-sm flex items-center justify-center gap-2 px-4 py-2 bg-white border-black font-medium"
                >
                  <motion.div
                    key="default"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center px-4"
                  >
                    <Send className="h-4 w-4" />
                    <span className="ml-2">Subscribe</span>
                  </motion.div>
                </button>
              </motion.div>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Thank you for subscribing!
            </h2>
            <p className="text-muted-foreground">
              We've sent a confirmation email to your inbox.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

Install NPM dependencies:
```bash
motion, lucide-react, canvas-confetti
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
