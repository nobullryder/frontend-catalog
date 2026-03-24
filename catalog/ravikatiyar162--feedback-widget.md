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
feedback-widget.tsx
// components/ui/feedback-widget.tsx
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Props interface for component reusability
export interface FeedbackWidgetProps {
  /** The title displayed at the top of the widget. */
  title?: string;
  /** Placeholder text for the comment textarea. */
  placeholder?: string;
  /** Function to handle the submission of feedback data. */
  onSubmit: (feedback: { rating: 'helpful' | 'not-helpful'; comment: string }) => Promise<void>;
  /** Function to handle closing the widget. */
  onClose: () => void;
  /** Text for the submit button. */
  submitText?: string;
  /** Text for the cancel button. */
  cancelText?: string;
}

export const FeedbackWidget = ({
  title = "Help us improve",
  placeholder = "Your feedback...",
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit,
  onClose,
}: FeedbackWidgetProps) => {
  const [rating, setRating] = useState<'helpful' | 'not-helpful' | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle rating selection
  const handleRatingClick = (selectedRating: 'helpful' | 'not-helpful') => {
    setRating(currentRating => currentRating === selectedRating ? null : selectedRating);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!rating) return;
    setIsSubmitting(true);
    await onSubmit({ rating, comment });
    setIsSubmitting(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.6, bounce: 0.4 } },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  const textAreaVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: "auto", marginTop: "1rem", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm"
      aria-live="polite"
    >
      <Card className="shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close feedback widget">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={rating === 'helpful' ? 'default' : 'outline'}
              onClick={() => handleRatingClick('helpful')}
              aria-pressed={rating === 'helpful'}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful
            </Button>
            <Button
              variant={rating === 'not-helpful' ? 'default' : 'outline'}
              onClick={() => handleRatingClick('not-helpful')}
              aria-pressed={rating === 'not-helpful'}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Not helpful
            </Button>
          </div>

          <AnimatePresence>
            {rating && (
              <motion.div
                key="textarea"
                variants={textAreaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden"
              >
                <Textarea
                  placeholder={placeholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-4"
                  rows={3}
                  aria-label="Feedback comment"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
              {cancelText}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!rating || isSubmitting}
              className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500/90 dark:bg-yellow-500 dark:text-yellow-950 dark:hover:bg-yellow-500/90"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {submitText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

code.demo.1758910733121.tsx
// demo.tsx
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FeedbackWidget, FeedbackWidgetProps } from "@/components/ui/feedback-widget";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner"; // Using sonner for notifications, a shadcn favorite

export default function FeedbackWidgetDemo() {
  const [isOpen, setIsOpen] = useState(false);

  // Simulate an API call
  const handleFeedbackSubmit: FeedbackWidgetProps['onSubmit'] = async (feedback) => {
    console.log("Submitting feedback:", feedback);
    
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Thank you for your feedback!");
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center rounded-lg border border-dashed bg-background p-8">
      <Button onClick={() => setIsOpen(true)}>Leave Feedback</Button>
      
      {/* Required for toast notifications */}
      <Toaster richColors />

      {/* AnimatePresence handles the exit animation */}
      <AnimatePresence>
        {isOpen && (
          <FeedbackWidget
            onSubmit={handleFeedbackSubmit}
            onClose={() => setIsOpen(false)}
            placeholder="Solid answer, but could use more implementation steps"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feedback-widget.tsx
// components/ui/feedback-widget.tsx
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Props interface for component reusability
export interface FeedbackWidgetProps {
  /** The title displayed at the top of the widget. */
  title?: string;
  /** Placeholder text for the comment textarea. */
  placeholder?: string;
  /** Function to handle the submission of feedback data. */
  onSubmit: (feedback: { rating: 'helpful' | 'not-helpful'; comment: string }) => Promise<void>;
  /** Function to handle closing the widget. */
  onClose: () => void;
  /** Text for the submit button. */
  submitText?: string;
  /** Text for the cancel button. */
  cancelText?: string;
}

export const FeedbackWidget = ({
  title = "Help us improve",
  placeholder = "Your feedback...",
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit,
  onClose,
}: FeedbackWidgetProps) => {
  const [rating, setRating] = useState<'helpful' | 'not-helpful' | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle rating selection
  const handleRatingClick = (selectedRating: 'helpful' | 'not-helpful') => {
    setRating(currentRating => currentRating === selectedRating ? null : selectedRating);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!rating) return;
    setIsSubmitting(true);
    await onSubmit({ rating, comment });
    setIsSubmitting(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.6, bounce: 0.4 } },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  const textAreaVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: "auto", marginTop: "1rem", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm"
      aria-live="polite"
    >
      <Card className="shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close feedback widget">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={rating === 'helpful' ? 'default' : 'outline'}
              onClick={() => handleRatingClick('helpful')}
              aria-pressed={rating === 'helpful'}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful
            </Button>
            <Button
              variant={rating === 'not-helpful' ? 'default' : 'outline'}
              onClick={() => handleRatingClick('not-helpful')}
              aria-pressed={rating === 'not-helpful'}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Not helpful
            </Button>
          </div>

          <AnimatePresence>
            {rating && (
              <motion.div
                key="textarea"
                variants={textAreaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden"
              >
                <Textarea
                  placeholder={placeholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-4"
                  rows={3}
                  aria-label="Feedback comment"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
              {cancelText}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!rating || isSubmitting}
              className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500/90 dark:bg-yellow-500 dark:text-yellow-950 dark:hover:bg-yellow-500/90"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {submitText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
