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
newsletter-card.tsx
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * @typedef {object} NewsletterSignUpProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @property {string} title - The main title for the newsletter card.
 * @property {string} subtitle - The subtitle or description.
 * @property {string} [placeholder='Email address'] - The placeholder text for the email input.
 * @property {string} [buttonAriaLabel='Subscribe to newsletter'] - The ARIA label for the submit button for accessibility.
 * @property {(email: string) => void} onSubmit - The function to call when the form is submitted.
 */
export interface NewsletterSignUpProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  placeholder?: string;
  buttonAriaLabel?: string;
  onSubmit: (email: string) => void;
}

const NewsletterSignUp = React.forwardRef<HTMLDivElement, NewsletterSignUpProps>(
  (
    {
      className,
      title,
      subtitle,
      placeholder = "Email address",
      buttonAriaLabel = "Subscribe to newsletter",
      onSubmit,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("");
    // Generate a unique ID for the input to link with the label
    const inputId = React.useId();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Basic validation: ensure email is not empty
      if (!email.trim()) return;
      onSubmit(email);
      // Reset input field after submission
      setEmail("");
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border p-8",
          // Themed background colors inspired by the image
          "border-transparent bg-amber-100 text-amber-950",
          "dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-50",
          className
        )}
        {...props}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 text-amber-800 dark:text-amber-200/80">{subtitle}</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div
            className={cn(
              "group relative flex items-center rounded-full bg-background shadow-sm",
              // Advanced animation: Add a ring on focus within the group
              "transition-shadow duration-300 ease-in-out",
              "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
              "focus-within:ring-offset-amber-100 dark:focus-within:ring-offset-amber-950/20"
            )}
          >
            {/* Visually hidden label for screen readers */}
            <label htmlFor={inputId} className="sr-only">
              {placeholder}
            </label>
            <Input
              id={inputId}
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn(
                // Custom styling for the input
                "h-12 flex-grow rounded-l-full border-none bg-transparent pl-6 pr-2 text-base",
                "focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
            />
            <Button
              type="submit"
              size="icon"
              aria-label={buttonAriaLabel}
              className={cn(
                "mr-1.5 h-9 w-9 flex-shrink-0 rounded-full bg-foreground text-background shadow",
                // Advanced animation: Scale button and move icon on hover
                "transition-transform duration-300 ease-in-out group-hover:scale-105"
              )}
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

NewsletterSignUp.displayName = "NewsletterSignUp";

export { NewsletterSignUp };

code.demo.1758909342782.tsx
"use client"; // Required for useState and event handlers

import { NewsletterSignUp } from "@/components/ui/newsletter-card";

export default function NewsletterSignUpDemo() {
  // Demo handler function to show submission success
  const handleSubscribe = (email: string) => {
    alert(`Thank you for subscribing with: ${email}`);
  };

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-background p-4">
      <NewsletterSignUp
        title="Stay in the know."
        subtitle="Get the Measured Newsletter"
        placeholder="Your email address"
        buttonAriaLabel="Submit email for newsletter"
        onSubmit={handleSubscribe}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/newsletter-card.tsx
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * @typedef {object} NewsletterSignUpProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @property {string} title - The main title for the newsletter card.
 * @property {string} subtitle - The subtitle or description.
 * @property {string} [placeholder='Email address'] - The placeholder text for the email input.
 * @property {string} [buttonAriaLabel='Subscribe to newsletter'] - The ARIA label for the submit button for accessibility.
 * @property {(email: string) => void} onSubmit - The function to call when the form is submitted.
 */
export interface NewsletterSignUpProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  placeholder?: string;
  buttonAriaLabel?: string;
  onSubmit: (email: string) => void;
}

const NewsletterSignUp = React.forwardRef<HTMLDivElement, NewsletterSignUpProps>(
  (
    {
      className,
      title,
      subtitle,
      placeholder = "Email address",
      buttonAriaLabel = "Subscribe to newsletter",
      onSubmit,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("");
    // Generate a unique ID for the input to link with the label
    const inputId = React.useId();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Basic validation: ensure email is not empty
      if (!email.trim()) return;
      onSubmit(email);
      // Reset input field after submission
      setEmail("");
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border p-8",
          // Themed background colors inspired by the image
          "border-transparent bg-amber-100 text-amber-950",
          "dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-50",
          className
        )}
        {...props}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 text-amber-800 dark:text-amber-200/80">{subtitle}</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div
            className={cn(
              "group relative flex items-center rounded-full bg-background shadow-sm",
              // Advanced animation: Add a ring on focus within the group
              "transition-shadow duration-300 ease-in-out",
              "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
              "focus-within:ring-offset-amber-100 dark:focus-within:ring-offset-amber-950/20"
            )}
          >
            {/* Visually hidden label for screen readers */}
            <label htmlFor={inputId} className="sr-only">
              {placeholder}
            </label>
            <Input
              id={inputId}
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn(
                // Custom styling for the input
                "h-12 flex-grow rounded-l-full border-none bg-transparent pl-6 pr-2 text-base",
                "focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
            />
            <Button
              type="submit"
              size="icon"
              aria-label={buttonAriaLabel}
              className={cn(
                "mr-1.5 h-9 w-9 flex-shrink-0 rounded-full bg-foreground text-background shadow",
                // Advanced animation: Scale button and move icon on hover
                "transition-transform duration-300 ease-in-out group-hover:scale-105"
              )}
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

NewsletterSignUp.displayName = "NewsletterSignUp";

export { NewsletterSignUp };
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
