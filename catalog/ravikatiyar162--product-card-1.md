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
product-card-1.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a shadcn Checkbox component
import { Button } from "@/components/ui/button"; // Assuming you have a shadcn Button component

// Define the types for the component props
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
  specifications: string[];
  price: number;
  originalPrice: number;
  isAssured: boolean;
  exchangeOffer: string;
  bankOffer: string;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      rating,
      ratingsCount,
      reviewsCount,
      specifications,
      price,
      originalPrice,
      isAssured,
      exchangeOffer,
      bankOffer,
      ...props
    },
    ref
  ) => {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    // Format numbers with commas for readability
    const formatNumber = (num: number) =>
      new Intl.NumberFormat("en-IN").format(num);

    // Calculate discount percentage
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    // Animation variants for framer-motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-background text-foreground border rounded-lg overflow-hidden w-full p-4 md:p-6",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          boxShadow: "0px 10px 30px -5px hsl(var(--foreground) / 0.1)",
          y: -5,
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6 items-start">
          {/* Column 1: Image & Compare */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group w-full aspect-square max-w-[200px] mx-auto">
              <Image
                src={imageUrl}
                alt={title}
                width={200}
                height={200}
                className="object-contain w-full h-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-colors",
                    isWishlisted && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
            </div>
            <div className="flex items-center space-x-2 self-start md:self-center pt-4">
              <Checkbox id="compare" />
              <label
                htmlFor="compare"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add to Compare
              </label>
            </div>
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="bg-green-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                <span>{rating.toFixed(1)}</span>
                <Star className="h-3 w-3 fill-white" />
              </div>
              <span>
                {formatNumber(ratingsCount)} Ratings & {formatNumber(reviewsCount)} Reviews
              </span>
            </div>
            <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground pt-2">
              {specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pricing */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">₹{formatNumber(price)}</h3>
              {isAssured && (
                <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={1.5} />
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground line-through">
                ₹{formatNumber(originalPrice)}
              </span>
              <span className="text-green-600 font-semibold">{discount}% off</span>
            </div>
            <p className="text-sm font-medium mt-2">Upto ₹{exchangeOffer} Off on Exchange</p>
            <p className="text-sm font-medium text-green-600 cursor-pointer hover:underline">
              {bankOffer}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };

code.demo.1758803559565.tsx
import { ProductCard } from "@/components/ui/product-card-1";

// Sample data for the product card
const productData = {
  imageUrl: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/8/w/5/-original-imah4jyfwr3bfjbg.jpeg?q=70", // Placeholder image link
  title: "Apple iPhone 16 (Black, 256 GB)",
  rating: 4.6,
  ratingsCount: 19106,
  reviewsCount: 793,
  specifications: [
    "256 GB ROM",
    "15.49 cm (6.1 inch) Super Retina XDR Display",
    "48MP + 12MP | 12MP Front Camera",
    "A18 Chip, 6 Core Processor",
    "1 year warranty for phone and 1 year warranty for in Box Accessories.",
  ],
  price: 64999,
  originalPrice: 79999,
  isAssured: true,
  exchangeOffer: "52,450",
  bankOffer: "Bank Offer",
};

export default function ProductCardDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted p-4">
      <ProductCard {...productData} />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/product-card-1.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a shadcn Checkbox component
import { Button } from "@/components/ui/button"; // Assuming you have a shadcn Button component

// Define the types for the component props
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  rating: number;
  ratingsCount: number;
  reviewsCount: number;
  specifications: string[];
  price: number;
  originalPrice: number;
  isAssured: boolean;
  exchangeOffer: string;
  bankOffer: string;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      rating,
      ratingsCount,
      reviewsCount,
      specifications,
      price,
      originalPrice,
      isAssured,
      exchangeOffer,
      bankOffer,
      ...props
    },
    ref
  ) => {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    // Format numbers with commas for readability
    const formatNumber = (num: number) =>
      new Intl.NumberFormat("en-IN").format(num);

    // Calculate discount percentage
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    // Animation variants for framer-motion
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-background text-foreground border rounded-lg overflow-hidden w-full p-4 md:p-6",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          boxShadow: "0px 10px 30px -5px hsl(var(--foreground) / 0.1)",
          y: -5,
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6 items-start">
          {/* Column 1: Image & Compare */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group w-full aspect-square max-w-[200px] mx-auto">
              <Image
                src={imageUrl}
                alt={title}
                width={200}
                height={200}
                className="object-contain w-full h-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-colors",
                    isWishlisted && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
            </div>
            <div className="flex items-center space-x-2 self-start md:self-center pt-4">
              <Checkbox id="compare" />
              <label
                htmlFor="compare"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add to Compare
              </label>
            </div>
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="bg-green-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                <span>{rating.toFixed(1)}</span>
                <Star className="h-3 w-3 fill-white" />
              </div>
              <span>
                {formatNumber(ratingsCount)} Ratings & {formatNumber(reviewsCount)} Reviews
              </span>
            </div>
            <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground pt-2">
              {specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pricing */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">₹{formatNumber(price)}</h3>
              {isAssured && (
                <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={1.5} />
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground line-through">
                ₹{formatNumber(originalPrice)}
              </span>
              <span className="text-green-600 font-semibold">{discount}% off</span>
            </div>
            <p className="text-sm font-medium mt-2">Upto ₹{exchangeOffer} Off on Exchange</p>
            <p className="text-sm font-medium text-green-600 cursor-pointer hover:underline">
              {bankOffer}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
```

Install NPM dependencies:
```bash
next, lucide-react, framer-motion
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
