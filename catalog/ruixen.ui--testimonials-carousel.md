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
testimonials-carousel.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  highlight?: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number; // Duration in seconds for one full scroll
  direction?: "left" | "right"; // Scroll direction
  cardHeight?: number; // Height of the testimonial card
  className?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  speed = 20,
  direction = "left",
  cardHeight = 200,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setCarouselWidth(containerRef.current.scrollWidth / 2);
    }
  }, [testimonials]);

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden w-full ${className}`} ref={containerRef}>
      <motion.div
        animate={{
          x:
            direction === "left"
              ? [0, -carouselWidth]
              : [-carouselWidth, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6"
      >
        {loopTestimonials.map(({ text, highlight, image, name, role }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`bg-white dark:bg-black my-3 border-2 shadow-md rounded-3xl p-4 shadow-lg flex-shrink-0 w-[320px]`}
            style={{ height: cardHeight }}
          >
            <p className="text-sm leading-relaxed text-justify break-words whitespace-normal overflow-hidden">
              {highlight
                ? text.split(highlight).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx !== arr.length - 1 && (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))
                : text}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <img
                src={image}
                alt={name}
                width={50}
                height={50}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="font-medium leading-tight">{name}</div>
                <div className="opacity-60 text-sm">{role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};


code.demo.1760127477301.tsx
"use client";

import React from "react";
import { TestimonialsCarousel, Testimonial } from "@/components/ui/testimonials-carousel";

const testimonials: Testimonial[] = [
  {
    text: "The collaboration tools completely changed how our teams work together efficiently. Our productivity has doubled, and communication between departments is seamless. The intuitive interface makes effortless.",
    highlight: "collaboration tools",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    name: "Priya Kapoor",
    role: "Team Lead",
  },
  {
    text: "Real-time reporting has made our management decisions much faster and accurate. The dashboard allows managers to get insights instantly, enabling proactive decisions and reducing errors.",
    highlight: "Real-time reporting",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Rohit Verma",
    role: "Operations Manager",
  },
  {
    text: "Customer engagement features allowed us to reach our clients better than ever. Automated notifications, feedback collection, and analytics have improved retention and satisfaction.",
    highlight: "Customer engagement features",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    name: "Anjali Mehta",
    role: "Marketing Head",
  },
  {
    text: "The automation workflow reduced repetitive tasks and improved productivity. Employees now spend more time on value-added work, which has improved our bottom line.",
    highlight: "automation workflow",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    name: "Siddharth Rao",
    role: "IT Specialist",
  },
  {
    text: "The AI analytics insights are invaluable for planning our next steps. Forecasting trends, predicting customer behavior, and analyzing sales data have never been easier.",
    highlight: "AI analytics insights",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    name: "Nisha Sharma",
    role: "Data Analyst",
  },
];

const TestimonialsDemoPage = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold">What Our Clients Say</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Testimonials from companies using our platform to boost productivity.
        </p>
      </div>

      <div className="mt-10 px-6 space-y-6">
        <TestimonialsCarousel
          testimonials={testimonials}
          speed={25}
          direction="left"
          cardHeight={200}
        />
        <TestimonialsCarousel
          testimonials={testimonials}
          speed={30}
          direction="right"
          cardHeight={200}
        />
      </div>
    </section>
  );
};

export default TestimonialsDemoPage;

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/testimonials-carousel.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  highlight?: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number; // Duration in seconds for one full scroll
  direction?: "left" | "right"; // Scroll direction
  cardHeight?: number; // Height of the testimonial card
  className?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  speed = 20,
  direction = "left",
  cardHeight = 200,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setCarouselWidth(containerRef.current.scrollWidth / 2);
    }
  }, [testimonials]);

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden w-full ${className}`} ref={containerRef}>
      <motion.div
        animate={{
          x:
            direction === "left"
              ? [0, -carouselWidth]
              : [-carouselWidth, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6"
      >
        {loopTestimonials.map(({ text, highlight, image, name, role }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`bg-white dark:bg-black my-3 border-2 shadow-md rounded-3xl p-4 shadow-lg flex-shrink-0 w-[320px]`}
            style={{ height: cardHeight }}
          >
            <p className="text-sm leading-relaxed text-justify break-words whitespace-normal overflow-hidden">
              {highlight
                ? text.split(highlight).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx !== arr.length - 1 && (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))
                : text}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <img
                src={image}
                alt={name}
                width={50}
                height={50}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="font-medium leading-tight">{name}</div>
                <div className="opacity-60 text-sm">{role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

```

Install NPM dependencies:
```bash
motion
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
