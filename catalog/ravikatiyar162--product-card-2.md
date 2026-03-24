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
product-card-2.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility
import { motion } from "framer-motion";

// Interface for the component's props for type-safety and clarity
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  tagline: string;
  price: number;
  currency?: string;
  isCouponPrice?: boolean;
  originalPrice?: number;
  offerText: string;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      tagline,
      price,
      currency = "₹",
      isCouponPrice = false,
      originalPrice,
      offerText,
      ...props
    },
    ref
  ) => {
    // Price formatter for consistent currency display
    const formatPrice = (amount: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      })
        .format(amount)
        .replace("₹", `${currency}`);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-card p-6 text-center text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-md",
          className
        )}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        {...props}
      >
        {/* Product Image */}
        <div className="relative mb-4 flex h-40 w-full items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-grow flex-col items-center gap-2">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{tagline}</p>
        </div>

        {/* Pricing and Offers */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{formatPrice(price)}</span>
            {isCouponPrice && (
              <span className="text-xs font-medium text-primary">
                Coupon Price
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            {originalPrice && (
              <span className="text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span className="font-semibold text-yellow-600 dark:text-yellow-500">
              {offerText}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };

code.demo.1759073049074.tsx
import { ProductCard, ProductCardProps } from "@/components/ui/product-card-2";
import { motion } from "framer-motion";

// Sample data for the product grid
const products: ProductCardProps[] = [
  {
    imageUrl: "https://image01.realme.net/general/20250109/1736415319795d54ca63564df4a429066610426dbb975.png.webp?width=1440&height=1440&size=376999", // Placeholder image
    name: "realme Buds Wireless 5 ANC",
    tagline: "Best ANC, Beast Battery Life",
    price: 1399,
    originalPrice: 2799,
    offerText: "1400 Off",
  },
  {
    imageUrl: "https://image01.realme.net/general/20250317/17422067439182f5867123e114ce09d2ef0306d1a8f9b.png.webp?width=1440&height=1440&size=1025011", // Placeholder image
    name: "realme Buds Air7",
    tagline: "52dB Segment's Strongest ANC*",
    price: 2699,
    originalPrice: 4899,
    isCouponPrice: true,
    offerText: "Up to 100 Coupon",
  },
  {
    imageUrl: "https://image01.realme.net/general/20250519/1747633988406ef120377e0d14fc68f95246e96625de1.png.webp?width=1440&height=1440&size=813046", // Placeholder image
    name: "realme Buds Air7 Pro",
    tagline: "The Sound Of Ai",
    price: 4499,
    originalPrice: 8999,
    offerText: "Up to 500 Bank Offer",
  },
  {
    imageUrl: "https://image01.realme.net/general/20241014/17288795936668c68fced6fb04cdb9365c8915f7fbd77.png.webp?width=1440&height=1440&size=282698", // Placeholder image
    name: "realme Techlife Studio H1",
    tagline: "Style Your Sound",
    price: 3999,
    originalPrice: 7999,
    offerText: "Up to 500 Bank Offer",
  },
];

// Animation variants for the container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function ProductGridDemo() {
  return (
    <div className="w-full bg-background px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight" style={{ color: '#F5A623' }}>
            Let's Groove
          </h2>
        </div>

        {/* Responsive Product Grid with Staggered Animation */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/product-card-2.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility
import { motion } from "framer-motion";

// Interface for the component's props for type-safety and clarity
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  tagline: string;
  price: number;
  currency?: string;
  isCouponPrice?: boolean;
  originalPrice?: number;
  offerText: string;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      tagline,
      price,
      currency = "₹",
      isCouponPrice = false,
      originalPrice,
      offerText,
      ...props
    },
    ref
  ) => {
    // Price formatter for consistent currency display
    const formatPrice = (amount: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      })
        .format(amount)
        .replace("₹", `${currency}`);
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-card p-6 text-center text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-md",
          className
        )}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        {...props}
      >
        {/* Product Image */}
        <div className="relative mb-4 flex h-40 w-full items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-grow flex-col items-center gap-2">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{tagline}</p>
        </div>

        {/* Pricing and Offers */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{formatPrice(price)}</span>
            {isCouponPrice && (
              <span className="text-xs font-medium text-primary">
                Coupon Price
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            {originalPrice && (
              <span className="text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            <span className="font-semibold text-yellow-600 dark:text-yellow-500">
              {offerText}
            </span>
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
framer-motion
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
