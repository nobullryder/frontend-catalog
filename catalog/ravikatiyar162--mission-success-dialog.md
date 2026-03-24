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
mission-success-dialog.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import required shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Props for the MissionSuccessDialog component.
 */
interface MissionSuccessDialogProps {
  /** Controls whether the dialog is open or closed. */
  isOpen: boolean;
  /** Function to call when the dialog should be closed. */
  onClose: () => void;
  /** URL for the main illustration image. */
  imageUrl: string;
  /** The main title of the dialog. */
  title: string;
  /** The descriptive text below the title. */
  description: string;
  /** Placeholder text for the input field. */
  inputPlaceholder?: string;
  /** Text for the primary action button. */
  primaryButtonText: string;
  /** Callback function when the primary button is clicked. Receives the input value. */
  onPrimaryClick: (inputValue: string) => void;
  /** Text for the secondary action link/button. */
  secondaryButtonText: string;
  /** Callback function when the secondary button is clicked. */
  onSecondaryClick: () => void;
  /** Optional text for the badge at the top. */
  badgeText?: string;
  /** Optional icon for the badge. */
  badgeIcon?: React.ReactNode;
}

export const MissionSuccessDialog: React.FC<MissionSuccessDialogProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  inputPlaceholder = "Enter a value",
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  badgeText,
  badgeIcon,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  // Handle primary action and close the dialog
  const handlePrimaryClick = () => {
    onPrimaryClick(inputValue);
    onClose();
  };

  // Handle secondary action and close the dialog
  const handleSecondaryClick = () => {
    onSecondaryClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Animated Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-xl"
          >
            <div className="relative p-8 text-center">
              {/* Optional Top Badge */}
              {badgeText && (
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {badgeIcon}
                  <span>{badgeText}</span>
                </div>
              )}

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-8 w-8 rounded-full"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Illustration Image */}
              <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center">
                <img src={imageUrl} alt="Mission illustration" className="max-h-full max-w-full object-contain drop-shadow-[0_10px_15px_rgba(150,120,255,0.4)]" />
              </div>

              <h2 className="mb-2 flex items-center justify-center gap-2 text-2xl font-bold text-card-foreground">
                <Zap className="h-5 w-5 text-yellow-400" />
                {title}
              </h2>

              <p className="mb-6 text-sm text-muted-foreground">
                {description}
              </p>

              {/* Form elements */}
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-secondary text-center text-secondary-foreground placeholder:text-muted-foreground"
                />
                <Button onClick={handlePrimaryClick} size="lg" className="w-full">
                  {primaryButtonText}
                </Button>
                <Button variant="link" onClick={handleSecondaryClick} className="text-muted-foreground">
                  {secondaryButtonText}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

code.demo.1758805150513.tsx
import React, { useState } from 'react';
import { MissionSuccessDialog } from '@/components/ui/mission-success-dialog'; // Adjust path as needed
import { Button } from '@/components/ui/button';
import { ShieldQuestion } from 'lucide-react'; // Example icon

export default function MissionSuccessDialogDemo() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Example handler for the primary button
  const handlePrimaryAction = (inputValue: string) => {
    console.log("Planet Name:", inputValue);
    alert(`Mission to planet "${inputValue}" has been set!`);
  };
  
  // Example handler for the secondary button
  const handleSecondaryAction = () => {
    console.log("User is not interested.");
    alert("Mission aborted.");
  };

  return (
    <div className="flex h-[500px] w-full items-center justify-center rounded-lg bg-background">
      <Button onClick={() => setDialogOpen(true)}>
        Complete Mission
      </Button>

      <MissionSuccessDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        imageUrl="https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-HmiK2xmQ3e7Xtx7v2gRFAWYob8haFe.png&w=320&q=75"
        title="Well Done!"
        description="You're about to land on an unknown planet. What will you name it?"
        inputPlaceholder="Enter your Name"
        primaryButtonText="Next Mission"
        onPrimaryClick={handlePrimaryAction}
        secondaryButtonText="Not Interested"
        onSecondaryClick={handleSecondaryAction}
        badgeText="Go Invisible"
        badgeIcon={<ShieldQuestion className="h-3 w-3" />}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/mission-success-dialog.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import required shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * Props for the MissionSuccessDialog component.
 */
interface MissionSuccessDialogProps {
  /** Controls whether the dialog is open or closed. */
  isOpen: boolean;
  /** Function to call when the dialog should be closed. */
  onClose: () => void;
  /** URL for the main illustration image. */
  imageUrl: string;
  /** The main title of the dialog. */
  title: string;
  /** The descriptive text below the title. */
  description: string;
  /** Placeholder text for the input field. */
  inputPlaceholder?: string;
  /** Text for the primary action button. */
  primaryButtonText: string;
  /** Callback function when the primary button is clicked. Receives the input value. */
  onPrimaryClick: (inputValue: string) => void;
  /** Text for the secondary action link/button. */
  secondaryButtonText: string;
  /** Callback function when the secondary button is clicked. */
  onSecondaryClick: () => void;
  /** Optional text for the badge at the top. */
  badgeText?: string;
  /** Optional icon for the badge. */
  badgeIcon?: React.ReactNode;
}

export const MissionSuccessDialog: React.FC<MissionSuccessDialogProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  inputPlaceholder = "Enter a value",
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  badgeText,
  badgeIcon,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  // Handle primary action and close the dialog
  const handlePrimaryClick = () => {
    onPrimaryClick(inputValue);
    onClose();
  };

  // Handle secondary action and close the dialog
  const handleSecondaryClick = () => {
    onSecondaryClick();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Animated Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border bg-card shadow-xl"
          >
            <div className="relative p-8 text-center">
              {/* Optional Top Badge */}
              {badgeText && (
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {badgeIcon}
                  <span>{badgeText}</span>
                </div>
              )}

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-8 w-8 rounded-full"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Illustration Image */}
              <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center">
                <img src={imageUrl} alt="Mission illustration" className="max-h-full max-w-full object-contain drop-shadow-[0_10px_15px_rgba(150,120,255,0.4)]" />
              </div>

              <h2 className="mb-2 flex items-center justify-center gap-2 text-2xl font-bold text-card-foreground">
                <Zap className="h-5 w-5 text-yellow-400" />
                {title}
              </h2>

              <p className="mb-6 text-sm text-muted-foreground">
                {description}
              </p>

              {/* Form elements */}
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-secondary text-center text-secondary-foreground placeholder:text-muted-foreground"
                />
                <Button onClick={handlePrimaryClick} size="lg" className="w-full">
                  {primaryButtonText}
                </Button>
                <Button variant="link" onClick={handleSecondaryClick} className="text-muted-foreground">
                  {secondaryButtonText}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
