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
waitlist-form-1.tsx
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const SMALL_BREAKPOINT = 570;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const childVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5 },
  },
};

// Hook to track window width
function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const width = useWindowWidth();

  const triggerBasicConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerBasicConfetti();
  }, []);

  const ThankYouMessage = (
    <motion.div
      layout
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.5 },
      }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-medium bg-gradient-to-b from-[#00000030] to-[#000] bg-clip-text text-transparent">
          Thank you for joining the waitlist!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          We will notify you with updates soon.
        </p>
      </div>
    </motion.div>
  );

  const FormContent = (
    <motion.div
      layout
      key="form"
      className="w-full"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.5 },
      }}
    >
      <motion.div
        className={` ${
          width <= SMALL_BREAKPOINT ? "text-left mb-4" : "text-center mb-8"
        }`}
        variants={childVariants}
      >
        <h1 className="text-4xl font-medium bg-gradient-to-b from-[#00000030] to-[#000] bg-clip-text text-transparent">
          Join the waitlist for the
          <span
            className={`pl-2 ${
              width <= SMALL_BREAKPOINT ? "" : "block"
            } bg-gradient-to-r from-[#ff9292] to-[#ff0000] bg-clip-text text-transparent`}
          >
            HextaUI
          </span>
        </h1>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className={
          width <= SMALL_BREAKPOINT
            ? "flex flex-col gap-4 items-start w-full"
            : "relative w-full "
        }
        variants={childVariants}
      >
        <div
          className={
            width <= SMALL_BREAKPOINT
              ? "flex flex-col gap-4 w-full"
              : "flex flex-row items-center w-full space-x-4 rounded-full border border-gray-200 bg-white p-2"
          }
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className={`${
              width <= SMALL_BREAKPOINT
                ? "px-4 py-4 w-full text-lg focus:outline-none rounded-full border border-gray-200 bg-white"
                : "flex-1 rounded-full bg-transparent px-4 py-4 text-lg focus:outline-none"
            }`}
            required
          />
          <button
            type="submit"
            className={`${
              width <= SMALL_BREAKPOINT
                ? "rounded-full bg-[#3a3aff] px-6 py-4 text-lg font-medium text-white hover:bg-[#4a2aff] transition w-full"
                : "rounded-full bg-[#3a3aff] px-6 py-4 text-lg font-medium text-white hover:bg-[#4a2aff] transition"
            }`}
          >
            Join the waitlist
          </button>
        </div>
      </motion.form>
    </motion.div>
  );

  return (
    <motion.div
      layout
      className={`w-[95%] max-w-2xl rounded-4xl bg-white border border-black/10 shadow-2xl/10 ${
        width <= SMALL_BREAKPOINT ? "p-8" : "p-12"
      } min-h-[300px] flex items-center`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {!submitted ? FormContent : ThankYouMessage}
      </AnimatePresence>
    </motion.div>
  );
};

export { WaitlistForm };

code.demo.1747798392588.tsx
import { WaitlistForm } from "@/components/ui/waitlist-form-1";

const DemoOne = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <WaitlistForm />
    </div>
  );
};

export { DemoOne };

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/waitlist-form-1.tsx
"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const SMALL_BREAKPOINT = 570;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const childVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5 },
  },
};

// Hook to track window width
function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const width = useWindowWidth();

  const triggerBasicConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerBasicConfetti();
  }, []);

  const ThankYouMessage = (
    <motion.div
      layout
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.5 },
      }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-medium bg-gradient-to-b from-[#00000030] to-[#000] bg-clip-text text-transparent">
          Thank you for joining the waitlist!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          We will notify you with updates soon.
        </p>
      </div>
    </motion.div>
  );

  const FormContent = (
    <motion.div
      layout
      key="form"
      className="w-full"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.5 },
      }}
    >
      <motion.div
        className={` ${
          width <= SMALL_BREAKPOINT ? "text-left mb-4" : "text-center mb-8"
        }`}
        variants={childVariants}
      >
        <h1 className="text-4xl font-medium bg-gradient-to-b from-[#00000030] to-[#000] bg-clip-text text-transparent">
          Join the waitlist for the
          <span
            className={`pl-2 ${
              width <= SMALL_BREAKPOINT ? "" : "block"
            } bg-gradient-to-r from-[#ff9292] to-[#ff0000] bg-clip-text text-transparent`}
          >
            HextaUI
          </span>
        </h1>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className={
          width <= SMALL_BREAKPOINT
            ? "flex flex-col gap-4 items-start w-full"
            : "relative w-full "
        }
        variants={childVariants}
      >
        <div
          className={
            width <= SMALL_BREAKPOINT
              ? "flex flex-col gap-4 w-full"
              : "flex flex-row items-center w-full space-x-4 rounded-full border border-gray-200 bg-white p-2"
          }
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className={`${
              width <= SMALL_BREAKPOINT
                ? "px-4 py-4 w-full text-lg focus:outline-none rounded-full border border-gray-200 bg-white"
                : "flex-1 rounded-full bg-transparent px-4 py-4 text-lg focus:outline-none"
            }`}
            required
          />
          <button
            type="submit"
            className={`${
              width <= SMALL_BREAKPOINT
                ? "rounded-full bg-[#3a3aff] px-6 py-4 text-lg font-medium text-white hover:bg-[#4a2aff] transition w-full"
                : "rounded-full bg-[#3a3aff] px-6 py-4 text-lg font-medium text-white hover:bg-[#4a2aff] transition"
            }`}
          >
            Join the waitlist
          </button>
        </div>
      </motion.form>
    </motion.div>
  );

  return (
    <motion.div
      layout
      className={`w-[95%] max-w-2xl rounded-4xl bg-white border border-black/10 shadow-2xl/10 ${
        width <= SMALL_BREAKPOINT ? "p-8" : "p-12"
      } min-h-[300px] flex items-center`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {!submitted ? FormContent : ThankYouMessage}
      </AnimatePresence>
    </motion.div>
  );
};

export { WaitlistForm };
```

Install NPM dependencies:
```bash
framer-motion, canvas-confetti
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
