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
cards-1.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

// Define the props for the component
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  category: string;
  href: string;
  onSave?: () => void;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, imageUrl, title, category, href, onSave, ...props }, ref) => {
    // Prevent click event from bubbling up from the button to the parent link
    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onSave) {
        onSave();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group relative block overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        {...props}
      >
        <a href={href} aria-label={title}>
          {/* Image container with aspect ratio */}
          <div className="aspect-square overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          {/* Card content */}
          <div className="p-4">
            <h3 className="font-semibold leading-tight truncate">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{category}</p>
          </div>
        </a>

        {/* Save button - appears on hover */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
          onClick={handleSaveClick}
          aria-label="Save thing"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };

code.demo.1758416730111.tsx
import { ProductCard } from "@/components/ui/cards-1";

// Sample data for demonstration
const products = [
  {
    title: "AER Duffle Pack 3",
    category: "Backpacks",
    imageUrl: "https://images.unsplash.com/photo-1621624959365-071359461b94?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEJhY2twYWNrc3xlbnwwfHwwfHx8MA%3D%3D?w=500&q=80",
    href: "#",
  },
  {
    title: "Minimalist Mechanical Watch",
    category: "Watches",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    href: "#",
  },
  {
    title: "Wireless Charging Stand",
    category: "Tech Accessories",
    imageUrl: "https://images.unsplash.com/photo-1617975316514-69cd7e16c2a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2lyZWxlc3MlMjBDaGFyZ2luZyUyMFN0YW5kfGVufDB8fDB8fHww?w=500&q=80",
    href: "#",
  },
  {
    title: "Artisan Ceramic Mug",
    category: "Home Goods",
    imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&q=80",
    href: "#",
  },
];

export default function ProductCardDemo() {
  const handleSave = (title: string) => {
    // In a real app, you would handle the save logic here
    console.log(`Saved: ${title}`);
  };

  return (
    <div className="w-full bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              title={product.title}
              category={product.category}
              imageUrl={product.imageUrl}
              href={product.href}
              onSave={() => handleSave(product.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/cards-1.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

// Define the props for the component
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  category: string;
  href: string;
  onSave?: () => void;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, imageUrl, title, category, href, onSave, ...props }, ref) => {
    // Prevent click event from bubbling up from the button to the parent link
    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onSave) {
        onSave();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group relative block overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        {...props}
      >
        <a href={href} aria-label={title}>
          {/* Image container with aspect ratio */}
          <div className="aspect-square overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          {/* Card content */}
          <div className="p-4">
            <h3 className="font-semibold leading-tight truncate">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{category}</p>
          </div>
        </a>

        {/* Save button - appears on hover */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
          onClick={handleSaveClick}
          aria-label="Save thing"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
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
