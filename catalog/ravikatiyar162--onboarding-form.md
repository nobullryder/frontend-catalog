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
onboarding-form.tsx
// 1. Import dependencies
import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, AtSign } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// 2. Import shadcn/ui components
import { Button, ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 3. Define component props for reusability
interface OnboardingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  avatarSrc?: string;
  avatarFallback: string;
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
  onUploadClick?: () => void;
  onSubmit: (username: string) => void;
  isSubmitting?: boolean;
}

// 4. Create the OnboardingForm component
const OnboardingForm = React.forwardRef<HTMLDivElement, OnboardingFormProps>(
  (
    {
      className,
      imageSrc,
      avatarSrc,
      avatarFallback,
      title,
      description,
      inputPlaceholder,
      buttonText,
      onUploadClick,
      onSubmit,
      isSubmitting = false,
      ...props
    },
    ref
  ) => {
    const [username, setUsername] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(username);
    };

    // Animation variants for framer-motion
    const FADE_UP_ANIMATION_VARIANTS = {
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
    };

    return (
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className={cn(
          "w-full max-w-md overflow-hidden rounded-2xl border border-forground/40 bg-background/60 shadow-lg backdrop-blur-lg",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Decorative top image */}
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <img
            src={imageSrc}
            alt="Welcome Banner"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="space-y-6 p-8 text-center">
          {/* Main title and description */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
            <h1 className="font-bold text-2xl text-foreground">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </motion.div>

          {/* Avatar upload section */}
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex items-center justify-between rounded-lg border bg-background/50 p-3"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={avatarSrc} alt="User Avatar" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-sm text-foreground">Your avatar</p>
                <p className="text-xs text-muted-foreground">PNG or JPG up to 10MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onUploadClick}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username input */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder={inputPlaceholder}
                  className="pl-9"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {buttonText}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    );
  }
);

OnboardingForm.displayName = "OnboardingForm";

export { OnboardingForm };

code.demo.1760504439549.tsx
import { useState } from 'react';
import { OnboardingForm } from '@/components/ui/onboarding-form'; // Adjust the import path

export default function OnboardingFormDemo() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock function for form submission
  const handleCreateAccount = (username: string) => {
    console.log("Creating account for:", username);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Account for @${username} created successfully!`);
    }, 2000); // Simulate network delay
  };
  
  // Mock function for upload button
  const handleUpload = () => {
    alert("Upload button clicked!");
  };

  return (
    // A decorative container to showcase the glassmorphism effect
    <div className="flex h-screen w-full items-center justify-center">
      <OnboardingForm
        imageSrc="https://ik.imagekit.io/fpxbgsota/Image.png?updatedAt=1760432307349q=80&w=2070&auto=format&fit=crop"
        avatarSrc="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        avatarFallback="A"
        title="Welcome, you're starting your first journey here!"
        description="Add your avatar and pick a username for a quick start."
        inputPlaceholder="username"
        buttonText="Create an account"
        onUploadClick={handleUpload}
        onSubmit={handleCreateAccount}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/onboarding-form.tsx
// 1. Import dependencies
import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, AtSign } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// 2. Import shadcn/ui components
import { Button, ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// 3. Define component props for reusability
interface OnboardingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  avatarSrc?: string;
  avatarFallback: string;
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
  onUploadClick?: () => void;
  onSubmit: (username: string) => void;
  isSubmitting?: boolean;
}

// 4. Create the OnboardingForm component
const OnboardingForm = React.forwardRef<HTMLDivElement, OnboardingFormProps>(
  (
    {
      className,
      imageSrc,
      avatarSrc,
      avatarFallback,
      title,
      description,
      inputPlaceholder,
      buttonText,
      onUploadClick,
      onSubmit,
      isSubmitting = false,
      ...props
    },
    ref
  ) => {
    const [username, setUsername] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(username);
    };

    // Animation variants for framer-motion
    const FADE_UP_ANIMATION_VARIANTS = {
      hidden: { opacity: 0, y: 10 },
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
    };

    return (
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className={cn(
          "w-full max-w-md overflow-hidden rounded-2xl border border-forground/40 bg-background/60 shadow-lg backdrop-blur-lg",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Decorative top image */}
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <img
            src={imageSrc}
            alt="Welcome Banner"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="space-y-6 p-8 text-center">
          {/* Main title and description */}
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-2">
            <h1 className="font-bold text-2xl text-foreground">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </motion.div>

          {/* Avatar upload section */}
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex items-center justify-between rounded-lg border bg-background/50 p-3"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={avatarSrc} alt="User Avatar" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-sm text-foreground">Your avatar</p>
                <p className="text-xs text-muted-foreground">PNG or JPG up to 10MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onUploadClick}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username input */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder={inputPlaceholder}
                  className="pl-9"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {buttonText}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    );
  }
);

OnboardingForm.displayName = "OnboardingForm";

export { OnboardingForm };
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
