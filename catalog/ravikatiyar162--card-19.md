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
card-19.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Props interface for type safety and reusability
interface ProductCardProps {
  title: string;
  price: number;
  currency?: string;
  rating: number;
  reviewsCount: number;
  colors: string[];
  sizes: string[];
  initialColor: string;
  initialSize: string;
  onAddToCart: (details: { color: string; size: string }) => void;
  className?: string;
}

// Helper component for rendering star ratings
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              ratingValue <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            )}
          />
        );
      })}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  currency = "$",
  rating,
  reviewsCount,
  colors,
  sizes,
  initialColor,
  initialSize,
  onAddToCart,
  className,
}) => {
  const [selectedColor, setSelectedColor] = React.useState(initialColor);
  const [selectedSize, setSelectedSize] = React.useState(initialSize);

  const handleAddToCart = () => {
    onAddToCart({ color: selectedColor, size: selectedSize });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-lg p-6",
        className
      )}
    >
      {/* Product Header */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-2xl font-semibold text-primary">
          {currency}
          {price}
        </p>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-2 mb-6">
        <StarRating rating={rating} />
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({reviewsCount} reviews)
        </span>
      </div>

      {/* Color Selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground">
          Color
        </label>
        <div className="flex items-center gap-3 mt-2" role="radiogroup">
          {colors.map((color) => (
            <motion.button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-transform duration-200",
                selectedColor === color
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "border-transparent"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select color ${color}`}
              role="radio"
              aria-checked={selectedColor === color}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-sm font-medium text-muted-foreground">
            Size
          </label>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => setSelectedSize(size)}
              className="transition-all duration-200"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button size="lg" className="w-full h-12 text-base" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </motion.div>
    </motion.div>
  );
};

export { ProductCard };

code.demo.1758099252870.tsx
import * as React from "react";
import { ProductCard } from "@/components/ui/card-19";

// Main demo component to showcase the ProductCard
const ProductCardDemo = () => {
  // Sample product data to be passed as props
  const productData = {
    title: "Jeans",
    price: 40,
    rating: 4.0,
    reviewsCount: 456,
    colors: ["#3b82f6", "#4b5563", "#f59e0b", "#60a5fa"],
    sizes: ["S", "M", "L", "XL"],
    initialColor: "#3b82f6",
    initialSize: "M",
  };

  // Handler function to demonstrate capturing the selected variant details
  const handleAddToCart = (details: { color: string; size: string }) => {
    console.log("Added to cart:", details);
    alert(`Added to cart!\nColor: ${details.color}\nSize: ${details.size}`);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <ProductCard {...productData} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-19.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Props interface for type safety and reusability
interface ProductCardProps {
  title: string;
  price: number;
  currency?: string;
  rating: number;
  reviewsCount: number;
  colors: string[];
  sizes: string[];
  initialColor: string;
  initialSize: string;
  onAddToCart: (details: { color: string; size: string }) => void;
  className?: string;
}

// Helper component for rendering star ratings
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              ratingValue <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            )}
          />
        );
      })}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  currency = "$",
  rating,
  reviewsCount,
  colors,
  sizes,
  initialColor,
  initialSize,
  onAddToCart,
  className,
}) => {
  const [selectedColor, setSelectedColor] = React.useState(initialColor);
  const [selectedSize, setSelectedSize] = React.useState(initialSize);

  const handleAddToCart = () => {
    onAddToCart({ color: selectedColor, size: selectedSize });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={cn(
        "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-lg p-6",
        className
      )}
    >
      {/* Product Header */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-2xl font-semibold text-primary">
          {currency}
          {price}
        </p>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-2 mb-6">
        <StarRating rating={rating} />
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({reviewsCount} reviews)
        </span>
      </div>

      {/* Color Selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-muted-foreground">
          Color
        </label>
        <div className="flex items-center gap-3 mt-2" role="radiogroup">
          {colors.map((color) => (
            <motion.button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={cn(
                "h-8 w-8 rounded-full border-2 transition-transform duration-200",
                selectedColor === color
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "border-transparent"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select color ${color}`}
              role="radio"
              aria-checked={selectedColor === color}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-sm font-medium text-muted-foreground">
            Size
          </label>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            See sizing chart
          </a>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => setSelectedSize(size)}
              className="transition-all duration-200"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button size="lg" className="w-full h-12 text-base" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </motion.div>
    </motion.div>
  );
};

export { ProductCard };
```

Install NPM dependencies:
```bash
lucide-react, framer-motion
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
