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

import * as React from "react";
import { Mail, Loader2, CheckCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface NewsletterSignupProps {
  // Required props for controlled form
  email: string;
  onEmailChange: (value: string) => void;
  firstName: string;
  onFirstNameChange: (value: string) => void;
  lastName: string;
  onLastNameChange: (value: string) => void;
  acceptTerms: boolean;
  onAcceptTermsChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  
  // State props
  isLoading?: boolean;
  error?: {
    field?: string;
    message: string;
  } | null;
  showSuccessDialog?: boolean;
  onSuccessClose?: () => void;
  
  // Customizable text content
  title?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  firstNameLabel?: string;
  firstNamePlaceholder?: string;
  lastNameLabel?: string;
  lastNamePlaceholder?: string;
  termsLabel?: string;
  termsDescription?: string;
  submitButtonText?: string;
  loadingButtonText?: string;
  
  // Success dialog customization
  successTitle?: string;
  successDescription?: string;
  successButtonText?: string;
  successIcon?: LucideIcon;
  
  // Styling customization
  className?: string;
  cardClassName?: string;
  formClassName?: string;
  showEmailIcon?: boolean;
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  
  // Layout options
  nameFieldsLayout?: "stacked" | "inline";
  hideTermsDescription?: boolean;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  // Required props
  email,
  onEmailChange,
  firstName,
  onFirstNameChange,
  lastName,
  onLastNameChange,
  acceptTerms,
  onAcceptTermsChange,
  onSubmit,
  
  // State props
  isLoading = false,
  error,
  showSuccessDialog = false,
  onSuccessClose,
  
  // Text content with defaults
  title = "Newsletter Signup",
  emailLabel = "Email",
  emailPlaceholder = "name@example.com",
  firstNameLabel = "First Name",
  firstNamePlaceholder = "John",
  lastNameLabel = "Last Name",
  lastNamePlaceholder = "Doe",
  termsLabel = "Accept terms and conditions",
  termsDescription = "You agree to our Terms of Service and Privacy Policy.",
  submitButtonText = "Subscribe",
  loadingButtonText = "Subscribing...",
  
  // Success dialog customization
  successTitle = "Welcome Aboard!",
  successDescription = "You've been successfully subscribed to our newsletter. Check your email for a confirmation message.",
  successButtonText = "Got it",
  successIcon: SuccessIcon = CheckCircle,
  
  // Styling customization
  className,
  cardClassName,
  formClassName,
  showEmailIcon = true,
  buttonSize = "lg",
  buttonVariant = "default",
  
  // Layout options
  nameFieldsLayout = "inline",
  hideTermsDescription = false,
}) => {
  const nameFieldsClass = nameFieldsLayout === "inline" 
    ? "grid grid-cols-2 gap-4" 
    : "space-y-4";

  return (
    <>
      <Card className={cn("w-full max-w-lg", className, cardClassName)}>
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <form onSubmit={onSubmit} className={cn("space-y-4", formClassName)}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">{emailLabel}</Label>
              <div className="relative">
                {showEmailIcon && (
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder={emailPlaceholder}
                  disabled={isLoading}
                  required
                  className={cn(
                    showEmailIcon && "pl-10",
                    error?.field === "email" && "border-destructive"
                  )}
                />
              </div>
              {error?.field === "email" && (
                <p className="text-sm text-destructive">{error.message}</p>
              )}
            </div>

            {/* Name Fields */}
            <div className={nameFieldsClass}>
              <div className="space-y-2">
                <Label htmlFor="firstName">{firstNameLabel}</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  placeholder={firstNamePlaceholder}
                  disabled={isLoading}
                  required
                  className={cn(
                    error?.field === "firstName" && "border-destructive"
                  )}
                />
                {error?.field === "firstName" && (
                  <p className="text-sm text-destructive">{error.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{lastNameLabel}</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => onLastNameChange(e.target.value)}
                  placeholder={lastNamePlaceholder}
                  disabled={isLoading}
                  required
                  className={cn(
                    error?.field === "lastName" && "border-destructive"
                  )}
                />
                {error?.field === "lastName" && (
                  <p className="text-sm text-destructive">{error.message}</p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={onAcceptTermsChange}
                  disabled={isLoading}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {termsLabel}
                  </Label>
                  {!hideTermsDescription && (
                    <p className="text-sm text-muted-foreground">
                      {termsDescription}
                    </p>
                  )}
                </div>
              </div>
              {error?.field === "acceptTerms" && (
                <p className="text-sm text-destructive">{error.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !acceptTerms}
              className="w-full"
              size={buttonSize}
              variant={buttonVariant}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? loadingButtonText : submitButtonText}
            </Button>

            {/* General Error */}
            {error && !error.field && (
              <p className="text-sm text-destructive text-center">
                {error.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      {onSuccessClose && (
        <Dialog open={showSuccessDialog} onOpenChange={onSuccessClose}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center space-x-2">
                <SuccessIcon className="h-6 w-6 text-green-500" />
                <DialogTitle className="text-xl">{successTitle}</DialogTitle>
              </div>
              <DialogDescription className="pt-2">
                {successDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end pt-4">
              <Button onClick={onSuccessClose}>{successButtonText}</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NewsletterSignup;

code.demo.1755360845164.tsx
"use client";

import React, { useState } from "react";
import NewsletterSignup from "@/components/ui/newsletter-signup";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<{
    field?: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate form
    if (!email) {
      setError({ field: "email", message: "Email is required" });
      setIsLoading(false);
      return;
    }

    if (!firstName) {
      setError({ field: "firstName", message: "First name is required" });
      setIsLoading(false);
      return;
    }

    if (!lastName) {
      setError({ field: "lastName", message: "Last name is required" });
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError({ field: "acceptTerms", message: "You must accept the terms" });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", { email, firstName, lastName, acceptTerms });
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    // Reset form
    setEmail("");
    setFirstName("");
    setLastName("");
    setAcceptTerms(false);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <NewsletterSignup
          email={email}
          onEmailChange={setEmail}
          firstName={firstName}
          onFirstNameChange={setFirstName}
          lastName={lastName}
          onLastNameChange={setLastName}
          acceptTerms={acceptTerms}
          onAcceptTermsChange={setAcceptTerms}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          showSuccessDialog={showSuccess}
          onSuccessClose={handleSuccessClose}
          className="shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-gray-900/95"
        />
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/newsletter-signup.tsx
"use client";

import * as React from "react";
import { Mail, Loader2, CheckCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface NewsletterSignupProps {
  // Required props for controlled form
  email: string;
  onEmailChange: (value: string) => void;
  firstName: string;
  onFirstNameChange: (value: string) => void;
  lastName: string;
  onLastNameChange: (value: string) => void;
  acceptTerms: boolean;
  onAcceptTermsChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  
  // State props
  isLoading?: boolean;
  error?: {
    field?: string;
    message: string;
  } | null;
  showSuccessDialog?: boolean;
  onSuccessClose?: () => void;
  
  // Customizable text content
  title?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  firstNameLabel?: string;
  firstNamePlaceholder?: string;
  lastNameLabel?: string;
  lastNamePlaceholder?: string;
  termsLabel?: string;
  termsDescription?: string;
  submitButtonText?: string;
  loadingButtonText?: string;
  
  // Success dialog customization
  successTitle?: string;
  successDescription?: string;
  successButtonText?: string;
  successIcon?: LucideIcon;
  
  // Styling customization
  className?: string;
  cardClassName?: string;
  formClassName?: string;
  showEmailIcon?: boolean;
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  
  // Layout options
  nameFieldsLayout?: "stacked" | "inline";
  hideTermsDescription?: boolean;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  // Required props
  email,
  onEmailChange,
  firstName,
  onFirstNameChange,
  lastName,
  onLastNameChange,
  acceptTerms,
  onAcceptTermsChange,
  onSubmit,
  
  // State props
  isLoading = false,
  error,
  showSuccessDialog = false,
  onSuccessClose,
  
  // Text content with defaults
  title = "Newsletter Signup",
  emailLabel = "Email",
  emailPlaceholder = "name@example.com",
  firstNameLabel = "First Name",
  firstNamePlaceholder = "John",
  lastNameLabel = "Last Name",
  lastNamePlaceholder = "Doe",
  termsLabel = "Accept terms and conditions",
  termsDescription = "You agree to our Terms of Service and Privacy Policy.",
  submitButtonText = "Subscribe",
  loadingButtonText = "Subscribing...",
  
  // Success dialog customization
  successTitle = "Welcome Aboard!",
  successDescription = "You've been successfully subscribed to our newsletter. Check your email for a confirmation message.",
  successButtonText = "Got it",
  successIcon: SuccessIcon = CheckCircle,
  
  // Styling customization
  className,
  cardClassName,
  formClassName,
  showEmailIcon = true,
  buttonSize = "lg",
  buttonVariant = "default",
  
  // Layout options
  nameFieldsLayout = "inline",
  hideTermsDescription = false,
}) => {
  const nameFieldsClass = nameFieldsLayout === "inline" 
    ? "grid grid-cols-2 gap-4" 
    : "space-y-4";

  return (
    <>
      <Card className={cn("w-full max-w-lg", className, cardClassName)}>
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <form onSubmit={onSubmit} className={cn("space-y-4", formClassName)}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">{emailLabel}</Label>
              <div className="relative">
                {showEmailIcon && (
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder={emailPlaceholder}
                  disabled={isLoading}
                  required
                  className={cn(
                    showEmailIcon && "pl-10",
                    error?.field === "email" && "border-destructive"
                  )}
                />
              </div>
              {error?.field === "email" && (
                <p className="text-sm text-destructive">{error.message}</p>
              )}
            </div>

            {/* Name Fields */}
            <div className={nameFieldsClass}>
              <div className="space-y-2">
                <Label htmlFor="firstName">{firstNameLabel}</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  placeholder={firstNamePlaceholder}
                  disabled={isLoading}
                  required
                  className={cn(
                    error?.field === "firstName" && "border-destructive"
                  )}
                />
                {error?.field === "firstName" && (
                  <p className="text-sm text-destructive">{error.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{lastNameLabel}</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => onLastNameChange(e.target.value)}
                  placeholder={lastNamePlaceholder}
                  disabled={isLoading}
                  required
                  className={cn(
                    error?.field === "lastName" && "border-destructive"
                  )}
                />
                {error?.field === "lastName" && (
                  <p className="text-sm text-destructive">{error.message}</p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={onAcceptTermsChange}
                  disabled={isLoading}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {termsLabel}
                  </Label>
                  {!hideTermsDescription && (
                    <p className="text-sm text-muted-foreground">
                      {termsDescription}
                    </p>
                  )}
                </div>
              </div>
              {error?.field === "acceptTerms" && (
                <p className="text-sm text-destructive">{error.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !acceptTerms}
              className="w-full"
              size={buttonSize}
              variant={buttonVariant}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? loadingButtonText : submitButtonText}
            </Button>

            {/* General Error */}
            {error && !error.field && (
              <p className="text-sm text-destructive text-center">
                {error.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      {onSuccessClose && (
        <Dialog open={showSuccessDialog} onOpenChange={onSuccessClose}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center space-x-2">
                <SuccessIcon className="h-6 w-6 text-green-500" />
                <DialogTitle className="text-xl">{successTitle}</DialogTitle>
              </div>
              <DialogDescription className="pt-2">
                {successDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end pt-4">
              <Button onClick={onSuccessClose}>{successButtonText}</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default NewsletterSignup;
```

Install NPM dependencies:
```bash
lucide-react
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
