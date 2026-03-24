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
color-palette.tsx
// components/ui/branding-card.tsx
import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// JSDoc for props documentation
export interface BrandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The main category label displayed at the top. */
  category: string;
  /** The primary title for the branding element. */
  title: string;
  /** The subtitle or specific name (e.g., font name). */
  subtitle: string;
  /** The visual element to display, typically text or an icon. */
  displayElement: React.ReactNode;
  /** An array of color strings (e.g., hex, rgb) for the palette. */
  colors: string[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const swatchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const BrandingCard = React.forwardRef<HTMLDivElement, BrandingCardProps>(
  ({ className, category, title, subtitle, displayElement, colors, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-lg",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        aria-label={`${category}: ${title}`}
        role="group"
        {...props}
      >
        {/* Main content area */}
        <div className="p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {category}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            </div>
            <div className="text-5xl font-bold tracking-tighter">{displayElement}</div>
          </div>
        </div>

        {/* Color palette section */}
        <div className="flex h-24 w-full">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              className="h-full flex-1"
              style={{ backgroundColor: color }}
              variants={swatchVariants}
              aria-label={`Color swatch ${index + 1}: ${color}`}
            />
          ))}
        </div>
      </motion.div>
    );
  }
);

BrandingCard.displayName = "BrandingCard";

export { BrandingCard };

code.demo.1758305127321.tsx
// demo.tsx
import { BrandingCard } from "@/components/ui/color-palette"; // Adjust the import path

const BrandingCardDemo = () => {
  const brandColors = ["#2A2A2A", "#5D4435", "#A5B592", "#F0F0E6"];

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-10">
      <BrandingCard
        category="Branding"
        title="Typography"
        subtitle="SF Pro"
        displayElement={
          <span>
            Aa<span className="text-muted-foreground/50">Bb</span>
          </span>
        }
        colors={brandColors}
      />
    </div>
  );
};

export default BrandingCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/color-palette.tsx
// components/ui/branding-card.tsx
import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn

// JSDoc for props documentation
export interface BrandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The main category label displayed at the top. */
  category: string;
  /** The primary title for the branding element. */
  title: string;
  /** The subtitle or specific name (e.g., font name). */
  subtitle: string;
  /** The visual element to display, typically text or an icon. */
  displayElement: React.ReactNode;
  /** An array of color strings (e.g., hex, rgb) for the palette. */
  colors: string[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const swatchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const BrandingCard = React.forwardRef<HTMLDivElement, BrandingCardProps>(
  ({ className, category, title, subtitle, displayElement, colors, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-lg",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        aria-label={`${category}: ${title}`}
        role="group"
        {...props}
      >
        {/* Main content area */}
        <div className="p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {category}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            </div>
            <div className="text-5xl font-bold tracking-tighter">{displayElement}</div>
          </div>
        </div>

        {/* Color palette section */}
        <div className="flex h-24 w-full">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              className="h-full flex-1"
              style={{ backgroundColor: color }}
              variants={swatchVariants}
              aria-label={`Color swatch ${index + 1}: ${color}`}
            />
          ))}
        </div>
      </motion.div>
    );
  }
);

BrandingCard.displayName = "BrandingCard";

export { BrandingCard };
```

Install NPM dependencies:
```bash
framer-motion
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
