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
product-card-3.tsx
// components/ui/product-drop-card.tsx
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"; // Assuming these are your shadcn Card components
import { Button } from "./button"; // Assuming shadcn Button component
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// Define the type for a single drop item
export interface DropItem {
  time: string;
  name: string;
  collection: string;
  imageSrc: string;
}

// Define the props for the main component
export interface ProductDropCardProps {
  title: string;
  subtitle: string;
  items: DropItem[];
}

export const ProductDropCard = ({
  title,
  subtitle,
  items,
}: ProductDropCardProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsToShow = 3; // Number of items visible at once

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < items.length - itemsToShow;

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label="Previous drop"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Next drop"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden">
        {/* Carousel container with smooth transition */}
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full rounded-lg border bg-card p-4 text-card-foreground"
              style={{ flexBasis: `calc((100% / ${itemsToShow}) - (${(itemsToShow - 1) * 16}px / ${itemsToShow}))` }}
            >
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{item.time}</p>
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.collection}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

code.demo.1760096869077.tsx
import * as React from "react";
import { ProductDropCard, DropItem } from "@/components/ui/product-card-3"; // Adjust path as needed

// Sample data for the drops
const upcomingDrops: DropItem[] = [
  {
    time: "14:00",
    name: "Lemonade",
    collection: "Off-White Air Force",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-LnBkOp3vtoZxgA1Bbe9AQGMoa0Okez.png&w=1000&q=75",
  },
  {
    time: "17:00",
    name: "University Blue",
    collection: "Off-White Air Force",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-llBJrXGTGW8fvXFYtSynrQ6nWHbhKo.png&w=1000&q=75",
  },
  {
    time: "18:00",
    name: "Brooklyn Green",
    collection: "Off-White Air Force",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-7DxkVlb641FDO4NwxI8j6rmWukXHAI.png&w=1000&q=75",
  },
  // Add more items to test the carousel functionality
  {
    time: "19:00",
    name: "Chicago",
    collection: "Off-White Air Jordan 1",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-25Y9Z8CPr2GbrCOJekFo5jLy0sg3ce.png&w=1000&q=75", // Replace with actual image
  },
  {
    time: "20:00",
    name: "Mocha",
    collection: "Travis Scott Air Jordan 1",
    imageSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-KTicoKheLSl3rJR7arTqnbVAonWxMo.png&w=1000&q=75", // Replace with actual image
  },
];

const ProductDropCardDemo = () => {
  return (
    <div className="w-full bg-background p-8 flex items-center justify-center">
      <ProductDropCard
        title="Today's Drops"
        subtitle="Upcoming drops from Nike"
        items={upcomingDrops}
      />
    </div>
  );
};

export default ProductDropCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/product-card-3.tsx
// components/ui/product-drop-card.tsx
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"; // Assuming these are your shadcn Card components
import { Button } from "./button"; // Assuming shadcn Button component
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// Define the type for a single drop item
export interface DropItem {
  time: string;
  name: string;
  collection: string;
  imageSrc: string;
}

// Define the props for the main component
export interface ProductDropCardProps {
  title: string;
  subtitle: string;
  items: DropItem[];
}

export const ProductDropCard = ({
  title,
  subtitle,
  items,
}: ProductDropCardProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsToShow = 3; // Number of items visible at once

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < items.length - itemsToShow;

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label="Previous drop"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Next drop"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden">
        {/* Carousel container with smooth transition */}
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full rounded-lg border bg-card p-4 text-card-foreground"
              style={{ flexBasis: `calc((100% / ${itemsToShow}) - (${(itemsToShow - 1) * 16}px / ${itemsToShow}))` }}
            >
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{item.time}</p>
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.collection}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

Install NPM dependencies:
```bash
lucide-react
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
