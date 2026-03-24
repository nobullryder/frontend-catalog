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
card-4.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the structure for each stat to be displayed
interface Stat {
  label: string;
  value: string | number;
}

// Define the props for the PropertyCard component
export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL of the property image. */
  imageUrl: string;
  /** An accessible label for the image. */
  imageAlt?: string;
  /** The main title or name of the property. */
  title: string;
  /** The price of the property. */
  price: number;
  /** The pricing period, e.g., "per night". */
  pricePeriod?: string;
  /** A short description of the property. */
  description: string;
  /** An array of stats to display, like rating, days, etc. */
  stats: Stat[];
  /** The label for the main action button. */
  actionLabel: string;
  /** The function to call when the action button is clicked. */
  onActionClick?: () => void;
}

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      title,
      price,
      pricePeriod = "per night",
      description,
      stats,
      actionLabel,
      onActionClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex max-w-sm flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Property Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mt-1 text-lg font-semibold text-foreground">
              ${price} <span className="text-sm font-normal text-muted-foreground">{pricePeriod}</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Stats Section */}
          <div className="my-6 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg bg-muted p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button onClick={onActionClick} className="w-full">
            {actionLabel}
          </Button>
        </div>
      </div>
    );
  }
);
PropertyCard.displayName = "PropertyCard";

export { PropertyCard };

code.demo.1757403639137.tsx
import { PropertyCard } from "@/components/ui/card-4";

export default function PropertyCardDemo() {
  const handleReserveClick = () => {
    // In a real app, this would handle the reservation logic
    alert("Reserve button clicked!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <PropertyCard
        imageUrl="https://plus.unsplash.com/premium_photo-1661340695541-ee1ca7efedd0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1aWxkaW5nfGVufDB8fDB8fHww"
        imageAlt="Modern wooden cabin in a grassy, mountainous landscape"
        title="Iceland Cabin"
        price={680}
        pricePeriod="per night"
        description="Cozy cabin nestled in Iceland's breathtaking landscape, offering stunning views of mountains and Northern Lights."
        stats={[
          { label: "Days", value: 3 },
          { label: "Rating", value: "4.9" },
        ]}
        actionLabel="Reserve"
        onActionClick={handleReserveClick}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-4.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the structure for each stat to be displayed
interface Stat {
  label: string;
  value: string | number;
}

// Define the props for the PropertyCard component
export interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The URL of the property image. */
  imageUrl: string;
  /** An accessible label for the image. */
  imageAlt?: string;
  /** The main title or name of the property. */
  title: string;
  /** The price of the property. */
  price: number;
  /** The pricing period, e.g., "per night". */
  pricePeriod?: string;
  /** A short description of the property. */
  description: string;
  /** An array of stats to display, like rating, days, etc. */
  stats: Stat[];
  /** The label for the main action button. */
  actionLabel: string;
  /** The function to call when the action button is clicked. */
  onActionClick?: () => void;
}

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      title,
      price,
      pricePeriod = "per night",
      description,
      stats,
      actionLabel,
      onActionClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex max-w-sm flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {/* Property Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mt-1 text-lg font-semibold text-foreground">
              ${price} <span className="text-sm font-normal text-muted-foreground">{pricePeriod}</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Stats Section */}
          <div className="my-6 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-lg bg-muted p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Button onClick={onActionClick} className="w-full">
            {actionLabel}
          </Button>
        </div>
      </div>
    );
  }
);
PropertyCard.displayName = "PropertyCard";

export { PropertyCard };
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
