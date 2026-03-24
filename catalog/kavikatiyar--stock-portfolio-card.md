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
stock-portfolio-card.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MoreHorizontal, TrendingUp, TrendingDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// --- TYPE DEFINITIONS ---
type StockHolding = {
  ticker: string;
  name: string;
  shares: number;
  lastPrice: number;
  changeValue: number;
  changePercent: number;
};

type NewsArticle = {
  category: string;
  time: string;
  title: string;
  source: string;
};

type StockPortfolioCardProps = {
  totalGain: number;
  returnPercentage: number;
  asOfDate: string;
  holdings: StockHolding[];
  news: NewsArticle[];
  className?: string;
};

// --- HELPER TO FORMAT CURRENCY ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// --- SUB-COMPONENTS ---
const StockHoldingItem: React.FC<{ holding: StockHolding }> = ({ holding }) => {
  const isPositive = holding.changeValue >= 0;
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <span className="font-bold text-muted-foreground">{holding.ticker}</span>
        </div>
        <div>
          <p className="font-semibold text-card-foreground">{holding.name}</p>
          <p className="text-sm text-muted-foreground">{holding.shares} shares</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-card-foreground">{formatCurrency(holding.lastPrice)}</p>
        <div className={cn("flex items-center justify-end gap-1 text-sm", isPositive ? "text-green-500" : "text-red-500")}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{formatCurrency(holding.changeValue)}</span>
          <span>({holding.changePercent.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
  );
};

const NewsItem: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <div className="flex-shrink-0 w-[220px] p-4 bg-muted/50 rounded-lg">
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
      <span>{article.category}</span>
      <span>•</span>
      <span>{article.time}</span>
    </div>
    <p className="font-semibold text-sm text-card-foreground leading-snug mb-3">{article.title}</p>
    <a href="#" className="flex items-center text-xs font-semibold text-primary hover:underline">
      {article.source} <ArrowRight className="ml-1 h-3 w-3" />
    </a>
  </div>
);


// --- MAIN COMPONENT ---
export const StockPortfolioCard = ({
  totalGain,
  returnPercentage,
  asOfDate,
  holdings,
  news,
  className,
}: StockPortfolioCardProps) => {
  const isPositiveReturn = returnPercentage >= 0;

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("w-full max-w-2xl mx-auto rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6", className)}
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">Total gain</p>
          <h2 className="text-4xl font-bold tracking-tight">{formatCurrency(totalGain)}</h2>
          <div className={cn("mt-1 flex items-center gap-2 text-sm font-medium", isPositiveReturn ? "text-green-500" : "text-red-500")}>
            {isPositiveReturn ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {returnPercentage.toFixed(2)}% Return
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 sm:mt-0">As of {asOfDate}</p>
      </motion.div>

      {/* Holdings Section */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Holdings</h3>
          <button className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {holdings.map((holding) => (
            <StockHoldingItem key={holding.ticker} holding={holding} />
          ))}
        </div>
      </motion.div>

      {/* Related News Section */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Related news</h3>
          <div className="flex gap-2">
            <button className="p-1 rounded-full border bg-background hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
            <button className="p-1 rounded-full border bg-background hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6">
            {news.map((article, index) => (
                <NewsItem key={index} article={article} />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

code.demo.1760113110534.tsx
import { StockPortfolioCard } from "@/components/ui/stock-portfolio-card"; // Adjust the import path

const Demo = () => {
  // Sample data to populate the component
  const portfolioData = {
    totalGain: 5849.05,
    returnPercentage: 110.28,
    asOfDate: "Nov 24, 2024",
    holdings: [
      {
        ticker: "AAPL",
        name: "Apple Inc.",
        shares: 10,
        lastPrice: 2324.70,
        changeValue: 2.25,
        changePercent: 0.097,
      },
      {
        ticker: "META",
        name: "Meta Platforms Inc.",
        shares: 5,
        lastPrice: 3524.35,
        changeValue: -91.98,
        changePercent: 2.6,
      },
      {
        ticker: "TSLA",
        name: "Tesla, Inc.",
        shares: 15,
        lastPrice: 1805.60,
        changeValue: 45.10,
        changePercent: 2.56,
      },
    ],
    news: [
      {
        category: "AI",
        time: "7 min ago",
        title: "Tokyo Electron Plans Expansion Despite AI Spending Doubts",
        source: "Bloomberg",
      },
      {
        category: "Big Tech",
        time: "25 min ago",
        title: "Apple Debuts New M4 Chips, Focuses on AI Changes in iOS 19",
        source: "Reuters",
      },
      {
        category: "Markets",
        time: "1 hr ago",
        title: "Federal Reserve Signals Potential Pause in Rate Hikes Amidst Inflation Data",
        source: "Wall Street Journal",
      },
    ],
  };

  return (
    <div className="flex items-center justify-center bg-background p-4 sm:p-8">
      <StockPortfolioCard
        totalGain={portfolioData.totalGain}
        returnPercentage={portfolioData.returnPercentage}
        asOfDate={portfolioData.asOfDate}
        holdings={portfolioData.holdings}
        news={portfolioData.news}
      />
    </div>
  );
};

export default Demo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stock-portfolio-card.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MoreHorizontal, TrendingUp, TrendingDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// --- TYPE DEFINITIONS ---
type StockHolding = {
  ticker: string;
  name: string;
  shares: number;
  lastPrice: number;
  changeValue: number;
  changePercent: number;
};

type NewsArticle = {
  category: string;
  time: string;
  title: string;
  source: string;
};

type StockPortfolioCardProps = {
  totalGain: number;
  returnPercentage: number;
  asOfDate: string;
  holdings: StockHolding[];
  news: NewsArticle[];
  className?: string;
};

// --- HELPER TO FORMAT CURRENCY ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// --- SUB-COMPONENTS ---
const StockHoldingItem: React.FC<{ holding: StockHolding }> = ({ holding }) => {
  const isPositive = holding.changeValue >= 0;
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <span className="font-bold text-muted-foreground">{holding.ticker}</span>
        </div>
        <div>
          <p className="font-semibold text-card-foreground">{holding.name}</p>
          <p className="text-sm text-muted-foreground">{holding.shares} shares</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-card-foreground">{formatCurrency(holding.lastPrice)}</p>
        <div className={cn("flex items-center justify-end gap-1 text-sm", isPositive ? "text-green-500" : "text-red-500")}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{formatCurrency(holding.changeValue)}</span>
          <span>({holding.changePercent.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
  );
};

const NewsItem: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <div className="flex-shrink-0 w-[220px] p-4 bg-muted/50 rounded-lg">
    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
      <span>{article.category}</span>
      <span>•</span>
      <span>{article.time}</span>
    </div>
    <p className="font-semibold text-sm text-card-foreground leading-snug mb-3">{article.title}</p>
    <a href="#" className="flex items-center text-xs font-semibold text-primary hover:underline">
      {article.source} <ArrowRight className="ml-1 h-3 w-3" />
    </a>
  </div>
);


// --- MAIN COMPONENT ---
export const StockPortfolioCard = ({
  totalGain,
  returnPercentage,
  asOfDate,
  holdings,
  news,
  className,
}: StockPortfolioCardProps) => {
  const isPositiveReturn = returnPercentage >= 0;

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("w-full max-w-2xl mx-auto rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6", className)}
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">Total gain</p>
          <h2 className="text-4xl font-bold tracking-tight">{formatCurrency(totalGain)}</h2>
          <div className={cn("mt-1 flex items-center gap-2 text-sm font-medium", isPositiveReturn ? "text-green-500" : "text-red-500")}>
            {isPositiveReturn ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {returnPercentage.toFixed(2)}% Return
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 sm:mt-0">As of {asOfDate}</p>
      </motion.div>

      {/* Holdings Section */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Holdings</h3>
          <button className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {holdings.map((holding) => (
            <StockHoldingItem key={holding.ticker} holding={holding} />
          ))}
        </div>
      </motion.div>

      {/* Related News Section */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Related news</h3>
          <div className="flex gap-2">
            <button className="p-1 rounded-full border bg-background hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
            <button className="p-1 rounded-full border bg-background hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6">
            {news.map((article, index) => (
                <NewsItem key={index} article={article} />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
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
