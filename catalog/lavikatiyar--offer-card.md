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
offer-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn/ui
import { cva, type VariantProps } from "class-variance-authority";

// Define variants for the card using cva
const cardVariants = cva(
  "group relative flex flex-col justify-end overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "hover:-translate-y-1 hover:scale-[1.02]",
        faded: "", // Special variant for the fade effect
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface OfferCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * The URL for the image to be displayed at the top of the card.
   */
  imageSrc: string;
  /**
   * The main title or category of the offer.
   */
  title: string;
  /**
   * The descriptive text for the offer, such as discount details.
   */
  offerText: string;
  /**
   * The URL the card should link to.
   */
  href: string;
}

const OfferCard = React.forwardRef<HTMLDivElement, OfferCardProps>(
  ({ className, variant, imageSrc, title, offerText, href, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {/* The card is a link */}
        <a href={href} className="absolute inset-0 z-10" aria-label={title}>
          <span className="sr-only">View Details</span>
        </a>

        {/* Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <img
            src={imageSrc}
            alt={`${title} illustration`}
            className="h-40 w-40 object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 mt-32">
          <h3 className="text-lg font-semibold text-card-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm font-medium text-foreground">
            {offerText}
          </p>
        </div>
      </div>
    );
  }
);
OfferCard.displayName = "OfferCard";

export { OfferCard };

code.demo.1758650942647.tsx
import { OfferCard } from "@/components/ui/offer-card"; // Adjust the import path
import { ArrowRight } from "lucide-react"; // or any other icon library

// Data for the offer cards
const offers = [
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-OhOM7JB8YtWyJLwOJU2L3eHHTTWitp.png&w=320&q=75",
    title: "Flights",
    offerText: "FLAT 10% OFF upto ₹1000",
    href: "#flights",
  },
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-lCvW4p3khtoganHdqFzwxmQszzsKjS.png&w=320&q=75",
    title: "Hotels",
    offerText: "FLAT 25% OFF upto ₹2,000",
    href: "#hotels",
  },
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-xOGseOCJFMz0Dokb7Ph4oJyU1fqL5o.png&w=320&q=75",
    title: "Trains",
    offerText: "FLAT ₹50 OFF",
    href: "#trains",
  },
  {
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-jUUd9iY5M09GRL9rsdfb188bh2kEwX.png&w=320&q=75",
    title: "Bus",
    offerText: "FLAT 10% OFF",
    href: "#bus",
  },
];

const OfferCardDemo = () => {
  return (
    <div className="p-4 md:p-8 bg-background">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer, index) =>
          // Special handling for the last card to add the fade and arrow
          index === offers.length - 1 ? (
            <div key={offer.title} className="relative">
              <OfferCard {...offer} variant="faded" />
              {/* Fade overlay and animated arrow for the last card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(to left, hsl(var(--background)) 5%, transparent 40%)",
                }}
              />
              <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 transform">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-md transition-transform duration-300 ease-in-out group-hover:scale-110">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          ) : (
            <OfferCard key={offer.title} {...offer} />
          )
        )}
      </div>
    </div>
  );
};

export default OfferCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/offer-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn/ui
import { cva, type VariantProps } from "class-variance-authority";

// Define variants for the card using cva
const cardVariants = cva(
  "group relative flex flex-col justify-end overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "hover:-translate-y-1 hover:scale-[1.02]",
        faded: "", // Special variant for the fade effect
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface OfferCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * The URL for the image to be displayed at the top of the card.
   */
  imageSrc: string;
  /**
   * The main title or category of the offer.
   */
  title: string;
  /**
   * The descriptive text for the offer, such as discount details.
   */
  offerText: string;
  /**
   * The URL the card should link to.
   */
  href: string;
}

const OfferCard = React.forwardRef<HTMLDivElement, OfferCardProps>(
  ({ className, variant, imageSrc, title, offerText, href, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {/* The card is a link */}
        <a href={href} className="absolute inset-0 z-10" aria-label={title}>
          <span className="sr-only">View Details</span>
        </a>

        {/* Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <img
            src={imageSrc}
            alt={`${title} illustration`}
            className="h-40 w-40 object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 mt-32">
          <h3 className="text-lg font-semibold text-card-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm font-medium text-foreground">
            {offerText}
          </p>
        </div>
      </div>
    );
  }
);
OfferCard.displayName = "OfferCard";

export { OfferCard };
```

Install NPM dependencies:
```bash
class-variance-authority
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
