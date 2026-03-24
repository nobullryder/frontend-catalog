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
error.tsx
import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

/**
 * A helper component for rendering inline code snippets within the overlay message.
 */
const CodeSnippet = ({ children }: { children: React.ReactNode }) => (
  <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-semibold text-muted-foreground">
    {children}
  </code>
);

interface ErrorOverlayProps {
  /** The main title of the error message. */
  title: string;
  /** The body content of the overlay. Can be a string or complex JSX. */
  message: React.ReactNode;
  /** Controls whether the overlay is visible. */
  isOpen: boolean;
  /** Callback function to be invoked when the overlay should be closed. */
  onClose: () => void;
  /** Optional additional class names. */
  className?: string;
}

export const ErrorOverlay = ({
  title,
  message,
  isOpen,
  onClose,
  className,
}: ErrorOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Effect to handle the 'Escape' key press for closing the overlay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the overlay for screen readers and keyboard navigation
      overlayRef.current?.focus();
    }

    // Cleanup the event listener on component unmount or when isOpen changes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: { opacity: 0, scale: 0.95, y: 10 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // The backdrop that covers the screen
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
          onClick={onClose} // Close on clicking the backdrop
        >
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="error-overlay-title"
            tabIndex={-1} // Make the div focusable
            className={cn(
              "relative w-full max-w-2xl overflow-hidden rounded-lg border bg-card p-6 font-mono text-card-foreground shadow-xl outline-none",
              className
            )}
            variants={modalVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 id="error-overlay-title" className="text-lg font-bold text-destructive">
              {title}
            </h2>

            <hr className="my-4 border-border" />

            <div className="space-y-2 text-sm text-muted-foreground">
              {message}
            </div>
            
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Export the helper component for use in the demo or other parts of the app
ErrorOverlay.CodeSnippet = CodeSnippet;

code.demo.1758098670822.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust path as needed
import { ErrorOverlay } from "@/components/ui/error"; // Adjust path as needed

const Code = ErrorOverlay.CodeSnippet; // Using the exported helper for cleaner syntax

const ErrorOverlayDemo = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Define the content for the overlay message using JSX and the CodeSnippet helper
  const errorMessage = (
    <>
      <p>
        Click outside, press <Code>Esc</Code> key, or fix the code to dismiss.
      </p>
      <p>
        You can also disable this overlay by setting <Code>server.hmr.overlay</Code> to <Code>false</Code> in <Code>vite.config.ts</Code>.
      </p>
    </>
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-background p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error Overlay Demo</h1>
        <p className="text-muted-foreground">Click the button to simulate an error.</p>
      </div>
      
      <Button onClick={() => setIsOverlayOpen(true)}>
        Trigger Error
      </Button>

      <ErrorOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        title="The requested module '/src/components/ui/basic-toast.tsx' does not provide an export named 'useToast'"
        message={errorMessage}
      />
    </div>
  );
};

export default ErrorOverlayDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/error.tsx
import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

/**
 * A helper component for rendering inline code snippets within the overlay message.
 */
const CodeSnippet = ({ children }: { children: React.ReactNode }) => (
  <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-semibold text-muted-foreground">
    {children}
  </code>
);

interface ErrorOverlayProps {
  /** The main title of the error message. */
  title: string;
  /** The body content of the overlay. Can be a string or complex JSX. */
  message: React.ReactNode;
  /** Controls whether the overlay is visible. */
  isOpen: boolean;
  /** Callback function to be invoked when the overlay should be closed. */
  onClose: () => void;
  /** Optional additional class names. */
  className?: string;
}

export const ErrorOverlay = ({
  title,
  message,
  isOpen,
  onClose,
  className,
}: ErrorOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Effect to handle the 'Escape' key press for closing the overlay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the overlay for screen readers and keyboard navigation
      overlayRef.current?.focus();
    }

    // Cleanup the event listener on component unmount or when isOpen changes
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: { opacity: 0, scale: 0.95, y: 10 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // The backdrop that covers the screen
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
          onClick={onClose} // Close on clicking the backdrop
        >
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="error-overlay-title"
            tabIndex={-1} // Make the div focusable
            className={cn(
              "relative w-full max-w-2xl overflow-hidden rounded-lg border bg-card p-6 font-mono text-card-foreground shadow-xl outline-none",
              className
            )}
            variants={modalVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 id="error-overlay-title" className="text-lg font-bold text-destructive">
              {title}
            </h2>

            <hr className="my-4 border-border" />

            <div className="space-y-2 text-sm text-muted-foreground">
              {message}
            </div>
            
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Export the helper component for use in the demo or other parts of the app
ErrorOverlay.CodeSnippet = CodeSnippet;
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
