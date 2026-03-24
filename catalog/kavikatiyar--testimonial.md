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
testimonial.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Define the shape of a single testimonial
export interface Testimonial {
  type: "user" | "quote";
  quote: string;
  name?: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

// Define props for the main section component
interface TestimonialSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  testimonials: Testimonial[];
}

const QuoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="36"
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.9951 36C12.4951 36 10.2285 35.0167 8.19513 33.05C6.1618 31.0833 5.14513 28.8333 5.14513 26.3C5.14513 22.8 6.2118 19.4833 8.34513 16.35C10.4785 13.2167 13.2285 10.1 16.5951 7L21.4951 11.25C19.3618 13.1333 17.6785 14.8833 16.4451 16.5C15.2118 18.1167 14.5951 19.9833 14.5951 22.1H19.9951V36H14.9951ZM37.9951 36C35.4951 36 33.2285 35.0167 31.1951 33.05C29.1618 31.0833 28.1451 28.8333 28.1451 26.3C28.1451 22.8 29.2118 19.4833 31.3451 16.35C33.4785 13.2167 36.2285 10.1 39.5951 7L44.4951 11.25C42.3618 13.1333 40.6785 14.8833 39.4451 16.5C38.2118 18.1167 37.5951 19.9833 37.5951 22.1H42.9951V36H37.9951Z"
      fill="currentColor"
    />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const isQuoteType = testimonial.type === 'quote';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Card
        className={cn(
          "h-full w-full transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
           // Different styling for the central quote card
          isQuoteType && "flex flex-col items-center justify-center bg-transparent shadow-none border-none text-center"
        )}
      >
        <CardContent className="flex flex-col items-start gap-4 p-6 h-full">
          {isQuoteType ? (
            <>
              <QuoteIcon className="h-9 w-12 text-muted-foreground/50" />
              <p className="text-xl font-medium leading-relaxed">
                "{testimonial.quote}"
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">"{testimonial.quote}"</p>
              <div className="flex flex-row items-center gap-4 mt-auto">
                <Avatar>
                  <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};


const TestimonialSection = React.forwardRef<
  HTMLElement,
  TestimonialSectionProps
>(({ title, testimonials, className, ...props }, ref) => {
  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={ref}
      className={cn("container mx-auto py-12 md:py-24", className)}
      {...props}
    >
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">{title}</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        {testimonials.map((testimonial, index) => {
          // Add a special class for the middle item on large screens
          const isMiddleItem = index === Math.floor(testimonials.length / 2);
          return (
            <div key={index} className={cn(isMiddleItem && "md:col-span-2 lg:col-span-1")}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
});

TestimonialSection.displayName = "TestimonialSection";

export { TestimonialSection };

code.demo.1760507060168.tsx
import { TestimonialSection, Testimonial } from "@/components/ui/testimonial";

const testimonialsData: Testimonial[] = [
  {
    type: "user",
    quote: "I was self-employed for 13 years and I'd never really done any interviews. Using interview Warmup I learned how to answer questions in a much more professional way. It's been a big confidence boost.",
    name: "Le'mont C.",
    role: "Google Career Certificate graduate",
    avatarSrc: "https://i.pravatar.cc/150?u=lemont",
    avatarFallback: "LC",
  },
  {
    type: "quote",
    quote: "I feel much more confident in my ability to leverage generative AI tools effectively and responsibly. The hands-on activities and real-world examples were particularly helpful in solidifying my understanding.",
    name: "Susan R.", // Name and role are optional for quote type
    role: "Google Prompting Essentials graduate",
  },
  {
    type: "user",
    quote: "The AI Essentials course was instrumental in equipping me with a strong foundation in leveraging AI for daily tasks. I've achieved a dramatic improvement in my daily efficiency, freeing up time for more strategic tasks.",
    name: "Christian W.",
    role: "Google AI Essentials graduate",
    avatarSrc: "https://i.pravatar.cc/150?u=christian",
    avatarFallback: "CW",
  },
];

export default function TestimonialSectionDemo() {
  return (
    <div className="w-full bg-background">
      <TestimonialSection
        title="Empowering more people with AI"
        testimonials={testimonialsData}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/testimonial.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Define the shape of a single testimonial
export interface Testimonial {
  type: "user" | "quote";
  quote: string;
  name?: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

// Define props for the main section component
interface TestimonialSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  testimonials: Testimonial[];
}

const QuoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="36"
    viewBox="0 0 48 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.9951 36C12.4951 36 10.2285 35.0167 8.19513 33.05C6.1618 31.0833 5.14513 28.8333 5.14513 26.3C5.14513 22.8 6.2118 19.4833 8.34513 16.35C10.4785 13.2167 13.2285 10.1 16.5951 7L21.4951 11.25C19.3618 13.1333 17.6785 14.8833 16.4451 16.5C15.2118 18.1167 14.5951 19.9833 14.5951 22.1H19.9951V36H14.9951ZM37.9951 36C35.4951 36 33.2285 35.0167 31.1951 33.05C29.1618 31.0833 28.1451 28.8333 28.1451 26.3C28.1451 22.8 29.2118 19.4833 31.3451 16.35C33.4785 13.2167 36.2285 10.1 39.5951 7L44.4951 11.25C42.3618 13.1333 40.6785 14.8833 39.4451 16.5C38.2118 18.1167 37.5951 19.9833 37.5951 22.1H42.9951V36H37.9951Z"
      fill="currentColor"
    />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const isQuoteType = testimonial.type === 'quote';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Card
        className={cn(
          "h-full w-full transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
           // Different styling for the central quote card
          isQuoteType && "flex flex-col items-center justify-center bg-transparent shadow-none border-none text-center"
        )}
      >
        <CardContent className="flex flex-col items-start gap-4 p-6 h-full">
          {isQuoteType ? (
            <>
              <QuoteIcon className="h-9 w-12 text-muted-foreground/50" />
              <p className="text-xl font-medium leading-relaxed">
                "{testimonial.quote}"
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">"{testimonial.quote}"</p>
              <div className="flex flex-row items-center gap-4 mt-auto">
                <Avatar>
                  <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};


const TestimonialSection = React.forwardRef<
  HTMLElement,
  TestimonialSectionProps
>(({ title, testimonials, className, ...props }, ref) => {
  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={ref}
      className={cn("container mx-auto py-12 md:py-24", className)}
      {...props}
    >
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">{title}</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        {testimonials.map((testimonial, index) => {
          // Add a special class for the middle item on large screens
          const isMiddleItem = index === Math.floor(testimonials.length / 2);
          return (
            <div key={index} className={cn(isMiddleItem && "md:col-span-2 lg:col-span-1")}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
});

TestimonialSection.displayName = "TestimonialSection";

export { TestimonialSection };
```

Install NPM dependencies:
```bash
class-variance-authority, framer-motion
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
