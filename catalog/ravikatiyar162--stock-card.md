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
stock-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button"; // Assuming shadcn button

/**
 * Props for the StockCard component.
 */
interface StockCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source URL for the company logo. */
  logoSrc: string;
  /** The stock ticker symbol (e.g., "AAPL"). */
  ticker: string;
  /** The full name of the company (e.g., "Apple Inc."). */
  name: string;
  /** The current price of the stock. */
  price: number;
  /** The percentage change in the stock price. Positive for gain, negative for loss. */
  change: number;
  /** A callback function to be invoked when the "Buy" button is clicked. */
  onBuy: (ticker: string) => void;
}

const StockCard = React.forwardRef<HTMLDivElement, StockCardProps>(
  ({ className, logoSrc, ticker, name, price, change, onBuy, ...props }, ref) => {
    const isPositiveChange = change >= 0;

    // Format price to have two decimal places with a comma separator
    const formattedPrice = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    // Format change to show absolute value with two decimal places
    const formattedChange = `${Math.abs(change).toFixed(2)}%`;

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
        className={cn(
          "flex items-center justify-between w-full max-w-md p-4 bg-card text-card-foreground",
          "rounded-xl border shadow-sm transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {/* Left Section: Logo and Ticker Info */}
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt={`${name} logo`} className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-bold text-lg text-foreground">{ticker}</p>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        </div>

        {/* Right Section: Price and Buy Button */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right">
            <p className="font-semibold text-lg text-foreground">{formattedPrice}</p>
            <div className="flex items-center justify-end gap-1">
              {isPositiveChange ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn("text-sm", isPositiveChange ? "text-green-500" : "text-red-500")}>
                {formattedChange}
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onBuy(ticker)}
            aria-label={`Buy ${ticker} stock`}
          >
            Buy
          </Button>
        </div>
      </motion.div>
    );
  }
);

StockCard.displayName = "StockCard";

export { StockCard };

code.demo.1758763332654.tsx
import { StockCard } from "@/components/ui/stock-card";

// Sample data for demonstration
const stocksData = [
  {
    logoSrc: "https://logo.clearbit.com/google.com",
    ticker: "GOOG",
    name: "Alphabet Inc.",
    price: 156.06,
    change: 4.89,
  },
  {
    logoSrc: "https://logo.clearbit.com/nvidia.com",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    price: 19270.30,
    change: -1.35,
  },
  {
    logoSrc: "https://logo.clearbit.com/apple.com",
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 217.90,
    change: 2.66,
  },
  {
    logoSrc: "https://logo.clearbit.com/starbucks.com",
    ticker: "SBUX",
    name: "Starbucks Corporation",
    price: 97.73,
    change: 1.13,
  },
  {
    logoSrc: "https://logo.clearbit.com/nike.com",
    ticker: "NKE",
    name: "Nike, Inc.",
    price: 63.29,
    change: -3.81,
  },
];

export default function StockCardDemo() {
  // Handler for the buy action
  const handleBuyStock = (ticker: string) => {
    alert(`Initiating buy for ${ticker}...`);
  };

  return (
    <div className="w-full bg-background p-8 flex items-center justify-center">
      <div className="flex flex-col gap-4">
        {stocksData.map((stock) => (
          <StockCard
            key={stock.ticker}
            logoSrc={stock.logoSrc}
            ticker={stock.ticker}
            name={stock.name}
            price={stock.price}
            change={stock.change}
            onBuy={handleBuyStock}
          />
        ))}
      </div>
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stock-card.tsx
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { Button } from "@/components/ui/button"; // Assuming shadcn button

/**
 * Props for the StockCard component.
 */
interface StockCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source URL for the company logo. */
  logoSrc: string;
  /** The stock ticker symbol (e.g., "AAPL"). */
  ticker: string;
  /** The full name of the company (e.g., "Apple Inc."). */
  name: string;
  /** The current price of the stock. */
  price: number;
  /** The percentage change in the stock price. Positive for gain, negative for loss. */
  change: number;
  /** A callback function to be invoked when the "Buy" button is clicked. */
  onBuy: (ticker: string) => void;
}

const StockCard = React.forwardRef<HTMLDivElement, StockCardProps>(
  ({ className, logoSrc, ticker, name, price, change, onBuy, ...props }, ref) => {
    const isPositiveChange = change >= 0;

    // Format price to have two decimal places with a comma separator
    const formattedPrice = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    // Format change to show absolute value with two decimal places
    const formattedChange = `${Math.abs(change).toFixed(2)}%`;

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
        className={cn(
          "flex items-center justify-between w-full max-w-md p-4 bg-card text-card-foreground",
          "rounded-xl border shadow-sm transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {/* Left Section: Logo and Ticker Info */}
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt={`${name} logo`} className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-bold text-lg text-foreground">{ticker}</p>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        </div>

        {/* Right Section: Price and Buy Button */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right">
            <p className="font-semibold text-lg text-foreground">{formattedPrice}</p>
            <div className="flex items-center justify-end gap-1">
              {isPositiveChange ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={cn("text-sm", isPositiveChange ? "text-green-500" : "text-red-500")}>
                {formattedChange}
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onBuy(ticker)}
            aria-label={`Buy ${ticker} stock`}
          >
            Buy
          </Button>
        </div>
      </motion.div>
    );
  }
);

StockCard.displayName = "StockCard";

export { StockCard };
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
