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
feature-modern.tsx
// app/components/Feature.tsx
"use client";

import React from "react";
import Balancer from "react-wrap-balancer";
import { Coins } from "lucide-react";
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
      "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground"
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
      "prose-pre:border prose-pre:bg-muted/25"
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

  const getResponsive = (prop: any, map: Record<string | number, string>) => {
    if (typeof prop === "object") {
      return Object.entries(prop)
        .map(([bp, val]) => `${bp === "sm" ? "" : `${bp}:`}${map[val as keyof typeof map] || ""}`)
        .join(" ");
    }
    return map[prop as keyof typeof map] || "";
  };

  const stack = cn(
    cols || rows ? "grid" : "flex",
    getResponsive(direction, directionClasses),
    typeof wrap === "boolean" ? wrapClasses : getResponsive(wrap, { true: "flex-wrap", false: "flex-nowrap" } as any),
    getResponsive(gap, gapClasses),
    cols && getResponsive(cols, colsClasses),
    rows && getResponsive(rows, colsClasses),
    className
  );

  return <div className={stack}>{children}</div>;
};

/* =========================
          Feature
   ========================= */

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Lorem Ipsum",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Lorem Ipsum",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const Feature = () => {
  return (
    <Section className="border-b">
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-3">
            {featureText.map(({ icon, title, description }, index) => (
              <div className="flex flex-col gap-4" key={index}>
                {icon}
                <h4 className="text-xl text-primary">{title}</h4>
                <p className="text-base opacity-75">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;


code.demo.1757993312673.tsx
import Feature from "@/components/ui/feature-modern";

export default function DemoOne() {
  return <Feature />;
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/feature-modern.tsx
// app/components/Feature.tsx
"use client";

import React from "react";
import Balancer from "react-wrap-balancer";
import { Coins } from "lucide-react";
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
      "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground"
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
      "prose-pre:border prose-pre:bg-muted/25"
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

  const getResponsive = (prop: any, map: Record<string | number, string>) => {
    if (typeof prop === "object") {
      return Object.entries(prop)
        .map(([bp, val]) => `${bp === "sm" ? "" : `${bp}:`}${map[val as keyof typeof map] || ""}`)
        .join(" ");
    }
    return map[prop as keyof typeof map] || "";
  };

  const stack = cn(
    cols || rows ? "grid" : "flex",
    getResponsive(direction, directionClasses),
    typeof wrap === "boolean" ? wrapClasses : getResponsive(wrap, { true: "flex-wrap", false: "flex-nowrap" } as any),
    getResponsive(gap, gapClasses),
    cols && getResponsive(cols, colsClasses),
    rows && getResponsive(rows, colsClasses),
    className
  );

  return <div className={stack}>{children}</div>;
};

/* =========================
          Feature
   ========================= */

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Lorem Ipsum",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Lorem Ipsum",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const Feature = () => {
  return (
    <Section className="border-b">
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-3">
            {featureText.map(({ icon, title, description }, index) => (
              <div className="flex flex-col gap-4" key={index}>
                {icon}
                <h4 className="text-xl text-primary">{title}</h4>
                <p className="text-base opacity-75">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;

```

Install NPM dependencies:
```bash
react-wrap-balancer, lucide-react, clsx, tailwind-merge
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
