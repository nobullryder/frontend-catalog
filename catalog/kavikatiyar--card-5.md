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
card-5.tsx
// components/ui/withdrawal-card.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the shape of an account object for type safety
export interface Account {
  id: string;
  initials?: string;
  icon?: React.ReactNode;
  name: string;
  details: string; // e.g., masked card number or account identifier
}

// Define the props for the WithdrawalCard component
export interface WithdrawalCardProps {
  amount: number;
  availableBalance: number;
  currency: string;
  accounts: Account[];
  defaultSelectedAccountId: string;
  onWithdraw: (selectedAccountId: string) => void;
  className?: string;
}

export const WithdrawalCard = ({
  amount,
  availableBalance,
  currency,
  accounts,
  defaultSelectedAccountId,
  onWithdraw,
  className,
}: WithdrawalCardProps) => {
  const [selectedAccountId, setSelectedAccountId] = React.useState(defaultSelectedAccountId);

  // Helper to format numbers as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-3xl bg-card p-6 shadow-lg sm:p-8",
        "flex flex-col space-y-6 border",
        className
      )}
    >
      {/* Amount Section */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Amount</p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {currency} {formatCurrency(amount)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Available balance {currency} {formatCurrency(availableBalance)}
        </p>
      </div>

      {/* Account Selection Section */}
      <div className="flex-grow">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Choose Account
        </p>
        <div
          role="radiogroup"
          aria-label="Choose an account"
          className="space-y-3"
        >
          {accounts.map((account) => {
            const isSelected = selectedAccountId === account.id;
            return (
              <div
                key={account.id}
                onClick={() => setSelectedAccountId(account.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedAccountId(account.id)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                className={cn(
                  "relative flex cursor-pointer items-center space-x-4 rounded-xl p-4 transition-all duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted"
                )}
              >
                {/* Animated selection highlight */}
                {isSelected && (
                  <motion.div
                    layoutId="selected-highlight"
                    className="absolute inset-0 z-0 rounded-xl bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Account Icon/Initials */}
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-background/20 text-sm font-bold">
                  <span className={cn(isSelected ? "text-primary-foreground" : "text-foreground")}>
                    {account.initials || account.icon}
                  </span>
                </div>

                {/* Account Details */}
                <div className="relative z-10 flex-grow">
                  <p className="font-semibold">{account.name}</p>
                  <p className={cn("text-sm", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {account.details}
                  </p>
                </div>

                {/* Selection Checkmark */}
                <div className="relative z-10 h-6 w-6">
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="flex h-full w-full items-center justify-center rounded-full bg-primary-foreground text-primary"
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!isSelected && <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <Button
        size="lg"
        className="w-full rounded-xl py-6 text-base font-bold"
        onClick={() => onWithdraw(selectedAccountId)}
        aria-label="Withdraw amount"
      >
        WITHDRAW
      </Button>
    </div>
  );
};

code.demo.1758069842245.tsx
// demo.tsx
import * as React from "react";
import { CreditCard, Landmark } from "lucide-react";
import { Account, WithdrawalCard } from "@/components/ui/card-5";

// Mock data for the accounts, matching the Account interface
const mockAccounts: Account[] = [
  {
    id: "acc_1",
    initials: "BA",
    name: "Bank Account",
    details: "**** - **** - 0945",
    icon: <Landmark className="h-5 w-5" />, // Fallback icon
  },
  {
    id: "acc_2",
    initials: "CC",
    name: "Credit Card",
    details: "**** - **** - 3289",
    icon: <CreditCard className="h-5 w-5" />, // Fallback icon
  },
];

export default function WithdrawalCardDemo() {
  // Handler for the withdraw action
  const handleWithdraw = (selectedAccountId: string) => {
    const selectedAccount = mockAccounts.find(acc => acc.id === selectedAccountId);
    console.log(`Withdrawing from: ${selectedAccount?.name} (${selectedAccountId})`);
    // Here you would typically trigger an API call or other logic
    // For demo, we just log to the console.
    alert(`Withdrawal initiated from ${selectedAccount?.name}!`);
  };

  return (
    <div className="flex h-full min-h-[600px] w-full items-center justify-center bg-background p-4">
      <WithdrawalCard
        amount={535000}
        availableBalance={785000}
        currency="IDR"
        accounts={mockAccounts}
        defaultSelectedAccountId="acc_1"
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}
```

Copy-paste these files for dependencies:
```tsx
src/components/ui/card-5.tsx
// components/ui/withdrawal-card.tsx
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the shape of an account object for type safety
export interface Account {
  id: string;
  initials?: string;
  icon?: React.ReactNode;
  name: string;
  details: string; // e.g., masked card number or account identifier
}

// Define the props for the WithdrawalCard component
export interface WithdrawalCardProps {
  amount: number;
  availableBalance: number;
  currency: string;
  accounts: Account[];
  defaultSelectedAccountId: string;
  onWithdraw: (selectedAccountId: string) => void;
  className?: string;
}

export const WithdrawalCard = ({
  amount,
  availableBalance,
  currency,
  accounts,
  defaultSelectedAccountId,
  onWithdraw,
  className,
}: WithdrawalCardProps) => {
  const [selectedAccountId, setSelectedAccountId] = React.useState(defaultSelectedAccountId);

  // Helper to format numbers as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-3xl bg-card p-6 shadow-lg sm:p-8",
        "flex flex-col space-y-6 border",
        className
      )}
    >
      {/* Amount Section */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Amount</p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {currency} {formatCurrency(amount)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Available balance {currency} {formatCurrency(availableBalance)}
        </p>
      </div>

      {/* Account Selection Section */}
      <div className="flex-grow">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Choose Account
        </p>
        <div
          role="radiogroup"
          aria-label="Choose an account"
          className="space-y-3"
        >
          {accounts.map((account) => {
            const isSelected = selectedAccountId === account.id;
            return (
              <div
                key={account.id}
                onClick={() => setSelectedAccountId(account.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedAccountId(account.id)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                className={cn(
                  "relative flex cursor-pointer items-center space-x-4 rounded-xl p-4 transition-all duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted"
                )}
              >
                {/* Animated selection highlight */}
                {isSelected && (
                  <motion.div
                    layoutId="selected-highlight"
                    className="absolute inset-0 z-0 rounded-xl bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Account Icon/Initials */}
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-background/20 text-sm font-bold">
                  <span className={cn(isSelected ? "text-primary-foreground" : "text-foreground")}>
                    {account.initials || account.icon}
                  </span>
                </div>

                {/* Account Details */}
                <div className="relative z-10 flex-grow">
                  <p className="font-semibold">{account.name}</p>
                  <p className={cn("text-sm", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {account.details}
                  </p>
                </div>

                {/* Selection Checkmark */}
                <div className="relative z-10 h-6 w-6">
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="flex h-full w-full items-center justify-center rounded-full bg-primary-foreground text-primary"
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!isSelected && <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <Button
        size="lg"
        className="w-full rounded-xl py-6 text-base font-bold"
        onClick={() => onWithdraw(selectedAccountId)}
        aria-label="Withdraw amount"
      >
        WITHDRAW
      </Button>
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
