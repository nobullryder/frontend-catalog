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
hero-modern.tsx
// app/components/HeroWithCraft.tsx
"use client";

// React and Next.js imports
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";
import { ArrowRight } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Local component imports that remain external
import { Button } from "@/components/ui/button";

const Placeholder =
  "https://components.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplaceholder.1700a83e.jpg&w=3840&q=75";


/* ---------------------------------- utils --------------------------------- */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* --------------------------------- types ---------------------------------- */

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

type MainProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type ArticleProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  dangerouslySetInnerHTML?: { __html: string };
};

type BoxProps = {
  children: React.ReactNode;
  className?: string;
  direction?:
    | "row"
    | "col"
    | {
        sm?: "row" | "col";
        md?: "row" | "col";
        lg?: "row" | "col";
        xl?: "row" | "col";
        "2xl"?: "row" | "col";
      };
  wrap?:
    | boolean
    | {
        sm?: boolean;
        md?: boolean;
        lg?: boolean;
        xl?: boolean;
        "2xl"?: boolean;
      };
  gap?:
    | number
    | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
  cols?:
    | number
    | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
  rows?:
    | number
    | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
};

/* ------------------------------- craft-ds UI ------------------------------ */

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth antialiased focus:scroll-auto", className)}
    >
      {children}
    </html>
  );
};

export const Main = ({ children, className, id }: MainProps) => {
  return (
    <main
      className={cn(
        "max-w-none prose-p:m-0",
        "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
        "prose-headings:font-normal",
        "prose-strong:font-semibold",
        "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        "prose-blockquote:not-italic",
        "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
        className
      )}
      id={id}
    >
      {children}
    </main>
  );
};

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section className={cn("py-8 md:py-12", className)} id={id}>
      {children}
    </section>
  );
};

export const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-5xl", "p-6 sm:p-8", className)} id={id}>
      {children}
    </div>
  );
};

export const Article = ({
  children,
  className,
  id,
  dangerouslySetInnerHTML,
}: ArticleProps) => {
  return (
    <article
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={cn(
        "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
        "prose-headings:font-normal",
        "prose-p:mb-0",
        "prose-strong:font-semibold",
        "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        "prose-blockquote:not-italic",
        "prose-pre:border prose-pre:bg-muted/25",
        className
      )}
      id={id}
    >
      {children}
    </article>
  );
};

export const Box = ({
  children,
  className,
  direction = "row",
  wrap = false,
  gap = 0,
  cols,
  rows,
}: BoxProps) => {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
  };

  const wrapClasses = wrap ? "flex-wrap" : "flex-nowrap";

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  const getResponsiveClasses = (
    prop: any,
    classMap: Record<string | number, string>
  ) => {
    if (typeof prop === "object") {
      return Object.entries(prop)
        .map(([breakpoint, value]) => {
          const prefix = breakpoint === "sm" ? "" : `${breakpoint}:`;
          return `${prefix}${classMap[value as keyof typeof classMap] || ""}`;
        })
        .join(" ");
    }
    return classMap[prop as keyof typeof classMap] || "";
  };

  const stackClasses = cn(
    cols || rows ? "grid" : "flex",
    getResponsiveClasses(direction, directionClasses),
    typeof wrap === "boolean"
      ? wrapClasses
      : getResponsiveClasses(wrap, { true: "flex-wrap", false: "flex-nowrap" }),
    getResponsiveClasses(gap, gapClasses),
    cols && getResponsiveClasses(cols, colsClasses),
    rows && getResponsiveClasses(rows, colsClasses),
    className
  );

  return <div className={stackClasses}>{children}</div>;
};

/* ---------------------------------- Hero ---------------------------------- */

const Hero = () => {
  return (
    <Section>
      <Container>
        <div>
          <Button asChild className="mb-6 w-fit" size="sm" variant="outline">
            <Link className="not-prose" href="https://9d8.dev">
              Lorem ipsum dolor sit amet <ArrowRight className="w-4" />
            </Link>
          </Button>

          <h1>
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h1>

          <h3 className="text-muted-foreground">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Balancer>
          </h3>

          <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;

/* craft-ds, v0.2.8 (merged into single file) */


code.demo.1757991712685.tsx
// app/components/Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const Placeholder = 'https://components.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplaceholder.1700a83e.jpg&w=3840&q=75'

/* ===== craft-ds (v0.2.8, merged) ===== */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LayoutProps = { children: React.ReactNode; className?: string };
type MainProps = { children: React.ReactNode; className?: string; id?: string };
type SectionProps = { children: React.ReactNode; className?: string; id?: string };
type ContainerProps = { children: React.ReactNode; className?: string; id?: string };
type ArticleProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  dangerouslySetInnerHTML?: { __html: string };
};
type BoxProps = {
  children: React.ReactNode;
  className?: string;
  direction?:
    | "row"
    | "col"
    | { sm?: "row" | "col"; md?: "row" | "col"; lg?: "row" | "col"; xl?: "row" | "col"; "2xl"?: "row" | "col" };
  wrap?:
    | boolean
    | { sm?: boolean; md?: boolean; lg?: boolean; xl?: boolean; "2xl"?: boolean };
  gap?: number | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
  rows?: number | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
};

export const Layout = ({ children, className }: LayoutProps) => (
  <html lang="en" suppressHydrationWarning className={cn("scroll-smooth antialiased focus:scroll-auto", className)}>
    {children}
  </html>
);

export const Main = ({ children, className, id }: MainProps) => (
  <main
    className={cn(
      "max-w-none prose-p:m-0",
      "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
      "prose-headings:font-normal",
      "prose-strong:font-semibold",
      "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
      "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
      "prose-blockquote:not-italic",
      "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
      className
    )}
    id={id}
  >
    {children}
  </main>
);

export const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn("py-8 md:py-12", className)} id={id}>
    {children}
  </section>
);

export const Container = ({ children, className, id }: ContainerProps) => (
  <div className={cn("mx-auto max-w-5xl", "p-6 sm:p-8", className)} id={id}>
    {children}
  </div>
);

export const Article = ({ children, className, id, dangerouslySetInnerHTML }: ArticleProps) => (
  <article
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    className={cn(
      "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
      "prose-headings:font-normal",
      "prose-p:mb-0",
      "prose-strong:font-semibold",
      "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
      "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
      "prose-blockquote:not-italic",
      "prose-pre:border prose-pre:bg-muted/25",
      className
    )}
    id={id}
  >
    {children}
  </article>
);

export const Box = ({ children, className, direction = "row", wrap = false, gap = 0, cols, rows }: BoxProps) => {
  const directionClasses = { row: "flex-row", col: "flex-col" } as const;
  const wrapClasses = wrap ? "flex-wrap" : "flex-nowrap";
  const gapClasses = { 0: "gap-0", 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 5: "gap-5", 6: "gap-6", 8: "gap-8", 10: "gap-10", 12: "gap-12" };
  const colsClasses = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6", 7: "grid-cols-7", 8: "grid-cols-8", 9: "grid-cols-9", 10: "grid-cols-10", 11: "grid-cols-11", 12: "grid-cols-12" };

  const getResp = (prop: any, map: Record<string | number, string>) =>
    typeof prop === "object"
      ? Object.entries(prop)
          .map(([bp, val]) => `${bp === "sm" ? "" : `${bp}:`}${map[val as keyof typeof map] || ""}`)
          .join(" ")
      : map[prop as keyof typeof map] || "";

  const stack = cn(
    cols || rows ? "grid" : "flex",
    getResp(direction, directionClasses),
    typeof wrap === "boolean" ? wrapClasses : getResp(wrap, { true: "flex-wrap", false: "flex-nowrap" } as any),
    getResp(gap, gapClasses),
    cols && getResp(cols, colsClasses),
    rows && getResp(rows, colsClasses),
    className
  );

  return <div className={stack}>{children}</div>;
};

/* ============ Hero ============ */

export default function Hero() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center text-center">
          <Button
            asChild
            className="not-prose mb-6 flex w-fit"
            size="sm"
            variant="outline"
          >
            <Link href="https://9d8.dev">
              Lorem ipsum dolor sit amet <ArrowRight className="ml-2 w-4" />
            </Link>
          </Button>
          <h1 className="!mb-0">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </h3>
          <div className="my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="not-prose h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/hero-modern.tsx
// app/components/HeroWithCraft.tsx
"use client";

// React and Next.js imports
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";
import { ArrowRight } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Local component imports that remain external
import { Button } from "@/components/ui/button";

const Placeholder =
  "https://components.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fplaceholder.1700a83e.jpg&w=3840&q=75";


/* ---------------------------------- utils --------------------------------- */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* --------------------------------- types ---------------------------------- */

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

type MainProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

type ArticleProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  dangerouslySetInnerHTML?: { __html: string };
};

type BoxProps = {
  children: React.ReactNode;
  className?: string;
  direction?:
    | "row"
    | "col"
    | {
        sm?: "row" | "col";
        md?: "row" | "col";
        lg?: "row" | "col";
        xl?: "row" | "col";
        "2xl"?: "row" | "col";
      };
  wrap?:
    | boolean
    | {
        sm?: boolean;
        md?: boolean;
        lg?: boolean;
        xl?: boolean;
        "2xl"?: boolean;
      };
  gap?:
    | number
    | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
  cols?:
    | number
    | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
  rows?:
    | number
    | { sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };
};

/* ------------------------------- craft-ds UI ------------------------------ */

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth antialiased focus:scroll-auto", className)}
    >
      {children}
    </html>
  );
};

export const Main = ({ children, className, id }: MainProps) => {
  return (
    <main
      className={cn(
        "max-w-none prose-p:m-0",
        "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
        "prose-headings:font-normal",
        "prose-strong:font-semibold",
        "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        "prose-blockquote:not-italic",
        "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
        className
      )}
      id={id}
    >
      {children}
    </main>
  );
};

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section className={cn("py-8 md:py-12", className)} id={id}>
      {children}
    </section>
  );
};

export const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-5xl", "p-6 sm:p-8", className)} id={id}>
      {children}
    </div>
  );
};

export const Article = ({
  children,
  className,
  id,
  dangerouslySetInnerHTML,
}: ArticleProps) => {
  return (
    <article
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={cn(
        "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
        "prose-headings:font-normal",
        "prose-p:mb-0",
        "prose-strong:font-semibold",
        "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        "prose-blockquote:not-italic",
        "prose-pre:border prose-pre:bg-muted/25",
        className
      )}
      id={id}
    >
      {children}
    </article>
  );
};

export const Box = ({
  children,
  className,
  direction = "row",
  wrap = false,
  gap = 0,
  cols,
  rows,
}: BoxProps) => {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
  };

  const wrapClasses = wrap ? "flex-wrap" : "flex-nowrap";

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  const getResponsiveClasses = (
    prop: any,
    classMap: Record<string | number, string>
  ) => {
    if (typeof prop === "object") {
      return Object.entries(prop)
        .map(([breakpoint, value]) => {
          const prefix = breakpoint === "sm" ? "" : `${breakpoint}:`;
          return `${prefix}${classMap[value as keyof typeof classMap] || ""}`;
        })
        .join(" ");
    }
    return classMap[prop as keyof typeof classMap] || "";
  };

  const stackClasses = cn(
    cols || rows ? "grid" : "flex",
    getResponsiveClasses(direction, directionClasses),
    typeof wrap === "boolean"
      ? wrapClasses
      : getResponsiveClasses(wrap, { true: "flex-wrap", false: "flex-nowrap" }),
    getResponsiveClasses(gap, gapClasses),
    cols && getResponsiveClasses(cols, colsClasses),
    rows && getResponsiveClasses(rows, colsClasses),
    className
  );

  return <div className={stackClasses}>{children}</div>;
};

/* ---------------------------------- Hero ---------------------------------- */

const Hero = () => {
  return (
    <Section>
      <Container>
        <div>
          <Button asChild className="mb-6 w-fit" size="sm" variant="outline">
            <Link className="not-prose" href="https://9d8.dev">
              Lorem ipsum dolor sit amet <ArrowRight className="w-4" />
            </Link>
          </Button>

          <h1>
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h1>

          <h3 className="text-muted-foreground">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Balancer>
          </h3>

          <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;

/* craft-ds, v0.2.8 (merged into single file) */

```

Install NPM dependencies:
```bash
next, react-wrap-balancer, lucide-react, clsx, tailwind-merge
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
