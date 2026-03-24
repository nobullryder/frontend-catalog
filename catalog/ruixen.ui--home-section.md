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
home-section.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

interface CardItem {
  src?: string;
  alt?: string;
}

interface HomeSectionProps {
  category?: string;
  title?: string;
  subtitle?: string;
  cards?: CardItem[];
}

export default function HomeSection({
  category = "Innovation Meets Simplicity",
  title = "Build Exceptional Interfaces",
  subtitle = "Use our component library powered by Shadcn UI & Tailwind CSS to craft beautiful, fast, and accessible UIs.",
  cards = [],
}: HomeSectionProps) {
  const totalCards = cards.length || 5;
  const placeholders = Array.from({ length: totalCards }).map(() => ({
    src: undefined,
    alt: "",
  }));

  const data = cards.length > 0 ? cards : placeholders;
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const animateCards = () => {
    const middleIndex = Math.floor(data.length / 2);

    // Initial state
    gsap.set(cardRefs.current, { x: 0, scale: 0.5, opacity: 0, transformOrigin: "center bottom" });

    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });

    // Step 1 → Center card
    tl.to(cardRefs.current[middleIndex], {
      x: 0,
      scale: 1,
      opacity: 1,
    });

    // Step 2+ → Left & Right pairs together
    for (let offset = 1; offset <= middleIndex; offset++) {
      const leftIndex = middleIndex - offset;
      const rightIndex = middleIndex + offset;

      const animations: gsap.TweenTarget[] = [];
      if (leftIndex >= 0) animations.push(cardRefs.current[leftIndex]);
      if (rightIndex < data.length) animations.push(cardRefs.current[rightIndex]);

      tl.to(
        animations,
        {
          x: (i, target) => {
            const idx = cardRefs.current.indexOf(target as HTMLDivElement);
            return (idx - middleIndex) * 120;
          },
          scale: (i, target) => {
            const idx = cardRefs.current.indexOf(target as HTMLDivElement);
            return 1 - Math.abs(idx - middleIndex) * 0.1;
          },
          opacity: 1,
        },
        "+=0.1"
      );
    }
  };

  useEffect(() => {
    animateCards();
  }, [activeIndex]);

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-5">
        {/* Category Button */}
        <Button className="text-sm font-medium shadow-none text-white dark:text-white transition-colors duration-300 group relative inline-flex h-9 animate-rainbow cursor-pointer items-center justify-center rounded-3xl border-0 bg-[length:200%] px-4 transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]">
          {category}
        </Button>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {title}
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          {subtitle}
        </p>

        {/* Cards Row */}
        <div className="flex justify-center items-center relative h-[30vw] min-h-[15rem]">
          {data.map((card, idx) => {
            const middleIndex = Math.floor(data.length / 2);
            const distance = Math.abs(idx - middleIndex);

            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="absolute"
                style={{
                  zIndex: data.length - distance,
                }}
              >
                <Card className="w-[90vw] sm:w-80 md:w-[50vw] h-60 sm:h-64 md:h-[30vw] bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300 border-4 dark:border-gray-700">
                  <CardContent className="flex items-center justify-center p-0 h-full">
                   {card.src && <Image
                      src={card.src}
                      alt={card.alt || `Card ${idx + 1}`}
                      fill
                      className="object-cover"
                    />}
                  </CardContent>
                </Card>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


code.demo.1754635773267.tsx
import HomeSection from "@/components/ui/home-section";

export default function DemoOne() {
  // const exampleCards = [
  //   { src: "https://ruixen.com/ruixen-website.png", alt: "UI Kit" },
  //   { src: "https://ruixen.com/ruixen-website.png", alt: "Dashboard" },
  //   { src: "https://ruixen.com/ruixen-website.png", alt: "Forms" },
  //   { src: "https://ruixen.com/ruixen-website.png", alt: "Charts" },
  //   { src: "https://ruixen.com/ruixen-website.png", alt: "Components" },
  // ];

  return (
    <main>
      <HomeSection
        // category="Innovation Meets Simplicity"
        // title="Build Exceptional Interfaces"
        // subtitle="Use our component library powered by Shadcn UI & Tailwind CSS to craft beautiful, fast, and accessible UIs."
        // cards={exampleCards}
      />
    </main>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/home-section.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

interface CardItem {
  src?: string;
  alt?: string;
}

interface HomeSectionProps {
  category?: string;
  title?: string;
  subtitle?: string;
  cards?: CardItem[];
}

export default function HomeSection({
  category = "Innovation Meets Simplicity",
  title = "Build Exceptional Interfaces",
  subtitle = "Use our component library powered by Shadcn UI & Tailwind CSS to craft beautiful, fast, and accessible UIs.",
  cards = [],
}: HomeSectionProps) {
  const totalCards = cards.length || 5;
  const placeholders = Array.from({ length: totalCards }).map(() => ({
    src: undefined,
    alt: "",
  }));

  const data = cards.length > 0 ? cards : placeholders;
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const animateCards = () => {
    const middleIndex = Math.floor(data.length / 2);

    // Initial state
    gsap.set(cardRefs.current, { x: 0, scale: 0.5, opacity: 0, transformOrigin: "center bottom" });

    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });

    // Step 1 → Center card
    tl.to(cardRefs.current[middleIndex], {
      x: 0,
      scale: 1,
      opacity: 1,
    });

    // Step 2+ → Left & Right pairs together
    for (let offset = 1; offset <= middleIndex; offset++) {
      const leftIndex = middleIndex - offset;
      const rightIndex = middleIndex + offset;

      const animations: gsap.TweenTarget[] = [];
      if (leftIndex >= 0) animations.push(cardRefs.current[leftIndex]);
      if (rightIndex < data.length) animations.push(cardRefs.current[rightIndex]);

      tl.to(
        animations,
        {
          x: (i, target) => {
            const idx = cardRefs.current.indexOf(target as HTMLDivElement);
            return (idx - middleIndex) * 120;
          },
          scale: (i, target) => {
            const idx = cardRefs.current.indexOf(target as HTMLDivElement);
            return 1 - Math.abs(idx - middleIndex) * 0.1;
          },
          opacity: 1,
        },
        "+=0.1"
      );
    }
  };

  useEffect(() => {
    animateCards();
  }, [activeIndex]);

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-5">
        {/* Category Button */}
        <Button className="text-sm font-medium shadow-none text-white dark:text-white transition-colors duration-300 group relative inline-flex h-9 animate-rainbow cursor-pointer items-center justify-center rounded-3xl border-0 bg-[length:200%] px-4 transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]">
          {category}
        </Button>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          {title}
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          {subtitle}
        </p>

        {/* Cards Row */}
        <div className="flex justify-center items-center relative h-[30vw] min-h-[15rem]">
          {data.map((card, idx) => {
            const middleIndex = Math.floor(data.length / 2);
            const distance = Math.abs(idx - middleIndex);

            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="absolute"
                style={{
                  zIndex: data.length - distance,
                }}
              >
                <Card className="w-[90vw] sm:w-80 md:w-[50vw] h-60 sm:h-64 md:h-[30vw] bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300 border-4 dark:border-gray-700">
                  <CardContent className="flex items-center justify-center p-0 h-full">
                   {card.src && <Image
                      src={card.src}
                      alt={card.alt || `Card ${idx + 1}`}
                      fill
                      className="object-cover"
                    />}
                  </CardContent>
                </Card>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

```

Install NPM dependencies:
```bash
gsap, next
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
