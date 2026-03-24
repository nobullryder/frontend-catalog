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
stock-trends-carousel.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Flame } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Card } from "@/components/ui/card"; // Assuming shadcn Card component
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component

// Type definition for a single stock item
interface Stock {
  ticker: string;
  name: string;
  logoUrl: string;
  price: number;
  currency: string;
  changePercent: number;
}

// Props for the main component
interface StockTrendsCarouselProps {
  title: string;
  subtitle: string;
  stocks: Stock[];
  className?: string;
}

// Utility to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// --- Main Component ---
export const StockTrendsCarousel = React.forwardRef<
  HTMLDivElement,
  StockTrendsCarouselProps
>(({ title, subtitle, stocks, className }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section
      ref={ref}
      className={cn("w-full max-w-6xl mx-auto space-y-4", className)}
    >
      {/* Header */}
      <div className="px-4 md:px-0">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
          🇺🇸 {title} <ChevronRight className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-muted-foreground">
          {subtitle}
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative">
        <motion.div
          ref={scrollContainerRef}
          className="flex w-full space-x-4 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stocks.map((stock) => (
             <motion.div 
               key={stock.ticker} 
               variants={itemVariants} 
               whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
               className="flex-shrink-0"
            >
              <Card className="w-64 p-4 h-full flex flex-col justify-between border-border/60 hover:border-border transition-colors duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={stock.logoUrl} alt={`${stock.name} logo`} className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-foreground">{stock.ticker}</p>
                        <Flame className="h-4 w-4 text-orange-400" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {formatCurrency(stock.price, stock.currency).replace("$","")}{" "}
                    <span className="text-sm font-medium text-muted-foreground">{stock.currency}</span>
                  </p>
                  <p className={cn(
                      "font-semibold",
                      stock.changePercent >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Scroll Button */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
           <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
});
StockTrendsCarousel.displayName = "StockTrendsCarousel";

code.demo.1759490008950.tsx
import { StockTrendsCarousel } from "@/components/ui/stock-trends-carousel";

const mockStocks = [
  {
    ticker: "AAPL",
    name: "Apple Inc",
    logoUrl: "https://logo.clearbit.com/apple.com",
    price: 257.13,
    currency: "USD",
    changePercent: 0.66,
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    logoUrl: "https://logo.clearbit.com/amd.com",
    price: 169.73,
    currency: "USD",
    changePercent: 3.49,
  },
  {
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    logoUrl: "https://logo.clearbit.com/amazon.com",
    price: 222.41,
    currency: "USD",
    changePercent: 0.81,
  },
  {
    ticker: "AVGO",
    name: "Broadcom Inc.",
    logoUrl: "https://logo.clearbit.com/broadcom.com",
    price: 338.18,
    currency: "USD",
    changePercent: 1.44,
  },
  {
    ticker: "BABA",
    name: "Alibaba Group Holdings",
    logoUrl: "https://logo.clearbit.com/alibaba.com",
    price: 189.34,
    currency: "USD",
    changePercent: 3.59,
  },
  {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    logoUrl: "https://logo.clearbit.com/tesla.com",
    price: 177.46,
    currency: "USD",
    changePercent: -1.21,
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    logoUrl: "https://logo.clearbit.com/google.com",
    price: 176.03,
    currency: "USD",
    changePercent: 0.92,
  },
];


export default function StockCarouselDemo() {
  return (
    <div className="w-full bg-background flex items-center justify-center py-12">
      <StockTrendsCarousel
        title="US stocks"
        subtitle="Community trends"
        stocks={mockStocks}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stock-trends-carousel.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Flame } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Card } from "@/components/ui/card"; // Assuming shadcn Card component
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component

// Type definition for a single stock item
interface Stock {
  ticker: string;
  name: string;
  logoUrl: string;
  price: number;
  currency: string;
  changePercent: number;
}

// Props for the main component
interface StockTrendsCarouselProps {
  title: string;
  subtitle: string;
  stocks: Stock[];
  className?: string;
}

// Utility to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// --- Main Component ---
export const StockTrendsCarousel = React.forwardRef<
  HTMLDivElement,
  StockTrendsCarouselProps
>(({ title, subtitle, stocks, className }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  
  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section
      ref={ref}
      className={cn("w-full max-w-6xl mx-auto space-y-4", className)}
    >
      {/* Header */}
      <div className="px-4 md:px-0">
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
          🇺🇸 {title} <ChevronRight className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-muted-foreground">
          {subtitle}
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative">
        <motion.div
          ref={scrollContainerRef}
          className="flex w-full space-x-4 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stocks.map((stock) => (
             <motion.div 
               key={stock.ticker} 
               variants={itemVariants} 
               whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
               className="flex-shrink-0"
            >
              <Card className="w-64 p-4 h-full flex flex-col justify-between border-border/60 hover:border-border transition-colors duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={stock.logoUrl} alt={`${stock.name} logo`} className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-foreground">{stock.ticker}</p>
                        <Flame className="h-4 w-4 text-orange-400" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {formatCurrency(stock.price, stock.currency).replace("$","")}{" "}
                    <span className="text-sm font-medium text-muted-foreground">{stock.currency}</span>
                  </p>
                  <p className={cn(
                      "font-semibold",
                      stock.changePercent >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Scroll Button */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
           <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
});
StockTrendsCarousel.displayName = "StockTrendsCarousel";
```

Install NPM dependencies:
```bash
framer-motion, lucide-react
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
