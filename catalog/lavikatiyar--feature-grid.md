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
feature-grid.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn/ui
import { ArrowRight } from "lucide-react";

// Interface for a single feature item
export interface Feature {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
}

// Interface for the component props
export interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <a
    href={feature.href}
    className={cn(
      "group", // Group for hover effects
      "flex flex-col sm:flex-row items-start gap-6",
      "p-6 rounded-lg border",
      "bg-card text-card-foreground",
      "transition-all duration-300",
      "hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    )}
  >
    {/* Image */}
    <div className="flex-shrink-0">
      <img 
        src={feature.imageSrc} 
        alt={feature.imageAlt}
        className="h-24 w-24 object-contain"
      />
    </div>
    
    {/* Text Content & Arrow */}
    <div className="flex flex-1 flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {feature.description}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <ArrowRight 
          className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" 
        />
      </div>
    </div>
  </a>
);

const FeatureGrid = React.forwardRef<
  HTMLDivElement,
  FeatureGridProps
>(({ features, className }, ref) => {
  if (!features || features.length === 0) {
    return null; // Don't render anything if there are no features
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-2", // Responsive grid layout
        className
      )}
    >
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
});
FeatureGrid.displayName = "FeatureGrid";

export { FeatureGrid };

code.demo.1759326335397.tsx
import { FeatureGrid, type Feature } from "@/components/ui/feature-grid";

// Data for the feature grid, mimicking the provided image
const platformFeatures: Feature[] = [
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-OVVSrD4GRutENdVA3QzYLe5KXwBWVq.png&w=320&q=75",
    imageAlt: "Meal programs icon",
    title: "Meal programs",
    description: "Create weekly or monthly meal stipends for your employees, who can then order on Uber Eats. It's easy to set restrictions for time of day, location, and meal budget.",
    href: "#",
  },
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-N7V0aMs36OlOl3QUJEzHT6diM5hJ6Z.png&w=320&q=75",
    imageAlt: "Meal planning icon",
    title: "Meal planning",
    description: "Put in-office meals on autopilot for your whole team. Use the meal planning feature on UberEats.com to schedule recurring group orders and have your employees add their favorite options.",
    href: "#",
  },
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ptreaSKDFQqhY7oF7Qw6s18YOwh68e.png&w=320&q=75",
    imageAlt: "Gift cards icon",
    title: "Gift cards",
    description: "Show your appreciation for clients and employees with Uber gift cards for rides and meals that will never expire.",
    href: "#",
  },
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-l7sGnL4PG73upUHUi2mGVGegEvkNDs.png&w=320&q=75",
    imageAlt: "Vouchers icon",
    title: "Vouchers",
    description: "Cover the cost of a single meal by sending employees or clients a meal voucher to be redeemed on Uber Eats. You only pay for what is used.",
    href: "#",
  },
];


// The demo component that showcases the FeatureGrid
const FeatureGridDemo = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          One platform gives you the control to provide meals in multiple ways
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Whether you want to give employees a monthly meal stipend or cover the cost of a single meal, our flexible suite of solutions has you covered.
        </p>
      </div>
      
      <FeatureGrid features={platformFeatures} />
    </div>
  );
};

export default FeatureGridDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-grid.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn/ui
import { ArrowRight } from "lucide-react";

// Interface for a single feature item
export interface Feature {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
}

// Interface for the component props
export interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <a
    href={feature.href}
    className={cn(
      "group", // Group for hover effects
      "flex flex-col sm:flex-row items-start gap-6",
      "p-6 rounded-lg border",
      "bg-card text-card-foreground",
      "transition-all duration-300",
      "hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    )}
  >
    {/* Image */}
    <div className="flex-shrink-0">
      <img 
        src={feature.imageSrc} 
        alt={feature.imageAlt}
        className="h-24 w-24 object-contain"
      />
    </div>
    
    {/* Text Content & Arrow */}
    <div className="flex flex-1 flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {feature.description}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <ArrowRight 
          className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" 
        />
      </div>
    </div>
  </a>
);

const FeatureGrid = React.forwardRef<
  HTMLDivElement,
  FeatureGridProps
>(({ features, className }, ref) => {
  if (!features || features.length === 0) {
    return null; // Don't render anything if there are no features
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-2", // Responsive grid layout
        className
      )}
    >
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} />
      ))}
    </div>
  );
});
FeatureGrid.displayName = "FeatureGrid";

export { FeatureGrid };
```

Install NPM dependencies:
```bash
class-variance-authority, lucide-react
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
