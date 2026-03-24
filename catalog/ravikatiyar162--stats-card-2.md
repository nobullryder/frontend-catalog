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
stats-card-2.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// --- TYPE DEFINITIONS ---

interface Coin {
  iconUrl: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

interface Dominance {
  name: string;
  percentage: number;
  color: string; // e.g., 'bg-blue-500' or a CSS variable
}

interface CryptoStatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  marketCapUSD: number;
  marketCapChange: number;
  chartData: number[];
  dominanceData: Dominance[];
  coinData: Coin[];
  currencySymbol?: string;
}

// --- HELPER FUNCTIONS ---

const formatMarketCap = (num: number): string => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  }
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  return num.toString();
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// --- SUB-COMPONENTS ---

/**
 * An animated SVG sparkline chart component.
 * Uses framer-motion for a draw-in animation effect.
 */
const SparkLineChart = ({
  data,
  width = 280,
  height = 80,
  strokeWidth = 2,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d - min) / range) * (height - strokeWidth * 2) + strokeWidth;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-primary", className)}
      aria-label="Sparkline chart showing market trend over the last month"
    >
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`M${points}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d={`M${points} L${width},${height} L0,${height} Z`}
        fill="url(#sparkline-gradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
};

// --- MAIN COMPONENT ---

export const CryptoStatsCard = React.forwardRef<
  HTMLDivElement,
  CryptoStatsCardProps
>(
  (
    {
      marketCapUSD,
      marketCapChange,
      chartData,
      dominanceData,
      coinData,
      currencySymbol = "USD",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6",
          className
        )}
        {...props}
      >
        {/* Market Cap Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Crypto market cap
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {formatMarketCap(marketCapUSD)}
            </span>
            <span className="text-lg font-medium text-muted-foreground">
              {currencySymbol}
            </span>
          </div>
          <div
            className={cn(
              "text-sm font-semibold",
              marketCapChange >= 0 ? "text-green-500" : "text-destructive"
            )}
          >
            {marketCapChange >= 0 ? "+" : ""}
            {marketCapChange.toFixed(2)}%
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex justify-center -mx-6 my-4">
            <SparkLineChart data={chartData} />
        </div>

        {/* Dominance Section */}
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Bitcoin dominance</h3>
            <div className="flex items-center justify-between text-xs">
                {dominanceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", item.color)} />
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-semibold text-card-foreground">{item.percentage.toFixed(2)}%</span>
                    </div>
                ))}
            </div>
            <div className="flex h-2 w-full rounded-full overflow-hidden">
                {dominanceData.map((item) => (
                    <div key={item.name} className={cn("h-full", item.color)} style={{ width: `${item.percentage}%` }} />
                ))}
            </div>
        </div>

        {/* Coin List Section */}
        <div className="space-y-4 pt-4 border-t">
            {coinData.map((coin) => (
                <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={coin.iconUrl} alt={`${coin.name} icon`} className="h-8 w-8"/>
                        <div>
                            <p className="font-semibold">{coin.name}</p>
                            <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">{formatPrice(coin.price)} <span className="text-xs text-muted-foreground">{currencySymbol}</span></p>
                        <p className={cn("text-xs font-medium", coin.change >= 0 ? "text-green-500" : "text-destructive")}>
                            {coin.change.toFixed(2)}%
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }
);
CryptoStatsCard.displayName = "CryptoStatsCard";

code.demo.1759417952972.tsx
import { CryptoStatsCard } from "@/components/ui/stats-card-2"; // Adjust the import path

const CryptoStatsCardDemo = () => {
  // Mock data mimicking the structure from the image
  const marketCapData = {
    usd: 4000000000000, // 4T
    change: 7.79,
  };

  const sparklineChartData = [
    50, 52, 48, 55, 60, 58, 62, 70, 68, 75, 72, 80, 78, 85, 82, 70, 65, 72, 78, 88, 92, 90
  ];

  const dominanceData = [
    { name: "Bitcoin", percentage: 59.02, color: "bg-blue-500" },
    { name: "Ethereum", percentage: 13.11, color: "bg-red-500" },
    { name: "Others", percentage: 27.87, color: "bg-cyan-400" },
  ];

  const coinData = [
    {
      iconUrl: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC--big.svg",
      name: "Bitcoin",
      symbol: "BTCUSD",
      price: 118624,
      change: -0.04,
    },
    {
      iconUrl: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH--big.svg",
      name: "Ethereum",
      symbol: "ETHUSD",
      price: 4349.2,
      change: -0.04,
    },
  ];

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <CryptoStatsCard
        marketCapUSD={marketCapData.usd}
        marketCapChange={marketCapData.change}
        chartData={sparklineChartData}
        dominanceData={dominanceData}
        coinData={coinData}
      />
    </div>
  );
};

export default CryptoStatsCardDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/stats-card-2.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Your utility for merging class names

// --- TYPE DEFINITIONS ---

interface Coin {
  iconUrl: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
}

interface Dominance {
  name: string;
  percentage: number;
  color: string; // e.g., 'bg-blue-500' or a CSS variable
}

interface CryptoStatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  marketCapUSD: number;
  marketCapChange: number;
  chartData: number[];
  dominanceData: Dominance[];
  coinData: Coin[];
  currencySymbol?: string;
}

// --- HELPER FUNCTIONS ---

const formatMarketCap = (num: number): string => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  }
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  return num.toString();
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// --- SUB-COMPONENTS ---

/**
 * An animated SVG sparkline chart component.
 * Uses framer-motion for a draw-in animation effect.
 */
const SparkLineChart = ({
  data,
  width = 280,
  height = 80,
  strokeWidth = 2,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d - min) / range) * (height - strokeWidth * 2) + strokeWidth;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-primary", className)}
      aria-label="Sparkline chart showing market trend over the last month"
    >
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`M${points}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d={`M${points} L${width},${height} L0,${height} Z`}
        fill="url(#sparkline-gradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
      />
    </svg>
  );
};

// --- MAIN COMPONENT ---

export const CryptoStatsCard = React.forwardRef<
  HTMLDivElement,
  CryptoStatsCardProps
>(
  (
    {
      marketCapUSD,
      marketCapChange,
      chartData,
      dominanceData,
      coinData,
      currencySymbol = "USD",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6",
          className
        )}
        {...props}
      >
        {/* Market Cap Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Crypto market cap
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {formatMarketCap(marketCapUSD)}
            </span>
            <span className="text-lg font-medium text-muted-foreground">
              {currencySymbol}
            </span>
          </div>
          <div
            className={cn(
              "text-sm font-semibold",
              marketCapChange >= 0 ? "text-green-500" : "text-destructive"
            )}
          >
            {marketCapChange >= 0 ? "+" : ""}
            {marketCapChange.toFixed(2)}%
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex justify-center -mx-6 my-4">
            <SparkLineChart data={chartData} />
        </div>

        {/* Dominance Section */}
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Bitcoin dominance</h3>
            <div className="flex items-center justify-between text-xs">
                {dominanceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", item.color)} />
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-semibold text-card-foreground">{item.percentage.toFixed(2)}%</span>
                    </div>
                ))}
            </div>
            <div className="flex h-2 w-full rounded-full overflow-hidden">
                {dominanceData.map((item) => (
                    <div key={item.name} className={cn("h-full", item.color)} style={{ width: `${item.percentage}%` }} />
                ))}
            </div>
        </div>

        {/* Coin List Section */}
        <div className="space-y-4 pt-4 border-t">
            {coinData.map((coin) => (
                <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={coin.iconUrl} alt={`${coin.name} icon`} className="h-8 w-8"/>
                        <div>
                            <p className="font-semibold">{coin.name}</p>
                            <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">{formatPrice(coin.price)} <span className="text-xs text-muted-foreground">{currencySymbol}</span></p>
                        <p className={cn("text-xs font-medium", coin.change >= 0 ? "text-green-500" : "text-destructive")}>
                            {coin.change.toFixed(2)}%
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }
);
CryptoStatsCard.displayName = "CryptoStatsCard";
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
