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
card-9.tsx
import * as React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

interface PromoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  title: React.ReactNode;
  buttonText: string;
  buttonVariant?: ButtonProps["variant"];
  onButtonClick: () => void;
  onClose: () => void;
  showLoader?: boolean;
}

const PromoCard = React.forwardRef<HTMLDivElement, PromoCardProps>(
  (
    {
      className,
      label,
      title,
      buttonText,
      buttonVariant = "secondary",
      onButtonClick,
      onClose,
      showLoader = true,
      ...props
    },
    ref
  ) => {
    // CSS keyframes for the loader animation are embedded here.
    const keyframes = `
      @keyframes promo-card-loader-pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
    `;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg",
          className
        )}
        aria-labelledby="promo-card-title"
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <style>{keyframes}</style>

        {/* SVG filter for the grainy texture. It's visually hidden but applied via CSS. */}
        <svg
          className="pointer-events-none absolute -z-10 h-0 w-0"
          aria-hidden="true"
        >
          <filter id="grainy">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </svg>

        {/* Grainy texture overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{ filter: "url(#grainy)" }}
        />

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-20 h-8 w-8 rounded-full"
          onClick={onClose}
          aria-label="Close promotion"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative z-10 flex h-full flex-col p-8">
          {/* Animated Loader */}
          {showLoader && (
            <div className="absolute left-6 top-6 flex items-center space-x-1">
              <span
                className="h-1.5 w-4 rounded-full bg-muted-foreground"
                style={{ animation: `promo-card-loader-pulse 1.5s infinite` }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                style={{ animation: `promo-card-loader-pulse 1.5s infinite 0.2s` }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                style={{ animation: `promo-card-loader-pulse 1.5s infinite 0.4s` }}
              />
            </div>
          )}

          <div className="mt-8 flex-grow">
            <p className="mb-2 text-sm font-medium text-muted-foreground">{label}</p>
            <h2
              id="promo-card-title"
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              {title}
            </h2>
          </div>

          <div className="mt-8 flex-shrink-0">
            <Button
              className="w-full sm:w-auto"
              size="lg"
              variant={buttonVariant}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
);

PromoCard.displayName = "PromoCard";

export { PromoCard };

code.demo.1758160328210.tsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { PromoCard } from "@/components/ui/card-9";
import { Button } from "@/components/ui/button";

export default function PromoCardDemo() {
  const [isCardVisible, setIsCardVisible] = useState(true);

  // Handlers for the card actions
  const handleGetStarted = () => {
    alert("Get Started button clicked!");
    setIsCardVisible(false);
  };

  const handleClose = () => {
    setIsCardVisible(false);
  };

  const handleShowCard = () => {
    setIsCardVisible(true);
  };

  return (
    <div className="flex min-h-[450px] w-full flex-col items-center justify-center gap-4 bg-background p-4">
      <AnimatePresence>
        {isCardVisible && (
          <PromoCard
            label="Join VeloMark Pro!"
            title={<>Ready to boost <br /> your performance?</>}
            buttonText="Get Started"
            onButtonClick={handleGetStarted}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {!isCardVisible && (
        <Button onClick={handleShowCard}>Show Promo Card</Button>
      )}
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-9.tsx
import * as React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

interface PromoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  title: React.ReactNode;
  buttonText: string;
  buttonVariant?: ButtonProps["variant"];
  onButtonClick: () => void;
  onClose: () => void;
  showLoader?: boolean;
}

const PromoCard = React.forwardRef<HTMLDivElement, PromoCardProps>(
  (
    {
      className,
      label,
      title,
      buttonText,
      buttonVariant = "secondary",
      onButtonClick,
      onClose,
      showLoader = true,
      ...props
    },
    ref
  ) => {
    // CSS keyframes for the loader animation are embedded here.
    const keyframes = `
      @keyframes promo-card-loader-pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
    `;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg",
          className
        )}
        aria-labelledby="promo-card-title"
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <style>{keyframes}</style>

        {/* SVG filter for the grainy texture. It's visually hidden but applied via CSS. */}
        <svg
          className="pointer-events-none absolute -z-10 h-0 w-0"
          aria-hidden="true"
        >
          <filter id="grainy">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </svg>

        {/* Grainy texture overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{ filter: "url(#grainy)" }}
        />

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-20 h-8 w-8 rounded-full"
          onClick={onClose}
          aria-label="Close promotion"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative z-10 flex h-full flex-col p-8">
          {/* Animated Loader */}
          {showLoader && (
            <div className="absolute left-6 top-6 flex items-center space-x-1">
              <span
                className="h-1.5 w-4 rounded-full bg-muted-foreground"
                style={{ animation: `promo-card-loader-pulse 1.5s infinite` }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                style={{ animation: `promo-card-loader-pulse 1.5s infinite 0.2s` }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                style={{ animation: `promo-card-loader-pulse 1.5s infinite 0.4s` }}
              />
            </div>
          )}

          <div className="mt-8 flex-grow">
            <p className="mb-2 text-sm font-medium text-muted-foreground">{label}</p>
            <h2
              id="promo-card-title"
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              {title}
            </h2>
          </div>

          <div className="mt-8 flex-shrink-0">
            <Button
              className="w-full sm:w-auto"
              size="lg"
              variant={buttonVariant}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
);

PromoCard.displayName = "PromoCard";

export { PromoCard };
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
