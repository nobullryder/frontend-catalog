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
cta-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the props interface for the component
interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

// Reusable CtaCard component with a clean, modern layout
const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  ({ className, imageSrc, imageAlt, title, subtitle, description, buttonText, onButtonClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border bg-card text-card-foreground shadow",
          "flex flex-col md:flex-row", // Stacks on mobile, row on desktop
          className
        )}
        {...props}
      >
        {/* Image Section */}
        <div className="md:w-1/3 w-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-56 w-full object-cover md:h-full" // Ensure image covers the area
          />
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col justify-center">
          <div>
            <p className="text-sm font-semibold text-primary">{title}</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">
              {subtitle}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {description}
            </p>
            <div className="mt-6">
              <Button size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CtaCard.displayName = "CtaCard";

export { CtaCard };

code.demo.1760248394205.tsx
import { CtaCard } from "@/components/ui/cta-card"; // Adjust the import path

export default function CtaCardDemo() {
  return (
    <div className="w-full max-w-4xl p-4">
      <CtaCard
        title="Join Us"
        subtitle="Ocean Consulting"
        description="Enrich your expertise and grow your career. The development of both technical and human skills is at the heart of our Group's success."
        buttonText="View Job Openings"
        imageSrc="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        imageAlt="A young professional woman in a yellow shirt, holding books and smiling."
        onButtonClick={() => console.log("Navigating to job openings...")}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cta-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the props interface for the component
interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: React.ReactNode;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

// Reusable CtaCard component with a clean, modern layout
const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  ({ className, imageSrc, imageAlt, title, subtitle, description, buttonText, onButtonClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border bg-card text-card-foreground shadow",
          "flex flex-col md:flex-row", // Stacks on mobile, row on desktop
          className
        )}
        {...props}
      >
        {/* Image Section */}
        <div className="md:w-1/3 w-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-56 w-full object-cover md:h-full" // Ensure image covers the area
          />
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col justify-center">
          <div>
            <p className="text-sm font-semibold text-primary">{title}</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">
              {subtitle}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {description}
            </p>
            <div className="mt-6">
              <Button size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CtaCard.displayName = "CtaCard";

export { CtaCard };
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
