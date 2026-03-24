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
newsletter-dialog.tsx
// components/ui/newsletter-dialog.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Props interface for strong typing
interface NewsletterDialogProps {
  imageSrc: string;
  title: string;
  description: React.ReactNode;
  promoText: React.ReactNode;
  inputPlaceholder?: string;
  buttonText: string;
  onSubscribe: (email: string) => void;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const NewsletterDialog = ({
  imageSrc,
  title,
  description,
  promoText,
  inputPlaceholder = "Enter your email here...",
  buttonText,
  onSubscribe,
  trigger,
  open,
  onOpenChange,
}: NewsletterDialogProps) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      // Optionally close the dialog on submit
      if (onOpenChange) {
        onOpenChange(false);
      }
    }
  };

  // Staggered animation for content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <AnimatePresence>
        {open !== false && ( // Conditionally render based on open state for exit animation
          <DialogContent
            className="sm:max-w-md p-0 gap-0 overflow-hidden"
            aria-describedby={undefined} // Remove default description binding
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="relative h-48 w-full">
                <img
                  src={imageSrc}
                  alt="Promotional banner"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader className="text-left">
                  <motion.div
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.1 }}
                  >
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                      {title}
                    </DialogTitle>
                  </motion.div>
                  <motion.div
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.2 }}
                  >
                    <DialogDescription className="text-muted-foreground mt-2">
                      {description}
                    </DialogDescription>
                  </motion.div>
                   <motion.div
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm text-muted-foreground mt-4">{promoText}</p>
                  </motion.div>
                </DialogHeader>

                <motion.form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                  variants={FADE_IN_ANIMATION_VARIANTS}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={inputPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9"
                      aria-label="Email address"
                    />
                  </div>
                  <Button type="submit" className="w-full font-semibold" size="lg">
                    {buttonText}
                  </Button>
                </motion.form>
              </div>
            </motion.div>
             <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogClose>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export { NewsletterDialog };

code.demo.1759425320898.tsx
// demo.tsx
"use client";

import * as React from "react";
import { NewsletterDialog } from "@/components/ui/newsletter-dialog";
import { Button } from "@/components/ui/button";

export default function NewsletterDialogDemo() {
  // State to control the dialog visibility
  const [isOpen, setIsOpen] = React.useState(false);

  // Handler for the subscription action
  const handleSubscribe = (email: string) => {
    console.log(`Subscribed with email: ${email}`);
    // Here you would typically make an API call
    alert(`Thank you for subscribing, ${email}!`);
  };

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <NewsletterDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        imageSrc="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop"
        title="JOIN OUR GROWING COMMUNITY!"
        description={
          <>
            We love our users and our trading community. Join now to receive news
            about our latest indicators and promotions.
          </>
        }
        promoText={
          <>
            As a special thank you, we will send you a discount code that can be
            applied to receive <strong>10% off</strong> any of our products!
          </>
        }
        buttonText="JOIN NOW"
        onSubscribe={handleSubscribe}
        trigger={
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
            >
              Show Newsletter Dialog
            </Button>
        }
        // Apply a custom green color to the button inside the dialog
        // Note: This requires custom styling or a theme extension.
        // For simplicity, we can use a CSS class or style prop if the component supports it.
        // The component above uses the default `primary` button color.
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/newsletter-dialog.tsx
// components/ui/newsletter-dialog.tsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Props interface for strong typing
interface NewsletterDialogProps {
  imageSrc: string;
  title: string;
  description: React.ReactNode;
  promoText: React.ReactNode;
  inputPlaceholder?: string;
  buttonText: string;
  onSubscribe: (email: string) => void;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const NewsletterDialog = ({
  imageSrc,
  title,
  description,
  promoText,
  inputPlaceholder = "Enter your email here...",
  buttonText,
  onSubscribe,
  trigger,
  open,
  onOpenChange,
}: NewsletterDialogProps) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      // Optionally close the dialog on submit
      if (onOpenChange) {
        onOpenChange(false);
      }
    }
  };

  // Staggered animation for content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <AnimatePresence>
        {open !== false && ( // Conditionally render based on open state for exit animation
          <DialogContent
            className="sm:max-w-md p-0 gap-0 overflow-hidden"
            aria-describedby={undefined} // Remove default description binding
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="relative h-48 w-full">
                <img
                  src={imageSrc}
                  alt="Promotional banner"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <DialogHeader className="text-left">
                  <motion.div
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.1 }}
                  >
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                      {title}
                    </DialogTitle>
                  </motion.div>
                  <motion.div
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.2 }}
                  >
                    <DialogDescription className="text-muted-foreground mt-2">
                      {description}
                    </DialogDescription>
                  </motion.div>
                   <motion.div
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm text-muted-foreground mt-4">{promoText}</p>
                  </motion.div>
                </DialogHeader>

                <motion.form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                  variants={FADE_IN_ANIMATION_VARIANTS}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={inputPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9"
                      aria-label="Email address"
                    />
                  </div>
                  <Button type="submit" className="w-full font-semibold" size="lg">
                    {buttonText}
                  </Button>
                </motion.form>
              </div>
            </motion.div>
             <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogClose>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export { NewsletterDialog };
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
