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
testimonial-card-1.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Pilcrow } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the types for the component props for type safety and clarity
interface Testimonial {
  name: string;
  rating: number;
  quote: string;
}

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  companyName?: string;
  overallRating: number;
  totalRatingsText: string;
  title: string;
  features: string[];
  testimonials: Testimonial[];
}

// A small helper component for rendering stars
const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
  <div className={cn("flex items-center gap-0.5", className)}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-5 w-5",
          i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
        )}
      />
    ))}
  </div>
);

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    {
      className,
      logo,
      companyName = "Trustpilot",
      overallRating,
      totalRatingsText,
      title,
      features,
      testimonials,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-lg p-6 sm:p-8 space-y-6",
          className
        )}
        {...props}
      >
        {/* Header Section */}
        <div className="flex items-center gap-3">
          {logo}
          <span className="text-xl font-bold">{companyName}</span>
        </div>

        {/* Overall Rating Section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
             {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-7 w-7 text-green-500 fill-green-500" />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">{totalRatingsText}</p>
        </div>

        {/* Features Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ul className="space-y-2 text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Testimonial Slider Section */}
        <div className="rounded-lg bg-muted p-4 space-y-4 relative overflow-hidden">
           <AnimatePresence mode="wait">
             <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3"
             >
                <StarRating rating={currentTestimonial.rating} />
                <p className="font-semibold text-card-foreground">{currentTestimonial.name}</p>
                <blockquote className="text-sm text-muted-foreground italic leading-relaxed">
                    "{currentTestimonial.quote}"
                </blockquote>
             </motion.div>
           </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handlePrev} aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handleNext} aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4" />
              </Button>
          </div>
        </div>
      </div>
    );
  }
);
TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };

code.demo.1758979887328.tsx
import { TestimonialCard } from "@/components/ui/testimonial-card-1";

// A simple SVG component for the Trustpilot logo to keep the demo self-contained.
const TrustpilotLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.332 8.52227L12.0001 6.33398L5.66816 8.52227L7.02641 15.0163L2 19.6673L8.60458 17.0759L12.0001 22.0004L15.3956 17.0759L22 19.6673L16.9737 15.0163L18.332 8.52227Z" fill="#00B67A"/>
        <path d="M12 2L9.44 8.6L2 11L9.44 13.4L12 20L14.56 13.4L22 11L14.56 8.6L12 2Z" fill="white" transform="translate(-1, -1.5) scale(1.1)"/>
    </svg>
);


// Sample data for the demo
const featuresData = [
  "51K Happy customers",
  "4.4 Avg ratings",
  "6 months money back gurantee!",
  "Unlimited messaging with your provider",
];

const testimonialsData = [
  {
    name: "Laura Shouse",
    rating: 5,
    quote: "When I met Dr. Naji I knew my life was about to change. I have lost over 27 pounds since April of this year. he develops a very specific treatment plan for you that really works.",
  },
  {
    name: "Alex Johnson",
    rating: 5,
    quote: "A seamless experience from start to finish. The results exceeded all my expectations. Highly recommended for anyone looking for quality and reliability.",
  },
  {
    name: "Samantha Lee",
    rating: 4,
    quote: "Great service and a very professional team. They addressed all my concerns promptly. The final product was fantastic, though there was a slight delay.",
  },
];


export default function TestimonialCardDemo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center bg-background p-4">
      <TestimonialCard
        logo={<TrustpilotLogo />}
        overallRating={4.4}
        totalRatingsText="4.4 Ratings"
        title="Join thousands of happy customers"
        features={featuresData}
        testimonials={testimonialsData}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/testimonial-card-1.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Pilcrow } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the types for the component props for type safety and clarity
interface Testimonial {
  name: string;
  rating: number;
  quote: string;
}

interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  companyName?: string;
  overallRating: number;
  totalRatingsText: string;
  title: string;
  features: string[];
  testimonials: Testimonial[];
}

// A small helper component for rendering stars
const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
  <div className={cn("flex items-center gap-0.5", className)}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-5 w-5",
          i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
        )}
      />
    ))}
  </div>
);

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    {
      className,
      logo,
      companyName = "Trustpilot",
      overallRating,
      totalRatingsText,
      title,
      features,
      testimonials,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-lg p-6 sm:p-8 space-y-6",
          className
        )}
        {...props}
      >
        {/* Header Section */}
        <div className="flex items-center gap-3">
          {logo}
          <span className="text-xl font-bold">{companyName}</span>
        </div>

        {/* Overall Rating Section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
             {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-7 w-7 text-green-500 fill-green-500" />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">{totalRatingsText}</p>
        </div>

        {/* Features Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ul className="space-y-2 text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Testimonial Slider Section */}
        <div className="rounded-lg bg-muted p-4 space-y-4 relative overflow-hidden">
           <AnimatePresence mode="wait">
             <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3"
             >
                <StarRating rating={currentTestimonial.rating} />
                <p className="font-semibold text-card-foreground">{currentTestimonial.name}</p>
                <blockquote className="text-sm text-muted-foreground italic leading-relaxed">
                    "{currentTestimonial.quote}"
                </blockquote>
             </motion.div>
           </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handlePrev} aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handleNext} aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4" />
              </Button>
          </div>
        </div>
      </div>
    );
  }
);
TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };
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
