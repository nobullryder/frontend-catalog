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
not-found-1.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NotFoundLink {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
}

export interface NotFoundProps {
  /** Custom error code to display */
  errorCode?: string;
  /** Main heading text */
  title?: string;
  /** Subtitle/description text */
  description?: string;
  /** Links to display below the main content */
  links?: NotFoundLink[];
  /** Handler for back button click */
  onBackClick?: () => void;
  /** Handler for home button click */
  onHomeClick?: () => void;
  /** Custom back button text */
  backButtonText?: string;
  /** Custom home button text */
  homeButtonText?: string;
  /** Show the grid background pattern */
  showBackground?: boolean;
  /** Additional CSS classes for the main container */
  className?: string;
  /** Children to render instead of default content */
  children?: ReactNode;
}

export function NotFound({
  errorCode = "404 error",
  title = "We can't find this page",
  description = "The page you are looking for doesn't exist or has been moved.",
  links = [],
  onBackClick,
  onHomeClick,
  backButtonText = "Go back",
  homeButtonText = "Go Home",
  showBackground = true,
  className,
  children,
}: NotFoundProps) {
  return (
    <main
      className={cn(
        "h-screen w-full flex items-start md:items-center justify-center py-16 px-4 md:py-24 md:px-20",
        className
      )}
    >
      {showBackground && (
        <div className="fixed inset-0 z-0 opacity-50 bg-[image:linear-gradient(to_right,var(--muted-foreground),transparent_1px),linear-gradient(to_bottom,var(--muted-foreground),transparent_1px)] [background-size:32px_32px] md:[background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_30%_at_50%_0%,black_0%,transparent_100%)] md:[mask-image:radial-gradient(ellipse_30%_30%_at_50%_20%,black_0%,transparent_100%)]" />
      )}

      <section className="flex flex-col items-center gap-8 md:gap-16 z-10">
        {children || (
          <>
            <div className="flex flex-col items-center gap-8 md:gap-12">
              <header className="flex flex-col items-center gap-4">
                <div>
                  <Badge
                    variant="outline"
                    className="px-2.5 py-1 text-sm font-medium"
                  >
                    <div className="size-2 bg-primary rounded-full" />
                    {errorCode}
                  </Badge>
                </div>
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  <h1 className="text-center text-4xl md:text-6xl font-semibold">
                    {title}
                  </h1>
                  <p className="text-center text-lg md:text-xl text-muted-foreground">
                    {description}
                  </p>
                </div>
              </header>
              <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-center">
                <Button
                  className="w-full md:w-fit"
                  variant="outline"
                  onClick={onBackClick}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {backButtonText}
                </Button>
                <Button className="w-full md:w-fit" onClick={onHomeClick}>
                  {homeButtonText}
                </Button>
              </div>
            </div>

            {links.length > 0 && (
              <div className="flex flex-col divide-y w-full border-t border-b">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.title}
                    className="py-5 flex items-start md:items-center gap-4 md:gap-5 flex-col md:flex-row hover:bg-muted/50 transition-colors"
                  >
                    <div className="border p-2.5 md:p-3 rounded-lg bg-card">
                      <link.icon className="size-5 md:size-6" />
                    </div>
                    <div className="flex gap-5 flex-1 w-full">
                      <div className="flex flex-col gap-1">
                        <div className="text-lg font-semibold">
                          {link.title}
                        </div>
                        <div className="text-muted-foreground">
                          {link.subtitle}
                        </div>
                      </div>
                      <div className="self-start ml-auto">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

code.demo.1755254368022.tsx
import { NotFound, NotFoundLink } from "@/components/ui/not-found-1";
import {
  Book,
  BookOpen,
  MessageCircle,
} from "lucide-react";

const demoLinks: NotFoundLink[] = [
  {
    title: "Documentation",
    subtitle: "Dive in to learn all about our project",
    icon: BookOpen,
    href: "https://moleculeui.design",
  },
  {
    title: "Our blog",
    subtitle: "Read the latest post on our blog",
    icon: Book,
    href: "https://moleculeui.design",
  },
  {
    title: "Chat to us",
    subtitle: "Can't find what you're looking for?",
    icon: MessageCircle,
    href: "https://moleculeui.design",
  },
];

// Default demo - this is what gets rendered on the page
export default function Demo() {
  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleHomeClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <NotFound
      links={demoLinks}
      onBackClick={handleBackClick}
      onHomeClick={handleHomeClick}
    />
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/not-found-1.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NotFoundLink {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
}

export interface NotFoundProps {
  /** Custom error code to display */
  errorCode?: string;
  /** Main heading text */
  title?: string;
  /** Subtitle/description text */
  description?: string;
  /** Links to display below the main content */
  links?: NotFoundLink[];
  /** Handler for back button click */
  onBackClick?: () => void;
  /** Handler for home button click */
  onHomeClick?: () => void;
  /** Custom back button text */
  backButtonText?: string;
  /** Custom home button text */
  homeButtonText?: string;
  /** Show the grid background pattern */
  showBackground?: boolean;
  /** Additional CSS classes for the main container */
  className?: string;
  /** Children to render instead of default content */
  children?: ReactNode;
}

export function NotFound({
  errorCode = "404 error",
  title = "We can't find this page",
  description = "The page you are looking for doesn't exist or has been moved.",
  links = [],
  onBackClick,
  onHomeClick,
  backButtonText = "Go back",
  homeButtonText = "Go Home",
  showBackground = true,
  className,
  children,
}: NotFoundProps) {
  return (
    <main
      className={cn(
        "h-screen w-full flex items-start md:items-center justify-center py-16 px-4 md:py-24 md:px-20",
        className
      )}
    >
      {showBackground && (
        <div className="fixed inset-0 z-0 opacity-50 bg-[image:linear-gradient(to_right,var(--muted-foreground),transparent_1px),linear-gradient(to_bottom,var(--muted-foreground),transparent_1px)] [background-size:32px_32px] md:[background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_30%_at_50%_0%,black_0%,transparent_100%)] md:[mask-image:radial-gradient(ellipse_30%_30%_at_50%_20%,black_0%,transparent_100%)]" />
      )}

      <section className="flex flex-col items-center gap-8 md:gap-16 z-10">
        {children || (
          <>
            <div className="flex flex-col items-center gap-8 md:gap-12">
              <header className="flex flex-col items-center gap-4">
                <div>
                  <Badge
                    variant="outline"
                    className="px-2.5 py-1 text-sm font-medium"
                  >
                    <div className="size-2 bg-primary rounded-full" />
                    {errorCode}
                  </Badge>
                </div>
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  <h1 className="text-center text-4xl md:text-6xl font-semibold">
                    {title}
                  </h1>
                  <p className="text-center text-lg md:text-xl text-muted-foreground">
                    {description}
                  </p>
                </div>
              </header>
              <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-center">
                <Button
                  className="w-full md:w-fit"
                  variant="outline"
                  onClick={onBackClick}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {backButtonText}
                </Button>
                <Button className="w-full md:w-fit" onClick={onHomeClick}>
                  {homeButtonText}
                </Button>
              </div>
            </div>

            {links.length > 0 && (
              <div className="flex flex-col divide-y w-full border-t border-b">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.title}
                    className="py-5 flex items-start md:items-center gap-4 md:gap-5 flex-col md:flex-row hover:bg-muted/50 transition-colors"
                  >
                    <div className="border p-2.5 md:p-3 rounded-lg bg-card">
                      <link.icon className="size-5 md:size-6" />
                    </div>
                    <div className="flex gap-5 flex-1 w-full">
                      <div className="flex flex-col gap-1">
                        <div className="text-lg font-semibold">
                          {link.title}
                        </div>
                        <div className="text-muted-foreground">
                          {link.subtitle}
                        </div>
                      </div>
                      <div className="self-start ml-auto">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
```

Install NPM dependencies:
```bash
lucide-react, next
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
