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
product-detail-page.tsx
// components/ui/product-detail-page.tsx
import * as React from "react";
import { ChevronRight, Star, Tag, Ruler, Users, Info, Heart, Share2, ShoppingCart, Send, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils"; // Your utility for merging tailwind classes
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define TypeScript interfaces for component props for type safety and reusability
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ProductTag {
  label: string;
  icon?: React.ElementType;
}

interface Seller {
  name: string;
  avatarUrl: string;
  rating: number;
}

interface Product {
  name: string;
  price: number;
  shippingCost: number;
  currency: string;
  images: string[];
  description: string;
  tags: ProductTag[];
}

export interface ProductDetailPageProps {
  product: Product;
  seller: Seller;
  breadcrumbs: BreadcrumbItem[];
}

// A small component for rendering rating stars
const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
  <div className={cn("flex items-center gap-0.5", className)}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
        )}
      />
    ))}
    <span className="ml-2 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span>
  </div>
);


export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, seller, breadcrumbs }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-background text-foreground">
      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-4">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
            {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 mx-1" />}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex justify-between items-center mb-6">
        <div /> {/* Spacer */}
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorite</span>
            </Button>
            <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
            </Button>
        </div>
      </div>


      {/* Main content grid */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery Section */}
        <div className="flex flex-col gap-4">
           <AnimatePresence mode="wait">
             <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border"
             >
                <img
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} image ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full"
                />
             </motion.div>
           </AnimatePresence>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
                {product.images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    currentImageIndex === index ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`View image ${index + 1}`}
                />
                ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2">
                <Camera className="h-4 w-4" /> Find Similar
            </Button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
          <div className="mt-2">
            <span className="text-4xl font-bold">{product.currency}{product.price}</span>
            <span className="text-sm text-muted-foreground ml-2">
                + {product.currency}{product.shippingCost.toFixed(2)} Shipping
            </span>
          </div>

          <div className="flex gap-2 my-6">
            <Button size="lg" className="flex-1 gap-2"><ShoppingCart className="h-5 w-5"/> Buy Now</Button>
            <Button size="lg" variant="outline" className="flex-1 gap-2"><Send className="h-5 w-5"/> Contact Seller</Button>
          </div>

          {/* Tags/Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm font-normal py-1 px-3 gap-2">
                {tag.icon && <tag.icon className="h-4 w-4" />}
                {tag.label}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
            <a href="#" className="text-primary font-medium hover:underline ml-2">Read more</a>
          </p>
          
          {/* Seller Information */}
          <div className="mt-8 pt-6 border-t">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                        <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{seller.name}</p>
                        <StarRating rating={seller.rating} />
                    </div>
                </div>
                <Button variant="link" className="text-primary">
                    All listings &rarr;
                </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

code.demo.1759821230826.tsx
// demo.tsx
import { ProductDetailPage, ProductDetailPageProps } from "@/components/ui/product-detail-page";
import { Tag, Ruler, Users, Info } from "lucide-react";

// Mock data to be passed into the component
const demoProps: ProductDetailPageProps = {
  breadcrumbs: [
    { label: "Market", href: "#" },
    { label: "Clothing", href: "#" },
    { label: "Lightweight Brown Bomber Jacket", href: "#" },
  ],
  product: {
    name: "Lightweight Brown Bomber Jacket",
    price: 70,
    shippingCost: 5.60,
    currency: "€",
    images: [
      "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4157-02_3.jpg?v=1756928497&quality=80?q=80&w=2000&auto=format&fit=crop",
      "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4157-02_1.jpg?v=1756928497&quality=80?q=80&w=2000&auto=format&fit=crop",
      "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss4157-02_6.jpg?v=1756920149&quality=80?q=80&w=2000&auto=format&fit=crop",
    ],
    description: "A stylish light bomber jacket, perfect for the transitional seasons. Made from breathable, water-resistant material with a zip-up front, side pockets, and a sleeve zip pocket for small essentials. Ideal for layering in spring or fall.",
    tags: [
      { label: "Brown", icon: Tag },
      { label: "L Size", icon: Ruler },
      { label: "Women", icon: Users },
      { label: "New", icon: Info },
    ],
  },
  seller: {
    name: "Maria Johansson",
    avatarUrl: "https://i.pravatar.cc/150?u=maria",
    rating: 4.9,
  },
};

// The demo component that renders the product page
const ProductPageDemo = () => {
  // Data for the "You might also like" section
  const relatedProducts = [
    { id: 1, src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww?q=80&w=800&auto=format&fit=crop", alt: "Similar Jacket" },
    { id: 2, src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvc2V8ZW58MHx8MHx8fDA%3D?q=80&w=800&auto=format&fit=crop", alt: "Running Shoes" },
    { id: 3, src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", alt: "Modern Watch" },
    { id: 4, src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop", alt: "Stylish Sunglasses" },
  ];

  return (
    <div className="bg-muted/30">
        {/* This container simulates the card-like appearance from the UI design */}
        <div className="max-w-screen-xl mx-auto p-4 sm:p-6 md:p-8">
            <div className="bg-card rounded-2xl shadow-sm">
                <ProductDetailPage 
                    product={demoProps.product}
                    seller={demoProps.seller}
                    breadcrumbs={demoProps.breadcrumbs}
                />
                
                {/* "You might also like" section with real images */}
                <div className="px-4 md:px-8 pb-8">
                    <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map((item) => (
                             <div key={item.id} className="bg-muted/50 rounded-lg aspect-square overflow-hidden group">
                                <img 
                                  src={item.src} 
                                  alt={item.alt}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductPageDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/product-detail-page.tsx
// components/ui/product-detail-page.tsx
import * as React from "react";
import { ChevronRight, Star, Tag, Ruler, Users, Info, Heart, Share2, ShoppingCart, Send, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils"; // Your utility for merging tailwind classes
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define TypeScript interfaces for component props for type safety and reusability
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ProductTag {
  label: string;
  icon?: React.ElementType;
}

interface Seller {
  name: string;
  avatarUrl: string;
  rating: number;
}

interface Product {
  name: string;
  price: number;
  shippingCost: number;
  currency: string;
  images: string[];
  description: string;
  tags: ProductTag[];
}

export interface ProductDetailPageProps {
  product: Product;
  seller: Seller;
  breadcrumbs: BreadcrumbItem[];
}

// A small component for rendering rating stars
const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
  <div className={cn("flex items-center gap-0.5", className)}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
        )}
      />
    ))}
    <span className="ml-2 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span>
  </div>
);


export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, seller, breadcrumbs }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-background text-foreground">
      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-4">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
            {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 mx-1" />}
          </React.Fragment>
        ))}
      </nav>

      <div className="flex justify-between items-center mb-6">
        <div /> {/* Spacer */}
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorite</span>
            </Button>
            <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
            </Button>
        </div>
      </div>


      {/* Main content grid */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery Section */}
        <div className="flex flex-col gap-4">
           <AnimatePresence mode="wait">
             <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border"
             >
                <img
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} image ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full"
                />
             </motion.div>
           </AnimatePresence>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
                {product.images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    currentImageIndex === index ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`View image ${index + 1}`}
                />
                ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2">
                <Camera className="h-4 w-4" /> Find Similar
            </Button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
          <div className="mt-2">
            <span className="text-4xl font-bold">{product.currency}{product.price}</span>
            <span className="text-sm text-muted-foreground ml-2">
                + {product.currency}{product.shippingCost.toFixed(2)} Shipping
            </span>
          </div>

          <div className="flex gap-2 my-6">
            <Button size="lg" className="flex-1 gap-2"><ShoppingCart className="h-5 w-5"/> Buy Now</Button>
            <Button size="lg" variant="outline" className="flex-1 gap-2"><Send className="h-5 w-5"/> Contact Seller</Button>
          </div>

          {/* Tags/Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm font-normal py-1 px-3 gap-2">
                {tag.icon && <tag.icon className="h-4 w-4" />}
                {tag.label}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
            <a href="#" className="text-primary font-medium hover:underline ml-2">Read more</a>
          </p>
          
          {/* Seller Information */}
          <div className="mt-8 pt-6 border-t">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                        <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{seller.name}</p>
                        <StarRating rating={seller.rating} />
                    </div>
                </div>
                <Button variant="link" className="text-primary">
                    All listings &rarr;
                </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
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
