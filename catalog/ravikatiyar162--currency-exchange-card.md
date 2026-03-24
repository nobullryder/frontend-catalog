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
currency-exchange-card.tsx
"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classnames

// Import required shadcn/ui components and icons
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, ArrowRightLeft } from "lucide-react";

// --- TYPE DEFINITIONS ---
export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface CurrencyExchangeCardProps {
  currencies: Currency[];
  initialFromCurrency: Currency;
  initialToCurrency: Currency;
  availableBalance: number;
  exchangeRate: number;
  taxRate?: number; // e.g., 0.02 for 2%
  feeRate?: number; // e.g., 0.01 for 1%
  onExchange: (data: { from: Currency; to: Currency; amount: number; total: number }) => void;
}

// --- CURRENCY SELECTOR SUB-COMPONENT ---
const CurrencySelector = ({
  selectedCurrency,
  onCurrencyChange,
  currencies,
}: {
  selectedCurrency: Currency;
  onCurrencyChange: (currencyCode: string) => void;
  currencies: Currency[];
}) => (
  <Select value={selectedCurrency.code} onValueChange={onCurrencyChange}>
    <SelectTrigger className="w-auto border-none bg-transparent text-lg font-medium shadow-none focus:ring-0">
      <SelectValue>
        <div className="flex items-center gap-2">
          <img src={selectedCurrency.flag} alt={`${selectedCurrency.name} flag`} className="h-6 w-6 rounded-full object-cover" />
          <span>{selectedCurrency.code}</span>
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {currencies.map((currency) => (
        <SelectItem key={currency.code} value={currency.code}>
          <div className="flex items-center gap-3">
            <img src={currency.flag} alt={`${currency.name} flag`} className="h-5 w-5 rounded-full object-cover" />
            <span>{currency.code} - {currency.name}</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// --- MAIN COMPONENT ---
export const CurrencyExchangeCard = ({
  currencies,
  initialFromCurrency,
  initialToCurrency,
  availableBalance,
  exchangeRate,
  taxRate = 0,
  feeRate = 0,
  onExchange,
}: CurrencyExchangeCardProps) => {
  // --- STATE MANAGEMENT ---
  const [amount, setAmount] = useState<string>("100.00");
  const [fromCurrency, setFromCurrency] = useState<Currency>(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState<Currency>(initialToCurrency);
  const [animationKey, setAnimationKey] = useState(0); // Key to trigger animation

  const numericAmount = parseFloat(amount) || 0;

  // --- DERIVED STATE & CALCULATIONS ---
  const { tax, fee, totalAmount } = useMemo(() => {
    const calculatedTax = numericAmount * taxRate;
    const calculatedFee = numericAmount * feeRate;
    const amountToConvert = numericAmount - calculatedTax - calculatedFee;
    const calculatedTotal = amountToConvert * exchangeRate;
    return {
      tax: calculatedTax,
      fee: calculatedFee,
      totalAmount: calculatedTotal > 0 ? calculatedTotal : 0,
    };
  }, [numericAmount, exchangeRate, taxRate, feeRate]);
  
  // --- EVENT HANDLERS ---
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) setFromCurrency(currency);
  };
  
  const handleToCurrencyChange = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) setToCurrency(currency);
  };

  const handleSwapCurrencies = () => {
    setAnimationKey(prev => prev + 1); // Trigger re-render and animation
    setTimeout(() => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }, 150); // Delay swap to match animation timing
  };

  const handleExchange = () => {
    onExchange({ from: fromCurrency, to: toCurrency, amount: numericAmount, total: totalAmount });
  };

  // --- RENDER ---
  return (
    <Card className="w-full max-w-md rounded-2xl border-none bg-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <RefreshCw className="h-6 w-6" />
          Exchange
        </CardTitle>
        <Button variant="ghost" className="text-muted-foreground">Currencies</Button>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Currency Selectors Section */}
        <div className="relative flex items-center justify-between rounded-lg border bg-background p-4">
          <motion.div
            key={`${animationKey}-from`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <CurrencySelector selectedCurrency={fromCurrency} onCurrencyChange={handleFromCurrencyChange} currencies={currencies} />
          </motion.div>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={handleSwapCurrencies}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <motion.div
             key={`${animationKey}-to`}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.3, delay: 0.15 }}
          >
            <CurrencySelector selectedCurrency={toCurrency} onCurrencyChange={handleToCurrencyChange} currencies={currencies} />
          </motion.div>
        </div>

        {/* Amount Input Section */}
        <div className="relative text-center">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-5xl font-bold text-input opacity-10 pointer-events-none">
              {fromCurrency.code}
            </span>
             <Input 
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="h-auto border-none bg-transparent p-0 text-center text-6xl font-bold tracking-tighter shadow-none focus-visible:ring-0"
                placeholder="0.00"
            />
            <p className="text-sm text-muted-foreground">
                Available: {availableBalance.toLocaleString('en-US', { style: 'currency', currency: fromCurrency.code })}
            </p>
        </div>

        {/* Exchange Rate Info */}
        <div className="rounded-lg bg-muted/50 px-4 py-2 text-center text-sm text-muted-foreground">
          1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}
        </div>

        {/* Fee Breakdown Section */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax ({taxRate * 100}%)</span>
            <span>{tax.toLocaleString('en-US', { style: 'currency', currency: fromCurrency.code })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exchange fee ({feeRate * 100}%)</span>
            <span>{fee.toLocaleString('en-US', { style: 'currency', currency: fromCurrency.code })}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total amount</span>
            <span>{totalAmount.toLocaleString('en-US', { style: 'currency', currency: toCurrency.code, minimumFractionDigits: 4 })}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button size="lg" className="w-full text-base font-bold" onClick={handleExchange}>
          <RefreshCw className="mr-2 h-4 w-4" /> Exchange
        </Button>
      </CardContent>
    </Card>
  );
};

code.demo.1758935424627.tsx
import { CurrencyExchangeCard, Currency } from "@/components/ui/currency-exchange-card";

// --- DEMO DATA ---
const sampleCurrencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    code: "EUR",
    name: "Euro",
    flag: "https://flagcdn.com/eu.svg",
  },
  {
    code: "GBP",
    name: "British Pound",
    flag: "https://flagcdn.com/gb.svg",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    flag: "https://flagcdn.com/jp.svg",
  },
];

const CurrencyExchangeDemo = () => {
  // --- DEMO HANDLER ---
  const handleExchange = (data: { from: Currency; to: Currency; amount: number; total: number }) => {
    alert(
      `Exchanged ${data.amount} ${data.from.code} to ${data.total.toFixed(2)} ${data.to.code}`
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4">
      <CurrencyExchangeCard
        currencies={sampleCurrencies}
        initialFromCurrency={sampleCurrencies[0]} // USD
        initialToCurrency={sampleCurrencies[1]} // EUR
        availableBalance={16058.94}
        exchangeRate={0.94} // 1 USD = 0.94 EUR
        taxRate={0.02} // 2%
        feeRate={0.01} // 1%
        onExchange={handleExchange}
      />
    </div>
  );
};

export default CurrencyExchangeDemo;
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/currency-exchange-card.tsx
"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classnames

// Import required shadcn/ui components and icons
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, ArrowRightLeft } from "lucide-react";

// --- TYPE DEFINITIONS ---
export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface CurrencyExchangeCardProps {
  currencies: Currency[];
  initialFromCurrency: Currency;
  initialToCurrency: Currency;
  availableBalance: number;
  exchangeRate: number;
  taxRate?: number; // e.g., 0.02 for 2%
  feeRate?: number; // e.g., 0.01 for 1%
  onExchange: (data: { from: Currency; to: Currency; amount: number; total: number }) => void;
}

// --- CURRENCY SELECTOR SUB-COMPONENT ---
const CurrencySelector = ({
  selectedCurrency,
  onCurrencyChange,
  currencies,
}: {
  selectedCurrency: Currency;
  onCurrencyChange: (currencyCode: string) => void;
  currencies: Currency[];
}) => (
  <Select value={selectedCurrency.code} onValueChange={onCurrencyChange}>
    <SelectTrigger className="w-auto border-none bg-transparent text-lg font-medium shadow-none focus:ring-0">
      <SelectValue>
        <div className="flex items-center gap-2">
          <img src={selectedCurrency.flag} alt={`${selectedCurrency.name} flag`} className="h-6 w-6 rounded-full object-cover" />
          <span>{selectedCurrency.code}</span>
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {currencies.map((currency) => (
        <SelectItem key={currency.code} value={currency.code}>
          <div className="flex items-center gap-3">
            <img src={currency.flag} alt={`${currency.name} flag`} className="h-5 w-5 rounded-full object-cover" />
            <span>{currency.code} - {currency.name}</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// --- MAIN COMPONENT ---
export const CurrencyExchangeCard = ({
  currencies,
  initialFromCurrency,
  initialToCurrency,
  availableBalance,
  exchangeRate,
  taxRate = 0,
  feeRate = 0,
  onExchange,
}: CurrencyExchangeCardProps) => {
  // --- STATE MANAGEMENT ---
  const [amount, setAmount] = useState<string>("100.00");
  const [fromCurrency, setFromCurrency] = useState<Currency>(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState<Currency>(initialToCurrency);
  const [animationKey, setAnimationKey] = useState(0); // Key to trigger animation

  const numericAmount = parseFloat(amount) || 0;

  // --- DERIVED STATE & CALCULATIONS ---
  const { tax, fee, totalAmount } = useMemo(() => {
    const calculatedTax = numericAmount * taxRate;
    const calculatedFee = numericAmount * feeRate;
    const amountToConvert = numericAmount - calculatedTax - calculatedFee;
    const calculatedTotal = amountToConvert * exchangeRate;
    return {
      tax: calculatedTax,
      fee: calculatedFee,
      totalAmount: calculatedTotal > 0 ? calculatedTotal : 0,
    };
  }, [numericAmount, exchangeRate, taxRate, feeRate]);
  
  // --- EVENT HANDLERS ---
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) setFromCurrency(currency);
  };
  
  const handleToCurrencyChange = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    if (currency) setToCurrency(currency);
  };

  const handleSwapCurrencies = () => {
    setAnimationKey(prev => prev + 1); // Trigger re-render and animation
    setTimeout(() => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }, 150); // Delay swap to match animation timing
  };

  const handleExchange = () => {
    onExchange({ from: fromCurrency, to: toCurrency, amount: numericAmount, total: totalAmount });
  };

  // --- RENDER ---
  return (
    <Card className="w-full max-w-md rounded-2xl border-none bg-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <RefreshCw className="h-6 w-6" />
          Exchange
        </CardTitle>
        <Button variant="ghost" className="text-muted-foreground">Currencies</Button>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Currency Selectors Section */}
        <div className="relative flex items-center justify-between rounded-lg border bg-background p-4">
          <motion.div
            key={`${animationKey}-from`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <CurrencySelector selectedCurrency={fromCurrency} onCurrencyChange={handleFromCurrencyChange} currencies={currencies} />
          </motion.div>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={handleSwapCurrencies}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <motion.div
             key={`${animationKey}-to`}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.3, delay: 0.15 }}
          >
            <CurrencySelector selectedCurrency={toCurrency} onCurrencyChange={handleToCurrencyChange} currencies={currencies} />
          </motion.div>
        </div>

        {/* Amount Input Section */}
        <div className="relative text-center">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-5xl font-bold text-input opacity-10 pointer-events-none">
              {fromCurrency.code}
            </span>
             <Input 
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="h-auto border-none bg-transparent p-0 text-center text-6xl font-bold tracking-tighter shadow-none focus-visible:ring-0"
                placeholder="0.00"
            />
            <p className="text-sm text-muted-foreground">
                Available: {availableBalance.toLocaleString('en-US', { style: 'currency', currency: fromCurrency.code })}
            </p>
        </div>

        {/* Exchange Rate Info */}
        <div className="rounded-lg bg-muted/50 px-4 py-2 text-center text-sm text-muted-foreground">
          1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}
        </div>

        {/* Fee Breakdown Section */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax ({taxRate * 100}%)</span>
            <span>{tax.toLocaleString('en-US', { style: 'currency', currency: fromCurrency.code })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exchange fee ({feeRate * 100}%)</span>
            <span>{fee.toLocaleString('en-US', { style: 'currency', currency: fromCurrency.code })}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total amount</span>
            <span>{totalAmount.toLocaleString('en-US', { style: 'currency', currency: toCurrency.code, minimumFractionDigits: 4 })}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button size="lg" className="w-full text-base font-bold" onClick={handleExchange}>
          <RefreshCw className="mr-2 h-4 w-4" /> Exchange
        </Button>
      </CardContent>
    </Card>
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
