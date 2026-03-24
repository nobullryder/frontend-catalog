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
core-header-navbar.tsx
"use client";
import React from "react";


type SimpleNavbarProps = {
  title: string;
  userName?: string;
  userImage?: string;
};

export function SimpleNavbar({ title, userName, userImage }: SimpleNavbarProps) {
  return (
    <nav className="relative border-b h-16 flex items-center justify-between px-4 overflow-hidden bg-background/50 backdrop-blur-md">
          <div className="min-h-full -z-10 w-full bg-transparent absolute top-0 left-0">
      {/* Diagonal Fade Grid Background - Top Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, var(--muted) 1px, transparent 1px),
        linear-gradient(to bottom, var(--muted) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />
      {/* Your Content/Components */}
    </div>

      <div className="z-10 flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tighter uppercase italic">
          {title}
        </h1>
      </div>

      <div className="z-10 flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-foreground font-semibold uppercase">
              {userName}
            </span>
            <span className="text-[0.6rem] text-muted-foreground uppercase opacity-70 tracking-widest">
              Active Now
            </span>
          </div>
        <div className="size-10 border rounded-full overflow-hidden p-0.5 bg-background">
          <img
            src={
              userImage ||
              "https://m.media-amazon.com/images/I/31sDQI7yfDL._AC_UF894,1000_QL80_.jpg"
            }
            alt="profile"
            className="size-full rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

type Link = {
  name: string;
  href: string;
};

type SecondaryNavbarProps = {
  links: Link[];
  currentType: string;
  onTypeChange: (type: string) => void;
};

export function SecondaryNavbar({
  links,
  currentType,
  onTypeChange,
}: SecondaryNavbarProps) {
  return (
    <div className="relative border-b bg-muted/30 group">
      <div className="flex items-center">
        <div className="flex flex-1 overflow-x-auto no-scrollbar scroll-smooth">
          {links.map((l, index) => {
            const isActive = currentType === l.href;

            return (
              <div
                key={index}
                onClick={() => onTypeChange(l.href)}
                className={
                  "text-[0.65rem] md:text-xs p-3 px-5 md:px-7 cursor-pointer border-r font-extrabold uppercase tracking-widest transition-colors shrink-0 flex items-center justify-center min-w-fit " +
                  (isActive
                    ? "bg-accent/20 text-primary border-b-2 border-b-primary"
                    : "text-muted-foreground hover:bg-accent/10")
                }
              >
                {l.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}


code.demo.1767972988283.tsx
import { SimpleNavbar, SecondaryNavbar } from "@/components/ui/core-header-navbar";
import { useState } from "react";

export default function DemoOne() {
  const [type, setType] = useState("react");

  return (
    <div className="w-full">
      <SimpleNavbar
        title="Dashboard"
        userName="kumail 21st dev"
      />

      <SecondaryNavbar
        currentType={type}
        onTypeChange={setType}
        links={[
          { name: "React", href: "react" },
          { name: "Next.js", href: "nextjs" },
          { name: "Full Stack", href: "fullstack" },
          { name: "UI/UX", href: "uiux" },
        ]}
      />
    </div>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/core-header-navbar.tsx
"use client";
import React from "react";


type SimpleNavbarProps = {
  title: string;
  userName?: string;
  userImage?: string;
};

export function SimpleNavbar({ title, userName, userImage }: SimpleNavbarProps) {
  return (
    <nav className="relative border-b h-16 flex items-center justify-between px-4 overflow-hidden bg-background/50 backdrop-blur-md">
          <div className="min-h-full -z-10 w-full bg-transparent absolute top-0 left-0">
      {/* Diagonal Fade Grid Background - Top Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, var(--muted) 1px, transparent 1px),
        linear-gradient(to bottom, var(--muted) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />
      {/* Your Content/Components */}
    </div>

      <div className="z-10 flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tighter uppercase italic">
          {title}
        </h1>
      </div>

      <div className="z-10 flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-foreground font-semibold uppercase">
              {userName}
            </span>
            <span className="text-[0.6rem] text-muted-foreground uppercase opacity-70 tracking-widest">
              Active Now
            </span>
          </div>
        <div className="size-10 border rounded-full overflow-hidden p-0.5 bg-background">
          <img
            src={
              userImage ||
              "https://m.media-amazon.com/images/I/31sDQI7yfDL._AC_UF894,1000_QL80_.jpg"
            }
            alt="profile"
            className="size-full rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

type Link = {
  name: string;
  href: string;
};

type SecondaryNavbarProps = {
  links: Link[];
  currentType: string;
  onTypeChange: (type: string) => void;
};

export function SecondaryNavbar({
  links,
  currentType,
  onTypeChange,
}: SecondaryNavbarProps) {
  return (
    <div className="relative border-b bg-muted/30 group">
      <div className="flex items-center">
        <div className="flex flex-1 overflow-x-auto no-scrollbar scroll-smooth">
          {links.map((l, index) => {
            const isActive = currentType === l.href;

            return (
              <div
                key={index}
                onClick={() => onTypeChange(l.href)}
                className={
                  "text-[0.65rem] md:text-xs p-3 px-5 md:px-7 cursor-pointer border-r font-extrabold uppercase tracking-widest transition-colors shrink-0 flex items-center justify-center min-w-fit " +
                  (isActive
                    ? "bg-accent/20 text-primary border-b-2 border-b-primary"
                    : "text-muted-foreground hover:bg-accent/10")
                }
              >
                {l.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background/50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

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
