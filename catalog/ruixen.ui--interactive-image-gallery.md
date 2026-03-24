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
interactive-image-gallery.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface GalleryItem {
  id: string;
  type: "image" | "text";
  src?: string;
  text?: string;
  position?: string; // optional Tailwind position classes
}

interface InteractiveImageGalleryProps {
  items: GalleryItem[];
  className?: string;
}

export function InteractiveImageGallery({
  items,
  className,
}: InteractiveImageGalleryProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full min-h-screen bg-muted/10 flex flex-wrap justify-center items-center gap-8 p-10 transition-colors",
        className
      )}
    >
      {items.map((item) =>
        item.type === "image" ? (
          <div
            key={item.id}
            className={cn(
              "relative transition-all duration-300 ease-in-out rounded-xl overflow-hidden",
              "hover:scale-105",
              hoveredId && hoveredId !== item.id ? "blur-sm opacity-50" : "opacity-100"
            )}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {item.src && (
              <Image
                src={item.src}
                alt="gallery item"
                width={200}
                height={200}
                unoptimized
                className="object-cover w-40 h-40 md:w-48 md:h-48 rounded-xl"
              />
            )}
          </div>
        ) : (
          <Card
            key={item.id}
            className="w-72 bg-background shadow-md border border-muted text-center"
          >
            <CardContent className="p-4 text-sm text-muted-foreground">
              {item.text}
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}


code.demo.1760797359909.tsx
"use client";

import { InteractiveImageGallery } from "@/components/ui/interactive-image-gallery";

export default function GalleryDemoPage() {
  const items = [
    {
      id: "1",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ruixen-moon-chat.jpg",
    },
    {
      id: "5",
      type: "text",
      text: "Discover our AI-powered visual collection that transforms data and creativity into emotion.",
    },
    {
      id: "2",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/three-dwall-calendar-dark.jpg",
    },
    {
      id: "3",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/solar-system-dark.png",
    },
    {
      id: "6",
      type: "text",
      text: "Explore how intelligent design systems visualize the unseen and amplify imagination.",
    },
    {
      id: "4",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/infinite-scroll-light.png",
    },
    {
      id: "8",
      type: "image",
      src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ripple-distortion-dark.png",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex justify-center items-center">
      <InteractiveImageGallery items={items} />
    </main>
  );
}

```

Copy-paste these files for dependencies:
```tsx
src/components/ui/interactive-image-gallery.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface GalleryItem {
  id: string;
  type: "image" | "text";
  src?: string;
  text?: string;
  position?: string; // optional Tailwind position classes
}

interface InteractiveImageGalleryProps {
  items: GalleryItem[];
  className?: string;
}

export function InteractiveImageGallery({
  items,
  className,
}: InteractiveImageGalleryProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full min-h-screen bg-muted/10 flex flex-wrap justify-center items-center gap-8 p-10 transition-colors",
        className
      )}
    >
      {items.map((item) =>
        item.type === "image" ? (
          <div
            key={item.id}
            className={cn(
              "relative transition-all duration-300 ease-in-out rounded-xl overflow-hidden",
              "hover:scale-105",
              hoveredId && hoveredId !== item.id ? "blur-sm opacity-50" : "opacity-100"
            )}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {item.src && (
              <Image
                src={item.src}
                alt="gallery item"
                width={200}
                height={200}
                unoptimized
                className="object-cover w-40 h-40 md:w-48 md:h-48 rounded-xl"
              />
            )}
          </div>
        ) : (
          <Card
            key={item.id}
            className="w-72 bg-background shadow-md border border-muted text-center"
          >
            <CardContent className="p-4 text-sm text-muted-foreground">
              {item.text}
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}

```

Install NPM dependencies:
```bash
next
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
